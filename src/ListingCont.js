import withRoot from './modules/withRoot';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import AppAppBar from './modules/views/AppAppBar';
import ListingCard from './ListingCard';

class ListingCont extends Component {

  render() {
    return (
      <React.Fragment>
      <AppAppBar user={this.props.user} logout={this.props.logout} goToAccount={this.props.goToAccount}/>
      <Grid container spacing={24} style={{padding: 24}}>
        {this.props.listings.map(listing => {
          return <Grid item  s={6} l={4} xl={3}>
              <ListingCard listing={listing} updateReservations={this.props.updateReservations} user={this.props.user} openReservationsPage={this.props.openReservationsPage} />
            </Grid>
        })}
      </Grid>
      </React.Fragment>
    );
  }

}

export default withRoot(ListingCont);
