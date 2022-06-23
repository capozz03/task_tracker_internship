import { TPagination } from 'store/slice/task/entities';
import { TCommandCode } from 'store/slice/task/history/entities';
import { RequestStatuses } from 'shared';

type TRelationType = 'task' | 'storage' | 'check-list'

export type TSubscribe = {
  subscribe_id: string;
  command_code: string | null;
  relation_type: TRelationType;
  relation_id: string;
  created: string;
}

export type TSubscribeReducer = {
  subscribes: TSubscribe[];
  pagination: TPagination;
  status: RequestStatuses;
  error: null | Error;
}

export type TSubscribeListResponse = {
  pagination: TPagination,
  data: TSubscribe[]
}

export type TSubscribesProps = {
  command_code?: TCommandCode;
  relation_type: TRelationType;
  relation_id: string;
  page?: number;
  per_page?: number;
}

export type TWebHook = {
  url: string;
  method: 'POST' | 'GET';
}

export type TNotifiesForSubscribe = {
  web_hook?: TWebHook;
  me?: true;
}

export type TAddSubscribeRequest = {
  notifies: TNotifiesForSubscribe;
  command_code?: TCommandCode,
  relation_type: TRelationType,
  relation_id: string
}

export type TAddOrRemoveSubscribeResponse = {
  data: TSubscribe;
}
