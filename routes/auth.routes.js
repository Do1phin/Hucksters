import express from 'express';
import userCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/signup')
    .post(userCtrl.signup);

router.route('/signin')
    .post(userCtrl.signin);

export default router;
