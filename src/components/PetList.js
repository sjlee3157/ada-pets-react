import React from 'react';
import PropTypes from 'prop-types';
import PetCard from './PetCard';

import 'bootstrap/dist/css/bootstrap.min.css';


const PetList = (props) => {
  const pets = props.pets
  const getPets = pets.map((pet) => {
    return (
      <PetCard
        key={ pet.id }
        { ...pet }
        onSelectPetCallback={ props.onSelectPetCallback }
        onRemovePetCallback={ props.onRemovePetCallback } />
    )
  });

  return (
    <div className="card-group">
      { getPets }
    </div>
  )
}

PetList.propTypes = {
  pets: PropTypes.array.isRequired,
  onSelectPetCallback: PropTypes.func.isRequired,
  onRemovePetCallback: PropTypes.func.isRequired
};

export default PetList;
