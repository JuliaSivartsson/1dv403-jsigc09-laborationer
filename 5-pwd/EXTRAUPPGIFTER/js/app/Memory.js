"use strict";

var PWD = PWD || {};

PWD.constructors = PWD.constructors || {};
    
PWD.constructors.Memory = function() {
    
};
PWD.constructors.Memory.prototype = new PWD.constructors.Windowbase();

PWD.constructors.Memory.prototype.renderMemory = function(rows, columns){
  
  this.getRows = function() {
    return rows;
  };
  
  this.getColumns = function() {
    return columns;
  };
  
  //'n setters
  this.setRows = function(_rows) {
    rows = _rows; 
  };
  
  this.setColumns = function(_columns) {
    columns = _columns;
  };
  
  var that = this;
  drawBoard();
  
  function drawBoard(){
      var tilesFlipped = 0;
      var ul = document.createElement("ul");
      var tbl;
      var tblBody;
      var tr;
      var td;
      var imgArray = [];
      var randomNumbers = PWD.objects.RandomGenerator.getPictureArray(that.getRows(), that.getColumns());
      var memoryBoard = document.createElement("div");
      var gameOverDiv = document.createElement("div");
    
      PWD.setters.setHeaderText("Memory");
      PWD.setters.setHeaderIcon("img/appIcons/smallMemory.png");
      PWD.setters.setFooterParagraph("Time to play some Memory!");

      var columns = 4;
      var rows = 4;
      var pairCount = 0;
      var tryCount = 0;
      
      tbl = document.createElement("table");
      tblBody = document.createElement("tbody");

      for(var row = 0; row < that.getRows(); row++){
        tr = document.createElement("tr");
        ul.appendChild(tr);
      
        for(var col = 0; col < that.getColumns(); col++){
        
          td = document.createElement("td");
          tr.appendChild(td);
          
          var imgCell = document.createElement("img");
          imgCell.setAttribute("src", "img/memoryPics/0.png");
          
          var aCell = document.createElement("a");
          aCell.setAttribute("href", "#");
          aCell.appendChild(imgCell);
          td.appendChild(aCell);
          
          turnImage(tilesFlipped, aCell);
          
          tr.appendChild(aCell);
          
          tilesFlipped++;
        }
        tbl.appendChild(tr);
      }
      memoryBoard.appendChild(tbl);
      memoryBoard.appendChild(gameOverDiv);
      
      PWD.setters.setContent(memoryBoard);
      
      function turnImage(count, aTagg){
      // Vänd brickan och skicka vidare till checkImages
      console.log("turn");
      aTagg.onclick = function(e){
      
          // Om bilden redan är vänd kan man inte trycka på den
          if(this.getElementsByTagName("img")[0].getAttribute("src") !== "img/memoryPics/0.png"){
            return false;
          }
      
      imgArray.push(aTagg);
        
        if(imgArray.length <= 2){
              
          this.getElementsByTagName("img")[0].setAttribute("src", "img/memoryPics/" + randomNumbers[count] + ".png");
        }
        
        if(imgArray.length === 2){
          setTimeout(function() {
            checkImages(imgArray);
          }, 800);
        }
      };
    } // turnImages
    
    
    function checkImages(array){
      // Om bilderna är likadana så stannar de uppvända
      console.log("check");
      var element1 = array[0].getElementsByTagName("img")[0].getAttribute("src");
      var element2 = array[1].getElementsByTagName("img")[0].getAttribute("src");
      tryCount++;
        
      if(element1 === element2){
        pairCount++;
                
        if(pairCount === randomNumbers.length/2){
         gameOverDiv.innerHTML = "Awesome, you won! It took you "+tryCount+" attempts.";
        }
        
        imgArray = [];
      }
      else{
        array[0].getElementsByTagName("img")[0].setAttribute("src", "img/memoryPics/0.png");
        array[1].getElementsByTagName("img")[0].setAttribute("src", "img/memoryPics/0.png");
        
        imgArray = [];
      }

    } //checkImages
  } // drawBoard

};