export const Path = {
  getExtension(filename: string): string {
    let parts = filename.split('.');
    return parts.length > 1 ? (parts.pop() as string) : '';
  },
  getFilenameWithoutExtension(filename: string): string {
    return filename.replace(/\.[^/.]+$/, '');
  },
  changeExtension(filename: string, newExtension: string): string {
    return this.getFilenameWithoutExtension(filename) + '.' + newExtension;
  }
};
