//var sha3_256 = require('js-sha3').sha3_256;

var web3utils =  require('web3-utils');


const BN = require('bn.js');


module.exports =  {



  async getOrderHash( from, to, tokens, orderNonce ) {
    var digest = web3utils.soliditySha3(from,to,tokens,orderNonce)

    var digestBytes32 = web3utils.hexToBytes(digest)

    return digest;
  },



  async getCallData( orderHash, orderNonce, recipientAddress ) {

    var nonceHex = web3utils.toHex(orderNonce);

    var orderBytes = web3utils.hexToBytes(orderHash)
    var nonceBytes = web3utils.hexToBytes(nonceHex)
    var recipientAddressBytes = web3utils.hexToBytes(recipientAddress)

    var callDataBytes = orderBytes.concat(nonceBytes).concat(recipientAddressBytes)

    return callDataBytes ;
  },





}
