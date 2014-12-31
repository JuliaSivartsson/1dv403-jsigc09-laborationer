"use strict";

var PWD = PWD || {setZIndex : 10};

PWD.constructors = PWD.constructors || {};
    
PWD.constructors.Windowbase = function() {
    
};

PWD.constructors.Windowbase.prototype.createHTML = function(left, top){
  //this.dragY = 0;
  //this.dragX = 0;
  //this.dragging = false;
  var that = this;
  
  PWD.setters = PWD.setters || {};
  
  /* Window content thing */
  //var contentDiv = document.createElement("contentDiv");
  var windowDiv;
  var content;
  
  windowDiv = document.createElement("div");
  windowDiv.classList.add("windowDiv");
  windowDiv.style.left = left + "px";
  windowDiv.style.top = top + "px";
  
  content = document.createElement("div");
  content.classList.add("windowContent");
  
  /* Things concerning header*/
  var header;
  var headerIcon;
  var headerText;
  var closeIcon;
  var closeLink;
  
  header = document.createElement("header");
  header.setAttribute("class", "appHeader");
  
  headerIcon = document.createElement("img");
  headerIcon.classList.add("left");
  PWD.setters.setHeaderIcon = function(src) {
      headerIcon.setAttribute("src", src);
  };
  
  headerText = document.createElement("p");
  PWD.setters.setHeaderText = function(text){
      headerText.innerHTML = text;
  }
    
  closeIcon = document.createElement("img");
  closeIcon.setAttribute("src", "img/appIcons/remove.png");
  
  closeLink = document.createElement("a");
  closeLink.setAttribute("href", "#");
  closeLink.appendChild(closeIcon);
  closeLink.classList.add("right");
  closeLink.onclick = function(){
    var content = document.getElementById("container");
    content.removeChild(windowDiv);
  };
  header.appendChild(headerIcon);
  header.appendChild(headerText);
  header.appendChild(closeLink);
  
  /* Function for dragging window */
  var dragObj;
  var container;
  
  header.onmouseover = function(){
      header.style.cursor = "pointer";
  };
  
  header.onmousedown = function(event){
    dragObj = makeObj(event.target);
    //dragObj.element.style.zIndex="100";
    container = document.getElementById("container");
    
    /* Disable selection of element while dragging windows */
    windowDiv.classList.add("unselectable");
    disableSelection(container);
    header.style.cursor = "move";
    //header.addEventListener("mouseleave", drop,false);
    header.addEventListener("mouseup", drop, false);
    header.addEventListener("mousemove", freeMovement, false);
  };
  
  function freeMovement(event) {
    if (typeof(dragObj.element.mouseup) == "undefined")
    {
      header.addEventListener("mouseup", drop, false);
    }
    dragObj.element.style.left = Math.max(dragObj.minBoundX, Math.min(event.clientX - dragObj.posX, dragObj.maxBoundX)) + "px";
    dragObj.element.style.top = Math.max(dragObj.minBoundY, Math.min(event.clientY - dragObj.posY, dragObj.maxBoundY)) + "px";
}

function drop() {
    dragObj.element.style.zIndex="1";
    header.removeEventListener("mousemove", freeMovement, false);
    header.removeEventListener("mouseup", drop, false);
}

function makeObj(e) {
    var obj = e.parentNode.parentNode;
    obj.element = e.parentNode;
    
    //Lägsta bound
    obj.minBoundX = e.parentNode.parentNode.offsetLeft;
    obj.minBoundY = e.parentNode.parentNode.offsetTop;
    
    // Högsta bound
    obj.maxBoundX = obj.minBoundX + e.parentNode.parentNode.offsetWidth - e.offsetWidth;
    obj.maxBoundY = obj.minBoundY + e.parentNode.parentNode.offsetHeight - (e.parentNode.offsetHeight + 60);


    obj.posX = event.clientX - e.parentNode.offsetLeft;
    obj.posY = event.clientY - e.parentNode.offsetTop;

    var curleft = 0;
    var curtop = 0;
    if (e.parentNode.parentNode.offsetParent) {
        do {
            curleft += e.offsetLeft;
            curtop += e.offsetTop;
            //alert(e.id + ":" + e.innerHTML);
            if(~e.className.search(/bound/)) {
                obj.boundX = curleft - obj.element.offsetLeft;
                obj.boundY = curtop - obj.element.offsetTop;
                return obj;
            }

        } while (e = e.parentNode.offsetParent);
    }

    return obj;
}

  /* Things concerning footer*/
  var footer;
  var footerParagraph;
  
  footer = document.createElement("footer");
  footer.setAttribute("class", "appFooter");
  
  footerParagraph = document.createElement("p");
  PWD.setters.appendFooterParagraph = function(thingyToAppend) {
    footerParagraph.appendChild(thingyToAppend);    
  };
  
  PWD.setters.setFooterParagraph = function(text) {
    footerParagraph.innerHTML = text;
  };
  
  PWD.setters.hideFooter = function() {
    footer.className = "hidden";
  };
  
  footer.appendChild(footerParagraph);
  
  windowDiv.appendChild(header);
  windowDiv.appendChild(content);
  windowDiv.appendChild(footer);
  document.getElementById("container").appendChild(windowDiv);
    
  PWD.setters.setContent = function(thingToAppend) {
    content.appendChild(thingToAppend);
  };
  
  PWD.setters.setContentBackground = function(url){
    content.style.backgroundImage = "url(" +url+ ")";
  };
  
  /* Stack of order on elements */
  PWD.setters.setZIndex = function(zIndex) {
      windowDiv.style.zIndex = zIndex;    
  };
        
    /* Set focus on last clicked window*/
  windowDiv.onclick = function() {
    PWD.setZIndex += 1;
    windowDiv.style.zIndex = PWD.setZIndex;
  };
  
  PWD.setters.setWindowSize = function(setWidth, setHeight){
    windowDiv.style.width = setWidth + "px";
    content.style.width = setWidth + "px";
    windowDiv.style.height = setHeight + "px";
    content.style.height = setHeight + "px";
  };
    
  var disableSelection = function(element){
    element.onselectstart = function() {return false;};
    element.unselectable = "on";
    element.style.MozUserSelect = "none";
    element.style.cursor = "default";
  };
  
  var enableSelection    = function(element){
    element.onselectstart = function() {return true;};
    element.unselectable = "off";
    element.style.MozUserSelect = "text";
    element.style.cursor = "auto";
  };
};
