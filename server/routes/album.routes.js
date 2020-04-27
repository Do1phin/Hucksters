import express from 'express';
import albumCtrl from '../controllers/album.controller.js';

const router = express.Router();

router.route('/albums/add')
    .post(albumCtrl.create);

router.route('/sellers/albums')
    .post(albumCtrl.list);

router.route('/sellers/albums_for_check')
    .post(albumCtrl.listForCheck);


export default router;
