// Mongoose models
import Member from '../models/member.model.js';
// Utils
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createMember = async (req, res) => {
    const fields = req.body;
    console.log('createMember')
    try {
        // const sellers = await Seller.insertMany(arr, { ordered: false, acknowledged: false }, (err) => {
        //     if (err) {
        //         return res.status(400).json({error: getErrorMessage(err)})
        //     }
        // });

        // const members = await Member.insertMany(arr, {ordered: true, acknowledged: true}, (err) => {
        //     if (err) {
        //         return res.status(400).json({error: getErrorMessage(err)})
        //     }
        //     return res.status(200).json({members})
        // });

        const member = await Member.findOne(fields, (err) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
        });
        if (member) return res.status(400).json({message: 'This member is already exist'});

        new Member(fields)
            .save((err, member) => {
                if (err) {
                    return res.status(400).json({error: getErrorMessage(err)});
                }
                return res.status(200).json(member)
            })

    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const readMember = async (req, res) => {
    console.log('readMember')
    const {owner_id, search_text, skip, limit, status, country, flagTotalMembers} = req.body;
    let params;

    if (status === 'all' || !status) {
        params = {}
    } else if (status === 'id') {
        params = {owner_id: owner_id}
    } else if (status === 'seller') {
        params = {seller: true}
    } else if (status === 'closed') {
        params = {is_closed: true}
    } else if (status === 'banned') {
        params = {deactivated: 'banned'}
    } else if (status === 'deleted') {
        params = {deactivated: 'deleted'}
    } else if (status === 'rest') {
        params = {} // доделать чтобы только оставшихся брало
    } else if (status === 'check_params') {
        params = {}
    }

    if (search_text) {
        // params = {...params, first_name: new RegExp(first_name, 'i'), last_name: new RegExp(first_name, 'i')}
        params = {
            $or: [
                {first_name: new RegExp(search_text, 'i')},
                {last_name: new RegExp(search_text, 'i')},
            ]
        }
    }

    if (country) {
        params = {...params, 'country.title': country}
    }

    try {

        let totalMembers;
        if (flagTotalMembers) {
            totalMembers = await Member.find(params).countDocuments()
        }

        await Member.find(params)
            .limit(limit)
            .skip(skip || 0)
            .exec((err, members) => {
                if (err) {
                    return res.status(400).json({error: getErrorMessage(err)})
                }
                return res.status(200).json({members, totalMembers})
            });
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const readManyMembersForIds = async (req, res) => {
    console.log('readManyMembersForIds')
    // const member_ids = req.body;
    const member_ids = [52980405];

    try {
        await Member.find({
            'owner_id': {$in: [...member_ids]}
        }).exec((err, members) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
            return res.status(200).json(members)
        })
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const updateMember = async (req, res) => {

    try {
        const {
            id, owner_id, is_closed, first_name, last_name, nickname, domain, sex, country,
            photo_200, deactivated, seller, info, instagram
        } = req.body;

        let doc = {
            is_closed,
            deactivated: deactivated || null,
            first_name,
            last_name,
            nickname,
            domain,
            sex,
            instagram: instagram || undefined,
            country: country ? {
                id: country.id ? country.id : undefined,
                title: country.title ? country.title : undefined,
            } : undefined,
            photo: photo_200,
            _updated: {
                date: Date.now(),
                info: 'full'
            },
        };

        await Member.findOneAndUpdate(
            {owner_id: id || owner_id},
            {
                $set: doc
            },
            {new: false},
            (err, seller) => {
                if (err) {
                    return res.status(400).json({error: getErrorMessage(err)})
                }
                return res.status(200).json(seller);
            }
        )
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};


const deleteMember = async (req, res) => {
};


export default {
    createMember,
    readMember,
    readManyMembersForIds,
    updateMember,
    deleteMember,
}
