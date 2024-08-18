'use client';

import { apiClient } from '@/shared/libs';
import axios from 'axios';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ConverterLayout() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(async (file) => {
      const res = await apiClient.post(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/image/convert/upload', {
        source_file_name: file.name,
        target_image_type: 'png'
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
          const res2 = await apiClient.get(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/image/convert/status', {
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
    // <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded" {...getRootProps()}>
    //   <input
    //     className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
    //     {...getInputProps()}
    //   />
    //   <div className="flex flex-col items-center justify-center py-10 text-center">
    //     <svg
    //       className="w-6 h-6 mr-1 text-current-50"
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor"
    //     >
    //       <path
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //         stroke-width="2"
    //         d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    //       />
    //     </svg>
    //     <p className="m-0">Drag your files here or click in this area.</p>
    //   </div>
    // </div>

    <div className="flex flex-col justify-center">
      <h1 className="text-4xl text-center text-green-600 m-8">画像コンバーター</h1>
      <div className="bg-white border border-gray-300 mx-8 shadow-md">
        <div className="overflow-y-auto max-h-96">
          <div className="flex items-center border-b border-gray-300 p-4 space-x-2">
            <img src="path/to/example.png" alt="Icon" className="w-10 h-10" />
            <div className="flex-grow space-y-1">
              <div className="text-lg font-bold text-xl">example.png</div>
              <div className="text-gray-500">225 KB</div>
            </div>
            {/* <div className="ml-auto">
              <select>
                <option>...</option>
              </select>
            </div> */}
            <div className="ml-auto">
              <button className="w-8 h-8 text-gray border-none rounded-lg cursor-pointer text-4xl hover:shadow-lg">
                ×
              </button>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex-grow">
            <button className="bg-gray-200 border-none px-5 py-2 mt-4 mb-4 mr-8 ml-8 cursor-pointer text-xl">
              + ファイルを追加
            </button>
          </div>
          <button className="bg-red-500 text-white border-none w-32 py-2 cursor-pointer text-2xl">変換</button>
        </div>
      </div>
    </div>
  );
}
