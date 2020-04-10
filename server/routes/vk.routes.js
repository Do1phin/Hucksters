const {Router} = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();

const authenticate = passport.authenticate('jwt', {session: false});

router.get(
    '/vk',
    authenticate,
    (req, res) => {

        return res.status(200).json({ message: 'Vk router' })
    }
);


router.post('/vk/users/add',
    async (req, res) => {
    try {

        User.save({})

    } catch (e) {
        res.status(500).json({ message: 'Something wen wrong'})
    }
    });


module.exports = router;
