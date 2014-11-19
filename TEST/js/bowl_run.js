
// Anonym funktion som anropas direkt.
//(function(){})();

var theGame = {
    
    run: function(){
        var pl1 = new Player("Penny", "left", 26);
        var pl2 = new Player("Leonard", "right", 29);
        var pl3 = new Player("Leonard", "left", 29);
        
        var players = [pl1, pl2, pl3];
        
        var game1 = new BowlingGame(players);
        game1.play();
        game1.showScoreBoard;
          
        
    }
    
};
// Inga paranteser !
window.onload = theGame.run;