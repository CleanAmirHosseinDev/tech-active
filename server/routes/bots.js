const express = require('express');
// SECURITY: Trading bot functionality has been disabled for security assessment
// These routes contained front-running/sniping code that is not appropriate for an NFT campaign platform
// const BotController = require('../controllers/botController');

const router = new express.Router();

// SECURITY: All trading bot endpoints have been disabled
// Original routes commented out for security reasons:
// router.post('/startSnipping', BotController.startSnipping);
// router.post('/stopSnipping', BotController.stopSnipping);
// router.get('/getSnippingStatus', BotController.getSnippingStatus);
// router.post('/startFront', BotController.startFront);
// router.post('/stopFront', BotController.stopFront);
// router.get('/getFrontStatus', BotController.getFrontStatus);

// Return 403 Forbidden for any bot-related requests
router.use('*', (req, res) => {
  res.status(403).json({
    error: true,
    message: 'Trading bot functionality has been disabled for security reasons'
  });
});

module.exports = router;