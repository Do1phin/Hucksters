const {Router} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = Router();

router.post(
    '/signin',
    async (req, res) => {
        try {

            const {email, password} = req.body;

            const candidateEmail = await User.findOne({email});
            if (!candidateEmail) {
                return res.status(500).json({message: 'No users with this email'})
            }

            const isMatched = await bcrypt.compare(password, candidateEmail.password);
            if (!isMatched) {
                return res.status(404).json({message: 'Password went wrong'})
            }

            return res.status(200).json({message: 'Thanks for authentication'});

        } catch (e) {
            res.status(500).json({message: 'Something went wrong with authentication'})
        }

    });

router.get(
    '/signin',
    (req, res) => {
        res.status(400).json({message: 'Authorisation router'});
        console.log("Authorisation router")
    });

module.exports = router;
