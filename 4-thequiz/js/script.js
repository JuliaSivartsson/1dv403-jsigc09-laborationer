"use strict";

window.onload = function (){
  
  document.getElementById("questionbutton").addEventListener("click", function(){
      
      var xhr = new XMLHttpRequest();
      
    xhr.onreadystatechange = function (){
        
        //Indikerar att vi har fått ett svar
        if(xhr.readyState === 4){
            if(xhr.status == 200){
                var question = JSON.parse(xhr.responseText);
                console.log(question.id);
                console.log(question.message);
            }
            else{
                console.log("Läsfel, status:"+xhr.status);
            }
        }
        
    };


      xhr.open("GET", "http://vhost3.lnu.se:20080/question/1", true);
      xhr.send(null);
      
});
document.getElementById("answerbutton").addEventListener("click", function() {
    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function (){
        
        //Indikerar att vi har fått ett svar
        if(xhr1.readyState === 4){
                var answer = JSON.parse(xhr1.responseText);
                console.log(answer.message);

            if(answer.message == "Correct answer!"){
                console.log("Rätt svar!");
            }
            else{
                console.log("Fel!");
            }
        }
    };
    var answer = document.getElementById("svar");
    var sendAnswer = JSON.stringify({answer: answer.value});
    
    xhr1.open("POST", "http://vhost3.lnu.se:20080/answer/1", true);
    xhr1.setRequestHeader('Content-Type', 'application/json');
    xhr1.send(sendAnswer);
});

  
};