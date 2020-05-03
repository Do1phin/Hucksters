import InfoCounters from '../models/infoCounters.model.js';
import Seller from '../models/seller.model.js';
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createInfo = async (req, res) => {

    try {
    const all_users = await Seller.find({}).countDocuments();
    const banned = await Seller.find({deactivated: "banned"}).countDocuments();
    const closed = await Seller.find({is_closed: true}).countDocuments();
    const deleted = await Seller.find({deactivated: "deleted"}).countDocuments();
    const seller = await Seller.find({seller: true}).countDocuments();

     const counters = await InfoCounters.findOne({info: "counters"}, (err) => {
        if (err) {
            return res.status(400).json({error: getErrorMessage(err)})
        }
    });

     if (counters) {
         return res.status(400).json({counters})
     }

    await new InfoCounters({
        all_users,
        banned,
        closed,
        deleted,
        seller
    }).save((err, counters) => {
        if (err) {
            return res.status(400).json({error: getErrorMessage(err)})
        }
        return res.status(200).json({counters})
    })
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const readInfo = async (req, res) => {
    await InfoCounters.findOne({}, (err, counters) => {
        console.log('counters ', counters)
        if (err) {
            return res.status(400).json({error: getErrorMessage(err)})
        }
        return res.status(200).json({message: 'good', counters: counters})
    })
};

export default {
    createInfo,
    readInfo
}
