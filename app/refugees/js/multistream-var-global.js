//var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//var screenHeight = window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight;

var parseDate = d3.time.format("%d/%m/%Y %H:%M:%S").parse;
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


//TOOLTIP
var toolTipNumberFormat = d3.format(".2s");

//PATHS
var myGeoJSONPath = "source/od/countries.geo.json"; //countries-hires.json //countries.geo.json
var myHierarchyJSONPath = "source/od/hierarchy.json";

//=========================
//TREE
var rawGeoJSON = [];
var hierarchy = [];
var root_key = "R0";
var root_color = "#a65628";
var colores_d3 =  d3.scale.category10();
var color_begin_range = "white";
var num_initial_color;
var color_range_children = [];
var num_leaf_children;
var child_index;
var node_radius = 9; // px
var node_gap = 3; // px
var tree = d3.layout.tree();
var tree_height;
var geoJson = [];


//==========================
//MULTIRESOLUTION
var dataset = [];
var leaf_level = [];
var variables = ["peopleOutcome","peopleIncome"]
var data_type = "people";
var dateExtRange; 
var dateMinRange; 
var dateMaxRange; 
var timeWindow;
var polarityTemporal = "y";
var stepTemporal = 1;


var categories;




//==========================
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


function readyR(error, rawHierarchy, rawData){
	
}


function ready(error, rawHierarchy, dataFromGeoJson, rawData){
	
		if (error){
			throw error;
			alert(error);
			document.getElementById("loader").style.display = "none";
		}
		 
		rawGeoJson = dataFromGeoJson;
		
		//SETTING the countries name in lower case and a value property
		rawGeoJson.features.forEach(function(itemGeoJson){
			itemGeoJson.properties.name = itemGeoJson.properties.name.toLowerCase();
			//itemGeoJson.properties.NAME = itemGeoJson.properties.NAME.toLowerCase();
			itemGeoJson.value = 0;
		})
		
		//BUILDING categories. Match rawGeoJson and entity in rawData
		timerStart = Date.now();
		//var categoriesIntoGeoJson = rawGeoJson.features.map(d=>d.properties.NAME);
		var categoriesIntoGeoJson = rawGeoJson.features.map(d=>d.properties.name);
		var categoriesIntoRawData = rawData.map(d=>d.origin.toLowerCase());
		categories = categoriesIntoGeoJson.filter(function(entity){
												if(categoriesIntoRawData.indexOf(entity)!=-1){
													return entity;
												}
//												else{
//													console.log("no encontro:",entity)
//												}
											});
		
//		categoriesIntoRawData.filter(function(entity){
//			if(categoriesIntoGeoJson.indexOf(entity)!=-1){
//				return entity;
//			}else{
//				console.log("no encontro:",entity)
//			}
//		})
//		return;	
		
		console.log(categories)
		printLog(timerStart, "getting categories");

		//=======================================================================	
		// BUILDING hierachy
		// setting the tree height according the number of leaves and the node
		// radius
		timerStart = Date.now();
		var node_diameter = node_radius*2;
		tree_height = (categories.length * node_diameter) + (categories.length * node_gap);
		tree.size([tree_height, treeVisWidth]); //width
		// tree.nodes adds: children, depth, name, x, y
		hierarchy = tree.nodes(rawHierarchy.ranges).reverse();// array of objects
		hierarchy[hierarchy.length-1].key = root_key;
		hierarchy[hierarchy.length-1].color = root_color;
		num_initial_color = getNodesByDepth(1).length;
		hierarchy[hierarchy.length-1].children.reverse().forEach(addingKey);// 
		printLog(timerStart, "getting hierarchy");
		
		//=======================================================================
		// BUILDING dataset
		// get years (first row)
		timerStart = Date.now();
		var years = [];
		for(var column_title in rawData[0]){
			if(!isNaN(column_title))
				years.push(column_title)
		}
		
		
		// get how many people income/outcome by country each year
		var parserToDataset = years.map(function(year){
			// ori_dest_by_year is used 2 below
			const ori_dest_by_year = rawData.map(function(d){
				return {
					origin : d.origin.toLowerCase(),
					destination : d.destination.toLowerCase(),
					value : +d[year]
				};
			})
			
			return { 
				date: new Date(year,0), // 0 for years
				values: categories.map(function(country){
					
					// categories moved TO X country
					var personasEntraronAX = [];
					ori_dest_by_year.filter(d=>d.destination==country).forEach(function(item){
						let countryWithFeatures = rawGeoJson.features.filter(d=>d.properties.name == item.origin);
						//Si el pais existe con el archivo tsv y en geoJson
						if(countryWithFeatures.length==1){
							personasEntraronAX.push({
								"type":countryWithFeatures[0].type,
								"id":countryWithFeatures[0].id,
								"geometry":countryWithFeatures[0].geometry,
								"properties":countryWithFeatures[0].properties,
								"value":item.value
							})							
						}else{
							//console.log("error no encontro en geoJson:",item.origin)
						}
					})
					
					// FROM this current country to others countries
					var personasSalieronDesdeX = []; 
					ori_dest_by_year.filter(d=>d.origin==country).forEach(function(item){
						let countryWithFeatures = rawGeoJson.features.filter(d=>d.properties.name == item.destination);
						if(countryWithFeatures.length==1){
							personasSalieronDesdeX.push({
								"type":countryWithFeatures[0].type,
								"id":countryWithFeatures[0].id,
								"geometry":countryWithFeatures[0].geometry,
								"properties":countryWithFeatures[0].properties,
								"value":item.value
							});
						}else{
							//console.log("error no encontro en geoJson:",item.destination)
						}
					});
					
					
					var indicators = [];
					
					indicators.push({
						"nameIndicator" : "PersonasSalieronDesdeX",
						"valueIndicator" : d3.sum(personasSalieronDesdeX.map(d=>d.value)),
						"componentIndicator" : personasSalieronDesdeX
					});
					indicators.push({
						"nameIndicator" : "PersonasEntraronAX",
						"valueIndicator" : d3.sum(personasEntraronAX.map(d=>d.value)),
						"componentIndicator" : personasEntraronAX
					});
					
					return {
						"item": country,
						"indicators" : indicators 
					};
				})
			}
		});
		
		parserToDataset.forEach(function(parser){
			var date = parser.date;
			parser.values.forEach(function(d){
				var obj = {};
				obj["date"] = date;
				obj["indicators"] = d.indicators;
				obj["category"] = d.item;	//category
				dataset.push(obj);
			});
		});
		
//		console.log(dataset)

		var datasetDateExtent = d3.extent(dataset,d=>d.date);
		var star = datasetDateExtent[0];
		var stop = datasetDateExtent[1];
		
		timeWindow = prepareTimeWindow(star,stop,polarityTemporal,stepTemporal);
		
		kaka(timeWindow, 0);
		printLog(timeWindow, "getting leaf_level");
		
		// Loading VIS
		loadMapVis();
		loadMultiresolutionVis();
		loadTreeVis();
		
		document.getElementById("loader").style.display = "none";
		document.getElementById("main").style.display = "block";
		
		//document.getElementById("map").style.display = "initial";
		//document.getElementById("cm-menu").style.display = "inherit";
		//document.getElementById("cm-header").style.display = "block";
		//document.getElementById("global").style.display = "block";

		
}

function kaka(timeWindow, indexIndicator, filter){
	
	
//	console.log("timeWindow",timeWindow)
//	console.log("indexIndicator",indexIndicator)
//	console.log("filter",filter)
	console.log("indexIndicator",indexIndicator)
	// INIT leaf_level
	leaf_level = [];
	
	//
	dateExtRange = d3.extent(timeWindow); // max and min date
	dateMinRange = dateExtRange[0]; // min date
	dateMaxRange = dateExtRange[1]; // max date

	
	//for each time step in the time window
	for (let i = 0; i < timeWindow.length; i++) {
		if((i+1)<timeWindow.length){
			let start = timeWindow[i];
			let stop = timeWindow[i+1];
			//[)
			let dataPeriod = dataset.filter(d=>d.date>=start && d.date<stop);

			//for each category 
			categories.forEach(function(category){
				
				var hierarchy_node = getNodeByName(category)
				//solo si existe la categoria en la jerarquia
				if(hierarchy_node != null){
					
					//For each category in that dataPeriod
					let dataPeriodCategory = dataPeriod.filter(d=>d.category===category);
					let agregated = fusionValues(dataPeriodCategory)
					
					//console.log(agregated)
					
					//aqui ver que indicador hay que mostrar
					let valueIndicator = agregated[indexIndicator].valueIndicator;
//					let	compo = agregated[indexIndicator].componentIndicator.filter(d=>d.item.length==1 && d.value>0);
					let	compo = agregated[indexIndicator].componentIndicator.filter(d=>d.value>0);
//					console.log(compo)
					
					if(filter!=null){
//						console.log("FILTRANDO POR " , filter);
						//cambiar el value aussi pues 
						//compo = compo.filter(d=>d.item[0].properties.name === filter);
						compo = compo.filter(d=>d.properties.name === filter);
//						console.log(compo)
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
					console.log("no hay en jerearquia",category)
				}
			})
		}
	}
	
//	console.log(hierarchy)
	
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
	
	
//	console.log(leaf_level)
	
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
	data_bottom_level = stack(nest_by_key.entries(nivel_bajo));
	data_bottom_level.forEach(function(node){
		var node_hierarchy = getNodeByKey(node.key);
		node.color = node_hierarchy.color;
		node.category = node_hierarchy.name;
	})
	
	// Parent level
	data_top_level = stack(nest_by_key.entries(nivel_alto));
	data_top_level.forEach(function(node){
		var node_hierarchy = getNodeByKey(node.key);
		node.color = node_hierarchy.color;
		node.category = node_hierarchy.name;
	})
}



function groupComponentIndicatorByName(arrayComponents){
	var agrouped = arrayComponents.reduce(function (acc, obj) {
//		var cle = obj.item[0].properties["name"];
		var cle = obj.properties["name"];
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
			var somme = element.reduce(function (acc, curr) {
				return acc + curr.value;
			}, 0);
			element[0].value = somme;
			return element[0];
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
			//sum valueIndicator
			var somme = element.reduce(function (acc, curr) {
				return acc + curr.valueIndicator;
			}, 0);
			
				
			let tmp = [];
			element.forEach(function(d){
	 			d.componentIndicator.forEach(function(elem){
//	 				if(elem.item.length==1){
	 				if(elem.value>=1){
	 					tmp.push(elem);
	 				}
	 			})
	 		})
	 		
			let nameIndicator = element[0].nameIndicator;
			let valueIndicator = somme;
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
	
	let fileHandler = "source/od/data.tsv";
	d3.queue(3)
	    .defer(d3.json,myHierarchyJSONPath)
	    .defer(d3.json,myGeoJSONPath)
	    .defer(d3.tsv,fileHandler)
	    .await(ready);
}



function load_d3OLD(fileHandler) {
	d3.queue(3)
	    .defer(d3.json,myHierarchyJSONPath)
	    .defer(d3.json,myGeoJSONPath)
	    .defer(d3.tsv,fileHandler)
	    .await(ready);
}

function myFunction(){
	let x = document.getElementById("variables").value;
	console.log("selected",x)
	kaka(timeWindow, x);
	updateFlows();
	
	console.log("x",x)
	
	//Change title
	switch(parseInt(x)){
		case 0:
			console.log("poniento destination")
			document.getElementById("map-vis-title").innerHTML = "Destination"
			break;
		case 1:
			console.log("poniendo origin")
			document.getElementById("map-vis-title").innerHTML = "Origin"
			break;
	}
}

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