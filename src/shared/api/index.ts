import axios, { AxiosRequestConfig } from 'axios';
import { clientCookies } from 'shared';

export function apiUrl() {
  const apiHost = 'https://swimlane-intership-group2.task.dev.tiny-services.ladcloud.ru/';
  return apiHost;
}

export const $api = axios.create({
  timeout: 10000,
  baseURL: apiUrl(),
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = clientCookies.getToken();

  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
