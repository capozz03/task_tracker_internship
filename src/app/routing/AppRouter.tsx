/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivatePageHOC } from './PrivatePageHOC';
import { RoutingConfig } from './RoutingConfig';

export const AppRouter = () => (
  <Routes>
    {RoutingConfig.map((el, i) => {
      if (el.children?.length) {
        return (
          <Route key={i} path={el.path} element={el.element()}>
            {el.children.map((child, childIndex) => {
              if (child.index) {
                if (child.private) {
                  return (
                    <Route
                      key={childIndex}
                      index
                      element={<PrivatePageHOC>{child.element()}</PrivatePageHOC>}
                    />
                  );
                }
                return <Route key={childIndex} index element={child.element()} />;
              }
              if (child.private) {
                return (
                  <Route
                    key={childIndex}
                    path={child.path}
                    element={<PrivatePageHOC>{child.element()}</PrivatePageHOC>}
                  />
                );
              }
              return <Route key={childIndex} path={child.path} element={child.element()} />;
            })}
          </Route>
        );
      }
      if (el.private) {
        return (
          <Route key={i} path={el.path} element={<PrivatePageHOC>{el.element()}</PrivatePageHOC>} />
        );
      }
      return <Route key={i} path={el.path} element={el.element()} />;
    })}
  </Routes>
);
