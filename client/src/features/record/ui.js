import React from 'react';
import { Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';


//Objects arrays describing the structure and names of table columns  
  export const keyColumns = [{
    Header: 'Property Type',
    accessor: 'property_type',
    minWidth: 120,
    style: {textAlign: 'center'}
    }, {
    Header: 'Address',
    accessor: 'address',
    minWidth: 150,
    }, {
    Header: 'City/Municipality',
    accessor: 'city',
    minWidth: 120,
    style: {textAlign: 'center'}
    }, {
    Header: 'Key Location',
    accessor: 'storage_location',
    style: {textAlign: 'center'}
    }, {
    Header: 'Office Location',
    accessor: 'office_location',
    minWidth: 120,
    style: {textAlign: 'center'}
    }, {
    Header: 'Key Number',
    accessor: 'key_number',
    style: {textAlign: 'center'}
    }, {
    Header: 'Key Type',
    accessor: 'key_type',
    style: {textAlign: 'center'}
    }, {
    Header: 'Key Status',
    accessor: 'key_status',
    style: {textAlign: 'center'}
    }, {
      Cell: (row) => {
        return <Button 
        as={NavLink} 
        to={{
          pathname:"/editkey",
          keyRecord: row.original
         }}>Edit</Button>;
      },
      style: {textAlign: 'center'},
      sortable: false
    },
  ];

  export const peopleColumns = [{
    Header: 'First Name',
    accessor: 'first_name'
  }, {
    Header: 'Last Name',
    accessor: 'last_name'
  }, {
    Header: 'E-mail',
    accessor: 'email'
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
    Cell: (row) => {
      return <Button 
      as={NavLink} 
      to={{
        pathname:"/editcontractor",
        keyRecord: row.original
       }}>Edit</Button>;
    },
    style: {textAlign: 'center'},
    sortable: false
  }];

  export const propertyColumns = [{
    Header: "Property Name",
    accessor: 'property_name',
      minWidth: 120
  }, {
    Header: "Property Number",
    accessor: 'property_number',
    minWidth: 70,
    style: {textAlign: 'center'}
  }, {
    Header: 'Property Type',
    accessor: 'property_type',
    minWidth: 120,
    style: {textAlign: 'center'}
  }, {
    Header: 'Address',
    accessor: 'address',
    minWidth: 150
  }, {
    Header: 'City/Municipality',
    accessor: 'city',
    minWidth: 120,
    style: {textAlign: 'center'}
    }, {
    Header: 'Postal Code',
    accessor: 'postal_code'
  }, {
    Header: 'Comments',
    accessor: 'comments'
  }, {
    Cell: (row) => {
      return <Button 
      as={NavLink} 
      to={{
        pathname:"/editproperty",
        keyRecord: row.original
       }}>Edit</Button>;
    },
    style: {textAlign: 'center'},
    sortable: false
  }];

//Arrays to describe the selections available to filter results by id
  export const peopleFilter = [
    { key: '1', text: '', value: ''},
    { key: '3', text: 'First Name', value: 'first_name'},
    { key: '4', text: 'Last Name', value: 'last_name' },
    { key: '5', text: 'E-mail', value: 'email' },
    { key: '6', text: 'Phone', value: 'phone_num' },
    { key: '7', text: 'Company', value: 'company'}
  ];

  export const propFilter = [
    { key: '1', text: '', value: ''},
    { key: '2', text: 'Property Name', value: 'property_name'},
    { key: '3', text: 'Property Number', value: 'property_number'},
    { key: '4', text: 'Property Type', value: 'property_type' },
    { key: '5', text: 'Address', value: 'address' },
    { key: '6', text: 'City', value: 'city' },
    { key: '7', text: 'Postal Code', value: 'postal_code'},
    { key: '8', text: 'Comments', value: 'comments'}
  ];

  export const keyFilter = [
    { key: '1', text: '', value: ''},
    { key: '2', text: 'QR Code', value: 'qr'},
    { key: '3', text: 'Property Type', value: 'property_type'},
    { key: '4', text: 'Address', value: 'address' },
    { key: '5', text: 'City', value: 'city' },
    { key: '6', text: 'Location', value: 'storage_location' },
    { key: '7', text: 'Office', value: 'office_location'},
    { key: '8', text: 'Key Number', value: 'key_number'},
    { key: '9', text: 'Key Type', value: 'key_type'},
    { key: '10', text: 'Key Status', value: 'key_status'}
  ];