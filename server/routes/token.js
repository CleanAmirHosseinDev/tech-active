const express = require('express');
const tokenController = require('../controllers/tokenController');

const router = new express.Router();

router.get('/list', tokenController.list);
router.get('/nft-analytics', tokenController.nftAnalytics);
router.post('/add', tokenController.add);
router.post('/del', tokenController.delete);

module.exports = router;