import Photo from '../models/photo.model.js';
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createPhoto = async (req, res) => {

    const {id, album_id, owner_id, sizes, text, date, likes, comments} = req.body;

    try {
        const photo = await Photo.findOne({photo_id: id}, (err) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
        });

        if (photo) return res.status(400).json({message: 'Photo is already exist', photo});

        new Photo({
            owner_id,
            album_id,
            photo_id: id,
            text,
            date,
            likes: likes.count,
            comments: comments.count,
            photo_sizes: sizes,
        }).save((err, photo) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
            return res.status(200).json(photo)
        })
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const readPhoto = async (req, res) => {
    const {text, skip, limit, sort} = req.body;
    const sortParams = {'date': sort};
    let params;

    if (!text) {
        params = {}
    } else {
        params = {text: new RegExp(text, 'i')}
    }

    try {
        await Photo.find(params)
            .sort(sortParams)
            .limit(limit)
            .skip(skip)
            .exec((err, photos) => {
                if (err) return res.status(400).json({
                    error: getErrorMessage(err)
                });
                return res.status(200).json({photos})
            });
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

// updateAdditionalPhotosCount
const updatePhoto = async (req, res) => {
    console.log('req,body ', req.body)
    const {photo_id, additionalPhotosCount} = req.body;
    try {
        Photo.findOneAndUpdate(
            {photo_id: id},
            {
                $set: {
                    additional_photos: 77
                }
            },
            {returnOriginal: false},
            (err, photo) => {
                if (err) return res.status(400).json({
                    error: getErrorMessage(err)
                });
                return res.status(200).json({photo})
            }
        )
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const deletePhoto = async (req, res) => {
};

export default {
    createPhoto,
    readPhoto,
    updatePhoto,
    deletePhoto,
}
