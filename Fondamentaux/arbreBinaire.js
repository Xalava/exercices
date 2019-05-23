class Noeud {
  constructor(valeur) {
    this.valeur = valeur;
    this.gauche = null;
    this.droit = null;
  }
  ajouter(valeur) {
    if (valeur < this.valeur) {
      if (this.gauche === null) {
        this.gauche = new Noeud(valeur)
      } else {
        this.gauche.ajouter(valeur)
      }
    } else {
      if (this.droit === null) {
        this.droit = new Noeud(valeur)
      } else {
        this.droit.ajouter(valeur);
      }
    }
  }
  afficherInfixe() {
      return `TODO`;
  }
}

class Arbre {
  constructor(valeurs) {
    valeurs.forEach(valeur => {
      this.ajouter(valeur)
    });
  }

  ajouter(valeur){
    if (this.racine){
      this.racine.ajouter(valeur)
    } else {
      this.racine =new Noeud(valeur)
    }
  }

  afficherInfixe() {
      return `TODO`;
  }
}