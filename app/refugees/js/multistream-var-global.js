//var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//var screenHeight = window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight;
//var parseDate = d3.time.format("%d/%m/%Y %H:%M:%S").parse;

var t = d3.transition();
var customNumberFormat = d3.format(".2s");
var customTimeFormat = d3.time.format.multi([ 
	                    [ ".%L", function(d) {return d.getMilliseconds();} ],
						[ ":%S", function(d) {return d.getSeconds();} ],
						[ "%H:%M", function(d) {return d.getMinutes();} ],
						[ "%H:%M", function(d) {return d.getHours();} ],
						// [ "%I:%M", function(d) { return d.getMinutes(); }],
						// [ "%I %p", function(d) { return d.getHours(); }],
						[ "%a:%d", function(d) {return d.getDay() && d.getDate() != 1;} ],
						[ "%b:%d", function(d) {return d.getDate() != 1;} ], 
						[ "%B", function(d) {return d.getMonth();} ], 
						[ "%Y", function(d) {return d.getYear();} ] 
                    ]);

var polarityTemporal = "y";
var stepTemporal = 1;
var timeWindow;

//userd in multistream text label and map land label
var text_font_family = "Roboto";


// FILES PATHS
var myGeoJSONPath = "source/od/geo/countries-hires-filter2.json"; // countries.geo.json
var myHierarchyJSONPath = "source/od/hierarchy.json";

// var variables = ["peopleOutcome","peopleIncome"]
var data_type = "people";
// PeopleIn or PeopleOut
var nameFilter="";

// =========================
// TREE
var hierarchy = [];
var root_key = "R0";
var root_color = "#a65628";
var color_begin_range = "white";
var num_initial_color;
var color_range_children = [];
var num_leaf_children;
var child_index;
var node_radius = 9; // px
var node_gap = 9; // px
var tree_height;
var colores_d3 =  d3.scale.category10(); 
var tree = d3.layout.tree();


// ==========================
// MULTIRESOLUTION
var dataset = [];
var leaf_level = [];
var dateExtRange; 
var dateMinRange; 
var dateMaxRange; 
var categories;

//MAP
var land_label_font_size = 12; //the same in the style-map.css (.land-label)


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
	d.name = d.name.toLowerCase()
	d.key =  d.parent.key + "_" + index;
	
	if(d.depth == 1){
		num_initial_color < 5 ? color_root = colores_d3(index) : color_root = colores_brewer(index);
		d.color = chroma(color_root).desaturate().brighten(0.4);
		
		num_leaf_children = 0;
		child_index = 0;
		setNumChildrenLeaf(d);
		
		var color_finish_range = chroma(color_root).saturate().darken();

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
		var child_index = --num_leaf_children;
		d.color = color_range_children[child_index];
		d.visible = true;
	}
}


function preProcessingRawData(rawData){
// let keys = Object.keys(rawData[0]);
	rawData.forEach(function(d){
		d.year = +d.year;
		d.destination = d.destination.toLowerCase();
		d.origin = d.origin.toLowerCase();
	});
}

// Preprocessinf of the GeoJson file
function preProcessingGeoJSON(geoJson){
	geoJson.features.forEach(function(d){
		d.properties.name = d.properties.name.toLowerCase();
		d.value = 0;
	});
}


function ready(error, rawHierarchy, rawGeoJson, rawData){
	
		if (error){
			throw error;
			alert(error);
			setLoader("none");
		}
		
		setLoader("block");
		
		preProcessingRawData(rawData)
		preProcessingGeoJSON(rawGeoJson);
		
		
		// BUILDING categories. Match rawGeoJson and entity in rawData
		timerStart = Date.now();
		var categoriesIntoGeoJson = rawGeoJson.features.map(d=>d.properties.name);
		let categoriesIntoRawData = d3.nest().key(function(d) {return d}).entries(rawData.map(d=>d.origin)).map(d=>d.key)
		
		categories = categoriesIntoGeoJson.filter(function(entity){
												if(categoriesIntoRawData.indexOf(entity)!=-1){
													return entity;
												}
												else{
													// console.log("no
													// encontro:",entity)
												}
											});
		
		printLog(timerStart, "getting categories");

		// =======================================================================
		// BUILDING hierachy
		// setting the tree height according the number of leaves and the node
		// radius
		timerStart = Date.now();
		var node_diameter = node_radius*2;
		tree_height = (categories.length * node_diameter) + (categories.length * node_gap);
		console.log("tree_height",tree_height)
		console.log("categories.length",categories.length)
		// tree_height = 1000;
		tree.size([tree_height, treeVisWidth]); // width

		// tree.nodes adds: children, depth, name, x, y
		hierarchy = tree.nodes(rawHierarchy.ranges).reverse();// array of
																// objects
		hierarchy[hierarchy.length-1].key = root_key;
		hierarchy[hierarchy.length-1].color = root_color;
		num_initial_color = getNodesByDepth(1).length;
		hierarchy[hierarchy.length-1].children.reverse().forEach(addingKey);// 
		printLog(timerStart, "getting hierarchy");
		
		// =======================================================================
		// BUILDING dataset
		// get years
		timerStart = Date.now();
		let yearsExtent = d3.extent(rawData,d=>d.year);
		let years = [];
		for(let year = yearsExtent[0]; year<=yearsExtent[1]; year++){
			years.push(year);
		}
		
		// get keys
		let populationTypes = [
			"Refugees (incl. refugee-like situations)",// 0
			"Asylum-seekers (pending cases)",// 1
			"Returned refugees",// 2
			"Internally displaced persons (IDPs)",// 3
			"Returned IDPs",// 4
			"Stateless persons",// 5
			"Others of concern"// 6
		];
		
		
		let parserToDataset = years.map(function(year){
			
			// filter by each Year
			let byYear = rawData.filter(d=>d.year==year);
			
			return{
				"date":new Date(year,0),
				"values":	
							// filter by each category
							categories.map(function(currCountry){
								
								// countries that moved to currCountry
								var personasEntraronAX = [];
								byYear.filter(d=>d.destination==currCountry).forEach(function(item){
									let countryWithFeatures = rawGeoJson.features.filter(d=>d.properties.name == item.origin);
									if(countryWithFeatures.length==1){
										personasEntraronAX.push({
											"type":countryWithFeatures[0].type,
											"id":countryWithFeatures[0].id,
											"geometry":countryWithFeatures[0].geometry,
											"properties":countryWithFeatures[0].properties,
											"arraray":populationTypes.map(function(populationType){
												return{
													"item":populationType,
													"value":Number.isNaN(+item[populationType])?0:+item[populationType]
												}
											})
										})							
									}
								});
								
								// FROM this current country to others countries
								let personasSalieronDesdeX = []; 
								byYear.filter(d=>d.origin==currCountry).forEach(function(item){
									let countryWithFeatures = rawGeoJson.features.filter(d=>d.properties.name == item.destination);
									if(countryWithFeatures.length==1){
										personasSalieronDesdeX.push({
											"type":countryWithFeatures[0].type,
											"id":countryWithFeatures[0].id,
											"geometry":countryWithFeatures[0].geometry,
											"properties":countryWithFeatures[0].properties,
											"arraray":populationTypes.map(function(populationType){
												return{
													"item":populationType,
													"value":Number.isNaN(+item[populationType])?0:+item[populationType]
												}
											})
										});
									}
								});
								
								var indicators = [];
								indicators.push({
									"nameIndicator" : "PersonasSalieronDesdeX",
									"valueIndicator" : 0, // d3.sum(personasSalieronDesdeX.map(d=>d.value)),
									"componentIndicator" : personasSalieronDesdeX
								});
								indicators.push({
									"nameIndicator" : "PersonasEntraronAX",
									"valueIndicator" : 0, // d3.sum(personasEntraronAX.map(d=>d.value)),
									"componentIndicator" : personasEntraronAX
								});
								
								return { 
									"item":currCountry,
									"indicators" : indicators
								}
							})
			}
			
		});
		
		parserToDataset.forEach(function(parser){
			var date = parser.date;
			parser.values.forEach(function(d){
				var obj = {};
				obj["date"] = date;
				obj["category"] = d.item;	// category
				obj["indicators"] = d.indicators;
				dataset.push(obj);
			});
		});
		
		
		var start = new Date(years[0],0);
// var stop = new Date(years[years.length-1],0);
		// because timeOffset behaivor; stop + 1 year
		var stop = getTimeOffset(new Date(years[years.length-1],0), 2*stepTemporal, polarityTemporal);

		console.log(start)
		console.log(stop)
		
		timeWindow = getTimeWindow(start,stop,polarityTemporal,stepTemporal);
		let indicatorIndex=0;
		let arraySubIndicators = [0,1,2,3,4,5,6];
		kaka(timeWindow, indicatorIndex, arraySubIndicators);
		
		printLog(timeWindow, "getting leaf_level");
		
		// Loading VIS
		loadMapVis(rawGeoJson);
		loadTreeVis();
		loadMultiresolutionVis();
		
		setLoader("none")

		// document.getElementById("main").style.display = "block";
		// document.getElementById("map").style.display = "initial";
		// document.getElementById("cm-menu").style.display = "inherit";
		// document.getElementById("cm-header").style.display = "block";
		// document.getElementById("global").style.display = "block";
}


function setLoader(display){
	document.getElementById("loader").style.display = display;
}

function kaka(timeWindow, indexIndicator, subArrayIndicators, filter){

	console.log(timeWindow);
	
	
	// INIT leaf_level
	leaf_level = [];
	
	dateExtRange = d3.extent(timeWindow); // max and min date
	dateMinRange = dateExtRange[0]; // min date
	dateMaxRange = dateExtRange[1]; // max date
	
	// for each time step in the time window
	for (let i = 0; i < timeWindow.length; i++) {
		if((i+1) < timeWindow.length){
			let start = timeWindow[i];
			let stop = timeWindow[i+1];
			
			// console.log("mayor igual",start)
			// console.log("menor",stop)
			// console.log("===============================")
			
			// [)
			let dataPeriod = dataset.filter(d=>d.date>=start && d.date<stop)

			if(dataPeriod.length>0){
				
				categories.forEach(function(category){
					
					var hierarchy_node = getNodeByName(category)
					// solo si existe la categoria en la jerarquia
					if(hierarchy_node != null){
						
						// For each category in that dataPeriod
						let dataPeriodCategory = dataPeriod.filter(d=>d.category===category);
						
						let agregated = fusionValues(dataPeriodCategory)
						
						// encerar
						// agregated[indexIndicator].componentIndicator.forEach(d=>d.value=0)
						// 1
						// aqui ver que indicador hay que mostrar
						agregated[indexIndicator].componentIndicator.forEach(function(c){
							// Sacar la suma
							let sumComponentIndicator = 0;
							subArrayIndicators.forEach(function(index){
								sumComponentIndicator = sumComponentIndicator + c.arraray[index].value;
							})
							c.value = sumComponentIndicator;
						})
						
						//
						// encerar valores a 0
						// agregated[indexIndicator].valueIndicator=0
						// 2
						let sumIndicator = 0;
						agregated[indexIndicator].componentIndicator.forEach(function(c){
							sumIndicator = sumIndicator + c.value 
						})
						agregated[indexIndicator].valueIndicator = sumIndicator;
						
						let valueIndicator = agregated[indexIndicator].valueIndicator;
	
						let	compo = agregated[indexIndicator].componentIndicator;
						if(filter!=null){
							compo = compo.filter(d=>d.properties.name === filter);
							if(compo.length==1){
								valueIndicator = compo[0].value;
							}else{
								valueIndicator = 0;
							}
						}
						
						leaf_level.push({
							"date":start,
							"key":hierarchy_node.key,
							"category":category,
							"value":valueIndicator,
							"components":compo,
							"text":[]
						});
					}else{
						console.log("no hay en jerarquia",category)
					}
				})
			}
			
			
		}
	}
	
	
	let threshold = 100;
	getPointDetection(leaf_level.filter(d=>d.category=="ecuador"), threshold)
	
	
	
	
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
	})
	
	voidHierarchyLevel();
	// Children
	setBottomNodes(getLeafNodes());
	setVisibleNodes(key_bottom_list);
	key_bottom_list.reverse();
	hijos(key_bottom_list);
	
	// Parent
	setTopNodes(getNodesByDepth(1));
	setVisibleNodes(key_top_list);
	key_top_list.reverse();
	papas(key_top_list);
	// *************************************************************
	
	
	// Children level
	data_bottom_level = [];
	data_bottom_level = stack(nest_by_key.entries(nivel_bajo));
	data_bottom_level.forEach(function(node){
		var node_hierarchy = getNodeByKey(node.key);
		node.color = node_hierarchy.color;
		node.category = node_hierarchy.name;
	})
	
	// Parent level
	data_top_level = [];
	data_top_level = stack(nest_by_key.entries(nivel_alto));
	data_top_level.forEach(function(node){
		var node_hierarchy = getNodeByKey(node.key);
		node.color = node_hierarchy.color;
		node.category = node_hierarchy.name;
	})
	
}



function groupComponentIndicatorByName(arrayComponents){
	var agrouped = arrayComponents.reduce(function (acc, obj) {
		var cle = obj.properties["name"];
		if(!acc[cle]){
			acc[cle] = [];
		}
		acc[cle].push(obj);
		return acc;
	}, {});
	
// console.log(Object.values(agrouped))
	
	var result = Object.values(agrouped).map(function(groupedElements){
// console.log(groupedElements.length)
		if(groupedElements.length==1){
			return groupedElements[0];	
		}else{
			
// console.log(groupedElements)
			
			// agroupar los arrays en groupedElements
			let tmp = [];
			groupedElements.forEach(function(d){
				d.arraray.forEach(function(ray){
					tmp.push(ray)
				})
			})
			let groupeArraray = tmp.reduce(function (acc, obj) {
				let cle = obj.item;
				if(!acc[cle]){
					acc[cle] = [];
				}
				acc[cle].push(obj);
				return acc;
			}, {});
			
			let mm = Object.values(groupeArraray).map(function(gg){
				return{
					"item":gg[0].item,
					"value": gg.reduce(function (acc, curr) {
						return acc + curr.value;
					}, 0)
				}
			})
			
			let retorno = {
				"type":groupedElements[0].type,
				"id":groupedElements[0].ide,
				"properties":groupedElements[0].properties,
				"geometry":groupedElements[0].geometry,
				"value":0,
				"arraray":mm
			}
			
// groupedElements[0].arraray = mm;
// groupedElements[0].value = 0;
// return groupedElements[0];
			return retorno;
		}
	});
	
	return result;
}

function groupIndicatorByName(arrayIndicators){
	
	var agrouped = arrayIndicators.reduce(function (acc, obj) {
		var cle = obj.nameIndicator;
		if(!acc[cle]){
			acc[cle] = [];
		}
		acc[cle].push(obj);
		return acc;
	}, {});
	
	var result = Object.values(agrouped).map(function(element){
		if(element.length==1){
			return element[0];	
		}else{
			
			// sum valueIndicator
// var somme = element.reduce(function (acc, curr) {
// return acc + curr.valueIndicator;
// }, 0);
			
			let tmp = [];
			element.forEach(function(d){
	 			d.componentIndicator.forEach(function(elem){
// if(elem.value>=1){
	 					tmp.push(elem);
// }
	 			})
	 		})
	 		
//	 		console.log(tmp)
	 		
			let nameIndicator = element[0].nameIndicator;
			let valueIndicator = 0;
			let componentIndicator = groupComponentIndicatorByName(tmp);
			
			return {
				"nameIndicator": nameIndicator,
				"valueIndicator":valueIndicator,
				"componentIndicator":componentIndicator
			};
		}
	});
	return result;
}



function fusionValues(arrayObjets){
	var tmp = [];
	arrayObjets.forEach(function(d){
		d.indicators.forEach(function(indicator){
			tmp.push(indicator);
		})
	})
	return groupIndicatorByName(tmp);
}






function load_d3() {
	let fileHandler = "source/od/classeur.csv";
	d3.queue(3)
	    .defer(d3.json,myHierarchyJSONPath)
	    .defer(d3.json,myGeoJSONPath)
	    .defer(d3.csv,fileHandler)
	    .await(ready);
}

function load_d3OLD(fileHandler) {
	d3.queue(3)
	    .defer(d3.json,myHierarchyJSONPath)
	    .defer(d3.json,myGeoJSONPath)
	    .defer(d3.tsv,fileHandler)
	    .await(ready);
}


function a(callback){
	
	callback(null)
}

function b(callback){
}

function rr(){
	console.log("updating")
	
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