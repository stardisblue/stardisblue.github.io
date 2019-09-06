const fs = require('fs');
const d3 = require('d3'); //npm install d3@3.5.17

function getJsonFromFile(pathJsonFile){
    let raw = loadFile(pathJsonFile);
    return JSON.parse(raw);
}

function loadFile(pathFile){
    return fs.readFileSync(pathFile, {encoding: 'utf8'});
}

function saveObjToJsonFile(pathJsonFile, obj){
    // let json = JSON.stringify(obj,null,2);//2 pretty
    let json = JSON.stringify(obj);//2 pretty
    fs.writeFile(pathJsonFile, json, 'utf8', function(err){
        if(err) throw err;
        console.log("saved to",pathJsonFile);
    });
}

function getCsvFromFile(pathCsvFile){
    let raw = loadFile(pathCsvFile);
    return d3.csv.parse(raw);
}

function copyFile(fromFile, toFile){
    fs.createReadStream(fromFile).pipe(fs.createWriteStream(toFile)); 
    console.log("saved from",fromFile,"to",toFile);
}

module.exports.getJsonFromFile = getJsonFromFile;
module.exports.getCsvFromFile = getCsvFromFile;
module.exports.saveObjToJsonFile = saveObjToJsonFile;
module.exports.copyFile = copyFile;