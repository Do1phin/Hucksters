import express from 'express';
import groupCtrl from '../controllers/group.controller.js';

const router = express.Router();

router.route('/vk/group/add')
    .post(groupCtrl.groupCreate);

router.route('/vk/group/remove')
    .post(groupCtrl.groupRemove);

router.route('/vk/group/list')
    .get(groupCtrl.groupList);

export default router;
