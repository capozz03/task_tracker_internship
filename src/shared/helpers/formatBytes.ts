export const formatBytes = (bytes: number, decimals: number): string => {
  if (bytes === 0) return '0 Bytes';
  const numOfBytesInKb = 1024;
  const numDecimalPlaces = decimals <= 0 ? 0 : decimals || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const degree = Math.floor(Math.log(bytes) / Math.log(numOfBytesInKb));
  const res = (bytes / numOfBytesInKb ** degree).toFixed(numDecimalPlaces);
  return `${res} ${sizes[degree]}`;
};
