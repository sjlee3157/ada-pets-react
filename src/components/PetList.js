import React from 'react';
import PropTypes from 'prop-types';
import PetCard from './PetCard';
import './PetCard.css'

import 'bootstrap/dist/css/bootstrap.min.css';

const PetList = (props) => {
  const pets = props.pets
  const getPets = pets.map((pet, i) => {
    return (
      <PetCard
        key={ i }
        id={ i }
        { ...pet }
        onSelectPetCallback={ props.onSelectPetCallback }
        onRemovePetCallback={ props.onRemovePetCallback } />
    )
  });

  return (
    <section className="app-card-list">
      <div className="card-group">
        { getPets }
      </div>
    </section>
  )
}

PetList.propTypes = {
  pets: PropTypes.array.isRequired,
  onSelectPetCallback: PropTypes.func.isRequired,
  onRemovePetCallback: PropTypes.func.isRequired
};

export default PetList;
