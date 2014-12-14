var canvas = new Object();


canvas.element = document.getElementById('canvas');
canvas.context = canvas.element.getContext('2d');
canvas.width = canvas.element.getAttribute('width');
canvas.height = canvas.element.getAttribute('height');

canvas.initDraw = function(fillColour, strokeColour){
	this.context.fillStyle = fillColour;
	this.context.fillRect(0, 0, this.width, this.height);
	this.context.strokeStyle = strokeColour;
	this.context.strokeRect(0, 0, this.width, this.height);
}

canvas.initDraw('white', 'black');

/**
* The snake class creates and controls any snakes in the game.
*
* @class Snake
* @constructor
* @param {int} length The intial length of the snake
* @param {int} cellWidth The width of each snake body part
* @param {object} startingPos The X and Y position for the snake spawn
*/
function Snake(length, cellWidth, startingPos) {
	this.length = length;
	this.cellWidth = cellWidth;
	this.array = [];
	
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

	nx++;

	var tail = this.array.pop();
	tail.x = nx;
	this.array.unshift(tail);


	this.paint();
}

Snake.prototype.paint = function() {
	for(var i = 0; i < this.array.length; i++) {
		// The current snake body element
		var j = this.array[i];

		// Store argument properties to keep things DRY
		var props = [j.x*this.cellWidth, j.y*this.cellWidth, this.cellWidth, this.cellWidth];
		canvas.context.fillStyle = 'red';
		canvas.context.fillRect(props[0], props[1], props[2], props[3]);
		canvas.context.strokeStyle = 'yellow';
		canvas.context.strokeRect(props[0], props[1], props[2], props[3]);
	}
}


var mainSnake = new Snake(5, 10, {x: 5, y: 5});

var game = new Object();
game.runLoop = function(){
	mainSnake.move();
}
game.loop = setInterval(game.runLoop, 1000);



document.onkeydown = function(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	
}