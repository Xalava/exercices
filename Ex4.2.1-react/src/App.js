import React, { Component } from '../node_modules/react'
import Web3 from '../node_modules/web3/types'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bloc: '',
      gas: ''
    }
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
    let bloc = await web3.eth.getBlockNumber();
    let gas = await web3.eth.getGasPrice();
    this.setState({
      bloc,
      gas
    })
  }

  render() {
    const { bloc, gas } = this.state
    return (
      <div className="App">
        <h2>Informations générales</h2>
	        <table>
	            <tbody>
	                <tr>
	                    <th>Dernier bloc</th>
	                    <th>Prix du gaz</th>
	                </tr>
	                <tr>
	                    <td id="blockNumber">{bloc}</td>
	                    <td id="gasPrice">{gas}</td>
	                </tr>
	            </tbody>
	        </table>
      </div>
    );
  }
}

export default App;
