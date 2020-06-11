import express from 'express';
import favoriteCtrl from '../controllers/favorite.controller.js';

const router = express.Router();

router.route('/api/favorite/create')
    .post(favoriteCtrl.createFavorite);

router.route('/api/favorite')
    .post(favoriteCtrl.readFavorite);

router.route('/api/favorite/update')
    .post(favoriteCtrl.updateFavorite);

router.route('/api/favorite/delete')
    .post(favoriteCtrl.deleteFavorite);

export default router;
