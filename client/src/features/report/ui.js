import React from 'react';
import { Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { fetchBuildingNames } from '../../app/fetch/fetches';
import { amber } from '@material-ui/core/colors';

//Objects arrays describing the structure and names of table columns  

  export const keyColumns = [{
    Header: 'Building Number',
    accessor: 'property_number'
  }, {
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
    Header: 'Contractor First Name',
    accessor: 'first_name'
  }, {
    Header: 'Contractor Last Name',
    accessor: 'last_name'
  }, {
    Header: 'Phone',
    accessor: 'phone_num',
    Cell: (row) => {
      if (row.value) {
      const phone = row.value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      return <span>{phone}</span>
      } else return null;
    },
    style: {textAlign:'center'}
  }, {
    Header: 'Company',
    accessor: 'company'
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
  }];

export const propertyColumns = [{
    Header: 'Bulding Name',
    accessor: 'property_name'
}, {
    Header: 'Building Number',
    accessor: 'property_number'
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
    Header: 'Key Status',
  accessor: 'key_status',
  Cell: (row) => {
    if (row.value === 5) {
      return <span>Destroyed</span>;
    } else if (row.value === 4) {
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
  { key: '1', text: 'Out', value: '0'}
];

export const propertyOptions = [
  { key: '1', text: 'Building Number', value: 'property_number'},
  { key: '2', text: 'Building Name', value: 'property_name'}
];