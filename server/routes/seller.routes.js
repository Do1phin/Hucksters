import express from 'express';
import sellerCtrl from '../controllers/seller.controller.js';

const router = express.Router();

router.route('/sellers')
    .post(sellerCtrl.list);

router.route('/sellers/add')
    .post(sellerCtrl.create);

router.route('/sellers/update')
    .post(sellerCtrl.update);

export default router;
