import Photo from '../models/photo.model.js';
import getErrorMessage from "../helpers/dbErrorHandler.js";

const create = async (req, res) => {
    const {id, album_id, owner_id, sizes, text, date, likes, comments} = req.body;

    try {
        Photo.findOne({albumId: id})
            .then((response) => {
                if (response) return res.status(400).json({message: 'Album is already exist'})
            }).catch((err) => console.error(err));

        const photo = new Photo({
            userId: owner_id,
            albumId: album_id,
            photoId: id,
            text,
            date,
            likes: likes.count,
            comments: comments.count,
            photoSizes: sizes,
        });

        await photo.save()
            .catch((err) => getErrorMessage(err));

        return res.status(200).json({message: 'Photo with id ' + id + ' in DB created successfully'})

    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const list = async (req, res) => {
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
            .exec((error, photos) => {
                if (error) return res.status(400).json({
                    error: getErrorMessage(error)
                });
                return res.status(200).json({photos, itemSize: photos.length})
            });

    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const list2 = async (req, res) => {
    try {
        Photo.find()
            .exec((error, photos) => {
                if (error) return res.status(400).json({
                    error: getErrorMessage(error)
                });
                return res.status(200).json({photos, itemSize: photos.length})
            });
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

export default {
    create,
    list,
    list2
}
