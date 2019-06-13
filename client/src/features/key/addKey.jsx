<<<<<<< HEAD
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
=======
import React from "react";
import { withStyles, responsiveFontSizes } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PrintQRCode from "./PrintQRCode";

const useStyles = withStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    flexBasis: 200
  },
  button: {
    margin: theme.spacing(10)
  },
  input: {
    display: "none"
  }
}));

function AddKeyForm() {
  const classes = withStyles();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
    showQR: false
  });

  const submit = () => {
    setValues({ showQR: true });
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  if (!values.showQR) {
    return (
      <div style={{ marginTop: 10, padding: 20 }}>
        <Grid container spacing={40} justify="center">
          <h1 class="ui horizontal divider header"> Create Key</h1>
          <TextField
            id="address"
            label="Address"
            fullWidth
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="city"
            label="City"
            fullWidth
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="storageLoc"
            label="Storage Location"
            fullWidth
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="keyQuantity"
            label="Key Quantity"
            fullWidth
            onChange={handleChange("quantity")}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="keyType"
            label="Key Type"
            fullWidth
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={submit}
        >
          Submit
        </Button>
      </div>
    );
  } else {
    return <PrintQRCode />;
  }
}
export default useStyles(AddKeyForm);
>>>>>>> 96c4bea1140016e71afb102c8d1d784cf138e375
