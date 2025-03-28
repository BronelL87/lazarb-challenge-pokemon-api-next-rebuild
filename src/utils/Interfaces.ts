export interface PokemonType {
    id: number;
    name: string;
    types: {
      type: {
        name: string;
      };
    }[];
    sprites: {
      front_default: string;
      front_shiny: string;
    };
    abilities: {
      ability: {
        name: string;
      };
    }[];
    moves: {
      move: {
        name: string;
      };
    }[];
    location_area_encounters: string;
  }
  
  export interface PokemonSpecies {
    id: number;
    name: string;
    evolution_chain: {
      url: string;
    };
  }

  export interface EvolutionChain {
    chain: EvolutionNode;
  }
  
  export interface EvolutionNode {
    species: {
      name: string;
    };
    evolves_to: EvolutionNode[];
  }
  
  export interface LocationArea {
    location_area: {
      name: string;
    };
  }