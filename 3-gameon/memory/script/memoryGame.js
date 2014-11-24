"use strict";

var Memory = {
    
    pictures: [],
          
    init: function(){
      console.log("hallå");
      
      var random = RandomGenerator.getPictureArray(4, 4);
      Memory.pictures.push(random);
      
      Memory.pictures.forEach(function(number){
                console.log(number);
      });
      
              var body = document.getElementsByTagName("body")[0];
      
      var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");

        for(var j = 0; j <= 2; j++){
            var row = document.createElement("tr");
            
            for(var i = 0; i < 4; i++){
                var cell = document.createElement("td");
                var imgCell = document.createElement("img");
                imgCell.setAttribute("src", "pics/0.png");
                imgCell.setAttribute("alt", "Questionmark");
                
                cell.appendChild(imgCell);
                row.appendChild(cell);
            }
            
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        body.appendChild(tbl);
    }
    
    
}

window.onload = Memory.init;