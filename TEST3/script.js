window.onload = function (){
    var form = document.getElementById("theForm");
    
    var fn = form.elements["fname"];
    fn.focus();
    
    fn.onfocus = function(){
        this.select();
    };
    
    //var extraOption = new Option(text, value, defaultSelected, seleted);
    
    form.onsubmit = function(e){
        return false;      
    };
};