import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

  let id = 0;
  function createData(prop_id, status, key_type, address, last_activity, user) {
    id += 1;
    return { prop_id, status, key_type, address, last_activity, user };
  }

  const rows = [
    createData('000001', 'Pending', 'Maintenance', '123 First Rd.', '15 Jul, 8:56 AM (2019)', 'A'),
    createData('000002', 'Signed-In', 'Operations', '234 Second Rd.',  '16 Jul, 10:00 AM (2019)', 'B'),
    createData('000003', 'Signed-Out', 'Master', '345 Third Rd.',  '17 Jul, 11:00 AM (2019)', 'C'),
    createData('000004', 'Signed-In', 'Master', '456 Fourth Rd.', '18 Jul, 13:00 PM (2019)', 'D'),
    createData('000005', 'Pending', 'Maintenance', '567 Fifth Rd.', '19 Jul, 15:00 PM (2019)', 'E'),
  ];

  function ReportListTable(props) {
    const { classes } = props;
  
    return (
    <div> 
    {/* <Paper className={classes.root}>
    <br></br>
    <h2 class = "ui horizontal divider header"> Search by Date </h2> 
    <br></br>
    <Grid container className={classes.grid} justify="space-around">
    <Form size="medium">
    <Form.Input
            fluid
            iconPosition="left"
            placeholder="Property Name/ID"
    />
    <button class="ui blue button">Search</button>
    </Form>
    </Grid>
      <br></br>
    </Paper> */}

    <Paper className={classes.root}>
    <br></br>
    <h2 class = "ui horizontal divider header"> Select Date Range </h2> 
    <br></br>
    <Grid container className={classes.grid} justify="space-around">
    <Checkbox/>
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Waiting From"
        type="date"
        defaultValue="2019-05-29"
        className={classes.textField}
        InputLabelProps={{
        shrink: true,
        }}
      />
    </form>
    _________________

    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Waiting To"
        type="date"
        defaultValue="2019-05-30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
    <button class="ui blue basic button">OK</button>

    {/* <Button variant="contained" color="primary" className={classes.button}> OK </Button> */}
    </Grid>
    <br></br>
    </Paper>

    <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
            <CustomTableCell>PROPERTY ID</CustomTableCell>
              <CustomTableCell align="right">STATUS</CustomTableCell>
              <CustomTableCell align="right">KEY TYPE</CustomTableCell>
              <CustomTableCell align="right">ADDRESS</CustomTableCell>
              <CustomTableCell align="right">LAST ACTIVITY DATE</CustomTableCell>
              <CustomTableCell align="right">USER</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow className={classes.row} key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.prop_id}
                </CustomTableCell>
                <CustomTableCell align="right">{row.status}</CustomTableCell>
                <CustomTableCell align="right">{row.key_type}</CustomTableCell>
                <CustomTableCell align="right">{row.address}</CustomTableCell>
                <CustomTableCell align="right">{row.last_activity}</CustomTableCell>
                <CustomTableCell align="right">{row.user}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </Paper>
    <br></br>
    <div class="ui red labeled icon button">
        Export PDF
        <i class="file icon"></i>
    </div>
    </div>
    );
  }

  ReportListTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ReportListTable);