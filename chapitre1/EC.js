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
  mod(a){
    if (a%this.p<0){
      return a%this.p+this.p
    }
    return a%this.p
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
  constructor(a, b, p) {
    if (4*a**3+27*b**2==0){
      throw "Illegal curve"
    }
    super(p)
    this.a = a;
    this.b = b;
  }
  isElement(x, y) {
    return this.mod(y ** 2)== this.mod(x ** 3 + this.a * x + this.b)
  }
  calculateYpos(x) {
    let res = this.mod(x ** 3 + this.a * x + this.b)
    // Recherche de la racine carrée de y tel que x * x = y (mod p)
    for (let y = 0; y < this.p; y++) {
      if(this.mod(y**2) == res)
        return y
    }
    throw "no suitable Y"
  }
  findGs() {
    for (let i = 0; i < this.p; i++) {
      if(Number.isInteger(curve.calculateYpos(i)))
      console.log(i, curve.calculateYpos(i))
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
      yR = this.mod(m * (xP-xR)-yP)
      // console.log(`  G${i}`,xR,yR)
    }
    return [xR,yR]
  }
  // Ordre pour un point donné
  orderOf(x,y) {
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
}

let [a,b]= [0, 7] // Valeur de secp256k1, courbe utilisée dans Bitcoin
let p = 173 // Petit nombre premier
let curve = new ECModa(a,b,p)
let G = {x:2, y:19}// Point générateur choisi sur la courbe
console.log("G", G,curve.isElement(G.x, G.y)?"is":"IS NOT","element of",curve.display())
let n = curve.orderOf(G.x,G.y) // Ordre du groupe généré par G
console.log("The order of G is",n)

privatekey = Math.floor(Math.random()*n)
console.log('Private Key >>', privatekey)

publickey = curve.scalarMultiplication(G.x,G.y,privatekey)
console.log('Public Key >>', publickey)



