"use strict";

var MessageBoard = {
    
    messages: [],
    
    init: function(){
        var textMessage;
        var sendMessage;
            
        MessageBoard.count();
                        
        //Referens till textmeddelandet
        textMessage = document.getElementById("messagearea");
            
        //Referens till submit-knappen
        sendMessage = document.getElementById("sendmessage");
        sendMessage.onclick = MessageBoard.createMessage;
    },
    
    createMessage: function(){
        //Skapa nytt meddelande
        
        var text;
        var newMessage;
        
        text = document.getElementById("messagearea").value;
        newMessage = new Message(text, new Date());
        
        MessageBoard.messages.push(newMessage);
        MessageBoard.renderMessages();
    },
    
    renderMessage: function(messageID){
        //Skriv ut ETT meddelande
        
        MessageBoard.count();
        var viewmessages = document.getElementById("viewmessages");
        viewmessages.innerHTML ="hejhej";
    },
    
    renderMessages: function(){
        //Skriv ut ALLA meddelanden
        
        document.getElementById("viewmessages").innerHTML = "";
        for(var i = 0; i <= MessageBoard.messages.length; i++){
            MessageBoard.renderMessage(i);
        };
        
        //Rensar från tidigare utskrifter
        document.form.messagearea.value = "";
    },
    
    deleteMessage: function(messageID){
        //Radera meddelande
    },
    
    count: function(){
        //Räknar antal meddelande
        var count = document.getElementById("count");
        count.innerHTML = "Antal meddelanden: " + MessageBoard.messages.length;
    },

};
window.onload = MessageBoard.init;