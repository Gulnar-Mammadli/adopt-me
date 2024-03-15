import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";


const ANIMALS = ["bird", "cat", "dog"];


const SearchParams = () => {

    const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [pets, setPets] = useState([]);
    const [breedList] = useBreedList(animal);


useEffect(() => {
  requestPets();
}, []); // eslint-disable-line react-hooks/exhaustive-deps

async function requestPets() {
    const res = await fetch(
        `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
}

    return (
        <div className="search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                requestPets();
            }}>
                <label htmlFor="location">
                    Location
                </label>
                <input 
                onChange={(e) => {
                    setLocation(e.target.value)
                }} 
                id="location" 
                value={location} 
                placeholder="Location" />
                <label htmlFor="animal">
                    Animal
                </label>
                <select 
                id="animal"
                value={animal}
                onChange={(e) => {
                    setAnimal(e.target.value);
                    setBreed("");
                }}>
                <option />  
                {ANIMALS.map((animal) => (
                    <option key={animal}>{animal}</option>
                ))}  
                </select>
                <label htmlFor="animal">
                    Breed
                </label>
                <select 
                id="breed"
                disabled={!breedList.length}
                value={breed}
                onChange={(e) => {
                    setBreed(e.target.value);
                }}>
                <option />  
                {breedList.map((breed) => (
                    <option key={breed} value={breed}>
                        {breed}
                    </option>
                ))}  
                </select>
                <button>Button</button>
            </form>
            <Results pets={pets}/>
        </div>
    )
}

export default SearchParams;
