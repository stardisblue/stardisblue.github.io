/* Copyright 2014
 *
 * Galaxy XML
 * 
 * RABOUDY Ynes 
 * CUENCA Erick
 *
 * Universite Montpellier 2 - Informatique
 */

'use strict'; // tous les variables

var tooltipdraw = null;

var start = null;
var end = null;
var svg = null;
var murs=[]; //var murs
var peintures=[]; //var peintures
var peintureSelected; // peintureSelected

var peintureMur = []; // var peintures dans la grille pour les murs
var muro=[]; //

var width = 400; //width the grille
var height = 400; // height the grille
var intervalle = 20; //this is the intervalle in the grille and the circles

function init() {

	var grille = []; //var grilles
	var circles = []; // var circles pour les grilles
	
	
	for(var i=intervalle;i<width;i=i+intervalle) //remplir circles double bucle
	{
		for(var y=intervalle;y<height;y=y+intervalle)
		{
			circles[circles.length]={cx:i, cy:y, r:5}; // add circle radio r: 5
		}
	}
	
	for(var i=intervalle;i<width;i=i+intervalle) //remplir lines
	{
		grille[grille.length]={x1:i, y1:0, x2:i, y2:width};//add grille X
		grille[grille.length]={x1:0, y1:i, x2:height, y2:i};//add grille Y
	}
			
	//creation de svg en #grille
	svg = d3.select("#grille")
		.append("svg")
		.attr
		({
			width   : width,
			height  : height
		})
		.style('border', "2px black solid");
		
	//drawing grille into svg
	svg.selectAll("line")
		.data(grille)
		.enter()
		.append("line")
		.attr("class","grille")
		.attr('x1', function(d) {
			return d.x1;
			})
		.attr('y1', function(d) {
			return d.y1;
			})
		.attr('x2', function(d) {
			return d.x2;
			})
		.attr('y2', function(d) {
			return d.y2;
			})
		;
		
	//drawing circles into svg
	svg.selectAll("circle")
		.data(circles)
		.enter()
		.append("circle")
		.attr("class","circles")
		.attr('cx', function(d) {
			return d.cx;
			})
		.attr('cy', function(d) {
			return d.cy;
			})
		.attr('r', function(d) {
			return d.r;
			})
		.on("mouseover", function(d){d3.select(this).attr("class", "circlesOver")})
		.on("mouseout", function(d){ d3.select(this).attr("class", "circles")})
		.on("mousedown",mousedown)
		;		
		
	//tooltipdraw
	tooltipdraw = d3.select("#grille")
		.append("div")
		.attr("class", "tooltipdraw");		
			
}

function mousedown(){		
	var myCircle = d3.select(this);
		
	if(start==null){		
		start = {x:myCircle.attr("cx"),y:myCircle.attr("cy")};
	} else{
		end = {x:myCircle.attr("cx"),y:myCircle.attr("cy")};			
		var line = svg.append("line")
			.attr("x1", start.x)
			.attr("y1", start.y)
			.attr("x2", end.x)
			.attr("y2", end.y)
			.attr("class", "lineDraw")
			;
		
		var mur = creerMur(parseInt(start.x),parseInt(start.y),parseInt(end.x),parseInt(end.y));
		creerCirclesMur(parseInt(start.x),parseInt(start.y),parseInt(end.x),parseInt(end.y)); // creer circles dans le mur
		murs[murs.length] = {largeur:mur.largeur, hauteur:mur.hauteur, profondeur:mur.profondeur, x:mur.positionx , y:mur.positiony, z:mur.positionz}; // add murs
		
		start = null;
	}
}

function creerCirclesMur(x1,y1,x2,y2){

	var circlesMur = []; // var circles pour les murs

	if(x1==x2){ //line vertical
		for(var i=Math.min(y1, y2)+intervalle;i<Math.max(y1, y2);i=i+intervalle)
		{
			circlesMur[circlesMur.length]={cx:x1, cy:i, r:4}; // add circle radio r: 5
		}
	}else if(y1==y1){ //line horizontal
		for(var i=Math.min(x1, x2)+intervalle;i<Math.max(x1, x2);i=i+intervalle)
		{
			circlesMur[circlesMur.length]={cx:i, cy:y1, r:4}; // add circle radio r: 5
		}
	}else{ // autre line
	
	}
	
	//drawing circlesMurs into svg
	svg.selectAll("circlesMur")
		.data(circlesMur)
		.enter()
		.append("circle")
		.attr("class","circlesMur")
		.attr('cx', function(d) {
			return d.cx;
			})
		.attr('cy', function(d) {
			return d.cy;
			})
		.attr('r', function(d) {
			return d.r;
			})
		.on("mouseover", function(d){d3.select(this).attr("class", "circlesMurOver")})
		.on("mouseout", function(d){ d3.select(this).attr("class", "circlesMur")})
		.on("mousedown",mousedownMur)
		;	
}

function mousedownMur(){

	tooltipdraw.html(
		"Choisir ubication: <br/>" +
		'<input type= "radio" name="ubication" value="droit">droit' +
		'<input type= "radio" name="ubication" value="gauche">gauche' + "<br/>" +
		'<input type= "radio" name="ubication" value="haut">haut' +
		'<input type= "radio" name="ubication" value="bas">bas' + "<br/>" +
		"<button onclick='okFunction(" + d3.select(this).attr("cx") + ", " + d3.select(this).attr("cy")  +  ")'>Ok</button>" +
		"<button onclick='cancelFunction()'>Cancel</button>"
	)
	.transition()
	.duration(100)
	.style("opacity", 1)
	.style("visibility", "visible");	

	return tooltipdraw.style("top", (event.pageY-30)+"px").style("left",(event.pageX+10)+"px"); 
}

function okFunction(x,y){
	//console.log("imagen select: ", jQuery( 'input[name=imagen]:checked' ).val());
	peintureSelected = jQuery( 'input[name=imagen]:checked' ).val();
	var ubication;
	
	if(document.getElementsByName("ubication")[0].checked == true){ //droit
		ubication = 1;
	} else if(document.getElementsByName("ubication")[1].checked == true){ //gauche
		ubication = 2;
	} else if(document.getElementsByName("ubication")[2].checked == true){ //haut
		ubication = 3;
	} else{ //bas
		ubication = 4;
	}
		
	creerPeintureMur(ubication, parseInt(x),  parseInt(y), peintureSelected);
	
	cancelFunction();

}

function cancelFunction(){
	tooltipdraw.transition()
        .delay(100)
        .style("opacity", 0)
		.style("visibility", "hidden");
}

function creerPeintureMur(ubication,x,y, peintureSelected){

	peintureMur = []; // var peintures	
	var anadir = 5;
	
	if (ubication==1){ //droit
		peintureMur[peintureMur.length] = {x1:x+anadir, y1:y-intervalle, x2:x+anadir , y2:y+intervalle}; // add murs
	} else if (ubication==2){ //gauche
		peintureMur[peintureMur.length] = {x1:x-anadir, y1:y-intervalle, x2:x-anadir , y2:y+intervalle}; // add murs
	} else if (ubication==3){ //haut
		peintureMur[peintureMur.length] = {x1:x-intervalle, y1:y-anadir, x2:x+intervalle , y2:y-anadir}; // add murs
	} else { //bas
		peintureMur[peintureMur.length] = {x1:x-intervalle, y1:y+anadir, x2:x+intervalle , y2:y+anadir}; // add murs
	}
	
	//drawing peintureMur into svg
	svg.selectAll("peintureMur")
		.data(peintureMur)
		.enter()
		.append("line")
		.attr("class","peintureMur")
		.attr('x1', function(d) {
			return d.x1;
			})
		.attr('y1', function(d) {
			return d.y1;
			})
		.attr('x2', function(d) {
			return d.x2;
			})
		.attr('y2', function(d) {
			return d.y2;
			})
		;	
	//console.log("id: ",document.getElementById('mona').src);
	
	//creer arrays peintures au fichier json
	var peinture = creerPeinture(ubication, peintureSelected, parseInt(x),parseInt(y));
	peintures[peintures.length] = {path:peinture.path, largeur:peinture.largeur, hauteur:peinture.hauteur, profondeur:peinture.profondeur, x:peinture.positionx , y:peinture.positiony, z:peinture.positionz, orientacion:peinture.orientacion}; // add peintures	
}

function creerPeinture(ubication, path, x, y){

	var positionx=0;
	var positiony=0;
	var positionz=0;
	var rotationy=0;
	var orientacion= 0;
	
	var widthMoitie = width/2;
	var eleveHauterPeinture = 70;
	var widthMoitiePeinture = 20;

	var hauteur =40;
	var largeur=0;
	var profondeur=0;
	var widthMurs = 5;
	
	var y1, y2;
	y1=y-widthMoitiePeinture;
	y2=y+widthMoitiePeinture;
	
	var x1, x2;
	x1=x-widthMoitiePeinture;
	x2=x+widthMoitiePeinture;
	
	if (ubication==1){ //droit VERTICAL			
		profondeur = Math.abs(y1-y2);
		largeur = widthMurs;
		positionx = x-widthMoitie+6;
		positiony = eleveHauterPeinture;			
		positionz = (y1 +y2 - width)/2;
		orientacion = 2;
	} else if (ubication==2){ //gauche VERTICAL
		profondeur = Math.abs(y1-y2);
		largeur = widthMurs;
		positionx = x-widthMoitie-6;
		positiony = eleveHauterPeinture;			
		positionz = (y1 +y2 - width)/2;
		orientacion = 2;
	} else if (ubication==3){ //haut HORIZONTAL
		largeur = Math.abs(x1-x2);
		profondeur = widthMurs;
		positionx = (x1 +x2- width)/2;
		positiony = eleveHauterPeinture;
		positionz = y-widthMoitie-6;
		orientacion = 1;
	} else { //bas HORIZONTAL
		largeur = Math.abs(x1-x2);
		profondeur = widthMurs;
		positionx = (x1 +x2- width)/2;
		positiony = eleveHauterPeinture;
		positionz = y-widthMoitie+6;
		orientacion = 1;
	}	
	
	var peinture = new Object(); 
	peinture["path"] = path; 
	peinture["largeur"] = largeur; 
	peinture["hauteur"] = hauteur; 
	peinture["profondeur"] = profondeur; 
	peinture["positionx"] = positionx; 
	peinture["positiony"] = positiony; 
	peinture["positionz"] = positionz;
	peinture["orientacion"] = orientacion;
	
	return peinture;

}

function creerMur(x1,y1,x2,y2){

	var largeur=0;
	var hauteur =100;
	var profondeur=0;
	var positionx=0;
	var positiony=0;
	var positionz=0;
	
	var widthMurs = 10;
	var widthMoitie = width/2;
	var eleveHauter = hauteur/2;

	if(x1==x2){ //line vertical
		profondeur = Math.abs(y1-y2);
		largeur = widthMurs;
		positionx = x1-widthMoitie;
		positiony = eleveHauter;			
		positionz = (y1 +y2 - width)/2;
	}else if(y1==y1){ //line horizontal
		largeur = Math.abs(x1-x2);
		profondeur = widthMurs;
		positionx = (x1 +x2- width)/2;
		positiony = eleveHauter;
		positionz = y1-widthMoitie;
	}else{ // autre line
	
	}

	var mur = new Object(); 
	mur["largeur"] = largeur; 
	mur["hauteur"] = hauteur; 
	mur["profondeur"] = profondeur; 
	mur["positionx"] = positionx; 
	mur["positiony"] = positiony; 
	mur["positionz"] = positionz; 

	
	return mur;

}

//supprimer les murs
function supprimerMurs(){
	murs=[];
	d3.selectAll(".lineDraw")
		.data(murs)
		.exit()
		.remove();
		
	d3.selectAll(".circlesMur")
		.data(murs)
		.exit()
		.remove();
		
	supprimerPeintures();
}

//supprimer peintures
function supprimerPeintures(){
	peintures=[];
	d3.selectAll(".peintureMur")
		.data(peintures)
		.exit()
		.remove();
}

//save les murs dans fichier json
function save(){

	muro=[];
	muro[muro.length] = {peintures: peintures, murs: murs};

	jQuery.ajax({
	    type: "POST",
	    url: 'php/save_json.php',
	    data: { 'data': muro},
	    cache: false,
	 }).done(function(succes) {
	 		//console.log(succes);
	 		if(succes == 'true'){
	 			alert("Le fichier xml a été bien gardé.");
	 		}
     }).fail(function(jqXHR,status, errorThrown) {
        	console.log(errorThrown);
        	console.log(jqXHR.responseText);
        	console.log(jqXHR.status);
     });
}

function get(){
	console.log(localStorage.getItem('murs'));
		//console.log("saving");
	//localStorage.setItem('murs', JSON.stringify(murs));
	//console.log("save complete");
	//console.log(localStorage.getItem('murs'));

	//console.log("murs", JSON.stringify(murs));
	//console.log("");
}
