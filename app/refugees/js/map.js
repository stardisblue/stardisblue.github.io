var map_opts = {
	mapTypeRepresentation : "choropleth"
};

//https://github.com/d3/d3-geo#projections
//https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Projections.md

var projection = d3.geo.equirectangular() ////mercator();
					.scale(200)
					.center([0, 0]);
			
var pathMap = d3.geo.path()
				.projection(projection);

var zoomMap = d3.behavior.zoom()
			    .translate([0, 0])
			    .scale(1)
			    .scaleExtent([1, 100])
			    .on("zoom", zoomed);

var svgMap;

// group for land map
var gLandMap;
// group of land map labels
var gLandMapLabels;

// group for layers on the map 
var gFeatures;
var features;

//
var tooltipMap = d3.select("body").append("div")
								.attr("id","tooltip-map")
								.style("opacity",0);

var dataGeoJson = [];
var dataForFeaturesLabels = [];

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
	gLandMap = svgMap.append("g").attr("id","groupLand");

	//Group for the features (points, choropleth, etc) on map
	gFeatures = svgMap.append("g").attr("id","groupFeatures");

	gLandMapLabels  = svgMap.append("g").attr("id","groupLandLabels");
}


function loadMapVis(rawGeoJson){

	dataGeoJson = rawGeoJson;
	dataForFeaturesLabels = dataGeoJson.features;
	
	createMapSvg();
	
	createLandsMap();

	landLabel();

	createMapLegend();
	
	$("#map-type-visualization :input").change(function() {
		//value can be : choropleth or point
		map_opts.mapTypeRepresentation = this.value;
		
		//remove the path and circles of Features
		clearFeaturesLayerMap();
		
		drawDataIntoMap(nivel_bajo,brushContext.extent()[0],brushContext.extent()[1])
	})
}

function clearFeaturesLayerMap(){
	//remove the path and circles of Features
    gFeatures.selectAll("path").remove();
    gFeatures.selectAll("circle").remove();
}


function name(d){
	return d.properties.name;
}

//Create the land layers on the map
function createLandsMap(){
	//rawGeoJson.features from the GeoJson file
	gLandMap.selectAll(".land")
			.data(dataGeoJson.features,name)
		.enter().append("path")
			.attr("class","land")
			.attr("d", pathMap);
}


function landLabel(){

	let font_size = land_label_font_size / currentMapScale;
	let font = font_size+"px "+text_font_family;
	
	//updateing the features: coordinates, according to labelWidth and labelHeight
	dataForFeaturesLabels.forEach(function(dataGeoJsonElement){
		let centroid = pathMap.centroid(dataGeoJsonElement);
		
		//Font does not change
		let textWidth = getTextWidth(dataGeoJsonElement.properties.name,font);
		let textHeight = font_size; 
		
		let x1 = centroid[0] - textWidth/2;
		let y1 = centroid[1] - textHeight/2;
		let x2 = (x1+textWidth);
		let y2 = (y1+textHeight);
		let coord = {"x1":x1,"y1":y1,"x2":x2,"y2":y2};
		
		dataGeoJsonElement.centroid = centroid;
		dataGeoJsonElement.key = dataGeoJsonElement.properties.name.toLowerCase();
		dataGeoJsonElement.overlaping = false;
		dataGeoJsonElement.coordinates = coord;
	});
	
	let aryWithOutOverlapping = removeOverlapping(dataForFeaturesLabels);
	
	//Create LAND LABELS	
	let land_label = gLandMapLabels.selectAll(".land-label")
							.data(aryWithOutOverlapping,name);

	//exit
	land_label.exit().remove();

	//update
	land_label.style("font-size", font_size + "px"); 

	//create
	land_label.enter().append("text")
			.attr("class","land-label")
			.attr("transform", function(d) { return "translate(" + d.centroid + ")"; })
			.attr("dy",".35em")
			.text(function(d){return d.properties.name;})
			.style("font-size", font_size + "px"); 
	

	//RECT BORDERS
	// gLandMap.selectAll(".land-rect")
	// 		.data(aryWithOutOverlapping,name)
	// 	.enter().append("rect")
	// 		.attr("class","land-rect")
	// 		.attr("width",function(d){return getTextWidth(d.properties.name,"12px Roboto");})
	// 		.attr("height","12px")
	// 		.attr("transform", function(d) {
	// 			return "translate(" + d.coordinates.x1 + "," + d.coordinates.y1 + ")"; 
	// 		});
}


function zoomed() {
	//gLandMap zoom
	gLandMap.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	gLandMap.selectAll(".land").style("stroke-width", 1 / d3.event.scale + "px");


	gLandMapLabels.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	
	//gFeatures zoom
	gFeatures.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	gFeatures.selectAll(".feature-map").style("stroke-width", 1 / d3.event.scale + "px");
	
	//Save the current map even scale
	currentMapScale = d3.event.scale;

	//update land labels
	landLabel();
	// gLandMap.selectAll(".land-label").style("font-size", font_size + "px"); 
}


function coloring(data){

	//grouped data by categories
	let dataByCategories = d3.nest()
						  .key(function(d) { return d.properties.name; })
						  .entries(data);
	
	let groupedData = dataByCategories.map(function(valuesOfCategory){
		//get the sum of the values by each category
		let sumValues = valuesOfCategory.values.reduce(function(acc, curr){
			return acc+curr.value;
		},0);
		//since all the items are equals except the value, we take the item with index 0
		let indexElement = 0;
		return {
			"type":valuesOfCategory.values[indexElement].type,
			"id":valuesOfCategory.values[indexElement].id,
			"geometry":valuesOfCategory.values[indexElement].geometry,
			"properties":valuesOfCategory.values[indexElement].properties,
			"value": sumValues
		};
	});
	
	
	//get extend
	let extent = d3.extent(groupedData,d=>d.value);
	if(extent[0]==0){
		extent[0] = 1;
	}
	
	//sort groupedData ascending
	groupedData.sort(function(a, b) { return a.value - b.value; });



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
								// .range([d3.rgb("#f7fbff"),d3.rgb("#08306b")])
								.range([d3.rgb("#f0f9e8"),d3.rgb("#0868ac")])
								.clamp(true);

//

			
			features = gFeatures.selectAll("path")
								.data(groupedData,name);
			
			//exit
			features.exit().remove();
			
			//update
			features.attr("d", pathMap)
						.style({
							"fill":function(d){return colorScaleMap(d.value);},
							"stroke-width": 1/currentMapScale+"px"
						});
			
			//enter
			features.enter()
					.append("path")
						.attr("d", pathMap)
						.attr("class","feature-map")
						.on("mousemove",featureMouseMove)
						.on("mouseout",featureMouseOut)
						.on("click",featureMouseClick)
						.style({
							"fill":function(d){return colorScaleMap(d.value);},
							"stroke-width": 1/currentMapScale+"px"
						});



			break;
			
			
			
		case "point":
			
			//value represented on the cirlce area
			let areaCircle = d3.scale.sqrt()
			//5e7
								.domain([extent[0],5e7])
								.range([1,40]);
								// .domain(extent)
								// .range([1,20]);
								// .clamp(true);

			features = gFeatures.selectAll("circle").data(groupedData,name);

			//exit
			features.exit()
					.remove();
			
			//update
			features.attr("r", d=>areaCircle(d.value))
					.style({
						"stroke-width": (1/currentMapScale)+"px"
					});

			//enter
			features.enter()
				.append("circle")
					.attr("class","feature-map")
					.attr("r", 0)
					.on("mousemove",featureMouseMove)
					.on("mouseout",featureMouseOut)
					.on("click",featureMouseClick)
					.attr("transform", function(d) { return "translate(" + pathMap.centroid(d) + ")"; })
				//.transition()
					.attr("r", d=>areaCircle(d.value))
					.style({
						"fill":"#6baed6",
						"fill-opacity":"0.5",
						"stroke":"#2171b5",
						"stroke-width": (1/currentMapScale)+"px"
					});
			break;		
	}

	// FEATURE LABEL
	dataForFeaturesLabels = groupedData;
	landLabel();
}


//SUPER FUNCION
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
	let valQuantitative = "<h2 id='main-title-quantitative'>" + customNumberFormat(sumValue) + "</h2>";
	let from = "<h2 id='main-title-from'>" + "..." + "</h2>";
	let to;
	if(nameFilter===""){
		to = "<h2 id='main-title-to'>" + "World" + "</h2>";
	}else{
		to = "<h2 id='main-title-to'>" + nameFilter + "</h2>";
	}
	updateMainTitleVis(timePeriod,valQuantitative,from,to);
	
	coloring(joinData);
}

function createMapLegend(){

	var radius = d3.scale.sqrt()
					.domain([1e7, 5e7])
					.range([20, 40]);

	let legend_background_width = 120;
	let legend_background_height = 110;
	
	let gLegend = svgMap.append("g")
					.attr("class","legend")
					.attr("transform","translate("+ (mapVisWidth-legend_background_width) +","+ (mapVisHeight - legend_background_height) + ")");
	

	gLegend.append("rect")
			.attr("x","0px")
			.attr("y","0px")
			.attr("width",legend_background_width)
			.attr("height",legend_background_height);

		//1 times 10 to the power 6 10 000 000
		//1 times 10 to the power 7 30 000 000
		//5 times 10 to the power 7 50 000 000
	let legend_items = gLegend.selectAll("circle").data([1e7, 3e7, 5e7]);
		
	legend_items.enter().append("circle")
					.attr("cy", function(d) {return -radius(d); })
					.attr("transform","translate(" + legend_background_width/2 + "," + legend_background_height + ")")
					.attr("r", function(d){return radius(d);});

	legend_items.enter().append("text")
					.attr("y",d=>-2*radius(d))
					.attr("transform","translate(" + legend_background_width/2 + "," + legend_background_height + ")")
					.attr("dy","1.3em")
					.text(customNumberFormat);

	// 					legend.append("text")
    // .attr("y", function(d) { return -2 * radius(d); })
    // .attr("dy", "1.3em")
    // .text(d3.format(".1s"));
						
	
	// items_legend.enter().append("circle")
	// 			.attr("cy",function(d){return -radius(d);})
	// 			.attr("r", radius);



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

	// d3.select(this).style({"stroke":'black'});

	let titleToolTip = "<p class='title'>" + d.properties.name + "</p>";
	let descriptionToolTip = "<p class='info'>" + customNumberFormat(d.value) + "</p>";
	let textHtml = titleToolTip + descriptionToolTip;
	
	tooltipMap.html(textHtml).style({
		"left":(d3.event.pageX+ 10)  + "px",
		"top":(d3.event.pageY+ 10) + "px",
		"opacity":1
	})
}

function featureMouseOver(d){
	// d3.select(this).style({"stroke":'white'});
	//d3.select(this).classed("feature-over",true)
}

function featureMouseOut(d){
	//d3.select(this).classed("feature-over",false)
	tooltipMap.style({
		"opacity":0
	})
}

function featureMouseClick(d){
	
	clearFeaturesLayerMap();
	
	let idVariable = document.getElementById("variables").value;

	let name = d.properties.name;
	if(nameFilter===""){
		nameFilter = name;
		kaka(timeWindow, idVariable, name);
	}else{
		nameFilter = "";
		kaka(timeWindow, idVariable);
	}
	updateFlows();
	
}


function setMapVisTitle(idVariable){
	switch(parseInt(idVariable)){
		case 0:
			document.getElementById("map-vis-title").innerHTML = "Destination Location"
			break;
		case 1:
			document.getElementById("map-vis-title").innerHTML = "Origin Location"
			break;
	}
}


//================================================
function updateTitleMapVis(text){
	//document.getElementById("map-vis-title").innerHTML = text;
}

//function updateTitlePeriod(text){
//	document.getElementById("map-vis-period").innerHTML = text;
//}

