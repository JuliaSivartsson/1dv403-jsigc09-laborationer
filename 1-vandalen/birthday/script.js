"use strict";

window.onload = function(){

	
	var birthday = function(date){
		


			// Din kod här.
			
			if(date === ""){
			 	throw new Error("Fel format!");
			}

	    //Todays date and users date
		   var today = new Date();
	    var nextBirthday = new Date(date);
	 
	    // This year
	 			nextBirthday.setFullYear(today.getFullYear());
	 
	 		 // To avoid minus days
	 	 	if(nextBirthday.getTime() - today.getTime() < 0){
	 	 				nextBirthday.setFullYear(today.getFullYear() + 1);
	 	 	}
					
					// Return days to next birthday
					function numberOfDays(){
									var milliseconds;
									milliseconds = nextBirthday.getTime() - today.getTime();
									var minutes = 1000 * 60;
									var hours = minutes * 60;
									var days = hours * 24;
									var daysToReturn = milliseconds / days;
									daysToReturn = Math.ceil(daysToReturn);
									
									if(daysToReturn == 365){
										daysToReturn = 0;
									}
									
									return daysToReturn;
					}
					
	    return numberOfDays();
	    
		
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
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};