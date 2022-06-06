import { $apiTask, clientCookies } from 'shared';
import { TTaskItemResponse, TTaskWithRelation } from '../../entities';
import {
  attachCheckListProps,
  changeCheckListTitleProps,
  changeItemForChecklistProps, changePositionItemForChecklistProps,
  changeStatusItemForChecklistProps,
  createCheckListProps, deleteItemForChecklistProps,
  TCheckListResponse,
  TCreateItemForCheckListResponse, TTaskCheckListResponse,
} from './entities';

$apiTask.interceptors.request.use((config) => ({ ...config, headers: { ...config.headers, Authorization: `Bearer ${clientCookies.getToken()}` } }));

export const checkListService = {
  createChecklist: async ({ title }: createCheckListProps) =>
    $apiTask.post<TCheckListResponse>('/api/v1.0/check-list/check-lists', {
      title,
    }),
  changeChecklistTitle: async ({ checkListId, title }: changeCheckListTitleProps) =>
    $apiTask.post<TCheckListResponse>(`/api/v1.0/check-list/check-lists/${checkListId}/title-change`, {}, {
      params: {
        title,
      },
    }),
  createItemForChecklist: async (
    { checkListId, title: message, complete }:changeCheckListTitleProps) =>
    $apiTask.post<TCreateItemForCheckListResponse>(`/api/v1.0/check-list/check-lists/${checkListId}/items`, {
      message,
      complete,
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
    $apiTask.post<TTaskCheckListResponse>(`/api/v1.0/check-list/check-lists/${checkListId}/position-change`, {
      check_list_id: checkListId,
      check_list_item_id: checkListItemId,
      after_id: afterId,
    }),
  attachCheckList: async ({
    taskId,
    checkListId,
  }: attachCheckListProps) =>
    $apiTask.post<TTaskWithRelation>(`/api/v1.0/task/tasks/${taskId}/check-list-assign`, {
      check_list_id: checkListId,
    }),
  detachChecklist: async ({
    taskId,
    checkListId,
  }: attachCheckListProps) => $apiTask.post<TTaskItemResponse>(`/api/v1.0/task/tasks/${taskId}/check-list-un-assign`, {
    check_list_id: checkListId,
  }),
};
