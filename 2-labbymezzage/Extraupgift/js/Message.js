"use strict";

function Message(message, date){
    
    this.getText = function(){
        return message;
    }
    
    this.setText = function(_text){
        message = _text;
    }
    
    this.getDate = function(){
        return date;
    }
    
    this.setDate = function(_date){
        date = _date;
    }
    
}

Message.prototype.toString = function(){
    return this.getText() + " ("+this.getDate()+")";
}

Message.prototype.getHTMLText = function(){
    return this.getText().replace(/[\n]/g, "<br />");
}

Message.prototype.getDateText = function(){
	var i = this.getDate().getMonth();
	var months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

	return	"Created "+this.getDate().getDate()+" " +months[i]+" "+this.getDate().getFullYear()+" at "+this.getDate().toLocaleTimeString();
}
