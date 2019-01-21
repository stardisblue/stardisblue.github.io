var canvas;
var positions = [];
var verticesRadius = 10;
var fr = 7; // starting FPS
var nVertices = 4;

function setup() {
	// We are still calling createCanvas like in the past, but now
	// we are storing the result as a variable. This way we can
	// call methods of the element, to set the position for instance.
	var width = 300;
	var height = 100;
	canvas = createCanvas(width, height);

	// Here we call methods of each element to set the position
	// and id, try changing these values.
	// Use the inspector to look at the HTML generated from this
	// code when you load the sketch in your browser.

	// canvas.position(50, 50);
	canvas.parent('myContainer');

	// random array positions not used
	for (var i = 0; i < nVertices; i++) {
		var x = random(verticesRadius, width - verticesRadius);
		var y = random(verticesRadius, height - verticesRadius);
		positions[i] = [ x, y ];
	}

	// re-write random array position
	positions[0] = [ 50, 25 ];
	positions[1] = [ 50, 70 ];
	positions[2] = [ 300 - 50, 25 ];
	positions[3] = [ 300 - 50, 70 ];

	frameRate(fr); // Attempt to refresh at starting FPS
}

function draw() {

	// These commands are applied to the graphics canvas as normal.
	background(255, 255, 255);

	var vertexStart = random([ 0, 1, 2, 3 ]);
	var vertexEnd = random([ 0, 1, 2, 3 ]);

	// Line
	strokeWeight(4);
	stroke(150, 150, 150, 70);
	line(positions[vertexStart][0], positions[vertexStart][1],
			positions[vertexEnd][0], positions[vertexEnd][1]);

	// Ellipse
	for (var i = 0; i < nVertices; i++) {
		strokeWeight(3);
		stroke(75, 75, 75)
		fill(255, 0, 0, 80);
		if ((i == vertexStart || i == vertexEnd) && (vertexStart != vertexEnd)) {
			strokeWeight(18);
			stroke(150, 150, 150, 100);
		}
		ellipse(positions[i][0], positions[i][1], verticesRadius,
				verticesRadius);
	}
}

function mousePressed() {
	noLoop();
}

function mouseReleased() {
	loop();
}
