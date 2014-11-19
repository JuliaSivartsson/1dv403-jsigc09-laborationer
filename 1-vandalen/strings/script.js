"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		// Plats för förändring.		
		// Returnera den konverterade strängen.
		// Vid fel, kasta ett undantag med ett meddelande till användaren.
		if(str == ""){
			throw new Error("Strängen får inte vara tom!");
		}
	
	var tempString = str;
	var newString = "";
	
	//for each character in str
	for(var i = 0; i < tempString.length; i++){
		
		//if it is a lowercase
		if(tempString.charAt(i) === tempString.charAt(i).toLowerCase()){
			newString = newString + tempString.charAt(i).toUpperCase();
		}
		//if it is a uppercase
		else if(tempString.charAt(i) === tempString.charAt(i).toUpperCase()){
			newString = newString + tempString.charAt(i).toLowerCase();
		}
		//if it is an a or A
		if(tempString.charAt(i) == "a" || tempString.charAt(i) == "A"){
			var re = /a/gi;
			var newstr = newString.replace(re, "#");
			newString = newstr;
		}
	}
	
	return newString;
	
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};