import { TTaskCheckList, TTaskCheckListItem } from '../../entities';

export type TCheckListResponse = {
  data: TTaskCheckList
}

export type TCreateItemForCheckListResponse = {
  data: TTaskCheckListItem
}

export type createCheckListProps = {
  title: string,
}

export type changeCheckListTitleProps = {
  checkListId: string,
  title: string,
  checkListItemId?: string,
  complete?: boolean,
}

export type changeItemForChecklistProps = {
  checkListId: string,
  checkListItemId: string,
  message: string,
}

export type TTaskCheckListResponse = {
  data: TTaskCheckList
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
  afterId: string | null
}

export type attachCheckListProps = {
  taskId: string;
  checkListId: string;
  message?: string;
}
