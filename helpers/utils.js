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
