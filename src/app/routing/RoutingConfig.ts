import { AuthPage, TaskPage, TasksPage } from 'pages';
import { routes } from 'shared';
/* global JSX */

type RoutingConfigChildrenType = {
  element: () => JSX.Element;
  path?: string;
  index?: true;
  private?: true;
}[];
type RoutingConfigType = {
  path: string;
  element: () => JSX.Element;
  children?: RoutingConfigChildrenType;
  private?: true;
}[];

export const RoutingConfig: RoutingConfigType = [
  {
    path: routes.auth,
    element: AuthPage,
    children: [],
  },
  {
    path: routes.task,
    element: TaskPage,
    private: true,
    children: [],
  },
  {
    path: routes.tasks,
    element: TasksPage,
    private: true,
    children: [],
  },
];
