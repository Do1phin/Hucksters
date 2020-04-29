import express from 'express';
import groupCtrl from '../controllers/group.controller.js';

const router = express.Router();

router.route('/vk/groups/create')
    .post(groupCtrl.createGroup);

router.route('/vk/groups')
    .get(groupCtrl.readGroup);

router.route('/vk/groups/update')
    .post(groupCtrl.updateGroup);

router.route('/vk/groups/delete')
    .post(groupCtrl.deleteGroup);

export default router;
