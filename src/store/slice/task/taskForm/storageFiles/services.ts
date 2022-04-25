import { $apiTask, clientCookies } from 'shared';
import { TTaskWithRelationStorage } from '../../entities';
import {
  getStorageFileDetailsProps,
  createStorageFileProps,
  TStorageFilesResponse,
  uploadStorageFileProps,
  attachFileDetailsProps,
  detachFileDetailsProps,
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
    $apiTask.get(`/api/v1.0/storage/files/${storageFileId}`),
  uploadStorageFile: async ({ storageFileId, file }: uploadStorageFileProps) =>
    $apiTask.post<TStorageFilesResponse>(`/api/v1.0/storage/files/${storageFileId}/upload`, file, {
      headers: { 'content-type': 'multipart/form-data' },
    }),
  downloadStorageFile: async ({ storageFileId }: getStorageFileDetailsProps) =>
    $apiTask.get<TStorageFilesResponse>(`/api/v1.0/storage/files/${storageFileId}/download`, {
      headers: { accept: 'application/json' },
    }),
  attachStorageFileToTask: async ({ taskId, storageFileId }: attachFileDetailsProps) =>
    $apiTask.post<TTaskWithRelationStorage>(`/api/v1.0/task/tasks/${taskId}/storage-file-assign`, {
      storage_file_id: storageFileId,
    }),
  detachStorageFileToTask: async ({ taskId, storageFileId }: detachFileDetailsProps) =>
    $apiTask.post<TTaskWithRelationStorage>(
      `/api/v1.0/task/tasks/${taskId}/storage-file-un-assign`,
      { storage_file_id: storageFileId },
    ),
};
