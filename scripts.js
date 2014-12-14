var canvas = new Object();


canvas.element = document.getElementById('canvas');
canvas.context = canvas.element.getContext('2d');
canvas.width = canvas.element.getAttribute('width');
canvas.height = canvas.element.getAttribute('height');

canvas.redraw = function(fillColour, strokeColour){
	// Add default canvas colour options
	var fillColour = fillColour || 'white',
		strokeColour = strokeColour || 'black';

	this.context.fillStyle = fillColour;
	this.context.fillRect(0, 0, this.width, this.height);
	this.context.strokeStyle = strokeColour;
	this.context.strokeRect(0, 0, this.width, this.height);
}

canvas.redraw();

/**
* The snake class creates and controls any snakes in the game.
*
* @class Snake
* @constructor
* @param {int} length The intial length of the snake
* @param {int} cellWidth The width of each snake body part
* @param {string} bodyColour The colour of each snake body part
* @param {string} outlineColour The stroke colour of each snake body part
* @param {object} startingPos The X and Y position for the snake spawn
*/
function Snake(length, cellWidth, bodyColour, outlineColour, startingPos) {
	this.length = length;
	this.cellWidth = cellWidth;
	this.bodyColour = bodyColour;
	this.outlineColour = outlineColour;
	this.array = [];
	this.direction = 'right';
	
	var startingPos = startingPos;
	this.create = function(){
		for(var i = this.length-1; i>=0; i--) {
			this.array.push({x: startingPos.x + i, y: startingPos.y});
		}
	};
	this.create();
}

Snake.prototype.move = function() {
	var nx = this.array[0].x;
	var ny = this.array[0].y;

	switch(this.direction) {
		case 'right':
			nx++;
			break;
		case 'left':
			nx--;
			break;
		case 'up':
			ny--;
			break;
		case 'down':
			ny++;
			break;
	}

	var tail = this.array.pop();
	tail.x = nx;
	tail.y = ny;
	this.array.unshift(tail);


	this.paint();
}

Snake.prototype.paint = function() {
	canvas.redraw();
	for(var i = 0; i < this.array.length; i++) {
		// The current snake body element
		var j = this.array[i];

		// Store argument properties to keep things DRY
		var props = [j.x*this.cellWidth, j.y*this.cellWidth, this.cellWidth, this.cellWidth];
		canvas.context.fillStyle = this.bodyColour;
		canvas.context.fillRect(props[0], props[1], props[2], props[3]);
		canvas.context.strokeStyle = this.outlineColour;
		canvas.context.strokeRect(props[0], props[1], props[2], props[3]);
	}
}


var mainSnake = new Snake(5, 10, 'red', 'white', {x: 5, y: 5});

var game = new Object();
game.runLoop = function(){
	mainSnake.move();
}
game.loop = setInterval(game.runLoop, 60);



document.onkeydown = function(e) {
	var key = (e.keyCode ? e.keyCode : e.which);
	if(key == "37" && mainSnake.direction != 'right') {
		mainSnake.direction = 'left';
	} else if(key == "38" && mainSnake.direction != 'down') {
		mainSnake.direction = 'up';
	} else if(key == "39" && mainSnake.direction != 'left') {
		mainSnake.direction = 'right';
	} else if(key == "40" && mainSnake.direction != 'up') {
		mainSnake.direction = 'down';
	}
}