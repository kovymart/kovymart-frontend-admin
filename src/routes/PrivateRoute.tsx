import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

export const PrivateRoute = ({
  children,
  ...rest
}: RouteProps): JSX.Element => {
  return (
    <Route
      {...rest}
      render={() => (children)}
    ></Route>
  );
};
