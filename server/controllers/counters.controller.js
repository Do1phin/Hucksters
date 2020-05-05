import Counters from '../models/counters.model.js';
import Seller from '../models/seller.model.js';
import Albums from '../models/album.model.js';
import Photos from '../models/photo.model.js';
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createCounters = async (req, res) => {

    try {
        const all_members = await Seller.find({}).countDocuments();
        const banned = await Seller.find({deactivated: "banned"}).countDocuments();
        const closed = await Seller.find({is_closed: true}).countDocuments();
        const deleted = await Seller.find({deactivated: "deleted"}).countDocuments();
        const seller = await Seller.find({seller: true}).countDocuments();

        const all_albums = await Albums.find({}).countDocuments();

        const all_photos = await Photos.find({}).countDocuments();

        const counters = await Counters.findOne({info: "counters"}, (err) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
        });

        if (counters) {
            return res.status(400).json(counters)
        }

        await new Counters({
            all_members,
            banned,
            closed,
            deleted,
            seller,
            all_albums,
            all_photos,
        }).save((err, counters) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
            return res.status(200).json(counters)
        })
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const readCounters = async (req, res) => {
    await Counters.findOne({}, (err, counters) => {
        if (err) {
            return res.status(400).json({error: getErrorMessage(err)})
        }
        return res.status(200).json(counters)
    })
};

const updateCounters = async (req, res) => {
    const doc = [];
    await Counters.findOneAndUpdate(
        {},
        {$set: 'doc'},
        {new: false},
        (err, counters) => {
        if (err) {
            return res.status(400).json({error: getErrorMessage(err)})
        }
    })
};

export default {
    createCounters,
    readCounters,
    updateCounters,
}
