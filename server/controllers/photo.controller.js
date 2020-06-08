// Mongoose models
import Photo from '../models/photo.model.js';
// Utils
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createPhoto = async (req, res) => {

    const {id, album_id, owner_id, sizes, text, date, likes, comments} = req.body;

    try {
        const photo = await Photo.findOne({photo_id: id}, (err) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
        });

        if (photo) return res.status(400).json({message: 'Photos is already exist', photo});

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

    const {text, skip, limit, sort, flagTotalPhotos} = req.body;
    const sortParams = {'date': sort};
    let params;

    if (!text) {
        params = {}
    } else {
        params = {text: new RegExp(text, 'i')}
    }

    try {

        let totalPhotos;
        if (flagTotalPhotos) {
            totalPhotos = await Photo.find(params).countDocuments()
        }

        const photos = await Photo.find(params)
            .sort(sortParams)
            .limit(limit)
            .skip(skip)
            .exec((err, photos) => {
                if (err) return res.status(400).json({
                    error: getErrorMessage(err)
                });
                return res.status(200).json({photos, totalPhotos})
            });
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

//updateFavoritePhotoCount
const updateFavoritePhotoCount = async (req, res) => {
    const {photo_id, operation} = req.body;

    try {
        Photo.findOneAndUpdate(
            {photo_id: photo_id},
            {
                // $set: {
                $inc: {
                    favorites: operation === 'inc' ? 1 : -1
                    // }
                }
            },
            {returnOriginal: false},
            (err, photo) => {
                if (err) return res.status(400).json({
                    error: getErrorMessage(err)
                });
                return res.status(200).status({photo});
            }
        )
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const decFavoritePhotoCount = async (req, res) => {
    const {photo_id} = req.body;

    try {
        Photo.findOneAndUpdate(
            {photo_id: photo_id},
            {
                // $set: {
                $dec: {
                    favorites: -1
                    // }
                }
            },
            {returnOriginal: false},
            (err, photo) => {
                if (err) return res.status(400).json({
                    error: getErrorMessage(err)
                });
                return res.status(200).status({photo});
            }
        )
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

// updateAdditionalPhotosCount
const updatePhoto = async (req, res) => {
    console.log('updatePhoto req,body ', req.body)
    const {photo_id, additionalPhotosCount} = req.body;
    try {
        Photo.findOneAndUpdate(
            {photo_id: id},
            {
                $set: {
                    additional_photos: +1
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
    updateFavoritePhotoCount
}
