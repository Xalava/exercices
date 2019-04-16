let solution= process.argv[2]
let min = 0
let max = 100
let estimation = 50
let essais = 1
do {
	console.log("Ma proposition n°", essais," est ", estimation)
    if (estimation < solution){
      min = estimation
			estimation = Math.round((min+max)/2)
			console.log("C'est plus")
    } else if (estimation > solution){
			max = estimation
			estimation = Math.round((min+max)/2)
			console.log("C'est moins")
    }
    essais++
} while (estimation != solution)

console.log("J'ai gagné! la solution était ", solution)
