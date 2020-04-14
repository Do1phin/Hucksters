import {sendRequest} from '../helpers/vkApiHandler.js';

const getMembers = async (req, res) => {
    const params = {
        group_id: 115050558,
        sort: 'id_asc',
        count: 1000,
        offset: 0
    };
    const data = await sendRequest('groups.getMembers', params);
    return data;
};

export default {
    getMembers,
}
