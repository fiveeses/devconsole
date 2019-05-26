/* 

What's a processor?

1. takes commands
2. gives output to screen (or may)

Processor
.element - the target (what? it's the area where text will be added)
.execute - Executor function handling the commands
.utility - object containing items potentially useful to execution

*/
const UNKNOWN = "unknown";
class NotImplementedError extends Error {
	constructor(methodName, fileName, lineNumber, returnType, parameters) {
		super(methodName);
		this.message = `NotImplementedError: '${this.message}' is not implemented.`;
		if (typeof Error.captureStackTrace === "function") {
			Error.captureStackTrace(this, NotImplementedError);
		}
		this.expectedReturnType = (
			!returnType || typeof returnType !== "string") ?
				UNKNOWN : returnType;
		this.expectedParameters = (
			!!parameters && 
				(typeof parameters === "object" || 
					typeof parameters === "string")) ?
			parameters : UNKNOWN;
	}
}

const utilityProxyHandler = {
	get: function(obj, prop) {
		return prop in obj && obj[prop] || ((...args) => { console.info(...args); return (void 0); });
	}
};

const _utility = new Proxy({}, utilityProxyHandler);

export default class Processor {
	constructor(element) {
		this.element = element;
	}
	execute(text) { throw new NotImplementedError("execute", "dc.Processor.js", 26, "Promise", { line: "string" }); }
	get utility() { return Object.freeze(_utility) };

	enterLine(str) {
		const el = this.element;
		return Promise.resolve().then(() => {
			el.append(
				document.createTextNode(str),
				document.createElement("br")
			);
		}).then(() => {
			el.scrollTop = el.scrollHeight;
		});
	}

	enterFormattedLine(...args) {
		return Processor.writeFormattedLineToElement(this.element, ...args);
	}

	static writeFormattedLineToElement(element, frags = []) {
		return Promise.resolve().then(() => {
			const section = document.createElement("section");
			const handleFrag = (f) => {
				if (!!f) {
					switch (typeof f) {
						case "string": {
							section.appendChild(document.createTextNode(f));
						} break;
						case "object": {
							if (Array.isArray(f)) {
								f.forEach(handleFrag);
							} else {
								// plain object
								const span = document.createElement("span");
								span[f.isText !== false ? "innerText" : "innerHTML"] = f.value;
								console.log("FRAG", f);

								let p = f.attributes || {};
								Object.keys(p).forEach((a) => {
									console.log("attr: ", a);
									span.setAttribute(a, p[a]);
								});

								p = f.props || {};
								Object.keys(p).forEach((a) => {
									console.log("prop: ", a);
									span[a] = p[a];
								});

								p = f.style || {};
								Object.keys(p).forEach((a) => {
									console.log("style: ", a, p[a]);
									span.style[a] = p[a];
								});

								section.appendChild(span);
							}
						} break;
						default: break;
					};
				}
			};
			frags.forEach(handleFrag);
			element.appendChild(section);
		}).then(() => {
			element.scrollTop = element.scrollHeight;
		});
	}

	static setUtility(name, handler) {
		switch (typeof name) {
			case "string": {
				if (
					typeof handler === "function" &&
					!!name &&
					typeof name === "string") {
						_utility[name] = handler;
					}
			} break;
			case "object": {
				if (Array.isArray(name)) {
					name.forEach(setUtility);
				} else {
					Object.keys(name).forEach((k) => {
						this.setUtility(k, name[k]);
					});
				}
			} break;
			default: break;
		}
	}
};

// eof