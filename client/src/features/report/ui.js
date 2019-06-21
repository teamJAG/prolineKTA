import React from "react";
import { Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { fetchBuildingNames } from "../../app/fetch/fetches";

//Objects arrays describing the structure and names of table columns

export const keyColumns = [
  {
    Header: "Property Number",
    accessor: "property_number"
  },
  {
    Header: "Property Name",
    accessor: "property_name",
    minWidth: 200,
    style: { textAlign: "center" }
  },
  {
    Header: "Key Type",
    accessor: "key_type"
  },
  {
    Header: "Key Number",
    accessor: "key_number"
  },
  {
    Header: "Office Location",
    accessor: "office_location",
    minWidth: 120,
    style: { textAlign: "center" }
  },
  {
    Header: "First Name",
    accessor: "first_name"
  },
  {
    Header: "Last Name",
    accessor: "last_name"
  },
  {
    Header: "Phone",
    accessor: "phone_num",
    Cell: row => {
      if (row.value) {
        const phone = row.value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        return <span>{phone}</span>;
      } else return null;
    },
    style: { textAlign: "center" }
  },
  {
    Header: "Company",
    accessor: "company"
  },
  {
    Header: "Date Out",
    accessor: "checked_out"
  },
  {
    Header: "Due Date",
    accessor: "due_date"
  },
  {
    Header: "Deposit",
    accessor: "deposit"
  },
  {
    Header: "Deposit Type",
    accessor: "deposit_type"
  }
];

export const propertyColumns = [
  {
    Header: "Property Name",
    accessor: "property_name"
  },
  {
    Header: "Property Number",
    accessor: "property_number"
  },
  {
    Header: "Key Type",
    accessor: "key_type"
  },
  {
    Header: "Key Number",
    accessor: "key_number"
  },
  {
    Header: "Office Location",
    accessor: "office_location",
    minWidth: 120,
    style: { textAlign: "center" }
  },
  {
    Header: "Storage Location",
    accessor: "storage_location"
  },
  {
    Header: "Key Status",
    accessor: "key_status",
    style: { textAlign: "center" }
  }
];

export const keyFilter = [
  { key: "1", text: "", value: "" },
  // { key: '2', text: 'QR Code', value: 'qr'},
  { key: "3", text: "Property Number", value: "property_number" },
  { key: "4", text: "Property Name", value: "property_name" },
  { key: "5", text: "Key Type", value: "key_type" },
  { key: "6", text: "Key Number", value: "storage_location" },
  { key: "7", text: "Office Location", value: "office_location" },
  { key: "8", text: "First Name", value: "first_name" },
  { key: "9", text: "Last Name", value: "last_name" },
  { key: "10", text: "Phone", value: "phone_num" },
  { key: "11", text: "Company", value: "company" },
  { key: "12", text: "Date Out", value: "checked_out" },
  { key: "13", text: "Due Date", value: "due_date" },
  { key: "14", text: "Deposit", value: "deposit" },
  { key: "15", text: "Deposit Type", value: "deposit_type" }
];

export const propertyFilter = [
  { key: "1", text: "", value: "" },
  { key: "2", text: "Property Name", value: "property_name" },
  { key: "3", text: "Property Number", value: "property_number" },
  { key: "4", text: "Key Type", value: "key_type" },
  { key: "5", text: "Key Number", value: "key_number" },
  { key: "6", text: "Office Location", value: "office_location" },
  { key: "7", text: "Storage Location", value: "storage_location" },
  { key: "8", text: "Key Status", value: "key_status" }
];
