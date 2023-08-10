import {BaseService} from "../../library/BaseService";

export default class ProductService {

    async getRoles(filter) {
        return await BaseService({
            method: 'GET',
            url: '/roles/filter',
            params: filter
        });
    }
    async createRole(type) {
        return await BaseService({
            method: 'POST',
            url: '/roles',
            data: type
        });
    }
    async deleteRole(type) {
        return await BaseService({
            method: 'DELETE',
            url: '/roles/'+ type.id,
        });
    }

    async updateRole(type) {
        return await BaseService({
            method: 'PUT',
            url: '/roles/'+ type.id,
            data: type
        });
    }
}
