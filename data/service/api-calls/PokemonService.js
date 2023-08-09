import {BaseService} from "../../library/BaseService";

export default class PokemonService {
    async getPokemons(filter) {
        return await BaseService({
            method: 'GET',
            url: '/pokemons/filter',
            params: filter
        });
    }

    async createPokemon(pokemon, file) {
        return await BaseService({
            method: 'POST',
            url: '/pokemons',
            data: pokemon,
            header: {
                'Content-Type': 'multipart/form-data',
            }
        });
    }

    async deletePokemon(pokemon) {
        return await BaseService({
            method: 'DELETE',
            url: `/pokemons/${pokemon.id}`,
        });
    }

    async updatePokemon(pokemon) {
        return await BaseService({
            method: 'PUT',
            url: `/pokemons/${pokemon.id}`,
            data: pokemon
        });
    }

    async getPokemon(id) {
        return await BaseService({
            method: 'GET',
            url: `/pokemons/${id}`,
        });
    }

    async deleteType(id, type) {
        return await BaseService({
            method: 'DELETE',
            url: `/pokemons/${id}/types?typeId=${type.id}`,
        });
    }

    async deleteStat(id, stat) {
        return await BaseService({
            method: 'DELETE',
            url: `/pokemons/${id}/stats?statId=${stat.id}`,
        });
    }

    async deleteAbility(id, ability) {
        return await BaseService({
            method: 'DELETE',
            url: `/pokemons/${id}/abilities?abilityId=${ability.id}`,
        });
    }

    async addType(id, type) {
        return await BaseService({
            method: 'POST',
            url: `/pokemons/${id}/types?typeId=${type.id}`,
        });
    }

    async addAbility(id, ability) {
        return await BaseService({
            method: 'POST',
            url: `/pokemons/${id}/abilities?abilityId=${ability.id}`,
        });
    }

    async addStat(id, stat) {
        return await BaseService({
            method: 'POST',
            url: `/pokemons/${id}/stats`,
            data: stat
        });
    }
}
