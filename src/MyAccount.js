import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import SocialLogin from './SocialLogin';

const styles = theme => ({
  form: {
    marginTop: theme.spacing.unit * 6,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
  },
  feedback: {
    marginTop: theme.spacing.unit * 2,
  },
});

class MyAccount extends React.Component {


  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <AppAppBar user={this.props.user} logout={this.props.logout}/>
        <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              My Account
            </Typography>
          </React.Fragment>
          <Grid container className={classes.form} spacing={16}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" gutterBottom marked="left" align="left">
                USERNAME
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom marked="left" align="left">
                {this.props.user.username}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.form} spacing={16}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" gutterBottom marked="left" align="left">
                ACTIVE LISTINGS
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom marked="left" align="left">
                {this.props.listings.length}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.form} spacing={16}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" gutterBottom marked="left" align="left">
                TOTAL RESERVATIONS
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom marked="left" align="left">
                {this.props.reservations.length}
              </Typography>
            </Grid>
          </Grid>
        </AppForm>
        <AppFooter />
      </React.Fragment>
    );
  }
}

MyAccount.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withRoot,
  withStyles(styles),
)(MyAccount);
