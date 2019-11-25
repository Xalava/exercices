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
