import express from 'express';
import countersCtrl from '../controllers/counters.controller.js'

const router = express.Router();

router.route('/counters/create')
    .post(countersCtrl.createCounters);

router.route('/counters')
    .get(countersCtrl.readCounters);

router.route('/counters/update')
    .get(countersCtrl.updateCounters);

router.route('/counters/delete')
    .delete(countersCtrl.deleteCounters);

export default router;
