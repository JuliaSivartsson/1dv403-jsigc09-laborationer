"use strict";

window.addEventListener("load", function(){
    
   NodeList.prototype.forEach = Array.prototype.forEach;
   
   var ps = document.querySelectorAll(".prodinfo");
   ps.forEach(function(p){
    p.classList.add("hidden");    
       
   });
   
   var h2s = document.querySelectorAll("#productlist h2");

    h2s.forEach(function(h2){
       
       var a = document.createElement("a");
       a.setAttribute("href", "#");
       a.innerHTML = h2.innerHTML;
       h2.innerHTML = "";
       h2.appendChild(a);
       
        a.addEventListener("click", function(){
          var p = h2.parentNode.querySelector(".prodinfo");
          
          p.classList.toggle("hidden");
        });
      
   }); 
    
    
    
});