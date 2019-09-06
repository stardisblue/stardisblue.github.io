const preprocessing = require('./lib/preprocessing');
const jsonfiles = require('./lib/dealFiles');
const jerarquia = require('./lib/jerarquia');


//INPUT and QUERY 
let pathInput = 'input/';
let pathRawHierarchy = pathInput + "hierarchy.json";
let pathGeoJson = pathInput + "geojson.json";
let pathRawConfiguration = pathInput + "config.json";
let myRawDataPath = pathInput + "data.csv";

//OUTPUT
let pathOutputFolder = "output/";
let pathRawOutpuJsonFile = pathOutputFolder + "data.json";
// let pathRawHierarchyOutpuJsonFile = pathOutput + "hierarchy.json"; //copie file
// let pathRawConfigurationOutpuJsonFile = pathOutput + "config.json"; //copie file

function callPreprocessing(){
    
    let polarityTemporal = "y";
    let stepTemporal = "1";
    let ranges = jsonfiles.getJsonFromFile(pathRawHierarchy).ranges;
    let geoJson = jsonfiles.getJsonFromFile(pathGeoJson);
    let docUnion = jsonfiles.getCsvFromFile(myRawDataPath);

    //get Data Preprocessing
    let dataPreprocessing = preprocessing.getPreproData(ranges, docUnion, geoJson, stepTemporal, polarityTemporal );
    

    jsonfiles.saveObjToJsonFile(pathRawOutpuJsonFile,dataPreprocessing);
    // jsonfiles.copyFile(pathRawConfiguration,pathRawConfigurationOutpuJsonFile);
    // jsonfiles.copyFile(pathRawHierarchy,pathRawHierarchyOutpuJsonFile);
}

callPreprocessing();