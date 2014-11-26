function Popup(text){

    var div = document.createElement("div");
    div.className = "popupWindow";
    document.body.appendChild(div);
    
    div.innerHTML = text;
    
    var button = document.createElement("input");
    button.type = "button";
    button.value = "CLOSE";
    button.onclick = function(){
        document.body.removeChild(div);
    }
    
    div.appendChild(button);
    
}

window.onload = function(){
    var link = document.getElementById("popuplink1");
    
    link.onclick = function(){
        new Popup("Pratar lite med Wilson");
        return false;
    };
    
    link = document.getElementById("popuplink2");
    
    link.onclick = function(){
        new Popup("Slog mig på tummen.");
        return false;
    };
    
    new Popup("testar");
}