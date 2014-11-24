function Homer(){
    
    var node = document.getElementById("belly");
    var that = this;
    //this = h1 respektive h2
    
    node.onclick = function(){
     
     // this = node (e.target)
     // that = this utanför (h1, h2)
     
     setTimeout(function() {
         //this = window
         //that = this utanför (h1, h2)
         
     }, 10);
    };
}

var h1 = new Homer();
var h2 = new Homer();