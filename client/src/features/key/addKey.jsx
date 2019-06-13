import React from 'react';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';

export default class AddKeyForm extends React.Component {

// state
state = {
  formData: {
    address: '',
    city: '',
    storageLocation: '',
    keyQuantity: '',
    keyType: '',
  },
  submitted: false,
};

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

  // handleSubmit = event => {
  //   event.preventDefault();
  //   const isValid = this.validate();
  //   if (isValid) {
  //     console.log(this.state);
  //     // clear the form
  //     this.setState(initialState);
  //   }    
  // };

  render() {
    const { formData, submitted } = this.state;
    return(
      <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
        <div style={{ marginTop: 10, padding: 20 }}>
        <h1 class = "ui horizontal divider header"> Create Key</h1> 

        <TextValidator
          label='Address'
          onChange={this.handleChange}
          name='address'
          value={formData.address}
          validators={['required']}
          errorMessages={['this field is required']}
          fullWidth
          margin='normal'
          variant='outlined'
        />
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
          label='Storage Location'
          onChange={this.handleChange}
          name='storageLocation'
          value={formData.storageLocation}
          validators={['required']}
          errorMessages={['this field is required']}
          fullWidth
          margin='normal'
          variant='outlined'
        />
        <TextValidator
          label="Key Quantity"
          onChange={this.handleChange}
          name="keyQuantity"
          type="number"
          value={formData.keyQuantity}
          validators={['required']}
          errorMessages={['this field is required']}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextValidator
          label="Key Type"
          onChange={this.handleChange}
          name="keyType"
          value={formData.keyType}
          validators={['required']}
          errorMessages={['this field is required']}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" disabled={submitted}>
        {(submitted && 'Your form is submitted!') || (!submitted && 'Submit')}
        </Button>   
      </div>
    </ValidatorForm>
    );
  }
}