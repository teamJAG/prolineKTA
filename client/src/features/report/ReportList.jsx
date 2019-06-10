import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import * as ui from '../record/ui';

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

    render() {

        return (
            <div>
                <container>
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