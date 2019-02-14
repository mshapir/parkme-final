import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import NewListingForm from './NewListingForm';
import {Route, Switch, withRouter} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
        <Route
        path='/newlisting'
        render={() => (<NewListingForm />)}
        />
        <Route
          path='/sign-up'
          render={() => (<SignUp />)}
        />
        <Route
          path='/sign-in'
          render={() => (
          <div>
          <SignIn />
          </div> )}
        />
        <Route
          path='/'
          render={() => (
          <div>
          <Home />
          </div> )}
        />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
