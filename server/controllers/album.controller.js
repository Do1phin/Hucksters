import Album from '../models/album.model.js';

const create = async (req, res) => {

    try {

        const {owner_id, id, thumb_id, title, sizes, created, updated} = req.body;

        const albumCandidate = await Album.findOne({id});
        if (albumCandidate) {
            return res.status(400).json({message: 'Album with id ' + id + ' is already exist in DB'})
        }

        const album = new Album({
            userId: owner_id,
            albumId: id,
            thumbId: thumb_id,
            title,
            photo: sizes[4].src,
            created,
            updated,
        });

        await album.save();

        return res.status(200).json({message: 'Album with id ' + id + ' was created successfully in DB'})

    } catch (e) {
        return res.status(500).json({message: 'Something went wrong with creating album in DB'})
    }
};

const list = async (req, res) => {

    const limit = 100;
    const pageNumber = 1;

    try {

        const albums = await Album.find({}).limit(limit).skip((pageNumber - 1) * limit);

        return res.json(albums);

    } catch (e) {
        return res.status(500).json({message: 'Something went wrong with loaded albums from DB'})
    }
};

export default {
    create,
    list,
}
