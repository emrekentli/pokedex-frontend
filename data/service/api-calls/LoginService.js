import {BaseService} from "../../library/BaseService";

export default class LoginService {
    async login(user) {
        return await BaseService({
            method: 'POST',
            url: 'auth/login',
            data: user
        });
    }
    async logout() {
        return await BaseService({
            method: 'POST',
            url: 'auth/logout'
        });
    }
}
