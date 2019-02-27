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

class NewListingForm extends React.Component {
  state = {
    sent: false,
  };

  validate = values => {
    const errors = required(['price', 'location', 'title', 'description', 'image'], values, this.props);

    // if (!errors.email) {
    //   const emailError = email(values.email, values, this.props);
    //   if (emailError) {
    //     errors.email = email(values.email, values, this.props);
    //   }
    // }

    return errors;
  };

  handleSubmit = values => {
    let token = localStorage.getItem("token")
    fetch('http://localhost:3001/api/v1/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      body: JSON.stringify({
        title: values.title,
        price: values.price,
        location: values.location,
        description: values.description,
        image: values.image,
        user_id: this.props.user.id
      })
    })
    .then(r => r.json())
    .then(data => {
      if (data.hasOwnProperty('errors')) {
        alert(`${data.errors}`)
      } else {
        alert(`Created ${data.title}`)
        this.props.updateListings(data)
      }
    })
  }


  render() {
    const { classes } = this.props;
    const { sent } = this.state;

    return (
      <React.Fragment>
        <AppAppBar user={this.props.user} logout={this.props.logout} goToAccount={this.props.goToAccount}/>
        <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Create a new listing
            </Typography>
          </React.Fragment>
          <Form
            onSubmit={this.handleSubmit}
            subscription={{ submitting: true }}
            validate={this.validate}
          >
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      fullWidth
                      component={RFTextField}
                      required
                      name="price"
                      label="Price"
                      type="number"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      fullWidth
                      component={RFTextField}
                      required
                      name="location"
                      label="Location"
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <Field
                autoFocus
                component={RFTextField}
                autoComplete="fname"
                fullWidth
                label="Title"
                name="title"
                required
                />
                <Field
                  component={RFTextField}
                  fullWidth
                  label="Description"
                  margin="normal"
                  name="description"
                  required
                />
                <Field
                  component={RFTextField}
                  autoComplete="lname"
                  fullWidth
                  label="Image Url"
                  name="image"
                  required
                />
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <FormButton
                  className={classes.button}
                  disabled={submitting || sent}
                  color="secondary"
                  fullWidth
                >
                  {submitting || sent ? 'In progress…' : 'Create'}
                </FormButton>
              </form>
            )}
          </Form>
        </AppForm>
        <AppFooter />
      </React.Fragment>
    );
  }
}

NewListingForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withRoot,
  withStyles(styles),
)(NewListingForm);
