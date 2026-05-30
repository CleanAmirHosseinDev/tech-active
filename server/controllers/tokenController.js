const { Token } = require("../models");
const ethers = require("ethers");

module.exports = {
  nftAnalytics(req, res) {
    Token.findAll({})
      .then((tokens) => {
        const totalNFTs = tokens.length;
        const walletAddresses = tokens
          .map((t) => t.address)
          .filter((address) => address && ethers.utils.isAddress(address));

        // Extract unique wallet addresses
        const uniqueWalletAddresses = [...new Set(walletAddresses)];

        res.status(200).json({
          error: false,
          data: {
            totalNFTs: totalNFTs,
            walletAddresses: uniqueWalletAddresses,
          },
        });
      })
      .catch((error) =>
        res.status(500).json({
          error: true,
          message: error.message || "An error occurred while fetching NFT analytics",
        })
      );
  },

  list(req, res) {
    Token.findAll({})
      .then((tokens) =>
        res.status(201).json({
          error: false,
          data: tokens,
        })
      )
      .catch((error) =>
        res.json({
          error: true,
          message: error,
        })
      );
  },

  add(req, res) {
    const { name, symbol, address } = req.body;

    Token.create({
      name: name,
      symbol: symbol,
      address: address,
    });
  },

  delete(req, res) {
      
    const { address } = req.body;

    console.log(req.body)

    Token.destroy({
      where: {
        address: address,
      },
    })
      .then((status) =>
        res.status(201).json({
          error: false,
          message: "token has been deleted",
        })
      )
      .catch((error) =>
        res.json({
          error: true,
          error: error,
        })
      );
  },
};
