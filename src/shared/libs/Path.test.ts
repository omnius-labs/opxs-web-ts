import { Path } from './Path';

describe('Path', () => {
  describe('getExtension', () => {
    it('should return the extension of a filename', () => {
      expect(Path.getExtension('file.txt.png')).toBe('png');
      expect(Path.getExtension('file.txt')).toBe('txt');
      expect(Path.getExtension('file')).toBe('');
    });
  });

  describe('getFilenameWithoutExtension', () => {
    it('should return the filename without the extension', () => {
      expect(Path.getFilenameWithoutExtension('file.txt.png')).toBe('file.txt');
      expect(Path.getFilenameWithoutExtension('file.txt')).toBe('file');
      expect(Path.getFilenameWithoutExtension('file')).toBe('file');
    });
  });

  describe('changeExtension', () => {
    it('should change the extension of a filename', () => {
      expect(Path.changeExtension('file.txt', 'md')).toBe('file.md');
      expect(Path.changeExtension('file', 'md')).toBe('file.md');
    });
  });
});
