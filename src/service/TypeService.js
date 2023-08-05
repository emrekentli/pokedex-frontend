import axios from 'axios';

export default class ProductService {
   

    getTypes(filter) {
        return axios.get('types/filter', { params: filter }).then((res) => res.data.data);
    }
    createType(type) {
        return axios.post('types', type).then((res) => res.data.data);
    }
   deleteType(type) {
        return axios.delete('types/'+ type.id).then((res) => res.data.data);
    }
    updateType(type) {
        return axios.put('types/'+ type.id, type).then((res) => res.data.data);
    }
}
