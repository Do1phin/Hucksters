import express from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import config from '../../config/config.js';

const router = express.Router();

router.post(
    '/signin',
    async (req, res) => {
        try {

            const {email, password} = req.body;

            const candidateEmail = await User.findOne({email});
            if (!candidateEmail) {
                return res.status(404).json({message: 'No users with this email'})
            }

            const isMatched = await bcrypt.compare(password, candidateEmail.password);

            if (!isMatched) {
                return res.status(404).json({message: 'Password went wrong'})
            } else {

                // const token = await jwt.sign(candidateEmail, config.jwtSecret, {
                //     expiresIn: 3600
                // });

                return res.status(200).json({
                    message: 'Thanks for authentication',
                    action: 'signin',
                    token: 'JWT ' + 'token',
                    user: {
                        email: candidateEmail.email,
                        password: candidateEmail.password,
                    }
                });
            }

            // res.json({
            //     token: 'JWT ' + token,
            //     user: {
            //         vkId: candidateEmail.vkId,
            //         firstName: candidateEmail.firstName,
            //         lastName: candidateEmail.lastName,
            //         seller: candidateEmail.seller,
            //         avatar: candidateEmail.avatar,
            //     }
            // });


        } catch (e) {
            res.status(500).json({message: 'Something went wrong with authentication'})
        }

    });

router.get(
    '/signin',
    (req, res) => {
        console.log("Authorisation router");
        return res.status(400).json({message: 'Authorisation router'});
    });

export default router;
