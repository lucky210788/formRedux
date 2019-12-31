import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const LoginRoute = ({component: Component, isLogIn, onLogIn, ...rest}) => (
  <Route {...rest} render={matchProps => {
    if (isLogIn) {
      return <Redirect to="/"/>
    } else {
      return <Component onLogIn={onLogIn} {...matchProps}/>
    }
  }
  }/>
);

export default LoginRoute;