"use strict";
console.log("desktop");

function Desktop(id){
    this.windows = [];
    this.element = document.getElementById(id);
    this.element.classList.add("background");
    this.navbar = document.createElement("nav");
    var that = this;
    
    var getPositionX = function(){
        var position = 30 * that.windows.length + 30;
        if(position / (window.innerWidth - 200) > 1){
            return position - (Math.floor(position / (window.innerWidth - 200)) * (window.innerWidth - 200));
        }else{
            return 30 * that.windows.length + 30;
        }
    };
    var getPositionY = function () {
        var position = 30 * that.windows.length + 30;
        if(position / (window.innerHeight - 300) > 1){
            return position - (Math.floor(position / (window.innerHeight - 300)) * (window.innerHeight - 300));
        }else{
            return 30 * that.windows.length + 30;
        }
    };
    
    this.element.appendChild(this.navbar);
    
    var applications = [
    
        [ImageViewer, "img/appIcons/imgViewer.png", "Gallery"]
    ];
    
    applications.forEach(function(app){
        var aTag = document.createElement("a");
        aTag.href = "#";
        aTag.classList.add("appLauncher");
        aTag.onclick = function(e){
            e.preventDefault();
            that.windows.push(new app[0](that, getPositionX(), getPositionY()));
        };
        

        var image = document.createElement("img");
        image.src = app[1];
        aTag.appendChild(image);

        var title = document.createElement("span");
        title.innerHTML = app[2];
        aTag.appendChild(title);

        that.element.appendChild(aTag);
    });

}

    /*Desktop.prototype.createHTML = function() {
        // Create the design elements
        var content = document.getElementById("content");
        var bottom = document.getElementById("bottom");
    
        var background = document.createElement("div");
        background.className = "background";
        background.id = "background";
        content.appendChild(background);
        
        var appIcon = document.createElement("img");
        appIcon.src = this.i
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
*/