/**
 * Get the time ago from a timestamp given in milliseconds.
 *
 * @param  {number} timestamp - The timestamp in milliseconds (not UNIX).
 * @return {string} - The "time ago" (i.e. 1 minute ago).
 *
 * @resource [https://github.com/simonlc/epoch-timeago/blob/master/src/index.js]
 * @resource [https://stackoverflow.com/a/5971324]
 * @resource [https://stackoverflow.com/a/11072549]
 */
var timeago = function(timestamp) {
	// Timestamp must be a number.
	if (!timestamp || typeof timestamp !== "number") {
		return undefined;
	}

	// Get the elapsed time.
	var elapsed = Date.now() - (timestamp || 0);

	// Time segment breakdown information.
	var time_segments = [
		["year", "1 year ago", 3.154e10],
		["month", "1 month ago", 2.628e9],
		["week", "1 week ago", 6.048e8],
		["day", "1 day ago", 8.64e7],
		["hour", "1 hour ago", 3.6e6],
		["minute", "1 minute ago", 60000],
		["second", "just now", -Infinity]
	];

	// Find the time segment to grab the needed segment array.
	for (let i = 0, l = time_segments.length; i < l; i++) {
		var cur = time_segments[i];
		if (elapsed > cur[2]) {
			// Format and return the time ago.
			return (function(unit, singular, time_segment, time) {
				return unit === "second"
					? singular
					: time >= 2 * time_segment
						? Math.floor(time / time_segment) +
							" " +
							unit +
							"s ago"
						: singular;
			})(cur[0], cur[1], cur[2], elapsed);
		}
	}
};

// Usage.

timeago(1535091451940); // "2 weeks ago"
timeago(Date.now()); // "just now"
timeago(979286360016); // "17 years ago"
