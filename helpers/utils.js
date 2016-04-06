export function debounce(func, wait, immediate) {
	let timeout;
	return () => {
		const context = this, args = arguments;
		const later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export function pad(number, times, char) {
	let str = number + '';
	while(str.length < times) str = char + str;
	return str;
};

/* Convert 12.5 to 12h30 */
export function prettyHour(hour) {
	const hours = Math.floor(hour);
	const minutes = Math.floor((hour - Math.floor(hour)) * 60);
	return pad(hours, 2, '0') + 'h' + (minutes ? pad(minutes, 2, '0') : '');
}
