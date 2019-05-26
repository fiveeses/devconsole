// NO DEPENDENCIES
/**
 * Creates an element of the given tagName with the specified
 * attributes, properties, and styles.
 * @param {string} tagName Tagname of the HTMLElement, for example "div".
 * @param {Object} attrs KVP Dictionary attribute name to value.
 * @param {Object} props KVP Dictionary property name to value.
 * @param {Object} style KVP Dictionary style propery name to value.
 * @returns {HTMLElement} The newly created element.
 */
export function makeElement(
   tagName, 
   attrs = {}, 
   props = {}, 
   style = {}) {

   const target = document.createElement(tagName);

   Object.keys(attrs).forEach((attrName) => {
		target.setAttribute(attrName, attrs[attrName]);
	});

   Object.keys(style).forEach((propName) => {
		target.style[propName] = style[propName];
	});

   Object.keys(props).forEach((propName) => {
		target[propName] = props[propName];
	});

   return target;
};

// eof