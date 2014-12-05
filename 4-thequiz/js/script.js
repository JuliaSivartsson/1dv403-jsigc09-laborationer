"use strict";
window.onload = function(){
    new Quest();
};


function Quest(){
    this.nextURL;
    this.init();
}

Quest.prototype.init = function (){
    document.getElementById("svar").focus();
    this.getQuestion("http://vhost3.lnu.se:20080/question/1");
};
    
Quest.prototype.getQuestion = function (url){
    // Här hämtar vi fråga från servern samt skickar nextURL till sendQuestion()
    console.log(url);
    var that = this;
    
        var xhr = new XMLHttpRequest();
      
        xhr.onreadystatechange = function (){
        
        //Indikerar att vi har fått ett svar
        if(xhr.readyState === 4){
            if(xhr.status == 200){
                var question = JSON.parse(xhr.responseText);
                that.popup(question.question);
                console.log(question.id);
                console.log(question.message);
                
                var answer = document.getElementById("svar");
                var button = document.getElementById("answerbutton");
                answer.onkeypress = function(e){
                    if(e.keyCode == 13 && answer.value !== ""){
                    e.preventDefault();
                    that.sendQuestion(answer.value, question.nextURL);  
                    }
                };
                button.onclick = function(){
                    if(answer.value === ""){
                        return false;
                    }
                       that.sendQuestion(answer.value, question.nextURL);    
                };
            }
            else{
                console.log("Läsfel, status:"+xhr.status);
            }
        }
        
    };
      xhr.open("GET", url, true);
      xhr.send(null);
};
    
Quest.prototype.sendQuestion = function (answerInput, url){
    // Här skickar vi svaret till servern och skickar tillbaka ny fråga till getQuestion()
    var that = this;

        var xhr1 = new XMLHttpRequest();
        
        xhr1.onreadystatechange = function (){
            
            //Indikerar att vi har fått ett svar
            if(xhr1.readyState === 4){
            
            var answer = JSON.parse(xhr1.responseText);
                    console.log(answer.message);
    
                if(answer.message == "Correct answer!"){
                    that.popup(answer.message);
                    that.getQuestion(answer.nextURL);             
                }
                else{
                    that.popup(answer.message);
                }
            }
        };
        
        var sendAnswer = JSON.stringify({answer: answerInput});
        console.log(this.nextURL);
        xhr1.open("POST", url, true);
        xhr1.setRequestHeader('Content-Type', 'application/json');
        xhr1.send(sendAnswer);
};

Quest.prototype.popup = function(text){
      // Popup meddelande
      
        var parentDiv = document.getElementById("content");
        var div = document.createElement("div");
        div.className = "popupWindow";
        parentDiv.appendChild(div);
        
        div.innerHTML = text;
};