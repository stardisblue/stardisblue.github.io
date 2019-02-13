var map_opts = {
	mapTypeRepresentation : "choropleth"
};

//https://github.com/d3/d3-geo#projections
//https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Projections.md

//mercator();
var projection = d3.geo.equirectangular()
					.scale(100)
					.center([0, 0]);
			

var pathMap = d3.geo.path()
				.projection(projection);

var zoomMap = d3.behavior.zoom()
			    .translate([0, 0])
			    .scale(1)
			    .scaleExtent([1, 8])
			    .on("zoom", zoomed);

var svgMap;

// group for land map
var gLandMap;

// group for layers on the map 
var gFeatures;
var features;

//
var tooltipMap = d3.select("body").append("div")
								.attr("id","tooltip-map")
								.style("opacity",0);


var currentMapScale = 1; // d3.event.scale value

function createMapSvg(){
	
	//
	projection.translate([mapVisWidth / 2, mapVisHeight / 2]);
	
	//
	svgMap = d3.select("#svg-map-vis")
					    .attr("width", mapVisWidth)
					    .attr("height", mapVisHeight);

	svgMap.attr('viewBox', '0 0 ' +  ( mapVisWidth) + ' ' 
										+ ( mapVisHeight) )
							.attr('height', mapVisHeight)
							.attr('width', '100%')
							.attr('preserveAspectRatio', 'none')
	
	//Calling the zoom
	svgMap.call(zoomMap);
	
	//Group for the land layer on the map
	gLandMap = svgMap.append("g");
	
	//Group for the features (points, choropleth, etc) on map
	gFeatures = svgMap.append("g").attr("id","groupeFeatures");
}


function loadMapVis(){
	
	createMapSvg();
	
	createLandsMap();
	
	$("#map-type-visualization :input").change(function() {
		//value can be : choropleth or point
		map_opts.mapTypeRepresentation = this.value;
		
		//remove the path and circles of Features
	    gFeatures.selectAll("path").remove();
	    gFeatures.selectAll("circle").remove();
		
		drawDataIntoMap(nivel_bajo,brushContext.extent()[0],brushContext.extent()[1])
	})
}


function name(d){
	return d.properties.name;
}

//Create the land layers on the map
function createLandsMap(){
	//rawGeoJson.features from the GeoJson file
	let landsMap = gLandMap.selectAll("path")
						.data(rawGeoJson.features,name);

	landsMap.enter().append("path")
			.attr("d", pathMap)
			.attr("class","land-map")
			.on("mousemove",mapLandMouseMove)
			.on("mouseout",mapLandMouseOut)
}

function zoomed() {
	//gLandMap zoom
	gLandMap.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	gLandMap.selectAll(".land-map").style("stroke-width", 1 / d3.event.scale + "px");
	
	//gFeatures zoom
	gFeatures.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	gFeatures.selectAll(".feature-map").style("stroke-width", 1 / d3.event.scale + "px");
	
	//Save the current map even scale
	currentMapScale = d3.event.scale;
}


function coloring(data){

	//grouped data by categories
	var dataByCategories = d3.nest()
						  .key(function(d) { return d.properties.name; })
						  .entries(data);
	
	var groupedData = [];
	dataByCategories.forEach(function(valuesOfCategory){
		//get the sum of the values by each category
		let sumValues = valuesOfCategory.values.reduce(function(acc, curr){
			return acc+curr.value;
		},0);
		//since all the items are equals except the value, we take the item with index 0
		let indexElement = 0;
		groupedData.push({
			"type":valuesOfCategory.values[indexElement].type,
			"id":valuesOfCategory.values[indexElement].id,
			"geometry":valuesOfCategory.values[indexElement].geometry,
			"properties":valuesOfCategory.values[indexElement].properties,
			"value": sumValues
		})
	})
	//sort groupedData descending
	groupedData.sort(function(a, b) { return b.value - a.value; });
	
	let extent = d3.extent(groupedData,d=>d.value);
	
	switch(map_opts.mapTypeRepresentation.toLowerCase()){
	
		case "choropleth":
//			let colorScaleMap = d3.scale.quantile()
//									.domain(extent)
//									.range([ d3.rgb("#c6dbef"), d3.rgb("#9ecae1"), d3.rgb("#6baed6"), d3.rgb("#4292c6"), d3.rgb("#2171b5"), d3.rgb("#08519c"), d3.rgb("#08306b")]);
//			let colorScaleMap = d3.scale.linear()
//							.domain(extent)
//							.range(['#f7fbff', '#08306b'])
//							.interpolate(d3.interpolateRgb); //interpolateHsl interpolateHcl interpolateRgb
							
			let colorScaleMap = d3.scale.log()
								.domain(extent)
								.range([d3.rgb("#f7fbff"),d3.rgb("#08306b")])
								.clamp(true);

			
			features = gFeatures.selectAll("path")
								.data(groupedData,name);
			
			//exit
			features.exit().remove();
			
			//update
			features.attr("d", pathMap)
						.attr("class","feature-map")
						.style({
							"fill":function(d){return colorScaleMap(d.value)},
							"stroke-width": 1/currentMapScale+"px"
						})
			
			//enter
			features.enter()
					.append("path")
						.attr("d", pathMap)
						.attr("class","feature-map")
						.on("mousemove",featureMouseMove)
						.on("mouseout",featureMouseOut)
						.transition()
						.style({
							"fill":function(d){return colorScaleMap(d.value)},
							"stroke-width": 1/currentMapScale+"px"
						})
					
			
			break;
			
			
			
		case "point":
			
			//value represented on the cirlce area
			let areaCircle = d3.scale.sqrt()
								.domain([1,50000000])
								.range([1,25])
								.clamp(true)
//			
			features = gFeatures.selectAll("circle")
							.data(groupedData,name);

			//exit
			features.exit()
						.transition()
					    	.attr("r", 0)
					    	.remove();
			
			//update
			features.attr("class","feature-map")
					.attr("r", function(d){
						let nuevoRadio = areaCircle(d.value);
						return nuevoRadio;
					})
					.style({
						"stroke-width": 1/currentMapScale+"px"
					})
					
			//enter
			features.enter().append("circle")
					.attr("class","feature-map")
					.attr("r", 0)
//					.on("mouseover",featureMouseOver)
					.on("mousemove",featureMouseMove)
					.on("mouseout",featureMouseOut)
					.transition()	
						.attr("cx", function(d){
							//mejorar
							//el attributo centoidLatLng debe ser un array y no un objeto
							let tmpCentroid = [d.geometry.centroidLatLng.lng,d.geometry.centroidLatLng.lat];
							return projection(tmpCentroid)[0];
						})
						.attr("cy", function(d){
							let tmpCentroid = [d.geometry.centroidLatLng.lng,d.geometry.centroidLatLng.lat];
							return projection(tmpCentroid)[1];
						})
						.attr("r", function(d){
							let nuevoRadio = areaCircle(d.value);
							return nuevoRadio;
						})
						.style({
							"fill":"#6baed6",
							"stroke-width": 1/currentMapScale+"px",
		//					"stroke":"#2171b5",
		//					"stroke-weight":1,
							"opacity":0.5
						})	
						
				

			
			break;		
	}
}


function drawDataIntoMap (data, fromDate, toDate){
	
	var joinData = [];
	data.filter(d=>d.date>=fromDate && d.date<toDate).forEach(function(item){
									joinData = joinData.concat(item.components);
											});
	
	let sumValue = joinData.reduce(function(acc,curr){
					return acc+curr.value;
	},0);
	let formatDate= d3.time.format("%Y");
	let timePeriod= "<h2 id='main-title-date'>" + formatDate(fromDate) + "-" + formatDate(toDate) + "</h2>";
	let valQuantitative = "<h2 id='main-title-quantitative'>" + toolTipNumberFormat(sumValue) + "</h2>";
	let from = "<h2 id='main-title-from'>" + "..." + "</h2>";
	let to = "<h2 id='main-title-to'>" + "World" + "</h2>";
	updateMainTitleVis(timePeriod,valQuantitative,from,to);
	
	coloring(joinData);
}


//LAND LAYER MOUSE BEHAIVOR

function mapLandMouseMove(d){
	let titleToolTip = "<p class='title'>" + d.properties.name + "</p>";
	let descriptionToolTip = "";;
	let textHtml = titleToolTip + descriptionToolTip;
	
	tooltipMap.html(textHtml).style({
		"left":(d3.event.pageX+ 10)  + "px",
		"top":(d3.event.pageY+ 10) + "px",
		"opacity":1
	})
}

function mapLandMouseOver(d){
	//d3.select(this).classed("mouse-over",true)
}

function mapLandMouseOut(d){
	//d3.select(this).classed("mouse-over",false)
	tooltipMap.style({
		"opacity":0
	})
}

function mapLandMouseClick(d){
	let name = d.properties.name;
	console.log("mouse click!",name);
	
}


//===============================================
//FEATURE MOUSE BEHAIVOR
function featureMouseMove(d){
	let titleToolTip = "<p class='title'>" + d.properties.name + "</p>";
	let descriptionToolTip = "<p class='info'>" + toolTipNumberFormat(d.value) + "</p>";;
	let textHtml = titleToolTip + descriptionToolTip;
	
	tooltipMap.html(textHtml).style({
		"left":(d3.event.pageX+ 10)  + "px",
		"top":(d3.event.pageY+ 10) + "px",
		"opacity":1
	})
}

function featureMouseOver(d){
	//d3.select(this).classed("feature-over",true)
}

function featureMouseOut(d){
	//d3.select(this).classed("feature-over",false)
	tooltipMap.style({
		"opacity":0
	})
}

function featureMouseClick(d){
	
	let name = d.properties.name;
	kaka(timeWindow, 0,name);
	updateFlows();
	let titleText = "<strong><span style='text-transform: capitalize;'>" + name + "</span></strong>"
	//updateTitleMapVis("Destination: " + titleText);
}


//================================================
function updateTitleMapVis(text){
	//document.getElementById("map-vis-title").innerHTML = text;
}

//function updateTitlePeriod(text){
//	document.getElementById("map-vis-period").innerHTML = text;
//}

