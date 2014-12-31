"use strict";

var PWD = PWD || {};

PWD.constructors = PWD.constructors || {};
    
PWD.constructors.ImageViewer = function() {
    
};

PWD.constructors.ImageViewer.prototype = new PWD.constructors.Windowbase();

PWD.constructors.ImageViewer.prototype.renderGallery = function(){
    
    PWD.setters.setHeaderText("Imageviewer");
    PWD.setters.setHeaderIcon("img/appIcons/smallIV.png");
    
    var newWindowsLeftPosition = 600;
    var newWindowsTopPosition = 30;
    
    var imagesUrl = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/";

    loadImages();
    
    function loadImages(){
        var imageArr;
        var thumbHeight = 0;
        var thumbWidth = 0;
        var loadingGif;
        var divWithPictures = document.createElement("div");
        var footerText = document.createElement("p");
        
        loadingGif = document.createElement("img");
        loadingGif.setAttribute("src", "img/load.gif");
        footerText.innerHTML = "Loading";
        footerText.appendChild(loadingGif);
        
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function (){
            
            //Indcate an answer
            if(xhr.readyState === 4){
                if(xhr.status == 200){
                    imageArr = JSON.parse(xhr.responseText);
                    for(var i=0; i < imageArr.length; i++){
                        if(imageArr[i].thumbWidth > thumbWidth){
                            thumbWidth = imageArr[i].thumbWidth;
                        }
                        if(imageArr[i].thumbHeight > thumbHeight){
                            thumbHeight = imageArr[i].thumbHeight;
                        }
                    }
                    renderThumbnailes(imageArr);
                    footerText.innerHTML = "Content loaded successfully";
                }
                else{
                    console.log("Error, status:"+xhr.status);
                }
            }
            
        };
        xhr.open("GET", imagesUrl, true);
        xhr.send(null);
        
        function renderThumbnailes(imageArr){
            // Create a table that render the images
     
            imageArr.forEach(function(currentImage){
                 var imgContainer = document.createElement("a");
                 imgContainer.href = "#";
                 imgContainer.style.width = thumbWidth + "px";
                 imgContainer.style.height = thumbHeight + "px";
                 
                 imgContainer.classList.add("imgContainer");
                 imgContainer.onclick = function(e){
                   e.preventDefault();
                    renderLargePhoto(currentImage);
                 };
                 
                imgContainer.onmouseover = function(){
                footerText.innerHTML = "Bildstorlek: " + currentImage.width + "px X " + currentImage.height + "px";
                };
                imgContainer.onmouseleave = function(){
                footerText.innerHTML = "";
                };
                 var image = document.createElement("img");
                 image.src = currentImage.thumbURL;
                 imgContainer.appendChild(image);
                 divWithPictures.appendChild(imgContainer);
                 
                 imgContainer.oncontextmenu = function ()
                {
                    backgroundImage(currentImage);
                    return false;     // cancel default menu
                }
            });
        }//renderThumbnails
        
        PWD.setters.setContent(divWithPictures);
        PWD.setters.appendFooterParagraph(footerText);
    }//loadImages
    
    function renderLargePhoto(image){
        var largeImage = new PWD.constructors.LargePhoto();
        largeImage.createHTML(newWindowsLeftPosition, newWindowsTopPosition);
        largeImage.renderPhoto(image);
        
        newWindowsLeftPosition += 10;
        newWindowsTopPosition += 10;
    }//renderLargePhoto
    
    function backgroundImage(image){
        var contentDiv = document.getElementById("contentDiv");
        contentDiv.style.backgroundImage = "url("+image.URL+")";
        
    }//backgroundImage
};