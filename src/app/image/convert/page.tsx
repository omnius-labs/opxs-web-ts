'use client';

import api from '@/lib/api';
import axios from 'axios';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Page() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(async (file) => {
      const res = await api.post(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/image/convert/upload', {
        source_filename: file.name,
        target_image_format: 'png'
      });

      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        const binaryStr = reader.result;

        const s3 = axios.create({
          timeout: 30000
        });
        await s3.put(res.data.upload_uri, binaryStr);

        for (let i = 0; i < 1000; i++) {
          const res2 = await api.get(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/image/convert/status', {
            params: {
              job_id: res.data.job_id
            }
          });

          if (res2.data.status === 'Completed') {
            await s3.get(res2.data.download_uri);
            const link = document.createElement('a');
            link.href = res2.data.download_uri;
            link.download = file.name + '.png';
            link.click();
            break;
          }

          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
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
        <p className="m-0">Drag your files here or click in this area.</p>
      </div>
    </div>
  );
}
