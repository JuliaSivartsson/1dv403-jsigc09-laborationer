function Player(name, handedness, age){
    var score = 0;
    
    // Gör såhär för att få med eventuell felhantering
    this.getName = function(){return name;};
    this.setName = function(_name){name = _name;};
    
    this.getHandedness = function(){return handedness;};
    this.setHandedness = function(_handedness){handedness = _handedness || "right";};
    
    this.getAge = function(){return age;};
    this.setAge = function(_age){age = _age || 15;};
    
    
    this.getScore = function(){return score;};
    
    this.addPoint = function(point){
        if((!isNaN(point)) && (point > 0)){
            score += point;
        }
    };
    
    this.setName(name);
    this.setHandedness(handedness);
    this.setAge(age);
    
    }