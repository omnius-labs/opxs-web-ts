'use client';

import { Button, Dropdown } from 'flowbite-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileImage } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Backoff, Path } from '@/shared/libs';
import axios from 'axios';
import { Api } from '../api';
import { FileTypeConverter } from '../libs';
import { AcceptedFile, FileConvertImageOutFileType, FileConvertJobStatus } from '../types';

export function ConvertPanel() {
  const httpClient = axios.create({
    timeout: 30000
  });
  const [acceptedFiles, setAcceptedFiles] = useState<AcceptedFile[]>([]);

  const onDrop = useCallback((files: File[]) => {
    if (files.length !== 1) {
      toast.error('');
      return;
    }

    const file = files[0];

    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = async () => {
      const v: AcceptedFile = {
        filename: file.name,
        content: reader.result as ArrayBuffer,
        outType: FileConvertImageOutFileType.Png,
        downloadUrl: null,
        downloadFilename: null
      };
      setAcceptedFiles((prevFiles) => [...prevFiles, v]);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileTypeChange = (index: number, newType: FileConvertImageOutFileType) => {
    setAcceptedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index].outType = newType;
      return updatedFiles;
    });
  };

  const handleConvert = async (file: AcceptedFile) => {
    const inFilename = file.filename;
    const inType = FileTypeConverter.extensionToInFileType(Path.getExtension(inFilename));
    const outType = file.outType;
    const outFilename = Path.changeExtension(inFilename, FileTypeConverter.outFileTypeToExtension(outType));
    const { job_id, upload_url } = await Api.upload(inFilename, inType, outFilename, outType);
    console.log(job_id, upload_url);
    await httpClient.put(upload_url, file.content, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/octet-stream'
      }
    });

    const downloadUrl = await Backoff.exponentialBackoff(
      async () => {
        const { status, download_url } = await Api.status(job_id);
        if (status !== FileConvertJobStatus.Completed) {
          throw new Error('Status is not completed');
        }
        return download_url;
      },
      30,
      1000
    );
    setAcceptedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      file.downloadUrl = downloadUrl;
      file.downloadFilename = outFilename;
      return updatedFiles;
    });
  };

  const handleDownload = async (file: AcceptedFile) => {
    if (file.downloadUrl === null || file.downloadFilename === null) {
      return;
    }
    console.log(file);
    const link = document.createElement('a');
    link.href = file.downloadUrl;
    link.download = file.downloadFilename;
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
                  <Dropdown label={file.outType}>
                    <Dropdown.Item onClick={() => handleFileTypeChange(index, FileConvertImageOutFileType.Png)}>
                      PNG
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFileTypeChange(index, FileConvertImageOutFileType.Jpg)}>
                      JPEG
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFileTypeChange(index, FileConvertImageOutFileType.Avif)}>
                      AVIF
                    </Dropdown.Item>
                  </Dropdown>
                  {file.downloadUrl !== null && file.downloadFilename !== null ? (
                    <Button size="md" color="green" onClick={() => handleDownload(file)}>
                      Download
                    </Button>
                  ) : (
                    <Button size="md" color="purple" onClick={() => handleConvert(file)}>
                      Convert
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
