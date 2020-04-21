import Seller from '../models/seller.model.js';

const create = async (req, res) => {
    let arr = [];

    const {source} = req.body;

    source.map((item) => {
        arr.push({userId: item})
    });

    try {

        await Seller.insertMany(arr)
            .then(data => {
                console.log('data ',data);
                return res.status(200).json({success: true, data, message: 'Users created successfully in DB'})
            })

    } catch (e) {
        return res.status(500).json({success: false, e, message: 'Something went wrong with creating user in DB'})
    }
};

const update = async (req, res) => {

    try {

        const {id, is_closed, first_name, last_name, nickname, domain, sex, country, photo_200, deactivated} = req.body;

        const sellerNew = await Seller.findOneAndUpdate(
            {userId: id},
            {
                $set: {
                    isClosed: is_closed,
                    isDeactivated: deactivated ? deactivated : null,
                    firstName: first_name,
                    lastName: last_name,
                    nickName: nickname,
                    domain: domain,
                    sex: sex,
                    country: country ? country.title : null,
                    photo: photo_200,

                }
            },
            {
                returnOriginal: false
            }
        );

        if (!sellerNew) {
            return res.status(400).json({success: false, message: 'User with id ' + id + ' not found in DB'});
        }
        return res.status(200).json({success: true, message: 'User with id ' + id + ' updated successfully'});

    } catch (e) {
        return res.status(500).json({success: false, e, message: 'Something went wrong with updated user in DB'})
    }
};

const list = async (req, res) => {

    const {firstName, skip, limit} = req.body;
    let params;

    if (!firstName) {
        params = {}
    } else {
        params = {firstName: new RegExp(firstName, 'i')}
    }

    try {
        await Seller.find(params)
            .limit(limit)
            .skip(skip)
            .exec((e, sellers) => {
                if (e) return res.status(400).json({success: false, e, message: 'No sellers'});
                return res.status(200).json({success: true, sellers, sellerSize: sellers.length})
            });

    } catch (e) {
        return res.status(500).json({success: false, e, message: 'Something went wrong with download users from DB'})
    }
};


export default {
    create,
    list,
    update,
}
