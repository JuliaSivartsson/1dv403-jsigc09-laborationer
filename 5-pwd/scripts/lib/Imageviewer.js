"use strict";

function ImageViewer() {
    this.imageArr = undefined;
    this.thumbHeight = 0;
    this.thumbWidth = 0;
    this.init();
    new Window("ImageViewer");
}

ImageViewer.prototype.init = function() {
    this.loadImages("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/");
};

ImageViewer.prototype.loadImages = function(imagesUrl) {
    var that = this;
    that.setStatus("Laddar bilder...");
    //loadingDiv.classList.add("visible");


    //loadingDiv.className = "";
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
                
                //loadingDiv.className = "hidden";
                that.renderImages();

            }
            else{
                console.log("Läsfel, status:"+xhr.status);
            }
        }
        
    };
    xhr.open("GET", imagesUrl, true);
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
        var background = document.getElementById("background");
        background.style.backgroundImage="url("+currentImage.URL+")";
     };
     
     var image = document.createElement("img");
     image.src = currentImage.thumbURL;
     imgContainer.appendChild(image);
     var windowDiv = document.getElementById("ImageViewer");
     windowDiv.appendChild(imgContainer);
  });
};