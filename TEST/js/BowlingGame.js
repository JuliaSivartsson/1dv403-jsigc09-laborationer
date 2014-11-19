
function BowlingGame(players){
    //konstruktor
    this.players = players;

    this.pins = [];
    
    for(var i = 1; i <= 10; ++i){
        this.pins[i] = addPin(i);
    }
    
    // Använder som minne typ
    function addPin(n){
      return function(){
            console.log("I am pin "+ n);
      }
    }
    
    this.pins[1]();
    this.pins[2]();
    this.pins[10]();
    
}

BowlingGame.prototype.play = function() {
    var i;
    
    // Returnera poäng till spelare
    function hit(){
      var point = Math.floor( (Math.random() * 10))+1;
          
      return point;
    };
    
    for(i = 0; i <= 19; i+=1){
        this.players.forEach(function(player){
            player.addPoint(hit());
        });
        
    }
    
    document.write("<h3>Scoreboard:</h3>");
    this.players.forEach(function(player) {
        document.write(player.getName()+": "+player.getScore()+"<br/>");
    })
}