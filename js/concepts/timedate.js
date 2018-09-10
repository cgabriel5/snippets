/**
 * Create a human readable time format from a timestamp.
 *
 * @param  {number} timestamp - The timestamp in milliseconds (not UNIX).
 * @param  {boolean} format12 - Format in 12 hour format.
 * @param  {string} delimiter - Delimiter character.
 * @param  {function} cb - Optional custom format function.
 * @return {string} - The timestamp pretty format.
 *
 * @resource [https://stackoverflow.com/a/6078873]
 * @resource [https://stackoverflow.com/a/45464959]
 * @resource [https://stackoverflow.com/a/5971324]
 * @resource [https://www.w3schools.com/js/js_date_methods.asp]
 */
var timedate = function(timestamp, format12, delimiter, cb) {
	// Timestamp must be a number.
	if (!timestamp || typeof timestamp !== "number") {
		return undefined;
	}

	// Default the delimiter to nothing.
	delimiter = delimiter || " ";
	if (delimiter.trim() !== "") {
		delimiter = ` ${delimiter.trim()} `;
	}

	// Create the date object using the modified timestamp.
	var date = new Date(timestamp);

	// Get the needed date information.
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();

	// Get date time information.
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();

	/**
	 * Prefix number with a zero.
	 *
	 * @param  {number} num - The number to prefix.
	 * @return {string} - The prefixed number as a string.
	 */
	var prefix_zero = function(num) {
		return num < 10 ? `0${num + ""}` : num + "";
	};

	// Reset the hour.
	hour = hour > 12 && format12 ? hour - 12 : hour;
	hour = hour === 0 ? 12 : hour;

	// Zero prefix time vars.
	hour = prefix_zero(hour);
	min = prefix_zero(min);
	sec = prefix_zero(sec);

	// If a custom format function is supplied use it.
	if (cb && typeof cb === "function") {
		return cb.call({
			year: year,
			month: month,
			day: day,
			hour: hour,
			min: min,
			sec: sec
		});
	}

	// Format the time in the following format when no custom
	// format function is supplied:
	return `${year}-${month}-${day}${delimiter}${hour}:${min}:${sec}`;
};

// Usage.

timedate(1535091451940); // "2018-7-23 23:17:31"

// Use 12 hour format and use "/" as a delimiter.
timedate(1535091451940, true, "/"); // "2018-7-23 / 11:17:31"

// Custom format function.
timedate(1535091451940, null, null, function() {
	// Fill and return the following template.
	return `${this.month}/${this.day}/${this.year} - ${this.hour}:${this.min}:${this.sec}`;
}); // "7/23/2018 - 11:17:31"
