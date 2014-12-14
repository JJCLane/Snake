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

var snakeArray;

function Snake(length, cellWidth, startingPosX, startingPosY) {
	this.length = length;
	this.cellWidth = cellWidth;
	this.array = [];
	
	var startingPosX = startingPosX;
	var startingPosY = startingPosY;
	this.create = function(){
		for(var i = this.length-1; i>=0; i--) {
			this.array.push({x: startingPosX + i, y: startingPosY});
		}
	};
	this.create();
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


var mainSnake = new Snake(5, 10, 5, 5);

mainSnake.paint();


document.onkeydown = function(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	
}