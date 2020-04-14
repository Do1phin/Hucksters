import express from 'express';
import sellerCtrl from '../controllers/seller.controller.js';

const router = express.Router();

router.route('/sellers')
    .get(sellerCtrl.list);

router.route('/sellers/add')
    .post(sellerCtrl.create);

export default router;
