pragma solidity ^0.5.7;

/// @title Contrat Scene Ouverte
/// @author Xavier Lavayssiere
/// @notice Contrat simple pour expérimenter les smart contracts
/// @dev Ce contrat n'a pas été audité et ne suit pas des recommendations élémentaires

contract SceneOuverte {

  string[12] public passagesArtistes;  
  uint public creneauxLibres = 12;
  uint tour; 

  /// @author Xavier Lavayssière
  /// @notice Ajoute un artiste à la l'ordre de passage de la soirée
  /// @dev inscrit l'artiste au prochain créneau libre et réduit la variable de 1
  /// @param nomDArtiste Chaine de caractères représentant l'artiste 
  /// @return rien
  function sInscrire(string memory nomDArtiste) public {
    if(creneauxLibres>0){
      passagesArtistes[12-creneauxLibres] = nomDArtiste;
      creneauxLibres -= 1;
    }
  }

  /// @author Xavier Lavayssière
  /// @notice Passe à l'artiste suivant
  function passerArtisteSuivant() public {
    tour += 1;
  }
  
  /// @author Xavier Lavayssière
  /// @notice Affiche l'artiste en cours de passage
  /// @return Artiste en cours de passage ou "FIN" sinon
  function artisteEnCours() public view returns (string memory){
    if (tour< (12 - creneauxLibres)){
      return passagesArtistes[tour];
    } else {
      return "FIN";
    }
  }
}


