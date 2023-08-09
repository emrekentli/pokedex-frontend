import {BaseService} from "../../library/BaseService";

export default class PokemonService {
    async getPokemons(filter) {
        return await BaseService({
            method: 'GET',
            url: '/pokemons/filter',
            params: filter
        });
    }

    async createPokemon(pokemon) {
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

    async deletePokemonFromCatchlist(pokemon) {
        return await BaseService({
            method: 'DELETE',
            url: `/users/catch/${pokemon.id}`,
        });
    }
    async deletePokemonFromWishlist(pokemon) {
        return await BaseService({
            method: 'DELETE',
            url: `/users/wish/${pokemon.id}`,
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

    async getCatchlist(filter) {
        return await BaseService({
            method: 'GET',
            url: `/pokemons/catchlist`,
            params: filter
        });
    }

    async getWishlist(filter) {
        return await BaseService({
            method: 'GET',
            url: `/pokemons/wishlist`,
            params: filter
        });
    }
}
