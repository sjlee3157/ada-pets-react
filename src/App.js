import React, { Component } from 'react';
import axios from 'axios';
import PetList from './components/PetList';
import PetDetails from './components/PetDetails';
import Errors from './components/Errors';
import SearchBar from './components/SearchBar';
import NewPetForm from './components/NewPetForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// import pets from './data/pets.json';

class App extends Component {
  constructor(props) {
    super(props);
    // const petList = pets.map((pet) => {
    //   pet.currentPet = 0;
    //   pet.images = pet.images.map((filename) => {
    //     return `/images/${filename}`;
    //   });
    //   return pet;
    // });

    this.state = {
      masterList: [],
      petList: [],
      currentPet: undefined,
      errors: ['first error!', 'second error!'],
    };
  }

// Add API Stuff Here!
  componentDidMount() {
    axios.get('https://petdibs.herokuapp.com/pets')
      .then((response) => {
        const apiPets = response.data.map((pet) => {
          const newPet = {
            id: pet.id,
            name: pet.name ? pet.name: 'no name provided',
            images: ['https://i.pinimg.com/originals/12/45/83/124583224b2d8b8b490343ac5e439eed.jpg'],
            species: pet.breed ? pet.breed.toLowerCase() : 'no breed provided',
            location: pet.location ? pet.location : 'no location provided',
            about: pet.about ? pet.about : 'no about provided',
          }
          return newPet;
        // });
        }).filter((pet, index) => index < 3);
        this.setState({
          masterList: apiPets,
          petList: apiPets
        });
        console.log(`Successfully loaded ${apiPets.length} pets`)
      })
      .catch((error) => {
        // TODO
        console.log(`Error loading pets`);
        this.setState({ errors: [...this.state.errors, error.message] });
      })
  }

  onSelectPet = (petId) => {

    const selectedPet = this.state.masterList.find((pet) => {
      return pet.id === petId;
    });
    if (selectedPet) {
      this.setState({
        currentPet: selectedPet,
      });
    }
  }

  onSearchChange = (value) => {
    console.log(value);
    const regex = new RegExp(`${value}`.toUpperCase());
    const petList = this.state.masterList.filter((pet) => {
      return regex.test(`${pet.name}${pet.about}${pet.species}`.toUpperCase());
    });

    this.setState({
      petList,
    });
  }

  addPet = (newPet) => {
    newPet.id = this.state.petList.reduce((max = 0, currentPet) => max ? Math.max(max, currentPet.id): currentPet.id) + 1
    const newMasterList = [...this.state.masterList, newPet];
    this.setState({
      masterList: newMasterList,
      petList: newMasterList
    });
  }

  removePet = (petId) => {
    let deleteIndex = -1;
    const pets = [...this.state.masterList];
    pets.forEach((pet, index) => {
      if (petId === pet.id) {
        deleteIndex = index;
      }
    });

    pets.splice(deleteIndex, 1);

    this.setState({
      masterList: pets,
      petList: pets
    })
  }

  render() {
    console.log('App.js rendering')
    const { currentPet } = this.state;
    if (currentPet) { console.log( `Current Pet is ${currentPet.name}`) };
    console.log(this.state.masterList);

    const details = currentPet ? <PetDetails currentPet={currentPet} /> : '';

    return (
      <main className="App">
        <header className="app-header">
          <h1>Ada Pets</h1>
          <Errors  errors= {this.state.errors} />
        </header>
        <section className="search-bar">
          <SearchBar onSearchChange={this.onSearchChange} />
        </section>
         {details}
        <section className="pet-list">
          <PetList
            selectPetCallback={this.onSelectPet}
            deletePetCallback={this.removePet}
            pets={this.state.petList}
          />
        </section>
        <section>
          <NewPetForm addPetCallback={this.addPet} />
        </section>
      </main>
    );
  }
}

export default App;
