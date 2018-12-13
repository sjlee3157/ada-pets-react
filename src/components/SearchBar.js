import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: undefined
    };
  }

  onChangeHandler = (e) => {
    const query = e.target.value;
    this.setState({ query })
    this.props.searchPetsCallback(query);
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
    <form onSubmit={ this.handleSubmit }>
      <input
        className="search-bar"
        placeholder="Filter Pets"
        onChange={ this.onChangeHandler } />
    </form>
    );
  }
}

SearchBar.propTypes = {
  searchPetsCallback: PropTypes.func.isRequired
};

export default SearchBar;
