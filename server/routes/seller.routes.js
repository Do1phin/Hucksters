import express from 'express';
import sellerCtrl from '../controllers/seller.controller.js';

const router = express.Router();

router.route('/sellers')
    .post(sellerCtrl.list);

// router.route('/sellers/:userId')
//     .post(sellerCtrl.page);

router.route('/sellers/add')
    .post(sellerCtrl.create);

router.route('/sellers/update')
    .post(sellerCtrl.update);

router.route('/seller/updateSeller')
    .post(sellerCtrl.updateIsSeller);

router.route('/sellers/listForCheck')
    .post(sellerCtrl.listForCheck);

export default router;
