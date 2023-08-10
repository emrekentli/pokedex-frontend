import {BaseStorageService} from "../../library/BaseStorageService";

const ITEM_KEY = 'token';
const ROLES_KEY = 'roles';

export class AuthenticationStore extends BaseStorageService {
    setToken(item) {
        this.setItem(ITEM_KEY, item);
    }
    getToken() {
        return this.getItem(ITEM_KEY);
    }
    getRoles() {
        return this.getItem(ROLES_KEY);
    }
    setRoles(item) {
        this.setItem(ROLES_KEY, item);
    }
}
