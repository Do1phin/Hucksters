const {Router} = require('express');
const Seller = require('../models/Seller');
const router = Router();

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
