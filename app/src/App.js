import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

import './index.css';
import * as actionCreators from './store/actions/index';

import Signup from './containers/Signup';
import Signin from './containers/Signin';
import Dashboard from './containers/Dashboard';
import Account from './containers/Account';
import Layout from './components/Layout';
import Bookings from './containers/Bookings';
import Calendar from './Calendar/Calendar';


const cookies = new Cookies();

class App extends Component {

  componentDidMount() {
    if(cookies.get('x-auth')) {
      this.props.user_autosignin();
    }
    if(Object.keys(this.props.user).length !== 0) {
      this.props.booking_all({userid: this.props.user._id});
    }
  }

  componentDidUpdate() {
    if(Object.keys(this.props.user).length !== 0) {
      this.props.booking_all({userid: this.props.user._id});
    }
  }

  render() {
    /* NON Authenticated Routes */
    let routes = (
      <Switch>
        <Route path='/signup' exact component={ Signup } /> 
        <Route path='/signin' exact component={ Signin } /> 
        <Route path='/calendar' exact component={ Calendar } />
        <Redirect to="/signin" /> 
      </Switch>
    );
    /* Authenticated Routes */
    if(this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/' exact component={ Dashboard } /> 
          <Route path='/bookings' exact component={ Bookings } /> 
          <Route path='/calendar' exact component={ Calendar } />
          <Route path='/account' exact component={ Account } />
          <Redirect to="/" /> 
        </Switch>
      );
    }

    return (
      <BrowserRouter>
        <Layout user_signout={ this.props.user_signout } >
          { routes }
        </Layout>
      </BrowserRouter>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    isAuth: state.user.auth.token,
    user: state.user.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    user_autosignin: () => dispatch(actionCreators.user_autosignin()),
    booking_all: (payload) => dispatch(actionCreators.booking_all(payload)),
    user_signout: () => dispatch(actionCreators.user_signout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
