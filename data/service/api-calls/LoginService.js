import {BaseService} from "../../library/BaseService";

export default class LoginService {

    async login(user) {
        return await BaseService({
            method: 'POST',
            url: 'abilities/filter',
            data: user
        });
    }


}
