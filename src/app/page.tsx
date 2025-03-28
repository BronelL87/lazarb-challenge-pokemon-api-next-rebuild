'use client';

import { useState, useEffect } from 'react';
import { DataServices } from '../utils/DataServices';
import { LocalStorage } from '../utils/LocalStorage';
import { PokemonType } from '../utils/Interfaces';
import PokeDisplay from '../components/PokeDisplayComponent';
import Favorites from '../components/Favorites';

export default function Home() {
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const [evolutions, setEvolutions] = useState<string[]>(['N/A']);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchPokemon('bulbasaur');
  }, []);

  const fetchPokemon = async (search: string | number) => {
      const fetchedPokemon = await DataServices.getPokemon(search);
      setPokemon(fetchedPokemon);
      setIsShiny(false);

      const fetchedLocation = await DataServices.getPokemonLocations(
        fetchedPokemon.location_area_encounters
      );
      setLocation(fetchedLocation);

      const fetchedEvolutions = await DataServices.getPokemonEvolutions(
        fetchedPokemon.name
      );
      setEvolutions(fetchedEvolutions);

  };

  const handleSearch = () => {
    if (searchTerm) {
      fetchPokemon(searchTerm.toLowerCase().trim());
    }
  };

  const handleRandomPokemon = async () => {
  
      const randomPokemon = await DataServices.getRandomPokemon();
      console.log("Random Pokemon:", randomPokemon);
  
      if (typeof randomPokemon == "string" || typeof randomPokemon == "number") {
        await fetchPokemon(randomPokemon);
      } else if (randomPokemon && randomPokemon.name) {
        await fetchPokemon(randomPokemon.name);
      } else {
        console.error("Invalid random Pokémon data:", randomPokemon);
      }

  };

  const handleAddFavorite = () => {
    if (pokemon) {
      LocalStorage.saveToLocalStorage(pokemon.name);
      setFavorites(LocalStorage.getLocalStorage());
    }
  };

  const handleToggleShiny = () => {
    setIsShiny(!isShiny);
  };

  const handleOpenFavorites = () => {
    setFavorites(LocalStorage.getLocalStorage());
    setIsModalOpen(true);
  };

  const handleRemoveFavorite = (name: string) => {
    LocalStorage.removeFromLocalStorage(name);
    setFavorites(LocalStorage.getLocalStorage());
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url(/pokeBg.jpg)]">
      <div className="container mx-auto px-4 py-8">

        <div className="flex justify-center mb-8 ">
          <div className="flex items-center bg-[#0008A9CC] p-6 rounded-2xl w-full max-w-4xl sm:w-[600px] h-[100px] mt-[20px] px-4">
          <button 
              onClick={handleSearch}
              className='absolute mr-2'
            >
               <img src="/MagnifyingGlass.png" alt="Magnifying Glass"  />
            </button>
         
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="| Search by Name or Pokedex Number"
              className="w-full p-3 rounded-xl bg-white text-black px-[55px]"
            />


            <button 
              onClick={handleOpenFavorites}
              className="ml-4 bg-[#FF9500] text-white p-3 rounded-xl w-[206px] h-[50px] text-[32px] mt-[10px] cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center"
            >
              Favorites
            </button>
          </div>
        </div>

        {pokemon && (
          <PokeDisplay
            pokemon={pokemon}
            isShiny={isShiny}
            location={location}
            evolutions={evolutions}
            onToggleShiny={handleToggleShiny}
            onAddFavorite={handleAddFavorite}
            onRandomPokemon={handleRandomPokemon}
          />
        )}


        <Favorites 
          isOpen={isModalOpen}
          favorites={favorites}
          onClose={() => setIsModalOpen(false)}
          onRemoveFavorite={handleRemoveFavorite}
        />
      </div>
    </div>
  );
}