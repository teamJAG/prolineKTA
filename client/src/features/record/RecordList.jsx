/* The ReactTable component is a package which we are customizing to be server-controlled for
pagination, sorting and filtering of rows. Our API requests return a callback where we can set
state. */

import React, { Component } from "react";
import ReactTable from "react-table";
import { fetchRecordData } from "../../app/fetch/fetches";
import "react-table/react-table.css";

class RecordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 0,
      pages: 0,
      pageSize: 20,
      sorted: [],
      loading: false
    };
  }

  //Dynamic result filtering according to column and value
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.type !== prevProps.type ||
      this.props.filter !== prevProps.filter
    ) {
      this.setState({
        loading: true
      });
      fetchRecordData(
        "records",
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
    }
  }

  render() {
    return (
      <div>
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
              "records",
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

export default RecordList;
