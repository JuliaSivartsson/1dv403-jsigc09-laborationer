"use strict";
var columns = 4;
var rows = 4;

var Memory = {
    
    pictures: [],
    random: [],
          
    init: function(){
      // Starta applikationen 
      var output = "";
      var random = [];
      
      Memory.random = RandomGenerator.getPictureArray(rows, columns);
      console.log(Memory.random);
    
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
      var ul = document.getElementById("memoryboard").appendChild(ul);
      
      tbl = document.createElement("table");
      tblBody = document.createElement("tbody");
      var id = 0;
      
        for(var row = 0; row <= 2; row++){
          
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
      // Vänd brickan
      
      aTagg.addEventListener("click", function(){
      
          if(this.getElementsByTagName("img")[0].getAttribute("src") !== "pics/0.png"){
            return false;
          }
            
      Memory.pictures.push(aTagg);
      
        if(Memory.pictures.length <= 2){
          this.getElementsByTagName("img")[0].setAttribute("src", "pics/" + Memory.random[count] + ".png");
        }
            
      });
    }
    
}

window.onload = Memory.init;