'use client';

import axios from 'axios';
import { Button, Dropdown } from 'flowbite-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileImage } from 'react-icons/fa';

import { Backoff, Path } from '@/shared/libs';
import { toast } from 'react-toastify';
import { Api } from '../api';
import { FileTypeConverter } from '../libs';
import { AcceptedFile, AcceptedFileStatus, FileConvertImageOutFileType, FileConvertJobStatus } from '../types';

export function ConvertPanel() {
  const httpClient = axios.create({ timeout: 30000 });
  const [acceptedFiles, setAcceptedFiles] = useState<AcceptedFile[]>([]);

  const updateFile = (index: number, newFile: Partial<AcceptedFile>) => {
    setAcceptedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] = { ...updatedFiles[index], ...newFile };
      return updatedFiles;
    });
  };

  const onDrop = useCallback((files: File[]) => {
    for (const file of files) {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        const v: AcceptedFile = {
          filename: file.name,
          content: reader.result as ArrayBuffer,
          outType: FileConvertImageOutFileType.Png,
          status: AcceptedFileStatus.Pending,
          result: null
        };
        setAcceptedFiles((prevFiles) => [...prevFiles, v]);
      };
      reader.readAsArrayBuffer(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileTypeChange = (index: number, newType: FileConvertImageOutFileType) => {
    updateFile(index, { outType: newType });
  };

  const handleConvert = async (index: number) => {
    const file = acceptedFiles[index];

    updateFile(index, { status: AcceptedFileStatus.Processing });

    // Upload先のURLを取得
    const inFilename = file.filename;
    const inType = FileTypeConverter.extensionToInFileType(Path.getExtension(inFilename));
    const outType = file.outType;
    const outFilename = Path.changeExtension(inFilename, FileTypeConverter.outFileTypeToExtension(outType));
    const { job_id, upload_url } = await Api.upload(inFilename, inType, outFilename, outType);

    // ファイルをアップロード
    await httpClient.put(upload_url, file.content, { headers: { 'Content-Type': 'application/octet-stream' } });

    try {
      await Backoff.exponentialBackoff(
        async () => {
          const { status, download_url } = await Api.status(job_id);

          if (
            status === FileConvertJobStatus.Preparing ||
            status === FileConvertJobStatus.Waiting ||
            status === FileConvertJobStatus.Processing
          ) {
            return false;
          }

          if (status === FileConvertJobStatus.Completed && download_url !== null) {
            updateFile(index, {
              status: AcceptedFileStatus.Completed,
              result: {
                downloadUrl: download_url,
                downloadFilename: outFilename
              }
            });
            return true;
          }

          throw new Error('Failed to convert file. status: ' + status);
        },
        30,
        500,
        5000
      );
    } catch (e) {
      updateFile(index, { status: AcceptedFileStatus.Failed });
      toast.error('Failed to convert file');
    }
  };

  const handleDownload = async (index: number) => {
    const file = acceptedFiles[index];

    if (file.result === null) {
      return;
    }

    console.log(file);
    const link = document.createElement('a');
    link.href = file.result.downloadUrl;
    link.download = file.result.downloadFilename;
    link.click();
  };

  return (
    <main>
      <div className="flex flex-row">
        <div className="flex flex-col space-y-4 m-8">
          <p className="text-2xl">Upload</p>
          <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded" {...getRootProps()}>
            <input
              className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
              {...getInputProps()}
            />
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <svg
                className="w-6 h-6 mr-1 text-current-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="m-0">Drag and drop a file here or click</p>
            </div>
          </div>
        </div>
        <div className="flex-auto flex flex-col space-y-4 m-8">
          <p className="text-2xl">Files</p>
          <div className="border-x border-t border-gray-300">
            <div className="flex flex-col">
              {acceptedFiles.map((file, index) => (
                <div key={index} className="flex items-center border-b border-gray-300 p-4 space-x-4">
                  <FaFileImage />
                  <div className="text-xl grow">{file.filename}</div>
                  {file.status === AcceptedFileStatus.Pending ? (
                    <Dropdown label={file.outType.toUpperCase()}>
                      {Object.values(FileConvertImageOutFileType).map((outType) => (
                        <Dropdown.Item onClick={() => handleFileTypeChange(index, outType)}>
                          {outType.toUpperCase()}
                        </Dropdown.Item>
                      ))}
                    </Dropdown>
                  ) : (
                    <div className="text-xl">{file.outType.toUpperCase()}</div>
                  )}
                  {file.status === AcceptedFileStatus.Pending ? (
                    <Button size="md" color="purple" onClick={() => handleConvert(index)}>
                      Convert
                    </Button>
                  ) : file.status === AcceptedFileStatus.Completed ? (
                    <Button size="md" color="green" onClick={() => handleDownload(index)}>
                      Download
                    </Button>
                  ) : file.status === AcceptedFileStatus.Failed ? (
                    <Button size="md" color="red" onClick={() => handleConvert(index)}>
                      Retry
                    </Button>
                  ) : (
                    <Button size="md" color="gray" disabled>
                      Processing
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
