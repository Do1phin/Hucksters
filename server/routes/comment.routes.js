import express from 'express';
import commentCtrl from '../controllers/comment.controller.js';

const router = express.Router();

router.route('/vk/comment/add')
    .post(commentCtrl.createComment);

export default router;
