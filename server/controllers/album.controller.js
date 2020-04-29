import Album from '../models/album.model.js';
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createAlbum = async (req, res) => {
    try {
        const {owner_id, id, thumb_id, title, sizes, created, updated, size} = req.body;

        await Album.findOne({album_id: id}, (err, album) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
            return res.status(400).json({message: 'Album is already exist', album})
        }).catch((err) => console.error(err));

        new Album({
            user_id: owner_id,
            album_id: id,
            thumb_id,
            title,
            photo: sizes[sizes.length - 1].src,
            created,
            updated,
            size
        }).save((err, album) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)});
            }
            return res.status(200).json({message: 'Album with id ' + id + ' was created', album})
        });
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const readAlbum = async (req, res) => {

    const {title, skip, limit, sort} = req.body;
    const sortParams = {"updated": sort};
    let params;

    if (!title) {
        params = {}
    } else {
        params = {title: new RegExp(title, 'i')}
    }

    try {

        await Album.find(params)
            .sort(sortParams)
            .limit(limit)
            .skip(skip)
            .exec((err, albums) => {
                if (err) {
                    return res.status(400).json({error: getErrorMessage(err)})
                }
                return res.status(200).json({albums, itemSize: albums.length})
            })
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const updateAlbum = async (req, res) => {
    console.log('updateAlbums ', req.body);
    const {id, user_id, thumb_id, title, size, photo, updated} = req.body;

    try {
        await Album.findOneAndUpdate({album_id: id},
            {
                $set: {
                    user_id,
                    album_id: id,
                    thumb_id,
                    title,
                    size,
                    photo,
                    updated,
                }
            },
            {returnOriginal: false},
            (err, album) => {
                if (err) {
                    return res.status(400).json({error: getErrorMessage(err)})
                }
                return res.status(200).json({album})
            });
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const deleteAlbum = async (req, res) => {
};

export default {
    createAlbum,
    readAlbum,
    updateAlbum,
    deleteAlbum
}
