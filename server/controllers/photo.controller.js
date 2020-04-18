import Photo from '../models/photo.model.js';

const create = async (req, res) => {

    try {

        const {id, album_id, owner_id, sizes, text, date} = req.body;

        const photoCandidate = await Photo.findOne({id});

        if (photoCandidate) {
            return res.status(400).json({message: 'This photo with id ' + id + ' is already exist in DB'})
        }

        const photo = new Photo({
            userId: owner_id,
            albumId: album_id,
            photoId: id,
            text,
            photo: sizes[4].url,
            date
        });

        await photo.save();

        return res.status(200).json({message: 'Photo with id ' + id + ' in DB created successfully'})


    } catch (e) {
        return res.status(500).json({message: 'Something went wrong with creating photo in DB'})
    }
};

const list = async (req, res) => {

    const limit = 100;
    const pageNumber = 1;

    try {
        const photos = await Photo.find({}).limit(limit).skip((pageNumber - 1) * limit);

        if (photos == []) {
            return res.status(400).json({message: 'No more photos'})
        }

        return res.json(photos)

    } catch (e) {
        return res.status(500).json({message: 'Something went wrong with loading photos from DB'})
    }

};

export default {
    create,
    list,
}
