import axios from 'axios';

export default class ProductService {
   

    getStats(filter) {
        return axios.get('stats/filter', { params: filter }).then((res) => res.data.data);
    }
    createStat(stat) {
        return axios.post('stats', stat).then((res) => res.data.data);
    }
   deleteStat(stat) {
        return axios.delete('stats/'+ stat.id).then((res) => res.data.data);
    }
    updateStat(stat) {
        return axios.put('stats/'+ stat.id, stat).then((res) => res.data.data);
    }
}
