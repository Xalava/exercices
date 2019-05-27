let user = {}
let dapp = {}



console.log(data)
function ajouterArtiste(){
  let artiste = document.getElementById("nomartiste").value
  dapp.ContratSigner.sInscrire(artiste)
  rafraichir()
}


async function connectMetamask() {
  try {
    const addresses = await ethereum.enable()
    user.address = addresses[0]
    const provider = new ethers.providers.Web3Provider(ethereum)
    // const provider = new ethers.getDefaultProvider("kovan")
    let Contrat=new ethers.Contract(data.address, data.interface.abi, provider)
    let ContratSigner=Contrat.connect(provider.getSigner(user.address))

    dapp = { provider, Contrat, ContratSigner}

    console.log("DApp ready: ", dapp)
    console.log("User ready: ", user)
    rafraichir()
  } catch(err) {
    console.error(err);
  }
}
connectMetamask()

async function rafraichir() {
  dapp.provider.getNetwork().then(
    ntw => {document.getElementById("network").innerHTML = JSON.stringify(ntw);
    console.log(ntw)  
  })
  let creneauxLibres = await dapp.Contrat.creneauxLibres()
  document.getElementById("creneaux").innerHTML = creneauxLibres
  let encours = await dapp.Contrat.artisteEnCours()
  document.getElementById("encours").innerHTML = encours

  let listeHTML =  document.getElementById("liste")
  listeHTML.innerHTML = ""
  for (var i = 0; i <12-creneauxLibres; i++) {
    let artiste= await dapp.Contrat.passagesArtistes(i)
    let  listitem = document.createElement("li") //
    listitem.innerHTML = ` ⭐ ${artiste} ⭐ `
    listeHTML.appendChild(listitem)
  }
}


