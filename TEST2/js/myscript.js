
var myApp = {
    
    init: function(param1, param2){
        
        var summa = 0;
        
        for(var i = 0; i < 10 ; ++i){
            
            summa += (param1+param2)*i;
            console.log("Loopar. Summa är nu: "+summa+" (i är "+i+")");
        }
        
        console.info("Loopat färdigt. Summa är nu: "+summa);
        var h1 = document.getElementById("bart");
        console.log("H1: "+h1.innerHTML);

    

    }

    
}

window.onload = function(){
  
  myApp.init(10, 20);
  
};