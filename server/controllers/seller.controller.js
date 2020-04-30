import Seller from '../models/seller.model.js';
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createMember = async (req, res) => {
    let arr = [];
    const {source} = req.body;

    source.map((item) => {
        arr.push({user_id: +item})
    });

    try {
        await Seller.insertMany(arr, (err, sellers) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
            return res.status(200).json({sellers})
        })
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const readMember = async (req, res) => {
    const {first_name, skip, limit} = req.body;
    let params;

    if (!first_name) {
        params = {}
    } else {
        params = {first_name: new RegExp(first_name, 'i')}
    }

    const membersList = await Seller.find({
        seller:null, is_closed:null, deactivated:null
    });

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
        const {id, is_closed, first_name, last_name, nickname, domain, sex, country, photo_200, deactivated} = req.body;
        await Seller.findOneAndUpdate(
            {user_id: id},
            {
                $set: {
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
