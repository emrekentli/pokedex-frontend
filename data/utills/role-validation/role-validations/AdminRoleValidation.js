import {isUserHavePermission} from "../RoleValidationBase";

export const isHaveAdminRole = () => {
    const requiredRoles = ['ROLE_ADMIN'];
    return isUserHavePermission(requiredRoles);
};
