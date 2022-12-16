
const xrpl = require("xrpl")
const conditionAndFulfillment = require("./conditionAndFulfillment")

let fulfillment;

function escrowCreateTxJson(initiatingWalletObject, destinationWalletRAddress, amountToEscrowInXrp, timeInHrsUntilEscrowExpiresAndReturnsFundsToInitatingWallet) {
  const escrowAmountInDrops = amountToEscrowInXrp * 1000000;
  const returnTimeInSecs = Math.floor(Date.now() / 1000) + (timeInHrsUntilEscrowExpiresAndReturnsFundsToInitatingWallet * 60 * 60) - 946684800;
  const condAndFullfill = conditionAndFulfillment();

  if(typeof condAndFullfill.condition == "string" && typeof condAndFullfill.fulfillment == "string") {
    condition = condAndFullfill.condition;
    fulfillment = condAndFullfill.fulfillment;
  };

  const tx_json = {
    "Account": initiatingWalletObject.classicAddress,
    "TransactionType": "EscrowCreate",
    "Amount": escrowAmountInDrops.toString(),
    "Destination": destinationWalletRAddress,
    "CancelAfter": returnTimeInSecs,
    "Condition": condAndFullfill.condition
  };

  return tx_json
}

async function escrowCreate(initiatingWalletSeed, destinationWalletRAddress, amountToEscrowInXrp, timeInHrsUntilEscrowExpiresAndReturnsFundsToInitatingWallet) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net/")
  const initiatingWalletObject = xrpl.Wallet.fromSeed(initiatingWalletSeed);

  await client.connect()

  //prep tx to sign, and sign
  const prepTransaction = await client.autofill(escrowCreateTxJson(initiatingWalletObject, destinationWalletRAddress, amountToEscrowInXrp, timeInHrsUntilEscrowExpiresAndReturnsFundsToInitatingWallet));
  const signed = initiatingWalletObject.sign(prepTransaction);
  // console.log(signed)

  //submit signed tx to server and wait for response
  const response = await client.submitAndWait(signed.tx_blob);
  console.log("Created Escrow Tx Response: ", response);
  
  client.disconnect()

  if(response.result.meta.TransactionResult == 'tesSUCCESS'){
    console.log("Escrow successfully created!")
    return {escrowHash: signed.hash, fulfillment: fulfillment}
  } else {
    console.log("Escrow Creation has failed, please try again.")
  }
 
}


module.exports = escrowCreate