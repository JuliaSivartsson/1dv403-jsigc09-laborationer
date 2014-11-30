"use strict";

window.onload = function() {
        new MessageBoard("board1");
        new MessageBoard("board2");
};

function MessageBoard(containerId){
    this.rootId = document.getElementById(containerId);
    this.messages = [];
    
    //Run methods on creation
    this.drawBoards();
    this.renderMessages();
    
}

 
    
MessageBoard.prototype.createMessage = function(){
        //Skapa nytt meddelande
        var text;
        var newMessage;
        
        text = this.rootId.getElementsByClassName("textareaContent")[0];
        console.log(text.value);

        //Är fältet tomt så händer ingenting
        if(text.value === ""){
            return false;
        }
        
        var newMessage = new Message(text.value, new Date());
        this.messages.push(newMessage);
        this.renderMessages();
};
    
MessageBoard.prototype.renderMessage = function(message, count){
        //Skriv ut ETT meddelande
        var that = this;
        var mezzageShow = document.createElement("section");
        
        var imgClock;
        var aClock;
        var imgRemove;
        var aRemove;
        var messageText;
        var spanTime;
        var time;
        var hr;
        
    //Tidknapp
        imgClock = document.createElement("img");
        imgClock.setAttribute("src", "img/clock1.png");
        imgClock.setAttribute("alt", "Time");
        
        aClock = document.createElement("a");
        aClock.setAttribute("href", "#");
        aClock.setAttribute("class", "right");
        aClock.appendChild(imgClock);
        
        aClock.onclick = function(){
            alert(message.getDateText());
        };
        
    //Ta bort knapp
        imgRemove = document.createElement("img");
        imgRemove.setAttribute("src", "img/remove1.png");
        imgRemove.setAttribute("alt", "delete");
        
        aRemove = document.createElement("a");
        aRemove.setAttribute("href", "#");
        aRemove.setAttribute("class", "right");
        aRemove.appendChild(imgRemove);
        
        aRemove.onclick = function(){
            if(confirm("Are you sure you want to delete this message?")){
                that.deleteMessage(count);
            }
            else{
                
            }
        };
        
    //Meddelandetext
        messageText = document.createElement("p");
        messageText.innerHTML = message.getHTMLText();
        var ourTime = new Date();
        
    //Tidsstämpel
        spanTime = document.createElement("span");
        time = ourTime.toLocaleTimeString();
        spanTime.innerHTML = time;
        
    //HR-tagg
        hr = document.createElement("hr");
        
        mezzageShow.appendChild(aClock);
        mezzageShow.appendChild(aRemove);
        mezzageShow.appendChild(messageText);
        mezzageShow.appendChild(spanTime);
        mezzageShow.appendChild(hr);
        
        return mezzageShow;
        
};
    
MessageBoard.prototype.renderMessages = function(){
        //Skriv ut ALLA meddelanden
        
        var messageArea = this.rootId.getElementsByClassName("viewmessages")[0];
        var messageCount = this.rootId.getElementsByClassName("count")[0];
        
        messageArea.innerHTML = "";
        var count = 0;
        
        //Rensar från tidigare utskrifter
        var messageContent = '';
        var that = this;
        this.messages.forEach( function(message){
            messageArea.appendChild(that.renderMessage(message, count));
            count++;
        });
        
        
        messageCount.innerHTML = this.count();
};
    
MessageBoard.prototype.deleteMessage = function(count){
        //Radera meddelande
        this.messages.splice(count, 1);
        this.renderMessages();
};
    
MessageBoard.prototype.count = function(){
        //Räknar antal meddelande
        return this.messages.length + " messages";
};


MessageBoard.prototype.drawBoards = function(){
        var that = this;
        
        var mezzageCount = document.createElement("div");
        mezzageCount.className = "count";
        this.rootId.appendChild(mezzageCount);
        
        var mezzageTextarea = document.createElement("textarea");
        mezzageTextarea.className = "textareaContent";
        mezzageTextarea.onkeypress = function(e){
            if(e.keyCode == 13 && !e.shiftKey){
                e.preventDefault();
                that.createMessage();
            }
        };
        
        this.rootId.appendChild(mezzageTextarea);
        
        //Referens till submit-knappen
        var mezzageButton = document.createElement("button");
        mezzageButton.className = "button";
        var buttonText = document.createTextNode("Send");
        mezzageButton.appendChild(buttonText);
        
        this.rootId.appendChild(mezzageButton);

        var mezzageMain = document.createElement("div");
        mezzageMain.className = "viewmessages";
        this.rootId.appendChild(mezzageMain);
        
        that.count();
                        

        
        mezzageButton.onclick = function(e){
            that.createMessage();
            that.rootId.getElementsByClassName("textareaContent")[0].focus();
        };
        
};
    