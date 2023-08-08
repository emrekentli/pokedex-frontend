import axios from 'axios';

export default class PokemonService {


    getPokemons(filter) {
        return axios.get('/api/pokemons/filter', { params: filter }).then((res) => res.data.data);
    }
    createPokemon(pokemon) {
        return axios.post('/api/pokemons', pokemon).then((res) => res.data.data);
    }
   deletePokemon(pokemon) {
        return axios.delete('/api/pokemons/'+ pokemon.id).then((res) => res.data.data);
    }
    updatePokemon(pokemon) {
        return axios.put('/api/pokemons/'+ pokemon.id, pokemon).then((res) => res.data.data);
    }

}
