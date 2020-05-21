import Counters from '../models/counters.model.js';
import Member from '../models/member.model.js';
import Albums from '../models/album.model.js';
import Photos from '../models/photo.model.js';
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createCounters = async (req, res) => {

    try {
        const all_members = await Member.find({}).countDocuments();
        const with_info = await Member.find({'first_name': {$ne: null}}).countDocuments();
        const banned = await Member.find({deactivated: "banned"}).countDocuments();
        const closed = await Member.find({is_closed: true}).countDocuments();
        const deleted = await Member.find({deactivated: "deleted"}).countDocuments();
        const seller = await Member.find({seller: true}).countDocuments();

        const all_albums = await Albums.find({}).countDocuments();

        const all_photos = await Photos.find({}).countDocuments();
        const photo_with_text = await Photos.find({text: {$ne: ""}}).countDocuments();
        const photo_with_addit_photo = await Photos.find({additional_photos: {$gt: 0}}).countDocuments();

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
            with_info,
            banned,
            closed,
            deleted,
            seller,
            all_albums,
            all_photos,
            photo_with_text,
            photo_with_addit_photo
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

const deleteCounters = async (req, res) => {
    await Counters.deleteOne(
        {info:"counters"},
        {},
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
    deleteCounters
}
