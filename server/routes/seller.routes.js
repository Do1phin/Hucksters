import express from 'express';
import sellerCtrl from '../controllers/seller.controller.js';

const router = express.Router();

router.route('/sellers/create')
    .post(sellerCtrl.createMember);

router.route('/sellers')
    .post(sellerCtrl.readMember);

router.route('/sellers/update')
    .post(sellerCtrl.updateMember);

// router.route('/sellers/delete')
//     .post(sellerCtrl.deleteMember);

export default router;
