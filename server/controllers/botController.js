// SECURITY WARNING: This file contains trading bot functionality (front-running/sniping)
// that is NOT appropriate for an NFT campaign platform. This code has been disabled.
// DO NOT enable these endpoints in production without proper security review.

const { Front, Snipping } = require("../models");
// const sController = require("./snippingController");
// const fController = require("./frontController");

module.exports = {
  /* snipping */

  startSnipping(req, res) {
    // SECURITY: Trading bot functionality disabled
    return res.status(403).json({
      error: true,
      message: 'Trading bot functionality has been disabled for security reasons'
    });
    
    // DISABLED CODE - All trading bot functionality commented out:
    // const {
    //   node,
    //   wallet,
    //   key,
    //   token,
    //   amount,
    //   slippage,
    //   gasprice,
    //   gaslimit,
    // } = req.body;
    // try {
    //   sController.scanMempool(
    //     node,
    //     wallet,
    //     key,
    //     token,
    //     amount,
    //     slippage,
    //     gasprice,
    //     gaslimit
    //   );
    // } catch (err){
    //   console.log("snipping scanMempool error...")
    // }
    // const status = "1";
    // Snipping.update({...}, {...})
  },

  stopSnipping(req, res) {
    // SECURITY: Trading bot functionality disabled
    return res.status(403).json({
      error: true,
      message: 'Trading bot functionality has been disabled for security reasons'
    });
    
    // DISABLED CODE:
    // if (snipSubscription != null) {
    //   snipSubscription.unsubscribe(function(error, success) {
    //     if (success) console.log("Successfully unsubscribed!");
    //   });
    // }
    // Snipping.update({...}, {...})
  },

  getSnippingStatus(req, res) {
    // SECURITY: Trading bot functionality disabled - return empty status
    return res.status(200).json({
      error: false,
      data: [],
      message: 'Trading bot functionality has been disabled'
    });
    
    // DISABLED CODE:
    // Snipping.findAll({...})
  },

  /* front running ... */

  startFront(req, res) {
    // SECURITY: Trading bot functionality disabled
    return res.status(403).json({
      error: true,
      message: 'Trading bot functionality has been disabled for security reasons'
    });
    
    // DISABLED CODE:
    // const { node, wallet, key, amount, percent, minbnb, maxbnb } = req.body;
    // try {
    //   fController.scanMempool(node, wallet, key, amount, percent, minbnb, maxbnb);
    // } catch (err) {
    //   console.log("Front scan mempool error......");
    // }
    // Front.update({...}, {...})
  },

  stopFront(req, res) {
    // SECURITY: Trading bot functionality disabled
    return res.status(403).json({
      error: true,
      message: 'Trading bot functionality has been disabled for security reasons'
    });
    
    // DISABLED CODE:
    // if (frontSubscription != null) {
    //   frontSubscription.unsubscribe(function(error, success) {
    //     if (success) console.log("Successfully unsubscribed!");
    //   });
    // }
    // Front.update({...}, {...})
  },

  getFrontStatus(req, res) {
    // SECURITY: Trading bot functionality disabled - return empty status
    return res.status(200).json({
      error: false,
      data: [],
      message: 'Trading bot functionality has been disabled'
    });
    
    // DISABLED CODE:
    // Front.findAll({...})
  },
};
