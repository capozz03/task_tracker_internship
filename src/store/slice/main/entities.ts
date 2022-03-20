import { RequestStatuses } from 'shared';

export type TTodoType = { id: number; title: string };

export type TPosts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type TMainReducer = {
  todo: TTodoType[];
  status: RequestStatuses;
  posts: null | TPosts[];
  error: null | Error;
};
