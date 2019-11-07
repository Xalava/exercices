pragma solidity ^0.5.7;
contract Register {

  event DocumentPinned(bytes32, uint,uint);

  function pinDocument(bytes32 documentHash) payable public {
    if (msg.value >= 0.01 ether){
      emit DocumentPinned(documentHash,now,msg.value);
    }
  }
  struct Pinning {
    uint date;
    address author;
  }
  mapping  (bytes32 => Pinning) private pinnedDocuments;

  
  
  
  function hashData(string memory data) pure public returns(bytes32) {
      return keccak256(abi.encodePacked(data));
  }


  mapping  (bytes32 => uint) private documents;
  uint public nbDocuments;
  event DocumentAdded(bytes32, uint);

 
  function getDate(bytes32 documentHash) view public returns (uint) {
    return documents[documentHash];
  }

  function addDocument(bytes32 documentHash) public {
    if (getDate(documentHash)== 0){
      documents[documentHash] = now;
      nbDocuments +=1;
      emit DocumentAdded(documentHash,now);
    }
  }
}
