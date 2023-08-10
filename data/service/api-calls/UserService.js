import {BaseService} from "../../library/BaseService";

export default class UserService {
   
   async getUsers(filter) {
       return await BaseService({
           method: 'GET',
              url: '/users/filter',
           params: filter
       });
    }
    async createUser(user) {

        return await BaseService({
            method: 'POST',
            url: '/users',
            data: user
        });
    }
   async deleteUser(user) {
       return await BaseService({
              method: 'DELETE',
              url: '/users/'+ user.id,
         });
    }
    async updateUser(user) {
        return await BaseService({
            method: 'PUT',
            url: '/users/'+ user.id,
            data: user
        });
    }
    async addToCatchlist(pokemon){
       return await BaseService({
              method: 'POST',
                url: '/users/catch/'+ pokemon.id,
            });
    }
    async addToWishlist(pokemon){
        return await BaseService({
            method: 'POST',
            url: '/users/wish/'+ pokemon.id,
        });
    }
    async deleteToCatchlist(pokemon){
       return await BaseService({
                method: 'DELETE',
                url: '/users/catch/'+ pokemon.id,
            });
    }
    async deleteToWishlist(pokemon){
        return await BaseService({
            method: 'DELETE',
            url: '/users/wish/'+ pokemon.id,
        });
    }

    async addRoleToUser(user,role){
        return await BaseService({
            method: 'POST',
            url: '/users/roles/',
            data: {userId: user.id, roleId: role.id}
        });
    }

      async deleteRoleToUser(user,role){
        return await BaseService({
            method: 'DELETE',
            url: '/users/roles/',
            data: {userId: user.id, roleId: role.id}
        });
    }
}
