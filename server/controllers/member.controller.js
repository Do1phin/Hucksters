import Member from '../models/member.model.js';
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createMember = async (req, res) => {
    let arr = [];
    const {source} = req.body;

    await source.map((item) => {
        arr.push({"owner_id": +item})
    });

    try {
        // const sellers = await Seller.insertMany(arr, { ordered: false, acknowledged: false }, (err) => {
        //     if (err) {
        //         return res.status(400).json({error: getErrorMessage(err)})
        //     }
        //
        // });

        const members = await Member.insertMany(arr, {ordered: false, acknowledged: true}, (err) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
            return res.status(200).json({members})
        });
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const readMember = async (req, res) => {

    const {first_name, skip, limit, status, owner_id} = req.body;
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
    }

    if (first_name) {
        // params = {...params, first_name: new RegExp(first_name, 'i'), last_name: new RegExp(first_name, 'i')}
        params = {
            $or: [
                {first_name: new RegExp(first_name, 'i')},
                {last_name: new RegExp(first_name, 'i')}
            ]
        }
    }

    try {
        await Member.find(params)
            .limit(limit)
            .skip(skip || 0)
            .exec((err, sellers) => {
                if (err) {
                    return res.status(400).json({error: getErrorMessage(err)})
                }

                return res.status(200).json(sellers)
            });
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

        let doc;
        if (info === 'full') {
            doc = {
                is_closed,
                deactivated: deactivated ? deactivated : null,
                first_name,
                last_name,
                nickname,
                domain,
                sex,
                instagram,
                country: {
                    id: country.id,
                    title: country.title,
                },
                photo: photo_200,
                _updated: {
                    date: Date.now(),
                    info
                },
                // _obj: JSON.stringify(req.body)
            }
        } else if (info === 'seller') {
            doc = {
                seller: true,
                _updated: {
                    date: Date.now(),
                    info
                }
            }
        } else if (info === 'check_one') {
            doc = {
                seller: true,
                _updated: {
                    date: Date.now(),
                    info
                }
            }
        }

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
    updateMember,
    deleteMember,
}
