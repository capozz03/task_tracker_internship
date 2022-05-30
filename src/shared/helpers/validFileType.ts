import { RcFile } from 'antd/lib/upload';
import { acceptedFilesForCheckExtension } from './checkBeforeUpload';

const fileTypes = [
  'image/jpeg',
  'image/png',
  'image/tiff',
  'video/avi',
  'video/mp4',
  'video/x-ms-wmv',
  'text/csv',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

export const slicedName = (name: string) => {
  const fileExtension = name.split('.')[1];
  const fileName = name.split('.')[0];
  let slicedName = fileName.slice(0, 30);
  if (slicedName.length < fileName.length) {
    slicedName += `...${fileExtension}`;
    return slicedName;
  }
  return name;
};

export const validFileType = (file: RcFile) => {
  const typeOfFile = fileTypes.includes(file.type);
  console.log(file);
  console.log(file.name);
  console.log('Имя файла', file.name.split('.')[0]);
  console.log('Расширение файла', file.name.split('.')[1]);
  const fileExtension = file.name.split('.')[1].includes(acceptedFilesForCheckExtension);
  console.log('Включает ли расширение файлов строку с разрешенными', fileExtension);
  console.log('Проверка MIME типов', typeOfFile);
  const isValid = typeOfFile || fileExtension;
  console.log('isValid', isValid);
  return isValid;
};
