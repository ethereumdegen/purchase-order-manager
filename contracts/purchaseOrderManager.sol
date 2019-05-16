pragma solidity ^0.5.0;



/**------------------------------------

A simple purchase order management smart contract.  This allows 0xBTC users to transfer tokens to another recipient, but do it in such a way that an order number and deterministic order hash are permanently saved on the blockchain for a simple 'proof of purchase' receipt of the transaction.


------------------------------------*/



contract ERC20Interface {
    function totalSupply() public view returns (uint);
    function balanceOf(address tokenOwner) public view returns (uint balance);
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}



contract ApproveAndCallFallBack {
    function receiveApproval(address from, uint256 tokens, address token, bytes memory data) public;
}


contract PurchaseOrderManager{

   address masterTokenAddress;


  mapping (bytes32 => PurchaseOrder) orders;

   struct PurchaseOrder {
      bytes32 orderHash;
      uint amountRaw;
      bool orderFulfilled;
   }

    constructor( ) public  {
        masterTokenAddress = 0xB6eD7644C69416d67B522e20bC294A9a9B405B31;
    }

    /**
    * Do not allow ETH to enter
    */
     function() external payable
     {
         revert();
     }


     function getPurchaseOrderStatus(bytes32 orderHash) public view returns (bool success){
        return orders[orderHash].orderFulfilled;
     }


     function _purchaseOrder(address from, address to, uint tokens, uint orderNonce, bytes32 orderHash ) internal returns (bool success) {


          bytes32 predictedOrderHash = keccak256(abi.encodePacked( from, to, tokens, orderNonce ));
          require(predictedOrderHash == orderHash);

          require(orders[orderHash].orderFulfilled == false);

          //save the order in history
          orders[orderHash] = PurchaseOrder(orderHash, tokens, true);

          //send the tokens
          ERC20Interface(masterTokenAddress).transferFrom(from,to,tokens);


          return true;
      }

       /*
         Receive approval from ApproveAndCall() to claim a nametag token.

       */
       function receiveApproval(address from, uint256 tokens, address token, bytes memory data) public returns (bool success) {

        require(token == masterTokenAddress);

         bytes32 borderHash;
         uint256 borderNonce;
         bytes32 brecipientAddress;


         // Divide the data into variables
            assembly {
              borderHash := mload(add(data, 32))
              borderNonce := mload(add(data, 64))
              brecipientAddress := mload(add(data, 96))
            }


          bytes32 orderHash = bytes32(borderHash);
          uint256 orderNonce = uint256(borderNonce);
          address recipientAddress = address(uint160(uint256(brecipientAddress)));


          require(_purchaseOrder( from, recipientAddress, tokens, orderNonce, orderHash     ));

          return true;

       }



}
