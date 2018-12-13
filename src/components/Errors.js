import React from 'react';
import './Errors.css';

const Errors = (props) => {
  const errorMessages = props.errors.map((message, i) => {
    return (
      <li key={i}>{ message }</li>
    )
  });

  return (
    <ul className="error-messages">
      { errorMessages }
    </ul>
  )
}

export default Errors;
