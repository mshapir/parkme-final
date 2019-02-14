import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LayoutBody from '../components/LayoutBody';
import Typography from '../components/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
  },
  layoutBody: {
    marginTop: theme.spacing.unit * 15,
    marginBottom: theme.spacing.unit * 30,
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `0px ${theme.spacing.unit * 5}px`,
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <LayoutBody className={classes.layoutBody} width="large">
        <img
          src={require("./theme/productCurvyLines.png")}
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={40}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={require("./theme/productValues1.svg")}
                alt="suitcase"
              />
              <Typography variant="h6" className={classes.title}>
                Ease
              </Typography>
              <Typography variant="h5">
                {'In just a few clicks, you can browse and book a parking spot reserved especially for you! Locals with vacant driveways, garages, or lots use ParkMe to help drivers like you make use of their space when it is available.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={require("./theme/productValues2.svg")}
                alt="graph"
              />
              <Typography variant="h6" className={classes.title}>
                Where you need it
              </Typography>
              <Typography variant="h5">
                {'Available in some of the busiest cities in the region, ParkMe is there where you need it! Search in any location across the tri-state area, from Manhattan to Jersey City.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={require("./theme/productValues3.svg")}
                alt="clock"
              />
              <Typography variant="h6" className={classes.title}>
                Exclusive parking
              </Typography>
              <Typography variant="h5">
                {'By registering, you will access parking spots only available to ParkMe users.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </LayoutBody>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
