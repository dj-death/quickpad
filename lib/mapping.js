"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _epubcfi = require("./epubcfi");

var _epubcfi2 = _interopRequireDefault(_epubcfi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mapping = function () {
	function Mapping(layout, direction, axis, dev) {
		_classCallCheck(this, Mapping);

		this.layout = layout;
		this.horizontal = axis === "horizontal" ? true : false;
		this.direction = direction || "ltr";
		this._dev = dev;
	}

	_createClass(Mapping, [{
		key: "section",
		value: function section(view) {
			var ranges = this.findRanges(view);
			var map = this.rangeListToCfiList(view.section.cfiBase, ranges);

			return map;
		}
	}, {
		key: "page",
		value: function page(contents, cfiBase, start, end) {
			var root = contents && contents.document ? contents.document.body : false;
			var result;

			if (!root) {
				return;
			}

			result = this.rangePairToCfiPair(cfiBase, {
				start: this.findStart(root, start, end),
				end: this.findEnd(root, start, end)
			});

			if (this._dev === true) {
				var doc = contents.document;
				var startRange = new _epubcfi2.default(result.start).toRange(doc);
				var endRange = new _epubcfi2.default(result.end).toRange(doc);

				var selection = doc.defaultView.getSelection();
				var r = doc.createRange();
				selection.removeAllRanges();
				r.setStart(startRange.startContainer, startRange.startOffset);
				r.setEnd(endRange.endContainer, endRange.endOffset);
				selection.addRange(r);
			}

			return result;
		}
	}, {
		key: "walk",
		value: function walk(root, func) {
			// IE11 has strange issue, if root is text node IE throws exception on
			// calling treeWalker.nextNode(), saying
			// Unexpected call to method or property access instead of returing null value
			if (root && root.nodeType === Node.TEXT_NODE) {
				return;
			}
			// safeFilter is required so that it can work in IE as filter is a function for IE
			// and for other browser filter is an object.
			var filter = {
				acceptNode: function acceptNode(node) {
					if (node.data.trim().length > 0) {
						return NodeFilter.FILTER_ACCEPT;
					} else {
						return NodeFilter.FILTER_REJECT;
					}
				}
			};
			var safeFilter = filter.acceptNode;
			safeFilter.acceptNode = filter.acceptNode;

			var treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, safeFilter, false);
			var node;
			var result;
			while (node = treeWalker.nextNode()) {
				result = func(node);
				if (result) break;
			}

			return result;
		}
	}, {
		key: "findRanges",
		value: function findRanges(view) {
			var columns = [];
			var scrollWidth = view.contents.scrollWidth();
			var spreads = Math.ceil(scrollWidth / this.layout.spreadWidth);
			var count = spreads * this.layout.divisor;
			var columnWidth = this.layout.columnWidth;
			var gap = this.layout.gap;
			var start, end;

			for (var i = 0; i < count.pages; i++) {
				start = (columnWidth + gap) * i;
				end = columnWidth * (i + 1) + gap * i;
				columns.push({
					start: this.findStart(view.document.body, start, end),
					end: this.findEnd(view.document.body, start, end)
				});
			}

			return columns;
		}
	}, {
		key: "findStart",
		value: function findStart(root, start, end) {
			var _this = this;

			var stack = [root];
			var $el;
			var found;
			var $prev = root;

			while (stack.length) {

				$el = stack.shift();

				found = this.walk($el, function (node) {
					var left, right, top, bottom;
					var elPos;
					var elRange;

					elPos = _this.getBounds(node);

					if (_this.horizontal && _this.direction === "ltr") {

						left = _this.horizontal ? elPos.left : elPos.top;
						right = _this.horizontal ? elPos.right : elPos.bottom;

						if (left >= start && left <= end) {
							return node;
						} else if (right > start) {
							return node;
						} else {
							$prev = node;
							stack.push(node);
						}
					} else if (_this.horizontal && _this.direction === "rtl") {

						left = elPos.left;
						right = elPos.right;

						if (right <= end && right >= start) {
							return node;
						} else if (left < end) {
							return node;
						} else {
							$prev = node;
							stack.push(node);
						}
					} else {

						top = elPos.top;
						bottom = elPos.bottom;

						if (top >= start && top <= end) {
							return node;
						} else if (bottom > start) {
							return node;
						} else {
							$prev = node;
							stack.push(node);
						}
					}
				});

				if (found) {
					return this.findTextStartRange(found, start, end);
				}
			}

			// Return last element
			return this.findTextStartRange($prev, start, end);
		}
	}, {
		key: "findEnd",
		value: function findEnd(root, start, end) {
			var _this2 = this;

			var stack = [root];
			var $el;
			var $prev = root;
			var found;

			while (stack.length) {

				$el = stack.shift();

				found = this.walk($el, function (node) {

					var left, right, top, bottom;
					var elPos;
					var elRange;

					elPos = _this2.getBounds(node);

					if (_this2.horizontal && _this2.direction === "ltr") {

						left = Math.round(elPos.left);
						right = Math.round(elPos.right);

						if (left > end && $prev) {
							return $prev;
						} else if (right > end) {
							return node;
						} else {
							$prev = node;
							stack.push(node);
						}
					} else if (_this2.horizontal && _this2.direction === "rtl") {

						left = Math.round(_this2.horizontal ? elPos.left : elPos.top);
						right = Math.round(_this2.horizontal ? elPos.right : elPos.bottom);

						if (right < start && $prev) {
							return $prev;
						} else if (left < start) {
							return node;
						} else {
							$prev = node;
							stack.push(node);
						}
					} else {

						top = Math.round(elPos.top);
						bottom = Math.round(elPos.bottom);

						if (top > end && $prev) {
							return $prev;
						} else if (bottom > end) {
							return node;
						} else {
							$prev = node;
							stack.push(node);
						}
					}
				});

				if (found) {
					return this.findTextEndRange(found, start, end);
				}
			}

			// end of chapter
			return this.findTextEndRange($prev, start, end);
		}
	}, {
		key: "findTextStartRange",
		value: function findTextStartRange(node, start, end) {
			var ranges = this.splitTextNodeIntoRanges(node);
			var range;
			var pos;
			var left, top, right;

			for (var i = 0; i < ranges.length; i++) {
				range = ranges[i];

				pos = range.getBoundingClientRect();

				if (this.horizontal && this.direction === "ltr") {

					left = pos.left;
					if (left >= start) {
						return range;
					}
				} else if (this.horizontal && this.direction === "rtl") {

					right = pos.right;
					if (right <= end) {
						return range;
					}
				} else {

					top = pos.top;
					if (top >= start) {
						return range;
					}
				}

				// prev = range;
			}

			return ranges[0];
		}
	}, {
		key: "findTextEndRange",
		value: function findTextEndRange(node, start, end) {
			var ranges = this.splitTextNodeIntoRanges(node);
			var prev;
			var range;
			var pos;
			var left, right, top, bottom;

			for (var i = 0; i < ranges.length; i++) {
				range = ranges[i];

				pos = range.getBoundingClientRect();

				if (this.horizontal && this.direction === "ltr") {

					left = pos.left;
					right = pos.right;

					if (left > end && prev) {
						return prev;
					} else if (right > end) {
						return range;
					}
				} else if (this.horizontal && this.direction === "rtl") {

					left = pos.left;
					right = pos.right;

					if (right < start && prev) {
						return prev;
					} else if (left < start) {
						return range;
					}
				} else {

					top = pos.top;
					bottom = pos.bottom;

					if (top > end && prev) {
						return prev;
					} else if (bottom > end) {
						return range;
					}
				}

				prev = range;
			}

			// Ends before limit
			return ranges[ranges.length - 1];
		}
	}, {
		key: "splitTextNodeIntoRanges",
		value: function splitTextNodeIntoRanges(node, _splitter) {
			var ranges = [];
			var textContent = node.textContent || "";
			var text = textContent.trim();
			var range;
			var doc = node.ownerDocument;
			var splitter = _splitter || " ";

			var pos = text.indexOf(splitter);

			if (pos === -1 || node.nodeType != Node.TEXT_NODE) {
				range = doc.createRange();
				range.selectNodeContents(node);
				return [range];
			}

			range = doc.createRange();
			range.setStart(node, 0);
			range.setEnd(node, pos);
			ranges.push(range);
			range = false;

			while (pos != -1) {

				pos = text.indexOf(splitter, pos + 1);
				if (pos > 0) {

					if (range) {
						range.setEnd(node, pos);
						ranges.push(range);
					}

					range = doc.createRange();
					range.setStart(node, pos + 1);
				}
			}

			if (range) {
				range.setEnd(node, text.length);
				ranges.push(range);
			}

			return ranges;
		}
	}, {
		key: "rangePairToCfiPair",
		value: function rangePairToCfiPair(cfiBase, rangePair) {

			var startRange = rangePair.start;
			var endRange = rangePair.end;

			startRange.collapse(true);
			endRange.collapse(false);

			var startCfi = new _epubcfi2.default(startRange, cfiBase).toString();
			var endCfi = new _epubcfi2.default(endRange, cfiBase).toString();

			return {
				start: startCfi,
				end: endCfi
			};
		}
	}, {
		key: "rangeListToCfiList",
		value: function rangeListToCfiList(cfiBase, columns) {
			var map = [];
			var cifPair;

			for (var i = 0; i < columns.length; i++) {
				cifPair = this.rangePairToCfiPair(cfiBase, columns[i]);

				map.push(cifPair);
			}

			return map;
		}
	}, {
		key: "getBounds",
		value: function getBounds(node) {
			var elPos = void 0;
			if (node.nodeType == Node.TEXT_NODE) {
				var elRange = document.createRange();
				elRange.selectNodeContents(node);
				elPos = elRange.getBoundingClientRect();
			} else {
				elPos = node.getBoundingClientRect();
			}
			return elPos;
		}
	}]);

	return Mapping;
}();

exports.default = Mapping;
module.exports = exports["default"];