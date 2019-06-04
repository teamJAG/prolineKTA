import React, { Component } from 'react';
import RecordList from '../RecordList/RecordList';

class RecordDashboard extends Component {

  render() {

    const keyColumns = [{
      Header: 'Property Type',
      accessor: 'property_type',
      minWidth: 150
      }, {
      Header: 'Property Address',
      accessor: 'address',
      minWidth: 200
      }, {
      Header: 'City/Municipality',
      accessor: 'city',
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

    const peopleColumns = [{
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

    const propertyColumns = [{
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

    switch (this.props.tableType) {
      case "keys":
        return (
          <div>
            <RecordList columns={keyColumns} />
          </div>
        );
      case "properties":
        return (
          <div>
            <RecordList columns={propertyColumns} />
          </div>
        );
      case "people":
        return (
          <div>
            <RecordList columns={peopleColumns} />
          </div>
        );
      default:
        return (
          <div>
            <RecordList />
          </div>
        ); 
    }
  }
}

export default RecordDashboard;
