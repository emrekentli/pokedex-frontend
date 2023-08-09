import axios from 'axios';

export default class UserService {
   
    getUsers(filter) {
        return axios.get('/api/users/filter', { params: filter }).then((res) => res.data.data);
    }
    createUser(stat) {
        return axios.post('/api/users', stat).then((res) => res.data.data);
    }
   deleteUser(stat) {
        return axios.delete('/api/users/'+ stat.id).then((res) => res.data.data);
    }
    updateUser(stat) {
        return axios.put('/api/users/'+ stat.id, stat).then((res) => res.data.data);
    }
    addToCatchlist(pokemon){
        return axios.post(`/api/users/catch/${pokemon.id}`).then((res) => res.data.data);
    }
    addToWishlist(pokemon){
        return axios.post(`/api/users/wish/${pokemon.id}`).then((res) => res.data.data);
    }
    deleteToCatchlist(pokemon){
        return axios.delete(`/api/users/catch/${pokemon.id}`).then((res) => res.data.data);
    }
    deleteToWishlist(pokemon){
        return axios.delete(`/api/users/wish/${pokemon.id}`).then((res) => res.data.data);
    }
}
