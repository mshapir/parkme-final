import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import NewListingForm from './NewListingForm';
import ListingCont from './ListingCont';
import ReservationCont from './ReservationCont';
import MyAccount from './MyAccount';
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
      this.props.history.push('/listings')
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
    }, () => this.props.history.push('/listings'))
  }

  updateReservations = (reservation) => {
    let reservations = [...this.state.reservations, reservation]
    this.setState({
      reservations
    })
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
      }, () => this.props.history.push('/sign-in'))
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

  openReservationsPage = () => {
    this.props.history.push('/reservations');
  }

  goToAccount = () => {
    this.props.history.push('/account');
  }

  render() {
    return (
      <div className="App">
        <Switch>
        <Route
        path='/reservations'
        render={() => (<ReservationCont reservations={this.state.reservations}  user={this.state.user} deleteReservation={this.deleteReservation} updateReviews={this.updateReviews} logout={this.handleLogout} goToAccount={this.goToAccount}/>)}
        />
        <Route
        path='/newlisting'
        render={() => (<NewListingForm updateListings={this.updateListings} user={this.state.user} logout={this.handleLogout} goToAccount={this.goToAccount}/>)}
        />
        <Route
        path='/listings'
        render={() => (<ListingCont updateReservations={this.updateReservations} user={this.state.user} listings={this.state.listings} logout={this.handleLogout} openReservationsPage={this.openReservationsPage} goToAccount={this.goToAccount}/>)}
        />
        <Route
          path='/sign-up'
          render={() => (<SignUp updateUser={this.updateUser} getCurrentUser={this.getCurrentUser} user={this.state.user} logout={this.handleLogout} goToAccount={this.goToAccount}/>)}
        />
        <Route
          path='/sign-in'
          render={() => (
          <div>
          <SignIn updateUser={this.updateUser} getCurrentUser={this.getCurrentUser} user={this.state.user} logout={this.handleLogout} goToAccount={this.goToAccount}/>
          </div> )}
        />
        <Route
          path='/account'
          render={() => (
          <div>
          <MyAccount user={this.state.user} listings={this.state.myListings} reservations={this.state.reservations}/>
          </div> )}
        />
        <Route
          path='/'
          render={() => (
          <div>
          <Home user={this.state.user} logout={this.handleLogout} goToAccount={this.goToAccount}/>
          </div> )}
        />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
