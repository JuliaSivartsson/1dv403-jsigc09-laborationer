"use strict";

var PWD = PWD || {};

PWD.desktop = PWD.desktop || {};

PWD.desktop.init = function() {
    PWD.desktop.renderDesktop();
};

PWD.desktop.renderDesktop = function(){
  var containerDiv;
  var contentDiv;
  var footer;
  var imageViewerIcon;
  var galleryLink;
  var imgFooter;
  var windowHeight = 390;
  
  containerDiv = document.getElementById("container");
  contentDiv = document.createElement("div");
  contentDiv.id = "contentDiv";
  containerDiv.appendChild(contentDiv);
  
    //Get height of the desktop
    var height = containerDiv.offsetHeight;

    //Calculate the highest allowed vertical position of windows, based on desktop and window height
    var maximumVertical = height - windowHeight;
    
  footer = document.createElement("footer");
  footer.classList.add("desktopFooter");
  
  imgFooter = document.createElement("div");
  imgFooter.classList.add("desktopFooterImg");
  
  var memoryPositionCounterLeft = containerDiv.offsetLeft + 100;
  var memoryPositionCounterTop = containerDiv.offsetTop;
  
  var rssPositionCounterLeft = containerDiv.offsetLeft + 200;
  var rssPositionCounterTop = containerDiv.offsetTop;
  
  var galleryPositionCounterLeft = containerDiv.offsetLeft;
  var galleryPositionCounterTop = containerDiv.offsetTop;
    
    
    /* IMAGEVIEWER SPECIFICATIONS */
  imageViewerIcon = document.createElement("img");
  imageViewerIcon.setAttribute("src", "img/appIcons/imgViewer.png");
  
  galleryLink = document.createElement("a");
  galleryLink.setAttribute("href", "#");
  galleryLink.setAttribute("class", "icon");
  galleryLink.appendChild(imageViewerIcon);

  galleryLink.onclick = function(){
    galleryPositionCounterLeft += 10;
    galleryPositionCounterTop += 10;
        
    // If window hits bottom, start render from top again
    if (galleryPositionCounterTop > 260) {
        galleryPositionCounterTop = containerDiv.offsetTop;
        galleryPositionCounterLeft = containerDiv.offsetLeft;
    }
    
    var gallery = new PWD.constructors.ImageViewer();
    gallery.createHTML(galleryPositionCounterLeft, galleryPositionCounterTop);
    gallery.renderGallery();
  };
      
      /* MEMORY SPECIFICATIONS*/
  var memoryIcon = document.createElement("img");
  memoryIcon.setAttribute("src", "img/appIcons/memory.png");
    
  var memoryLink = document.createElement("a");
  memoryLink.setAttribute("href", "#");
  memoryLink.setAttribute("class", "icon");
  memoryLink.appendChild(memoryIcon);
      
  memoryLink.onclick = function(){
    memoryPositionCounterLeft += 10;
    memoryPositionCounterTop += 10;
        
        if (memoryPositionCounterTop > maximumVertical) { 
            memoryPositionCounterTop = containerDiv.offsetTop;
            memoryPositionCounterLeft = containerDiv.offsetLeft + 100;
        }
    
    var memory = new PWD.constructors.Memory();
    memory.createHTML(memoryPositionCounterLeft, memoryPositionCounterTop);
    memory.renderMemory(4,4);
  };
  
  /* RSS SPECIFICATIONS*/
  var rssIcon = document.createElement("img");
  rssIcon.setAttribute("src", "img/appIcons/rss.png");
    
  var rssLink = document.createElement("a");
  rssLink.setAttribute("href", "#");
  rssLink.setAttribute("class", "icon");
  rssLink.appendChild(rssIcon);
      
  rssLink.onclick = function(){
    rssPositionCounterLeft += 10;
    rssPositionCounterTop += 10;
        
        if (rssPositionCounterTop > maximumVertical) { 
            rssPositionCounterTop = containerDiv.offsetTop;
            rssPositionCounterLeft = containerDiv.offsetLeft + 200;
        }
    
    var rss = new PWD.constructors.Rss();
    rss.createHTML(rssPositionCounterLeft, rssPositionCounterTop);
    rss.renderRss();
  };
    
  imgFooter.appendChild(galleryLink);
  imgFooter.appendChild(memoryLink);
  imgFooter.appendChild(rssLink);
  footer.appendChild(imgFooter);
  containerDiv.appendChild(footer);
    
};

window.onload = function() {
    PWD.desktop.init();
};