// EXAMPLE XRPL PAYMENT TX FIELDS 
// {
//   "TransactionType": "Payment",
//   "Account": "rJb5KsHsDHF1YS5B5DU6QP5nubR3dVq8eq",
//   "Destination": "rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn",
//   "Amount": "1000000",
//   "Fee": "12",
//   "Sequence": 1,
//   "SigningPubKey": "02D2B36F0A40B5A1A5EF0C0555C857D9D5A5F5FF5B4F5F4BE3E3E4ECBDBB5C4B9C",
//   "TxnSignature": "304402204E45E16932B8AF514961A1D3A1A25FDF3F4F7732E9D624E5CB8C8F5DBFEE5D7A0220555EE111AABCC2E1F0FFA0FD8BF8F6F61E0DB19DABFD09F8C8D3B0BADF1DFA7D"
// }

// API uses xrpl websocket request format
// these can be converted into xumm format by wrapping the tx in a "txjson": {xprl_format_tx}

const transactionTemplates = {
    "account_info": (account) => {
        return {
            "command": "account_info",
            "account": account,
            "ledger_index": "validated"
        }
    },
    // "payment": (receiver, amount, msg) => {
    //     const dropsAmount = amount * 1000000
    //     return {
    //         "TransactionType": "Payment",
    //         "Destination": receiver,
    //         "Amount": dropsAmount.toString(),
    //         "Memos": [
    //             {
    //                 "Memo": {
    //                     "MemoData": "F09F988E20596F7520726F636B21"
    //                 }
    //             }
    //         ]
    //     }
    // }
}

module.exports = transactionTemplates