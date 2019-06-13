import React, { Component } from "react";
import { Input, Divider, Dropdown, Button } from "semantic-ui-react";
import ReportList from "./ReportList";
import * as ui from "./ui";

import "semantic-ui-css/semantic.min.css";

class ReportDashboard extends Component {
  generateFullReport = () => {
    return null;
  }
  handleValue = (e, { value }) => this.setState({ filterValue: value });
  handleId = (e, { value }) => this.setState({ filterId: value });

  constructor(props) {
    super(props);
    this.state = {
      filterId: "",
      filterValue: ""
    };
    this.handleId = this.handleId.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.generateFullReport = this.generateFullReport.bind(this);
  }

  // componentDidUpdate(prevProps) {

  //   let columns = [];
  //   let options = [];
  //   let filter = {
  //     id: this.state.filterId,
  //     value: this.state.filterValue
  //   };

  //   if (this.props !== prevProps) {
  //     switch (this.props.tableType) {
  //       case "keys":
  //         columns = ui.keyColumns;
  //         options = ui.keyStatus;
  //         break;
  //       case "properties":
  //         columns = ui.propertyColumns;
  //         options = ui.propertyNames().then(names => {
  //           return names;
  //         });
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }


  render() {


    let columns = [];
    let options = [];
    let filter = {
      id: this.state.filterId,
      value: this.state.filterValue
    };

    switch (this.props.tableType) {
      case "keys":
        columns = ui.keyColumns;
        options = ui.keyStatus;
        break;
      case "properties":
        columns = ui.propertyColumns;
        options = ui.propertyOptions
        // ui.propertyNames().then(response => {
        //   options = response;
        //   console.log(options);
        // });
        // console.log(options);
        break;
      default:
        break;
    }

    return (
      <div>
        <div>
          <Dropdown
            options={options}
            selection
            onChange={this.handleId}
            value={this.state.value}
            placeholder="Category..."
          />
          <Input
            style={{ paddingLeft: "5px" }}
            icon="search"
            iconPosition="left"
            placeholder="Search..."
            onChange={this.handleValue}
          />
          <Button
             floated="right"
             onClick={this.generateFullReport}
             color="teal"
             >Full Report</Button>
        </div>
        <Divider />
        <div>
          <ReportList
            type={this.props.tableType}
            columns={columns}
            filter={filter}
          />
        </div>
      </div>
    );
  }
}

export default ReportDashboard;
