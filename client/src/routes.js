import React from 'react';
import { Switch, Redirect, Route, Router } from 'react-router-dom';
import Main from './Main';
import Profile from './components/Profile/Profile';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import Products from './components/products/products';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
        <Switch>
          <Route exact path="/" render={(props) => <Main auth={auth} {...props} />} />
          <Route exact path="/products" render={(props) => <Products auth={auth} {...props} />} />
          <Route path="/profile" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <Profile auth={auth} {...props} />
            )
          )} />
          <Route exact path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>        
        </Switch>
      </Router>
  );
}
