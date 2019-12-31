import React, {Fragment, Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import LoginRoute from '../Routes/LoginRoute/LoginRoute';
import PrivateRoute from '../Routes/PrivateRoute/PrivateRoute';
import Login from '../Pages/Login/Login';
import Cookies from "universal-cookie";
import Home from '../Pages/Home/Home';
import Contacts from '../Pages/Contacts/Contacts';
import Posts from '../Pages/Posts/Posts';
import NotFound from '../Pages/NotFound/NotFound';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logIn} from '../../actions/actionCreator';

import './Reset.scss';

const cookies = new Cookies();

class App extends Component {
  onLogIn = () => {
    const {logIn} = this.props;
    logIn(true);
  };

  onLogOut = () => {
    cookies.remove('token');
    const {logIn} = this.props;
    logIn(false);
  };

  componentDidMount() {
    const token = cookies.get('token');
    if (token) {
      this.onLogIn();
    }
  }

  render() {
    const {isLogIn} = this.props;

    return (
      <Fragment>
        <div>
          <Switch>
            <LoginRoute
              exact
              path="/login"
              component={Login}
              isLogIn={isLogIn}
              onLogIn={this.onLogIn}/>
            <PrivateRoute
              exact
              path="/"
              component={Home}
              isLogIn={isLogIn}
              onLogOut={this.onLogOut}/>
            <PrivateRoute
              exact
              path="/contacts"
              component={Contacts}
              isLogIn={isLogIn}
              onLogOut={this.onLogOut}/>
            <PrivateRoute
              exact
              path="/posts"
              component={Posts}
              isLogIn={isLogIn}
              onLogOut={this.onLogOut}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({logIn: {isLogIn}}) {
  return {
    isLogIn
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logIn
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);