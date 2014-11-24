function bartBoard(text, boardId){
    
    var doc = {
        board: document.getElementById(boardId)
    };
    

    var i = 0;
    var timerId;
    
    text += " ";
        
    doc.board.addEventListener("mousedown", function(){
        timerId = setInterval(function(){
            doc.board.innerHTML += text[i];
    
            i += 1;
            if(i >= text.length){
                i = 0;
            }
        }, 100);
            
    });
    
    doc.board.addEventListener("mouseup", function(){
        clearInterval(timerId);
    });
    

    
}

window.onload = function(){
    
    bartBoard("I will not pollute the global object window.", "board1");
    bartBoard("Douglas Crockford doesn't use JavaScript libraries.", "board2");
    
};
