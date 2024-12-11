'use client';

import { apiClient } from '@/shared/libs';
import { FileConvertImageInFileType, FileConvertImageOutFileType, UploadOutput } from '../types';

export async function upload(
  inFilename: string,
  inType: FileConvertImageInFileType,
  outFilename: string,
  outType: FileConvertImageOutFileType
): Promise<UploadOutput> {
  const res = await apiClient.post(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/file-convert/image/upload', {
    in_type: inType,
    in_file_name: inFilename,
    out_type: outType,
    out_file_name: outFilename
  });
  return res.data;
}
