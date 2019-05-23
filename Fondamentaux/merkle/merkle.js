#!/usr/bin/env node
const program = require('commander')
const crypto = require('crypto');

program
  .version("1.0.0")
  .arguments('<data...> ')
  .option("-p, --preuve <index>")
  .action(function (data) {
  	console.log("\nDonnées :",data)
    calculerArbre(data)
  })
// Appliquer les options ci-dessus
program.parse(process.argv)

function hachage(chaine){
  return crypto.createHash('sha256').update(chaine).digest('hex')
}

function calculerArbre(inputData){
  let rowSize = inputData.length // largeur de la profondeur actuelle
  let indice = 0 // indice à partir duquel lire la profondeur actuelle
  let tree = [] 
  // Rempli l'arbre avec le condensat des données
  for (var i = 0; i< inputData.length ; i++) {
    tree.push(hachage(inputData[i]))
  }
  // Remplir l'arbre de chaines vides si ce n'est pas une puissance de 2
  // TODO: à la place, gérer les cas avec le hachage de la concatenation du noeud avec lui même
  if (!Number.isInteger( Math.log2(rowSize))){
    let closestPower = 2**Math.ceil(Math.log2(rowSize))
    for (let i = rowSize; i < closestPower; i++) {   
      tree.push("")
    }
    rowSize = tree.length
    console.log("Taille corrigée:", tree.length)
  } 
  
  console.log("\nArbre:")
  console.log(tree)
  while (rowSize>1){
    // ajouter les condensat de concatenations 
    for (var i = indice; i < indice+rowSize; i=i+2) {
      tree.push(hachage(tree[i]+tree[i+1]))
    }
    //avancer de la largeur de la profondeur actuelle et diviser par 2 cette profondeur
    indice=indice+rowSize
    rowSize=rowSize/2
    console.log(tree.slice(indice, indice+rowSize))
  }
}

if (program.proof){
  // TODO
}