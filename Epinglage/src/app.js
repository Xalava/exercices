const NODEURL = "http://127.0.0.1:3210/";
var app = new Vue({
  el: '#app',
  data: {
    nom: 'inconnu',
    provider: {},
    adresses: [],
    network:"",
    connected: false,
    contractData:{},
    contrat:{},
    recentDocuments:[],
    checkedDocDate:0,
    lastDocument:{},
    lastHash:"",
    signer:{},
    ipfs:{},
    Buffr:{}
  },
  beforeCreate: function () {
      fetch("/data.json")
        .then(r => r.json())
        .then(json => {
          this.contractData=data;
      });

      // this.ipfs = new window.Ipfs()

      this.ipfs = window.IpfsHttpClient('localhost', '5001')
      // this.Buffr = window.Ipfs.Buffer
      // console.log("buffr",this.Buffr)

  },
  methods:{
    connectMetamask: async function() {
      this.addresses = await ethereum.enable()
      this.provider = await new ethers.providers.Web3Provider(ethereum)
      this.nom = this.addresses[0]
      this.signer = this.provider.getSigner(this.addresses[0]);
      this.connected = true
      this.getNetwork()
      this.getContract()
    },
    connectLocally: async function(){
      let defaultPassword = "abc"
      this.provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
      let walletStorage="mywallet"
      let jsonValue=localStorage.getItem(walletStorage)
      if(jsonValue){
        try{
          // this.signer = await ethers.Wallet.fromEncryptedJson(jsonValue, defaultPassword)
          this.signer = JSON.parse(jsonValue)
          console.log("Loaded from local storage")
        }catch(e){
          console.error("Wallet loading error")
        }
      }else{
        this.signer = ethers.Wallet.createRandom()
        console.log("Generated new wallet")
        // let json  =  await this.signer.encrypt(defaultPassword)
        let json = JSON.stringify(this.signer)
        localStorage.setItem(walletStorage,json)
      } 
      console.log(this.signer)
      this.signer =  new ethers.Wallet(this.signer.privateKey, this.provider)
      this.nom = this.signer.address 
      this.connected = true
      this.getNetwork()
      this.getContract()
    },
    getNetwork: async function() {
      this.network = await this.provider.getNetwork()  
      console.log("Network: ", this.network) 
    },
    getContract: async function() {
      console.log(this.contractData)
      let Contrat=new ethers.Contract(this.contractData.address, this.contractData.interface.abi, this.provider)
      this.contrat=await Contrat.connect(this.signer)      

    },
    loadDocument: async function(){
      let doc = document.getElementById("fichier").files[0]
      console.log(doc)
      const reader = new FileReader()
      reader.readAsArrayBuffer(doc)
      console.log(reader)
      reader.onloadend = function() {
        app.lastDocument = reader.result
      }
    },
    addDocument:async function(){
      try {
        if(this.lastDocument){
          this.ipfs.add(new Ipfs.Buffer.from(this.lastDocument)).then(r=>{

            // this.ipfs.add().then(r=>{
              this.lastHash = r[0].hash
            })
        } 
      } catch (error) {
        console.log(error)
      }
    },
    checkDocument:async function(){
      try {
        let dochash = await this.contrat.hashData(this.lastDocument.toString())
        let docDate = await this.contrat.getDate(dochash)
        console.log("Doc date retrieved", docDate.toNumber())
        if(docDate.toNumber()==0){
          this.checkedDocDate = "Document not Found"
        }else {
          this.checkedDocDate = "Document added on " + new Date(docDate.toNumber()*1000).toLocaleDateString('en-GB', {  
            month : 'short',
            day : 'numeric',
            year : 'numeric'
          })        
        }
      } catch (error) {
        this.checkedDocDate = "Not Found"
        console.log(error)
      }
    },
    pinDocument:async function(){
      try {
        if(this.lastHash){
          await this.contrat.pinDocument(lastHash)
          postToNode("pin",lastHash)
        } 
      } catch (error) {
        console.log(error)
      }
    },
  }
})

function postToNode( cmd, h ) {
  return fetch(NODEURL+cmd+"/"+h, {
      method: "GET", 
  })
  .then(response =>response.json())
}