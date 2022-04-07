import { RequestStatuses } from 'shared';

export type TUser = {
  user_id: number;
  name: string;
  logo?: string;
  permissions?: any[];
};

export type TUserState = {
  userInfo: TUser | null;
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
