//Objects arrays describing the structure and names of table columns  
  export const keyColumns = [{
    Header: 'Property Type',
    accessor: 'property_type',
    minWidth: 120,
    style: {textAlign: 'center'}
    }, {
    Header: 'Property Address',
    accessor: 'address',
    minWidth: 150
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
    }
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
    accessor: 'phone_num'
  }, {
    Header: 'Company',
    accessor: 'company'
  }];

  export const propertyColumns = [{
    Header: "Property Name",
    accessor: 'property_name'
  }, {
    Header: 'Property Type',
    accessor: 'property_type'
  }, {
    Header: 'Address',
    accessor: 'address'
  }, {
    Header: 'City',
    accessor: 'city'
  }, {
    Header: 'Postal Code',
    accessor: 'postal_code'
  }, {
    Header: 'Comments',
    accessor: 'comments'
  }];

//Arrays to describe the selections available to filter results by id
  export const peopleFilter = [
    { id: 'filterId', text: '', value: ''},
    { id: 'filterId', text: 'First Name', value: 'first_name'},
    { id: 'filterId', text: 'Last Name', value: 'last_name' },
    { id: 'filterId', text: 'E-mail', value: 'email' },
    { id: 'filterId', text: 'Phone', value: 'phone_num' },
    { id: 'filterId', text: 'Company', value: 'company'}
  ];

  export const propFilter = [
    { id: 'filterId', text: '', value: ''},
    { id: 'filterId', text: 'Property Name', value: 'property_name'},
    { id: 'filterId', text: 'Property Type', value: 'property_type' },
    { id: 'filterId', text: 'Address', value: 'address' },
    { id: 'filterId', text: 'City', value: 'city' },
    { id: 'filterId', text: 'Postal Code', value: 'postal_code'},
    { id: 'filterId', text: 'Comments', value: 'comments'}
  ];

  export const keyFilter = [
    { id: 'filterId', text: '', value: ''},
    { id: 'filterId', text: 'Property Type', value: 'property_type'},
    { id: 'filterId', text: 'Property Name', value: 'property_name' },
    { id: 'filterId', text: 'City', value: 'city' },
    { id: 'filterId', text: 'Location', value: 'storage_location' },
    { id: 'filterId', text: 'Office', value: 'office_location'},
    { id: 'filterId', text: 'Key Number', value: 'key_number'},
    { id: 'filterId', text: 'Key Type', value: 'key_type'},
    { id: 'filterId', text: 'Status', value: 'key_status'}
  ];