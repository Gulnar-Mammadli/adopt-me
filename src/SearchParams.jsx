import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";


const ANIMALS = ["bird", "cat", "dog"];


const SearchParams = () => {

    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: "",
    })
    const [animal, setAnimal] = useState("");
    const [breedList] = useBreedList(animal);


    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];

    return (
        <div className="search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const obj = {
                animal: formData.get("animal") ?? "",
                breed: formData.get("breed") ?? "",
                location: formData.get("location") ?? "",
                };
                setRequestParams(obj);
            }}>
                <label htmlFor="location">
                    Location
                </label>
                <input 
                name="location"
                id="location" 
                placeholder="Location" />
                <label htmlFor="animal">
                    Animal
                </label>
                <select 
                id="animal"
                name="animal"
                onChange={(e) => {
                    setAnimal(e.target.value);
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
                name="breed"
                disabled={!breedList.length}>
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
