import {BaseService} from "../../library/BaseService";

export default class AbilityService{
    async get(filters) {
        return await BaseService({
            method: 'GET',
            url: 'abilities/filter',
            params: filters
        });
    }
    async create(ability) {
        return await BaseService({
            method: 'POST',
            url: 'abilities',
            data: ability
        });
    }
    async delete(item) {
        return await BaseService({
            method: 'DELETE',
            url: `licenses/${item.id}`,
        });
    }
    async update(item) {
        return await BaseService({
            method: 'PUT',
            url: `abilities/${item.id}`,
            data: item
        });
    }
}
