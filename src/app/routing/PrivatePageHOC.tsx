/* eslint-disable no-unused-vars */
import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { clientCookies, routes } from 'shared';

export const PrivatePageHOC: FC<{ children: React.ReactElement }> = ({ children }) => {
  const token = clientCookies.getToken();
  if (!token) {
    return <Navigate to={routes.auth} />;
  }
  return children;
};
