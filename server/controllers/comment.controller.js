import Comment from '../models/comment.model.js';
import Photo from "../models/photo.model.js";
import getErrorMessage from "../helpers/dbErrorHandler.js";

const createComment = async (req, res) => {
    console.log('createComment ', req.body);
    const {from_id, id, text, date, photo_id, attachments} = req.body;
    const album_id = attachments[0].photo.album_id;
    const attach = attachments.length > 1
        ?
        [attachments[0].photo.sizes[attachments[0].photo.sizes.length - 1].url,
            attachments[1].photo.sizes[attachments[1].photo.sizes.length - 1].url]
        : [attachments[0].photo.sizes[attachments[0].photo.sizes.length - 1].url];

    try {
        await Comment.find({comment_id: id}, (err, comment) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
            return res.status(400).json({message: 'Comment is already exist', comment})
        });

        new Comment({
            owner_id: from_id,
            album_id,
            photo_id,
            comment_id: id,
            text,
            date,
            attach,
        }).save((err, comment) => {
            if (err) {
                return res.status(400).json({error: getErrorMessage(err)})
            }
            return res.status(200).json({comment})
        });

        await Photo.findOneAndUpdate(
            {photoId: photo_id},
            {
                $set: {
                    additional_photos: 1,
                    _updated: Date.now()
                }
            },
            {returnOriginal: false},
            (err, photo) => {
                if (err) {
                    return res.status(400).json({error: getErrorMessage(err)})
                }
                return res.status(200).json({photo})
            }
        );
    } catch (e) {
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

export default {
    createComment
}
