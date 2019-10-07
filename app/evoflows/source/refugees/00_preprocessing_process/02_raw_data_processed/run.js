const preprocessing = require('./lib/preprocessing');
const jsonfiles = require('./lib/dealFiles');

//INPUT and QUERY 
let pathInput = 'input/';
let pathRawHierarchy = pathInput + "hierarchy.json";
let pathGeoJson = pathInput + "geojson.json";
let pathRawData = pathInput + "data.csv";

//OUTPUT
let pathOutput = "output/";
let pathRawOutpuJsonFile = pathOutput + "data.json";

function callPreprocessing(){
    
    let polarityTemporal = "y"; //years
    let stepTemporal = "1"; //every 1 year
    let ranges = jsonfiles.getJsonFromFile(pathRawHierarchy).ranges;
    let geoJson = jsonfiles.getJsonFromFile(pathGeoJson);
    let docUnion = jsonfiles.getCsvFromFile(pathRawData);

    //get Data Preprocessing
    let dataPreprocessing = preprocessing.getPreproData(ranges, docUnion, geoJson, stepTemporal, polarityTemporal);
    
    //Save to a json obj
    jsonfiles.saveObjToJsonFile(pathRawOutpuJsonFile,dataPreprocessing);
}

callPreprocessing();