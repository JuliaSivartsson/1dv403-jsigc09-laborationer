"use strict";
window.onload = function(){
    new Quest();
};


function Quest(){
    this.nextURL;
    this.contentDiv = document.getElementById("content");
    this.questionArray;
    this.createHTML();
    this.init();
}

Quest.prototype.createHTML = function(){
        var div = document.createElement("div");
        div.id = "question";
        div.className = "popupWindow";
        this.contentDiv.appendChild(div);
        
        var wrongDiv = document.createElement("div");
        wrongDiv.id = "wrongAnswer";
        wrongDiv.className ="wrongAnswer";
        
        this.contentDiv.appendChild(wrongDiv);
};

Quest.prototype.init = function (){
    var numberOfGuesses = 1;
    this.questionArray = [];
    document.getElementById("svar").focus();
    this.getQuestion("http://vhost3.lnu.se:20080/question/1", numberOfGuesses);
};

Quest.prototype.getScore = function(){
    
    var div = document.createElement("div");
    this.contentDiv.appendChild(div);
    div.className = "scoreDiv";
    
    var awesomeDiv = document.createElement("div");
    awesomeDiv.className = "awesome";

    
    var number = 0;
    var score = 0;
    var arrayLength = this.questionArray.length;
    
        this.questionArray.forEach(function(entry){
            number++;
            div.innerHTML += div.innerHTML = "Fråga: "+number+ ", antal gissningar: "+entry.score+"</br>";
            score += entry.score;
        });
        
    if(score == arrayLength){
        awesomeDiv.innerHTML = "Du klarade alla frågor på ett försök! Awesome!";
        div.appendChild(awesomeDiv);
    }
    
    var button = document.getElementById("answerbutton");
    button.onclick = function(){
      return false;
    };
};

Quest.prototype.getQuestion = function (questionUrl, numberOfGuesses){
    // Här hämtar vi fråga från servern samt skickar nextURL till sendQuestion()
    var that = this;
    var xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function (){
        
        //Indikerar att vi har fått ett svar
        if(xhr.readyState === 4){
            if(xhr.status == 200){

                var div = document.getElementById("question");

                div.innerHTML = '';
                
                var question = JSON.parse(xhr.responseText);
                that.popup("Fråga: " + question.question);
                console.log(question.id);

                //that.addQuestion(question.question);
                var answer = document.getElementById("svar");
                var button = document.getElementById("answerbutton");
                answer.onkeypress = function(e){
                    if(e.keyCode == 13 && answer.value !== ""){
                    e.preventDefault();
                    that.sendQuestion(answer.value, question.nextURL, questionUrl, numberOfGuesses);  
                    }
                };
                button.onclick = function(){
                    if(answer.value === ""){
                        return false;
                    }

                       that.sendQuestion(answer.value, question.nextURL, questionUrl, numberOfGuesses);    
                };
            }
            else{
                console.log("Läsfel, status:"+xhr.status);
            }
        }
        
    };
    xhr.open("GET", questionUrl, true);
    xhr.send(null);
};
    
Quest.prototype.sendQuestion = function (answerInput, AnswerUrl, previousUrl, numberOfGuesses){
    // Här skickar vi svaret till servern och skickar tillbaka ny fråga till getQuestion()
    var that = this;
    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function (){

        //Indikerar att vi har fått ett svar
        if(xhr1.readyState === 4){
    
        var answer = JSON.parse(xhr1.responseText);

            if(answer.message == "Correct answer!"){
                var div = document.getElementById("wrongAnswer");
                div.innerHTML = '';
                
                that.saveScore(AnswerUrl, numberOfGuesses);
                numberOfGuesses = 1;
                
                if(answer.nextURL !== undefined){
                that.getQuestion(answer.nextURL, numberOfGuesses);
                }
                else{
                    
                    that.popup("Grattis! Du har klarat alla frågor!");
                    that.getScore();
                }
            }
            else if(answer.message === "Wrong answer! :("){
                numberOfGuesses++;
                
                that.popupWrongAnswer(answer.message +" Try again!");
                that.getQuestion(previousUrl, numberOfGuesses);
            }
        }
    };
    var sendAnswer = JSON.stringify({answer: answerInput});
    xhr1.open("POST", AnswerUrl, true);
    xhr1.setRequestHeader('Content-Type', 'application/json');
    xhr1.send(sendAnswer);
};


Quest.prototype.saveScore = function(AnswerUrl, numberOfGuesses){
    this.questionArray.push({
       url: AnswerUrl,
       score: numberOfGuesses
    });
};

Quest.prototype.popup = function(text){
      // Popup meddelande
        var div = document.getElementById("question");
        div.innerHTML = text;
};

Quest.prototype.popupWrongAnswer = function(text){
      // Popup meddelande
        var div = document.getElementById("wrongAnswer");
        div.innerHTML = text;
};