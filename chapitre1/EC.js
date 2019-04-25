#!/usr/bin/env node

const crypto = require('crypto')

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
  mod(a){
    if (a%this.p<0){
      return a%this.p+this.p
    }
    return a%this.p
  }
  //Brute force version
  modinverse(a){
    a = this.mod(a);
    for (var i = 0; i < this.p; i++) {
        if (this.mod(a*i) == 1) {
            return i;
        }
    }
    throw "Mod inverse not found"
  }
}

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
    return y ** 2 % this.p == x ** 3 + this.a * x + this.b% this.p;
  }
  calculateYpos(x) {
    let res = x ** 3 + this.a * x + this.b
    // brute force version of modular square root
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
  doubling(xP,yP){
    let m = this.mod( (3 * xP**2 + this.a ) * this.modinverse(2*yP))
    let xR = this.mod(m ** 2 - 2 * xP)
    let yR = this.mod(m*(xP - xR) - yP)
    return [xR,yR]
  }
  scalarMultiplication(xP,yP, k){
    if (k ==1)
    return [xP, yP]
    let [xR, yR] = this.doubling(xP,yP)
    console.log("  G2",xR,yR)

    for(let i=3;i<=k;i++){
      let m = (yR-yP ) * this.modinverse(xR-xP)
      xR = this.mod(m ** 2 - xR - xP)
      yR = this.mod(m * (xP-xR)-yP)
      console.log(`  G${i}`,xR,yR)

    }
    return [xR,yR]
  }

  display(){
    return `y²=x³+${this.a}x+${this.b} (mod ${this.p})`
  }
}


//  javascript maximum safe interger    2147483647
// Maximum exact integer : 9007199254740991

let [a,b]= [0, 7] // Scep256k values
let p = 173 // Small enough prime number

let curve = new ECModa(a,b,p)

let G = {x:2, y:19}
console.log("G", G,curve.isElement(G.x, G.y)?"is":"IS NOT","element of",curve.display())

let n = 87 // order of the curve (first k where kG ==0)
privatekey = Math.floor(Math.random()*n)
console.log('Private Key >>', privatekey)

publickey = curve.scalarMultiplication(G.x,G.y,privatekey)
console.log('Public Key >>', publickey)



