// Im still workin on this page

import React from 'react';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';

// import FormButton from 'semantic-ui-react';


// const type = [
//   {
//     value: 0,
//     label: 'Condo',
//   },
//   {
//     value: 1,
//     label: 'Strata',
//   },
//   {
//     value: 2,
//     label: 'Rental',
//   },
//   {
//     value: 3,
//     label: 'Fob',
//   },
// ];

export default class AddPropertyForm extends React.Component {
  
// state
state = {
  formData: {
    city: '',
    propType: '',
    propName: '',
    propAddr: '',
    postalCode: '',
  },
  submitted: false,
};

componentDidMount() {
  // checking if postal code is valid
  ValidatorForm.addValidationRule('isPostalCodeValid', (value) => {
    const { formData } = this.state;
    if (value.postalCode !== "^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]●?[0-9][A-Z][0-9]$"){
      return false;
    }
      return true;
  });
}

handleChange = (event) => {
  const { formData } = this.state;
  formData[event.target.name] = event.target.value;
  this.setState({ formData });
};

handleSubmit = () => {
  this.setState({ submitted: true }, () => {
    setTimeout(() => this.setState({ submitted: false }), 5000);
  });
};
  
render() {
  // ------------------------------------- Add Property Form -------------------------------------------
  const { formData, submitted } = this.state;
  return (
    <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
      <div style={{ marginTop: 10, padding: 20 }}>
      <h1 class = "ui horizontal divider header"> Create Property</h1> 
      
      <TextValidator
        label="City"
        onChange={this.handleChange}
        name="city"
        value={formData.city}
        validators={['required']}
        errorMessages={['this field is required']}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextValidator
        label="Property Type"
        onChange={this.handleChange}
        name="propType"
        value={formData.propType}
        validators={['required']}
        errorMessages={['this field is required']}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextValidator
        label="Property Name"
        onChange={this.handleChange}
        name="propName"
        value={formData.propName}
        validators={['required']}
        errorMessages={['this field is required']}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextValidator
        label="Property Address"
        onChange={this.handleChange}
        name="propAddr"
        value={formData.propAddr}
        validators={['required']}
        errorMessages={['this field is required']}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextValidator
        label="Postal Code"
        onChange={this.handleChange}
        name="postalCode"
        value={formData.postalCode}
        validators={['required', 'isPostalCodeValid']}
        errorMessages={['this field is required', 'postal code is not valid']}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        name="comment"
        label="Additional Comment"
        onChange={this.handleChange}
        hintText="Additional Comment"
        fullWidth
        multiline
        rows="4"
        margin="normal"
        variant="outlined"
      />
      <br />

      <Button type="submit" variant="contained" color="primary" disabled={submitted}>
      {(submitted && 'Your form is submitted!') || (!submitted && 'Submit')}
      </Button>      
      </div>
    </ValidatorForm>
    );
  }
}