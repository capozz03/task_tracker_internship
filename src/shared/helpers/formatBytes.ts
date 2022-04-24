export const formatBytes = (bytes: number, decimals: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals <= 0 ? 0 : decimals || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const res = (bytes / k ** i).toFixed(dm);
  return `${res} ${sizes[i]}`;
};
