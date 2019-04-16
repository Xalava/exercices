function fibonacci(n) {
	let suite = []
	for (let  i = 0; i < n; i++) {
		if ( i == 0 || i == 1 ) {
			suite[i]=1
		} else {
			suite[i] = suite[i-1] + suite[i-2]
		}
	}
	return suite
}

function dessiner(array) {
	for (var i = 0; i < array.length ; i++) {
		output = ">"
		if (i==0 ){
			for (var j = 0; j < array[i]; j++) {
				output +="o"
			}
		} else {
			for (var j = 0 ; j < array[i-1] ; j++) {
				output += "O"
			}
			for (var k = 0 ; k < array[i] - array[i-1]; k++) {
				output += "o"
			}
		}
		console.log(output)
	}
}

liste = fibonacci(process.argv[2])
console.log("Liste", liste)
dessiner(liste)
