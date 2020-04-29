import Group from '../models/group.model.js';
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createGroup = async (req, res) => {
    console.log('req b ', req.body)
    const {group_id, name, photo, size} = req.body;

    try {
        await Group.findOne({group_id}, (err, group) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }

            new Group({
                group_id,
                name,
                size,
                photo
            }).save((err, group) => {
                if (err) {
                    return res.status(400).json({error: getErrorMessage(err)})
                }
                return res.status(200).json({group})
            });
        });
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const readGroup = async (req, res) => {

    try {
        await Group.find((err, group) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
            return res.status(200).json({group})
        })
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const updateGroup = async (req, res) => {
    const {id, name, size, photo_200} = req.body;
    console.log('groupUpdate ', req.body);

    try {
        await Group.findOneAndUpdate({group_id: id},
            {
                $set: {
                    name: name,
                    size: size,
                    photo: photo_200,
                }
            },
            {returnOriginal: false},
            (err, group) => {
                if (err) {
                    return res.status(400).json({error: getErrorMessage(err)})
                }
                return res.status(200).json({group})
            })
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const deleteGroup = async (req, res) => {
    const {group_id} = req.body;
    console.log('groupRemove', req.body);

    try {
        await Group.deleteOne({group_id: group_id}, (err, group) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
            return res.status(200).json({group})
        })
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};


export default {
    createGroup,
    readGroup,
    updateGroup,
    deleteGroup,
}
