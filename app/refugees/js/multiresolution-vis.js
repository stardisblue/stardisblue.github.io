var opts = {
	log : false,
	animation: true,
	//
	fadingColors: false,
	fadingColorsFactor: 1.15, //brightness of fadingColor
	//
	limitRanges: false,
	//
	outlineLayers: false,
	outlineLayersColor: "#585858", //if outlineLayer(up) true Black grey
	//
	//Initial time steps
	factBrushContext : 4, // 4 time-step
	factBrushFisheye : 1, // 3 time-step
	factBrushNormal : 5, // time-step NOT USED
	//
	constanteL : 0, //constant for Left distortion
	constanteR: 0, //constant for right distortion
	facteurZoom : 4, // alpha
	facteurDis : 2, // beta
	facteurNor : 1, // gamma
	//
	//Min time steps in areas
	minIntervalNormal : 1,
	minIntervalDis : 1,
	minIntervalZoom : 1,
	//
	minInputValue : 1,
	maxInputValue : 800,
	stepInputValue : 1,
	//
	//
	//
	//OPACITY
	opacityFlowFocusSelected : 1,
	opacityFlowFocusDeselected : 0.20, //
	opacityTextLabel : 1,
	opacityTextLabelSelected : 1,
	opacityTextLabelDeselected : 0.25,
	strokeWidth : 2, //1.7
	//
	//
	tooltipTransitionMouseMove : 1,
	tooltipTransitionMouseOut : 1,
	//
	//
	//
	minSizeTextLabel : 20,//20 Minimum label size of text in label flow
	maxSizeTextLabel : 35,//35 Maximum label size of text in label flow
	patternTextFont : "10px Sans-Serif", //not used in path background
	labelTextFont : "Arial",
	toleranceTextLabel : 1,
	//
	//
	x_axis_label_context : "",
	pathCandadoOpen: ".\\img\\icon_lock_open.svg",
	pathCandadoClose: ".\\img\\icon_lock_close.svg",
	//
	//
	//
	//INTERPOLATIONS options
	// basis-open vertical-ruler implementado pero no texto, y el grid en interseccioes no es bueno, 
			//SI more readeble
			//NON vertical ruler in interpolation parts between focus and detaile not in the same grid
			//NON center text label in layers
	// cardinal-open 
			//SI vertical ruler in the same line
			//SI text label in layers
			//NON distortion propia de la interpolacion ya que pasa por los puntos
	interpolateType : "cardinal-open",//basis-open WORKS, cardinal-open works ALL
	// Sets the interpolation mode to the specified string or function
	//		linear - piecewise linear segments, as in a polyline.
	//		linear-closed - close the linear segments to form a polygon.
	//		step-before - alternate between vertical and horizontal segments, as in a step function.
	//		step-after - alternate between horizontal and vertical segments, as in a step function.
	//		basis - a B-spline, with control point duplication on the ends.
	//		basis-open - an open B-spline; may not intersect the start or end.
	//		basis-closed - a closed B-spline, as in a loop.
	//		bundle - equivalent to basis, except the tension parameter is used to straighten the spline.
	//		cardinal - a Cardinal spline, with control point duplication on the ends.
	//		cardinal-open - an open Cardinal spline; may not intersect the start or end, but will intersect other control points.
	//		cardinal-closed - a closed Cardinal spline, as in a loop.
	//		monotone - cubic interpolation that preserves monotonicity in y.
	//
	//
	//TRANSITION options
	//
	durationTransition : 300,// 1500,
	durationTransitionAnimation : 10, //Instantane
	durationTransitionMoveFlow : 350,
	durationTransitionRectaLine : 300, //500,
	ease : "cubic",//transition
	//		linear - the identity function, t.
	//		poly(k) - raises t to the specified power k (e.g., 3).
	//		quad - equivalent to poly(2).
	//		cubic - equivalent to poly(3).
	//		sin - applies the trigonometric function sin.
	//		exp - raises 2 to a power based on t.
	//		circle - the quarter circle.
	//		elastic(a, p) - simulates an elastic band; may extend slightly beyond 0 and 1.
	//		back(s) - simulates backing into a parking space.
	//		bounce - simulates a bouncy collision
	//
	//	Extend modes : ex sin-in-out, etc.
	//		in - the identity function.
	//		out - reverses the easing direction to [1,0].
	//		in-out - copies and mirrors the easing function from [0,.5] and [.5,1].
	//		out-in - copies and mirrors the easing function from [1,.5] and [.5,0].
	//
	//
	//
	// STACKED layout options
	offsetType : "silhouette",
	// Sets the stack offset algorithm to the specified value, Algorithms: 
	//		silhouette - center the stream, as in ThemeRiver.
	//		wiggle - minimize weighted change in slope. //Comprobado Doesnt work, number of range in detail area change the wiggle
	//		expand - normalize layers to fill the range [0,1].
	//		zero - use a zero baseline, i.e., the y-axis.
	//
	orderType : "inside-out",
	// Sets the stack order to the specified value. If order is not specified, returns the current order
	//		inside-out - sort by index of maximum value, then use balanced weighting.
	//		reverse - reverse the input layer order.
	//		default - use the input layer order.		
	
	// AXIS TickFormat
	yAxisFocusTickFormat : ".2s"
		
}

var errorProjection = false;
var blocage = false;
var rangesDomainFocus; 
var svg_multiresolution_vis; 
var tooltip;
	

var nest_by_key = d3.nest().key(function(d) {return d.key}); //Group by key
var stack = d3.layout.stack()
				.offset(opts.offsetType)
				.order(orderTest)
				.values(function(d) {return d.values;})
				.x(function(d) {return d.date;})
				.y(function(d) {return d.value;});

function orderTest(data) {
	  return d3.range(data.length);
	}

//Lineal scale to normalize text label
var scaleTextLabel;					
					
/* FOCUS */
var focus;
var yScaleFocus; 
var yAxisFocus;
var scalesFocus = []; 
var axisFocus = [];
var color;

/* CONTEXT */
var areaContext = d3.svg.area()
					.interpolate(opts.interpolateType)
					.x(function(d) { return xScaleContext(d.date);})
					.y0(function(d) {return yScaleContext(d.y0);})
					.y1(function(d) {return yScaleContext(d.y0 + d.y);}); 

//Define the line
var valueline = d3.svg.line()
					.interpolate(opts.interpolateType)
					.x(function(d) {return scalesFocus[selectAxisFocus(d.date)](d.date);})
					.y(function(d) {return yScaleFocus(d.y);});


var flowContext; 
var context;
var xScaleContext;
var xScaleContextDisLeft;
var xScaleContextNorLeft; 
var xScaleContextDisRight; 
var xScaleContextNorRight;
var yScaleContext; 
var xAxisContext; 
var yAxisContext; 
var brushContext;
var brushContextDisLeft; 
var brushContextNorLeft; 
var brushContextDisRight; 
var brushContextNorRight;

var beginContext;

//number of minutes in interval
var nNorLeft; 
var nDisLeft; 
var nZoom; 
var nDisRight; 
var nNorRight; 
var nTotal;

//Proportions
var pNorLeft; 
var pDisLeft; 
var pZoom; 
var pDisRight; 
var pNorRight; 
var pTotal;

//size
var sNorLeft; 
var sDisLeft; 
var sZoom; 
var sDisRight; 
var sNorRight;

//intervals
var iNorLeft; 
var iZoom; 
var iNorRight;
//var dateExtRange; 
//var dateMinRange; 
//var dateMaxRange; 
//var timeWindow;

var patternFocusFond;
var gradientFocusRight; 
var gradientFocusRightStroke; 
var gradientFocusLeft; 
var gradientFocusLeftStroke;

// MARGINS
var marginFocus;
var marginContext;
var widthIntern;
var heightFocus;
var heightContext;


var screenHeight;

var dataCurrentlyContext;
var dataCurrentlyFocus;
var filteredRangesInContext;
var filteredRangesInFocus;
var isFilter = false;

var t = d3.transition();
var rangeVisualize = [];

var lockedLeft = true;
var lockedRight = true;
var data_bottom_level;
var data_top_level;


//To improve the responde of the app
//to just update data when there is a really change of the mouse pointer
//
var brushContextHistoric = [];

//
var tooltipHistoric = new Date();


function updateFlows(){
	
	//--CONTEXT---
	dataCurrentlyContext = stack(nest_by_key.entries(nivel_alto));
	dataCurrentlyContext.forEach(function(node){
		var node_hierarchy = getNodeByKey(node.key);
		node.key = node_hierarchy.key;
		node.category = node_hierarchy.name;
		
		if(opts.fadingColors){
			node.color = node_hierarchy.color.desaturate().brighten(opts.fadingColorsFactor);
		}else{
			node.color = node_hierarchy.color;
		}
	})
	
	//Update Axis
	var max = d3.max(nivel_alto, function(d) {return d.y0 + d.y;})
	yScaleContext.domain([ 0, max]);
	
	//Flows in OVERVIEW
	var fContext = context.select("#flowsInContext").selectAll(".area") //just for 4 flow, 1 level
						.data(dataCurrentlyContext,function (d){return d.key;});

	//UPDATE Context
	fContext.transition()
			.duration(opts.durationTransition)
				.attr("d",  function(d) {return areaContext(d.values);})
				.style({
						"fill" : function(d) {return d.color},
						"stroke" : function(d) {return d.color},
						"opacity":1
				});
	
	//ENTER Context
	fContext.enter()
			.append("path")
			.attr("class", "area")
			.style("opacity",0)
		.transition()
		.duration(opts.durationTransition)
			.attr("d", function(d) {return areaContext(d.values);})
			.style({
					"fill" : function(d) {return d.color},
					"stroke" : function(d) {return d.color},
					"opacity":1
			})
	
	//EXIT Context
	fContext.exit().transition()
				.duration(opts.durationTransition)
					.style("opacity", 0)
					.remove();	
	
	
	
	
	//--FOCUS---
	dataCurrentlyFocus = stack(nest_by_key.entries(nivel_bajo));//Used in Focus Local
	dataCurrentlyFocus.forEach(function(node){
		var node_hierarchy = getNodeByKey(node.key);
		node.key = node_hierarchy.key;
		node.category = node_hierarchy.name;
		node.color =  node_hierarchy.color;
	})

	//Update Axis
	var max = d3.max(dataCurrentlyFocus, function(aray){
		return d3.max(aray.values,function(d){return d.y0+d.y;});
	})
	yScaleFocus.domain([0,max]);
	
	opts.offsetType == "zero" ? focus.select(".y.axis.focus").style({"display":"inline"}) : focus.select(".y.axis.focus").style({"display":"none"});
	opts.offsetType == "zero" ? focus.select(".y.axis.label").style({"display":"inline"}) : focus.select(".y.axis.label").style({"display":"none"});
	
	focus.select(".y.axis.focus")
				.transition()
				.duration(opts.durationTransition)
				.call(yAxisFocus);
	
	var flowFocusNormal = focus.select("#flowsInFocus").selectAll(".focus.area0") //Normal Area, 1 level
										.data(dataCurrentlyContext,function (d){return d.key;});
	
	//UPDATE
	flowFocusNormal.transition(t)
				.duration(opts.durationTransition)
					.attr("d", function(d) {return areaFocus(d, 0);})
					.style({
							"fill" : function(d) {return d.color},
							"stroke" : function(d){return opts.outlineLayers ? opts.outlineLayersColor : d.color}
					});

	//CREATE
	flowFocusNormal.enter()
				.append("path")
				.attr("id", function(d){return "focus_area0_" + d.key})
				.attr("class", function(d){return "focus area0 " + d.key})
				.style("opacity",0)
			.transition(t)
			.duration(opts.durationTransition)
				.attr("d", function(d) {return areaFocus(d, 0);})
				.style({
						"fill" : function(d) {return d.color},
						"stroke" : function(d){return opts.outlineLayers ? opts.outlineLayersColor : d.color},
						"opacity" : 1
				});	

	
	flowFocusNormal.exit().transition(t)
				.duration(opts.durationTransition)
					.style("opacity", 0)
					.remove();
	
	//---FOCUS ---
	for(var index=1;index<4;index++){
		
		var flowFocusIndex = focus.select("#flowsInFocus").selectAll(".focus.area"+index) 
												.data(dataCurrentlyFocus,function (d){return d.key;});

		//UPDATE
		flowFocusIndex.transition(t)
				.duration(opts.durationTransition)
					.attr("d", function(d) {return areaFocus(d, index);})
					.style({
							"fill" : function(d) {
								switch (index) {
									case 1: return "url(#gradientLeft"+ d.values[0]["key"]+")";// Distortion area
									case 2: return "url(#gradientRight"+ d.values[0]["key"]+")";// Distortion area
									case 3: return d.color;
								}
							},
							"stroke" : function(d) {
								switch (index) {
									case 1: return opts.outlineLayers ? opts.outlineLayersColor : "url(#gradientLeftStroke"+ d.values[0]["key"]+")";
									case 2: return opts.outlineLayers ? opts.outlineLayersColor : "url(#gradientRightStroke"+ d.values[0]["key"]+")";
									case 3: return opts.outlineLayers ? opts.outlineLayersColor : d.color;
								}
							}
						});

		//ENTER
		flowFocusIndex.enter()
					.append("path")
					.attr("id", function(d){return "focus_area"+index+"_" + d.key})
					.attr("class", function(d){return "focus area" +index +" "+  d.parentKey})
					.style("opacity",0)
				.transition(t)
					.attr("d", function(d) {return areaFocus(d, index);})
					.style({
							"opacity" : 1,	
							"fill" : function(d) {
								switch (index) {
									case 1: return "url(#gradientLeft"+ d.values[0]["key"]+")";// Distortion area
									case 2: return "url(#gradientRight"+ d.values[0]["key"]+")";// Distortion area
									case 3: return d.color;
								}
							},
							"stroke" : function(d) {
								switch (index) {
									case 1: return opts.outlineLayers ? opts.outlineLayersColor : "url(#gradientLeftStroke"+ d.values[0]["key"]+")";
									case 2: return opts.outlineLayers ? opts.outlineLayersColor : "url(#gradientRightStroke"+ d.values[0]["key"]+")";
									case 3: return opts.outlineLayers ? opts.outlineLayersColor : d.color;
								}
							}
					});				
		
		flowFocusIndex.exit()
					.transition(t)
				.duration(opts.durationTransition)
					.style("opacity", 0)
					.remove();		
	}
	
	createTooltip();
	createTextLabel(opts.durationTransition);
}

function beforeExport(){
	focus.select("#linksProjetions").selectAll("rect")
										.style({
											"display":"none",
											"stroke-width":0
										});
//	context.select("#candadoLeft").style("display","none");
//	context.select("#candadoRight").style("display","none");
	svg_tree_vis.selectAll("text").call(wrap, 250);
	svg_tree_vis.selectAll("text").style("text-transform","capitalize");
}

function loadMultiresolutionVis(){
	
	//create svg main and axes
	createSvg(); 
	
	//
	display(); 
	
	d3.select("#close-alert").on("click",function(d){
		document.getElementById("alert-msg").classList.toggle("hidden");
	});
	
	d3.select("#svg-export").on("click",function() {
		beforeExport();
		var num_svg = [0,1]; //num_svg to download
		svgExport(fileName, num_svg);
	});
	
	d3.select("#time").on("mouseup", function() {
		console.log(+this.value)
		stepTemporal = +this.value;
		changeGranularity();
	});
	d3.select("#animation").on("change", function() {
		opts.animation = document.getElementById("animation").checked;
	});
	
	d3.select("#outline-layers").on("change", function() {
		opts.outlineLayers = document.getElementById("outline-layers").checked;
		
		for(var index=0;index<4;index++){
			focus.select("#flowsInFocus").selectAll(".focus.area" + index) 
						.style({
								"stroke" : function(d) {
									switch (index) {
										case 0: return opts.outlineLayers ? opts.outlineLayersColor : d.color
										case 1: return opts.outlineLayers ? opts.outlineLayersColor : "url(#gradientLeftStroke"+ d.values[0]["key"]+")";
										case 2: return opts.outlineLayers ? opts.outlineLayersColor : "url(#gradientRightStroke"+ d.values[0]["key"]+")";
										case 3: return opts.outlineLayers ? opts.outlineLayersColor : d.color;
									}
								}
						});
		}		
	});
	
	d3.select("#fading-colors").on("change", function() {
		opts.fadingColors = document.getElementById("fading-colors").checked;
		callUpdate();
	});
	d3.select("#limit-ranges").on("change", function() {
		opts.limitRanges = document.getElementById("limit-ranges").checked;
		
		var visibleLimitRanges;
		if(opts.limitRanges){
			visibleLimitRanges = "visible";
		}else{
			visibleLimitRanges = "hidden";
		}
		
		focus.select(".focusNorRight").style({"visibility": visibleLimitRanges});
		focus.select(".focusNorLeft").style({"visibility": visibleLimitRanges});
		focus.select(".focusDisRight").style({"visibility": visibleLimitRanges});
		focus.select(".focusDisLeft").style({"visibility": visibleLimitRanges});
		focus.select(".focusZoom").style({"visibility": visibleLimitRanges});
		
	});
	
	
	
	
	//
	//
	//ALPHA
	//
	//
	d3.select("#alpha").attr({
							"min":opts.minInputValue,
							"max":opts.maxInputValue,
							"step":opts.stepInputValue,
							"value":opts.facteurZoom
						});
	
	
	d3.select("#alpha").on("input", function() {
		var calcule = calculateRangeFocus(opts.facteurNor, opts.facteurDis, +this.value,"alphaInput");
		if (calcule != null) {
			opts.facteurZoom = +this.value;
			beginValidation();
		}else{
			backContext();
			if(document.getElementById("alert-msg").classList.contains("hidden")){
				document.getElementById("alert-msg").classList.toggle("hidden");
			}
		}
		updateFocus();
	});
	d3.select("#alpha").on("mouseover", function() {
		brushZoomOver();
	});
	d3.select("#alpha").on("mouseout", function() {
		brushOutAll();
	});
	
	//
	//BETA
	//
	d3.select("#beta").attr({
							"min":opts.minInputValue,
							"max":opts.maxInputValue,
							"step":opts.stepInputValue,
							"value":opts.facteurDis
						});
	
	d3.select("#beta").on("input", function() {
		var calcule = calculateRangeFocus(opts.facteurNor, +this.value,  opts.facteurZoom,"betaInput");
		if (calcule != null) {
			opts.facteurDis = +this.value;
			beginValidation();
		}else{
			backContext();
			if(document.getElementById("alert-msg").classList.contains("hidden")){
				document.getElementById("alert-msg").classList.toggle("hidden");
			}
		}
		updateFocus()
	});
	d3.select("#beta").on("mouseover", function() {
		brushDisLeftOver();
		brushDisRightOver();
	});
	d3.select("#beta").on("mouseout", function() {
		brushOutAll();
	});
	//
	//
	//GAMMA
	//
	d3.select("#gamma").attr({
							"min":opts.minInputValue,
							"max":opts.maxInputValue,
							"step":opts.stepInputValue,
							"value":opts.facteurNor
						});
	
	d3.select("#gamma").on("input", function() {
		var calcule = calculateRangeFocus(+this.value, opts.facteurDis, opts.facteurZoom,"gammaInput");
		if (calcule != null) {
			opts.facteurNor = +this.value;
			beginValidation();
			
		}else{
			backContext();
			if(document.getElementById("alert-msg").classList.contains("hidden")){
				document.getElementById("alert-msg").classList.toggle("hidden");
			}
		}
		updateFocus()
	});
	d3.select("#gamma").on("mouseover", function() {
		brushNorLeftOver();
		brushNorRightOver();
	});
	d3.select("#gamma").on("mouseout", function() {
		brushOutAll();
	});
	//
//	d3.select("#col-visualization").selectAll("input").on("change", function(event){
	$("#col-visualization :input").change(function() {
		if(this.value === "streamgraph"){ opts.offsetType = "silhouette"} //Streamgraph
		else {opts.offsetType = "zero"} //Stackedgraph, baseline at 0
		stack.offset(opts.offsetType);
		//changeOffset();
		updateFlows()
	})
	
	d3.select("#candadoLeft").on("click",function(d){
		document.getElementById("candadoLeft").classList.toggle("consin");		
		if(document.getElementById("candadoLeft").classList.contains("consin")){
			d3.select("#candadoLeft").attr('xlink:href',opts.pathCandadoOpen);
			lockedLeft = false;
		}else{
			d3.select("#candadoLeft").attr('xlink:href',opts.pathCandadoClose);
			lockedLeft = true;
		}
	})

	d3.select("#candadoRight").on("click",function(d){
		document.getElementById("candadoRight").classList.toggle("consin");		
		if(document.getElementById("candadoRight").classList.contains("consin")){
			d3.select("#candadoRight").attr('xlink:href',opts.pathCandadoOpen);
			lockedRight = false;
		}else{
			d3.select("#candadoRight").attr('xlink:href',opts.pathCandadoClose);
			lockedRight = true;
		}
	})
	
	
	
	
	//
//	d3.select("#variables").selectAll("input").on("change", function(){
//		if(this.value === "immigration"){
//			kaka(0);
//			updateFlows();
//		}else {
//			kaka(1);
//			updateFlows();
//		}
//	})
	
	
};

function createBtnHierachy(){
	rangeVisualize = [];
	hierarchy.children.forEach(function(element){
		if(document.getElementById(element.key).classList.contains("btn-primary")){
			rangeVisualize.push(element.key)
		}
	})
}

//COLORS AVAILABLES
//d3.scale.category10() d3 category10 BETTER
//d3.scale.category20() d3 category20
//d3.scale.category20b() d3 category20b BETTER
//d3.scale.category20c() d3 category20c


function createSvg(){
//	multiresolutionVisWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//	screenHeight = window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight;
//	screenHeight = screenHeight - 125;
	//screenHeight = (screenHeight - 125)/2;
//	multiresolutionVisWidth = (multiresolutionVisWidth - 100)/2;
//	multiresolutionVisWidth = (multiresolutionVisWidth - 100);

	/* Creation margin Focus */
	marginFocus = {top : 15, right : 20, bottom : 100, left : 50};
	heightFocus = (multiresolutionVisHeight) - marginFocus.top - marginFocus.bottom - 10;

	/* Creation margin Context */
	marginContext = {top : (marginFocus.top + heightFocus + 30), right :  marginFocus.right, bottom : 20, left : marginFocus.left};
	heightContext = (multiresolutionVisHeight) - marginContext.top - marginContext.bottom;

	widthIntern = multiresolutionVisWidth - marginFocus.left - marginFocus.right;
//	widthIntern = multiresolutionVisWidth - marginFocus.left - marginFocus.right - marginFocus.left - marginFocus.right;
	
	
//	d3.selectAll('div.svg-container svg')
//	  .attr('viewBox', '0 0 ' +  ( width + margin.left + margin.right ) + ' ' + ( height  + margin.top + margin.bottom ) )
//		.attr('height', '400px')
//		.attr('width', '100%')
//.attr('preserveAspectRatio', 'none')
//	  .append('g')
//	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
//	  .append('rect')
//	  .attr('x', 0 )
//	  .attr('y', 0 )
//	  .attr( 'width', width   )
//	  .attr( 'height', height )
//	  .attr( 'fill', 'purple' );
	
	/* SVG */
	svg_multiresolution_vis = d3.select("body").select("#svg-multiresolution-vis")
//	svg_multiresolution_vis = d3.select("#pedo").append("svg")
//						.attr("id","svg-multiresolution-vis")
						.attr("xmlns","http://www.w3.org/2000/svg")
						.attr("xlink","http://www.w3.org/1999/xlink")
						.attr("svg","http://www.w3.org/2000/svg")
						.attr("version","1.1")
//						.style("overflow","visible")
						.attr("width",multiresolutionVisWidth)
						.attr("height", multiresolutionVisHeight)
						;

	svg_multiresolution_vis.attr('viewBox', '0 0 ' +  ( multiresolutionVisWidth) + ' ' 
													+ ( multiresolutionVisHeight) )
							.attr('height', multiresolutionVisHeight)
							.attr('width', '100%')
							.attr('preserveAspectRatio', 'none')
	
	
	/* Focus */
	focus = svg_multiresolution_vis.append("g")
				.attr("id","focus")
				.attr("class", "focus")
				.attr("transform","translate(" + (marginFocus.left) + "," + marginFocus.top + ")");

	yScaleFocus = d3.scale.linear().range([ heightFocus, 0 ]);

	yAxisFocus = d3.svg.axis().scale(yScaleFocus)
							.tickSize(5, 0)
							.tickPadding(5)
							.ticks(10)
							.tickFormat(d3.format(opts.yAxisFocusTickFormat))
							.orient("left");

	focus.append("text")
			.attr("class", "y axis label")
			.attr("x",0 - heightFocus / 2)
			.attr("y", -60)
			.attr("dy","2em")
			.attr("transform", "rotate(-90)")
			.text("# " + data_type);

	focus.append("rect")
			.attr("class", "f border")
			.attr("width", widthIntern)
			.attr("height",heightFocus);

	/* Context */
	context = svg_multiresolution_vis.append("g")
					.attr("id","context")
					.attr("class", "context")
					.attr("transform","translate(" + marginContext.left + "," +( marginContext.top) + ")");

	context.append("rect")
				.attr("class", "c border")
				.attr("width", widthIntern)
				.attr("height",heightContext);

	context.append("text")
			.attr("class","x axis label")
			.attr("transform","translate(" + (widthIntern/2) + " ," + (heightContext+marginContext.bottom) + ")")
			.text(opts.x_axis_label_context);


	xScaleContext = d3.time.scale().range([ 0, (widthIntern) ]);
	yScaleContext = d3.scale.linear().range([ heightContext, 0 ]);

	xAxisContext = d3.svg.axis().scale(xScaleContext)
								 .tickSize(5, 0) //inner and outer : extrems of axis
								 .tickPadding(5)
//								 .tickSize(-heightContext, 0) //inner and outer : extrems of axis
//								 .tickPadding(d3.time.minute, 1)
								 .orient("bottom");
	//
	yAxisContext = d3.svg.axis().scale(yScaleContext)
								.tickSize(-widthIntern, 0)
								.tickPadding(5)
								.orient("left");

}

var key_bottom_list = [];
var key_top_list = [];

var leaf_level = [];
var nivel_bajo = [];
var nivel_alto = [];
var children_visible_list = [];
var children_bottom_list = [];


function display() {
	
	//parentChildrenLevelConstruct();
	
	/* DOMAIN IN FOCUS AND CONTEXT*/
	xScaleContext.domain(dateExtRange);
	yScaleFocus.domain([ 0, d3.max(nivel_bajo, function(d) {return d.y0 + d.y;}) ]);
	yScaleContext.domain(yScaleFocus.domain());
	
	focus.append("g")
			.attr("class", "y axis focus")
			.attr("transform","translate(0,0)")
			.call(yAxisFocus);
	
	opts.offsetType == "zero" ? focus.select(".y.axis.focus").style({"display":"inline"}) : focus.select(".y.axis.focus").style({"display":"none"});
	opts.offsetType == "zero" ? focus.select(".y.axis.label").style({"display":"inline"}) : focus.select(".y.axis.label").style({"display":"none"});
	
	switch (polarityTemporal) {
		case "m": 
			xAxisContext.ticks(20).tickFormat(customTimeFormat)
			xScaleContext.nice(d3.time.minute);
			break;
		case "h": 
			xAxisContext.ticks(10).tickFormat(customTimeFormat);
			xScaleContext.nice(d3.time.hour);
			break;
		case "d": 
			xAxisContext.ticks(10).tickFormat(customTimeFormat);
			xScaleContext.nice(d3.time.day);
			break;
//		case 3: 
//			xAxisContext.ticks(10).tickFormat(customTimeFormat);
//			xScaleContext.nice(d3.time.week);
//			break;
		case "b": 
			xAxisContext.ticks(10).tickFormat(customTimeFormat);
			xScaleContext.nice(d3.time.month);
			break;
		case "y": 
			xAxisContext.ticks(10).tickFormat(customTimeFormat);
			xScaleContext.nice(d3.time.year);
			break;
	}
	
	context.append("g").attr("id","flowsInContext");
	
	flowContext = context.select("#flowsInContext").selectAll(".area") //TOP level
									.data(data_top_level,function(d) { return d.key; });

	flowContext.enter().append("path")
				.attr("class", "area")
				//Made that (areaContext(d.values)) because dataRangeLevel1 is an array of objects 
				.attr("d", function(d) {return areaContext(d.values);})
				.style({
					"fill" : function(d){return d.color;},
					"stroke" : function(d){return d.color;}
				 });

	
	context.append("g")
			.attr("class", "x axis")
			.attr("transform","translate(0," + heightContext + ")")
			.call(xAxisContext);

	createBrushInContext();
//	console.log("finish brush In Context")
	
	
//	console.log(brushContextNorLeft.extent());
//	console.log(brushContextDisLeft.extent());
//	console.log(brushContext.extent());
//	console.log(brushContextDisRight.extent());
//	console.log(brushContextNorRight.extent());
	
	
	
	//To get the hierarchy for each scale in focus
	rangesDomainFocus = (nest_by_key.entries(calculateRangeFocus(opts.facteurNor, opts.facteurDis, opts.facteurZoom,"nestByEntries" )));
	// To create a new rangesDomainFocus with the result of calling a functionon every element depending
	// If it is NL, FL, Z, FR, NR.
	
	rangesDomainFocus.map(function(element) {
		if (element.key == "NL") {
			element.domain = brushContextNorLeft.extent();
			element.values.map(function(element) {element.domain = brushContextNorLeft.extent();})
		} else if (element.key == "FL") {
			element.domain = brushContextDisLeft.extent();
			element.values.map(function(element, index) {element.domain = calculeExtent(brushContextDisLeft.extent(),index);})
		} else if (element.key == "Z") {
			element.domain = brushContext.extent();
			element.values.map(function(element) {element.domain = brushContext.extent();})
		} else if (element.key == "FR") {
			element.domain = brushContextDisRight.extent();
			element.values.map(function(element, index) {element.domain = calculeExtent(brushContextDisRight.extent(),index);})
		} else if (element.key == "NR") {
			element.domain = brushContextNorRight.extent();
			element.values.map(function(element) {element.domain = brushContextNorRight.extent();})
		}
	})
	focus.append("g").attr("id","x_grid_focus");
	createScalesAxisFocus();
//	console.log("finish createScalesAxisFocus")
	focus.append("g").attr("id","x_axis_focus");
	
	//FOCUS : Append Axis
	for (var i = 0; i < axisFocus.length; i++) {
		focus.select("#x_axis_focus").append("g")
									.attr("class", "x axis focus" + i)
									.attr("transform","translate(0,0)")
									.call(axisFocus[i]);
	}
	
	createGradientArrays(key_bottom_list);
//	console.log("finish createGradientArrays")
	//FOCUS
	focus.append("g").attr("id","flowsInFocus");
	
	focus.select("#flowsInFocus").selectAll(".focus.area0") //Focus Area TOP hierarchy
					.data(data_top_level,function(d) { return d.key; })
					.enter()
					.append("path")
					.attr("id", function(d){return "focus_area0_" + d.key})
					.attr("class", function(d){return "focus area0 " + d.key})
					.attr("d", function(d) {return areaFocus(d, 0);})
					.style({
							"fill" : function(d) {return d.color},
							"stroke" : function(d){return opts.outlineLayers ? opts.outlineLayersColor : d.color}
							//"opacity": 0.7
					});
				
	for(var index=1;index<4;index++){
		focus.select("#flowsInFocus").selectAll(".focus.area" + index) //Focus Area BOTTOM hierarchy
					.data(data_bottom_level,function(d) { return d.key; })
					.enter()
					.append("path")
					.attr("id", function(d){return "focus_area"+index+"_" + d.key})
					.attr("class", function(d){return "focus area" +index +" "+  d.key})
					.attr("d", function(d) {return areaFocus(d, index);})
					.style({
							"fill" : function(d) {
								switch (index) {
									case 1: return "url(#gradientLeft"+ d.values[0]["key"]+")";// Distortion area
									case 2: return "url(#gradientRight"+ d.values[0]["key"]+")";// Distortion area
									case 3: return d.color;
								}
							},
							"stroke" : function(d) {
								switch (index) {
									case 1: return opts.outlineLayers ? opts.outlineLayersColor : "url(#gradientLeftStroke"+ d.values[0]["key"]+")";
									case 2: return opts.outlineLayers ? opts.outlineLayersColor : "url(#gradientRightStroke"+ d.values[0]["key"]+")";
									case 3: return d.color;
								}
							}
//							"opacity" : function(d) {
//								switch (index) {
//									case 1: return 0.7;
//									case 2: return 0.7;
//									case 3: return 0.7;
//								}
//							},
					});
	}
	
	
//	focus.select("#flowsInFocus").style("stroke-width",opts.strokeWidth);
	
	var end =  new Date().toLocaleString()
	
	focus.append("g").attr("id","linksProjetions")
	updateRectanglesAndLinksInFocus();// Rectangles BORDERS
//	console.log("finish updateRectanglesAndLinksInFocus")
	focus.append("g").attr("id","textsLabels");
	var dAnimation = opts.animation ? opts.durationTransitionAnimation:opts.durationTransitionMoveFlow;
	createTextLabel(dAnimation);
	
	/* ToolTip */
	tooltip = d3.select("body").append("div")
							.attr("id", "tooltip-flow");
	
	focus.append("g").attr("id","interseccion");
	createTooltip();
	createContextBrushes();
	createStylesBrushes();
	
	beginValidation();//To set the values at begging
	
	
	//draw data into map
	drawDataIntoMap(nivel_bajo,brushContext.extent()[0],brushContext.extent()[1]);
}

function getTextLabels(){
	var datesForTextLabel = []

	var dataInZoomArea = [];
	if(dataCurrentlyFocus==null){
		dataInZoomArea = data_bottom_level;
	}else{
		dataInZoomArea = dataCurrentlyFocus;
	}
	
	var dateLimMin = brushContext.extent()[0];
	var dateLimMax = brushContext.extent()[1];

	switch (polarityTemporal) {
		case "m":
			if(dateLimMax > d3.time.minute.offset(dateMaxRange, -2)){
				dateLimMax = d3.time.minute.offset(dateMaxRange, -2);
			}
			break;
		case "h":
			if(dateLimMax > d3.time.hour.offset(dateMaxRange, -2)){
				dateLimMax = d3.time.hour.offset(dateMaxRange, -2);
			}
			break;
		case "d":
			if(dateLimMax > d3.time.day.offset(dateMaxRange, -2)){
				dateLimMax = d3.time.day.offset(dateMaxRange, -2);
			}
			break;
//		case 3:
//			if(dateLimMax > d3.time.week.offset(dateMaxRange, -2)){
//				dateLimMax = d3.time.week.offset(dateMaxRange, -2);
//			}
//			break;
		case "b":
			if(dateLimMax > d3.time.month.offset(dateMaxRange, -2)){
				dateLimMax = d3.time.month.offset(dateMaxRange, -2);
			}
			break;
		case "y":
			if(dateLimMax > d3.time.year.offset(dateMaxRange, -2)){
				dateLimMax = d3.time.year.offset(dateMaxRange, -2);
			}
			break;
	}
	
	
	function getMaximo(element, index){
		var datesFilter = element.values.filter(function(obj){return (obj.date>=dateLimMin && obj.date<=dateLimMax )});
		datesFilter.sort(function (a, b) {
			  if (a.value > b.value) {
				    return 1;
				  }
				  if (a.value < b.value) {
				    return -1;
				  }
				  return 0;
				});
		datesForTextLabel.push(datesFilter.pop()); //fechas filtradas solo en el area del focus
	}
	dataInZoomArea.forEach(getMaximo);

	//Ordering this array to get the maximun and minimun
	datesForTextLabel.sort(function (a, b) {
		  if (a.value > b.value) {
			    return 1;
			  }
			  if (a.value < b.value) {
			    return -1;
			  }
			  return 0;
		});
	
	var rangeValuesText = [];
	stdDev = datesForTextLabel.forEach(function(element){
			rangeValuesText.push(element.value);
	})
	
	//Adding valueNormal attribute 
	//DONT USED VALUENORMAL, but implemented
	var stdDev = standardDeviation(rangeValuesText);
	var mediana = median(rangeValuesText);
	datesForTextLabel.forEach(function(element){
		element.valueNormal = (element.value-mediana)/stdDev;
	})
	//------------------------------------------------
	
	var minValueTextLabel = 0; //datesForTextLabel[0].valueNormal;
	var maxValueTextLabel = datesForTextLabel[datesForTextLabel.length-1].value;
	
	//Scale to get the HEIGHT of the text 
	scaleTextLabel = d3.scale.linear()
							.clamp(false)
							.domain([minValueTextLabel, maxValueTextLabel])
							.range([opts.minSizeTextLabel, opts.maxSizeTextLabel]);
	
	
	
	//Adding coordonates
	datesForTextLabel.forEach(function(element){
		var value = element.value;
		var font = scaleTextLabel(value).toString().concat("px ").concat(opts.labelTextFont);
		var textWidth = getTextWidth(element.category,font);
		
		var textWidthMiddle = textWidth/2;
		
		var x1 = scalesFocus[selectAxisFocus(element.date)](element.date)-textWidthMiddle;
		var y1 = yScaleFocus(element.y0 + element.value/2 )-scaleTextLabel(value);
		var x2 = (x1+textWidth);
		var y2 = (y1+scaleTextLabel(value));
//		var coord = {"x1":x1,"y1":y1,"x2":x2-opts.toleranceTextLabel,"y2":y2-opts.toleranceTextLabel};
		var coord = {"x1":x1,"y1":y1,"x2":x2,"y2":y2};
		
		element.coordinates = coord;
		element.overlaping = false;
	})
	
	//Filtering just elements not overlapping
	datesForTextLabel.forEach(function(element){
		
		var rangeOthers = datesForTextLabel.filter(function(elementToFilter){
			return element.key != elementToFilter.key
		})

		var rectElement = {left: element.coordinates.x1, 
							 bottom: element.coordinates.y1, 
							 right: element.coordinates.x2, 
						 	 top: element.coordinates.y2} 

		rangeOthers.forEach(function(elementOther){
			if(!elementOther.overlaping){
				var rectElementOther = {
						left: elementOther.coordinates.x1, 
						bottom: elementOther.coordinates.y1, 
						right: elementOther.coordinates.x2, 
						top: elementOther.coordinates.y2} 
				if(intersectRect(rectElement, rectElementOther)){
					element.overlaping = true;
				}
			}
			
		})
	})
	
	//To get just text label that are not overlapping
	datesForTextLabel = datesForTextLabel.filter(function(element){
		return element.overlaping == false;
	})
	return datesForTextLabel;
}

function createTextLabel(transitionDuration){
	var datesForTextLabel = getTextLabels();
	var textLabel = focus.select("#textsLabels").selectAll(".textLabel")
										.data(datesForTextLabel,function (d){return d.key;});
	
	//update
	textLabel.transition()
			.duration(transitionDuration)	
				.attr("x", function(d) {return scalesFocus[selectAxisFocus(d.date)](d.date); })
				.attr("y", function(d) {return yScaleFocus(d.y0 + d.value/2 ); }) //y0 + value/2
				.text(function(d) {return d.category;})
				.style({
						"opacity":1,
						"font-size":function(d) {return scaleTextLabel(d.value) + "px";},
						"font-family":opts.labelTextFont,
						"text-anchor":"middle",
						"pointer-events": "none"
				})

	//enter
	textLabel.enter().append("text")
					.style({"opacity":0})
				.transition()
				.duration(transitionDuration)
					.attr("class",function(d){return "textLabel" + " " + d.parentKey + " " +d.key;})
					.attr("x", function(d) {return scalesFocus[selectAxisFocus(d.date)](d.date); })
					.attr("y", function(d) {return yScaleFocus(d.y0 + d.value/2); }) 
					.text(function(d) {return d.category;})
					.style({
							"opacity":1,
							"font-size":function(d) {return scaleTextLabel(d.value) + "px";},
							"font-family":opts.labelTextFont,
							"text-anchor":"middle",
							"pointer-events": "none",
					})
	//exit
	textLabel.exit()
					.style("opacity",0)
					.transition()
					.duration(transitionDuration)
					.style("opacity",0)
					.remove();
	
	
	
	//
	//
	//To create RECTANGLES around the text label 
	//
	//
	
//	var rectangleLabel = focus.select("#textsLabels").selectAll(".rect")
//				.data(datesForTextLabel,function (d){return d.key;});
//
//	//update
//	rectangleLabel
//				//.style({"opacity":0})	
//				.attr("x",function(d){return d.coordinates.x1})
//				.attr("y",function(d){return d.coordinates.y1})
//				.attr("width",(function(d){return d.coordinates.x2-d.coordinates.x1}))
//				.attr("height",(function(d){return d.coordinates.y2-d.coordinates.y1}))
//				.text(function(d) {return d.name;})
//				.style({
//						"display":"inline",
//						"fill":"none",
//						"stroke":"black"
//				})
//	
//	//enter RECTANGLE
//	rectangleLabel.enter().append("rect")
//						.attr("class",function(d){return "rect" + " " + d.parentKey + " " +d.key;})
//						.attr("x",function(d){return d.coordinates.x1})
//						.attr("y",function(d){return d.coordinates.y1})
//						.attr("width",(function(d){return d.coordinates.x2-d.coordinates.x1}))
//						.attr("height",(function(d){return d.coordinates.y2-d.coordinates.y1}))
//						.style({
//							"display":"inline",
//							"fill":"none",
//							"stroke":"black"
//							})
//	
//	//exit
//	rectangleLabel.exit()
//				.style("opacity",0)
//				.transition()
//				.duration(transitionDuration)
//				.style("opacity",0)
//				.remove();
	
}

function ratonOver(d){
	
	ratonOverTree(d);
	
	var selectedFlow = d; //get d selectione for use later in transition
	
	for(var index=0;index<4;index++){
		focus.select("#flowsInFocus").selectAll(".focus.area" + index) 
				.transition()
				.duration(opts.tooltipTransitionMouseMove)		
					.style({
							"stroke" : function(d) {
								switch (index) {
									case 0: return opts.outlineLayers ? opts.outlineLayersColor : d.color
									case 1: return opts.outlineLayers ? opts.outlineLayersColor : "url(#gradientLeftStroke"+ d.values[0]["key"]+")";
									case 2: return opts.outlineLayers ? opts.outlineLayersColor : "url(#gradientRightStroke"+ d.values[0]["key"]+")";
									case 3: return opts.outlineLayers ? opts.outlineLayersColor : d.color;
								}
							},
							"opacity":function(d){
								return (selectedFlow.key == d.key || selectedFlow.key == getFatherKey(d.key) ) ? opts.opacityFlowFocusSelected : opts.opacityFlowFocusDeselected;
							},
							"stroke-width":function(d){
								return (selectedFlow.key == d.key || selectedFlow.key == getFatherKey(d.key) ) ? opts.strokeWidth : opts.strokeWidth;
							}
					});
	}

	focus.select("#textsLabels").selectAll(".textLabel")
				.style({
					"fill-opacity":function(d){
						return (selectedFlow.key == d.key || selectedFlow.key == getFatherKey(d.key) ) ? opts.opacityTextLabelSelected : opts.opacityTextLabelDeselected;
					},
					"font-weight":function(d){
						return (selectedFlow.key == d.key || selectedFlow.key == getFatherKey(d.key) ) ? "bold" : "normal";
					},
				});
}

function ratonOut(){
	
	tooltipHistoric = new Date();
	
	//
	drawDataIntoMap(nivel_bajo,brushContext.extent()[0],brushContext.extent()[1])
	
	//
	ratonOutTree();
	
	for(var index = 0; index < 4; index++){//To restore opacity for every area, if area has dif opacities
		focus.select("#flowsInFocus").selectAll(".focus.area"+index) 
			.style({
				"stroke" : function(d) {	
					switch (index) {
						case 0: return opts.outlineLayers ? opts.outlineLayersColor : d.color;
						case 1: return opts.outlineLayers ? opts.outlineLayersColor : "url(#gradientLeftStroke"+ d.values[0]["key"]+")";
						case 2: return opts.outlineLayers ? opts.outlineLayersColor : "url(#gradientRightStroke"+ d.values[0]["key"]+")";
						case 3: return opts.outlineLayers ? opts.outlineLayersColor : d.color;
					}
				},
				"stroke-width":opts.strokeWidth,
				"opacity":opts.opacityFlowFocusSelected
				
			})
	}
	
//	focus.select("#flowsInFocus").selectAll(".focus")
//				.transition()
//				.duration(opts.tooltipTransitionMouseOut)
//						.style({
//							"opacity":1,
//							"stroke-width":opts.strokeWidth,
//							"opacity":opts.opacityFlowFocusSelected
//						})
	
	focus.select("#textsLabels").selectAll(".textLabel")
			.style({
				"fill-opacity": opts.opacityTextLabel,
				"font-weight":"normal"
//						"fill":"black",
//						"text-shadow":"2px 2px 8px white"
			});
	
}

function createTooltip(){
	
	var vertical = focus.append("line")
						.attr("class","vertical-ruler")
						.attr("x1", 0)
						.attr("y1", 0)
						.attr("x2", 0)
						.attr("y2", heightFocus)
						.style("opacity","0");
	
	var msgDataModal;
	var titleDataModal;
	var textsArraySelected; 
	
	
	var fixedToExploreMap = false;

	focus.select("#flowsInFocus").selectAll(".focus")
			.on("mouseover",function(d, i) {
					ratonOver(d);				
			})
			.on("mousemove",function(d, i) {
				
//					console.log(d)
					mousex = d3.mouse(this);
					mousex = mousex[0];// + 5;
					
					var mouseSelectedDate = timeTooltip(scalesFocus[selectScaleFocusPixel(mousex)].invert(mousex)); //invert: get the domain, return range and viceversa
					var datesReformated = d.values.map(function(element) {return new Date(element.date)});
					var mouseDateIndex = datesReformated.map(Number).indexOf(+mouseSelectedDate); //To get the index of the date in array
					
					if(mouseDateIndex!=-1){//If date existe in the array
						
//				        
//				        // TO SEE THE POINTS IN THE EXTREMS OF THE VERTICAL RULER
////					    var points = focus.select("#interseccion").selectAll(".points")
////					    					.data(positionPointsIntersection);
////					    
////					    //update points
////					    points.attr("cx", function (d) { return d.x; })		 
////					    		.attr("cy", function (d) { return d.y; });	
////					    //enter points
////		    			points.enter().append("circle")
////			    				.attr("class","points")
////				        		.attr("r", 2)		
////						        .attr("cx", function (d) { return d.x; })		 
////						        .attr("cy", function (d) { return d.y; })		
////				        		;
//						
//		    			vertical.style("left", (mousex) + "px");
//						vertical.attr("x1", posUp.x + "px")
//								.attr("y1", posUp.y + "px")
//								.attr("x2", posDown.x + "px")
//								.attr("y2", posDown.y + "px")
//								.style("opacity", 1);
						
						//*****************************************************
											
						
						var dateSelected = (d.values[mouseDateIndex].date); //FECHA
						
						//to update the map only when change a time step	
						if(dateSelected.getTime() != tooltipHistoric.getTime()){
							
							var valueSelected = toolTipNumberFormat(d.values[mouseDateIndex].value)
							textsArraySelected = (d.values[mouseDateIndex].text); //ARRAY
							var formatDate;
							
							
							let spatial = d.values[mouseDateIndex].components.filter(d=>(d.value>0));
							coloring(spatial)
//							console.log(spatial)
							
	//						polarityTemporal == 5 ? formatDate= d3.time.format("") : formatDate= d3.time.format("%d %b %Y");						
							switch(polarityTemporal){
								case "m": // 0 minutes
									formatDate= d3.time.format("%d %b %Y %H:%M");
									break;
								case "h":// 1 hours
									formatDate= d3.time.format("")
									break;
								case "d": // 2 days
									formatDate= d3.time.format("")
									break;
//								case 3: //3 week
//									formatDate= d3.time.format("")
//									break;
								case "m": // 4 month
									formatDate= d3.time.format("%b %Y");
									break;
								case "y": //5 For years
									formatDate= d3.time.format("%Y")
									break;
							}
							
							//points for vertical tooltip
							var x1 = scalesFocus[selectAxisFocus(dateSelected)](dateSelected);  
							var y1 = yScaleFocus(d.values[mouseDateIndex].y0)
							var x2 = scalesFocus[selectAxisFocus(dateSelected)](dateSelected);  
							var y2 = yScaleFocus((d.values[mouseDateIndex].y0 + d.values[mouseDateIndex].y))
							vertical.style("left", (mousex) + "px");
							vertical.attr("x1", x1 + "px")
									.attr("y1", y1 + "px")
									.attr("x2", x2 + "px")
									.attr("y2", y2 + "px")
									.style("opacity", 1);
							tooltip
								.transition()
								.duration(opts.tooltipTransitionMouseMove)
									.style("opacity",1)
										var first_line = "<p class='title'>" + formatDate(dateSelected)  + "</p>";
										var second_line = "<p class='info'>" + d.category + ": " + "<strong>" + valueSelected + " "+  data_type + "</strong></p>";
										var thrid_line = "";
										//'d3.format("' + d + '")'	
										
										if(textsArraySelected.length!=0){
											thrid_line = "<p class='message'><strong>Click</strong> to see the " + data_type +  "</p>";
											titleDataModal = "<strong><p class='title' style='text-transform: capitalize;'>" + d.category + "</p></strong>"  + second_line;
											msgDataModal = "<table class='table' style=width:'100%'>";
											for(var i = 0; i<textsArraySelected.length;i++){
												
												//to make the link to search in google
												var splt = textsArraySelected[i].split(" ");
												var string_search = "";
												for(var s=0;s<splt.length;s++){
													if(s==0){
														string_search = splt[0];
													}else{
														string_search = string_search + "+" + splt[s];
													}
												}
												var line = "<tr><td> <a href=\"https://www.google.com/search?q=" + string_search + "\" target=\"_blank\" </a>" +  textsArraySelected[i] +  "</td></tr>"
												//-------------------
												msgDataModal = msgDataModal + line;
											}
											msgDataModal = msgDataModal + "</table>";
										}
										
							var left_position;
							var with_tooltip = $("#tooltip-flow").width();
							if((d3.event.pageX + with_tooltip) >= multiresolutionVisWidth){
								left_position = d3.event.pageX - with_tooltip - 35; 
							}else{
								left_position = d3.event.pageX; 
							}
										
							tooltip.html(first_line + second_line + thrid_line)
										.style("left",(left_position + 10) + "px")
										.style("top",(d3.event.pageY + 15) + "px");
							
							
							let timePeriod= "<h2 id='main-title-date'>" + formatDate(dateSelected) + "</h2>";
							let valQuantitative = "<h2 id='main-title-quantitative'>" + valueSelected + "</h2>";
							let from = "<h2 id='main-title-from' style='background: " + d.color + "'>" + d.category + "</h2>";
							let to = "<h2 id='main-title-to'>" + "World" + "</h2>";
							
							updateMainTitleVis(timePeriod,valQuantitative,from,to);
							
							tooltipHistoric = dateSelected;
						}
					}
			})
			.on("mouseout", function(d, i) {
					vertical.style("opacity",0);
					
					tooltip.transition()
							.duration(opts.tooltipTransitionMouseOut)
								.style("opacity",0);
					
					
					//updateTitleMultiresolutionVis("", "white")
					
					ratonOut();
			})
			.on("click",function(){
				
				if(textsArraySelected.length!=0){
					d3.select("#data-modal-title").html(titleDataModal)
					d3.select("#data-modal-msg").html(msgDataModal)
					d3.select(this).attr("data-toggle", "modal");
					d3.select(this).attr("data-target", "#data-modal");
				}
			});
}

function updateMainTitleVis(timePeriod,quantitative, from, to){
	let x = document.getElementById("variables").value;
	//Change title
	switch(parseInt(x)){
		case 0:
			textMainTitle = "At " + timePeriod + ", " + quantitative +" from: " + from + " to: " + to;
			break;
		case 1:
			textMainTitle = "At " + timePeriod + ", " + quantitative +" from: " + to + " to: " + from;
			break;
	}
	
	document.getElementById("main-title-vis").innerHTML = textMainTitle;
}


//function updateTitleMultiresolutionVis(text, background){
//	document.getElementById("labelSelectFlow").innerHTML = text;
//	document.getElementById("labelSelectFlow").style.background = background; 
//}


function createContextBrushes() {
	/**
	 * CONTEXT CREATE BRUSHES
	 */
	var heighBrushContext = heightContext - 2;
//	var widthBrush = 3;
	
	context.append("g")
			.attr("class", "brushNorRight")
			.call(brushContextNorRight)
			.selectAll("rect")
				.attr("y", 1)
//				.attr("y", -10)
				.attr('height',heighBrushContext)
//				.attr('width',widthBrush)
				.on("mouseover", brushNorRightOver)
				.on("mouseout", brushOutAll);
		
	context.append("g")
			.attr("class", "brushNorLeft")
			.call(brushContextNorLeft)
			.selectAll("rect")
				.attr("y", 1)
//				.attr("y", -10)
				.attr('height', heighBrushContext)
//				.attr('width',widthBrush)
				.on("mouseover", brushNorLeftOver)
				.on("mouseout", brushOutAll);
	
	context.append("g")
			.attr("class", "brushDisLeft")
			.call(brushContextDisLeft)
			.selectAll("rect")
				.attr("y", 1)
				.attr('height', heighBrushContext)
//				.attr('width',widthBrush)
				.on("mouseover", brushDisLeftOver)
				.on("mouseout", brushOutAll);
	
	context.append("g")
			.attr("class", "brushDisRight")
			.call(brushContextDisRight)
			.selectAll("rect")
				.attr("y", 1)
				.attr('height',heighBrushContext)
//				.attr('width',widthBrush)
				.on("mouseover", brushDisRightOver)
				.on("mouseout", brushOutAll);
	
	context.append("g")
			.attr("class", "brushZoom")
			.call(brushContext)
			.selectAll("rect")
				.attr("y", 1)
				.attr('height', heighBrushContext)
//				.attr('width',widthBrush)
				.on("mouseover", brushZoomOver)
				.on("mouseout", brushOutAll);
}

function brushOutAll(){
	brushZoomOut();
	brushDisLeftOut();
	brushDisRightOut();
	brushNorRightOut();
	brushNorLeftOut();
}



//
function brushZoomOver() {
	if(!opts.limitRanges){
		if(blocage){
			brushOutAll();
		}else{
			focus.select(".focusZoom")
				.style({
					"visibility": "visible"
				});
		}
	}
}
//
function brushZoomOut() {
	if(!opts.limitRanges){
		focus.select(".focusZoom").style({
			"visibility": "hidden"
		});
	}
}
//
//// -------------------------------------------------------
function brushDisLeftOver() {
	if(!opts.limitRanges){
		if(blocage){
			brushOutAll();
		}else{
			focus.selectAll(".focusDisLeft").style({
				"visibility": "visible"
			});
		}
	}
}
//
function brushDisLeftOut() {
	if(!opts.limitRanges){
		focus.selectAll(".focusDisLeft").style({
			"visibility": "hidden"
		});
	}
}
//
//// -------------------------------------------------------
function brushDisRightOver() {
	if(!opts.limitRanges){
		if(blocage){
			brushOutAll();
		}else{
			focus.select(".focusDisRight").style({
				"visibility": "visible"
			});
		}
	}
}
//
function brushDisRightOut() {
	if(!opts.limitRanges){
		focus.select(".focusDisRight").style({
			"visibility": "hidden"
		});
	}
}
//
//// -------------------------------------------------------
function brushNorRightOver() {
	if(!opts.limitRanges){
		if(blocage){
			brushOutAll();
		}else{
			focus.select(".focusNorRight").style({
				"visibility": "visible"
			});
		}
	}
}
//
function brushNorRightOut() {
	if(!opts.limitRanges){
		focus.select(".focusNorRight").style({
			"visibility": "hidden"
		});
	}
}
//
//// -------------------------------------------------------
//
function brushNorLeftOver() {
	if(!opts.limitRanges){
		if(blocage){
			brushOutAll();
		}else{
			focus.select(".focusNorLeft").style({
				"visibility": "visible"
			});
		}
	}
}
//
function brushNorLeftOut() {
	if(!opts.limitRanges){
		focus.select(".focusNorLeft").style({
			"visibility": "hidden"
		});
	}
}

//

// *************************************************
function lineNorLeftEnable() {
	focus.selectAll(".lineNorLeft").style({
		"stroke-opacity" : 1
	})
}
function lineNorLeftDisable() {
	focus.selectAll(".lineNorLeft").style({
		"stroke-opacity" : 0.2
	})
}

function lineNorRightEnable() {
	focus.selectAll(".lineNorRight").style({
		"stroke-opacity" : 1
	})
}
function lineNorRightDisable() {
	focus.selectAll(".lineNorRight").style({
		"stroke-opacity" : 0.2
	})
}

// ***************************************************
function lineDisLeftEnable() {
	focus.selectAll(".lineDisLeft").style({
		"stroke-opacity" : 1
	})
}
function lineDisLeftDisable() {
	focus.selectAll(".lineDisLeft").style({
		"stroke-opacity" : 0.2
	})
}

function lineDisRightEnable() {
	focus.selectAll(".lineDisRight").style({
		"stroke-opacity" : 1
	})
}

function lineDisRightDisable() {
	focus.selectAll(".lineDisRight").style({
		"stroke-opacity" : 0.2
	})
}

/**
 * 
 * Create Scales and Axis in Focus FOCUS : Normal , Zoom , Fisheye
 * 
 *	i 0 : Normal Left 
 *	i 1 : Transition Left
 *	i 2 : Zoom
 *	i 3 : Transition Right
 *	i 4 : Normal Right
 */
function createScalesAxisFocus() {
	
	//xAxisFocus
	for (var i = 0; i < rangesDomainFocus.length; i++) {
		for (var j = 0; j < rangesDomainFocus[i].values.length; j++) {
			
			scalesFocus[scalesFocus.length] = d3.time.scale()
					.clamp(true) // 
					.range([rangesDomainFocus[i].values[j].range[0],rangesDomainFocus[i].values[j].range[1]])
					.domain(rangesDomainFocus[i].values[j].domain);

			axisFocus[axisFocus.length] = d3.svg.axis()
						.scale(scalesFocus[scalesFocus.length - 1])
						.tickFormat(customTimeFormat)
						.tickSize(-heightFocus, 0)
						.tickPadding(5) // space-between-axis-label-and-axis
						.orient("top")
						;
			
			/* Grid Division Chaque interval of time */
			var axisGridDivision = d3.svg.axis()
								.scale(scalesFocus[scalesFocus.length-1])
								.orient("top")
								.tickSize(heightFocus)
								.tickFormat("");
			
			switch (polarityTemporal) { 
				case "m":
					axisGridDivision.ticks(d3.time.minutes,stepTemporal);
					break;
				case "h":
					axisGridDivision.ticks(d3.time.hours,stepTemporal);
					break;
				case "d":
					axisGridDivision.ticks(d3.time.days,stepTemporal);
					break;
//				case 3:
//					axisGridDivision.ticks(d3.time.weeks,stepTemporal)
//					break;
				case "b":
					axisGridDivision.ticks(d3.time.months,stepTemporal);
					break;
				case "y":
					axisGridDivision.ticks(d3.time.years,stepTemporal);	
					break;
			}
			
			
			focus.select("#x_grid_focus").append("g")
									.attr("class", "x grid area" +i+" "+j)
									.attr("transform", "translate(" +0 + ","+ heightFocus + ")")
									.call(axisGridDivision)
//							 .selectAll(".tick")//V4 d3.js ??
//							 	 .classed("minor", function(d) { return d.getMinutes(); })
							 	 ;
//			console.log("B")
			//Default 1 minute or 1 hour or 1...
			//TEXT TICKS
			//i=1 and i=3 distortion.
			//else normal and zoom
			switch (polarityTemporal) { 
				case "m"://minutes
					if(i==1 || i==3){
						axisFocus[axisFocus.length - 1].ticks(d3.time.minutes, getNumIntervalsDistortion(polarityTemporal, i, j));
					}else{
						axisFocus[axisFocus.length - 1].ticks(getNumberOfLabels(polarityTemporal, i, j));
					}
					break;
				case "h"://hours
					if(i==1 || i==3){
						axisFocus[axisFocus.length - 1].ticks(d3.time.hours, getNumIntervalsDistortion(polarityTemporal, i, j));
					}else{
						axisFocus[axisFocus.length - 1].ticks(getNumberOfLabels(polarityTemporal, i, j));
					}
					break;
				case "d":
					if(i==1 || i==3){
						axisFocus[axisFocus.length - 1].ticks(d3.time.days, getNumIntervalsDistortion(polarityTemporal, i, j));
					}else{
						axisFocus[axisFocus.length - 1].ticks(getNumberOfLabels(polarityTemporal, i, j));
					}
					break;
//				case 3:
//					if(i==1 || i==3){
//						axisFocus[axisFocus.length - 1].ticks(d3.time.weeks, getNumIntervalsDistortion(polarityTemporal, i, j));
//					}else{
//						axisFocus[axisFocus.length - 1].ticks(getNumberOfLabels(polarityTemporal, i, j));
//					}
//					break;
				case "b":
					if(i==1 || i==3){
						axisFocus[axisFocus.length - 1].ticks(d3.time.months, getNumIntervalsDistortion(polarityTemporal, i, j));
					}else{
						axisFocus[axisFocus.length - 1].ticks(getNumberOfLabels(polarityTemporal, i, j));
					}
					break;
				case "y":
					if(i==1 || i==3){
						axisFocus[axisFocus.length - 1].ticks(d3.time.years, getNumIntervalsDistortion(polarityTemporal, i, j));
					}else{
						axisFocus[axisFocus.length - 1].ticks(getNumberOfLabels(polarityTemporal, i, j));
					}
					break;
			}

		}
	}
	
}


/**
 * Get Scale Focus by Mouse Pixel Used for tool tip text
 * 
 * @param mouseCoordenate
 *            Get mouse coordenate
 * @returns {Number}
 */
function selectScaleFocusPixel(mouseCoordenate) {
//	console.log(rangesDomainFocus)
	var index = 0, count = 0;
	for (var i = 0; i < rangesDomainFocus.length; i++) {
		for (var j = 0; j < rangesDomainFocus[i].values.length; j++) {
			if (mouseCoordenate >= (rangesDomainFocus[i].values[j].range[0])
					&& mouseCoordenate <= (rangesDomainFocus[i].values[j].range[1])) {
				index = count;
			}
			count++;
		}
	}
	return index;
}

/**
 * CONTEXT BRUSHES STYLES
 */
function createStylesBrushes() {

	context.select(".brushNorLeft .resize.w").selectAll("rect")
			.style("visibility","visible");
	
	context.select(".brushNorLeft .resize.e").selectAll("rect")
			.style("display","none");
	
	/*  */
	context.select(".brushDisLeft .resize.w").selectAll("rect")
			.style("visibility","visible")
			;

	context.select(".brushDisLeft .resize.e").selectAll("rect")
			.style("display","none");

	/*  */
	context.select(".brushDisRight .resize.w").selectAll("rect")
			.style("display","none");

	context.select(".brushDisRight .resize.e").selectAll("rect")
			.style("visibility","visible")
			;

	/*  */
	context.select(".brushNorRight .resize.w").selectAll("rect")
			.style("display","none");
			
	context.select(".brushNorRight .resize.e").selectAll("rect")
			.style("visibility","visible")
			;


	/*  */
	context.select(".brushZoom .resize.w").selectAll("rect")
			.style("visibility","visible");

	context.select(".brushZoom .resize.e").selectAll("rect")
			.style("visibility","visible");

}

//pas mis en place Deprecated
function createPatternFondArrays(){
	patternFocusFond = [];
	var newPattern = function(key,name,fillPattern) {
		
		var nameTextSize = Math.ceil(getTextWidth(name,opts.patternTextFont)); //Math.round();
		var rectWidth = (nameTextSize * 2) + 20; //20 separtions between 2 text
		var rectHeight = 32;
		
		var viewBox1 = (nameTextSize+10)/2;
		var viewBox2 = 0;
		var viewBox3 = (nameTextSize);
		var viewBox4 = rectHeight;
		
		var patternFond = focus //.append("svg:defs")
							.append("svg:pattern")
							.attr('id', 'diagonal'+key)
							.attr('patternUnits', 'userSpaceOnUse') // userSpaceOnUse, objectBoundingBox
//							.attr('patternTransform',"scale(1,-1)")
							.attr('patternContentUnits', 'userSpaceOnUse') //userSpaceOnUse, objectBoundingBox
							.attr("viewBox",viewBox1 + " " + viewBox2 + " " + viewBox3 + " " + viewBox4)
							.attr("x",1)
							.attr("y",1)
							.attr('width', (nameTextSize+10))
							.attr('height', rectHeight)
							
							;
		
		patternFond.append("rect")
					.attr("x",-1)
					.attr("y",0)
					.attr("width", (nameTextSize+10)*2)
					.attr("height", rectHeight)
					.attr("stroke-width", 0)
					.attr("fill", fillPattern)
					.attr("opacity", "1") //here is style("opacity..;
					;
		
		
		//CREATE 4 Text into Pattern
		var text1_x = 0;
		var text1_y = 10;
		var text2_x = nameTextSize + 10 ; 
		var text2_y = 10;
		var text3_x = (nameTextSize/2);
		var text3_y = 25;
		var text4_x = -(nameTextSize/2);
		var text4_y = 25;
		
		patternFond.append("text")
					.attr("x",text1_x)
					.attr("y",text1_y)
					.style("fill-opacity",opts.opacityTextPattern)
					.text(name);
		
		patternFond.append("text")
					.attr("x",text2_x)
					.attr("y",text2_y)
					.style("fill-opacity",opts.opacityTextPattern)
					.text(name);
	
		patternFond.append("text")
					.attr("x",text3_x)
					.attr("y",text3_y)
					.style("fill-opacity",opts.opacityTextPattern)
					.text(name);
		
		patternFond.append("text")
					.attr("x",text4_x)
					.attr("y",text4_y)
					.style("fill-opacity",opts.opacityTextPattern)
					.text(name);
		
		patternFocusFond.push({
			cle : key
		});
	}
	
	hierarchy.children.forEach(function (element){
		element.children.forEach(function (elementChild){
			var fillPattern = GetRGBColorString((elementChild.from + elementChild.end)/2);
			newPattern(elementChild.key,elementChild.name.toUpperCase(),fillPattern);
		})
	})
	
}

/**
 * FOCUS CREATION OF GRADIENTS FOR INTERPOLATE COLEURS
 */
function createGradientArrays(bottom_list) {
	
	focus.append("g").attr("id","linearGradient");
	
	/* Gradient Part */
	gradientFocusRight = [];
	gradientFocusLeft = [];
	gradientFocusLeftStroke = [];
	gradientFocusRightStroke = [];

	var newGradientRight = function(index, colorBegin, colorEnd) {
		
		focus.selectAll("#gradientRight"+index).data([]).exit().remove();
		
		var gradient = focus.select("#linearGradient").append("defs").append("linearGradient")
														.attr("id", "gradientRight" + index)
														.attr("x1", "0%")
														.attr("y1", "0%")
														.attr("x2", "100%")
														.attr("y2", "0%")
														.attr("spreadMethod", "pad"); // pad, repeat, reflect

		gradient.append("stop")
				.attr("offset", "0%")
				.attr("stop-color",colorBegin)
				.attr("stop-opacity", 1)
				.style("fill-opacity", "1");

		gradient.append("stop")
				.attr("offset", "100%")
				.attr("stop-color",colorEnd)
				.attr("stop-opacity", 1);

	}

	// For Stroke line
	var newGradientRightStroke = function(index, colorBegin, colorEnd) {
		
		focus.selectAll("#gradientRightStroke"+index).data([]).exit().remove();
		
		var gradient = focus.select("#linearGradient").append("defs").append("linearGradient")
														.attr("id", "gradientRightStroke" + index)
														.attr("x1", "0%")
														.attr("y1", "0%")
														.attr("x2", "100%")
														.attr("y2", "0%")
														.attr("spreadMethod", "pad"); // pad, repeat, reflect

		gradient.append("stop")
				.attr("offset", "0%")
				.attr("stop-color",colorBegin)
				.attr("stop-opacity", 1)

		gradient.append("stop")
				.attr("offset", "80%")
				.attr("stop-color",colorEnd)
				.attr("stop-opacity", 1);

	}

	var newGradientLeft = function(index, colorBegin, colorEnd) {
		
		focus.selectAll("#gradientLeft"+index).data([]).exit().remove();
		
		var gradient = focus.select("#linearGradient").append("defs").append("linearGradient")
														.attr("id", "gradientLeft" + index)
														.attr("x1", "0%")
														.attr("y1", "0%")
														.attr("x2", "100%")
														.attr("y2", "0%")
														.attr("spreadMethod", "pad"); // pad, repeat, reflect

		gradient.append("stop")
				.attr("offset", "0%")
				.attr("stop-color",colorBegin)
				.attr("stop-opacity", 1);

		gradient.append("stop")
				.attr("offset", "100%")
				.attr("stop-color",colorEnd)
				.attr("stop-opacity", 1);

	}

	// For stroke line
	var newGradientLeftStroke = function(index, colorBegin, colorEnd) {
		
		focus.selectAll("#gradientLeftStroke"+index).data([]).exit().remove();
		
		var gradient = focus.select("#linearGradient").append("defs").append("linearGradient")
														.attr("id", "gradientLeftStroke" + index)
														.attr("x1", "0%")
														.attr("y1", "0%")
														.attr("x2", "100%")
														.attr("y2", "0%")
														.attr("spreadMethod", "pad"); // pad, repeat, reflect

		gradient.append("stop")
					.attr("offset", "20%")
					.attr("stop-color",colorBegin)
					.attr("stop-opacity", 1);

		gradient.append("stop")
					.attr("offset", "100%")
					.attr("stop-color",colorEnd)
					.attr("stop-opacity", 1);

	}

	bottom_list.forEach(function(key_bottom){
		var father_key = getFatherKey(key_bottom);
		var hierarchy_father_node = getNodeByKey(father_key);
		var hierarchy_hijo_node = getNodeByKey(key_bottom);
		
//		var colorBegin = hierarchy_father_node.color; // GetRGBColorString(66); //.desaturate().brighten(1.2)
		if(opts.fadingColors){
			colorBegin = hierarchy_father_node.color.desaturate().brighten(opts.fadingColorsFactor); // GetRGBColorString(66); //.desaturate().brighten(1.2)	
		}else{
			colorBegin = hierarchy_father_node.color;
		}
		
		var colorEnd = hierarchy_hijo_node.color; // "red"; // color(index);

		newGradientLeft(hierarchy_hijo_node.key, colorBegin, colorEnd); // Gradient Left
		newGradientLeftStroke(hierarchy_hijo_node.key, colorBegin, colorEnd); // Gradient Left Stroke

		newGradientRight(hierarchy_hijo_node.key, colorEnd, colorBegin); // Gradient Right
		newGradientRightStroke(hierarchy_hijo_node.key, colorEnd, colorBegin); // Gradient Left Stroke			

	})
}


function getFatherKey(node_key){
	for(var i = 0; i < key_top_list.length; i++){
		var top_key = key_top_list[i];
		if(node_key.indexOf(top_key)!==-1){
			return top_key;
		}
	}
}

function calculateRangeFocus(factNor, factDis, factZoom, callOrigin) {
	
	//on pourrait savoir STi, pero deberia calcular con el # de interavlos del area de transicion y 
	//tomando en cuanta tambien los nuevos SD and SCi
	
	// number-of-minute-in-interval
	nNorLeft = calculeNumIntervals(brushContextNorLeft,polarityTemporal, stepTemporal), 
	nDisLeft = calculeNumIntervals(brushContextDisLeft,polarityTemporal, stepTemporal),
	nZoom = calculeNumIntervals(brushContext,polarityTemporal, stepTemporal),
	nDisRight = calculeNumIntervals(brushContextDisRight,polarityTemporal, stepTemporal),
	nNorRight = calculeNumIntervals(brushContextNorRight,polarityTemporal, stepTemporal),
	nTotal = nNorLeft + nDisLeft + nZoom + nDisRight + nNorRight;

	// Proportions
	pNorLeft = (factNor * nNorLeft) / nTotal, 
	pDisLeft = (factDis * nDisLeft) / nTotal, 
	pZoom = (factZoom * nZoom)/ nTotal, 
	pDisRight = (factDis * nDisRight) / nTotal,
	pNorRight = (factNor * nNorRight) / nTotal, 
	pTotal = pNorLeft + pDisLeft + pZoom + pNorRight + pDisRight;
	
	// Size
	sNorLeft = pNorLeft * ((widthIntern) / pTotal), 
	sDisLeft = pDisLeft * ((widthIntern) / pTotal), 
	sZoom = pZoom * ((widthIntern) / pTotal),
	sDisRight = pDisRight * ((widthIntern) / pTotal), 
	sNorRight = pNorRight * ((widthIntern) / pTotal);
	sTotal = sNorLeft + sDisLeft + sZoom + sDisRight + sNorRight;
	
	// tailles-des-intervals fixes
	iNorLeft = sNorLeft / nNorLeft, 
	iZoom = sZoom / nZoom,
	iNorRight = sNorRight / nNorRight;

	//Calcule constante de croissance left distortion
	var stringConstanteLeft = "";
	stringConstanteLeft = stringConstanteLeft+nDisLeft; //#number of intervals
	for (var i = 0; i < nDisLeft; i++) {
		stringConstanteLeft = stringConstanteLeft + "\n" + iNorLeft;
	}
	stringConstanteLeft=stringConstanteLeft+"\n-"+sDisLeft; //add SDISLEFT
	opts.constanteL = PolyReSolveT(stringConstanteLeft);
	//
	
	//Calcule constante de croissance right distortion
	var stringConstanteRight = "";
	stringConstanteRight = stringConstanteRight+nDisRight;
	for (var i = 0; i < nDisRight; i++) {
		stringConstanteRight = stringConstanteRight + "\n" + iNorRight;
	}
	stringConstanteRight=stringConstanteRight+"\n-"+sDisRight;
	opts.constanteR = PolyReSolveT(stringConstanteRight);
//	console.log("R-" + opts.constanteR + "--");
	//
	
	if(opts.log){
		console.log("FACTEUR : factNor : " + factNor + ", factDis : " + factDis + ", factZoom : " + factZoom);
		console.log("NINTERVALS : nNorLeft : " + nNorLeft + ", nDisLeft : " + nDisLeft + ", nZoom : " + nZoom 
				+ ", nDisRight : " + nDisRight + ", nNorRight : " + nNorRight + ", nTotal : " + nTotal);
		console.log("PROPORTIONS : " + " pNorLeft : " + pNorLeft + ", pDisLeft : " + pDisLeft + ", pZoom : " + pZoom  + 			
				", pDisRight : " + pDisRight + ", pNorRight : " + pNorRight + ", pTotal : " + pTotal);
		console.log("SIZE : " + " sNorLeft : " + sNorLeft + ", sDisLeft : " + sDisLeft + ", sZoom : " + sZoom + 
				" sDisRight : " + sDisRight + ", sNorRight : " + sNorRight + ", sTotal : " + sTotal);
		console.log("SIZE INTERVALS : " + " iNorLeft : " + iNorLeft + ", iZoom : " + iZoom + ", iNorRight : " + iNorRight);
		console.log("--------------------------------")
	}
	
	var rangesFocus = []; // range-Local-Area
	rangesFocus.push({
		key : "NL",
		size : sNorLeft
	});
	
	calculateDistortionL(iNorLeft, nDisLeft, iZoom, sDisLeft).forEach(function(element) { // return-valeurs-ascendent
		rangesFocus = rangesFocus.concat({
			key : "FL",
			size : element
		})
	});
	// Range Detail Area
	rangesFocus.push({
		key : "Z",
		size : sZoom
	});

	// Range Distortion Area
	calculateDistortionR(iNorRight, nDisRight).forEach(function(element) { // return-valeurs-descendent
			rangesFocus = rangesFocus.concat({
				key : "FR",
				size : element
			})
	});

	// Range Local Area
	rangesFocus.push({
		key : "NR",
		size : sNorRight
	});

	if (validateDistortion(factNor, factDis, factZoom)) {
		return calculateAxisFocusIntervals(rangesFocus);
	} else {
		return null;
	}
}


function calculateAxisFocusIntervals(rangesFocus) {
	var axisFocus = [];

	for (var i = 0; i < rangesFocus.length; i++) {
		var axis = [];
		if (i == 0) {
			axis.push({
				key : rangesFocus[i].key,
				range : [ 0, rangesFocus[i].size ]
			})
		} else {
			axis.push({
				key : rangesFocus[i].key,
				range : [ axisFocus[i - 1].range[1],axisFocus[i - 1].range[1] + rangesFocus[i].size ]
			})
		}
		axisFocus = axisFocus.concat(axis);
	}
	return axisFocus;
}

// DISTORTION
/**
 * @param iNorLeft Size of an interval in NorLeft
 * @param numberInterval Number of intervals in DisLeft
 * @returns {Array}
 */
function calculateDistortionL(iNorLeft, numberInterval, iZoom, sDisLeft) {
	iFunctionL = [];
	if(opts.log){
		console.log("calculando con opts.constanteL : " + opts.constanteL);
	}
	for (var x = 1; x <= numberInterval; x++) {
		var g = (iNorLeft)*(Math.pow(opts.constanteL, x));
		iFunctionL.push(g);
	}
	
	var sumDisLeft = 0;
	for (var i = 0; i < iFunctionL.length; i++) {
		sumDisLeft = sumDisLeft + iFunctionL[i];
	}
	return iFunctionL;
}

/**
 * @param iNorRight Size of an interval in NorRight
 * @param numberInterval Number of intervals in DisRight
 * @returns
 */
function calculateDistortionR(iNorRight, numberInterval) {
	iFunctionR = [];
	if(opts.log){
		console.log("calculando con opts.constanteR : " + opts.constanteR);
	}
	for (var x = 1; x <= numberInterval; x++) {
		var g = (iNorRight)*(Math.pow(opts.constanteR, x));					
		iFunctionR.push(g);
	}
	return iFunctionR.reverse();
}

function validateDistortion(factNor, factDis, factZoom) {
	
	var validationIntervals = false;
	var validationDisLeft = false;
	var validationDisRight = false;
	var validationAlphaBetaGamma = false;
	
	//validate num intervals minimum for every interval in context brushes
	if((opts.minIntervalNormal <= intervals(polarityTemporal, 0)) //normal left
	&& (opts.minIntervalDis <= intervals(polarityTemporal, 1)) //dist left
	&& (opts.minIntervalZoom <= intervals(polarityTemporal, 2)) //zoom
	&& (opts.minIntervalDis <= intervals(polarityTemporal, 3)) //dist right
	&& (opts.minIntervalNormal <= intervals(polarityTemporal, 4))){ // normal right
		validationIntervals = true;
	}
	
	//validation factZoom>factDis>factNor
	if((factZoom>factDis)&&(factDis>factNor)){
		validationAlphaBetaGamma = true;
	}
	
	//validation left distortion
	if (iFunctionL[0] >= iNorLeft && iFunctionL[iFunctionL.length-1]<=iZoom) {
		validationDisLeft = true
	}

	// validation Right distortion
	if (iFunctionR[0] <= iZoom && iFunctionR[iFunctionR.length-1] >= iNorRight) {
		validationDisRight = true;
	}
	
	if(validationIntervals 
	&& validationDisLeft
	&& validationDisRight
	&& validationAlphaBetaGamma
	){
		return true;
	}
	return false;
}

function updateFocus() {
	var timerStart = Date.now();
	var calcule = calculateRangeFocus(opts.facteurNor, opts.facteurDis, opts.facteurZoom, "updateFocus");
	if (calcule != null) {
		
		rangesDomainFocus = (nest_by_key.entries(calcule));
		// Delete All axis focus
		var div = focus.selectAll(".x.axis").data([]);
		div.exit().remove();
		
		var divGrid = focus.selectAll(".x.grid").data([])
		divGrid.exit().remove();

		rangesDomainFocus.map(function(element) {
			if (element.key == "NL") {
				element.domain = brushContextNorLeft.extent();
				element.values.map(function(element) {element.domain = brushContextNorLeft.extent();})
			} else if (element.key == "FL") {
				element.domain = brushContextDisLeft.extent();
				element.values.map(function(element, index) {element.domain = calculeExtent(brushContextDisLeft.extent(), index);})
			} else if (element.key == "Z") {
				element.domain = brushContext.extent();
				element.values.map(function(element) {element.domain = brushContext.extent();})
			} else if (element.key == "FR") {
				element.domain = brushContextDisRight.extent();
				element.values.map(function(element, index) {element.domain = calculeExtent(brushContextDisRight.extent(), index);})
			} else if (element.key == "NR") {
				element.domain = brushContextNorRight.extent();
				element.values.map(function(element) {element.domain = brushContextNorRight.extent();})
			}
		})

		scalesFocus = []
		axisFocus = []
		createScalesAxisFocus()

		/* Append Axis Focus */
		for (var i = 0; i < axisFocus.length; i++) {
			focus.select("#x_axis_focus").append("g")
									.attr("class", "x axis focus" + i)
									.attr("transform", "translate(0,0)")
									.call(axisFocus[i]);
		}
		
		/* Update rectangles and links lines in focus */
		updateRectanglesAndLinksInFocus();

		/* Move area */// 4 it is 3 areas
		for (var index = 0; index < 4; index++) {
			focus.selectAll(".focus.area" + index)
						.attr("d", function(d) {return areaFocus(d, index);});
		}

		
		var dAnimation = opts.animation ? 0:opts.durationTransitionMoveFlow;
		createTextLabel(dAnimation);
		
		
	} else {
		backContext();
	}
//	console.log("Time upateFocus: ",(Date.now()-timerStart) + " milliseconds");
}

/*  */
function beginValidation() {
	beginContext = [ {
			brushBegin : brushContextNorLeft.extent(),
			scaleDomain : xScaleContextNorLeft.domain(),
			scaleRange : xScaleContextNorLeft.range()
		}, {
			brushBegin : brushContextDisLeft.extent(),
			scaleDomain : xScaleContextDisLeft.domain(),
			scaleRange : xScaleContextDisLeft.range()
		}, {
			brushBegin : brushContext.extent(),
			scaleDomain : xScaleContext.domain(),
			scaleRange : xScaleContext.range()
		}, {
			brushBegin : brushContextDisRight.extent(),
			scaleDomain : xScaleContextDisRight.domain(),
			scaleRange : xScaleContextDisRight.range()
		}, {
			brushBegin : brushContextNorRight.extent(),
			scaleDomain : xScaleContextNorRight.domain(),
			scaleRange : xScaleContextNorRight.range()
		}, {
			facteurZoom : opts.facteurZoom,
			facteurDis : opts.facteurDis,
			facteurNor : opts.facteurNor
		} 
	];
	
//	if(!document.getElementById("alert-msg").classList.contains("hidden")){
//		document.getElementById("alert-msg").classList.toggle("hidden");
//	}
	
}

/*  */
function backContext() {
	
	/* NorLeft */
	xScaleContextNorLeft.domain(beginContext[0].scaleDomain)
						.range(beginContext[0].scaleRange);

	/* DisLeft */
	xScaleContextDisLeft.domain(beginContext[1].scaleDomain)
						.range(beginContext[1].scaleRange);

	/* Zoom */
	xScaleContext.domain(beginContext[2].scaleDomain)
					.range(beginContext[2].scaleRange);

	/* DisRight */
	xScaleContextDisRight.domain(beginContext[3].scaleDomain)
						.range(beginContext[3].scaleRange);

	/* NorRight */
	xScaleContextNorRight.domain(beginContext[4].scaleDomain)
						.range(beginContext[4].scaleRange);
	

	brushContextNorLeft.extent(beginContext[0].brushBegin);
	brushContextDisLeft.extent(beginContext[1].brushBegin);
	brushContext.extent(beginContext[2].brushBegin);
	brushContextDisRight.extent(beginContext[3].brushBegin);
	brushContextNorRight.extent(beginContext[4].brushBegin);
	
	context.select(".brushNorLeft").call(brushContextNorLeft);
	context.select(".brushDisLeft").call(brushContextDisLeft);
	context.select(".brushZoom").call(brushContext);
	context.select(".brushDisRight").call(brushContextDisRight);
	context.select(".brushNorRight").call(brushContextNorRight);

	
	var candadoLeft = context.selectAll("#candadoLeft");
	candadoLeft.attr("x",xScaleContext(brushContextNorLeft.extent()[0])-8);

	var candadoRight = context.selectAll("#candadoRight");
	candadoRight.attr("x",xScaleContext(brushContextNorRight.extent()[1])-8);
	
	//Input text
//	document.getElementById("alpha").value = beginContext[5].facteurZoom;
//	document.getElementById("beta").value =  beginContext[5].facteurDis;
//	document.getElementById("gamma").value = beginContext[5].facteurNor;

	updateRectanglesAndLinksInFocus();
	
//	if(document.getElementById("alert-msg").classList.contains("hidden")){
//		document.getElementById("alert-msg").classList.toggle("hidden");
//	}
}

//ANIMATION
function callAnimation() {
	var calcule = calculateRangeFocus(opts.facteurNor, opts.facteurDis, opts.facteurZoom, "callAnimation");
	if (calcule != null) {
		beginValidation();
	}else{
		backContext();
	}
	if (opts.animation) {
		updateFocus();
	}
}

function loadExtent1(extent0) {
	var extent1;
	var d0;
	var d1;
	d0 = timeParser(extent0[0]), 
	d1 = timeParser(extent0[1]);
	extent1 = [d0,d1];
	return extent1;
}

function timeTooltip(time){
	var subHalf;
	var addHalf;
	var moyenne;
	switch (polarityTemporal) {
		case "m":
			if(stepTemporal==1){
				return d3.time.minute.round(scalesFocus[selectScaleFocusPixel(mousex)].invert(mousex));
			}
			subHalf = d3.time.minute.offset(time, -stepTemporal);
			addHalf = d3.time.minute.offset(time, stepTemporal);
			moyenne = d3.time.minute.offset(d3.time.minutes(subHalf, addHalf, stepTemporal)[0], Math.floor(stepTemporal/2));
			if(time <= moyenne){
				return d3.time.minutes(subHalf, addHalf, stepTemporal)[0];
			}else{
				return d3.time.minutes(subHalf, addHalf, stepTemporal)[1];
			}
		case "h":
			if(stepTemporal==1){
				return d3.time.hour.round(scalesFocus[selectScaleFocusPixel(mousex)].invert(mousex));
			}
			subHalf = d3.time.hour.offset(time, -stepTemporal);
			addHalf = d3.time.hour.offset(time, stepTemporal);
			moyenne = d3.time.hour.offset(d3.time.hours(subHalf, addHalf, stepTemporal)[0], Math.floor(stepTemporal/2));
			if(time <= moyenne){
				return d3.time.hours(subHalf, addHalf, stepTemporal)[0];
			}else{
				return d3.time.hours(subHalf, addHalf, stepTemporal)[1];
			}
		case "d":
			if(stepTemporal==1){
				return d3.time.day.round(scalesFocus[selectScaleFocusPixel(mousex)].invert(mousex));
			}
			subHalf = d3.time.day.offset(time, -stepTemporal);
			addHalf = d3.time.day.offset(time, stepTemporal);
			moyenne = d3.time.day.offset(d3.time.days(subHalf, addHalf, stepTemporal)[0], Math.floor(stepTemporal/2));
			if(time <= moyenne){
				return d3.time.days(subHalf, addHalf, stepTemporal)[0];
			}else{
				return d3.time.days(subHalf, addHalf, stepTemporal)[1];
			}
//		case 3:
//			if(stepTemporal==1){
//				return d3.time.week.round(scalesFocus[selectScaleFocusPixel(mousex)].invert(mousex));
//			}
//			subHalf = d3.time.week.offset(time, -stepTemporal);
//			addHalf = d3.time.week.offset(time, stepTemporal);
//			moyenne = d3.time.week.offset(d3.time.weeks(subHalf, addHalf, stepTemporal)[0], Math.floor(stepTemporal/2));
//			if(time <= moyenne){
//				return d3.time.weeks(subHalf, addHalf, stepTemporal)[0];
//			}else{
//				return d3.time.weeks(subHalf, addHalf, stepTemporal)[1];
//			}
		case "b":
			if(stepTemporal==1){
				return d3.time.month.round(scalesFocus[selectScaleFocusPixel(mousex)].invert(mousex));
			}
			subHalf = d3.time.month.offset(time, -stepTemporal);
			addHalf = d3.time.month.offset(time, stepTemporal);
			moyenne = d3.time.month.offset(d3.time.months(subHalf, addHalf, stepTemporal)[0], Math.floor(stepTemporal/2));
			if(time <= moyenne){
				return d3.time.months(subHalf, addHalf, stepTemporal)[0];
			}else{
				return d3.time.months(subHalf, addHalf, stepTemporal)[1];
			}
		case "y":
			if(stepTemporal==1){
				return d3.time.year.round(scalesFocus[selectScaleFocusPixel(mousex)].invert(mousex));
			}
			subHalf = d3.time.year.offset(time, -stepTemporal);
			addHalf = d3.time.year.offset(time, stepTemporal);
			moyenne = d3.time.year.offset(d3.time.years(subHalf, addHalf, stepTemporal)[0], Math.floor(stepTemporal/2));
			if(time <= moyenne){
				return d3.time.years(subHalf, addHalf, stepTemporal)[0];
			}else{
				return d3.time.years(subHalf, addHalf, stepTemporal)[1];
			}
	}
}

//Used to get the moyen when brush move
//depends de stepTemporal
function timeParser(time) {
	var subHalf;
	var addHalf;
	switch (polarityTemporal) {
		case "m":
			subHalf = d3.time.minute.offset(d3.time.minute.round(time), -stepTemporal);
			addHalf = d3.time.minute.offset(d3.time.minute.round(time), stepTemporal);
			return d3.time.minutes(subHalf, addHalf, stepTemporal)[1];
		case "h":
			subHalf = d3.time.hour.offset(d3.time.hour.round(time), -stepTemporal);
			addHalf = d3.time.hour.offset(d3.time.hour.round(time), stepTemporal);
			return d3.time.hours(subHalf, addHalf, stepTemporal)[1];
		case "d":
			subHalf = d3.time.day.offset(d3.time.day.round(time), -stepTemporal);
			addHalf = d3.time.day.offset(d3.time.day.round(time), stepTemporal);
			return d3.time.days(subHalf, addHalf, stepTemporal)[1];
//		case 3:
//			subHalf = d3.time.week.offset(d3.time.week.round(time), -stepTemporal);
//			addHalf = d3.time.week.offset(d3.time.week.round(time), stepTemporal);
//			return d3.time.weeks(subHalf, addHalf, stepTemporal)[1];
		case "b":
			subHalf = d3.time.month.offset(d3.time.month.round(time), -stepTemporal);
			addHalf = d3.time.month.offset(d3.time.month.round(time), stepTemporal);
			return d3.time.months(subHalf, addHalf, stepTemporal)[1];
		case "y":
			subHalf = d3.time.year.offset(d3.time.year.round(time), -stepTemporal);
			addHalf = d3.time.year.offset(d3.time.year.round(time), stepTemporal);
			return d3.time.years(subHalf, addHalf, stepTemporal)[1];
	}
}


function brushContextMove() {
	
	var extent0 = brushContext.extent();
	var extent1 = loadExtent1(extent0);
	d3.select(this).call(brushContext.extent(extent1));		
	
	if(brushContextHistoric[0].getTime() == extent1[0].getTime() && brushContextHistoric[1].getTime() == extent1[1].getTime()){
//		console.log("do nothing");
	}else{
	
		// Distortion Areas
		var facteurBrusDisLeft;
		var facteurBrusDisRight;
		
		var extentDisLeft;
		var extentDisRight;
		
		switch (polarityTemporal) {
			case "m":
				facteurBrusDisLeft = (d3.time.minutes(brushContextDisLeft.extent()[0],brushContextDisLeft.extent()[1])).length;
				facteurBrusDisRight = (d3.time.minutes(brushContextDisRight.extent()[0],brushContextDisRight.extent()[1])).length;
				
				extentDisLeft = [d3.time.minute.offset(brushContext.extent()[0],-facteurBrusDisLeft), brushContext.extent()[0] ];
				extentDisRight = [brushContext.extent()[1],d3.time.minute.offset(brushContext.extent()[1],+facteurBrusDisRight) ];
				break;
			case "h":
				facteurBrusDisLeft = (d3.time.hours(brushContextDisLeft.extent()[0],brushContextDisLeft.extent()[1])).length;
				facteurBrusDisRight = (d3.time.hours(brushContextDisRight.extent()[0],brushContextDisRight.extent()[1])).length;
				
				extentDisLeft = [d3.time.hour.offset(brushContext.extent()[0],-facteurBrusDisLeft), brushContext.extent()[0] ];
				extentDisRight = [brushContext.extent()[1],d3.time.hour.offset(brushContext.extent()[1],+facteurBrusDisRight) ];
	
				break;
			case "d":
				facteurBrusDisLeft = (d3.time.days(brushContextDisLeft.extent()[0],brushContextDisLeft.extent()[1])).length;
				facteurBrusDisRight = (d3.time.days(brushContextDisRight.extent()[0],brushContextDisRight.extent()[1])).length;
				
				extentDisLeft = [d3.time.day.offset(brushContext.extent()[0],-facteurBrusDisLeft), brushContext.extent()[0] ];
				extentDisRight = [brushContext.extent()[1],d3.time.day.offset(brushContext.extent()[1],+facteurBrusDisRight) ];
	
				break;
			case "b":
				facteurBrusDisLeft = (d3.time.months(brushContextDisLeft.extent()[0],brushContextDisLeft.extent()[1])).length;
				facteurBrusDisRight = (d3.time.months(brushContextDisRight.extent()[0],brushContextDisRight.extent()[1])).length;
	
				extentDisLeft = [d3.time.month.offset(brushContext.extent()[0],-facteurBrusDisLeft), brushContext.extent()[0] ];
				extentDisRight = [brushContext.extent()[1],d3.time.month.offset(brushContext.extent()[1],+facteurBrusDisRight) ];
				break;
			case "y":
				facteurBrusDisLeft = (d3.time.years(brushContextDisLeft.extent()[0],brushContextDisLeft.extent()[1])).length;
				facteurBrusDisRight = (d3.time.years(brushContextDisRight.extent()[0],brushContextDisRight.extent()[1])).length;
				
				extentDisLeft = [d3.time.year.offset(brushContext.extent()[0],-facteurBrusDisLeft), brushContext.extent()[0] ];
				extentDisRight = [brushContext.extent()[1],d3.time.year.offset(brushContext.extent()[1],+facteurBrusDisRight) ];
				
				
//				console.log("facteurBrusDisLeft",facteurBrusDisLeft)
//				console.log("facteurBrusDisRight",facteurBrusDisRight)
//				console.log("extentDisLeft",extentDisLeft)
//				console.log("extentDisRight",extentDisRight)
				
				break;
		}
		
		brushContextDisLeft.extent(extentDisLeft);
		context.select(".brushDisLeft").call(brushContextDisLeft);
	
		brushContextDisRight.extent(extentDisRight);
		context.select(".brushDisRight").call(brushContextDisRight);
		
		
		
		/* Distortion Area Left */
		// Update Scales por no ver l mouse en forma de cruz fea
		xScaleContextDisLeft.range([ xScaleContext(brushContextNorLeft.extent()[0]), xScaleContext(brushContext.extent()[0]) ])
							.domain([ brushContextNorLeft.extent()[0], brushContext.extent()[0] ]);
		
		xScaleContextDisRight.range([ xScaleContext(brushContext.extent()[1]), xScaleContext(brushContextNorRight.extent()[1]) ])
							.domain([ brushContext.extent()[1], brushContextNorRight.extent()[1] ]);
		
	
		// Local Areas
		var facteurBrusNorLeft;
		var facteurBrusNorRight;
	
		var extentNorLeft;
		var extentNorRight;
	
		switch (polarityTemporal) {
		case "m":
			facteurBrusNorLeft = (d3.time.minutes(brushContextNorLeft.extent()[0],brushContextNorLeft.extent()[1])).length;
			facteurBrusNorRight = (d3.time.minutes(brushContextNorRight.extent()[0],brushContextNorRight.extent()[1])).length;
			if(lockedLeft){
				extentNorLeft = [brushContextNorLeft.extent()[0], brushContextDisLeft.extent()[0] ];	
			}else{
				extentNorLeft = [d3.time.minute.offset(brushContextDisLeft.extent()[0],-facteurBrusNorLeft), brushContextDisLeft.extent()[0] ];
			}
			if(lockedRight){
				extentNorRight = [brushContextDisRight.extent()[1],brushContextNorRight.extent()[1] ];
			}else{
				extentNorRight = [brushContextDisRight.extent()[1],d3.time.minute.offset(brushContextDisRight.extent()[1],+facteurBrusNorRight) ];
			}
			break;
		case "h":
			facteurBrusNorLeft = (d3.time.hours(brushContextNorLeft.extent()[0],brushContextNorLeft.extent()[1])).length;
			facteurBrusNorRight = (d3.time.hours(brushContextNorRight.extent()[0],brushContextNorRight.extent()[1])).length;
			
			if(lockedLeft){
				extentNorLeft = [brushContextNorLeft.extent()[0], brushContextDisLeft.extent()[0] ];	
			}else{
				extentNorLeft = [d3.time.hour.offset(brushContextDisLeft.extent()[0],-facteurBrusNorLeft), brushContextDisLeft.extent()[0] ];
			}
			if(lockedRight){
				extentNorRight = [brushContextDisRight.extent()[1],brushContextNorRight.extent()[1] ];
			}else{
				extentNorRight = [brushContextDisRight.extent()[1],d3.time.hour.offset(brushContextDisRight.extent()[1],+facteurBrusNorRight) ];
			}
			
			break;
		case "d":
			facteurBrusNorLeft = (d3.time.days(brushContextNorLeft.extent()[0],brushContextNorLeft.extent()[1])).length;
			facteurBrusNorRight = (d3.time.days(brushContextNorRight.extent()[0],brushContextNorRight.extent()[1])).length;
	
			if(lockedLeft){
				extentNorLeft = [brushContextNorLeft.extent()[0], brushContextDisLeft.extent()[0] ];	
			}else{
				extentNorLeft = [d3.time.day.offset(brushContextDisLeft.extent()[0],-facteurBrusNorLeft), brushContextDisLeft.extent()[0] ];
			}
			if(lockedRight){
				extentNorRight = [brushContextDisRight.extent()[1],brushContextNorRight.extent()[1] ];
			}else{
				extentNorRight = [brushContextDisRight.extent()[1],d3.time.day.offset(brushContextDisRight.extent()[1],+facteurBrusNorRight) ];
			}
			break;
//		case 3:
//			facteurBrusNorLeft = (d3.time.weeks(brushContextNorLeft.extent()[0],brushContextNorLeft.extent()[1])).length;
//			facteurBrusNorRight = (d3.time.weeks(brushContextNorRight.extent()[0],brushContextNorRight.extent()[1])).length;
//	
//			if(lockedLeft){
//				extentNorLeft = [brushContextNorLeft.extent()[0], brushContextDisLeft.extent()[0] ];	
//			}else{
//				extentNorLeft = [d3.time.week.offset(brushContextDisLeft.extent()[0],-facteurBrusNorLeft), brushContextDisLeft.extent()[0] ];
//			}
//			if(lockedRight){
//				extentNorRight = [brushContextDisRight.extent()[1],brushContextNorRight.extent()[1] ];
//			}else{
//				extentNorRight = [brushContextDisRight.extent()[1],d3.time.week.offset(brushContextDisRight.extent()[1],+facteurBrusNorRight) ];
//			}		
//			break;
		case "b":
			facteurBrusNorLeft = (d3.time.months(brushContextNorLeft.extent()[0],brushContextNorLeft.extent()[1])).length;
			facteurBrusNorRight = (d3.time.months(brushContextNorRight.extent()[0],brushContextNorRight.extent()[1])).length;
	
			if(lockedLeft){
				extentNorLeft = [brushContextNorLeft.extent()[0], brushContextDisLeft.extent()[0] ];	
			}else{
				extentNorLeft = [d3.time.month.offset(brushContextDisLeft.extent()[0],-facteurBrusNorLeft), brushContextDisLeft.extent()[0] ];
			}
			if(lockedRight){
				extentNorRight = [brushContextDisRight.extent()[1],brushContextNorRight.extent()[1] ];
			}else{
				extentNorRight = [brushContextDisRight.extent()[1],d3.time.month.offset(brushContextDisRight.extent()[1],+facteurBrusNorRight) ];
			}
			break;
		case "y":
			facteurBrusNorLeft = (d3.time.years(brushContextNorLeft.extent()[0],brushContextNorLeft.extent()[1])).length;
			facteurBrusNorRight = (d3.time.years(brushContextNorRight.extent()[0],brushContextNorRight.extent()[1])).length;
	
			if(lockedLeft){
				extentNorLeft = [brushContextNorLeft.extent()[0], brushContextDisLeft.extent()[0] ];	
			}else{
				extentNorLeft = [d3.time.year.offset(brushContextDisLeft.extent()[0],-facteurBrusNorLeft), brushContextDisLeft.extent()[0] ];
			}
			if(lockedRight){
				extentNorRight = [brushContextDisRight.extent()[1],brushContextNorRight.extent()[1] ];
			}else{
				extentNorRight = [brushContextDisRight.extent()[1],d3.time.year.offset(brushContextDisRight.extent()[1],+facteurBrusNorRight) ];
			}
			break;
		}
		
		brushContextNorLeft.extent(extentNorLeft);
		context.select(".brushNorLeft").call(brushContextNorLeft);
	
		brushContextNorRight.extent(extentNorRight);
		context.select(".brushNorRight").call(brushContextNorRight);
		
		// Update Scales por no ver l mouse en forma de cruz fea
		xScaleContextNorLeft.range([ 0, xScaleContext(brushContextDisLeft.extent()[0]) ])
							.domain([ dateMinRange, brushContextDisLeft.extent()[0] ]);
		
		xScaleContextNorRight.range([ xScaleContext(brushContextDisRight.extent()[1]), widthIntern ])
							.domain([ brushContextDisRight.extent()[1], dateMaxRange ]);
		
		
		
		updateRectanglesAndLinksInFocus();
		
		// ANIMATION
		callAnimation();
		
		
		//
		drawDataIntoMap(nivel_bajo,brushContext.extent()[0],brushContext.extent()[1])
		
		
//		let fDate= d3.time.format("%Y");
//		let mapTitlePeriod = fDate(brushContext.extent()[0]) + "-" + fDate(brushContext.extent()[1]);
//		updateTitlePeriod(mapTitlePeriod);
		
		//update the historic
		brushContextHistoric = brushContext.extent();
	
	}
	
}


function brushContextNorLeftMove() {
	
	var extent0 = brushContextNorLeft.extent(); 
	var extent1 = loadExtent1(extent0);

	d3.select(this).call(brushContextNorLeft.extent(extent1));

	//Changing range and domain in brushContextDifLeft
	xScaleContextDisLeft.range([xScaleContext(brushContextNorLeft.extent()[0]), xScaleContext(brushContext.extent()[0])])
						.domain([brushContextNorLeft.extent()[0], brushContext.extent()[0]]);
	
	context.select(".brushDisLeft").call(brushContextDisLeft);

	updateRectanglesAndLinksInFocus();
	
	// ANIMATION
	callAnimation();
	
}

function brushContextDisLeftMove() {

	var extent0 = brushContextDisLeft.extent();
	var extent1 = loadExtent1(extent0);

	d3.select(this).call(brushContextDisLeft.extent(extent1));

	var facteurBrusNorLeft;
	var extentNorLeft;

	switch (polarityTemporal) {
		case "m":
			facteurBrusNorLeft = (d3.time.minutes(brushContextNorLeft.extent()[0],brushContextNorLeft.extent()[1])).length;
			if(lockedLeft){
				extentNorLeft = [brushContextNorLeft.extent()[0], brushContextDisLeft.extent()[0] ];	
			}else{
				extentNorLeft = [d3.time.minute.offset(brushContextDisLeft.extent()[0],-facteurBrusNorLeft), brushContextDisLeft.extent()[0] ];
			}
			break;
		case "h":
			facteurBrusNorLeft = (d3.time.hours(brushContextNorLeft.extent()[0],brushContextNorLeft.extent()[1])).length;
			if(lockedLeft){
				extentNorLeft = [brushContextNorLeft.extent()[0], brushContextDisLeft.extent()[0] ];	
			}else{
				extentNorLeft = [d3.time.hour.offset(brushContextDisLeft.extent()[0],-facteurBrusNorLeft), brushContextDisLeft.extent()[0] ];
			}
			
			break;
		case "d":
			facteurBrusNorLeft = (d3.time.days(brushContextNorLeft.extent()[0],brushContextNorLeft.extent()[1])).length;
			if(lockedLeft){
				extentNorLeft = [brushContextNorLeft.extent()[0], brushContextDisLeft.extent()[0] ];	
			}else{
				extentNorLeft = [d3.time.day.offset(brushContextDisLeft.extent()[0],-facteurBrusNorLeft), brushContextDisLeft.extent()[0] ];
			}
			break;
//		case 3:
//			facteurBrusNorLeft = (d3.time.weeks(brushContextNorLeft.extent()[0],brushContextNorLeft.extent()[1])).length;
//			if(lockedLeft){
//				extentNorLeft = [brushContextNorLeft.extent()[0], brushContextDisLeft.extent()[0] ];	
//			}else{
//				extentNorLeft = [d3.time.week.offset(brushContextDisLeft.extent()[0],-facteurBrusNorLeft), brushContextDisLeft.extent()[0] ];
//			}
//			break;
		case "b":
			facteurBrusNorLeft = (d3.time.months(brushContextNorLeft.extent()[0],brushContextNorLeft.extent()[1])).length;
			if(lockedLeft){
				extentNorLeft = [brushContextNorLeft.extent()[0], brushContextDisLeft.extent()[0] ];	
			}else{
				extentNorLeft = [d3.time.month.offset(brushContextDisLeft.extent()[0],-facteurBrusNorLeft), brushContextDisLeft.extent()[0] ];
			}
			break;
		case "y":
			facteurBrusNorLeft = (d3.time.years(brushContextNorLeft.extent()[0],brushContextNorLeft.extent()[1])).length;
			if(lockedLeft){
				extentNorLeft = [brushContextNorLeft.extent()[0], brushContextDisLeft.extent()[0] ];	
			}else{
				extentNorLeft = [d3.time.year.offset(brushContextDisLeft.extent()[0],-facteurBrusNorLeft), brushContextDisLeft.extent()[0] ];
			}
			break;
	}
	
	//Changing range and domain in BrushContextNorLeft
	xScaleContextNorLeft.range([0, xScaleContext(brushContextDisLeft.extent()[0])])
						.domain([dateMinRange, brushContextDisLeft.extent()[0]]);
	
	context.select(".brushNorLeft").call(brushContextNorLeft.extent(extentNorLeft));

	
	//Changing range and domain in DisLeft
	xScaleContextDisLeft.range([ xScaleContext(extentNorLeft[0]), xScaleContext(brushContext.extent()[0]) ])
						.domain([ extentNorLeft[0], brushContext.extent()[0] ]);
						
	updateRectanglesAndLinksInFocus();
	
	// ANIMATION
	callAnimation();
}

function brushContextDisRightMove() {

	var extent0 = brushContextDisRight.extent(); 
	var extent1 = loadExtent1(extent0);

	d3.select(this).call(brushContextDisRight.extent(extent1));

	var facteurBrusNorRight;
	var extentNorRight;

	switch (polarityTemporal) {
		case "m":
			facteurBrusNorRight = (d3.time.minutes(brushContextNorRight.extent()[0],brushContextNorRight.extent()[1])).length;
			if(lockedRight){
				extentNorRight = [brushContextDisRight.extent()[1], brushContextNorRight.extent()[1]];
			}else{
				extentNorRight = [brushContextDisRight.extent()[1],d3.time.minute.offset(brushContextDisRight.extent()[1],+facteurBrusNorRight) ];
			}
			break;
		case "h":
			facteurBrusNorRight = (d3.time.hours(brushContextNorRight.extent()[0],brushContextNorRight.extent()[1])).length;
			if(lockedRight){
				extentNorRight = [brushContextDisRight.extent()[1], brushContextNorRight.extent()[1]];
			}else{
				extentNorRight = [brushContextDisRight.extent()[1],d3.time.hour.offset(brushContextDisRight.extent()[1],+facteurBrusNorRight) ];
			}
			break;
		case "d":
			facteurBrusNorRight = (d3.time.days(brushContextNorRight.extent()[0],brushContextNorRight.extent()[1])).length;
			if(lockedRight){
				extentNorRight = [brushContextDisRight.extent()[1], brushContextNorRight.extent()[1]];
			}else{
				extentNorRight = [brushContextDisRight.extent()[1],d3.time.day.offset(brushContextDisRight.extent()[1],+facteurBrusNorRight) ];
			}
			break;
//		case 3:
//			facteurBrusNorRight = (d3.time.weeks(brushContextNorRight.extent()[0],brushContextNorRight.extent()[1])).length;
//			if(lockedRight){
//				extentNorRight = [brushContextDisRight.extent()[1], brushContextNorRight.extent()[1]];
//			}else{
//				extentNorRight = [brushContextDisRight.extent()[1],d3.time.week.offset(brushContextDisRight.extent()[1],+facteurBrusNorRight) ];
//			}
//			break;
		case "b":
			facteurBrusNorRight = (d3.time.months(brushContextNorRight.extent()[0],brushContextNorRight.extent()[1])).length;
			if(lockedRight){
				extentNorRight = [brushContextDisRight.extent()[1], brushContextNorRight.extent()[1]];
			}else{
				extentNorRight = [brushContextDisRight.extent()[1],d3.time.month.offset(brushContextDisRight.extent()[1],+facteurBrusNorRight) ];
			}
			break;
		case "y":
			facteurBrusNorRight = (d3.time.years(brushContextNorRight.extent()[0],brushContextNorRight.extent()[1])).length;
			if(lockedRight){
				extentNorRight = [brushContextDisRight.extent()[1], brushContextNorRight.extent()[1]];
			}else{
				extentNorRight = [brushContextDisRight.extent()[1],d3.time.year.offset(brushContextDisRight.extent()[1],+facteurBrusNorRight) ];
			}
			break;
	}
	
	
	//Changing range and domain in BrushContextNorRight
	xScaleContextNorRight.range([xScaleContext(brushContextDisRight.extent()[1]),widthIntern ])
						 .domain([brushContextDisRight.extent()[1], dateMaxRange]);
	
	context.select(".brushNorRight").call(brushContextNorRight.extent(extentNorRight));
	
	//Changing range and domain in DisRight
	xScaleContextDisRight.range([xScaleContext(brushContext.extent()[1]), xScaleContext(extentNorRight[1]) ])
						.domain([ brushContext.extent()[1], extentNorRight[1] ]);
						

	updateRectanglesAndLinksInFocus();
	
	// ANIMATION
	callAnimation();

}

function brushContextNorRightMove() {
	
	var extent0 = brushContextNorRight.extent(); 
	var extent1 = loadExtent1(extent0);

	d3.select(this).call(brushContextNorRight.extent(extent1));
	
	xScaleContextDisRight.range([xScaleContext(brushContext.extent()[1]), xScaleContext(brushContextNorRight.extent()[1])])
						 .domain([brushContext.extent()[1], brushContextNorRight.extent()[1]]);
	
	context.select(".brushDisRight").call(brushContextDisRight);

	updateRectanglesAndLinksInFocus();
	
	// ANIMATION
	callAnimation();
}


function updateRectanglesAndLinksInFocus(){
	
	var objNl = selectScaleFocus("NL");
	var objFl = selectScaleFocus("FL");
	var objZ = selectScaleFocus("Z");
	var objFr = selectScaleFocus("FR");
	var objNr = selectScaleFocus("NR");
	var heightVertical = marginFocus.top + heightFocus + 15;// marginContext.top
	
	
	// --------------------------------------------------------
	var verticalNl = focus.select("#linksProjetions").selectAll(".lineNorLeft").data(objNl);
	
	// update
	verticalNl.attr("class", "lineNorLeft")
//			.transition()
//			.duration(opts.animation ? opts.durationTransitionAnimation:opts.durationTransitionRectaLine)
//			.ease(opts.ease)
				.attr("x1", function(d) {return scalesFocus[d.index](d.domainMin)})
				.attr("y1", heightFocus)
				.attr("x2", function(d) {return xScaleContext(brushContextNorLeft.extent()[0])})
				.attr("y2", heightVertical);
	
	// create
	verticalNl.enter().append("line")
			.attr("class", "lineNorLeft")
			.attr("x1", function(d) {return scalesFocus[d.index](d.domainMin)})
			.attr("y1", heightFocus)
			.attr("x2", function(d) {return xScaleContext(brushContextNorLeft.extent()[0])}) 
			.attr("y2", heightVertical);
	// exit
	verticalNl.exit().remove();

	
	var verticalFl = focus.select("#linksProjetions").selectAll(".lineDisLeft").data(objNl);
	// update
	verticalFl.attr("class", "lineDisLeft")
//			.transition()
//			.duration(opts.animation ? opts.durationTransitionAnimation:opts.durationTransitionRectaLine)
//			.ease(opts.ease)
				.attr("x1", function(d) {return scalesFocus[d.index](d.domainMax)})
				.attr("y1", heightFocus)
				.attr("x2", function(d) {return xScaleContext(brushContextDisLeft.extent()[0])})
				.attr("y2", heightVertical);
	// create
	verticalFl.enter().append("line")
			.attr("class", "lineDisLeft")
			.attr("x1",function(d) {return scalesFocus[d.index](d.domainMax)}) //d.index = 0 always in local
			.attr("y1", heightFocus)
			.attr("x2", function(d) {return xScaleContext(brushContextDisLeft.extent()[0])})
			.attr("y2", heightVertical);
	// exit
	verticalFl.exit().remove();

	var verticalZl = focus.select("#linksProjetions").selectAll(".lineZoomLeft").data(objZ);
	// update
	verticalZl.attr("class", "lineZoomLeft")
//			.transition()
//			.duration(opts.animation ? opts.durationTransitionAnimation:opts.durationTransitionRectaLine)
//			.ease(opts.ease)
				.attr("x1", function(d) {return scalesFocus[d.index](d.domainMin)})
				.attr("y1", heightFocus)
				.attr("x2", function(d) {return xScaleContext(brushContext.extent()[0])})
				.attr("y2", heightVertical);
	// create
	verticalZl.enter().append("line")
			.attr("class", "lineZoomLeft")
			.attr("x1",function(d) {return scalesFocus[d.index](d.domainMin)})
			.attr("y1", heightFocus)
			.attr("x2", function(d) {return xScaleContext(brushContext.extent()[0])})
			.attr("y2", heightVertical);
	// exit
	verticalZl.exit().remove();

	var verticalZr = focus.select("#linksProjetions").selectAll(".lineZoomRight").data(objZ);
	// update
	verticalZr.attr("class", "lineZoomRight")
//			.transition()
//			.duration(opts.animation ? opts.durationTransitionAnimation:opts.durationTransitionRectaLine)
//			.ease(opts.ease)
				.attr("x1", function(d) {return scalesFocus[d.index](d.domainMax)})
				.attr("y1", heightFocus)
				.attr("x2", function(d) {return xScaleContext(brushContext.extent()[1])})
				.attr("y2", heightVertical);
	// create
	verticalZr.enter().append("line")
			.attr("class", "lineZoomRight")
			.attr("x1",function(d) {return scalesFocus[d.index](d.domainMax)})
			.attr("y1", heightFocus)
			.attr("x2", function(d) {return xScaleContext(brushContext.extent()[1])})
			.attr("y2", heightVertical);
	// exit
	verticalZr.exit().remove();

	var verticalFr = focus.select("#linksProjetions").selectAll(".lineDisRight").data(objNr);
	// update
	verticalFr.attr("class", "lineDisRight")
//			.transition()
//			.duration(opts.animation ? opts.durationTransitionAnimation:opts.durationTransitionRectaLine)
//			.ease(opts.ease)
				.attr("x1", function(d) {return scalesFocus[d.index](d.domainMin)})
				.attr("y1", heightFocus)
				.attr("x2", function(d) {return xScaleContext(brushContextNorRight.extent()[0])})
				.attr("y2", heightVertical);
	// create
	verticalFr.enter().append("line")
			.attr("class", "lineDisRight")
			.attr("x1",function(d) {return scalesFocus[d.index](d.domainMin)})
			.attr("y1", heightFocus)
			.attr("x2", function(d) {return xScaleContext(brushContextNorRight.extent()[0])})
			.attr("y2", heightVertical);
	// exit
	verticalFr.exit().remove();
	

	var verticalNr = focus.select("#linksProjetions").selectAll(".lineNorRight").data(objNr);
	// update
	verticalNr.attr("class", "lineNorRight")
//			.transition()
//			.duration(opts.animation ? opts.durationTransitionAnimation:opts.durationTransitionRectaLine)
//			.ease(opts.ease)
				.attr("x1", function(d) {return scalesFocus[d.index](d.domainMax)})
				.attr("y1", heightFocus)
				.attr("x2", function(d) {return xScaleContext(brushContextNorRight.extent()[1])})
				.attr("y2", heightVertical);
	// create
	verticalNr.enter().append("line")
			.attr("class", "lineNorRight")
			.attr("x1",function(d) {return scalesFocus[d.index](d.domainMax)})
			.attr("y1", heightFocus)
			.attr("x2", function(d) {return xScaleContext(brushContextNorRight.extent()[1])})
			.attr("y2", heightVertical);
			
	// exit
	verticalNr.exit().remove();
	
	
	
	
	
	
	
	

	
	var nl = focus.select("#linksProjetions").selectAll(".focusNorLeft").data(objNl);
	// update
	nl.attr("class", "focusNorLeft")
//		.transition()
//		.duration(opts.animation ? opts.durationTransitionAnimation:opts.durationTransitionRectaLine)
//		.ease(opts.ease)
			.attr("x", function(d) {return scalesFocus[d.index](d.domainMin)})
			.attr("y", 0)
			.attr("width",function(d) {return (scalesFocus[d.index](d.domainMax) - scalesFocus[d.index](d.domainMin))})
			.attr("height", heightFocus)
//			.style("visibility","visible");
	// create
	nl.enter().append("rect")
		.attr("class", "focusNorLeft")
		.attr("x", function(d) {return scalesFocus[0](d.domainMin)})
		.attr("y", 0)
		.attr("width",function(d) {return (scalesFocus[0](d.domainMax) - scalesFocus[0](d.domainMin))})
		.attr("height", heightFocus)
//		.style("visibility","visible");
	// exit
	nl.exit().remove()


	var fl = focus.select("#linksProjetions").selectAll(".focusDisLeft").data(objFl);
	// update
	fl.attr("class", "focusDisLeft")
//		.transition()
//		.duration(opts.animation ? opts.durationTransitionAnimation:opts.durationTransitionRectaLine)
//		.ease(opts.ease)
			.attr("x", function(d) {return scalesFocus[1](d.domainMin)})
			.attr("y", 0)
			.attr("width",function(d) {return (scalesFocus[objFl.length](d.domainMax) - scalesFocus[1](d.domainMin))})
			.attr("height", heightFocus)
//			.style("visibility","visible");
	// create
	fl.enter().append("rect")
		.attr("class", "focusDisLeft")
		.attr("x",function(d) {return scalesFocus[1](d.domainMin)})
		.attr("y", 0)
		.attr("width",function(d) {return (scalesFocus[objFl.length](d.domainMax) - scalesFocus[1](d.domainMin))})
		.attr("height", heightFocus)
//		.style("visibility","visible");
	// exit
	fl.exit().remove()

	var nr = focus.select("#linksProjetions").selectAll(".focusNorRight").data(objNr);
	// update
	nr.attr("class", "focusNorRight")
//		.transition()
//		.duration(opts.animation ? opts.durationTransitionAnimation:opts.durationTransitionRectaLine)
//		.ease(opts.ease)
			.attr("x", function(d) {return scalesFocus[d.index](d.domainMin)})
			.attr("y", 0)
			.attr("width",function(d) {return (scalesFocus[d.index](d.domainMax) - scalesFocus[d.index](d.domainMin))})
			.attr("height", heightFocus)
//			.style("visibility","visible");
	// create
	nr.enter().append("rect")
		.attr("class", "focusNorRight")
		.attr("x", function(d) {return scalesFocus[d.index](d.domainMin)})
		.attr("y", 0)
		.attr("width",function(d) {return (scalesFocus[d.index](d.domainMax) - scalesFocus[d.index](d.domainMin))})
		.attr("height", heightFocus)
//		.style("visibility","visible");
	// exit
	nr.exit().remove()

	
	var fr = focus.select("#linksProjetions").selectAll(".focusDisRight").data(objFr);

	// update
	fr.attr("class", "focusDisRight")
//		.transition()
//		.duration(opts.animation ? opts.durationTransitionAnimation:opts.durationTransitionRectaLine)
//		.ease(opts.ease)
			.attr("x", function(d) {return scalesFocus[objNr[0].index - objFr.length](d.domainMin)})
			.attr("y", 0)
			.attr("width",function(d) {return (scalesFocus[objNr[0].index - 1](d.domainMax) - scalesFocus[objNr[0].index- objFr.length](d.domainMin))})
			.attr("height", heightFocus)
//			.style("visibility","visible");
	
	// create
	fr.enter().append("rect")
		.attr("class", "focusDisRight")
		.attr("x", function(d) {return scalesFocus[objNr[0].index - objFr.length](d.domainMin)})
		.attr("y", 0)
		.attr("width",function(d) {return (scalesFocus[objNr[0].index - 1](d.domainMax) - scalesFocus[objNr[0].index- objFr.length](d.domainMin))})
		.attr("height", heightFocus)
//		.style("visibility","visible");
	// exit
	fr.exit().remove()
	
	var z = focus.select("#linksProjetions").selectAll(".focusZoom").data(objZ);
	// update
	z.attr("class", "focusZoom")
//		.transition()
//		.duration(opts.animation ? opts.durationTransitionAnimation:opts.durationTransitionRectaLine)
//		.ease(opts.ease)
			.attr("x", function(d) {return scalesFocus[d.index](d.domainMin)})
			.attr("y", 0)
			.attr("width",function(d) {return (scalesFocus[d.index](d.domainMax) - scalesFocus[d.index](d.domainMin))})
			.attr("height", heightFocus)
//			.style("visibility","visible");
	
	// create
	z.enter().append("rect")
			.attr("class", "focusZoom")
			.attr("x", function(d) {return scalesFocus[d.index](d.domainMin)})
			.attr("y", 0)
			.attr("width",function(d) {return (scalesFocus[d.index](d.domainMax) - scalesFocus[d.index](d.domainMin))})
			.attr("height", heightFocus)
//			.style("visibility","visible");
	// exit
	z.exit().remove()
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//CANDADO

	var candadoLeft = context.selectAll("#candadoLeft").data([1]);
		
	//update
	candadoLeft.attr("x",xScaleContext(brushContextNorLeft.extent()[0])-8);
	
	//create
	candadoLeft.enter().append("image")
			.attr("id","candadoLeft")
			.attr("class","candadoLeft")
			.attr({
				'xlink:href': opts.pathCandadoClose,  // can also add svg file here
				x: xScaleContext(brushContextNorLeft.extent()[0])-8,
				y: heightContext,
				width: 16,
				height: 16
			})
			.style("cursor","hand")
			.style("visibility","visible")
			;
		
	
	var candadoRight = context.selectAll("#candadoRight").data([1]);
		
	//update
	candadoRight.attr("x",xScaleContext(brushContextNorRight.extent()[1])-8);
	
	//create
	candadoRight.enter().append("image")
			.attr("id","candadoRight")
			.attr("class","candadoRight")
			.attr({
				'xlink:href': opts.pathCandadoClose,  // can also add svg file here
				x: xScaleContext(brushContextNorRight.extent()[1])-8,
				y: heightContext,
				width: 16,
				height: 16
			})
			.style("cursor","hand")
			;
	
	
}



/**
 * FOCUS Get scale in focus
 * 
 * @param codeScale
 * @returns {Array}
 */
function selectScaleFocus(codeScale) {
	var result = [];
	count = 0;

	for (var i = 0; i < rangesDomainFocus.length; i++) {
		for (var j = 0; j < rangesDomainFocus[i].values.length; j++) {
			if (codeScale == rangesDomainFocus[i].values[j].key
					&& codeScale != "FL" && codeScale != "FR") {
				var obj = {};
				obj.index = count;
				obj.domainMin = rangesDomainFocus[i].values[j].domain[0];
				obj.domainMax = rangesDomainFocus[i].values[j].domain[1];
				result.push(obj);
			} else if (codeScale == rangesDomainFocus[i].values[j].key
					&& codeScale == "FL"
					|| codeScale == rangesDomainFocus[i].values[j].key
					&& codeScale == "FR") {
				var obj = {};
				obj.index = count;
				obj.domainMin = rangesDomainFocus[i].domain[0];
				obj.domainMax = rangesDomainFocus[i].domain[1];
				result.push(obj);
			}
			count++;
		}
	}

	return result;
}

/**
 * FOCUS Get axis in focus given a date
 * 
 * @param date
 * @returns {Number}
 */
function selectAxisFocus(date) {
//	console.log("fecha es:",date)
	var index = 0;
	var count = 0;
	for (var i = 0; i < rangesDomainFocus.length; i++) {
		for (var j = 0; j < rangesDomainFocus[i].values.length; j++) {
			if (date >= (rangesDomainFocus[i].values[j].domain[0]) //>=
					&& date <= (rangesDomainFocus[i].values[j].domain[1])) {
				index = count;
			}
			count++;
		}
	}
//	if(date<=dateMinRange){
//		index = 0; //first range
//	}else if(date>=dateMaxRange){
//		index = rangesDomainFocus.length; //last range
//		console.log("hey  : " + index)
//	}
	if(date<=brushContextNorLeft.extent()[0]){
		index = 0; //first range
	}else if(date>=brushContextNorRight.extent()[1]){
		index = count - 1;// rangesDomainFocus.length; //last range
	}
	return index;
}
/**
 * FOCUS Append areas
 * 
 * @param index
 * @returns
 */
function areaFocus(d, index) {
	// Update each x axis in focus : Local, Distortion, Detailed
//	for (var i = 0; i < axisFocus.length; i++) {
//		focus.selectAll(".x.axis.focus" + i).call(axisFocus[i]);
//	}
	
	/* NORMAL AREA */
	areaNormal = d3.svg.area()
			.interpolate(opts.interpolateType)
			.defined(function(d) {
						var var1, var2, var3, var4;
						var interpolationLeft1, interpolationLeft2, interpolationRight1, interpolationRight2; 
						switch (polarityTemporal) {
							case "m":
								var1 = d3.time.minute.offset(brushContextNorLeft.extent()[0], -stepTemporal);
								var2 = d3.time.minute.offset(brushContextNorLeft.extent()[1], stepTemporal);
								
								var3 = d3.time.minute.offset(brushContextNorRight.extent()[0], -stepTemporal);
								var4 = d3.time.minute.offset(brushContextNorRight.extent()[1], stepTemporal);
								//
								interpolationLeft1 = d3.time.minute.offset(brushContextNorLeft.extent()[0],-1*stepTemporal);
								interpolationLeft2 = d3.time.minute.offset(brushContextNorLeft.extent()[1],-2*stepTemporal);
								interpolationRight1 = d3.time.minute.offset(brushContextNorRight.extent()[0],+3*stepTemporal);
								interpolationRight2 = d3.time.minute.offset(brushContextNorRight.extent()[1],+1*stepTemporal);
								break;
							case "h":
								var1 = d3.time.hour.offset(brushContextNorLeft.extent()[0], -stepTemporal);
								var2 = d3.time.hour.offset(brushContextNorLeft.extent()[1], stepTemporal);
								var3 = d3.time.hour.offset(brushContextNorRight.extent()[0], -stepTemporal);
								var4 = d3.time.hour.offset(brushContextNorRight.extent()[1], stepTemporal);
								//
								interpolationLeft1 = d3.time.hour.offset(brushContextNorLeft.extent()[0],-1*stepTemporal);
								interpolationLeft2 = d3.time.hour.offset(brushContextNorLeft.extent()[1],-2*stepTemporal);
								interpolationRight1 = d3.time.hour.offset(brushContextNorRight.extent()[0],+3*stepTemporal);
								interpolationRight2 = d3.time.hour.offset(brushContextNorRight.extent()[1],+1*stepTemporal);
								break;
							case "d":
								var1 = d3.time.day.offset(brushContextNorLeft.extent()[0], -stepTemporal);
								var2 = d3.time.day.offset(brushContextNorLeft.extent()[1], stepTemporal);
								var3 = d3.time.day.offset(brushContextNorRight.extent()[0], -stepTemporal);
								var4 = d3.time.day.offset(brushContextNorRight.extent()[1], stepTemporal);			
								//
								interpolationLeft1 = d3.time.day.offset(brushContextNorLeft.extent()[0],-1*stepTemporal);
								interpolationLeft2 = d3.time.day.offset(brushContextNorLeft.extent()[1],-2*stepTemporal);
								interpolationRight1 = d3.time.day.offset(brushContextNorRight.extent()[0],+3*stepTemporal);
								interpolationRight2 = d3.time.day.offset(brushContextNorRight.extent()[1],+1*stepTemporal);
								break;
//							case 3:
//								var1 = d3.time.week.offset(brushContextNorLeft.extent()[0], -stepTemporal);
//								var2 = d3.time.week.offset(brushContextNorLeft.extent()[1], stepTemporal);
//								var3 = d3.time.week.offset(brushContextNorRight.extent()[0], -stepTemporal);
//								var4 = d3.time.week.offset(brushContextNorRight.extent()[1], stepTemporal);	
//								//
//								interpolationLeft1 = d3.time.week.offset(brushContextNorLeft.extent()[0],-1*stepTemporal);
//								interpolationLeft2 = d3.time.week.offset(brushContextNorLeft.extent()[1],-2*stepTemporal);
//								interpolationRight1 = d3.time.week.offset(brushContextNorRight.extent()[0],+3*stepTemporal);
//								interpolationRight2 = d3.time.week.offset(brushContextNorRight.extent()[1],+1*stepTemporal);
//								break;
							case "b":
								var1 = d3.time.month.offset(brushContextNorLeft.extent()[0], -stepTemporal);
								var2 = d3.time.month.offset(brushContextNorLeft.extent()[1], stepTemporal);
								var3 = d3.time.month.offset(brushContextNorRight.extent()[0], -stepTemporal);
								var4 = d3.time.month.offset(brushContextNorRight.extent()[1], stepTemporal);	
								//
								interpolationLeft1 = d3.time.month.offset(brushContextNorLeft.extent()[0],-1*stepTemporal);
								interpolationLeft2 = d3.time.month.offset(brushContextNorLeft.extent()[1],-2*stepTemporal);
								interpolationRight1 = d3.time.month.offset(brushContextNorRight.extent()[0],+3*stepTemporal);
								interpolationRight2 = d3.time.month.offset(brushContextNorRight.extent()[1],+1*stepTemporal);
								break;
							case "y":
								var1 = d3.time.year.offset(brushContextNorLeft.extent()[0], -stepTemporal);
								var2 = d3.time.year.offset(brushContextNorLeft.extent()[1], stepTemporal);
								var3 = d3.time.year.offset(brushContextNorRight.extent()[0], -stepTemporal);
								var4 = d3.time.year.offset(brushContextNorRight.extent()[1], stepTemporal);	
								//
								
								interpolationLeft1 = d3.time.year.offset(brushContextNorLeft.extent()[0],-1*stepTemporal);
								interpolationLeft2 = d3.time.year.offset(brushContextNorLeft.extent()[1],-2*stepTemporal);
								interpolationRight1 = d3.time.year.offset(brushContextNorRight.extent()[0],+3*stepTemporal);
								interpolationRight2 = d3.time.year.offset(brushContextNorRight.extent()[1],+1*stepTemporal);
								break;
						}
//						return d.date;
						if(interpolationLeft1 < dateMinRange && interpolationLeft2 < dateMinRange){
							return d.date >= (var3) && d.date <= (var4);
						}else if(interpolationRight1 > dateMaxRange && interpolationRight2 > dateMaxRange){
							return d.date >= (var1) && d.date <= (var2);
						} else{						
							return (d.date >= (var1) && d.date <= (var2))
							||     
							(d.date >= (var3) && d.date <= (var4))
							;
						}
					})
					.x(function(d) {return scalesFocus[selectAxisFocus(d.date)](d.date);})
					.y0(function(d) {return yScaleFocus(d.y0);})
					.y1(function(d) {return yScaleFocus(d.y0 + d.y);});

	/* LEFT DISTORTION */
	areaDistortionLeft = d3.svg.area()
				.interpolate(opts.interpolateType)
				.defined(function(d) {
						var var1, var2;
						var interpolationLeft1, interpolationLeft2;
						switch (polarityTemporal) {
							case "m":
								var1 = d3.time.minute.offset(brushContextDisLeft.extent()[0], -stepTemporal);
								var2 = d3.time.minute.offset(brushContextDisLeft.extent()[1], stepTemporal);
								//
								interpolationLeft1 = d3.time.minute.offset(brushContextDisLeft.extent()[0],-2*stepTemporal);
								interpolationLeft2 = d3.time.minute.offset(brushContextDisLeft.extent()[1],-2*stepTemporal);
								break;
							case "h":
								var1 = d3.time.hour.offset(brushContextDisLeft.extent()[0], -stepTemporal);
								var2 = d3.time.hour.offset(brushContextDisLeft.extent()[1], stepTemporal);
								//
								interpolationLeft1 = d3.time.hour.offset(brushContextDisLeft.extent()[0],-2*stepTemporal);
								interpolationLeft2 = d3.time.hour.offset(brushContextDisLeft.extent()[1],-2*stepTemporal);
								break;
							case "d":
								var1 = d3.time.day.offset(brushContextDisLeft.extent()[0], -stepTemporal);
								var2 = d3.time.day.offset(brushContextDisLeft.extent()[1], stepTemporal);
								//
								interpolationLeft1 = d3.time.day.offset(brushContextDisLeft.extent()[0],-2*stepTemporal);
								interpolationLeft2 = d3.time.day.offset(brushContextDisLeft.extent()[1],-2*stepTemporal);
								break;
//							case 3:
//								var1 = d3.time.week.offset(brushContextDisLeft.extent()[0], -stepTemporal);
//								var2 = d3.time.week.offset(brushContextDisLeft.extent()[1], stepTemporal);
//								//
//								interpolationLeft1 = d3.time.week.offset(brushContextDisLeft.extent()[0],-2*stepTemporal);
//								interpolationLeft2 = d3.time.week.offset(brushContextDisLeft.extent()[1],-2*stepTemporal);
//								break;
							case "b":
								var1 = d3.time.month.offset(brushContextDisLeft.extent()[0], -stepTemporal);
								var2 = d3.time.month.offset(brushContextDisLeft.extent()[1], stepTemporal);
								//
								interpolationLeft1 = d3.time.month.offset(brushContextDisLeft.extent()[0],-2*stepTemporal);
								interpolationLeft2 = d3.time.month.offset(brushContextDisLeft.extent()[1],-2*stepTemporal);
								break;
							case "y":
								var1 = d3.time.year.offset(brushContextDisLeft.extent()[0], -stepTemporal);
								var2 = d3.time.year.offset(brushContextDisLeft.extent()[1], stepTemporal);
								//
								interpolationLeft1 = d3.time.year.offset(brushContextDisLeft.extent()[0],-2*stepTemporal);
								interpolationLeft2 = d3.time.year.offset(brushContextDisLeft.extent()[1],-2*stepTemporal);
								break;
						}
						if(interpolationLeft1 < dateMinRange && interpolationLeft2 < dateMinRange ){
							return false;
						}
						return d.date >= (var1) && d.date <= (var2)
					})
					.x(function(d) {return scalesFocus[selectAxisFocus(d.date)](d.date);})
					.y0(function(d) {return yScaleFocus(d.y0);})
					.y1(function(d) {return yScaleFocus(d.y0 + d.y);});

	/* ZOOM */
	areaZoom = d3.svg.area() 
			.interpolate(opts.interpolateType)
			.defined(function(d) {
				var var1, var2;
				switch (polarityTemporal) {
					case "m":
						var1 = d3.time.minute.offset(brushContext.extent()[0],-stepTemporal);
						var2 = d3.time.minute.offset(brushContext.extent()[1],stepTemporal);
						break;
					case "h":
						var1 = d3.time.hour.offset(brushContext.extent()[0],-stepTemporal);
						var2 = d3.time.hour.offset(brushContext.extent()[1],stepTemporal);
						break;
					case "d":
						var1 = d3.time.day.offset(brushContext.extent()[0],-stepTemporal);
						var2 = d3.time.day.offset(brushContext.extent()[1],stepTemporal);
						break;
//					case 3:
//						var1 = d3.time.week.offset(brushContext.extent()[0],-stepTemporal);
//						var2 = d3.time.week.offset(brushContext.extent()[1],stepTemporal);
//						break;
					case "b":
						var1 = d3.time.month.offset(brushContext.extent()[0],-stepTemporal);
						var2 = d3.time.month.offset(brushContext.extent()[1],stepTemporal);
						break;
					case "y":
						var1 = d3.time.year.offset(brushContext.extent()[0],-stepTemporal);
						var2 = d3.time.year.offset(brushContext.extent()[1],stepTemporal);
						break;
				}
//				return d.date;
				return d.date >= (var1) && d.date <= (var2);
			})
			.x(function(d) { return scalesFocus[selectAxisFocus(d.date)](d.date);})
			.y0(function(d) { return yScaleFocus(d.y0);})
			.y1(function(d) { return yScaleFocus(d.y0 + d.y);});

	/* RIGHT DISTORTION */
	areaDistortionRight = d3.svg.area()
			.interpolate(opts.interpolateType)
			.defined(function(d) {
				var var1, var2;
				var interpolationRight1, interpolationRight2;
				switch (polarityTemporal) {
					case "m":
						var1 = d3.time.minute.offset(brushContextDisRight.extent()[0],-stepTemporal);
						var2 = d3.time.minute.offset(brushContextDisRight.extent()[1], stepTemporal);
						//
						interpolationRight1 = d3.time.minute.offset(brushContextDisRight.extent()[0],+4*stepTemporal);
						interpolationRight2 = d3.time.minute.offset(brushContextDisRight.extent()[1],+4*stepTemporal);
						break;
					case "h":	
						var1 = d3.time.hour.offset(brushContextDisRight.extent()[0],-stepTemporal);
						var2 = d3.time.hour.offset(brushContextDisRight.extent()[1], stepTemporal);
						//
						interpolationRight1 = d3.time.hour.offset(brushContextDisRight.extent()[0],+4*stepTemporal);
						interpolationRight2 = d3.time.hour.offset(brushContextDisRight.extent()[1],+4*stepTemporal);
						break;
					case "d":
						var1 = d3.time.day.offset(brushContextDisRight.extent()[0],-stepTemporal);
						var2 = d3.time.day.offset(brushContextDisRight.extent()[1], stepTemporal);
						//
						interpolationRight1 = d3.time.day.offset(brushContextDisRight.extent()[0],+4*stepTemporal);
						interpolationRight2 = d3.time.day.offset(brushContextDisRight.extent()[1],+4*stepTemporal);
						break;
//					case 3:
//						var1 = d3.time.week.offset(brushContextDisRight.extent()[0],-stepTemporal);
//						var2 = d3.time.week.offset(brushContextDisRight.extent()[1], stepTemporal);
//						//
//						interpolationRight1 = d3.time.week.offset(brushContextDisRight.extent()[0],+4*stepTemporal);
//						interpolationRight2 = d3.time.week.offset(brushContextDisRight.extent()[1],+4*stepTemporal);
//						break;
					case "b":
						var1 = d3.time.month.offset(brushContextDisRight.extent()[0],-stepTemporal);
						var2 = d3.time.month.offset(brushContextDisRight.extent()[1], stepTemporal);
						//
						interpolationRight1 = d3.time.month.offset(brushContextDisRight.extent()[0],+4*stepTemporal);
						interpolationRight2 = d3.time.month.offset(brushContextDisRight.extent()[1],+4*stepTemporal);
						break;
					case "y":
						var1 = d3.time.year.offset(brushContextDisRight.extent()[0],-stepTemporal);
						var2 = d3.time.year.offset(brushContextDisRight.extent()[1], stepTemporal);
						//
						interpolationRight1 = d3.time.year.offset(brushContextDisRight.extent()[0],+4*stepTemporal);
						interpolationRight2 = d3.time.year.offset(brushContextDisRight.extent()[1],+4*stepTemporal);
						break;
				}
				if(interpolationRight1 > dateMaxRange && interpolationRight2 > dateMaxRange ){
					return false;
				}
				return d.date >= (var1) && d.date <= (var2);
			})
			.x(function(d) {return scalesFocus[selectAxisFocus(d.date)](d.date);})
			.y0(function(d) {return yScaleFocus(d.y0);})
			.y1(function(d) {return yScaleFocus(d.y0 + d.y);});

	switch (index) {
		case 0:
//			return null;
			return areaNormal(d.values);
			break;
		case 1:
//			return null;
			return areaDistortionLeft(d.values);
			break;
		case 2:
//			return null;
			return areaDistortionRight(d.values);
			break;
		case 3:
//			return null;
			return areaZoom(d.values);
			break;
	}
}

/**
 * CONTEXT Calcule each interval in brushExtent
 * 
 * @param brushExtent
 * @param index
 * @returns {Array}
 */
function calculeExtent(brushExtent, index) {
	var extent = [], 
	d0, 
	d1;
	switch (polarityTemporal) {
		case "m":
			d0 = d3.time.minute.offset(brushExtent[0], index * stepTemporal );
			d1 = d3.time.minute.offset(brushExtent[0], index * stepTemporal + stepTemporal);
			break;
		case "h":
			d0 = d3.time.hour.offset(brushExtent[0], index * stepTemporal );
			d1 = d3.time.hour.offset(brushExtent[0], index * stepTemporal + stepTemporal);
			break;
		case "d":
			d0 = d3.time.day.offset(brushExtent[0], index * stepTemporal );
			d1 = d3.time.day.offset(brushExtent[0], index * stepTemporal + stepTemporal);			
			break;
//		case 3:
//			d0 = d3.time.week.offset(brushExtent[0], index * stepTemporal );
//			d1 = d3.time.week.offset(brushExtent[0], index * stepTemporal + stepTemporal);			
//			break;
		case "b":
			d0 = d3.time.month.offset(brushExtent[0], index * stepTemporal );
			d1 = d3.time.month.offset(brushExtent[0], index * stepTemporal + stepTemporal);				
			break;
		case "y":
			d0 = d3.time.year.offset(brushExtent[0], index * stepTemporal );
			d1 = d3.time.year.offset(brushExtent[0], index * stepTemporal + stepTemporal);				
			break;
	}

	extent = [ d0, d1 ]
	return extent;
}

/**
 * LOAD DATA Parser Date and Time and Value from Path Source
 * 
 * @param d
 * @returns {Array}
 */
function type(d) {
	console.log("parsing..")
	d.date = parseDate(d.Date + " " + d.Time);
	d.value = +d.value; // Value numeric
	return [ d.date, d.value ];
}

/**
 * 
 * @param huedegree
 * @returns {String}
 */
function GetRGBColorString(huedegree) {
	var rgbcolor = hsvToRgb(huedegree, 80, 80);
	var rgbstring = "rgb(" + rgbcolor[0] + "," + rgbcolor[1] + ","
			+ rgbcolor[2] + ")";
	return rgbstring;
}

function hsvToRgb(h, s, v) {
	var r, g, b;
	var i;
	var f, p, q, t;
	// Hue range from 0 to 360
	// Make sure our arguments stay in-range

	h = Math.max(0, Math.min(360, h));
	s = Math.max(0, Math.min(100, s));
	v = Math.max(0, Math.min(100, v));

	// We accept saturation and value arguments from 0 to 100, however, the
	// saturation and value are calculated from a range of 0 to 1. We make
	// That conversion here.
	s /= 100;
	v /= 100;

	if (s == 0) {
		// Achromatic (grey)
		r = g = b = v;
		return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255) ];
	}

	h /= 60; // sector 0 to 5
	i = Math.floor(h);
	f = h - i; // factorial part of h
	p = v * (1 - s);
	q = v * (1 - s * f);
	t = v * (1 - s * (1 - f));

	switch (i) {
	case 0:
		r = v;
		g = t;
		b = p;
		break;

	case 1:
		r = q;
		g = v;
		b = p;
		break;

	case 2:
		r = p;
		g = v;
		b = t;
		break;

	case 3:
		r = p;
		g = q;
		b = v;
		break;

	case 4:
		r = t;
		g = p;
		b = v;
		break;

	default: // case 5:
		r = v;
		g = p;
		b = q;
	}
	return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255) ];
}


function brushStart(){
	blocage = true;
}


function brushEnd(){
	blocage = false;
	if (!opts.animation) {
		updateFocus();
	}
}


function createBrushInContext(){
	
	//Getting Averange date depends of stepTemporal
	
	indexDateAveRange = Math.round(timeWindow.length/2);
	var extentBrushContext;
	extentBrushContext = [timeWindow[(indexDateAveRange - opts.factBrushContext/2)],timeWindow[(indexDateAveRange + opts.factBrushContext/2)]];
	
	//Colors bars position in scale
//	var barNorLeft = timeWindow[(indexDateAveRange - opts.factBrushContext/2 - opts.factBrushFisheye - opts.factBrushNormal-10)];
	var barNorLeft = dateMinRange; 
	var barDisLeft = timeWindow[(indexDateAveRange - opts.factBrushContext/2 - opts.factBrushFisheye)];
	var barDisRight = timeWindow[(indexDateAveRange + opts.factBrushContext/2 + opts.factBrushFisheye)];
	var barNorRight = dateMaxRange; 
//	var barNorRight = timeWindow[(indexDateAveRange + opts.factBrushContext/2 + opts.factBrushFisheye + opts.factBrushNormal)];

	brushContext = d3.svg.brush()
					.x(xScaleContext)
					.extent(extentBrushContext)
					.on("brushstart",brushStart)
					.on("brush", brushContextMove)
					.on("brushend", brushEnd);
	
	//
	brushContextHistoric = brushContext.extent();
	
	//NorLeft
	xScaleContextNorLeft = d3.time.scale()
								.range([ 0, xScaleContext(barDisLeft) ])
								.domain([ barNorLeft, barDisLeft ]);//star in dateMinRange
	
	brushContextNorLeft = d3.svg.brush()
								.x(xScaleContextNorLeft)
								.extent([barNorLeft, barDisLeft])
								.on("brushstart", brushStart)
								.on("brush", brushContextNorLeftMove)
								.on("brushend", brushEnd);

	
	//DisLeft
	xScaleContextDisLeft = d3.time.scale()
							.range([0, xScaleContext(brushContext.extent()[0])])
							.domain([barNorLeft, brushContext.extent()[0]]);
	
	var extentBrushContextDisLeft = [timeWindow[(indexDateAveRange - opts.factBrushContext/2 - opts.factBrushFisheye)], brushContext.extent()[0] ];

	brushContextDisLeft = d3.svg.brush()
								.x(xScaleContextDisLeft)
								.extent(extentBrushContextDisLeft)
								.on("brushstart", brushStart) // click down
								.on("brush", brushContextDisLeftMove) // move
								.on("brushend", brushEnd); // 

	

	//NorRight
	xScaleContextNorRight = d3.time.scale()
									.range([ xScaleContext(barDisRight), widthIntern ])
									.domain([ barDisRight, barNorRight ]);

	brushContextNorRight = d3.svg.brush()
								.x(xScaleContextNorRight)
								.extent([barDisRight, barNorRight])
								.on("brushstart", brushStart)
								.on("brush", brushContextNorRightMove)
								.on("brushend", brushEnd);

	
	
	//DisRight
	xScaleContextDisRight = d3.time.scale()
								.range([ xScaleContext(brushContext.extent()[1]), widthIntern])
								.domain([ brushContext.extent()[1], barNorRight ]);

	var extentBrushContextDisRight = [brushContext.extent()[1],timeWindow[(indexDateAveRange + opts.factBrushContext/2 + opts.factBrushFisheye)]]

	brushContextDisRight = d3.svg.brush()
								.x(xScaleContextDisRight)
								.extent(extentBrushContextDisRight)
								.on("brushstart", brushStart)
								.on("brush", brushContextDisRightMove)
								.on("brushend", brushEnd);

}