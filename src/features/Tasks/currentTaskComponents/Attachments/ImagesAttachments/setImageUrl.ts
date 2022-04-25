import { TStorageFiles } from 'store/slice/task/entities';

type TModifications = TStorageFiles[]

export const setImageUrl = (modifications: TModifications) => {
  const defaultImage = 'https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg';
  const imagePreview = modifications.length > 0
    ? `${process.env.REACT_APP_TASK_BACKEND_URL}/api/v1.0/storage/files/${modifications[0].storage_file_id}/download`
    : defaultImage;
  return imagePreview;
};
