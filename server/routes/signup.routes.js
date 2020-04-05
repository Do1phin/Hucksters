const {Router} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = Router();

router.post(
    '/signup',
    async (req, res) => {
        try {

            const {email, password} = req.body;

            const candidate = await User.findOne({email});
            if (candidate) {
                return res.status(400).json({message: 'This User is already exists'})
            }

            const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

            const user = new User({email, password: hashedPassword});
            await user.save();


            return res.status(200).json({message: 'User created successfully'});

        } catch (e) {
            res.status(500).json({message: 'Something went wrong with registration'})
        }

    });

router.get(
    '/signup',
    (req, res) => {
        res.status(400).json({message: 'Registration router'});
        console.log("Registration router")
    });

module.exports = router;
