var Popup = {

    popup: function(text) {

    var div = document.createElement("div");
    div.className = "popupWindow";
    document.body.appendChild(div);
    
    div.innerHTML = text;
    return div;
    }
}