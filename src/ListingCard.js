import withRoot from './modules/withRoot';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TimeToLeaveIcon from '@material-ui/icons/TimeToLeave';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import red from '@material-ui/core/colors/red';
import theme from './modules/theme';

const styles = theme => ({
  card: {
    maxWidth: 300,
    maxHeight: 600,
    minWidth: 300,
    minHeight: 300,
    padding: '10px',
    margin: '10px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class ListingCard extends Component {

  state = {
    expanded: false
  };



  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };


  bookListing = (listing) => {
    let token = localStorage.getItem("token")
    fetch('http://localhost:3001/api/v1/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      body: JSON.stringify({
        listing_id: listing.id,
        user_id: this.props.user.id
      })
    })
    .then(r => r.json())
    .then(data => {
      alert(`You Booked ${listing.title}`)
      this.props.updateReservations(data)
    })
  };


  render() {
    const { classes } = this.props;
    console.log(this.props.user.id);
    return (
      <div style={{ display: 'inline-flex', paddingLeft: '25px', height: '100%' }}>
      <Card className={classes.card}>
        <CardHeader
          title={this.props.listing.title}
          subheader={`${this.props.listing.location} - $${this.props.listing.price}`}
        />
        <CardMedia
          className={classes.media}
          image={this.props.listing.image}
          title={this.props.listing.title}
        />
        <CardContent>
          <Typography component="p">
            {this.props.listing.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Book" title='Click to Reserve' onClick={() => this.bookListing(this.props.listing)}>
            <TimeToLeaveIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Reviews</Typography>
            <Typography paragraph>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      </div>
    );
  }
}

ListingCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRoot(ListingCard));




// {this.props.listing.reviews.map(review => {
//   return <Reviews key={review.id} review={review} />
// })}
