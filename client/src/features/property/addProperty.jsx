// Im still workin on this page


// import React from 'react'
// import 'semantic-ui-css/semantic.min.css';
// import { Form, Grid } from 'semantic-ui-react'

// const AddPropertyForm = () => (

// <div class="ui container segment"> 
//   <Form>
//     <Form.Field label='Property Name' control='input' />
//     <Form.Field label='Property Address' control='input' />
//   <Form.Group widths='equal'>
//     <Form.Field label='Key Location' control='input' />
//     <Form.Field label='Key Quantity' control='select'> 
//       <option value='quantity 1 to ?'> quantity 1 to ? </option>
//     </Form.Field>
//   </Form.Group>
//   <Form.Group widths='equal'>
//     <Form.Field label='Creation Date' control='select'>
//       <option value='option from ? to ?'> option from ? to ? </option>
//     </Form.Field>
//     <Form.Field label='Availabilty' control='select'>
//       <option value='male'>Yes</option>
//       <option value='female'>No</option>
//     </Form.Field>
//   </Form.Group>
//   <Form.Group grouped> 
//     <label>Key Status</label>
//     <Form.Field label='Signed In' control='input' type='checkbox' />
//     <Form.Field label='Signed Out' control='input' type='checkbox' />
//     <Form.Field label='Pending' control='input' type='checkbox' />
//   </Form.Group>
//   <Form.Group grouped> 
//     <label>Key Type</label>
//     <Form.Field label='Realtor' control='input' type='radio' name='htmlRadios' />
//     <Form.Field label='Operations' control='input' type='radio' name='htmlRadios' />
//     <Form.Field label='Maintenence' control='input' type='radio' name='htmlRadios' />
//     <Form.Field label='Master' control='input' type='radio' name='htmlRadios' />
//     <Form.Field label='Mise' control='input' type='radio' name='htmlRadios' />
//   </Form.Group>
//   <Form.Group grouped>
//     <button class="ui green button">Save Record</button>
//     <button class="ui black basic button">Cancel</button>
//   </Form.Group>
//   <Grid centered columns={4}>
//     <button class="ui red button">Delete Record</button>
//     <Form.Field label='Delete all associated records?' control='input' type='checkbox' />
//   </Grid>
//   <button class="ui blue button">Export Record</button>

//     {/* <Form.Field label control='button'>
//       Cancel
//     </Form.Field> */}
//   </Form>
// </div>
// )
// export default AddPropertyForm;
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const quantities = [
  {
    value: '1', label: '1',
  },
  {
    value: '2', label: '2',
  },
  {
    value: '3', label: '3',
  },
  {
    value: '4', label: '4',
  },
];

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
}));

function AddPropertyForm() {
  const classes = withStyles();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  const handleCheckBoxChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className={classes.root}>
      <TextField
        id="propName"
        label="Porperty Name"
        fullWidth
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="propAddress"
        label="Porperty Address"
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
      <TextField
        id="keyLoc"
        label="Key Location"
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-select-quantity"
        select
        label="Key Quantity"
        className={classes.textField}
        value={values.quantity}
        onChange={handleChange('quantity')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Please enter quantity"
        margin="normal"
        variant="outlined"
      >
        {quantities.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-select-creation-date"
        select
        label="Creation Date"
        className={classes.textField}
        value={values.quantity}
        onChange={handleChange('quantity')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Please select creation date"
        margin="normal"
        variant="outlined"
      >
        {quantities.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-select-availability"
        select
        label="Availability"
        className={classes.textField}
        value={values.quantity}
        onChange={handleChange('quantity')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Please select key availability"
        margin="normal"
        variant="outlined"
      >
        {quantities.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleCheckBoxChange('checkedB')}
            value="checkedB"
            color="primary"
          />
        }
        label="Signed-In"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedG}
            onChange={handleCheckBoxChange('checkedG')}
            value="checkedF"
            color="primary"
          />
        }
        label="Signed-Out"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedA}
            onChange={handleCheckBoxChange('checkedA')}
            value="checkedA"
            color="primary"
          />
        }
        label="Pending"
      />
      {/* <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange('antoine')} value="antoine" />
            }
            label="Antoine Llorca"
      /> */}
      

      <TextField
        id="outlined-full-width"
        label="Property Name"
        style={{ margin: 8 }}
        placeholder="Property Name"
        helperText="Full width!"
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-number"
        label="Key Quantity"
        value={values.age}
        onChange={handleChange('age')}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        variant="outlined"
      />
      
    </div>
  );
}

export default AddPropertyForm;