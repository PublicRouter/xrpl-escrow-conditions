const cc = require('five-bells-condition');
const crypto = require('crypto');

function conditionAndFulfillment() {
    const preimageData = crypto.randomBytes(32)
    const fulfillment = new cc.PreimageSha256()
    fulfillment.setPreimage(preimageData)

    const condition = fulfillment.getConditionBinary().toString('hex').toUpperCase()
    console.log('Condition:', condition)

    // Keep secret until you want to finish the escrow
    // Anyone who knows the fulfillment can finish the escrow, releasing the held funds to their intended destination.
    const fulfillment_hex = fulfillment.serializeBinary().toString('hex').toUpperCase()
    console.log('Fulfillment:', fulfillment_hex)

    return {
        condition: condition,
        fulfillment: fulfillment_hex
    }
}

module.exports = conditionAndFulfillment
