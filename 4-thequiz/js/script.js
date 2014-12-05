"use strict";
window.onload = function(){
    new Quest();
};


function Quest(){
    this.nextURL;
    this.createHTML();
    this.init();
}

Quest.prototype.createHTML = function (){
    var that = this;
    
    var div = document.getElementById("content");

};

Quest.prototype.init = function (){
    this.getQuestion("http://vhost3.lnu.se:20080/question/1");
};
    
Quest.prototype.getQuestion = function (url){
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
                
                var button = document.getElementById("answerbutton");
                button.onclick = function(){
                    console.log(question.nextURL);
                    var answer = document.getElementById("svar");
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
        
        //var url = answer.nextURL;
        var sendAnswer = JSON.stringify({answer: answerInput});
        console.log(this.nextURL);
        xhr1.open("POST", url, true);
        xhr1.setRequestHeader('Content-Type', 'application/json');
        xhr1.send(sendAnswer);
};

Quest.prototype.popup = function(text){
      // Popu meddelande
      
        var parentDiv = document.getElementById("content");
        var div = document.createElement("div");
        div.className = "popupWindow";
        parentDiv.appendChild(div);
        
        div.innerHTML = text;
};