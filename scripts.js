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

function Snake(length) {
	this.length = length;
	this.array = [];
	this.create = function(){
		for(var i = this.length-1; i>=0; i--) {
			this.array.push({x: i, y: 0});
		}
	};
	this.create();
}

Snake.prototype.paint = function() {
	for(var i = 0; i < this.array.length; i++) {
		var j = this.array[i];

		canvas.context.fillStyle = 'red';
		canvas.context.fillRect(j.x*10, j.y*10, 10, 10);
		canvas.context.strokeStyle = 'yellow';
		canvas.context.strokeRect(j.x*10, j.y*10, 10, 10);
	}
}


var mainSnake = new Snake(5);

mainSnake.paint();


document.onkeydown = function(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	
}