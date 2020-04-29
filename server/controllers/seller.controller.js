import Seller from '../models/seller.model.js';
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createMember = async (req, res) => {
    console.log('createMembersToDB ', req.body)
    let arr = [];
    const {source} = req.body;

    source.map((item) => {
        arr.push({userId: item})
    });

    try {
        await Seller.insertMany({arr}, (err, sellers) => {
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
    console.log('req.body ', req.body );
    const {first_name, skip, limit} = req.body;
    let params;

    if (!first_name) {
        params = {}
    } else {
        params = {firstName: new RegExp(first_name, 'i')}
    }

    try {
        await Seller.find(params)
            .limit(limit)
            .skip(skip)
            .exec((err, sellers) => {
                if (err) {
                    return res.status(400).json({error: getErrorMessage(err)})
                }
                return res.status(200).json({sellers, itemSize: sellers.length})
            });
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const updateMember = async (req, res) => {

    try {
        const {id, is_closed, first_name, last_name, nickname, domain, sex, country, photo_200, deactivated} = req.body;
        await Seller.findOneAndUpdate(
            {userId: id},
            {
                $set: {
                    is_closed,
                    deactivated: deactivated ? deactivated : null,
                    first_name,
                    last_name,
                    nickname,
                    domain,
                    sex: sex,
                    country: country ? country.title : null,
                    photo: photo_200,
                    _updated: Date.now()
                }
            },
            {returnOriginal: false},
            (err, seller) => {
                if (err) {
                    return res.status(400).json({error: getErrorMessage(err)})
                }
                return res.status(200).json({seller});
            }
        )
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const updateIsSeller = async (req, res) => {
    try {
        const {memberId} = req.body;

        await Seller.findOneAndUpdate(
            {userId: memberId},
            {
                $set: {
                    isSeller: true,
                    _updated: Date.now()
                }
            },
            {returnOriginal: false},
            (err, seller) => {
                if (err) {
                    return res.status(400).json({error: getErrorMessage(err)})
                }
                return res.status(200).json({message: 'User with id ' + id + ' updated', seller});
            }
        );

    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const listForCheck = async (req, res) => {
    try {

        const allMembers = await Seller.find({}).count();
        const bannedMembers = await Seller.find({"isDeactivated": "banned"}).count();
        const deletedMembers = await Seller.find({"isDeactivated": "deleted"}).count();
        const closedPageMembers = await Seller.find({"isClosed": true}).count();
        // const closedAlbumMembers = await Seller.find({}).count();
        const sellerMembers = await Seller.find({"isSeller": true}).count();

        const membersList = await Seller.find({
            isSeller:null, isClosed:null, isDeactivated:null
        }, (err, membersLis) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
            return res.status(200).json({membersList})
        });

        const info = {
            allMembers,
            bannedMembers,
            deletedMembers,
            closedPageMembers,
            sellerMembers,
            membersList
        };

        return res.status(200).json({success: true, info})

    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

export default {
    createMember,
    readMember,
    updateMember,
    listForCheck,
    updateIsSeller
}
