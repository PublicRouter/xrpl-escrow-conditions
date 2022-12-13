const {XummSdk} = require('xumm-sdk')
require('dotenv').config()

const Sdk = new XummSdk(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET)

const main = async () => {
    const appInfo = await Sdk.ping()
    console.log(appInfo)

}

main()