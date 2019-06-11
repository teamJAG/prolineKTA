import React from 'react';

//Objects arrays describing the structure and names of table columns  
  // export const keyColumns = [{
  //   Header: 'Property Type',
  //   accessor: 'property_type',
  //   minWidth: 120,
  //   style: {textAlign: 'center'}
  //   }, {
  //   Header: 'Address',
  //   accessor: 'address',
  //   minWidth: 150
  //   }, {
  //   Header: 'City/Municipality',
  //   accessor: 'city',
  //   minWidth: 120,
  //   style: {textAlign: 'center'}
  //   }, {
  //   Header: 'Key Location',
  //   accessor: 'storage_location',
  //   style: {textAlign: 'center'}
  //   }, {
  //   Header: 'Office Location',
  //   accessor: 'office_location',
  //   minWidth: 120,
  //   style: {textAlign: 'center'}
  //   }, {
  //   Header: 'Key Number',
  //   accessor: 'key_number',
  //   style: {textAlign: 'center'}
  //   }, {
  //   Header: 'Key Type',
  //   accessor: 'key_type',
  //   style: {textAlign: 'center'}
  //   }, {
  //   Header: 'Key Status',
  //   accessor: 'key_status',
  //   Cell: (row) => {
  //   if (row.value === 2) {
  //   return <span>In</span>; 
  //   } else if (row.value === 1) {
  //     return <span>Pending</span>;
  //   } else if (row.value === 0) {
  //     return <span>Out</span>;
  //   }
  // },
  //   style: {textAlign: 'center'}
  //   }
  // ];

  // export const peopleColumns = [{
  //   Header: 'First Name',
  //   accessor: 'first_name'
  // }, {
  //   Header: 'Last Name',
  //   accessor: 'last_name'
  // }, {
  //   Header: 'E-mail',
  //   accessor: 'email'
  // }, {
  //   Header: 'Phone',
  //   accessor: 'phone_num'
  // }, {
  //   Header: 'Company',
  //   accessor: 'company'
  // }];

  // export const propertyColumns = [{
  //   Header: "Property Name",
  //   accessor: 'property_name'
  // }, {
  //   Header: 'Property Type',
  //   accessor: 'property_type'
  // }, {
  //   Header: 'Address',
  //   accessor: 'address'
  // }, {
  //   Header: 'City',
  //   accessor: 'city'
  // }, {
  //   Header: 'Postal Code',
  //   accessor: 'postal_code'
  // }, {
  //   Header: 'Comments',
  //   accessor: 'comments'
  // }];

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

//Arrays to describe the selections available to filter results by id
  // export const peopleFilter = [
  //   { id: 'filterId', text: '', value: ''},
  //   { id: 'filterId', text: 'QR Code', value: 'user_id'},
  //   { id: 'filterId', text: 'First Name', value: 'first_name'},
  //   { id: 'filterId', text: 'Last Name', value: 'last_name' },
  //   { id: 'filterId', text: 'E-mail', value: 'email' },
  //   { id: 'filterId', text: 'Phone', value: 'phone_num' },
  //   { id: 'filterId', text: 'Company', value: 'company'}
  // ];

  // export const propFilter = [
  //   { id: 'filterId', text: '', value: ''},
  //   { id: 'filterId', text: 'QR Code', value: 'property_id'},
  //   { id: 'filterId', text: 'Property Name', value: 'property_name'},
  //   { id: 'filterId', text: 'Property Type', value: 'property_type' },
  //   { id: 'filterId', text: 'Address', value: 'address' },
  //   { id: 'filterId', text: 'City', value: 'city' },
  //   { id: 'filterId', text: 'Postal Code', value: 'postal_code'},
  //   { id: 'filterId', text: 'Comments', value: 'comments'}
  // ];

  // export const keyFilter = [
  //   { id: 'filterId', text: '', value: ''},
  //   { id: 'filterId', text: 'QR Code', value: 'key_id'},
  //   { id: 'filterId', text: 'Property Type', value: 'property_type'},
  //   { id: 'filterId', text: 'Address', value: 'address' },
  //   { id: 'filterId', text: 'City', value: 'city' },
  //   { id: 'filterId', text: 'Location', value: 'storage_location' },
  //   { id: 'filterId', text: 'Office', value: 'office_location'},
  //   { id: 'filterId', text: 'Key Number', value: 'key_number'},
  //   { id: 'filterId', text: 'Key Type', value: 'key_type'},
  //   { id: 'filterId', text: 'Status', value: 'key_status'}
  // ];

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

