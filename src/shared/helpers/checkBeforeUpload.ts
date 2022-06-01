import { RcFile } from 'antd/lib/upload';
import { TaskFormSlice } from 'store/slice';
import { alert, validFileType } from 'shared';
import { Dispatch } from 'react';

export const acceptedFiles = '.pdf, .txt, .doc, .docx, .avi, .mp4, .wmv, .csv, .xls, .xlsx, .jpeg, .jpg, .png';
export const acceptedFilesForCheckExtension = [
  'pdf',
  'txt',
  'doc',
  'docx',
  'avi',
  'mp4',
  'wmv',
  'csv',
  'xls',
  'xlsx',
  'jpeg',
  'jpg',
  'png',
];

export const uploadFilesWrapper = (dispatch: Dispatch<any>, taskId: string) => {
  const uploadFilesInner = async (options: any) => {
    const { file } = await options;
    const fileData = new FormData();
    fileData.append('file', file);
    if (file) {
      dispatch(
        TaskFormSlice.createStorageFile({
          nameOriginal: file.name,
          file: fileData,
          taskId,
        }),
      );
    }
  };
  return uploadFilesInner;
};

export const beforeUploadWrapper = (storageCount: number | undefined) => {
  const beforeUploadInner = (file: RcFile) => {
    if (storageCount && storageCount >= 15) {
      alert('Максимальное кол-во файлов 15', 'error');
      return false;
    }

    const sizeFileBytes = file.size;
    if (sizeFileBytes > 52428800) {
      alert('Максимальный размер файла 50мб', 'error');
      return false;
    }

    const isValidFileType = validFileType(file);
    if (!isValidFileType) {
      alert(`Разрешенные форматы: ${acceptedFiles}`, 'error');
      return false;
    }
    return file;
  };
  return beforeUploadInner;
};
