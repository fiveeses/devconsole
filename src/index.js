function makeElement(tagName, attrs = {}, props = {}, style = {}) {
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
}

const devconsole = {
	init: (target, className) => {
		// TODO: verify target is truthy and is a Node

		// create markup
		const wrapper = makeElement("div", {
			class: `devconsole wrapper${!className?"":` ${className}`}`
		});
		const innerwrapper = makeElement("section", {
			class: "inner"
		});
		const body = makeElement("section", {
			class: "body"
		});
		const maintext = makeElement("p", {
			class: "text"
		});
		const footer = makeElement("section", {
			class: "footer dbt"
		},{ 
			innerText: ">"
		}, {  });
		const inputspot = makeElement("article", {
			class: "input",
		});
		const input = makeElement("input", {
			class: "",
			type: "text"
		});
		wrapper.appendChild(innerwrapper);
		innerwrapper.appendChild(body);
		body.appendChild(maintext);
		innerwrapper.appendChild(footer);
		footer;
		footer.appendChild(inputspot);
		inputspot.appendChild(input);
		target.appendChild(wrapper);

		return wrapper;
	}
};

export default devconsole;