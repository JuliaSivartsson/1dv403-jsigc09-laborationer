"use strict";

function Window(name){
    this.name = name;
    this.createHTML();
}

Window.prototype.createHTML = function(){

    var background = document.getElementById("background");
        
    var windowDiv = document.createElement("div");
    windowDiv.className = "windowDiv";
    windowDiv.id = this.name;
    
    var header = document.createElement("header");
    header.classList.add("appHeader");
    
    var imgClose = document.createElement("img");
    imgClose.setAttribute("src", "img/remove.png");
    imgClose.setAttribute("alt", "Time");
    
    var aClose = document.createElement("a");
    aClose.setAttribute("href", "#");
    aClose.setAttribute("class", "closeButton");
    aClose.appendChild(imgClose);
    
    var textClose = document.createElement("p");
    textClose.className = "closeText";
    textClose.innerHTML = "Imageviewer";
    
    aClose.onclick = function(){
        background.removeChild(windowDiv);
    };
    

    header.appendChild(textClose);
    header.appendChild(aClose);
    windowDiv.appendChild(header);
    background.appendChild(windowDiv);  
};