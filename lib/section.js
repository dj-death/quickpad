"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = require("./utils/core");

var _epubcfi = require("./epubcfi");

var _epubcfi2 = _interopRequireDefault(_epubcfi);

var _hook = require("./utils/hook");

var _hook2 = _interopRequireDefault(_hook);

var _replacements = require("./utils/replacements");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a Section of the Book
 * In most books this is equivelent to a Chapter
 * @param {object} item  The spine item representing the section
 * @param {object} hooks hooks for serialize and content
 */
var Section = function () {
	function Section(item, hooks) {
		_classCallCheck(this, Section);

		this.idref = item.idref;
		this.linear = item.linear === "yes";
		this.properties = item.properties;
		this.index = item.index;
		this.href = item.href;
		this.url = item.url;
		this.canonical = item.canonical;
		this.next = item.next;
		this.prev = item.prev;

		this.cfiBase = item.cfiBase;

		if (hooks) {
			this.hooks = hooks;
		} else {
			this.hooks = {};
			this.hooks.serialize = new _hook2.default(this);
			this.hooks.content = new _hook2.default(this);
		}

		this.document = undefined;
		this.contents = undefined;
		this.output = undefined;
	}

	/**
  * Load the section from its url
  * @param  {method} _request a request method to use for loading
  * @return {document} a promise with the xml document
  */


	_createClass(Section, [{
		key: "load",
		value: function load(_request) {
			var request = _request || this.request || require("./utils/request");
			var loading = new _core.defer();
			var loaded = loading.promise;

			if (this.contents) {
				loading.resolve(this.contents);
			} else {
				request(this.url).then(function (xml) {
					// var directory = new Url(this.url).directory;

					this.document = xml;
					this.contents = xml.documentElement;

					return this.hooks.content.trigger(this.document, this);
				}.bind(this)).then(function () {
					loading.resolve(this.contents);
				}.bind(this)).catch(function (error) {
					loading.reject(error);
				});
			}

			return loaded;
		}

		/**
   * Adds a base tag for resolving urls in the section
   * @private
   */

	}, {
		key: "base",
		value: function base() {
			return (0, _replacements.replaceBase)(this.document, this);
		}

		/**
   * Render the contents of a section
   * @param  {method} _request a request method to use for loading
   * @return {string} output a serialized XML Document
   */

	}, {
		key: "render",
		value: function render(_request) {
			var rendering = new _core.defer();
			var rendered = rendering.promise;
			this.output; // TODO: better way to return this from hooks?

			this.load(_request).then(function (contents) {
				var userAgent = typeof navigator !== 'undefined' && navigator.userAgent || '';
				var isIE = userAgent.indexOf('Trident') >= 0;
				var Serializer;
				if (typeof XMLSerializer === "undefined" || isIE) {
					Serializer = require("xmldom").XMLSerializer;
				} else {
					Serializer = XMLSerializer;
				}
				var serializer = new Serializer();
				this.output = serializer.serializeToString(contents);
				return this.output;
			}.bind(this)).then(function () {
				return this.hooks.serialize.trigger(this.output, this);
			}.bind(this)).then(function () {
				rendering.resolve(this.output);
			}.bind(this)).catch(function (error) {
				rendering.reject(error);
			});

			return rendered;
		}

		/**
   * Find a string in a section
   * @param  {string} _query The query string to find
   * @return {object[]} A list of matches, with form {cfi, excerpt}
   */

	}, {
		key: "find",
		value: function find(_query) {
			var section = this;
			var matches = [];
			var query = _query.toLowerCase();
			var find = function find(node) {
				var text = node.textContent.toLowerCase();
				var range = section.document.createRange();
				var cfi;
				var pos;
				var last = -1;
				var excerpt;
				var limit = 150;

				while (pos != -1) {
					// Search for the query
					pos = text.indexOf(query, last + 1);

					if (pos != -1) {
						// We found it! Generate a CFI
						range = section.document.createRange();
						range.setStart(node, pos);
						range.setEnd(node, pos + query.length);

						cfi = section.cfiFromRange(range);

						// Generate the excerpt
						if (node.textContent.length < limit) {
							excerpt = node.textContent;
						} else {
							excerpt = node.textContent.substring(pos - limit / 2, pos + limit / 2);
							excerpt = "..." + excerpt + "...";
						}

						// Add the CFI to the matches list
						matches.push({
							cfi: cfi,
							excerpt: excerpt
						});
					}

					last = pos;
				}
			};

			(0, _core.sprint)(section.document, function (node) {
				find(node);
			});

			return matches;
		}
	}, {
		key: "reconcileLayoutSettings",


		/**
  * Reconciles the current chapters layout properies with
  * the global layout properities.
  * @param {object} global  The globa layout settings object, chapter properties string
  * @return {object} layoutProperties Object with layout properties
  */
		value: function reconcileLayoutSettings(global) {
			//-- Get the global defaults
			var settings = {
				layout: global.layout,
				spread: global.spread,
				orientation: global.orientation
			};

			//-- Get the chapter's display type
			this.properties.forEach(function (prop) {
				var rendition = prop.replace("rendition:", "");
				var split = rendition.indexOf("-");
				var property, value;

				if (split != -1) {
					property = rendition.slice(0, split);
					value = rendition.slice(split + 1);

					settings[property] = value;
				}
			});
			return settings;
		}

		/**
   * Get a CFI from a Range in the Section
   * @param  {range} _range
   * @return {string} cfi an EpubCFI string
   */

	}, {
		key: "cfiFromRange",
		value: function cfiFromRange(_range) {
			return new _epubcfi2.default(_range, this.cfiBase).toString();
		}

		/**
   * Get a CFI from an Element in the Section
   * @param  {element} el
   * @return {string} cfi an EpubCFI string
   */

	}, {
		key: "cfiFromElement",
		value: function cfiFromElement(el) {
			return new _epubcfi2.default(el, this.cfiBase).toString();
		}

		/**
   * Unload the section document
   */

	}, {
		key: "unload",
		value: function unload() {
			this.document = undefined;
			this.contents = undefined;
			this.output = undefined;
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.unload();
			this.hooks.serialize.clear();
			this.hooks.content.clear();

			this.hooks = undefined;
			this.idref = undefined;
			this.linear = undefined;
			this.properties = undefined;
			this.index = undefined;
			this.href = undefined;
			this.url = undefined;
			this.next = undefined;
			this.prev = undefined;

			this.cfiBase = undefined;
		}
	}]);

	return Section;
}();

exports.default = Section;
module.exports = exports["default"];