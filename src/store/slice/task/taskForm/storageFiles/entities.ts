import { TStorageFiles } from '../../entities';

export type TStorageFilesResponse = {
  data: TStorageFiles
}

export type TStorageFilesDownloadResponse = {
  data: TStorageFiles,
}

export type createStorageFileProps = {
  storageFileId?: string,
  nameOriginal: string,
  file?: any,
  taskId?: string,
}

export type uploadStorageFileProps = {
  storageFileId: string,
  file: any,
}

export type getStorageFileDetailsProps = {
  storageFileId: string,
}

export type attachFileDetailsProps = {
  taskId: string,
  storageFileId: string,
}

export type detachFileDetailsProps = {
  taskId: string,
  storageFileId: string,
  nameOriginal: string,
}
