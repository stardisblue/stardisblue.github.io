//create SVG


var marginComparisonVis,
    heightComparisonVis,
    widthComparisonVis;

var svgComparisonVis;
var comparison;

var arrayDataLineFlow = [];

//scales and axis
var yScaleComparison = d3.scale.linear();
var yAxisComparison = d3.svg.axis().scale(yScaleComparison)
							.tickSize(5, 0)
							.tickPadding(5)
							.ticks(4)
							.tickFormat(customNumberFormat)
							.orient("left");


var xScaleComparison = d3.time.scale().clamp(true);
var xAxisComparison = d3.svg.axis().scale(xScaleComparison)
                        .tickSize(5, 0) 
                        .tickPadding(5)
                        .ticks(5)
                        .orient("bottom");


//
var lineFlow = d3.svg.line()
                .x(function(d) {return xScaleComparison(d.date); })
                .y(function(d) {return yScaleComparison(d.y); })
                .defined(d=>{return d.date>=brushContext.extent()[0] && d.date<=brushContext.extent()[1];})
                .interpolate("monotone");


function loadCompareVis(){
    createSvgComparison();

    //displayLineFlow();
}


function createSvgComparison(){

    let svgWidthTotal = multistreamVisWidth;
    let svgHeightTotal = 150;


    marginComparisonVis = {top:20,right:10,bottom:35,left:60};
    heightComparisonVis = svgHeightTotal - marginComparisonVis.top - marginComparisonVis.bottom;
    widthComparisonVis = svgWidthTotal - marginComparisonVis.left - marginComparisonVis.right;


    svgComparisonVis = d3.select("body").select("#svg-comparison-vis")
                        .attr("xmlns","http://www.w3.org/2000/svg")
                        .attr("xlink","http://www.w3.org/1999/xlink")
                        .attr("svg","http://www.w3.org/2000/svg")
                        .attr("version","1")
                        .attr("width",svgWidthTotal)
                        .attr("height", svgHeightTotal);

    comparison = svgComparisonVis.append("g")
                        .attr("id","comparison")
                        .attr("class","comparison")
                        .attr("transform","translate("+marginComparisonVis.left+","+marginComparisonVis.top+")");


    comparison.append("rect")
                .attr("id","comparisonBackground")
                .attr("class","background")
                .attr("width",widthComparisonVis)
                .attr("height",heightComparisonVis);

    comparison.append("g")
                .attr("id","linesInComparison");


    //Setting output Ranges on Scale
    yScaleComparison.range([heightComparisonVis,0]);
    xScaleComparison.range([ 0, widthComparisonVis]);
    
    //Append axis
    comparison.append("g")
                .attr("class", "x axis comparison")
                .attr("transform","translate(0," + heightComparisonVis + ")");

    comparison.append("g")
                .attr("class", "y axis comparison")
                .attr("transform","translate(0,0)");

}


function updateGraphComparision(currData){

    if(typeof currData != 'undefined'){
        let indexInArrayData = arrayDataLineFlow.map(d=>d.key).indexOf(currData.key);
        if(indexInArrayData!=-1){
            arrayDataLineFlow.splice(indexInArrayData, 1);
        }else{
            arrayDataLineFlow.push(currData);
        }
    }

    if(arrayDataLineFlow.length>0){
        updateLineFlows(arrayDataLineFlow);
    }
}

function updateLineFlows(arrayData){

    //Update the Input domain on the yScale
    yScaleComparison.domain([0,d3.max(arrayData,(array)=>{return d3.max(array.values,(d)=>{return d.y;});})]);
    comparison.select(".y.axis.comparison").call(yAxisComparison);

    //Update the Input domain on the xScale
    xScaleComparison.domain(brushContext.extent());
    comparison.select(".x.axis.comparison").call(xAxisComparison);

    let lineFlows = comparison.select("#linesInComparison")
                                        .selectAll(".lineFlow")
                                        .data(arrayData,d=>d.key);
    
    //update
    lineFlows.attr("d", d=>{ return lineFlow(d.values);})
                .style({
                        "fill" : "none",
                        "stroke" : d=> {return d.color;},
                        "opacity":1
                    });

    //enter
    lineFlows.enter().append("path")
                        .attr("id",d=>{return "line_"+d.key;})
                        .attr("class","lineFlow")
                        .attr("d", d=> {return lineFlow(d.values);})
                        // .on("mouseover",ratonOverLine)
                        // .on("mouseout",ratonOutLine)
                        .style({
                                "fill" : "none",
                                "stroke" : d=> {return d.color;},
                                "opacity":1
                        });

    //exit
    lineFlows.exit().remove();
                       
}

function ratonOverLine(selectedFlow){
    // d3.select(this).style("stroke-width",5);
    comparison.select("#linesInComparison").selectAll(".lineFlow") 	
                    .style({
                            "stroke-width":function(d){
                                return (selectedFlow.key == d.key ? 5: 1);
                            }
                    });	
}

function ratonOutLine(){
    // d3.select(this).style("stroke-width",1);
    comparison.select("#linesInComparison").selectAll(".lineFlow") 
                    .style({
                        "stroke-width":1
                    });	
}