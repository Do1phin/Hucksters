import jsonp from "../helpers/jsonpHandler.js";
import vk from "../helpers/vkApiHandler.js";
import Photo from '../models/photo.model.js';


// const getPicturesOneAlbum = async () => {
//     const method = 'photos.get';
//     const params = 'owner_id=' + 314441151 + '&album_id=' + 218737155 + '&count=1000&extended=1';
//     const url = await getUrl(method, params);
//     await sendVkRequest(url);
//     return setPhotos(data);
// };


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

export default {
    create
}
