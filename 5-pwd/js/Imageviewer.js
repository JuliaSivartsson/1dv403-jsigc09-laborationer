"use strict";

function ImageViewer() {
    this.createHTML();
    this.init();
    console.log("hej");
}

ImageViewer.prototype.createHTML = function() {
    var background = document.getElementById("background");
    
    var windowDiv = document.createElement("div");
    windowDiv.className = "windowDiv";
    
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
    

    windowDiv.appendChild(aClose);
        windowDiv.appendChild(textClose);
    background.appendChild(windowDiv);
};

ImageViewer.prototype.init = function() {
    this.loadImages("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/");
};

ImageViewer.prototype.loadImages = function(imagesUrl) {
    var that = this;
    var xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function (){
        
        //Indikerar att vi har fått ett svar
        if(xhr.readyState === 4){
            if(xhr.status == 200){
                
            var images = JSON.parse(xhr.responseText);
            images.forEach(function(entry){
                           console.log(entry.thumbURL); 
            });

            }
            else{
                console.log("Läsfel, status:"+xhr.status);
            }
        }
        
    };
    xhr.open("GET", imagesUrl, true);
    xhr.send(null);
};