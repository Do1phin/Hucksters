import express from 'express';
import vkCtrl from '../controllers/vk.controller.js';

const router = express.Router();

router.route('/vk/getmembers')
    .get(vkCtrl.getMembers);

export default router;
