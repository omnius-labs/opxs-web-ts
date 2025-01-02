import { FileConvertImageInFileType, FileConvertImageOutFileType } from '../types';

const outFileTypeMap = new Map<FileConvertImageOutFileType, string>();
outFileTypeMap.set(FileConvertImageOutFileType.Gif, 'gif');
outFileTypeMap.set(FileConvertImageOutFileType.Jpg, 'jpg');
outFileTypeMap.set(FileConvertImageOutFileType.Png, 'png');
outFileTypeMap.set(FileConvertImageOutFileType.WebP, 'webp');
outFileTypeMap.set(FileConvertImageOutFileType.Bmp, 'bmp');
outFileTypeMap.set(FileConvertImageOutFileType.Avif, 'avif');
outFileTypeMap.set(FileConvertImageOutFileType.Svg, 'svg');

const inFileTypeMap = new Map<string, FileConvertImageInFileType>();
inFileTypeMap.set('gif', FileConvertImageInFileType.Gif);
inFileTypeMap.set('jpg', FileConvertImageInFileType.Jpg);
inFileTypeMap.set('jpeg', FileConvertImageInFileType.Jpg);
inFileTypeMap.set('png', FileConvertImageInFileType.Png);
inFileTypeMap.set('webp', FileConvertImageInFileType.WebP);
inFileTypeMap.set('bmp', FileConvertImageInFileType.Bmp);
inFileTypeMap.set('heif', FileConvertImageInFileType.Heif);
inFileTypeMap.set('heic', FileConvertImageInFileType.Heic);
inFileTypeMap.set('avif', FileConvertImageInFileType.Avif);
inFileTypeMap.set('svg', FileConvertImageInFileType.Svg);

export const FileTypeConverter = {
  outFileTypeToExtension(type: FileConvertImageOutFileType): string {
    return outFileTypeMap.get(type) || '';
  },
  extensionToInFileType(extension: string): FileConvertImageInFileType {
    return inFileTypeMap.get(extension) || FileConvertImageInFileType.Unknown;
  }
};
