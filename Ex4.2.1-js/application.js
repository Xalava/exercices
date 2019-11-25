const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "dev",
        "type": "bytes32"
      }
    ],
    "name": "remettre",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "cred",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "url",
        "type": "string"
      }
    ],
    "name": "produireHash",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "destinataire",
        "type": "address"
      },
      {
        "name": "valeur",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

async function createMetaMaskDapp() {
  try {
    // Demande à MetaMask l'autorisation de se connecter
    const addresses = await ethereum.enable();
    const address = addresses[0];
    // Connection au noeud fourni par l'objet web3
    const provider = new ethers.providers.Web3Provider(ethereum);
    dapp = { address, provider };
    console.log(dapp);

    setInterval(blockNumber, 1000);
    setInterval(gasPrice, 1000);
    document.getElementsByClassName("needMetaMask")[0].className = "needMetaMask";
  } catch (err) {
    // Gestion des erreurs
    console.error(err);
  }
}

async function blockNumber() {
  if (typeof dapp === "undefined") { await createMetaMaskDapp(); }
  dapp.provider.getBlockNumber(dapp.address).then((blockNumber) => {
    console.log("Dernier bloc: " + blockNumber);
    document.getElementById("blockNumber").innerHTML = blockNumber;
  });
}

async function gasPrice() {
  if (typeof dapp === "undefined") { await createMetaMaskDapp(); }
  dapp.provider.getGasPrice(dapp.address).then((gasPrice) => {
    let etherString = ethers.utils.formatEther(gasPrice);
    console.log("Prix du gaz: " + etherString);
    document.getElementById("gasPrice").innerHTML = etherString;
  });
}

async function instantiateCredibilite() {
  if (typeof dapp === "undefined") { await createMetaMaskDapp(); }
  let contractAddress = document.getElementById("contractAddress").value;
  if (contractAddress.substr(0, 2) == "0x") { contractAddress = contractAddress.substr(2) }
  let re = /[0-9A-Fa-f]{40}/g;
  if (!re.test(contractAddress)) { console.error("Format de l'adresse du contrat invalide: " + contractAddress); return; }

  contratCredibilite = new ethers.Contract("0x" + contractAddress, abi, dapp.provider.getSigner());
  let maCredibilite = await contratCredibilite.cred(dapp.address);
  document.getElementById("devoirURL").parentElement.className = "";
}

async function remettreDevoir() {
  let url = document.getElementById("devoirURL").value;
  let urlHash = await contratCredibilite.produireHash(url);
  console.log("Condensat de l'url du devoir: " + urlHash);

  //dapp.provider
  let rank = await contratCredibilite.remettre(urlHash);
  console.log("Le devoir #" + rank + "a été remis")
}
