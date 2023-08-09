import {axiosInstance as axios} from "../../../axiosInterceptorInstance";
import {BaseService} from "../../library/BaseService";

export default class ProductService {

    async getTypes(filter) {
        return await BaseService({
            method: 'GET',
            url: '/types/filter',
            params: filter
        });
    }
    async createType(type) {
        return await BaseService({
            method: 'POST',
            url: '/types',
            data: type
        });
    }
    async deleteType(type) {
        return await BaseService({
            method: 'DELETE',
            url: '/types/'+ type.id,
        });
    }

    async updateType(type) {
        return await BaseService({
            method: 'PUT',
            url: '/types/'+ type.id,
            data: type
        });
    }
}
