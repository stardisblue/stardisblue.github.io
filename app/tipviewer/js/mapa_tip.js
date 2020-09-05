var zoomMap = d3.behavior.zoom()
					.translate([0, 0])
					.scale(1)
                    // .scaleExtent([0.5, 30])
                    .scaleExtent([0.5, 30])
					.on("zoom", zoomed);

var arc = d3.svg.arc().outerRadius(0.7);
var pie = d3.layout.pie()
            .value(function(d){
                return d.value
            });

var nest_by_slice = d3.nest().key(function(d) {return d.key.slice(0,4);});
var nest_by_category = d3.nest().key(function(d) {return d.category;});

var svg_mapa
var mapa

var gFeatures
var tooltip;


function create_svg_mapa(){

    
    svg_mapa = d3.select("#svg_mapa")
                .attr("xmlns","http://www.w3.org/2000/svg")
                .attr("xlink","http://www.w3.org/1999/xlink")
                .attr("svg","http://www.w3.org/2000/svg")
                .attr("version","1")
                .attr("width", svg_mapa_width)
                .attr("height", svg_mapa_height)

    // svg_mapa.attr('viewBox', '0 0 ' +  (svg_mapa_width) + ' '  + ( svg_mapa_height) )
    //             .attr('height', svg_mapa_height)
    //             .attr('width', '100%')
    //             .attr('preserveAspectRatio', 'none');

    //Calling the zoom and drag
    svg_mapa.call(zoomMap);
    
    mapa = svg_mapa.append("g").attr("id","mapa");
    // gMapZoomable = svgMap.append("g").attr("id","groupMapZoomable");

    gLandMap = mapa.append("g").attr("id","groupLand");
    // gLandMap = gMapZoomable.append("g").attr("id","groupLand");

    gFeatures = mapa.append("g").attr("id","groupFeatures");
    // gFeatures = gMapZoomable.append("g").attr("id","groupFeatures");


	//TooltipMap
	tooltip = d3.select("body").append("div")
									.attr("id","tooltip")
									.attr("class","tooltip");



    	
    //Create LAND PATHS	
	let land_path = gLandMap.selectAll(".land")
            .data(dataGeoJson.features,function(d){return d.properties.id});

    //create
	land_path.enter().append("path")
        .attr("class","land")
        .attr("d", pathMap)
        .on("click",land_onclick);

}

function land_onclick(d){
    
    let name_land = d.properties.name.toLowerCase()
    let provincias_allowed = ["pichincha","azual","el oro","guayas","tungurahua"]
    
    if (provincias_allowed.includes(name_land)){
        let width_img = 450
        let data_lines = "<img src=\"img/indice_pobreza_trata/"+name_land+".jpeg\" alt=\"TIPViewer\" width=\""+ width_img+ "\" height=\"auto\">"
        d3.select("#data-modal-msg").html(data_lines);
        d3.select(this).attr("data-toggle", "modal");
        d3.select(this).attr("data-target", "#data-modal");
    }

}

function update_pies(){

    let variables_id = variables.filter(d=>d.is_active).map(d=>d.id)

    // let current_data_pies = data.filter(element => {
    //     return variables_id.includes(element.key)
    // });
    // console.log(current_data_pies)

    let data_to_pie = []
    let current_pies_data = data.filter(function(d){
        // console.log(d.key)
        let slice = d.key.slice(0,4)
        return d.date >= brush.extent()[0] & d.date <= brush.extent()[1] & variables_id.includes(slice);
    })


    let nn = nest_by_slice.entries(current_pies_data)
    nn.forEach(function(d){
        // console.log(d)
        
        let id = d.key
        let curr_variable = variables.find(function(v){
            return v.id == id
        })
        // console.log(curr_variable)
        if (typeof curr_variable != 'undefined'){
        
            let id_name = curr_variable.name
            let cc = nest_by_category.entries(d.values)
            cc.forEach(function(elemento){
                
                let name = elemento.values[0].category
    
                let filtrado = dataGeoJson.features.find(function(d){
                    return d.properties.name === name;
                })
    
                if (typeof filtrado != 'undefined'){
                    let centroid = filtrado.centroid
                    let sum = elemento.values.reduce(function(acc, curr){
                        return acc+curr.value;
                    },0);    
                    data_to_pie.push({
                        "key":elemento.key,"id":id,"id_name":id_name,"centroid":centroid,"value":sum
                    })
                }
            })
        }
    })

    let jojoy = nest_by_key.entries(data_to_pie)

    jojoy.forEach(function(d){
        let piedata  = pie(d.values)
        // console.log(piedata )

        let pointRadius = 18

        let pies_mapa = gFeatures.selectAll(".feature-map-"+d.key)
							.data(piedata,d=>d.data.id);

        //remove
        pies_mapa.exit().remove();


        //update
        pies_mapa
            .attr("d",arc)

        //enter
        pies_mapa.enter().append("path")
                .attr("class","feature-map-"+d.key)
                .attr("d",arc)
                .attr("transform", (d)=>{return "translate(" + d.data.centroid + ")"; })
                .attr("r", pointRadius/currMapScale+"px")
                .on("mouseenter",slice_mouse_in)
				.on("mouseout",slice_mouse_out)
                .style({
                    "fill": (d) => { return color(d.data.id); },
                    "fill-opacity":1,
                    "opacity": 1,
                    "stroke-width": (1/currMapScale)+"px"
                })
    })



}

function load_mapa(){
    console.log("loading mapa...")

    create_svg_mapa()

    update_pies()

    // stackedData = stack(nest_by_key.entries(current_data));     

    // var santa = data.filter(function(d){
    //     let comienza_con = d.key.slice(0,4)
    //     // console.log()
    //     return comienza_con == 'R0_1'
    // })

    // // const max = santa.reduce(function(prev, current) {
    // //     return (prev.value > current.value) ? prev : current;
    // // },{});

    // let sum = santa.reduce(function(acc, curr){
    //     return acc+curr.value;
    // },0);

    // console.log(sum)
}


function slice_mouse_in(d){
    // console.log("slice IN",d)
    let title_line = "<h5>" + String(d.data.key).toUpperCase() + "</h5>";
    let categories_lines = "<div>"+
                "<div class='texto'>" + d.data.id_name + ":&nbsp;"+ d.data.value + "</div>"+
            "</div>";

    let htmlText = title_line + categories_lines;
    
    tooltip.html(htmlText).style({
        "left":(d3.event.pageX+ 10)  + "px",
        "top":(d3.event.pageY+ 10) + "px",
        "opacity":1,
        "display":"inline"
    });
}


function slice_mouse_out(){
    tooltip.style({
		"opacity":0
	});
}


function zoomed() {
	//Save the current map even scale
	currMapScale = d3.event.scale;
	// currMapTranslate = d3.event.translate;
    // console.log(d3.event.translate,d3.event.scale)
	mapa.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	mapa.selectAll("path").style("stroke-width", 1 / d3.event.scale + "px");
}


