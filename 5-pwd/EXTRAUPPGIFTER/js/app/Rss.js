"use strict";

var PWD = PWD || {};

PWD.constructors = PWD.constructors || {};
    
PWD.constructors.Rss = function() {
    
};

PWD.constructors.Rss.prototype = new PWD.constructors.Windowbase();

PWD.constructors.Rss.prototype.renderRss = function(){

    PWD.setters.setHeaderText("Rss");
    PWD.setters.setHeaderIcon("img/appIcons/smallRss.png");
    
    getRss();
    
    function getRss(){
        
        var xhrRss;
        var rssText = document.createElement("p");
        var loadingGif;
        var footerText = document.createElement("p");
        var currentTime = new Date();
        var timer;
        
        loadingGif = document.createElement("img");
        loadingGif.setAttribute("src", "img/load.gif");
        footerText.appendChild(loadingGif);
        
        xhrRss = new XMLHttpRequest();
        xhrRss.onreadystatechange = function (){
            
            //Indcate an answer
            if(xhrRss.readyState === 4){
                if(xhrRss.status == 200){
                    rssText.innerHTML = xhrRss.responseText;
                    timer = currentTime.toLocaleTimeString();
                    footerText.innerHTML = "Last updated "+timer;
                }
                else{
                    console.log("Error, status:"+xhrRss.status);
                }
            }
            
        };
        xhrRss.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url="+escape("http://www.aftonbladet.se/nyheter/rss.xml"), true);
        xhrRss.send(null);
        
        PWD.setters.setContent(rssText);
        PWD.setters.appendFooterParagraph(footerText);
    }
};