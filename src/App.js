import React, { Component } from 'react';
import axios from 'axios';

import PetList from './components/PetList';
import PetDetails from './components/PetDetails';
import SearchBar from './components/SearchBar';
import NewPetForm from './components/NewPetForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const URL = 'https://petdibs.herokuapp.com/pets';

// import pets from './data/pets.json'; // Removed for API data

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
      petList: [],
      masterList: [],
      currentPet: undefined,
    };
  }

  componentDidMount() {

    axios.get(URL)
      .then((response) => {
        const pets = response.data.map((pet) => {
          console.log(pet.breed);
          const newPet = {
            ...pet,
            images: ['https://images.dog.ceo/breeds/germanshepherd/n02106662_10676.jpg'],
            species: pet.breed ? pet.breed.toLowerCase(): "",
            location: 'Seattle, WA',
            about: pet.about ? pet.about: "",
          };

          return newPet;
        }).filter((pet, index) =>  index < 10);

        this.setState({
          petList: pets,
          masterList: pets,
        });

      })
      .catch((error) => {
        console.log(error.message);
        this.setState({
          errorMessage: error.message,
        });

      });

  }

  onSelectPet = (petId) => {

    const selectedPet = this.state.petList.find((pet) => {
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
    newPet.id = this.state.masterList.reduce((max = 0, currentPet) => max ? Math.max(max, currentPet.id): currentPet.id) + 1
    newPet.images = [newPet.image];
    const petList = [...this.state.masterList, newPet];

    this.setState({
      petList: petList,
      masterList: petList,
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
      petList: pets,
      masterList: pets,
    })
  }

  render() {
    const { currentPet } = this.state;
    console.log(this.state.petList);

    const details = currentPet ? <PetDetails currentPet={currentPet} /> : '';

    return (
      <main className="App">
        <header className="app-header">
          <h1>Ada Pets</h1>
          <h2>{this.state.errorMessage ? this.state.errorMessage: "" }</h2>
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
