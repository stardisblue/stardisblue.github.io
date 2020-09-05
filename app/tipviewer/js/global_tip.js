
var color = d3.scale.category10()
var data
var current_data
var dataGeoJson
var stackedData
var stream_x_scale_extent
var stream_total_time_window = []

var transition_time = 500

var customTimeFormat = d3.time.format.multi([
	["%Y %B", function(d) { return d.getMonth(); }],
	["%Y %B", function() { return true; }]
  ]);	


var currMapScale
let projectionMap = d3.geo.equirectangular() ////mercator();
                        // .scale(200)
                            // .center([0, 0])
                            // .translate([200, 200])
                        ;
                        // let projectionMap = d3.geo.equirectangular() ////mercator();
						// .scale(200)
						// .center([0, 0])
						// .translate([mapVisWidth / 2, mapVisHeight / 2]);

var pathMap = d3.geo.path().projection(projectionMap);






// Preprocessinf of the GeoJson file
function preProcessingGeoJSON(geoJson){
	geoJson.features.forEach(function(d){
		d.properties.name = d.properties.name.toLowerCase();
		d.centroid = pathMap.centroid(d);
		d.value = 0;
	});
}

function preProcessingRawData(rawData){
	rawData.forEach(d=>d.date = new Date(d.date));
}

function ready(error, rawGeoJson, rawData){
	if (error){
		alert(error);
		throw error;
	}

	// Preprocessing data
	preProcessingGeoJSON(rawGeoJson)
	preProcessingRawData(rawData)

	data = rawData
	dataGeoJson = rawGeoJson

	stream_x_scale_extent = d3.extent(data, function(d) { return d.date; })
	
	data.forEach(function(d){
		let fecha = String(d.date)
		let index = stream_total_time_window.indexOf(fecha)
		if (index == -1){
			stream_total_time_window.push(fecha)
		}
	})
	stream_total_time_window = stream_total_time_window.map(d=>new Date(d)).map(Number)
	

	load_stream();
	load_mapa();
}


function update_time_period(){
	let date_title = "Periodo: " + customTimeFormat(brush.extent()[0]) + " - " + customTimeFormat(brush.extent()[1])
	document.getElementById("time-period").innerHTML = date_title;
}


function remove_all_vis(){

	stream_x_scale_extent = []
	data = []
	dataGeoJson = []
	stream_total_time_window = []
	

	d3.select("#svg_stream").selectAll("g").remove();
	d3.select("#svg_stream").selectAll("text").remove();
	d3.select("#svg_mapa").selectAll("g").remove();
	d3.select("#svg_tempo").selectAll("g").remove();	
	removeElement("tooltip");
}

function removeElement(idElement){
	try {
		let element = document.getElementById(idElement);
		element.parentNode.removeChild(element);
	}
	catch(err){
		console.log("Error in removeElement");
	}
}

function load_d3(path){

	let myGeoJSONPath = path+"geojson.json";
    let myRawDataPath = path+"data.json";

    setTimeout(function(){ 
		d3.queue(2)
				.defer(d3.json,myGeoJSONPath)
				.defer(d3.json,myRawDataPath)
				.await(ready);

	},100);
}