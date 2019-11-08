pragma solidity ^0.5.7;

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


