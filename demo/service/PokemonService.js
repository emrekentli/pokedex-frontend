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

    getPokemon(id) {
        return axios.get(`/api/pokemons/${id}`, ).then((res) => res.data.data);
    }

    deleteType(id, type) {
        return axios.delete(`/api/pokemons/${id}/types?typeId=${type.id}`, ).then((res) => res.data);
    }
    deleteStat(id, stat) {
        return axios.delete(`/api/pokemons/${id}/stats?statId=${stat.id}`, ).then((res) => res.data);
    }
    deleteAbility(id, ability) {
        return axios.delete(`/api/pokemons/${id}/abilities?abilityId=${ability.id}`, ).then((res) => res.data);
    }

    addType(id,type) {
        return axios.post(`/api/pokemons/${id}/types?typeId=${type.id}`, ).then((res) => res.data.data);
    }
    addAbility(id,ability) {
        return axios.post(`/api/pokemons/${id}/abilities?abilityId=${ability.id}`, ).then((res) => res.data.data);
    }
    addStat(id,stat) {
        return axios.post(`/api/pokemons/${id}/stats?statId=${stat.id}`, ).then((res) => res.data.data);
    }
}
