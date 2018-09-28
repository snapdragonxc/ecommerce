import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RedirectRoute = ({
  path,
  username,
  component: Component,
  ...args
}) => {
  const View = (props) => { // must have props in order to receive route history.
    if (username) {
      return <Redirect to='/dashboard/products'/>;
    }
    return <Component {...args} {...props}/>;
  };
  return <Route path={path} component={View} />;
};
export default RedirectRoute;
