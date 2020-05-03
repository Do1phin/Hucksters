import Seller from '../models/seller.model.js';
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createMember = async (req, res) => {
    let arr = [];
    const {source} = req.body;

    source.map((item) => {
        arr.push({_id: +item, user_id: +item})
    });

    try {
        const sellers = await Seller.insertMany(arr, { ordered: false }, (err) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
        });
        return res.status(200).json({sellers})
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const readMember = async (req, res) => {
    console.log('req match ', req.body)
    const {first_name, skip, limit, status} = req.body;
    let params;

    if (status === 'all' || !status) {
        params = {}
    } else if (status === 'seller') {
        params = {seller: true}
    } else if (status === 'closed') {
        params = {is_closed: true}
    } else if (status === 'banned') {
        params = {deactivated: 'banned'}
    } else if (status === 'deleted') {
        params = {deactivated: 'deleted'}
    }

    if (first_name) {
        params = {...params, first_name: new RegExp(first_name, 'i')}
    }

    try {
        await Seller.find(params)
            .limit(limit)
            .skip(skip || 0)
            .exec((err, sellers) => {
                if (err) {
                    return res.status(400).json({error: getErrorMessage(err)})
                }
                return res.status(200).json({sellers})
            });
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const updateMember = async (req, res) => {
    try {
        const {id, is_closed, first_name, last_name, nickname, domain, sex, country, photo_200, deactivated, seller, info} = req.body;
        console.log('info ', info)

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
                country: country ? country.title : null,
                photo: photo_200,
                _updated: Date.now()
            }
        } else if (info === 'seller') {
            doc = {
                seller: true,
                _updated: Date.now()
            }
        }

        await Seller.findOneAndUpdate(
            {user_id: id},
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


const deleteMember = async (req, res) => {};


export default {
    createMember,
    readMember,
    updateMember,
    deleteMember,
}
