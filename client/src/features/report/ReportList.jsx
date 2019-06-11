import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchRecordData } from "../../app/fetch/fetches"

function handleHTTPErrors(response) {
if (!response.ok) {
throw Error(response.statusText);
}
return response;
}

async function fetchData(endpoint, page, pageSize, sorted, filtered, handleData) {
    let requestBody = {
    page: page,
    pageSize: pageSize,
    sorted: sorted,
    filtered: filtered,
    };
    try {
        let result = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(requestBody)
        });
        result = await handleHTTPErrors(result);
        const records = await result.json();
        return handleData(records);
    } catch (err) {
        console.log("fetchData failed: " + err);
        return err;
    }
}

class ReportList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            data: [],
            pages: 0,
            loading: false
        };
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    //this.handleChange = this.handleChange.bind(this);

    }

    handleChangeStart(date) {
    this.setState({
    startDate: date
    });
    }

    handleChangeEnd(date) {
    this.setState({
    endDate: date
    });
<<<<<<< Updated upstream
=======
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.type !== prevProps.type ||
      this.props.filter !== prevProps.filter
    ) {
      switch (this.props.type) {
        case "keys":
          this.setState({
            loading: true
          });
          fetchRecordData(
            this.props.type,
            this.state.page,
            this.state.pageSize,
            this.state.sorted,
            this.props.filter,
            res => {
              this.setState({
                data: res.data,
                page: 0,
                pages: res.pages,
                loading: false
              });
            }
          );
          break;
        case "buildings":
          this.setState({
            loading: true
          });
          fetchRecordData(
            this.props.type,
            this.state.page,
            this.state.pageSize,
            this.state.sorted,
            this.props.filter,
            res => {
              this.setState({
                data: res.data,
                page: 0,
                pages: res.pages,
                loading: false
              });
            }
          );
          break;
        default:
          return;
      }
>>>>>>> Stashed changes
    }

    render() {

        return (
            <div>
                <container>
                    Select start and end dates
                    <DatePicker
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}
                    showYearDropdown
                    showMonthDropdown
                    withPortal
                    placeholderText="Starting Date"
                    />
                    <DatePicker
                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                    minDate={this.state.startDate}
                    showYearDropdown
                    showMonthDropdown
                    withPortal
                    placeholderText="Ending Date"
                    />
                    <ReactTable
                    className = '-highlight'
                    data={this.state.data}
                    pages={this.state.pages}
                    columns={ui.peopleColumns}
                    minRows={1}
                    defaultPageSize={20}
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                    manual
                    onFetchData={(state, instance) => {
                        this.setState({loading: true});
                        fetchData("keys", state.page, state.pageSize, state.sorted, state.filtered, (res) => {
                            this.setState({
                            data: res.data,
                            pages: res.pages,
                            loading: false
                            });
                        });
                    }}
                    />  
                </container>
            </div>
        )

    }
}


export default ReportList;