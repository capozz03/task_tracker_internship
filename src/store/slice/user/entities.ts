import { RequestStatuses } from 'shared';

export type TUser = {
  user_id: number;
  name: string;
  logo?: string;
  permissions?: any[];
};

export type TUserState = {
  userInfo: TUser | null;
  userId: string | null;
  token: string | null;
  status: RequestStatuses;
  error: Error | null;
};

export type TAuthResponse = {
  userId: string;
  data: {
    token: string;
  }
};

export type TAuthResponseError = {
  statusCode: number;
  error: string;
  message: string;
};
