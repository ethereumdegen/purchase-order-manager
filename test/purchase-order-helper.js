//var sha3_256 = require('js-sha3').sha3_256;

var web3utils =  require('web3-utils');


//const BN = require('bn.js');


module.exports =  {



  async getOrderHash( from, to, tokens, orderNonce ) {

    var nonceHex = web3utils.toHex(orderNonce);
    var paddedNonceHex = web3utils.padLeft(nonceHex, 64)

    var tokensHex = web3utils.toHex(tokens);
    var paddedTokensHex = web3utils.padLeft(tokensHex, 64)

    console.log('sha inputs ',from,to,paddedTokensHex,paddedNonceHex)

    var digest = web3utils.soliditySha3(from,to,paddedTokensHex,paddedNonceHex)

    var digestBytes32 = web3utils.hexToBytes(digest)

    return digest;
  },



  async getCallData( orderHash, orderNonce, recipientAddress ) {

    //need to pad to 64 characters since a byte is two chars and each needs to be 32 bytes

    var orderHex = web3utils.toHex(orderHash);
    var paddedOrderHash = web3utils.padLeft(orderHex, 64)


    var paddedRecipientAddress = web3utils.padLeft(recipientAddress, 64)

    var nonceHex = web3utils.toHex(orderNonce);
    var paddedNonceHex = web3utils.padLeft(nonceHex, 64)

    console.log('paddedOrderHash ',paddedOrderHash)
      console.log('paddedRecipientAddress ',paddedRecipientAddress)
        console.log('paddedNonceHex ',paddedNonceHex)

    var orderBytes = web3utils.hexToBytes(paddedOrderHash)
    var nonceBytes = web3utils.hexToBytes(paddedNonceHex)
    var recipientAddressBytes = web3utils.hexToBytes(paddedRecipientAddress)

    var callDataBytes = orderBytes.concat(nonceBytes).concat(recipientAddressBytes)

    return callDataBytes ;
  },





}
