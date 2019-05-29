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

// Material Ui table
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
  function createData(name, department, role, contact, edit) {
    id += 1;
    return { name, department, role, contact, edit};
  }

  const rows = [
    createData('A', 'Tech', 'Security', 24, <button class="ui green basic button">View User</button>),
    createData('B', 'Bus',  'Security', 4.3, <button class="ui green basic button">View User</button>),
    createData('C', 'Trades',  'Security', 44, <button class="ui green basic button">View User</button>),
    createData('D', 'ELD', 'Security', 88, <button class="ui green basic button">View User</button>),
    createData('E', 'Art', 'Security', 99, <button class="ui green basic button">View User</button>),
  ];

  function EmployeesTable(props) {
    const { classes } = props;
  
    return (
    <div> 
    <h1>People Dashboard</h1>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
            <CustomTableCell>NAME</CustomTableCell>
              <CustomTableCell align="right">DEPARTEMENT</CustomTableCell>
              <CustomTableCell align="right">ROLE</CustomTableCell>
              <CustomTableCell align="right">CONTACT NUMBER</CustomTableCell>
              <CustomTableCell align="right"></CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow className={classes.row} key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.name}
                </CustomTableCell>
                <CustomTableCell align="right">{row.department}</CustomTableCell>
                <CustomTableCell align="right">{row.role}</CustomTableCell>
                <CustomTableCell align="right">{row.contact}</CustomTableCell>
                <CustomTableCell align="right">{row.edit}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

{/* Semantic Ui table */}
{/* <table class="ui selectable inverted table">
  <thead>
    <tr>
      <th>NAME</th>
      <th>DEPARTEMENT</th>
      <th>ROLE</th>
      <th>CONTACT NUMBER</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
      <td>Tech</td>
      <td>DBA</td>
      <td>2509998888</td>
      <td><button class="ui green basic button">View User</button></td>
    </tr>
    <tr>
      <td>Jamie</td>
      <td>Tech</td>
      <td>Front-End Developer</td>
      <td>2508887777</td>
      <td><button class="ui green basic button">View User</button></td>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Tech</td>
      <td>Back-End Developer</td>
      <td>2507776666</td>
      <td><button class="ui green basic button">View User</button></td>
    </tr>
  </tbody>
</table> */}

      </div>
    );
  }

  


  EmployeesTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };

//   const PeopleDashboard = () => {
//   return (
//     <div>
//       <h1>People Dashboard</h1>
//     </div>
//   );
// }
// export default PeopleDashboard;
export default withStyles(styles)(EmployeesTable);