import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css';
import SceneOuverte from './abis/SceneOuverte.json'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: null,
      account: '',
      sceneOuverte: '',
      tour: '',
      artisteActuel: '',
      loading: true
    }
    this.passerArtiste = this.passerArtiste.bind(this);
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
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

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ 
      account: accounts[0],
      web3: web3 
    })
  
    const networkId = await web3.eth.net.getId()
    const networkData = SceneOuverte.networks[networkId]

    if(networkData.address !== "") {
      const sceneOuverte = new web3.eth.Contract(SceneOuverte.abi, networkData.address)
      console.log(sceneOuverte)
      const tour = await sceneOuverte.methods.getTour().call()
      console.log(tour)
      const artisteActuel = await sceneOuverte.methods.artisteEncours().call()
      console.log(artisteActuel)

      console.log(sceneOuverte)
      this.setState({ 
        sceneOuverte : sceneOuverte._address,
        tour: tour,
        artisteActuel: artisteActuel
       })
    } else {
      window.alert('SceneOuverte contract not deployed to detected network.')
    }
  }
  
  async ajouterArtiste(nomArtiste) {
    const { web3, sceneOuverte, account } = this.state
    const contract = new web3.eth.Contract(SceneOuverte.abi, sceneOuverte)

    await contract.methods.sInscrire(nomArtiste).send({from: account})
  }
  
  async passerArtiste() {
    const { web3, sceneOuverte, account } = this.state
    const contract = new web3.eth.Contract(SceneOuverte.abi, sceneOuverte)

    await contract.methods.passerArtisteSuivant().send({from: account})
    // update state
    const tour = await contract.methods.getTour().call()
    const artisteActuel = await contract.methods.artisteEncours().call()
    this.setState({ 
        tour,
        artisteActuel
    })
  }

  render() {
    const { artisteActuel, tour } = this.state
    return (
      <div className="App">
        <div className="App-header">
            <h2>Interaction avec Scene Ouverte</h2>
            <div className="row">
              <h3>Ajout Artiste</h3>
              <form onSubmit={(event) => {
                event.preventDefault()
                const name = this.nomArtiste.value
                this.ajouterArtiste(name)
              }}>
              <div className="form-group mr-sm-2">
                <input
                  id="nomArtiste"
                  type="text"
                  ref={(input) => { this.nomArtiste = input }}
                  className="form-control"
                  placeholder="Nom de l'artiste"
                required />
              </div>  
              <button type="submit" className="btn btn-primary">Ajouter</button>
              </form>
            </div>   
            <div className="row">
              <h3>Passer au prochain artiste</h3>
              <button onClick={ this.passerArtiste } className="btn btn-primary"> >> </button>
            </div>  
            <div className="row">
              <h3>Artiste actuel</h3>
              <label id="tour">Le tour actuel est à {tour}</label><br></br>
              <label id="artisteActuel">Artiste actuel est {artisteActuel}</label>
            </div>  
        </div>
      </div>
    );
  }
}

export default App;
