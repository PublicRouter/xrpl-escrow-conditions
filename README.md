# Creating Testnet XRPL Conditional Escrows

XRPL DOCS(https://xrpl.org/)<br><br>
__Requirements to create testnet escrows:__
 - Two funded xrpl testnet wallets (https://xrpl.org/xrp-testnet-faucet.html)

---
<br>

After creating 2 test wallets with the xrpl testnet faucet, and funding the accounts. You are ready to create your own escrows that generate a password(fulfillment hash) to release an escrowed funds.

You will only need the 2 functions imported into index.js file. These functions escrowCreate() and fulfillEscrow() are all you will need.
<br><br>

1. First you must use createEscrow() inputting 4 parameters in this order: 
    1. @string - __wallet seed(private key) from created test wallet (starts with s).__
    __This address will be the wallet that is sending the funds to be escrowed and initiating the escrowCreate transaction method.__
    2. @string - __wallet rAddress to receive escrowed funds once correct fulfillment hash( password ) is given to fulfillEscrow function.__
    3. @number - __amount of xrp to be taken from wallet funding escrow.__
    4. @number - __time in hours until escrow is expired and funds are returned to walllet that funded escrow.__
    <br><br>
    
    After running this function with correct parameters, an escrow will be created. This escrow will contain specified amount of xrp, and will not be able to send password to fullfill after specified expiration time in hrs.

    You will be returned a object from this function containing the transaction hash and the password hash to redeem this created escrow node.
    <br><br>

2. You can then run fulfillEscrow(). This function takes 3 parameters in this specifc order:

    1. @string - __wallet seed(private key) from created test wallet (starts with s). Can be seed of any wallet, including the wallet that created escrow. Whichever wallet is being used to send fulfillment transaction.__
    2. @string - __transaction hash from the transaction that contains the successfully created escrow. This hash is returned from step 1 along with the fulfillment hash__
    3. @string - __fulfillment hash(password) generated from step 1. Used to successfully fulfill the escrows set condition.__
    <br><br>

    After running this function on a valid escrow tx hash and fulfillment hash(password)- returned from step 1. If escrow hash and fulfillment hash(password) are valid, escrowed funds are released to destination wallet. As long as it is before the set expiration time of the specifc escrow. 
    



