var jerarquiaOutflow;
var jerarquiaInflow;

var key_focus_list_outflow = [];
var key_context_list_outflow = [];
var nivel_focus_outflow = [];
var nivel_context_outflow = [];


var key_focus_list_inflow = [];
var key_context_list_inflow = [];
var nivel_focus_inflow = [];
var nivel_context_inflow = [];


var legend_y_outflow = "outflow";
var sub_legend_y_outflow = "num. of refugees leaving";
var dataType_outflow = "leaving";
var leyend_y_inflow = "inflow";
var sub_leyend_y_inflow = "num. of refugees entering";
var dataType_inflow = "entering";

var arraySubIndicators = [0];

var t = d3.transition();
var customNumberFormat = d3.format(".2s");



var customTimeFormatTitle = d3.time.format.multi([
	["%I:%M", function(d) { return d.getMinutes(); }],
	["%I %p", function(d) { return d.getHours(); }],
	["%a %d %b", function(d) { return d.getDay() && d.getDate() != 1; }],
	["%b %d", function(d) { return d.getDate() != 1; }],
	["%B", function(d) { return d.getMonth(); }],
	["%Y", function() { return true; }]
  ]);
					
var customTimeFormat = d3.time.format.multi([
  [".%L", function(d) { return d.getMilliseconds(); }],
  [":%S", function(d) { return d.getSeconds(); }],
  ["%I:%M", function(d) { return d.getMinutes(); }],
  ["%I %p", function(d) { return d.getHours(); }],
  ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
  ["%b %d", function(d) { return d.getDate() != 1; }],
  ["%B", function(d) { return d.getMonth(); }],
  ["%Y", function() { return true; }]
]);					



// VAR GLOBALES
//General
var log;
var title;
var dataType;
var durationTransition;
//Multistream
var polarityTemporal;
var stepTemporal;
var animation;
var interpolateType;
var orderType;
//Multiresolution
var layersFadingColorsFactor;
var layersBorderlineColor;
var layersOpacitySelected;
var layersOpacityNotSelected;
var layersOutputRangeLabelScale;
var layersLabelType;
//Context
var numTimeStepBrushZoom;
var numTimeStepBrushDistortion;
var numTimeStepBrushNormal;
//Map
var outputRangeColorScaleMap;
var featuresOutputRangeLabelScale;
var typeMapVisualization;
var showMapArrow = true;
let projectionMap = d3.geo.equirectangular() ////mercator();
						.scale(200)
						.center([0, 0])
						.translate([mapVisWidth / 2, mapVisHeight / 2]);

let pathMap = d3.geo.path()
						.projection(projectionMap);
//Tree

//Events
var eventWidthSizeLabelScale;
var eventHeightSizeLabelScale;



//OPTS
var optsGeneral;
var optsMultistream;
var optsMultiresolution;
var optsContext;
var optsEvents;
var optsMap;
var optsTree;

// Configuration List
var confList = [];






var timeWindow;
//userd in multistream text label and map land label
var text_font_family = "Roboto";
var nameFilter="";

// =========================
// TREE
var hierarchyOrigen;
var hierarchyDestino;
var root_key = "R0";
var root_color = "#a65628";
var color_begin_range = "white";
var num_initial_color;
var color_range_children;
var num_leaf_children;
var node_radius = 9; // px
var node_gap = 15; // px
var tree = d3.layout.tree();

///
var geoJson;

// ==========================
// MULTIRESOLUTION
var dataset;
var leaf_level;
var dateExtRange; 
var dateMinRange; 
var dateMaxRange; 
var categories;

// ==========================
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

function addingKeyNuevo(d,index){

	d.name = d.name.toLowerCase();
	d.key =  d.parent.key + "_" + index;
	
	if(d.depth == 1){
		// console.log("num_initial_color",num_initial_color)
		num_initial_color < 5 ? color_root = colores_d3(index) : color_root = colores_brewer(index);
		d.color = chroma(color_root).desaturate().brighten(0.4);
		
		num_leaf_children = 0;
		// child_index = 0;
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
			// d.children.forEach(addingKeyNuevo,index);
			d.children.forEach((c,i)=>{
				addingKeyNuevo(c,i);
			});
	}else{
		let child_index = --num_leaf_children;
		d.color = color_range_children[child_index];
		d.visible = true;
	}
}


function preProcessingRawData(rawData){
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
		d.centroid = pathMap.centroid(getGeoJsonElementBiggestCoordinate(d));
		d.value = 0;
	});
}

function initOpts(init){

	//General
	log = init.optsGeneral.log;
	title = init.optsGeneral.title;
	dataType = init.optsGeneral.dataType;
	durationTransition = init.optsGeneral.durationTransition;
	//Multistream
	polarityTemporal = init.optsMultistream.polarityTemporal;
	stepTemporal = init.optsMultistream.stepTemporal;
	animation = init.optsMultistream.animation;
	interpolateType = init.optsMultistream.interpolateType;
	orderType = init.optsMultistream.orderType;
	//Multiresolution
	layersFadingColorsFactor = init.optsMultistream.optsMultiresolution.layersFadingColorsFactor;
	layersBorderlineColor = init.optsMultistream.optsMultiresolution.layersBorderlineColor;
	layersOpacitySelected = init.optsMultistream.optsMultiresolution.layersOpacitySelected;
	layersOpacityNotSelected = init.optsMultistream.optsMultiresolution.layersOpacityNotSelected;
	layersOutputRangeLabelScale = init.optsMultistream.optsMultiresolution.layersOutputRangeLabelScale;
	layersLabelType = init.optsMultistream.optsMultiresolution.layersLabelType;
	//Context
	numTimeStepBrushZoom = init.optsMultistream.optsContext.numTimeStepBrushZoom;
	numTimeStepBrushDistortion = init.optsMultistream.optsContext.numTimeStepBrushDistortion;
	numTimeStepBrushNormal = init.optsMultistream.optsContext.numTimeStepBrushNormal;

	//Map
	outputRangeColorScaleMap = init.optsMap.outputRangeColorScaleMap;
	featuresOutputRangeLabelScale = init.optsMap.featuresOutputRangeLabelScale;
	typeMapVisualization = init.optsMap.typeMapVisualization;

	//Tree

	//Events
	eventWidthSizeLabelScale = init.optsEvents.eventWidthSizeLabelScale;
	eventHeightSizeLabelScale = init.optsEvents.eventHeightSizeLabelScale;
}

function initOptsVariables(list){
	list.forEach(item=>{
		if(item.optsGeneral.active){
			//LOAD OPTS
			optsGeneral = item.optsGeneral;
			optsMultistream = item.optsMultistream;
			optsMultiresolution = item.optsMultistream.optsMultiresolution;
			optsContext = item.optsMultistream.optsContext;
			optsEvents = item.optsEvents;
			optsMap = item.optsMap;
			optsTree = item.optsTree;
		}
	});

}

function ready(error, rawHierarchy, rawGeoJson, rawData, rawConfiguration){
	
		if (error){
			alert(error);
			setLoader(false);
			throw error;
		}

		dataset = [];
		geoJson = rawGeoJson;
		leaf_level = [];
		hierarchyOrigen = [];
		hierarchyDestino = [];
		color_range_children = [];
		//
		//
		d3.select("#svg-map-vis").selectAll("g").remove();
		removeElement("tooltip-map");
		//
		d3.select("#svg-tree-vis").selectAll("g").remove();
		removeElement("tooltip-tree");
		//
		d3.select("#svg-multiresolution-vis").selectAll("g").remove();
		removeElement("tooltip-flow");

		//PREPROCESSING
		preProcessingRawData(rawData);
		preProcessingGeoJSON(rawGeoJson);

		//INIT OPTS
		initOpts(rawConfiguration.init);

		//OPTS VARIABLES
		initOptsVariables(rawConfiguration.list);
		
		// BUILDING categories. Match rawGeoJson and entity in rawData
		timerStart = Date.now();
		var categoriesIntoGeoJson = rawGeoJson.features.map(d=>d.properties.name);
		let categoriesIntoRawData = d3.nest().key(function(d) {return d;}).entries(rawData.map(d=>d.origin)).map(d=>d.key);
		
		categories = categoriesIntoGeoJson.filter(function(entity){
												if(categoriesIntoRawData.indexOf(entity)!=-1){
													return entity;
												}
											});
		
		printLog(timerStart, "getting categories");

		// =======================================================================
		// BUILDING hierachy
		// setting the tree height according the number of leaves and the node
		// radius
		timerStart = Date.now();
		let node_diameter = node_radius*2;
		treeVisHeight =   (categories.length * node_diameter) + (categories.length * node_gap);

		tree.size([treeVisHeight - gapWindowsTop, treeVisWidth]); // width
		// tree.nodes adds: children, depth, name, x, y
		hierarchyOrigen = tree.nodes(rawHierarchy.ranges).reverse();// array of objects
		hierarchyOrigen[hierarchyOrigen.length-1].key = root_key;
		hierarchyOrigen[hierarchyOrigen.length-1].color = root_color;
		num_initial_color = 5; //getNodesByDepth(1).length;
		// hierarchyOrigen[hierarchyOrigen.length-1].children.reverse().forEach(addingKey);
		hierarchyOrigen[hierarchyOrigen.length-1].children.forEach((curr,index)=>{
			addingKeyNuevo(curr,index);
		});

		hierarchyDestino = tree.nodes(rawHierarchy.ranges).reverse();// array of objects
		hierarchyDestino[hierarchyDestino.length-1].children.forEach((curr,index)=>{
			addingKeyNuevo(curr,index);
		});

		
		printLog(timerStart, "getting hierarchy");

		hierarchyOrigen.forEach(function(node){
			node.level = "";
			node.visible = false;
		});
	
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
							
							// OUTFLOW - OUTGOING
							let outgoing = []; 
							byYear.filter(d=>d.origin==currCountry).forEach(function(item){
								let countryWithFeatures = rawGeoJson.features.filter(d=>d.properties.name == item.destination);
								if(countryWithFeatures.length==1){
									outgoing.push({
										"type":countryWithFeatures[0].type,
										"id":countryWithFeatures[0].id,
										"geometry":countryWithFeatures[0].geometry,
										"properties":countryWithFeatures[0].properties,
										"centroid":countryWithFeatures[0].centroid,
										"arraray":populationTypes.map(function(populationType){
											return{
												"item":populationType,
												"value":Number.isNaN(+item[populationType])?0:+item[populationType]
											};
										})
									});
								}
							});

							// INFLOW - INCOMING
							let incoming = [];
							byYear.filter(d=>d.destination==currCountry).forEach(function(item){
								let countryWithFeatures = rawGeoJson.features.filter(d=>d.properties.name == item.origin);
								if(countryWithFeatures.length==1){
									incoming.push({
										"type":countryWithFeatures[0].type,
										"id":countryWithFeatures[0].id,
										"geometry":countryWithFeatures[0].geometry,
										"properties":countryWithFeatures[0].properties,
										"centroid":countryWithFeatures[0].centroid,
										"arraray":populationTypes.map(function(populationType){
											return{
												"item":populationType,
												"value":Number.isNaN(+item[populationType])?0:+item[populationType]
											};
										})
									});							
								}
							});
							
							var indicators = [];
							indicators.push({
								"nameIndicator" : "outgoing",
								"valueIndicator" : 0,
								"componentIndicator" : outgoing
							});
							indicators.push({
								"nameIndicator" : "incoming",
								"valueIndicator" : 0,
								"componentIndicator" : incoming
							});
							
							return {
								"category":rawGeoJson.features.filter(d=>d.properties.name == currCountry)[0],
								"indicators" : indicators
							};
						})
			};
			
		});
		
		parserToDataset.forEach(function(parser){
			parser.values.forEach(function(d){
				dataset.push({
					"date" : parser.date,
					"category" : d.category,
					"indicators" : d.indicators
				});
			});
		});
		
		
		var start = new Date(years[0],0);
		var stop = getTimeOffset(new Date(years[years.length-1],0), 2*stepTemporal, polarityTemporal);
		timeWindow = getTimeWindow(start,stop,polarityTemporal,stepTemporal);
		

		jerarquiaOutflow = new Jerarquia(hierarchyOrigen);
		jerarquiaOutflow.my_leaf_level = kaka(timeWindow, 0, arraySubIndicators, "", jerarquiaOutflow);
		jerarquiaOutflow.setBottomNodes(jerarquiaOutflow.getLeafNodes());
		jerarquiaOutflow.setTopNodes(jerarquiaOutflow.getNodesByDepth(1));
			
		nivel_focus_outflow = jerarquiaOutflow.hijos();
		key_focus_list_outflow = jerarquiaOutflow.key_bottom_list;
	
		nivel_context_outflow = jerarquiaOutflow.papa();
		key_context_list_outflow = jerarquiaOutflow.key_top_list;

		//-------------------------------

		console.log("");
		console.log("");

		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		jerarquiaInflow = new Jerarquia(hierarchyDestino);
		jerarquiaInflow.my_leaf_level = kaka(timeWindow, 1, arraySubIndicators, "", jerarquiaInflow);
		jerarquiaInflow.setBottomNodes(jerarquiaInflow.getLeafNodes());
		jerarquiaInflow.setTopNodes(jerarquiaInflow.getNodesByDepth(1));

		nivel_focus_inflow = jerarquiaInflow.hijos();
		key_focus_list_inflow = jerarquiaInflow.key_bottom_list;
	
		nivel_context_inflow = jerarquiaInflow.papa();
		key_context_list_inflow = jerarquiaInflow.key_top_list;


		// Loading VIS 
		loadMapVis(rawGeoJson);
		loadMultiresolutionVis();
		loadTreeVis();
		loadCompareVis();
	
		setLoader(false);
}

function setLoader(display){
	if(display){
		document.getElementById("overlay").style.display = "block";
		document.getElementById("loader").style.display = "block";
		document.getElementById("vistas").setAttribute( 'style', 'opacity: 0 !important' );
	}else{
		document.getElementById("loader").style.display = "none";
		document.getElementById("overlay").style.display = "none";
		document.getElementById("vistas").setAttribute( 'style', 'opacity: 1 !important' );
	}
}

function kaka(timeWindow, indexIndicator, subArrayIndicators, filtroDeNose, jerarquiaInstance){
	//indexIndicator (0: origin, 1: destination)
	//subArrayIndicators (refugees, asylum, internally)
	let result_leaf_level = [];

	dateExtRange = d3.extent(timeWindow); // max and min date
	dateMinRange = dateExtRange[0]; // min date
	dateMaxRange = dateExtRange[1]; // max date

	// for each time step in the time window
	for (let i = 0; i < timeWindow.length; i++) {
		if((i+1) < timeWindow.length){
			let start = timeWindow[i];
			let stop = timeWindow[i+1];
			
			// [)
			let dataPeriod = dataset.filter(d=>d.date>=start && d.date<stop);

			jerarquiaInstance.hierarchy.forEach(function(node){

				if(!node.children && filtroDeNose==="" || !node.children && node.name.toLowerCase()===filtroDeNose.toLowerCase()){// && node.name==="iran" //&& (node.name==="belgium" || node.name==="germany")
					//If node has not children => is leaf
					let dataInPeriod = dataPeriod.filter(d=>d.category.properties.name===node.name);

					let valueIndicator = 0;
					let text = [];
					let compo = [];
					let dataGeoJsonFeature = "";

					if(dataInPeriod.length>0){
	
						let agregatedByIndicator = fusionValues(dataInPeriod);
						let selectedIndicator = agregatedByIndicator[indexIndicator];

						// 1 
						// sumar por cada pais los indicadores a mostrar
						selectedIndicator.componentIndicator.forEach(function(d){
							// Sacar la suma solo de los subArrayIndicators (arraray) deseados por pais
							let sumByArrayComponent = 0;
							subArrayIndicators.forEach(function(index){
								sumByArrayComponent = sumByArrayComponent + d.arraray[index].value;
							});
							d.value = sumByArrayComponent; //valueByCountry
						});
						
						//
						// 2 la suma total de la suma anterior (anteior por pais)
						selectedIndicator.componentIndicator.forEach(function(d){
							valueIndicator = valueIndicator + d.value; //valueByCountry
						});
						selectedIndicator.valueIndicator = valueIndicator;
						
						dataGeoJsonFeature = dataInPeriod[0].category;
						compo = selectedIndicator.componentIndicator;

					
					}else {
						// console.log("NO HAY DATOS DE:",node.name);
					}

					//NUEVO ATTRIBUTO
					result_leaf_level.push({
						"date":start,
						"key":node.key,
						"category":node.name,
						"item":dataGeoJsonFeature,
						"value":valueIndicator,
						"components":compo,
						"text":text
					});
				}
			});

		}
	}
	
	// BUILDING leaf_level for superior levels
	jerarquiaInstance.hierarchy.forEach(function(node){
		if(node.children){
			// console.log("merging:",node.name);
			var fusion = mergingChildrenNuevo(node, node.children, result_leaf_level);
			result_leaf_level = result_leaf_level.concat(fusion);

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


	console.log(result_leaf_level)

	console.log("terminado acabado")
	return result_leaf_level;


}






function assignGlobalVariablesFromOpts(config){
	
	updateConfigTree(config.optsTree);

	updateConfigMultistream(config.optsMultistream);
	
	updateConfigMap(config.optsMap);
}

function updateConfigTree(optsTree){
		// "key_focus_list_outflow":key_focus_list_outflow,
		// "key_context_list_outflow":key_context_list_outflow,
		// "key_focus_list_inflow":key_focus_list_inflow,
		// "key_context_list_inflow":key_context_list_inflow
	updateHierarchy(optsTree.key_focus_list_outflow,optsTree.key_context_list_outflow,optsTree.key_focus_list_inflow,optsTree.key_context_list_inflow);
}

function updateConfigMap(optsMap){
	updateScaleTranslate(optsMap.scale,optsMap.translate);
}

function updateConfigMultistream(optsMultistream){


	barZoomLeft = new Date(optsMultistream.optsContext.timeIntervalBrushZoom[0]);
	barZoomRight = new Date(optsMultistream.optsContext.timeIntervalBrushZoom[1]);
	barNorLeft = new Date(optsMultistream.optsContext.timeIntervalBrushNormalLeft[0]);
	barDisLeft = new Date(optsMultistream.optsContext.timeIntervalBrushDistortionLeft[0]);
	barDisRight = new Date(optsMultistream.optsContext.timeIntervalBrushDistortionRight[1]);
	barNorRight = new Date(optsMultistream.optsContext.timeIntervalBrushNormalRight[1]);

	updateScaleDomainRangeBrushContext(barZoomLeft,barZoomRight,barNorLeft,barDisLeft,barDisRight,barNorRight);

	updateLocked(optsMultistream.optsContext.blockedBrushNormalLeft,optsMultistream.optsContext.blockedBrushNormalRight);

	updateOffsetType(optsMultistream.offsetType);

	let calcule = calculateRangeFocus(optsMultistream.facteurNor, optsMultistream.facteurDis, optsMultistream.facteurZoom);
	totalito(calcule);

	updateFlows();
	
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
	
	var result = Object.values(agrouped).map(function(groupedElements){
		if(groupedElements.length==1){
			return groupedElements[0];	
		}else{
			
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
			
			return {
				"type":groupedElements[0].type,
				"id":groupedElements[0].ide,
				"properties":groupedElements[0].properties,
				"geometry":groupedElements[0].geometry,
				"value":0,
				"arraray":mm
			};
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
			
			let tmp = [];
			element.forEach(function(d){
	 			d.componentIndicator.forEach(function(elem){
	 					tmp.push(elem);
	 			});
	 		});
	 		
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
		});
	});
	return groupIndicatorByName(tmp);
}

function load_d3(configurationPathFile) {

	setLoader(true);

	setTimeout(function(){ 
		
		// FILES PATHS
		let myGeoJSONPath = "source/refugees/geojson.json";
		let myHierarchyJSONPath = "source/refugees/hierarchy.json";
		let myRawDataPath = "source/refugees/data.csv";

		//let myConfiguration = "source/refugees/config.json";
		if(configurationPathFile==null){
			myConfiguration = "source/refugees/config.json";
		}else{
			myConfiguration = configurationPathFile;
		}

		d3.queue(4)
			.defer(d3.json,myHierarchyJSONPath)
			.defer(d3.json,myGeoJSONPath)
			.defer(d3.csv,myRawDataPath)
			.defer(d3.json,myConfiguration)
			.await(ready);
		
	},100);
	
}


function mono(jsonConfig) {

		//LOAD OPTS
		optsGeneral = jsonConfig.optsGeneral;
		optsMultistream = jsonConfig.optsMultistream;
		optsMultiresolution = jsonConfig.optsMultistream.optsMultiresolution;
		optsContext = jsonConfig.optsMultistream.optsContext;

		optsMap = jsonConfig.optsMap;
		optsTree = jsonConfig.optsTree;
	
		updateFlows();
}


function myFunction(){
	
	let selectedPopulations = getCheckedPopulationType();
	let variable = getVariableOption();
	kaka(timeWindow, variable, selectedPopulations);
	updateFlows();
}


function getVariableOption(){
	return document.getElementById("variables").value;
}

function getCheckedPopulationType() {
	let padre = document.getElementById("populationType");
	let ary = [];
	for(let i = 0; i<padre.getElementsByTagName("button").length;i++){
		let currElem = padre.getElementsByTagName("button")[i];
		let currElemText = currElem.innerHTML;
		if (!currElem.classList.contains("clicked")) {
			// console.log(currElem.getElementsByTagName("i").length);
			// let element = currElem.getElementsByTagName("i")[0];
			// element.parentNode.removeChild(element);
			// currElem.innerHTML = currElemText;
			ary.push(i);
		}else{
			//
			// currElem.innerHTML = " <i class='far fa-check-circle'></i> " + currElemText;
		}
	}
	return ary;
}

function colores_brewer(n){
	var colors = [
					"#ffff33" // jaune			
					,"#377eb8" // blue
					,"#e41a1c" // red
					,"#984ea3" // purple
					,"#ff7f00" // orange
					,"#4daf4a" // green
					,"#a65628"
					,"#f781bf"
				]
	
	return colors[n % colors.length];
}

var colores_d3 =  d3.scale.category10(); 