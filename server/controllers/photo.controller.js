import Photo from '../models/photo.model.js';

const create = async (req, res) => {

    try {

        const {vkId, albumId, photoId, photoText, photoSrc, photoDate} = req.body;

        const photoCandidate = await Photo.findOne({photoId});

        if (photoCandidate) {
            return res.status(400).json({message: 'This photo is already exist in DB'})
        }

        const photo = new Photo({
            vkId,
            albumId,
            photoId,
            photoText,
            photoSrc,
            photoDate
        });

        await photo.save();

        return res.status(200).json({message: 'Photo in DB created successfully'})


    } catch (e) {
        return res.status(500).json({message: 'Something went wrong with creating photo in DB'})
    }
};

const list = async (req, res) => {
    try {
        const photos = await Photo.find({});

        return res.json(photos)

    } catch (e) {
        return res.status(500).json({message: 'Something went wrong with loading photos from DB'})
    }

};

export default {
    create,
    list,
}
