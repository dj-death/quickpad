import XMLDom from "xmldom";

/**
 * Core Utilities and Helpers
 * @module Core
*/

/**
 * Vendor prefixed requestAnimationFrame
 * @returns {function} requestAnimationFrame
 * @memberof Core
 */
export const requestAnimationFrame = typeof window != "undefined" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : false;
export const ELEMENT_NODE = 1;
export const TEXT_NODE = 3;
export const COMMENT_NODE = 8;
export const DOCUMENT_NODE = 9;
export const _URL = typeof URL != "undefined" ? URL : typeof window != "undefined" ? window.URL || window.webkitURL || window.mozURL : undefined;

/**
 * Generates a UUID
 * based on: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
 * @returns {string} uuid
 * @memberof Core
 */
export function uuid() {
	var d = new Date().getTime();
	if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
		d += performance.now(); //use high-precision timer if available
	}
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
	});
}

/**
 * Gets the height of a document
 * @returns {number} height
 * @memberof Core
 */
export function documentHeight() {
	return Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight);
}

/**
 * Checks if a node is an element
 * @returns {boolean}
 * @memberof Core
 */
export function isElement(obj) {
	return !!(obj && obj.nodeType == 1);
}

/**
 * @returns {boolean}
 * @memberof Core
 */
export function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * @returns {boolean}
 * @memberof Core
 */
export function isFloat(n) {
	let f = parseFloat(n);
	return isNumber(n) && Math.floor(f) !== parseFloat(n);
}

/**
 * Get a prefixed css property
 * @returns {string}
 * @memberof Core
 */
export function prefixed(unprefixed) {
	var vendors = ["Webkit", "webkit", "Moz", "O", "ms"];
	var prefixes = ["-webkit-", "-webkit-", "-moz-", "-o-", "-ms-"];
	var upper = unprefixed[0].toUpperCase() + unprefixed.slice(1);
	var length = vendors.length;

	if (typeof document === "undefined" || typeof document.body.style[unprefixed] != "undefined") {
		return unprefixed;
	}

	for (var i = 0; i < length; i++) {
		if (typeof document.body.style[vendors[i] + upper] != "undefined") {
			return prefixes[i] + unprefixed;
		}
	}

	return unprefixed;
}

/**
 * Apply defaults to an object
 * @param {object} obj
 * @returns {object}
 * @memberof Core
 */
export function defaults(obj) {
	for (var i = 1, length = arguments.length; i < length; i++) {
		var source = arguments[i];
		for (var prop in source) {
			if (obj[prop] === void 0) obj[prop] = source[prop];
		}
	}
	return obj;
}

/**
 * Extend properties of an object
 * @param {object} target
 * @returns {object}
 * @memberof Core
 */
export function extend(target) {
	var sources = [].slice.call(arguments, 1);
	sources.forEach(function (source) {
		if (!source) return;
		Object.getOwnPropertyNames(source).forEach(function (propName) {
			Object.defineProperty(target, propName, Object.getOwnPropertyDescriptor(source, propName));
		});
	});
	return target;
}

/**
 * Fast quicksort insert for sorted array -- based on:
 *  http://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers
 * @param {any} item
 * @param {array} array
 * @param {function} [compareFunction]
 * @returns {number} location (in array)
 * @memberof Core
 */
export function insert(item, array, compareFunction) {
	var location = locationOf(item, array, compareFunction);
	array.splice(location, 0, item);

	return location;
}

/**
 * Finds where something would fit into a sorted array
 * @param {any} item
 * @param {array} array
 * @param {function} [compareFunction]
 * @param {function} [_start]
 * @param {function} [_end]
 * @returns {number} location (in array)
 * @memberof Core
 */
export function locationOf(item, array, compareFunction, _start, _end) {
	var start = _start || 0;
	var end = _end || array.length;
	var pivot = parseInt(start + (end - start) / 2);
	var compared;
	if (!compareFunction) {
		compareFunction = function (a, b) {
			if (a > b) return 1;
			if (a < b) return -1;
			if (a == b) return 0;
		};
	}
	if (end - start <= 0) {
		return pivot;
	}

	compared = compareFunction(array[pivot], item);
	if (end - start === 1) {
		return compared >= 0 ? pivot : pivot + 1;
	}
	if (compared === 0) {
		return pivot;
	}
	if (compared === -1) {
		return locationOf(item, array, compareFunction, pivot, end);
	} else {
		return locationOf(item, array, compareFunction, start, pivot);
	}
}

/**
 * Finds index of something in a sorted array
 * Returns -1 if not found
 * @param {any} item
 * @param {array} array
 * @param {function} [compareFunction]
 * @param {function} [_start]
 * @param {function} [_end]
 * @returns {number} index (in array) or -1
 * @memberof Core
 */
export function indexOfSorted(item, array, compareFunction, _start, _end) {
	var start = _start || 0;
	var end = _end || array.length;
	var pivot = parseInt(start + (end - start) / 2);
	var compared;
	if (!compareFunction) {
		compareFunction = function (a, b) {
			if (a > b) return 1;
			if (a < b) return -1;
			if (a == b) return 0;
		};
	}
	if (end - start <= 0) {
		return -1; // Not found
	}

	compared = compareFunction(array[pivot], item);
	if (end - start === 1) {
		return compared === 0 ? pivot : -1;
	}
	if (compared === 0) {
		return pivot; // Found
	}
	if (compared === -1) {
		return indexOfSorted(item, array, compareFunction, pivot, end);
	} else {
		return indexOfSorted(item, array, compareFunction, start, pivot);
	}
}
/**
 * Find the bounds of an element
 * taking padding and margin into account
 * @param {element} el
 * @returns {{ width: Number, height: Number}}
 * @memberof Core
 */
export function bounds(el) {

	var style = window.getComputedStyle(el);
	var widthProps = ["width", "paddingRight", "paddingLeft", "marginRight", "marginLeft", "borderRightWidth", "borderLeftWidth"];
	var heightProps = ["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth"];

	var width = 0;
	var height = 0;

	widthProps.forEach(function (prop) {
		width += parseFloat(style[prop]) || 0;
	});

	heightProps.forEach(function (prop) {
		height += parseFloat(style[prop]) || 0;
	});

	return {
		height: height,
		width: width
	};
}

/**
 * Find the bounds of an element
 * taking padding, margin and borders into account
 * @param {element} el
 * @returns {{ width: Number, height: Number}}
 * @memberof Core
 */
export function borders(el) {

	var style = window.getComputedStyle(el);
	var widthProps = ["paddingRight", "paddingLeft", "marginRight", "marginLeft", "borderRightWidth", "borderLeftWidth"];
	var heightProps = ["paddingTop", "paddingBottom", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth"];

	var width = 0;
	var height = 0;

	widthProps.forEach(function (prop) {
		width += parseFloat(style[prop]) || 0;
	});

	heightProps.forEach(function (prop) {
		height += parseFloat(style[prop]) || 0;
	});

	return {
		height: height,
		width: width
	};
}

/**
 * Find the equivelent of getBoundingClientRect of a browser window
 * @returns {{ width: Number, height: Number, top: Number, left: Number, right: Number, bottom: Number }}
 * @memberof Core
 */
export function windowBounds() {

	var width = window.innerWidth;
	var height = window.innerHeight;

	return {
		top: 0,
		left: 0,
		right: width,
		bottom: height,
		width: width,
		height: height
	};
}

/**
 * Gets the index of a node in its parent
 * @private
 * @memberof Core
 */
export function indexOfNode(node, typeId) {
	var parent = node.parentNode;
	var children = parent.childNodes;
	var sib;
	var index = -1;
	for (var i = 0; i < children.length; i++) {
		sib = children[i];
		if (sib.nodeType === typeId) {
			index++;
		}
		if (sib == node) break;
	}

	return index;
}

/**
 * Gets the index of a text node in its parent
 * @param {node} textNode
 * @returns {number} index
 * @memberof Core
 */
export function indexOfTextNode(textNode) {
	return indexOfNode(textNode, TEXT_NODE);
}

/**
 * Gets the index of an element node in its parent
 * @param {element} elementNode
 * @returns {number} index
 * @memberof Core
 */
export function indexOfElementNode(elementNode) {
	return indexOfNode(elementNode, ELEMENT_NODE);
}

/**
 * Check if extension is xml
 * @param {string} ext
 * @returns {boolean}
 * @memberof Core
 */
export function isXml(ext) {
	return ["xml", "opf", "ncx"].indexOf(ext) > -1;
}

/**
 * Create a new blob
 * @param {any} content
 * @param {string} mime
 * @returns {Blob}
 * @memberof Core
 */
export function createBlob(content, mime) {
	return new Blob([content], { type: mime });
}

/**
 * Create a new blob url
 * @param {any} content
 * @param {string} mime
 * @returns {string} url
 * @memberof Core
 */
export function createBlobUrl(content, mime) {
	var tempUrl;
	var blob = createBlob(content, mime);

	tempUrl = _URL.createObjectURL(blob);

	return tempUrl;
}

/**
 * Remove a blob url
 * @param {string} url
 * @memberof Core
 */
export function revokeBlobUrl(url) {
	return _URL.revokeObjectURL(url);
}

/**
 * Create a new base64 encoded url
 * @param {any} content
 * @param {string} mime
 * @returns {string} url
 * @memberof Core
 */
export function createBase64Url(content, mime) {
	var data;
	var datauri;

	if (typeof content !== "string") {
		// Only handles strings
		return;
	}

	data = btoa(encodeURIComponent(content));

	datauri = "data:" + mime + ";base64," + data;

	return datauri;
}

/**
 * Get type of an object
 * @param {object} obj
 * @returns {string} type
 * @memberof Core
 */
export function type(obj) {
	return Object.prototype.toString.call(obj).slice(8, -1);
}

/**
 * Parse xml (or html) markup
 * @param {string} markup
 * @param {string} mime
 * @param {boolean} forceXMLDom force using xmlDom to parse instead of native parser
 * @returns {document} document
 * @memberof Core
 */
export function parse(markup, mime, forceXMLDom) {
	var doc;
	var Parser;

	if (typeof DOMParser === "undefined" || forceXMLDom) {
		Parser = XMLDom.DOMParser;
	} else {
		Parser = DOMParser;
	}

	// Remove byte order mark before parsing
	// https://www.w3.org/International/questions/qa-byte-order-mark
	if (markup.charCodeAt(0) === 0xFEFF) {
		markup = markup.slice(1);
	}

	doc = new Parser().parseFromString(markup, mime);

	return doc;
}

/**
 * querySelector polyfill
 * @param {element} el
 * @param {string} sel selector string
 * @returns {element} element
 * @memberof Core
 */
export function qs(el, sel) {
	var elements;
	if (!el) {
		throw new Error("No Element Provided");
	}

	if (typeof el.querySelector != "undefined") {
		return el.querySelector(sel);
	} else {
		elements = el.getElementsByTagName(sel);
		if (elements.length) {
			return elements[0];
		}
	}
}

/**
 * querySelectorAll polyfill
 * @param {element} el
 * @param {string} sel selector string
 * @returns {element[]} elements
 * @memberof Core
 */
export function qsa(el, sel) {

	if (typeof el.querySelector != "undefined") {
		return el.querySelectorAll(sel);
	} else {
		return el.getElementsByTagName(sel);
	}
}

/**
 * querySelector by property
 * @param {element} el
 * @param {string} sel selector string
 * @param {props[]} props
 * @returns {element[]} elements
 * @memberof Core
 */
export function qsp(el, sel, props) {
	var q, filtered;
	if (typeof el.querySelector != "undefined") {
		sel += "[";
		for (var prop in props) {
			sel += prop + "~='" + props[prop] + "'";
		}
		sel += "]";

		return el.querySelector(sel);
	} else {
		q = el.getElementsByTagName(sel);
		filtered = Array.prototype.slice.call(q, 0).filter(function (el) {
			for (var prop in props) {
				if (el.getAttribute(prop) === props[prop]) {
					return true;
				}
			}
			return false;
		});

		if (filtered) {
			return filtered[0];
		}
	}
}

/**
 * Sprint through all text nodes in a document
 * @memberof Core
 * @param  {element} root element to start with
 * @param  {function} func function to run on each element
 */
export function sprint(root, func) {
	var doc = root.ownerDocument || root;
	if (typeof doc.createTreeWalker !== "undefined") {
		treeWalker(root, func, NodeFilter.SHOW_TEXT);
	} else {
		walk(root, function (node) {
			if (node && node.nodeType === 3) {
				// Node.TEXT_NODE
				func(node);
			}
		}, true);
	}
}

export function treeWalker(root, func, filter) {
	var treeWalker = document.createTreeWalker(root, filter, null, false);
	let node;
	while (node = treeWalker.nextNode()) {
		func(node);
	}
}

/**
 * @memberof Core
 * @param {node} node
 * @param {callback} return false for continue,true for break inside callback
 */
export function walk(node, callback) {
	if (callback(node)) {
		return true;
	}
	node = node.firstChild;
	if (node) {
		do {
			let walked = walk(node, callback);
			if (walked) {
				return true;
			}
			node = node.nextSibling;
		} while (node);
	}
}

/**
 * Convert a blob to a base64 encoded string
 * @param {Blog} blob
 * @returns {string}
 * @memberof Core
 */
export function blob2base64(blob) {
	return new Promise(function (resolve, reject) {
		var reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = function () {
			resolve(reader.result);
		};
	});
}

/**
 * Creates a new pending promise and provides methods to resolve or reject it.
 * From: https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred#backwards_forwards_compatible
 * @memberof Core
 */
export function defer() {
	/* A method to resolve the associated Promise with the value passed.
  * If the promise is already settled it does nothing.
  *
  * @param {anything} value : This value is used to resolve the promise
  * If the value is a Promise then the associated promise assumes the state
  * of Promise passed as value.
  */
	this.resolve = null;

	/* A method to reject the assocaited Promise with the value passed.
  * If the promise is already settled it does nothing.
  *
  * @param {anything} reason: The reason for the rejection of the Promise.
  * Generally its an Error object. If however a Promise is passed, then the Promise
  * itself will be the reason for rejection no matter the state of the Promise.
  */
	this.reject = null;

	this.id = uuid();

	/* A newly created Pomise object.
  * Initially in pending state.
  */
	this.promise = new Promise((resolve, reject) => {
		this.resolve = resolve;
		this.reject = reject;
	});
	Object.freeze(this);
}

/**
 * querySelector with filter by epub type
 * @param {element} html
 * @param {string} element element type to find
 * @param {string} type epub type to find
 * @returns {element[]} elements
 * @memberof Core
 */
export function querySelectorByType(html, element, type) {
	var query;
	if (typeof html.querySelector != "undefined") {
		query = html.querySelector(`${element}[*|type="${type}"]`);
	}
	// Handle IE not supporting namespaced epub:type in querySelector
	if (!query || query.length === 0) {
		query = qsa(html, element);
		for (var i = 0; i < query.length; i++) {
			if (query[i].getAttributeNS("http://www.idpf.org/2007/ops", "type") === type || query[i].getAttribute("epub:type") === type) {
				return query[i];
			}
		}
	} else {
		return query;
	}
}

/**
 * Find direct decendents of an element
 * @param {element} el
 * @returns {element[]} children
 * @memberof Core
 */
export function findChildren(el) {
	var result = [];
	var childNodes = el.childNodes;
	for (var i = 0; i < childNodes.length; i++) {
		let node = childNodes[i];
		if (node.nodeType === 1) {
			result.push(node);
		}
	}
	return result;
}

/**
 * Find all parents (ancestors) of an element
 * @param {element} node
 * @returns {element[]} parents
 * @memberof Core
 */
export function parents(node) {
	var nodes = [node];
	for (; node; node = node.parentNode) {
		nodes.unshift(node);
	}
	return nodes;
}

/**
 * Find all direct decendents of a specific type
 * @param {element} el
 * @param {string} nodeName
 * @param {boolean} [single]
 * @returns {element[]} children
 * @memberof Core
 */
export function filterChildren(el, nodeName, single) {
	var result = [];
	var childNodes = el.childNodes;
	for (var i = 0; i < childNodes.length; i++) {
		let node = childNodes[i];
		if (node.nodeType === 1 && node.nodeName.toLowerCase() === nodeName) {
			if (single) {
				return node;
			} else {
				result.push(node);
			}
		}
	}
	if (!single) {
		return result;
	}
}

/**
 * Filter all parents (ancestors) with tag name
 * @param {element} node
 * @param {string} tagname
 * @returns {element[]} parents
 * @memberof Core
 */
export function getParentByTagName(node, tagname) {
	let parent;
	if (node === null || tagname === "") return;
	parent = node.parentNode;
	while (parent.nodeType === 1) {
		if (parent.tagName.toLowerCase() === tagname) {
			return parent;
		}
		parent = parent.parentNode;
	}
}

/**
 * Get the next section in the spine
 */
export function nextSection(section, spine) {
	let nextIndex = section.index;
	while (nextIndex < spine.length - 1) {
		let next = spine[nextIndex + 1];
		if (next && (next.linear === true || next.linear === "yes")) {
			return next;
		}
		nextIndex += 1;
	}
	return;
}

/**
 * Get the previous section in the spine
 */
export function prevSection(section, spine) {
	let prevIndex = section.index;
	while (prevIndex > 0) {
		let prev = spine[prevIndex - 1];
		if (prev && (prev.linear === true || prev.linear === "yes")) {
			return prev;
		}
		prevIndex -= 1;
	}
	return;
}

/**
 * Serialize the contents of a document
 */
export function serialize(doc) {
	let userAgent = typeof navigator !== "undefined" && navigator.userAgent || "";
	let isIE = userAgent.indexOf("Trident") >= 0;
	let Serializer;
	if (typeof XMLSerializer === "undefined" || isIE) {
		Serializer = XMLDom.XMLSerializer;
	} else {
		Serializer = XMLSerializer;
	}
	let serializer = new Serializer();
	return serializer.serializeToString(doc);
}

/**
 * Lightweight Polyfill for DOM Range
 * @class
 * @memberof Core
 */
export class RangeObject {
	constructor() {
		this.collapsed = false;
		this.commonAncestorContainer = undefined;
		this.endContainer = undefined;
		this.endOffset = undefined;
		this.startContainer = undefined;
		this.startOffset = undefined;
	}

	setStart(startNode, startOffset) {
		this.startContainer = startNode;
		this.startOffset = startOffset;

		if (!this.endContainer) {
			this.collapse(true);
		} else {
			this.commonAncestorContainer = this._commonAncestorContainer();
		}

		this._checkCollapsed();
	}

	setEnd(endNode, endOffset) {
		this.endContainer = endNode;
		this.endOffset = endOffset;

		if (!this.startContainer) {
			this.collapse(false);
		} else {
			this.collapsed = false;
			this.commonAncestorContainer = this._commonAncestorContainer();
		}

		this._checkCollapsed();
	}

	collapse(toStart) {
		this.collapsed = true;
		if (toStart) {
			this.endContainer = this.startContainer;
			this.endOffset = this.startOffset;
			this.commonAncestorContainer = this.startContainer.parentNode;
		} else {
			this.startContainer = this.endContainer;
			this.startOffset = this.endOffset;
			this.commonAncestorContainer = this.endOffset.parentNode;
		}
	}

	selectNode(referenceNode) {
		let parent = referenceNode.parentNode;
		let index = Array.prototype.indexOf.call(parent.childNodes, referenceNode);
		this.setStart(parent, index);
		this.setEnd(parent, index + 1);
	}

	selectNodeContents(referenceNode) {
		// let end = referenceNode.childNodes[referenceNode.childNodes - 1];
		let endIndex = referenceNode.nodeType === 3 ? referenceNode.textContent.length : parent.childNodes.length;
		this.setStart(referenceNode, 0);
		this.setEnd(referenceNode, endIndex);
	}

	_commonAncestorContainer(startContainer, endContainer) {
		var startParents = parents(startContainer || this.startContainer);
		var endParents = parents(endContainer || this.endContainer);

		if (startParents[0] != endParents[0]) return undefined;

		for (var i = 0; i < startParents.length; i++) {
			if (startParents[i] != endParents[i]) {
				return startParents[i - 1];
			}
		}
	}

	_checkCollapsed() {
		if (this.startContainer === this.endContainer && this.startOffset === this.endOffset) {
			this.collapsed = true;
		} else {
			this.collapsed = false;
		}
	}

	toString() {
		// TODO: implement walking between start and end to find text
	}
}