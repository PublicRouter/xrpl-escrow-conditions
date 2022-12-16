const xrpl = require("xrpl");

async function lookupTxHash(escrowHash) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net/");
  await client.connect();
  
  const prepTransaction = {
    "command": "tx",
    "transaction": escrowHash,
  };

  const response = await client.request(prepTransaction);
  // console.log("Escrow Tx Data: ", response)
  // console.log("Created Escrow Node: ", response.result.meta.AffectedNodes[4])

  client.disconnect();
  return response;
};

module.exports = lookupTxHash;