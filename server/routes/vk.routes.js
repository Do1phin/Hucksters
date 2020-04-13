import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const router = express.Router();

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


export default router;
