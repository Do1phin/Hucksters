const {Router} = require('express');
const Seller = require('../models/Seller');
const router = Router();

let keys = ['обнова', 'скидка', 'продано', 'vk', 'ТЕСТ'];

router.post(
    '/sellers/add',
    async (req, res) => {
        try {

            const {vkId, firstName, lastName, seller, avatar, albums, picturesInAlbums} = req.body;

            const sellerCandidate = await Seller.findOne({vkId});
            if (sellerCandidate) {
                return res.status(400).json({message: 'This User in DB is already exists'})
            }

            const sellerProfile = new Seller({
                vkId,
                firstName,
                lastName,
                seller,
                avatar,
                albums,
                picturesInAlbums
            });

            await sellerProfile.save();

            return res.status(200).json({message: 'User in DB created successfully'});

        } catch (e) {
            return res.status(500).json({message: 'Something went wrong with creating user in DB'})
        }
    });


router.post(
    '/sellers/check',
    async (req, res) => {
        try {

            const candidateSeller = await Seller.find({});
            console.log(candidateSeller.message);
            res.status(200).json({ message: candidateSeller})

            candidateSeller.message.map((item) => {
                keys.map((element) => {
                    if (item.title.toLowerCase().includes(element.toLowerCase())) {
                        console.log(element, item.title);
                        albums.push(item.id)
                    }
                })
            });

        } catch (e) {
            return res.status(500).json({ message: 'Something went wrong with checking users'})
        }
    }
);

router.get(
    '/sellers',
    async (req, res) => {
        try {

            const sellers = await Seller.find(req.body);

            return res.json(sellers)
        } catch (e) {
            return res.status(500).json({message: 'Something went wrong with download users from DB'})
        }
    });


module.exports = router;
