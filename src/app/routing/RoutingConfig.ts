import { AuthPage, TasksPage } from 'pages';
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
    path: routes.main,
    element: TasksPage,
    private: true,
    children: [],
  },
  {
    path: routes.auth,
    element: AuthPage,
    children: [],
  },
];
