// Im still workin on this page

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = withStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    flexBasis: 200,
  },
  button: {
    margin: theme.spacing(5),
  },
  input: {
    display: 'none',
  },
}));

function AddPropertyForm() {
  const classes = withStyles();
  const [values, setValues] = React.useState({
    // amount: '',
    // password: '',
    // weight: '',
    // weightRange: '',
    // showPassword: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const propType = [
    {
      label: 'Strata',
    },
    {
      label: 'Rental',
    },
    {
      label: 'Saundry',
    },
  ];


  return (
      <div style={{ marginTop: 10, padding: 20 }}>
      <h1 class = "ui horizontal divider header"> Create Property</h1> 
      
      <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="city"
        label="City"
        fullWidth
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="propType"
        select
        label="Property Type"
        fullWidth
        value={values.propType}
        onChange={handleChange('propType')}
        SelectProps={{
          native: true,
          MenuProps: {
            className: classes.menu,
          },
        }}
        className={classes.textField}
        margin="normal"
        variant="outlined"
      >
        {propType.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField> 
      <TextField
        id="propName"
        label="Poperty Name"
        fullWidth
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="propAddress"
        label="Property Address"
        fullWidth
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="propAddress"
        label="Postal Code"
        fullWidth
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="comment"
        label="Additional Comments"
        fullWidth
        multiline
        rows="4"
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
    <Button variant="contained" color="primary" className={classes.button}>
        Submit
    </Button>      
    </form>
    </div>
  );
}

export default useStyles(AddPropertyForm);