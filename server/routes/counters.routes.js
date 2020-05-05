import express from 'express';
import countersCtrl from '../controllers/counters.controller.js'

const router = express.Router();

router.route('/vk/info/create')
    .post(countersCtrl.createCounters);

router.route('/vk/info')
    .get(countersCtrl.readCounters);

router.route('/vk/info/update')
    .get(countersCtrl.updateCounters);



export default router;
