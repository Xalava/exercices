function hachage( chaine) {
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
    console.log("nonce = ",nonce,"Appel sur [", chaineCandidate, "] condensat = ",condensat, )
  } while(condensat>=target)
  console.log(">>> Trouvé nonce", nonce)
}

minage("Block 0 15 avril 2019 ABCDE ", 10000)