var opts = {
	log : false,
	animation: true,
	showLimitsAreas: false,
	//
	fadingColors: false,
	fadingColorsFactor: 1.15, //brightness of fadingColor
	//
	showOutlineLayers: false,
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
	//OPACITY
	opacityFlowFocusSelected : 1,
	opacityFlowFocusDeselected : 0.20, //
	opacityTextLabel : 1,
	opacityTextLabelSelected : 1,
	opacityTextLabelDeselected : 0.25,
	strokeWidth : 2, //1.7
	//
	tooltipTransitionMouseMove : 1,
	tooltipTransitionMouseOut : 1,
	//
	minSizeTextLabel : 15,//Minimum label size of text in label flow
	maxSizeTextLabel : 35,//Maximum label size of text in label flow
	//
	//
	pathCandadoOpen: ".\\img\\icon_lock_open.svg",
	pathCandadoClose: ".\\img\\icon_lock_close.svg",
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
};


var svg_multiresolution_vis; 
var blocage = false;
var tooltip;
var tooltipFlag = new Date();

//
var sDisLeft;
var sDisRight;

//
var scaleTextLabel = d3.scale.linear();
var nest_by_key = d3.nest().key(function(d) {return d.key;});
var stack = d3.layout.stack()
				.offset(opts.offsetType)
				.order(orderTest)
				.values(function(d) {return d.values;})
				.x(function(d) {return d.date;})
				.y(function(d) {return d.value;});

function orderTest(data) {
	return d3.range(data.length);
}

//===============================================
/* FOCUS */
var focus;
var yScaleFocus; 
var yAxisFocus;
var scalesFocus = []; 
var axisFocus = [];
var rangesDomainFocus=[];
var marginFocus;
var heightFocus;
//===============================================

//===============================================
/*  CONTEXT */
var areaContext = d3.svg.area()
					.interpolate(opts.interpolateType)
					.x(function(d) { return xScaleContext(d.date);})
					.y0(function(d) {return yScaleContext(d.y0);})
					.y1(function(d) {return yScaleContext(d.y0 + d.y);}); 

var marginContext;
var widthIntern;
var heightContext;

var flowContext; 
var context;
var beginContext;

//AXIS
var xAxisContext; 
var yAxisContext;

//SCALE
var yScaleContext; 
var xScaleContext;
var xScaleContextDisLeft;
var xScaleContextNorLeft; 
var xScaleContextDisRight; 
var xScaleContextNorRight;

//BRUSH
var brushContext;
var brushContextDisLeft; 
var brushContextNorLeft; 
var brushContextDisRight; 
var brushContextNorRight;

//To improve the responde of the app
//to just update data when there is a really change of the mouse pointer
var brushContextFlag = [];
var brushContextNorLeftFlag = [];
var brushContextNorRightFlag = [];
var brushContextDisLeftFlag = [];
var brushContextDisRightFlag = [];

//==================================================
//DATA CURRENTLY
var dataCurrentlyContext;
var dataCurrentlyFocus;
var data_bottom_level;
var data_top_level;
//=================================================

var lockedLeft = true;
var lockedRight = true;


function updateFlows(){
	
//	console.log(nivel_alto)
	
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
	});
	
	//Update Axis
	var max = d3.max(nivel_alto, function(d) {return d.y0 + d.y;});
	
	yScaleContext.domain([ 0, max]);
	
	//Flows in OVERVIEW
	var fContext = context.select("#flowsInContext").selectAll(".area") //just for 4 flow, 1 level
						.data(dataCurrentlyContext,function (d){return d.key;});

	//UPDATE Context
	fContext.transition()
			.duration(opts.durationTransition)
				.attr("d",  function(d) {return areaContext(d.values);})
				.style({
						"fill" : function(d) {return d.color;},
						"stroke" : function(d) {return d.color;},
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
					"fill" : function(d) {return d.color;},
					"stroke" : function(d) {return d.color;},
					"opacity":1
			});
	
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
	});

	//Update Axis
	var max = d3.max(dataCurrentlyFocus, function(aray){
		return d3.max(aray.values,function(d){return d.y0+d.y;});
	});
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
							"fill" : function(d) {return d.color;},
							"stroke" : function(d){return opts.showOutlineLayers ? opts.outlineLayersColor : d.color;}
					});

	//CREATE
	flowFocusNormal.enter()
				.append("path")
				.attr("id", function(d){return "focus_area0_" + d.key;})
				.attr("class", function(d){return "focus area0 " + d.key;})
				.style("opacity",0)
			.transition(t)
			.duration(opts.durationTransition)
				.attr("d", function(d) {return areaFocus(d, 0);})
				.style({
						"fill" : function(d) {return d.color;},
						"stroke" : function(d){return opts.showOutlineLayers ? opts.outlineLayersColor : d.color;},
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
									case 1: return opts.showOutlineLayers ? opts.outlineLayersColor : "url(#gradientLeftStroke"+ d.values[0]["key"]+")";
									case 2: return opts.showOutlineLayers ? opts.outlineLayersColor : "url(#gradientRightStroke"+ d.values[0]["key"]+")";
									case 3: return opts.showOutlineLayers ? opts.outlineLayersColor : d.color;
								}
							}
						});

		//ENTER
		flowFocusIndex.enter()
					.append("path")
					.attr("id", function(d){return "focus_area"+index+"_" + d.key;})
					.attr("class", function(d){return "focus area" +index +" "+  d.parentKey;})
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
									case 1: return opts.showOutlineLayers ? opts.outlineLayersColor : "url(#gradientLeftStroke"+ d.values[0]["key"]+")";
									case 2: return opts.showOutlineLayers ? opts.outlineLayersColor : "url(#gradientRightStroke"+ d.values[0]["key"]+")";
									case 3: return opts.showOutlineLayers ? opts.outlineLayersColor : d.color;
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
	createTextLabel();
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

function createFocusLeyend(){
//
let focus_leyend = focus.append("g").attr("id","focus-label")
							.attr("transform","translate("+ marginFocus.right +","+ marginFocus.top +")");

}

function loadMultiresolutionVis(){
	
	//create svg main and axes
	createSvg(); 
	
	//
	display(); 

	createFocusLeyend();
	



	
	d3.select("#close-alert").on("click",function(d){
		document.getElementById("alert-msg").classList.toggle("hidden");
	});
	
	d3.select("#svg-export").on("click",function() {
		beforeExport();
		var num_svg = [0,1]; //num_svg to download
		svgExport(fileName, num_svg);
	});
	
	d3.select("#time").on("mouseup", function() {
		console.log(+this.value);
		stepTemporal = +this.value;
		changeGranularity();
	});
	d3.select("#animation").on("change", function() {
		opts.animation = document.getElementById("animation").checked;
	});
	
	d3.select("#outline-layers").on("change", function() {
		opts.showOutlineLayers = document.getElementById("outline-layers").checked;
		
		for(var index=0;index<4;index++){
			focus.select("#flowsInFocus").selectAll(".focus.area" + index) 
						.style({
								"stroke" : function(d) {
									switch (index) {
										case 0: return opts.showOutlineLayers ? opts.outlineLayersColor : d.color;
										case 1: return opts.showOutlineLayers ? opts.outlineLayersColor : "url(#gradientLeftStroke"+ d.values[0]["key"]+")";
										case 2: return opts.showOutlineLayers ? opts.outlineLayersColor : "url(#gradientRightStroke"+ d.values[0]["key"]+")";
										case 3: return opts.showOutlineLayers ? opts.outlineLayersColor : d.color;
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
		opts.showLimitsAreas = document.getElementById("limit-ranges").checked;
		
		var visibleLimitRanges;
		if(opts.showLimitsAreas){
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
		updateFocus(calcule);
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
		updateFocus(calcule);
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
		updateFocus(calcule);
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
		updateFlows();
	});
	
	
//	$("#populationType .btn").click(function() {
//
//		let selectedPopulations = getCheckedPopulationType();
//		
//		console.log(selectedPopulations.length)
//		
//		if (selectedPopulations.length >= 1) {
//			//$(this).prop ("checked",true)
//			this.classList.remove("active")
//		} else {
//			myFunction();
//		}
//	})
	
	
	d3.select("#candadoLeft").on("click",function(d){
		document.getElementById("candadoLeft").classList.toggle("consin");		
		if(document.getElementById("candadoLeft").classList.contains("consin")){
			d3.select("#candadoLeft").attr('xlink:href',opts.pathCandadoOpen);
			lockedLeft = false;
		}else{
			d3.select("#candadoLeft").attr('xlink:href',opts.pathCandadoClose);
			lockedLeft = true;
		}
	});

	d3.select("#candadoRight").on("click",function(d){
		document.getElementById("candadoRight").classList.toggle("consin");		
		if(document.getElementById("candadoRight").classList.contains("consin")){
			d3.select("#candadoRight").attr('xlink:href',opts.pathCandadoOpen);
			lockedRight = false;
		}else{
			d3.select("#candadoRight").attr('xlink:href',opts.pathCandadoClose);
			lockedRight = true;
		}
	});
	
	

}

function createSvg(){

	/* Creation margin Focus */
	marginFocus = {top : 50, right : 60, bottom : 150, left : 70};
	heightFocus = (multiresolutionVisHeight) - marginFocus.top - marginFocus.bottom - 10;

	let heightGapFocusContext = 50;
	//marginFocus.bottom is the height space for the gapBetweenFocusContext and Context
	/* Creation margin Context */
	marginContext = {top : (marginFocus.top + heightFocus + heightGapFocusContext), right :  marginFocus.right, bottom : 50, left : marginFocus.left};
	heightContext = (multiresolutionVisHeight) - marginContext.top - marginContext.bottom;

	widthIntern = multiresolutionVisWidth - marginFocus.left - marginFocus.right;
	
	
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
							.attr('preserveAspectRatio', 'none');
	
	
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
							.tickFormat(customNumberFormat)
							.orient("left");

	focus.append("text")
			.attr("class", "y axis label")
			.attr("x",0 - heightFocus / 2)
			.attr("y", -marginFocus.left)
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
			.text("");


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
	
	
	xAxisContext.tickFormat(customTimeFormat);
	
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
	
	
	//To get the hierarchy for each scale in focus
	rangesDomainFocus = (nest_by_key.entries(calculateRangeFocus(opts.facteurNor, opts.facteurDis, opts.facteurZoom,"nestByEntries" )));
	// To create a new rangesDomainFocus with the result of calling a functionon every element depending
	// If it is NL, FL, Z, FR, NR.
	
	rangesDomainFocus.map(function(element) {
		if (element.key == "NL") {
			element.domain = brushContextNorLeft.extent();
			element.values.map(function(element) {element.domain = brushContextNorLeft.extent();});
		} else if (element.key == "FL") {
			element.domain = brushContextDisLeft.extent();
			element.values.map(function(element, index) {element.domain = calculeExtent(brushContextDisLeft.extent(),index);});
		} else if (element.key == "Z") {
			element.domain = brushContext.extent();
			element.values.map(function(element) {element.domain = brushContext.extent();});
		} else if (element.key == "FR") {
			element.domain = brushContextDisRight.extent();
			element.values.map(function(element, index) {element.domain = calculeExtent(brushContextDisRight.extent(),index);});
		} else if (element.key == "NR") {
			element.domain = brushContextNorRight.extent();
			element.values.map(function(element) {element.domain = brushContextNorRight.extent();});
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
							"stroke" : function(d){return opts.showOutlineLayers ? opts.outlineLayersColor : d.color}
							//"opacity": 0.7
					});
				
	for(var index=1;index<4;index++){
		focus.select("#flowsInFocus").selectAll(".focus.area" + index) //Focus Area BOTTOM hierarchy
					.data(data_bottom_level,function(d) { return d.key; })
					.enter()
					.append("path")
					.attr("id", function(d){return "focus_area"+index+"_" + d.key;})
					.attr("class", function(d){return "focus area" +index +" "+  d.key;})
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
									case 1: return opts.showOutlineLayers ? opts.outlineLayersColor : "url(#gradientLeftStroke"+ d.values[0]["key"]+")";
									case 2: return opts.showOutlineLayers ? opts.outlineLayersColor : "url(#gradientRightStroke"+ d.values[0]["key"]+")";
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
	
	var end =  new Date().toLocaleString();
	//CREATE THE LINK LINKS PROJETIONS GROUP
	focus.append("g").attr("id","linksProjetions");
	updateRectanglesAndLinksInFocus();// Rectangles BORDERS
	
	//CREATE THE POINTCHANGES GROUP
	focus.append("g").attr("id","gPointChanges");

	//TEXT LABELS GROUP
	focus.append("g").attr("id","textsLabels");
//	var dAnimation = opts.animation ? opts.durationTransitionAnimation:opts.durationTransitionMoveFlow;
	createTextLabel();
	
	getPointChanges();
	
	/* ToolTip */
	tooltip = d3.select("body").append("div")
							.attr("id", "tooltip-flow");
	
	//focus.append("g").attr("id","interseccion");
	createTooltip();
	createContextBrushes();
	createStylesBrushes();
	
	beginValidation();//To set the values at begging
	
	
	//draw data into map
	drawDataIntoMap(nivel_bajo,brushContext.extent()[0],brushContext.extent()[1]);
}

function getDataInZoomArea(){

	let dataInZoomArea = [];
	if(dataCurrentlyFocus==null){
		dataInZoomArea = data_bottom_level;
	}else{
		dataInZoomArea = dataCurrentlyFocus;
	}
	
	let dateLimMin = brushContext.extent()[0];
	let dateLimMax = brushContext.extent()[1];

	let lim = getTimeOffset(dateMaxRange, -2, polarityTemporal);
	if(dateLimMax > lim){
		dateLimMax = lim;
	}
	
	let result = [];
	dataInZoomArea.forEach(function(element,index){
		let filterValues = element.values.filter(function(obj){return (obj.date>=dateLimMin && obj.date<=dateLimMax );});
		result.push({
			"key":element.key,
			"color":element.color,
			"category":element.category,
			"values":filterValues
		})
		
	});
	
	return result;
}


///
function getPointChanges(){

	let dataInZoomArea = getDataInZoomArea();
	
	
	dataInZoomArea.forEach(function(layerInZoom){
		
		let threshold = 500000;// getAvg.apply(null,layerInZoom.values.map(d=>d.value));

		//let threshold = getAvg.apply(null,layerInZoom.values.map(d=>d.value));
		
		let dataPointDetection =getPointDetection(layerInZoom.values, threshold);
		let aryPointDetection = [];

		layerInZoom.values.forEach(function(element){
			//get date array
			let aryMatchPointDetection = dataPointDetection.map(d=>d.date);
			if(aryMatchPointDetection.indexOf(element.date)!=-1){
				aryPointDetection.push(element);
			}
		});

		//avg.apply(null, [2, 3, 4, 5]); // 3.5
		
		//focus.select("#flowsInFocus").selectAll(".focus.area" + index) 
		let points = focus.select("#gPointChanges").selectAll(".point-detection."+layerInZoom.key)
						.data(aryPointDetection,function(d){return d.date;});
		

		//update
		points.attr("cx", function(d) {return scalesFocus[selectAxisFocus(d.date)](d.date); })
				.attr("cy", function(d) {return yScaleFocus(d.y0 + d.value/2); })
				.attr("r",10)

		//enter
		points.enter().append("circle")
						.attr("class","point-detection "+layerInZoom.key)
						.attr("cx", function(d) {return scalesFocus[selectAxisFocus(d.date)](d.date); })
						.attr("cy", function(d) {return yScaleFocus(d.y0 + d.value/2); })
						.attr("r",10)
						.on("mouseover",function(){
							//console.log(this)
						});
						
			//exit
			points.exit().remove();
			
		
	})
	
	
}


///





function getTextLabels(){
	var datesForTextLabel = []; 
	
	getDataInZoomArea().forEach(function(element){
		const max = element.values.reduce(function(prev, current) {
		    return (prev.value > current.value) ? prev : current
		},{})
		datesForTextLabel.push(max);
	});
	
	//Ordering descending this array to get the maximun and minimun
	datesForTextLabel.sort(function(a,b){return a.value-b.value;});
	
	var rangeValuesText = [];
	stdDev = datesForTextLabel.forEach(function(element){
			rangeValuesText.push(element.value);
	})
	
	//Adding valueNormal attribute 
	//DONT USED VALUENORMAL, but implemented
	// var stdDev = standardDeviation(rangeValuesText);
	// var mediana = median(rangeValuesText);
	// datesForTextLabel.forEach(function(element){
	// 	element.valueNormal = (element.value-mediana)/stdDev;
	// })
	//------------------------------------------------
	
	var minValueTextLabel = 0; //datesForTextLabel[0].valueNormal;
	var maxValueTextLabel = datesForTextLabel[datesForTextLabel.length-1].value;
	
	//Scale to get the HEIGHT of the text 
	scaleTextLabel.clamp(true)
					.domain([minValueTextLabel, maxValueTextLabel])
					.range([opts.minSizeTextLabel, opts.maxSizeTextLabel]);
	
	
	//Adding coordonatesand other properties
	datesForTextLabel.forEach(function(element){
		var value = element.value;
		var font = scaleTextLabel(value).toString().concat("px ").concat(text_font_family);
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
	});
	

	return removeOverlapping(datesForTextLabel);
}

function createTextLabel(){
	var datesForTextLabel = getTextLabels();
	var textLabel = focus.select("#textsLabels").selectAll(".textLabel")
										.data(datesForTextLabel,function (d){return d.key;});
	
	//update
	textLabel
				.attr("x", function(d) {return scalesFocus[selectAxisFocus(d.date)](d.date); })
				.attr("y", function(d) {return yScaleFocus(d.y0 + d.value/2 ); }) //y0 + value/2
				.text(function(d) {return d.category;})
				.style({
						"opacity":1,
						"font-size":function(d) {return scaleTextLabel(d.value) + "px";},
						"font-family":text_font_family,
						"text-anchor":"middle",
						"pointer-events": "none"
				})

	//enter
	textLabel.enter().append("text")
					.attr("class",function(d){return "textLabel" + " " + d.parentKey + " " +d.key;})
					.attr("x", function(d) {return scalesFocus[selectAxisFocus(d.date)](d.date); })
					.attr("y", function(d) {return yScaleFocus(d.y0 + d.value/2); }) 
					.attr("dy",".35em")
					.text(function(d) {return d.category;})
					.style({
							"opacity":1,
							"font-size":function(d) {return scaleTextLabel(d.value) + "px";},
							"font-family":text_font_family,
							"text-anchor":"middle",
							"pointer-events": "none",
					})
	//exit
	textLabel.exit()
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
				// .transition()
				// .duration(opts.tooltipTransitionMouseMove)		
					.style({
							"stroke" : function(d) {
								switch (index) {
									case 0: return opts.showOutlineLayers ? opts.outlineLayersColor : d.color
									case 1: return opts.showOutlineLayers ? opts.outlineLayersColor : "url(#gradientLeftStroke"+ d.values[0]["key"]+")";
									case 2: return opts.showOutlineLayers ? opts.outlineLayersColor : "url(#gradientRightStroke"+ d.values[0]["key"]+")";
									case 3: return opts.showOutlineLayers ? opts.outlineLayersColor : d.color;
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
	
	tooltipFlag = new Date();
	
	//
	drawDataIntoMap(nivel_bajo,brushContext.extent()[0],brushContext.extent()[1])
	
	//
	ratonOutTree();
	
	for(var index = 0; index < 4; index++){//To restore opacity for every area, if area has dif opacities
		focus.select("#flowsInFocus").selectAll(".focus.area"+index) 
			.style({
				"stroke" : function(d) {	
					switch (index) {
						case 0: return opts.showOutlineLayers ? opts.outlineLayersColor : d.color;
						case 1: return opts.showOutlineLayers ? opts.outlineLayersColor : "url(#gradientLeftStroke"+ d.values[0]["key"]+")";
						case 2: return opts.showOutlineLayers ? opts.outlineLayersColor : "url(#gradientRightStroke"+ d.values[0]["key"]+")";
						case 3: return opts.showOutlineLayers ? opts.outlineLayersColor : d.color;
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
			// .on("mouseover",ratonOver)
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
						if(dateSelected.getTime() != tooltipFlag.getTime()){
							
							var valueSelected = customNumberFormat(d.values[mouseDateIndex].value)
							textsArraySelected = (d.values[mouseDateIndex].text); //ARRAY
							var formatDate;
							
							let spatial = d.values[mouseDateIndex].components.filter(d=>(d.value>0));
							coloring(spatial)
							
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
										var first_line = "<p class='title'>" + customTimeFormat(dateSelected)  + "</p>";
										var second_line = "<p class='info'>" + d.category + ": " + "<span class='value'>" + valueSelected + "</span> "+  data_type + "</p>";
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
							
							
							let timePeriod= "<h2 id='main-title-date'>" + customTimeFormat(dateSelected) + "</h2>";
							let valQuantitative = "<h2 id='main-title-quantitative'>" + valueSelected + "</h2>";
							let from = "<h2 id='main-title-from' style='background: " + d.color + "'>" + d.category + "</h2>";
							
							let to;
							if(nameFilter===""){
								to = "<h2 id='main-title-to'>" + "World" + "</h2>";
							}else{
								to = "<h2 id='main-title-to'>" + nameFilter + "</h2>";
							}
							updateMainTitleVis(timePeriod,valQuantitative,from,to);
							
							tooltipFlag = dateSelected;
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
	if(!opts.showLimitsAreas){
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
	if(!opts.showLimitsAreas){
		focus.select(".focusZoom").style({
			"visibility": "hidden"
		});
	}
}
//
//// -------------------------------------------------------
function brushDisLeftOver() {
	if(!opts.showLimitsAreas){
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
	if(!opts.showLimitsAreas){
		focus.selectAll(".focusDisLeft").style({
			"visibility": "hidden"
		});
	}
}
//
//// -------------------------------------------------------
function brushDisRightOver() {
	if(!opts.showLimitsAreas){
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
	if(!opts.showLimitsAreas){
		focus.select(".focusDisRight").style({
			"visibility": "hidden"
		});
	}
}
//
//// -------------------------------------------------------
function brushNorRightOver() {
	if(!opts.showLimitsAreas){
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
	if(!opts.showLimitsAreas){
		focus.select(".focusNorRight").style({
			"visibility": "hidden"
		});
	}
}
//
//// -------------------------------------------------------
//
function brushNorLeftOver() {
	if(!opts.showLimitsAreas){
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
	if(!opts.showLimitsAreas){
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
								.ticks(getTimePolarity(polarityTemporal),stepTemporal)
								.tickFormat("");
			
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
						axisFocus[axisFocus.length - 1].ticks(d3.time.minutes, getNumIntervalsDistortion(polarityTemporal, i, j, sDisLeft, sDisRight));
					}else{
						axisFocus[axisFocus.length - 1].ticks(getNumberOfLabels(polarityTemporal, i, j));
					}
					break;
				case "h"://hours
					if(i==1 || i==3){
						axisFocus[axisFocus.length - 1].ticks(d3.time.hours, getNumIntervalsDistortion(polarityTemporal, i, j, sDisLeft, sDisRight));
					}else{
						axisFocus[axisFocus.length - 1].ticks(getNumberOfLabels(polarityTemporal, i, j));
					}
					break;
				case "d":
					if(i==1 || i==3){
						axisFocus[axisFocus.length - 1].ticks(d3.time.days, getNumIntervalsDistortion(polarityTemporal, i, j, sDisLeft, sDisRight));
					}else{
						axisFocus[axisFocus.length - 1].ticks(getNumberOfLabels(polarityTemporal, i, j));
					}
					break;
				case "b":
					if(i==1 || i==3){
						axisFocus[axisFocus.length - 1].ticks(d3.time.months, getNumIntervalsDistortion(polarityTemporal, i, j, sDisLeft, sDisRight));
					}else{
						axisFocus[axisFocus.length - 1].ticks(getNumberOfLabels(polarityTemporal, i, j));
					}
					break;
				case "y":
					if(i==1 || i==3){
						axisFocus[axisFocus.length - 1].ticks(d3.time.years, getNumIntervalsDistortion(polarityTemporal, i, j, sDisLeft, sDisRight));
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

/**
 * FOCUS CREATION OF GRADIENTS FOR INTERPOLATE COLEURS
 */
function createGradientArrays(bottom_list) {
	
	focus.append("g").attr("id","linearGradient");
	
	/* Gradient Part */
	let gradientFocusRight = [];
	let gradientFocusLeft = [];
	let gradientFocusLeftStroke = [];
	let gradientFocusRightStroke = [];

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
		
		if(opts.fadingColors){
			colorBegin = hierarchy_father_node.color.desaturate().brighten(opts.fadingColorsFactor);	
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
	let nNorLeft = calculeNumIntervals(brushContextNorLeft,polarityTemporal, stepTemporal); 
	let nDisLeft = calculeNumIntervals(brushContextDisLeft,polarityTemporal, stepTemporal);
	let nZoom = calculeNumIntervals(brushContext,polarityTemporal, stepTemporal);
	let nDisRight = calculeNumIntervals(brushContextDisRight,polarityTemporal, stepTemporal);
	let nNorRight = calculeNumIntervals(brushContextNorRight,polarityTemporal, stepTemporal);
	let nTotal = nNorLeft + nDisLeft + nZoom + nDisRight + nNorRight;

	// Proportions
	let pNorLeft = (factNor * nNorLeft) / nTotal; 
	let pDisLeft = (factDis * nDisLeft) / nTotal; 
	let pZoom = (factZoom * nZoom)/ nTotal;
	let pDisRight = (factDis * nDisRight) / nTotal;
	let pNorRight = (factNor * nNorRight) / nTotal; 
	let pTotal = pNorLeft + pDisLeft + pZoom + pNorRight + pDisRight;
	
	//SNorLeft and SDisLeft are global
	// Size
	let sNorLeft = pNorLeft * ((widthIntern) / pTotal); 
	sDisLeft = pDisLeft * ((widthIntern) / pTotal); 
	let sZoom = pZoom * ((widthIntern) / pTotal);
	sDisRight = pDisRight * ((widthIntern) / pTotal); 
	let sNorRight = pNorRight * ((widthIntern) / pTotal);
	let sTotal = sNorLeft + sDisLeft + sZoom + sDisRight + sNorRight;
	
	// tailles-des-intervals fixes
	let iNorLeft = sNorLeft / nNorLeft;
	let iZoom = sZoom / nZoom;
	let iNorRight = sNorRight / nNorRight;

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

	if (validateDistortion(factNor, factDis, factZoom, iNorLeft, iNorRight, iZoom)) {
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

function validateDistortion(factNor, factDis, factZoom, iNorLeft, iNorRight, iZoom) {
	
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

//This is the hardest process	
function updateFocus(calcule) {
	var timerStart = Date.now();

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
	
	//HARD PART
	/* Move area */// 4 it is 3 areas
	for (var index = 0; index < 4; index++) {
		focus.selectAll(".focus.area" + index)
					.attr("d", function(d) {return areaFocus(d, index);});
	}

	createTextLabel();
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
	
	console.log("returning to back context :(")
	
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

function callAnimation() {

	let calcule = calculateRangeFocus(opts.facteurNor, opts.facteurDis, opts.facteurZoom, "callAnimation");

	if (calcule != null) {
		beginValidation();
		updateFocus(calcule);
		updateRectanglesAndLinksInFocus();
		drawDataIntoMap(nivel_bajo,brushContext.extent()[0],brushContext.extent()[1])
		getPointChanges();
	}else{
		backContext();
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
	let subHalf;
	let addHalf;
	let moyenne;
	
	if(stepTemporal==1){
		return getTimeRound(scalesFocus[selectScaleFocusPixel(mousex)].invert(mousex),polarityTemporal);
	}
	subHalf = getTimeOffset(time, -stepTemporal,polarityTemporal);
	addHalf = getTimeOffset(time, stepTemporal,polarityTemporal);
	moyenne = getTimeOffset(getTimeWindow(subHalf, addHalf, polarityTemporal, stepTemporal)[0], Math.floor(stepTemporal/2),polarityTemporal);
	if(time <= moyenne){
		return getTimeWindow(subHalf, addHalf, polarityTemporal, stepTemporal)[0];
	}else{
		return getTimeWindow(subHalf, addHalf, polarityTemporal, stepTemporal)[1];
	}
	
}

//Used to get the moyen when brush move
//depends de stepTemporal
function timeParser(time) {
	let subHalf = getTimeOffset(getTimeRound(time,polarityTemporal), -stepTemporal, polarityTemporal);
	let addHalf = getTimeOffset(getTimeRound(time,polarityTemporal), stepTemporal, polarityTemporal);
	let timeParse = getTimeWindow(subHalf, addHalf, polarityTemporal, stepTemporal)[1];
//	console.log(timeParse)
	return timeParse;
}


function brushContextMove() {
	
	let extent0 = brushContext.extent();
	let extent1 = loadExtent1(extent0);
	d3.select(this).call(brushContext.extent(extent1));		
	
	if(brushContextFlag[0].getTime() != extent1[0].getTime() || brushContextFlag[1].getTime() != extent1[1].getTime()){
		
		// Distortion Areas
		let facteurBrusDisLeft = getTimeWindow(brushContextDisLeft.extent()[0],brushContextDisLeft.extent()[1], polarityTemporal,stepTemporal).length;
		let facteurBrusDisRight =  getTimeWindow(brushContextDisRight.extent()[0],brushContextDisRight.extent()[1], polarityTemporal,stepTemporal).length; 
		
		let extentDisLeft = [getTimeOffset(brushContext.extent()[0],-facteurBrusDisLeft*stepTemporal,polarityTemporal), brushContext.extent()[0]];
		let extentDisRight = [brushContext.extent()[1], getTimeOffset(brushContext.extent()[1],+facteurBrusDisRight*stepTemporal,polarityTemporal)];
		
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
		let facteurBrusNorLeft = getTimeWindow(brushContextNorLeft.extent()[0],brushContextNorLeft.extent()[1], polarityTemporal,stepTemporal).length;
		let facteurBrusNorRight =  getTimeWindow(brushContextNorRight.extent()[0],brushContextNorRight.extent()[1], polarityTemporal,stepTemporal).length; 
		
		let extentNorLeft;
		if(lockedLeft){
			extentNorLeft = [brushContextNorLeft.extent()[0], brushContextDisLeft.extent()[0] ];	
		}else{
			extentNorLeft = [getTimeOffset(brushContextDisLeft.extent()[0],-facteurBrusNorLeft*stepTemporal,polarityTemporal), brushContextDisLeft.extent()[0]]
		}
		
		let extentNorRight
		if(lockedRight){
			extentNorRight = [brushContextDisRight.extent()[1],brushContextNorRight.extent()[1] ];
		}else{
			extentNorRight = [brushContextDisRight.extent()[1],getTimeOffset(brushContextDisRight.extent()[1],+facteurBrusNorRight*stepTemporal,polarityTemporal)];
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
		
		
		
		// ANIMATION
		callAnimation();
		
		//update the Flag
		brushContextFlag = brushContext.extent();
	}
}

function brushContextNorLeftMove() {
	
	let extent0 = brushContextNorLeft.extent(); 
	let extent1 = loadExtent1(extent0);
	d3.select(this).call(brushContextNorLeft.extent(extent1));
	
	if(brushContextNorLeftFlag[0].getTime() != extent1[0].getTime() || brushContextNorLeftFlag[1].getTime() != extent1[1].getTime()){
		
		//Changing range and domain in brushContextDifLeft
		xScaleContextDisLeft.range([xScaleContext(brushContextNorLeft.extent()[0]), xScaleContext(brushContext.extent()[0])])
							.domain([brushContextNorLeft.extent()[0], brushContext.extent()[0]]);
		
		context.select(".brushDisLeft").call(brushContextDisLeft);
	
		// ANIMATION
		callAnimation();
		
		brushContextNorLeftFlag = brushContextNorLeft.extent();
	}
}


function brushContextDisLeftMove() {

	let extent0 = brushContextDisLeft.extent();
	let extent1 = loadExtent1(extent0);
	d3.select(this).call(brushContextDisLeft.extent(extent1));
	
	if(brushContextDisLeftFlag[0].getTime() != extent1[0].getTime() || brushContextDisLeftFlag[1].getTime() != extent1[1].getTime()){
		
		let facteurBrusNorLeft = getTimeWindow(brushContextNorLeft.extent()[0],brushContextNorLeft.extent()[1], polarityTemporal,stepTemporal).length;
		let extentNorLeft;
		if(lockedLeft){
			extentNorLeft = [brushContextNorLeft.extent()[0], brushContextDisLeft.extent()[0] ];	
		}else{
			extentNorLeft = [getTimeOffset(brushContextDisLeft.extent()[0],-facteurBrusNorLeft,polarityTemporal), brushContextDisLeft.extent()[0]]
		}
		
		//Changing range and domain in BrushContextNorLeft
		xScaleContextNorLeft.range([0, xScaleContext(brushContextDisLeft.extent()[0])])
							.domain([dateMinRange, brushContextDisLeft.extent()[0]]);
		
		context.select(".brushNorLeft").call(brushContextNorLeft.extent(extentNorLeft));
	
		
		//Changing range and domain in DisLeft
		xScaleContextDisLeft.range([ xScaleContext(extentNorLeft[0]), xScaleContext(brushContext.extent()[0]) ])
							.domain([ extentNorLeft[0], brushContext.extent()[0] ]);
							
		// ANIMATION
		callAnimation();
		
		brushContextDisLeftFlag = brushContextDisLeft.extent();
	}
}

function brushContextDisRightMove() {

	let extent0 = brushContextDisRight.extent(); 
	let extent1 = loadExtent1(extent0);
	d3.select(this).call(brushContextDisRight.extent(extent1));

	if(brushContextDisRightFlag[0].getTime() != extent1[0].getTime() || brushContextDisRightFlag[1].getTime() != extent1[1].getTime()){
		
		let facteurBrusNorRight =  getTimeWindow(brushContextNorRight.extent()[0],brushContextNorRight.extent()[1], polarityTemporal,stepTemporal).length; 
		
		let extentNorRight
		if(lockedRight){
			extentNorRight = [brushContextDisRight.extent()[1],brushContextNorRight.extent()[1] ];
		}else{
			extentNorRight = [brushContextDisRight.extent()[1],getTimeOffset(brushContextDisRight.extent()[1],+facteurBrusNorRight,polarityTemporal)];
		}
		
		//Changing range and domain in BrushContextNorRight
		xScaleContextNorRight.range([xScaleContext(brushContextDisRight.extent()[1]),widthIntern ])
							 .domain([brushContextDisRight.extent()[1], dateMaxRange]);
		
		context.select(".brushNorRight").call(brushContextNorRight.extent(extentNorRight));
		
		//Changing range and domain in DisRight
		xScaleContextDisRight.range([xScaleContext(brushContext.extent()[1]), xScaleContext(extentNorRight[1]) ])
							.domain([ brushContext.extent()[1], extentNorRight[1] ]);
							
	
		// ANIMATION
		callAnimation();
	
		brushContextDisRightFlag = brushContextDisRight.extent();
	}

}

function brushContextNorRightMove() {
	
	let extent0 = brushContextNorRight.extent(); 
	let extent1 = loadExtent1(extent0);
	d3.select(this).call(brushContextNorRight.extent(extent1));
	
	if(brushContextNorRightFlag[0].getTime() != extent1[0].getTime() || brushContextNorRightFlag[1].getTime() != extent1[1].getTime()){
		
		xScaleContextDisRight.range([xScaleContext(brushContext.extent()[1]), xScaleContext(brushContextNorRight.extent()[1])])
							.domain([brushContext.extent()[1], brushContextNorRight.extent()[1]]);
		
		context.select(".brushDisRight").call(brushContextDisRight);
		
		// ANIMATION
		callAnimation();
		
		brushContextNorRightFlag = brushContextNorRight.extent();
	}
	
}


function updateRectanglesAndLinksInFocus(){
	
	var objNl = selectScaleFocus("NL");
	var objFl = selectScaleFocus("FL");
	var objZ = selectScaleFocus("Z");
	var objFr = selectScaleFocus("FR");
	var objNr = selectScaleFocus("NR");
	var heightVertical = marginFocus.top + heightFocus + 0;
	
	
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
	
	/* NORMAL AREA */
	areaNormal = d3.svg.area()
			.interpolate(opts.interpolateType)
			.defined(function(d) {
						let var1 = getTimeOffset(brushContextNorLeft.extent()[0], -stepTemporal, polarityTemporal);
						let var2 = getTimeOffset(brushContextNorLeft.extent()[1], stepTemporal, polarityTemporal);
						let var3 = getTimeOffset(brushContextNorRight.extent()[0], -stepTemporal, polarityTemporal);
						let var4 = getTimeOffset(brushContextNorRight.extent()[1], stepTemporal, polarityTemporal);

						let interpolationLeft1 = getTimeOffset(brushContextNorLeft.extent()[0],-1*stepTemporal,polarityTemporal);
						let interpolationLeft2 = getTimeOffset(brushContextNorLeft.extent()[1],-2*stepTemporal,polarityTemporal);
						let interpolationRight1 = getTimeOffset(brushContextNorRight.extent()[0],+3*stepTemporal,polarityTemporal);
						let interpolationRight2 = getTimeOffset(brushContextNorRight.extent()[1],+1*stepTemporal,polarityTemporal);
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
						
						let var1 = getTimeOffset(brushContextDisLeft.extent()[0], -stepTemporal,polarityTemporal);
						let var2 = getTimeOffset(brushContextDisLeft.extent()[1], stepTemporal,polarityTemporal);
						//
						let interpolationLeft1 = getTimeOffset(brushContextDisLeft.extent()[0],-2*stepTemporal,polarityTemporal);
						let interpolationLeft2 = getTimeOffset(brushContextDisLeft.extent()[1],-2*stepTemporal,polarityTemporal);
						
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
				
				let var1 = getTimeOffset(brushContext.extent()[0],-stepTemporal,polarityTemporal);
				let var2 = getTimeOffset(brushContext.extent()[1],stepTemporal,polarityTemporal);
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
				let var1 = getTimeOffset(brushContextDisRight.extent()[0],-stepTemporal,polarityTemporal);
				let var2 = getTimeOffset(brushContextDisRight.extent()[1], stepTemporal,polarityTemporal);
				//
				let interpolationRight1 = getTimeOffset(brushContextDisRight.extent()[0],+4*stepTemporal,polarityTemporal);
				let interpolationRight2 = getTimeOffset(brushContextDisRight.extent()[1],+4*stepTemporal,polarityTemporal);
				
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
	let extent = [];
	let d0 = getTimeOffset(brushExtent[0], index * stepTemporal, polarityTemporal);
	let d1 = getTimeOffset(brushExtent[0], index * stepTemporal + stepTemporal, polarityTemporal);
	
	extent = [d0, d1]
	return extent;
}



function brushStart(){
	blocage = true;
}


function brushEnd(){
	console.log("brushEnd...")
	blocage = false;
	if (!opts.animation) {
		//updateFocus();
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
	
	
	
	//FLAG TO IMPROVE UPDATE TIME
	brushContextFlag = brushContext.extent();
	brushContextNorLeftFlag = brushContextNorLeft.extent();
	brushContextNorRightFlag = brushContextNorRight.extent();
	brushContextDisLeftFlag = brushContextDisLeft.extent();
	brushContextDisRightFlag = brushContextDisRight.extent();
	

}