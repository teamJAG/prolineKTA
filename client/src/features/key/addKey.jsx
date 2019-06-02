import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


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
      margin: theme.spacing(10),
    },
    input: {
      display: 'none',
    },
  }));

function AddKeyForm() {
    const classes = withStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

return (
<div style={{ marginTop: 10, padding: 20 }}>
<Grid container spacing={40} justify="center"> 
<h1 class = "ui horizontal divider header"> Create Key</h1> 
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
    onChange={handleChange('quantity')}
    type="number"
    className={classes.textField}
    InputLabelProps={{
        shrink: true,
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
<Button variant="contained" color="primary" className={classes.button}>
    Submit
</Button> 
</div>

);}
export default useStyles (AddKeyForm);