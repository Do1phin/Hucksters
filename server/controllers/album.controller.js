import Album from '../models/album.model.js';
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createAlbum = async (req, res) => {
    try {
        const {owner_id, id, thumb_id, title, sizes, created, updated, size} = req.body;

        const album = await Album.findOne({album_id: id}, (err) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
        });
        if (album) return res.status(400).json({message: 'Album is already exist', album});

        new Album({
            owner_id,
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
            return res.status(200).json({album})
        });
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const readAlbum = async (req, res) => {

    let {skip, limit, sortParams, params} = req.body;

    try {

        await Album.find(params)
            .sort(sortParams)
            .limit(limit)
            .skip(skip)
            .exec((err, albums) => {
                if (err) {
                    return res.status(400).json({error: getErrorMessage(err)})
                }
                return res.status(200).json(albums)
            })
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

const updateAlbum = async (req, res) => {
    console.log('updateAlbums ', req.body);
    const {id, owner_id, thumb_id, title, size, photo, updated} = req.body;

    try {
        await Album.findOneAndUpdate({album_id: id},
            {
                $set: {
                    owner_id,
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
