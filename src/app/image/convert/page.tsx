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
        target_image_format: 'Png'
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

        for (let i = 0; i < 100; i++) {
          const res2 = await api.get(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/image/convert/status', {
            params: {
              job_id: res.data.job_id
            }
          });

          if (res2.data.status === 'Completed') {
            await s3.get(res2.data.download_uri);
            const link = document.createElement('a');
            link.download = 'result.csv';
            link.href = res2.data.download_uri;
            link.click();
          }

          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag n drop some files here, or click to select files</p>
    </div>
  );
}
