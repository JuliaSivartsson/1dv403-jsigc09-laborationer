"use strict";

function Window(id){
    this.id = id;
    this.createHTML();
}

Window.prototype.createHTML = function(){
    var that = this;
    
    this.app = document.createElement("div");
    console.log(this.app);
    
    var windowDiv = document.createElement("div");
    windowDiv.classList.add("windowDiv");
    windowDiv.style.left = this.xPos + "px";
    windowDiv.style.top = this.yPos + "px";
    
    var header = document.createElement("header");
    header.classList.add("appHeader");
    
    this.footer = document.createElement("footer");
    this.footer.classList.add("appFooter");
    
    var main = document.createElement("main");
    main.id = "main";
    
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
        document.querySelector("#content").removeChild(windowDiv);
    };
    

    header.appendChild(textClose);
    header.appendChild(aClose);
    windowDiv.appendChild(header);
    main.appendChild(this.app);
    windowDiv.appendChild(main);
    windowDiv.appendChild(this.footer);
    document.querySelector("#content").appendChild(windowDiv);  
};

Window.prototype.setStatus = function(message){
    this.footer.innerHTML = message;
};

Window.prototype.WindowConstruct = function(type, resizable, that, xPos, yPos){
    this.resizable = resizable;
    this.desktop = that;
    this.xPos = xPos;
    this.yPos = yPos;
    this.type = type;
    this.createHTML();
};