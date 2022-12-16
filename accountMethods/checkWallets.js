// using xrpl websocket request format
// these can be converted into xumm format by wrapping the tx in a "txjson": {xprl_format_tx}

const accountFunctions = {
    "account_info": (account) => {
        return {
            "command": "account_info",
            "account": account,
            "ledger_index": "validated"
        }
    }  
};

const xrpl = require("xrpl")
// ripple testnet: wss://s.altnet.rippletest.net/
// xrpl testnet: wss://testnet.xrpl-labs.com/

// testnet accounts:
// 1. public: "rDtFqdViuBrtxFmMtVu4PjncsLNUaBp1uo"
// seed: 'sEdVS6dUpbfXBzcdGx2wVp4MuUDkAaP'
const testWallet1S = 'sEdVS6dUpbfXBzcdGx2wVp4MuUDkAaP';
const wallet1 = xrpl.Wallet.fromSeed(testWallet1S);

// 2. public: "rM1KM6MiPvw3BMgMExUJUn8dzYGhL4j9GL"
// seed: 'sEdTiFzh8DzhZydbPBaT8Dj4LqDSYnW'
const testWallet2S = 'sEdTiFzh8DzhZydbPBaT8Dj4LqDSYnW';
const wallet2 = xrpl.Wallet.fromSeed(testWallet2S);


async function check2WalletsBalances(wallet1, wallet2) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net/")
  await client.connect()

  const response1 = await client.request(accountFunctions.account_info(wallet1));
  const response2 = await client.request(accountFunctions.account_info(wallet2));

  const walletInfo = {
    "Wallet1": response1.result.account_data,
    "Wallet2": response2.result.account_data
  };
  
  client.disconnect()

  return walletInfo
}

module.exports = check2WalletsBalances