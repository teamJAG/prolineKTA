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

  export const peopleFilter = [
    { key: 'first_name', text: 'First Name', value: 'first_name' },
    { key: 'last_name', text: 'Last Name', value: 'last_name' },
    { key: 'email', text: 'E-mail', value: 'email' },
    { key: 'phone', text: 'Phone', value: 'phone_num' },
    { key: 'company', text: 'Company', value: 'company' }
  ];

  export const propFilter = [
    { key: 'first_name', text: 'First Name', value: 'first_name' },
    { key: 'last_name', text: 'Last Name', value: 'last_name' },
    { key: 'email', text: 'E-mail', value: 'email' },
    { key: 'phone', text: 'Phone', value: 'phone_num' },
    { key: 'company', text: 'Company', value: 'company' }
  ];

  export const keyFilter = [
    { key: 'first_name', text: 'First Name', value: 'first_name' },
    { key: 'last_name', text: 'Last Name', value: 'last_name' },
    { key: 'email', text: 'E-mail', value: 'email' },
    { key: 'phone', text: 'Phone', value: 'phone_num' },
    { key: 'company', text: 'Company', value: 'company' }
  ];