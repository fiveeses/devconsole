// NO DEPENDENCIES
/**
 * Applies all of the possible stops to the given event.
 * @param {Event} e The event to stop.
 * @returns false.
 */
export function stopEvent(e) {
	e.cancelBubble = true;
	e.preventDefault && e.preventDefault();
	e.stopPropagation && e.stopPropagation();
	e.stopImmediatePropagation && e.stopImmediatePropagation();
	return false;
};

// eof