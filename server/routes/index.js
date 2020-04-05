const {Router} = require('express');
const router = Router();
const signupRoutes = require('./signup.routes');

router.use('/signup', signupRoutes);

module.exports = router;
