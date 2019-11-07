const fs = require('fs')
const ethers = require('ethers')
const output = require('./build/Register')
const so = output.contracts['contracts/Register.sol:Register']

// const IPFS = require('ipfs')
// const ipfs = new IPFS()

var ipfsClient = require('ipfs-http-client')
var ipfs = ipfsClient('localhost', '5001', { protocol: 'http' }) 
const express = require('express')
const app = express()

const SERVERPORT="3210"

// app.get('/', (req, res) => {
//   console.log("Request /")
//   res.sendFile("index.html", { root: __dirname +"/src"})
// });
app.use(express.static('src'))

async function deployAll() {
  var provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
  const signer = provider.getSigner(0)
  let factory = new ethers.ContractFactory(so.abi, so.bin,signer)
  let contract = await factory.deploy()
  console.log('◔ Contrat en deploiement:',contract.address)
  fs.writeFile("src/data.json", JSON.stringify(contract), function(err) {
  if (err) {
      console.log(err);
  }
  })
  await contract.deployed()
  console.log("◑ Contrat déployé")
  //

  // ipfs.on('ready', () => {
    console.log("◕ IPFS prêt")

    // ipfs.swarm.addrs.then(r=>
    //   console.log(r)
    // )
  // })
    provider.getNetwork().then(r =>  {
      console.log("● Ethereum connecté sur ", r)

      app.get("/pin/:h", (req, res, next) => {
        var hash = req.params.h
        let pinnedfilter = contract.filters.DocumentPinned(hash)
       
        contract.on(pinnedfilter, (document, date, value, event) => {
          console.log('Pinned', document, date, value);
          ipfs.pin.add(document, function (err) {})
        })
    

      })
    }) 
  // })
}
app.listen(SERVERPORT, () => console.log('Epinglage à l écoute sur ' + SERVERPORT))
deployAll()