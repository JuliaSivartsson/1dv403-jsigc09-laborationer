"use strict";

var MessageBoard = {
    
    messages: [],
    
    init: function(){
        var textMessage;
        var sendMessage;

        MessageBoard.count();
                        
        //Referens till textmeddelandet
        textMessage = document.getElementById("messagearea");
        
        
        textMessage.focus();

        //Referens till submit-knappen
        sendMessage = document.getElementById("sendmessage");
        
        
        //FUNGERAR ICKE
        textMessage.addEventListener("keypress", function(e){
            if(!e){
                e = window.event;
            }
            
            if(e.keyCode == 13 && !e.shiftKey){
                console.log("enter pressed");
                e.preventDefault();
                MessageBoard.createMessage();
            }
        });
        
        sendMessage.addEventListener("click", MessageBoard.createMessage);
    },
    
    createMessage: function(){
        //Skapa nytt meddelande
        var text;
        var newMessage;
        
        text = document.getElementById("messagearea").value;
        
        //Är fältet tomt så händer ingenting
        if(text === ""){
            return false;
        }
        
        newMessage = new Message(text, new Date());
        
        MessageBoard.messages.push(newMessage);
        MessageBoard.renderMessages();
        
        text = "";
    },
    
    renderMessage: function(messageID){
        //Skriv ut ETT meddelande
        var viewmessages;
        var imgClock;
        var aClock;
        var imgRemove;
        var aRemove;
        var messageText;
        var spanTime;
        var time;
        var hr;
        
        MessageBoard.count();
        viewmessages = document.getElementById("viewmessages");
        
    //Tidknapp
        imgClock = document.createElement("img");
        imgClock.setAttribute("src", "img/clock1.png");
        imgClock.setAttribute("alt", "Time");
        
        aClock = document.createElement("a");
        aClock.setAttribute("href", "#");
        aClock.setAttribute("class", "right");
        aClock.appendChild(imgClock);
        
        aClock.addEventListener("click", function(){
            alert(MessageBoard.messages[messageID].getDateText());
        });
        
    //Ta bort knapp
        imgRemove = document.createElement("img");
        imgRemove.setAttribute("src", "img/remove1.png");
        imgRemove.setAttribute("alt", "delete");
        
        aRemove = document.createElement("a");
        aRemove.setAttribute("href", "#");
        aRemove.setAttribute("class", "right");
        aRemove.appendChild(imgRemove);
        
        aRemove.addEventListener("click",function(){
            if(confirm("Are you sure you want to delete this message?")){
                MessageBoard.deleteMessage(messageID);
            }
            else{
                
            }
        });
        
    //Meddelandetext
        messageText = document.createElement("p");
        messageText.innerHTML = MessageBoard.messages[messageID].getHTMLText();
        
    //Tidsstämpel
        var ourTime = new Date();
        spanTime = document.createElement("span");
        time = ourTime.toLocaleTimeString();
        spanTime.innerHTML = time;
        
    //HR-tagg
        hr = document.createElement("hr");
        
        viewmessages.appendChild(aClock);
        viewmessages.appendChild(aRemove);
        viewmessages.appendChild(messageText);
        viewmessages.appendChild(spanTime);
        viewmessages.appendChild(hr);
        
    },
    
    renderMessages: function(){
        //Skriv ut ALLA meddelanden
        
        document.getElementById("viewmessages").innerHTML = "";
        MessageBoard.messages.forEach(function(element, index){
            MessageBoard.renderMessage(index);
        });
        /*for(var i = 0; i <= MessageBoard.messages.length; i++){
            console.log(i);
            MessageBoard.renderMessage(i);
        };*/
        
        //Rensar från tidigare utskrifter
        document.form.messagearea.value = "";
    },
    
    deleteMessage: function(messageID){
        //Radera meddelande
        MessageBoard.messages.splice(messageID, 1);
        MessageBoard.count();
        MessageBoard.renderMessages();
        //console.log("Deleted message " + messageID.innerHTML);
    },
    
    count: function(){
        //Räknar antal meddelande
        
        var count = document.getElementById("count");
        count.innerHTML = "Messages: " + MessageBoard.messages.length;
    },

};
window.onload = MessageBoard.init;