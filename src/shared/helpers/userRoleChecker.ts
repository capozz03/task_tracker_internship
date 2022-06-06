import { TStateData } from 'store/slice/task/taskForm/roles/entities';

export const isAuthor = (userId: string | null, roles: TStateData | null) => (
  userId === roles?.author?.userId
);

export const isResponsible = (userId: string | null, roles: TStateData | null) => (
  roles?.responsible.filter((user) => user.userId === userId).length !== 0
);

export const isObserver = (userId: string | null, roles: TStateData | null) => (
  roles?.observers.filter((user) => user.userId === userId).length !== 0
);

export const isPerformer = (userId: string | null, roles: TStateData | null) => (
  roles?.performers.filter((user) => user.userId === userId).length !== 0
);
