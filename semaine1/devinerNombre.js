let userinput = -1;
let solution = Math.round(Math.random()*100+1);
while (userinput != solution&&userinput!=0){
	userinput =  window.prompt("Devinez le nombre entre 1 et 100");
    if (userinput < solution){
			console.log("C'est plus que ", userinput)
    } else if (userinput > solution){
			console.log("C'est moins que ", userinput)
    }
}
console.log("Vous avez gagné! la réponse était", solution)


