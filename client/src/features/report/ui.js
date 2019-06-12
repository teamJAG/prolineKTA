import React from 'react';
import { Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { fetchBuildingNames } from '../../app/fetch/fetches';
import { amber } from '@material-ui/core/colors';

//Objects arrays describing the structure and names of table columns  

  export const keyColumns = [{
    Header:'Building Name',
    accessor: 'property_name',
    minWidth: 200,
    style: {textAlign: 'center'}
  }, {
    Header: 'Key Type',
    accessor: 'key_type'
  }, {
    Header: 'Key Number',
    accessor: 'key_number'
  }, {
    Header: 'Office Location',
    accessor: 'office_location',
    minWidth: 120,
    style: {textAlign: 'center'}
  }, {
    Header: 'Storage Location',
    accessor: 'storage_location'
  }, {
    Header: 'Date Out',
    accessor: 'checked_out'
  }, {
    Header: 'Due Date',
    accessor: 'due_date'
  }, {
    Header: 'Deposit',
    accessor: 'deposit'
  }, {
    Header: 'Deposit Type',
    accessor: 'deposit_type'
  }, {
    Header: 'Key Status',
    accessor: 'key_status',
    Cell: (row) => {
      if (row.value === 4) {
        return <span>Lost</span>;
      } else if (row.value === 3) {
        return <span>Sold</span>;
      } else if (row.value === 2) {
        return <span>In</span>;
      } else if (row.value === 1) {
        return <span>Pending</span>;
      } else if (row.value === 0) {
        return <span>Out</span>;
      }
    },
    style: {textAlign: 'center'}
    }, {
    Cell: (row) => {
      return <Button 
      as={NavLink} 
      to={{
        pathname:"/editkey",
        keyRecord: row.original
       }} />;
    }
  }];

export const propertyColumns = [{
    Header: 'Key Type',
    accessor: 'key_type'
  }, {
    Header: 'Key Number',
    accessor: 'key_number'
  }, {
    Header: 'Office Location',
    accessor: 'office_location',
    minWidth: 120,
    style: {textAlign: 'center'}
  }, {
    Header: 'Storage Location',
    accessor: 'storage_location'
  }, {  
    Header: 'Key Status',
  accessor: 'key_status',
  Cell: (row) => {
    if (row.value === 4) {
      return <span>Lost</span>;
    } else if (row.value === 3) {
      return <span>Sold</span>;
    } else if (row.value === 2) {
      return <span>In</span>;
    } else if (row.value === 1) {
      return <span>Pending</span>;
    } else if (row.value === 0) {
      return <span>Out</span>;
    }
},
  style: {textAlign: 'center'}
  
}];

export const keyStatus = [
  { key: '1', text: 'In', value: '2'},
  { key: '2', text: 'Pending', value: '1'},
  { key: '3', text: 'Out', value: '0'},
];

export const propertyOptions = [
  { key: '1', text: 'Property Name', value: 'property_name'}
];

// export async function propertyNames() {
//   try {
//     let buildingNames = [];
//     buildingNames = await fetchBuildingNames(res => {
//       res.forEach(name => {
//         buildingNames.push({
//           key: `${name.property_id}`, text: `${name.property_name}`, value: `${name.property_name}`
//         });
//       });
//       return buildingNames;
//     });
//     return buildingNames;
//   } catch (err) {
//     console.log(err);
//     return;
//   }
// }