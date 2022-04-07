import { RequestStatuses } from 'shared';

export type TUser = {
  user_id: number;
  name: string;
  logo?: string;
};

export type TUserState = {
  token: string | null;
  status: RequestStatuses;
  error: Error | null;
};

export type TAuthResponse = {
  token: string;
};

export type TAuthResponseError = {
  statusCode: number;
  error: string;
  message: string;
};
