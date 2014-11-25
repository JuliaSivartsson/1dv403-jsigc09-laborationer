"use strict";

window.onload = function(){
    new MessageBoard("board1");
    new MessageBoard("board2");
    };

function MessageBoard(containerId){
    this.rootId = document.getElementById(containerId);
    this.messages = [];
    
    //Run methods on creation
    this.drawBoards();
}

 
    
MessageBoard.prototype.createMessage = function(){
        //Skapa nytt meddelande
        var text;
        var newMessage;
        
        text = this.rootId.getElementsByClassName("textareaContent")[0];
        console.log(text.value);
        console.log(this.rootId);
        
        //Är fältet tomt så händer ingenting
        if(text.value !== ""){
            newMessage = new Message(text, new Date());
            this.messages.push(newMessage);
        }
        
        text = "";
        this.renderMessages();
};
    
MessageBoard.prototype.renderMessage = function(messageID, count){
        //Skriv ut ETT meddelande
        
        var that = this;
        
        var mezzageShow = document.createElement("section");
        
        var viewmessages;
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
            alert(MessageBoard.messages[messageID].getDateText());
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
                MessageBoard.deleteMessage(messageID);
            }
            else{
                
            }
        };
        
    //Meddelandetext
        messageText = document.createElement("p");
        messageText.innerHTML = that.messages[messageID].getHTMLText();
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
        
};
    
MessageBoard.prototype.renderMessages = function(){
        //Skriv ut ALLA meddelanden
        
        
        var messageShow = this.rootId.getElementsByClassName("textareaContent")[0];
        var messageCount = this.rootId.getElementsByClassName("count")[0];
        
        var count = 0;
        //Rensar från tidigare utskrifter
        messageShow.innerHTML = "";
        var that = this;
        this.messages.forEach( function(message){
            messageShow.appendChild(that.renderMessage(message,count));
            count++;
        });
        console.log(this.messages);
        messageCount.innerHTML = this.count();
};
    
/*MessageBoard.prototype.deleteMessage = function(){
        //Radera meddelande
        MessageBoard.messages.splice(messageID, 1);
        MessageBoard.count();
        MessageBoard.renderMessages();
        //console.log("Deleted message " + messageID.innerHTML);
};*/
    
MessageBoard.prototype.count = function(){
        //Räknar antal meddelande
        return this.messages.length + " messages";
        console.log("hej");
};


MessageBoard.prototype.drawBoards = function(){
            var that = this;
        var mezzageMain = document.createElement("div");
        mezzageMain.className = "text";
        this.rootId.appendChild(mezzageMain);
        
        var mezzageCount = document.createElement("div");
        mezzageCount.className = "count";
        this.rootId.appendChild(mezzageCount);
        
        var mezzageTextarea = document.createElement("textarea");
        mezzageTextarea.className = "textareaContent";
        mezzageTextarea.onkeypress = function(e){
            if(e.keyCode == 13 && !e.shiftKey){
                console.log("enter pressed");
                e.preventDefault();
                that.createMessage();
            }
        };
        
        this.rootId.appendChild(mezzageTextarea);

        that.count();
                        
        //Referens till submit-knappen
        var mezzageButton = document.createElement("button");
        mezzageButton.className = "button";
        var buttonText = document.createTextNode("Skriv");
        mezzageButton.appendChild(buttonText);
        
        this.rootId.appendChild(mezzageButton);
        
        mezzageButton.onclick = function(e){
            that.createMessage();
        };
        
};
    