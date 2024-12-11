export interface AcceptedFile {
  filename: string;
  content: ArrayBuffer;
  outType: FileConvertImageOutFileType;
  status: AcceptedFileStatus;
  result: AcceptedFileConvertedResult | null;
}

export interface AcceptedFileConvertedResult {
  downloadUrl: string;
  downloadFilename: string;
}

export enum AcceptedFileStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Completed = 'Completed',
  Failed = 'Failed'
}

export enum FileConvertImageInFileType {
  Unknown = 'unknown',
  Gif = 'gif',
  Jpg = 'jpg',
  Png = 'png',
  WebP = 'webp',
  Bmp = 'bmp',
  Heif = 'heif',
  Heic = 'heic',
  Avif = 'avif',
  Svg = 'svg'
}

export enum FileConvertImageOutFileType {
  Gif = 'gif',
  Jpg = 'jpg',
  Png = 'png',
  WebP = 'webp',
  Bmp = 'bmp',
  Heif = 'heif',
  Heic = 'heic',
  Avif = 'avif',
  Svg = 'svg'
}

export interface UploadOutput {
  job_id: string;
  upload_url: string;
}

export interface StatusOutput {
  status: FileConvertJobStatus;
  download_url: string | null;
}

export enum FileConvertJobStatus {
  Unknown = 'Unknown',
  Preparing = 'Preparing',
  Waiting = 'Waiting',
  Processing = 'Processing',
  Completed = 'Completed',
  Rejected = 'Rejected',
  Failed = 'Failed'
}
