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
function createData(prop_id, prop_addr, key_id, key_loc, key_type, key_status, select) {
  id += 1;
  return { prop_id, prop_addr, key_id, key_loc, key_type, key_status, select};
}

const rows = [
  createData('000001', '123 First Rd.', 1234, 'loc1', 'Maintenance', 'Pending', <button class="ui green basic button">select</button>),
  createData('000002', '234 Second Rd.',  2345, 'loc2','Operations', 'Signed-In', <button class="ui green basic button">select</button>),
  createData('000003', '345 Third Rd.',  3456, 'loc3', 'Master', 'Signed-Out', <button class="ui green basic button">select</button>),
  createData('000004', '456 Fourth Rd.', 4567, 'loc4', 'Master', 'Signed-In', <button class="ui green basic button">select</button>),
  createData('000005', '567 Fifth Rd.', 5678, 'loc5', 'Maintenance', 'Pending', <button class="ui green basic button">select</button>),
];

function InventoryTable(props) {
  const { classes } = props;
  
  return (
    <div> 
      <Paper className={classes.root}>
        <Table className={classes.table}> 
            <TableHead> 
              <TableRow>
              <br></br>
              <h2 class = "ui horizontal divider header"> Inventory </h2> 
              <p> Select item to view/edit/delete record </p>
              <br></br>
              </TableRow>
            </TableHead>
        </Table>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>PROPERTY ID</CustomTableCell>
                <CustomTableCell align="right">PROPERTY ADDRESS</CustomTableCell>
                <CustomTableCell align="right">KEY ID</CustomTableCell>
                <CustomTableCell align="right">KEY LOCATION</CustomTableCell>
                <CustomTableCell align="right">KEY TYPE</CustomTableCell>
                <CustomTableCell align="right">KEY STATUS</CustomTableCell>
                <CustomTableCell align="right"></CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow className={classes.row} key={row.id}>
                  <CustomTableCell component="th" scope="row">
                    {row.prop_id}
                  </CustomTableCell>
                  <CustomTableCell align="right">{row.prop_addr}</CustomTableCell>
                  <CustomTableCell align="right">{row.key_id}</CustomTableCell>
                  <CustomTableCell align="right">{row.key_loc}</CustomTableCell>
                  <CustomTableCell align="right">{row.key_type}</CustomTableCell>
                  <CustomTableCell align="right">{row.key_status}</CustomTableCell>
                  <CustomTableCell align="right">{row.select}</CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </Paper>
    </div>
  );
}

  InventoryTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(InventoryTable);