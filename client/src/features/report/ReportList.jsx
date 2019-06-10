import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class RecordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 0,
      pages: 0,
      pageSize: 20,
      sorted: [],
      loading: false,
      startDate: new Date(),
      endDate: new Date()
    };
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
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
        case "properties":
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
        case "people":
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
    }
  }

  render() {
    return (
      <div>
        <DatePicker
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
          showYearDropdown
          showMonthDropdown
          withPortal
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
        />
        <ReactTable
          className="-highlight"
          data={this.state.data}
          page={this.state.page}
          pages={this.state.pages}
          columns={this.props.columns}
          minRows={1}
          defaultPageSize={20}
          loading={this.state.loading}
          showPagination={true}
          showPaginationTop={false}
          showPaginationBottom={true}
          pageSizeOptions={[5, 10, 20, 25, 50, 100]}
          manual
          onPageChange={pageIndex => {
            this.setState({ page: pageIndex });
          }}
          onPageSizeChange={(pageSize, pageIndex) => {
            this.setState({ page: pageIndex, pageSize: pageSize });
          }}
          onFetchData={(state, instance) => {
            this.setState({ loading: true });
            fetchRecordData(
              this.props.type,
              state.page,
              state.pageSize,
              state.sorted,
              this.props.filter,
              res => {
                this.setState({
                  data: res.data,
                  page: state.page,
                  pages: res.pages,
                  loading: false
                });
              }
            );
          }}
        />
      </div>
      
    );
  }
}

export default ReportList;
