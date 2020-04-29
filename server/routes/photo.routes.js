import express from 'express';
import photoCtrl from '../controllers/photo.controller.js';

const router = express.Router();

router.route('/photos/create')
    .post(photoCtrl.createPhoto);

router.route('/sellers/albums/photos')
    .post(photoCtrl.readPhoto);

// router.route('/photos/update')
//     .post(photoCtrl.updatePhoto);
//
// router.route('/photos/delete')
//     .post(photoCtrl.deletePhoto);

export default router;
