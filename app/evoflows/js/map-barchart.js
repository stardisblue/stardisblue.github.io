var marginBarchartMap;
var heightBarchartMap;
var widthBarchartMap;

var barchartTopK;

//scales and axis
var yScaleBarchart = d3.scale.ordinal();
var yAxisBarchart = d3.svg.axis().scale(yScaleBarchart)
						.tickSize(0, 0) 
						// .ticks(4)
						.orient("left");

var xScaleBarchart = d3.scale.linear();
var xAxisBarchart = d3.svg.axis().scale(xScaleBarchart)
						.tickSize(5, 0) 
						.ticks(4)
						.tickFormat(customNumberFormat)
						.orient("bottom");

//test para la animacion
var xScaleBarchartBefore = d3.scale.linear();		

function createTopKBarchart(){

	let barchart_wrapper_width = mapVisWidth*0.7;
	let barchart_wrapper_height = mapVisHeight*0.4;
	
	gBarchartMap.attr("class","smallMultiple")
			.attr("transform","translate("+ 0 +","+ (mapVisHeight - barchart_wrapper_height) + ")");

	gBarchartMap.append("rect")
				.attr("class",'background')
				.attr("rx",8)
				.attr("ry",8)
				.attr("width",barchart_wrapper_width)
				.attr("height",barchart_wrapper_height); 
 

	marginBarchartMap = {top:55,right:45,bottom:55,left:barchart_wrapper_width*0.25};
	heightBarchartMap = barchart_wrapper_height - marginBarchartMap.top - marginBarchartMap.bottom;
	widthBarchartMap = barchart_wrapper_width - marginBarchartMap.left - marginBarchartMap.right;

	//title
	gBarchartMap.append("text")
			.attr("id","barchart-map-title")
			.attr("class","title")
			.attr("dy","0.5em")	
			.attr("x",barchart_wrapper_width / 2)
			.attr("y", marginBarchartMap.top/2);
	
	//y axis label
	gBarchartMap.append("text")
			.attr({
				"class":"label",
				"x":0-barchart_wrapper_height/2, //This Y
				"y":20, //This X
				"transform":"rotate(-90)"
			})
			.style({
				"alignment-baseline":"central", //vertical only for text
				"text-anchor": "middle"
			})
			.text("Regions");

	//x axis label
	gBarchartMap.append("text")
			.attr("class","label")
			.attr("x",marginBarchartMap.left+widthBarchartMap/2)
			.attr("y",barchart_wrapper_height - marginBarchartMap.bottom/2)
			.attr("dy","1.3em")	
			.text("Num. "+ dataType);

	barchartTopK = gBarchartMap.append("g")
							.attr("id","barchartTopK")
							.attr("class","barchart")
							.attr("transform","translate("+(marginBarchartMap.left)+","+(marginBarchartMap.top)+")");

	//Append axis grid ||||						
	barchartTopK.append("g").attr("class","x grid")
							.attr("transform","translate(0,"+heightBarchartMap+")");

	barchartTopK.append("g").attr("id","barsInBarchart");

	xScaleBarchart.range([0,widthBarchartMap]);
	yScaleBarchart.rangeRoundBands([heightBarchartMap,0], 0.5);

	//To get animation from previous state
	xScaleBarchartBefore.range([0,widthBarchartMap]);

	//Append axis |__
	barchartTopK.append("g")
				.attr("class","x axis")
				.attr("transform","translate(0,"+heightBarchartMap+")");		

	barchartTopK.append("g")
				.attr("class","y axis")
				.attr("transform","translate(0,0)");

	setMapBarchartVisibility(false);

}

var ancienData = [];


//if value === 0 then opacity 0; otherwise 1
let fill_opacity_value_bars = function(d){
	if(d.value==0){
		return 1e-6;
	}
	return 1;	
};

function updateTopKBarsInChart(currData,durationAnimation){

	let sizeCurrData = currData.length;
	if(sizeCurrData!=topKBarchart){
		let nElementosToAdd = (topKBarchart-sizeCurrData);
		for(let i=0;i<nElementosToAdd;i++){
			let emptyElement = {
				"properties": {"name": i},
				"value": "",
				"valueBefore": ""
			};
			currData.push(emptyElement);
		}
	}

	currData.sort(function(a,b){return a.value-b.value;});

	//Update the input domain on the xScale
	xScaleBarchart.domain([0,d3.max(currData,d=>d.value)]);
	//para animacion
	xScaleBarchartBefore.domain([0,d3.max(ancienData,d=>d.value)]);
	//
	barchartTopK.select(".x.axis").transition().duration(durationAnimation).call(xAxisBarchart);
	
	let axisGridDivisionBottom = d3.svg.axis().scale(xScaleBarchart)
										.tickSize(-heightBarchartMap, 0) 
										.ticks(4) //comment faire automatic?
										.tickFormat("");
	barchartTopK.select(".x.grid")
			.transition().duration(durationAnimation).call(axisGridDivisionBottom);

	yScaleBarchart.domain(currData.map(d=>d.properties.name));

	barchartTopK.select(".y.axis")
			.transition().duration(durationAnimation).call(yAxisBarchart)
					.selectAll("text")
					.attr("dx", "-0.5em")
					// .attr("dy", getRemFromPx(yScaleBarchart.rangeBand()))
					.style({
						"text-anchor": "end",
						"fill-opacity": (d)=>{
							if(!isNaN(d)){
								return 1e-6;
							}
							return 1;
						}
					});

	let bars = barchartTopK.select("#barsInBarchart")
							.selectAll(".barsTopK")
							.data(currData,d=>d.properties.name);
	

	//exit
	bars.exit()
		.style({
			"opacity":1
		})
	  .transition().duration(durationAnimation)
		.style({
			"opacity":0
		})
		.remove();

	//update
	bars.attr({
			"width": d=> xScaleBarchartBefore(d.valueBefore),
		})
		.style({
			// "fill":d=>d.color,
			"fill":d=>scaleMapChoroplethBefore(d.valueBefore),
			"fill-opacity":1
		})
	  .transition().duration(durationAnimation)
		.attr({
			"class":'barsTopK',
			"y": d=> yScaleBarchart(d.properties.name),
			"x": 0,
			"width": d=> xScaleBarchart(d.value),
			"height": yScaleBarchart.rangeBand()
		})
		.style({
			// "fill":d=>d.color,
			"fill":d=>scaleMapChoropleth(d.value),
			"fill-opacity": 1
		});

	//enter
	bars.enter().append('rect')
		.attr({
			"class":'barsTopK',
			'y': d => yScaleBarchart(d.properties.name),
			'x': 0,
			'width': d => xScaleBarchart(d.value),
			"height":yScaleBarchart.rangeBand()
		})
		.style({
			// "fill":d=>d.color,
			"fill":d=>scaleMapChoropleth(d.value),
			"fill-opacity": 1e-6,
		})
	  .transition().duration(durationAnimation)
		.style({
			// "fill":d=>d.color,
			"fill":d=>scaleMapChoropleth(d.value),
			"fill-opacity": 1
		});
		   

	//****
	//TEXT
	//****
	let barsValuesText = barchartTopK.select("#barsInBarchart")
							.selectAll(".barsValuesTextTopK")
							.data(currData,d=>d.properties.name);
	//exit
	barsValuesText.exit()
		.style({
			"opacity":1
		})
	  .transition().duration(durationAnimation)
		.style({
			"opacity":0
		})
		.remove();

	//update
	barsValuesText.attr({
			"x": d=> xScaleBarchartBefore(d.valueBefore)
		})
		.style({
			"fill-opacity":d=>fill_opacity_value_bars(d),
			"alignment-baseline": "central"
		})
	  .transition().duration(durationAnimation)
		.attr({
			"y": (d)=>{
				return yScaleBarchart(d.properties.name)+yScaleBarchart.rangeBand()/2;
			},
			"x": d => xScaleBarchart(d.value)
		})
		.text(d=>customNumberFormat(d.value))
		.style({
			"fill-opacity":d=>fill_opacity_value_bars(d),
			"alignment-baseline": "central"
		});

	//enter
	barsValuesText.enter().append('text')
		.attr("class",'barsValuesTextTopK')
		.attr("y", (d)=>{
			return yScaleBarchart(d.properties.name)+yScaleBarchart.rangeBand()/2;
		})
		.attr('x', d => xScaleBarchart(d.value))
		.text(d=>customNumberFormat(d.value))
		.style({
			"fill-opacity":d=>fill_opacity_value_bars(d),
			"alignment-baseline": "central"
		})
	  .transition().duration(durationAnimation)
	  	.style({
			"fill-opacity":d=>fill_opacity_value_bars(d),
			"alignment-baseline": "central"
		});

	// ancienData = currData.filter(d=>isNaN(d.properties.name));

}


