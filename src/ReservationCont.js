import withRoot from './modules/withRoot';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import AppAppBar from './modules/views/AppAppBar';
import ReservationCard from './ReservationCard';

class ReservationCont extends Component {

  render() {
    return (
      <React.Fragment>
      <AppAppBar user={this.props.user}/>
      <Grid container spacing={24} style={{padding: 24}}>
        {this.props.reservations.map(reservation => {
          return <Grid item  s={6} l={4} xl={3}>
              <ReservationCard reservation={reservation} deleteReservation={this.props.deleteReservation} user={this.props.user} updateReviews={this.props.updateReviews}/>
            </Grid>
        })}
      </Grid>
      </React.Fragment>
    );
  }

}

export default withRoot(ReservationCont);
