import React, { Component } from 'react';
import PetList from './components/PetList';
import PetCard from './components/PetCard'
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

  render() {
    const { currentPet } = this.state;
    const displayPetDetails = () => {
      if ( currentPet ) {
        return ( <PetDetails currentPet={ currentPet }/ > )
      }
    }

    return (
      <main className="App">
        <header className="app-header">
          <h1>Ada Pets</h1>
        </header>
        <section className="search-bar-wrapper">
          { /* Wave 4:  Place to add the SearchBar component */ }
          <SearchBar />
        </section>
          { displayPetDetails() }
        <section className="pet-list-wrapper">
          <PetList
            pets={ this.state.petList }
            onSelectPetCallback={ this.onSelectPetHandler }
            onRemovePetCallback={ this.onRemovePetHandler } />
        </section>
        <section className="new-pet-form-wrapper">
          { /* Wave 3:  Where NewPetForm should appear */ }
        </section>
      </main>
    );
  }
}

export default App;
