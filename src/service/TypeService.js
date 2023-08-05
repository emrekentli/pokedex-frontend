import axios from 'axios';

export default class ProductService {
   

    getTypes(filter) {
        return axios.get('api/types/filter', { params: filter }).then((res) => res.data.data);
    }
    createType(type) {
        return axios.post('api/types', type).then((res) => res.data.data);
    }
   deleteType(type) {
        return axios.delete('api/types/'+ type.id).then((res) => res.data.data);
    }
    updateType(type) {
        return axios.put('api/types/'+ type.id, type).then((res) => res.data.data);
    }
}
