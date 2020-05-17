import Favorite from '../models/favorite.model.js';
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createFavorite = async (req, res) => {

    try {

        await new Favorite({
            user_id: req.body.user_id,
            favorite_members: [],
            favorite_albums: [],
            favorite_photos: []
        }).save({},(err, favorite) => {
                if (err) return res.status(400).json({err: getErrorMessage(err)});
                return res.status(200).json({favorite})
            })
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const readFavorite = async (req, res) => {
    console.log('readFavorite ', req.body)
    try {
        Favorite.find({photo_id: {$in: [...req.body]}}, (err, favorite) => {
            if (err) return res.status(400).json({err: getErrorMessage(err)});
            console.log('favorite   ', favorite);
            return res.status(200).json(favorite)
        })
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const updateFavorite = async (req, res) => {
    const {owner_id, album_id, photo_id, type} = req.body;

    let object;
    if (type === 'members') {
        object = {$push: {favorite_members: owner_id}};
    } else if (type === 'albums') {
        object = {$push: {favorite_albums: album_id}};
    } else if (type === 'photos') {
        object = {$push: {favorite_photos: photo_id}};
    }

    try {
        await Favorite.findOneAndUpdate({user_id: req.body.user_id}, object,
            {returnOriginal: true},
            (err, favorite) => {
                if (err) return res.status(400).json({error: getErrorMessage(err)});
                return res.status(200).json({favorite})
            })
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const deleteFavorite = async (req, res) => {
    const {owner_id, album_id, photo_id, type} = req.body;

    let object;
    if (type === 'members') {
        object = {$pull: {favorite_members: owner_id}};
    } else if (type === 'albums') {
        object = {$pull: {favorite_albums: album_id}};
    } else if (type === 'photos') {
        object = {$pull: {favorite_photos: photo_id}};
    }

    try {
        await Favorite.updateOne({user_id: req.body.user_id}, object,
            {},
            (err, favorite) => {
            if (err) return res.status(400).json({error: getErrorMessage(err)});
                return res.status(200).json({favorite})
            });
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

export default {
    createFavorite,
    readFavorite,
    updateFavorite,
    deleteFavorite,
}
