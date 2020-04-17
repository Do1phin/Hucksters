import Seller from '../models/seller.model.js';

const create = async (req, res) => {

    try {
        const {item} = req.body;

        const sellerCandidate = await Seller.findOne({userId: item});
        if (sellerCandidate) {
            return res.status(400).json({message: 'User with id ' + item + ' is already exists in DB '})
        }

        const sellerProfile = new Seller({
            userId: item,
        });

        await sellerProfile.save();

        return res.status(200).json({message: 'User with id ' + item + ' created successfully in DB'});

    } catch (e) {
        return res.status(500).json({message: 'Something went wrong with creating user in DB'})
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
            return res.status(400).json({message: 'User with id ' + id + ' not found in DB'});
        }
        return res.status(200).json({message: 'User with id ' + id + ' updated successfully'});

    } catch (e) {
        return res.status(500).json({message: 'Something went wrong with updated user in DB'})
    }
};

const list = async (req, res) => {

    try {
        const sellers = await Seller.find({isSeller: null}).limit(100);

        return res.json(sellers)
    } catch (e) {
        return res.status(500).json({message: 'Something went wrong with download users from DB'})
    }
};


export default {
    create,
    list,
    update,
}
