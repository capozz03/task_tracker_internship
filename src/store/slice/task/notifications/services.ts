import { $apiTask, clientCookies } from 'shared';
import {
  TChangeViewerRequest, TNotificationsResponse, TNotifiesRequest,
} from 'store/slice/task/notifications/entities';

$apiTask.interceptors.request.use((config) => ({ ...config, headers: { ...config.headers, Authorization: `Bearer ${clientCookies.getToken()}` } }));

export const notificationServices = {
  getNotifications: (params: TNotifiesRequest) => $apiTask.get<TNotificationsResponse>('/api/v1.0/subscribe/notifies', {
    params,
  }),
  // TODO:: Описать возвращаемый тип данных
  changeViewedNotification: (data: TChangeViewerRequest) => $apiTask.post<{}>('/api/v1.0/subscribe/notifies/viewed-change', data),
};
