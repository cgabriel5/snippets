// The needed global vars.
var x_start;
var velocity;

// On touchstart store the necessary information like the x coordinate and
// the time of the touch.
document.body.addEventListener(
	"touchstart",
	function(e) {
		// Get the touch event information.
		var info = e.targetTouches[0];

		// Store the start time/x position to later determine the slide
		// velocity on touchmove.
		velocity = {
			time: e.timeStamp,
			// Get the touched element and x coordinate.
			position: info.pageX
		};

	}
);

// On touchmove we calculate the velocity.
document.body.addEventListener(
	"touchmove",
	function(e) {
		// Get the touch event information.
		var info = e.targetTouches[0];

		// [https://stackoverflow.com/a/10996533]
		// Calculate the swipe velocity.
		// Formula: v = abs(x2 - x1) / (t2 - t1).
		var v =
			Math.abs(info.pageX - velocity.position) /
			(e.timeStamp - velocity.time);
	},
	{ passive: false }
);

// On touchend we reset all global vars.
document.body.addEventListener("touchend", function(e) {
	// Always reset.
	x_start = null;
	velocity = null;
});

