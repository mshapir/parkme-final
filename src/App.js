import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import NewListingForm from './NewListingForm';
import ListingCont from './ListingCont';
import {Route, Switch, withRouter} from 'react-router-dom';


class App extends Component {
  state={
    listings: [],
    user: [],
    isLoggedIn: false,
    reservations: [],
    myListings: []
  }

  componentDidMount(){
      this.getCurrentUser()
      this.fetchAllListings()
  }


  updateUser = (user) => {
    this.setState({
      user: user,
      isLoggedIn: true
    }, () =>  {
      this.fetchAllListings()
      this.getReservations()
      this.getMyListings()
      this.props.history.push('/home')
    })
  }

  updateReviews = () => {
    this.fetchAllListings()
    this.props.history.push('/home')
  }

  updateListings = (listing) => {
    let listings = [...this.state.listings, listing]
    this.setState({
      listings
    }, () => this.props.history.push('/home'))
  }

  updateReservations = (reservation) => {
    let reservations = [...this.state.reservations, reservation]
    this.setState({
      reservations
    }, () => this.props.history.push('/reservations'))
  }

  deleteReservation = (reservationObj) => {
    let reservations = [...this.state.reservations].filter(reservation => reservation !== reservationObj)
    this.setState({
      reservations
    })
  }


  getCurrentUser = () => {
    let token = localStorage.getItem("token")
    return fetch('http://localhost:3001/api/v1/users/current_user',{
      method: 'POST',
      headers: {
        Authorization: `${token}`
      }
    })
    .then(r => r.json())
    .then(data => {
        this.setState({
          user: data
        }, () => {
          this.getReservations()
          this.getMyListings()
        })
    })
  }

  handleLogout = (e) => {
    localStorage.clear()
      this.setState({
        user: [],
        isLoggedIn: false
      }, () => this.props.history.push('/login'))
  }

  getMyListings = () => {
    let token = localStorage.getItem("token")
    fetch(`http://localhost:3001/api/v1/users/${this.state.user.id}/listings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })
    .then(r => r.json())
    .then(data => {
      this.setState({
        myListings: data
      })
    })
  }

  getReservations = () => {
    let token = localStorage.getItem("token")
    fetch(`http://localhost:3001/api/v1/users/${this.state.user.id}/reservations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })
    .then(r => r.json())
    .then(data => {
      this.setState({
        reservations: data
      })
    })
  }

  fetchAllListings = () => {
    let token = localStorage.getItem("token")
    return fetch('http://localhost:3001/api/v1/listings/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })
    .then(r => r.json())
    .then(data => {
      this.setState({
        listings: data
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Switch>
        <Route
        path='/newlisting'
        render={() => (<NewListingForm user={this.state.user}/>)}
        />
        <Route
        path='/listings'
        render={() => (<ListingCont user={this.state.user} listings={this.state.listings}/>)}
        />
        <Route
          path='/sign-up'
          render={() => (<SignUp updateUser={this.updateUser} getCurrentUser={this.getCurrentUser} user={this.state.user}/>)}
        />
        <Route
          path='/sign-in'
          render={() => (
          <div>
          <SignIn updateUser={this.updateUser} getCurrentUser={this.getCurrentUser} user={this.state.user}/>
          </div> )}
        />
        <Route
          path='/'
          render={() => (
          <div>
          <Home user={this.state.user}/>
          </div> )}
        />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
