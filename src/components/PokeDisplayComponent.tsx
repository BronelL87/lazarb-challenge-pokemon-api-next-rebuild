import { PokemonType } from '../utils/Interfaces';

interface PokemonDisplayProps {
  pokemon: PokemonType;
  isShiny: boolean;
  location: string;
  evolutions: string[];
  onToggleShiny: () => void;
  onAddFavorite: () => void;
  onRandomPokemon: () => void;
}

export default function PokeDisplayComponent({
  pokemon, 
  isShiny, 
  location, 
  evolutions, 
  onToggleShiny,
  onAddFavorite,
  onRandomPokemon
}: PokemonDisplayProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-[#0008A9CC] text-white p-6 rounded-2xl">
        <h2 className="font-bold text-center mb-4 text-[32px] sm:text-[40px]">Locations:</h2>
        <p className="text-center text-[24px] sm:text-[32px]">{location}</p>
      </div>


      <div className="bg-[#0008A9CC] text-white p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">

          <button 
            onClick={onAddFavorite}
          >
            <img src="/Star.png" alt="Favorite Button" />
          </button>
          <h1 className="text-2xl font-bold text-[32px] sm:text-[40px]">{pokemon.name} #{pokemon.id}</h1>
          <button 
              onClick={onRandomPokemon}
            >
              <img src="/Shuffle.png" alt="Random Button" />
            </button>

        </div>

        <div className="flex justify-center mb-4">
          <img 
            src={isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default} 
            alt={pokemon.name} 
            className="w-64 h-64"
          />
            <button 
            onClick={onToggleShiny}>
            <img src="/Sparkle.png" alt="Shiny Button" className='mb-[100px]'/>
          </button>
        </div>

        <p className="text-center text-[24px] sm:text-[32px]">
          {pokemon.types.map(t => t.type.name).join(' | ')}
        </p>
      </div>


      <div className="bg-[#0008A9CC] text-white p-6 rounded-2xl">
        <div className="mb-4">
          <h2 className="font-bold text-center mb-2 text-[32px] sm:text-[40px]">Abilities:</h2>
          <p className="text-center text-[24px] sm:text-[32px] w-[90%] sm:w-[400px]">
            {pokemon.abilities.map(a => a.ability.name).join(' | ')}
          </p>
        </div>

      </div>


      <div className="md:col-span-3 bg-[#0008A9CC] text-white p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-center mb-4 text-[32px] sm:text-[40px]">Moves:</h2>
        <div className="max-h-64 overflow-y-auto text-[32px] sm:text-[40px] flex justify-center w-full h-[160px]">
          <p className="text-center text-[24px]">
            {pokemon.moves.map(m => m.move.name).join(' | ')}
          </p>
        </div>
        <div>
          <h2 className="font-bold text-center mb-2 flex justify-center text-[32px] sm:text-[40px] mt-5">Evolutions:</h2>
          <p className="text-center text-[24px] sm:text-[32px]">{evolutions.join(' | ')}</p>
        </div>
      </div>
    </div>
  );
}