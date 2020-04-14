import express from 'express';
import signupRoutes from './signup.routes.js';
import signinRoutes from './signin.routes.js';
import sellersRoutes from './seller.routes.js';
import albumsRoutes from './album.routes.js';
import photosRoutes from './photo.routes.js';
import vkRoutes from './vk.routes.js';

const router = express.Router();

router.use('/', signupRoutes);
router.use('/', signinRoutes);
router.use('/', sellersRoutes);
router.use('/', albumsRoutes);
router.use('/', photosRoutes);
router.use('/', vkRoutes);

export default router;
