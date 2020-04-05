const {Router} = require('express');
const router = Router();
const signupRoutes = require('./signup.routes');
const signinRoutes = require('./signin.routes');

router.use('/signup', signupRoutes);
router.use('/signin', signinRoutes);

module.exports = router;
