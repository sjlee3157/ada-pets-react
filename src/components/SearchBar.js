import React from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBar.css';

const SearchBar = (props) => {
  const onChangeHandler = (e) => {
    let query = e.target.value;
    props.searchPetsCallback(query);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={ handleSubmit }>
      <input
        className="search-bar"
        placeholder="Filter Pets"
        onChange={ onChangeHandler } />
    </form>
  );
};

SearchBar.propTypes = {
  searchPetsCallback: PropTypes.func.isRequired
};

export default SearchBar;
