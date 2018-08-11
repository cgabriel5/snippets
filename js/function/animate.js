/**
 * General animation function.
 *
 * @param {object} options - The options object.
 * @return {undefined} - Nothing.
 *
 * @resource [https://codereview.stackexchange.com/a/106993]
 * @resource [https://javascript.info/js-animation]
 */
var animate = function(options) {
	options = options || {};

	// Defaults.
	var duration = options.duration || 1000,
		ease =
			options.easing ||
			// Easing functions:
			// [https://github.com/component/ease/blob/master/index.js#L16]
			// [https://github.com/component/ease/blob/master/index.js#L72]
			// [https://kodhus.com/easings/]
			function(n) {
				return --n * n * n + 1;
			},
		noop = function() {},
		onProgress = options.onProgress || noop,
		onComplete = options.onComplete || noop,
		onSkip = options.onSkip || noop,
		from = options.from,
		to = options.to,
		delay = options.delay,
		// Store the timer ID.
		tid,
		// Relay back some meta data.
		meta = {
			// Store the current animation tick.
			tick: 0,
			to: to,
			from: from
		};

	// A from and to value is required.
	if (typeof from !== "number" || typeof to !== "number") {
		return;
	}

	// Runtime variables.
	var startTime = Date.now();

	// Skip animation when the on skip function returns true and
	// just run the callback.
	if (onSkip() === true) {
		return onComplete(startTime, meta);
	}

	function update() {
		var deltaTime = Date.now() - startTime,
			progress = Math.min(deltaTime / duration, 1),
			factor = ease(progress),
			value;

		// Increment the tick.
		meta.tick++;

		// Calculate the value.
		value = from + (to - from) * factor;

		// True or False can be returned to stop animation/prevent
		// callback function.
		var result = onProgress(value, meta);
		// True: Stop animation + Run callback.
		// False: Stop animation + Don't run callback.

		// Stop animation progress when false is returned.
		if (result === true || progress === 1) {
			// Stop animation function AND RUN the callback.
			return onComplete(deltaTime, meta);
		} else if (result === false) {
			// Stop animation function AND DON'T run the callback.
			return;
		}

		// Continue requesting the animation frame.
		tid = request_aframe(update);
	}

	// Add a delay if provided.
	if (delay) {
		setTimeout(function() {
			// Run the first frame request.
			tid = request_aframe(update);
		}, delay);
	} else {
		// Run the first frame request.
		tid = request_aframe(update);
	}

	return {
		// [https://stackoverflow.com/a/31282386]
		cancel: function(cb) {
			(window.cancelAnimationFrame ||
				window.mozCancelAnimationFrame)(tid);

			// Run cancel callback if provided.
			if (cb) {
				cb.call(this, meta);
			}
		}
	};
};
