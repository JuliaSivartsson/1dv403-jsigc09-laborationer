"use strict";

/*ImageWindow.prototype = new Window();
ImageWindow.prototype.constructor = ImageWindow;
function ImageWindow(url, desktop, xPos, yPos) {
    var image = document.createElement("img");
    image.src = url;

    this.WindowConstruct("Gallery", false, desktop, xPos, yPos);
    this.app.appendChild(image);
}*/


function ImageViewer(desktop, xPos, yPos) {
    this.win = new Window();
    //this.WindowConstruct("Gallery", false, desktop, xPos, yPos);
    //this.app.classList.add("Gallery");
    console.log(this.app);
    this.Url = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/";
    this.imageArr = undefined;
    this.thumbHeight = 0;
    this.thumbWidth = 0;
    this.loadImages();
    
    this.OpenInNewWindow = function(url){
        new ImageWindow(url, desktop, xPos+5, yPos+5);
    };
}

ImageViewer.prototype.loadImages = function() {
    var that = this;
    var xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function (){
        
        //Indikerar att vi har fått ett svar
        if(xhr.readyState === 4){
            if(xhr.status == 200){
                
                that.imageArr = JSON.parse(xhr.responseText);
                for(var i=0; i < that.imageArr.length; i++){
                    if(that.imageArr[i].thumbWidth > that.thumbWidth){
                        that.thumbWidth = that.imageArr[i].thumbWidth;
                    }
                    if(that.imageArr[i].thumbHeight > that.thumbHeight){
                        that.thumbHeight = that.imageArr[i].thumbHeight;
                    }
                }
                
                that.renderImages();

            }
            else{
                console.log("Läsfel, status:"+xhr.status);
            }
        }
        
    };
    xhr.open("GET", this.Url, true);
    xhr.send(null);
};

ImageViewer.prototype.renderImages = function(){
  var that = this;
  this.imageArr.forEach(function(currentImage){
     var imgContainer = document.createElement("a");
     imgContainer.href = "#";
     imgContainer.style.width = that.thumbWidth + "px";
     imgContainer.style.height = that.thumbHeight + "px";
     
     imgContainer.classList.add("imgContainer");
     imgContainer.onclick = function(e){
       e.preventDefault();
        that.OpenInNewWindow(currentImage.URL);
     };
     var image = document.createElement("img");
     image.src = currentImage.thumbURL;
     imgContainer.appendChild(image);
     var windowDiv = document.getElementById("ImageViewer");
console.log(that.win);

    windowDiv.appendChild(imgContainer);
  });
};