
const xrpl = require("xrpl")
const lookupTxHash = require("./lookupTxHash");

let success = false;

async function fulfillEscrow( walletSendingTxSeed, escrowHash, fulfillmentHash ) {
  const walletToSendTx = xrpl.Wallet.fromSeed(walletSendingTxSeed);

  const client = new xrpl.Client("wss://s.altnet.rippletest.net/")
  await client.connect()

  const escrowTx = await lookupTxHash(escrowHash);

  const prepEscrowFinish = await client.autofill({
    "Account": walletToSendTx.classicAddress,
    "TransactionType": "EscrowFinish",
    "Owner": escrowTx.result.Account,
    "OfferSequence": escrowTx.result.Sequence,
    "Condition": escrowTx.result.Condition,
    "Fulfillment": fulfillmentHash,
    "Fee": "500"
  });

  const signed = walletToSendTx.sign(prepEscrowFinish);
  const response = await client.submitAndWait(signed.tx_blob);
  console.log("Completed Escrow Transaction Response: ", response)
  if(response.result.meta.TransactionResult == 'tesSUCCESS'){
    success = true;
  }
  client.disconnect()

  if(success){
    return "Escrow has been successfully fulfilled and funds released to destination wallet!"
  } else {
    return "Escrow fullfillment has failed, please try again if escrow is now expired."
  }
}

module.exports = fulfillEscrow