"use strict";

var makePerson = function(persArr){

    // New array
    var result = {};

   
    //Property minAge
    persArr.sort(function(a, b){
        return a.age-b.age;
    });
    result.minAge = persArr[0].age;
    
    //Property maxAge
    var tempMaxAge = (persArr.length - 1);
    result.maxAge = persArr[tempMaxAge].age;
    
    //Property averageAge
    var arrayForNames = [];
    var sum = 0;
    var i;
    for(i = 0; i < persArr.length; i++ ){
        sum += persArr[i].age;
        arrayForNames[i] = persArr[i].name;
    };
        
    arrayForNames.sort(function (a,b){
        return a.localeCompare(b, 'sv');
    });
    result.names = arrayForNames.join(", ");
    result.averageAge = Math.round(sum/persArr.length);
    
    return result;
};