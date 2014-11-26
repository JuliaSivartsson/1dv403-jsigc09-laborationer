"use strict";
var columns = 4;
var rows = 4;
var pairCount = 0;
var tryCount = 0;
      
var Memory = {
    
    pictures: [],
    random: [],
          
    init: function(){
      // Starta applikationen
      
      var output = "";
      var random = [];
      
      Memory.random = RandomGenerator.getPictureArray(rows, columns);
    
      Memory.drawBoard();

    },
    
    drawBoard: function(){
      // Rita upp memory spelet

      var tilesFlipped = 0;
      var ul = document.createElement("ul");
      var tbl;
      var tblBody;
      var tr;
      var td;
      document.getElementById("memoryboard").appendChild(ul);

      tbl = document.createElement("table");
      tblBody = document.createElement("tbody");
      
        for(var row = 0; row < rows; row++){
          
            tr = document.createElement("tr");
            ul.appendChild(tr);
            
            for(var col = 0; col < columns; col++){
              
                td = document.createElement("td");
                tr.appendChild(td);
                
                var imgCell = document.createElement("img");
                imgCell.setAttribute("src", "pics/0.png");
                
                var aCell = document.createElement("a");
                aCell.setAttribute("href", "#");
                aCell.appendChild(imgCell);
                td.appendChild(aCell);
                
                Memory.turnImage(tilesFlipped, aCell);
                tilesFlipped++;
            }
        }
        

    },
    
    turnImage: function(count, aTagg){
      // Vänd brickan och skicka vidare till checkImages
      
      aTagg.addEventListener("click", function(){
      
          // Om bilden redan är vänd kan man inte trycka på den
          if(this.getElementsByTagName("img")[0].getAttribute("src") !== "pics/0.png"){
            return false;
          }
      
      Memory.pictures.push(aTagg);
        
        if(Memory.pictures.length <= 2){
              
          this.getElementsByTagName("img")[0].setAttribute("src", "pics/" + Memory.random[count] + ".png");
        }
        
        if(Memory.pictures.length === 2){
          setTimeout(function() {
            Memory.checkImages(Memory.pictures);
          }, 800);
        }
            
      });
    },
    
    checkImages: function(array){
      // Om bilderna är likadana så stannar de uppvända
      
      var element1 = array[0].getElementsByTagName("img")[0].getAttribute("src");
      var element2 = array[1].getElementsByTagName("img")[0].getAttribute("src");
      tryCount++;
        
      if(element1 === element2){
        pairCount++;
                
        if(pairCount === Memory.random.length/2){
          Memory.popup("Awesome, you won! It took you "+tryCount+" attempts.");
        }
        
        Memory.pictures = [];
      }
      else{
        array[0].getElementsByTagName("img")[0].setAttribute("src", "pics/0.png");
        array[1].getElementsByTagName("img")[0].setAttribute("src", "pics/0.png");
        
        Memory.pictures = [];
        
      }

    },
    
    popup: function(text){
      // Popu meddelande
      
        var parentDiv = document.getElementById("memoryboard");
        var div = document.createElement("div");
        div.className = "popupWindow";
        parentDiv.appendChild(div);
        
        div.innerHTML = text;
        
        var button = document.createElement("input");
        button.type = "button";
        button.value = "Start over";
        button.onclick = function(){
            Memory.drawBoard();
        }
    
      div.appendChild(button);
    }
    
}

window.onload = Memory.init;