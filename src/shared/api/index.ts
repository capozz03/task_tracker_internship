import axios, { AxiosRequestConfig } from 'axios';
import { clientCookies } from 'shared';

export function apiUrl() {
  const apiHost = 'https://mock.dev.tiny-services.ladcloud.ru/';
  return apiHost;
}

export function apiUrlTasks() {
  return 'https://swimlane-intership-group2.task.dev.tiny-services.ladcloud.ru/';
}

export const $api = axios.create({
  timeout: 10000,
  baseURL: apiUrl(),
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
});

export const $apiTask = axios.create({
  timeout: 10000,
  baseURL: apiUrlTasks(),
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
