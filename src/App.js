import React, { Component } from 'react';
import PetList from './components/PetList';
import PetDetails from './components/PetDetails';
import SearchBar from './components/SearchBar';
import NewPetForm from './components/NewPetForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import pets from './data/pets.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      petList: pets,
      filteredList: pets,
      currentPet: undefined,
    };
  }

  onSelectPetHandler = (pet) => {
    this.setState({ currentPet: pet })
  }

  onRemovePetHandler = (id) => {
    let { petList, currentPet } = this.state;

    for (let i = 0; i < petList.length; i++) {
      if ( petList[i].id === id) {
        petList.splice(i, 1)
      }
    }

    this.setState({ petList: petList })

    if (currentPet && currentPet.id === id) {
      this.setState({ currentPet: undefined });
    }
  }

  addPet = (newPet) => {
    console.log(newPet);
    let petList = this.state.petList
    petList.push(newPet)
    this.setState({ petList: petList })
  }

  render() {
    const { currentPet } = this.state;
    const displayPetDetails = () => {
      if ( currentPet ) {
        return ( <PetDetails currentPet={ currentPet }/ > )
      }
    }

    const searchPets = (query) => {
      const pets = this.state.petList;
      let regex = new RegExp(query, 'i');

      const matches = []
      for (let i = 0; i < pets.length; i++) {
        let pet = pets[i];
        let keywords = pet.name + ' ' + pet.species + ' ' + pet.about
        if (regex.test(keywords)) {
          matches.push(pet);
        };
      }
      this.setState({ filteredList: matches })
    }

    return (
      <main className="App">
        <header className="app-header">
          <h1>Ada Pets</h1>
        </header>
        <section className="search-bar">
          <SearchBar
            searchPetsCallback={ searchPets }/>
        </section>
          { displayPetDetails() }
        <section className="pet-list">
          <PetList
            pets={ this.state.filteredList }
            onSelectPetCallback={ this.onSelectPetHandler }
            onRemovePetCallback={ this.onRemovePetHandler } />
        </section>
        <section className="new-pet-form-wrapper">
          <NewPetForm
            addPetCallback={ this.addPet } />
        </section>
      </main>
    );
  }
}

export default App;
