import React from 'react';

//Objects arrays describing the structure and names of table columns  

  export const reportColumns = [{
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
  if (row.value === 2) {
  return <span>In</span>; 
  } else if (row.value === 1) {
    return <span>Pending</span>;
  } else if (row.value === 0) {
    return <span>Out</span>;
  }
},
  style: {textAlign: 'center'}

  }];

export const buildingColumns = [{
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
  if (row.value === 2) {
  return <span>In</span>; 
  } else if (row.value === 1) {
    return <span>Pending</span>;
  } else if (row.value === 0) {
    return <span>Out</span>;
  }
},
  style: {textAlign: 'center'}
  
}];

  export const reportFilter = [
    { id: 'filterId', text: '', value: ''},
    { id: 'filterId', text: 'QR Code', value: 'key_id'},
    { id: 'filterId', text: 'Building Name', value: 'property_name'},
    { id: 'filterId', text: 'Key Type', value: 'key_type' },
    { id: 'filterId', text: 'Key Number', value: 'key_number' },
    { id: 'filterId', text: 'Office Location', value: 'office_location' },
    { id: 'filterId', text: 'Storage Location', value: 'storage_location'},
    { id: 'filterId', text: 'Date OUt', value: 'checked_out'},
    { id: 'filterId', text: 'Due Date', value: 'due_date'},
    { id: 'filterId', text: 'Deposit', value: 'deposit'},
    { id: 'filterId', text: 'Deposit Type', value: 'deposit_type'},
    { id: 'filterId', text: 'Key Status', value: 'key_status'},
  ];

  export const buildingFilter = [
    { id: 'filterId', text: '', value: ''},
    { id: 'filterId', text: 'QR Code', value: 'key_id'},
    { id: 'filterId', text: 'Key Type', value: 'key_type'},
    { id: 'filterId', text: 'Key Number', value: 'key_number' },
    { id: 'filterId', text: 'Office Location', value: 'office_location' },
    { id: 'filterId', text: 'Storage Location', value: 'storage_location' },
    { id: 'filterId', text: 'Key Status', value: 'key_status' },
  ];

  ];