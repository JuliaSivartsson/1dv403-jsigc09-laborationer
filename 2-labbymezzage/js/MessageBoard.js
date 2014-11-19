"use strict";

var MessageBoard = {
    
    messages: ["kiwi"],
    
        init: function(){
        
        var mess = new Message("Testmeddelande", new Date());
        //alert(mess);
        //alert(mess.getText());
        mess.setText("En annan text");
        //alert(mess);
        
        //var mess1 = new Message();
        alert(messages[0].getText() + "hej");
    },

};


window.onload = MessageBoard.init;