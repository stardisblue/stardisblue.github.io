let d3 = require('d3'); //npm install d3@3.5.17
let chroma = require('chroma-js'); //npm install chorma-js
const jerarquia = require('./jerarquia');

function getTimeWindow(start, stop, polaridad, step){
    //step :  (every N minutes/hours/days/months or years)
    let timeWindow; 
    switch(polaridad.toLowerCase()){
        case "m":
            timeWindow = d3.time.minutes(start, stop, step);
            break;
        case "h":
            timeWindow = d3.time.hours(start, stop, step);
            break;
        case "d":
            timeWindow = d3.time.days(start, stop, step);
            break;
        case "b":
            timeWindow = d3.time.months(start, stop, step);
            break;
        case "y":
            timeWindow = d3.time.years(start, stop, step);
            break;
        default:
            console.log("polarity problem");
            break;
    }
    return timeWindow;
}


//interval.offset(date, step)
function getTimeOffset(start, offset, polaridad){
	let timeOffset; 
	switch(polaridad.toLowerCase()){
		case "m":
			timeOffset = d3.time.minute.offset(start, offset);
			break;
		case "h":
			timeOffset = d3.time.hour.offset(start, offset);
			break;
		case "d":
			timeOffset = d3.time.day.offset(start, offset);
			break;
		case "b":
			timeOffset = d3.time.month.offset(start, offset);
			break;
		case "y":
			timeOffset = d3.time.year.offset(start, offset);
			break;
		default:
			console.log("getTimeOffset");
			break;
	}
	return timeOffset;
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
		d.value = 0;
	});
}

function getPreproData (rawDataHierarchy,rawData,rawGeoJson,stepTemporal,polarityTemporal){

	let hierarchy = jerarquia.getHierarchy(rawDataHierarchy);

	let dataset = [];
	geoJson = rawGeoJson;

	//PREPROCESSING
	preProcessingRawData(rawData);
	preProcessingGeoJSON(rawGeoJson);

	let categoriesIntoGeoJson = rawGeoJson.features.map(d=>d.properties.name);

	let categoriesOriginRawData = d3.nest().key(function(d) {return d;}).entries(rawData.map(d=>d.origin)).map(d=>d.key);
	let categoriesDestinationRawData = d3.nest().key(function(d) {return d;}).entries(rawData.map(d=>d.destination)).map(d=>d.key);

	let categoriesIntoRawData = d3.nest().key(function(d) {return d;}).entries(categoriesOriginRawData.concat(categoriesDestinationRawData)).map(d=>d.key);

	
	//RAWDATA == GEOJSON == HIERARCHY COUNTRIES

	countries = categoriesIntoRawData.filter(function(entity){
											if(categoriesIntoGeoJson.indexOf(entity)!=-1){
												return entity;
											}else{
												console.log("Exist in RAW data but not in the GeoJson:",entity);
											}
										});


	let yearsExtent = d3.extent(rawData,d=>d.year);
	let years = [];
	for(let year = yearsExtent[0]; year<=yearsExtent[1]+1; year++){
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
					countries.map(function(currCountry){
						// OUTFLOW - OUTGOING
						let outflows = []; 
						byYear.filter(d=>d.origin==currCountry).forEach(function(item){
							let countryWithFeatures = rawGeoJson.features.filter(d=>d.properties.name == item.destination);
							if(countryWithFeatures.length==1){
								outflows.push({
									"name":countryWithFeatures[0].properties.name,
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
						let inflows = [];
						byYear.filter(d=>d.destination==currCountry).forEach(function(item){
							let countryWithFeatures = rawGeoJson.features.filter(d=>d.properties.name == item.origin);
							if(countryWithFeatures.length==1){
								inflows.push({
									"name":countryWithFeatures[0].properties.name,
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
							"indicator" : "outflow",
							"components" : outflows
						});
						indicators.push({
							"indicator" : "inflow",
							"components" : inflows
						});	
						return {
							"country":rawGeoJson.features.filter(d=>d.properties.name == currCountry)[0],
							"indicators" : indicators
						};
					})
		};
		
	});
	
	parserToDataset.forEach(function(parser){
		parser.values.forEach(function(d){
			dataset.push({
				"date" : parser.date,
				"country" : d.country,
				"indicators" : d.indicators
			});
		});
	});


	var start = new Date(years[0],0);
	var stop = getTimeOffset(new Date(years[years.length-1],0), 2*stepTemporal, polarityTemporal);
	timeWindow = getTimeWindow(start,stop,polarityTemporal,stepTemporal);


	let arraySubIndicators = [0];

	let leaf_level_outflow =  splitTimeWindow(timeWindow, dataset, 0, arraySubIndicators, hierarchy);
	let leaf_level_inflow = splitTimeWindow(timeWindow, dataset, 1, arraySubIndicators, hierarchy);

	return {"outflows":leaf_level_outflow,
			"inflows":leaf_level_inflow};
	
}


function splitTimeWindow(timeWindow, dataset, indexIndicator, subArrayIndicators, jerarquiaInstance){

	let result_leaf_level = [];

	// for each time step in the time window
	for (let i = 0; i < timeWindow.length; i++) {
		if((i+1) < timeWindow.length){
			let start = timeWindow[i];
			let stop = timeWindow[i+1];
			
			// [)
			let dataPeriod = dataset.filter(d=>d.date>=start && d.date<stop);

			jerarquiaInstance.forEach(function(node){

				if(!node.children){
					//If node has not children => it is a leaf node
					let dataInPeriod = dataPeriod.filter(d=>d.country.properties.name===node.name);

					let valueIndicator = 0;
					let components = [];

					if(dataInPeriod.length>0){
	
						let agregatedByIndicator = fusionValuesByIndicator(dataInPeriod);

						//indexIndicator : 0 outflow, 1 inflow
						let selectedIndicator = agregatedByIndicator[indexIndicator];

						// 1 
						// sumar por cada pais los indicadores a mostrar
						selectedIndicator.components.forEach(function(d){
							// Sacar la suma solo de los subArrayIndicators (arraray) deseados por pais
							let sumByArrayComponent = 0;
							subArrayIndicators.forEach(function(index){
								sumByArrayComponent = sumByArrayComponent + d.arraray[index].value;
							});
							d.value = sumByArrayComponent; //valueByCountry
						});
						
						//
						// 2 la suma total de la suma anterior (anteior por pais)
						selectedIndicator.components.forEach(function(d){
							valueIndicator = valueIndicator + d.value;
						});
						selectedIndicator.valueIndicator = valueIndicator;
						
						components = selectedIndicator.components;
					
					}else {
						// console.log("NO HAY DATOS DE:",node.name);
					}

					//NUEVO ATTRIBUTO
					result_leaf_level.push({
						"date":start,
						"key":node.key,
						"category":node.name,
						"value":valueIndicator,
						"components":components
					});
				}
			});
		}
	}

	// BUILDING leaf_level for superior levels
	jerarquiaInstance.forEach(function(node){
		if(node.children){
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


	//Change the arraray=["refug":4,"":9..]
	//to arraray=[4,9,..]
	result_leaf_level.forEach(d=>{
			let losComponentes = [];
			d.components.forEach(c=>{
				losComponentes.push({
					"name":c.name,
					"arraray":c.arraray.map(a=>a.value)
				});
			});
			d.components = losComponentes;
		});

	return result_leaf_level;

}




//MERGIN DANS LA HIERARCHY DE ABAJO HACIA ARRIBA
function mergingChildrenNuevo (father, children, my_leaf_level){
	let fusion = [];

	children.forEach((child)=>{
		let value = 0;
		let components = [];
		
		let ds_child_by_date = my_leaf_level.filter((leaf)=>{
			return leaf.key == child.key;
		});
				
		//ds_child has all child time period 1960,1961,...
		if(ds_child_by_date.length>0){
			for(let indexDate = 0; indexDate < ds_child_by_date.length; indexDate++) {
				if(!fusion[indexDate]){
					value = ds_child_by_date[indexDate].value;
					components = ds_child_by_date[indexDate].components;
				}else{
					value = fusion[indexDate].value + ds_child_by_date[indexDate].value;
					components = fusion[indexDate].components.concat(ds_child_by_date[indexDate].components);
				}
				
				let res = {
					"date":ds_child_by_date[indexDate].date,
					"key":father.key,
					"category":father.name,
					"value":value,
					"components":groupComponentTypeByName(components)
				};	

				fusion[indexDate] = res;	
			}
		}
		
	});

	return fusion;
}


function groupComponentTypeByName(arrayComponents){
	var agrouped = arrayComponents.reduce(function (acc, obj) {
		var cle = obj["name"];
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
				});
			});
			// console.log(tmp)
			let groupeArraray = tmp.reduce(function (acc, obj) {
				let cle = obj.item;
				if(!acc[cle]){
					acc[cle] = [];
				}
				acc[cle].push(obj);
				return acc;
			}, {});
			let types = Object.values(groupeArraray).map(function(gg){
				return{
					"item":gg[0].item,
					"value": gg.reduce(function (acc, curr) {
						return acc + curr.value;
					}, 0)
				};
			});

			return {
				"name":groupedElements[0].name,
				"arraray":types
			};
		}
	});
	
	return result;
}

function groupIndicatorByName(arrayIndicators){

	var agrouped = arrayIndicators.reduce(function (acc, obj) {
		var cle = obj.indicator;
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
	 			d.components.forEach(function(elem){
					tmp.push(elem);
	 			});
	 		});
	 		
			let nameIndicator = element[0].indicator;
			let componentIndicator = groupComponentTypeByName(tmp);
			
			//
			return {
				"indicator": nameIndicator,
				"components":componentIndicator
			};
		}
	});

	return result;
}

//Indicator : inflow, outflow
function fusionValuesByIndicator(arrayObjets){
	var tmp = [];
	arrayObjets.forEach(function(d){
		d.indicators.forEach(function(indicator){
			tmp.push(indicator);
		});
	});
	return groupIndicatorByName(tmp);
}


module.exports.getPreproData = getPreproData;
