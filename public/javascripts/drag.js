var me = this;
$(document).ready(function() {
	var canvas = $('#mycanvas').get(0);
	var context = canvas.getContext('2d');
	var mouse = utils.captureMouse(canvas);
	var ball = new Ball();
	var vx, vy, gravity, bounce, isMouseDown = false;

	function init() {
		vx = Math.random() * 10 -5;
		vy = -10;
		bounce = -0.7;
		gravity = 0.2;
	}

	init();

	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;

	canvas.addEventListener('mousedown', function() {
		if (utils.containsPoint(ball.getBounds(), mouse.x, mouse.y)) {
			isMouseDown = true;
			canvas.addEventListener('mouseup', onMouseUp, false);
			canvas.addEventListener('mousemove', onMouseMove, false);
		}
	}, false);

	// function checkBoundaries() {
	// 	var left = 0, right = canvas.width, top = 0, 
	// }

	function onMouseUp() {
		isMouseDown = false;
		canvas.removeEventListener('mouseup', onMouseUp, false);
		canvas.removeEventListener('mousemove', onMouseMove, false);
	}

	function onMouseMove() {
		ball.x = mouse.x;
		ball.y = mouse.y;
	}

	(function drawFrame() {
		window.requestAnimationFrame(drawFrame, canvas);
		context.clearRect(0, 0, canvas.width, canvas.height);
		ball.draw(context);
	}());
});