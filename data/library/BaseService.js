import {axiosInstance as axios} from "../../axiosInterceptorInstance";


export const BaseService = async ({ method, url, params, data }) => {
    try {
        const response = await axios({
            method,
            url,
            params,
            data
        });

        return { data: response.data, status: response.status };
    } catch (error) {
        if (error.response) {
            return { error: error.response.data, status: error.response.status };
        } else {
            return { error: 'Network Error', status: 500 };
        }
    }
};
