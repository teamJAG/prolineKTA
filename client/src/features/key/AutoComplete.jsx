//Custom UI component making use of Semantic-UI's 'search' module and our database to generate input suggestions

import React, { Component } from "react";
import { Search } from "semantic-ui-react";
import { fetchNames } from "../../app/fetch/fetches";

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    }

    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });
    //Pass selected result back to parent if requested
    if (this.props.onChange) {
      console.log("fired");
      const data = {
        name: this.props.name,
        value: result.title
      };
      this.props.onChange(e, data);
    }
    if (this.props.selected) {
      this.props.selected();
    }
  }

  handleSearchChange(e, data) {
    this.setState({ isLoading: true, value: data.value }, () => {
      const request = {
        tableName: this.props.table,
        filterId: this.props.id,
        filterValue: this.state.value
      };
      fetchNames(request, res => {
        this.setState({
          results: res,
          isLoading: false
        });
      });
      if (this.props.onChange) {
        console.log("fired");
        const data = {
          name: this.props.name,
          value: this.state.value
        };
        this.props.onChange(e, data);
      }
    });
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        showNoResults={false}
        {...this.props}
      />
    );
  }
}

export default AutoComplete;
