const xrpl = require("xrpl")
const transactionTemplates = require("./transactionFunctions")
console.log("tx templates obj: ", transactionTemplates)

// ripple testnet: wss://s.altnet.rippletest.net/
// xrpl testnet: wss://testnet.xrpl-labs.com/

// testnet accs:
// 1. public: "rDtFqdViuBrtxFmMtVu4PjncsLNUaBp1uo"
// seed: 'sEdVS6dUpbfXBzcdGx2wVp4MuUDkAaP'
const testWallet1 = "rDtFqdViuBrtxFmMtVu4PjncsLNUaBp1uo";

// 2. public: "rM1KM6MiPvw3BMgMExUJUn8dzYGhL4j9GL"
// seed: 'sEdTiFzh8DzhZydbPBaT8Dj4LqDSYnW'
const testWallet2 = "rM1KM6MiPvw3BMgMExUJUn8dzYGhL4j9GL";


async function main() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net/")
  await client.connect()

  const response = await client.request(transactionTemplates.account_info(testWallet1))
  console.log(response)

  client.disconnect()
}
main()