import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import UserMenu from '../../UserMenu';

const styles = theme => ({
  title: {
    fontSize: 24,
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    marginRight: 'auto'
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit * 3,
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

class AppAppBar extends React.Component {

  render(){
    const { classes } = this.props;
    console.log(this.props);
    return (
      <div>
      <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
      <div className={classes.left} />
      <Link
      variant="h6"
      underline="none"
      color="inherit"
      className={classes.title}
      href="/"
      >
      {'ParkMe'}
      </Link>
      <div className={classes.right} style={{ display: !this.props.user.id ? '' : 'none' }}>
      <Link
      color="inherit"
      variant="h6"
      underline="none"
      className={classes.rightLink}
      href="/sign-in"
      >
      {'Sign In'}
      </Link>
      <Link
      variant="h6"
      underline="none"
      className={classNames(classes.rightLink, classes.linkSecondary)}
      href="/sign-up"
      >
      {'Sign Up'}
      </Link>
      </div>
      <div className={classes.right} style={{ display: this.props.user.id ? '' : 'none' }}>
      <Link
      title='See all listings'
      color="inherit"
      variant="h6"
      underline="none"
      className={classes.rightLink}
      href="/listings"
      >
      {'Listings'}
      </Link>
      <Link
      title='See all Reserved Spots'
      variant="h6"
      underline="none"
      className={classNames(classes.rightLink)}
      href="/reservations"
      >
      {'Reservations'}
      </Link>
      <Link
      title='Create a listing'
      variant="h6"
      underline="none"
      className={classNames(classes.rightLink)}
      href="/newlisting"
      >
      {'Create'}
      </Link>
      <UserMenu user={this.props.user} styles={classes} logout={this.props.logout} goToAccount={this.props.goToAccount}/>
      </div>
      </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
      </div>
    );
  }

  }

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
