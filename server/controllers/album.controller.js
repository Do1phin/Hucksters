import jsonp from '../helpers/jsonpHandler.js';
import vk from '../helpers/vkApiHandler.js';
import Album from '../models/album.model.js';

const create = async (req, res) => {
    try {
        const {vkId, albumId, albumTitle, albumSize, albumCreated, albumUpdated} = req.body;

        const albumCandidate = await Album.findOne({albumId});
        if (albumCandidate) {
            return res.status(400).json({message: 'This album is already exist in DB'})
        }

        const album = new Album({
            vkId,
            albumId,
            albumTitle,
            albumSize,
            albumCreated,
            albumUpdated
        });

        await album.save();

        return res.status(200).json({message: 'Album in DB created successfully'})

    } catch (e) {
        return res.status(500).json({message: 'Something went wrong with creating album in DB'})
    }
};

export default {
    create
}
