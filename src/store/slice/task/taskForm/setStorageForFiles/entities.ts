import { TStorageFiles, TTaskCheckListItem } from '../../entities';

export type TStorageFilesResponse = {
  data: TStorageFiles
}

export type TCreateItemForCheckListResponse = {
  data: TTaskCheckListItem
}

export type createStorageFileProps = {
  storageFileId?: string,
  nameOriginal: string,
  file?: any,
}

export type getStorageFileDetailsProps = {
  storageFileId: string,
}

export type changeItemForChecklistProps = {
  checkListId: string,
  checkListItemId: string,
  message: string,
}

export type changeStatusItemForChecklistProps = {
  checkListId: string,
  checkListItemId: string,
  complete: boolean
}

export type deleteItemForChecklistProps = {
  checkListId: string,
  checkListItemId: string
}

export type changePositionItemForChecklistProps ={
  checkListId: string,
  checkListItemId: string,
  afterId: string
}
