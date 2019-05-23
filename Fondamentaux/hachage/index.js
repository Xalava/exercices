var program = require("commander")
program
  .version("1.0.0")
  .option("-m, --minage <cible>")
  .parse(process.argv)

function hachage(chaine) {
  condensat=0
  for (i=0; i< chaine.length;i++){
    condensat = (condensat + chaine.charCodeAt(i) * 3** i) % 65536
  }
  return condensat 
}

function minage (chaine, target) {
  console.log("Mining. Target is", target)
  nonce=0
  do {
    nonce = nonce +1
    chaineCandidate = chaine + nonce
    condensat = hachage(chaineCandidate)
    console.log("nonce :",nonce,"    chaine :", chaineCandidate, "    condensat :",condensat, )
  } while(condensat>=target)
  console.log(">>> Trouvé nonce", nonce)
}

if(program.minage){
  console.log(program.minage)
  console.log(minage(process.argv[4], program.minage))
} else {
  console.log(hachage(process.argv[2]))
}

