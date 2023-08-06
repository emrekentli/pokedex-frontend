import axios from 'axios';

export default class PokemonService {


    getPokemons(filter) {
        return axios.get('pokemons/filter', { params: filter }).then((res) => res.data.data);
    }
    createPokemon(pokemon) {
        return axios.post('pokemons', pokemon).then((res) => res.data.data);
    }
   deletePokemon(pokemon) {
        return axios.delete('pokemons/'+ pokemon.id).then((res) => res.data.data);
    }
    updatePokemon(pokemon) {
        return axios.put('pokemons/'+ pokemon.id, pokemon).then((res) => res.data.data);
    }

}
