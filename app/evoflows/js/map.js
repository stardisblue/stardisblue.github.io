
//https://github.com/d3/d3-geo#projections
//https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Projections.md

var zoomMap = d3.behavior.zoom()
					.translate([0, 0])
					.scale(1)
					.scaleExtent([0.5, 30])
					.on("zoom", zoomed);

var scaleMapChoropleth = d3.scale.log()
								.clamp(true);

var scaleMapChoroplethBefore = d3.scale.log()
								.clamp(true);

// var scaleMapBubbles = d3.scale.sqrt()
// 						.range([8,25]);

// var scaleMapFlowLines = d3.scale.linear()
// 						.range(fmLineExtent);

// var scaleMapFlowLinesBefore = d3.scale.linear()
// 						.range(fmLineExtent);						

var scaleFeatureMapLabel = d3.scale.sqrt();					
					

var svgMap;

//G GROUPS ZOOMABLE
var gMapZoomable;
var gLandMap;
var gFeaturesMapLabels;
var gFeatures;
var gLineArrows;

//G GROUPS NON ZOOMABLES
var gLegendMap;
var gBarchartMap;


//
var tooltipMap;
var dataGeoJson = [];
var dataLand = [];
var currGroupedData = [];
var currSelectedItem;
var currOrientation;

var currMapScale = 1;
var currMapTranslate = [0,0];

//LEGEND
var legend_wrapper_height;
var legend_wrapper_width;
var margingLegendMap;
var legendItemsPoint;
var legendItemsChoropleth;


function createMapSvg(){

	svgMap = d3.select("body").select("#svg-map-vis")
						.attr("xmlns","http://www.w3.org/2000/svg")
						.attr("xlink","http://www.w3.org/1999/xlink")
						.attr("svg","http://www.w3.org/2000/svg")
						.attr("version","1")
					    .attr("width", mapVisWidth)
						.attr("height", mapVisHeight)
						.on("dblclick", initMap);

	svgMap.attr('viewBox', '0 0 ' +  ( mapVisWidth) + ' '  + ( mapVisHeight) )
						.attr('height', multistreamVisHeight)
						.attr('width', '100%')
						.attr('preserveAspectRatio', 'none');

	//Calling the zoom and drag
	svgMap.call(zoomMap);

	//Group for the zoomable elements
	gMapZoomable = svgMap.append("g").attr("id","groupMapZoomable");
	
	//Group for the land layer on the map
	gLandMap = gMapZoomable.append("g").attr("id","groupLand");
	
	//Group for the features (points, choropleth, etc) on map
	gFeatures = gMapZoomable.append("g").attr("id","groupFeatures");

	//Group for lines arrows on map
	gLineArrows = gMapZoomable.append("g").attr("id","groupArrows");

	//Group for the land Labels on the map
	gFeaturesMapLabels  = gMapZoomable.append("g").attr("id","groupFeaturesLabels");

	//Group for the legend on the map
	gLegendMap = svgMap.append("g").attr("id","groupLegendMap");

	//Group for the barchart top-k on the map
	gBarchartMap = svgMap.append("g").attr("id","groupBarchartMap");

	//TooltipMap
	tooltipMap = d3.select("body").append("div")
									.attr("id","tooltip-map")
									.attr("class","tooltip tooltip-map");



									
	// CHOROPLETH MAP
	scaleMapChoropleth.range([d3.rgb(outputRangeColorScaleMap[0]),d3.rgb(outputRangeColorScaleMap[1])]);
	scaleMapChoroplethBefore.range([d3.rgb(outputRangeColorScaleMap[0]),d3.rgb(outputRangeColorScaleMap[1])]);


	//Def for arrows
	let defs = gLineArrows.append("defs");

	defs.append("marker")
			.attr({
				"id":"arrow",
				"markerWidth":fmArrowWidth+5,
				"markerHeight":fmArrowHeight+5,
				"refX":0,
				"refY":fmArrowHeight/2, //to put in the middle of the parent line
				"orient":"auto",
				// "viewBox":"0 0 10 10",
				// "markerUnits":"userSpaceOnUse" //prevent to inherith stroke from parent as strokeWidth 
			})
			.append("path")
				.attr("d", "M0,0 L0,"+fmArrowHeight+" L"+fmArrowWidth+","+fmArrowHeight/2+" z") //triangle
				.attr("class","arrowHead");

	//<defs>
	//   <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
	//    <path d="M0,0 L0,6 L9,3 z" fill="#f00" />
	// </marker>
	//</defs>				
								
}


function loadMapVis(rawGeoJson){

	// dataGeoJson = rawGeoJson;
	
	updateMapTypeRepresentation(typeMapVisualization);

	updateShowArrowMap(showMapArrow);
	
	createMapSvg();
	
	landMap();

	createMapLegend();

	createTopKBarchart();
	
	
	$("#map-type-visualization :input").change(function() {
		//value can be : choropleth or points..
		typeMapVisualization = this.value;
		
		//remove the path and circles of Features
		clearFeaturesLayerMap();

		if(isFlowBloqued){
			coloring(currSelectedItem,currGroupedData,currOrientation);
		}
	});

	$("#btnArrow").click(function() {
		
		if (!this.classList.contains("active")) {
			showMapArrow = true;
		} else {
			showMapArrow = false;
		}
		this.classList.toggle("active");
		
		clearFeaturesLayerMap();
		
		if(isFlowBloqued){
			coloring(currSelectedItem,currGroupedData,currOrientation);
		}
	});
}


function updateMapTypeRepresentation(typeRepresentation){

	document.getElementById("choropleth").classList.remove("active");
	// document.getElementById("bubbles").classList.remove("active");
	document.getElementById("points").classList.remove("active");

	if(typeRepresentation==="choropleth"){
		document.getElementById("choropleth").classList.add("active");
	}
	// if(typeRepresentation==="bubbles"){
	// 	document.getElementById("bubbles").classList.add("active");
	// }
	if(typeRepresentation==="points"){
		document.getElementById("points").classList.add("active");
	}

}

function updateShowArrowMap(showArrow){
	document.getElementById("btnArrow").classList.remove("active");
	if(showArrow){
		document.getElementById("btnArrow").classList.add("active");
	}
}

function setMapBarchartVisibility(visibility){
	gBarchartMap.style({
		"opacity":visibility?1:0
	});
}

function updateTitleBarchart (orientation){
	//update title in barchart
	if(typeof selectedDate!="undefined"){
		let titleByOrientation = '';
		switch (orientation.toLowerCase()){
			case "in":
					titleByOrientation = "Origin";
				break;
			case "out":
				titleByOrientation = "Destination";
				break;
			default:
				titleByOrientation = "";
		}
	
		d3.select("#barchart-map-title").text("Top " + titleByOrientation + " Countries  in " +customTimeFormatTitle(selectedDate));
	}
}

function setMapLegendVisibility(visibility){
	gLegendMap.style({
		"opacity":visibility?1:0
	});
}

function clearFeaturesLayerMap(){
	//remove the path and circles of Features
    gFeatures.selectAll("path").remove();
	gFeatures.selectAll("circle").remove();
	gFeaturesMapLabels.selectAll(".land-label").remove();
	gFeatures.selectAll(".feature-map").remove();
	gFeatures.selectAll(".feature-map-selected").remove();
	gLineArrows.selectAll(".line-arrow-map").remove();
}



//Create the land layers on the map
function landMap(){

	// gLandMap.selectAll(".land")
	// 		.data(dataGeoJson.features,d=>d.properties.name)
	// 	.enter().append("path")
	// 		.attr("class","land")
	// 		.attr("d", pathMap);

	//create border of land path
	// gLandMap.selectAll(".land-borders")
	// 		.data(dataGeoJson.features,d=>d.properties.name)
	// 	.enter().append("path")
	// 		.attr("class","land-borders")
	// 		.attr("d", pathMap)
	// 		.on("click",mapLandMouseClick)
	// 		;

	// getting the nodes in the bottom level of the hierarchy
	// Match: hierarchy <=> geoJson
	dataLand = jerarquiaOutflow.getBottomLevelNodes().map(d=>{return getCountryFromGeoJson(d.name);});

	//Create LAND PATHS	
	let land_path = gLandMap.selectAll(".land")
				.data(dataLand,d=>d.properties.name);

	//exit
	land_path.exit().remove();

	//update
	// land_path.attr("transform", d=> { return "translate(" + d.refCenterPoint + ")"; })
	// 			.style({
	// 				"font-size":d=> {return 0.7/currMapScale + "rem";}
	// 			}); 

	//create
	land_path.enter().append("path")
			.attr("class","land")
			.attr("d", pathMap);


	landLabel();
}

function landLabel(){
	
	dataLand.forEach(function(dataGeoJsonElement){
		
		let heightValueInRem = 0.7/currMapScale;
		let font = (heightValueInRem).toString().concat("rem ").concat(text_font_family);

		//Font does not change
		let objectWidth = getTextWidthInPx(dataGeoJsonElement.properties.name,font);
		let objectHeight = getPxFromRem(heightValueInRem); 

		let refCenterPoint = [dataGeoJsonElement.centroid[0],dataGeoJsonElement.centroid[1]];

		let x1 = refCenterPoint[0] - objectWidth/2;
		let y1 = refCenterPoint[1] - objectHeight/2;
		let x2 = (x1+objectWidth);
		let y2 = (y1+objectHeight);
		let coordinates = {"x1":x1,"y1":y1,"x2":x2,"y2":y2};
		
		dataGeoJsonElement.keyOverlap = dataGeoJsonElement.properties.name.toLowerCase();
		dataGeoJsonElement.overlaping = false;
		dataGeoJsonElement.coordinates = coordinates;
		dataGeoJsonElement.refCenterPoint = refCenterPoint;
	});

	let aryWithOutOverlapping = removeOverlapping(dataLand);			

	//Create LAND LABELS	
	let land_label = gLandMap.selectAll(".land-label")
							.data(aryWithOutOverlapping,d=>d.properties.name.toLowerCase());

	//exit
	land_label.exit().remove();

	//update
	land_label.attr("transform", d=> { return "translate(" + d.refCenterPoint + ")"; })
				.style({
					"font-size":d=> {return 0.7/currMapScale + "rem";}
				}); 

	//create
	land_label.enter().append("text")
			.attr("class","land-label")
			// .attr("transform", d=> { return "translate(" + d.centroid + ")"; })
			.attr("transform", d=> { return "translate(" + d.refCenterPoint + ")"; })
			.attr("dy",".35em")
			.text(d=>{return d.properties.name;})
			.style({
				"font-size":(d)=>{return 0.7/currMapScale + "rem";}
			}); 
}


function updateFeaturesLandLabel(dataForFeaturesLabels,selectedItem,durationAnimation){

	if(dataForFeaturesLabels.length>1){

		let unionDataFeatures = dataForFeaturesLabels.filter(function(d){return d.properties.name!="";});

		unionDataFeatures.sort((a,b)=>{return a.value - b.value;});

		let inputMinValue = unionDataFeatures[0].value;
		let inputMaxValue = unionDataFeatures[unionDataFeatures.length-1].value;
		scaleFeatureMapLabel.domain([inputMinValue, inputMaxValue])
							.range(featuresOutputRangeLabelScale);
		
		if(selectedItem!=""){
			// origin.properties.name = origin.properties.name.toUpperCase();
			unionDataFeatures.push(selectedItem);
		}
		
		//updating the features: coordinates, according to labelWidth and labelHeight
		unionDataFeatures.forEach(function(dataGeoJsonElement){
			let value = dataGeoJsonElement.value;
			let heightValueInRem = scaleFeatureMapLabel(value)/currMapScale;
			let font = (heightValueInRem).toString().concat("rem ").concat(text_font_family);

			//Font does not change
			let objectWidth = getTextWidthInPx(dataGeoJsonElement.properties.name,font);
			let objectHeight = getPxFromRem(heightValueInRem); 
			let refCenterPoint = [dataGeoJsonElement.centroid[0],dataGeoJsonElement.centroid[1]];
			
			if(selectedItem!=""){                                            
				//origen, destination
				refCenterPoint = getNewEndArrowAccordingStartArrowInclination(selectedItem.centroid,refCenterPoint,objectHeight, pointRadius/currMapScale);
			}

			let x1 = refCenterPoint[0] - objectWidth/2;
			let y1 = refCenterPoint[1] - objectHeight/2;
			let x2 = (x1+objectWidth);
			let y2 = (y1+objectHeight);
			let coordinates = {"x1":x1,"y1":y1,"x2":x2,"y2":y2};
			
			dataGeoJsonElement.keyOverlap = dataGeoJsonElement.properties.name.toLowerCase();
			dataGeoJsonElement.overlaping = false;
			dataGeoJsonElement.coordinates = coordinates;
			dataGeoJsonElement.refCenterPoint = refCenterPoint;
		});
		
		let aryWithOutOverlapping = removeOverlapping(unionDataFeatures);

		//Create LAND LABELS	
		let features_land_label = gFeaturesMapLabels.selectAll(".land-label")
												.data(aryWithOutOverlapping,d=>d.keyOverlap);

		//exit
		features_land_label.exit().style({
							"opacity":"1"
						})
					.transition().duration(durationAnimation)
						.style({
							"opacity":"0"
						})
						.remove();

		//update
		features_land_label.attr("transform", d=> { return "translate(" + d.refCenterPoint + ")"; })
					.text(d=>d.properties.name)	
					.style({
						"font-size":d=> {return scaleFeatureMapLabel(d.value)/currMapScale + "rem";}
					});

		//create
		features_land_label.enter().append("text")
				.attr({
					"class":"land-label",
					"transform": d=> {return "translate(" + d.refCenterPoint + ")"; },
					"dy":".35em"
				})
				.text(d=>d.properties.name)	
				.style({
					"opacity":1e-6,
					"font-size":0
				})
			.transition().duration(durationAnimation)
				.style({
					"opacity":1,
					"font-size":d=>{return scaleFeatureMapLabel(d.value)/currMapScale + "rem";}
				}); 

		//RECT BORDERS
		// gLandMap.selectAll(".land-rect")
		// 		.data(aryWithOutOverlapping,name)
		// 	.enter().append("rect")
		// 		.attr("class","land-rect")
		// 		// .attr("width",function(d){return getTextWidth(d.properties.name,"12px Roboto");})
		// 		// .attr("height","12px")
		// 		.attr("transform", function(d) {
		// 			return "translate(" + d.coordinates.x1 + "," + d.coordinates.y1 + ")"; 
		// 		});

	}
}


function zoomed() {
	//Save the current map even scale
	currMapScale = d3.event.scale;
	currMapTranslate = d3.event.translate;

	gMapZoomable.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	gMapZoomable.selectAll("path").style("stroke-width", 1 / d3.event.scale + "px");
	// gMapZoomable.selectAll("line").style("stroke-width", 1 / d3.event.scale + "px");

	//update features-land-labels and lines
	if(currGroupedData.length>0 && isFlowBloqued){
		updateFeaturesLandLabel(currGroupedData,currSelectedItem,0);
		updateLinesIntoMap(currGroupedData,currSelectedItem,currOrientation,0);
		updatePointIntoMap(currGroupedData,0);
	}

	//update land labels
	if(!isFlowBloqued){
		landLabel();
	}
}

function updateScaleTranslate(toScale,toTranslate){
	
	currMapScale = toScale;

	zoomMap.translate(toTranslate)
			.scale(toScale);

	gMapZoomable.attr("transform", "translate(" + toTranslate + ")scale(" + toScale + ")");
	gMapZoomable.selectAll("path").style("stroke-width", 1 / toScale + "px");
	gMapZoomable.selectAll("line").style("stroke-width", 1 / toScale + "px");

	landLabel();
}



//selecteItem : origin or destination
//otherItems : destinations or origins
//orientation : in, out 
function coloring(selectedItem,otherItems,orientation,durationAnimation){
	
	setMapBarchartVisibility(true);
	updateTitleBarchart(orientation);
	setMapLegendVisibility(true);
	
	gLandMap.selectAll("text").remove();

	//grouped data by categories
	let dataByCategories = d3.nest()
						  .key(function(d) { return d.properties.name; })
						  .entries(otherItems);
	currSelectedItem = selectedItem;
	currOrientation = orientation;

	currGroupedData = dataByCategories.map(function(valuesOfCategory){
		//get the sum of the values by each category
		let sumValues = valuesOfCategory.values.reduce(function(acc, curr){
			return acc+curr.value;
		},0);
		//since all the items are equals except the value, we take the item with index 0
		let indexElement = 0;
		let element = valuesOfCategory.values[indexElement];
		
		return {
			"type":element.type,
			"id":element.id,
			"geometry":element.geometry,
			"properties":element.properties,	
			"centroid":element.centroid,
			"value": sumValues,
			"color":element.color
		};
	});

	//sorting ascending groupedData
	currGroupedData.sort((a, b)=>{return a.value - b.value;});

	//aqui hay que fuiconar ancien y curr
	currGroupedData.forEach(function(d){
		let indexInAncien = ancienData.map(a=>a.properties.name).indexOf(d.properties.name);
		if(indexInAncien != -1){
			d.valueBefore = ancienData[indexInAncien].value;
		}else{
			d.valueBefore = d.value;
		}
	});
	
	//get extend
	let extentData = d3.extent(currGroupedData,d=>d.value);
	if(extentData[0]==0){
		extentData[0] = 1;
	}

	//get extend data before
	let extentDataBefore = d3.extent(currGroupedData,d=>d.valueBefore);
	if (extentDataBefore[0]==0){
		extentDataBefore[0] = 1;
	}

	let features;
	
	switch(typeMapVisualization.toLowerCase()){
	
		case "choropleth":
			scaleMapChoropleth.domain(extentData)
						.range([d3.rgb(outputRangeColorScaleMap[0]),d3.rgb(outputRangeColorScaleMap[1])]);
			
			features = gFeatures.selectAll(".feature-map")
								.data(currGroupedData,d=>d.properties.name);
								

			//exit
			features.exit().remove();

			//update
			features.attr("d", pathMap)
						.style({
							"fill":d=>scaleMapChoropleth(d.value),
							"stroke-width": 1/currMapScale+"px"
						});
			
			//enter
			features.enter()
					.append("path")
						.attr("d", pathMap)
						.attr("class","feature-map")
						.on("mousemove",featureMouseMove)
						.on("mouseout",featureMouseOut)
						.style({
							"fill":d=>scaleMapChoropleth(d.value),
							"stroke-width": 1/currMapScale+"px"
						});


			updateLegendMapChoropleth(extentData);
			updateLinesIntoMap(currGroupedData,selectedItem,orientation);
			break;
			
		// case "bubbles":

		// 	scaleMapBubbles.domain([extentData[0],extentData[1]]);//sino max 5e7

		// 	features = gFeatures.selectAll(".feature-map")
		// 							.data(currGroupedData,d=>d.properties.name);
			
		// 	//exit
		// 	// features.exit().remove();	

		// 	//update
		// 	features.attr("r", d=>scaleMapBubbles(d.value))
		// 			.style({
		// 				"stroke-width": (1/currMapScale)+"px"
		// 			});

		// 	//enter
		// 	features.enter()
		// 		.append("circle")
		// 			.attr("class","feature-map")
		// 			.attr("r", 0)
		// 			.on("mousemove",featureMouseMove)
		// 			.on("mouseout",featureMouseOut)
		// 			.attr("transform", (d)=>{return "translate(" + d.centroid + ")"; })
		// 			.attr("r", d=>scaleMapBubbles(d.value))
		// 			.style({
		// 				"fill":"#0069c0", //#2196f3 #6baed6
		// 				"fill-opacity":"0.7",
		// 				"stroke":"#2196f3",
		// 				"stroke-width": (1/currMapScale)+"px"
		// 			});

		// 	updateLegendMapPoint(extentData);
		// 	updateLinesIntoMap(currGroupedData,selectedItem,orientation);
		// 	break;

		case "points":

			//CHOROPLETH SCALE
			scaleMapChoropleth.domain(extentData);
			scaleMapChoroplethBefore.domain(extentDataBefore);
			
			// FLOW MAP LINES
			// scaleMapFlowLines.domain([extentData[0],extentData[1]]);
			// scaleMapFlowLinesBefore.domain([extentDataBefore[0],extentDataBefore[1]]);

			updatePointIntoMap(currGroupedData,durationAnimation);

			updateLinesIntoMap(currGroupedData,selectedItem,orientation,durationAnimation);

			break;					
	}
	
	updateFeaturesLandLabel(currGroupedData,selectedItem,durationAnimation);
	updateBarchart(currGroupedData,topKBarchart,durationAnimation);

	ancienData = currGroupedData.filter(d=>isNaN(d.properties.name));
}

// function updateLegendMapPoint(extent){

// 	let xRefPosition = margingLegendMap.left;
// 	let yRefPosition = margingLegendMap.top + 20;

// 	legendItemsChoropleth.style({"opacity":0});
// 	legendItemsPoint.style({"opacity":1});

// 	legendItemsPoint.selectAll("circle").remove();
// 	legendItemsPoint.selectAll("text").remove();

// 	let legend_items = legendItemsPoint.selectAll("circle").data(extent);
	
// 	//append circles
// 	legend_items.enter().append("circle")
// 					.attr("cy", d=> -scaleMapBubbles(d))
// 					.attr("transform","translate(" + xRefPosition + "," + yRefPosition + ")")
// 					.attr("r", d=>scaleMapBubbles(d))
// 					.style({
// 						"fill":"none",
// 						"stroke":"#2196f3"
// 					});

// 	//append text
// 	legend_items.enter().append("text")
// 					.attr("class","legendText")
// 					.attr("y",d=>-2*scaleMapBubbles(d))
// 					.attr("transform","translate(" + xRefPosition + "," + yRefPosition + ")")
// 					.attr("dy","-0.1em")
// 					.text(customNumberFormat);

// }

function updateLegendMapChoropleth(extent){

	legendItemsPoint.style({"opacity":0});
	legendItemsChoropleth.style({"opacity":1});

	d3.select("#min-val-legend-map").text(customNumberFormat(extent[0]));
	d3.select("#max-val-legend-map").text(customNumberFormat(extent[1]));
}


function updateBarchart(groupedData, topK,durationAnimation){

	//take the last topK elements
	let sinceSlice = Math.max(groupedData.length-topK,0);
	let untilSlice = groupedData.length;
	let groupedDataSliced = groupedData.slice(sinceSlice,untilSlice);
	updateTopKBarsInChart(groupedDataSliced,durationAnimation);

}

function updatePointIntoMap(groupedData,durationAnimation){

	//********** */
	//CREATE BACKGROUND POINTS
	//********** */
	let backgroundPoints = gFeatures.selectAll(".feature-map-background")
								.data(groupedData,d=>d.properties.name);

	//exit
	backgroundPoints.exit()
				.style({
					"opacity":1
				})
			.transition().duration(durationAnimation)
				.style({
					"opacity":0
				})
				.remove();

	//update
	backgroundPoints.attr({
		"r":pointRadiusBackground/currMapScale+"px"
	}).style({
		"stroke-width": (1/currMapScale)+"px"
	});

	//enter
	backgroundPoints.enter().append("circle")
					.attr({
						"class":"feature-map-background",
						"transform":d=>{return "translate("+d.centroid+")";},
						"r":pointRadiusBackground/currMapScale+"px"
					})
					.style({
						"fill":"white",
						"opacity":1e-6,
						"stroke":"black",
						"stroke-width": (1/currMapScale)+"px"
					})
				.transition().duration(durationAnimation)
					.style({
						"fill":"white",
						"opacity":1,
						"stroke":"black",
						"stroke-width": (1/currMapScale)+"px"
					});

	//************* */
	//CREATE POINTS
	//************* */

	features = gFeatures.selectAll(".feature-map")
							.data(groupedData,d=>d.properties.name);

	//exit
	features.exit()
			.style({
				"opacity":1
			})
		.transition().duration(durationAnimation)
			.style({
				"opacity":0
			}).remove();

	//update
	features.attr({
				"r":pointRadius/currMapScale+"px"
			}).style({
				"fill":d=>scaleMapChoroplethBefore(d.valueBefore), 
				"stroke-width": (1/currMapScale)+"px",
				"opacity": 1,
			})
		.transition().duration(durationAnimation)
			.style({
				"fill":d=>scaleMapChoropleth(d.value),
				"stroke-width": (1/currMapScale)+"px",
				"opacity": 1,
			});

	//enter
	features.enter().append("circle")
			.attr("class","feature-map")
			.on("mousemove",featureMouseMove)
			.on("mouseout",featureMouseOut)
			.attr("transform", (d)=>{return "translate(" + d.centroid + ")"; })
			.attr("r", pointRadius/currMapScale+"px")
			.style({
				"fill":d=>scaleMapChoropleth(d.value),
				// "fill": d=>d.color,
				"opacity": 1e-6,
				"stroke":"#bdbdbd", 
				"stroke-width": (1/currMapScale)+"px"
			})
		.transition().duration(durationAnimation)
			.style({
				"fill":d=>scaleMapChoropleth(d.value),
				// "fill": d=>d.color,
				"opacity": 1,
				"stroke":"#bdbdbd",
				"stroke-width": (1/currMapScale)+"px"
			});

}

//orientation: in, out
function updateLinesIntoMap(groupedData,selectedItem,orientation,durationAnimation){

	//tengo que hacer un 2-tupl
	let odmatrix = [];		
	groupedData.forEach((otherItem)=>{

		let startArrow;
		let endArrow;
		
		if(orientation ==="in") {
			startArrow = getNewPointAlongPointA(
				{x:otherItem.centroid[0],y:otherItem.centroid[1]},
				{x:selectedItem.centroid[0],y:selectedItem.centroid[1]},
				pointRadiusBackground/currMapScale
				
			);
			endArrow = getNewPointAlongPointA(
				{x:selectedItem.centroid[0],y:selectedItem.centroid[1]},
				{x:otherItem.centroid[0],y:otherItem.centroid[1]},
				pointRadiusBackground/currMapScale + fmArrowWidth/currMapScale
			);
		}else if(orientation ==="out"){
			startArrow = getNewPointAlongPointA(
				{x:selectedItem.centroid[0],y:selectedItem.centroid[1]},
				{x:otherItem.centroid[0],y:otherItem.centroid[1]},
				pointRadiusBackground/currMapScale
			);
			endArrow = getNewPointAlongPointA(
				{x:otherItem.centroid[0],y:otherItem.centroid[1]},
				{x:selectedItem.centroid[0],y:selectedItem.centroid[1]},
				pointRadiusBackground/currMapScale + fmArrowWidth/currMapScale
			);

		}else{
			console.log("THERE IS NOT ORIENTATION");
		}
		odmatrix.push({
			"key":selectedItem.id + "-" + otherItem.id + "-" + orientation,
			"name":otherItem.properties.name,
			"origin": startArrow, 
			"destination": endArrow,
			"value":otherItem.value,
			"valueBefore":otherItem.valueBefore
		});
	});

	let lineWithArrows = gLineArrows.selectAll(".line-arrow-map")
							.data(odmatrix,(d)=>{return d.key;});

	//Exit
	lineWithArrows.exit()
			.style({
				"opacity":0.6
			})
		.transition().duration(durationAnimation)
			.style({
				"opacity":1e-6
			}).remove();


	//Update
	lineWithArrows.attr({
						"d":pathMap,
						"x1":(d)=>{return d.origin[0];},
						"y1":(d)=>{return d.origin[1];},
						"x2":(d)=>{return d.destination[0];},
						"y2":(d)=>{return d.destination[1];},
						"marker-end":"url(#arrow)"
					})
					.style({
						"opacity":0.6 ,
						"stroke-width": 1/currMapScale+"px",
						// "stroke-width": (d)=>{return scaleMapFlowLinesBefore(d.valueBefore)/currMapScale+"px";}
					})
				.transition().duration(durationAnimation)
					.style({
						"opacity":0.6 ,
						"stroke-width": 1/currMapScale+"px",
						// "stroke-width": (d)=>{return scaleMapFlowLines(d.value)/currMapScale+"px";}
					});
	//Enter
	lineWithArrows.enter().append("line")
			.attr({
				"class":"line-arrow-map",
				"x1":(d)=>{return d.origin[0];},
				"y1":(d)=>{return d.origin[1];},
				"x2":(d)=>{return d.origin[0];},
				"y2":(d)=>{return d.origin[1];},
			})
			.style({
				"fill":"none",
				"stroke":"black",
				"stroke-width": 0,
				"opacity":1e-6
			})
		.transition().duration(durationAnimation)
			.attr({
				"class":"line-arrow-map",
				"x1":(d)=>{return d.origin[0];},
				"y1":(d)=>{return d.origin[1];},
				"x2":(d)=>{return d.destination[0];},
				"y2":(d)=>{return d.destination[1];},
				"marker-end":"url(#arrow)"
			})
			.style({
				"fill":"none",
				"stroke":"black",
				"stroke-width": 1/currMapScale+"px",
				// "stroke-width": (d)=>{return scaleMapFlowLines(d.value)/currMapScale+"px";},
				"opacity":0.6 
			});	

}


//SUPER FUNCION
function drawDataIntoMap (data, fromDate, toDate){
	
	let dataFilteredByTimePeriod = [];
	if(fromDate.getTime() == toDate.getTime()){
		dataFilteredByTimePeriod = data.filter(d=>d.date>=fromDate && d.date<=toDate);
	}else{
		dataFilteredByTimePeriod = data.filter(d=>d.date>=fromDate && d.date<toDate);
	}

	let joinData =[];
	dataFilteredByTimePeriod.forEach(function(item){
		joinData = joinData.concat(item.components);
	});

	let sumValue = getAgregatedValue(joinData);
	let formatDate= d3.time.format("%Y");

	//updateMainTitleVis(formatDate(fromDate) + "-" + formatDate(toDate),customNumberFormat(sumValue),dataType);

	coloring("",joinData);
}

function createMapLegend(){

	legend_wrapper_width = mapVisWidth*0.15;
	legend_wrapper_height = mapVisHeight*0.18;
	margingLegendMap = {top:30,right:50,bottom:20,left:20};

	let rectChoroplethHeight = legend_wrapper_height - margingLegendMap.top - margingLegendMap.bottom;
	let recChoroplethWidth = legend_wrapper_width - margingLegendMap.left - margingLegendMap.right;
		
	gLegendMap.attr("class","legend")
			.attr("transform","translate("+ (mapVisWidth-legend_wrapper_width) +","+ (mapVisHeight - legend_wrapper_height) + ")");
	
	gLegendMap.append("rect")
			.attr("class",'background')
			.attr("rx",8)
			.attr("ry",8)
			.attr("width",legend_wrapper_width)
			.attr("height",legend_wrapper_height);

	
	//legend choropleth
	legendItemsChoropleth = gLegendMap.append("g")
						.attr("id","")
						.attr("class","")
						.attr("transform","translate("+(margingLegendMap.left)+","+(margingLegendMap.top)+")");

			
	let defsGradient = legendItemsChoropleth.append("defs");
	let gradientChoropleth = defsGradient.append("linearGradient")
								.attr("id", "legendRectMapGradiente");
	
	gradientChoropleth.attr("x1", "0%")
						.attr("y1", "0%")
						.attr("x2", "0%")
						.attr("y2", "100%")
						.attr("spreadMethod", "pad"); // pad, repeat, reflect

	gradientChoropleth.append("stop")
						.attr("offset", "0%")
						.attr("stop-color",d3.rgb(outputRangeColorScaleMap[0]))
						.style("fill-opacity", "1");

	gradientChoropleth.append("stop")
						.attr("offset", "100%")
						.attr("stop-color",d3.rgb(outputRangeColorScaleMap[1]))
						.attr("stop-opacity", 1);

	legendItemsChoropleth.append("rect")
			.attr("x",0)
			.attr("y",0)
			.attr("width",recChoroplethWidth)
			.attr("height",rectChoroplethHeight)
			.style({
				"fill":"url(#legendRectMapGradiente)",
				"stroke":"#fafa"
			});

	//min-val-legend
	legendItemsChoropleth.append("text")
				.attr("id","min-val-legend-map")
				.attr("class","text")
				.attr("x",recChoroplethWidth+5)
				.attr("y",0)
				.style({
					"alignment-baseline":"central" //only for text
				});

	//max-val-legend
	legendItemsChoropleth.append("text")
				.attr("id","max-val-legend-map")
				.attr("class","text")
				.attr("x",recChoroplethWidth+5)
				.attr("y",rectChoroplethHeight)
				.style({
					"alignment-baseline":"central" //only for text
				});


	//LEGEND POINT
	legendItemsPoint = gLegendMap.append("g")
								.attr("transform","translate("+(margingLegendMap.left)+","+(margingLegendMap.top)+")");



	setMapLegendVisibility(false);

}

//SVG MOUSE BEHAIVOR
function initMap(){
	return;
	clearFeaturesLayerMap();
	// let variable = getVariableOption();
	// let selectedPopulations = getCheckedPopulationType();

	jerarquiaOutflow.my_leaf_level = kaka(timeWindow, 0, arraySubIndicators, "", jerarquiaOutflow);
	jerarquiaOutflow.setBottomNodes(jerarquiaOutflow.getLeafNodes());
	jerarquiaOutflow.setTopNodes(jerarquiaOutflow.getNodesByDepth(1));
		
	nivel_focus_outflow = jerarquiaOutflow.hijos();
	key_focus_list_outflow = jerarquiaOutflow.key_bottom_list;

	nivel_context_outflow = jerarquiaOutflow.papa();
	key_context_list_outflow = jerarquiaOutflow.key_top_list;

	//-------------------------------

	jerarquiaInflow.my_leaf_level = kaka(timeWindow, 1, arraySubIndicators, "", jerarquiaInflow);
	jerarquiaInflow.setBottomNodes(jerarquiaInflow.getLeafNodes());
	jerarquiaInflow.setTopNodes(jerarquiaInflow.getNodesByDepth(1));

	nivel_focus_inflow = jerarquiaInflow.hijos();
	key_focus_list_inflow = jerarquiaInflow.key_bottom_list;

	nivel_context_inflow = jerarquiaInflow.papa();
	key_context_list_inflow = jerarquiaInflow.key_top_list;

	updateFlows();

	
}

//LAND LAYER MOUSE BEHAIVOR

// function mapLandMouseOver(d){
// 	d3.select(this).classed("mouse-over",true)
// }

// function mapLandMouseOut(d){
// 	d3.select(this).classed("mouse-over",false)
// }

function mapLandMouseClick(d){

	return;
	
	clearFeaturesLayerMap();
	// let variable = getVariableOption();
	// let selectedPopulations = getCheckedPopulationType();
	let name = d.properties.name.toLowerCase();

	console.log("name",name);

	if(name!=""){

		jerarquiaOutflow.my_leaf_level = kaka(timeWindow, 0, arraySubIndicators, name, jerarquiaOutflow);
		jerarquiaOutflow.setBottomNodes(jerarquiaOutflow.getLeafNodes());
		jerarquiaOutflow.setTopNodes(jerarquiaOutflow.getNodesByDepth(1));
			
		nivel_focus_outflow = jerarquiaOutflow.hijos();
		key_focus_list_outflow = jerarquiaOutflow.key_bottom_list;
	
		nivel_context_outflow = jerarquiaOutflow.papa();
		key_context_list_outflow = jerarquiaOutflow.key_top_list;

		//-------------------------------

		jerarquiaInflow.my_leaf_level = kaka(timeWindow, 1, arraySubIndicators, name, jerarquiaInflow);
		jerarquiaInflow.setBottomNodes(jerarquiaInflow.getLeafNodes());
		jerarquiaInflow.setTopNodes(jerarquiaInflow.getNodesByDepth(1));

		nivel_focus_inflow = jerarquiaInflow.hijos();
		key_focus_list_inflow = jerarquiaInflow.key_bottom_list;
	
		nivel_context_inflow = jerarquiaInflow.papa();
		key_context_list_inflow = jerarquiaInflow.key_top_list;

		updateFlows();

	}
	
	
}







//===============================================
//FEATURE MOUSE BEHAIVOR
function featureMouseMove(d){

	if(typeof selectedDate!="undefined" && typeOrientation!='undefined'){
	
		orientation = typeOrientation.toLowerCase() == dataType_inflow?dataType_outflow:dataType_inflow;
		
		let title_line = "<h6>" + customTimeFormatTitle(selectedDate)  + "</h6>";
		let categories_lines = "<div class='category-entry-wrapper'>"+
					"<div class='category-wrapper subtitle2'>" + getCapitalize(d.properties.name) + ":&nbsp;"+"</div>"+
					"<div class='value-wrapper'>"+
						" <span class='quantitative-value subtitle2'>" + customNumberFormat(d.value) + "</span> "+
						"<span class='overline'>" + dataType +" " + orientation +  "</span>"+
					"</div>"+
				"</div>";

		let htmlText = title_line + categories_lines;
		
		tooltipMap.html(htmlText).style({
			"left":(d3.event.pageX+ 10)  + "px",
			"top":(d3.event.pageY+ 10) + "px",
			"opacity":1,
			"display":"inline"
		});
	}
}

function featureMouseOver(d){
	// d3.select(this).style({"stroke":'white'});
	//d3.select(this).classed("feature-over",true)
}

function featureMouseOut(d){
	//d3.select(this).classed("feature-over",false)
	tooltipMap.style({
		"opacity":0
	});
}

