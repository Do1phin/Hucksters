import express from 'express';
import signupRoutes from './signup.routes';
import signinRoutes from './signin.routes';

const router = express.Router();

router.use('/signup', signupRoutes);
router.use('/signin', signinRoutes);

export default router;
