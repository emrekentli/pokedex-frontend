import { AuthenticationStore} from "../../service/store/AuthenticationStore";

const authenticationStore = new AuthenticationStore();

export const isUserHavePermission = (requiredRoles) => {
    console.log('isUserHavePermission', requiredRoles);
    return requiredRoles.some((component) => authenticationStore.getRoles().includes(component));
};
