// params required: 
// (1)initiatingWalletSeed, 
// (2)destinationWalletRAddress, 
// (3)amountToEscrowInXrp, 
// (4)timeInHrsUntilEscrowExpiresAndReturnsFundsToInitatingWallet

// Function Returns (1): EscrowTxHash ; (2): fulfillmentHash(aka Password)
const escrowCreate = require("./escrowHelpers/escrowCreate");

// params required:
// (1)walletExecutingFulfillmentTxSeed, 
// (2)escrowTxHash, 
// (3)fulfillmentHash(aka Password)

// Function Returns "Success" if fulfillment/Password successfull, else "failed"
const fulfillEscrow = require("./escrowHelpers/escrowFinish");

// seed for wallet initating escrow, and fulfilling escrow
const signingWalletSeed = 'sEdVS6dUpbfXBzcdGx2wVp4MuUDkAaP'
// rAddress for destination wallet
const destinationWalletRAddress = "rM1KM6MiPvw3BMgMExUJUn8dzYGhL4j9GL";


async function creatingEscrows() {
    // const txHashAndPw = await escrowCreate(signingWalletSeed, destinationWalletRAddress, 20, 1)
    // console.log(txHashAndPw)

    // const results = await fulfillEscrow(signingWalletSeed, '81BA9C76B9316FFDD0E0FBB174352680B65671C9AC6AC93C798EDFDC80E47E33', 'A02280208126577393AA7D562A36DFCE2DA46E8A6D3B89D78289B1F1A3B9AA011E3E532E', );
    // console.log(results)
}

creatingEscrows()