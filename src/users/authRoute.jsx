import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({
  path,
  exact,
  username,
  component: Component,
  ...args
}) => {
  const isExact = exact || false;
  const View = (props) => { // must have props in order to receive route history.
    if (username) {
      return <Component {...args} {...props}/>;
    }
    return <Redirect to='/' />;
  };
  return (
    <Route exact={isExact} path={path} component={View} />
  );
};
export default AuthRoute;
