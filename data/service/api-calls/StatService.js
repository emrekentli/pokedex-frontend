import axios from 'axios';

export default class ProductService {
   

    getStats(filter) {
        return axios.get('/api/stats/filter', { params: filter }).then((res) => res.data.data);
    }
    createStat(stat) {
        return axios.post('/api/stats', stat).then((res) => res.data.data);
    }
   deleteStat(stat) {
        return axios.delete('/api/stats/'+ stat.id).then((res) => res.data.data);
    }
    updateStat(stat) {
        return axios.put('/api/stats/'+ stat.id, stat).then((res) => res.data.data);
    }
}
