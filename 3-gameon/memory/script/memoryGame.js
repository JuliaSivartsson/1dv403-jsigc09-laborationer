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
      


    }
    
}

window.onload = Memory.init;