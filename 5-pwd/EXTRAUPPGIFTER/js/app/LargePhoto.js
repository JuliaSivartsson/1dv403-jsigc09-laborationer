"use strict";

var PWD = PWD || {highestZIndex : 10};

PWD.constructors = PWD.constructors || {};
    
PWD.constructors.LargePhoto = function() {
    
};

PWD.constructors.LargePhoto.prototype = new PWD.constructors.Windowbase();

PWD.constructors.LargePhoto.prototype.renderPhoto = function(image){
    var maxHeight = 500;
    PWD.highestZIndex += 1;
    PWD.setters.setZIndex(PWD.highestZIndex);
    
    PWD.setters.setHeaderText("Image");
    PWD.setters.setHeaderIcon("img/appIcons/smallIV.png");
    PWD.setters.hideFooter();
    
    if(image.height > maxHeight){
        console.log(image.height);
        image.height -= 200;
        console.log(image.height);
    }
    PWD.setters.setWindowSize(image.width, image.height);
    //Set the content background
    PWD.setters.setContentBackground(image.URL);
    
};