import { $apiTask, clientCookies } from 'shared';
import {
  getStorageFileDetailsProps,
  createStorageFileProps,
  TCreateItemForCheckListResponse,
  TStorageFilesResponse,
} from './entities';

$apiTask.interceptors.request.use((config) => ({
  ...config,
  headers: { ...config.headers, Authorization: `Bearer ${clientCookies.getToken()}` },
}));

export const storageFilesSlice = {
  createStorageFile: async ({ nameOriginal }: createStorageFileProps) =>
    $apiTask.post<TStorageFilesResponse>('/api/v1.0/storage/files', {
      name_original: nameOriginal,
    }),
  getStorageFileDetails: async ({ storageFileId }: getStorageFileDetailsProps) =>
    $apiTask.get<TStorageFilesResponse>(`/api/v1.0/storage/files/${storageFileId}`),
  uploadStorageFile: async ({ storageFileId, file }: createStorageFileProps) =>
    $apiTask.post<TCreateItemForCheckListResponse>(
      `/api/v1.0/storage/files/${storageFileId}/upload`,
      file,
      { headers: { 'content-type': 'multipart/form-data' } },
    ),
  downloadStorageFile: async ({ storageFileId }: getStorageFileDetailsProps) =>
    $apiTask.post<TCreateItemForCheckListResponse>(
      `/api/v1.0/storage/files/${storageFileId}/download`,
    ),
};
