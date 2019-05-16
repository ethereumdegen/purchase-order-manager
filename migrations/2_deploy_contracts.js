var _0xBitcoinToken = artifacts.require("./_0xBitcoinToken.sol");
var PurchaseOrderManager = artifacts.require("./PurchaseOrderManager.sol");



module.exports = function(deployer) {

//  deployer.deploy(PurchaseOrderManager);


  return deployer.deploy(_0xBitcoinToken).then(function(){
    console.log('deploy 1 ')

    return deployer.deploy(PurchaseOrderManager).then(function(){
      console.log('deploy 2 ')




      });
  });

  //  deployer.deploy(miningKing);






};
