const { Router } = require('express');
const Seller = require('../models/Seller');
const router = Router();

router.get(
    '/seller',
    async (req, res) => {
        try {

        } catch (e) {
            res.status(500).json({message: 'Something went wrong with authentication'})
        }
});

module.exports = router;
