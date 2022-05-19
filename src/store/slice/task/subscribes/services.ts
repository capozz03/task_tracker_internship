import { $apiTask, clientCookies } from 'shared';
import {
  TAddOrRemoveSubscribeResponse,
  TAddSubscribeRequest,
  TSubscribeListResponse, TSubscribesProps,
} from './entities';

$apiTask.interceptors.request.use((config) => ({ ...config, headers: { ...config.headers, Authorization: `Bearer ${clientCookies.getToken()}` } }));

export const subscribeServices = {
  getSubscribe: (params: TSubscribesProps) => $apiTask.get<TSubscribeListResponse>('/api/v1.0/subscribe/subscribes', {
    params,
  }),
  addSubscribe: (data: TAddSubscribeRequest) => $apiTask.post<TAddOrRemoveSubscribeResponse>('/api/v1.0/subscribe/subscribes', data),
  removeSubscribe: (subscribeId: string) => $apiTask.delete<TAddOrRemoveSubscribeResponse>(`/api/v1.0/subscribe/subscribes/${subscribeId}`),
};
