**API Endpoint**
- Create `GET /token/nft-analytics` in `server/routes/token.js`
- Response format:
  ```json
  {
    "error": false,
    "data": {
      "totalNFTs": number,
      "walletAddresses": array
    }
  }
  ```

**Database & Controller**
- Create/update `server/controllers/tokenController.js` with `nftAnalytics` method
- Count total NFTs from database using Sequelize (or return mock data)
- Extract unique wallet addresses from NFT records
- Validate wallet addresses using ethers.js `isAddress()` utility
- Handle empty database (return zeros and empty array)

**Error Handling**
- Error response: `{ "error": true, "message": "description" }`
- HTTP status codes: 200 (success), 500 (server errors)
- Follow existing code patterns in `server/routes` and `server/controllers`

**Verification**
- Endpoint returns valid JSON matching the response structure
- Wallet addresses are valid Ethereum addresses (use ethers.js validation)
- Response format matches existing API endpoints

**MetaMask Wallet Connection Testing**
- Test MetaMask wallet connection functionality in frontend
- Verify `window.ethereum` detection and availability
- Test successful wallet connection flow:
  - User clicks connect button
  - MetaMask popup appears and user approves
  - Wallet address is retrieved and stored
  - Connection state is updated in UI
- Test error handling scenarios:
  - User rejects connection request
  - MetaMask extension not installed
  - Network switching detection
  - Account change detection
- Verify wallet address format validation using ethers.js
- Test wallet disconnect functionality
- Ensure connection state persists across page refreshes (if applicable)
- Test multiple wallet connection attempts

**Pull Request Submission**
- Create a pull request (PR) to the GitHub repository with all implemented changes
- Ensure all code changes are committed and pushed to your fork/branch
- PR should include:
  - All API endpoint implementations
  - Database controller updates
  - Error handling implementations
  - MetaMask wallet connection testing code
  - Any other required features from this assessment
- After creating your pull request, provide the PR link in the submission form
- PR will be reviewed for:
  - Code quality and adherence to requirements
  - Proper implementation of all features
  - Error handling and edge cases
  - Code organization and best practices
- Ensure PR description clearly explains what was implemented and any relevant notes