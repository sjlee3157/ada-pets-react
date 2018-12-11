import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import './NewPetForm.css'

class NewPetForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      images: [],
      species: '',
      about: '',
      location: '',
      id: 0
    };
  }

  onNameChangeHandler = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  onImageChangeHandler = (e) => {
    this.setState({
      images: [e.target.value]
    })
  }

  onSpeciesChangeHandler = (e) => {
    this.setState({
      species: e.target.value
    })
  }

  onSubmitHandler = (e) => {
    e.preventDefault();

    const { id, name, species, about, location, images } = this.state;
    this.props.addPetCallback({ id, name, species, about, location, images });

    this.setState({
      name: '',
      images: [],
      species: '',
      about: '',
      location: '',
      id: 0
    })
  }

  render() {
    return (
      <form  className="new-pet-form"
             name="new-pet-form"
             id="new-pet-form"
             onSubmit={ this.onSubmitHandler }
             >
        <h3>Add a Pet</h3>
        <div>
          <label htmlFor="name">Name</label>
          <input name ="name" id= "name"
            value={this.state.name}
            onChange={this.onNameChangeHandler} />
        </div>
        <div>
          <label htmlFor="image">Image URL</label>
          <input name ="image" id= "image"
            value={this.state.image}
            onChange={this.onImageChangeHandler} />
        </div>
        <div>
          <label htmlFor="species">Species</label>
          <input name ="species" id= "species"
            value={this.state.species}
            onChange={this.onSpeciesChangeHandler} />
        </div>
        <input className="btn btn-success new-pet-form--submit" type="submit" name="submit" value="Add a Pet" />
      </form>
    );
  }


}

NewPetForm.propTypes = {
  addPetCallback: PropTypes.func.isRequired,
};

export default NewPetForm;
