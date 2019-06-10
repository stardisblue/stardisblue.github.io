
// Map
var mapZoom = 2;
var map = L.map('map').setView([0, 0], mapZoom);

//var mapLeft = L.map('map-left').setView([0, 0], mapZoom);
//
//var mapRight = L.map('map-right').setView([0, 0], mapZoom);


// MapBox details
var mapboxAccessToken = "pk.eyJ1Ijoic3RlbmluamEiLCJhIjoiSjg5eTMtcyJ9.g_O2emQF6X9RV69ibEsaIw";
var mapLink = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
}).addTo(map);

//var mapLinkLeft = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
//    id: 'mapbox.light',
//}).addTo(mapLeft);
//
//var mapLinkRight = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
//    id: 'mapbox.light',
//}).addTo(mapRight);


//var mapLink = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//===============================================
//Create a SVG layer into the map
var svgLayer = L.svg();
	svgLayer.addTo(map);

//By default a G group is initialized on the created SVG	
var svgMap = d3.select("#map").select("svg");
var gMap = svgMap.select("g");
//===============================================

//
var group = L.layerGroup();

function drawAndUpdateCircles(feature) {
	feature.attr("transform",
	    function(d) {
	        var layerPoint = map.latLngToLayerPoint(d.country[0].geometry.centroid);
	        return "translate("+ layerPoint.x +","+ layerPoint.y +")";
	    }
	)
}


function drawPoints(data){
	
	console.log(data)
	
	//Join new data with the old elements
	var update = gMap.selectAll("circle")
					.data(data,function(d){ return d.country[0].properties.name;});
	
	//exit old elements
	var exit = update.exit().remove();
	
	var enter = update.enter()
					.append("circle")
					.style("stroke", "black")
				    .style("opacity", .4)
				    .style("fill", "blue")
				    .attr("r", function(d){return (d.value)/10000;});
	
	
	drawAndUpdateCircles(enter);
	//map.on("moveend", drawAndUpdateCircles());
}




function drawPointsLayer(data){
	
	var extent = d3.extent(data,d=>d.value);
	extent[0] = 1;
	var areaCircleScale = d3.scale.linear().domain(extent).range([extent[0], Math.sqrt(extent[1]/Math.PI)]).clamp(true);
	var factor = 1000;
	
	group.clearLayers();
	data.forEach(function(d){
		var entity = d.item[0];
		var center = entity.geometry.centroidLatLng;
		var point = L.circle(center,{
			stroke:false,
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5,
			radius: factor * areaCircleScale(d.value)
		});
		console.log("Country: " + entity.properties.name + " value: " + d.value)
		point.bindPopup("Country: " + entity.properties.name + " value: " + toolTipFormat(d.value));
		group.addLayer(point);
		
	})
	group.addTo(map);
	console.log("---------------------------------------------------------------")
}


function drawPoligonsLayer(data){
	
	//sort ascending
	data.sort(function (a, b) {
		  if (a.value > b.value) {
			    return 1;
			  }
			  if (a.value < b.value) {
			    return -1;
			  }
			  return 0;
			});
	
	//console.log(data)
	
	//var extent = d3.extent(data,d=>d.value);
	var extent = [data[0].value, data[data.length-1].value]; 
	
	//var color = d3.scale.linear().domain(extent).range([d3.rgb("#f7fbff"), d3.rgb('#08306b')]).clamp(true);
//	 var color = d3.scale.threshold()
//					     .domain([1, 200, 1000, 2000, 5000, 10000, 20000, 40000, 50000])
//					     .range(["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"]);
	
	 
	 var color = d3.scale.quantile()
	    .domain(extent)
	    //.range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));
	    //.range([d3.rgb("#eff3ff"), d3.rgb('#bdd7e7'), d3.rgb("#6baed6"), d3.rgb("#2171b5")]);
	    .range([ d3.rgb("#c6dbef"), d3.rgb("#9ecae1"), d3.rgb("#6baed6"), d3.rgb("#4292c6"), d3.rgb("#2171b5"), d3.rgb("#08519c"), d3.rgb("#08306b")]);
	 	//d3.rgb("#f7fbff"), d3.rgb("#deebf7"),
	 
	 
//	 color = d3.scale.linear().domain([1,length])
//     .interpolate(d3.interpolateHcl)
//     .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]);
	 
	 //V4
//	 var color = d3.scaleQuantize()
//					    .domain([1, 10])
//					    .range(d3.schemeBlues[9])
//	    
//	 var color = d3.scale.threshold()
//					    .domain([0.02, 0.04, 0.06, 0.08, 0.10])
//					    .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);   
	
//	console.log("=======================================================")
//	console.log("=======================================================")
//	console.log("=======================================================")
	group.clearLayers();
	data.forEach(function(d){
		var entity = d.item[0];
		var coordinates = entity.geometry.coordinates;
		
		var polygonTmp = L.polygon(coordinates).toGeoJSON();
		var point = L.polygon(polygonTmp.geometry.coordinates,{
			stroke:false,
			color: "white",
			fillColor: color(d.value), //colorPolygonLayer(d.value),
			fillOpacity: 0.7,
		});
		//console.log("Country: " + entity.properties.name + " value: " + (d.value))
		point.bindPopup("Country: " + entity.properties.name + " value: " + toolTipFormat(d.value));
		group.addLayer(point);
	})
	
	group.addTo(map);
	group.openPopup();
	
//	console.log("=======================================================")
//	console.log("=======================================================")
//	console.log("=======================================================")
//	console.log("=======================================================")
}


//function drawDataIntoMap (data, from, to){
//	var join = [];
//	data.filter(d=>d.date>=from && d.date<=to).forEach(function(item){
//											join = join.concat(item.components);
//										});
//	drawPoligonsLayer(groupBy(join,"name"));
//}

function removeLayersInMap(){
	group.clearLayers();
}




