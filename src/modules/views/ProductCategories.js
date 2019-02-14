import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import LayoutBody from '../components/LayoutBody';
import Typography from '../components/Typography';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 4,
  },
  images: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
    {
      url:
        'https://bobridgesgallery.com/wp-content/uploads/2017/06/Lower-Manhattan.jpg',
      title: 'Manhattan',
      width: '40%',
    },
    {
      url:
        'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2018/05/04/105185220-SouthBronx.1.720x405.JPG',
      title: 'Bronx',
      width: '20%',
    },
    {
      url:
        'https://www.gannett-cdn.com/-mm-/9a34f53d72d82ec195f239ad6952a7308ddcca3a/c=0-135-2118-1332/local/-/media/2018/07/28/USATODAY/USATODAY/636683395229527947-GettyImages-496266816.jpg?width=3200&height=1680&fit=crop',
      title: 'Brooklyn',
      width: '40%',
    },
    {
      url:
        'https://dreamsinheels.com/wp-content/uploads/2015/09/views-queens-borough-new-york-nyc-queensboro-bridge-Long-Island-City.jpg',
      title: 'Queens',
      width: '38%',
    },
    {
      url:
        'https://imgs.6sqft.com/wp-content/uploads/2016/07/15110941/NewYorkWheel_1.jpg',
      title: 'Staten Island',
      width: '38%',
    },
    {
      url:
        'https://static1.squarespace.com/static/585c0b2015d5db11eda25f32/t/5a1e735d0d92971bbc86a1f5/1511945054728/sohomd-jersey-city.jpg?format=1500w',
      title: 'Jersey City',
      width: '24%',
    },
    {
      url:
        'https://assets.visitphilly.com/wp-content/uploads/2018/03/Philadelphia-Pass-Loews-Skyline-C.Smyth2200x1237-1024x576.jpg',
      title: 'Philadelphia',
      width: '40%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1533727937480-da3a97967e95?auto=format&fit=crop&w=400&q=80',
      title: 'Bridgeport',
      width: '20%',
    },
    {
      url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZdHpCbe_x-J0nIbcv6QthnSQOj5Sz7L446llL8cfDkD3fUtzTVw',
      title: 'Long Island City',
      width: '40%',
    },
  ];

  return (
    <LayoutBody className={classes.root} component="section" width="large">
      <Typography variant="h4" marked="center" align="center" component="h2">
        Wherever you drive
      </Typography>
      <div className={classes.images}>
        {images.map(image => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </LayoutBody>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);
