import InfoCounters from '../models/infoCounters.model.js';
import Seller from '../models/seller.model.js';
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createInfo = async (req, res) => {

    const all_users = await Seller.find({}).countDocuments();
    const banned = await Seller.find({deactivated: "banned"}).countDocuments();
    const closed = await Seller.find({is_closed:true}).countDocuments();
    const deleted = await Seller.find({deactivated: "deleted"}).countDocuments();
    const seller = await Seller.find({seller: true}).countDocuments();

    await InfoCounters.find({info:"counters"}, (err, counters) => {
        if (err) {
            return res.status(400).json({error: getErrorMessage(err)})
        }
        return res.status(400).json({message: 'Counters is already exist', counters})
    }).catch((err) => console.error(err));

    new InfoCounters({
        all_users,
        banned,
        closed,
        deleted,
        seller
    }).save((err, counters) => {
        console.log(err, counters)
        if (err) {
            return res.status(400).json({error: getErrorMessage(err)})
        }
        return res.status(200)
    })
};

const readInfo = async (req, res) => {
    await InfoCounters.findOne({}, (err, counters) => {
        console.log('counters ', counters)
        if (err) {
            return res.status(400).json({error: getErrorMessage(err)})
        }
        return res.status(200).json({message: 'good'})
    })
};

export default {
    createInfo,
    readInfo
}
