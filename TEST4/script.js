window.onload = function (){
  
  document.getElementById("knapp").addEventListener("click", function(){
      
      var xhr = new XMLHttpRequest();
      
    xhr.onreadystatechange = function (){
        
        //Indikerar att vi har fått ett svar
        if(xhr.readyState === 4){
            if(xhr.status == 200){
                var pers = JSON.parse(xhr.responseText);
                console.log(pers.first);
            }
            else{
                console.log("Läsfel, status:"+xhr.status);
            }
        }
        
    };
    
    //xhr.open('POST', 'setProduct.php', true);
    //xhr.setRequestHeader('Content-Type', 'application/json');
    
    var product = {
        "id": 125,
        "name": "Aktivitietsarmband"
    };
      xhr.open("GET", "server.php", true);
      xhr.send(JSON.stringify(product));
  });
  
    
};