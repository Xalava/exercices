[SceneOuverte]: #SceneOuverte
[SceneOuverte-passagesArtistes-string-12-]: #SceneOuverte-passagesArtistes-string-12-
[SceneOuverte-creneauxLibres-uint256]: #SceneOuverte-creneauxLibres-uint256
[SceneOuverte-tour-uint256]: #SceneOuverte-tour-uint256
[SceneOuverte-sInscrire-string-]: #SceneOuverte-sInscrire-string-
[SceneOuverte-passerArtisteSuivant--]: #SceneOuverte-passerArtisteSuivant--
[SceneOuverte-artisteEnCours--]: #SceneOuverte-artisteEnCours--
## <span id="SceneOuverte"></span> `SceneOuverte`

Contrat simple pour expérimenter les smart contracts


Ce contrat n'a pas été audité et ne suit pas des recommendations élémentaires

- [`sInscrire(string nomDArtiste)`][SceneOuverte-sInscrire-string-]
- [`passerArtisteSuivant()`][SceneOuverte-passerArtisteSuivant--]
- [`artisteEnCours()`][SceneOuverte-artisteEnCours--]

### <span id="SceneOuverte-sInscrire-string-"></span> `sInscrire(string nomDArtiste)` (public)

Ajoute un artiste à la l'ordre de passage de la soirée


inscrit l'artiste au prochain créneau libre et réduit la variable de 1


### <span id="SceneOuverte-passerArtisteSuivant--"></span> `passerArtisteSuivant()` (public)

Passe à l'artiste suivant



### <span id="SceneOuverte-artisteEnCours--"></span> `artisteEnCours() → string` (public)

Affiche l'artiste en cours de passage




