const {Router} = require('express');
const Seller = require('../models/Seller');
const Album = require('../models/Album');
const Photo = require('../models/Photo');
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


router.post(
    '/albums/add',
    async (req, res) => {
        try {
            const {vkId, albumId, albumTitle, albumSize, albumCreated, albumUpdated} = req.body;

            const albumCandidate = await Album.findOne({albumId});
            if (albumCandidate) {
                return res.status(400).json({message: 'This album is already exist in DB'})
            }

            const album = new Album({
                vkId,
                albumId,
                albumTitle,
                albumSize,
                albumCreated,
                albumUpdated
            });

            await album.save();

            return res.status(200).json({message: 'Album in DB created successfully'})

        } catch (e) {
            return res.status(500).json({message: 'Something went wrong with creating album in DB'})
        }
    }
);

router.post(
    '/photos/add',
    async (req, res) => {
        try {

            const {vkId, albumId, photoId, photoText, photoSrc, photoDate} = req.body;

            const photoCandidate = await Photo.findOne({photoId});

            if (photoCandidate) {
                return res.status(400).json({message: 'This photo is already exist in DB'})
            }

            const photo = new Photo({
                vkId,
                albumId,
                photoId,
                photoText,
                photoSrc,
                photoDate
            });

            await photo.save();

            return res.status(200).json({message: 'Photo in DB created successfully'})


        } catch (e) {
            return res.status(500).json({message: 'Something went wrong with creating photo in DB'})
        }
    }
);


router.post(
    '/sellers/check',
    async (req, res) => {
        try {

            const candidateSeller = await Seller.find({});

            res.status(200).json({message: candidateSeller});

            candidateSeller.message.map((item) => {
                keys.map((element) => {
                    if (item.title.toLowerCase().includes(element.toLowerCase())) {
                        console.log(element, item.title);
                        albums.push(item.id)
                    }
                })
            });

        } catch (e) {
            return res.status(500).json({message: 'Something went wrong with checking users'})
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
