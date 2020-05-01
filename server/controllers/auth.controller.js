import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const signup = async (req, res) => {
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
        res.status(500).json({message: 'Something went wrong with registration', error: e})
    }

};

const signin = async (req, res) => {
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
        //         first_name: candidateEmail.firstName,
        //         last_name: candidateEmail.lastName,
        //         seller: candidateEmail.seller,
        //         avatar: candidateEmail.avatar,
        //     }
        // });

    } catch (e) {
        res.status(500).json({message: 'Something went wrong with authentication'})
    }

};

export default {
    signup,
    signin
}
