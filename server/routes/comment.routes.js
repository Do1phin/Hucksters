import express from 'express';
import commentCtrl from '../controllers/comment.controller.js';

const router = express.Router();

router.route('/vk/comments/create')
    .post(commentCtrl.createComment);

// router.route('/vk/comments')
//     .post(commentCtrl.readComment);
//
// router.route('/vk/comments/update')
//     .post(commentCtrl.updateComment);
//
// router.route('/vk/comments/delete')
//     .post(commentCtrl.deleteComment);

export default router;
