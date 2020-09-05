

var brush = d3.svg.brush();
var nest_by_key = d3.nest().key(function(d) {return d.key;});
// var nest_by_date = d3.nest().key(function(d) {return d.date;});
var stack = d3.layout.stack()
            .offset("zero")  //  silhouette   zero    
            .values(function(d) {return d.values;})
            .x(function(d) {return d.date;})
            .y(function(d) {return d.value;});







// stream scales
var stream_x_scale = d3.time.scale();
var stream_y_scale = d3.scale.linear();

// tempo scales
var tempo_x_scale = d3.time.scale();


// main axes
var stream_x_axis = d3.svg.axis();
var stream_y_axis = d3.svg.axis();

// sub axes
var tempo_x_axis = d3.svg.axis();
// there is not subYAxis

var area = d3.svg.area()
            .interpolate("cardinal-open")
            .x(function(d) {return stream_x_scale(d.date);})
            .y0(function(d) {return stream_y_scale(d.y0);})
            .y1(function(d) {return stream_y_scale(d.y+d.y0);}); 

var svg_stream
var stream

var svg_tempo
var tempo


function brushStart(){
    // console.log("brushStart...")
}

function brushEnd(){
    // console.log("brushEnd...")
}

function brushMove(){

    //update stream
    stream_x_scale.domain(brush.extent())
    stream.selectAll(".mylayers")
                    .attr("d", function(d){
                        return area(d.values); 
                    })
    stream.select('.x.axis').call(stream_x_axis);                    


    //update mapa
    update_pies()

    //update time-period title
    update_time_period()

}

function create_svg_tempo(){

    console.log("loading tempo...")

    var tempo_margin = {top: 50, right: 30, bottom: 50, left: 30},
        tempo_width = svg_tempo_width - tempo_margin.left - tempo_margin.right,
        tempo_height = svg_tempo_height - tempo_margin.top - tempo_margin.bottom;

    // append the svg object to the body of the page
    svg_tempo = d3.select("body").select("#svg_tempo")
        .attr("width", svg_tempo_width)
        .attr("height", svg_tempo_height)

    tempo = svg_tempo.append("g")
        .attr("transform",
            "translate(" + tempo_margin.left + "," + tempo_margin.top + ")");

    // Add X axis
    tempo_x_scale.range([0, tempo_width]).clamp(true)
                .domain(stream_x_scale_extent);

    tempo_x_axis.scale(tempo_x_scale)
                .tickSize(-10, 10) //inner and outer : extrems of axis
                .tickPadding(14)
                // .ticks(5)
                .orient("bottom")

    tempo.append("g")
        .classed("x axis", true)
        .attr("transform", "translate(0," + tempo_height + ")")
        .call(tempo_x_axis);


    brush.x(tempo_x_scale)
        .on("brushstart",brushStart)
        .on("brush",brushMove)
        .on("brushend", brushEnd);
        
    brush.extent(stream_x_scale_extent)

    tempo.append("g")
        .classed("x brush", true)
        .call(brush)
        .selectAll("rect")
            .attr("y", -25)
            .attr('height', 25)
}


function create_svg_stream(){
    // margins
    var stream_margin = {top: 50, right: 70, bottom: 50, left: 70},
    stream_width = svg_stream_width - stream_margin.left - stream_margin.right,
    stream_height = svg_stream_height - stream_margin.top - stream_margin.bottom;

    svg_stream = d3.select("#svg_stream")
                .attr("width", svg_stream_width)
                .attr("height", svg_stream_height)

    stream = svg_stream.append("g")
                .attr("id","stream")
                .attr("transform",
                    "translate(" + stream_margin.left + "," + stream_margin.top + ")");


    svg_stream.append("text")
        .attr("x",0 - svg_stream_height / 2)
        .attr("y", stream_margin.left/2)
        .attr("dy","0.1em")
        .attr("transform", "rotate(-90)")
        .text("N°. de Casos");


    stream_x_scale.range([0, stream_width])
                    .domain(stream_x_scale_extent)
                    .clamp(true);

    stream_y_scale.range([ stream_height, 0 ])

    stream_x_axis.scale(stream_x_scale)
                .tickSize(-5, 5) //inner and outer : extrems of axis
                .tickPadding(8)
                .ticks(5)
                .orient("bottom")
                
    stream_y_axis.scale(stream_y_scale).orient("left")

    //append main Axis
    stream.append("g")
        .classed("x axis", true)
        .attr("transform", "translate(0," + stream_height + ")")
        .call(stream_x_axis);

    stream.append("g")
        .classed("y axis", true)
        .attr("transform", "translate(0, 0)")
        .call(stream_y_axis);

    // add legend   
	var legend_stream = svg_stream.append("g")
        .attr("class", "legend")
        .attr("x", svg_stream_width - 85)
        .attr("y", 25)
        .attr("height", 100)
        .attr("width", 100);

    legend_stream.selectAll('g').data(variables)
        .enter()
        .append('g')
        .each(function(d, i) {
            var g = d3.select(this);
            g.append("rect")
                .attr("x", svg_stream_width - 185)
                .attr("y", i*25)
                .attr("width", 10)
                .attr("height", 10)
                .style({
                    "fill":color(d.id),
                    "stroke":color(d.id)
                })
                .on("click",function(d){
                    variables.forEach(function(elemento){
                        if (d.id == elemento.id){
                            elemento.is_active = !elemento.is_active
                        }
                    });                 
                    update_stream()
                    update_pies()

                });
            
            g.append("text")
                .attr("x", svg_stream_width - 170)
                .attr("y", i * 25 + 8)
                .attr("height",30)
                .attr("width",100)
                .style("fill", "#252525")
                .text(d.name)
                .on("click",function(d){
                    variables.forEach(function(elemento){
                        if (d.id == elemento.id){
                            elemento.is_active = !elemento.is_active
                        }
                    });   
                    
                    // let at_least_one_active = variables.some(function(elemento){
                    //     return elemento.is_active === true
                    // })
                    // if (at_least_one_active){
                    // }
                    
                    update_stream()
                    update_pies()
                });
        });

}

function update_stream(){

    let variables_id = variables.filter(d=>d.is_active).map(d=>d.id)

    current_data = data.filter(element => {
        return variables_id.includes(element.key)
    });

    stackedData = stack(nest_by_key.entries(current_data));     

    stream_y_scale.domain([0,d3.max(current_data,function(d){return d.y0+d.y})]);
    stream.select('.y.axis').call(stream_y_axis);

	var layers_streams = stream.selectAll(".mylayers")
				        .data(stackedData,function (d){return d.key;});

    //remove
    layers_streams.exit().remove();

    //update
    layers_streams.transition()
                .duration(transition_time)
                .attr("d", function(d){
                                return area(d.values); 
                            })

    //enter
    layers_streams.enter()
        .append("path")
        .classed('mylayers', true)
        .style("fill", function(d) {return color(d.key); })
        .attr("d", function(d){
            return area(d.values); 
        })
        .on("mousemove",stream_mouse_over)
        .on("mouseout",stream_mouse_out)

}


function stream_mouse_over(d){
    let mouseX = d3.mouse(this)[0];
    let dateSelected = stream_x_scale.invert(mouseX); 

    let index = -1
    stream_total_time_window.forEach(function(d){
        if (d<=+dateSelected){
            index =  stream_total_time_window.indexOf(d); 
        }
    })
    if (index != -1){
        let selectedCategory = d.values[index]
        let title_line = "<h5>" + customTimeFormat(selectedCategory.date) + "</h5>";
        let categories_lines = "<div>"+
            "<div class='texto'>" + selectedCategory.category + ":&nbsp;"+ selectedCategory.value + "</div>"+
        "</div>";
        let htmlText = title_line + categories_lines;

        tooltip.html(htmlText).style({
            "left":(d3.event.pageX+ 10)  + "px",
            "top":(d3.event.pageY+ 10) + "px",
            "opacity":1,
            "display":"inline"
        });
    }
}

function stream_mouse_out(){
    tooltip.style({
		"opacity":0
	});
}


function load_stream(){

    console.log("loading stream...")
    
    create_svg_stream();

    update_stream();

    create_svg_tempo();

    update_time_period()

}
