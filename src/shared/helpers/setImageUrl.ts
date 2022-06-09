import { TStorageFiles } from 'store/slice/task/entities';

export type TCarouselImages = {
  idCurrent: number;
  id: string;
  name: string;
  img: string;
};

export const setImageUrl = (storageFileId: string) => {
  const imagePreview = `${process.env.REACT_APP_TASK_BACKEND_URL}/api/v1.0/storage/files/${storageFileId}/download`;
  return imagePreview;
};

export const setCarouselImages = (
  storageImages: TStorageFiles[] | undefined,
): TCarouselImages[] | undefined => {
  if (storageImages) {
    const result = storageImages.map(
      ({ storage_file_id: storageFileId, name_original: nameOriginal }, index) => {
        const url = setImageUrl(storageFileId);
        const res = { id: storageFileId, name: nameOriginal, img: url };
        return {
          idCurrent: index,
          ...res,
        };
      },
    );
    return result;
  }
};
