import Comment from '../models/comment.model.js';

const createComment = async (req, res) => {
    const {userId, albumId, photoId, commentId, text, date, attachment} = req.body;
    console.log('req.body ', req.body);

    try {
        await Comment.findOne({commentId: commentId})
            .then((response) => {
                console.log('fffff ', response)
                if (response) return res.status(400).json({message: 'Comment is already exist'})
            });

        const comment = new Comment({
            userId: userId,
            albumId: albumId,
            photoId: photoId,
            commentId: commentId,
            text: text,
            date: date,
            attachment: attachment,
        });

        await comment.save();
        return res.status(200).json({message: 'Comment was created successfully'})

    } catch (e) {
        throw new Error(e);
    }
};

export default {
    createComment
}
