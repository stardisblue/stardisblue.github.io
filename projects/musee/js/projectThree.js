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

// standard global variables
var container, scene, camera, renderer, controls, stats, loader, mesh;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();


//window.onload = function()  {
function init()  {

	var width = 400; //width the grille
	var height = 400; // height the grille
	
	//Scene
	scene = new THREE.Scene();
	//Camera
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.set(0,250,700); //camera position X,Y,Z
	camera.lookAt(scene.position); //centramos la vista a la scene
	scene.add(camera);
	
	//Renderer
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer(); 
	
	renderer.setClearColor(0xEEEEEE);
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	renderer.shadowMapEnabled=true; //renderer las sombras
	container = document.getElementById('ThreeJS');
	container.appendChild( renderer.domElement );
	
	// Events
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	
	// Controls
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	
	// Stats
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
	
	// Light
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,150,100);
		scene.add(light);
	
	// Floor
	var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 5, 5 ); //grille
	//floorTexture.repeat.set( 6.25, 6.25 ); //grille pour 500
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(width, height, 1, 1);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);
	
	// SKYBOX/FOG
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	// scene.add(skyBox);
	scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
	
	// create a small sphere to show position of light
	var lightbulb = new THREE.Mesh( 
		new THREE.SphereGeometry( 10, 16, 8 ), 
		new THREE.MeshBasicMaterial( { color: 0xffaa00 } )
	);
	lightbulb.position = light.position;
	scene.add( lightbulb );

	//add axes
	var axesGeneric =  new THREE.AxisHelper(250);
	//scene.add(axesGeneric);

	loadData(); //load data
	
}

function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{
	if ( keyboard.pressed("z") ) 
	{ 
		// do something
	}
	
	controls.update();
	stats.update();
}

function render() 
{
	renderer.render( scene, camera );
}

// load data depuis fichier json
function loadData(){
	//fichier JSON
	var data;
	jQuery.ajax({
		url: "json/save.json",
		data: "nocache=" + Math.random(),
		type: "POST",
		dataType: "json",
		success: function(source){
			data = source;
			//console.log("data", data);
			showInfo(data);
		},
		error: function(dato){
			alert("ERROR");
		}
	});
}

//Creer les murs et peintures depuis fichier json
function showInfo(data){

	if (data!=null){

		//add murs
		if (data['0']['murs']){
			var darkMaterialL = new THREE.MeshLambertMaterial( { color: 0x000088 } );
			jQuery.each(data['0']['murs'], function(index, value) {
				var cubeGeom = new THREE.CubeGeometry(value.largeur, value.hauteur, value.profondeur);
				var cube = new THREE.Mesh(cubeGeom, darkMaterialL);
				
				cube.position.set(value.x, value.y, value.z);
				scene.add( cube );
			});
		}	
		
		//add peintures
		if (data['0']['peintures']){
			jQuery.each(data['0']['peintures'], function(index, value) {
				//var creerTexture = new THREE.ImageUtils.loadTexture( 'images/Monalisa.png' );  //pour tous les 6 lados
				//var creerMaterial = new THREE.MeshBasicMaterial( { map: creerTexture } );
				var materialArray = [];
				
				//pour faire les bordes de peintures avec un couleur differente
				var borde ="images/borde.jpg";
				var peinture = "images/" + value.path;
				
				if(value.orientacion==1){ // peinture horizontal haut ou bas
					materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( borde ) }));
					materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( borde ) }));
					materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( borde ) }));
					materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( borde ) }));
					materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( peinture ) }));
					materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( peinture ) }));
				}else{ // peinture vertical droit ou gauche
					materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( peinture ) }));
					materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( peinture ) }));
					materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( borde ) }));
					materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( borde ) }));
					materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( borde ) }));
					materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( borde ) }));
				}
				
				var creerMaterial = new THREE.MeshFaceMaterial(materialArray);				
				
				var cubeGeom = new THREE.CubeGeometry(value.largeur, value.hauteur, value.profondeur);
				var cube = new THREE.Mesh(cubeGeom, creerMaterial);
				
				cube.position.set(value.x, value.y, value.z);
				scene.add( cube );
			});
		}
	
	}
	
	
}