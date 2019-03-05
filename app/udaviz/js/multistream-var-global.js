//var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//var screenHeight = window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight;

//userd in multistream text label and map land label
var text_font_family = "Roboto";
var t = d3.transition();
var customNumberFormat = d3.format(".2s");
var parseDate = d3.time.format("%d/%m/%Y %H:%M:%S").parse;
var customTimeFormat = d3.time.format.multi([ 
//	                    [ ".%L", function(d) {return d.getMilliseconds();} ],
						// [ ":%S", function(d) {return d.getSeconds();} ],
						[ "%H:%M", function(d) {return d.getMinutes();} ],
						[ "%H:%M", function(d) {return d.getHours();} ],
						// [ "%I:%M", function(d) { return d.getMinutes(); }],
						// [ "%I %p", function(d) { return d.getHours(); }],
						[ "%a:%d", function(d) {return d.getDay() && d.getDate() != 1;} ],
						[ "%b:%d", function(d) {return d.getDate() != 1;} ], 
						[ "%B", function(d) {return d.getMonth();} ], 
						[ "%Y", function(d) {return d.getYear();} ] 
                    ]);

var polarityTemporal;
var stepTemporal;
var timeWindow;
var data_type = "people";
var nameFilter="";

// ==========================

// =========================
// TREE
var hierarchy = [];
var root_key = 'R0' ;
var color_range_children = [];
var num_leaf_children;
var tree_height;
const node_radius = 9; // px
var colores_d3 =  d3.scale.category10(); 
var tree = d3.layout.tree();

// ==========================
var dataset = [];

// ==========================
// MULTIRESOLUTION
var leaf_level = [];
var dateExtRange; 
var dateMinRange; 
var dateMaxRange; 
var categories;

// ==========================
// LOG
var timerStart;


function setNumChildrenLeaf(d){
	if(d.children){
		d.children.forEach(setNumChildrenLeaf);
	}else{
		num_leaf_children ++;
	}
}

function addingKey(d,index){
	d.name = d.name.toLowerCase();
	d.key =  d.parent.key + "_" + index;
	
	let num_initial_color = getNodesByDepth(1).length;
	let child_index;
	let color_begin_range = "white";

	if(d.depth == 1){
		num_initial_color < 5 ? color_root = colores_d3(index) : color_root = colores_brewer(index);
		if(!d.color)
		d.color = chroma(color_root).desaturate().brighten(0.4);
		
		num_leaf_children = 0;
		child_index = 0;
		setNumChildrenLeaf(d);
		
		let color_finish_range = chroma(color_root).saturate().darken();

		if(num_leaf_children>10){
			num_leaf_children = num_leaf_children+3;
		}else{
			num_leaf_children = num_leaf_children+1;
		}
		color_range_children =  chroma.scale([color_begin_range,color_finish_range]).colors(num_leaf_children);
		
	}
	if(d.children){
		numberChild = d.children.length;
	    d.children.forEach(addingKey,index);
	}else{
		child_index = --num_leaf_children;
		if(!d.color)
		d.color = color_range_children[child_index];
		d.visible = true;

		if(!d.img)
		d.img = "";
	}
}


function preProcessingRawData(rawData){
	rawData.forEach(d=>d.date = parseDate(d.date));
}

// Preprocessinf of the GeoJson file
function preProcessingGeoJSON(geoJson){
	geoJson.features.forEach(function(d){
		d.properties.name = d.properties.name.toLowerCase();
		d.value = 0;
	});
}


function setLoader(display){
	document.getElementById("loader").style.display = display;
}

function kaka(timeWindow, indexIndicator, subArrayIndicators, filter){
	
	// INIT leaf_level
	leaf_level = [];
	
	// GLOBAL
	dateExtRange = d3.extent(timeWindow); // max and min date
	dateMinRange = dateExtRange[0]; // min date
	dateMaxRange = dateExtRange[1]; // max date
	
	// for each time step in the time window
	for (let i = 0; i < timeWindow.length; i++) {
		if((i+1) < timeWindow.length){

			let sinceDate = timeWindow[i];
			let untilDate = timeWindow[i+1];

			// [)
			let dataInPeriod = dataset.filter(d=>d.date>=sinceDate && d.date<untilDate);
			
			if(dataInPeriod.length>0){
				//categories is GLOBAL
				categories.forEach(function(category){
					var hierarchy_node = getNodeByName(category);
					// solo si existe la categoria en la jerarquia
					if(hierarchy_node != null){
						
						// For each category in that dataPeriod
						let dataPeriodCategory = dataInPeriod.filter(d=>d.category===category);

						let value = 0;
						let text = [];
						let place = {};

						if(dataPeriodCategory.length>0){
							let agregated = groupByCategory(dataPeriodCategory);
							value = agregated.value;
							text = agregated.text;
							place = agregated.place;
						}

						//NUEVO ATTRIBUTO
						leaf_level.push({
							"date":sinceDate,
							"key":hierarchy_node.key,
							"img":hierarchy_node.img,
							"category":category,
							"value":value,
							"text":text,
							"place":place
						});
					}else{
						console.log("There is not present in the hierarchy structure",category);
					}
				});
			}
		}
	}

	// BUILDING leaf_level for superior levels
	hierarchy.forEach(function(node){
		if(node.children){
			var fusion = mergingChildren(node, node.children);
			leaf_level = leaf_level.concat(fusion);

			if(!node.color){
				if(node.children.length == 1){
					node.color = node.children[0].color;
				}else{
					for(var i=0;i<node.children.length-1;i++){
						node.color = chroma.blend(node.children[i].color, node.children[(i+1)].color, 'darken');	
					}
				}
			}
		}
	});


	//BUILDING NIVEL_BAJO (de la jerarquia) AND NIVEL ALTO (de la jerarquia)
	voidHierarchyLevel();
	//Children
	setBottomNodes(getLeafNodes());
	setVisibleNodes(key_bottom_list);
	key_bottom_list.reverse();
	hijos(key_bottom_list);

	
	// Parent
	setTopNodes(getNodesByDepth(1));
	setVisibleNodes(key_top_list);
	key_top_list.reverse();
	papas(key_top_list);

	// Children level
	data_bottom_level = [];
	data_bottom_level = stack(nest_by_key.entries(nivel_bajo));
	data_bottom_level.forEach(function(node){
		var node_hierarchy = getNodeByKey(node.key);
		node.color = node_hierarchy.color;
		node.category = node_hierarchy.name;
	});
	
	// Parent level
	data_top_level = [];
	data_top_level = stack(nest_by_key.entries(nivel_alto));
	data_top_level.forEach(function(node){
		var node_hierarchy = getNodeByKey(node.key);
		node.color = node_hierarchy.color;
		node.category = node_hierarchy.name;
	});
}



function groupByCategory(arrayIndicators){
	
	let sumGroup = 0;
	let textGroup = [];
	let placeGroup = [];
	
	let gByCategory = d3.nest().key(function(d) {return d.category;}).entries(arrayIndicators.map(d=>d));
	
	gByCategory.forEach(function(d){
		//sum by group
		sumGroup = d.values.reduce(function(acc,curr){
			return acc + curr.value;
		},0);
		
		//aggregate text, places
		d.values.forEach(function(element){
			textGroup.push(element.text);
			placeGroup.push(element.place);
		});
	});

	let grouped  = {
				"date":gByCategory[0].values[0].date,
				"category":gByCategory[0].values[0].category,
				"text":textGroup,
				"value":sumGroup,
				"place":placeGroup
			};

	return grouped;
}

function preProcessingHierarchydata(rawDataHierarchy){
	
	const node_gap = 9; // px
	let node_diameter = node_radius*2;

	tree_height = (40 * node_diameter) + (40 * node_gap);
	// tree_height = 1000;
	tree.size([tree_height, treeVisWidth]); // width
	//var GLOBAL
	//tree.nodes adds: children, depth, name, x, y
	hierarchy = tree.nodes(rawDataHierarchy).reverse();// array of objects

	//ROOT NODE
	let root_node = hierarchy[hierarchy.length-1];
	root_node.key = root_key;
	if(!root_node.color)
	root_node.color = "#a65628";
	root_node.children.reverse().forEach(addingKey); 
}


function ready(error, rawDataHierarchyParser, rawDataParser){
	
	if (error){
		alert(error);
		setLoader("none");
		throw error;
	}

	//
	let rawData = rawDataParser.data;
	let rawDataHierarchy = rawDataHierarchyParser.ranges;
	
	//Preprocessing
	preProcessingRawData(rawData);
	preProcessingHierarchydata(rawDataHierarchy);
	
	//Get unique categories
	categories = d3.nest().key(function(d) {return d;}).entries(rawData.map(d=>d.category)).map(d=>d.key);
	
	//var GLOBAL
	dataset = rawData.map(function(d){
		return {
			"date" : d.date,
			"category" : d.category,
			"text" : d.text,
			"value" : 1,
			"place" : {}	
		};
	});

	let dateExt = d3.extent(rawData,d=>d.date);
	let sinceDate = dateExt[0];
	let untilDate = getTimeOffset(dateExt[1], 2*stepTemporal, polarityTemporal);

	//var GLOBAL	
	timeWindow = getTimeWindow(sinceDate,untilDate,polarityTemporal,stepTemporal);

	let indicatorIndex=0;
	let arraySubIndicators = [0];
	kaka(timeWindow, indicatorIndex, arraySubIndicators);
	
	printLog(timeWindow, "getting leaf_level");
	
	// Loading VIS
//	loadMapVis(rawGeoJson);
	loadTreeVis();
	loadMultiresolutionVis();
	
	setLoader("none");
	// document.getElementById("main").style.display = "block";
	// document.getElementById("map").style.display = "initial";
	// document.getElementById("cm-menu").style.display = "inherit";
	// document.getElementById("cm-header").style.display = "block";
	// document.getElementById("global").style.display = "block";
}



function load_d3() {
	// source/music/

	let myRawDataPath = "source/equipos/data.json";
	let myHierarchyPath = "source/equipos/hierarchy.json";
	// let myGeoJSONPath = "source/od/geo/countries-hires-filter2.json"; // countries.geo.json

	polarityTemporal = "d";
	stepTemporal = 1;

	d3.queue(2)
	    .defer(d3.json,myHierarchyPath)
	    .defer(d3.json,myRawDataPath)
	    .await(ready);
}


function myFunction(){
	let selectedPopulations = getCheckedPopulationType();
	let variable = getVariableOption();
	
	kaka(timeWindow, variable, selectedPopulations);
	updateFlows();
	// Change title
	setMapVisTitle(variable);
}

function getVariableOption(){
	return document.getElementById("variables").value;
}

function getCheckedPopulationType() {
	let ary = [];
	if (!document.getElementById("population-type-0").classList
			.contains("clicked")) {
		ary.push(0);
	}
	if (!document.getElementById("population-type-1").classList
			.contains("clicked")) {
		ary.push(1);
	}
	if (!document.getElementById("population-type-2").classList
			.contains("clicked")) {
		ary.push(2);
	}
	if (!document.getElementById("population-type-3").classList
			.contains("clicked")) {
		ary.push(3);
	}
	if (!document.getElementById("population-type-4").classList
			.contains("clicked")) {
		ary.push(4);
	}
	if (!document.getElementById("population-type-5").classList
			.contains("clicked")) {
		ary.push(5);
	}
	if (!document.getElementById("population-type-6").classList
			.contains("clicked")) {
		ary.push(6);
	}
	return ary;
}

// function getSelectedPopulationType(){
// let checkboxes = document.getElementsByName("population_type");
// let selectedIndexBoxes = [];
// for (var i = 0; i < checkboxes.length; i++) {
// if (checkboxes[i].checked)
// selectedIndexBoxes.push(i);
// }
// return selectedIndexBoxes;
// }

function colores_brewer(n){
	var colors = [
		             "#e41a1c" // red
					,"#377eb8" // blue
					,"#ffff33" // jaune
					,"#984ea3" // purple
					,"#ff7f00" // orange
					,"#4daf4a" // green
					,"#a65628"
					,"#f781bf"
				]
	
	return colors[n % colors.length];
}