import express from 'express';
import photoCtrl from '../controllers/photo.controller.js';

const router = express.Router();

router.route('/photos/add')
    .post(photoCtrl.create);

router.route('/sellers/albums/photos')
    .post(photoCtrl.list);

router.route('/sellers/albums/photos_for_check')
    .post(photoCtrl.list2);

export default router;
