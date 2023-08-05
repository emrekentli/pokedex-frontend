import axios from 'axios';

export default class ProductService {
   

    getAbilities(filter) {
        return axios.get('abilities/filter', { params: filter }).then((res) => res.data.data);
    }
    createAbility(ability) {
        return axios.post('abilities', ability).then((res) => res.data.data);
    }
   deleteAbility(ability) {
        return axios.delete('abilities/'+ ability.id).then((res) => res.data.data);
    }
    updateAbility(ability) {
        return axios.put('abilities/'+ ability.id, ability).then((res) => res.data.data);
    }
}
