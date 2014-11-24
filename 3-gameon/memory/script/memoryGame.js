"use strict";

var Memory = {
    
    pictures: [],
          
    init: function(){
      // Starta applikationen
        
      var random = RandomGenerator.getPictureArray(4, 4);
      Memory.pictures.push(random);
      
      Memory.pictures.forEach(function(number){
                console.log(number);
      });
      
      var columns = 6;
      Memory.drawBoard(columns);

    },
    
    drawBoard: function(columns){
      // Rita upp memory spelet
      
      var that = this;
      
      var body = document.getElementById("memoryboard");
      
      var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");
      var id = 0;
        for(var j = 0; j <= 2; j++){
          
            var row = document.createElement("tr");
            
            for(var i = 0; i < columns; i++){
              
                id++;
                var cell = document.createElement("td");
                var imgCell = document.createElement("img");
                imgCell.setAttribute("src", "pics/0.png");
                imgCell.setAttribute("alt", i);
                
                var aCell = document.createElement("a");
                aCell.setAttribute("href", "#");
                aCell.setAttribute("id", id);
                aCell.appendChild(imgCell);

                aCell.onclick = function(){
                    Memory.turnImage(imgCell);
                };
                cell.appendChild(aCell);
                row.appendChild(cell);
            }
            
            tblBody.appendChild(row);
        }
 
                
              Memory.pictures.forEach(function(number){
                number.id = aCell[i];
                console.log(number.id);
              });

        tbl.appendChild(tblBody);
        body.appendChild(tbl);
    },
    
    createCard: function(i, j){
      
    },
    
    turnImage: function(id){
      // Vänd brickan
      
          var img = Memory.drawBoard.aCell;
          console.log(id);
          

    }
    
}

window.onload = Memory.init;