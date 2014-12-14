var canvas = new Object();
var mainSnake;
var food;


canvas.element = document.getElementById('canvas');
canvas.context = canvas.element.getContext('2d');
canvas.width = canvas.element.getAttribute('width');
canvas.height = canvas.element.getAttribute('height');
canvas.cellWidth = 10;

canvas.redraw = function(fillColour, strokeColour){
	// Add default canvas colour options
	var fillColour = fillColour || 'white',
		strokeColour = strokeColour || 'black';

	this.paint(0, 0, fillColour, strokeColour, this.width, this.height);
}

canvas.paint = function(x, y, fillColour, strokeColour, width, height) {
	var width = width || this.cellWidth,
		height = height || this.cellWidth,
		fillColour = fillColour || 'red',
		strokeColour = strokeColour || 'white';

	this.context.fillStyle = fillColour;
	this.context.fillRect(x*canvas.cellWidth, y*canvas.cellWidth, width, height);
	this.context.strokeStyle = strokeColour;
	this.context.strokeRect(x*canvas.cellWidth, y*canvas.cellWidth, width, height);
};

canvas.redraw();

/**
* The snake class creates and controls any snakes in the game.
*
* @class Snake
* @constructor
* @param {int} length The intial length of the snake
* @param {string} bodyColour The colour of each snake body part
* @param {string} outlineColour The stroke colour of each snake body part
* @param {object} startingPos The X and Y position for the snake spawn
*/
function Snake(length, bodyColour, outlineColour, startingPos) {
	this.length = length;
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
	var tail;

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

	if(this.outsideBounds(nx, ny)) {
		game.over();
		return;
	}

	if(this.eatingFood(nx, ny)) {
		tail = {x: nx, y: ny};
		food = new Food();
	} else {
		var tail = this.array.pop();
		tail.x = nx;
		tail.y = ny;
	}

	this.array.unshift(tail);

	this.paint();
}

Snake.prototype.paint = function() {
	canvas.redraw();
	for(var i = 0; i < this.array.length; i++) {
		// The current snake body element
		var j = this.array[i];

		canvas.paint(j.x, j.y, this.bodyColour, this.outlineColour);
	}
}

Snake.prototype.outsideBounds = function(nx, ny) {
	if(nx <= -1 || nx === canvas.width/canvas.cellWidth || ny <= -1 || ny === canvas.height/canvas.cellWidth) {
		return true;
	}
	return false;
}

Snake.prototype.eatingFood = function(nx, ny) {
	if(nx === food.x && ny === food.y) {
		return true;
	}
	return false;
}

function Food() {
	this.x = Math.round(Math.random() * (canvas.width-canvas.cellWidth)/canvas.cellWidth);
	this.y = Math.round(Math.random() * (canvas.height-canvas.cellWidth)/canvas.cellWidth);
	this.draw = function(){
		console.log(this.x, this.y);
		canvas.paint(this.x, this.y);
	};
	this.draw();

}


var game = new Object();
game.runLoop = function(){
	mainSnake.move();
	food.draw();

};
game.start = function() {
	mainSnake = new Snake(5, 'red', 'white', {x: 5, y: 5});
	food = new Food();
	this.loop = setInterval(game.runLoop, 60);
};
game.over = function(){
	clearInterval(this.loop);
	canvas.redraw();
	this.start();
};

game.start();



document.onkeydown = function(e) {
	if(typeof mainSnake !== 'undefined'){
		// Cross browser keycode detection
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
}