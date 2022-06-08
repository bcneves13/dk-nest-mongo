import axios from 'axios';

const auth = {
    username: process.env.LINKAPI_USERNAME,
    password: process.env.LINKAPI_PASSWORD
}

const linkAPI = axios.create({
    baseURL: process.env.LINKAPI,
    auth
});

const LinkAPI = {
    async getUsers(pageLimit) {
        try {
            const response = await linkAPI.get('/users/', {params: {limit: pageLimit.limit, page: pageLimit.page}});
            return response;
        } catch(error) {
            return error;
        }
    },
    async getAddresses(id) {
        try {
            const response = await linkAPI.get(`/users/${id}/address`);
            return response;
        } catch(error) {
            return error;
        }
    },
    async getContacts(id) {
        try {
            const response = await linkAPI.get(`/users/${id}/contacts`);
            return response;
        } catch(error) {
            return error;
        }
    }
}

export default LinkAPI;
