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

function createTopKBarchart(){

	let barchart_wrapper_width = mapVisWidth/2; //2 // mapVisWidth/2;
	let barchart_wrapper_height = mapVisHeight/3; //4//250	
	
	gBarchartMap.attr("class","smallMultiple")
			.attr("transform","translate("+ 0 +","+ (mapVisHeight - barchart_wrapper_height) + ")");

	gBarchartMap.append("rect")
				.attr("class",'background')
				.attr("rx",8)
				.attr("ry",8)
				.attr("width",barchart_wrapper_width)
				.attr("height",barchart_wrapper_height); 
 

	marginBarchartMap = {top:40,right:30,bottom:50,left:40};
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
			.attr("class","label")
			.attr("x",0-barchart_wrapper_height/2)
			.attr("y",marginBarchartMap.left/2)
			.attr("transform","rotate(-90)")
			.text("Countries");

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

	//Append axis |__
	barchartTopK.append("g")
				.attr("class","x axis")
				.attr("transform","translate(0,"+heightBarchartMap+")");		

	barchartTopK.append("g")
				.attr("class","y axis")
				.attr("transform","translate(0,0)");

	setMapBarchartVisibility(false);

}

function updateTopKBarsInChart(currData){

	//Update the input domain on the xScale
	xScaleBarchart.domain([0,d3.max(currData,d=>d.value)]);
	barchartTopK.select(".x.axis").call(xAxisBarchart);
	
	let axisGridDivisionBottom = d3.svg.axis().scale(xScaleBarchart)
										.tickSize(-heightBarchartMap, 0) 
										.ticks(4)
										.tickFormat("")
										.orient("bottom");
	barchartTopK.select(".x.grid").call(axisGridDivisionBottom);

	//Update the input domain on the yScale
	yScaleBarchart.domain(currData.map(d=>d.properties.name));
	barchartTopK.select(".y.axis").call(yAxisBarchart)
					.selectAll("text")
					.attr("dx", "0.5em")
					.attr("dy", getRemFromPx(yScaleBarchart.rangeBand()))
					.style({
						"alignment-baseline":"central", //only for text
						"text-anchor": "start"
					});
	
	let bars = barchartTopK.select("#barsInBarchart")
							.selectAll(".barsTopK")
							.data(currData,d=>d.properties.name);
	
	//update
	bars.attr("class",'barsTopK')
			.attr('y', d=> yScaleBarchart(d.properties.name))
			.attr('x', 0)
			.attr('width', d=> xScaleBarchart(d.value))
			.attr("height",yScaleBarchart.rangeBand());

	//enter
	bars.enter()
		.append('rect')
		.attr("class",'barsTopK')
				.attr('y', d => yScaleBarchart(d.properties.name))
				.attr('x', 0)
				.attr('width', d => xScaleBarchart(d.value))
				.attr("height",yScaleBarchart.rangeBand());
	//exit
	bars.exit().remove();

}