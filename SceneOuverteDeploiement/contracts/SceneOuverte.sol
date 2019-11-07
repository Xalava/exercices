pragma solidity ^0.5.6;

// // Remix
// import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

// import "github.com/openzeppelin/openzeppelin-solidity/math/SafeMath.sol";
// //truffle ( npm i openzeppelin-solidity avant)
// import "openzeppelin-solidity/math/SafeMath.sol";
// //  Pour tout si dans le meme dossier
// import "./SafeMath.sol";

contract SceneOuverte {

  string[12] public passagesArtistes;  
  uint public creneauxLibres = 12;
  uint tour; 

  function sInscrire(string memory nomDArtiste) public {
    if(creneauxLibres>0){
      passagesArtistes[12-creneauxLibres] = nomDArtiste;
      creneauxLibres -= 1;
    }
  }

  function passerArtisteSuivant() public {
    tour += 1;
  }

  function artisteEnCours() public view returns (string memory){
    if (tour< (12 - creneauxLibres)){
      return passagesArtistes[tour];
    } else {
      return "FIN";
    }
  }
}


