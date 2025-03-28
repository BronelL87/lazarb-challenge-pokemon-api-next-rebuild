import { PokemonType, PokemonSpecies, EvolutionChain, LocationArea } from './Interfaces';
  
interface PokeEvolution {
    species: { name: string };
    evolves_to: PokeEvolution[];
  }


  export class DataServices {
    private static BASE_URL = 'https://pokeapi.co/api/v2';
  
    static async getPokemon(search: string | number): Promise<PokemonType> {
     
      const speciesResponse = await fetch(`${this.BASE_URL}/pokemon-species/${search}`);
      const speciesData: PokemonSpecies = await speciesResponse.json();
  
      if (speciesData.id < 1 || speciesData.id > 649) {
       throw alert('Only Pokemon from Generation 1 to 5 are allowed.');
      }
  
      const response = await fetch(`${this.BASE_URL}/pokemon/${speciesData.id}`);
      return await response.json();
    }
  
    static async getRandomPokemon(): Promise<PokemonType> {
      const randomId = Math.floor(Math.random() * 649) + 1;
      return this.getPokemon(randomId);
    }
  
    static async getPokemonLocations(url: string): Promise<string> {
   
        const response = await fetch(url);
        const locationData: LocationArea[] = await response.json();
        
        return locationData.length > 0 
          ? locationData[0].location_area.name 
          : 'N/A';
    
    }
  
    static async getPokemonEvolutions(pokemon: string): Promise<string[]> {
      const speciesResponse = await fetch(`${this.BASE_URL}/pokemon-species/${pokemon}`);
      const speciesData: PokemonSpecies = await speciesResponse.json();
      
      const evolResponse = await fetch(speciesData.evolution_chain.url);
      const evolData: EvolutionChain = await evolResponse.json();
  
      const evolutionNames: string[] = [];
      const filteredEvolutions: string[] = [];
  
      const pullEvolutions = (evo: PokeEvolution) => {
        evolutionNames.push(evo.species.name);
        evo.evolves_to.forEach((nextEvo: PokeEvolution) => pullEvolutions(nextEvo));
      };
  
      pullEvolutions(evolData.chain);
  
      for (const name of evolutionNames) {
        const speciesRes = await fetch(`${this.BASE_URL}/pokemon-species/${name}`);
        const speciesInfo: PokemonSpecies = await speciesRes.json();
  
        if (speciesInfo.id >= 1 && speciesInfo.id <= 649) {
          filteredEvolutions.push(name);
        }
      }
  
      return filteredEvolutions.length > 1 ? filteredEvolutions : ['N/A'];
    }
  }