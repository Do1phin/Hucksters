import {call, getMembersGroupFromVk, getMembersInfoFromVk} from '../../components/admin/_api-vk';
import {store} from '../../redux/store';
import {CheckerSetStepNumberAction} from '../../redux/actions/check.actions';
import {APICreateMembersToDB, APIUpdateMembersInDB} from '../Members/members.api';
import {useDispatch} from 'react-redux';
import {CHECK_GROUP_SET_GROUP_SIZE, CHECK_GROUP_SET_ID_CHECKING_GROUP} from "./checkGroup.constants";

const APIGetAllMembers = async (group_id) => {

    // const dispatch = useDispatch();

    try {
        const members = await call('groups.getMembers', {group_id: group_id, v: 5.107});
        const membersSize = await members.response.count;
        store.dispatch({ type: CHECK_GROUP_SET_ID_CHECKING_GROUP, payload: group_id});
        store.dispatch({ type: CHECK_GROUP_SET_GROUP_SIZE, payload: membersSize});

        let count = 0;

        (function next() {
            console.info(`Step ${count} from ${Math.ceil(membersSize / 1000)}`);
            if (count < Math.ceil(membersSize / 1000)) {
                store.dispatch(CheckerSetStepNumberAction(count));
                const obj = {group_id: group_id, count};

                // const pretendent_members = Promise.resolve(getMembersGroupFromVk(obj));
                // console.log('pretendent_members ', pretendent_members);
                // const created_members = Promise.resolve(APICreateMembersToDB(pretendent_members));
                // console.log('created_members ', created_members);
                // const members_with_info = Promise.resolve(getMembersInfoFromVk(created_members));
                // console.log('members_with_info ', members_with_info);

                Promise.resolve(obj)
                    .then(getMembersGroupFromVk)
                    .then((response) => {
                        console.log('getMembersGroupFromVk 1 ', response)
                        return response // массив пользователей группы
                    }).then(APICreateMembersToDB)
                    .then((response) => {
                        console.log('APIGetAllMembers 2 ', response)
                        return response // массив пользователей группы
                    }).then(getMembersInfoFromVk)
                    .then((response) => {
                        response.map((item) => {
                            return item['info'] = 'full'
                        });
                        console.log('getMembersInfoFromVk 3 ', response)
                        return response // массив пользователей группы с информацией
                    }).then(APIUpdateMembersInDB)
                    .catch((err) => console.error(err));

                count++;
                setTimeout(next, 100000);
            } else {
                console.log('All members added');
            }
        }());

    } catch (e) {
        throw new Error(e)
    }
};

const APICheckAllMembers = async (group_id) => {

};

export {
    APIGetAllMembers
}
