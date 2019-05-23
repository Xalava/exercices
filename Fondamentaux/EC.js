#!/usr/bin/env node

const crypto = require('crypto')

// Fonctions liées à l'arithmétique modulaire
class Moda {
  constructor(p) {
    if(!this.isPrime(p)){
      throw "P not prime"
    }
    this.p = p
  }
  isPrime(n) {
    if(n<2)
      return false
    for(var i = 2; i < Math.sqrt(n); i++)
      if(n % i === 0) return false
    return true
  }
  // Modulo p
  mod(a,p= this.p){
    if (a%p<0){
      return a%p+p
    }
    return a%p
  }
  // Inverse de a. On cherche b tel que a * b = 1 (mod p)
  modinverse(a){
    a = this.mod(a);
    for (var b = 0; b < this.p; b++) {
        if (this.mod(a*b) == 1) {
            return b;
        }
    }
    return 0
  }
}

//Courbe ellitique sur les entiers modulo p
class ECModa extends Moda{
  constructor(a, b, p, G ) {
    if (4*a**3+27*b**2==0){
      throw "Illegal curve"
    }
    super(p)
    this.a = a
    this.b = b
    //A décommenter pour trouver un G approprié
    //this.findGs() 
    if(!this.isElement(G.x,G.y)){
      throw "G not on the curve"
    }
    this.G = G
    this.n = this.order(G.x,G.y)
  }
  isElement(x, y) {
    return this.mod(y ** 2)== this.mod(x ** 3 + this.a * x + this.b)
  }
  calculateYpos(x) {
    let res = this.mod(x ** 3 + this.a * x + this.b)
    // Recherche de la racine carrée de y tel que x * x = y (mod p)
    for (let y = 1; y < this.p; y++) {
      if(this.mod(y**2) == res)
        return y
    }
    return 0
  }
  findGs() {
    for (let i = 1; i < this.p; i++) {
      let y = this.calculateYpos(i)
      if(y!=0){
        let n = this.order(i,y)
        console.log(i, y, n)

      }
    }
  }
  //P + P = R
  doubling(xP,yP){
    let m = this.mod( (3 * xP**2 + this.a ) * this.modinverse(2*yP))
    let xR = this.mod(m ** 2 - 2 * xP)
    let yR = this.mod(m*(xP - xR) - yP)
    return [xR,yR]
  }
  //kP = R
  scalarMultiplication(xP,yP, k){
    if (k ==1)
    return [xP, yP]
    let [xR, yR] = this.doubling(xP,yP)
    // console.log("  G2",xR,yR)

    for(let i=3;i<=k;i++){
      if(this.modinverse(xR-xP)==0)
        return 0
      let m = (yR-yP ) * this.modinverse(xR-xP)
      xR = this.mod(m ** 2 - xR - xP)
      yR = this.mod(m * (xP-xR)-yP)//signe à vérifier
      // console.log(`  G${i}`,xR,yR)
    }
    return [xR,yR]
  }
  // P + Q = R
  addition(xP,yP,xQ,yQ){
    if(this.modinverse(xQ-xP)==0)
      return 0
    let m = (yQ-yP ) * this.modinverse(xQ-xP)
    xR = this.mod(m ** 2 - xQ - xP)
    yR = this.mod(m * (xR-xP)+yP)// Signe à vérifier
    return [xR,yR]
  }

  // Ordre pour un point donné
  order(x,y) {
    for (let i = 1; i < this.p; i++) {
      if(this.scalarMultiplication(x,y,i)==0)
        return i
    }
    return this.p
  }
  //Afficher la courbe
  display(){
    return `y²=x³+${this.a}x+${this.b} (mod ${this.p})`
  }
  //Signature
  sign(privatekey,hash){
    let r,s
    do{
      let k = Math.ceil(Math.random()* (this.n-2))
      let P = this.scalarMultiplication(this.G.x,this.G.y,k)
      r = this.mod(P[0],this.n)
      s = this.mod(this.modinverse(k) * (hash + r*privatekey),this.n)
    } while(r==0||s==0)
    return [r,s]  
  }
  //Vérifier signature
  verify(publickey, hash, signature){
    let u1 = this.mod(this.modinverse(signature[0])*hash,this.n)
    let u2 =  this.mod(this.modinverse(signature[0])*signature[1],this.n)
    let A = this.scalarMultiplication(this.G.x,this.G.y,u1)
    let B = this.scalarMultiplication(publickey[0],publickey[1],u2)
    let P = this.addition(A,B)
    return this.mod(P[0],this.n)==this.mod(signature[0],this.n)
  }
}

// Paramètres
let [a,b]= [0, 7] // Valeur de secp256k1, courbe utilisée dans Bitcoin
let p = 173 // Petit nombre premier
let G = {x:166, y:23}// Point générateur choisi sur la courbe (avec ordre premier)

let curve = new ECModa(a,b,p,G)
console.log("G", G,"is element of",curve.display())
console.log("The order of G is",curve.n)

privatekey = Math.floor(Math.random()* (curve.n -1)+1)
console.log('Private Key >>', privatekey)

publickey = curve.scalarMultiplication(G.x,G.y,privatekey)
console.log('Public Key >>', publickey)

// Signature
// hash = 1234
// signature = curve.sign(privatekey,hash)
// console.log("Signature of",hash,"is",signature)
// console.log("Verification", curve.verify(publickey,hash,signature))

