"use strict";

function Desktop(){
    this.createHTML();
    this.init();
}

    Desktop.prototype.createHTML = function() {
        // Create the design elements
        var content = document.getElementById("content");
        var bottom = document.getElementById("bottom");
    
        var background = document.createElement("div");
        background.className = "background";
        background.id = "background";
        content.appendChild(background);
        
        var icon = document.createElement("div");
        icon.className = "icon";
        
        var aicon = document.createElement("a");
        aicon.setAttribute("href", "#");
        aicon.appendChild(icon);
    
        aicon.onclick = function(){
            new ImageViewer();
        };
        
        bottom.appendChild(aicon);
    
            
        
    };
    
    Desktop.prototype.init = function(){
      console.log("init");  
    };