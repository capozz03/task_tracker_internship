import { $apiTask, clientCookies } from 'shared';
import { TTaskCheckList } from '../../entities';
import {
  changeCheckListTitleProps,
  changeItemForChecklistProps, changePositionItemForChecklistProps,
  changeStatusItemForChecklistProps,
  createCheckListProps, deleteItemForChecklistProps,
  TCheckListResponse,
  TCreateItemForCheckListResponse,
} from './entities';

$apiTask.interceptors.request.use((config) => ({ ...config, headers: { ...config.headers, Authorization: `Bearer ${clientCookies.getToken()}` } }));

export const checkListService = {
  createChecklist: async ({ title }: createCheckListProps) =>
    $apiTask.post<TCheckListResponse>('/api/v1.0/check-list/check-lists', {
      title,
    }),
  changeChecklistTitle: async ({ checkListId, title }: changeCheckListTitleProps) =>
    $apiTask.post<TCheckListResponse>(`/api/v1.0/check-list/check-lists/${checkListId}/title-change`, {
      title,
    }),
  createItemForChecklist: async ({ checkListId, title: message }:changeCheckListTitleProps) =>
    $apiTask.post<TCreateItemForCheckListResponse>(`/api/v1.0/check-list/check-lists/${checkListId}/items`, {
      message,
    }),
  changeItemForChecklist: async ({
    checkListId,
    checkListItemId,
    message,
  }: changeItemForChecklistProps) =>
    $apiTask.post<TCreateItemForCheckListResponse>(`/api/v1.0/check-list/check-lists/${checkListId}/items/${checkListItemId}/message-change`, {
      message,
    }),
  changeStatusItemForChecklist: async (
    { checkListId, checkListItemId, complete }: changeStatusItemForChecklistProps) =>
    $apiTask.post<TCreateItemForCheckListResponse>(`/api/v1.0/check-list/check-lists/${checkListId}/items/${checkListItemId}/complete-change`, {
      complete,
    }),
  deleteItemForChecklist: async (
    {
      checkListId,
      checkListItemId,
    }: deleteItemForChecklistProps) =>
    $apiTask.delete<TCreateItemForCheckListResponse>(`/api/v1.0/check-list/check-lists/${checkListId}/items/${checkListItemId}`),
  changePositionItemForChecklist: async ({
    checkListId,
    checkListItemId,
    afterId,
  }: changePositionItemForChecklistProps) =>
    $apiTask.post<TTaskCheckList>(`/api/v1.0/check-list/check-lists/${checkListId}/position-change`, {
      checkListItemId,
      afterId,
    }),
};
