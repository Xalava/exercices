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
  if (!array.length) return
  
  for (var i = 0; i < array.length ; i++) {
		output = "\x1b[0m\x1b[33m" + array[i] // reset, yellow
		if (i==0 ){
      output +="\t" 
      output +=" 🐇"
		} else {
      output +="\t\x1b[1m" //bright
			for (var j = 0 ; j < array[i-1] ; j++) {
				output += " 🐇"
      }
      output +="\x1b[2m" // dim
			for (var k = 0 ; k < array[i] - array[i-1]; k++) {
				output += " 🐇"
			}
		}
		console.log(output)
	}
}

liste = fibonacci(process.argv[2])
dessiner(liste)
