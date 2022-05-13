import { $apiTask, clientCookies } from 'shared';
import {
  TAddOrRemoveSubscribeResponse,
  TAddSubscribeRequest, TChangeViewerRequest, TNotificationsResponse, TNotifiesRequest,
  TSubscribeListResponse,
} from 'store/slice/task/notifications/entities';

$apiTask.interceptors.request.use((config) => ({ ...config, headers: { ...config.headers, Authorization: `Bearer ${clientCookies.getToken()}` } }));

export const notificationServices = {
  getSubscribe: () => $apiTask.get<TSubscribeListResponse>('/api/v1.0/subscribe/subscribes'),
  addSubscribe: (data: TAddSubscribeRequest) => $apiTask.post<TAddOrRemoveSubscribeResponse>('/api/v1.0/subscribe/subscribes', data),
  removeSubscribe: (subscribeId: string) => $apiTask.delete<TAddOrRemoveSubscribeResponse>(`/api/v1.0/subscribe/subscribes/${subscribeId}`),
  getNotifications: (params: TNotifiesRequest) => $apiTask.get<TNotificationsResponse>('/api/v1.0/subscribe/notifies', {
    params,
  }),
  // TODO:: Описать возвращаемый тип данных
  changeViewedNotification: (data: TChangeViewerRequest) => $apiTask.post('/api/v1.0/subscribe/notifies/viewed-change', data),
};
