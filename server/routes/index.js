const { Router } = require('express');
const path = require('path');
const router = Router();

router.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'public', '/index.html'));
    } catch (e) {
        res.status(500).json({ message: 'Something is wrong'})
    }
});

module.exports = router;
