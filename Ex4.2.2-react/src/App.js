import React, { Component } from '../node_modules/react'
import Web3 from 'web3'
import './App.css'
import Credibilite from './abis/Credibilite.json'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      credibilite: null,
      address: "",
      account: "",
    }
    this.instantiateCredibilite = this.instantiateCredibilite.bind(this);
    this.remettreDevoir = this.remettreDevoir.bind(this);
  }

  async componentWillMount() {
    await this.loadWeb3()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async instantiateCredibilite() {
    const web3 = window.web3  
    const account = await web3.eth.getAccounts()
    // Récupérer le networkId actuel (en se basant sur le fichier SceneOuverte.json) 
    const networkId = await web3.eth.net.getId()
    const networkData = Credibilite.networks[networkId]
    // Vérifier si on a un contrat déjà déployé ou pas encore 
    if(networkData.address !== "") {
      // Instancier le contrat crédibilité 
      const credibilite = new web3.eth.Contract(Credibilite.abi, networkData.address)
      // Update state 
      this.setState({
        credibilite: credibilite,
        address: networkData.address,
        account: account[0]
      });
      window.alert('Votre contrat est instancié '+ networkData.address + '')
    } else {
      // Afficher un message d'erreur 
      window.alert('SceneOuverte contract not deployed to detected network.')
    }
  }
  
  
  async remettreDevoir() {
    const { credibilite, account } = this.state;
    let url = document.getElementById("remettre").value;
    console.log(url)

    let urlHash = await credibilite.methods.produireHash(url).call()
    console.log("Condensat de l'url du devoir: " + urlHash)
    console.log(credibilite)
    console.log(account)
    const rank = await credibilite.methods.remettre(urlHash).send({from: account})
    window.alert("Le devoir #" + rank + " a été remis")
  }

  render() {
    return (
      <div className="App">
	      <h2>Interaction avec un contrat <samp>Credibilite</samp></h2>
	        <div>
            <button onClick= { this.instantiateCredibilite } className="btn btn-primary">Charger le contrat</button>
          </div>
          <br></br>
          <div>
            <label>url devoir à remettre</label>
            <input
                  id="remettre"
                  type="text"
                  placeholder="url github"
                required />
            <br></br>
	          <button onClick= { this.remettreDevoir } className="btn btn-primary">Remettre un devoir</button>
	        </div>
      </div>
    );
  }
}

export default App;
