import express from 'express';
import infoCountersCtrl from '../controllers/infoCounters.controller.js'

const router = express.Router();

router.route('/vk/info/create')
    .post(infoCountersCtrl.createInfo);

router.route('/vk/info')
    .get(infoCountersCtrl.readInfo);

export default router;
