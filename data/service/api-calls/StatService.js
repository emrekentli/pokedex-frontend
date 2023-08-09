import axios from 'axios';
import {BaseService} from "../../library/BaseService";

export default class ProductService {

    async getStats(filter) {
        return await BaseService({
            method: 'GET',
            url: '/stats/filter',
            params: filter
        });
    }
    async createStat(stat) {
        return await BaseService({
            method: 'POST',
            url: '/stats',
            data: stat
        });
    }
   async deleteStat(stat) {
        return await BaseService({
            method: 'DELETE',
            url: '/stats/'+ stat.id,
        });
    }
    async updateStat(stat) {
        return await BaseService({
            method: 'PUT',
            url: '/stats/'+ stat.id,
            data: stat
        });
    }
}
