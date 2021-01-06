(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	// ES3 safe
	var _undefined = void 0;

	var is = function (value) { return value !== _undefined && value !== null; };

	// prettier-ignore
	var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

	var is$1 = function (value) {
		if (!is(value)) return false;
		return hasOwnProperty.call(possibleTypes, typeof value);
	};

	var is$2 = function (value) {
		if (!is$1(value)) return false;
		try {
			if (!value.constructor) return false;
			return value.constructor.prototype === value;
		} catch (error) {
			return false;
		}
	};

	var is$3 = function (value) {
		if (typeof value !== "function") return false;

		if (!hasOwnProperty.call(value, "length")) return false;

		try {
			if (typeof value.length !== "number") return false;
			if (typeof value.call !== "function") return false;
			if (typeof value.apply !== "function") return false;
		} catch (error) {
			return false;
		}

		return !is$2(value);
	};

	var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

	var is$4 = function (value) {
		if (!is$3(value)) return false;
		if (classRe.test(functionToString.call(value))) return false;
		return true;
	};

	var isImplemented = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== "function") return false;
		obj = { foo: "raz" };
		assign(obj, { bar: "dwa" }, { trzy: "trzy" });
		return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
	};

	var isImplemented$1 = function () {
		try {
			return true;
		} catch (e) {
			return false;
		}
	};

	// eslint-disable-next-line no-empty-function
	var noop = function () {};

	var _undefined$1 = noop(); // Support ES3 engines

	var isValue = function (val) { return val !== _undefined$1 && val !== null; };

	var keys = Object.keys;

	var shim = function (object) { return keys(isValue(object) ? Object(object) : object); };

	var keys$1 = isImplemented$1() ? Object.keys : shim;

	var validValue = function (value) {
		if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
		return value;
	};

	var max   = Math.max;

	var shim$1 = function (dest, src/*, …srcn*/) {
		var error, i, length = max(arguments.length, 2), assign;
		dest = Object(validValue(dest));
		assign = function (key) {
			try {
				dest[key] = src[key];
			} catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < length; ++i) {
			src = arguments[i];
			keys$1(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};

	var assign = isImplemented() ? Object.assign : shim$1;

	var forEach = Array.prototype.forEach, create = Object.create;

	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};

	// eslint-disable-next-line no-unused-vars
	var normalizeOptions = function (opts1/*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (!isValue(options)) return;
			process(Object(options), result);
		});
		return result;
	};

	var str = "razdwatrzy";

	var isImplemented$2 = function () {
		if (typeof str.contains !== "function") return false;
		return str.contains("dwa") === true && str.contains("foo") === false;
	};

	var indexOf = String.prototype.indexOf;

	var shim$2 = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};

	var contains = isImplemented$2() ? String.prototype.contains : shim$2;

	var d_1 = createCommonjsModule(function (module) {



	var d = (module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if (arguments.length < 2 || typeof dscr !== "string") {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (is(dscr)) {
			c = contains.call(dscr, "c");
			e = contains.call(dscr, "e");
			w = contains.call(dscr, "w");
		} else {
			c = w = true;
			e = false;
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOptions(options), desc);
	});

	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== "string") {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (!is(get)) {
			get = undefined;
		} else if (!is$4(get)) {
			options = get;
			get = set = undefined;
		} else if (!is(set)) {
			set = undefined;
		} else if (!is$4(set)) {
			options = set;
			set = undefined;
		}
		if (is(dscr)) {
			c = contains.call(dscr, "c");
			e = contains.call(dscr, "e");
		} else {
			c = true;
			e = false;
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOptions(options), desc);
	};
	});

	var validCallable = function (fn) {
		if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
		return fn;
	};

	var eventEmitter = createCommonjsModule(function (module, exports) {

	var apply = Function.prototype.apply, call = Function.prototype.call
	  , create = Object.create, defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , descriptor = { configurable: true, enumerable: false, writable: true }

	  , on, once, off, emit, methods, descriptors, base;

	on = function (type, listener) {
		var data;

		validCallable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;
		else if (typeof data[type] === 'object') data[type].push(listener);
		else data[type] = [data[type], listener];

		return this;
	};

	once = function (type, listener) {
		var once, self;

		validCallable(listener);
		self = this;
		on.call(this, type, once = function () {
			off.call(self, type, once);
			apply.call(listener, this, arguments);
		});

		once.__eeOnceListener__ = listener;
		return this;
	};

	off = function (type, listener) {
		var data, listeners, candidate, i;

		validCallable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];

		if (typeof listeners === 'object') {
			for (i = 0; (candidate = listeners[i]); ++i) {
				if ((candidate === listener) ||
						(candidate.__eeOnceListener__ === listener)) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
					else listeners.splice(i, 1);
				}
			}
		} else {
			if ((listeners === listener) ||
					(listeners.__eeOnceListener__ === listener)) {
				delete data[type];
			}
		}

		return this;
	};

	emit = function (type) {
		var i, l, listener, listeners, args;

		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;

		if (typeof listeners === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

			listeners = listeners.slice();
			for (i = 0; (listener = listeners[i]); ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
			}
		}
	};

	methods = {
		on: on,
		once: once,
		off: off,
		emit: emit
	};

	descriptors = {
		on: d_1(on),
		once: d_1(once),
		off: d_1(off),
		emit: d_1(emit)
	};

	base = defineProperties({}, descriptors);

	module.exports = exports = function (o) {
		return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;
	});
	var eventEmitter_1 = eventEmitter.methods;

	//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
	//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
	//[5]   	Name	   ::=   	NameStartChar (NameChar)*
	var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;//\u10000-\uEFFFF
	var nameChar = new RegExp("[\\-\\.0-9"+nameStartChar.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
	var tagNamePattern = new RegExp('^'+nameStartChar.source+nameChar.source+'*(?:\:'+nameStartChar.source+nameChar.source+'*)?$');
	//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
	//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

	//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
	//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
	var S_TAG = 0;//tag name offerring
	var S_ATTR = 1;//attr name offerring 
	var S_ATTR_SPACE=2;//attr name end and space offer
	var S_EQ = 3;//=space?
	var S_ATTR_NOQUOT_VALUE = 4;//attr value(no quot value only)
	var S_ATTR_END = 5;//attr value end and no space(quot end)
	var S_TAG_SPACE = 6;//(attr value end || tag end ) && (space offer)
	var S_TAG_CLOSE = 7;//closed el<el />

	function XMLReader(){
		
	}

	XMLReader.prototype = {
		parse:function(source,defaultNSMap,entityMap){
			var domBuilder = this.domBuilder;
			domBuilder.startDocument();
			_copy(defaultNSMap ,defaultNSMap = {});
			parse(source,defaultNSMap,entityMap,
					domBuilder,this.errorHandler);
			domBuilder.endDocument();
		}
	};
	function parse(source,defaultNSMapCopy,entityMap,domBuilder,errorHandler){
		function fixedFromCharCode(code) {
			// String.prototype.fromCharCode does not supports
			// > 2 bytes unicode chars directly
			if (code > 0xffff) {
				code -= 0x10000;
				var surrogate1 = 0xd800 + (code >> 10)
					, surrogate2 = 0xdc00 + (code & 0x3ff);

				return String.fromCharCode(surrogate1, surrogate2);
			} else {
				return String.fromCharCode(code);
			}
		}
		function entityReplacer(a){
			var k = a.slice(1,-1);
			if(k in entityMap){
				return entityMap[k]; 
			}else if(k.charAt(0) === '#'){
				return fixedFromCharCode(parseInt(k.substr(1).replace('x','0x')))
			}else{
				errorHandler.error('entity not found:'+a);
				return a;
			}
		}
		function appendText(end){//has some bugs
			if(end>start){
				var xt = source.substring(start,end).replace(/&#?\w+;/g,entityReplacer);
				locator&&position(start);
				domBuilder.characters(xt,0,end-start);
				start = end;
			}
		}
		function position(p,m){
			while(p>=lineEnd && (m = linePattern.exec(source))){
				lineStart = m.index;
				lineEnd = lineStart + m[0].length;
				locator.lineNumber++;
				//console.log('line++:',locator,startPos,endPos)
			}
			locator.columnNumber = p-lineStart+1;
		}
		var lineStart = 0;
		var lineEnd = 0;
		var linePattern = /.*(?:\r\n?|\n)|.*$/g;
		var locator = domBuilder.locator;
		
		var parseStack = [{currentNSMap:defaultNSMapCopy}];
		var closeMap = {};
		var start = 0;
		while(true){
			try{
				var tagStart = source.indexOf('<',start);
				if(tagStart<0){
					if(!source.substr(start).match(/^\s*$/)){
						var doc = domBuilder.doc;
		    			var text = doc.createTextNode(source.substr(start));
		    			doc.appendChild(text);
		    			domBuilder.currentElement = text;
					}
					return;
				}
				if(tagStart>start){
					appendText(tagStart);
				}
				switch(source.charAt(tagStart+1)){
				case '/':
					var end = source.indexOf('>',tagStart+3);
					var tagName = source.substring(tagStart+2,end);
					var config = parseStack.pop();
					if(end<0){
						
		        		tagName = source.substring(tagStart+2).replace(/[\s<].*/,'');
		        		//console.error('#@@@@@@'+tagName)
		        		errorHandler.error("end tag name: "+tagName+' is not complete:'+config.tagName);
		        		end = tagStart+1+tagName.length;
		        	}else if(tagName.match(/\s</)){
		        		tagName = tagName.replace(/[\s<].*/,'');
		        		errorHandler.error("end tag name: "+tagName+' maybe not complete');
		        		end = tagStart+1+tagName.length;
					}
					//console.error(parseStack.length,parseStack)
					//console.error(config);
					var localNSMap = config.localNSMap;
					var endMatch = config.tagName == tagName;
					var endIgnoreCaseMach = endMatch || config.tagName&&config.tagName.toLowerCase() == tagName.toLowerCase();
			        if(endIgnoreCaseMach){
			        	domBuilder.endElement(config.uri,config.localName,tagName);
						if(localNSMap){
							for(var prefix in localNSMap){
								domBuilder.endPrefixMapping(prefix) ;
							}
						}
						if(!endMatch){
			            	errorHandler.fatalError("end tag name: "+tagName+' is not match the current start tagName:'+config.tagName );
						}
			        }else{
			        	parseStack.push(config);
			        }
					
					end++;
					break;
					// end elment
				case '?':// <?...?>
					locator&&position(tagStart);
					end = parseInstruction(source,tagStart,domBuilder);
					break;
				case '!':// <!doctype,<![CDATA,<!--
					locator&&position(tagStart);
					end = parseDCC(source,tagStart,domBuilder,errorHandler);
					break;
				default:
					locator&&position(tagStart);
					var el = new ElementAttributes();
					var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
					//elStartEnd
					var end = parseElementStartPart(source,tagStart,el,currentNSMap,entityReplacer,errorHandler);
					var len = el.length;
					
					
					if(!el.closed && fixSelfClosed(source,end,el.tagName,closeMap)){
						el.closed = true;
						if(!entityMap.nbsp){
							errorHandler.warning('unclosed xml attribute');
						}
					}
					if(locator && len){
						var locator2 = copyLocator(locator,{});
						//try{//attribute position fixed
						for(var i = 0;i<len;i++){
							var a = el[i];
							position(a.offset);
							a.locator = copyLocator(locator,{});
						}
						//}catch(e){console.error('@@@@@'+e)}
						domBuilder.locator = locator2;
						if(appendElement(el,domBuilder,currentNSMap)){
							parseStack.push(el);
						}
						domBuilder.locator = locator;
					}else{
						if(appendElement(el,domBuilder,currentNSMap)){
							parseStack.push(el);
						}
					}
					
					
					
					if(el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed){
						end = parseHtmlSpecialContent(source,end,el.tagName,entityReplacer,domBuilder);
					}else{
						end++;
					}
				}
			}catch(e){
				errorHandler.error('element parse error: '+e);
				//errorHandler.error('element parse error: '+e);
				end = -1;
				//throw e;
			}
			if(end>start){
				start = end;
			}else{
				//TODO: 这里有可能sax回退，有位置错误风险
				appendText(Math.max(tagStart,start)+1);
			}
		}
	}
	function copyLocator(f,t){
		t.lineNumber = f.lineNumber;
		t.columnNumber = f.columnNumber;
		return t;
	}

	/**
	 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
	 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
	 */
	function parseElementStartPart(source,start,el,currentNSMap,entityReplacer,errorHandler){
		var attrName;
		var value;
		var p = ++start;
		var s = S_TAG;//status
		while(true){
			var c = source.charAt(p);
			switch(c){
			case '=':
				if(s === S_ATTR){//attrName
					attrName = source.slice(start,p);
					s = S_EQ;
				}else if(s === S_ATTR_SPACE){
					s = S_EQ;
				}else{
					//fatalError: equal must after attrName or space after attrName
					throw new Error('attribute equal must after attrName');
				}
				break;
			case '\'':
			case '"':
				if(s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
					){//equal
					if(s === S_ATTR){
						errorHandler.warning('attribute value must after "="');
						attrName = source.slice(start,p);
					}
					start = p+1;
					p = source.indexOf(c,start);
					if(p>0){
						value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
						el.add(attrName,value,start-1);
						s = S_ATTR_END;
					}else{
						//fatalError: no end quot match
						throw new Error('attribute value no end \''+c+'\' match');
					}
				}else if(s == S_ATTR_NOQUOT_VALUE){
					value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					//console.log(attrName,value,start,p)
					el.add(attrName,value,start);
					//console.dir(el)
					errorHandler.warning('attribute "'+attrName+'" missed start quot('+c+')!!');
					start = p+1;
					s = S_ATTR_END;
				}else{
					//fatalError: no equal before
					throw new Error('attribute value must after "="');
				}
				break;
			case '/':
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));
				case S_ATTR_END:
				case S_TAG_SPACE:
				case S_TAG_CLOSE:
					s =S_TAG_CLOSE;
					el.closed = true;
				case S_ATTR_NOQUOT_VALUE:
				case S_ATTR:
				case S_ATTR_SPACE:
					break;
				//case S_EQ:
				default:
					throw new Error("attribute invalid close char('/')")
				}
				break;
			case ''://end document
				//throw new Error('unexpected end of input')
				errorHandler.error('unexpected end of input');
				if(s == S_TAG){
					el.setTagName(source.slice(start,p));
				}
				return p;
			case '>':
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));
				case S_ATTR_END:
				case S_TAG_SPACE:
				case S_TAG_CLOSE:
					break;//normal
				case S_ATTR_NOQUOT_VALUE://Compatible state
				case S_ATTR:
					value = source.slice(start,p);
					if(value.slice(-1) === '/'){
						el.closed  = true;
						value = value.slice(0,-1);
					}
				case S_ATTR_SPACE:
					if(s === S_ATTR_SPACE){
						value = attrName;
					}
					if(s == S_ATTR_NOQUOT_VALUE){
						errorHandler.warning('attribute "'+value+'" missed quot(")!!');
						el.add(attrName,value.replace(/&#?\w+;/g,entityReplacer),start);
					}else{
						if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)){
							errorHandler.warning('attribute "'+value+'" missed value!! "'+value+'" instead!!');
						}
						el.add(value,value,start);
					}
					break;
				case S_EQ:
					throw new Error('attribute value missed!!');
				}
	//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
				return p;
			/*xml space '\x20' | #x9 | #xD | #xA; */
			case '\u0080':
				c = ' ';
			default:
				if(c<= ' '){//space
					switch(s){
					case S_TAG:
						el.setTagName(source.slice(start,p));//tagName
						s = S_TAG_SPACE;
						break;
					case S_ATTR:
						attrName = source.slice(start,p);
						s = S_ATTR_SPACE;
						break;
					case S_ATTR_NOQUOT_VALUE:
						var value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
						errorHandler.warning('attribute "'+value+'" missed quot(")!!');
						el.add(attrName,value,start);
					case S_ATTR_END:
						s = S_TAG_SPACE;
						break;
					//case S_TAG_SPACE:
					//case S_EQ:
					//case S_ATTR_SPACE:
					//	void();break;
					//case S_TAG_CLOSE:
						//ignore warning
					}
				}else{//not space
	//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
	//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
					switch(s){
					//case S_TAG:void();break;
					//case S_ATTR:void();break;
					//case S_ATTR_NOQUOT_VALUE:void();break;
					case S_ATTR_SPACE:
						var tagName =  el.tagName;
						if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)){
							errorHandler.warning('attribute "'+attrName+'" missed value!! "'+attrName+'" instead2!!');
						}
						el.add(attrName,attrName,start);
						start = p;
						s = S_ATTR;
						break;
					case S_ATTR_END:
						errorHandler.warning('attribute space is required"'+attrName+'"!!');
					case S_TAG_SPACE:
						s = S_ATTR;
						start = p;
						break;
					case S_EQ:
						s = S_ATTR_NOQUOT_VALUE;
						start = p;
						break;
					case S_TAG_CLOSE:
						throw new Error("elements closed character '/' and '>' must be connected to");
					}
				}
			}//end outer switch
			//console.log('p++',p)
			p++;
		}
	}
	/**
	 * @return true if has new namespace define
	 */
	function appendElement(el,domBuilder,currentNSMap){
		var tagName = el.tagName;
		var localNSMap = null;
		//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
		var i = el.length;
		while(i--){
			var a = el[i];
			var qName = a.qName;
			var value = a.value;
			var nsp = qName.indexOf(':');
			if(nsp>0){
				var prefix = a.prefix = qName.slice(0,nsp);
				var localName = qName.slice(nsp+1);
				var nsPrefix = prefix === 'xmlns' && localName;
			}else{
				localName = qName;
				prefix = null;
				nsPrefix = qName === 'xmlns' && '';
			}
			//can not set prefix,because prefix !== ''
			a.localName = localName ;
			//prefix == null for no ns prefix attribute 
			if(nsPrefix !== false){//hack!!
				if(localNSMap == null){
					localNSMap = {};
					//console.log(currentNSMap,0)
					_copy(currentNSMap,currentNSMap={});
					//console.log(currentNSMap,1)
				}
				currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
				a.uri = 'http://www.w3.org/2000/xmlns/';
				domBuilder.startPrefixMapping(nsPrefix, value); 
			}
		}
		var i = el.length;
		while(i--){
			a = el[i];
			var prefix = a.prefix;
			if(prefix){//no prefix attribute has no namespace
				if(prefix === 'xml'){
					a.uri = 'http://www.w3.org/XML/1998/namespace';
				}if(prefix !== 'xmlns'){
					a.uri = currentNSMap[prefix || ''];
					
					//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
				}
			}
		}
		var nsp = tagName.indexOf(':');
		if(nsp>0){
			prefix = el.prefix = tagName.slice(0,nsp);
			localName = el.localName = tagName.slice(nsp+1);
		}else{
			prefix = null;//important!!
			localName = el.localName = tagName;
		}
		//no prefix element has default namespace
		var ns = el.uri = currentNSMap[prefix || ''];
		domBuilder.startElement(ns,localName,tagName,el);
		//endPrefixMapping and startPrefixMapping have not any help for dom builder
		//localNSMap = null
		if(el.closed){
			domBuilder.endElement(ns,localName,tagName);
			if(localNSMap){
				for(prefix in localNSMap){
					domBuilder.endPrefixMapping(prefix); 
				}
			}
		}else{
			el.currentNSMap = currentNSMap;
			el.localNSMap = localNSMap;
			//parseStack.push(el);
			return true;
		}
	}
	function parseHtmlSpecialContent(source,elStartEnd,tagName,entityReplacer,domBuilder){
		if(/^(?:script|textarea)$/i.test(tagName)){
			var elEndStart =  source.indexOf('</'+tagName+'>',elStartEnd);
			var text = source.substring(elStartEnd+1,elEndStart);
			if(/[&<]/.test(text)){
				if(/^script$/i.test(tagName)){
					//if(!/\]\]>/.test(text)){
						//lexHandler.startCDATA();
						domBuilder.characters(text,0,text.length);
						//lexHandler.endCDATA();
						return elEndStart;
					//}
				}//}else{//text area
					text = text.replace(/&#?\w+;/g,entityReplacer);
					domBuilder.characters(text,0,text.length);
					return elEndStart;
				//}
				
			}
		}
		return elStartEnd+1;
	}
	function fixSelfClosed(source,elStartEnd,tagName,closeMap){
		//if(tagName in closeMap){
		var pos = closeMap[tagName];
		if(pos == null){
			//console.log(tagName)
			pos =  source.lastIndexOf('</'+tagName+'>');
			if(pos<elStartEnd){//忘记闭合
				pos = source.lastIndexOf('</'+tagName);
			}
			closeMap[tagName] =pos;
		}
		return pos<elStartEnd;
		//} 
	}
	function _copy(source,target){
		for(var n in source){target[n] = source[n];}
	}
	function parseDCC(source,start,domBuilder,errorHandler){//sure start with '<!'
		var next= source.charAt(start+2);
		switch(next){
		case '-':
			if(source.charAt(start + 3) === '-'){
				var end = source.indexOf('-->',start+4);
				//append comment source.substring(4,end)//<!--
				if(end>start){
					domBuilder.comment(source,start+4,end-start-4);
					return end+3;
				}else{
					errorHandler.error("Unclosed comment");
					return -1;
				}
			}else{
				//error
				return -1;
			}
		default:
			if(source.substr(start+3,6) == 'CDATA['){
				var end = source.indexOf(']]>',start+9);
				domBuilder.startCDATA();
				domBuilder.characters(source,start+9,end-start-9);
				domBuilder.endCDATA(); 
				return end+3;
			}
			//<!DOCTYPE
			//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
			var matchs = split(source,start);
			var len = matchs.length;
			if(len>1 && /!doctype/i.test(matchs[0][0])){
				var name = matchs[1][0];
				var pubid = len>3 && /^public$/i.test(matchs[2][0]) && matchs[3][0];
				var sysid = len>4 && matchs[4][0];
				var lastMatch = matchs[len-1];
				domBuilder.startDTD(name,pubid && pubid.replace(/^(['"])(.*?)\1$/,'$2'),
						sysid && sysid.replace(/^(['"])(.*?)\1$/,'$2'));
				domBuilder.endDTD();
				
				return lastMatch.index+lastMatch[0].length
			}
		}
		return -1;
	}



	function parseInstruction(source,start,domBuilder){
		var end = source.indexOf('?>',start);
		if(end){
			var match = source.substring(start,end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
			if(match){
				var len = match[0].length;
				domBuilder.processingInstruction(match[1], match[2]) ;
				return end+2;
			}else{//error
				return -1;
			}
		}
		return -1;
	}

	/**
	 * @param source
	 */
	function ElementAttributes(source){
		
	}
	ElementAttributes.prototype = {
		setTagName:function(tagName){
			if(!tagNamePattern.test(tagName)){
				throw new Error('invalid tagName:'+tagName)
			}
			this.tagName = tagName;
		},
		add:function(qName,value,offset){
			if(!tagNamePattern.test(qName)){
				throw new Error('invalid attribute:'+qName)
			}
			this[this.length++] = {qName:qName,value:value,offset:offset};
		},
		length:0,
		getLocalName:function(i){return this[i].localName},
		getLocator:function(i){return this[i].locator},
		getQName:function(i){return this[i].qName},
		getURI:function(i){return this[i].uri},
		getValue:function(i){return this[i].value}
	//	,getIndex:function(uri, localName)){
	//		if(localName){
	//			
	//		}else{
	//			var qName = uri
	//		}
	//	},
	//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
	//	getType:function(uri,localName){}
	//	getType:function(i){},
	};




	function _set_proto_(thiz,parent){
		thiz.__proto__ = parent;
		return thiz;
	}
	if(!(_set_proto_({},_set_proto_.prototype) instanceof _set_proto_)){
		_set_proto_ = function(thiz,parent){
			function p(){}		p.prototype = parent;
			p = new p();
			for(parent in thiz){
				p[parent] = thiz[parent];
			}
			return p;
		};
	}

	function split(source,start){
		var match;
		var buf = [];
		var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
		reg.lastIndex = start;
		reg.exec(source);//skip <
		while(match = reg.exec(source)){
			buf.push(match);
			if(match[1])return buf;
		}
	}

	var XMLReader_1 = XMLReader;

	var sax = {
		XMLReader: XMLReader_1
	};

	/*
	 * DOM Level 2
	 * Object DOMException
	 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
	 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
	 */

	function copy(src,dest){
		for(var p in src){
			dest[p] = src[p];
		}
	}
	/**
	^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
	^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
	 */
	function _extends(Class,Super){
		var pt = Class.prototype;
		if(Object.create){
			var ppt = Object.create(Super.prototype);
			pt.__proto__ = ppt;
		}
		if(!(pt instanceof Super)){
			function t(){}		t.prototype = Super.prototype;
			t = new t();
			copy(pt,t);
			Class.prototype = pt = t;
		}
		if(pt.constructor != Class){
			if(typeof Class != 'function'){
				console.error("unknow Class:"+Class);
			}
			pt.constructor = Class;
		}
	}
	var htmlns = 'http://www.w3.org/1999/xhtml' ;
	// Node Types
	var NodeType = {};
	var ELEMENT_NODE                = NodeType.ELEMENT_NODE                = 1;
	var ATTRIBUTE_NODE              = NodeType.ATTRIBUTE_NODE              = 2;
	var TEXT_NODE                   = NodeType.TEXT_NODE                   = 3;
	var CDATA_SECTION_NODE          = NodeType.CDATA_SECTION_NODE          = 4;
	var ENTITY_REFERENCE_NODE       = NodeType.ENTITY_REFERENCE_NODE       = 5;
	var ENTITY_NODE                 = NodeType.ENTITY_NODE                 = 6;
	var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
	var COMMENT_NODE                = NodeType.COMMENT_NODE                = 8;
	var DOCUMENT_NODE               = NodeType.DOCUMENT_NODE               = 9;
	var DOCUMENT_TYPE_NODE          = NodeType.DOCUMENT_TYPE_NODE          = 10;
	var DOCUMENT_FRAGMENT_NODE      = NodeType.DOCUMENT_FRAGMENT_NODE      = 11;
	var NOTATION_NODE               = NodeType.NOTATION_NODE               = 12;

	// ExceptionCode
	var ExceptionCode = {};
	var ExceptionMessage = {};
	var INDEX_SIZE_ERR              = ExceptionCode.INDEX_SIZE_ERR              = (ExceptionMessage[1]="Index size error", 1);
	var DOMSTRING_SIZE_ERR          = ExceptionCode.DOMSTRING_SIZE_ERR          = (ExceptionMessage[2]="DOMString size error", 2);
	var HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = (ExceptionMessage[3]="Hierarchy request error", 3);
	var WRONG_DOCUMENT_ERR          = ExceptionCode.WRONG_DOCUMENT_ERR          = (ExceptionMessage[4]="Wrong document", 4);
	var INVALID_CHARACTER_ERR       = ExceptionCode.INVALID_CHARACTER_ERR       = (ExceptionMessage[5]="Invalid character", 5);
	var NO_DATA_ALLOWED_ERR         = ExceptionCode.NO_DATA_ALLOWED_ERR         = (ExceptionMessage[6]="No data allowed", 6);
	var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7]="No modification allowed", 7);
	var NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = (ExceptionMessage[8]="Not found", 8);
	var NOT_SUPPORTED_ERR           = ExceptionCode.NOT_SUPPORTED_ERR           = (ExceptionMessage[9]="Not supported", 9);
	var INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = (ExceptionMessage[10]="Attribute in use", 10);
	//level2
	var INVALID_STATE_ERR        	= ExceptionCode.INVALID_STATE_ERR        	= (ExceptionMessage[11]="Invalid state", 11);
	var SYNTAX_ERR               	= ExceptionCode.SYNTAX_ERR               	= (ExceptionMessage[12]="Syntax error", 12);
	var INVALID_MODIFICATION_ERR 	= ExceptionCode.INVALID_MODIFICATION_ERR 	= (ExceptionMessage[13]="Invalid modification", 13);
	var NAMESPACE_ERR            	= ExceptionCode.NAMESPACE_ERR           	= (ExceptionMessage[14]="Invalid namespace", 14);
	var INVALID_ACCESS_ERR       	= ExceptionCode.INVALID_ACCESS_ERR      	= (ExceptionMessage[15]="Invalid access", 15);


	function DOMException(code, message) {
		if(message instanceof Error){
			var error = message;
		}else{
			error = this;
			Error.call(this, ExceptionMessage[code]);
			this.message = ExceptionMessage[code];
			if(Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
		}
		error.code = code;
		if(message) this.message = this.message + ": " + message;
		return error;
	}DOMException.prototype = Error.prototype;
	copy(ExceptionCode,DOMException);
	/**
	 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
	 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
	 * The items in the NodeList are accessible via an integral index, starting from 0.
	 */
	function NodeList() {
	}NodeList.prototype = {
		/**
		 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
		 * @standard level1
		 */
		length:0, 
		/**
		 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
		 * @standard level1
		 * @param index  unsigned long 
		 *   Index into the collection.
		 * @return Node
		 * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
		 */
		item: function(index) {
			return this[index] || null;
		},
		toString:function(isHTML,nodeFilter){
			for(var buf = [], i = 0;i<this.length;i++){
				serializeToString(this[i],buf,isHTML,nodeFilter);
			}
			return buf.join('');
		}
	};
	function LiveNodeList(node,refresh){
		this._node = node;
		this._refresh = refresh;
		_updateLiveList(this);
	}
	function _updateLiveList(list){
		var inc = list._node._inc || list._node.ownerDocument._inc;
		if(list._inc != inc){
			var ls = list._refresh(list._node);
			//console.log(ls.length)
			__set__(list,'length',ls.length);
			copy(ls,list);
			list._inc = inc;
		}
	}
	LiveNodeList.prototype.item = function(i){
		_updateLiveList(this);
		return this[i];
	};

	_extends(LiveNodeList,NodeList);
	/**
	 * 
	 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
	 * NamedNodeMap objects in the DOM are live.
	 * used for attributes or DocumentType entities 
	 */
	function NamedNodeMap() {
	}
	function _findNodeIndex(list,node){
		var i = list.length;
		while(i--){
			if(list[i] === node){return i}
		}
	}

	function _addNamedNode(el,list,newAttr,oldAttr){
		if(oldAttr){
			list[_findNodeIndex(list,oldAttr)] = newAttr;
		}else{
			list[list.length++] = newAttr;
		}
		if(el){
			newAttr.ownerElement = el;
			var doc = el.ownerDocument;
			if(doc){
				oldAttr && _onRemoveAttribute(doc,el,oldAttr);
				_onAddAttribute(doc,el,newAttr);
			}
		}
	}
	function _removeNamedNode(el,list,attr){
		//console.log('remove attr:'+attr)
		var i = _findNodeIndex(list,attr);
		if(i>=0){
			var lastIndex = list.length-1;
			while(i<lastIndex){
				list[i] = list[++i];
			}
			list.length = lastIndex;
			if(el){
				var doc = el.ownerDocument;
				if(doc){
					_onRemoveAttribute(doc,el,attr);
					attr.ownerElement = null;
				}
			}
		}else{
			throw DOMException(NOT_FOUND_ERR,new Error(el.tagName+'@'+attr))
		}
	}
	NamedNodeMap.prototype = {
		length:0,
		item:NodeList.prototype.item,
		getNamedItem: function(key) {
	//		if(key.indexOf(':')>0 || key == 'xmlns'){
	//			return null;
	//		}
			//console.log()
			var i = this.length;
			while(i--){
				var attr = this[i];
				//console.log(attr.nodeName,key)
				if(attr.nodeName == key){
					return attr;
				}
			}
		},
		setNamedItem: function(attr) {
			var el = attr.ownerElement;
			if(el && el!=this._ownerElement){
				throw new DOMException(INUSE_ATTRIBUTE_ERR);
			}
			var oldAttr = this.getNamedItem(attr.nodeName);
			_addNamedNode(this._ownerElement,this,attr,oldAttr);
			return oldAttr;
		},
		/* returns Node */
		setNamedItemNS: function(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
			var el = attr.ownerElement, oldAttr;
			if(el && el!=this._ownerElement){
				throw new DOMException(INUSE_ATTRIBUTE_ERR);
			}
			oldAttr = this.getNamedItemNS(attr.namespaceURI,attr.localName);
			_addNamedNode(this._ownerElement,this,attr,oldAttr);
			return oldAttr;
		},

		/* returns Node */
		removeNamedItem: function(key) {
			var attr = this.getNamedItem(key);
			_removeNamedNode(this._ownerElement,this,attr);
			return attr;
			
			
		},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
		
		//for level2
		removeNamedItemNS:function(namespaceURI,localName){
			var attr = this.getNamedItemNS(namespaceURI,localName);
			_removeNamedNode(this._ownerElement,this,attr);
			return attr;
		},
		getNamedItemNS: function(namespaceURI, localName) {
			var i = this.length;
			while(i--){
				var node = this[i];
				if(node.localName == localName && node.namespaceURI == namespaceURI){
					return node;
				}
			}
			return null;
		}
	};
	/**
	 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
	 */
	function DOMImplementation(/* Object */ features) {
		this._features = {};
		if (features) {
			for (var feature in features) {
				 this._features = features[feature];
			}
		}
	}
	DOMImplementation.prototype = {
		hasFeature: function(/* string */ feature, /* string */ version) {
			var versions = this._features[feature.toLowerCase()];
			if (versions && (!version || version in versions)) {
				return true;
			} else {
				return false;
			}
		},
		// Introduced in DOM Level 2:
		createDocument:function(namespaceURI,  qualifiedName, doctype){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
			var doc = new Document();
			doc.implementation = this;
			doc.childNodes = new NodeList();
			doc.doctype = doctype;
			if(doctype){
				doc.appendChild(doctype);
			}
			if(qualifiedName){
				var root = doc.createElementNS(namespaceURI,qualifiedName);
				doc.appendChild(root);
			}
			return doc;
		},
		// Introduced in DOM Level 2:
		createDocumentType:function(qualifiedName, publicId, systemId){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
			var node = new DocumentType();
			node.name = qualifiedName;
			node.nodeName = qualifiedName;
			node.publicId = publicId;
			node.systemId = systemId;
			// Introduced in DOM Level 2:
			//readonly attribute DOMString        internalSubset;
			
			//TODO:..
			//  readonly attribute NamedNodeMap     entities;
			//  readonly attribute NamedNodeMap     notations;
			return node;
		}
	};


	/**
	 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
	 */

	function Node() {
	}
	Node.prototype = {
		firstChild : null,
		lastChild : null,
		previousSibling : null,
		nextSibling : null,
		attributes : null,
		parentNode : null,
		childNodes : null,
		ownerDocument : null,
		nodeValue : null,
		namespaceURI : null,
		prefix : null,
		localName : null,
		// Modified in DOM Level 2:
		insertBefore:function(newChild, refChild){//raises 
			return _insertBefore(this,newChild,refChild);
		},
		replaceChild:function(newChild, oldChild){//raises 
			this.insertBefore(newChild,oldChild);
			if(oldChild){
				this.removeChild(oldChild);
			}
		},
		removeChild:function(oldChild){
			return _removeChild(this,oldChild);
		},
		appendChild:function(newChild){
			return this.insertBefore(newChild,null);
		},
		hasChildNodes:function(){
			return this.firstChild != null;
		},
		cloneNode:function(deep){
			return cloneNode(this.ownerDocument||this,this,deep);
		},
		// Modified in DOM Level 2:
		normalize:function(){
			var child = this.firstChild;
			while(child){
				var next = child.nextSibling;
				if(next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE){
					this.removeChild(next);
					child.appendData(next.data);
				}else{
					child.normalize();
					child = next;
				}
			}
		},
	  	// Introduced in DOM Level 2:
		isSupported:function(feature, version){
			return this.ownerDocument.implementation.hasFeature(feature,version);
		},
	    // Introduced in DOM Level 2:
	    hasAttributes:function(){
	    	return this.attributes.length>0;
	    },
	    lookupPrefix:function(namespaceURI){
	    	var el = this;
	    	while(el){
	    		var map = el._nsMap;
	    		//console.dir(map)
	    		if(map){
	    			for(var n in map){
	    				if(map[n] == namespaceURI){
	    					return n;
	    				}
	    			}
	    		}
	    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
	    	}
	    	return null;
	    },
	    // Introduced in DOM Level 3:
	    lookupNamespaceURI:function(prefix){
	    	var el = this;
	    	while(el){
	    		var map = el._nsMap;
	    		//console.dir(map)
	    		if(map){
	    			if(prefix in map){
	    				return map[prefix] ;
	    			}
	    		}
	    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
	    	}
	    	return null;
	    },
	    // Introduced in DOM Level 3:
	    isDefaultNamespace:function(namespaceURI){
	    	var prefix = this.lookupPrefix(namespaceURI);
	    	return prefix == null;
	    }
	};


	function _xmlEncoder(c){
		return c == '<' && '&lt;' ||
	         c == '>' && '&gt;' ||
	         c == '&' && '&amp;' ||
	         c == '"' && '&quot;' ||
	         '&#'+c.charCodeAt()+';'
	}


	copy(NodeType,Node);
	copy(NodeType,Node.prototype);

	/**
	 * @param callback return true for continue,false for break
	 * @return boolean true: break visit;
	 */
	function _visitNode(node,callback){
		if(callback(node)){
			return true;
		}
		if(node = node.firstChild){
			do{
				if(_visitNode(node,callback)){return true}
	        }while(node=node.nextSibling)
	    }
	}



	function Document(){
	}
	function _onAddAttribute(doc,el,newAttr){
		doc && doc._inc++;
		var ns = newAttr.namespaceURI ;
		if(ns == 'http://www.w3.org/2000/xmlns/'){
			//update namespace
			el._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value;
		}
	}
	function _onRemoveAttribute(doc,el,newAttr,remove){
		doc && doc._inc++;
		var ns = newAttr.namespaceURI ;
		if(ns == 'http://www.w3.org/2000/xmlns/'){
			//update namespace
			delete el._nsMap[newAttr.prefix?newAttr.localName:''];
		}
	}
	function _onUpdateChild(doc,el,newChild){
		if(doc && doc._inc){
			doc._inc++;
			//update childNodes
			var cs = el.childNodes;
			if(newChild){
				cs[cs.length++] = newChild;
			}else{
				//console.log(1)
				var child = el.firstChild;
				var i = 0;
				while(child){
					cs[i++] = child;
					child =child.nextSibling;
				}
				cs.length = i;
			}
		}
	}

	/**
	 * attributes;
	 * children;
	 * 
	 * writeable properties:
	 * nodeValue,Attr:value,CharacterData:data
	 * prefix
	 */
	function _removeChild(parentNode,child){
		var previous = child.previousSibling;
		var next = child.nextSibling;
		if(previous){
			previous.nextSibling = next;
		}else{
			parentNode.firstChild = next;
		}
		if(next){
			next.previousSibling = previous;
		}else{
			parentNode.lastChild = previous;
		}
		_onUpdateChild(parentNode.ownerDocument,parentNode);
		return child;
	}
	/**
	 * preformance key(refChild == null)
	 */
	function _insertBefore(parentNode,newChild,nextChild){
		var cp = newChild.parentNode;
		if(cp){
			cp.removeChild(newChild);//remove and update
		}
		if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
			var newFirst = newChild.firstChild;
			if (newFirst == null) {
				return newChild;
			}
			var newLast = newChild.lastChild;
		}else{
			newFirst = newLast = newChild;
		}
		var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

		newFirst.previousSibling = pre;
		newLast.nextSibling = nextChild;
		
		
		if(pre){
			pre.nextSibling = newFirst;
		}else{
			parentNode.firstChild = newFirst;
		}
		if(nextChild == null){
			parentNode.lastChild = newLast;
		}else{
			nextChild.previousSibling = newLast;
		}
		do{
			newFirst.parentNode = parentNode;
		}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))
		_onUpdateChild(parentNode.ownerDocument||parentNode,parentNode);
		//console.log(parentNode.lastChild.nextSibling == null)
		if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
			newChild.firstChild = newChild.lastChild = null;
		}
		return newChild;
	}
	function _appendSingleChild(parentNode,newChild){
		var cp = newChild.parentNode;
		if(cp){
			var pre = parentNode.lastChild;
			cp.removeChild(newChild);//remove and update
			var pre = parentNode.lastChild;
		}
		var pre = parentNode.lastChild;
		newChild.parentNode = parentNode;
		newChild.previousSibling = pre;
		newChild.nextSibling = null;
		if(pre){
			pre.nextSibling = newChild;
		}else{
			parentNode.firstChild = newChild;
		}
		parentNode.lastChild = newChild;
		_onUpdateChild(parentNode.ownerDocument,parentNode,newChild);
		return newChild;
		//console.log("__aa",parentNode.lastChild.nextSibling == null)
	}
	Document.prototype = {
		//implementation : null,
		nodeName :  '#document',
		nodeType :  DOCUMENT_NODE,
		doctype :  null,
		documentElement :  null,
		_inc : 1,
		
		insertBefore :  function(newChild, refChild){//raises 
			if(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){
				var child = newChild.firstChild;
				while(child){
					var next = child.nextSibling;
					this.insertBefore(child,refChild);
					child = next;
				}
				return newChild;
			}
			if(this.documentElement == null && newChild.nodeType == ELEMENT_NODE){
				this.documentElement = newChild;
			}
			
			return _insertBefore(this,newChild,refChild), newChild.ownerDocument = this, newChild;
		},
		removeChild :  function(oldChild){
			if(this.documentElement == oldChild){
				this.documentElement = null;
			}
			return _removeChild(this,oldChild);
		},
		// Introduced in DOM Level 2:
		importNode : function(importedNode,deep){
			return importNode(this,importedNode,deep);
		},
		// Introduced in DOM Level 2:
		getElementById :	function(id){
			var rtv = null;
			_visitNode(this.documentElement,function(node){
				if(node.nodeType == ELEMENT_NODE){
					if(node.getAttribute('id') == id){
						rtv = node;
						return true;
					}
				}
			});
			return rtv;
		},
		
		//document factory method:
		createElement :	function(tagName){
			var node = new Element();
			node.ownerDocument = this;
			node.nodeName = tagName;
			node.tagName = tagName;
			node.childNodes = new NodeList();
			var attrs	= node.attributes = new NamedNodeMap();
			attrs._ownerElement = node;
			return node;
		},
		createDocumentFragment :	function(){
			var node = new DocumentFragment();
			node.ownerDocument = this;
			node.childNodes = new NodeList();
			return node;
		},
		createTextNode :	function(data){
			var node = new Text();
			node.ownerDocument = this;
			node.appendData(data);
			return node;
		},
		createComment :	function(data){
			var node = new Comment();
			node.ownerDocument = this;
			node.appendData(data);
			return node;
		},
		createCDATASection :	function(data){
			var node = new CDATASection();
			node.ownerDocument = this;
			node.appendData(data);
			return node;
		},
		createProcessingInstruction :	function(target,data){
			var node = new ProcessingInstruction();
			node.ownerDocument = this;
			node.tagName = node.target = target;
			node.nodeValue= node.data = data;
			return node;
		},
		createAttribute :	function(name){
			var node = new Attr();
			node.ownerDocument	= this;
			node.name = name;
			node.nodeName	= name;
			node.localName = name;
			node.specified = true;
			return node;
		},
		createEntityReference :	function(name){
			var node = new EntityReference();
			node.ownerDocument	= this;
			node.nodeName	= name;
			return node;
		},
		// Introduced in DOM Level 2:
		createElementNS :	function(namespaceURI,qualifiedName){
			var node = new Element();
			var pl = qualifiedName.split(':');
			var attrs	= node.attributes = new NamedNodeMap();
			node.childNodes = new NodeList();
			node.ownerDocument = this;
			node.nodeName = qualifiedName;
			node.tagName = qualifiedName;
			node.namespaceURI = namespaceURI;
			if(pl.length == 2){
				node.prefix = pl[0];
				node.localName = pl[1];
			}else{
				//el.prefix = null;
				node.localName = qualifiedName;
			}
			attrs._ownerElement = node;
			return node;
		},
		// Introduced in DOM Level 2:
		createAttributeNS :	function(namespaceURI,qualifiedName){
			var node = new Attr();
			var pl = qualifiedName.split(':');
			node.ownerDocument = this;
			node.nodeName = qualifiedName;
			node.name = qualifiedName;
			node.namespaceURI = namespaceURI;
			node.specified = true;
			if(pl.length == 2){
				node.prefix = pl[0];
				node.localName = pl[1];
			}else{
				//el.prefix = null;
				node.localName = qualifiedName;
			}
			return node;
		}
	};
	_extends(Document,Node);


	function Element() {
		this._nsMap = {};
	}Element.prototype = {
		nodeType : ELEMENT_NODE,
		hasAttribute : function(name){
			return this.getAttributeNode(name)!=null;
		},
		getAttribute : function(name){
			var attr = this.getAttributeNode(name);
			return attr && attr.value || '';
		},
		getAttributeNode : function(name){
			return this.attributes.getNamedItem(name);
		},
		setAttribute : function(name, value){
			var attr = this.ownerDocument.createAttribute(name);
			attr.value = attr.nodeValue = "" + value;
			this.setAttributeNode(attr);
		},
		removeAttribute : function(name){
			var attr = this.getAttributeNode(name);
			attr && this.removeAttributeNode(attr);
		},
		
		//four real opeartion method
		appendChild:function(newChild){
			if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
				return this.insertBefore(newChild,null);
			}else{
				return _appendSingleChild(this,newChild);
			}
		},
		setAttributeNode : function(newAttr){
			return this.attributes.setNamedItem(newAttr);
		},
		setAttributeNodeNS : function(newAttr){
			return this.attributes.setNamedItemNS(newAttr);
		},
		removeAttributeNode : function(oldAttr){
			//console.log(this == oldAttr.ownerElement)
			return this.attributes.removeNamedItem(oldAttr.nodeName);
		},
		//get real attribute name,and remove it by removeAttributeNode
		removeAttributeNS : function(namespaceURI, localName){
			var old = this.getAttributeNodeNS(namespaceURI, localName);
			old && this.removeAttributeNode(old);
		},
		
		hasAttributeNS : function(namespaceURI, localName){
			return this.getAttributeNodeNS(namespaceURI, localName)!=null;
		},
		getAttributeNS : function(namespaceURI, localName){
			var attr = this.getAttributeNodeNS(namespaceURI, localName);
			return attr && attr.value || '';
		},
		setAttributeNS : function(namespaceURI, qualifiedName, value){
			var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
			attr.value = attr.nodeValue = "" + value;
			this.setAttributeNode(attr);
		},
		getAttributeNodeNS : function(namespaceURI, localName){
			return this.attributes.getNamedItemNS(namespaceURI, localName);
		},
		
		getElementsByTagName : function(tagName){
			return new LiveNodeList(this,function(base){
				var ls = [];
				_visitNode(base,function(node){
					if(node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)){
						ls.push(node);
					}
				});
				return ls;
			});
		},
		getElementsByTagNameNS : function(namespaceURI, localName){
			return new LiveNodeList(this,function(base){
				var ls = [];
				_visitNode(base,function(node){
					if(node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)){
						ls.push(node);
					}
				});
				return ls;
				
			});
		}
	};
	Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
	Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;


	_extends(Element,Node);
	function Attr() {
	}Attr.prototype.nodeType = ATTRIBUTE_NODE;
	_extends(Attr,Node);


	function CharacterData() {
	}CharacterData.prototype = {
		data : '',
		substringData : function(offset, count) {
			return this.data.substring(offset, offset+count);
		},
		appendData: function(text) {
			text = this.data+text;
			this.nodeValue = this.data = text;
			this.length = text.length;
		},
		insertData: function(offset,text) {
			this.replaceData(offset,0,text);
		
		},
		appendChild:function(newChild){
			throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])
		},
		deleteData: function(offset, count) {
			this.replaceData(offset,count,"");
		},
		replaceData: function(offset, count, text) {
			var start = this.data.substring(0,offset);
			var end = this.data.substring(offset+count);
			text = start + text + end;
			this.nodeValue = this.data = text;
			this.length = text.length;
		}
	};
	_extends(CharacterData,Node);
	function Text() {
	}Text.prototype = {
		nodeName : "#text",
		nodeType : TEXT_NODE,
		splitText : function(offset) {
			var text = this.data;
			var newText = text.substring(offset);
			text = text.substring(0, offset);
			this.data = this.nodeValue = text;
			this.length = text.length;
			var newNode = this.ownerDocument.createTextNode(newText);
			if(this.parentNode){
				this.parentNode.insertBefore(newNode, this.nextSibling);
			}
			return newNode;
		}
	};
	_extends(Text,CharacterData);
	function Comment() {
	}Comment.prototype = {
		nodeName : "#comment",
		nodeType : COMMENT_NODE
	};
	_extends(Comment,CharacterData);

	function CDATASection() {
	}CDATASection.prototype = {
		nodeName : "#cdata-section",
		nodeType : CDATA_SECTION_NODE
	};
	_extends(CDATASection,CharacterData);


	function DocumentType() {
	}DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
	_extends(DocumentType,Node);

	function Notation() {
	}Notation.prototype.nodeType = NOTATION_NODE;
	_extends(Notation,Node);

	function Entity() {
	}Entity.prototype.nodeType = ENTITY_NODE;
	_extends(Entity,Node);

	function EntityReference() {
	}EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
	_extends(EntityReference,Node);

	function DocumentFragment() {
	}DocumentFragment.prototype.nodeName =	"#document-fragment";
	DocumentFragment.prototype.nodeType =	DOCUMENT_FRAGMENT_NODE;
	_extends(DocumentFragment,Node);


	function ProcessingInstruction() {
	}
	ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
	_extends(ProcessingInstruction,Node);
	function XMLSerializer$1(){}
	XMLSerializer$1.prototype.serializeToString = function(node,isHtml,nodeFilter){
		return nodeSerializeToString.call(node,isHtml,nodeFilter);
	};
	Node.prototype.toString = nodeSerializeToString;
	function nodeSerializeToString(isHtml,nodeFilter){
		var buf = [];
		var refNode = this.nodeType == 9?this.documentElement:this;
		var prefix = refNode.prefix;
		var uri = refNode.namespaceURI;
		
		if(uri && prefix == null){
			//console.log(prefix)
			var prefix = refNode.lookupPrefix(uri);
			if(prefix == null){
				//isHTML = true;
				var visibleNamespaces=[
				{namespace:uri,prefix:null}
				//{namespace:uri,prefix:''}
				];
			}
		}
		serializeToString(this,buf,isHtml,nodeFilter,visibleNamespaces);
		//console.log('###',this.nodeType,uri,prefix,buf.join(''))
		return buf.join('');
	}
	function needNamespaceDefine(node,isHTML, visibleNamespaces) {
		var prefix = node.prefix||'';
		var uri = node.namespaceURI;
		if (!prefix && !uri){
			return false;
		}
		if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" 
			|| uri == 'http://www.w3.org/2000/xmlns/'){
			return false;
		}
		
		var i = visibleNamespaces.length; 
		//console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
		while (i--) {
			var ns = visibleNamespaces[i];
			// get namespace prefix
			//console.log(node.nodeType,node.tagName,ns.prefix,prefix)
			if (ns.prefix == prefix){
				return ns.namespace != uri;
			}
		}
		//console.log(isHTML,uri,prefix=='')
		//if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
		//	return false;
		//}
		//node.flag = '11111'
		//console.error(3,true,node.flag,node.prefix,node.namespaceURI)
		return true;
	}
	function serializeToString(node,buf,isHTML,nodeFilter,visibleNamespaces){
		if(nodeFilter){
			node = nodeFilter(node);
			if(node){
				if(typeof node == 'string'){
					buf.push(node);
					return;
				}
			}else{
				return;
			}
			//buf.sort.apply(attrs, attributeSorter);
		}
		switch(node.nodeType){
		case ELEMENT_NODE:
			if (!visibleNamespaces) visibleNamespaces = [];
			var startVisibleNamespaces = visibleNamespaces.length;
			var attrs = node.attributes;
			var len = attrs.length;
			var child = node.firstChild;
			var nodeName = node.tagName;
			
			isHTML =  (htmlns === node.namespaceURI) ||isHTML; 
			buf.push('<',nodeName);
			
			
			
			for(var i=0;i<len;i++){
				// add namespaces for attributes
				var attr = attrs.item(i);
				if (attr.prefix == 'xmlns') {
					visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
				}else if(attr.nodeName == 'xmlns'){
					visibleNamespaces.push({ prefix: '', namespace: attr.value });
				}
			}
			for(var i=0;i<len;i++){
				var attr = attrs.item(i);
				if (needNamespaceDefine(attr,isHTML, visibleNamespaces)) {
					var prefix = attr.prefix||'';
					var uri = attr.namespaceURI;
					var ns = prefix ? ' xmlns:' + prefix : " xmlns";
					buf.push(ns, '="' , uri , '"');
					visibleNamespaces.push({ prefix: prefix, namespace:uri });
				}
				serializeToString(attr,buf,isHTML,nodeFilter,visibleNamespaces);
			}
			// add namespace for current node		
			if (needNamespaceDefine(node,isHTML, visibleNamespaces)) {
				var prefix = node.prefix||'';
				var uri = node.namespaceURI;
				var ns = prefix ? ' xmlns:' + prefix : " xmlns";
				buf.push(ns, '="' , uri , '"');
				visibleNamespaces.push({ prefix: prefix, namespace:uri });
			}
			
			if(child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)){
				buf.push('>');
				//if is cdata child node
				if(isHTML && /^script$/i.test(nodeName)){
					while(child){
						if(child.data){
							buf.push(child.data);
						}else{
							serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
						}
						child = child.nextSibling;
					}
				}else
				{
					while(child){
						serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
						child = child.nextSibling;
					}
				}
				buf.push('</',nodeName,'>');
			}else{
				buf.push('/>');
			}
			// remove added visible namespaces
			//visibleNamespaces.length = startVisibleNamespaces;
			return;
		case DOCUMENT_NODE:
		case DOCUMENT_FRAGMENT_NODE:
			var child = node.firstChild;
			while(child){
				serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
				child = child.nextSibling;
			}
			return;
		case ATTRIBUTE_NODE:
			return buf.push(' ',node.name,'="',node.value.replace(/[<&"]/g,_xmlEncoder),'"');
		case TEXT_NODE:
			return buf.push(node.data.replace(/[<&]/g,_xmlEncoder));
		case CDATA_SECTION_NODE:
			return buf.push( '<![CDATA[',node.data,']]>');
		case COMMENT_NODE:
			return buf.push( "<!--",node.data,"-->");
		case DOCUMENT_TYPE_NODE:
			var pubid = node.publicId;
			var sysid = node.systemId;
			buf.push('<!DOCTYPE ',node.name);
			if(pubid){
				buf.push(' PUBLIC "',pubid);
				if (sysid && sysid!='.') {
					buf.push( '" "',sysid);
				}
				buf.push('">');
			}else if(sysid && sysid!='.'){
				buf.push(' SYSTEM "',sysid,'">');
			}else{
				var sub = node.internalSubset;
				if(sub){
					buf.push(" [",sub,"]");
				}
				buf.push(">");
			}
			return;
		case PROCESSING_INSTRUCTION_NODE:
			return buf.push( "<?",node.target," ",node.data,"?>");
		case ENTITY_REFERENCE_NODE:
			return buf.push( '&',node.nodeName,';');
		//case ENTITY_NODE:
		//case NOTATION_NODE:
		default:
			buf.push('??',node.nodeName);
		}
	}
	function importNode(doc,node,deep){
		var node2;
		switch (node.nodeType) {
		case ELEMENT_NODE:
			node2 = node.cloneNode(false);
			node2.ownerDocument = doc;
			//var attrs = node2.attributes;
			//var len = attrs.length;
			//for(var i=0;i<len;i++){
				//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
			//}
		case DOCUMENT_FRAGMENT_NODE:
			break;
		case ATTRIBUTE_NODE:
			deep = true;
			break;
		//case ENTITY_REFERENCE_NODE:
		//case PROCESSING_INSTRUCTION_NODE:
		////case TEXT_NODE:
		//case CDATA_SECTION_NODE:
		//case COMMENT_NODE:
		//	deep = false;
		//	break;
		//case DOCUMENT_NODE:
		//case DOCUMENT_TYPE_NODE:
		//cannot be imported.
		//case ENTITY_NODE:
		//case NOTATION_NODE：
		//can not hit in level3
		//default:throw e;
		}
		if(!node2){
			node2 = node.cloneNode(false);//false
		}
		node2.ownerDocument = doc;
		node2.parentNode = null;
		if(deep){
			var child = node.firstChild;
			while(child){
				node2.appendChild(importNode(doc,child,deep));
				child = child.nextSibling;
			}
		}
		return node2;
	}
	//
	//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
	//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
	function cloneNode(doc,node,deep){
		var node2 = new node.constructor();
		for(var n in node){
			var v = node[n];
			if(typeof v != 'object' ){
				if(v != node2[n]){
					node2[n] = v;
				}
			}
		}
		if(node.childNodes){
			node2.childNodes = new NodeList();
		}
		node2.ownerDocument = doc;
		switch (node2.nodeType) {
		case ELEMENT_NODE:
			var attrs	= node.attributes;
			var attrs2	= node2.attributes = new NamedNodeMap();
			var len = attrs.length;
			attrs2._ownerElement = node2;
			for(var i=0;i<len;i++){
				node2.setAttributeNode(cloneNode(doc,attrs.item(i),true));
			}
			break;
		case ATTRIBUTE_NODE:
			deep = true;
		}
		if(deep){
			var child = node.firstChild;
			while(child){
				node2.appendChild(cloneNode(doc,child,deep));
				child = child.nextSibling;
			}
		}
		return node2;
	}

	function __set__(object,key,value){
		object[key] = value;
	}
	//do dynamic
	try{
		if(Object.defineProperty){
			Object.defineProperty(LiveNodeList.prototype,'length',{
				get:function(){
					_updateLiveList(this);
					return this.$$length;
				}
			});
			Object.defineProperty(Node.prototype,'textContent',{
				get:function(){
					return getTextContent(this);
				},
				set:function(data){
					switch(this.nodeType){
					case ELEMENT_NODE:
					case DOCUMENT_FRAGMENT_NODE:
						while(this.firstChild){
							this.removeChild(this.firstChild);
						}
						if(data || String(data)){
							this.appendChild(this.ownerDocument.createTextNode(data));
						}
						break;
					default:
						//TODO:
						this.data = data;
						this.value = data;
						this.nodeValue = data;
					}
				}
			});
			
			function getTextContent(node){
				switch(node.nodeType){
				case ELEMENT_NODE:
				case DOCUMENT_FRAGMENT_NODE:
					var buf = [];
					node = node.firstChild;
					while(node){
						if(node.nodeType!==7 && node.nodeType !==8){
							buf.push(getTextContent(node));
						}
						node = node.nextSibling;
					}
					return buf.join('');
				default:
					return node.nodeValue;
				}
			}
			__set__ = function(object,key,value){
				//console.log(value)
				object['$$'+key] = value;
			};
		}
	}catch(e){//ie8
	}

	//if(typeof require == 'function'){
		var DOMImplementation_1 = DOMImplementation;
		var XMLSerializer_1 = XMLSerializer$1;
	//}

	var dom = {
		DOMImplementation: DOMImplementation_1,
		XMLSerializer: XMLSerializer_1
	};

	var domParser = createCommonjsModule(function (module, exports) {
	function DOMParser(options){
		this.options = options ||{locator:{}};
		
	}
	DOMParser.prototype.parseFromString = function(source,mimeType){
		var options = this.options;
		var sax$$1 =  new XMLReader();
		var domBuilder = options.domBuilder || new DOMHandler();//contentHandler and LexicalHandler
		var errorHandler = options.errorHandler;
		var locator = options.locator;
		var defaultNSMap = options.xmlns||{};
		var entityMap = {'lt':'<','gt':'>','amp':'&','quot':'"','apos':"'"};
		if(locator){
			domBuilder.setDocumentLocator(locator);
		}
		
		sax$$1.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);
		sax$$1.domBuilder = options.domBuilder || domBuilder;
		if(/\/x?html?$/.test(mimeType)){
			entityMap.nbsp = '\xa0';
			entityMap.copy = '\xa9';
			defaultNSMap['']= 'http://www.w3.org/1999/xhtml';
		}
		defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';
		if(source){
			sax$$1.parse(source,defaultNSMap,entityMap);
		}else{
			sax$$1.errorHandler.error("invalid doc source");
		}
		return domBuilder.doc;
	};
	function buildErrorHandler(errorImpl,domBuilder,locator){
		if(!errorImpl){
			if(domBuilder instanceof DOMHandler){
				return domBuilder;
			}
			errorImpl = domBuilder ;
		}
		var errorHandler = {};
		var isCallback = errorImpl instanceof Function;
		locator = locator||{};
		function build(key){
			var fn = errorImpl[key];
			if(!fn && isCallback){
				fn = errorImpl.length == 2?function(msg){errorImpl(key,msg);}:errorImpl;
			}
			errorHandler[key] = fn && function(msg){
				fn('[xmldom '+key+']\t'+msg+_locator(locator));
			}||function(){};
		}
		build('warning');
		build('error');
		build('fatalError');
		return errorHandler;
	}

	//console.log('#\n\n\n\n\n\n\n####')
	/**
	 * +ContentHandler+ErrorHandler
	 * +LexicalHandler+EntityResolver2
	 * -DeclHandler-DTDHandler 
	 * 
	 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
	 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
	 */
	function DOMHandler() {
	    this.cdata = false;
	}
	function position(locator,node){
		node.lineNumber = locator.lineNumber;
		node.columnNumber = locator.columnNumber;
	}
	/**
	 * @see org.xml.sax.ContentHandler#startDocument
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
	 */ 
	DOMHandler.prototype = {
		startDocument : function() {
	    	this.doc = new DOMImplementation().createDocument(null, null, null);
	    	if (this.locator) {
	        	this.doc.documentURI = this.locator.systemId;
	    	}
		},
		startElement:function(namespaceURI, localName, qName, attrs) {
			var doc = this.doc;
		    var el = doc.createElementNS(namespaceURI, qName||localName);
		    var len = attrs.length;
		    appendElement(this, el);
		    this.currentElement = el;
		    
			this.locator && position(this.locator,el);
		    for (var i = 0 ; i < len; i++) {
		        var namespaceURI = attrs.getURI(i);
		        var value = attrs.getValue(i);
		        var qName = attrs.getQName(i);
				var attr = doc.createAttributeNS(namespaceURI, qName);
				this.locator &&position(attrs.getLocator(i),attr);
				attr.value = attr.nodeValue = value;
				el.setAttributeNode(attr);
		    }
		},
		endElement:function(namespaceURI, localName, qName) {
			var current = this.currentElement;
			var tagName = current.tagName;
			this.currentElement = current.parentNode;
		},
		startPrefixMapping:function(prefix, uri) {
		},
		endPrefixMapping:function(prefix) {
		},
		processingInstruction:function(target, data) {
		    var ins = this.doc.createProcessingInstruction(target, data);
		    this.locator && position(this.locator,ins);
		    appendElement(this, ins);
		},
		ignorableWhitespace:function(ch, start, length) {
		},
		characters:function(chars, start, length) {
			chars = _toString.apply(this,arguments);
			//console.log(chars)
			if(chars){
				if (this.cdata) {
					var charNode = this.doc.createCDATASection(chars);
				} else {
					var charNode = this.doc.createTextNode(chars);
				}
				if(this.currentElement){
					this.currentElement.appendChild(charNode);
				}else if(/^\s*$/.test(chars)){
					this.doc.appendChild(charNode);
					//process xml
				}
				this.locator && position(this.locator,charNode);
			}
		},
		skippedEntity:function(name) {
		},
		endDocument:function() {
			this.doc.normalize();
		},
		setDocumentLocator:function (locator) {
		    if(this.locator = locator){// && !('lineNumber' in locator)){
		    	locator.lineNumber = 0;
		    }
		},
		//LexicalHandler
		comment:function(chars, start, length) {
			chars = _toString.apply(this,arguments);
		    var comm = this.doc.createComment(chars);
		    this.locator && position(this.locator,comm);
		    appendElement(this, comm);
		},
		
		startCDATA:function() {
		    //used in characters() methods
		    this.cdata = true;
		},
		endCDATA:function() {
		    this.cdata = false;
		},
		
		startDTD:function(name, publicId, systemId) {
			var impl = this.doc.implementation;
		    if (impl && impl.createDocumentType) {
		        var dt = impl.createDocumentType(name, publicId, systemId);
		        this.locator && position(this.locator,dt);
		        appendElement(this, dt);
		    }
		},
		/**
		 * @see org.xml.sax.ErrorHandler
		 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
		 */
		warning:function(error) {
			console.warn('[xmldom warning]\t'+error,_locator(this.locator));
		},
		error:function(error) {
			console.error('[xmldom error]\t'+error,_locator(this.locator));
		},
		fatalError:function(error) {
			console.error('[xmldom fatalError]\t'+error,_locator(this.locator));
		    throw error;
		}
	};
	function _locator(l){
		if(l){
			return '\n@'+(l.systemId ||'')+'#[line:'+l.lineNumber+',col:'+l.columnNumber+']'
		}
	}
	function _toString(chars,start,length){
		if(typeof chars == 'string'){
			return chars.substr(start,length)
		}else{//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
			if(chars.length >= start+length || start){
				return new java.lang.String(chars,start,length)+'';
			}
			return chars;
		}
	}

	/*
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
	 * used method of org.xml.sax.ext.LexicalHandler:
	 *  #comment(chars, start, length)
	 *  #startCDATA()
	 *  #endCDATA()
	 *  #startDTD(name, publicId, systemId)
	 *
	 *
	 * IGNORED method of org.xml.sax.ext.LexicalHandler:
	 *  #endDTD()
	 *  #startEntity(name)
	 *  #endEntity(name)
	 *
	 *
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
	 * IGNORED method of org.xml.sax.ext.DeclHandler
	 * 	#attributeDecl(eName, aName, type, mode, value)
	 *  #elementDecl(name, model)
	 *  #externalEntityDecl(name, publicId, systemId)
	 *  #internalEntityDecl(name, value)
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
	 * IGNORED method of org.xml.sax.EntityResolver2
	 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
	 *  #resolveEntity(publicId, systemId)
	 *  #getExternalSubset(name, baseURI)
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
	 * IGNORED method of org.xml.sax.DTDHandler
	 *  #notationDecl(name, publicId, systemId) {};
	 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
	 */
	"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(key){
		DOMHandler.prototype[key] = function(){return null};
	});

	/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
	function appendElement (hander,node) {
	    if (!hander.currentElement) {
	        hander.doc.appendChild(node);
	    } else {
	        hander.currentElement.appendChild(node);
	    }
	}//appendChild and setAttributeNS are preformance key

	//if(typeof require == 'function'){
		var XMLReader = sax.XMLReader;
		var DOMImplementation = exports.DOMImplementation = dom.DOMImplementation;
		exports.XMLSerializer = dom.XMLSerializer ;
		exports.DOMParser = DOMParser;
	//}
	});
	var domParser_1 = domParser.DOMImplementation;
	var domParser_2 = domParser.XMLSerializer;
	var domParser_3 = domParser.DOMParser;

	/**
	 * Core Utilities and Helpers
	 * @module Core
	*/

	/**
	 * Vendor prefixed requestAnimationFrame
	 * @returns {function} requestAnimationFrame
	 * @memberof Core
	 */
	const requestAnimationFrame = typeof window != "undefined" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : false;
	const ELEMENT_NODE$1 = 1;
	const _URL = typeof URL != "undefined" ? URL : typeof window != "undefined" ? window.URL || window.webkitURL || window.mozURL : undefined;

	/**
	 * Generates a UUID
	 * based on: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
	 * @returns {string} uuid
	 * @memberof Core
	 */
	function uuid() {
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
	 * @returns {boolean}
	 * @memberof Core
	 */
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	/**
	 * Extend properties of an object
	 * @param {object} target
	 * @returns {object}
	 * @memberof Core
	 */
	function extend(target) {
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
	 * Finds where something would fit into a sorted array
	 * @param {any} item
	 * @param {array} array
	 * @param {function} [compareFunction]
	 * @param {function} [_start]
	 * @param {function} [_end]
	 * @returns {number} location (in array)
	 * @memberof Core
	 */
	function locationOf(item, array, compareFunction, _start, _end) {
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
	function indexOfSorted$1(item, array, compareFunction, _start, _end) {
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
			return indexOfSorted$1(item, array, compareFunction, pivot, end);
		} else {
			return indexOfSorted$1(item, array, compareFunction, start, pivot);
		}
	}

	/**
	 * Gets the index of a node in its parent
	 * @private
	 * @memberof Core
	 */
	function indexOfNode(node, typeId) {
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
	 * Gets the index of an element node in its parent
	 * @param {element} elementNode
	 * @returns {number} index
	 * @memberof Core
	 */
	function indexOfElementNode(elementNode) {
		return indexOfNode(elementNode, ELEMENT_NODE$1);
	}

	/**
	 * Check if extension is xml
	 * @param {string} ext
	 * @returns {boolean}
	 * @memberof Core
	 */
	function isXml(ext) {
		return ["xml", "opf", "ncx"].indexOf(ext) > -1;
	}

	/**
	 * Create a new blob
	 * @param {any} content
	 * @param {string} mime
	 * @returns {Blob}
	 * @memberof Core
	 */
	function createBlob(content, mime) {
		return new Blob([content], { type: mime });
	}

	/**
	 * Create a new blob url
	 * @param {any} content
	 * @param {string} mime
	 * @returns {string} url
	 * @memberof Core
	 */
	function createBlobUrl(content, mime) {
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
	function revokeBlobUrl(url) {
		return _URL.revokeObjectURL(url);
	}

	/**
	 * Create a new base64 encoded url
	 * @param {any} content
	 * @param {string} mime
	 * @returns {string} url
	 * @memberof Core
	 */
	function createBase64Url(content, mime) {
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
	function type(obj) {
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
	function parse$1(markup, mime, forceXMLDom) {
		var doc;
		var Parser;

		if (typeof DOMParser === "undefined" || forceXMLDom) {
			Parser = domParser.DOMParser;
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
	function qs(el, sel) {
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
	function qsa(el, sel) {

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
	function qsp(el, sel, props) {
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
	function sprint(root, func) {
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

	function treeWalker(root, func, filter) {
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
	function walk(node, callback) {
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
	function blob2base64(blob) {
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
	function defer() {
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
	function querySelectorByType(html, element, type) {
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
	function findChildren(el) {
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
	function parents(node) {
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
	function filterChildren(el, nodeName, single) {
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
	function getParentByTagName(node, tagname) {
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
	 * Lightweight Polyfill for DOM Range
	 * @class
	 * @memberof Core
	 */
	class RangeObject {
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

	if (!process$1) {
	  var process$1 = {
	    "cwd" : function () { return '/' }
	  };
	}

	function assertPath(path) {
	  if (typeof path !== 'string') {
	    throw new TypeError('Path must be a string. Received ' + path);
	  }
	}

	// Resolves . and .. elements in a path with directory names
	function normalizeStringPosix(path, allowAboveRoot) {
	  var res = '';
	  var lastSlash = -1;
	  var dots = 0;
	  var code;
	  for (var i = 0; i <= path.length; ++i) {
	    if (i < path.length)
	      code = path.charCodeAt(i);
	    else if (code === 47/*/*/)
	      break;
	    else
	      code = 47/*/*/;
	    if (code === 47/*/*/) {
	      if (lastSlash === i - 1 || dots === 1) {
	        // NOOP
	      } else if (lastSlash !== i - 1 && dots === 2) {
	        if (res.length < 2 ||
	            res.charCodeAt(res.length - 1) !== 46/*.*/ ||
	            res.charCodeAt(res.length - 2) !== 46/*.*/) {
	          if (res.length > 2) {
	            var start = res.length - 1;
	            var j = start;
	            for (; j >= 0; --j) {
	              if (res.charCodeAt(j) === 47/*/*/)
	                break;
	            }
	            if (j !== start) {
	              if (j === -1)
	                res = '';
	              else
	                res = res.slice(0, j);
	              lastSlash = i;
	              dots = 0;
	              continue;
	            }
	          } else if (res.length === 2 || res.length === 1) {
	            res = '';
	            lastSlash = i;
	            dots = 0;
	            continue;
	          }
	        }
	        if (allowAboveRoot) {
	          if (res.length > 0)
	            res += '/..';
	          else
	            res = '..';
	        }
	      } else {
	        if (res.length > 0)
	          res += '/' + path.slice(lastSlash + 1, i);
	        else
	          res = path.slice(lastSlash + 1, i);
	      }
	      lastSlash = i;
	      dots = 0;
	    } else if (code === 46/*.*/ && dots !== -1) {
	      ++dots;
	    } else {
	      dots = -1;
	    }
	  }
	  return res;
	}

	function _format(sep, pathObject) {
	  var dir = pathObject.dir || pathObject.root;
	  var base = pathObject.base ||
	    ((pathObject.name || '') + (pathObject.ext || ''));
	  if (!dir) {
	    return base;
	  }
	  if (dir === pathObject.root) {
	    return dir + base;
	  }
	  return dir + sep + base;
	}

	var posix = {
	  // path.resolve([from ...], to)
	  resolve: function resolve() {
	    var resolvedPath = '';
	    var resolvedAbsolute = false;
	    var cwd;

	    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	      var path;
	      if (i >= 0)
	        path = arguments[i];
	      else {
	        if (cwd === undefined)
	          cwd = process$1.cwd();
	        path = cwd;
	      }

	      assertPath(path);

	      // Skip empty entries
	      if (path.length === 0) {
	        continue;
	      }

	      resolvedPath = path + '/' + resolvedPath;
	      resolvedAbsolute = path.charCodeAt(0) === 47/*/*/;
	    }

	    // At this point the path should be resolved to a full absolute path, but
	    // handle relative paths to be safe (might happen when process.cwd() fails)

	    // Normalize the path
	    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

	    if (resolvedAbsolute) {
	      if (resolvedPath.length > 0)
	        return '/' + resolvedPath;
	      else
	        return '/';
	    } else if (resolvedPath.length > 0) {
	      return resolvedPath;
	    } else {
	      return '.';
	    }
	  },


	  normalize: function normalize(path) {
	    assertPath(path);

	    if (path.length === 0)
	      return '.';

	    var isAbsolute = path.charCodeAt(0) === 47/*/*/;
	    var trailingSeparator = path.charCodeAt(path.length - 1) === 47/*/*/;

	    // Normalize the path
	    path = normalizeStringPosix(path, !isAbsolute);

	    if (path.length === 0 && !isAbsolute)
	      path = '.';
	    if (path.length > 0 && trailingSeparator)
	      path += '/';

	    if (isAbsolute)
	      return '/' + path;
	    return path;
	  },


	  isAbsolute: function isAbsolute(path) {
	    assertPath(path);
	    return path.length > 0 && path.charCodeAt(0) === 47/*/*/;
	  },


	  join: function join() {
	    if (arguments.length === 0)
	      return '.';
	    var joined;
	    for (var i = 0; i < arguments.length; ++i) {
	      var arg = arguments[i];
	      assertPath(arg);
	      if (arg.length > 0) {
	        if (joined === undefined)
	          joined = arg;
	        else
	          joined += '/' + arg;
	      }
	    }
	    if (joined === undefined)
	      return '.';
	    return posix.normalize(joined);
	  },


	  relative: function relative(from, to) {
	    assertPath(from);
	    assertPath(to);

	    if (from === to)
	      return '';

	    from = posix.resolve(from);
	    to = posix.resolve(to);

	    if (from === to)
	      return '';

	    // Trim any leading backslashes
	    var fromStart = 1;
	    for (; fromStart < from.length; ++fromStart) {
	      if (from.charCodeAt(fromStart) !== 47/*/*/)
	        break;
	    }
	    var fromEnd = from.length;
	    var fromLen = (fromEnd - fromStart);

	    // Trim any leading backslashes
	    var toStart = 1;
	    for (; toStart < to.length; ++toStart) {
	      if (to.charCodeAt(toStart) !== 47/*/*/)
	        break;
	    }
	    var toEnd = to.length;
	    var toLen = (toEnd - toStart);

	    // Compare paths to find the longest common path from root
	    var length = (fromLen < toLen ? fromLen : toLen);
	    var lastCommonSep = -1;
	    var i = 0;
	    for (; i <= length; ++i) {
	      if (i === length) {
	        if (toLen > length) {
	          if (to.charCodeAt(toStart + i) === 47/*/*/) {
	            // We get here if `from` is the exact base path for `to`.
	            // For example: from='/foo/bar'; to='/foo/bar/baz'
	            return to.slice(toStart + i + 1);
	          } else if (i === 0) {
	            // We get here if `from` is the root
	            // For example: from='/'; to='/foo'
	            return to.slice(toStart + i);
	          }
	        } else if (fromLen > length) {
	          if (from.charCodeAt(fromStart + i) === 47/*/*/) {
	            // We get here if `to` is the exact base path for `from`.
	            // For example: from='/foo/bar/baz'; to='/foo/bar'
	            lastCommonSep = i;
	          } else if (i === 0) {
	            // We get here if `to` is the root.
	            // For example: from='/foo'; to='/'
	            lastCommonSep = 0;
	          }
	        }
	        break;
	      }
	      var fromCode = from.charCodeAt(fromStart + i);
	      var toCode = to.charCodeAt(toStart + i);
	      if (fromCode !== toCode)
	        break;
	      else if (fromCode === 47/*/*/)
	        lastCommonSep = i;
	    }

	    var out = '';
	    // Generate the relative path based on the path difference between `to`
	    // and `from`
	    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
	      if (i === fromEnd || from.charCodeAt(i) === 47/*/*/) {
	        if (out.length === 0)
	          out += '..';
	        else
	          out += '/..';
	      }
	    }

	    // Lastly, append the rest of the destination (`to`) path that comes after
	    // the common path parts
	    if (out.length > 0)
	      return out + to.slice(toStart + lastCommonSep);
	    else {
	      toStart += lastCommonSep;
	      if (to.charCodeAt(toStart) === 47/*/*/)
	        ++toStart;
	      return to.slice(toStart);
	    }
	  },


	  _makeLong: function _makeLong(path) {
	    return path;
	  },


	  dirname: function dirname(path) {
	    assertPath(path);
	    if (path.length === 0)
	      return '.';
	    var code = path.charCodeAt(0);
	    var hasRoot = (code === 47/*/*/);
	    var end = -1;
	    var matchedSlash = true;
	    for (var i = path.length - 1; i >= 1; --i) {
	      code = path.charCodeAt(i);
	      if (code === 47/*/*/) {
	        if (!matchedSlash) {
	          end = i;
	          break;
	        }
	      } else {
	        // We saw the first non-path separator
	        matchedSlash = false;
	      }
	    }

	    if (end === -1)
	      return hasRoot ? '/' : '.';
	    if (hasRoot && end === 1)
	      return '//';
	    return path.slice(0, end);
	  },


	  basename: function basename(path, ext) {
	    if (ext !== undefined && typeof ext !== 'string')
	      throw new TypeError('"ext" argument must be a string');
	    assertPath(path);

	    var start = 0;
	    var end = -1;
	    var matchedSlash = true;
	    var i;

	    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
	      if (ext.length === path.length && ext === path)
	        return '';
	      var extIdx = ext.length - 1;
	      var firstNonSlashEnd = -1;
	      for (i = path.length - 1; i >= 0; --i) {
	        var code = path.charCodeAt(i);
	        if (code === 47/*/*/) {
	          // If we reached a path separator that was not part of a set of path
	          // separators at the end of the string, stop now
	          if (!matchedSlash) {
	            start = i + 1;
	            break;
	          }
	        } else {
	          if (firstNonSlashEnd === -1) {
	            // We saw the first non-path separator, remember this index in case
	            // we need it if the extension ends up not matching
	            matchedSlash = false;
	            firstNonSlashEnd = i + 1;
	          }
	          if (extIdx >= 0) {
	            // Try to match the explicit extension
	            if (code === ext.charCodeAt(extIdx)) {
	              if (--extIdx === -1) {
	                // We matched the extension, so mark this as the end of our path
	                // component
	                end = i;
	              }
	            } else {
	              // Extension does not match, so our result is the entire path
	              // component
	              extIdx = -1;
	              end = firstNonSlashEnd;
	            }
	          }
	        }
	      }

	      if (start === end)
	        end = firstNonSlashEnd;
	      else if (end === -1)
	        end = path.length;
	      return path.slice(start, end);
	    } else {
	      for (i = path.length - 1; i >= 0; --i) {
	        if (path.charCodeAt(i) === 47/*/*/) {
	          // If we reached a path separator that was not part of a set of path
	          // separators at the end of the string, stop now
	          if (!matchedSlash) {
	            start = i + 1;
	            break;
	          }
	        } else if (end === -1) {
	          // We saw the first non-path separator, mark this as the end of our
	          // path component
	          matchedSlash = false;
	          end = i + 1;
	        }
	      }

	      if (end === -1)
	        return '';
	      return path.slice(start, end);
	    }
	  },


	  extname: function extname(path) {
	    assertPath(path);
	    var startDot = -1;
	    var startPart = 0;
	    var end = -1;
	    var matchedSlash = true;
	    // Track the state of characters (if any) we see before our first dot and
	    // after any path separator we find
	    var preDotState = 0;
	    for (var i = path.length - 1; i >= 0; --i) {
	      var code = path.charCodeAt(i);
	      if (code === 47/*/*/) {
	        // If we reached a path separator that was not part of a set of path
	        // separators at the end of the string, stop now
	        if (!matchedSlash) {
	          startPart = i + 1;
	          break;
	        }
	        continue;
	      }
	      if (end === -1) {
	        // We saw the first non-path separator, mark this as the end of our
	        // extension
	        matchedSlash = false;
	        end = i + 1;
	      }
	      if (code === 46/*.*/) {
	        // If this is our first dot, mark it as the start of our extension
	        if (startDot === -1)
	          startDot = i;
	        else if (preDotState !== 1)
	          preDotState = 1;
	      } else if (startDot !== -1) {
	        // We saw a non-dot and non-path separator before our dot, so we should
	        // have a good chance at having a non-empty extension
	        preDotState = -1;
	      }
	    }

	    if (startDot === -1 ||
	        end === -1 ||
	        // We saw a non-dot character immediately before the dot
	        preDotState === 0 ||
	        // The (right-most) trimmed path component is exactly '..'
	        (preDotState === 1 &&
	         startDot === end - 1 &&
	         startDot === startPart + 1)) {
	      return '';
	    }
	    return path.slice(startDot, end);
	  },


	  format: function format(pathObject) {
	    if (pathObject === null || typeof pathObject !== 'object') {
	      throw new TypeError(
	        'Parameter "pathObject" must be an object, not ' + typeof(pathObject)
	      );
	    }
	    return _format('/', pathObject);
	  },


	  parse: function parse(path) {
	    assertPath(path);

	    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
	    if (path.length === 0)
	      return ret;
	    var code = path.charCodeAt(0);
	    var isAbsolute = (code === 47/*/*/);
	    var start;
	    if (isAbsolute) {
	      ret.root = '/';
	      start = 1;
	    } else {
	      start = 0;
	    }
	    var startDot = -1;
	    var startPart = 0;
	    var end = -1;
	    var matchedSlash = true;
	    var i = path.length - 1;

	    // Track the state of characters (if any) we see before our first dot and
	    // after any path separator we find
	    var preDotState = 0;

	    // Get non-dir info
	    for (; i >= start; --i) {
	      code = path.charCodeAt(i);
	      if (code === 47/*/*/) {
	        // If we reached a path separator that was not part of a set of path
	        // separators at the end of the string, stop now
	        if (!matchedSlash) {
	          startPart = i + 1;
	          break;
	        }
	        continue;
	      }
	      if (end === -1) {
	        // We saw the first non-path separator, mark this as the end of our
	        // extension
	        matchedSlash = false;
	        end = i + 1;
	      }
	      if (code === 46/*.*/) {
	        // If this is our first dot, mark it as the start of our extension
	        if (startDot === -1)
	          startDot = i;
	        else if (preDotState !== 1)
	          preDotState = 1;
	      } else if (startDot !== -1) {
	        // We saw a non-dot and non-path separator before our dot, so we should
	        // have a good chance at having a non-empty extension
	        preDotState = -1;
	      }
	    }

	    if (startDot === -1 ||
	        end === -1 ||
	        // We saw a non-dot character immediately before the dot
	        preDotState === 0 ||
	        // The (right-most) trimmed path component is exactly '..'
	        (preDotState === 1 &&
	         startDot === end - 1 &&
	         startDot === startPart + 1)) {
	      if (end !== -1) {
	        if (startPart === 0 && isAbsolute)
	          ret.base = ret.name = path.slice(1, end);
	        else
	          ret.base = ret.name = path.slice(startPart, end);
	      }
	    } else {
	      if (startPart === 0 && isAbsolute) {
	        ret.name = path.slice(1, startDot);
	        ret.base = path.slice(1, end);
	      } else {
	        ret.name = path.slice(startPart, startDot);
	        ret.base = path.slice(startPart, end);
	      }
	      ret.ext = path.slice(startDot, end);
	    }

	    if (startPart > 0)
	      ret.dir = path.slice(0, startPart - 1);
	    else if (isAbsolute)
	      ret.dir = '/';

	    return ret;
	  },


	  sep: '/',
	  delimiter: ':',
	  posix: null
	};


	var path = posix;

	/**
	 * Creates a Path object for parsing and manipulation of a path strings
	 *
	 * Uses a polyfill for Nodejs path: https://nodejs.org/api/path.html
	 * @param	{string} pathString	a url string (relative or absolute)
	 * @class
	 */
	class Path {
		constructor(pathString) {
			var protocol;
			var parsed;

			protocol = pathString.indexOf("://");
			if (protocol > -1) {
				pathString = new URL(pathString).pathname;
			}

			parsed = this.parse(pathString);

			this.path = pathString;

			if (this.isDirectory(pathString)) {
				this.directory = pathString;
			} else {
				this.directory = parsed.dir + "/";
			}

			this.filename = parsed.base;
			this.extension = parsed.ext.slice(1);
		}

		/**
	  * Parse the path: https://nodejs.org/api/path.html#path_path_parse_path
	  * @param	{string} what
	  * @returns {object}
	  */
		parse(what) {
			return path.parse(what);
		}

		/**
	  * @param	{string} what
	  * @returns {boolean}
	  */
		isAbsolute(what) {
			return path.isAbsolute(what || this.path);
		}

		/**
	  * Check if path ends with a directory
	  * @param	{string} what
	  * @returns {boolean}
	  */
		isDirectory(what) {
			return what.charAt(what.length - 1) === "/";
		}

		/**
	  * Resolve a path against the directory of the Path
	  *
	  * https://nodejs.org/api/path.html#path_path_resolve_paths
	  * @param	{string} what
	  * @returns {string} resolved
	  */
		resolve(what) {
			return path.resolve(this.directory, what);
		}

		/**
	  * Resolve a path relative to the directory of the Path
	  *
	  * https://nodejs.org/api/path.html#path_path_relative_from_to
	  * @param	{string} what
	  * @returns {string} relative
	  */
		relative(what) {
			return path.relative(this.directory, what);
		}

		splitPath(filename) {
			return this.splitPathRe.exec(filename).slice(1);
		}

		/**
	  * Return the path string
	  * @returns {string} path
	  */
		toString() {
			return this.path;
		}
	}

	/**
	 * creates a Url object for parsing and manipulation of a url string
	 * @param	{string} urlString	a url string (relative or absolute)
	 * @param	{string} [baseString] optional base for the url,
	 * default to window.location.href
	 */
	class Url {
		constructor(urlString, baseString) {
			var absolute = urlString.indexOf("://") > -1;
			var pathname = urlString;
			var basePath;

			this.Url = undefined;
			this.href = urlString;
			this.protocol = "";
			this.origin = "";
			this.hash = "";
			this.hash = "";
			this.search = "";
			this.base = baseString;

			if (!absolute && baseString !== false && typeof baseString !== "string" && typeof window !== "undefined" && typeof window.location !== "undefined") {
				this.base = window.location.href;
			}

			// URL Polyfill doesn't throw an error if base is empty
			if (absolute || this.base) {
				try {
					if (this.base) {
						// Safari doesn't like an undefined base
						this.Url = new URL(urlString, this.base);
					} else {
						this.Url = new URL(urlString);
					}
					this.href = this.Url.href;

					this.protocol = this.Url.protocol;
					this.origin = this.Url.origin;
					this.hash = this.Url.hash;
					this.search = this.Url.search;

					pathname = this.Url.pathname;
				} catch (e) {
					// Skip URL parsing
					this.Url = undefined;
					// resolve the pathname from the base
					if (this.base) {
						basePath = new Path(this.base);
						pathname = basePath.resolve(pathname);
					}
				}
			}

			this.Path = new Path(pathname);

			this.directory = this.Path.directory;
			this.filename = this.Path.filename;
			this.extension = this.Path.extension;
		}

		/**
	  * @returns {Path}
	  */
		path() {
			return this.Path;
		}

		/**
	  * Resolves a relative path to a absolute url
	  * @returns {string} url
	  */
		resolve(what) {
			var isAbsolute = what.indexOf("://") > -1;
			var fullpath;

			if (isAbsolute) {
				return what;
			}

			fullpath = path.resolve(this.directory, what);
			return this.origin + fullpath;
		}

		/**
	  * Resolve a path relative to the url
	  * @returns {string} path
	  */
		relative(what) {
			return path.relative(what, this.directory);
		}

		/**
	  * @returns {string}
	  */
		toString() {
			return this.href;
		}
	}

	const ELEMENT_NODE$2 = 1;
	const TEXT_NODE$2 = 3;
	// const COMMENT_NODE = 8;
	const DOCUMENT_NODE$2 = 9;

	/**
		* Parsing and creation of EpubCFIs: http://www.idpf.org/epub/linking/cfi/epub-cfi.html

		* Implements:
		* - Character Offset: epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)
		* - Simple Ranges : epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)

		* Does Not Implement:
		* - Temporal Offset (~)
		* - Spatial Offset (@)
		* - Temporal-Spatial Offset (~ + @)
		* - Text Location Assertion ([)
		* @class
		@param {string | Range | Node } [cfiFrom]
		@param {string | object} [base]
		@param {string} [ignoreClass] class to ignore when parsing DOM
	*/
	class EpubCFI {
		constructor(cfiFrom, base, ignoreClass) {
			var type$$1;

			this.str = "";

			this.base = {};
			this.spinePos = 0; // For compatibility

			this.range = false; // true || false;

			this.path = {};
			this.start = null;
			this.end = null;

			// Allow instantiation without the "new" keyword
			if (!(this instanceof EpubCFI)) {
				return new EpubCFI(cfiFrom, base, ignoreClass);
			}

			if (typeof base === "string") {
				this.base = this.parseComponent(base);
			} else if (typeof base === "object" && base.steps) {
				this.base = base;
			}

			type$$1 = this.checkType(cfiFrom);

			if (type$$1 === "string") {
				this.str = cfiFrom;
				return extend(this, this.parse(cfiFrom));
			} else if (type$$1 === "range") {
				return extend(this, this.fromRange(cfiFrom, this.base, ignoreClass));
			} else if (type$$1 === "node") {
				return extend(this, this.fromNode(cfiFrom, this.base, ignoreClass));
			} else if (type$$1 === "EpubCFI" && cfiFrom.path) {
				return cfiFrom;
			} else if (!cfiFrom) {
				return this;
			} else {
				throw new TypeError("not a valid argument for EpubCFI");
			}
		}

		/**
	  * Check the type of constructor input
	  * @private
	  */
		checkType(cfi) {

			if (this.isCfiString(cfi)) {
				return "string";
				// Is a range object
			} else if (typeof cfi === "object" && (type(cfi) === "Range" || typeof cfi.startContainer != "undefined")) {
				return "range";
			} else if (typeof cfi === "object" && typeof cfi.nodeType != "undefined") {
				// || typeof cfi === "function"
				return "node";
			} else if (typeof cfi === "object" && cfi instanceof EpubCFI) {
				return "EpubCFI";
			} else {
				return false;
			}
		}

		/**
	  * Parse a cfi string to a CFI object representation
	  * @param {string} cfiStr
	  * @returns {object} cfi
	  */
		parse(cfiStr) {
			var cfi = {
				spinePos: -1,
				range: false,
				base: {},
				path: {},
				start: null,
				end: null
			};
			var baseComponent, pathComponent, range;

			if (typeof cfiStr !== "string") {
				return { spinePos: -1 };
			}

			if (cfiStr.indexOf("epubcfi(") === 0 && cfiStr[cfiStr.length - 1] === ")") {
				// Remove intial epubcfi( and ending )
				cfiStr = cfiStr.slice(8, cfiStr.length - 1);
			}

			baseComponent = this.getChapterComponent(cfiStr);

			// Make sure this is a valid cfi or return
			if (!baseComponent) {
				return { spinePos: -1 };
			}

			cfi.base = this.parseComponent(baseComponent);

			pathComponent = this.getPathComponent(cfiStr);
			cfi.path = this.parseComponent(pathComponent);

			range = this.getRange(cfiStr);

			if (range) {
				cfi.range = true;
				cfi.start = this.parseComponent(range[0]);
				cfi.end = this.parseComponent(range[1]);
			}

			// Get spine node position
			// cfi.spineSegment = cfi.base.steps[1];

			// Chapter segment is always the second step
			if (!cfi.base.steps || cfi.base.steps.length < 2) {
				return { spinePos: -1 };
			} else {
				cfi.spinePos = cfi.base.steps[1].index;
			}

			return cfi;
		}

		parseComponent(componentStr) {
			var component = {
				steps: [],
				terminal: {
					offset: null,
					assertion: null
				}
			};
			var parts = componentStr.split(":");
			var steps = parts[0].split("/");
			var terminal;

			if (parts.length > 1) {
				terminal = parts[1];
				component.terminal = this.parseTerminal(terminal);
			}

			if (steps[0] === "") {
				steps.shift(); // Ignore the first slash
			}

			component.steps = steps.map(function (step) {
				return this.parseStep(step);
			}.bind(this));

			return component;
		}

		parseStep(stepStr) {
			var type$$1, num, index, has_brackets, id;

			has_brackets = stepStr.match(/\[(.*)\]/);
			if (has_brackets && has_brackets[1]) {
				id = has_brackets[1];
			}

			//-- Check if step is a text node or element
			num = parseInt(stepStr);

			if (isNaN(num)) {
				return;
			}

			if (num % 2 === 0) {
				// Even = is an element
				type$$1 = "element";
				index = num / 2 - 1;
			} else {
				type$$1 = "text";
				index = (num - 1) / 2;
			}

			return {
				"type": type$$1,
				"index": index,
				"id": id || null
			};
		}

		parseTerminal(termialStr) {
			var characterOffset, textLocationAssertion;
			var assertion = termialStr.match(/\[(.*)\]/);

			if (assertion && assertion[1]) {
				characterOffset = parseInt(termialStr.split("[")[0]);
				textLocationAssertion = assertion[1];
			} else {
				characterOffset = parseInt(termialStr);
			}

			if (!isNumber(characterOffset)) {
				characterOffset = null;
			}

			return {
				"offset": characterOffset,
				"assertion": textLocationAssertion
			};
		}

		getChapterComponent(cfiStr) {

			var indirection = cfiStr.split("!");

			return indirection[0];
		}

		getPathComponent(cfiStr) {

			var indirection = cfiStr.split("!");

			if (indirection[1]) {
				let ranges = indirection[1].split(",");
				return ranges[0];
			}
		}

		getRange(cfiStr) {

			var ranges = cfiStr.split(",");

			if (ranges.length === 3) {
				return [ranges[1], ranges[2]];
			}

			return false;
		}

		getCharecterOffsetComponent(cfiStr) {
			var splitStr = cfiStr.split(":");
			return splitStr[1] || "";
		}

		joinSteps(steps) {
			if (!steps) {
				return "";
			}

			return steps.map(function (part) {
				var segment = "";

				if (part.type === "element") {
					segment += (part.index + 1) * 2;
				}

				if (part.type === "text") {
					segment += 1 + 2 * part.index; // TODO: double check that this is odd
				}

				if (part.id) {
					segment += "[" + part.id + "]";
				}

				return segment;
			}).join("/");
		}

		segmentString(segment) {
			var segmentString = "/";

			segmentString += this.joinSteps(segment.steps);

			if (segment.terminal && segment.terminal.offset != null) {
				segmentString += ":" + segment.terminal.offset;
			}

			if (segment.terminal && segment.terminal.assertion != null) {
				segmentString += "[" + segment.terminal.assertion + "]";
			}

			return segmentString;
		}

		/**
	  * Convert CFI to a epubcfi(...) string
	  * @returns {string} epubcfi
	  */
		toString() {
			var cfiString = "epubcfi(";

			cfiString += this.segmentString(this.base);

			cfiString += "!";
			cfiString += this.segmentString(this.path);

			// Add Range, if present
			if (this.range && this.start) {
				cfiString += ",";
				cfiString += this.segmentString(this.start);
			}

			if (this.range && this.end) {
				cfiString += ",";
				cfiString += this.segmentString(this.end);
			}

			cfiString += ")";

			return cfiString;
		}

		/**
	  * Compare which of two CFIs is earlier in the text
	  * @returns {number} First is earlier = 1, Second is earlier = -1, They are equal = 0
	  */
		compare(cfiOne, cfiTwo) {
			var stepsA, stepsB;
			var terminalA, terminalB;

			if (typeof cfiOne === "string") {
				cfiOne = new EpubCFI(cfiOne);
			}
			if (typeof cfiTwo === "string") {
				cfiTwo = new EpubCFI(cfiTwo);
			}
			// Compare Spine Positions
			if (cfiOne.spinePos > cfiTwo.spinePos) {
				return 1;
			}
			if (cfiOne.spinePos < cfiTwo.spinePos) {
				return -1;
			}

			if (cfiOne.range) {
				stepsA = cfiOne.path.steps.concat(cfiOne.start.steps);
				terminalA = cfiOne.start.terminal;
			} else {
				stepsA = cfiOne.path.steps;
				terminalA = cfiOne.path.terminal;
			}

			if (cfiTwo.range) {
				stepsB = cfiTwo.path.steps.concat(cfiTwo.start.steps);
				terminalB = cfiTwo.start.terminal;
			} else {
				stepsB = cfiTwo.path.steps;
				terminalB = cfiTwo.path.terminal;
			}

			// Compare Each Step in the First item
			for (var i = 0; i < stepsA.length; i++) {
				if (!stepsA[i]) {
					return -1;
				}
				if (!stepsB[i]) {
					return 1;
				}
				if (stepsA[i].index > stepsB[i].index) {
					return 1;
				}
				if (stepsA[i].index < stepsB[i].index) {
					return -1;
				}
				// Otherwise continue checking
			}

			// All steps in First equal to Second and First is Less Specific
			if (stepsA.length < stepsB.length) {
				return 1;
			}

			// Compare the charecter offset of the text node
			if (terminalA.offset > terminalB.offset) {
				return 1;
			}
			if (terminalA.offset < terminalB.offset) {
				return -1;
			}

			// CFI's are equal
			return 0;
		}

		step(node) {
			var nodeType = node.nodeType === TEXT_NODE$2 ? "text" : "element";

			return {
				"id": node.id,
				"tagName": node.tagName,
				"type": nodeType,
				"index": this.position(node)
			};
		}

		filteredStep(node, ignoreClass) {
			var filteredNode = this.filter(node, ignoreClass);
			var nodeType;

			// Node filtered, so ignore
			if (!filteredNode) {
				return;
			}

			// Otherwise add the filter node in
			nodeType = filteredNode.nodeType === TEXT_NODE$2 ? "text" : "element";

			return {
				"id": filteredNode.id,
				"tagName": filteredNode.tagName,
				"type": nodeType,
				"index": this.filteredPosition(filteredNode, ignoreClass)
			};
		}

		pathTo(node, offset, ignoreClass) {
			var segment = {
				steps: [],
				terminal: {
					offset: null,
					assertion: null
				}
			};
			var currentNode = node;
			var step;

			while (currentNode && currentNode.parentNode && currentNode.parentNode.nodeType != DOCUMENT_NODE$2) {

				if (ignoreClass) {
					step = this.filteredStep(currentNode, ignoreClass);
				} else {
					step = this.step(currentNode);
				}

				if (step) {
					segment.steps.unshift(step);
				}

				currentNode = currentNode.parentNode;
			}

			if (offset != null && offset >= 0) {

				segment.terminal.offset = offset;

				// Make sure we are getting to a textNode if there is an offset
				if (segment.steps[segment.steps.length - 1].type != "text") {
					segment.steps.push({
						"type": "text",
						"index": 0
					});
				}
			}

			return segment;
		}

		equalStep(stepA, stepB) {
			if (!stepA || !stepB) {
				return false;
			}

			if (stepA.index === stepB.index && stepA.id === stepB.id && stepA.type === stepB.type) {
				return true;
			}

			return false;
		}

		/**
	  * Create a CFI object from a Range
	  * @param {Range} range
	  * @param {string | object} base
	  * @param {string} [ignoreClass]
	  * @returns {object} cfi
	  */
		fromRange(range, base, ignoreClass) {
			var cfi = {
				range: false,
				base: {},
				path: {},
				start: null,
				end: null
			};

			var start = range.startContainer;
			var end = range.endContainer;

			var startOffset = range.startOffset;
			var endOffset = range.endOffset;

			var needsIgnoring = false;

			if (ignoreClass) {
				// Tell pathTo if / what to ignore
				needsIgnoring = start.ownerDocument.querySelector("." + ignoreClass) != null;
			}

			if (typeof base === "string") {
				cfi.base = this.parseComponent(base);
				cfi.spinePos = cfi.base.steps[1].index;
			} else if (typeof base === "object") {
				cfi.base = base;
			}

			if (range.collapsed) {
				if (needsIgnoring) {
					startOffset = this.patchOffset(start, startOffset, ignoreClass);
				}
				cfi.path = this.pathTo(start, startOffset, ignoreClass);
			} else {
				cfi.range = true;

				if (needsIgnoring) {
					startOffset = this.patchOffset(start, startOffset, ignoreClass);
				}

				cfi.start = this.pathTo(start, startOffset, ignoreClass);
				if (needsIgnoring) {
					endOffset = this.patchOffset(end, endOffset, ignoreClass);
				}

				cfi.end = this.pathTo(end, endOffset, ignoreClass);

				// Create a new empty path
				cfi.path = {
					steps: [],
					terminal: null
				};

				// Push steps that are shared between start and end to the common path
				var len = cfi.start.steps.length;
				var i;

				for (i = 0; i < len; i++) {
					if (this.equalStep(cfi.start.steps[i], cfi.end.steps[i])) {
						if (i === len - 1) {
							// Last step is equal, check terminals
							if (cfi.start.terminal === cfi.end.terminal) {
								// CFI's are equal
								cfi.path.steps.push(cfi.start.steps[i]);
								// Not a range
								cfi.range = false;
							}
						} else {
							cfi.path.steps.push(cfi.start.steps[i]);
						}
					} else {
						break;
					}
				}

				cfi.start.steps = cfi.start.steps.slice(cfi.path.steps.length);
				cfi.end.steps = cfi.end.steps.slice(cfi.path.steps.length);

				// TODO: Add Sanity check to make sure that the end if greater than the start
			}

			return cfi;
		}

		/**
	  * Create a CFI object from a Node
	  * @param {Node} anchor
	  * @param {string | object} base
	  * @param {string} [ignoreClass]
	  * @returns {object} cfi
	  */
		fromNode(anchor, base, ignoreClass) {
			var cfi = {
				range: false,
				base: {},
				path: {},
				start: null,
				end: null
			};

			if (typeof base === "string") {
				cfi.base = this.parseComponent(base);
				cfi.spinePos = cfi.base.steps[1].index;
			} else if (typeof base === "object") {
				cfi.base = base;
			}

			cfi.path = this.pathTo(anchor, null, ignoreClass);

			return cfi;
		}

		filter(anchor, ignoreClass) {
			var needsIgnoring;
			var sibling; // to join with
			var parent, previousSibling, nextSibling;
			var isText = false;

			if (anchor.nodeType === TEXT_NODE$2) {
				isText = true;
				parent = anchor.parentNode;
				needsIgnoring = anchor.parentNode.classList.contains(ignoreClass);
			} else {
				isText = false;
				needsIgnoring = anchor.classList.contains(ignoreClass);
			}

			if (needsIgnoring && isText) {
				previousSibling = parent.previousSibling;
				nextSibling = parent.nextSibling;

				// If the sibling is a text node, join the nodes
				if (previousSibling && previousSibling.nodeType === TEXT_NODE$2) {
					sibling = previousSibling;
				} else if (nextSibling && nextSibling.nodeType === TEXT_NODE$2) {
					sibling = nextSibling;
				}

				if (sibling) {
					return sibling;
				} else {
					// Parent will be ignored on next step
					return anchor;
				}
			} else if (needsIgnoring && !isText) {
				// Otherwise just skip the element node
				return false;
			} else {
				// No need to filter
				return anchor;
			}
		}

		patchOffset(anchor, offset, ignoreClass) {
			if (anchor.nodeType != TEXT_NODE$2) {
				throw new Error("Anchor must be a text node");
			}

			var curr = anchor;
			var totalOffset = offset;

			// If the parent is a ignored node, get offset from it's start
			if (anchor.parentNode.classList.contains(ignoreClass)) {
				curr = anchor.parentNode;
			}

			while (curr.previousSibling) {
				if (curr.previousSibling.nodeType === ELEMENT_NODE$2) {
					// Originally a text node, so join
					if (curr.previousSibling.classList.contains(ignoreClass)) {
						totalOffset += curr.previousSibling.textContent.length;
					} else {
						break; // Normal node, dont join
					}
				} else {
					// If the previous sibling is a text node, join the nodes
					totalOffset += curr.previousSibling.textContent.length;
				}

				curr = curr.previousSibling;
			}

			return totalOffset;
		}

		normalizedMap(children, nodeType, ignoreClass) {
			var output = {};
			var prevIndex = -1;
			var i,
			    len = children.length;
			var currNodeType;
			var prevNodeType;

			for (i = 0; i < len; i++) {

				currNodeType = children[i].nodeType;

				// Check if needs ignoring
				if (currNodeType === ELEMENT_NODE$2 && children[i].classList.contains(ignoreClass)) {
					currNodeType = TEXT_NODE$2;
				}

				if (i > 0 && currNodeType === TEXT_NODE$2 && prevNodeType === TEXT_NODE$2) {
					// join text nodes
					output[i] = prevIndex;
				} else if (nodeType === currNodeType) {
					prevIndex = prevIndex + 1;
					output[i] = prevIndex;
				}

				prevNodeType = currNodeType;
			}

			return output;
		}

		position(anchor) {
			var children, index;
			if (anchor.nodeType === ELEMENT_NODE$2) {
				children = anchor.parentNode.children;
				if (!children) {
					children = findChildren(anchor.parentNode);
				}
				index = Array.prototype.indexOf.call(children, anchor);
			} else {
				children = this.textNodes(anchor.parentNode);
				index = children.indexOf(anchor);
			}

			return index;
		}

		filteredPosition(anchor, ignoreClass) {
			var children, index, map;

			if (anchor.nodeType === ELEMENT_NODE$2) {
				children = anchor.parentNode.children;
				map = this.normalizedMap(children, ELEMENT_NODE$2, ignoreClass);
			} else {
				children = anchor.parentNode.childNodes;
				// Inside an ignored node
				if (anchor.parentNode.classList.contains(ignoreClass)) {
					anchor = anchor.parentNode;
					children = anchor.parentNode.childNodes;
				}
				map = this.normalizedMap(children, TEXT_NODE$2, ignoreClass);
			}

			index = Array.prototype.indexOf.call(children, anchor);

			return map[index];
		}

		stepsToXpath(steps) {
			var xpath = [".", "*"];

			steps.forEach(function (step) {
				var position = step.index + 1;

				if (step.id) {
					xpath.push("*[position()=" + position + " and @id='" + step.id + "']");
				} else if (step.type === "text") {
					xpath.push("text()[" + position + "]");
				} else {
					xpath.push("*[" + position + "]");
				}
			});

			return xpath.join("/");
		}

		/*
	 	To get the last step if needed:
	 	// Get the terminal step
	 lastStep = steps[steps.length-1];
	 // Get the query string
	 query = this.stepsToQuery(steps);
	 // Find the containing element
	 startContainerParent = doc.querySelector(query);
	 // Find the text node within that element
	 if(startContainerParent && lastStep.type == "text") {
	 	container = startContainerParent.childNodes[lastStep.index];
	 }
	 */
		stepsToQuerySelector(steps) {
			var query = ["html"];

			steps.forEach(function (step) {
				var position = step.index + 1;

				if (step.id) {
					query.push("#" + step.id);
				} else if (step.type === "text") {
					// unsupported in querySelector
					// query.push("text()[" + position + "]");
				} else {
					query.push("*:nth-child(" + position + ")");
				}
			});

			return query.join(">");
		}

		textNodes(container, ignoreClass) {
			return Array.prototype.slice.call(container.childNodes).filter(function (node) {
				if (node.nodeType === TEXT_NODE$2) {
					return true;
				} else if (ignoreClass && node.classList.contains(ignoreClass)) {
					return true;
				}
				return false;
			});
		}

		walkToNode(steps, _doc, ignoreClass) {
			var doc = _doc || document;
			var container = doc.documentElement;
			var children;
			var step;
			var len = steps.length;
			var i;

			for (i = 0; i < len; i++) {
				step = steps[i];

				if (step.type === "element") {
					//better to get a container using id as some times step.index may not be correct
					//For ex.https://github.com/futurepress/epub.js/issues/561
					if (step.id) {
						container = doc.getElementById(step.id);
					} else {
						children = container.children || findChildren(container);
						container = children[step.index];
					}
				} else if (step.type === "text") {
					container = this.textNodes(container, ignoreClass)[step.index];
				}
				if (!container) {
					//Break the for loop as due to incorrect index we can get error if
					//container is undefined so that other functionailties works fine
					//like navigation
					break;
				}
			}

			return container;
		}

		findNode(steps, _doc, ignoreClass) {
			var doc = _doc || document;
			var container;
			var xpath;

			if (!ignoreClass && typeof doc.evaluate != "undefined") {
				xpath = this.stepsToXpath(steps);
				container = doc.evaluate(xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			} else if (ignoreClass) {
				container = this.walkToNode(steps, doc, ignoreClass);
			} else {
				container = this.walkToNode(steps, doc);
			}

			return container;
		}

		fixMiss(steps, offset, _doc, ignoreClass) {
			var container = this.findNode(steps.slice(0, -1), _doc, ignoreClass);
			var children = container.childNodes;
			var map = this.normalizedMap(children, TEXT_NODE$2, ignoreClass);
			var child;
			var len;
			var lastStepIndex = steps[steps.length - 1].index;

			for (let childIndex in map) {
				if (!map.hasOwnProperty(childIndex)) return;

				if (map[childIndex] === lastStepIndex) {
					child = children[childIndex];
					len = child.textContent.length;
					if (offset > len) {
						offset = offset - len;
					} else {
						if (child.nodeType === ELEMENT_NODE$2) {
							container = child.childNodes[0];
						} else {
							container = child;
						}
						break;
					}
				}
			}

			return {
				container: container,
				offset: offset
			};
		}

		/**
	  * Creates a DOM range representing a CFI
	  * @param {document} _doc document referenced in the base
	  * @param {string} [ignoreClass]
	  * @return {Range}
	  */
		toRange(_doc, ignoreClass) {
			var doc = _doc || document;
			var range;
			var start, end, startContainer, endContainer;
			var cfi = this;
			var startSteps, endSteps;
			var needsIgnoring = ignoreClass ? doc.querySelector("." + ignoreClass) != null : false;
			var missed;

			if (typeof doc.createRange !== "undefined") {
				range = doc.createRange();
			} else {
				range = new RangeObject();
			}

			if (cfi.range) {
				start = cfi.start;
				startSteps = cfi.path.steps.concat(start.steps);
				startContainer = this.findNode(startSteps, doc, needsIgnoring ? ignoreClass : null);
				end = cfi.end;
				endSteps = cfi.path.steps.concat(end.steps);
				endContainer = this.findNode(endSteps, doc, needsIgnoring ? ignoreClass : null);
			} else {
				start = cfi.path;
				startSteps = cfi.path.steps;
				startContainer = this.findNode(cfi.path.steps, doc, needsIgnoring ? ignoreClass : null);
			}

			if (startContainer) {
				try {

					if (start.terminal.offset != null) {
						range.setStart(startContainer, start.terminal.offset);
					} else {
						range.setStart(startContainer, 0);
					}
				} catch (e) {
					missed = this.fixMiss(startSteps, start.terminal.offset, doc, needsIgnoring ? ignoreClass : null);
					range.setStart(missed.container, missed.offset);
				}
			} else {
				console.log("No startContainer found for", this.toString());
				// No start found
				return null;
			}

			if (endContainer) {
				try {

					if (end.terminal.offset != null) {
						range.setEnd(endContainer, end.terminal.offset);
					} else {
						range.setEnd(endContainer, 0);
					}
				} catch (e) {
					missed = this.fixMiss(endSteps, cfi.end.terminal.offset, doc, needsIgnoring ? ignoreClass : null);
					range.setEnd(missed.container, missed.offset);
				}
			}

			// doc.defaultView.getSelection().addRange(range);
			return range;
		}

		/**
	  * Check if a string is wrapped with "epubcfi()"
	  * @param {string} str
	  * @returns {boolean}
	  */
		isCfiString(str) {
			if (typeof str === "string" && str.indexOf("epubcfi(") === 0 && str[str.length - 1] === ")") {
				return true;
			}

			return false;
		}

		generateChapterComponent(_spineNodeIndex, _pos, id) {
			var pos = parseInt(_pos),
			    spineNodeIndex = (_spineNodeIndex + 1) * 2,
			    cfi = "/" + spineNodeIndex + "/";

			cfi += (pos + 1) * 2;

			if (id) {
				cfi += "[" + id + "]";
			}

			return cfi;
		}

		/**
	  * Collapse a CFI Range to a single CFI Position
	  * @param {boolean} [toStart=false]
	  */
		collapse(toStart) {
			if (!this.range) {
				return;
			}

			this.range = false;

			if (toStart) {
				this.path.steps = this.path.steps.concat(this.start.steps);
				this.path.terminal = this.start.terminal;
			} else {
				this.path.steps = this.path.steps.concat(this.end.steps);
				this.path.terminal = this.end.terminal;
			}
		}
	}

	/**
	 * Hooks allow for injecting functions that must all complete in order before finishing
	 * They will execute in parallel but all must finish before continuing
	 * Functions may return a promise if they are asycn.
	 * @param {any} context scope of this
	 * @example this.content = new EPUBJS.Hook(this);
	 */
	class Hook {
		constructor(context) {
			this.context = context || this;
			this.hooks = [];
		}

		/**
	  * Adds a function to be run before a hook completes
	  * @example this.content.register(function(){...});
	  */
		register() {
			for (var i = 0; i < arguments.length; ++i) {
				if (typeof arguments[i] === "function") {
					this.hooks.push(arguments[i]);
				} else {
					// unpack array
					for (var j = 0; j < arguments[i].length; ++j) {
						this.hooks.push(arguments[i][j]);
					}
				}
			}
		}

		/**
	  * Triggers a hook to run all functions
	  * @example this.content.trigger(args).then(function(){...});
	  */
		trigger() {
			var args = arguments;
			var context = this.context;
			var promises = [];

			this.hooks.forEach(function (task) {
				var executing = task.apply(context, args);

				if (executing && typeof executing["then"] === "function") {
					// Task is a function that returns a promise
					promises.push(executing);
				}
				// Otherwise Task resolves immediately, continue
			});

			return Promise.all(promises);
		}

		// Adds a function to be run before a hook completes
		list() {
			return this.hooks;
		}

		clear() {
			return this.hooks = [];
		}
	}

	function replaceBase(doc, section) {
		var base;
		var head;
		var url = section.href;
		var absolute = url.indexOf("://") > -1;

		if (!doc) {
			return;
		}

		head = qs(doc, "head");
		base = qs(head, "base");

		if (!base) {
			base = doc.createElement("base");
			head.insertBefore(base, head.firstChild);
		}

		// Fix for Safari crashing if the url doesn't have an origin
		if (!absolute && typeof window !== "undefined" && window.location) {
			let parts = window.location.href.split("/");
			let directory = "";

			parts.pop();
			directory = parts.join("/");

			url = directory + url;
		}

		base.setAttribute("href", url);
	}

	function replaceCanonical(doc, section) {
		var head;
		var link;
		var url = section.canonical || section.href;

		if (!doc) {
			return;
		}

		head = qs(doc, "head");
		link = qs(head, "link[rel='canonical']");

		if (link) {
			link.setAttribute("href", url);
		} else {
			link = doc.createElement("link");
			link.setAttribute("rel", "canonical");
			link.setAttribute("href", url);
			head.appendChild(link);
		}
	}

	function replaceMeta(doc, section) {
		var head;
		var meta;
		var id = section.idref || section.href;
		if (!doc) {
			return;
		}

		head = qs(doc, "head");
		meta = qs(head, "link[property='dc.identifier']");

		if (meta) {
			meta.setAttribute("content", id);
		} else {
			meta = doc.createElement("meta");
			meta.setAttribute("name", "dc.identifier");
			meta.setAttribute("content", id);
			head.appendChild(meta);
		}
	}

	function request(url, type$$1, withCredentials, headers) {
		var supportsURL = typeof window != "undefined" ? window.URL : false; // TODO: fallback for url if window isn't defined
		var BLOB_RESPONSE = supportsURL ? "blob" : "arraybuffer";

		var deferred = new defer();

		var xhr = new XMLHttpRequest();

		//-- Check from PDF.js:
		//   https://github.com/mozilla/pdf.js/blob/master/web/compatibility.js
		var xhrPrototype = XMLHttpRequest.prototype;

		var header;

		if (!("overrideMimeType" in xhrPrototype)) {
			// IE10 might have response, but not overrideMimeType
			Object.defineProperty(xhrPrototype, "overrideMimeType", {
				value: function xmlHttpRequestOverrideMimeType() {}
			});
		}

		if (withCredentials) {
			xhr.withCredentials = true;
		}

		xhr.onreadystatechange = handler;
		xhr.onerror = err;

		xhr.open("GET", url, true);

		for (header in headers) {
			xhr.setRequestHeader(header, headers[header]);
		}

		if (type$$1 == "json") {
			xhr.setRequestHeader("Accept", "application/json");
		}

		// If type isn"t set, determine it from the file extension
		if (!type$$1) {
			type$$1 = new Path(url).extension;
		}

		if (type$$1 == "blob") {
			xhr.responseType = BLOB_RESPONSE;
		}

		if (isXml(type$$1)) {
			// xhr.responseType = "document";
			xhr.overrideMimeType("text/xml"); // for OPF parsing
		}

		if (type$$1 == "binary") {
			xhr.responseType = "arraybuffer";
		}

		xhr.send();

		function err(e) {
			deferred.reject(e);
		}

		function handler() {
			if (this.readyState === XMLHttpRequest.DONE) {
				var responseXML = false;

				if (this.responseType === "" || this.responseType === "document") {
					responseXML = this.responseXML;
				}

				if (this.status === 200 || responseXML) {
					//-- Firefox is reporting 0 for blob urls
					var r;

					if (!this.response && !responseXML) {
						deferred.reject({
							status: this.status,
							message: "Empty Response",
							stack: new Error().stack
						});
						return deferred.promise;
					}

					if (this.status === 403) {
						deferred.reject({
							status: this.status,
							response: this.response,
							message: "Forbidden",
							stack: new Error().stack
						});
						return deferred.promise;
					}
					if (responseXML) {
						r = this.responseXML;
					} else if (isXml(type$$1)) {
						// xhr.overrideMimeType("text/xml"); // for OPF parsing
						// If this.responseXML wasn't set, try to parse using a DOMParser from text
						r = parse$1(this.response, "text/xml");
					} else if (type$$1 == "xhtml") {
						r = parse$1(this.response, "application/xhtml+xml");
					} else if (type$$1 == "html" || type$$1 == "htm") {
						r = parse$1(this.response, "text/html");
					} else if (type$$1 == "json") {
						r = JSON.parse(this.response);
					} else if (type$$1 == "blob") {

						if (supportsURL) {
							r = this.response;
						} else {
							//-- Safari doesn't support responseType blob, so create a blob from arraybuffer
							r = new Blob([this.response]);
						}
					} else {
						r = this.response;
					}

					deferred.resolve(r);
				} else {

					deferred.reject({
						status: this.status,
						message: this.response,
						stack: new Error().stack
					});
				}
			}
		}

		return deferred.promise;
	}

	/**
	 * Represents a Section of the Book
	 *
	 * In most books this is equivelent to a Chapter
	 * @param {object} item  The spine item representing the section
	 * @param {object} hooks hooks for serialize and content
	 * @param {object} settings
	 * @param {object} settings.replacements
	 */
	class Section {
		constructor(item, hooks, settings) {
			this.item = item;
			this.idref = item.idref;
			this.linear = item.linear === "yes";
			this.properties = item.properties;
			this.index = item.index;
			this.href = item.href;
			this.source = item.source;
			this.canonical = item.canonical;
			this.type = item.type;
			this.next = item.next;
			this.prev = item.prev;

			this.cfiBase = item.cfiBase;

			if (hooks) {
				this.hooks = hooks;
			} else {
				this.hooks = {};
				this.hooks.serialize = new Hook(this);
				this.hooks.content = new Hook(this);
			}

			this.document = undefined;
			this.contents = undefined;
			this.output = undefined;

			this.originalHref = undefined;

			this.settings = settings || {};
		}

		/**
	  * Load the section from its url
	  * @param  {method} _request a request method to use for loading
	  * @return {document} a promise with the xml document
	  */
		load(_request) {
			var request$$1 = _request || this.request || request;
			var loading = new defer();
			var loaded = loading.promise;

			if (this.contents) {
				loading.resolve(this.contents);
			} else {
				let type$$1 = this.type === "application/xhtml+xml" ? "xhtml" : "html";
				request$$1(this.href, type$$1).then(function (xml) {
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
		base() {
			return replaceBase(this.document, this);
		}

		/**
	  * Render the contents of a section
	  * @param  {method} _request a request method to use for loading
	  * @return {string} output a serialized XML Document
	  */
		render(_request) {
			var rendering = new defer();
			var rendered = rendering.promise;
			this.output; // TODO: better way to return this from hooks?

			this.load(_request).then(function (contents) {
				var userAgent = typeof navigator !== "undefined" && navigator.userAgent || "";
				var isIE = userAgent.indexOf("Trident") >= 0;
				var Serializer;
				if (typeof XMLSerializer === "undefined" || isIE) {
					Serializer = domParser.XMLSerializer;
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
		find(_query) {
			var section = this;
			var matches = [];
			var query = _query.toLowerCase();
			var find = function (node) {
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

			sprint(section.document, function (node) {
				find(node);
			});

			return matches;
		}

		/**
	 * Reconciles the current chapters layout properties with
	 * the global layout properties.
	 * @param {object} global  The globa layout settings object, chapter properties string
	 * @return {object} layoutProperties Object with layout properties
	 */
		reconcileLayoutSettings(global) {
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
		cfiFromRange(_range) {
			return new EpubCFI(_range, this.cfiBase).toString();
		}

		/**
	  * Get a CFI from an Element in the Section
	  * @param  {element} el
	  * @return {string} cfi an EpubCFI string
	  */
		cfiFromElement(el) {
			return new EpubCFI(el, this.cfiBase).toString();
		}

		/**
	  * Unload the section document
	  */
		unload() {
			this.document = undefined;
			this.contents = undefined;
			this.output = undefined;
		}

		/**
	  * Return an object representation of the item
	  * @return {object}
	  */
		toObject() {
			return {
				idref: this.idref,
				linear: this.linear ? "yes" : "no",
				href: this.href,
				source: this.source,
				type: this.type,
				canonical: this.canonical,
				cfiBase: this.cfiBase
			};
		}

		/**
	  * Create a url from the content
	  */
		createUrl(request$$1) {
			//var parsedUrl = new Url(url);
			//var mimeType = mime.lookup(parsedUrl.filename);
			let mimeType = this.type;

			return this.render(request$$1).then(text => {
				return new Blob([text], { type: mimeType });
			}).then(blob => {
				if (this.settings.replacements && this.settings.replacements === "base64") {
					return blob2base64(blob).then(blob => {
						return createBase64Url(blob, mimeType);
					});
				} else {
					return createBlobUrl(blob, mimeType);
				}
			}).then(url => {
				this.originalHref = this.href;
				this.href = url;

				this.unload();

				return url;
			});
		}

		destroy() {
			this.unload();
			this.hooks.serialize.clear();
			this.hooks.content.clear();

			if (this.originalHref) {
				revokeBlobUrl(this.href);
			}

			this.hooks = undefined;
			this.idref = undefined;
			this.linear = undefined;
			this.properties = undefined;
			this.index = undefined;
			this.href = undefined;
			this.source = undefined;
			this.next = undefined;
			this.prev = undefined;

			this.cfiBase = undefined;
		}
	}

	/**
	 * A collection of Spine Items
	 */
	class Spine {
		constructor(items) {
			this.spineItems = [];
			this.spineByHref = {};
			this.spineById = {};

			this.hooks = {};
			this.hooks.serialize = new Hook();
			this.hooks.content = new Hook();

			// Register replacements
			this.hooks.content.register(replaceBase);
			this.hooks.content.register(replaceCanonical);
			this.hooks.content.register(replaceMeta);

			this.epubcfi = new EpubCFI();

			this.loaded = false;

			this.items = undefined;
			this.manifest = undefined;
			this.spineNodeIndex = undefined;
			this.baseUrl = undefined;
			this.length = undefined;

			if (items) {
				this.unpack(items);
			}
		}

		/**
	  * Unpack items from a opf into spine items
	  * @param  {items} items
	  */
		unpack(items) {

			this.items = items;
			this.length = this.items.length;

			this.items.forEach((item, index) => {

				if (item.linear === "yes") {
					item.prev = function () {
						let prevIndex = item.index;
						while (prevIndex > 0) {
							let prev = this.get(prevIndex - 1);
							if (prev && prev.linear) {
								return prev;
							}
							prevIndex -= 1;
						}
						return;
					}.bind(this);
					item.next = function () {
						let nextIndex = item.index;
						while (nextIndex < this.spineItems.length - 1) {
							let next = this.get(nextIndex + 1);
							if (next && next.linear) {
								return next;
							}
							nextIndex += 1;
						}
						return;
					}.bind(this);
				} else {
					item.prev = function () {
						return;
					};
					item.next = function () {
						return;
					};
				}

				let spineItem = new Section(item, this.hooks);

				this.append(spineItem);
			});

			this.loaded = true;
		}

		/**
	  * Get an item from the spine
	  * @param  {string|int} [target]
	  * @return {Section} section
	  * @example spine.get();
	  * @example spine.get(1);
	  * @example spine.get("chap1.html");
	  * @example spine.get("id1234");
	  */
		get(target) {
			let index;

			if (typeof target === "undefined") {
				while (index < this.spineItems.length) {
					let next = this.spineItems[index];
					if (next && next.linear) {
						break;
					}
					index += 1;
				}
			} else if (this.epubcfi.isCfiString(target)) {
				let cfi = new EpubCFI(target);
				index = cfi.spinePos;
			} else if (typeof target === "number" || isNaN(target) === false) {
				index = target;
			} else if (typeof target === "string" && target.indexOf("#") === 0) {
				index = this.spineById[target.substring(1)];
			} else if (typeof target === "string") {
				// Remove fragments
				target = target.split("#")[0];

				if (this.spineById[target] !== undefined) {
					index = this.spineById[target];
				} else if (this.spineById[target] !== undefined) {
					index = this.spineByHref[target];
				} else {
					index = this.spineByHref[encodeURI(target)];
				}
			}

			if (index != undefined) {
				return this.spineItems[index];
			}
		}

		/**
	  * Append a Section to the Spine
	  * @private
	  * @param  {Section} section
	  */
		append(section) {
			var index = this.spineItems.length;
			section.index = index;

			this.spineItems.push(section);

			// Encode and Decode href lookups
			// see pr for details: https://github.com/futurepress/epub.js/pull/358
			this.spineByHref[decodeURI(section.href)] = index;
			this.spineByHref[encodeURI(section.href)] = index;
			this.spineByHref[section.href] = index;

			if (section.source) {
				this.spineByHref[section.source] = index;
			}

			this.spineById[section.idref] = index;

			return index;
		}

		/**
	  * Prepend a Section to the Spine
	  * @private
	  * @param  {Section} section
	  */
		prepend(section) {
			// var index = this.spineItems.unshift(section);
			this.spineByHref[section.href] = 0;
			this.spineById[section.idref] = 0;

			// Re-index
			this.spineItems.forEach(function (item, index) {
				item.index = index;
			});

			return 0;
		}

		// insert(section, index) {
		//
		// };

		/**
	  * Remove a Section from the Spine
	  * @private
	  * @param  {Section} section
	  */
		remove(section) {
			var index = this.spineItems.indexOf(section);

			if (index > -1) {
				delete this.spineByHref[section.href];
				delete this.spineById[section.idref];

				return this.spineItems.splice(index, 1);
			}
		}

		/**
	  * Loop over the Sections in the Spine
	  * @return {method} forEach
	  */
		each() {
			return this.spineItems.forEach.apply(this.spineItems, arguments);
		}

		/**
	  * Map the Sections in the Spine
	  * @return {method} map
	  */
		map() {
			return this.spineItems.map.apply(this.spineItems, arguments);
		}

		first() {
			let index = 0;

			do {
				let next = this.get(index);

				if (next && next.linear) {
					return next;
				}
				index += 1;
			} while (index < this.spineItems.length);
		}

		last() {
			let index = this.spineItems.length - 1;

			do {
				let prev = this.get(index);
				if (prev && prev.linear) {
					return prev;
				}
				index -= 1;
			} while (index >= 0);
		}

		/**
	  * Export an Array of all Spine Items
	  * @return {array}
	  */
		toArray() {
			return this.spineItems.map(function (item, index) {
				return item.toObject();
			});
		}

		toJSON() {
			return JSON.stringify(this.toArray());
		}

		destroy() {
			this.each(section => section.destroy());

			this.spineItems = undefined;
			this.spineByHref = undefined;
			this.spineById = undefined;

			this.hooks.serialize.clear();
			this.hooks.content.clear();
			this.hooks = undefined;

			this.epubcfi = undefined;

			this.loaded = false;

			this.items = undefined;
			this.manifest = undefined;
			this.spineNodeIndex = undefined;
			this.baseUrl = undefined;
			this.length = undefined;
		}
	}

	/**
	 * Queue for handling tasks one at a time
	 * @class
	 * @param {scope} context what this will resolve to in the tasks
	 */
	class Queue {
		constructor(context) {
			this._q = [];
			this.context = context;
			this.tick = requestAnimationFrame;
			this.running = false;
			this.paused = false;
		}

		/**
	  * Add an item to the queue
	  * @return {Promise}
	  */
		enqueue() {
			var deferred, promise;
			var queued;
			var task = [].shift.call(arguments);
			var args = arguments;

			// Handle single args without context
			// if(args && !Array.isArray(args)) {
			//   args = [args];
			// }
			if (!task) {
				throw new Error("No Task Provided");
			}

			if (typeof task === "function") {

				deferred = new defer();
				promise = deferred.promise;

				queued = {
					"task": task,
					"args": args,
					//"context"  : context,
					"deferred": deferred,
					"promise": promise
				};
			} else {
				// Task is a promise
				queued = {
					"promise": task
				};
			}

			this._q.push(queued);

			// Wait to start queue flush
			if (this.paused == false && !this.running) {
				// setTimeout(this.flush.bind(this), 0);
				// this.tick.call(window, this.run.bind(this));
				this.run();
			}

			return queued.promise;
		}

		/**
	  * Run one item
	  * @return {Promise}
	  */
		dequeue() {
			var inwait, task, result;

			if (this._q.length && !this.paused) {
				inwait = this._q.shift();
				task = inwait.task;
				if (task) {
					// console.log(task)

					result = task.apply(this.context, inwait.args);

					if (result && typeof result["then"] === "function") {
						// Task is a function that returns a promise
						return result.then(function () {
							inwait.deferred.resolve.apply(this.context, arguments);
						}.bind(this), function () {
							inwait.deferred.reject.apply(this.context, arguments);
						}.bind(this));
					} else {
						// Task resolves immediately
						inwait.deferred.resolve.apply(this.context, result);
						return inwait.promise;
					}
				} else if (inwait.promise) {
					// Task is a promise
					return inwait.promise;
				}
			} else {
				inwait = new defer();
				inwait.deferred.resolve();
				return inwait.promise;
			}
		}

		// Run All Immediately
		dump() {
			while (this._q.length) {
				this.dequeue();
			}
		}

		/**
	  * Run all tasks sequentially, at convince
	  * @return {Promise}
	  */
		run() {

			if (!this.running) {
				this.running = true;
				this.defered = new defer();
			}

			this.tick.call(window, () => {

				if (this._q.length) {

					this.dequeue().then(function () {
						this.run();
					}.bind(this));
				} else {
					this.defered.resolve();
					this.running = undefined;
				}
			});

			// Unpause
			if (this.paused == true) {
				this.paused = false;
			}

			return this.defered.promise;
		}

		/**
	  * Flush all, as quickly as possible
	  * @return {Promise}
	  */
		flush() {

			if (this.running) {
				return this.running;
			}

			if (this._q.length) {
				this.running = this.dequeue().then(function () {
					this.running = undefined;
					return this.flush();
				}.bind(this));

				return this.running;
			}
		}

		/**
	  * Clear all items in wait
	  */
		clear() {
			this._q = [];
		}

		/**
	  * Get the number of tasks in the queue
	  * @return {int} tasks
	  */
		length() {
			return this._q.length;
		}

		/**
	  * Pause a running queue
	  */
		pause() {
			this.paused = true;
		}

		/**
	  * End the queue
	  */
		stop() {
			this._q = [];
			this.running = false;
			this.paused = true;
		}
	}

	const EPUBJS_VERSION = "0.4";

	const EVENTS = {
		BOOK: {
			OPEN_FAILED: "openFailed",
			READY: "ready"
		},
		CONTENTS: {
			EXPAND: "expand",
			RESIZE: "resize",
			SELECTED: "selected",
			SELECTED_RANGE: "selectedRange",
			LINK_CLICKED: "linkClicked"
		},
		LOCATIONS: {
			CHANGED: "changed"
		},
		MANAGERS: {
			RESIZE: "resize",
			RESIZED: "resized",
			ORIENTATION_CHANGE: "orientationchange",
			ADDED: "added",
			SCROLL: "scroll",
			SCROLLED: "scrolled"
		},
		VIEWS: {
			AXIS: "axis",
			LOAD_ERROR: "loaderror",
			RENDERED: "rendered",
			RESIZED: "resized",
			DISPLAYED: "displayed",
			SHOWN: "shown",
			HIDDEN: "hidden",
			MARK_CLICKED: "markClicked"
		},
		RENDITION: {
			STARTED: "started",
			ATTACHED: "attached",
			DISPLAYED: "displayed",
			DISPLAY_ERROR: "displayerror",
			RENDERED: "rendered",
			REMOVED: "removed",
			RESIZED: "resized",
			ORIENTATION_CHANGE: "orientationchange",
			LOCATION_CHANGED: "locationChanged",
			RELOCATED: "relocated",
			MARK_CLICKED: "markClicked",
			SELECTED: "selected",
			LAYOUT: "layout",
			WORKER_FAILED: "workerFailed",
			WORKER_INACTIVE: "workerInactive"
		},
		LAYOUT: {
			UPDATED: "updated"
		}
	};

	/**
	 * Locators
	 * @param {object} [manifest]
	 */
	class Locators {
		constructor(manifest) {
			if (manifest) {
				this.unpack(manifest);
			}
		}

		unpack(manifest) {
			if (manifest.locations) {
				this.unpackLocations(manifest.locations);
			}

			if (manifest.pages) {
				this.unpackPages(manifest.page);
			}
		}

		unpackLocations(locations) {
			this.locations = locations;
			this.totalLocations = this.locations.length - 1;
		}

		unpackPages(pages) {
			this.pages = pages;
			this.firstPage = parseInt(this.pages[0]);
			this.lastPage = parseInt(this.pages[this.pages.length - 1]);
			this.totalPages = this.lastPage - this.firstPage;

			pages.forEach(item => {
				if (item.cfi) {
					this.pageLocations.push(item.cfi);
				}
			});
		}

		/**
	  * Get a location from an EpubCFI
	  * @param {EpubCFI} cfi
	  * @return {number}
	  */
		locationFromCfi(cfi) {
			let loc;
			if (EpubCFI.prototype.isCfiString(cfi)) {
				cfi = new EpubCFI(cfi);
			}
			// Check if the location has not been set yet
			if (this.locations.length === 0) {
				return -1;
			}

			loc = locationOf(cfi, this.locations, EpubCFI.prototype.compare);

			if (loc > this.totalLocations) {
				return this.totalLocations;
			}

			return loc;
		}

		/**
	  * Get a percentage position in locations from an EpubCFI
	  * @param {EpubCFI} cfi
	  * @return {number}
	  */
		percentageFromCfi(cfi) {
			if (this.locations.length === 0) {
				return null;
			}
			// Find closest cfi
			var loc = this.locationFromCfi(cfi);
			// Get percentage in total
			return this.percentageFromLocation(loc);
		}

		/**
	  * Get a percentage position from a location index
	  * @param {number} location
	  * @return {number}
	  */
		percentageFromLocation(loc) {
			if (!loc || !this.totalLocations) {
				return 0;
			}

			return loc / this.totalLocations;
		}

		/**
	  * Get an EpubCFI from location index
	  * @param {number} loc
	  * @return {EpubCFI} cfi
	  */
		cfiFromLocation(loc) {
			var cfi = -1;
			// check that pg is an int
			if (typeof loc != "number") {
				loc = parseInt(loc);
			}

			if (loc >= 0 && loc < this.locations.length) {
				cfi = this.locations[loc];
			}

			return cfi;
		}

		/**
	  * Get an EpubCFI from location percentage
	  * @param {number} percentage
	  * @return {EpubCFI} cfi
	  */
		cfiFromPercentage(percentage) {
			let loc;
			if (percentage > 1) {
				console.warn("Normalize cfiFromPercentage value to between 0 - 1");
			}

			// Make sure 1 goes to very end
			if (percentage >= 1) {
				let cfi = new EpubCFI(this.locations[this.totalLocations]);
				cfi.collapse();
				return cfi.toString();
			}

			loc = Math.ceil(this.totalLocations * percentage);
			return this.cfiFromLocation(loc);
		}

		/**
	  * Get a PageList result from a EpubCFI
	  * @param  {string} cfi EpubCFI String
	  * @return {string} page
	  */
		pageFromCfi(cfi) {
			var pg = -1;

			// Check if the pageList has not been set yet
			if (!this.pageLocations || this.pageLocations.length === 0) {
				return -1;
			}

			// check if the cfi is in the location list
			var index = indexOfSorted(cfi, this.pageLocations, EpubCFI.prototype.compare);
			if (index != -1) {
				pg = this.pages[index];
			} else {
				// Otherwise add it to the list of locations
				// Insert it in the correct position in the locations page
				index = locationOf(cfi, this.pageLocations, EpubCFI.prototype.compare);
				// Get the page at the location just before the new one, or return the first
				pg = index - 1 >= 0 ? this.pages[index - 1] : this.pages[0];
				if (pg !== undefined) {
					// Add the new page in so that the locations and page array match up
					//this.pages.splice(index, 0, pg);
				} else {
					pg = -1;
				}
			}
			return pg;
		}

		/**
	  * Get an EpubCFI from a Page List Item
	  * @param  {string} pg
	  * @return {string} cfi
	  */
		cfiFromPage(pg) {
			var cfi = -1;
			// check that pg is an int
			if (typeof pg != "number") {
				pg = parseInt(pg);
			}

			// check if the cfi is in the page list
			// Pages could be unsorted.
			var index = this.pages.indexOf(pg);
			if (index != -1) {
				cfi = this.pageLocations[index];
			}
			// TODO: handle pages not in the list
			return cfi;
		}

		/**
	  * Get a Page from Book percentage
	  * @param  {number} percent
	  * @return {string} page
	  */
		pageFromPercentage(percent) {
			var pg = Math.round(this.totalPages * percent);
			return pg;
		}

		/**
	  * Returns a value between 0 - 1 corresponding to the location of a page
	  * @param  {int} pg the page
	  * @return {number} percentage
	  */
		percentageFromPage(pg) {
			var percentage = (pg - this.firstPage) / this.totalPages;
			return Math.round(percentage * 1000) / 1000;
		}

		/**
	  * Returns a value between 0 - 1 corresponding to the location of a cfi
	  * @param  {string} cfi EpubCFI String
	  * @return {number} percentage
	  */
		percentagePageFromCfi(cfi) {
			var pg = this.pageFromCfi(cfi);
			var percentage = this.percentageFromPage(pg);
			return percentage;
		}

		destroy() {}
	}

	eventEmitter(Locators.prototype);

	/**
	 * Navigation wrapper
	 * @param {[object]} manifest
	 */
	class Navigation {
		constructor(manifest) {
			this.toc = [];
			this.tocByHref = {};
			this.tocById = {};

			this.landmarks = [];
			this.landmarksByType = {};

			if (manifest) {
				this.unpack(manifest);
			}
		}

		/**
	  * Get an item from the navigation
	  * @param  {string} target
	  * @return {object} navItems
	  */
		get(target) {
			var index;

			if (!target) {
				return this.toc;
			}

			if (target.indexOf("#") === 0) {
				index = this.tocById[target.substring(1)];
			} else if (target in this.tocByHref) {
				index = this.tocByHref[target];
			}

			return this.toc[index];
		}

		/**
	  * Get a landmark by type
	  * List of types: https://idpf.github.io/epub-vocabs/structure/
	  * @param  {string} type
	  * @return {object} landmarkItems
	  */
		landmark(type$$1) {
			let index;

			index = this.landmarksByType[type$$1];

			return this.landmarks[index];
		}

		/**
	  * Unpack manifest object
	  */
		unpack(manifest) {
			if (manifest.toc) {
				this.unpackToc(manifest.toc);
			}

			if (manifest.landmarks) {
				this.unpackLandmarks(manifest.landmarks);
			}
		}

		unpackToc(toc) {
			this.toc = toc;
			toc.forEach((item, index) => {
				this.tocByHref[item.href] = index;
				if (item.source) {
					this.tocByHref[item.href] = index;
				}
				if (item.id) {
					this.tocId[item.id] = index;
				}
			});
		}

		unpackLandmarks(landmarks) {
			this.landmarks = landmarks;
			landmarks.forEach((item, index) => {
				this.landmarksByType[item.type] = index;
			});
		}

		destroy() {
			this.toc = undefined;
			this.tocByHref = undefined;
			this.tocById = undefined;

			this.landmarks = undefined;
			this.landmarksByType = undefined;
		}
	}

	/**
	 * An Epub Book representation with methods for the loading and manipulation
	 * of its contents.
	 * @class
	 * @param {json | object} [manifest]
	 * @returns {Book}
	 * @example new Book(manifest)
	 */
	class Book {
		constructor(manifest) {

			/**
	   * @member {Spine} sections
	   * @memberof Book
	   */
			this.sections = new Spine();

			/**
	   * @member {Navigation} navigation
	   * @memberof Book
	   */
			this.navigation = new Navigation();

			/**
	   * @member {Locators} locators
	   * @memberof Book
	   */
			this.locators = new Locators();

			/**
	   * @member {object} manifest
	   * @memberof Book
	   */
			this.manifest = {
				"@context": "http://readium.org/webpub/default.jsonld",
				metadata: {
					"@type": "http://schema.org/Book"
				},
				resources: [],
				toc: [],
				landmarks: [],
				locations: [],
				pages: [],
				spine: [],
				links: []
			};

			if (manifest) {
				this.parse(manifest);
			}
		}

		parse(manifest) {
			if (!manifest) {
				return;
			}

			if (typeof manifest === "string") {
				manifest = JSON.parse(manifest);
			}

			let {
				metadata,
				resources,
				toc,
				landmarks,
				locations,
				pages,
				spine,
				links
			} = manifest;

			this.metadata = metadata;
			this.resources = resources;
			this.spine = spine;
			this.toc = toc;
			this.landmarks = landmarks;
			this.locations = locations;
			this.pages = pages;
			this.links = links;
		}

		/**
	  * Get or set the Url
	  * @param {string} [url]
	  * @return {string} href
	  */
		get url() {
			let selfLink = this.manifest.links.find(link => {
				return link.rel === "self";
			});
			return selfLink && selfLink.href;
		}

		set url(url) {
			let selfLink = this.manifest.links.find(link => {
				return link.rel === "self";
			});

			if (selfLink) {
				selfLink.href = url;
			} else {
				selfLink = {
					rel: "self",
					href: url,
					type: "application/webpub+json"
				};
				this.manifest.links.push(selfLink);
			}

			// Set the Path object for resolving links
			this.path = selfLink.href;

			return selfLink && selfLink.href;
		}

		/**
	  * Get or set the Path to resolve content
	  * @param {string} [url]
	  * @return {string} Path
	  */
		get path() {
			return this._path;
		}

		set path(url) {
			let uri = new Url(url);
			this._path = uri.Path;
			return this._path;
		}

		/**
	  * Get or set the Spine
	  * @param {array} [spineItems]
	  * @return {array} spineItems
	  */
		get spine() {
			return this.manifest.spine;
		}

		set spine(items) {
			if (!items) {
				return;
			}
			this.sections.unpack(items);

			this.manifest.spine = items;

			return this.manifest.spine;
		}

		/**
	  * Gets a Section of the Book from the Spine
	  * Alias for `book.spine.get`
	  * @param {string} target
	  * @return {Section}
	  */
		section(target) {
			return this.sections.get(target);
		}

		/**
	  * Get or set the cover url
	  * @param {string} [coverUrl]
	  * @return {string} coverUrl
	  */
		get cover() {
			let coverLink = this.manifest.links.find(link => {
				return link.rel === "cover";
			});
			return coverLink && coverLink.href;
		}

		set cover(url) {
			let coverLink = this.manifest.links.find(link => {
				return link.rel === "cover";
			});

			if (coverLink) {
				coverLink.href = url;
			} else {
				coverLink = {
					rel: "cover",
					href: url
				};
				this.manifest.links.push(coverLink);
			}
			return coverLink && coverLink.href;
		}

		/**
	  * Get or set the metadata
	  * @param {object} [metadata]
	  * @return {object} metadata
	  */
		get metadata() {
			return this.manifest.metadata;
		}

		set metadata(metadata) {
			if (!metadata) {
				return;
			}
			this.manifest.metadata = metadata;

			// Set metadata type
			if (!metadata["@type"]) {
				this.manifest.metadata["@type"] = "http://schema.org/Book";
			}

			return this.manifest.metadata;
		}

		/**
	  * Get or set the resources
	  * @param {object} [resources]
	  * @return {object} resources
	  */
		get resources() {
			return this.manifest.resources;
		}

		set resources(resources) {
			if (!resources) {
				return;
			}
			this.manifest.resources = resources.map(item => {

				// Add Cover Rel
				if (item.properties && item.properties.length) {

					if (item.properties.indexOf("cover-image") > -1) {
						item.rel = "cover";
					}

					// Add Contents Rel
					if (item.properties.indexOf("nav") > -1) {
						item.rel = "contents";
					}

					if (item.rel && item.rel === "cover") {
						this.cover = item.href;
					}
				}
				return item;
			});

			return this.manifest.resources;
		}

		/**
	  * Get or set the toc
	  * @param {array} [toc]
	  * @return {array} toc
	  */
		get toc() {
			return this.manifest.toc;
		}

		set toc(toc) {
			if (!toc) {
				return;
			}
			this.navigation.unpackToc(toc);
			return this.manifest.toc = toc;
		}

		/**
	  * Get or set the landmarks
	  * @param {array} [landmarks]
	  * @return {array} landmarks
	  */
		get landmarks() {
			return this.manifest.landmarks;
		}

		set landmarks(landmarks) {
			if (!landmarks) {
				return;
			}
			this.navigation.unpackLandmarks(landmarks);
			return this.manifest.landmarks = landmarks;
		}

		/**
	  * Get or set the locations
	  * @param {array} [locations]
	  * @return {array} locations
	  */
		get locations() {
			return this.manifest.locations;
		}

		set locations(locations) {
			if (!locations) {
				return;
			}
			this.locators.unpackLocations(locations);
			return this.manifest.locations = locations;
		}

		/**
	  * Get or set the pages
	  * @param {array} [pageList]
	  * @return {array} pageList
	  */
		get pages() {
			return this.manifest.pages;
		}

		set pages(pageList) {
			if (!pageList) {
				return;
			}
			this.locators.unpackPages(pageList);
			return this.manifest.pages = pageList;
		}

		/**
	  * Get or set links
	  * @param {array} [links]
	  * @return {array} links
	  */
		get links() {
			return this.manifest.links;
		}

		set links(links) {
			if (!links) {
				return;
			}

			links.forEach(link => {
				if (link.rel === "cover") {
					this.cover = link.href;
				}
				if (link.rel === "self") {
					this.path = link.href;
				}
			});

			return this.manifest.links = links;
		}

		/**
	  * Get or set the source of the book.
	  * If returns with an object, the links in the books have been replaced
	  * with service workers urls, or blob urls
	  * @param {array} [links]
	  * @return {array} links
	  */
		get source() {
			let sourceLink = this.manifest.links.find(link => {
				return link.rel === "source";
			});
			return sourceLink;
		}

		set source(url) {
			let sourceLink = this.manifest.links.find(link => {
				return link.rel === "source";
			});

			if (sourceLink) {
				sourceLink.href = url;
			} else {
				sourceLink = {
					rel: "source",
					href: url,
					type: "application/epub+zip"
				};
				this.manifest.links.push(sourceLink);
			}
			return sourceLink;
		}

		/**
	  * Find a DOM Range for a given CFI Range
	  * @param  {EpubCFI} cfiRange a epub cfi range
	  * @return {Range}
	  */
		getRange(cfiRange) {
			var cfi = new EpubCFI(cfiRange);
			var item = this.sections.get(cfi.spinePos);

			if (!item) {
				return new Promise((resolve, reject) => {
					reject("CFI could not be found");
				});
			}

			return item.load().then(function (contents) {
				var range = cfi.toRange(item.document);
				return range;
			});
		}

		/**
	  * Generates the Book Key using the identifer in the manifest or other string provided
	  * @param  {string} [identifier] to use instead of metadata identifier
	  * @return {string} key
	  */
		key(identifier) {
			var ident = identifier || this.metadata.identifier;
			return `epubjs-${EPUBJS_VERSION}-${ident}`;
		}

		/**
	  * Generates a object representation of the book structure
	  * @return {object}
	  */
		toObject() {
			return this.manifest;
		}

		/**
	  * Generates a JSON output of the book structure
	  */
		toJSON(key) {
			return JSON.stringify(this.manifest);
		}

		/**
	  * Destroy the Book and all associated objects
	  */
		destroy() {
			this.sections && this.sections.destroy();
			this.locators && this.locators.destroy();
			this.navigation && this.navigation.destroy();

			this.sections = undefined;
			this.locators = undefined;
			this.navigation = undefined;

			this.manifest = undefined;
		}

	}

	//-- Enable binding events to book
	eventEmitter(Book.prototype);

	/**
	 * Find Locations for a Book
	 * @param {Spine} spine
	 * @param {request} request
	 */
	class Locations {
		constructor(request, pause) {
			this.request = request;
			this.pause = pause || 100;

			this.q = new Queue(this);
			this.epubcfi = new EpubCFI();

			this._locations = [];
			this.total = 0;

			this.break = 150;

			this._current = 0;

			this.currentLocation = "";
			this._currentCfi = "";
			this.processingTimeout = undefined;
		}

		/**
	  * Load all of sections in the book to generate locations
	  * @param  {int} chars how many chars to split on
	  * @return {object} locations
	  */
		generate(spine, chars) {
			this.spine = spine;

			if (chars) {
				this.break = chars;
			}

			this.q.pause();

			this.spine.each(function (section) {
				if (section.linear) {
					this.q.enqueue(this.process.bind(this), section);
				}
			}.bind(this));

			return this.q.run().then(function () {
				this.total = this._locations.length - 1;

				if (this._currentCfi) {
					this.currentLocation = this._currentCfi;
				}

				return this._locations;
				// console.log(this.percentage(this.book.rendition.location.start), this.percentage(this.book.rendition.location.end));
			}.bind(this));
		}

		createRange() {
			return {
				startContainer: undefined,
				startOffset: undefined,
				endContainer: undefined,
				endOffset: undefined
			};
		}

		process(section) {
			return section.load(this.request).then(function (contents) {
				var completed = new defer();

				var locations = this.parse(contents, section.cfiBase);
				this._locations = this._locations.concat(locations);

				section.unload();

				this.processingTimeout = setTimeout(() => completed.resolve(locations), this.pause);
				return completed.promise;
			}.bind(this));
		}

		parse(contents, cfiBase, chars) {
			var locations = [];
			var range;
			var doc = contents.ownerDocument;
			var body = qs(doc, "body");
			var counter = 0;
			var prev;
			var _break = chars || this.break;
			var parser = function (node) {
				var len = node.length;
				var dist;
				var pos = 0;

				if (node.textContent.trim().length === 0) {
					return false; // continue
				}

				// Start range
				if (counter == 0) {
					range = this.createRange();
					range.startContainer = node;
					range.startOffset = 0;
				}

				dist = _break - counter;

				// Node is smaller than a break,
				// skip over it
				if (dist > len) {
					counter += len;
					pos = len;
				}

				while (pos < len) {
					dist = _break - counter;

					if (counter === 0) {
						// Start new range
						pos += 1;
						range = this.createRange();
						range.startContainer = node;
						range.startOffset = pos;
					}

					// pos += dist;

					// Gone over
					if (pos + dist >= len) {
						// Continue counter for next node
						counter += len - pos;
						// break
						pos = len;
						// At End
					} else {
						// Advance pos
						pos += dist;

						// End the previous range
						range.endContainer = node;
						range.endOffset = pos;
						// cfi = section.cfiFromRange(range);
						let cfi = new EpubCFI(range, cfiBase).toString();
						locations.push(cfi);
						counter = 0;
					}
				}
				prev = node;
			};

			sprint(body, parser.bind(this));

			// Close remaining
			if (range && range.startContainer && prev) {
				range.endContainer = prev;
				range.endOffset = prev.length;
				let cfi = new EpubCFI(range, cfiBase).toString();
				locations.push(cfi);
				counter = 0;
			}

			return locations;
		}

		/**
	  * Get a location from an EpubCFI
	  * @param {EpubCFI} cfi
	  * @return {number}
	  */
		locationFromCfi(cfi) {
			let loc;
			if (EpubCFI.prototype.isCfiString(cfi)) {
				cfi = new EpubCFI(cfi);
			}
			// Check if the location has not been set yet
			if (this._locations.length === 0) {
				return -1;
			}

			loc = locationOf(cfi, this._locations, this.epubcfi.compare);

			if (loc > this.total) {
				return this.total;
			}

			return loc;
		}

		/**
	  * Get a percentage position in locations from an EpubCFI
	  * @param {EpubCFI} cfi
	  * @return {number}
	  */
		percentageFromCfi(cfi) {
			if (this._locations.length === 0) {
				return null;
			}
			// Find closest cfi
			var loc = this.locationFromCfi(cfi);
			// Get percentage in total
			return this.percentageFromLocation(loc);
		}

		/**
	  * Get a percentage position from a location index
	  * @param {number} location
	  * @return {number}
	  */
		percentageFromLocation(loc) {
			if (!loc || !this.total) {
				return 0;
			}

			return loc / this.total;
		}

		/**
	  * Get an EpubCFI from location index
	  * @param {number} loc
	  * @return {EpubCFI} cfi
	  */
		cfiFromLocation(loc) {
			var cfi = -1;
			// check that pg is an int
			if (typeof loc != "number") {
				loc = parseInt(loc);
			}

			if (loc >= 0 && loc < this._locations.length) {
				cfi = this._locations[loc];
			}

			return cfi;
		}

		/**
	  * Get an EpubCFI from location percentage
	  * @param {number} percentage
	  * @return {EpubCFI} cfi
	  */
		cfiFromPercentage(percentage) {
			let loc;
			if (percentage > 1) {
				console.warn("Normalize cfiFromPercentage value to between 0 - 1");
			}

			// Make sure 1 goes to very end
			if (percentage >= 1) {
				let cfi = new EpubCFI(this._locations[this.total]);
				cfi.collapse();
				return cfi.toString();
			}

			loc = Math.ceil(this.total * percentage);
			return this.cfiFromLocation(loc);
		}

		/**
	  * Load locations from JSON
	  * @param {json} locations
	  */
		load(locations) {
			if (typeof locations === "string") {
				this._locations = JSON.parse(locations);
			} else {
				this._locations = locations;
			}
			this.total = this._locations.length - 1;
			return this._locations;
		}

		/**
	  * Save locations to JSON
	  * @alias toJSON
	  * @return {json}
	  */
		save() {
			return this.toJSON();
		}

		getCurrent() {
			return this._current;
		}

		setCurrent(curr) {
			var loc;

			if (typeof curr == "string") {
				this._currentCfi = curr;
			} else if (typeof curr == "number") {
				this._current = curr;
			} else {
				return;
			}

			if (this._locations.length === 0) {
				return;
			}

			if (typeof curr == "string") {
				loc = this.locationFromCfi(curr);
				this._current = loc;
			} else {
				loc = curr;
			}

			this.emit(EVENTS.LOCATIONS.CHANGED, {
				percentage: this.percentageFromLocation(loc)
			});
		}

		/**
	  * Get the current location
	  */
		get currentLocation() {
			return this._current;
		}

		/**
	  * Set the current location
	  */
		set currentLocation(curr) {
			this.setCurrent(curr);
		}

		/**
	  * Locations length
	  */
		length() {
			return this._locations.length;
		}

		/**
	  * Export locations as an Array
	  * @return {array}
	  */
		toArray() {
			return this._locations;
		}

		/**
	  * Export locations as JSON
	  * @return {json}
	  */
		toJSON() {
			return JSON.stringify(this._locations);
		}

		destroy() {
			this.spine = undefined;
			this.request = undefined;
			this.pause = undefined;

			this.q.stop();
			this.q = undefined;
			this.epubcfi = undefined;

			this._locations = undefined;
			this.total = undefined;

			this.break = undefined;
			this._current = undefined;

			this.currentLocation = undefined;
			this._currentCfi = undefined;
			clearTimeout(this.processingTimeout);
		}
	}

	eventEmitter(Locations.prototype);

	/**
	 * Handles Parsing and Accessing an Epub Container
	 * @class
	 * @param {document} [containerDocument] xml document
	 */
	class Container {
		constructor(containerDocument) {
			this.packagePath = "";
			this.directory = "";
			this.encoding = "";

			if (containerDocument) {
				this.parse(containerDocument);
			}
		}

		/**
	  * Parse the Container XML
	  * @param  {document} containerDocument
	  */
		parse(containerDocument) {
			//-- <rootfile full-path="OPS/package.opf" media-type="application/oebps-package+xml"/>
			var rootfile;

			if (!containerDocument) {
				throw new Error("Container File Not Found");
			}

			rootfile = qs(containerDocument, "rootfile");

			if (!rootfile) {
				throw new Error("No RootFile Found");
			}

			this.packagePath = rootfile.getAttribute("full-path");
			this.directory = path.dirname(this.packagePath);
			this.encoding = containerDocument.xmlEncoding;
		}

		destroy() {
			this.packagePath = undefined;
			this.directory = undefined;
			this.encoding = undefined;
		}
	}

	/**
	 * Open Packaging Format Parser
	 * @class
	 * @param {document} packageDocument OPF XML
	 */
	class Packaging {
		constructor(packageDocument) {
			this.manifest = {};
			this.navPath = "";
			this.ncxPath = "";
			this.coverPath = "";
			this.spineNodeIndex = 0;
			this.spine = [];
			this.metadata = {};

			if (packageDocument) {
				this.parse(packageDocument);
			}
		}

		/**
	  * Parse OPF XML
	  * @param  {document} packageDocument OPF XML
	  * @return {object} parsed package parts
	  */
		parse(packageDocument) {
			var metadataNode, manifestNode, spineNode;

			if (!packageDocument) {
				throw new Error("Package File Not Found");
			}

			metadataNode = qs(packageDocument, "metadata");
			if (!metadataNode) {
				throw new Error("No Metadata Found");
			}

			manifestNode = qs(packageDocument, "manifest");
			if (!manifestNode) {
				throw new Error("No Manifest Found");
			}

			spineNode = qs(packageDocument, "spine");
			if (!spineNode) {
				throw new Error("No Spine Found");
			}

			this.manifest = this.parseManifest(manifestNode);
			this.navPath = this.findNavPath(manifestNode);
			this.ncxPath = this.findNcxPath(manifestNode, spineNode);
			this.coverPath = this.findCoverPath(packageDocument);

			this.spineNodeIndex = indexOfElementNode(spineNode);

			this.spine = this.parseSpine(spineNode, this.manifest);

			this.metadata = this.parseMetadata(metadataNode);

			this.metadata.direction = spineNode.getAttribute("page-progression-direction");

			return {
				"metadata": this.metadata,
				"spine": this.spine,
				"manifest": this.manifest,
				"navPath": this.navPath,
				"ncxPath": this.ncxPath,
				"coverPath": this.coverPath,
				"spineNodeIndex": this.spineNodeIndex
			};
		}

		/**
	  * Parse Metadata
	  * @private
	  * @param  {document} xml
	  * @return {object} metadata
	  */
		parseMetadata(xml) {
			var metadata = {};

			metadata.title = this.getElementText(xml, "title");
			metadata.creator = this.getElementText(xml, "creator");
			metadata.description = this.getElementText(xml, "description");

			metadata.pubdate = this.getElementText(xml, "date");

			metadata.publisher = this.getElementText(xml, "publisher");

			metadata.identifier = this.getElementText(xml, "identifier");
			metadata.language = this.getElementText(xml, "language");
			metadata.rights = this.getElementText(xml, "rights");

			metadata.modified_date = this.getPropertyText(xml, "dcterms:modified");

			metadata.layout = this.getPropertyText(xml, "rendition:layout");
			metadata.orientation = this.getPropertyText(xml, "rendition:orientation");
			metadata.flow = this.getPropertyText(xml, "rendition:flow");
			metadata.viewport = this.getPropertyText(xml, "rendition:viewport");

			return metadata;
		}

		/**
	  * Parse Manifest
	  * @private
	  * @param  {document} manifestXml
	  * @return {object} manifest
	  */
		parseManifest(manifestXml) {
			var manifest = {};

			//-- Turn items into an array
			var selected = qsa(manifestXml, "item");
			var items = Array.prototype.slice.call(selected);

			//-- Create an object with the id as key
			items.forEach(function (item) {
				var id = item.getAttribute("id"),
				    href = item.getAttribute("href") || "",
				    type$$1 = item.getAttribute("media-type") || "",
				    properties = item.getAttribute("properties") || "";

				manifest[id] = {
					"href": href,
					"type": type$$1,
					"properties": properties.length ? properties.split(" ") : []
				};
			});

			return manifest;
		}

		/**
	  * Parse Spine
	  * @param  {document} spineXml
	  * @param  {Packaging.manifest} manifest
	  * @return {object} spine
	  */
		parseSpine(spineXml, manifest) {
			var spine = [];

			var selected = qsa(spineXml, "itemref");
			var items = Array.prototype.slice.call(selected);

			// var epubcfi = new EpubCFI();

			//-- Add to array to mantain ordering and cross reference with manifest
			items.forEach(function (item, index) {
				var idref = item.getAttribute("idref");
				// var cfiBase = epubcfi.generateChapterComponent(spineNodeIndex, index, Id);
				var props = item.getAttribute("properties") || "";
				var propArray = props.length ? props.split(" ") : [];
				// var manifestProps = manifest[Id].properties;
				// var manifestPropArray = manifestProps.length ? manifestProps.split(" ") : [];

				var itemref = {
					"idref": idref,
					"linear": item.getAttribute("linear") || "yes",
					"properties": propArray,
					// "href" : manifest[Id].href,
					// "url" :  manifest[Id].url,
					"index": index
					// "cfiBase" : cfiBase
				};
				spine.push(itemref);
			});

			return spine;
		}

		/**
	  * Find TOC NAV
	  * @private
	  */
		findNavPath(manifestNode) {
			// Find item with property "nav"
			// Should catch nav irregardless of order
			var node = qsp(manifestNode, "item", { "properties": "nav" });
			return node ? node.getAttribute("href") : false;
		}

		/**
	  * Find TOC NCX
	  * media-type="application/x-dtbncx+xml" href="toc.ncx"
	  * @private
	  */
		findNcxPath(manifestNode, spineNode) {
			var node = qsp(manifestNode, "item", { "media-type": "application/x-dtbncx+xml" });
			var tocId;

			// If we can't find the toc by media-type then try to look for id of the item in the spine attributes as
			// according to http://www.idpf.org/epub/20/spec/OPF_2.0.1_draft.htm#Section2.4.1.2,
			// "The item that describes the NCX must be referenced by the spine toc attribute."
			if (!node) {
				tocId = spineNode.getAttribute("toc");
				if (tocId) {
					// node = manifestNode.querySelector("item[id='" + tocId + "']");
					node = manifestNode.getElementById(tocId);
				}
			}

			return node ? node.getAttribute("href") : false;
		}

		/**
	  * Find the Cover Path
	  * <item properties="cover-image" id="ci" href="cover.svg" media-type="image/svg+xml" />
	  * Fallback for Epub 2.0
	  * @param  {document} packageXml
	  * @return {string} href
	  */
		findCoverPath(packageXml) {
			var pkg = qs(packageXml, "package");
			var epubVersion = pkg.getAttribute("version");

			if (epubVersion === "2.0") {
				var metaCover = qsp(packageXml, "meta", { "name": "cover" });
				if (metaCover) {
					var coverId = metaCover.getAttribute("content");
					var cover = packageXml.getElementById(coverId);
					return cover ? cover.getAttribute("href") : "";
				} else {
					return false;
				}
			} else {
				var node = qsp(packageXml, "item", { "properties": "cover-image" });
				return node ? node.getAttribute("href") : "";
			}
		}

		/**
	  * Get text of a namespaced element
	  * @private
	  * @param  {document} xml
	  * @param  {string} tag
	  * @return {string} text
	  */
		getElementText(xml, tag) {
			var found = xml.getElementsByTagNameNS("http://purl.org/dc/elements/1.1/", tag);
			var el;

			if (!found || found.length === 0) return "";

			el = found[0];

			if (el.childNodes.length) {
				return el.childNodes[0].nodeValue;
			}

			return "";
		}

		/**
	  * Get text by property
	  * @private
	  * @param  {document} xml
	  * @param  {string} property
	  * @return {string} text
	  */
		getPropertyText(xml, property) {
			var el = qsp(xml, "meta", { "property": property });

			if (el && el.childNodes.length) {
				return el.childNodes[0].nodeValue;
			}

			return "";
		}

		/**
	  * Load JSON Manifest
	  * @param  {document} packageDocument OPF XML
	  * @return {object} parsed package parts
	  */
		load(json) {
			this.metadata = json.metadata;

			this.spine = json.spine.map((item, index) => {
				let id = item.idref;

				if (!id) {
					item.idref = encodeURIComponent(item.href);
				}

				if (typeof item.linear === "undefined") {
					item.linear = "yes";
				}

				if (item.rel && item.rel[0] === "cover") {
					this.coverPath = item.href;
				}

				item.index = index;
				this.manifest[item.idref] = item;

				return item;
			});

			if (json.resource) {
				json.resources.forEach(item => {
					let id = item.id || item.href;

					this.manifest[id] = item;

					if (item.rel && item.rel[0] === "cover") {
						this.coverPath = item.href;
					}
				});
			}

			this.spineNodeIndex = 0;

			this.toc = json.toc;

			return {
				"metadata": this.metadata,
				"spine": this.spine,
				"manifest": this.manifest,
				"navPath": this.navPath,
				"ncxPath": this.ncxPath,
				"coverPath": this.coverPath,
				"spineNodeIndex": this.spineNodeIndex,
				"toc": this.toc
			};
		}

		destroy() {
			this.manifest = undefined;
			this.navPath = undefined;
			this.ncxPath = undefined;
			this.coverPath = undefined;
			this.spineNodeIndex = undefined;
			this.spine = undefined;
			this.metadata = undefined;
		}
	}

	/**
	 * Navigation Parser
	 * @param {document} xml navigation html / xhtml / ncx
	 */
	class Navigation$1 {
		constructor(xml, url) {
			this.toc = [];
			this.tocByHref = {};
			this.tocById = {};

			this.landmarks = [];
			this.landmarksByType = {};

			this.length = 0;

			this.url = url || "";

			if (xml) {
				this.parse(xml);
			}
		}

		/**
	  * Parse out the navigation items
	  * @param {document} xml navigation html / xhtml / ncx
	  */
		parse(xml) {
			let isXml$$1 = xml.nodeType;
			let html;
			let ncx;

			if (isXml$$1) {
				html = qs(xml, "html");
				ncx = qs(xml, "ncx");
			}

			if (!isXml$$1) {
				this.toc = this.load(xml);
			} else if (html) {
				this.toc = this.parseNav(xml);
				this.landmarks = this.parseLandmarks(xml);
			} else if (ncx) {
				this.toc = this.parseNcx(xml);
			}

			this.length = 0;

			this.unpack(this.toc);
		}

		/**
	  * Unpack navigation items
	  * @private
	  * @param  {array} toc
	  */
		unpack(toc) {
			var item;
			var href;

			for (var i = 0; i < toc.length; i++) {
				item = toc[i];
				href = item.href;

				if (item.href) {
					this.tocByHref[href] = i;
				}

				if (item.id) {
					this.tocById[href] = i;
				}

				this.length++;

				if (item.children.length) {
					this.unpack(item.children);
				}
			}
		}

		/**
	  * Get an item from the navigation
	  * @param  {string} target
	  * @return {object} navItems
	  */
		get(target) {
			var index;

			if (!target) {
				return this.toc;
			}

			if (target.indexOf("#") === 0) {
				index = this.tocById[target.substring(1)];
			} else if (target in this.tocByHref) {
				index = this.tocByHref[target];
			}

			return this.toc[index];
		}

		/**
	  * Get a landmark by type
	  * List of types: https://idpf.github.io/epub-vocabs/structure/
	  * @param  {string} type
	  * @return {object} landmarkItems
	  */
		landmark(type$$1) {
			var index;

			if (!type$$1) {
				return this.landmarks;
			}

			index = this.landmarksByType[type$$1];

			return this.landmarks[index];
		}

		/**
	  * Parse toc from a Epub > 3.0 Nav
	  * @private
	  * @param  {document} navHtml
	  * @return {array} navigation list
	  */
		parseNav(navHtml) {
			var navElement = querySelectorByType(navHtml, "nav", "toc");
			var navItems = navElement ? qsa(navElement, "li") : [];
			var length = navItems.length;
			var i;
			var toc = {};
			var list = [];
			var item, parent;

			if (!navItems || length === 0) return list;

			for (i = 0; i < length; ++i) {
				item = this.navItem(navItems[i]);
				if (item) {
					toc[item.id] = item;
					if (!item.parentIndex) {
						list.push(item);
					} else {
						parent = toc[item.parent];
						parent.children.push(item);
					}
				}
			}

			return list;
		}

		/**
	  * Create a navItem
	  * @private
	  * @param  {element} item
	  * @return {object} navItem
	  */
		navItem(item) {
			let id = item.getAttribute("id") || undefined;
			let content = filterChildren(item, "a", true);

			if (!content) {
				return;
			}

			if (!id) {
				id = 'epubjs-autogen-toc-id-' + uuid();
				item.setAttribute('id', id);
			}

			let href = content.getAttribute("href") || "";
			let title = content.textContent || "";
			let children = [];
			let parentItem = getParentByTagName(item, "li");
			let parent;

			let split = href.split("#");
			if (split[0] === "") {
				href = this.url + href;
			}

			if (parentItem) {
				parent = parentItem.getAttribute("id");
			}

			while (!parent && parentItem) {
				parentItem = getParentByTagName(parentItem, "li");
				if (parentItem) {
					parent = parentItem.getAttribute("id");
				}
			}

			return {
				id,
				href,
				title,
				children,
				parent
			};
		}

		/**
	  * Parse landmarks from a Epub > 3.0 Nav
	  * @private
	  * @param  {document} navHtml
	  * @return {array} landmarks list
	  */
		parseLandmarks(navHtml) {
			var navElement = querySelectorByType(navHtml, "nav", "landmarks");
			var navItems = navElement ? qsa(navElement, "li") : [];
			var length = navItems.length;
			var i;
			var list = [];
			var item;

			if (!navItems || length === 0) return list;

			for (i = 0; i < length; ++i) {
				item = this.landmarkItem(navItems[i]);
				if (item) {
					list.push(item);
					this.landmarksByType[item.type] = i;
				}
			}

			return list;
		}

		/**
	  * Create a landmarkItem
	  * @private
	  * @param  {element} item
	  * @return {object} landmarkItem
	  */
		landmarkItem(item) {
			let content = filterChildren(item, "a", true);

			if (!content) {
				return;
			}

			let type$$1 = content.getAttributeNS("http://www.idpf.org/2007/ops", "type") || undefined;
			let href = content.getAttribute("href") || "";
			let title = content.textContent || "";

			let split = href.split("#");
			if (split[0] === "") {
				href = this.url + href;
			}

			return {
				href,
				title,
				type: type$$1
			};
		}

		/**
	  * Parse from a Epub > 3.0 NC
	  * @private
	  * @param  {document} navHtml
	  * @return {array} navigation list
	  */
		parseNcx(tocXml) {
			var navPoints = qsa(tocXml, "navPoint");
			var length = navPoints.length;
			var i;
			var toc = {};
			var list = [];
			var item, parent;

			if (!navPoints || length === 0) return list;

			for (i = 0; i < length; ++i) {
				item = this.ncxItem(navPoints[i]);
				toc[item.id] = item;
				if (!item.parent) {
					list.push(item);
				} else {
					parent = toc[item.parent];
					parent.children.push(item);
				}
			}

			return list;
		}

		/**
	  * Create a ncxItem
	  * @private
	  * @param  {element} item
	  * @return {object} ncxItem
	  */
		ncxItem(item) {
			var id = item.getAttribute("id") || false,
			    content = qs(item, "content"),
			    href = content.getAttribute("src"),
			    navLabel = qs(item, "navLabel"),
			    title = navLabel.textContent ? navLabel.textContent : "",
			    children = [],
			    parentNode = item.parentNode,
			    parent;

			if (parentNode && parentNode.nodeName === "navPoint") {
				parent = parentNode.getAttribute("id");
			}

			if (!id) {
				id = 'epubjs-autogen-toc-id-' + uuid();
				item.setAttribute('id', id);
			}

			return {
				id,
				href,
				title,
				children,
				parent
			};
		}

		/**
	  * Load Spine Items
	  * @param  {object} json the items to be loaded
	  */
		load(json) {
			return json.map(item => {
				if (item.children) {
					item.children = this.load(item.children);
				}
				return item;
			});
		}

		/**
	  * forEach pass through
	  * @param  {Function} fn function to run on each item
	  * @return {method} forEach loop
	  */
		forEach(fn) {
			return this.toc.forEach(fn);
		}

		/**
	  * Get an Array of all Table of Contents Items
	  */
		getTocArray(resolver) {
			return this.toc.map(item => {
				let url = resolver ? resolver(item.href) : item.href;

				let obj = {
					href: url,
					title: item.title
				};

				if (item.children.length) {
					obj.children = item.children;
				}

				return obj;
			});
		}

		/**
	  * Get an Array of all landmarks
	  */
		getLandmarksArray(resolver) {
			return this.landmarks.map(item => {
				let url = resolver ? resolver(item.href) : item.href;

				let obj = {
					href: url,
					title: item.title,
					type: item.type
				};

				return obj;
			});
		}
	}

	/*
	 From Zip.js, by Gildas Lormeau
	edited down
	 */

	var table = {
		"application": {
			"ecmascript": ["es", "ecma"],
			"javascript": "js",
			"ogg": "ogx",
			"pdf": "pdf",
			"postscript": ["ps", "ai", "eps", "epsi", "epsf", "eps2", "eps3"],
			"rdf+xml": "rdf",
			"smil": ["smi", "smil"],
			"xhtml+xml": ["xhtml", "xht"],
			"xml": ["xml", "xsl", "xsd", "opf", "ncx"],
			"zip": "zip",
			"x-httpd-eruby": "rhtml",
			"x-latex": "latex",
			"x-maker": ["frm", "maker", "frame", "fm", "fb", "book", "fbdoc"],
			"x-object": "o",
			"x-shockwave-flash": ["swf", "swfl"],
			"x-silverlight": "scr",
			"epub+zip": "epub",
			"font-tdpfr": "pfr",
			"inkml+xml": ["ink", "inkml"],
			"json": "json",
			"jsonml+json": "jsonml",
			"mathml+xml": "mathml",
			"metalink+xml": "metalink",
			"mp4": "mp4s",
			// "oebps-package+xml" : "opf",
			"omdoc+xml": "omdoc",
			"oxps": "oxps",
			"vnd.amazon.ebook": "azw",
			"widget": "wgt",
			// "x-dtbncx+xml" : "ncx",
			"x-dtbook+xml": "dtb",
			"x-dtbresource+xml": "res",
			"x-font-bdf": "bdf",
			"x-font-ghostscript": "gsf",
			"x-font-linux-psf": "psf",
			"x-font-otf": "otf",
			"x-font-pcf": "pcf",
			"x-font-snf": "snf",
			"x-font-ttf": ["ttf", "ttc"],
			"x-font-type1": ["pfa", "pfb", "pfm", "afm"],
			"x-font-woff": "woff",
			"x-mobipocket-ebook": ["prc", "mobi"],
			"x-mspublisher": "pub",
			"x-nzb": "nzb",
			"x-tgif": "obj",
			"xaml+xml": "xaml",
			"xml-dtd": "dtd",
			"xproc+xml": "xpl",
			"xslt+xml": "xslt",
			"internet-property-stream": "acx",
			"x-compress": "z",
			"x-compressed": "tgz",
			"x-gzip": "gz"
		},
		"audio": {
			"flac": "flac",
			"midi": ["mid", "midi", "kar", "rmi"],
			"mpeg": ["mpga", "mpega", "mp2", "mp3", "m4a", "mp2a", "m2a", "m3a"],
			"mpegurl": "m3u",
			"ogg": ["oga", "ogg", "spx"],
			"x-aiff": ["aif", "aiff", "aifc"],
			"x-ms-wma": "wma",
			"x-wav": "wav",
			"adpcm": "adp",
			"mp4": "mp4a",
			"webm": "weba",
			"x-aac": "aac",
			"x-caf": "caf",
			"x-matroska": "mka",
			"x-pn-realaudio-plugin": "rmp",
			"xm": "xm",
			"mid": ["mid", "rmi"]
		},
		"image": {
			"gif": "gif",
			"ief": "ief",
			"jpeg": ["jpeg", "jpg", "jpe"],
			"pcx": "pcx",
			"png": "png",
			"svg+xml": ["svg", "svgz"],
			"tiff": ["tiff", "tif"],
			"x-icon": "ico",
			"bmp": "bmp",
			"webp": "webp",
			"x-pict": ["pic", "pct"],
			"x-tga": "tga",
			"cis-cod": "cod"
		},
		"text": {
			"cache-manifest": ["manifest", "appcache"],
			"css": "css",
			"csv": "csv",
			"html": ["html", "htm", "shtml", "stm"],
			"mathml": "mml",
			"plain": ["txt", "text", "brf", "conf", "def", "list", "log", "in", "bas"],
			"richtext": "rtx",
			"tab-separated-values": "tsv",
			"x-bibtex": "bib"
		},
		"video": {
			"mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v", "mp2", "mpa", "mpv2"],
			"mp4": ["mp4", "mp4v", "mpg4"],
			"quicktime": ["qt", "mov"],
			"ogg": "ogv",
			"vnd.mpegurl": ["mxu", "m4u"],
			"x-flv": "flv",
			"x-la-asf": ["lsf", "lsx"],
			"x-mng": "mng",
			"x-ms-asf": ["asf", "asx", "asr"],
			"x-ms-wm": "wm",
			"x-ms-wmv": "wmv",
			"x-ms-wmx": "wmx",
			"x-ms-wvx": "wvx",
			"x-msvideo": "avi",
			"x-sgi-movie": "movie",
			"x-matroska": ["mpv", "mkv", "mk3d", "mks"],
			"3gpp2": "3g2",
			"h261": "h261",
			"h263": "h263",
			"h264": "h264",
			"jpeg": "jpgv",
			"jpm": ["jpm", "jpgm"],
			"mj2": ["mj2", "mjp2"],
			"vnd.ms-playready.media.pyv": "pyv",
			"vnd.uvvu.mp4": ["uvu", "uvvu"],
			"vnd.vivo": "viv",
			"webm": "webm",
			"x-f4v": "f4v",
			"x-m4v": "m4v",
			"x-ms-vob": "vob",
			"x-smv": "smv"
		}
	};

	var mimeTypes = function () {
		var type,
		    subtype,
		    val,
		    index,
		    mimeTypes = {};
		for (type in table) {
			if (table.hasOwnProperty(type)) {
				for (subtype in table[type]) {
					if (table[type].hasOwnProperty(subtype)) {
						val = table[type][subtype];
						if (typeof val == "string") {
							mimeTypes[val] = type + "/" + subtype;
						} else {
							for (index = 0; index < val.length; index++) {
								mimeTypes[val[index]] = type + "/" + subtype;
							}
						}
					}
				}
			}
		}
		return mimeTypes;
	}();

	var defaultValue = "text/plain"; //"application/octet-stream";

	function lookup(filename) {
		return filename && mimeTypes[filename.split(".").pop().toLowerCase()] || defaultValue;
	}
	var mime = {
		'lookup': lookup
	};

	// import path from "path-webpack";

	/**
	 * Handles Package Resources
	 * @class
	 * @param {object} resources
	 * @param {object} [options]
	 * @param {string} [options.replacements="base64"]
	 * @param {Archive} [options.archive]
	 * @param {method} [options.load]
	 * @param {string} [options.url]
	 * @param {string} [options.inject]
	 */
	class Resources {
		constructor(resources, options) {
			this.settings = {
				replacements: options && options.replacements || "blobUrl",
				archive: options && options.archive,
				load: options && options.load,
				url: options && options.url,
				// path: (options && options.path),
				inject: options && options.inject || {}
			};

			this.urlCache = {};

			this.resources = Object.assign({}, resources);

			this.resourcesByHref = {};

			this.ids = [];
			this.html = [];
			this.assets = [];
			this.css = [];

			if (typeof this.settings.url === "string") {
				this.url = new Url(this.settings.url);
				this.path = new Path(this.settings.url);
			} else if (typeof this.settings.url === "object") {
				this.url = this.settings.url;
				this.path = new Path(this.url.toString());
			} else {
				this.path = new Path("/");
			}

			if (resources) {
				this.split(resources);
			}
		}

		/**
	  * Split resources by type
	  * @private
	  */
		split(resources) {
			let keys = Object.keys(resources);

			// HTML
			let html = keys.filter(function (key) {
				let item = resources[key];
				if (item.type === "application/xhtml+xml" || item.type === "text/html") {
					return true;
				}
			});

			// Exclude HTML & CSS
			let assets = keys.filter(function (key) {
				let item = resources[key];
				if (item.type !== "application/xhtml+xml" && item.type !== "text/html" && item.type !== "text/css") {
					return true;
				}
			});

			// Only CSS
			let css = keys.filter(function (key) {
				let item = resources[key];
				if (item.type === "text/css") {
					return true;
				}
			});

			keys.forEach(id => {
				let resource = resources[id];
				// set ID from keys
				resource.id = id;
				if (!resource.source) {
					resource.source = resource.href;
				}
				this.resourcesByHref[resource.href] = id;
			});

			this.ids = keys;
			this.html = html;
			this.assets = assets;
			this.css = css;

			return {
				html,
				assets,
				css
			};
		}

		/**
	  * Save all resources into the cache
	  * @return {array}
	  */
		cache(key, origin) {
			if (typeof caches === "undefined") {
				return new Promise(function (resolve, reject) {
					resolve([]);
				});
			}

			this.cacheKey = key;

			let originUrl = this.url;
			if (typeof origin === "string") {
				originUrl = new Url(origin);
			}

			this.ids.map(resourceId => {
				let resource = this.resources[resourceId];
				let href = resource.source || resource.href;
				let isAbsolute = href.indexOf("://") > -1;
				let path = isAbsolute ? href : this.path.resolve(href);
				let url;

				if (!isAbsolute && originUrl) {
					url = originUrl.resolve(href);
				} else {
					let originalUrl = new Url(href, origin);
					let base = encodeURIComponent(originalUrl.origin);
					path = path.replace(originalUrl.origin, "");

					url = new Url(key + base + path, location.href).toString();
				}

				this.resources[resourceId].path = path;
				this.resources[resourceId].cached = url;
				this.urlCache[path] = url;
			});

			return caches.open(key).then(cache => {
				let urls = this.ids.map(resourceId => {
					let resource = this.resources[resourceId];
					let url = resource.cached;
					let path = resource.path;

					let mimeType = mime.lookup(path);

					return cache.match(url).then(result => {
						if (!result) {
							let loaded;
							if (resource.type === "application/xhtml+xml" || resource.type === "text/html") {
								loaded = this.settings.load(path, "text").then(text => {

									if (this.settings.inject.identifier) {
										text = this.injectIdentifier(text, this.settings.inject.identifier);
									}

									if (this.settings.inject.script) {
										text = this.injectScript(text, this.settings.inject.script);
									}

									if (this.settings.inject.stylesheet) {
										text = this.injectStylesheet(text, this.settings.inject.script);
									}

									return createBlob(text, resource.type);
								});
							} else {
								loaded = this.settings.load(path, "blob");
							}

							return loaded.then(blob => {
								let response = new Response(blob, {
									"status": 200,
									"headers": { 'Content-Type': mimeType }
								});
								this.urlCache[path] = url;
								return cache.put(url, response);
							}, err => {
								console.warn("Missing Resource", path);
								return path;
							}).then(() => {
								return url;
							});
						} else {
							this.urlCache[path] = url;
							return url;
						}
					});
				});

				return Promise.all(urls);
			});
		}

		/**
	  * Create blob urls for all the assets
	  * @return {Promise}         returns replacement urls
	  */
		replacements() {
			if (this.settings.replacements === "none") {
				return new Promise(function (resolve) {
					resolve([]);
				}.bind(this));
			}

			var replacements = [];

			// Replace all the assets
			let assets = this.assets.map(resourceId => {
				let url = this.replacementUrl(resourceId);
				replacements.push(url);
				return url;
			});

			// Re-write and replace css files
			let css = Promise.all(assets).then(() => {
				return this.css.map(resourceId => {
					let url = this.replacementCss(resourceId);
					replacements.push(url);
					return url;
				});
			});

			// Re-write and replace htmls files
			let html = css.then(() => {
				return this.html.map(resourceId => {
					let url = this.replacementHtml(resourceId);
					replacements.push(url);
					return url;
				});
			});

			return html.then(() => {
				return Promise.all(replacements);
			}).then(urls => {
				return urls;
			});
		}

		/**
	  * Create a replacement url from a resource
	  * @param  {number} resourceId
	  * @return {promise}
	  */
		replacementUrl(resourceId) {
			let resource = this.resources[resourceId];
			let absolute = this.url.resolve(resource.href);
			let createUrl;

			if (this.settings.replacements === "base64") {
				createUrl = this.base64UrlFrom(absolute);
			} else {
				createUrl = this.blobUrlFrom(absolute);
			}

			return createUrl.then(url => {
				this.resources[resourceId].replacement = url;
				this.urlCache[absolute] = url;
				return url;
			}).catch(err => {
				console.error(err);
				return null;
			});
		}

		/**
	  * Replace URLs in CSS resources
	  * @private
	  * @param  {number} resourceId
	  * @return {Promise}
	  */
		replacementCss(resourceId) {
			let newUrl;
			let resource = this.resources[resourceId];
			let href = resource.href;

			if (this.path.isAbsolute(href)) {
				return new Promise(function (resolve) {
					resolve(href);
				});
			}

			let resolved = this.path.resolve(href);
			let fullpath = new Path(resolved);
			// Get the text of the css file from the archive
			var textResponse;

			if (this.settings.archive) {
				textResponse = this.settings.archive.getText(resolved);
			} else {
				textResponse = this.settings.load(resolved, "text");
			}

			return textResponse.then(text => {
				let replacements = {};

				// Get asset links relative to css file
				this.ids.forEach(resourceId => {
					let resource = this.resources[resourceId];
					if (!resource.replacement) {
						return;
					}

					let assetHref = resource.href;
					let resolved = this.path.resolve(assetHref);
					let relative = fullpath.relative(resolved);

					replacements[relative] = resource.replacement;
				});

				// Replacements in the css text
				text = this.substitute(text, replacements);

				// Get the new url
				if (this.settings.replacements === "base64") {
					newUrl = createBase64Url(text, "text/css");
				} else {
					newUrl = createBlobUrl(text, "text/css");
				}

				return newUrl;
			}, err => {
				// handle response errors
				return new Promise(function (resolve) {
					resolve();
				});
			}).then(url => {
				if (url) {
					this.resources[resourceId].replacement = url;
					this.urlCache[fullpath] = url;
				}
				return url;
			});
		}

		/**
	  * Replace URLs in HTML resources
	  * @private
	  * @param  {number} resourceId
	  * @return {Promise}
	  */
		replacementHtml(resourceId) {
			let newUrl;
			let resource = this.resources[resourceId];
			let href = resource.href;
			let mimeType = mime.lookup(href);

			if (this.path.isAbsolute(href)) {
				return new Promise(function (resolve) {
					resolve(href);
				});
			}

			let resolved = this.path.resolve(href);
			let fullpath = new Path(resolved);
			// Get the text of the css file from the archive
			var textResponse;

			if (this.settings.archive) {
				textResponse = this.settings.archive.getText(resolved);
			} else {
				textResponse = this.settings.load(resolved, "text");
			}

			return textResponse.then(text => {
				let replacements = {};

				// Get asset links relative to html file
				this.ids.forEach(resourceId => {
					let resource = this.resources[resourceId];
					if (!resource.replacement) {
						return;
					}

					let assetHref = resource.href;
					let resolved = this.path.resolve(assetHref);
					let relative = fullpath.relative(resolved);

					replacements[relative] = resource.replacement;
				});

				// Replacements in the css text
				text = this.substitute(text, replacements);

				// Inject
				if (this.settings.inject.base) {
					text = this.injectBase(text, this.settings.inject.base);
				}

				if (this.settings.inject.identifier) {
					text = this.injectIdentifier(text, this.settings.inject.identifier);
				}

				if (this.settings.inject.script) {
					text = this.injectScript(text, this.settings.inject.script);
				}

				if (this.settings.inject.stylesheet) {
					text = this.injectStylesheet(text, this.settings.inject.script);
				}

				// Get the new url
				if (this.settings.replacements === "base64") {
					newUrl = createBase64Url(text, mimeType);
				} else {
					newUrl = createBlobUrl(text, mimeType);
				}

				return newUrl;
			}, err => {
				// handle response errors
				return new Promise(function (resolve) {
					resolve();
				});
			}).then(url => {
				if (url) {
					this.resources[resourceId].replacement = url;
					this.urlCache[fullpath] = url;
				}
				return url;
			});
		}

		/**
	  * Create a blob url from a resource absolute url
	  * @param  {string} url
	  * @return {string}          the resolved path string
	  */
		blobUrlFrom(url) {
			var parsedUrl = new Url(url);
			var mimeType = mime.lookup(parsedUrl.filename);

			if (this.settings.archive) {
				return this.settings.archive.createUrl(url, { "base64": false });
			} else {
				return this.settings.load(url, "blob").then(blob => {
					return createBlobUrl(blob, mimeType);
				});
			}
		}

		/**
	  * Create a base64 encoded url from a resource absolute url
	  * @param  {string} url
	  * @return {string}          the resolved path string
	  */
		base64UrlFrom(url) {
			var parsedUrl = new Url(url);
			var mimeType = mime.lookup(parsedUrl.filename);

			if (this.settings.archive) {
				return this.settings.archive.createUrl(url, { "base64": true });
			} else {
				return this.settings.load(url, "blob").then(blob => {
					return blob2base64(blob);
				}).then(blob => {
					return createBase64Url(blob, mimeType);
				});
			}
		}

		/**
	  * Substitute urls in a resource
	  */
		substitute(text, resources) {
			let query = Object.keys(resources).map(i => {
				return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
			}).join("|");

			let reg = new RegExp("(" + query + ")", "g");

			return text.replace(reg, function (match) {
				return resources[match];
			});
		}

		injectStylesheet(text, src) {
			let reg = /<[ ]*\/head[ ]*>/;
			let toInject = `<link href="${src}" rel="stylesheet" />`;

			return text.replace(reg, toInject + "$&");
		}

		injectScript(text, src) {
			let reg = /<[ ]*\/head[ ]*>/;
			let toInject = `<script src="${src}" type="text/javascript"></script>`;

			return text.replace(reg, toInject + "$&");
		}

		injectIdentifier(text, identifier) {
			let reg = /<[ ]*\/head[ ]*>/;
			let toInject = `<meta name="dc.relation.ispartof" content="${identifier}" />`;

			return text.replace(reg, toInject + "$&");
		}

		injectBase(text, url) {
			let reg = /<[ ]*head[ ]*>/;
			let absolute = url.indexOf("://") > -1;

			// Fix for Safari crashing if the url doesn't have an origin
			if (!absolute && typeof window !== "undefined" && window.location) {
				let parts = window.location.href.split("/");
				let directory = "";

				parts.pop();
				directory = parts.join("/");

				url = directory + url;
			}

			let toInject = `<base href="${url}" />`;

			return text.replace(reg, "$&" + toInject);
		}

		origin(url) {
			this.url = new Url(url);
		}

		/**
	  * Resolve a path to its absolute url (or replaced url)
	  * @param  {string} path
	  * @return {string}          the resolved path string
	  */
		resolve(path) {
			if (!path) {
				return;
			}
			let isAbsolute = path.indexOf("://") > -1;
			let href = isAbsolute ? path : this.path.resolve(path);
			let resolved = href;

			let search = href.split("?");
			let anchor = href.split("#");
			let base = href;
			if (search.length > 1) {
				base = search[0];
			} else if (anchor.length > 1) {
				base = anchor[0];
			}
			let cached = this.urlCache[base];

			if (cached) {
				resolved = cached;

				// Add query strings back
				if (search.length > 1) {
					resolved += "?" + search[1];
				} else if (anchor.length > 1) {
					resolved += "#" + anchor[1];
				}
			} else if (this.url) {
				resolved = this.url.resolve(path);
			} else {
				resolved = path;
			}

			return resolved;
		}

		/**
	  * Export an Array of all resources
	  * @return {array}
	  */
		toArray() {
			return this.ids.map(key => {
				let item = this.resources[key];
				let { type: type$$1, properties, id } = item;
				let source = item.href;

				let href = item.cached || item.replacement || this.url && this.url.resolve(item.href) || item.href;

				return {
					href,
					source,
					type: type$$1,
					properties,
					id
				};
			});
		}

		forEach(func) {
			return this.ids.forEach(id => {
				let r = this.resources[id];
				r.id = key;
				func(r);
			});
		}

		map(func) {
			return this.ids.map(id => {
				let r = this.resources[id];
				r.id = key;
				return func(r);
			});
		}

		filter(func) {
			return this.ids.filter(id => {
				let r = this.resources[id];
				r.id = key;
				return func(r);
			});
		}

		get(what) {
			if (what in this.resources) {
				return this.resources[what];
			} else if (what in this.resourcesByHref) {
				let id = this.resourcesByHref[what];
				return this.resources[id];
			}
		}

		revokeBlobUrls() {
			this.ids.forEach(id => {
				let r = this.resources[id];
				if (r.replacement) {
					revokeBlobUrl(r.replacement);
				}
			});
		}

		destroy() {
			this.revokeBlobUrls();

			this.settings = undefined;
			this.manifest = undefined;

			this.html = undefined;
			this.assets = undefined;
			this.css = undefined;

			this.urls = undefined;
			this.cssUrls = undefined;
		}
	}

	/**
	 * Page List Parser
	 * @param {document} [xml]
	 */
	class PageList {
		constructor(xml) {
			this.pages = [];
			this.locations = [];
			this.epubcfi = new EpubCFI();

			this.firstPage = 0;
			this.lastPage = 0;
			this.totalPages = 0;

			this.toc = undefined;
			this.ncx = undefined;

			if (xml) {
				this.pageList = this.parse(xml);
			}

			if (this.pageList && this.pageList.length) {
				this.process(this.pageList);
			}
		}

		/**
	  * Parse PageList Xml
	  * @param  {document} xml
	  */
		parse(xml) {
			var html = qs(xml, "html");
			var ncx = qs(xml, "ncx");

			if (html) {
				return this.parseNav(xml);
			} else if (ncx) {
				// Not supported
				// return this.parseNcx(xml);
				return;
			}
		}

		/**
	  * Parse a Nav PageList
	  * @private
	  * @param  {document} navHtml
	  * @return {PageList.item[]} list
	  */
		parseNav(navHtml) {
			var navElement = querySelectorByType(navHtml, "nav", "page-list");
			var navItems = navElement ? qsa(navElement, "li") : [];
			var length = navItems.length;
			var i;
			var list = [];
			var item;

			if (!navItems || length === 0) return list;

			for (i = 0; i < length; ++i) {
				item = this.item(navItems[i]);
				list.push(item);
			}

			return list;
		}

		/**
	  * Page List Item
	  * @private
	  * @param  {object} item
	  * @return {object} pageListItem
	  */
		item(item) {
			var content = qs(item, "a"),
			    href = content.getAttribute("href") || "",
			    text = content.textContent || "",
			    page = parseInt(text),
			    isCfi = href.indexOf("epubcfi"),
			    split,
			    packageUrl,
			    cfi;

			if (isCfi != -1) {
				split = href.split("#");
				packageUrl = split[0];
				cfi = split.length > 1 ? split[1] : false;
				return {
					"cfi": cfi,
					"href": href,
					"packageUrl": packageUrl,
					"page": page
				};
			} else {
				return {
					"href": href,
					"page": page
				};
			}
		}

		/**
	  * Process pageList items
	  * @private
	  * @param  {array} pageList
	  */
		process(pageList) {
			pageList.forEach(function (item) {
				this.pages.push(item.page);
				if (item.cfi) {
					this.locations.push(item.cfi);
				}
			}, this);
			this.firstPage = parseInt(this.pages[0]);
			this.lastPage = parseInt(this.pages[this.pages.length - 1]);
			this.totalPages = this.lastPage - this.firstPage;
		}

		/**
	  * Get a PageList result from a EpubCFI
	  * @param  {string} cfi EpubCFI String
	  * @return {string} page
	  */
		pageFromCfi(cfi) {
			var pg = -1;

			// Check if the pageList has not been set yet
			if (this.locations.length === 0) {
				return -1;
			}

			// TODO: check if CFI is valid?

			// check if the cfi is in the location list
			// var index = this.locations.indexOf(cfi);
			var index = indexOfSorted$1(cfi, this.locations, this.epubcfi.compare);
			if (index != -1) {
				pg = this.pages[index];
			} else {
				// Otherwise add it to the list of locations
				// Insert it in the correct position in the locations page
				//index = EPUBJS.core.insert(cfi, this.locations, this.epubcfi.compare);
				index = locationOf(cfi, this.locations, this.epubcfi.compare);
				// Get the page at the location just before the new one, or return the first
				pg = index - 1 >= 0 ? this.pages[index - 1] : this.pages[0];
				if (pg !== undefined) {
					// Add the new page in so that the locations and page array match up
					//this.pages.splice(index, 0, pg);
				} else {
					pg = -1;
				}
			}
			return pg;
		}

		/**
	  * Get an EpubCFI from a Page List Item
	  * @param  {string} pg
	  * @return {string} cfi
	  */
		cfiFromPage(pg) {
			var cfi = -1;
			// check that pg is an int
			if (typeof pg != "number") {
				pg = parseInt(pg);
			}

			// check if the cfi is in the page list
			// Pages could be unsorted.
			var index = this.pages.indexOf(pg);
			if (index != -1) {
				cfi = this.locations[index];
			}
			// TODO: handle pages not in the list
			return cfi;
		}

		/**
	  * Get a Page from Book percentage
	  * @param  {number} percent
	  * @return {string} page
	  */
		pageFromPercentage(percent) {
			var pg = Math.round(this.totalPages * percent);
			return pg;
		}

		/**
	  * Returns a value between 0 - 1 corresponding to the location of a page
	  * @param  {int} pg the page
	  * @return {number} percentage
	  */
		percentageFromPage(pg) {
			var percentage = (pg - this.firstPage) / this.totalPages;
			return Math.round(percentage * 1000) / 1000;
		}

		/**
	  * Returns a value between 0 - 1 corresponding to the location of a cfi
	  * @param  {string} cfi EpubCFI String
	  * @return {number} percentage
	  */
		percentageFromCfi(cfi) {
			var pg = this.pageFromCfi(cfi);
			var percentage = this.percentageFromPage(pg);
			return percentage;
		}

		/**
	  * Export pages as an Array
	  * @return {array}
	  */
		toArray() {
			return this.locations;
		}

		/**
	  * Export pages as JSON
	  * @return {json}
	  */
		toJSON() {
			return JSON.stringify(this.locations);
		}

		destroy() {
			this.pages = undefined;
			this.locations = undefined;
			this.epubcfi = undefined;

			this.pageList = undefined;

			this.toc = undefined;
			this.ncx = undefined;
		}
	}

	var jszip = createCommonjsModule(function (module, exports) {
	/*!

	JSZip v3.5.0 - A JavaScript class for generating and reading zip files
	<http://stuartk.com/jszip>

	(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
	Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

	JSZip uses the library pako released under the MIT license :
	https://github.com/nodeca/pako/blob/master/LICENSE
	*/

	(function(f){{module.exports=f();}})(function(){return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND", f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	var utils = require('./utils');
	var support = require('./support');
	// private property
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";


	// public method for encoding
	exports.encode = function(input) {
	    var output = [];
	    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	    var i = 0, len = input.length, remainingBytes = len;

	    var isArray = utils.getTypeOf(input) !== "string";
	    while (i < input.length) {
	        remainingBytes = len - i;

	        if (!isArray) {
	            chr1 = input.charCodeAt(i++);
	            chr2 = i < len ? input.charCodeAt(i++) : 0;
	            chr3 = i < len ? input.charCodeAt(i++) : 0;
	        } else {
	            chr1 = input[i++];
	            chr2 = i < len ? input[i++] : 0;
	            chr3 = i < len ? input[i++] : 0;
	        }

	        enc1 = chr1 >> 2;
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	        enc3 = remainingBytes > 1 ? (((chr2 & 15) << 2) | (chr3 >> 6)) : 64;
	        enc4 = remainingBytes > 2 ? (chr3 & 63) : 64;

	        output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));

	    }

	    return output.join("");
	};

	// public method for decoding
	exports.decode = function(input) {
	    var chr1, chr2, chr3;
	    var enc1, enc2, enc3, enc4;
	    var i = 0, resultIndex = 0;

	    var dataUrlPrefix = "data:";

	    if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {
	        // This is a common error: people give a data url
	        // (data:image/png;base64,iVBOR...) with a {base64: true} and
	        // wonders why things don't work.
	        // We can detect that the string input looks like a data url but we
	        // *can't* be sure it is one: removing everything up to the comma would
	        // be too dangerous.
	        throw new Error("Invalid base64 input, it looks like a data url.");
	    }

	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	    var totalLength = input.length * 3 / 4;
	    if(input.charAt(input.length - 1) === _keyStr.charAt(64)) {
	        totalLength--;
	    }
	    if(input.charAt(input.length - 2) === _keyStr.charAt(64)) {
	        totalLength--;
	    }
	    if (totalLength % 1 !== 0) {
	        // totalLength is not an integer, the length does not match a valid
	        // base64 content. That can happen if:
	        // - the input is not a base64 content
	        // - the input is *almost* a base64 content, with a extra chars at the
	        //   beginning or at the end
	        // - the input uses a base64 variant (base64url for example)
	        throw new Error("Invalid base64 input, bad content length.");
	    }
	    var output;
	    if (support.uint8array) {
	        output = new Uint8Array(totalLength|0);
	    } else {
	        output = new Array(totalLength|0);
	    }

	    while (i < input.length) {

	        enc1 = _keyStr.indexOf(input.charAt(i++));
	        enc2 = _keyStr.indexOf(input.charAt(i++));
	        enc3 = _keyStr.indexOf(input.charAt(i++));
	        enc4 = _keyStr.indexOf(input.charAt(i++));

	        chr1 = (enc1 << 2) | (enc2 >> 4);
	        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	        chr3 = ((enc3 & 3) << 6) | enc4;

	        output[resultIndex++] = chr1;

	        if (enc3 !== 64) {
	            output[resultIndex++] = chr2;
	        }
	        if (enc4 !== 64) {
	            output[resultIndex++] = chr3;
	        }

	    }

	    return output;
	};

	},{"./support":30,"./utils":32}],2:[function(require,module,exports){

	var external = require("./external");
	var DataWorker = require('./stream/DataWorker');
	var DataLengthProbe = require('./stream/DataLengthProbe');
	var Crc32Probe = require('./stream/Crc32Probe');
	var DataLengthProbe = require('./stream/DataLengthProbe');

	/**
	 * Represent a compressed object, with everything needed to decompress it.
	 * @constructor
	 * @param {number} compressedSize the size of the data compressed.
	 * @param {number} uncompressedSize the size of the data after decompression.
	 * @param {number} crc32 the crc32 of the decompressed file.
	 * @param {object} compression the type of compression, see lib/compressions.js.
	 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the compressed data.
	 */
	function CompressedObject(compressedSize, uncompressedSize, crc32, compression, data) {
	    this.compressedSize = compressedSize;
	    this.uncompressedSize = uncompressedSize;
	    this.crc32 = crc32;
	    this.compression = compression;
	    this.compressedContent = data;
	}

	CompressedObject.prototype = {
	    /**
	     * Create a worker to get the uncompressed content.
	     * @return {GenericWorker} the worker.
	     */
	    getContentWorker : function () {
	        var worker = new DataWorker(external.Promise.resolve(this.compressedContent))
	        .pipe(this.compression.uncompressWorker())
	        .pipe(new DataLengthProbe("data_length"));

	        var that = this;
	        worker.on("end", function () {
	            if(this.streamInfo['data_length'] !== that.uncompressedSize) {
	                throw new Error("Bug : uncompressed data size mismatch");
	            }
	        });
	        return worker;
	    },
	    /**
	     * Create a worker to get the compressed content.
	     * @return {GenericWorker} the worker.
	     */
	    getCompressedWorker : function () {
	        return new DataWorker(external.Promise.resolve(this.compressedContent))
	        .withStreamInfo("compressedSize", this.compressedSize)
	        .withStreamInfo("uncompressedSize", this.uncompressedSize)
	        .withStreamInfo("crc32", this.crc32)
	        .withStreamInfo("compression", this.compression)
	        ;
	    }
	};

	/**
	 * Chain the given worker with other workers to compress the content with the
	 * given compression.
	 * @param {GenericWorker} uncompressedWorker the worker to pipe.
	 * @param {Object} compression the compression object.
	 * @param {Object} compressionOptions the options to use when compressing.
	 * @return {GenericWorker} the new worker compressing the content.
	 */
	CompressedObject.createWorkerFrom = function (uncompressedWorker, compression, compressionOptions) {
	    return uncompressedWorker
	    .pipe(new Crc32Probe())
	    .pipe(new DataLengthProbe("uncompressedSize"))
	    .pipe(compression.compressWorker(compressionOptions))
	    .pipe(new DataLengthProbe("compressedSize"))
	    .withStreamInfo("compression", compression);
	};

	module.exports = CompressedObject;

	},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(require,module,exports){

	var GenericWorker = require("./stream/GenericWorker");

	exports.STORE = {
	    magic: "\x00\x00",
	    compressWorker : function (compressionOptions) {
	        return new GenericWorker("STORE compression");
	    },
	    uncompressWorker : function () {
	        return new GenericWorker("STORE decompression");
	    }
	};
	exports.DEFLATE = require('./flate');

	},{"./flate":7,"./stream/GenericWorker":28}],4:[function(require,module,exports){

	var utils = require('./utils');

	/**
	 * The following functions come from pako, from pako/lib/zlib/crc32.js
	 * released under the MIT license, see pako https://github.com/nodeca/pako/
	 */

	// Use ordinary array, since untyped makes no boost here
	function makeTable() {
	    var c, table = [];

	    for(var n =0; n < 256; n++){
	        c = n;
	        for(var k =0; k < 8; k++){
	            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
	        }
	        table[n] = c;
	    }

	    return table;
	}

	// Create table on load. Just 255 signed longs. Not a problem.
	var crcTable = makeTable();


	function crc32(crc, buf, len, pos) {
	    var t = crcTable, end = pos + len;

	    crc = crc ^ (-1);

	    for (var i = pos; i < end; i++ ) {
	        crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
	    }

	    return (crc ^ (-1)); // >>> 0;
	}

	// That's all for the pako functions.

	/**
	 * Compute the crc32 of a string.
	 * This is almost the same as the function crc32, but for strings. Using the
	 * same function for the two use cases leads to horrible performances.
	 * @param {Number} crc the starting value of the crc.
	 * @param {String} str the string to use.
	 * @param {Number} len the length of the string.
	 * @param {Number} pos the starting position for the crc32 computation.
	 * @return {Number} the computed crc32.
	 */
	function crc32str(crc, str, len, pos) {
	    var t = crcTable, end = pos + len;

	    crc = crc ^ (-1);

	    for (var i = pos; i < end; i++ ) {
	        crc = (crc >>> 8) ^ t[(crc ^ str.charCodeAt(i)) & 0xFF];
	    }

	    return (crc ^ (-1)); // >>> 0;
	}

	module.exports = function crc32wrapper(input, crc) {
	    if (typeof input === "undefined" || !input.length) {
	        return 0;
	    }

	    var isArray = utils.getTypeOf(input) !== "string";

	    if(isArray) {
	        return crc32(crc|0, input, input.length, 0);
	    } else {
	        return crc32str(crc|0, input, input.length, 0);
	    }
	};

	},{"./utils":32}],5:[function(require,module,exports){
	exports.base64 = false;
	exports.binary = false;
	exports.dir = false;
	exports.createFolders = true;
	exports.date = null;
	exports.compression = null;
	exports.compressionOptions = null;
	exports.comment = null;
	exports.unixPermissions = null;
	exports.dosPermissions = null;

	},{}],6:[function(require,module,exports){

	// load the global object first:
	// - it should be better integrated in the system (unhandledRejection in node)
	// - the environment may have a custom Promise implementation (see zone.js)
	var ES6Promise = null;
	if (typeof Promise !== "undefined") {
	    ES6Promise = Promise;
	} else {
	    ES6Promise = require("lie");
	}

	/**
	 * Let the user use/change some implementations.
	 */
	module.exports = {
	    Promise: ES6Promise
	};

	},{"lie":37}],7:[function(require,module,exports){
	var USE_TYPEDARRAY = (typeof Uint8Array !== 'undefined') && (typeof Uint16Array !== 'undefined') && (typeof Uint32Array !== 'undefined');

	var pako = require("pako");
	var utils = require("./utils");
	var GenericWorker = require("./stream/GenericWorker");

	var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";

	exports.magic = "\x08\x00";

	/**
	 * Create a worker that uses pako to inflate/deflate.
	 * @constructor
	 * @param {String} action the name of the pako function to call : either "Deflate" or "Inflate".
	 * @param {Object} options the options to use when (de)compressing.
	 */
	function FlateWorker(action, options) {
	    GenericWorker.call(this, "FlateWorker/" + action);

	    this._pako = null;
	    this._pakoAction = action;
	    this._pakoOptions = options;
	    // the `meta` object from the last chunk received
	    // this allow this worker to pass around metadata
	    this.meta = {};
	}

	utils.inherits(FlateWorker, GenericWorker);

	/**
	 * @see GenericWorker.processChunk
	 */
	FlateWorker.prototype.processChunk = function (chunk) {
	    this.meta = chunk.meta;
	    if (this._pako === null) {
	        this._createPako();
	    }
	    this._pako.push(utils.transformTo(ARRAY_TYPE, chunk.data), false);
	};

	/**
	 * @see GenericWorker.flush
	 */
	FlateWorker.prototype.flush = function () {
	    GenericWorker.prototype.flush.call(this);
	    if (this._pako === null) {
	        this._createPako();
	    }
	    this._pako.push([], true);
	};
	/**
	 * @see GenericWorker.cleanUp
	 */
	FlateWorker.prototype.cleanUp = function () {
	    GenericWorker.prototype.cleanUp.call(this);
	    this._pako = null;
	};

	/**
	 * Create the _pako object.
	 * TODO: lazy-loading this object isn't the best solution but it's the
	 * quickest. The best solution is to lazy-load the worker list. See also the
	 * issue #446.
	 */
	FlateWorker.prototype._createPako = function () {
	    this._pako = new pako[this._pakoAction]({
	        raw: true,
	        level: this._pakoOptions.level || -1 // default compression
	    });
	    var self = this;
	    this._pako.onData = function(data) {
	        self.push({
	            data : data,
	            meta : self.meta
	        });
	    };
	};

	exports.compressWorker = function (compressionOptions) {
	    return new FlateWorker("Deflate", compressionOptions);
	};
	exports.uncompressWorker = function () {
	    return new FlateWorker("Inflate", {});
	};

	},{"./stream/GenericWorker":28,"./utils":32,"pako":38}],8:[function(require,module,exports){

	var utils = require('../utils');
	var GenericWorker = require('../stream/GenericWorker');
	var utf8 = require('../utf8');
	var crc32 = require('../crc32');
	var signature = require('../signature');

	/**
	 * Transform an integer into a string in hexadecimal.
	 * @private
	 * @param {number} dec the number to convert.
	 * @param {number} bytes the number of bytes to generate.
	 * @returns {string} the result.
	 */
	var decToHex = function(dec, bytes) {
	    var hex = "", i;
	    for (i = 0; i < bytes; i++) {
	        hex += String.fromCharCode(dec & 0xff);
	        dec = dec >>> 8;
	    }
	    return hex;
	};

	/**
	 * Generate the UNIX part of the external file attributes.
	 * @param {Object} unixPermissions the unix permissions or null.
	 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
	 * @return {Number} a 32 bit integer.
	 *
	 * adapted from http://unix.stackexchange.com/questions/14705/the-zip-formats-external-file-attribute :
	 *
	 * TTTTsstrwxrwxrwx0000000000ADVSHR
	 * ^^^^____________________________ file type, see zipinfo.c (UNX_*)
	 *     ^^^_________________________ setuid, setgid, sticky
	 *        ^^^^^^^^^________________ permissions
	 *                 ^^^^^^^^^^______ not used ?
	 *                           ^^^^^^ DOS attribute bits : Archive, Directory, Volume label, System file, Hidden, Read only
	 */
	var generateUnixExternalFileAttr = function (unixPermissions, isDir) {

	    var result = unixPermissions;
	    if (!unixPermissions) {
	        // I can't use octal values in strict mode, hence the hexa.
	        //  040775 => 0x41fd
	        // 0100664 => 0x81b4
	        result = isDir ? 0x41fd : 0x81b4;
	    }
	    return (result & 0xFFFF) << 16;
	};

	/**
	 * Generate the DOS part of the external file attributes.
	 * @param {Object} dosPermissions the dos permissions or null.
	 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
	 * @return {Number} a 32 bit integer.
	 *
	 * Bit 0     Read-Only
	 * Bit 1     Hidden
	 * Bit 2     System
	 * Bit 3     Volume Label
	 * Bit 4     Directory
	 * Bit 5     Archive
	 */
	var generateDosExternalFileAttr = function (dosPermissions, isDir) {

	    // the dir flag is already set for compatibility
	    return (dosPermissions || 0)  & 0x3F;
	};

	/**
	 * Generate the various parts used in the construction of the final zip file.
	 * @param {Object} streamInfo the hash with information about the compressed file.
	 * @param {Boolean} streamedContent is the content streamed ?
	 * @param {Boolean} streamingEnded is the stream finished ?
	 * @param {number} offset the current offset from the start of the zip file.
	 * @param {String} platform let's pretend we are this platform (change platform dependents fields)
	 * @param {Function} encodeFileName the function to encode the file name / comment.
	 * @return {Object} the zip parts.
	 */
	var generateZipParts = function(streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {
	    var file = streamInfo['file'],
	    compression = streamInfo['compression'],
	    useCustomEncoding = encodeFileName !== utf8.utf8encode,
	    encodedFileName = utils.transformTo("string", encodeFileName(file.name)),
	    utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)),
	    comment = file.comment,
	    encodedComment = utils.transformTo("string", encodeFileName(comment)),
	    utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)),
	    useUTF8ForFileName = utfEncodedFileName.length !== file.name.length,
	    useUTF8ForComment = utfEncodedComment.length !== comment.length,
	    dosTime,
	    dosDate,
	    extraFields = "",
	    unicodePathExtraField = "",
	    unicodeCommentExtraField = "",
	    dir = file.dir,
	    date = file.date;


	    var dataInfo = {
	        crc32 : 0,
	        compressedSize : 0,
	        uncompressedSize : 0
	    };

	    // if the content is streamed, the sizes/crc32 are only available AFTER
	    // the end of the stream.
	    if (!streamedContent || streamingEnded) {
	        dataInfo.crc32 = streamInfo['crc32'];
	        dataInfo.compressedSize = streamInfo['compressedSize'];
	        dataInfo.uncompressedSize = streamInfo['uncompressedSize'];
	    }

	    var bitflag = 0;
	    if (streamedContent) {
	        // Bit 3: the sizes/crc32 are set to zero in the local header.
	        // The correct values are put in the data descriptor immediately
	        // following the compressed data.
	        bitflag |= 0x0008;
	    }
	    if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) {
	        // Bit 11: Language encoding flag (EFS).
	        bitflag |= 0x0800;
	    }


	    var extFileAttr = 0;
	    var versionMadeBy = 0;
	    if (dir) {
	        // dos or unix, we set the dos dir flag
	        extFileAttr |= 0x00010;
	    }
	    if(platform === "UNIX") {
	        versionMadeBy = 0x031E; // UNIX, version 3.0
	        extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
	    } else { // DOS or other, fallback to DOS
	        versionMadeBy = 0x0014; // DOS, version 2.0
	        extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
	    }

	    // date
	    // @see http://www.delorie.com/djgpp/doc/rbinter/it/52/13.html
	    // @see http://www.delorie.com/djgpp/doc/rbinter/it/65/16.html
	    // @see http://www.delorie.com/djgpp/doc/rbinter/it/66/16.html

	    dosTime = date.getUTCHours();
	    dosTime = dosTime << 6;
	    dosTime = dosTime | date.getUTCMinutes();
	    dosTime = dosTime << 5;
	    dosTime = dosTime | date.getUTCSeconds() / 2;

	    dosDate = date.getUTCFullYear() - 1980;
	    dosDate = dosDate << 4;
	    dosDate = dosDate | (date.getUTCMonth() + 1);
	    dosDate = dosDate << 5;
	    dosDate = dosDate | date.getUTCDate();

	    if (useUTF8ForFileName) {
	        // set the unicode path extra field. unzip needs at least one extra
	        // field to correctly handle unicode path, so using the path is as good
	        // as any other information. This could improve the situation with
	        // other archive managers too.
	        // This field is usually used without the utf8 flag, with a non
	        // unicode path in the header (winrar, winzip). This helps (a bit)
	        // with the messy Windows' default compressed folders feature but
	        // breaks on p7zip which doesn't seek the unicode path extra field.
	        // So for now, UTF-8 everywhere !
	        unicodePathExtraField =
	            // Version
	            decToHex(1, 1) +
	            // NameCRC32
	            decToHex(crc32(encodedFileName), 4) +
	            // UnicodeName
	            utfEncodedFileName;

	        extraFields +=
	            // Info-ZIP Unicode Path Extra Field
	            "\x75\x70" +
	            // size
	            decToHex(unicodePathExtraField.length, 2) +
	            // content
	            unicodePathExtraField;
	    }

	    if(useUTF8ForComment) {

	        unicodeCommentExtraField =
	            // Version
	            decToHex(1, 1) +
	            // CommentCRC32
	            decToHex(crc32(encodedComment), 4) +
	            // UnicodeName
	            utfEncodedComment;

	        extraFields +=
	            // Info-ZIP Unicode Path Extra Field
	            "\x75\x63" +
	            // size
	            decToHex(unicodeCommentExtraField.length, 2) +
	            // content
	            unicodeCommentExtraField;
	    }

	    var header = "";

	    // version needed to extract
	    header += "\x0A\x00";
	    // general purpose bit flag
	    header += decToHex(bitflag, 2);
	    // compression method
	    header += compression.magic;
	    // last mod file time
	    header += decToHex(dosTime, 2);
	    // last mod file date
	    header += decToHex(dosDate, 2);
	    // crc-32
	    header += decToHex(dataInfo.crc32, 4);
	    // compressed size
	    header += decToHex(dataInfo.compressedSize, 4);
	    // uncompressed size
	    header += decToHex(dataInfo.uncompressedSize, 4);
	    // file name length
	    header += decToHex(encodedFileName.length, 2);
	    // extra field length
	    header += decToHex(extraFields.length, 2);


	    var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;

	    var dirRecord = signature.CENTRAL_FILE_HEADER +
	        // version made by (00: DOS)
	        decToHex(versionMadeBy, 2) +
	        // file header (common to file and central directory)
	        header +
	        // file comment length
	        decToHex(encodedComment.length, 2) +
	        // disk number start
	        "\x00\x00" +
	        // internal file attributes TODO
	        "\x00\x00" +
	        // external file attributes
	        decToHex(extFileAttr, 4) +
	        // relative offset of local header
	        decToHex(offset, 4) +
	        // file name
	        encodedFileName +
	        // extra field
	        extraFields +
	        // file comment
	        encodedComment;

	    return {
	        fileRecord: fileRecord,
	        dirRecord: dirRecord
	    };
	};

	/**
	 * Generate the EOCD record.
	 * @param {Number} entriesCount the number of entries in the zip file.
	 * @param {Number} centralDirLength the length (in bytes) of the central dir.
	 * @param {Number} localDirLength the length (in bytes) of the local dir.
	 * @param {String} comment the zip file comment as a binary string.
	 * @param {Function} encodeFileName the function to encode the comment.
	 * @return {String} the EOCD record.
	 */
	var generateCentralDirectoryEnd = function (entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {
	    var dirEnd = "";
	    var encodedComment = utils.transformTo("string", encodeFileName(comment));

	    // end of central dir signature
	    dirEnd = signature.CENTRAL_DIRECTORY_END +
	        // number of this disk
	        "\x00\x00" +
	        // number of the disk with the start of the central directory
	        "\x00\x00" +
	        // total number of entries in the central directory on this disk
	        decToHex(entriesCount, 2) +
	        // total number of entries in the central directory
	        decToHex(entriesCount, 2) +
	        // size of the central directory   4 bytes
	        decToHex(centralDirLength, 4) +
	        // offset of start of central directory with respect to the starting disk number
	        decToHex(localDirLength, 4) +
	        // .ZIP file comment length
	        decToHex(encodedComment.length, 2) +
	        // .ZIP file comment
	        encodedComment;

	    return dirEnd;
	};

	/**
	 * Generate data descriptors for a file entry.
	 * @param {Object} streamInfo the hash generated by a worker, containing information
	 * on the file entry.
	 * @return {String} the data descriptors.
	 */
	var generateDataDescriptors = function (streamInfo) {
	    var descriptor = "";
	    descriptor = signature.DATA_DESCRIPTOR +
	        // crc-32                          4 bytes
	        decToHex(streamInfo['crc32'], 4) +
	        // compressed size                 4 bytes
	        decToHex(streamInfo['compressedSize'], 4) +
	        // uncompressed size               4 bytes
	        decToHex(streamInfo['uncompressedSize'], 4);

	    return descriptor;
	};


	/**
	 * A worker to concatenate other workers to create a zip file.
	 * @param {Boolean} streamFiles `true` to stream the content of the files,
	 * `false` to accumulate it.
	 * @param {String} comment the comment to use.
	 * @param {String} platform the platform to use, "UNIX" or "DOS".
	 * @param {Function} encodeFileName the function to encode file names and comments.
	 */
	function ZipFileWorker(streamFiles, comment, platform, encodeFileName) {
	    GenericWorker.call(this, "ZipFileWorker");
	    // The number of bytes written so far. This doesn't count accumulated chunks.
	    this.bytesWritten = 0;
	    // The comment of the zip file
	    this.zipComment = comment;
	    // The platform "generating" the zip file.
	    this.zipPlatform = platform;
	    // the function to encode file names and comments.
	    this.encodeFileName = encodeFileName;
	    // Should we stream the content of the files ?
	    this.streamFiles = streamFiles;
	    // If `streamFiles` is false, we will need to accumulate the content of the
	    // files to calculate sizes / crc32 (and write them *before* the content).
	    // This boolean indicates if we are accumulating chunks (it will change a lot
	    // during the lifetime of this worker).
	    this.accumulate = false;
	    // The buffer receiving chunks when accumulating content.
	    this.contentBuffer = [];
	    // The list of generated directory records.
	    this.dirRecords = [];
	    // The offset (in bytes) from the beginning of the zip file for the current source.
	    this.currentSourceOffset = 0;
	    // The total number of entries in this zip file.
	    this.entriesCount = 0;
	    // the name of the file currently being added, null when handling the end of the zip file.
	    // Used for the emitted metadata.
	    this.currentFile = null;



	    this._sources = [];
	}
	utils.inherits(ZipFileWorker, GenericWorker);

	/**
	 * @see GenericWorker.push
	 */
	ZipFileWorker.prototype.push = function (chunk) {

	    var currentFilePercent = chunk.meta.percent || 0;
	    var entriesCount = this.entriesCount;
	    var remainingFiles = this._sources.length;

	    if(this.accumulate) {
	        this.contentBuffer.push(chunk);
	    } else {
	        this.bytesWritten += chunk.data.length;

	        GenericWorker.prototype.push.call(this, {
	            data : chunk.data,
	            meta : {
	                currentFile : this.currentFile,
	                percent : entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
	            }
	        });
	    }
	};

	/**
	 * The worker started a new source (an other worker).
	 * @param {Object} streamInfo the streamInfo object from the new source.
	 */
	ZipFileWorker.prototype.openedSource = function (streamInfo) {
	    this.currentSourceOffset = this.bytesWritten;
	    this.currentFile = streamInfo['file'].name;

	    var streamedContent = this.streamFiles && !streamInfo['file'].dir;

	    // don't stream folders (because they don't have any content)
	    if(streamedContent) {
	        var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
	        this.push({
	            data : record.fileRecord,
	            meta : {percent:0}
	        });
	    } else {
	        // we need to wait for the whole file before pushing anything
	        this.accumulate = true;
	    }
	};

	/**
	 * The worker finished a source (an other worker).
	 * @param {Object} streamInfo the streamInfo object from the finished source.
	 */
	ZipFileWorker.prototype.closedSource = function (streamInfo) {
	    this.accumulate = false;
	    var streamedContent = this.streamFiles && !streamInfo['file'].dir;
	    var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);

	    this.dirRecords.push(record.dirRecord);
	    if(streamedContent) {
	        // after the streamed file, we put data descriptors
	        this.push({
	            data : generateDataDescriptors(streamInfo),
	            meta : {percent:100}
	        });
	    } else {
	        // the content wasn't streamed, we need to push everything now
	        // first the file record, then the content
	        this.push({
	            data : record.fileRecord,
	            meta : {percent:0}
	        });
	        while(this.contentBuffer.length) {
	            this.push(this.contentBuffer.shift());
	        }
	    }
	    this.currentFile = null;
	};

	/**
	 * @see GenericWorker.flush
	 */
	ZipFileWorker.prototype.flush = function () {

	    var localDirLength = this.bytesWritten;
	    for(var i = 0; i < this.dirRecords.length; i++) {
	        this.push({
	            data : this.dirRecords[i],
	            meta : {percent:100}
	        });
	    }
	    var centralDirLength = this.bytesWritten - localDirLength;

	    var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);

	    this.push({
	        data : dirEnd,
	        meta : {percent:100}
	    });
	};

	/**
	 * Prepare the next source to be read.
	 */
	ZipFileWorker.prototype.prepareNextSource = function () {
	    this.previous = this._sources.shift();
	    this.openedSource(this.previous.streamInfo);
	    if (this.isPaused) {
	        this.previous.pause();
	    } else {
	        this.previous.resume();
	    }
	};

	/**
	 * @see GenericWorker.registerPrevious
	 */
	ZipFileWorker.prototype.registerPrevious = function (previous) {
	    this._sources.push(previous);
	    var self = this;

	    previous.on('data', function (chunk) {
	        self.processChunk(chunk);
	    });
	    previous.on('end', function () {
	        self.closedSource(self.previous.streamInfo);
	        if(self._sources.length) {
	            self.prepareNextSource();
	        } else {
	            self.end();
	        }
	    });
	    previous.on('error', function (e) {
	        self.error(e);
	    });
	    return this;
	};

	/**
	 * @see GenericWorker.resume
	 */
	ZipFileWorker.prototype.resume = function () {
	    if(!GenericWorker.prototype.resume.call(this)) {
	        return false;
	    }

	    if (!this.previous && this._sources.length) {
	        this.prepareNextSource();
	        return true;
	    }
	    if (!this.previous && !this._sources.length && !this.generatedError) {
	        this.end();
	        return true;
	    }
	};

	/**
	 * @see GenericWorker.error
	 */
	ZipFileWorker.prototype.error = function (e) {
	    var sources = this._sources;
	    if(!GenericWorker.prototype.error.call(this, e)) {
	        return false;
	    }
	    for(var i = 0; i < sources.length; i++) {
	        try {
	            sources[i].error(e);
	        } catch(e) {
	            // the `error` exploded, nothing to do
	        }
	    }
	    return true;
	};

	/**
	 * @see GenericWorker.lock
	 */
	ZipFileWorker.prototype.lock = function () {
	    GenericWorker.prototype.lock.call(this);
	    var sources = this._sources;
	    for(var i = 0; i < sources.length; i++) {
	        sources[i].lock();
	    }
	};

	module.exports = ZipFileWorker;

	},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(require,module,exports){

	var compressions = require('../compressions');
	var ZipFileWorker = require('./ZipFileWorker');

	/**
	 * Find the compression to use.
	 * @param {String} fileCompression the compression defined at the file level, if any.
	 * @param {String} zipCompression the compression defined at the load() level.
	 * @return {Object} the compression object to use.
	 */
	var getCompression = function (fileCompression, zipCompression) {

	    var compressionName = fileCompression || zipCompression;
	    var compression = compressions[compressionName];
	    if (!compression) {
	        throw new Error(compressionName + " is not a valid compression method !");
	    }
	    return compression;
	};

	/**
	 * Create a worker to generate a zip file.
	 * @param {JSZip} zip the JSZip instance at the right root level.
	 * @param {Object} options to generate the zip file.
	 * @param {String} comment the comment to use.
	 */
	exports.generateWorker = function (zip, options, comment) {

	    var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
	    var entriesCount = 0;
	    try {

	        zip.forEach(function (relativePath, file) {
	            entriesCount++;
	            var compression = getCompression(file.options.compression, options.compression);
	            var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
	            var dir = file.dir, date = file.date;

	            file._compressWorker(compression, compressionOptions)
	            .withStreamInfo("file", {
	                name : relativePath,
	                dir : dir,
	                date : date,
	                comment : file.comment || "",
	                unixPermissions : file.unixPermissions,
	                dosPermissions : file.dosPermissions
	            })
	            .pipe(zipFileWorker);
	        });
	        zipFileWorker.entriesCount = entriesCount;
	    } catch (e) {
	        zipFileWorker.error(e);
	    }

	    return zipFileWorker;
	};

	},{"../compressions":3,"./ZipFileWorker":8}],10:[function(require,module,exports){

	/**
	 * Representation a of zip file in js
	 * @constructor
	 */
	function JSZip() {
	    // if this constructor is used without `new`, it adds `new` before itself:
	    if(!(this instanceof JSZip)) {
	        return new JSZip();
	    }

	    if(arguments.length) {
	        throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
	    }

	    // object containing the files :
	    // {
	    //   "folder/" : {...},
	    //   "folder/data.txt" : {...}
	    // }
	    this.files = {};

	    this.comment = null;

	    // Where we are in the hierarchy
	    this.root = "";
	    this.clone = function() {
	        var newObj = new JSZip();
	        for (var i in this) {
	            if (typeof this[i] !== "function") {
	                newObj[i] = this[i];
	            }
	        }
	        return newObj;
	    };
	}
	JSZip.prototype = require('./object');
	JSZip.prototype.loadAsync = require('./load');
	JSZip.support = require('./support');
	JSZip.defaults = require('./defaults');

	// TODO find a better way to handle this version,
	// a require('package.json').version doesn't work with webpack, see #327
	JSZip.version = "3.5.0";

	JSZip.loadAsync = function (content, options) {
	    return new JSZip().loadAsync(content, options);
	};

	JSZip.external = require("./external");
	module.exports = JSZip;

	},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(require,module,exports){
	var utils = require('./utils');
	var external = require("./external");
	var utf8 = require('./utf8');
	var utils = require('./utils');
	var ZipEntries = require('./zipEntries');
	var Crc32Probe = require('./stream/Crc32Probe');
	var nodejsUtils = require("./nodejsUtils");

	/**
	 * Check the CRC32 of an entry.
	 * @param {ZipEntry} zipEntry the zip entry to check.
	 * @return {Promise} the result.
	 */
	function checkEntryCRC32(zipEntry) {
	    return new external.Promise(function (resolve, reject) {
	        var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe());
	        worker.on("error", function (e) {
	            reject(e);
	        })
	        .on("end", function () {
	            if (worker.streamInfo.crc32 !== zipEntry.decompressed.crc32) {
	                reject(new Error("Corrupted zip : CRC32 mismatch"));
	            } else {
	                resolve();
	            }
	        })
	        .resume();
	    });
	}

	module.exports = function(data, options) {
	    var zip = this;
	    options = utils.extend(options || {}, {
	        base64: false,
	        checkCRC32: false,
	        optimizedBinaryString: false,
	        createFolders: false,
	        decodeFileName: utf8.utf8decode
	    });

	    if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
	        return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
	    }

	    return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64)
	    .then(function(data) {
	        var zipEntries = new ZipEntries(options);
	        zipEntries.load(data);
	        return zipEntries;
	    }).then(function checkCRC32(zipEntries) {
	        var promises = [external.Promise.resolve(zipEntries)];
	        var files = zipEntries.files;
	        if (options.checkCRC32) {
	            for (var i = 0; i < files.length; i++) {
	                promises.push(checkEntryCRC32(files[i]));
	            }
	        }
	        return external.Promise.all(promises);
	    }).then(function addFiles(results) {
	        var zipEntries = results.shift();
	        var files = zipEntries.files;
	        for (var i = 0; i < files.length; i++) {
	            var input = files[i];
	            zip.file(input.fileNameStr, input.decompressed, {
	                binary: true,
	                optimizedBinaryString: true,
	                date: input.date,
	                dir: input.dir,
	                comment : input.fileCommentStr.length ? input.fileCommentStr : null,
	                unixPermissions : input.unixPermissions,
	                dosPermissions : input.dosPermissions,
	                createFolders: options.createFolders
	            });
	        }
	        if (zipEntries.zipComment.length) {
	            zip.comment = zipEntries.zipComment;
	        }

	        return zip;
	    });
	};

	},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(require,module,exports){

	var utils = require('../utils');
	var GenericWorker = require('../stream/GenericWorker');

	/**
	 * A worker that use a nodejs stream as source.
	 * @constructor
	 * @param {String} filename the name of the file entry for this stream.
	 * @param {Readable} stream the nodejs stream.
	 */
	function NodejsStreamInputAdapter(filename, stream) {
	    GenericWorker.call(this, "Nodejs stream input adapter for " + filename);
	    this._upstreamEnded = false;
	    this._bindStream(stream);
	}

	utils.inherits(NodejsStreamInputAdapter, GenericWorker);

	/**
	 * Prepare the stream and bind the callbacks on it.
	 * Do this ASAP on node 0.10 ! A lazy binding doesn't always work.
	 * @param {Stream} stream the nodejs stream to use.
	 */
	NodejsStreamInputAdapter.prototype._bindStream = function (stream) {
	    var self = this;
	    this._stream = stream;
	    stream.pause();
	    stream
	    .on("data", function (chunk) {
	        self.push({
	            data: chunk,
	            meta : {
	                percent : 0
	            }
	        });
	    })
	    .on("error", function (e) {
	        if(self.isPaused) {
	            this.generatedError = e;
	        } else {
	            self.error(e);
	        }
	    })
	    .on("end", function () {
	        if(self.isPaused) {
	            self._upstreamEnded = true;
	        } else {
	            self.end();
	        }
	    });
	};
	NodejsStreamInputAdapter.prototype.pause = function () {
	    if(!GenericWorker.prototype.pause.call(this)) {
	        return false;
	    }
	    this._stream.pause();
	    return true;
	};
	NodejsStreamInputAdapter.prototype.resume = function () {
	    if(!GenericWorker.prototype.resume.call(this)) {
	        return false;
	    }

	    if(this._upstreamEnded) {
	        this.end();
	    } else {
	        this._stream.resume();
	    }

	    return true;
	};

	module.exports = NodejsStreamInputAdapter;

	},{"../stream/GenericWorker":28,"../utils":32}],13:[function(require,module,exports){

	var Readable = require('readable-stream').Readable;

	var utils = require('../utils');
	utils.inherits(NodejsStreamOutputAdapter, Readable);

	/**
	* A nodejs stream using a worker as source.
	* @see the SourceWrapper in http://nodejs.org/api/stream.html
	* @constructor
	* @param {StreamHelper} helper the helper wrapping the worker
	* @param {Object} options the nodejs stream options
	* @param {Function} updateCb the update callback.
	*/
	function NodejsStreamOutputAdapter(helper, options, updateCb) {
	    Readable.call(this, options);
	    this._helper = helper;

	    var self = this;
	    helper.on("data", function (data, meta) {
	        if (!self.push(data)) {
	            self._helper.pause();
	        }
	        if(updateCb) {
	            updateCb(meta);
	        }
	    })
	    .on("error", function(e) {
	        self.emit('error', e);
	    })
	    .on("end", function () {
	        self.push(null);
	    });
	}


	NodejsStreamOutputAdapter.prototype._read = function() {
	    this._helper.resume();
	};

	module.exports = NodejsStreamOutputAdapter;

	},{"../utils":32,"readable-stream":16}],14:[function(require,module,exports){

	module.exports = {
	    /**
	     * True if this is running in Nodejs, will be undefined in a browser.
	     * In a browser, browserify won't include this file and the whole module
	     * will be resolved an empty object.
	     */
	    isNode : typeof Buffer !== "undefined",
	    /**
	     * Create a new nodejs Buffer from an existing content.
	     * @param {Object} data the data to pass to the constructor.
	     * @param {String} encoding the encoding to use.
	     * @return {Buffer} a new Buffer.
	     */
	    newBufferFrom: function(data, encoding) {
	        if (Buffer.from && Buffer.from !== Uint8Array.from) {
	            return Buffer.from(data, encoding);
	        } else {
	            if (typeof data === "number") {
	                // Safeguard for old Node.js versions. On newer versions,
	                // Buffer.from(number) / Buffer(number, encoding) already throw.
	                throw new Error("The \"data\" argument must not be a number");
	            }
	            return new Buffer(data, encoding);
	        }
	    },
	    /**
	     * Create a new nodejs Buffer with the specified size.
	     * @param {Integer} size the size of the buffer.
	     * @return {Buffer} a new Buffer.
	     */
	    allocBuffer: function (size) {
	        if (Buffer.alloc) {
	            return Buffer.alloc(size);
	        } else {
	            var buf = new Buffer(size);
	            buf.fill(0);
	            return buf;
	        }
	    },
	    /**
	     * Find out if an object is a Buffer.
	     * @param {Object} b the object to test.
	     * @return {Boolean} true if the object is a Buffer, false otherwise.
	     */
	    isBuffer : function(b){
	        return Buffer.isBuffer(b);
	    },

	    isStream : function (obj) {
	        return obj &&
	            typeof obj.on === "function" &&
	            typeof obj.pause === "function" &&
	            typeof obj.resume === "function";
	    }
	};

	},{}],15:[function(require,module,exports){
	var utf8 = require('./utf8');
	var utils = require('./utils');
	var GenericWorker = require('./stream/GenericWorker');
	var StreamHelper = require('./stream/StreamHelper');
	var defaults = require('./defaults');
	var CompressedObject = require('./compressedObject');
	var ZipObject = require('./zipObject');
	var generate = require("./generate");
	var nodejsUtils = require("./nodejsUtils");
	var NodejsStreamInputAdapter = require("./nodejs/NodejsStreamInputAdapter");


	/**
	 * Add a file in the current folder.
	 * @private
	 * @param {string} name the name of the file
	 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data of the file
	 * @param {Object} originalOptions the options of the file
	 * @return {Object} the new file.
	 */
	var fileAdd = function(name, data, originalOptions) {
	    // be sure sub folders exist
	    var dataType = utils.getTypeOf(data),
	        parent;


	    /*
	     * Correct options.
	     */

	    var o = utils.extend(originalOptions || {}, defaults);
	    o.date = o.date || new Date();
	    if (o.compression !== null) {
	        o.compression = o.compression.toUpperCase();
	    }

	    if (typeof o.unixPermissions === "string") {
	        o.unixPermissions = parseInt(o.unixPermissions, 8);
	    }

	    // UNX_IFDIR  0040000 see zipinfo.c
	    if (o.unixPermissions && (o.unixPermissions & 0x4000)) {
	        o.dir = true;
	    }
	    // Bit 4    Directory
	    if (o.dosPermissions && (o.dosPermissions & 0x0010)) {
	        o.dir = true;
	    }

	    if (o.dir) {
	        name = forceTrailingSlash(name);
	    }
	    if (o.createFolders && (parent = parentFolder(name))) {
	        folderAdd.call(this, parent, true);
	    }

	    var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;
	    if (!originalOptions || typeof originalOptions.binary === "undefined") {
	        o.binary = !isUnicodeString;
	    }


	    var isCompressedEmpty = (data instanceof CompressedObject) && data.uncompressedSize === 0;

	    if (isCompressedEmpty || o.dir || !data || data.length === 0) {
	        o.base64 = false;
	        o.binary = true;
	        data = "";
	        o.compression = "STORE";
	        dataType = "string";
	    }

	    /*
	     * Convert content to fit.
	     */

	    var zipObjectContent = null;
	    if (data instanceof CompressedObject || data instanceof GenericWorker) {
	        zipObjectContent = data;
	    } else if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
	        zipObjectContent = new NodejsStreamInputAdapter(name, data);
	    } else {
	        zipObjectContent = utils.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
	    }

	    var object = new ZipObject(name, zipObjectContent, o);
	    this.files[name] = object;
	    /*
	    TODO: we can't throw an exception because we have async promises
	    (we can have a promise of a Date() for example) but returning a
	    promise is useless because file(name, data) returns the JSZip
	    object for chaining. Should we break that to allow the user
	    to catch the error ?

	    return external.Promise.resolve(zipObjectContent)
	    .then(function () {
	        return object;
	    });
	    */
	};

	/**
	 * Find the parent folder of the path.
	 * @private
	 * @param {string} path the path to use
	 * @return {string} the parent folder, or ""
	 */
	var parentFolder = function (path) {
	    if (path.slice(-1) === '/') {
	        path = path.substring(0, path.length - 1);
	    }
	    var lastSlash = path.lastIndexOf('/');
	    return (lastSlash > 0) ? path.substring(0, lastSlash) : "";
	};

	/**
	 * Returns the path with a slash at the end.
	 * @private
	 * @param {String} path the path to check.
	 * @return {String} the path with a trailing slash.
	 */
	var forceTrailingSlash = function(path) {
	    // Check the name ends with a /
	    if (path.slice(-1) !== "/") {
	        path += "/"; // IE doesn't like substr(-1)
	    }
	    return path;
	};

	/**
	 * Add a (sub) folder in the current folder.
	 * @private
	 * @param {string} name the folder's name
	 * @param {boolean=} [createFolders] If true, automatically create sub
	 *  folders. Defaults to false.
	 * @return {Object} the new folder.
	 */
	var folderAdd = function(name, createFolders) {
	    createFolders = (typeof createFolders !== 'undefined') ? createFolders : defaults.createFolders;

	    name = forceTrailingSlash(name);

	    // Does this folder already exist?
	    if (!this.files[name]) {
	        fileAdd.call(this, name, null, {
	            dir: true,
	            createFolders: createFolders
	        });
	    }
	    return this.files[name];
	};

	/**
	* Cross-window, cross-Node-context regular expression detection
	* @param  {Object}  object Anything
	* @return {Boolean}        true if the object is a regular expression,
	* false otherwise
	*/
	function isRegExp(object) {
	    return Object.prototype.toString.call(object) === "[object RegExp]";
	}

	// return the actual prototype of JSZip
	var out = {
	    /**
	     * @see loadAsync
	     */
	    load: function() {
	        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
	    },


	    /**
	     * Call a callback function for each entry at this folder level.
	     * @param {Function} cb the callback function:
	     * function (relativePath, file) {...}
	     * It takes 2 arguments : the relative path and the file.
	     */
	    forEach: function(cb) {
	        var filename, relativePath, file;
	        for (filename in this.files) {
	            if (!this.files.hasOwnProperty(filename)) {
	                continue;
	            }
	            file = this.files[filename];
	            relativePath = filename.slice(this.root.length, filename.length);
	            if (relativePath && filename.slice(0, this.root.length) === this.root) { // the file is in the current root
	                cb(relativePath, file); // TODO reverse the parameters ? need to be clean AND consistent with the filter search fn...
	            }
	        }
	    },

	    /**
	     * Filter nested files/folders with the specified function.
	     * @param {Function} search the predicate to use :
	     * function (relativePath, file) {...}
	     * It takes 2 arguments : the relative path and the file.
	     * @return {Array} An array of matching elements.
	     */
	    filter: function(search) {
	        var result = [];
	        this.forEach(function (relativePath, entry) {
	            if (search(relativePath, entry)) { // the file matches the function
	                result.push(entry);
	            }

	        });
	        return result;
	    },

	    /**
	     * Add a file to the zip file, or search a file.
	     * @param   {string|RegExp} name The name of the file to add (if data is defined),
	     * the name of the file to find (if no data) or a regex to match files.
	     * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
	     * @param   {Object} o     File options
	     * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
	     * a file (when searching by string) or an array of files (when searching by regex).
	     */
	    file: function(name, data, o) {
	        if (arguments.length === 1) {
	            if (isRegExp(name)) {
	                var regexp = name;
	                return this.filter(function(relativePath, file) {
	                    return !file.dir && regexp.test(relativePath);
	                });
	            }
	            else { // text
	                var obj = this.files[this.root + name];
	                if (obj && !obj.dir) {
	                    return obj;
	                } else {
	                    return null;
	                }
	            }
	        }
	        else { // more than one argument : we have data !
	            name = this.root + name;
	            fileAdd.call(this, name, data, o);
	        }
	        return this;
	    },

	    /**
	     * Add a directory to the zip file, or search.
	     * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
	     * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
	     */
	    folder: function(arg) {
	        if (!arg) {
	            return this;
	        }

	        if (isRegExp(arg)) {
	            return this.filter(function(relativePath, file) {
	                return file.dir && arg.test(relativePath);
	            });
	        }

	        // else, name is a new folder
	        var name = this.root + arg;
	        var newFolder = folderAdd.call(this, name);

	        // Allow chaining by returning a new object with this folder as the root
	        var ret = this.clone();
	        ret.root = newFolder.name;
	        return ret;
	    },

	    /**
	     * Delete a file, or a directory and all sub-files, from the zip
	     * @param {string} name the name of the file to delete
	     * @return {JSZip} this JSZip object
	     */
	    remove: function(name) {
	        name = this.root + name;
	        var file = this.files[name];
	        if (!file) {
	            // Look for any folders
	            if (name.slice(-1) !== "/") {
	                name += "/";
	            }
	            file = this.files[name];
	        }

	        if (file && !file.dir) {
	            // file
	            delete this.files[name];
	        } else {
	            // maybe a folder, delete recursively
	            var kids = this.filter(function(relativePath, file) {
	                return file.name.slice(0, name.length) === name;
	            });
	            for (var i = 0; i < kids.length; i++) {
	                delete this.files[kids[i].name];
	            }
	        }

	        return this;
	    },

	    /**
	     * Generate the complete zip file
	     * @param {Object} options the options to generate the zip file :
	     * - compression, "STORE" by default.
	     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
	     * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the zip file
	     */
	    generate: function(options) {
	        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
	    },

	    /**
	     * Generate the complete zip file as an internal stream.
	     * @param {Object} options the options to generate the zip file :
	     * - compression, "STORE" by default.
	     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
	     * @return {StreamHelper} the streamed zip file.
	     */
	    generateInternalStream: function(options) {
	      var worker, opts = {};
	      try {
	          opts = utils.extend(options || {}, {
	              streamFiles: false,
	              compression: "STORE",
	              compressionOptions : null,
	              type: "",
	              platform: "DOS",
	              comment: null,
	              mimeType: 'application/zip',
	              encodeFileName: utf8.utf8encode
	          });

	          opts.type = opts.type.toLowerCase();
	          opts.compression = opts.compression.toUpperCase();

	          // "binarystring" is preferred but the internals use "string".
	          if(opts.type === "binarystring") {
	            opts.type = "string";
	          }

	          if (!opts.type) {
	            throw new Error("No output type specified.");
	          }

	          utils.checkSupport(opts.type);

	          // accept nodejs `process.platform`
	          if(
	              opts.platform === 'darwin' ||
	              opts.platform === 'freebsd' ||
	              opts.platform === 'linux' ||
	              opts.platform === 'sunos'
	          ) {
	              opts.platform = "UNIX";
	          }
	          if (opts.platform === 'win32') {
	              opts.platform = "DOS";
	          }

	          var comment = opts.comment || this.comment || "";
	          worker = generate.generateWorker(this, opts, comment);
	      } catch (e) {
	        worker = new GenericWorker("error");
	        worker.error(e);
	      }
	      return new StreamHelper(worker, opts.type || "string", opts.mimeType);
	    },
	    /**
	     * Generate the complete zip file asynchronously.
	     * @see generateInternalStream
	     */
	    generateAsync: function(options, onUpdate) {
	        return this.generateInternalStream(options).accumulate(onUpdate);
	    },
	    /**
	     * Generate the complete zip file asynchronously.
	     * @see generateInternalStream
	     */
	    generateNodeStream: function(options, onUpdate) {
	        options = options || {};
	        if (!options.type) {
	            options.type = "nodebuffer";
	        }
	        return this.generateInternalStream(options).toNodejsStream(onUpdate);
	    }
	};
	module.exports = out;

	},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(require,module,exports){
	/*
	 * This file is used by module bundlers (browserify/webpack/etc) when
	 * including a stream implementation. We use "readable-stream" to get a
	 * consistent behavior between nodejs versions but bundlers often have a shim
	 * for "stream". Using this shim greatly improve the compatibility and greatly
	 * reduce the final size of the bundle (only one stream implementation, not
	 * two).
	 */
	module.exports = require("stream");

	},{"stream":undefined}],17:[function(require,module,exports){
	var DataReader = require('./DataReader');
	var utils = require('../utils');

	function ArrayReader(data) {
	    DataReader.call(this, data);
		for(var i = 0; i < this.data.length; i++) {
			data[i] = data[i] & 0xFF;
		}
	}
	utils.inherits(ArrayReader, DataReader);
	/**
	 * @see DataReader.byteAt
	 */
	ArrayReader.prototype.byteAt = function(i) {
	    return this.data[this.zero + i];
	};
	/**
	 * @see DataReader.lastIndexOfSignature
	 */
	ArrayReader.prototype.lastIndexOfSignature = function(sig) {
	    var sig0 = sig.charCodeAt(0),
	        sig1 = sig.charCodeAt(1),
	        sig2 = sig.charCodeAt(2),
	        sig3 = sig.charCodeAt(3);
	    for (var i = this.length - 4; i >= 0; --i) {
	        if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
	            return i - this.zero;
	        }
	    }

	    return -1;
	};
	/**
	 * @see DataReader.readAndCheckSignature
	 */
	ArrayReader.prototype.readAndCheckSignature = function (sig) {
	    var sig0 = sig.charCodeAt(0),
	        sig1 = sig.charCodeAt(1),
	        sig2 = sig.charCodeAt(2),
	        sig3 = sig.charCodeAt(3),
	        data = this.readData(4);
	    return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];
	};
	/**
	 * @see DataReader.readData
	 */
	ArrayReader.prototype.readData = function(size) {
	    this.checkOffset(size);
	    if(size === 0) {
	        return [];
	    }
	    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
	    this.index += size;
	    return result;
	};
	module.exports = ArrayReader;

	},{"../utils":32,"./DataReader":18}],18:[function(require,module,exports){
	var utils = require('../utils');

	function DataReader(data) {
	    this.data = data; // type : see implementation
	    this.length = data.length;
	    this.index = 0;
	    this.zero = 0;
	}
	DataReader.prototype = {
	    /**
	     * Check that the offset will not go too far.
	     * @param {string} offset the additional offset to check.
	     * @throws {Error} an Error if the offset is out of bounds.
	     */
	    checkOffset: function(offset) {
	        this.checkIndex(this.index + offset);
	    },
	    /**
	     * Check that the specified index will not be too far.
	     * @param {string} newIndex the index to check.
	     * @throws {Error} an Error if the index is out of bounds.
	     */
	    checkIndex: function(newIndex) {
	        if (this.length < this.zero + newIndex || newIndex < 0) {
	            throw new Error("End of data reached (data length = " + this.length + ", asked index = " + (newIndex) + "). Corrupted zip ?");
	        }
	    },
	    /**
	     * Change the index.
	     * @param {number} newIndex The new index.
	     * @throws {Error} if the new index is out of the data.
	     */
	    setIndex: function(newIndex) {
	        this.checkIndex(newIndex);
	        this.index = newIndex;
	    },
	    /**
	     * Skip the next n bytes.
	     * @param {number} n the number of bytes to skip.
	     * @throws {Error} if the new index is out of the data.
	     */
	    skip: function(n) {
	        this.setIndex(this.index + n);
	    },
	    /**
	     * Get the byte at the specified index.
	     * @param {number} i the index to use.
	     * @return {number} a byte.
	     */
	    byteAt: function(i) {
	        // see implementations
	    },
	    /**
	     * Get the next number with a given byte size.
	     * @param {number} size the number of bytes to read.
	     * @return {number} the corresponding number.
	     */
	    readInt: function(size) {
	        var result = 0,
	            i;
	        this.checkOffset(size);
	        for (i = this.index + size - 1; i >= this.index; i--) {
	            result = (result << 8) + this.byteAt(i);
	        }
	        this.index += size;
	        return result;
	    },
	    /**
	     * Get the next string with a given byte size.
	     * @param {number} size the number of bytes to read.
	     * @return {string} the corresponding string.
	     */
	    readString: function(size) {
	        return utils.transformTo("string", this.readData(size));
	    },
	    /**
	     * Get raw data without conversion, <size> bytes.
	     * @param {number} size the number of bytes to read.
	     * @return {Object} the raw data, implementation specific.
	     */
	    readData: function(size) {
	        // see implementations
	    },
	    /**
	     * Find the last occurrence of a zip signature (4 bytes).
	     * @param {string} sig the signature to find.
	     * @return {number} the index of the last occurrence, -1 if not found.
	     */
	    lastIndexOfSignature: function(sig) {
	        // see implementations
	    },
	    /**
	     * Read the signature (4 bytes) at the current position and compare it with sig.
	     * @param {string} sig the expected signature
	     * @return {boolean} true if the signature matches, false otherwise.
	     */
	    readAndCheckSignature: function(sig) {
	        // see implementations
	    },
	    /**
	     * Get the next date.
	     * @return {Date} the date.
	     */
	    readDate: function() {
	        var dostime = this.readInt(4);
	        return new Date(Date.UTC(
	        ((dostime >> 25) & 0x7f) + 1980, // year
	        ((dostime >> 21) & 0x0f) - 1, // month
	        (dostime >> 16) & 0x1f, // day
	        (dostime >> 11) & 0x1f, // hour
	        (dostime >> 5) & 0x3f, // minute
	        (dostime & 0x1f) << 1)); // second
	    }
	};
	module.exports = DataReader;

	},{"../utils":32}],19:[function(require,module,exports){
	var Uint8ArrayReader = require('./Uint8ArrayReader');
	var utils = require('../utils');

	function NodeBufferReader(data) {
	    Uint8ArrayReader.call(this, data);
	}
	utils.inherits(NodeBufferReader, Uint8ArrayReader);

	/**
	 * @see DataReader.readData
	 */
	NodeBufferReader.prototype.readData = function(size) {
	    this.checkOffset(size);
	    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
	    this.index += size;
	    return result;
	};
	module.exports = NodeBufferReader;

	},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(require,module,exports){
	var DataReader = require('./DataReader');
	var utils = require('../utils');

	function StringReader(data) {
	    DataReader.call(this, data);
	}
	utils.inherits(StringReader, DataReader);
	/**
	 * @see DataReader.byteAt
	 */
	StringReader.prototype.byteAt = function(i) {
	    return this.data.charCodeAt(this.zero + i);
	};
	/**
	 * @see DataReader.lastIndexOfSignature
	 */
	StringReader.prototype.lastIndexOfSignature = function(sig) {
	    return this.data.lastIndexOf(sig) - this.zero;
	};
	/**
	 * @see DataReader.readAndCheckSignature
	 */
	StringReader.prototype.readAndCheckSignature = function (sig) {
	    var data = this.readData(4);
	    return sig === data;
	};
	/**
	 * @see DataReader.readData
	 */
	StringReader.prototype.readData = function(size) {
	    this.checkOffset(size);
	    // this will work because the constructor applied the "& 0xff" mask.
	    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
	    this.index += size;
	    return result;
	};
	module.exports = StringReader;

	},{"../utils":32,"./DataReader":18}],21:[function(require,module,exports){
	var ArrayReader = require('./ArrayReader');
	var utils = require('../utils');

	function Uint8ArrayReader(data) {
	    ArrayReader.call(this, data);
	}
	utils.inherits(Uint8ArrayReader, ArrayReader);
	/**
	 * @see DataReader.readData
	 */
	Uint8ArrayReader.prototype.readData = function(size) {
	    this.checkOffset(size);
	    if(size === 0) {
	        // in IE10, when using subarray(idx, idx), we get the array [0x00] instead of [].
	        return new Uint8Array(0);
	    }
	    var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
	    this.index += size;
	    return result;
	};
	module.exports = Uint8ArrayReader;

	},{"../utils":32,"./ArrayReader":17}],22:[function(require,module,exports){

	var utils = require('../utils');
	var support = require('../support');
	var ArrayReader = require('./ArrayReader');
	var StringReader = require('./StringReader');
	var NodeBufferReader = require('./NodeBufferReader');
	var Uint8ArrayReader = require('./Uint8ArrayReader');

	/**
	 * Create a reader adapted to the data.
	 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data to read.
	 * @return {DataReader} the data reader.
	 */
	module.exports = function (data) {
	    var type = utils.getTypeOf(data);
	    utils.checkSupport(type);
	    if (type === "string" && !support.uint8array) {
	        return new StringReader(data);
	    }
	    if (type === "nodebuffer") {
	        return new NodeBufferReader(data);
	    }
	    if (support.uint8array) {
	        return new Uint8ArrayReader(utils.transformTo("uint8array", data));
	    }
	    return new ArrayReader(utils.transformTo("array", data));
	};

	},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(require,module,exports){
	exports.LOCAL_FILE_HEADER = "PK\x03\x04";
	exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
	exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
	exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
	exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
	exports.DATA_DESCRIPTOR = "PK\x07\x08";

	},{}],24:[function(require,module,exports){

	var GenericWorker = require('./GenericWorker');
	var utils = require('../utils');

	/**
	 * A worker which convert chunks to a specified type.
	 * @constructor
	 * @param {String} destType the destination type.
	 */
	function ConvertWorker(destType) {
	    GenericWorker.call(this, "ConvertWorker to " + destType);
	    this.destType = destType;
	}
	utils.inherits(ConvertWorker, GenericWorker);

	/**
	 * @see GenericWorker.processChunk
	 */
	ConvertWorker.prototype.processChunk = function (chunk) {
	    this.push({
	        data : utils.transformTo(this.destType, chunk.data),
	        meta : chunk.meta
	    });
	};
	module.exports = ConvertWorker;

	},{"../utils":32,"./GenericWorker":28}],25:[function(require,module,exports){

	var GenericWorker = require('./GenericWorker');
	var crc32 = require('../crc32');
	var utils = require('../utils');

	/**
	 * A worker which calculate the crc32 of the data flowing through.
	 * @constructor
	 */
	function Crc32Probe() {
	    GenericWorker.call(this, "Crc32Probe");
	    this.withStreamInfo("crc32", 0);
	}
	utils.inherits(Crc32Probe, GenericWorker);

	/**
	 * @see GenericWorker.processChunk
	 */
	Crc32Probe.prototype.processChunk = function (chunk) {
	    this.streamInfo.crc32 = crc32(chunk.data, this.streamInfo.crc32 || 0);
	    this.push(chunk);
	};
	module.exports = Crc32Probe;

	},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(require,module,exports){

	var utils = require('../utils');
	var GenericWorker = require('./GenericWorker');

	/**
	 * A worker which calculate the total length of the data flowing through.
	 * @constructor
	 * @param {String} propName the name used to expose the length
	 */
	function DataLengthProbe(propName) {
	    GenericWorker.call(this, "DataLengthProbe for " + propName);
	    this.propName = propName;
	    this.withStreamInfo(propName, 0);
	}
	utils.inherits(DataLengthProbe, GenericWorker);

	/**
	 * @see GenericWorker.processChunk
	 */
	DataLengthProbe.prototype.processChunk = function (chunk) {
	    if(chunk) {
	        var length = this.streamInfo[this.propName] || 0;
	        this.streamInfo[this.propName] = length + chunk.data.length;
	    }
	    GenericWorker.prototype.processChunk.call(this, chunk);
	};
	module.exports = DataLengthProbe;


	},{"../utils":32,"./GenericWorker":28}],27:[function(require,module,exports){

	var utils = require('../utils');
	var GenericWorker = require('./GenericWorker');

	// the size of the generated chunks
	// TODO expose this as a public variable
	var DEFAULT_BLOCK_SIZE = 16 * 1024;

	/**
	 * A worker that reads a content and emits chunks.
	 * @constructor
	 * @param {Promise} dataP the promise of the data to split
	 */
	function DataWorker(dataP) {
	    GenericWorker.call(this, "DataWorker");
	    var self = this;
	    this.dataIsReady = false;
	    this.index = 0;
	    this.max = 0;
	    this.data = null;
	    this.type = "";

	    this._tickScheduled = false;

	    dataP.then(function (data) {
	        self.dataIsReady = true;
	        self.data = data;
	        self.max = data && data.length || 0;
	        self.type = utils.getTypeOf(data);
	        if(!self.isPaused) {
	            self._tickAndRepeat();
	        }
	    }, function (e) {
	        self.error(e);
	    });
	}

	utils.inherits(DataWorker, GenericWorker);

	/**
	 * @see GenericWorker.cleanUp
	 */
	DataWorker.prototype.cleanUp = function () {
	    GenericWorker.prototype.cleanUp.call(this);
	    this.data = null;
	};

	/**
	 * @see GenericWorker.resume
	 */
	DataWorker.prototype.resume = function () {
	    if(!GenericWorker.prototype.resume.call(this)) {
	        return false;
	    }

	    if (!this._tickScheduled && this.dataIsReady) {
	        this._tickScheduled = true;
	        utils.delay(this._tickAndRepeat, [], this);
	    }
	    return true;
	};

	/**
	 * Trigger a tick a schedule an other call to this function.
	 */
	DataWorker.prototype._tickAndRepeat = function() {
	    this._tickScheduled = false;
	    if(this.isPaused || this.isFinished) {
	        return;
	    }
	    this._tick();
	    if(!this.isFinished) {
	        utils.delay(this._tickAndRepeat, [], this);
	        this._tickScheduled = true;
	    }
	};

	/**
	 * Read and push a chunk.
	 */
	DataWorker.prototype._tick = function() {

	    if(this.isPaused || this.isFinished) {
	        return false;
	    }

	    var size = DEFAULT_BLOCK_SIZE;
	    var data = null, nextIndex = Math.min(this.max, this.index + size);
	    if (this.index >= this.max) {
	        // EOF
	        return this.end();
	    } else {
	        switch(this.type) {
	            case "string":
	                data = this.data.substring(this.index, nextIndex);
	            break;
	            case "uint8array":
	                data = this.data.subarray(this.index, nextIndex);
	            break;
	            case "array":
	            case "nodebuffer":
	                data = this.data.slice(this.index, nextIndex);
	            break;
	        }
	        this.index = nextIndex;
	        return this.push({
	            data : data,
	            meta : {
	                percent : this.max ? this.index / this.max * 100 : 0
	            }
	        });
	    }
	};

	module.exports = DataWorker;

	},{"../utils":32,"./GenericWorker":28}],28:[function(require,module,exports){

	/**
	 * A worker that does nothing but passing chunks to the next one. This is like
	 * a nodejs stream but with some differences. On the good side :
	 * - it works on IE 6-9 without any issue / polyfill
	 * - it weights less than the full dependencies bundled with browserify
	 * - it forwards errors (no need to declare an error handler EVERYWHERE)
	 *
	 * A chunk is an object with 2 attributes : `meta` and `data`. The former is an
	 * object containing anything (`percent` for example), see each worker for more
	 * details. The latter is the real data (String, Uint8Array, etc).
	 *
	 * @constructor
	 * @param {String} name the name of the stream (mainly used for debugging purposes)
	 */
	function GenericWorker(name) {
	    // the name of the worker
	    this.name = name || "default";
	    // an object containing metadata about the workers chain
	    this.streamInfo = {};
	    // an error which happened when the worker was paused
	    this.generatedError = null;
	    // an object containing metadata to be merged by this worker into the general metadata
	    this.extraStreamInfo = {};
	    // true if the stream is paused (and should not do anything), false otherwise
	    this.isPaused = true;
	    // true if the stream is finished (and should not do anything), false otherwise
	    this.isFinished = false;
	    // true if the stream is locked to prevent further structure updates (pipe), false otherwise
	    this.isLocked = false;
	    // the event listeners
	    this._listeners = {
	        'data':[],
	        'end':[],
	        'error':[]
	    };
	    // the previous worker, if any
	    this.previous = null;
	}

	GenericWorker.prototype = {
	    /**
	     * Push a chunk to the next workers.
	     * @param {Object} chunk the chunk to push
	     */
	    push : function (chunk) {
	        this.emit("data", chunk);
	    },
	    /**
	     * End the stream.
	     * @return {Boolean} true if this call ended the worker, false otherwise.
	     */
	    end : function () {
	        if (this.isFinished) {
	            return false;
	        }

	        this.flush();
	        try {
	            this.emit("end");
	            this.cleanUp();
	            this.isFinished = true;
	        } catch (e) {
	            this.emit("error", e);
	        }
	        return true;
	    },
	    /**
	     * End the stream with an error.
	     * @param {Error} e the error which caused the premature end.
	     * @return {Boolean} true if this call ended the worker with an error, false otherwise.
	     */
	    error : function (e) {
	        if (this.isFinished) {
	            return false;
	        }

	        if(this.isPaused) {
	            this.generatedError = e;
	        } else {
	            this.isFinished = true;

	            this.emit("error", e);

	            // in the workers chain exploded in the middle of the chain,
	            // the error event will go downward but we also need to notify
	            // workers upward that there has been an error.
	            if(this.previous) {
	                this.previous.error(e);
	            }

	            this.cleanUp();
	        }
	        return true;
	    },
	    /**
	     * Add a callback on an event.
	     * @param {String} name the name of the event (data, end, error)
	     * @param {Function} listener the function to call when the event is triggered
	     * @return {GenericWorker} the current object for chainability
	     */
	    on : function (name, listener) {
	        this._listeners[name].push(listener);
	        return this;
	    },
	    /**
	     * Clean any references when a worker is ending.
	     */
	    cleanUp : function () {
	        this.streamInfo = this.generatedError = this.extraStreamInfo = null;
	        this._listeners = [];
	    },
	    /**
	     * Trigger an event. This will call registered callback with the provided arg.
	     * @param {String} name the name of the event (data, end, error)
	     * @param {Object} arg the argument to call the callback with.
	     */
	    emit : function (name, arg) {
	        if (this._listeners[name]) {
	            for(var i = 0; i < this._listeners[name].length; i++) {
	                this._listeners[name][i].call(this, arg);
	            }
	        }
	    },
	    /**
	     * Chain a worker with an other.
	     * @param {Worker} next the worker receiving events from the current one.
	     * @return {worker} the next worker for chainability
	     */
	    pipe : function (next) {
	        return next.registerPrevious(this);
	    },
	    /**
	     * Same as `pipe` in the other direction.
	     * Using an API with `pipe(next)` is very easy.
	     * Implementing the API with the point of view of the next one registering
	     * a source is easier, see the ZipFileWorker.
	     * @param {Worker} previous the previous worker, sending events to this one
	     * @return {Worker} the current worker for chainability
	     */
	    registerPrevious : function (previous) {
	        if (this.isLocked) {
	            throw new Error("The stream '" + this + "' has already been used.");
	        }

	        // sharing the streamInfo...
	        this.streamInfo = previous.streamInfo;
	        // ... and adding our own bits
	        this.mergeStreamInfo();
	        this.previous =  previous;
	        var self = this;
	        previous.on('data', function (chunk) {
	            self.processChunk(chunk);
	        });
	        previous.on('end', function () {
	            self.end();
	        });
	        previous.on('error', function (e) {
	            self.error(e);
	        });
	        return this;
	    },
	    /**
	     * Pause the stream so it doesn't send events anymore.
	     * @return {Boolean} true if this call paused the worker, false otherwise.
	     */
	    pause : function () {
	        if(this.isPaused || this.isFinished) {
	            return false;
	        }
	        this.isPaused = true;

	        if(this.previous) {
	            this.previous.pause();
	        }
	        return true;
	    },
	    /**
	     * Resume a paused stream.
	     * @return {Boolean} true if this call resumed the worker, false otherwise.
	     */
	    resume : function () {
	        if(!this.isPaused || this.isFinished) {
	            return false;
	        }
	        this.isPaused = false;

	        // if true, the worker tried to resume but failed
	        var withError = false;
	        if(this.generatedError) {
	            this.error(this.generatedError);
	            withError = true;
	        }
	        if(this.previous) {
	            this.previous.resume();
	        }

	        return !withError;
	    },
	    /**
	     * Flush any remaining bytes as the stream is ending.
	     */
	    flush : function () {},
	    /**
	     * Process a chunk. This is usually the method overridden.
	     * @param {Object} chunk the chunk to process.
	     */
	    processChunk : function(chunk) {
	        this.push(chunk);
	    },
	    /**
	     * Add a key/value to be added in the workers chain streamInfo once activated.
	     * @param {String} key the key to use
	     * @param {Object} value the associated value
	     * @return {Worker} the current worker for chainability
	     */
	    withStreamInfo : function (key, value) {
	        this.extraStreamInfo[key] = value;
	        this.mergeStreamInfo();
	        return this;
	    },
	    /**
	     * Merge this worker's streamInfo into the chain's streamInfo.
	     */
	    mergeStreamInfo : function () {
	        for(var key in this.extraStreamInfo) {
	            if (!this.extraStreamInfo.hasOwnProperty(key)) {
	                continue;
	            }
	            this.streamInfo[key] = this.extraStreamInfo[key];
	        }
	    },

	    /**
	     * Lock the stream to prevent further updates on the workers chain.
	     * After calling this method, all calls to pipe will fail.
	     */
	    lock: function () {
	        if (this.isLocked) {
	            throw new Error("The stream '" + this + "' has already been used.");
	        }
	        this.isLocked = true;
	        if (this.previous) {
	            this.previous.lock();
	        }
	    },

	    /**
	     *
	     * Pretty print the workers chain.
	     */
	    toString : function () {
	        var me = "Worker " + this.name;
	        if (this.previous) {
	            return this.previous + " -> " + me;
	        } else {
	            return me;
	        }
	    }
	};

	module.exports = GenericWorker;

	},{}],29:[function(require,module,exports){

	var utils = require('../utils');
	var ConvertWorker = require('./ConvertWorker');
	var GenericWorker = require('./GenericWorker');
	var base64 = require('../base64');
	var support = require("../support");
	var external = require("../external");

	var NodejsStreamOutputAdapter = null;
	if (support.nodestream) {
	    try {
	        NodejsStreamOutputAdapter = require('../nodejs/NodejsStreamOutputAdapter');
	    } catch(e) {}
	}

	/**
	 * Apply the final transformation of the data. If the user wants a Blob for
	 * example, it's easier to work with an U8intArray and finally do the
	 * ArrayBuffer/Blob conversion.
	 * @param {String} type the name of the final type
	 * @param {String|Uint8Array|Buffer} content the content to transform
	 * @param {String} mimeType the mime type of the content, if applicable.
	 * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the content in the right format.
	 */
	function transformZipOutput(type, content, mimeType) {
	    switch(type) {
	        case "blob" :
	            return utils.newBlob(utils.transformTo("arraybuffer", content), mimeType);
	        case "base64" :
	            return base64.encode(content);
	        default :
	            return utils.transformTo(type, content);
	    }
	}

	/**
	 * Concatenate an array of data of the given type.
	 * @param {String} type the type of the data in the given array.
	 * @param {Array} dataArray the array containing the data chunks to concatenate
	 * @return {String|Uint8Array|Buffer} the concatenated data
	 * @throws Error if the asked type is unsupported
	 */
	function concat (type, dataArray) {
	    var i, index = 0, res = null, totalLength = 0;
	    for(i = 0; i < dataArray.length; i++) {
	        totalLength += dataArray[i].length;
	    }
	    switch(type) {
	        case "string":
	            return dataArray.join("");
	          case "array":
	            return Array.prototype.concat.apply([], dataArray);
	        case "uint8array":
	            res = new Uint8Array(totalLength);
	            for(i = 0; i < dataArray.length; i++) {
	                res.set(dataArray[i], index);
	                index += dataArray[i].length;
	            }
	            return res;
	        case "nodebuffer":
	            return Buffer.concat(dataArray);
	        default:
	            throw new Error("concat : unsupported type '"  + type + "'");
	    }
	}

	/**
	 * Listen a StreamHelper, accumulate its content and concatenate it into a
	 * complete block.
	 * @param {StreamHelper} helper the helper to use.
	 * @param {Function} updateCallback a callback called on each update. Called
	 * with one arg :
	 * - the metadata linked to the update received.
	 * @return Promise the promise for the accumulation.
	 */
	function accumulate(helper, updateCallback) {
	    return new external.Promise(function (resolve, reject){
	        var dataArray = [];
	        var chunkType = helper._internalType,
	            resultType = helper._outputType,
	            mimeType = helper._mimeType;
	        helper
	        .on('data', function (data, meta) {
	            dataArray.push(data);
	            if(updateCallback) {
	                updateCallback(meta);
	            }
	        })
	        .on('error', function(err) {
	            dataArray = [];
	            reject(err);
	        })
	        .on('end', function (){
	            try {
	                var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);
	                resolve(result);
	            } catch (e) {
	                reject(e);
	            }
	            dataArray = [];
	        })
	        .resume();
	    });
	}

	/**
	 * An helper to easily use workers outside of JSZip.
	 * @constructor
	 * @param {Worker} worker the worker to wrap
	 * @param {String} outputType the type of data expected by the use
	 * @param {String} mimeType the mime type of the content, if applicable.
	 */
	function StreamHelper(worker, outputType, mimeType) {
	    var internalType = outputType;
	    switch(outputType) {
	        case "blob":
	        case "arraybuffer":
	            internalType = "uint8array";
	        break;
	        case "base64":
	            internalType = "string";
	        break;
	    }

	    try {
	        // the type used internally
	        this._internalType = internalType;
	        // the type used to output results
	        this._outputType = outputType;
	        // the mime type
	        this._mimeType = mimeType;
	        utils.checkSupport(internalType);
	        this._worker = worker.pipe(new ConvertWorker(internalType));
	        // the last workers can be rewired without issues but we need to
	        // prevent any updates on previous workers.
	        worker.lock();
	    } catch(e) {
	        this._worker = new GenericWorker("error");
	        this._worker.error(e);
	    }
	}

	StreamHelper.prototype = {
	    /**
	     * Listen a StreamHelper, accumulate its content and concatenate it into a
	     * complete block.
	     * @param {Function} updateCb the update callback.
	     * @return Promise the promise for the accumulation.
	     */
	    accumulate : function (updateCb) {
	        return accumulate(this, updateCb);
	    },
	    /**
	     * Add a listener on an event triggered on a stream.
	     * @param {String} evt the name of the event
	     * @param {Function} fn the listener
	     * @return {StreamHelper} the current helper.
	     */
	    on : function (evt, fn) {
	        var self = this;

	        if(evt === "data") {
	            this._worker.on(evt, function (chunk) {
	                fn.call(self, chunk.data, chunk.meta);
	            });
	        } else {
	            this._worker.on(evt, function () {
	                utils.delay(fn, arguments, self);
	            });
	        }
	        return this;
	    },
	    /**
	     * Resume the flow of chunks.
	     * @return {StreamHelper} the current helper.
	     */
	    resume : function () {
	        utils.delay(this._worker.resume, [], this._worker);
	        return this;
	    },
	    /**
	     * Pause the flow of chunks.
	     * @return {StreamHelper} the current helper.
	     */
	    pause : function () {
	        this._worker.pause();
	        return this;
	    },
	    /**
	     * Return a nodejs stream for this helper.
	     * @param {Function} updateCb the update callback.
	     * @return {NodejsStreamOutputAdapter} the nodejs stream.
	     */
	    toNodejsStream : function (updateCb) {
	        utils.checkSupport("nodestream");
	        if (this._outputType !== "nodebuffer") {
	            // an object stream containing blob/arraybuffer/uint8array/string
	            // is strange and I don't know if it would be useful.
	            // I you find this comment and have a good usecase, please open a
	            // bug report !
	            throw new Error(this._outputType + " is not supported by this method");
	        }

	        return new NodejsStreamOutputAdapter(this, {
	            objectMode : this._outputType !== "nodebuffer"
	        }, updateCb);
	    }
	};


	module.exports = StreamHelper;

	},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(require,module,exports){

	exports.base64 = true;
	exports.array = true;
	exports.string = true;
	exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
	exports.nodebuffer = typeof Buffer !== "undefined";
	// contains true if JSZip can read/generate Uint8Array, false otherwise.
	exports.uint8array = typeof Uint8Array !== "undefined";

	if (typeof ArrayBuffer === "undefined") {
	    exports.blob = false;
	}
	else {
	    var buffer = new ArrayBuffer(0);
	    try {
	        exports.blob = new Blob([buffer], {
	            type: "application/zip"
	        }).size === 0;
	    }
	    catch (e) {
	        try {
	            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
	            var builder = new Builder();
	            builder.append(buffer);
	            exports.blob = builder.getBlob('application/zip').size === 0;
	        }
	        catch (e) {
	            exports.blob = false;
	        }
	    }
	}

	try {
	    exports.nodestream = !!require('readable-stream').Readable;
	} catch(e) {
	    exports.nodestream = false;
	}

	},{"readable-stream":16}],31:[function(require,module,exports){

	var utils = require('./utils');
	var support = require('./support');
	var nodejsUtils = require('./nodejsUtils');
	var GenericWorker = require('./stream/GenericWorker');

	/**
	 * The following functions come from pako, from pako/lib/utils/strings
	 * released under the MIT license, see pako https://github.com/nodeca/pako/
	 */

	// Table with utf8 lengths (calculated by first byte of sequence)
	// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
	// because max possible codepoint is 0x10ffff
	var _utf8len = new Array(256);
	for (var i=0; i<256; i++) {
	  _utf8len[i] = (i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1);
	}
	_utf8len[254]=_utf8len[254]=1; // Invalid sequence start

	// convert string to array (typed, when possible)
	var string2buf = function (str) {
	    var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

	    // count binary size
	    for (m_pos = 0; m_pos < str_len; m_pos++) {
	        c = str.charCodeAt(m_pos);
	        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
	            c2 = str.charCodeAt(m_pos+1);
	            if ((c2 & 0xfc00) === 0xdc00) {
	                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
	                m_pos++;
	            }
	        }
	        buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
	    }

	    // allocate buffer
	    if (support.uint8array) {
	        buf = new Uint8Array(buf_len);
	    } else {
	        buf = new Array(buf_len);
	    }

	    // convert
	    for (i=0, m_pos = 0; i < buf_len; m_pos++) {
	        c = str.charCodeAt(m_pos);
	        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
	            c2 = str.charCodeAt(m_pos+1);
	            if ((c2 & 0xfc00) === 0xdc00) {
	                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
	                m_pos++;
	            }
	        }
	        if (c < 0x80) {
	            /* one byte */
	            buf[i++] = c;
	        } else if (c < 0x800) {
	            /* two bytes */
	            buf[i++] = 0xC0 | (c >>> 6);
	            buf[i++] = 0x80 | (c & 0x3f);
	        } else if (c < 0x10000) {
	            /* three bytes */
	            buf[i++] = 0xE0 | (c >>> 12);
	            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
	            buf[i++] = 0x80 | (c & 0x3f);
	        } else {
	            /* four bytes */
	            buf[i++] = 0xf0 | (c >>> 18);
	            buf[i++] = 0x80 | (c >>> 12 & 0x3f);
	            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
	            buf[i++] = 0x80 | (c & 0x3f);
	        }
	    }

	    return buf;
	};

	// Calculate max possible position in utf8 buffer,
	// that will not break sequence. If that's not possible
	// - (very small limits) return max size as is.
	//
	// buf[] - utf8 bytes array
	// max   - length limit (mandatory);
	var utf8border = function(buf, max) {
	    var pos;

	    max = max || buf.length;
	    if (max > buf.length) { max = buf.length; }

	    // go back from last position, until start of sequence found
	    pos = max-1;
	    while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

	    // Fuckup - very small and broken sequence,
	    // return max, because we should return something anyway.
	    if (pos < 0) { return max; }

	    // If we came to start of buffer - that means vuffer is too small,
	    // return max too.
	    if (pos === 0) { return max; }

	    return (pos + _utf8len[buf[pos]] > max) ? pos : max;
	};

	// convert array to string
	var buf2string = function (buf) {
	    var i, out, c, c_len;
	    var len = buf.length;

	    // Reserve max possible length (2 words per char)
	    // NB: by unknown reasons, Array is significantly faster for
	    //     String.fromCharCode.apply than Uint16Array.
	    var utf16buf = new Array(len*2);

	    for (out=0, i=0; i<len;) {
	        c = buf[i++];
	        // quick process ascii
	        if (c < 0x80) { utf16buf[out++] = c; continue; }

	        c_len = _utf8len[c];
	        // skip 5 & 6 byte codes
	        if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len-1; continue; }

	        // apply mask on first byte
	        c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
	        // join the rest
	        while (c_len > 1 && i < len) {
	            c = (c << 6) | (buf[i++] & 0x3f);
	            c_len--;
	        }

	        // terminated by end of string?
	        if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

	        if (c < 0x10000) {
	            utf16buf[out++] = c;
	        } else {
	            c -= 0x10000;
	            utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
	            utf16buf[out++] = 0xdc00 | (c & 0x3ff);
	        }
	    }

	    // shrinkBuf(utf16buf, out)
	    if (utf16buf.length !== out) {
	        if(utf16buf.subarray) {
	            utf16buf = utf16buf.subarray(0, out);
	        } else {
	            utf16buf.length = out;
	        }
	    }

	    // return String.fromCharCode.apply(null, utf16buf);
	    return utils.applyFromCharCode(utf16buf);
	};


	// That's all for the pako functions.


	/**
	 * Transform a javascript string into an array (typed if possible) of bytes,
	 * UTF-8 encoded.
	 * @param {String} str the string to encode
	 * @return {Array|Uint8Array|Buffer} the UTF-8 encoded string.
	 */
	exports.utf8encode = function utf8encode(str) {
	    if (support.nodebuffer) {
	        return nodejsUtils.newBufferFrom(str, "utf-8");
	    }

	    return string2buf(str);
	};


	/**
	 * Transform a bytes array (or a representation) representing an UTF-8 encoded
	 * string into a javascript string.
	 * @param {Array|Uint8Array|Buffer} buf the data de decode
	 * @return {String} the decoded string.
	 */
	exports.utf8decode = function utf8decode(buf) {
	    if (support.nodebuffer) {
	        return utils.transformTo("nodebuffer", buf).toString("utf-8");
	    }

	    buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);

	    return buf2string(buf);
	};

	/**
	 * A worker to decode utf8 encoded binary chunks into string chunks.
	 * @constructor
	 */
	function Utf8DecodeWorker() {
	    GenericWorker.call(this, "utf-8 decode");
	    // the last bytes if a chunk didn't end with a complete codepoint.
	    this.leftOver = null;
	}
	utils.inherits(Utf8DecodeWorker, GenericWorker);

	/**
	 * @see GenericWorker.processChunk
	 */
	Utf8DecodeWorker.prototype.processChunk = function (chunk) {

	    var data = utils.transformTo(support.uint8array ? "uint8array" : "array", chunk.data);

	    // 1st step, re-use what's left of the previous chunk
	    if (this.leftOver && this.leftOver.length) {
	        if(support.uint8array) {
	            var previousData = data;
	            data = new Uint8Array(previousData.length + this.leftOver.length);
	            data.set(this.leftOver, 0);
	            data.set(previousData, this.leftOver.length);
	        } else {
	            data = this.leftOver.concat(data);
	        }
	        this.leftOver = null;
	    }

	    var nextBoundary = utf8border(data);
	    var usableData = data;
	    if (nextBoundary !== data.length) {
	        if (support.uint8array) {
	            usableData = data.subarray(0, nextBoundary);
	            this.leftOver = data.subarray(nextBoundary, data.length);
	        } else {
	            usableData = data.slice(0, nextBoundary);
	            this.leftOver = data.slice(nextBoundary, data.length);
	        }
	    }

	    this.push({
	        data : exports.utf8decode(usableData),
	        meta : chunk.meta
	    });
	};

	/**
	 * @see GenericWorker.flush
	 */
	Utf8DecodeWorker.prototype.flush = function () {
	    if(this.leftOver && this.leftOver.length) {
	        this.push({
	            data : exports.utf8decode(this.leftOver),
	            meta : {}
	        });
	        this.leftOver = null;
	    }
	};
	exports.Utf8DecodeWorker = Utf8DecodeWorker;

	/**
	 * A worker to endcode string chunks into utf8 encoded binary chunks.
	 * @constructor
	 */
	function Utf8EncodeWorker() {
	    GenericWorker.call(this, "utf-8 encode");
	}
	utils.inherits(Utf8EncodeWorker, GenericWorker);

	/**
	 * @see GenericWorker.processChunk
	 */
	Utf8EncodeWorker.prototype.processChunk = function (chunk) {
	    this.push({
	        data : exports.utf8encode(chunk.data),
	        meta : chunk.meta
	    });
	};
	exports.Utf8EncodeWorker = Utf8EncodeWorker;

	},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(require,module,exports){

	var support = require('./support');
	var base64 = require('./base64');
	var nodejsUtils = require('./nodejsUtils');
	var setImmediate = require('set-immediate-shim');
	var external = require("./external");


	/**
	 * Convert a string that pass as a "binary string": it should represent a byte
	 * array but may have > 255 char codes. Be sure to take only the first byte
	 * and returns the byte array.
	 * @param {String} str the string to transform.
	 * @return {Array|Uint8Array} the string in a binary format.
	 */
	function string2binary(str) {
	    var result = null;
	    if (support.uint8array) {
	      result = new Uint8Array(str.length);
	    } else {
	      result = new Array(str.length);
	    }
	    return stringToArrayLike(str, result);
	}

	/**
	 * Create a new blob with the given content and the given type.
	 * @param {String|ArrayBuffer} part the content to put in the blob. DO NOT use
	 * an Uint8Array because the stock browser of android 4 won't accept it (it
	 * will be silently converted to a string, "[object Uint8Array]").
	 *
	 * Use only ONE part to build the blob to avoid a memory leak in IE11 / Edge:
	 * when a large amount of Array is used to create the Blob, the amount of
	 * memory consumed is nearly 100 times the original data amount.
	 *
	 * @param {String} type the mime type of the blob.
	 * @return {Blob} the created blob.
	 */
	exports.newBlob = function(part, type) {
	    exports.checkSupport("blob");

	    try {
	        // Blob constructor
	        return new Blob([part], {
	            type: type
	        });
	    }
	    catch (e) {

	        try {
	            // deprecated, browser only, old way
	            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
	            var builder = new Builder();
	            builder.append(part);
	            return builder.getBlob(type);
	        }
	        catch (e) {

	            // well, fuck ?!
	            throw new Error("Bug : can't construct the Blob.");
	        }
	    }


	};
	/**
	 * The identity function.
	 * @param {Object} input the input.
	 * @return {Object} the same input.
	 */
	function identity(input) {
	    return input;
	}

	/**
	 * Fill in an array with a string.
	 * @param {String} str the string to use.
	 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to fill in (will be mutated).
	 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated array.
	 */
	function stringToArrayLike(str, array) {
	    for (var i = 0; i < str.length; ++i) {
	        array[i] = str.charCodeAt(i) & 0xFF;
	    }
	    return array;
	}

	/**
	 * An helper for the function arrayLikeToString.
	 * This contains static information and functions that
	 * can be optimized by the browser JIT compiler.
	 */
	var arrayToStringHelper = {
	    /**
	     * Transform an array of int into a string, chunk by chunk.
	     * See the performances notes on arrayLikeToString.
	     * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
	     * @param {String} type the type of the array.
	     * @param {Integer} chunk the chunk size.
	     * @return {String} the resulting string.
	     * @throws Error if the chunk is too big for the stack.
	     */
	    stringifyByChunk: function(array, type, chunk) {
	        var result = [], k = 0, len = array.length;
	        // shortcut
	        if (len <= chunk) {
	            return String.fromCharCode.apply(null, array);
	        }
	        while (k < len) {
	            if (type === "array" || type === "nodebuffer") {
	                result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
	            }
	            else {
	                result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
	            }
	            k += chunk;
	        }
	        return result.join("");
	    },
	    /**
	     * Call String.fromCharCode on every item in the array.
	     * This is the naive implementation, which generate A LOT of intermediate string.
	     * This should be used when everything else fail.
	     * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
	     * @return {String} the result.
	     */
	    stringifyByChar: function(array){
	        var resultStr = "";
	        for(var i = 0; i < array.length; i++) {
	            resultStr += String.fromCharCode(array[i]);
	        }
	        return resultStr;
	    },
	    applyCanBeUsed : {
	        /**
	         * true if the browser accepts to use String.fromCharCode on Uint8Array
	         */
	        uint8array : (function () {
	            try {
	                return support.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
	            } catch (e) {
	                return false;
	            }
	        })(),
	        /**
	         * true if the browser accepts to use String.fromCharCode on nodejs Buffer.
	         */
	        nodebuffer : (function () {
	            try {
	                return support.nodebuffer && String.fromCharCode.apply(null, nodejsUtils.allocBuffer(1)).length === 1;
	            } catch (e) {
	                return false;
	            }
	        })()
	    }
	};

	/**
	 * Transform an array-like object to a string.
	 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
	 * @return {String} the result.
	 */
	function arrayLikeToString(array) {
	    // Performances notes :
	    // --------------------
	    // String.fromCharCode.apply(null, array) is the fastest, see
	    // see http://jsperf.com/converting-a-uint8array-to-a-string/2
	    // but the stack is limited (and we can get huge arrays !).
	    //
	    // result += String.fromCharCode(array[i]); generate too many strings !
	    //
	    // This code is inspired by http://jsperf.com/arraybuffer-to-string-apply-performance/2
	    // TODO : we now have workers that split the work. Do we still need that ?
	    var chunk = 65536,
	        type = exports.getTypeOf(array),
	        canUseApply = true;
	    if (type === "uint8array") {
	        canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;
	    } else if (type === "nodebuffer") {
	        canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;
	    }

	    if (canUseApply) {
	        while (chunk > 1) {
	            try {
	                return arrayToStringHelper.stringifyByChunk(array, type, chunk);
	            } catch (e) {
	                chunk = Math.floor(chunk / 2);
	            }
	        }
	    }

	    // no apply or chunk error : slow and painful algorithm
	    // default browser on android 4.*
	    return arrayToStringHelper.stringifyByChar(array);
	}

	exports.applyFromCharCode = arrayLikeToString;


	/**
	 * Copy the data from an array-like to an other array-like.
	 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayFrom the origin array.
	 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayTo the destination array which will be mutated.
	 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated destination array.
	 */
	function arrayLikeToArrayLike(arrayFrom, arrayTo) {
	    for (var i = 0; i < arrayFrom.length; i++) {
	        arrayTo[i] = arrayFrom[i];
	    }
	    return arrayTo;
	}

	// a matrix containing functions to transform everything into everything.
	var transform = {};

	// string to ?
	transform["string"] = {
	    "string": identity,
	    "array": function(input) {
	        return stringToArrayLike(input, new Array(input.length));
	    },
	    "arraybuffer": function(input) {
	        return transform["string"]["uint8array"](input).buffer;
	    },
	    "uint8array": function(input) {
	        return stringToArrayLike(input, new Uint8Array(input.length));
	    },
	    "nodebuffer": function(input) {
	        return stringToArrayLike(input, nodejsUtils.allocBuffer(input.length));
	    }
	};

	// array to ?
	transform["array"] = {
	    "string": arrayLikeToString,
	    "array": identity,
	    "arraybuffer": function(input) {
	        return (new Uint8Array(input)).buffer;
	    },
	    "uint8array": function(input) {
	        return new Uint8Array(input);
	    },
	    "nodebuffer": function(input) {
	        return nodejsUtils.newBufferFrom(input);
	    }
	};

	// arraybuffer to ?
	transform["arraybuffer"] = {
	    "string": function(input) {
	        return arrayLikeToString(new Uint8Array(input));
	    },
	    "array": function(input) {
	        return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
	    },
	    "arraybuffer": identity,
	    "uint8array": function(input) {
	        return new Uint8Array(input);
	    },
	    "nodebuffer": function(input) {
	        return nodejsUtils.newBufferFrom(new Uint8Array(input));
	    }
	};

	// uint8array to ?
	transform["uint8array"] = {
	    "string": arrayLikeToString,
	    "array": function(input) {
	        return arrayLikeToArrayLike(input, new Array(input.length));
	    },
	    "arraybuffer": function(input) {
	        return input.buffer;
	    },
	    "uint8array": identity,
	    "nodebuffer": function(input) {
	        return nodejsUtils.newBufferFrom(input);
	    }
	};

	// nodebuffer to ?
	transform["nodebuffer"] = {
	    "string": arrayLikeToString,
	    "array": function(input) {
	        return arrayLikeToArrayLike(input, new Array(input.length));
	    },
	    "arraybuffer": function(input) {
	        return transform["nodebuffer"]["uint8array"](input).buffer;
	    },
	    "uint8array": function(input) {
	        return arrayLikeToArrayLike(input, new Uint8Array(input.length));
	    },
	    "nodebuffer": identity
	};

	/**
	 * Transform an input into any type.
	 * The supported output type are : string, array, uint8array, arraybuffer, nodebuffer.
	 * If no output type is specified, the unmodified input will be returned.
	 * @param {String} outputType the output type.
	 * @param {String|Array|ArrayBuffer|Uint8Array|Buffer} input the input to convert.
	 * @throws {Error} an Error if the browser doesn't support the requested output type.
	 */
	exports.transformTo = function(outputType, input) {
	    if (!input) {
	        // undefined, null, etc
	        // an empty string won't harm.
	        input = "";
	    }
	    if (!outputType) {
	        return input;
	    }
	    exports.checkSupport(outputType);
	    var inputType = exports.getTypeOf(input);
	    var result = transform[inputType][outputType](input);
	    return result;
	};

	/**
	 * Return the type of the input.
	 * The type will be in a format valid for JSZip.utils.transformTo : string, array, uint8array, arraybuffer.
	 * @param {Object} input the input to identify.
	 * @return {String} the (lowercase) type of the input.
	 */
	exports.getTypeOf = function(input) {
	    if (typeof input === "string") {
	        return "string";
	    }
	    if (Object.prototype.toString.call(input) === "[object Array]") {
	        return "array";
	    }
	    if (support.nodebuffer && nodejsUtils.isBuffer(input)) {
	        return "nodebuffer";
	    }
	    if (support.uint8array && input instanceof Uint8Array) {
	        return "uint8array";
	    }
	    if (support.arraybuffer && input instanceof ArrayBuffer) {
	        return "arraybuffer";
	    }
	};

	/**
	 * Throw an exception if the type is not supported.
	 * @param {String} type the type to check.
	 * @throws {Error} an Error if the browser doesn't support the requested type.
	 */
	exports.checkSupport = function(type) {
	    var supported = support[type.toLowerCase()];
	    if (!supported) {
	        throw new Error(type + " is not supported by this platform");
	    }
	};

	exports.MAX_VALUE_16BITS = 65535;
	exports.MAX_VALUE_32BITS = -1; // well, "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF" is parsed as -1

	/**
	 * Prettify a string read as binary.
	 * @param {string} str the string to prettify.
	 * @return {string} a pretty string.
	 */
	exports.pretty = function(str) {
	    var res = '',
	        code, i;
	    for (i = 0; i < (str || "").length; i++) {
	        code = str.charCodeAt(i);
	        res += '\\x' + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
	    }
	    return res;
	};

	/**
	 * Defer the call of a function.
	 * @param {Function} callback the function to call asynchronously.
	 * @param {Array} args the arguments to give to the callback.
	 */
	exports.delay = function(callback, args, self) {
	    setImmediate(function () {
	        callback.apply(self || null, args || []);
	    });
	};

	/**
	 * Extends a prototype with an other, without calling a constructor with
	 * side effects. Inspired by nodejs' `utils.inherits`
	 * @param {Function} ctor the constructor to augment
	 * @param {Function} superCtor the parent constructor to use
	 */
	exports.inherits = function (ctor, superCtor) {
	    var Obj = function() {};
	    Obj.prototype = superCtor.prototype;
	    ctor.prototype = new Obj();
	};

	/**
	 * Merge the objects passed as parameters into a new one.
	 * @private
	 * @param {...Object} var_args All objects to merge.
	 * @return {Object} a new object with the data of the others.
	 */
	exports.extend = function() {
	    var result = {}, i, attr;
	    for (i = 0; i < arguments.length; i++) { // arguments is not enumerable in some browsers
	        for (attr in arguments[i]) {
	            if (arguments[i].hasOwnProperty(attr) && typeof result[attr] === "undefined") {
	                result[attr] = arguments[i][attr];
	            }
	        }
	    }
	    return result;
	};

	/**
	 * Transform arbitrary content into a Promise.
	 * @param {String} name a name for the content being processed.
	 * @param {Object} inputData the content to process.
	 * @param {Boolean} isBinary true if the content is not an unicode string
	 * @param {Boolean} isOptimizedBinaryString true if the string content only has one byte per character.
	 * @param {Boolean} isBase64 true if the string content is encoded with base64.
	 * @return {Promise} a promise in a format usable by JSZip.
	 */
	exports.prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {

	    // if inputData is already a promise, this flatten it.
	    var promise = external.Promise.resolve(inputData).then(function(data) {
	        
	        
	        var isBlob = support.blob && (data instanceof Blob || ['[object File]', '[object Blob]'].indexOf(Object.prototype.toString.call(data)) !== -1);

	        if (isBlob && typeof FileReader !== "undefined") {
	            return new external.Promise(function (resolve, reject) {
	                var reader = new FileReader();

	                reader.onload = function(e) {
	                    resolve(e.target.result);
	                };
	                reader.onerror = function(e) {
	                    reject(e.target.error);
	                };
	                reader.readAsArrayBuffer(data);
	            });
	        } else {
	            return data;
	        }
	    });

	    return promise.then(function(data) {
	        var dataType = exports.getTypeOf(data);

	        if (!dataType) {
	            return external.Promise.reject(
	                new Error("Can't read the data of '" + name + "'. Is it " +
	                          "in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")
	            );
	        }
	        // special case : it's way easier to work with Uint8Array than with ArrayBuffer
	        if (dataType === "arraybuffer") {
	            data = exports.transformTo("uint8array", data);
	        } else if (dataType === "string") {
	            if (isBase64) {
	                data = base64.decode(data);
	            }
	            else if (isBinary) {
	                // optimizedBinaryString === true means that the file has already been filtered with a 0xFF mask
	                if (isOptimizedBinaryString !== true) {
	                    // this is a string, not in a base64 format.
	                    // Be sure that this is a correct "binary string"
	                    data = string2binary(data);
	                }
	            }
	        }
	        return data;
	    });
	};

	},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"set-immediate-shim":54}],33:[function(require,module,exports){
	var readerFor = require('./reader/readerFor');
	var utils = require('./utils');
	var sig = require('./signature');
	var ZipEntry = require('./zipEntry');
	var utf8 = require('./utf8');
	var support = require('./support');
	//  class ZipEntries {{{
	/**
	 * All the entries in the zip file.
	 * @constructor
	 * @param {Object} loadOptions Options for loading the stream.
	 */
	function ZipEntries(loadOptions) {
	    this.files = [];
	    this.loadOptions = loadOptions;
	}
	ZipEntries.prototype = {
	    /**
	     * Check that the reader is on the specified signature.
	     * @param {string} expectedSignature the expected signature.
	     * @throws {Error} if it is an other signature.
	     */
	    checkSignature: function(expectedSignature) {
	        if (!this.reader.readAndCheckSignature(expectedSignature)) {
	            this.reader.index -= 4;
	            var signature = this.reader.readString(4);
	            throw new Error("Corrupted zip or bug: unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
	        }
	    },
	    /**
	     * Check if the given signature is at the given index.
	     * @param {number} askedIndex the index to check.
	     * @param {string} expectedSignature the signature to expect.
	     * @return {boolean} true if the signature is here, false otherwise.
	     */
	    isSignature: function(askedIndex, expectedSignature) {
	        var currentIndex = this.reader.index;
	        this.reader.setIndex(askedIndex);
	        var signature = this.reader.readString(4);
	        var result = signature === expectedSignature;
	        this.reader.setIndex(currentIndex);
	        return result;
	    },
	    /**
	     * Read the end of the central directory.
	     */
	    readBlockEndOfCentral: function() {
	        this.diskNumber = this.reader.readInt(2);
	        this.diskWithCentralDirStart = this.reader.readInt(2);
	        this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
	        this.centralDirRecords = this.reader.readInt(2);
	        this.centralDirSize = this.reader.readInt(4);
	        this.centralDirOffset = this.reader.readInt(4);

	        this.zipCommentLength = this.reader.readInt(2);
	        // warning : the encoding depends of the system locale
	        // On a linux machine with LANG=en_US.utf8, this field is utf8 encoded.
	        // On a windows machine, this field is encoded with the localized windows code page.
	        var zipComment = this.reader.readData(this.zipCommentLength);
	        var decodeParamType = support.uint8array ? "uint8array" : "array";
	        // To get consistent behavior with the generation part, we will assume that
	        // this is utf8 encoded unless specified otherwise.
	        var decodeContent = utils.transformTo(decodeParamType, zipComment);
	        this.zipComment = this.loadOptions.decodeFileName(decodeContent);
	    },
	    /**
	     * Read the end of the Zip 64 central directory.
	     * Not merged with the method readEndOfCentral :
	     * The end of central can coexist with its Zip64 brother,
	     * I don't want to read the wrong number of bytes !
	     */
	    readBlockZip64EndOfCentral: function() {
	        this.zip64EndOfCentralSize = this.reader.readInt(8);
	        this.reader.skip(4);
	        // this.versionMadeBy = this.reader.readString(2);
	        // this.versionNeeded = this.reader.readInt(2);
	        this.diskNumber = this.reader.readInt(4);
	        this.diskWithCentralDirStart = this.reader.readInt(4);
	        this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
	        this.centralDirRecords = this.reader.readInt(8);
	        this.centralDirSize = this.reader.readInt(8);
	        this.centralDirOffset = this.reader.readInt(8);

	        this.zip64ExtensibleData = {};
	        var extraDataSize = this.zip64EndOfCentralSize - 44,
	            index = 0,
	            extraFieldId,
	            extraFieldLength,
	            extraFieldValue;
	        while (index < extraDataSize) {
	            extraFieldId = this.reader.readInt(2);
	            extraFieldLength = this.reader.readInt(4);
	            extraFieldValue = this.reader.readData(extraFieldLength);
	            this.zip64ExtensibleData[extraFieldId] = {
	                id: extraFieldId,
	                length: extraFieldLength,
	                value: extraFieldValue
	            };
	        }
	    },
	    /**
	     * Read the end of the Zip 64 central directory locator.
	     */
	    readBlockZip64EndOfCentralLocator: function() {
	        this.diskWithZip64CentralDirStart = this.reader.readInt(4);
	        this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
	        this.disksCount = this.reader.readInt(4);
	        if (this.disksCount > 1) {
	            throw new Error("Multi-volumes zip are not supported");
	        }
	    },
	    /**
	     * Read the local files, based on the offset read in the central part.
	     */
	    readLocalFiles: function() {
	        var i, file;
	        for (i = 0; i < this.files.length; i++) {
	            file = this.files[i];
	            this.reader.setIndex(file.localHeaderOffset);
	            this.checkSignature(sig.LOCAL_FILE_HEADER);
	            file.readLocalPart(this.reader);
	            file.handleUTF8();
	            file.processAttributes();
	        }
	    },
	    /**
	     * Read the central directory.
	     */
	    readCentralDir: function() {
	        var file;

	        this.reader.setIndex(this.centralDirOffset);
	        while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {
	            file = new ZipEntry({
	                zip64: this.zip64
	            }, this.loadOptions);
	            file.readCentralPart(this.reader);
	            this.files.push(file);
	        }

	        if (this.centralDirRecords !== this.files.length) {
	            if (this.centralDirRecords !== 0 && this.files.length === 0) {
	                // We expected some records but couldn't find ANY.
	                // This is really suspicious, as if something went wrong.
	                throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
	            } else {
	                // We found some records but not all.
	                // Something is wrong but we got something for the user: no error here.
	                // console.warn("expected", this.centralDirRecords, "records in central dir, got", this.files.length);
	            }
	        }
	    },
	    /**
	     * Read the end of central directory.
	     */
	    readEndOfCentral: function() {
	        var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
	        if (offset < 0) {
	            // Check if the content is a truncated zip or complete garbage.
	            // A "LOCAL_FILE_HEADER" is not required at the beginning (auto
	            // extractible zip for example) but it can give a good hint.
	            // If an ajax request was used without responseType, we will also
	            // get unreadable data.
	            var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);

	            if (isGarbage) {
	                throw new Error("Can't find end of central directory : is this a zip file ? " +
	                                "If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
	            } else {
	                throw new Error("Corrupted zip: can't find end of central directory");
	            }

	        }
	        this.reader.setIndex(offset);
	        var endOfCentralDirOffset = offset;
	        this.checkSignature(sig.CENTRAL_DIRECTORY_END);
	        this.readBlockEndOfCentral();


	        /* extract from the zip spec :
	            4)  If one of the fields in the end of central directory
	                record is too small to hold required data, the field
	                should be set to -1 (0xFFFF or 0xFFFFFFFF) and the
	                ZIP64 format record should be created.
	            5)  The end of central directory record and the
	                Zip64 end of central directory locator record must
	                reside on the same disk when splitting or spanning
	                an archive.
	         */
	        if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
	            this.zip64 = true;

	            /*
	            Warning : the zip64 extension is supported, but ONLY if the 64bits integer read from
	            the zip file can fit into a 32bits integer. This cannot be solved : JavaScript represents
	            all numbers as 64-bit double precision IEEE 754 floating point numbers.
	            So, we have 53bits for integers and bitwise operations treat everything as 32bits.
	            see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators
	            and http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf section 8.5
	            */

	            // should look for a zip64 EOCD locator
	            offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
	            if (offset < 0) {
	                throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
	            }
	            this.reader.setIndex(offset);
	            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
	            this.readBlockZip64EndOfCentralLocator();

	            // now the zip64 EOCD record
	            if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
	                // console.warn("ZIP64 end of central directory not where expected.");
	                this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
	                if (this.relativeOffsetEndOfZip64CentralDir < 0) {
	                    throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
	                }
	            }
	            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
	            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
	            this.readBlockZip64EndOfCentral();
	        }

	        var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
	        if (this.zip64) {
	            expectedEndOfCentralDirOffset += 20; // end of central dir 64 locator
	            expectedEndOfCentralDirOffset += 12 /* should not include the leading 12 bytes */ + this.zip64EndOfCentralSize;
	        }

	        var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;

	        if (extraBytes > 0) {
	            // console.warn(extraBytes, "extra bytes at beginning or within zipfile");
	            if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {
	                // The offsets seem wrong, but we have something at the specified offset.
	                // So… we keep it.
	            } else {
	                // the offset is wrong, update the "zero" of the reader
	                // this happens if data has been prepended (crx files for example)
	                this.reader.zero = extraBytes;
	            }
	        } else if (extraBytes < 0) {
	            throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
	        }
	    },
	    prepareReader: function(data) {
	        this.reader = readerFor(data);
	    },
	    /**
	     * Read a zip file and create ZipEntries.
	     * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
	     */
	    load: function(data) {
	        this.prepareReader(data);
	        this.readEndOfCentral();
	        this.readCentralDir();
	        this.readLocalFiles();
	    }
	};
	// }}} end of ZipEntries
	module.exports = ZipEntries;

	},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(require,module,exports){
	var readerFor = require('./reader/readerFor');
	var utils = require('./utils');
	var CompressedObject = require('./compressedObject');
	var crc32fn = require('./crc32');
	var utf8 = require('./utf8');
	var compressions = require('./compressions');
	var support = require('./support');

	var MADE_BY_DOS = 0x00;
	var MADE_BY_UNIX = 0x03;

	/**
	 * Find a compression registered in JSZip.
	 * @param {string} compressionMethod the method magic to find.
	 * @return {Object|null} the JSZip compression object, null if none found.
	 */
	var findCompression = function(compressionMethod) {
	    for (var method in compressions) {
	        if (!compressions.hasOwnProperty(method)) {
	            continue;
	        }
	        if (compressions[method].magic === compressionMethod) {
	            return compressions[method];
	        }
	    }
	    return null;
	};

	// class ZipEntry {{{
	/**
	 * An entry in the zip file.
	 * @constructor
	 * @param {Object} options Options of the current file.
	 * @param {Object} loadOptions Options for loading the stream.
	 */
	function ZipEntry(options, loadOptions) {
	    this.options = options;
	    this.loadOptions = loadOptions;
	}
	ZipEntry.prototype = {
	    /**
	     * say if the file is encrypted.
	     * @return {boolean} true if the file is encrypted, false otherwise.
	     */
	    isEncrypted: function() {
	        // bit 1 is set
	        return (this.bitFlag & 0x0001) === 0x0001;
	    },
	    /**
	     * say if the file has utf-8 filename/comment.
	     * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
	     */
	    useUTF8: function() {
	        // bit 11 is set
	        return (this.bitFlag & 0x0800) === 0x0800;
	    },
	    /**
	     * Read the local part of a zip file and add the info in this object.
	     * @param {DataReader} reader the reader to use.
	     */
	    readLocalPart: function(reader) {
	        var compression, localExtraFieldsLength;

	        // we already know everything from the central dir !
	        // If the central dir data are false, we are doomed.
	        // On the bright side, the local part is scary  : zip64, data descriptors, both, etc.
	        // The less data we get here, the more reliable this should be.
	        // Let's skip the whole header and dash to the data !
	        reader.skip(22);
	        // in some zip created on windows, the filename stored in the central dir contains \ instead of /.
	        // Strangely, the filename here is OK.
	        // I would love to treat these zip files as corrupted (see http://www.info-zip.org/FAQ.html#backslashes
	        // or APPNOTE#4.4.17.1, "All slashes MUST be forward slashes '/'") but there are a lot of bad zip generators...
	        // Search "unzip mismatching "local" filename continuing with "central" filename version" on
	        // the internet.
	        //
	        // I think I see the logic here : the central directory is used to display
	        // content and the local directory is used to extract the files. Mixing / and \
	        // may be used to display \ to windows users and use / when extracting the files.
	        // Unfortunately, this lead also to some issues : http://seclists.org/fulldisclosure/2009/Sep/394
	        this.fileNameLength = reader.readInt(2);
	        localExtraFieldsLength = reader.readInt(2); // can't be sure this will be the same as the central dir
	        // the fileName is stored as binary data, the handleUTF8 method will take care of the encoding.
	        this.fileName = reader.readData(this.fileNameLength);
	        reader.skip(localExtraFieldsLength);

	        if (this.compressedSize === -1 || this.uncompressedSize === -1) {
	            throw new Error("Bug or corrupted zip : didn't get enough information from the central directory " + "(compressedSize === -1 || uncompressedSize === -1)");
	        }

	        compression = findCompression(this.compressionMethod);
	        if (compression === null) { // no compression found
	            throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
	        }
	        this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
	    },

	    /**
	     * Read the central part of a zip file and add the info in this object.
	     * @param {DataReader} reader the reader to use.
	     */
	    readCentralPart: function(reader) {
	        this.versionMadeBy = reader.readInt(2);
	        reader.skip(2);
	        // this.versionNeeded = reader.readInt(2);
	        this.bitFlag = reader.readInt(2);
	        this.compressionMethod = reader.readString(2);
	        this.date = reader.readDate();
	        this.crc32 = reader.readInt(4);
	        this.compressedSize = reader.readInt(4);
	        this.uncompressedSize = reader.readInt(4);
	        var fileNameLength = reader.readInt(2);
	        this.extraFieldsLength = reader.readInt(2);
	        this.fileCommentLength = reader.readInt(2);
	        this.diskNumberStart = reader.readInt(2);
	        this.internalFileAttributes = reader.readInt(2);
	        this.externalFileAttributes = reader.readInt(4);
	        this.localHeaderOffset = reader.readInt(4);

	        if (this.isEncrypted()) {
	            throw new Error("Encrypted zip are not supported");
	        }

	        // will be read in the local part, see the comments there
	        reader.skip(fileNameLength);
	        this.readExtraFields(reader);
	        this.parseZIP64ExtraField(reader);
	        this.fileComment = reader.readData(this.fileCommentLength);
	    },

	    /**
	     * Parse the external file attributes and get the unix/dos permissions.
	     */
	    processAttributes: function () {
	        this.unixPermissions = null;
	        this.dosPermissions = null;
	        var madeBy = this.versionMadeBy >> 8;

	        // Check if we have the DOS directory flag set.
	        // We look for it in the DOS and UNIX permissions
	        // but some unknown platform could set it as a compatibility flag.
	        this.dir = this.externalFileAttributes & 0x0010 ? true : false;

	        if(madeBy === MADE_BY_DOS) {
	            // first 6 bits (0 to 5)
	            this.dosPermissions = this.externalFileAttributes & 0x3F;
	        }

	        if(madeBy === MADE_BY_UNIX) {
	            this.unixPermissions = (this.externalFileAttributes >> 16) & 0xFFFF;
	            // the octal permissions are in (this.unixPermissions & 0x01FF).toString(8);
	        }

	        // fail safe : if the name ends with a / it probably means a folder
	        if (!this.dir && this.fileNameStr.slice(-1) === '/') {
	            this.dir = true;
	        }
	    },

	    /**
	     * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
	     * @param {DataReader} reader the reader to use.
	     */
	    parseZIP64ExtraField: function(reader) {

	        if (!this.extraFields[0x0001]) {
	            return;
	        }

	        // should be something, preparing the extra reader
	        var extraReader = readerFor(this.extraFields[0x0001].value);

	        // I really hope that these 64bits integer can fit in 32 bits integer, because js
	        // won't let us have more.
	        if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
	            this.uncompressedSize = extraReader.readInt(8);
	        }
	        if (this.compressedSize === utils.MAX_VALUE_32BITS) {
	            this.compressedSize = extraReader.readInt(8);
	        }
	        if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
	            this.localHeaderOffset = extraReader.readInt(8);
	        }
	        if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
	            this.diskNumberStart = extraReader.readInt(4);
	        }
	    },
	    /**
	     * Read the central part of a zip file and add the info in this object.
	     * @param {DataReader} reader the reader to use.
	     */
	    readExtraFields: function(reader) {
	        var end = reader.index + this.extraFieldsLength,
	            extraFieldId,
	            extraFieldLength,
	            extraFieldValue;

	        if (!this.extraFields) {
	            this.extraFields = {};
	        }

	        while (reader.index + 4 < end) {
	            extraFieldId = reader.readInt(2);
	            extraFieldLength = reader.readInt(2);
	            extraFieldValue = reader.readData(extraFieldLength);

	            this.extraFields[extraFieldId] = {
	                id: extraFieldId,
	                length: extraFieldLength,
	                value: extraFieldValue
	            };
	        }

	        reader.setIndex(end);
	    },
	    /**
	     * Apply an UTF8 transformation if needed.
	     */
	    handleUTF8: function() {
	        var decodeParamType = support.uint8array ? "uint8array" : "array";
	        if (this.useUTF8()) {
	            this.fileNameStr = utf8.utf8decode(this.fileName);
	            this.fileCommentStr = utf8.utf8decode(this.fileComment);
	        } else {
	            var upath = this.findExtraFieldUnicodePath();
	            if (upath !== null) {
	                this.fileNameStr = upath;
	            } else {
	                // ASCII text or unsupported code page
	                var fileNameByteArray =  utils.transformTo(decodeParamType, this.fileName);
	                this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
	            }

	            var ucomment = this.findExtraFieldUnicodeComment();
	            if (ucomment !== null) {
	                this.fileCommentStr = ucomment;
	            } else {
	                // ASCII text or unsupported code page
	                var commentByteArray =  utils.transformTo(decodeParamType, this.fileComment);
	                this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
	            }
	        }
	    },

	    /**
	     * Find the unicode path declared in the extra field, if any.
	     * @return {String} the unicode path, null otherwise.
	     */
	    findExtraFieldUnicodePath: function() {
	        var upathField = this.extraFields[0x7075];
	        if (upathField) {
	            var extraReader = readerFor(upathField.value);

	            // wrong version
	            if (extraReader.readInt(1) !== 1) {
	                return null;
	            }

	            // the crc of the filename changed, this field is out of date.
	            if (crc32fn(this.fileName) !== extraReader.readInt(4)) {
	                return null;
	            }

	            return utf8.utf8decode(extraReader.readData(upathField.length - 5));
	        }
	        return null;
	    },

	    /**
	     * Find the unicode comment declared in the extra field, if any.
	     * @return {String} the unicode comment, null otherwise.
	     */
	    findExtraFieldUnicodeComment: function() {
	        var ucommentField = this.extraFields[0x6375];
	        if (ucommentField) {
	            var extraReader = readerFor(ucommentField.value);

	            // wrong version
	            if (extraReader.readInt(1) !== 1) {
	                return null;
	            }

	            // the crc of the comment changed, this field is out of date.
	            if (crc32fn(this.fileComment) !== extraReader.readInt(4)) {
	                return null;
	            }

	            return utf8.utf8decode(extraReader.readData(ucommentField.length - 5));
	        }
	        return null;
	    }
	};
	module.exports = ZipEntry;

	},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(require,module,exports){

	var StreamHelper = require('./stream/StreamHelper');
	var DataWorker = require('./stream/DataWorker');
	var utf8 = require('./utf8');
	var CompressedObject = require('./compressedObject');
	var GenericWorker = require('./stream/GenericWorker');

	/**
	 * A simple object representing a file in the zip file.
	 * @constructor
	 * @param {string} name the name of the file
	 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data
	 * @param {Object} options the options of the file
	 */
	var ZipObject = function(name, data, options) {
	    this.name = name;
	    this.dir = options.dir;
	    this.date = options.date;
	    this.comment = options.comment;
	    this.unixPermissions = options.unixPermissions;
	    this.dosPermissions = options.dosPermissions;

	    this._data = data;
	    this._dataBinary = options.binary;
	    // keep only the compression
	    this.options = {
	        compression : options.compression,
	        compressionOptions : options.compressionOptions
	    };
	};

	ZipObject.prototype = {
	    /**
	     * Create an internal stream for the content of this object.
	     * @param {String} type the type of each chunk.
	     * @return StreamHelper the stream.
	     */
	    internalStream: function (type) {
	        var result = null, outputType = "string";
	        try {
	            if (!type) {
	                throw new Error("No output type specified.");
	            }
	            outputType = type.toLowerCase();
	            var askUnicodeString = outputType === "string" || outputType === "text";
	            if (outputType === "binarystring" || outputType === "text") {
	                outputType = "string";
	            }
	            result = this._decompressWorker();

	            var isUnicodeString = !this._dataBinary;

	            if (isUnicodeString && !askUnicodeString) {
	                result = result.pipe(new utf8.Utf8EncodeWorker());
	            }
	            if (!isUnicodeString && askUnicodeString) {
	                result = result.pipe(new utf8.Utf8DecodeWorker());
	            }
	        } catch (e) {
	            result = new GenericWorker("error");
	            result.error(e);
	        }

	        return new StreamHelper(result, outputType, "");
	    },

	    /**
	     * Prepare the content in the asked type.
	     * @param {String} type the type of the result.
	     * @param {Function} onUpdate a function to call on each internal update.
	     * @return Promise the promise of the result.
	     */
	    async: function (type, onUpdate) {
	        return this.internalStream(type).accumulate(onUpdate);
	    },

	    /**
	     * Prepare the content as a nodejs stream.
	     * @param {String} type the type of each chunk.
	     * @param {Function} onUpdate a function to call on each internal update.
	     * @return Stream the stream.
	     */
	    nodeStream: function (type, onUpdate) {
	        return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
	    },

	    /**
	     * Return a worker for the compressed content.
	     * @private
	     * @param {Object} compression the compression object to use.
	     * @param {Object} compressionOptions the options to use when compressing.
	     * @return Worker the worker.
	     */
	    _compressWorker: function (compression, compressionOptions) {
	        if (
	            this._data instanceof CompressedObject &&
	            this._data.compression.magic === compression.magic
	        ) {
	            return this._data.getCompressedWorker();
	        } else {
	            var result = this._decompressWorker();
	            if(!this._dataBinary) {
	                result = result.pipe(new utf8.Utf8EncodeWorker());
	            }
	            return CompressedObject.createWorkerFrom(result, compression, compressionOptions);
	        }
	    },
	    /**
	     * Return a worker for the decompressed content.
	     * @private
	     * @return Worker the worker.
	     */
	    _decompressWorker : function () {
	        if (this._data instanceof CompressedObject) {
	            return this._data.getContentWorker();
	        } else if (this._data instanceof GenericWorker) {
	            return this._data;
	        } else {
	            return new DataWorker(this._data);
	        }
	    }
	};

	var removedMethods = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"];
	var removedFn = function () {
	    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
	};

	for(var i = 0; i < removedMethods.length; i++) {
	    ZipObject.prototype[removedMethods[i]] = removedFn;
	}
	module.exports = ZipObject;

	},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(require,module,exports){
	(function (global){
	var Mutation = global.MutationObserver || global.WebKitMutationObserver;

	var scheduleDrain;

	{
	  if (Mutation) {
	    var called = 0;
	    var observer = new Mutation(nextTick);
	    var element = global.document.createTextNode('');
	    observer.observe(element, {
	      characterData: true
	    });
	    scheduleDrain = function () {
	      element.data = (called = ++called % 2);
	    };
	  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
	    var channel = new global.MessageChannel();
	    channel.port1.onmessage = nextTick;
	    scheduleDrain = function () {
	      channel.port2.postMessage(0);
	    };
	  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
	    scheduleDrain = function () {

	      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	      var scriptEl = global.document.createElement('script');
	      scriptEl.onreadystatechange = function () {
	        nextTick();

	        scriptEl.onreadystatechange = null;
	        scriptEl.parentNode.removeChild(scriptEl);
	        scriptEl = null;
	      };
	      global.document.documentElement.appendChild(scriptEl);
	    };
	  } else {
	    scheduleDrain = function () {
	      setTimeout(nextTick, 0);
	    };
	  }
	}

	var draining;
	var queue = [];
	//named nextTick for less confusing stack traces
	function nextTick() {
	  draining = true;
	  var i, oldQueue;
	  var len = queue.length;
	  while (len) {
	    oldQueue = queue;
	    queue = [];
	    i = -1;
	    while (++i < len) {
	      oldQueue[i]();
	    }
	    len = queue.length;
	  }
	  draining = false;
	}

	module.exports = immediate;
	function immediate(task) {
	  if (queue.push(task) === 1 && !draining) {
	    scheduleDrain();
	  }
	}

	}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	},{}],37:[function(require,module,exports){
	var immediate = require('immediate');

	/* istanbul ignore next */
	function INTERNAL() {}

	var handlers = {};

	var REJECTED = ['REJECTED'];
	var FULFILLED = ['FULFILLED'];
	var PENDING = ['PENDING'];

	module.exports = Promise;

	function Promise(resolver) {
	  if (typeof resolver !== 'function') {
	    throw new TypeError('resolver must be a function');
	  }
	  this.state = PENDING;
	  this.queue = [];
	  this.outcome = void 0;
	  if (resolver !== INTERNAL) {
	    safelyResolveThenable(this, resolver);
	  }
	}

	Promise.prototype["finally"] = function (callback) {
	  if (typeof callback !== 'function') {
	    return this;
	  }
	  var p = this.constructor;
	  return this.then(resolve, reject);

	  function resolve(value) {
	    function yes () {
	      return value;
	    }
	    return p.resolve(callback()).then(yes);
	  }
	  function reject(reason) {
	    function no () {
	      throw reason;
	    }
	    return p.resolve(callback()).then(no);
	  }
	};
	Promise.prototype["catch"] = function (onRejected) {
	  return this.then(null, onRejected);
	};
	Promise.prototype.then = function (onFulfilled, onRejected) {
	  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
	    typeof onRejected !== 'function' && this.state === REJECTED) {
	    return this;
	  }
	  var promise = new this.constructor(INTERNAL);
	  if (this.state !== PENDING) {
	    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
	    unwrap(promise, resolver, this.outcome);
	  } else {
	    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
	  }

	  return promise;
	};
	function QueueItem(promise, onFulfilled, onRejected) {
	  this.promise = promise;
	  if (typeof onFulfilled === 'function') {
	    this.onFulfilled = onFulfilled;
	    this.callFulfilled = this.otherCallFulfilled;
	  }
	  if (typeof onRejected === 'function') {
	    this.onRejected = onRejected;
	    this.callRejected = this.otherCallRejected;
	  }
	}
	QueueItem.prototype.callFulfilled = function (value) {
	  handlers.resolve(this.promise, value);
	};
	QueueItem.prototype.otherCallFulfilled = function (value) {
	  unwrap(this.promise, this.onFulfilled, value);
	};
	QueueItem.prototype.callRejected = function (value) {
	  handlers.reject(this.promise, value);
	};
	QueueItem.prototype.otherCallRejected = function (value) {
	  unwrap(this.promise, this.onRejected, value);
	};

	function unwrap(promise, func, value) {
	  immediate(function () {
	    var returnValue;
	    try {
	      returnValue = func(value);
	    } catch (e) {
	      return handlers.reject(promise, e);
	    }
	    if (returnValue === promise) {
	      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
	    } else {
	      handlers.resolve(promise, returnValue);
	    }
	  });
	}

	handlers.resolve = function (self, value) {
	  var result = tryCatch(getThen, value);
	  if (result.status === 'error') {
	    return handlers.reject(self, result.value);
	  }
	  var thenable = result.value;

	  if (thenable) {
	    safelyResolveThenable(self, thenable);
	  } else {
	    self.state = FULFILLED;
	    self.outcome = value;
	    var i = -1;
	    var len = self.queue.length;
	    while (++i < len) {
	      self.queue[i].callFulfilled(value);
	    }
	  }
	  return self;
	};
	handlers.reject = function (self, error) {
	  self.state = REJECTED;
	  self.outcome = error;
	  var i = -1;
	  var len = self.queue.length;
	  while (++i < len) {
	    self.queue[i].callRejected(error);
	  }
	  return self;
	};

	function getThen(obj) {
	  // Make sure we only access the accessor once as required by the spec
	  var then = obj && obj.then;
	  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
	    return function appyThen() {
	      then.apply(obj, arguments);
	    };
	  }
	}

	function safelyResolveThenable(self, thenable) {
	  // Either fulfill, reject or reject with error
	  var called = false;
	  function onError(value) {
	    if (called) {
	      return;
	    }
	    called = true;
	    handlers.reject(self, value);
	  }

	  function onSuccess(value) {
	    if (called) {
	      return;
	    }
	    called = true;
	    handlers.resolve(self, value);
	  }

	  function tryToUnwrap() {
	    thenable(onSuccess, onError);
	  }

	  var result = tryCatch(tryToUnwrap);
	  if (result.status === 'error') {
	    onError(result.value);
	  }
	}

	function tryCatch(func, value) {
	  var out = {};
	  try {
	    out.value = func(value);
	    out.status = 'success';
	  } catch (e) {
	    out.status = 'error';
	    out.value = e;
	  }
	  return out;
	}

	Promise.resolve = resolve;
	function resolve(value) {
	  if (value instanceof this) {
	    return value;
	  }
	  return handlers.resolve(new this(INTERNAL), value);
	}

	Promise.reject = reject;
	function reject(reason) {
	  var promise = new this(INTERNAL);
	  return handlers.reject(promise, reason);
	}

	Promise.all = all;
	function all(iterable) {
	  var self = this;
	  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
	    return this.reject(new TypeError('must be an array'));
	  }

	  var len = iterable.length;
	  var called = false;
	  if (!len) {
	    return this.resolve([]);
	  }

	  var values = new Array(len);
	  var resolved = 0;
	  var i = -1;
	  var promise = new this(INTERNAL);

	  while (++i < len) {
	    allResolver(iterable[i], i);
	  }
	  return promise;
	  function allResolver(value, i) {
	    self.resolve(value).then(resolveFromAll, function (error) {
	      if (!called) {
	        called = true;
	        handlers.reject(promise, error);
	      }
	    });
	    function resolveFromAll(outValue) {
	      values[i] = outValue;
	      if (++resolved === len && !called) {
	        called = true;
	        handlers.resolve(promise, values);
	      }
	    }
	  }
	}

	Promise.race = race;
	function race(iterable) {
	  var self = this;
	  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
	    return this.reject(new TypeError('must be an array'));
	  }

	  var len = iterable.length;
	  var called = false;
	  if (!len) {
	    return this.resolve([]);
	  }

	  var i = -1;
	  var promise = new this(INTERNAL);

	  while (++i < len) {
	    resolver(iterable[i]);
	  }
	  return promise;
	  function resolver(value) {
	    self.resolve(value).then(function (response) {
	      if (!called) {
	        called = true;
	        handlers.resolve(promise, response);
	      }
	    }, function (error) {
	      if (!called) {
	        called = true;
	        handlers.reject(promise, error);
	      }
	    });
	  }
	}

	},{"immediate":36}],38:[function(require,module,exports){

	var assign    = require('./lib/utils/common').assign;

	var deflate   = require('./lib/deflate');
	var inflate   = require('./lib/inflate');
	var constants = require('./lib/zlib/constants');

	var pako = {};

	assign(pako, deflate, inflate, constants);

	module.exports = pako;

	},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(require,module,exports){


	var zlib_deflate = require('./zlib/deflate');
	var utils        = require('./utils/common');
	var strings      = require('./utils/strings');
	var msg          = require('./zlib/messages');
	var ZStream      = require('./zlib/zstream');

	var toString = Object.prototype.toString;

	/* Public constants ==========================================================*/
	/* ===========================================================================*/

	var Z_NO_FLUSH      = 0;
	var Z_FINISH        = 4;

	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	var Z_SYNC_FLUSH    = 2;

	var Z_DEFAULT_COMPRESSION = -1;

	var Z_DEFAULT_STRATEGY    = 0;

	var Z_DEFLATED  = 8;

	/* ===========================================================================*/


	/**
	 * class Deflate
	 *
	 * Generic JS-style wrapper for zlib calls. If you don't need
	 * streaming behaviour - use more simple functions: [[deflate]],
	 * [[deflateRaw]] and [[gzip]].
	 **/

	/* internal
	 * Deflate.chunks -> Array
	 *
	 * Chunks of output data, if [[Deflate#onData]] not overriden.
	 **/

	/**
	 * Deflate.result -> Uint8Array|Array
	 *
	 * Compressed result, generated by default [[Deflate#onData]]
	 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
	 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
	 * push a chunk with explicit flush (call [[Deflate#push]] with
	 * `Z_SYNC_FLUSH` param).
	 **/

	/**
	 * Deflate.err -> Number
	 *
	 * Error code after deflate finished. 0 (Z_OK) on success.
	 * You will not need it in real life, because deflate errors
	 * are possible only on wrong options or bad `onData` / `onEnd`
	 * custom handlers.
	 **/

	/**
	 * Deflate.msg -> String
	 *
	 * Error message, if [[Deflate.err]] != 0
	 **/


	/**
	 * new Deflate(options)
	 * - options (Object): zlib deflate options.
	 *
	 * Creates new deflator instance with specified params. Throws exception
	 * on bad params. Supported options:
	 *
	 * - `level`
	 * - `windowBits`
	 * - `memLevel`
	 * - `strategy`
	 * - `dictionary`
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Additional options, for internal needs:
	 *
	 * - `chunkSize` - size of generated data chunks (16K by default)
	 * - `raw` (Boolean) - do raw deflate
	 * - `gzip` (Boolean) - create gzip wrapper
	 * - `to` (String) - if equal to 'string', then result will be "binary string"
	 *    (each char code [0..255])
	 * - `header` (Object) - custom header for gzip
	 *   - `text` (Boolean) - true if compressed data believed to be text
	 *   - `time` (Number) - modification time, unix timestamp
	 *   - `os` (Number) - operation system code
	 *   - `extra` (Array) - array of bytes with extra data (max 65536)
	 *   - `name` (String) - file name (binary string)
	 *   - `comment` (String) - comment (binary string)
	 *   - `hcrc` (Boolean) - true if header crc should be added
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
	 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
	 *
	 * var deflate = new pako.Deflate({ level: 3});
	 *
	 * deflate.push(chunk1, false);
	 * deflate.push(chunk2, true);  // true -> last chunk
	 *
	 * if (deflate.err) { throw new Error(deflate.err); }
	 *
	 * console.log(deflate.result);
	 * ```
	 **/
	function Deflate(options) {
	  if (!(this instanceof Deflate)) return new Deflate(options);

	  this.options = utils.assign({
	    level: Z_DEFAULT_COMPRESSION,
	    method: Z_DEFLATED,
	    chunkSize: 16384,
	    windowBits: 15,
	    memLevel: 8,
	    strategy: Z_DEFAULT_STRATEGY,
	    to: ''
	  }, options || {});

	  var opt = this.options;

	  if (opt.raw && (opt.windowBits > 0)) {
	    opt.windowBits = -opt.windowBits;
	  }

	  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
	    opt.windowBits += 16;
	  }

	  this.err    = 0;      // error code, if happens (0 = Z_OK)
	  this.msg    = '';     // error message
	  this.ended  = false;  // used to avoid multiple onEnd() calls
	  this.chunks = [];     // chunks of compressed data

	  this.strm = new ZStream();
	  this.strm.avail_out = 0;

	  var status = zlib_deflate.deflateInit2(
	    this.strm,
	    opt.level,
	    opt.method,
	    opt.windowBits,
	    opt.memLevel,
	    opt.strategy
	  );

	  if (status !== Z_OK) {
	    throw new Error(msg[status]);
	  }

	  if (opt.header) {
	    zlib_deflate.deflateSetHeader(this.strm, opt.header);
	  }

	  if (opt.dictionary) {
	    var dict;
	    // Convert data if needed
	    if (typeof opt.dictionary === 'string') {
	      // If we need to compress text, change encoding to utf8.
	      dict = strings.string2buf(opt.dictionary);
	    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
	      dict = new Uint8Array(opt.dictionary);
	    } else {
	      dict = opt.dictionary;
	    }

	    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

	    if (status !== Z_OK) {
	      throw new Error(msg[status]);
	    }

	    this._dict_set = true;
	  }
	}

	/**
	 * Deflate#push(data[, mode]) -> Boolean
	 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
	 *   converted to utf8 byte sequence.
	 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
	 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
	 *
	 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
	 * new compressed chunks. Returns `true` on success. The last data block must have
	 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
	 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
	 * can use mode Z_SYNC_FLUSH, keeping the compression context.
	 *
	 * On fail call [[Deflate#onEnd]] with error code and return false.
	 *
	 * We strongly recommend to use `Uint8Array` on input for best speed (output
	 * array format is detected automatically). Also, don't skip last param and always
	 * use the same type in your code (boolean or number). That will improve JS speed.
	 *
	 * For regular `Array`-s make sure all elements are [0..255].
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * push(chunk, false); // push one of data chunks
	 * ...
	 * push(chunk, true);  // push last chunk
	 * ```
	 **/
	Deflate.prototype.push = function (data, mode) {
	  var strm = this.strm;
	  var chunkSize = this.options.chunkSize;
	  var status, _mode;

	  if (this.ended) { return false; }

	  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

	  // Convert data if needed
	  if (typeof data === 'string') {
	    // If we need to compress text, change encoding to utf8.
	    strm.input = strings.string2buf(data);
	  } else if (toString.call(data) === '[object ArrayBuffer]') {
	    strm.input = new Uint8Array(data);
	  } else {
	    strm.input = data;
	  }

	  strm.next_in = 0;
	  strm.avail_in = strm.input.length;

	  do {
	    if (strm.avail_out === 0) {
	      strm.output = new utils.Buf8(chunkSize);
	      strm.next_out = 0;
	      strm.avail_out = chunkSize;
	    }
	    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

	    if (status !== Z_STREAM_END && status !== Z_OK) {
	      this.onEnd(status);
	      this.ended = true;
	      return false;
	    }
	    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
	      if (this.options.to === 'string') {
	        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
	      } else {
	        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
	      }
	    }
	  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

	  // Finalize on the last chunk.
	  if (_mode === Z_FINISH) {
	    status = zlib_deflate.deflateEnd(this.strm);
	    this.onEnd(status);
	    this.ended = true;
	    return status === Z_OK;
	  }

	  // callback interim results if Z_SYNC_FLUSH.
	  if (_mode === Z_SYNC_FLUSH) {
	    this.onEnd(Z_OK);
	    strm.avail_out = 0;
	    return true;
	  }

	  return true;
	};


	/**
	 * Deflate#onData(chunk) -> Void
	 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
	 *   on js engine support. When string output requested, each chunk
	 *   will be string.
	 *
	 * By default, stores data blocks in `chunks[]` property and glue
	 * those in `onEnd`. Override this handler, if you need another behaviour.
	 **/
	Deflate.prototype.onData = function (chunk) {
	  this.chunks.push(chunk);
	};


	/**
	 * Deflate#onEnd(status) -> Void
	 * - status (Number): deflate status. 0 (Z_OK) on success,
	 *   other if not.
	 *
	 * Called once after you tell deflate that the input stream is
	 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
	 * or if an error happened. By default - join collected chunks,
	 * free memory and fill `results` / `err` properties.
	 **/
	Deflate.prototype.onEnd = function (status) {
	  // On success - join
	  if (status === Z_OK) {
	    if (this.options.to === 'string') {
	      this.result = this.chunks.join('');
	    } else {
	      this.result = utils.flattenChunks(this.chunks);
	    }
	  }
	  this.chunks = [];
	  this.err = status;
	  this.msg = this.strm.msg;
	};


	/**
	 * deflate(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * Compress `data` with deflate algorithm and `options`.
	 *
	 * Supported options are:
	 *
	 * - level
	 * - windowBits
	 * - memLevel
	 * - strategy
	 * - dictionary
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Sugar (options):
	 *
	 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
	 *   negative windowBits implicitly.
	 * - `to` (String) - if equal to 'string', then result will be "binary string"
	 *    (each char code [0..255])
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
	 *
	 * console.log(pako.deflate(data));
	 * ```
	 **/
	function deflate(input, options) {
	  var deflator = new Deflate(options);

	  deflator.push(input, true);

	  // That will never happens, if you don't cheat with options :)
	  if (deflator.err) { throw deflator.msg || msg[deflator.err]; }

	  return deflator.result;
	}


	/**
	 * deflateRaw(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * The same as [[deflate]], but creates raw data, without wrapper
	 * (header and adler32 crc).
	 **/
	function deflateRaw(input, options) {
	  options = options || {};
	  options.raw = true;
	  return deflate(input, options);
	}


	/**
	 * gzip(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * The same as [[deflate]], but create gzip wrapper instead of
	 * deflate one.
	 **/
	function gzip(input, options) {
	  options = options || {};
	  options.gzip = true;
	  return deflate(input, options);
	}


	exports.Deflate = Deflate;
	exports.deflate = deflate;
	exports.deflateRaw = deflateRaw;
	exports.gzip = gzip;

	},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(require,module,exports){


	var zlib_inflate = require('./zlib/inflate');
	var utils        = require('./utils/common');
	var strings      = require('./utils/strings');
	var c            = require('./zlib/constants');
	var msg          = require('./zlib/messages');
	var ZStream      = require('./zlib/zstream');
	var GZheader     = require('./zlib/gzheader');

	var toString = Object.prototype.toString;

	/**
	 * class Inflate
	 *
	 * Generic JS-style wrapper for zlib calls. If you don't need
	 * streaming behaviour - use more simple functions: [[inflate]]
	 * and [[inflateRaw]].
	 **/

	/* internal
	 * inflate.chunks -> Array
	 *
	 * Chunks of output data, if [[Inflate#onData]] not overriden.
	 **/

	/**
	 * Inflate.result -> Uint8Array|Array|String
	 *
	 * Uncompressed result, generated by default [[Inflate#onData]]
	 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
	 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
	 * push a chunk with explicit flush (call [[Inflate#push]] with
	 * `Z_SYNC_FLUSH` param).
	 **/

	/**
	 * Inflate.err -> Number
	 *
	 * Error code after inflate finished. 0 (Z_OK) on success.
	 * Should be checked if broken data possible.
	 **/

	/**
	 * Inflate.msg -> String
	 *
	 * Error message, if [[Inflate.err]] != 0
	 **/


	/**
	 * new Inflate(options)
	 * - options (Object): zlib inflate options.
	 *
	 * Creates new inflator instance with specified params. Throws exception
	 * on bad params. Supported options:
	 *
	 * - `windowBits`
	 * - `dictionary`
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Additional options, for internal needs:
	 *
	 * - `chunkSize` - size of generated data chunks (16K by default)
	 * - `raw` (Boolean) - do raw inflate
	 * - `to` (String) - if equal to 'string', then result will be converted
	 *   from utf8 to utf16 (javascript) string. When string output requested,
	 *   chunk length can differ from `chunkSize`, depending on content.
	 *
	 * By default, when no options set, autodetect deflate/gzip data format via
	 * wrapper header.
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
	 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
	 *
	 * var inflate = new pako.Inflate({ level: 3});
	 *
	 * inflate.push(chunk1, false);
	 * inflate.push(chunk2, true);  // true -> last chunk
	 *
	 * if (inflate.err) { throw new Error(inflate.err); }
	 *
	 * console.log(inflate.result);
	 * ```
	 **/
	function Inflate(options) {
	  if (!(this instanceof Inflate)) return new Inflate(options);

	  this.options = utils.assign({
	    chunkSize: 16384,
	    windowBits: 0,
	    to: ''
	  }, options || {});

	  var opt = this.options;

	  // Force window size for `raw` data, if not set directly,
	  // because we have no header for autodetect.
	  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
	    opt.windowBits = -opt.windowBits;
	    if (opt.windowBits === 0) { opt.windowBits = -15; }
	  }

	  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
	  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
	      !(options && options.windowBits)) {
	    opt.windowBits += 32;
	  }

	  // Gzip header has no info about windows size, we can do autodetect only
	  // for deflate. So, if window size not set, force it to max when gzip possible
	  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
	    // bit 3 (16) -> gzipped data
	    // bit 4 (32) -> autodetect gzip/deflate
	    if ((opt.windowBits & 15) === 0) {
	      opt.windowBits |= 15;
	    }
	  }

	  this.err    = 0;      // error code, if happens (0 = Z_OK)
	  this.msg    = '';     // error message
	  this.ended  = false;  // used to avoid multiple onEnd() calls
	  this.chunks = [];     // chunks of compressed data

	  this.strm   = new ZStream();
	  this.strm.avail_out = 0;

	  var status  = zlib_inflate.inflateInit2(
	    this.strm,
	    opt.windowBits
	  );

	  if (status !== c.Z_OK) {
	    throw new Error(msg[status]);
	  }

	  this.header = new GZheader();

	  zlib_inflate.inflateGetHeader(this.strm, this.header);
	}

	/**
	 * Inflate#push(data[, mode]) -> Boolean
	 * - data (Uint8Array|Array|ArrayBuffer|String): input data
	 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
	 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
	 *
	 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
	 * new output chunks. Returns `true` on success. The last data block must have
	 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
	 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
	 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
	 *
	 * On fail call [[Inflate#onEnd]] with error code and return false.
	 *
	 * We strongly recommend to use `Uint8Array` on input for best speed (output
	 * format is detected automatically). Also, don't skip last param and always
	 * use the same type in your code (boolean or number). That will improve JS speed.
	 *
	 * For regular `Array`-s make sure all elements are [0..255].
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * push(chunk, false); // push one of data chunks
	 * ...
	 * push(chunk, true);  // push last chunk
	 * ```
	 **/
	Inflate.prototype.push = function (data, mode) {
	  var strm = this.strm;
	  var chunkSize = this.options.chunkSize;
	  var dictionary = this.options.dictionary;
	  var status, _mode;
	  var next_out_utf8, tail, utf8str;
	  var dict;

	  // Flag to properly process Z_BUF_ERROR on testing inflate call
	  // when we check that all output data was flushed.
	  var allowBufError = false;

	  if (this.ended) { return false; }
	  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

	  // Convert data if needed
	  if (typeof data === 'string') {
	    // Only binary strings can be decompressed on practice
	    strm.input = strings.binstring2buf(data);
	  } else if (toString.call(data) === '[object ArrayBuffer]') {
	    strm.input = new Uint8Array(data);
	  } else {
	    strm.input = data;
	  }

	  strm.next_in = 0;
	  strm.avail_in = strm.input.length;

	  do {
	    if (strm.avail_out === 0) {
	      strm.output = new utils.Buf8(chunkSize);
	      strm.next_out = 0;
	      strm.avail_out = chunkSize;
	    }

	    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

	    if (status === c.Z_NEED_DICT && dictionary) {
	      // Convert data if needed
	      if (typeof dictionary === 'string') {
	        dict = strings.string2buf(dictionary);
	      } else if (toString.call(dictionary) === '[object ArrayBuffer]') {
	        dict = new Uint8Array(dictionary);
	      } else {
	        dict = dictionary;
	      }

	      status = zlib_inflate.inflateSetDictionary(this.strm, dict);

	    }

	    if (status === c.Z_BUF_ERROR && allowBufError === true) {
	      status = c.Z_OK;
	      allowBufError = false;
	    }

	    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
	      this.onEnd(status);
	      this.ended = true;
	      return false;
	    }

	    if (strm.next_out) {
	      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

	        if (this.options.to === 'string') {

	          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

	          tail = strm.next_out - next_out_utf8;
	          utf8str = strings.buf2string(strm.output, next_out_utf8);

	          // move tail
	          strm.next_out = tail;
	          strm.avail_out = chunkSize - tail;
	          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

	          this.onData(utf8str);

	        } else {
	          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
	        }
	      }
	    }

	    // When no more input data, we should check that internal inflate buffers
	    // are flushed. The only way to do it when avail_out = 0 - run one more
	    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
	    // Here we set flag to process this error properly.
	    //
	    // NOTE. Deflate does not return error in this case and does not needs such
	    // logic.
	    if (strm.avail_in === 0 && strm.avail_out === 0) {
	      allowBufError = true;
	    }

	  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

	  if (status === c.Z_STREAM_END) {
	    _mode = c.Z_FINISH;
	  }

	  // Finalize on the last chunk.
	  if (_mode === c.Z_FINISH) {
	    status = zlib_inflate.inflateEnd(this.strm);
	    this.onEnd(status);
	    this.ended = true;
	    return status === c.Z_OK;
	  }

	  // callback interim results if Z_SYNC_FLUSH.
	  if (_mode === c.Z_SYNC_FLUSH) {
	    this.onEnd(c.Z_OK);
	    strm.avail_out = 0;
	    return true;
	  }

	  return true;
	};


	/**
	 * Inflate#onData(chunk) -> Void
	 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
	 *   on js engine support. When string output requested, each chunk
	 *   will be string.
	 *
	 * By default, stores data blocks in `chunks[]` property and glue
	 * those in `onEnd`. Override this handler, if you need another behaviour.
	 **/
	Inflate.prototype.onData = function (chunk) {
	  this.chunks.push(chunk);
	};


	/**
	 * Inflate#onEnd(status) -> Void
	 * - status (Number): inflate status. 0 (Z_OK) on success,
	 *   other if not.
	 *
	 * Called either after you tell inflate that the input stream is
	 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
	 * or if an error happened. By default - join collected chunks,
	 * free memory and fill `results` / `err` properties.
	 **/
	Inflate.prototype.onEnd = function (status) {
	  // On success - join
	  if (status === c.Z_OK) {
	    if (this.options.to === 'string') {
	      // Glue & convert here, until we teach pako to send
	      // utf8 alligned strings to onData
	      this.result = this.chunks.join('');
	    } else {
	      this.result = utils.flattenChunks(this.chunks);
	    }
	  }
	  this.chunks = [];
	  this.err = status;
	  this.msg = this.strm.msg;
	};


	/**
	 * inflate(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * Decompress `data` with inflate/ungzip and `options`. Autodetect
	 * format via wrapper header by default. That's why we don't provide
	 * separate `ungzip` method.
	 *
	 * Supported options are:
	 *
	 * - windowBits
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information.
	 *
	 * Sugar (options):
	 *
	 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
	 *   negative windowBits implicitly.
	 * - `to` (String) - if equal to 'string', then result will be converted
	 *   from utf8 to utf16 (javascript) string. When string output requested,
	 *   chunk length can differ from `chunkSize`, depending on content.
	 *
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
	 *   , output;
	 *
	 * try {
	 *   output = pako.inflate(input);
	 * } catch (err)
	 *   console.log(err);
	 * }
	 * ```
	 **/
	function inflate(input, options) {
	  var inflator = new Inflate(options);

	  inflator.push(input, true);

	  // That will never happens, if you don't cheat with options :)
	  if (inflator.err) { throw inflator.msg || msg[inflator.err]; }

	  return inflator.result;
	}


	/**
	 * inflateRaw(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * The same as [[inflate]], but creates raw data, without wrapper
	 * (header and adler32 crc).
	 **/
	function inflateRaw(input, options) {
	  options = options || {};
	  options.raw = true;
	  return inflate(input, options);
	}


	/**
	 * ungzip(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * Just shortcut to [[inflate]], because it autodetects format
	 * by header.content. Done for convenience.
	 **/


	exports.Inflate = Inflate;
	exports.inflate = inflate;
	exports.inflateRaw = inflateRaw;
	exports.ungzip  = inflate;

	},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(require,module,exports){


	var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
	                (typeof Uint16Array !== 'undefined') &&
	                (typeof Int32Array !== 'undefined');


	exports.assign = function (obj /*from1, from2, from3, ...*/) {
	  var sources = Array.prototype.slice.call(arguments, 1);
	  while (sources.length) {
	    var source = sources.shift();
	    if (!source) { continue; }

	    if (typeof source !== 'object') {
	      throw new TypeError(source + 'must be non-object');
	    }

	    for (var p in source) {
	      if (source.hasOwnProperty(p)) {
	        obj[p] = source[p];
	      }
	    }
	  }

	  return obj;
	};


	// reduce buffer size, avoiding mem copy
	exports.shrinkBuf = function (buf, size) {
	  if (buf.length === size) { return buf; }
	  if (buf.subarray) { return buf.subarray(0, size); }
	  buf.length = size;
	  return buf;
	};


	var fnTyped = {
	  arraySet: function (dest, src, src_offs, len, dest_offs) {
	    if (src.subarray && dest.subarray) {
	      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
	      return;
	    }
	    // Fallback to ordinary array
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function (chunks) {
	    var i, l, len, pos, chunk, result;

	    // calculate data length
	    len = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      len += chunks[i].length;
	    }

	    // join chunks
	    result = new Uint8Array(len);
	    pos = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      chunk = chunks[i];
	      result.set(chunk, pos);
	      pos += chunk.length;
	    }

	    return result;
	  }
	};

	var fnUntyped = {
	  arraySet: function (dest, src, src_offs, len, dest_offs) {
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function (chunks) {
	    return [].concat.apply([], chunks);
	  }
	};


	// Enable/Disable typed arrays use, for testing
	//
	exports.setTyped = function (on) {
	  if (on) {
	    exports.Buf8  = Uint8Array;
	    exports.Buf16 = Uint16Array;
	    exports.Buf32 = Int32Array;
	    exports.assign(exports, fnTyped);
	  } else {
	    exports.Buf8  = Array;
	    exports.Buf16 = Array;
	    exports.Buf32 = Array;
	    exports.assign(exports, fnUntyped);
	  }
	};

	exports.setTyped(TYPED_OK);

	},{}],42:[function(require,module,exports){


	var utils = require('./common');


	// Quick check if we can use fast array to bin string conversion
	//
	// - apply(Array) can fail on Android 2.2
	// - apply(Uint8Array) can fail on iOS 5.1 Safary
	//
	var STR_APPLY_OK = true;
	var STR_APPLY_UIA_OK = true;

	try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
	try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


	// Table with utf8 lengths (calculated by first byte of sequence)
	// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
	// because max possible codepoint is 0x10ffff
	var _utf8len = new utils.Buf8(256);
	for (var q = 0; q < 256; q++) {
	  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
	}
	_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


	// convert string to array (typed, when possible)
	exports.string2buf = function (str) {
	  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

	  // count binary size
	  for (m_pos = 0; m_pos < str_len; m_pos++) {
	    c = str.charCodeAt(m_pos);
	    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
	      c2 = str.charCodeAt(m_pos + 1);
	      if ((c2 & 0xfc00) === 0xdc00) {
	        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
	        m_pos++;
	      }
	    }
	    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
	  }

	  // allocate buffer
	  buf = new utils.Buf8(buf_len);

	  // convert
	  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
	    c = str.charCodeAt(m_pos);
	    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
	      c2 = str.charCodeAt(m_pos + 1);
	      if ((c2 & 0xfc00) === 0xdc00) {
	        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
	        m_pos++;
	      }
	    }
	    if (c < 0x80) {
	      /* one byte */
	      buf[i++] = c;
	    } else if (c < 0x800) {
	      /* two bytes */
	      buf[i++] = 0xC0 | (c >>> 6);
	      buf[i++] = 0x80 | (c & 0x3f);
	    } else if (c < 0x10000) {
	      /* three bytes */
	      buf[i++] = 0xE0 | (c >>> 12);
	      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
	      buf[i++] = 0x80 | (c & 0x3f);
	    } else {
	      /* four bytes */
	      buf[i++] = 0xf0 | (c >>> 18);
	      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
	      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
	      buf[i++] = 0x80 | (c & 0x3f);
	    }
	  }

	  return buf;
	};

	// Helper (used in 2 places)
	function buf2binstring(buf, len) {
	  // use fallback for big arrays to avoid stack overflow
	  if (len < 65537) {
	    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
	      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
	    }
	  }

	  var result = '';
	  for (var i = 0; i < len; i++) {
	    result += String.fromCharCode(buf[i]);
	  }
	  return result;
	}


	// Convert byte array to binary string
	exports.buf2binstring = function (buf) {
	  return buf2binstring(buf, buf.length);
	};


	// Convert binary string (typed, when possible)
	exports.binstring2buf = function (str) {
	  var buf = new utils.Buf8(str.length);
	  for (var i = 0, len = buf.length; i < len; i++) {
	    buf[i] = str.charCodeAt(i);
	  }
	  return buf;
	};


	// convert array to string
	exports.buf2string = function (buf, max) {
	  var i, out, c, c_len;
	  var len = max || buf.length;

	  // Reserve max possible length (2 words per char)
	  // NB: by unknown reasons, Array is significantly faster for
	  //     String.fromCharCode.apply than Uint16Array.
	  var utf16buf = new Array(len * 2);

	  for (out = 0, i = 0; i < len;) {
	    c = buf[i++];
	    // quick process ascii
	    if (c < 0x80) { utf16buf[out++] = c; continue; }

	    c_len = _utf8len[c];
	    // skip 5 & 6 byte codes
	    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

	    // apply mask on first byte
	    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
	    // join the rest
	    while (c_len > 1 && i < len) {
	      c = (c << 6) | (buf[i++] & 0x3f);
	      c_len--;
	    }

	    // terminated by end of string?
	    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

	    if (c < 0x10000) {
	      utf16buf[out++] = c;
	    } else {
	      c -= 0x10000;
	      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
	      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
	    }
	  }

	  return buf2binstring(utf16buf, out);
	};


	// Calculate max possible position in utf8 buffer,
	// that will not break sequence. If that's not possible
	// - (very small limits) return max size as is.
	//
	// buf[] - utf8 bytes array
	// max   - length limit (mandatory);
	exports.utf8border = function (buf, max) {
	  var pos;

	  max = max || buf.length;
	  if (max > buf.length) { max = buf.length; }

	  // go back from last position, until start of sequence found
	  pos = max - 1;
	  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

	  // Fuckup - very small and broken sequence,
	  // return max, because we should return something anyway.
	  if (pos < 0) { return max; }

	  // If we came to start of buffer - that means vuffer is too small,
	  // return max too.
	  if (pos === 0) { return max; }

	  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
	};

	},{"./common":41}],43:[function(require,module,exports){

	// Note: adler32 takes 12% for level 0 and 2% for level 6.
	// It doesn't worth to make additional optimizationa as in original.
	// Small size is preferable.

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	function adler32(adler, buf, len, pos) {
	  var s1 = (adler & 0xffff) |0,
	      s2 = ((adler >>> 16) & 0xffff) |0,
	      n = 0;

	  while (len !== 0) {
	    // Set limit ~ twice less than 5552, to keep
	    // s2 in 31-bits, because we force signed ints.
	    // in other case %= will fail.
	    n = len > 2000 ? 2000 : len;
	    len -= n;

	    do {
	      s1 = (s1 + buf[pos++]) |0;
	      s2 = (s2 + s1) |0;
	    } while (--n);

	    s1 %= 65521;
	    s2 %= 65521;
	  }

	  return (s1 | (s2 << 16)) |0;
	}


	module.exports = adler32;

	},{}],44:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	module.exports = {

	  /* Allowed flush values; see deflate() and inflate() below for details */
	  Z_NO_FLUSH:         0,
	  Z_PARTIAL_FLUSH:    1,
	  Z_SYNC_FLUSH:       2,
	  Z_FULL_FLUSH:       3,
	  Z_FINISH:           4,
	  Z_BLOCK:            5,
	  Z_TREES:            6,

	  /* Return codes for the compression/decompression functions. Negative values
	  * are errors, positive values are used for special but normal events.
	  */
	  Z_OK:               0,
	  Z_STREAM_END:       1,
	  Z_NEED_DICT:        2,
	  Z_ERRNO:           -1,
	  Z_STREAM_ERROR:    -2,
	  Z_DATA_ERROR:      -3,
	  //Z_MEM_ERROR:     -4,
	  Z_BUF_ERROR:       -5,
	  //Z_VERSION_ERROR: -6,

	  /* compression levels */
	  Z_NO_COMPRESSION:         0,
	  Z_BEST_SPEED:             1,
	  Z_BEST_COMPRESSION:       9,
	  Z_DEFAULT_COMPRESSION:   -1,


	  Z_FILTERED:               1,
	  Z_HUFFMAN_ONLY:           2,
	  Z_RLE:                    3,
	  Z_FIXED:                  4,
	  Z_DEFAULT_STRATEGY:       0,

	  /* Possible values of the data_type field (though see inflate()) */
	  Z_BINARY:                 0,
	  Z_TEXT:                   1,
	  //Z_ASCII:                1, // = Z_TEXT (deprecated)
	  Z_UNKNOWN:                2,

	  /* The deflate compression method */
	  Z_DEFLATED:               8
	  //Z_NULL:                 null // Use -1 or null inline, depending on var type
	};

	},{}],45:[function(require,module,exports){

	// Note: we can't get significant speed boost here.
	// So write code to minimize size - no pregenerated tables
	// and array tools dependencies.

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	// Use ordinary array, since untyped makes no boost here
	function makeTable() {
	  var c, table = [];

	  for (var n = 0; n < 256; n++) {
	    c = n;
	    for (var k = 0; k < 8; k++) {
	      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
	    }
	    table[n] = c;
	  }

	  return table;
	}

	// Create table on load. Just 255 signed longs. Not a problem.
	var crcTable = makeTable();


	function crc32(crc, buf, len, pos) {
	  var t = crcTable,
	      end = pos + len;

	  crc ^= -1;

	  for (var i = pos; i < end; i++) {
	    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
	  }

	  return (crc ^ (-1)); // >>> 0;
	}


	module.exports = crc32;

	},{}],46:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	var utils   = require('../utils/common');
	var trees   = require('./trees');
	var adler32 = require('./adler32');
	var crc32   = require('./crc32');
	var msg     = require('./messages');

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	/* Allowed flush values; see deflate() and inflate() below for details */
	var Z_NO_FLUSH      = 0;
	var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	var Z_FULL_FLUSH    = 3;
	var Z_FINISH        = 4;
	var Z_BLOCK         = 5;
	//var Z_TREES         = 6;


	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	//var Z_NEED_DICT     = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR  = -2;
	var Z_DATA_ERROR    = -3;
	//var Z_MEM_ERROR     = -4;
	var Z_BUF_ERROR     = -5;
	//var Z_VERSION_ERROR = -6;


	/* compression levels */
	//var Z_NO_COMPRESSION      = 0;
	//var Z_BEST_SPEED          = 1;
	//var Z_BEST_COMPRESSION    = 9;
	var Z_DEFAULT_COMPRESSION = -1;


	var Z_FILTERED            = 1;
	var Z_HUFFMAN_ONLY        = 2;
	var Z_RLE                 = 3;
	var Z_FIXED               = 4;
	var Z_DEFAULT_STRATEGY    = 0;

	/* Possible values of the data_type field (though see inflate()) */
	//var Z_BINARY              = 0;
	//var Z_TEXT                = 1;
	//var Z_ASCII               = 1; // = Z_TEXT
	var Z_UNKNOWN             = 2;


	/* The deflate compression method */
	var Z_DEFLATED  = 8;

	/*============================================================================*/


	var MAX_MEM_LEVEL = 9;
	/* Maximum value for memLevel in deflateInit2 */
	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_MEM_LEVEL = 8;


	var LENGTH_CODES  = 29;
	/* number of length codes, not counting the special END_BLOCK code */
	var LITERALS      = 256;
	/* number of literal bytes 0..255 */
	var L_CODES       = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */
	var D_CODES       = 30;
	/* number of distance codes */
	var BL_CODES      = 19;
	/* number of codes used to transfer the bit lengths */
	var HEAP_SIZE     = 2 * L_CODES + 1;
	/* maximum heap size */
	var MAX_BITS  = 15;
	/* All codes must not exceed MAX_BITS bits */

	var MIN_MATCH = 3;
	var MAX_MATCH = 258;
	var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

	var PRESET_DICT = 0x20;

	var INIT_STATE = 42;
	var EXTRA_STATE = 69;
	var NAME_STATE = 73;
	var COMMENT_STATE = 91;
	var HCRC_STATE = 103;
	var BUSY_STATE = 113;
	var FINISH_STATE = 666;

	var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
	var BS_BLOCK_DONE     = 2; /* block flush performed */
	var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
	var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

	var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

	function err(strm, errorCode) {
	  strm.msg = msg[errorCode];
	  return errorCode;
	}

	function rank(f) {
	  return ((f) << 1) - ((f) > 4 ? 9 : 0);
	}

	function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


	/* =========================================================================
	 * Flush as much pending output as possible. All deflate() output goes
	 * through this function so some applications may wish to modify it
	 * to avoid allocating a large strm->output buffer and copying into it.
	 * (See also read_buf()).
	 */
	function flush_pending(strm) {
	  var s = strm.state;

	  //_tr_flush_bits(s);
	  var len = s.pending;
	  if (len > strm.avail_out) {
	    len = strm.avail_out;
	  }
	  if (len === 0) { return; }

	  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
	  strm.next_out += len;
	  s.pending_out += len;
	  strm.total_out += len;
	  strm.avail_out -= len;
	  s.pending -= len;
	  if (s.pending === 0) {
	    s.pending_out = 0;
	  }
	}


	function flush_block_only(s, last) {
	  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
	  s.block_start = s.strstart;
	  flush_pending(s.strm);
	}


	function put_byte(s, b) {
	  s.pending_buf[s.pending++] = b;
	}


	/* =========================================================================
	 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
	 * IN assertion: the stream state is correct and there is enough room in
	 * pending_buf.
	 */
	function putShortMSB(s, b) {
	//  put_byte(s, (Byte)(b >> 8));
	//  put_byte(s, (Byte)(b & 0xff));
	  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
	  s.pending_buf[s.pending++] = b & 0xff;
	}


	/* ===========================================================================
	 * Read a new buffer from the current input stream, update the adler32
	 * and total number of bytes read.  All deflate() input goes through
	 * this function so some applications may wish to modify it to avoid
	 * allocating a large strm->input buffer and copying from it.
	 * (See also flush_pending()).
	 */
	function read_buf(strm, buf, start, size) {
	  var len = strm.avail_in;

	  if (len > size) { len = size; }
	  if (len === 0) { return 0; }

	  strm.avail_in -= len;

	  // zmemcpy(buf, strm->next_in, len);
	  utils.arraySet(buf, strm.input, strm.next_in, len, start);
	  if (strm.state.wrap === 1) {
	    strm.adler = adler32(strm.adler, buf, len, start);
	  }

	  else if (strm.state.wrap === 2) {
	    strm.adler = crc32(strm.adler, buf, len, start);
	  }

	  strm.next_in += len;
	  strm.total_in += len;

	  return len;
	}


	/* ===========================================================================
	 * Set match_start to the longest match starting at the given string and
	 * return its length. Matches shorter or equal to prev_length are discarded,
	 * in which case the result is equal to prev_length and match_start is
	 * garbage.
	 * IN assertions: cur_match is the head of the hash chain for the current
	 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
	 * OUT assertion: the match length is not greater than s->lookahead.
	 */
	function longest_match(s, cur_match) {
	  var chain_length = s.max_chain_length;      /* max hash chain length */
	  var scan = s.strstart; /* current string */
	  var match;                       /* matched string */
	  var len;                           /* length of current match */
	  var best_len = s.prev_length;              /* best match length so far */
	  var nice_match = s.nice_match;             /* stop if match long enough */
	  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
	      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

	  var _win = s.window; // shortcut

	  var wmask = s.w_mask;
	  var prev  = s.prev;

	  /* Stop when cur_match becomes <= limit. To simplify the code,
	   * we prevent matches with the string of window index 0.
	   */

	  var strend = s.strstart + MAX_MATCH;
	  var scan_end1  = _win[scan + best_len - 1];
	  var scan_end   = _win[scan + best_len];

	  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
	   * It is easy to get rid of this optimization if necessary.
	   */
	  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

	  /* Do not waste too much time if we already have a good match: */
	  if (s.prev_length >= s.good_match) {
	    chain_length >>= 2;
	  }
	  /* Do not look for matches beyond the end of the input. This is necessary
	   * to make deflate deterministic.
	   */
	  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

	  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

	  do {
	    // Assert(cur_match < s->strstart, "no future");
	    match = cur_match;

	    /* Skip to next match if the match length cannot increase
	     * or if the match length is less than 2.  Note that the checks below
	     * for insufficient lookahead only occur occasionally for performance
	     * reasons.  Therefore uninitialized memory will be accessed, and
	     * conditional jumps will be made that depend on those values.
	     * However the length of the match is limited to the lookahead, so
	     * the output of deflate is not affected by the uninitialized values.
	     */

	    if (_win[match + best_len]     !== scan_end  ||
	        _win[match + best_len - 1] !== scan_end1 ||
	        _win[match]                !== _win[scan] ||
	        _win[++match]              !== _win[scan + 1]) {
	      continue;
	    }

	    /* The check at best_len-1 can be removed because it will be made
	     * again later. (This heuristic is not always a win.)
	     * It is not necessary to compare scan[2] and match[2] since they
	     * are always equal when the other bytes match, given that
	     * the hash keys are equal and that HASH_BITS >= 8.
	     */
	    scan += 2;
	    match++;
	    // Assert(*scan == *match, "match[2]?");

	    /* We check for insufficient lookahead only every 8th comparison;
	     * the 256th check will be made at strstart+258.
	     */
	    do {
	      /*jshint noempty:false*/
	    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             scan < strend);

	    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

	    len = MAX_MATCH - (strend - scan);
	    scan = strend - MAX_MATCH;

	    if (len > best_len) {
	      s.match_start = cur_match;
	      best_len = len;
	      if (len >= nice_match) {
	        break;
	      }
	      scan_end1  = _win[scan + best_len - 1];
	      scan_end   = _win[scan + best_len];
	    }
	  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

	  if (best_len <= s.lookahead) {
	    return best_len;
	  }
	  return s.lookahead;
	}


	/* ===========================================================================
	 * Fill the window when the lookahead becomes insufficient.
	 * Updates strstart and lookahead.
	 *
	 * IN assertion: lookahead < MIN_LOOKAHEAD
	 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
	 *    At least one byte has been read, or avail_in == 0; reads are
	 *    performed for at least two bytes (required for the zip translate_eol
	 *    option -- not supported here).
	 */
	function fill_window(s) {
	  var _w_size = s.w_size;
	  var p, n, m, more, str;

	  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

	  do {
	    more = s.window_size - s.lookahead - s.strstart;

	    // JS ints have 32 bit, block below not needed
	    /* Deal with !@#$% 64K limit: */
	    //if (sizeof(int) <= 2) {
	    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
	    //        more = wsize;
	    //
	    //  } else if (more == (unsigned)(-1)) {
	    //        /* Very unlikely, but possible on 16 bit machine if
	    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
	    //         */
	    //        more--;
	    //    }
	    //}


	    /* If the window is almost full and there is insufficient lookahead,
	     * move the upper half to the lower one to make room in the upper half.
	     */
	    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

	      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
	      s.match_start -= _w_size;
	      s.strstart -= _w_size;
	      /* we now have strstart >= MAX_DIST */
	      s.block_start -= _w_size;

	      /* Slide the hash table (could be avoided with 32 bit values
	       at the expense of memory usage). We slide even when level == 0
	       to keep the hash table consistent if we switch back to level > 0
	       later. (Using level 0 permanently is not an optimal usage of
	       zlib, so we don't care about this pathological case.)
	       */

	      n = s.hash_size;
	      p = n;
	      do {
	        m = s.head[--p];
	        s.head[p] = (m >= _w_size ? m - _w_size : 0);
	      } while (--n);

	      n = _w_size;
	      p = n;
	      do {
	        m = s.prev[--p];
	        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
	        /* If n is not on any hash chain, prev[n] is garbage but
	         * its value will never be used.
	         */
	      } while (--n);

	      more += _w_size;
	    }
	    if (s.strm.avail_in === 0) {
	      break;
	    }

	    /* If there was no sliding:
	     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
	     *    more == window_size - lookahead - strstart
	     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
	     * => more >= window_size - 2*WSIZE + 2
	     * In the BIG_MEM or MMAP case (not yet supported),
	     *   window_size == input_size + MIN_LOOKAHEAD  &&
	     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
	     * Otherwise, window_size == 2*WSIZE so more >= 2.
	     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
	     */
	    //Assert(more >= 2, "more < 2");
	    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
	    s.lookahead += n;

	    /* Initialize the hash value now that we have some input: */
	    if (s.lookahead + s.insert >= MIN_MATCH) {
	      str = s.strstart - s.insert;
	      s.ins_h = s.window[str];

	      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
	//#if MIN_MATCH != 3
	//        Call update_hash() MIN_MATCH-3 more times
	//#endif
	      while (s.insert) {
	        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
	        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

	        s.prev[str & s.w_mask] = s.head[s.ins_h];
	        s.head[s.ins_h] = str;
	        str++;
	        s.insert--;
	        if (s.lookahead + s.insert < MIN_MATCH) {
	          break;
	        }
	      }
	    }
	    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
	     * but this is not important since only literal bytes will be emitted.
	     */

	  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

	  /* If the WIN_INIT bytes after the end of the current data have never been
	   * written, then zero those bytes in order to avoid memory check reports of
	   * the use of uninitialized (or uninitialised as Julian writes) bytes by
	   * the longest match routines.  Update the high water mark for the next
	   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
	   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
	   */
	//  if (s.high_water < s.window_size) {
	//    var curr = s.strstart + s.lookahead;
	//    var init = 0;
	//
	//    if (s.high_water < curr) {
	//      /* Previous high water mark below current data -- zero WIN_INIT
	//       * bytes or up to end of window, whichever is less.
	//       */
	//      init = s.window_size - curr;
	//      if (init > WIN_INIT)
	//        init = WIN_INIT;
	//      zmemzero(s->window + curr, (unsigned)init);
	//      s->high_water = curr + init;
	//    }
	//    else if (s->high_water < (ulg)curr + WIN_INIT) {
	//      /* High water mark at or above current data, but below current data
	//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
	//       * to end of window, whichever is less.
	//       */
	//      init = (ulg)curr + WIN_INIT - s->high_water;
	//      if (init > s->window_size - s->high_water)
	//        init = s->window_size - s->high_water;
	//      zmemzero(s->window + s->high_water, (unsigned)init);
	//      s->high_water += init;
	//    }
	//  }
	//
	//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
	//    "not enough room for search");
	}

	/* ===========================================================================
	 * Copy without compression as much as possible from the input stream, return
	 * the current block state.
	 * This function does not insert new strings in the dictionary since
	 * uncompressible data is probably not useful. This function is used
	 * only for the level=0 compression option.
	 * NOTE: this function should be optimized to avoid extra copying from
	 * window to pending_buf.
	 */
	function deflate_stored(s, flush) {
	  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
	   * to pending_buf_size, and each stored block has a 5 byte header:
	   */
	  var max_block_size = 0xffff;

	  if (max_block_size > s.pending_buf_size - 5) {
	    max_block_size = s.pending_buf_size - 5;
	  }

	  /* Copy as much as possible from input to output: */
	  for (;;) {
	    /* Fill the window as much as possible: */
	    if (s.lookahead <= 1) {

	      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
	      //  s->block_start >= (long)s->w_size, "slide too late");
	//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
	//        s.block_start >= s.w_size)) {
	//        throw  new Error("slide too late");
	//      }

	      fill_window(s);
	      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }

	      if (s.lookahead === 0) {
	        break;
	      }
	      /* flush the current block */
	    }
	    //Assert(s->block_start >= 0L, "block gone");
	//    if (s.block_start < 0) throw new Error("block gone");

	    s.strstart += s.lookahead;
	    s.lookahead = 0;

	    /* Emit a stored block if pending_buf will be full: */
	    var max_start = s.block_start + max_block_size;

	    if (s.strstart === 0 || s.strstart >= max_start) {
	      /* strstart == 0 is possible when wraparound on 16-bit machine */
	      s.lookahead = s.strstart - max_start;
	      s.strstart = max_start;
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/


	    }
	    /* Flush if we may have to slide, otherwise block_start may become
	     * negative and the data will be gone:
	     */
	    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }

	  s.insert = 0;

	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }

	  if (s.strstart > s.block_start) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }

	  return BS_NEED_MORE;
	}

	/* ===========================================================================
	 * Compress as much as possible from the input stream, return the current
	 * block state.
	 * This function does not perform lazy evaluation of matches and inserts
	 * new strings in the dictionary only for unmatched strings or for short
	 * matches. It is used only for the fast compression options.
	 */
	function deflate_fast(s, flush) {
	  var hash_head;        /* head of the hash chain */
	  var bflush;           /* set if current block must be flushed */

	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) {
	        break; /* flush the current block */
	      }
	    }

	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0/*NIL*/;
	    if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }

	    /* Find the longest match, discarding those <= prev_length.
	     * At this point we have always match_length < MIN_MATCH
	     */
	    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
	      /* To simplify the code, we prevent matches with the string
	       * of window index 0 (in particular we have to avoid a match
	       * of the string with itself at the start of the input file).
	       */
	      s.match_length = longest_match(s, hash_head);
	      /* longest_match() sets match_start */
	    }
	    if (s.match_length >= MIN_MATCH) {
	      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

	      /*** _tr_tally_dist(s, s.strstart - s.match_start,
	                     s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

	      s.lookahead -= s.match_length;

	      /* Insert new strings in the hash table only if the match length
	       * is not too large. This saves time but degrades compression.
	       */
	      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
	        s.match_length--; /* string at strstart already in table */
	        do {
	          s.strstart++;
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
	           * always MIN_MATCH bytes ahead.
	           */
	        } while (--s.match_length !== 0);
	        s.strstart++;
	      } else
	      {
	        s.strstart += s.match_length;
	        s.match_length = 0;
	        s.ins_h = s.window[s.strstart];
	        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
	        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

	//#if MIN_MATCH != 3
	//                Call UPDATE_HASH() MIN_MATCH-3 more times
	//#endif
	        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
	         * matter since it will be recomputed at next deflate call.
	         */
	      }
	    } else {
	      /* No match, output a literal byte */
	      //Tracevv((stderr,"%c", s.window[s.strstart]));
	      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

	      s.lookahead--;
	      s.strstart++;
	    }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* ===========================================================================
	 * Same as above, but achieves better compression. We use a lazy
	 * evaluation for matches: a match is finally adopted only if there is
	 * no better match at the next window position.
	 */
	function deflate_slow(s, flush) {
	  var hash_head;          /* head of hash chain */
	  var bflush;              /* set if current block must be flushed */

	  var max_insert;

	  /* Process the input block. */
	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) { break; } /* flush the current block */
	    }

	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0/*NIL*/;
	    if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }

	    /* Find the longest match, discarding those <= prev_length.
	     */
	    s.prev_length = s.match_length;
	    s.prev_match = s.match_start;
	    s.match_length = MIN_MATCH - 1;

	    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
	        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
	      /* To simplify the code, we prevent matches with the string
	       * of window index 0 (in particular we have to avoid a match
	       * of the string with itself at the start of the input file).
	       */
	      s.match_length = longest_match(s, hash_head);
	      /* longest_match() sets match_start */

	      if (s.match_length <= 5 &&
	         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

	        /* If prev_match is also MIN_MATCH, match_start is garbage
	         * but we will ignore the current match anyway.
	         */
	        s.match_length = MIN_MATCH - 1;
	      }
	    }
	    /* If there was a match at the previous step and the current
	     * match is not better, output the previous match:
	     */
	    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
	      max_insert = s.strstart + s.lookahead - MIN_MATCH;
	      /* Do not insert strings in hash table beyond this. */

	      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

	      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
	                     s.prev_length - MIN_MATCH, bflush);***/
	      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
	      /* Insert in hash table all strings up to the end of the match.
	       * strstart-1 and strstart are already inserted. If there is not
	       * enough lookahead, the last two strings are not inserted in
	       * the hash table.
	       */
	      s.lookahead -= s.prev_length - 1;
	      s.prev_length -= 2;
	      do {
	        if (++s.strstart <= max_insert) {
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	        }
	      } while (--s.prev_length !== 0);
	      s.match_available = 0;
	      s.match_length = MIN_MATCH - 1;
	      s.strstart++;

	      if (bflush) {
	        /*** FLUSH_BLOCK(s, 0); ***/
	        flush_block_only(s, false);
	        if (s.strm.avail_out === 0) {
	          return BS_NEED_MORE;
	        }
	        /***/
	      }

	    } else if (s.match_available) {
	      /* If there was no match at the previous position, output a
	       * single literal. If there was a match but the current match
	       * is longer, truncate the previous match to a single literal.
	       */
	      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

	      if (bflush) {
	        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
	        flush_block_only(s, false);
	        /***/
	      }
	      s.strstart++;
	      s.lookahead--;
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	    } else {
	      /* There is no previous match to compare with, wait for
	       * the next step to decide.
	       */
	      s.match_available = 1;
	      s.strstart++;
	      s.lookahead--;
	    }
	  }
	  //Assert (flush != Z_NO_FLUSH, "no flush?");
	  if (s.match_available) {
	    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

	    s.match_available = 0;
	  }
	  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }

	  return BS_BLOCK_DONE;
	}


	/* ===========================================================================
	 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
	 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
	 * deflate switches away from Z_RLE.)
	 */
	function deflate_rle(s, flush) {
	  var bflush;            /* set if current block must be flushed */
	  var prev;              /* byte at distance one to match */
	  var scan, strend;      /* scan goes up to strend for length of run */

	  var _win = s.window;

	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the longest run, plus one for the unrolled loop.
	     */
	    if (s.lookahead <= MAX_MATCH) {
	      fill_window(s);
	      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) { break; } /* flush the current block */
	    }

	    /* See how many times the previous byte repeats */
	    s.match_length = 0;
	    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
	      scan = s.strstart - 1;
	      prev = _win[scan];
	      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
	        strend = s.strstart + MAX_MATCH;
	        do {
	          /*jshint noempty:false*/
	        } while (prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 scan < strend);
	        s.match_length = MAX_MATCH - (strend - scan);
	        if (s.match_length > s.lookahead) {
	          s.match_length = s.lookahead;
	        }
	      }
	      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
	    }

	    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
	    if (s.match_length >= MIN_MATCH) {
	      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

	      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

	      s.lookahead -= s.match_length;
	      s.strstart += s.match_length;
	      s.match_length = 0;
	    } else {
	      /* No match, output a literal byte */
	      //Tracevv((stderr,"%c", s->window[s->strstart]));
	      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

	      s.lookahead--;
	      s.strstart++;
	    }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* ===========================================================================
	 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
	 * (It will be regenerated if this run of deflate switches away from Huffman.)
	 */
	function deflate_huff(s, flush) {
	  var bflush;             /* set if current block must be flushed */

	  for (;;) {
	    /* Make sure that we have a literal to write. */
	    if (s.lookahead === 0) {
	      fill_window(s);
	      if (s.lookahead === 0) {
	        if (flush === Z_NO_FLUSH) {
	          return BS_NEED_MORE;
	        }
	        break;      /* flush the current block */
	      }
	    }

	    /* Output a literal byte */
	    s.match_length = 0;
	    //Tracevv((stderr,"%c", s->window[s->strstart]));
	    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
	    s.lookahead--;
	    s.strstart++;
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* Values for max_lazy_match, good_match and max_chain_length, depending on
	 * the desired pack level (0..9). The values given below have been tuned to
	 * exclude worst case performance for pathological files. Better values may be
	 * found for specific files.
	 */
	function Config(good_length, max_lazy, nice_length, max_chain, func) {
	  this.good_length = good_length;
	  this.max_lazy = max_lazy;
	  this.nice_length = nice_length;
	  this.max_chain = max_chain;
	  this.func = func;
	}

	var configuration_table;

	configuration_table = [
	  /*      good lazy nice chain */
	  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
	  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
	  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
	  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

	  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
	  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
	  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
	  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
	  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
	  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
	];


	/* ===========================================================================
	 * Initialize the "longest match" routines for a new zlib stream
	 */
	function lm_init(s) {
	  s.window_size = 2 * s.w_size;

	  /*** CLEAR_HASH(s); ***/
	  zero(s.head); // Fill with NIL (= 0);

	  /* Set the default configuration parameters:
	   */
	  s.max_lazy_match = configuration_table[s.level].max_lazy;
	  s.good_match = configuration_table[s.level].good_length;
	  s.nice_match = configuration_table[s.level].nice_length;
	  s.max_chain_length = configuration_table[s.level].max_chain;

	  s.strstart = 0;
	  s.block_start = 0;
	  s.lookahead = 0;
	  s.insert = 0;
	  s.match_length = s.prev_length = MIN_MATCH - 1;
	  s.match_available = 0;
	  s.ins_h = 0;
	}


	function DeflateState() {
	  this.strm = null;            /* pointer back to this zlib stream */
	  this.status = 0;            /* as the name implies */
	  this.pending_buf = null;      /* output still pending */
	  this.pending_buf_size = 0;  /* size of pending_buf */
	  this.pending_out = 0;       /* next pending byte to output to the stream */
	  this.pending = 0;           /* nb of bytes in the pending buffer */
	  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
	  this.gzhead = null;         /* gzip header information to write */
	  this.gzindex = 0;           /* where in extra, name, or comment */
	  this.method = Z_DEFLATED; /* can only be DEFLATED */
	  this.last_flush = -1;   /* value of flush param for previous deflate call */

	  this.w_size = 0;  /* LZ77 window size (32K by default) */
	  this.w_bits = 0;  /* log2(w_size)  (8..16) */
	  this.w_mask = 0;  /* w_size - 1 */

	  this.window = null;
	  /* Sliding window. Input bytes are read into the second half of the window,
	   * and move to the first half later to keep a dictionary of at least wSize
	   * bytes. With this organization, matches are limited to a distance of
	   * wSize-MAX_MATCH bytes, but this ensures that IO is always
	   * performed with a length multiple of the block size.
	   */

	  this.window_size = 0;
	  /* Actual size of window: 2*wSize, except when the user input buffer
	   * is directly used as sliding window.
	   */

	  this.prev = null;
	  /* Link to older string with same hash index. To limit the size of this
	   * array to 64K, this link is maintained only for the last 32K strings.
	   * An index in this array is thus a window index modulo 32K.
	   */

	  this.head = null;   /* Heads of the hash chains or NIL. */

	  this.ins_h = 0;       /* hash index of string to be inserted */
	  this.hash_size = 0;   /* number of elements in hash table */
	  this.hash_bits = 0;   /* log2(hash_size) */
	  this.hash_mask = 0;   /* hash_size-1 */

	  this.hash_shift = 0;
	  /* Number of bits by which ins_h must be shifted at each input
	   * step. It must be such that after MIN_MATCH steps, the oldest
	   * byte no longer takes part in the hash key, that is:
	   *   hash_shift * MIN_MATCH >= hash_bits
	   */

	  this.block_start = 0;
	  /* Window position at the beginning of the current output block. Gets
	   * negative when the window is moved backwards.
	   */

	  this.match_length = 0;      /* length of best match */
	  this.prev_match = 0;        /* previous match */
	  this.match_available = 0;   /* set if previous match exists */
	  this.strstart = 0;          /* start of string to insert */
	  this.match_start = 0;       /* start of matching string */
	  this.lookahead = 0;         /* number of valid bytes ahead in window */

	  this.prev_length = 0;
	  /* Length of the best match at previous step. Matches not greater than this
	   * are discarded. This is used in the lazy match evaluation.
	   */

	  this.max_chain_length = 0;
	  /* To speed up deflation, hash chains are never searched beyond this
	   * length.  A higher limit improves compression ratio but degrades the
	   * speed.
	   */

	  this.max_lazy_match = 0;
	  /* Attempt to find a better match only when the current match is strictly
	   * smaller than this value. This mechanism is used only for compression
	   * levels >= 4.
	   */
	  // That's alias to max_lazy_match, don't use directly
	  //this.max_insert_length = 0;
	  /* Insert new strings in the hash table only if the match length is not
	   * greater than this length. This saves time but degrades compression.
	   * max_insert_length is used only for compression levels <= 3.
	   */

	  this.level = 0;     /* compression level (1..9) */
	  this.strategy = 0;  /* favor or force Huffman coding*/

	  this.good_match = 0;
	  /* Use a faster search when the previous match is longer than this */

	  this.nice_match = 0; /* Stop searching when current match exceeds this */

	              /* used by trees.c: */

	  /* Didn't use ct_data typedef below to suppress compiler warning */

	  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
	  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
	  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

	  // Use flat array of DOUBLE size, with interleaved fata,
	  // because JS does not support effective
	  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
	  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
	  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
	  zero(this.dyn_ltree);
	  zero(this.dyn_dtree);
	  zero(this.bl_tree);

	  this.l_desc   = null;         /* desc. for literal tree */
	  this.d_desc   = null;         /* desc. for distance tree */
	  this.bl_desc  = null;         /* desc. for bit length tree */

	  //ush bl_count[MAX_BITS+1];
	  this.bl_count = new utils.Buf16(MAX_BITS + 1);
	  /* number of codes at each bit length for an optimal tree */

	  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
	  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
	  zero(this.heap);

	  this.heap_len = 0;               /* number of elements in the heap */
	  this.heap_max = 0;               /* element of largest frequency */
	  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
	   * The same heap array is used to build all trees.
	   */

	  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
	  zero(this.depth);
	  /* Depth of each subtree used as tie breaker for trees of equal frequency
	   */

	  this.l_buf = 0;          /* buffer index for literals or lengths */

	  this.lit_bufsize = 0;
	  /* Size of match buffer for literals/lengths.  There are 4 reasons for
	   * limiting lit_bufsize to 64K:
	   *   - frequencies can be kept in 16 bit counters
	   *   - if compression is not successful for the first block, all input
	   *     data is still in the window so we can still emit a stored block even
	   *     when input comes from standard input.  (This can also be done for
	   *     all blocks if lit_bufsize is not greater than 32K.)
	   *   - if compression is not successful for a file smaller than 64K, we can
	   *     even emit a stored file instead of a stored block (saving 5 bytes).
	   *     This is applicable only for zip (not gzip or zlib).
	   *   - creating new Huffman trees less frequently may not provide fast
	   *     adaptation to changes in the input data statistics. (Take for
	   *     example a binary file with poorly compressible code followed by
	   *     a highly compressible string table.) Smaller buffer sizes give
	   *     fast adaptation but have of course the overhead of transmitting
	   *     trees more frequently.
	   *   - I can't count above 4
	   */

	  this.last_lit = 0;      /* running index in l_buf */

	  this.d_buf = 0;
	  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
	   * the same number of elements. To use different lengths, an extra flag
	   * array would be necessary.
	   */

	  this.opt_len = 0;       /* bit length of current block with optimal trees */
	  this.static_len = 0;    /* bit length of current block with static trees */
	  this.matches = 0;       /* number of string matches in current block */
	  this.insert = 0;        /* bytes at end of window left to insert */


	  this.bi_buf = 0;
	  /* Output buffer. bits are inserted starting at the bottom (least
	   * significant bits).
	   */
	  this.bi_valid = 0;
	  /* Number of valid bits in bi_buf.  All bits above the last valid bit
	   * are always zero.
	   */

	  // Used for window memory init. We safely ignore it for JS. That makes
	  // sense only for pointers and memory check tools.
	  //this.high_water = 0;
	  /* High water mark offset in window for initialized bytes -- bytes above
	   * this are set to zero in order to avoid memory check warnings when
	   * longest match routines access bytes past the input.  This is then
	   * updated to the new high water mark.
	   */
	}


	function deflateResetKeep(strm) {
	  var s;

	  if (!strm || !strm.state) {
	    return err(strm, Z_STREAM_ERROR);
	  }

	  strm.total_in = strm.total_out = 0;
	  strm.data_type = Z_UNKNOWN;

	  s = strm.state;
	  s.pending = 0;
	  s.pending_out = 0;

	  if (s.wrap < 0) {
	    s.wrap = -s.wrap;
	    /* was made negative by deflate(..., Z_FINISH); */
	  }
	  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
	  strm.adler = (s.wrap === 2) ?
	    0  // crc32(0, Z_NULL, 0)
	  :
	    1; // adler32(0, Z_NULL, 0)
	  s.last_flush = Z_NO_FLUSH;
	  trees._tr_init(s);
	  return Z_OK;
	}


	function deflateReset(strm) {
	  var ret = deflateResetKeep(strm);
	  if (ret === Z_OK) {
	    lm_init(strm.state);
	  }
	  return ret;
	}


	function deflateSetHeader(strm, head) {
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
	  strm.state.gzhead = head;
	  return Z_OK;
	}


	function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
	  if (!strm) { // === Z_NULL
	    return Z_STREAM_ERROR;
	  }
	  var wrap = 1;

	  if (level === Z_DEFAULT_COMPRESSION) {
	    level = 6;
	  }

	  if (windowBits < 0) { /* suppress zlib wrapper */
	    wrap = 0;
	    windowBits = -windowBits;
	  }

	  else if (windowBits > 15) {
	    wrap = 2;           /* write gzip wrapper instead */
	    windowBits -= 16;
	  }


	  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
	    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
	    strategy < 0 || strategy > Z_FIXED) {
	    return err(strm, Z_STREAM_ERROR);
	  }


	  if (windowBits === 8) {
	    windowBits = 9;
	  }
	  /* until 256-byte window bug fixed */

	  var s = new DeflateState();

	  strm.state = s;
	  s.strm = strm;

	  s.wrap = wrap;
	  s.gzhead = null;
	  s.w_bits = windowBits;
	  s.w_size = 1 << s.w_bits;
	  s.w_mask = s.w_size - 1;

	  s.hash_bits = memLevel + 7;
	  s.hash_size = 1 << s.hash_bits;
	  s.hash_mask = s.hash_size - 1;
	  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

	  s.window = new utils.Buf8(s.w_size * 2);
	  s.head = new utils.Buf16(s.hash_size);
	  s.prev = new utils.Buf16(s.w_size);

	  // Don't need mem init magic for JS.
	  //s.high_water = 0;  /* nothing written to s->window yet */

	  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

	  s.pending_buf_size = s.lit_bufsize * 4;

	  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
	  //s->pending_buf = (uchf *) overlay;
	  s.pending_buf = new utils.Buf8(s.pending_buf_size);

	  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
	  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
	  s.d_buf = 1 * s.lit_bufsize;

	  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
	  s.l_buf = (1 + 2) * s.lit_bufsize;

	  s.level = level;
	  s.strategy = strategy;
	  s.method = method;

	  return deflateReset(strm);
	}

	function deflateInit(strm, level) {
	  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
	}


	function deflate(strm, flush) {
	  var old_flush, s;
	  var beg, val; // for gzip header write only

	  if (!strm || !strm.state ||
	    flush > Z_BLOCK || flush < 0) {
	    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
	  }

	  s = strm.state;

	  if (!strm.output ||
	      (!strm.input && strm.avail_in !== 0) ||
	      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
	    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
	  }

	  s.strm = strm; /* just in case */
	  old_flush = s.last_flush;
	  s.last_flush = flush;

	  /* Write the header */
	  if (s.status === INIT_STATE) {

	    if (s.wrap === 2) { // GZIP header
	      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
	      put_byte(s, 31);
	      put_byte(s, 139);
	      put_byte(s, 8);
	      if (!s.gzhead) { // s->gzhead == Z_NULL
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, s.level === 9 ? 2 :
	                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
	                     4 : 0));
	        put_byte(s, OS_CODE);
	        s.status = BUSY_STATE;
	      }
	      else {
	        put_byte(s, (s.gzhead.text ? 1 : 0) +
	                    (s.gzhead.hcrc ? 2 : 0) +
	                    (!s.gzhead.extra ? 0 : 4) +
	                    (!s.gzhead.name ? 0 : 8) +
	                    (!s.gzhead.comment ? 0 : 16)
	                );
	        put_byte(s, s.gzhead.time & 0xff);
	        put_byte(s, (s.gzhead.time >> 8) & 0xff);
	        put_byte(s, (s.gzhead.time >> 16) & 0xff);
	        put_byte(s, (s.gzhead.time >> 24) & 0xff);
	        put_byte(s, s.level === 9 ? 2 :
	                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
	                     4 : 0));
	        put_byte(s, s.gzhead.os & 0xff);
	        if (s.gzhead.extra && s.gzhead.extra.length) {
	          put_byte(s, s.gzhead.extra.length & 0xff);
	          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
	        }
	        if (s.gzhead.hcrc) {
	          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
	        }
	        s.gzindex = 0;
	        s.status = EXTRA_STATE;
	      }
	    }
	    else // DEFLATE header
	    {
	      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
	      var level_flags = -1;

	      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
	        level_flags = 0;
	      } else if (s.level < 6) {
	        level_flags = 1;
	      } else if (s.level === 6) {
	        level_flags = 2;
	      } else {
	        level_flags = 3;
	      }
	      header |= (level_flags << 6);
	      if (s.strstart !== 0) { header |= PRESET_DICT; }
	      header += 31 - (header % 31);

	      s.status = BUSY_STATE;
	      putShortMSB(s, header);

	      /* Save the adler32 of the preset dictionary: */
	      if (s.strstart !== 0) {
	        putShortMSB(s, strm.adler >>> 16);
	        putShortMSB(s, strm.adler & 0xffff);
	      }
	      strm.adler = 1; // adler32(0L, Z_NULL, 0);
	    }
	  }

	//#ifdef GZIP
	  if (s.status === EXTRA_STATE) {
	    if (s.gzhead.extra/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */

	      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            break;
	          }
	        }
	        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
	        s.gzindex++;
	      }
	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (s.gzindex === s.gzhead.extra.length) {
	        s.gzindex = 0;
	        s.status = NAME_STATE;
	      }
	    }
	    else {
	      s.status = NAME_STATE;
	    }
	  }
	  if (s.status === NAME_STATE) {
	    if (s.gzhead.name/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */
	      //int val;

	      do {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            val = 1;
	            break;
	          }
	        }
	        // JS specific: little magic to add zero terminator to end of string
	        if (s.gzindex < s.gzhead.name.length) {
	          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
	        } else {
	          val = 0;
	        }
	        put_byte(s, val);
	      } while (val !== 0);

	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (val === 0) {
	        s.gzindex = 0;
	        s.status = COMMENT_STATE;
	      }
	    }
	    else {
	      s.status = COMMENT_STATE;
	    }
	  }
	  if (s.status === COMMENT_STATE) {
	    if (s.gzhead.comment/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */
	      //int val;

	      do {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            val = 1;
	            break;
	          }
	        }
	        // JS specific: little magic to add zero terminator to end of string
	        if (s.gzindex < s.gzhead.comment.length) {
	          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
	        } else {
	          val = 0;
	        }
	        put_byte(s, val);
	      } while (val !== 0);

	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (val === 0) {
	        s.status = HCRC_STATE;
	      }
	    }
	    else {
	      s.status = HCRC_STATE;
	    }
	  }
	  if (s.status === HCRC_STATE) {
	    if (s.gzhead.hcrc) {
	      if (s.pending + 2 > s.pending_buf_size) {
	        flush_pending(strm);
	      }
	      if (s.pending + 2 <= s.pending_buf_size) {
	        put_byte(s, strm.adler & 0xff);
	        put_byte(s, (strm.adler >> 8) & 0xff);
	        strm.adler = 0; //crc32(0L, Z_NULL, 0);
	        s.status = BUSY_STATE;
	      }
	    }
	    else {
	      s.status = BUSY_STATE;
	    }
	  }
	//#endif

	  /* Flush as much pending output as possible */
	  if (s.pending !== 0) {
	    flush_pending(strm);
	    if (strm.avail_out === 0) {
	      /* Since avail_out is 0, deflate will be called again with
	       * more output space, but possibly with both pending and
	       * avail_in equal to zero. There won't be anything to do,
	       * but this is not an error situation so make sure we
	       * return OK instead of BUF_ERROR at next call of deflate:
	       */
	      s.last_flush = -1;
	      return Z_OK;
	    }

	    /* Make sure there is something to do and avoid duplicate consecutive
	     * flushes. For repeated and useless calls with Z_FINISH, we keep
	     * returning Z_STREAM_END instead of Z_BUF_ERROR.
	     */
	  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
	    flush !== Z_FINISH) {
	    return err(strm, Z_BUF_ERROR);
	  }

	  /* User must not provide more input after the first FINISH: */
	  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
	    return err(strm, Z_BUF_ERROR);
	  }

	  /* Start a new block or continue the current one.
	   */
	  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
	    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
	    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
	      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
	        configuration_table[s.level].func(s, flush));

	    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
	      s.status = FINISH_STATE;
	    }
	    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
	      if (strm.avail_out === 0) {
	        s.last_flush = -1;
	        /* avoid BUF_ERROR next call, see above */
	      }
	      return Z_OK;
	      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
	       * of deflate should use the same flush parameter to make sure
	       * that the flush is complete. So we don't have to output an
	       * empty block here, this will be done at next call. This also
	       * ensures that for a very small output buffer, we emit at most
	       * one empty block.
	       */
	    }
	    if (bstate === BS_BLOCK_DONE) {
	      if (flush === Z_PARTIAL_FLUSH) {
	        trees._tr_align(s);
	      }
	      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

	        trees._tr_stored_block(s, 0, 0, false);
	        /* For a full flush, this empty block will be recognized
	         * as a special marker by inflate_sync().
	         */
	        if (flush === Z_FULL_FLUSH) {
	          /*** CLEAR_HASH(s); ***/             /* forget history */
	          zero(s.head); // Fill with NIL (= 0);

	          if (s.lookahead === 0) {
	            s.strstart = 0;
	            s.block_start = 0;
	            s.insert = 0;
	          }
	        }
	      }
	      flush_pending(strm);
	      if (strm.avail_out === 0) {
	        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
	        return Z_OK;
	      }
	    }
	  }
	  //Assert(strm->avail_out > 0, "bug2");
	  //if (strm.avail_out <= 0) { throw new Error("bug2");}

	  if (flush !== Z_FINISH) { return Z_OK; }
	  if (s.wrap <= 0) { return Z_STREAM_END; }

	  /* Write the trailer */
	  if (s.wrap === 2) {
	    put_byte(s, strm.adler & 0xff);
	    put_byte(s, (strm.adler >> 8) & 0xff);
	    put_byte(s, (strm.adler >> 16) & 0xff);
	    put_byte(s, (strm.adler >> 24) & 0xff);
	    put_byte(s, strm.total_in & 0xff);
	    put_byte(s, (strm.total_in >> 8) & 0xff);
	    put_byte(s, (strm.total_in >> 16) & 0xff);
	    put_byte(s, (strm.total_in >> 24) & 0xff);
	  }
	  else
	  {
	    putShortMSB(s, strm.adler >>> 16);
	    putShortMSB(s, strm.adler & 0xffff);
	  }

	  flush_pending(strm);
	  /* If avail_out is zero, the application will call deflate again
	   * to flush the rest.
	   */
	  if (s.wrap > 0) { s.wrap = -s.wrap; }
	  /* write the trailer only once! */
	  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
	}

	function deflateEnd(strm) {
	  var status;

	  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
	    return Z_STREAM_ERROR;
	  }

	  status = strm.state.status;
	  if (status !== INIT_STATE &&
	    status !== EXTRA_STATE &&
	    status !== NAME_STATE &&
	    status !== COMMENT_STATE &&
	    status !== HCRC_STATE &&
	    status !== BUSY_STATE &&
	    status !== FINISH_STATE
	  ) {
	    return err(strm, Z_STREAM_ERROR);
	  }

	  strm.state = null;

	  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
	}


	/* =========================================================================
	 * Initializes the compression dictionary from the given byte
	 * sequence without producing any compressed output.
	 */
	function deflateSetDictionary(strm, dictionary) {
	  var dictLength = dictionary.length;

	  var s;
	  var str, n;
	  var wrap;
	  var avail;
	  var next;
	  var input;
	  var tmpDict;

	  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
	    return Z_STREAM_ERROR;
	  }

	  s = strm.state;
	  wrap = s.wrap;

	  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
	    return Z_STREAM_ERROR;
	  }

	  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
	  if (wrap === 1) {
	    /* adler32(strm->adler, dictionary, dictLength); */
	    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
	  }

	  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

	  /* if dictionary would fill window, just replace the history */
	  if (dictLength >= s.w_size) {
	    if (wrap === 0) {            /* already empty otherwise */
	      /*** CLEAR_HASH(s); ***/
	      zero(s.head); // Fill with NIL (= 0);
	      s.strstart = 0;
	      s.block_start = 0;
	      s.insert = 0;
	    }
	    /* use the tail */
	    // dictionary = dictionary.slice(dictLength - s.w_size);
	    tmpDict = new utils.Buf8(s.w_size);
	    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
	    dictionary = tmpDict;
	    dictLength = s.w_size;
	  }
	  /* insert dictionary into window and hash */
	  avail = strm.avail_in;
	  next = strm.next_in;
	  input = strm.input;
	  strm.avail_in = dictLength;
	  strm.next_in = 0;
	  strm.input = dictionary;
	  fill_window(s);
	  while (s.lookahead >= MIN_MATCH) {
	    str = s.strstart;
	    n = s.lookahead - (MIN_MATCH - 1);
	    do {
	      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

	      s.prev[str & s.w_mask] = s.head[s.ins_h];

	      s.head[s.ins_h] = str;
	      str++;
	    } while (--n);
	    s.strstart = str;
	    s.lookahead = MIN_MATCH - 1;
	    fill_window(s);
	  }
	  s.strstart += s.lookahead;
	  s.block_start = s.strstart;
	  s.insert = s.lookahead;
	  s.lookahead = 0;
	  s.match_length = s.prev_length = MIN_MATCH - 1;
	  s.match_available = 0;
	  strm.next_in = next;
	  strm.input = input;
	  strm.avail_in = avail;
	  s.wrap = wrap;
	  return Z_OK;
	}


	exports.deflateInit = deflateInit;
	exports.deflateInit2 = deflateInit2;
	exports.deflateReset = deflateReset;
	exports.deflateResetKeep = deflateResetKeep;
	exports.deflateSetHeader = deflateSetHeader;
	exports.deflate = deflate;
	exports.deflateEnd = deflateEnd;
	exports.deflateSetDictionary = deflateSetDictionary;
	exports.deflateInfo = 'pako deflate (from Nodeca project)';

	/* Not implemented
	exports.deflateBound = deflateBound;
	exports.deflateCopy = deflateCopy;
	exports.deflateParams = deflateParams;
	exports.deflatePending = deflatePending;
	exports.deflatePrime = deflatePrime;
	exports.deflateTune = deflateTune;
	*/

	},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	function GZheader() {
	  /* true if compressed data believed to be text */
	  this.text       = 0;
	  /* modification time */
	  this.time       = 0;
	  /* extra flags (not used when writing a gzip file) */
	  this.xflags     = 0;
	  /* operating system */
	  this.os         = 0;
	  /* pointer to extra field or Z_NULL if none */
	  this.extra      = null;
	  /* extra field length (valid if extra != Z_NULL) */
	  this.extra_len  = 0; // Actually, we don't need it in JS,
	                       // but leave for few code modifications

	  //
	  // Setup limits is not necessary because in js we should not preallocate memory
	  // for inflate use constant limit in 65536 bytes
	  //

	  /* space at extra (only when reading header) */
	  // this.extra_max  = 0;
	  /* pointer to zero-terminated file name or Z_NULL */
	  this.name       = '';
	  /* space at name (only when reading header) */
	  // this.name_max   = 0;
	  /* pointer to zero-terminated comment or Z_NULL */
	  this.comment    = '';
	  /* space at comment (only when reading header) */
	  // this.comm_max   = 0;
	  /* true if there was or will be a header crc */
	  this.hcrc       = 0;
	  /* true when done reading gzip header (not used when writing a gzip file) */
	  this.done       = false;
	}

	module.exports = GZheader;

	},{}],48:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	// See state defs from inflate.js
	var BAD = 30;       /* got a data error -- remain here until reset */
	var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

	/*
	   Decode literal, length, and distance codes and write out the resulting
	   literal and match bytes until either not enough input or output is
	   available, an end-of-block is encountered, or a data error is encountered.
	   When large enough input and output buffers are supplied to inflate(), for
	   example, a 16K input buffer and a 64K output buffer, more than 95% of the
	   inflate execution time is spent in this routine.

	   Entry assumptions:

	        state.mode === LEN
	        strm.avail_in >= 6
	        strm.avail_out >= 258
	        start >= strm.avail_out
	        state.bits < 8

	   On return, state.mode is one of:

	        LEN -- ran out of enough output space or enough available input
	        TYPE -- reached end of block code, inflate() to interpret next block
	        BAD -- error in block data

	   Notes:

	    - The maximum input bits used by a length/distance pair is 15 bits for the
	      length code, 5 bits for the length extra, 15 bits for the distance code,
	      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
	      Therefore if strm.avail_in >= 6, then there is enough input to avoid
	      checking for available input while decoding.

	    - The maximum bytes that a single length/distance pair can output is 258
	      bytes, which is the maximum length that can be coded.  inflate_fast()
	      requires strm.avail_out >= 258 for each loop to avoid checking for
	      output space.
	 */
	module.exports = function inflate_fast(strm, start) {
	  var state;
	  var _in;                    /* local strm.input */
	  var last;                   /* have enough input while in < last */
	  var _out;                   /* local strm.output */
	  var beg;                    /* inflate()'s initial strm.output */
	  var end;                    /* while out < end, enough space available */
	//#ifdef INFLATE_STRICT
	  var dmax;                   /* maximum distance from zlib header */
	//#endif
	  var wsize;                  /* window size or zero if not using window */
	  var whave;                  /* valid bytes in the window */
	  var wnext;                  /* window write index */
	  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
	  var s_window;               /* allocated sliding window, if wsize != 0 */
	  var hold;                   /* local strm.hold */
	  var bits;                   /* local strm.bits */
	  var lcode;                  /* local strm.lencode */
	  var dcode;                  /* local strm.distcode */
	  var lmask;                  /* mask for first level of length codes */
	  var dmask;                  /* mask for first level of distance codes */
	  var here;                   /* retrieved table entry */
	  var op;                     /* code bits, operation, extra bits, or */
	                              /*  window position, window bytes to copy */
	  var len;                    /* match length, unused bytes */
	  var dist;                   /* match distance */
	  var from;                   /* where to copy match from */
	  var from_source;


	  var input, output; // JS specific, because we have no pointers

	  /* copy state to local variables */
	  state = strm.state;
	  //here = state.here;
	  _in = strm.next_in;
	  input = strm.input;
	  last = _in + (strm.avail_in - 5);
	  _out = strm.next_out;
	  output = strm.output;
	  beg = _out - (start - strm.avail_out);
	  end = _out + (strm.avail_out - 257);
	//#ifdef INFLATE_STRICT
	  dmax = state.dmax;
	//#endif
	  wsize = state.wsize;
	  whave = state.whave;
	  wnext = state.wnext;
	  s_window = state.window;
	  hold = state.hold;
	  bits = state.bits;
	  lcode = state.lencode;
	  dcode = state.distcode;
	  lmask = (1 << state.lenbits) - 1;
	  dmask = (1 << state.distbits) - 1;


	  /* decode literals and length/distances until end-of-block or not enough
	     input data or output space */

	  top:
	  do {
	    if (bits < 15) {
	      hold += input[_in++] << bits;
	      bits += 8;
	      hold += input[_in++] << bits;
	      bits += 8;
	    }

	    here = lcode[hold & lmask];

	    dolen:
	    for (;;) { // Goto emulation
	      op = here >>> 24/*here.bits*/;
	      hold >>>= op;
	      bits -= op;
	      op = (here >>> 16) & 0xff/*here.op*/;
	      if (op === 0) {                          /* literal */
	        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	        //        "inflate:         literal '%c'\n" :
	        //        "inflate:         literal 0x%02x\n", here.val));
	        output[_out++] = here & 0xffff/*here.val*/;
	      }
	      else if (op & 16) {                     /* length base */
	        len = here & 0xffff/*here.val*/;
	        op &= 15;                           /* number of extra bits */
	        if (op) {
	          if (bits < op) {
	            hold += input[_in++] << bits;
	            bits += 8;
	          }
	          len += hold & ((1 << op) - 1);
	          hold >>>= op;
	          bits -= op;
	        }
	        //Tracevv((stderr, "inflate:         length %u\n", len));
	        if (bits < 15) {
	          hold += input[_in++] << bits;
	          bits += 8;
	          hold += input[_in++] << bits;
	          bits += 8;
	        }
	        here = dcode[hold & dmask];

	        dodist:
	        for (;;) { // goto emulation
	          op = here >>> 24/*here.bits*/;
	          hold >>>= op;
	          bits -= op;
	          op = (here >>> 16) & 0xff/*here.op*/;

	          if (op & 16) {                      /* distance base */
	            dist = here & 0xffff/*here.val*/;
	            op &= 15;                       /* number of extra bits */
	            if (bits < op) {
	              hold += input[_in++] << bits;
	              bits += 8;
	              if (bits < op) {
	                hold += input[_in++] << bits;
	                bits += 8;
	              }
	            }
	            dist += hold & ((1 << op) - 1);
	//#ifdef INFLATE_STRICT
	            if (dist > dmax) {
	              strm.msg = 'invalid distance too far back';
	              state.mode = BAD;
	              break top;
	            }
	//#endif
	            hold >>>= op;
	            bits -= op;
	            //Tracevv((stderr, "inflate:         distance %u\n", dist));
	            op = _out - beg;                /* max distance in output */
	            if (dist > op) {                /* see if copy from window */
	              op = dist - op;               /* distance back in window */
	              if (op > whave) {
	                if (state.sane) {
	                  strm.msg = 'invalid distance too far back';
	                  state.mode = BAD;
	                  break top;
	                }

	// (!) This block is disabled in zlib defailts,
	// don't enable it for binary compatibility
	//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	//                if (len <= op - whave) {
	//                  do {
	//                    output[_out++] = 0;
	//                  } while (--len);
	//                  continue top;
	//                }
	//                len -= op - whave;
	//                do {
	//                  output[_out++] = 0;
	//                } while (--op > whave);
	//                if (op === 0) {
	//                  from = _out - dist;
	//                  do {
	//                    output[_out++] = output[from++];
	//                  } while (--len);
	//                  continue top;
	//                }
	//#endif
	              }
	              from = 0; // window index
	              from_source = s_window;
	              if (wnext === 0) {           /* very common case */
	                from += wsize - op;
	                if (op < len) {         /* some from window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = _out - dist;  /* rest from output */
	                  from_source = output;
	                }
	              }
	              else if (wnext < op) {      /* wrap around window */
	                from += wsize + wnext - op;
	                op -= wnext;
	                if (op < len) {         /* some from end of window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = 0;
	                  if (wnext < len) {  /* some from start of window */
	                    op = wnext;
	                    len -= op;
	                    do {
	                      output[_out++] = s_window[from++];
	                    } while (--op);
	                    from = _out - dist;      /* rest from output */
	                    from_source = output;
	                  }
	                }
	              }
	              else {                      /* contiguous in window */
	                from += wnext - op;
	                if (op < len) {         /* some from window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = _out - dist;  /* rest from output */
	                  from_source = output;
	                }
	              }
	              while (len > 2) {
	                output[_out++] = from_source[from++];
	                output[_out++] = from_source[from++];
	                output[_out++] = from_source[from++];
	                len -= 3;
	              }
	              if (len) {
	                output[_out++] = from_source[from++];
	                if (len > 1) {
	                  output[_out++] = from_source[from++];
	                }
	              }
	            }
	            else {
	              from = _out - dist;          /* copy direct from output */
	              do {                        /* minimum length is three */
	                output[_out++] = output[from++];
	                output[_out++] = output[from++];
	                output[_out++] = output[from++];
	                len -= 3;
	              } while (len > 2);
	              if (len) {
	                output[_out++] = output[from++];
	                if (len > 1) {
	                  output[_out++] = output[from++];
	                }
	              }
	            }
	          }
	          else if ((op & 64) === 0) {          /* 2nd level distance code */
	            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
	            continue dodist;
	          }
	          else {
	            strm.msg = 'invalid distance code';
	            state.mode = BAD;
	            break top;
	          }

	          break; // need to emulate goto via "continue"
	        }
	      }
	      else if ((op & 64) === 0) {              /* 2nd level length code */
	        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
	        continue dolen;
	      }
	      else if (op & 32) {                     /* end-of-block */
	        //Tracevv((stderr, "inflate:         end of block\n"));
	        state.mode = TYPE;
	        break top;
	      }
	      else {
	        strm.msg = 'invalid literal/length code';
	        state.mode = BAD;
	        break top;
	      }

	      break; // need to emulate goto via "continue"
	    }
	  } while (_in < last && _out < end);

	  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
	  len = bits >> 3;
	  _in -= len;
	  bits -= len << 3;
	  hold &= (1 << bits) - 1;

	  /* update state and return */
	  strm.next_in = _in;
	  strm.next_out = _out;
	  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
	  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
	  state.hold = hold;
	  state.bits = bits;
	  return;
	};

	},{}],49:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	var utils         = require('../utils/common');
	var adler32       = require('./adler32');
	var crc32         = require('./crc32');
	var inflate_fast  = require('./inffast');
	var inflate_table = require('./inftrees');

	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	/* Allowed flush values; see deflate() and inflate() below for details */
	//var Z_NO_FLUSH      = 0;
	//var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	//var Z_FULL_FLUSH    = 3;
	var Z_FINISH        = 4;
	var Z_BLOCK         = 5;
	var Z_TREES         = 6;


	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	var Z_NEED_DICT     = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR  = -2;
	var Z_DATA_ERROR    = -3;
	var Z_MEM_ERROR     = -4;
	var Z_BUF_ERROR     = -5;
	//var Z_VERSION_ERROR = -6;

	/* The deflate compression method */
	var Z_DEFLATED  = 8;


	/* STATES ====================================================================*/
	/* ===========================================================================*/


	var    HEAD = 1;       /* i: waiting for magic header */
	var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
	var    TIME = 3;       /* i: waiting for modification time (gzip) */
	var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
	var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
	var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
	var    NAME = 7;       /* i: waiting for end of file name (gzip) */
	var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
	var    HCRC = 9;       /* i: waiting for header crc (gzip) */
	var    DICTID = 10;    /* i: waiting for dictionary check value */
	var    DICT = 11;      /* waiting for inflateSetDictionary() call */
	var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
	var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
	var        STORED = 14;    /* i: waiting for stored size (length and complement) */
	var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
	var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
	var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
	var        LENLENS = 18;   /* i: waiting for code length code lengths */
	var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
	var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
	var            LEN = 21;       /* i: waiting for length/lit/eob code */
	var            LENEXT = 22;    /* i: waiting for length extra bits */
	var            DIST = 23;      /* i: waiting for distance code */
	var            DISTEXT = 24;   /* i: waiting for distance extra bits */
	var            MATCH = 25;     /* o: waiting for output space to copy string */
	var            LIT = 26;       /* o: waiting for output space to write literal */
	var    CHECK = 27;     /* i: waiting for 32-bit check value */
	var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
	var    DONE = 29;      /* finished check, done -- remain here until reset */
	var    BAD = 30;       /* got a data error -- remain here until reset */
	var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
	var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

	/* ===========================================================================*/



	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_WBITS = MAX_WBITS;


	function zswap32(q) {
	  return  (((q >>> 24) & 0xff) +
	          ((q >>> 8) & 0xff00) +
	          ((q & 0xff00) << 8) +
	          ((q & 0xff) << 24));
	}


	function InflateState() {
	  this.mode = 0;             /* current inflate mode */
	  this.last = false;          /* true if processing last block */
	  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
	  this.havedict = false;      /* true if dictionary provided */
	  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
	  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
	  this.check = 0;             /* protected copy of check value */
	  this.total = 0;             /* protected copy of output count */
	  // TODO: may be {}
	  this.head = null;           /* where to save gzip header information */

	  /* sliding window */
	  this.wbits = 0;             /* log base 2 of requested window size */
	  this.wsize = 0;             /* window size or zero if not using window */
	  this.whave = 0;             /* valid bytes in the window */
	  this.wnext = 0;             /* window write index */
	  this.window = null;         /* allocated sliding window, if needed */

	  /* bit accumulator */
	  this.hold = 0;              /* input bit accumulator */
	  this.bits = 0;              /* number of bits in "in" */

	  /* for string and stored block copying */
	  this.length = 0;            /* literal or length of data to copy */
	  this.offset = 0;            /* distance back to copy string from */

	  /* for table and code decoding */
	  this.extra = 0;             /* extra bits needed */

	  /* fixed and dynamic code tables */
	  this.lencode = null;          /* starting table for length/literal codes */
	  this.distcode = null;         /* starting table for distance codes */
	  this.lenbits = 0;           /* index bits for lencode */
	  this.distbits = 0;          /* index bits for distcode */

	  /* dynamic table building */
	  this.ncode = 0;             /* number of code length code lengths */
	  this.nlen = 0;              /* number of length code lengths */
	  this.ndist = 0;             /* number of distance code lengths */
	  this.have = 0;              /* number of code lengths in lens[] */
	  this.next = null;              /* next available space in codes[] */

	  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
	  this.work = new utils.Buf16(288); /* work area for code table building */

	  /*
	   because we don't have pointers in js, we use lencode and distcode directly
	   as buffers so we don't need codes
	  */
	  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
	  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
	  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
	  this.sane = 0;                   /* if false, allow invalid distance too far */
	  this.back = 0;                   /* bits back of last unprocessed length/lit */
	  this.was = 0;                    /* initial length of match */
	}

	function inflateResetKeep(strm) {
	  var state;

	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  strm.total_in = strm.total_out = state.total = 0;
	  strm.msg = ''; /*Z_NULL*/
	  if (state.wrap) {       /* to support ill-conceived Java test suite */
	    strm.adler = state.wrap & 1;
	  }
	  state.mode = HEAD;
	  state.last = 0;
	  state.havedict = 0;
	  state.dmax = 32768;
	  state.head = null/*Z_NULL*/;
	  state.hold = 0;
	  state.bits = 0;
	  //state.lencode = state.distcode = state.next = state.codes;
	  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
	  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

	  state.sane = 1;
	  state.back = -1;
	  //Tracev((stderr, "inflate: reset\n"));
	  return Z_OK;
	}

	function inflateReset(strm) {
	  var state;

	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  state.wsize = 0;
	  state.whave = 0;
	  state.wnext = 0;
	  return inflateResetKeep(strm);

	}

	function inflateReset2(strm, windowBits) {
	  var wrap;
	  var state;

	  /* get the state */
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;

	  /* extract wrap request from windowBits parameter */
	  if (windowBits < 0) {
	    wrap = 0;
	    windowBits = -windowBits;
	  }
	  else {
	    wrap = (windowBits >> 4) + 1;
	    if (windowBits < 48) {
	      windowBits &= 15;
	    }
	  }

	  /* set number of window bits, free window if different */
	  if (windowBits && (windowBits < 8 || windowBits > 15)) {
	    return Z_STREAM_ERROR;
	  }
	  if (state.window !== null && state.wbits !== windowBits) {
	    state.window = null;
	  }

	  /* update state and reset the rest of it */
	  state.wrap = wrap;
	  state.wbits = windowBits;
	  return inflateReset(strm);
	}

	function inflateInit2(strm, windowBits) {
	  var ret;
	  var state;

	  if (!strm) { return Z_STREAM_ERROR; }
	  //strm.msg = Z_NULL;                 /* in case we return an error */

	  state = new InflateState();

	  //if (state === Z_NULL) return Z_MEM_ERROR;
	  //Tracev((stderr, "inflate: allocated\n"));
	  strm.state = state;
	  state.window = null/*Z_NULL*/;
	  ret = inflateReset2(strm, windowBits);
	  if (ret !== Z_OK) {
	    strm.state = null/*Z_NULL*/;
	  }
	  return ret;
	}

	function inflateInit(strm) {
	  return inflateInit2(strm, DEF_WBITS);
	}


	/*
	 Return state with length and distance decoding tables and index sizes set to
	 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
	 If BUILDFIXED is defined, then instead this routine builds the tables the
	 first time it's called, and returns those tables the first time and
	 thereafter.  This reduces the size of the code by about 2K bytes, in
	 exchange for a little execution time.  However, BUILDFIXED should not be
	 used for threaded applications, since the rewriting of the tables and virgin
	 may not be thread-safe.
	 */
	var virgin = true;

	var lenfix, distfix; // We have no pointers in JS, so keep tables separate

	function fixedtables(state) {
	  /* build fixed huffman tables if first call (may not be thread safe) */
	  if (virgin) {
	    var sym;

	    lenfix = new utils.Buf32(512);
	    distfix = new utils.Buf32(32);

	    /* literal/length table */
	    sym = 0;
	    while (sym < 144) { state.lens[sym++] = 8; }
	    while (sym < 256) { state.lens[sym++] = 9; }
	    while (sym < 280) { state.lens[sym++] = 7; }
	    while (sym < 288) { state.lens[sym++] = 8; }

	    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

	    /* distance table */
	    sym = 0;
	    while (sym < 32) { state.lens[sym++] = 5; }

	    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

	    /* do this just once */
	    virgin = false;
	  }

	  state.lencode = lenfix;
	  state.lenbits = 9;
	  state.distcode = distfix;
	  state.distbits = 5;
	}


	/*
	 Update the window with the last wsize (normally 32K) bytes written before
	 returning.  If window does not exist yet, create it.  This is only called
	 when a window is already in use, or when output has been written during this
	 inflate call, but the end of the deflate stream has not been reached yet.
	 It is also called to create a window for dictionary data when a dictionary
	 is loaded.

	 Providing output buffers larger than 32K to inflate() should provide a speed
	 advantage, since only the last 32K of output is copied to the sliding window
	 upon return from inflate(), and since all distances after the first 32K of
	 output will fall in the output data, making match copies simpler and faster.
	 The advantage may be dependent on the size of the processor's data caches.
	 */
	function updatewindow(strm, src, end, copy) {
	  var dist;
	  var state = strm.state;

	  /* if it hasn't been done already, allocate space for the window */
	  if (state.window === null) {
	    state.wsize = 1 << state.wbits;
	    state.wnext = 0;
	    state.whave = 0;

	    state.window = new utils.Buf8(state.wsize);
	  }

	  /* copy state->wsize or less output bytes into the circular window */
	  if (copy >= state.wsize) {
	    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
	    state.wnext = 0;
	    state.whave = state.wsize;
	  }
	  else {
	    dist = state.wsize - state.wnext;
	    if (dist > copy) {
	      dist = copy;
	    }
	    //zmemcpy(state->window + state->wnext, end - copy, dist);
	    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
	    copy -= dist;
	    if (copy) {
	      //zmemcpy(state->window, end - copy, copy);
	      utils.arraySet(state.window, src, end - copy, copy, 0);
	      state.wnext = copy;
	      state.whave = state.wsize;
	    }
	    else {
	      state.wnext += dist;
	      if (state.wnext === state.wsize) { state.wnext = 0; }
	      if (state.whave < state.wsize) { state.whave += dist; }
	    }
	  }
	  return 0;
	}

	function inflate(strm, flush) {
	  var state;
	  var input, output;          // input/output buffers
	  var next;                   /* next input INDEX */
	  var put;                    /* next output INDEX */
	  var have, left;             /* available input and output */
	  var hold;                   /* bit buffer */
	  var bits;                   /* bits in bit buffer */
	  var _in, _out;              /* save starting available input and output */
	  var copy;                   /* number of stored or match bytes to copy */
	  var from;                   /* where to copy match bytes from */
	  var from_source;
	  var here = 0;               /* current decoding table entry */
	  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
	  //var last;                   /* parent table entry */
	  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
	  var len;                    /* length to copy for repeats, bits to drop */
	  var ret;                    /* return code */
	  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
	  var opts;

	  var n; // temporary var for NEED_BITS

	  var order = /* permutation of code lengths */
	    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


	  if (!strm || !strm.state || !strm.output ||
	      (!strm.input && strm.avail_in !== 0)) {
	    return Z_STREAM_ERROR;
	  }

	  state = strm.state;
	  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


	  //--- LOAD() ---
	  put = strm.next_out;
	  output = strm.output;
	  left = strm.avail_out;
	  next = strm.next_in;
	  input = strm.input;
	  have = strm.avail_in;
	  hold = state.hold;
	  bits = state.bits;
	  //---

	  _in = have;
	  _out = left;
	  ret = Z_OK;

	  inf_leave: // goto emulation
	  for (;;) {
	    switch (state.mode) {
	    case HEAD:
	      if (state.wrap === 0) {
	        state.mode = TYPEDO;
	        break;
	      }
	      //=== NEEDBITS(16);
	      while (bits < 16) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
	        state.check = 0/*crc32(0L, Z_NULL, 0)*/;
	        //=== CRC2(state.check, hold);
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        state.check = crc32(state.check, hbuf, 2, 0);
	        //===//

	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = FLAGS;
	        break;
	      }
	      state.flags = 0;           /* expect zlib header */
	      if (state.head) {
	        state.head.done = false;
	      }
	      if (!(state.wrap & 1) ||   /* check if zlib header allowed */
	        (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
	        strm.msg = 'incorrect header check';
	        state.mode = BAD;
	        break;
	      }
	      if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
	        strm.msg = 'unknown compression method';
	        state.mode = BAD;
	        break;
	      }
	      //--- DROPBITS(4) ---//
	      hold >>>= 4;
	      bits -= 4;
	      //---//
	      len = (hold & 0x0f)/*BITS(4)*/ + 8;
	      if (state.wbits === 0) {
	        state.wbits = len;
	      }
	      else if (len > state.wbits) {
	        strm.msg = 'invalid window size';
	        state.mode = BAD;
	        break;
	      }
	      state.dmax = 1 << len;
	      //Tracev((stderr, "inflate:   zlib header ok\n"));
	      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
	      state.mode = hold & 0x200 ? DICTID : TYPE;
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      break;
	    case FLAGS:
	      //=== NEEDBITS(16); */
	      while (bits < 16) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      state.flags = hold;
	      if ((state.flags & 0xff) !== Z_DEFLATED) {
	        strm.msg = 'unknown compression method';
	        state.mode = BAD;
	        break;
	      }
	      if (state.flags & 0xe000) {
	        strm.msg = 'unknown header flags set';
	        state.mode = BAD;
	        break;
	      }
	      if (state.head) {
	        state.head.text = ((hold >> 8) & 1);
	      }
	      if (state.flags & 0x0200) {
	        //=== CRC2(state.check, hold);
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        state.check = crc32(state.check, hbuf, 2, 0);
	        //===//
	      }
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = TIME;
	      /* falls through */
	    case TIME:
	      //=== NEEDBITS(32); */
	      while (bits < 32) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if (state.head) {
	        state.head.time = hold;
	      }
	      if (state.flags & 0x0200) {
	        //=== CRC4(state.check, hold)
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        hbuf[2] = (hold >>> 16) & 0xff;
	        hbuf[3] = (hold >>> 24) & 0xff;
	        state.check = crc32(state.check, hbuf, 4, 0);
	        //===
	      }
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = OS;
	      /* falls through */
	    case OS:
	      //=== NEEDBITS(16); */
	      while (bits < 16) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if (state.head) {
	        state.head.xflags = (hold & 0xff);
	        state.head.os = (hold >> 8);
	      }
	      if (state.flags & 0x0200) {
	        //=== CRC2(state.check, hold);
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        state.check = crc32(state.check, hbuf, 2, 0);
	        //===//
	      }
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = EXLEN;
	      /* falls through */
	    case EXLEN:
	      if (state.flags & 0x0400) {
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.length = hold;
	        if (state.head) {
	          state.head.extra_len = hold;
	        }
	        if (state.flags & 0x0200) {
	          //=== CRC2(state.check, hold);
	          hbuf[0] = hold & 0xff;
	          hbuf[1] = (hold >>> 8) & 0xff;
	          state.check = crc32(state.check, hbuf, 2, 0);
	          //===//
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	      }
	      else if (state.head) {
	        state.head.extra = null/*Z_NULL*/;
	      }
	      state.mode = EXTRA;
	      /* falls through */
	    case EXTRA:
	      if (state.flags & 0x0400) {
	        copy = state.length;
	        if (copy > have) { copy = have; }
	        if (copy) {
	          if (state.head) {
	            len = state.head.extra_len - state.length;
	            if (!state.head.extra) {
	              // Use untyped array for more conveniend processing later
	              state.head.extra = new Array(state.head.extra_len);
	            }
	            utils.arraySet(
	              state.head.extra,
	              input,
	              next,
	              // extra field is limited to 65536 bytes
	              // - no need for additional size check
	              copy,
	              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
	              len
	            );
	            //zmemcpy(state.head.extra + len, next,
	            //        len + copy > state.head.extra_max ?
	            //        state.head.extra_max - len : copy);
	          }
	          if (state.flags & 0x0200) {
	            state.check = crc32(state.check, input, copy, next);
	          }
	          have -= copy;
	          next += copy;
	          state.length -= copy;
	        }
	        if (state.length) { break inf_leave; }
	      }
	      state.length = 0;
	      state.mode = NAME;
	      /* falls through */
	    case NAME:
	      if (state.flags & 0x0800) {
	        if (have === 0) { break inf_leave; }
	        copy = 0;
	        do {
	          // TODO: 2 or 1 bytes?
	          len = input[next + copy++];
	          /* use constant limit because in js we should not preallocate memory */
	          if (state.head && len &&
	              (state.length < 65536 /*state.head.name_max*/)) {
	            state.head.name += String.fromCharCode(len);
	          }
	        } while (len && copy < have);

	        if (state.flags & 0x0200) {
	          state.check = crc32(state.check, input, copy, next);
	        }
	        have -= copy;
	        next += copy;
	        if (len) { break inf_leave; }
	      }
	      else if (state.head) {
	        state.head.name = null;
	      }
	      state.length = 0;
	      state.mode = COMMENT;
	      /* falls through */
	    case COMMENT:
	      if (state.flags & 0x1000) {
	        if (have === 0) { break inf_leave; }
	        copy = 0;
	        do {
	          len = input[next + copy++];
	          /* use constant limit because in js we should not preallocate memory */
	          if (state.head && len &&
	              (state.length < 65536 /*state.head.comm_max*/)) {
	            state.head.comment += String.fromCharCode(len);
	          }
	        } while (len && copy < have);
	        if (state.flags & 0x0200) {
	          state.check = crc32(state.check, input, copy, next);
	        }
	        have -= copy;
	        next += copy;
	        if (len) { break inf_leave; }
	      }
	      else if (state.head) {
	        state.head.comment = null;
	      }
	      state.mode = HCRC;
	      /* falls through */
	    case HCRC:
	      if (state.flags & 0x0200) {
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (hold !== (state.check & 0xffff)) {
	          strm.msg = 'header crc mismatch';
	          state.mode = BAD;
	          break;
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	      }
	      if (state.head) {
	        state.head.hcrc = ((state.flags >> 9) & 1);
	        state.head.done = true;
	      }
	      strm.adler = state.check = 0;
	      state.mode = TYPE;
	      break;
	    case DICTID:
	      //=== NEEDBITS(32); */
	      while (bits < 32) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      strm.adler = state.check = zswap32(hold);
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = DICT;
	      /* falls through */
	    case DICT:
	      if (state.havedict === 0) {
	        //--- RESTORE() ---
	        strm.next_out = put;
	        strm.avail_out = left;
	        strm.next_in = next;
	        strm.avail_in = have;
	        state.hold = hold;
	        state.bits = bits;
	        //---
	        return Z_NEED_DICT;
	      }
	      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
	      state.mode = TYPE;
	      /* falls through */
	    case TYPE:
	      if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
	      /* falls through */
	    case TYPEDO:
	      if (state.last) {
	        //--- BYTEBITS() ---//
	        hold >>>= bits & 7;
	        bits -= bits & 7;
	        //---//
	        state.mode = CHECK;
	        break;
	      }
	      //=== NEEDBITS(3); */
	      while (bits < 3) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      state.last = (hold & 0x01)/*BITS(1)*/;
	      //--- DROPBITS(1) ---//
	      hold >>>= 1;
	      bits -= 1;
	      //---//

	      switch ((hold & 0x03)/*BITS(2)*/) {
	      case 0:                             /* stored block */
	        //Tracev((stderr, "inflate:     stored block%s\n",
	        //        state.last ? " (last)" : ""));
	        state.mode = STORED;
	        break;
	      case 1:                             /* fixed block */
	        fixedtables(state);
	        //Tracev((stderr, "inflate:     fixed codes block%s\n",
	        //        state.last ? " (last)" : ""));
	        state.mode = LEN_;             /* decode codes */
	        if (flush === Z_TREES) {
	          //--- DROPBITS(2) ---//
	          hold >>>= 2;
	          bits -= 2;
	          //---//
	          break inf_leave;
	        }
	        break;
	      case 2:                             /* dynamic block */
	        //Tracev((stderr, "inflate:     dynamic codes block%s\n",
	        //        state.last ? " (last)" : ""));
	        state.mode = TABLE;
	        break;
	      case 3:
	        strm.msg = 'invalid block type';
	        state.mode = BAD;
	      }
	      //--- DROPBITS(2) ---//
	      hold >>>= 2;
	      bits -= 2;
	      //---//
	      break;
	    case STORED:
	      //--- BYTEBITS() ---// /* go to byte boundary */
	      hold >>>= bits & 7;
	      bits -= bits & 7;
	      //---//
	      //=== NEEDBITS(32); */
	      while (bits < 32) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
	        strm.msg = 'invalid stored block lengths';
	        state.mode = BAD;
	        break;
	      }
	      state.length = hold & 0xffff;
	      //Tracev((stderr, "inflate:       stored length %u\n",
	      //        state.length));
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = COPY_;
	      if (flush === Z_TREES) { break inf_leave; }
	      /* falls through */
	    case COPY_:
	      state.mode = COPY;
	      /* falls through */
	    case COPY:
	      copy = state.length;
	      if (copy) {
	        if (copy > have) { copy = have; }
	        if (copy > left) { copy = left; }
	        if (copy === 0) { break inf_leave; }
	        //--- zmemcpy(put, next, copy); ---
	        utils.arraySet(output, input, next, copy, put);
	        //---//
	        have -= copy;
	        next += copy;
	        left -= copy;
	        put += copy;
	        state.length -= copy;
	        break;
	      }
	      //Tracev((stderr, "inflate:       stored end\n"));
	      state.mode = TYPE;
	      break;
	    case TABLE:
	      //=== NEEDBITS(14); */
	      while (bits < 14) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
	      //--- DROPBITS(5) ---//
	      hold >>>= 5;
	      bits -= 5;
	      //---//
	      state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
	      //--- DROPBITS(5) ---//
	      hold >>>= 5;
	      bits -= 5;
	      //---//
	      state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
	      //--- DROPBITS(4) ---//
	      hold >>>= 4;
	      bits -= 4;
	      //---//
	//#ifndef PKZIP_BUG_WORKAROUND
	      if (state.nlen > 286 || state.ndist > 30) {
	        strm.msg = 'too many length or distance symbols';
	        state.mode = BAD;
	        break;
	      }
	//#endif
	      //Tracev((stderr, "inflate:       table sizes ok\n"));
	      state.have = 0;
	      state.mode = LENLENS;
	      /* falls through */
	    case LENLENS:
	      while (state.have < state.ncode) {
	        //=== NEEDBITS(3);
	        while (bits < 3) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
	        //--- DROPBITS(3) ---//
	        hold >>>= 3;
	        bits -= 3;
	        //---//
	      }
	      while (state.have < 19) {
	        state.lens[order[state.have++]] = 0;
	      }
	      // We have separate tables & no pointers. 2 commented lines below not needed.
	      //state.next = state.codes;
	      //state.lencode = state.next;
	      // Switch to use dynamic table
	      state.lencode = state.lendyn;
	      state.lenbits = 7;

	      opts = { bits: state.lenbits };
	      ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
	      state.lenbits = opts.bits;

	      if (ret) {
	        strm.msg = 'invalid code lengths set';
	        state.mode = BAD;
	        break;
	      }
	      //Tracev((stderr, "inflate:       code lengths ok\n"));
	      state.have = 0;
	      state.mode = CODELENS;
	      /* falls through */
	    case CODELENS:
	      while (state.have < state.nlen + state.ndist) {
	        for (;;) {
	          here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        if (here_val < 16) {
	          //--- DROPBITS(here.bits) ---//
	          hold >>>= here_bits;
	          bits -= here_bits;
	          //---//
	          state.lens[state.have++] = here_val;
	        }
	        else {
	          if (here_val === 16) {
	            //=== NEEDBITS(here.bits + 2);
	            n = here_bits + 2;
	            while (bits < n) {
	              if (have === 0) { break inf_leave; }
	              have--;
	              hold += input[next++] << bits;
	              bits += 8;
	            }
	            //===//
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            if (state.have === 0) {
	              strm.msg = 'invalid bit length repeat';
	              state.mode = BAD;
	              break;
	            }
	            len = state.lens[state.have - 1];
	            copy = 3 + (hold & 0x03);//BITS(2);
	            //--- DROPBITS(2) ---//
	            hold >>>= 2;
	            bits -= 2;
	            //---//
	          }
	          else if (here_val === 17) {
	            //=== NEEDBITS(here.bits + 3);
	            n = here_bits + 3;
	            while (bits < n) {
	              if (have === 0) { break inf_leave; }
	              have--;
	              hold += input[next++] << bits;
	              bits += 8;
	            }
	            //===//
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            len = 0;
	            copy = 3 + (hold & 0x07);//BITS(3);
	            //--- DROPBITS(3) ---//
	            hold >>>= 3;
	            bits -= 3;
	            //---//
	          }
	          else {
	            //=== NEEDBITS(here.bits + 7);
	            n = here_bits + 7;
	            while (bits < n) {
	              if (have === 0) { break inf_leave; }
	              have--;
	              hold += input[next++] << bits;
	              bits += 8;
	            }
	            //===//
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            len = 0;
	            copy = 11 + (hold & 0x7f);//BITS(7);
	            //--- DROPBITS(7) ---//
	            hold >>>= 7;
	            bits -= 7;
	            //---//
	          }
	          if (state.have + copy > state.nlen + state.ndist) {
	            strm.msg = 'invalid bit length repeat';
	            state.mode = BAD;
	            break;
	          }
	          while (copy--) {
	            state.lens[state.have++] = len;
	          }
	        }
	      }

	      /* handle error breaks in while */
	      if (state.mode === BAD) { break; }

	      /* check for end-of-block code (better have one) */
	      if (state.lens[256] === 0) {
	        strm.msg = 'invalid code -- missing end-of-block';
	        state.mode = BAD;
	        break;
	      }

	      /* build code tables -- note: do not change the lenbits or distbits
	         values here (9 and 6) without reading the comments in inftrees.h
	         concerning the ENOUGH constants, which depend on those values */
	      state.lenbits = 9;

	      opts = { bits: state.lenbits };
	      ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
	      // We have separate tables & no pointers. 2 commented lines below not needed.
	      // state.next_index = opts.table_index;
	      state.lenbits = opts.bits;
	      // state.lencode = state.next;

	      if (ret) {
	        strm.msg = 'invalid literal/lengths set';
	        state.mode = BAD;
	        break;
	      }

	      state.distbits = 6;
	      //state.distcode.copy(state.codes);
	      // Switch to use dynamic table
	      state.distcode = state.distdyn;
	      opts = { bits: state.distbits };
	      ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
	      // We have separate tables & no pointers. 2 commented lines below not needed.
	      // state.next_index = opts.table_index;
	      state.distbits = opts.bits;
	      // state.distcode = state.next;

	      if (ret) {
	        strm.msg = 'invalid distances set';
	        state.mode = BAD;
	        break;
	      }
	      //Tracev((stderr, 'inflate:       codes ok\n'));
	      state.mode = LEN_;
	      if (flush === Z_TREES) { break inf_leave; }
	      /* falls through */
	    case LEN_:
	      state.mode = LEN;
	      /* falls through */
	    case LEN:
	      if (have >= 6 && left >= 258) {
	        //--- RESTORE() ---
	        strm.next_out = put;
	        strm.avail_out = left;
	        strm.next_in = next;
	        strm.avail_in = have;
	        state.hold = hold;
	        state.bits = bits;
	        //---
	        inflate_fast(strm, _out);
	        //--- LOAD() ---
	        put = strm.next_out;
	        output = strm.output;
	        left = strm.avail_out;
	        next = strm.next_in;
	        input = strm.input;
	        have = strm.avail_in;
	        hold = state.hold;
	        bits = state.bits;
	        //---

	        if (state.mode === TYPE) {
	          state.back = -1;
	        }
	        break;
	      }
	      state.back = 0;
	      for (;;) {
	        here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
	        here_bits = here >>> 24;
	        here_op = (here >>> 16) & 0xff;
	        here_val = here & 0xffff;

	        if (here_bits <= bits) { break; }
	        //--- PULLBYTE() ---//
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	        //---//
	      }
	      if (here_op && (here_op & 0xf0) === 0) {
	        last_bits = here_bits;
	        last_op = here_op;
	        last_val = here_val;
	        for (;;) {
	          here = state.lencode[last_val +
	                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((last_bits + here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        //--- DROPBITS(last.bits) ---//
	        hold >>>= last_bits;
	        bits -= last_bits;
	        //---//
	        state.back += last_bits;
	      }
	      //--- DROPBITS(here.bits) ---//
	      hold >>>= here_bits;
	      bits -= here_bits;
	      //---//
	      state.back += here_bits;
	      state.length = here_val;
	      if (here_op === 0) {
	        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	        //        "inflate:         literal '%c'\n" :
	        //        "inflate:         literal 0x%02x\n", here.val));
	        state.mode = LIT;
	        break;
	      }
	      if (here_op & 32) {
	        //Tracevv((stderr, "inflate:         end of block\n"));
	        state.back = -1;
	        state.mode = TYPE;
	        break;
	      }
	      if (here_op & 64) {
	        strm.msg = 'invalid literal/length code';
	        state.mode = BAD;
	        break;
	      }
	      state.extra = here_op & 15;
	      state.mode = LENEXT;
	      /* falls through */
	    case LENEXT:
	      if (state.extra) {
	        //=== NEEDBITS(state.extra);
	        n = state.extra;
	        while (bits < n) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
	        //--- DROPBITS(state.extra) ---//
	        hold >>>= state.extra;
	        bits -= state.extra;
	        //---//
	        state.back += state.extra;
	      }
	      //Tracevv((stderr, "inflate:         length %u\n", state.length));
	      state.was = state.length;
	      state.mode = DIST;
	      /* falls through */
	    case DIST:
	      for (;;) {
	        here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
	        here_bits = here >>> 24;
	        here_op = (here >>> 16) & 0xff;
	        here_val = here & 0xffff;

	        if ((here_bits) <= bits) { break; }
	        //--- PULLBYTE() ---//
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	        //---//
	      }
	      if ((here_op & 0xf0) === 0) {
	        last_bits = here_bits;
	        last_op = here_op;
	        last_val = here_val;
	        for (;;) {
	          here = state.distcode[last_val +
	                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((last_bits + here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        //--- DROPBITS(last.bits) ---//
	        hold >>>= last_bits;
	        bits -= last_bits;
	        //---//
	        state.back += last_bits;
	      }
	      //--- DROPBITS(here.bits) ---//
	      hold >>>= here_bits;
	      bits -= here_bits;
	      //---//
	      state.back += here_bits;
	      if (here_op & 64) {
	        strm.msg = 'invalid distance code';
	        state.mode = BAD;
	        break;
	      }
	      state.offset = here_val;
	      state.extra = (here_op) & 15;
	      state.mode = DISTEXT;
	      /* falls through */
	    case DISTEXT:
	      if (state.extra) {
	        //=== NEEDBITS(state.extra);
	        n = state.extra;
	        while (bits < n) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
	        //--- DROPBITS(state.extra) ---//
	        hold >>>= state.extra;
	        bits -= state.extra;
	        //---//
	        state.back += state.extra;
	      }
	//#ifdef INFLATE_STRICT
	      if (state.offset > state.dmax) {
	        strm.msg = 'invalid distance too far back';
	        state.mode = BAD;
	        break;
	      }
	//#endif
	      //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
	      state.mode = MATCH;
	      /* falls through */
	    case MATCH:
	      if (left === 0) { break inf_leave; }
	      copy = _out - left;
	      if (state.offset > copy) {         /* copy from window */
	        copy = state.offset - copy;
	        if (copy > state.whave) {
	          if (state.sane) {
	            strm.msg = 'invalid distance too far back';
	            state.mode = BAD;
	            break;
	          }
	// (!) This block is disabled in zlib defailts,
	// don't enable it for binary compatibility
	//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	//          Trace((stderr, "inflate.c too far\n"));
	//          copy -= state.whave;
	//          if (copy > state.length) { copy = state.length; }
	//          if (copy > left) { copy = left; }
	//          left -= copy;
	//          state.length -= copy;
	//          do {
	//            output[put++] = 0;
	//          } while (--copy);
	//          if (state.length === 0) { state.mode = LEN; }
	//          break;
	//#endif
	        }
	        if (copy > state.wnext) {
	          copy -= state.wnext;
	          from = state.wsize - copy;
	        }
	        else {
	          from = state.wnext - copy;
	        }
	        if (copy > state.length) { copy = state.length; }
	        from_source = state.window;
	      }
	      else {                              /* copy from output */
	        from_source = output;
	        from = put - state.offset;
	        copy = state.length;
	      }
	      if (copy > left) { copy = left; }
	      left -= copy;
	      state.length -= copy;
	      do {
	        output[put++] = from_source[from++];
	      } while (--copy);
	      if (state.length === 0) { state.mode = LEN; }
	      break;
	    case LIT:
	      if (left === 0) { break inf_leave; }
	      output[put++] = state.length;
	      left--;
	      state.mode = LEN;
	      break;
	    case CHECK:
	      if (state.wrap) {
	        //=== NEEDBITS(32);
	        while (bits < 32) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          // Use '|' insdead of '+' to make sure that result is signed
	          hold |= input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        _out -= left;
	        strm.total_out += _out;
	        state.total += _out;
	        if (_out) {
	          strm.adler = state.check =
	              /*UPDATE(state.check, put - _out, _out);*/
	              (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

	        }
	        _out = left;
	        // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
	        if ((state.flags ? hold : zswap32(hold)) !== state.check) {
	          strm.msg = 'incorrect data check';
	          state.mode = BAD;
	          break;
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        //Tracev((stderr, "inflate:   check matches trailer\n"));
	      }
	      state.mode = LENGTH;
	      /* falls through */
	    case LENGTH:
	      if (state.wrap && state.flags) {
	        //=== NEEDBITS(32);
	        while (bits < 32) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (hold !== (state.total & 0xffffffff)) {
	          strm.msg = 'incorrect length check';
	          state.mode = BAD;
	          break;
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        //Tracev((stderr, "inflate:   length matches trailer\n"));
	      }
	      state.mode = DONE;
	      /* falls through */
	    case DONE:
	      ret = Z_STREAM_END;
	      break inf_leave;
	    case BAD:
	      ret = Z_DATA_ERROR;
	      break inf_leave;
	    case MEM:
	      return Z_MEM_ERROR;
	    case SYNC:
	      /* falls through */
	    default:
	      return Z_STREAM_ERROR;
	    }
	  }

	  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

	  /*
	     Return from inflate(), updating the total counts and the check value.
	     If there was no progress during the inflate() call, return a buffer
	     error.  Call updatewindow() to create and/or update the window state.
	     Note: a memory error from inflate() is non-recoverable.
	   */

	  //--- RESTORE() ---
	  strm.next_out = put;
	  strm.avail_out = left;
	  strm.next_in = next;
	  strm.avail_in = have;
	  state.hold = hold;
	  state.bits = bits;
	  //---

	  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
	                      (state.mode < CHECK || flush !== Z_FINISH))) {
	    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
	      state.mode = MEM;
	      return Z_MEM_ERROR;
	    }
	  }
	  _in -= strm.avail_in;
	  _out -= strm.avail_out;
	  strm.total_in += _in;
	  strm.total_out += _out;
	  state.total += _out;
	  if (state.wrap && _out) {
	    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
	      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
	  }
	  strm.data_type = state.bits + (state.last ? 64 : 0) +
	                    (state.mode === TYPE ? 128 : 0) +
	                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
	  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
	    ret = Z_BUF_ERROR;
	  }
	  return ret;
	}

	function inflateEnd(strm) {

	  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
	    return Z_STREAM_ERROR;
	  }

	  var state = strm.state;
	  if (state.window) {
	    state.window = null;
	  }
	  strm.state = null;
	  return Z_OK;
	}

	function inflateGetHeader(strm, head) {
	  var state;

	  /* check state */
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

	  /* save header structure */
	  state.head = head;
	  head.done = false;
	  return Z_OK;
	}

	function inflateSetDictionary(strm, dictionary) {
	  var dictLength = dictionary.length;

	  var state;
	  var dictid;
	  var ret;

	  /* check state */
	  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
	  state = strm.state;

	  if (state.wrap !== 0 && state.mode !== DICT) {
	    return Z_STREAM_ERROR;
	  }

	  /* check for correct dictionary identifier */
	  if (state.mode === DICT) {
	    dictid = 1; /* adler32(0, null, 0)*/
	    /* dictid = adler32(dictid, dictionary, dictLength); */
	    dictid = adler32(dictid, dictionary, dictLength, 0);
	    if (dictid !== state.check) {
	      return Z_DATA_ERROR;
	    }
	  }
	  /* copy dictionary to window using updatewindow(), which will amend the
	   existing dictionary if appropriate */
	  ret = updatewindow(strm, dictionary, dictLength, dictLength);
	  if (ret) {
	    state.mode = MEM;
	    return Z_MEM_ERROR;
	  }
	  state.havedict = 1;
	  // Tracev((stderr, "inflate:   dictionary set\n"));
	  return Z_OK;
	}

	exports.inflateReset = inflateReset;
	exports.inflateReset2 = inflateReset2;
	exports.inflateResetKeep = inflateResetKeep;
	exports.inflateInit = inflateInit;
	exports.inflateInit2 = inflateInit2;
	exports.inflate = inflate;
	exports.inflateEnd = inflateEnd;
	exports.inflateGetHeader = inflateGetHeader;
	exports.inflateSetDictionary = inflateSetDictionary;
	exports.inflateInfo = 'pako inflate (from Nodeca project)';

	/* Not implemented
	exports.inflateCopy = inflateCopy;
	exports.inflateGetDictionary = inflateGetDictionary;
	exports.inflateMark = inflateMark;
	exports.inflatePrime = inflatePrime;
	exports.inflateSync = inflateSync;
	exports.inflateSyncPoint = inflateSyncPoint;
	exports.inflateUndermine = inflateUndermine;
	*/

	},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	var utils = require('../utils/common');

	var MAXBITS = 15;
	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;

	var lbase = [ /* Length codes 257..285 base */
	  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
	  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
	];

	var lext = [ /* Length codes 257..285 extra */
	  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
	  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
	];

	var dbase = [ /* Distance codes 0..29 base */
	  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
	  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
	  8193, 12289, 16385, 24577, 0, 0
	];

	var dext = [ /* Distance codes 0..29 extra */
	  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
	  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
	  28, 28, 29, 29, 64, 64
	];

	module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
	{
	  var bits = opts.bits;
	      //here = opts.here; /* table entry for duplication */

	  var len = 0;               /* a code's length in bits */
	  var sym = 0;               /* index of code symbols */
	  var min = 0, max = 0;          /* minimum and maximum code lengths */
	  var root = 0;              /* number of index bits for root table */
	  var curr = 0;              /* number of index bits for current table */
	  var drop = 0;              /* code bits to drop for sub-table */
	  var left = 0;                   /* number of prefix codes available */
	  var used = 0;              /* code entries in table used */
	  var huff = 0;              /* Huffman code */
	  var incr;              /* for incrementing code, index */
	  var fill;              /* index for replicating entries */
	  var low;               /* low bits for current root entry */
	  var mask;              /* mask for low root bits */
	  var next;             /* next available space in table */
	  var base = null;     /* base value table to use */
	  var base_index = 0;
	//  var shoextra;    /* extra bits table to use */
	  var end;                    /* use base and extra for symbol > end */
	  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
	  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
	  var extra = null;
	  var extra_index = 0;

	  var here_bits, here_op, here_val;

	  /*
	   Process a set of code lengths to create a canonical Huffman code.  The
	   code lengths are lens[0..codes-1].  Each length corresponds to the
	   symbols 0..codes-1.  The Huffman code is generated by first sorting the
	   symbols by length from short to long, and retaining the symbol order
	   for codes with equal lengths.  Then the code starts with all zero bits
	   for the first code of the shortest length, and the codes are integer
	   increments for the same length, and zeros are appended as the length
	   increases.  For the deflate format, these bits are stored backwards
	   from their more natural integer increment ordering, and so when the
	   decoding tables are built in the large loop below, the integer codes
	   are incremented backwards.

	   This routine assumes, but does not check, that all of the entries in
	   lens[] are in the range 0..MAXBITS.  The caller must assure this.
	   1..MAXBITS is interpreted as that code length.  zero means that that
	   symbol does not occur in this code.

	   The codes are sorted by computing a count of codes for each length,
	   creating from that a table of starting indices for each length in the
	   sorted table, and then entering the symbols in order in the sorted
	   table.  The sorted table is work[], with that space being provided by
	   the caller.

	   The length counts are used for other purposes as well, i.e. finding
	   the minimum and maximum length codes, determining if there are any
	   codes at all, checking for a valid set of lengths, and looking ahead
	   at length counts to determine sub-table sizes when building the
	   decoding tables.
	   */

	  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
	  for (len = 0; len <= MAXBITS; len++) {
	    count[len] = 0;
	  }
	  for (sym = 0; sym < codes; sym++) {
	    count[lens[lens_index + sym]]++;
	  }

	  /* bound code lengths, force root to be within code lengths */
	  root = bits;
	  for (max = MAXBITS; max >= 1; max--) {
	    if (count[max] !== 0) { break; }
	  }
	  if (root > max) {
	    root = max;
	  }
	  if (max === 0) {                     /* no symbols to code at all */
	    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
	    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
	    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
	    table[table_index++] = (1 << 24) | (64 << 16) | 0;


	    //table.op[opts.table_index] = 64;
	    //table.bits[opts.table_index] = 1;
	    //table.val[opts.table_index++] = 0;
	    table[table_index++] = (1 << 24) | (64 << 16) | 0;

	    opts.bits = 1;
	    return 0;     /* no symbols, but wait for decoding to report error */
	  }
	  for (min = 1; min < max; min++) {
	    if (count[min] !== 0) { break; }
	  }
	  if (root < min) {
	    root = min;
	  }

	  /* check for an over-subscribed or incomplete set of lengths */
	  left = 1;
	  for (len = 1; len <= MAXBITS; len++) {
	    left <<= 1;
	    left -= count[len];
	    if (left < 0) {
	      return -1;
	    }        /* over-subscribed */
	  }
	  if (left > 0 && (type === CODES || max !== 1)) {
	    return -1;                      /* incomplete set */
	  }

	  /* generate offsets into symbol table for each length for sorting */
	  offs[1] = 0;
	  for (len = 1; len < MAXBITS; len++) {
	    offs[len + 1] = offs[len] + count[len];
	  }

	  /* sort symbols by length, by symbol order within each length */
	  for (sym = 0; sym < codes; sym++) {
	    if (lens[lens_index + sym] !== 0) {
	      work[offs[lens[lens_index + sym]]++] = sym;
	    }
	  }

	  /*
	   Create and fill in decoding tables.  In this loop, the table being
	   filled is at next and has curr index bits.  The code being used is huff
	   with length len.  That code is converted to an index by dropping drop
	   bits off of the bottom.  For codes where len is less than drop + curr,
	   those top drop + curr - len bits are incremented through all values to
	   fill the table with replicated entries.

	   root is the number of index bits for the root table.  When len exceeds
	   root, sub-tables are created pointed to by the root entry with an index
	   of the low root bits of huff.  This is saved in low to check for when a
	   new sub-table should be started.  drop is zero when the root table is
	   being filled, and drop is root when sub-tables are being filled.

	   When a new sub-table is needed, it is necessary to look ahead in the
	   code lengths to determine what size sub-table is needed.  The length
	   counts are used for this, and so count[] is decremented as codes are
	   entered in the tables.

	   used keeps track of how many table entries have been allocated from the
	   provided *table space.  It is checked for LENS and DIST tables against
	   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
	   the initial root table size constants.  See the comments in inftrees.h
	   for more information.

	   sym increments through all symbols, and the loop terminates when
	   all codes of length max, i.e. all codes, have been processed.  This
	   routine permits incomplete codes, so another loop after this one fills
	   in the rest of the decoding tables with invalid code markers.
	   */

	  /* set up for code type */
	  // poor man optimization - use if-else instead of switch,
	  // to avoid deopts in old v8
	  if (type === CODES) {
	    base = extra = work;    /* dummy value--not used */
	    end = 19;

	  } else if (type === LENS) {
	    base = lbase;
	    base_index -= 257;
	    extra = lext;
	    extra_index -= 257;
	    end = 256;

	  } else {                    /* DISTS */
	    base = dbase;
	    extra = dext;
	    end = -1;
	  }

	  /* initialize opts for loop */
	  huff = 0;                   /* starting code */
	  sym = 0;                    /* starting code symbol */
	  len = min;                  /* starting code length */
	  next = table_index;              /* current table to fill in */
	  curr = root;                /* current table index bits */
	  drop = 0;                   /* current bits to drop from code for index */
	  low = -1;                   /* trigger new sub-table when len > root */
	  used = 1 << root;          /* use root table entries */
	  mask = used - 1;            /* mask for comparing low */

	  /* check available table space */
	  if ((type === LENS && used > ENOUGH_LENS) ||
	    (type === DISTS && used > ENOUGH_DISTS)) {
	    return 1;
	  }

	  /* process all codes and make table entries */
	  for (;;) {
	    /* create table entry */
	    here_bits = len - drop;
	    if (work[sym] < end) {
	      here_op = 0;
	      here_val = work[sym];
	    }
	    else if (work[sym] > end) {
	      here_op = extra[extra_index + work[sym]];
	      here_val = base[base_index + work[sym]];
	    }
	    else {
	      here_op = 32 + 64;         /* end of block */
	      here_val = 0;
	    }

	    /* replicate for those indices with low len bits equal to huff */
	    incr = 1 << (len - drop);
	    fill = 1 << curr;
	    min = fill;                 /* save offset to next table */
	    do {
	      fill -= incr;
	      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
	    } while (fill !== 0);

	    /* backwards increment the len-bit code huff */
	    incr = 1 << (len - 1);
	    while (huff & incr) {
	      incr >>= 1;
	    }
	    if (incr !== 0) {
	      huff &= incr - 1;
	      huff += incr;
	    } else {
	      huff = 0;
	    }

	    /* go to next symbol, update count, len */
	    sym++;
	    if (--count[len] === 0) {
	      if (len === max) { break; }
	      len = lens[lens_index + work[sym]];
	    }

	    /* create new sub-table if needed */
	    if (len > root && (huff & mask) !== low) {
	      /* if first time, transition to sub-tables */
	      if (drop === 0) {
	        drop = root;
	      }

	      /* increment past last table */
	      next += min;            /* here min is 1 << curr */

	      /* determine length of next table */
	      curr = len - drop;
	      left = 1 << curr;
	      while (curr + drop < max) {
	        left -= count[curr + drop];
	        if (left <= 0) { break; }
	        curr++;
	        left <<= 1;
	      }

	      /* check for enough space */
	      used += 1 << curr;
	      if ((type === LENS && used > ENOUGH_LENS) ||
	        (type === DISTS && used > ENOUGH_DISTS)) {
	        return 1;
	      }

	      /* point entry in root table to sub-table */
	      low = huff & mask;
	      /*table.op[low] = curr;
	      table.bits[low] = root;
	      table.val[low] = next - opts.table_index;*/
	      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
	    }
	  }

	  /* fill in remaining table entry if code is incomplete (guaranteed to have
	   at most one remaining entry, since if the code is incomplete, the
	   maximum code length that was allowed to get this far is one bit) */
	  if (huff !== 0) {
	    //table.op[next + huff] = 64;            /* invalid code marker */
	    //table.bits[next + huff] = len - drop;
	    //table.val[next + huff] = 0;
	    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
	  }

	  /* set return parameters */
	  //opts.table_index += used;
	  opts.bits = root;
	  return 0;
	};

	},{"../utils/common":41}],51:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	module.exports = {
	  2:      'need dictionary',     /* Z_NEED_DICT       2  */
	  1:      'stream end',          /* Z_STREAM_END      1  */
	  0:      '',                    /* Z_OK              0  */
	  '-1':   'file error',          /* Z_ERRNO         (-1) */
	  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
	  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
	  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
	  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
	  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
	};

	},{}],52:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	var utils = require('../utils/common');

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	//var Z_FILTERED          = 1;
	//var Z_HUFFMAN_ONLY      = 2;
	//var Z_RLE               = 3;
	var Z_FIXED               = 4;
	//var Z_DEFAULT_STRATEGY  = 0;

	/* Possible values of the data_type field (though see inflate()) */
	var Z_BINARY              = 0;
	var Z_TEXT                = 1;
	//var Z_ASCII             = 1; // = Z_TEXT
	var Z_UNKNOWN             = 2;

	/*============================================================================*/


	function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

	// From zutil.h

	var STORED_BLOCK = 0;
	var STATIC_TREES = 1;
	var DYN_TREES    = 2;
	/* The three kinds of block type */

	var MIN_MATCH    = 3;
	var MAX_MATCH    = 258;
	/* The minimum and maximum match lengths */

	// From deflate.h
	/* ===========================================================================
	 * Internal compression state.
	 */

	var LENGTH_CODES  = 29;
	/* number of length codes, not counting the special END_BLOCK code */

	var LITERALS      = 256;
	/* number of literal bytes 0..255 */

	var L_CODES       = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */

	var D_CODES       = 30;
	/* number of distance codes */

	var BL_CODES      = 19;
	/* number of codes used to transfer the bit lengths */

	var HEAP_SIZE     = 2 * L_CODES + 1;
	/* maximum heap size */

	var MAX_BITS      = 15;
	/* All codes must not exceed MAX_BITS bits */

	var Buf_size      = 16;
	/* size of bit buffer in bi_buf */


	/* ===========================================================================
	 * Constants
	 */

	var MAX_BL_BITS = 7;
	/* Bit length codes must not exceed MAX_BL_BITS bits */

	var END_BLOCK   = 256;
	/* end of block literal code */

	var REP_3_6     = 16;
	/* repeat previous bit length 3-6 times (2 bits of repeat count) */

	var REPZ_3_10   = 17;
	/* repeat a zero length 3-10 times  (3 bits of repeat count) */

	var REPZ_11_138 = 18;
	/* repeat a zero length 11-138 times  (7 bits of repeat count) */

	/* eslint-disable comma-spacing,array-bracket-spacing */
	var extra_lbits =   /* extra bits for each length code */
	  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

	var extra_dbits =   /* extra bits for each distance code */
	  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

	var extra_blbits =  /* extra bits for each bit length code */
	  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

	var bl_order =
	  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
	/* eslint-enable comma-spacing,array-bracket-spacing */

	/* The lengths of the bit length codes are sent in order of decreasing
	 * probability, to avoid transmitting the lengths for unused bit length codes.
	 */

	/* ===========================================================================
	 * Local data. These are initialized only once.
	 */

	// We pre-fill arrays with 0 to avoid uninitialized gaps

	var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

	// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
	var static_ltree  = new Array((L_CODES + 2) * 2);
	zero(static_ltree);
	/* The static literal tree. Since the bit lengths are imposed, there is no
	 * need for the L_CODES extra codes used during heap construction. However
	 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
	 * below).
	 */

	var static_dtree  = new Array(D_CODES * 2);
	zero(static_dtree);
	/* The static distance tree. (Actually a trivial tree since all codes use
	 * 5 bits.)
	 */

	var _dist_code    = new Array(DIST_CODE_LEN);
	zero(_dist_code);
	/* Distance codes. The first 256 values correspond to the distances
	 * 3 .. 258, the last 256 values correspond to the top 8 bits of
	 * the 15 bit distances.
	 */

	var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
	zero(_length_code);
	/* length code for each normalized match length (0 == MIN_MATCH) */

	var base_length   = new Array(LENGTH_CODES);
	zero(base_length);
	/* First normalized length for each code (0 = MIN_MATCH) */

	var base_dist     = new Array(D_CODES);
	zero(base_dist);
	/* First normalized distance for each code (0 = distance of 1) */


	function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

	  this.static_tree  = static_tree;  /* static tree or NULL */
	  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
	  this.extra_base   = extra_base;   /* base index for extra_bits */
	  this.elems        = elems;        /* max number of elements in the tree */
	  this.max_length   = max_length;   /* max bit length for the codes */

	  // show if `static_tree` has data or dummy - needed for monomorphic objects
	  this.has_stree    = static_tree && static_tree.length;
	}


	var static_l_desc;
	var static_d_desc;
	var static_bl_desc;


	function TreeDesc(dyn_tree, stat_desc) {
	  this.dyn_tree = dyn_tree;     /* the dynamic tree */
	  this.max_code = 0;            /* largest code with non zero frequency */
	  this.stat_desc = stat_desc;   /* the corresponding static tree */
	}



	function d_code(dist) {
	  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
	}


	/* ===========================================================================
	 * Output a short LSB first on the stream.
	 * IN assertion: there is enough room in pendingBuf.
	 */
	function put_short(s, w) {
	//    put_byte(s, (uch)((w) & 0xff));
	//    put_byte(s, (uch)((ush)(w) >> 8));
	  s.pending_buf[s.pending++] = (w) & 0xff;
	  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
	}


	/* ===========================================================================
	 * Send a value on a given number of bits.
	 * IN assertion: length <= 16 and value fits in length bits.
	 */
	function send_bits(s, value, length) {
	  if (s.bi_valid > (Buf_size - length)) {
	    s.bi_buf |= (value << s.bi_valid) & 0xffff;
	    put_short(s, s.bi_buf);
	    s.bi_buf = value >> (Buf_size - s.bi_valid);
	    s.bi_valid += length - Buf_size;
	  } else {
	    s.bi_buf |= (value << s.bi_valid) & 0xffff;
	    s.bi_valid += length;
	  }
	}


	function send_code(s, c, tree) {
	  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
	}


	/* ===========================================================================
	 * Reverse the first len bits of a code, using straightforward code (a faster
	 * method would use a table)
	 * IN assertion: 1 <= len <= 15
	 */
	function bi_reverse(code, len) {
	  var res = 0;
	  do {
	    res |= code & 1;
	    code >>>= 1;
	    res <<= 1;
	  } while (--len > 0);
	  return res >>> 1;
	}


	/* ===========================================================================
	 * Flush the bit buffer, keeping at most 7 bits in it.
	 */
	function bi_flush(s) {
	  if (s.bi_valid === 16) {
	    put_short(s, s.bi_buf);
	    s.bi_buf = 0;
	    s.bi_valid = 0;

	  } else if (s.bi_valid >= 8) {
	    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
	    s.bi_buf >>= 8;
	    s.bi_valid -= 8;
	  }
	}


	/* ===========================================================================
	 * Compute the optimal bit lengths for a tree and update the total bit length
	 * for the current block.
	 * IN assertion: the fields freq and dad are set, heap[heap_max] and
	 *    above are the tree nodes sorted by increasing frequency.
	 * OUT assertions: the field len is set to the optimal bit length, the
	 *     array bl_count contains the frequencies for each bit length.
	 *     The length opt_len is updated; static_len is also updated if stree is
	 *     not null.
	 */
	function gen_bitlen(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc;    /* the tree descriptor */
	{
	  var tree            = desc.dyn_tree;
	  var max_code        = desc.max_code;
	  var stree           = desc.stat_desc.static_tree;
	  var has_stree       = desc.stat_desc.has_stree;
	  var extra           = desc.stat_desc.extra_bits;
	  var base            = desc.stat_desc.extra_base;
	  var max_length      = desc.stat_desc.max_length;
	  var h;              /* heap index */
	  var n, m;           /* iterate over the tree elements */
	  var bits;           /* bit length */
	  var xbits;          /* extra bits */
	  var f;              /* frequency */
	  var overflow = 0;   /* number of elements with bit length too large */

	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    s.bl_count[bits] = 0;
	  }

	  /* In a first pass, compute the optimal bit lengths (which may
	   * overflow in the case of the bit length tree).
	   */
	  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

	  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
	    n = s.heap[h];
	    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
	    if (bits > max_length) {
	      bits = max_length;
	      overflow++;
	    }
	    tree[n * 2 + 1]/*.Len*/ = bits;
	    /* We overwrite tree[n].Dad which is no longer needed */

	    if (n > max_code) { continue; } /* not a leaf node */

	    s.bl_count[bits]++;
	    xbits = 0;
	    if (n >= base) {
	      xbits = extra[n - base];
	    }
	    f = tree[n * 2]/*.Freq*/;
	    s.opt_len += f * (bits + xbits);
	    if (has_stree) {
	      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
	    }
	  }
	  if (overflow === 0) { return; }

	  // Trace((stderr,"\nbit length overflow\n"));
	  /* This happens for example on obj2 and pic of the Calgary corpus */

	  /* Find the first bit length which could increase: */
	  do {
	    bits = max_length - 1;
	    while (s.bl_count[bits] === 0) { bits--; }
	    s.bl_count[bits]--;      /* move one leaf down the tree */
	    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
	    s.bl_count[max_length]--;
	    /* The brother of the overflow item also moves one step up,
	     * but this does not affect bl_count[max_length]
	     */
	    overflow -= 2;
	  } while (overflow > 0);

	  /* Now recompute all bit lengths, scanning in increasing frequency.
	   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
	   * lengths instead of fixing only the wrong ones. This idea is taken
	   * from 'ar' written by Haruhiko Okumura.)
	   */
	  for (bits = max_length; bits !== 0; bits--) {
	    n = s.bl_count[bits];
	    while (n !== 0) {
	      m = s.heap[--h];
	      if (m > max_code) { continue; }
	      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
	        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
	        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
	        tree[m * 2 + 1]/*.Len*/ = bits;
	      }
	      n--;
	    }
	  }
	}


	/* ===========================================================================
	 * Generate the codes for a given tree and bit counts (which need not be
	 * optimal).
	 * IN assertion: the array bl_count contains the bit length statistics for
	 * the given tree and the field len is set for all tree elements.
	 * OUT assertion: the field code is set for all tree elements of non
	 *     zero code length.
	 */
	function gen_codes(tree, max_code, bl_count)
	//    ct_data *tree;             /* the tree to decorate */
	//    int max_code;              /* largest code with non zero frequency */
	//    ushf *bl_count;            /* number of codes at each bit length */
	{
	  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
	  var code = 0;              /* running code value */
	  var bits;                  /* bit index */
	  var n;                     /* code index */

	  /* The distribution counts are first used to generate the code values
	   * without bit reversal.
	   */
	  for (bits = 1; bits <= MAX_BITS; bits++) {
	    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
	  }
	  /* Check that the bit counts in bl_count are consistent. The last code
	   * must be all ones.
	   */
	  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
	  //        "inconsistent bit counts");
	  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

	  for (n = 0;  n <= max_code; n++) {
	    var len = tree[n * 2 + 1]/*.Len*/;
	    if (len === 0) { continue; }
	    /* Now reverse the bits */
	    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

	    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
	    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
	  }
	}


	/* ===========================================================================
	 * Initialize the various 'constant' tables.
	 */
	function tr_static_init() {
	  var n;        /* iterates over tree elements */
	  var bits;     /* bit counter */
	  var length;   /* length value */
	  var code;     /* code value */
	  var dist;     /* distance index */
	  var bl_count = new Array(MAX_BITS + 1);
	  /* number of codes at each bit length for an optimal tree */

	  // do check in _tr_init()
	  //if (static_init_done) return;

	  /* For some embedded targets, global variables are not initialized: */
	/*#ifdef NO_INIT_GLOBAL_POINTERS
	  static_l_desc.static_tree = static_ltree;
	  static_l_desc.extra_bits = extra_lbits;
	  static_d_desc.static_tree = static_dtree;
	  static_d_desc.extra_bits = extra_dbits;
	  static_bl_desc.extra_bits = extra_blbits;
	#endif*/

	  /* Initialize the mapping length (0..255) -> length code (0..28) */
	  length = 0;
	  for (code = 0; code < LENGTH_CODES - 1; code++) {
	    base_length[code] = length;
	    for (n = 0; n < (1 << extra_lbits[code]); n++) {
	      _length_code[length++] = code;
	    }
	  }
	  //Assert (length == 256, "tr_static_init: length != 256");
	  /* Note that the length 255 (match length 258) can be represented
	   * in two different ways: code 284 + 5 bits or code 285, so we
	   * overwrite length_code[255] to use the best encoding:
	   */
	  _length_code[length - 1] = code;

	  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
	  dist = 0;
	  for (code = 0; code < 16; code++) {
	    base_dist[code] = dist;
	    for (n = 0; n < (1 << extra_dbits[code]); n++) {
	      _dist_code[dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: dist != 256");
	  dist >>= 7; /* from now on, all distances are divided by 128 */
	  for (; code < D_CODES; code++) {
	    base_dist[code] = dist << 7;
	    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
	      _dist_code[256 + dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

	  /* Construct the codes of the static literal tree */
	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    bl_count[bits] = 0;
	  }

	  n = 0;
	  while (n <= 143) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  while (n <= 255) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 9;
	    n++;
	    bl_count[9]++;
	  }
	  while (n <= 279) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 7;
	    n++;
	    bl_count[7]++;
	  }
	  while (n <= 287) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  /* Codes 286 and 287 do not exist, but we must include them in the
	   * tree construction to get a canonical Huffman tree (longest code
	   * all ones)
	   */
	  gen_codes(static_ltree, L_CODES + 1, bl_count);

	  /* The static distance tree is trivial: */
	  for (n = 0; n < D_CODES; n++) {
	    static_dtree[n * 2 + 1]/*.Len*/ = 5;
	    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
	  }

	  // Now data ready and we can init static trees
	  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
	  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
	  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

	  //static_init_done = true;
	}


	/* ===========================================================================
	 * Initialize a new block.
	 */
	function init_block(s) {
	  var n; /* iterates over tree elements */

	  /* Initialize the trees. */
	  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
	  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
	  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

	  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
	  s.opt_len = s.static_len = 0;
	  s.last_lit = s.matches = 0;
	}


	/* ===========================================================================
	 * Flush the bit buffer and align the output on a byte boundary
	 */
	function bi_windup(s)
	{
	  if (s.bi_valid > 8) {
	    put_short(s, s.bi_buf);
	  } else if (s.bi_valid > 0) {
	    //put_byte(s, (Byte)s->bi_buf);
	    s.pending_buf[s.pending++] = s.bi_buf;
	  }
	  s.bi_buf = 0;
	  s.bi_valid = 0;
	}

	/* ===========================================================================
	 * Copy a stored block, storing first the length and its
	 * one's complement if requested.
	 */
	function copy_block(s, buf, len, header)
	//DeflateState *s;
	//charf    *buf;    /* the input data */
	//unsigned len;     /* its length */
	//int      header;  /* true if block header must be written */
	{
	  bi_windup(s);        /* align on byte boundary */

	  if (header) {
	    put_short(s, len);
	    put_short(s, ~len);
	  }
	//  while (len--) {
	//    put_byte(s, *buf++);
	//  }
	  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
	  s.pending += len;
	}

	/* ===========================================================================
	 * Compares to subtrees, using the tree depth as tie breaker when
	 * the subtrees have equal frequency. This minimizes the worst case length.
	 */
	function smaller(tree, n, m, depth) {
	  var _n2 = n * 2;
	  var _m2 = m * 2;
	  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
	         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
	}

	/* ===========================================================================
	 * Restore the heap property by moving down the tree starting at node k,
	 * exchanging a node with the smallest of its two sons if necessary, stopping
	 * when the heap property is re-established (each father smaller than its
	 * two sons).
	 */
	function pqdownheap(s, tree, k)
	//    deflate_state *s;
	//    ct_data *tree;  /* the tree to restore */
	//    int k;               /* node to move down */
	{
	  var v = s.heap[k];
	  var j = k << 1;  /* left son of k */
	  while (j <= s.heap_len) {
	    /* Set j to the smallest of the two sons: */
	    if (j < s.heap_len &&
	      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
	      j++;
	    }
	    /* Exit if v is smaller than both sons */
	    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

	    /* Exchange v with the smallest son */
	    s.heap[k] = s.heap[j];
	    k = j;

	    /* And continue down the tree, setting j to the left son of k */
	    j <<= 1;
	  }
	  s.heap[k] = v;
	}


	// inlined manually
	// var SMALLEST = 1;

	/* ===========================================================================
	 * Send the block data compressed using the given Huffman trees
	 */
	function compress_block(s, ltree, dtree)
	//    deflate_state *s;
	//    const ct_data *ltree; /* literal tree */
	//    const ct_data *dtree; /* distance tree */
	{
	  var dist;           /* distance of matched string */
	  var lc;             /* match length or unmatched char (if dist == 0) */
	  var lx = 0;         /* running index in l_buf */
	  var code;           /* the code to send */
	  var extra;          /* number of extra bits to send */

	  if (s.last_lit !== 0) {
	    do {
	      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
	      lc = s.pending_buf[s.l_buf + lx];
	      lx++;

	      if (dist === 0) {
	        send_code(s, lc, ltree); /* send a literal byte */
	        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
	      } else {
	        /* Here, lc is the match length - MIN_MATCH */
	        code = _length_code[lc];
	        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
	        extra = extra_lbits[code];
	        if (extra !== 0) {
	          lc -= base_length[code];
	          send_bits(s, lc, extra);       /* send the extra length bits */
	        }
	        dist--; /* dist is now the match distance - 1 */
	        code = d_code(dist);
	        //Assert (code < D_CODES, "bad d_code");

	        send_code(s, code, dtree);       /* send the distance code */
	        extra = extra_dbits[code];
	        if (extra !== 0) {
	          dist -= base_dist[code];
	          send_bits(s, dist, extra);   /* send the extra distance bits */
	        }
	      } /* literal or match pair ? */

	      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
	      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
	      //       "pendingBuf overflow");

	    } while (lx < s.last_lit);
	  }

	  send_code(s, END_BLOCK, ltree);
	}


	/* ===========================================================================
	 * Construct one Huffman tree and assigns the code bit strings and lengths.
	 * Update the total bit length for the current block.
	 * IN assertion: the field freq is set for all tree elements.
	 * OUT assertions: the fields len and code are set to the optimal bit length
	 *     and corresponding code. The length opt_len is updated; static_len is
	 *     also updated if stree is not null. The field max_code is set.
	 */
	function build_tree(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc; /* the tree descriptor */
	{
	  var tree     = desc.dyn_tree;
	  var stree    = desc.stat_desc.static_tree;
	  var has_stree = desc.stat_desc.has_stree;
	  var elems    = desc.stat_desc.elems;
	  var n, m;          /* iterate over heap elements */
	  var max_code = -1; /* largest code with non zero frequency */
	  var node;          /* new node being created */

	  /* Construct the initial heap, with least frequent element in
	   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
	   * heap[0] is not used.
	   */
	  s.heap_len = 0;
	  s.heap_max = HEAP_SIZE;

	  for (n = 0; n < elems; n++) {
	    if (tree[n * 2]/*.Freq*/ !== 0) {
	      s.heap[++s.heap_len] = max_code = n;
	      s.depth[n] = 0;

	    } else {
	      tree[n * 2 + 1]/*.Len*/ = 0;
	    }
	  }

	  /* The pkzip format requires that at least one distance code exists,
	   * and that at least one bit should be sent even if there is only one
	   * possible code. So to avoid special checks later on we force at least
	   * two codes of non zero frequency.
	   */
	  while (s.heap_len < 2) {
	    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
	    tree[node * 2]/*.Freq*/ = 1;
	    s.depth[node] = 0;
	    s.opt_len--;

	    if (has_stree) {
	      s.static_len -= stree[node * 2 + 1]/*.Len*/;
	    }
	    /* node is 0 or 1 so it does not have extra bits */
	  }
	  desc.max_code = max_code;

	  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
	   * establish sub-heaps of increasing lengths:
	   */
	  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

	  /* Construct the Huffman tree by repeatedly combining the least two
	   * frequent nodes.
	   */
	  node = elems;              /* next internal node of the tree */
	  do {
	    //pqremove(s, tree, n);  /* n = node of least frequency */
	    /*** pqremove ***/
	    n = s.heap[1/*SMALLEST*/];
	    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
	    pqdownheap(s, tree, 1/*SMALLEST*/);
	    /***/

	    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

	    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
	    s.heap[--s.heap_max] = m;

	    /* Create a new node father of n and m */
	    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
	    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
	    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

	    /* and insert the new node in the heap */
	    s.heap[1/*SMALLEST*/] = node++;
	    pqdownheap(s, tree, 1/*SMALLEST*/);

	  } while (s.heap_len >= 2);

	  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

	  /* At this point, the fields freq and dad are set. We can now
	   * generate the bit lengths.
	   */
	  gen_bitlen(s, desc);

	  /* The field len is now set, we can generate the bit codes */
	  gen_codes(tree, max_code, s.bl_count);
	}


	/* ===========================================================================
	 * Scan a literal or distance tree to determine the frequencies of the codes
	 * in the bit length tree.
	 */
	function scan_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree;   /* the tree to be scanned */
	//    int max_code;    /* and its largest code of non zero frequency */
	{
	  var n;                     /* iterates over all tree elements */
	  var prevlen = -1;          /* last emitted length */
	  var curlen;                /* length of current code */

	  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

	  var count = 0;             /* repeat count of the current code */
	  var max_count = 7;         /* max repeat count */
	  var min_count = 4;         /* min repeat count */

	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }
	  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

	    if (++count < max_count && curlen === nextlen) {
	      continue;

	    } else if (count < min_count) {
	      s.bl_tree[curlen * 2]/*.Freq*/ += count;

	    } else if (curlen !== 0) {

	      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
	      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

	    } else if (count <= 10) {
	      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

	    } else {
	      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
	    }

	    count = 0;
	    prevlen = curlen;

	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;

	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;

	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}


	/* ===========================================================================
	 * Send a literal or distance tree in compressed form, using the codes in
	 * bl_tree.
	 */
	function send_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree; /* the tree to be scanned */
	//    int max_code;       /* and its largest code of non zero frequency */
	{
	  var n;                     /* iterates over all tree elements */
	  var prevlen = -1;          /* last emitted length */
	  var curlen;                /* length of current code */

	  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

	  var count = 0;             /* repeat count of the current code */
	  var max_count = 7;         /* max repeat count */
	  var min_count = 4;         /* min repeat count */

	  /* tree[max_code+1].Len = -1; */  /* guard already set */
	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }

	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

	    if (++count < max_count && curlen === nextlen) {
	      continue;

	    } else if (count < min_count) {
	      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

	    } else if (curlen !== 0) {
	      if (curlen !== prevlen) {
	        send_code(s, curlen, s.bl_tree);
	        count--;
	      }
	      //Assert(count >= 3 && count <= 6, " 3_6?");
	      send_code(s, REP_3_6, s.bl_tree);
	      send_bits(s, count - 3, 2);

	    } else if (count <= 10) {
	      send_code(s, REPZ_3_10, s.bl_tree);
	      send_bits(s, count - 3, 3);

	    } else {
	      send_code(s, REPZ_11_138, s.bl_tree);
	      send_bits(s, count - 11, 7);
	    }

	    count = 0;
	    prevlen = curlen;
	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;

	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;

	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}


	/* ===========================================================================
	 * Construct the Huffman tree for the bit lengths and return the index in
	 * bl_order of the last bit length code to send.
	 */
	function build_bl_tree(s) {
	  var max_blindex;  /* index of last bit length code of non zero freq */

	  /* Determine the bit length frequencies for literal and distance trees */
	  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
	  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

	  /* Build the bit length tree: */
	  build_tree(s, s.bl_desc);
	  /* opt_len now includes the length of the tree representations, except
	   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
	   */

	  /* Determine the number of bit length codes to send. The pkzip format
	   * requires that at least 4 bit length codes be sent. (appnote.txt says
	   * 3 but the actual value used is 4.)
	   */
	  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
	    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
	      break;
	    }
	  }
	  /* Update opt_len to include the bit length tree and counts */
	  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
	  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
	  //        s->opt_len, s->static_len));

	  return max_blindex;
	}


	/* ===========================================================================
	 * Send the header for a block using dynamic Huffman trees: the counts, the
	 * lengths of the bit length codes, the literal tree and the distance tree.
	 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
	 */
	function send_all_trees(s, lcodes, dcodes, blcodes)
	//    deflate_state *s;
	//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
	{
	  var rank;                    /* index in bl_order */

	  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
	  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
	  //        "too many codes");
	  //Tracev((stderr, "\nbl counts: "));
	  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
	  send_bits(s, dcodes - 1,   5);
	  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
	  for (rank = 0; rank < blcodes; rank++) {
	    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
	    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
	  }
	  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

	  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
	  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

	  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
	  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
	}


	/* ===========================================================================
	 * Check if the data type is TEXT or BINARY, using the following algorithm:
	 * - TEXT if the two conditions below are satisfied:
	 *    a) There are no non-portable control characters belonging to the
	 *       "black list" (0..6, 14..25, 28..31).
	 *    b) There is at least one printable character belonging to the
	 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
	 * - BINARY otherwise.
	 * - The following partially-portable control characters form a
	 *   "gray list" that is ignored in this detection algorithm:
	 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
	 * IN assertion: the fields Freq of dyn_ltree are set.
	 */
	function detect_data_type(s) {
	  /* black_mask is the bit mask of black-listed bytes
	   * set bits 0..6, 14..25, and 28..31
	   * 0xf3ffc07f = binary 11110011111111111100000001111111
	   */
	  var black_mask = 0xf3ffc07f;
	  var n;

	  /* Check for non-textual ("black-listed") bytes. */
	  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
	    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
	      return Z_BINARY;
	    }
	  }

	  /* Check for textual ("white-listed") bytes. */
	  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
	      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
	    return Z_TEXT;
	  }
	  for (n = 32; n < LITERALS; n++) {
	    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
	      return Z_TEXT;
	    }
	  }

	  /* There are no "black-listed" or "white-listed" bytes:
	   * this stream either is empty or has tolerated ("gray-listed") bytes only.
	   */
	  return Z_BINARY;
	}


	var static_init_done = false;

	/* ===========================================================================
	 * Initialize the tree data structures for a new zlib stream.
	 */
	function _tr_init(s)
	{

	  if (!static_init_done) {
	    tr_static_init();
	    static_init_done = true;
	  }

	  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
	  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
	  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

	  s.bi_buf = 0;
	  s.bi_valid = 0;

	  /* Initialize the first block of the first file: */
	  init_block(s);
	}


	/* ===========================================================================
	 * Send a stored block
	 */
	function _tr_stored_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
	  copy_block(s, buf, stored_len, true); /* with header */
	}


	/* ===========================================================================
	 * Send one empty static block to give enough lookahead for inflate.
	 * This takes 10 bits, of which 7 may remain in the bit buffer.
	 */
	function _tr_align(s) {
	  send_bits(s, STATIC_TREES << 1, 3);
	  send_code(s, END_BLOCK, static_ltree);
	  bi_flush(s);
	}


	/* ===========================================================================
	 * Determine the best encoding for the current block: dynamic trees, static
	 * trees or store, and output the encoded block to the zip file.
	 */
	function _tr_flush_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block, or NULL if too old */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
	  var max_blindex = 0;        /* index of last bit length code of non zero freq */

	  /* Build the Huffman trees unless a stored block is forced */
	  if (s.level > 0) {

	    /* Check if the file is binary or text */
	    if (s.strm.data_type === Z_UNKNOWN) {
	      s.strm.data_type = detect_data_type(s);
	    }

	    /* Construct the literal and distance trees */
	    build_tree(s, s.l_desc);
	    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));

	    build_tree(s, s.d_desc);
	    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));
	    /* At this point, opt_len and static_len are the total bit lengths of
	     * the compressed block data, excluding the tree representations.
	     */

	    /* Build the bit length tree for the above two trees, and get the index
	     * in bl_order of the last bit length code to send.
	     */
	    max_blindex = build_bl_tree(s);

	    /* Determine the best encoding. Compute the block lengths in bytes. */
	    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
	    static_lenb = (s.static_len + 3 + 7) >>> 3;

	    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
	    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
	    //        s->last_lit));

	    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

	  } else {
	    // Assert(buf != (char*)0, "lost buf");
	    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
	  }

	  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
	    /* 4: two words for the lengths */

	    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
	     * Otherwise we can't have processed more than WSIZE input bytes since
	     * the last block flush, because compression would have been
	     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
	     * transform a block into a stored block.
	     */
	    _tr_stored_block(s, buf, stored_len, last);

	  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

	    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
	    compress_block(s, static_ltree, static_dtree);

	  } else {
	    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
	    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
	    compress_block(s, s.dyn_ltree, s.dyn_dtree);
	  }
	  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
	  /* The above check is made mod 2^32, for files larger than 512 MB
	   * and uLong implemented on 32 bits.
	   */
	  init_block(s);

	  if (last) {
	    bi_windup(s);
	  }
	  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
	  //       s->compressed_len-7*last));
	}

	/* ===========================================================================
	 * Save the match info and tally the frequency counts. Return true if
	 * the current block must be flushed.
	 */
	function _tr_tally(s, dist, lc)
	//    deflate_state *s;
	//    unsigned dist;  /* distance of matched string */
	//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
	{
	  //var out_length, in_length, dcode;

	  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
	  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

	  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
	  s.last_lit++;

	  if (dist === 0) {
	    /* lc is the unmatched char */
	    s.dyn_ltree[lc * 2]/*.Freq*/++;
	  } else {
	    s.matches++;
	    /* Here, lc is the match length - MIN_MATCH */
	    dist--;             /* dist = match distance - 1 */
	    //Assert((ush)dist < (ush)MAX_DIST(s) &&
	    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
	    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

	    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
	    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
	  }

	// (!) This block is disabled in zlib defailts,
	// don't enable it for binary compatibility

	//#ifdef TRUNCATE_BLOCK
	//  /* Try to guess if it is profitable to stop the current block here */
	//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
	//    /* Compute an upper bound for the compressed length */
	//    out_length = s.last_lit*8;
	//    in_length = s.strstart - s.block_start;
	//
	//    for (dcode = 0; dcode < D_CODES; dcode++) {
	//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
	//    }
	//    out_length >>>= 3;
	//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
	//    //       s->last_lit, in_length, out_length,
	//    //       100L - out_length*100L/in_length));
	//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
	//      return true;
	//    }
	//  }
	//#endif

	  return (s.last_lit === s.lit_bufsize - 1);
	  /* We avoid equality with lit_bufsize because of wraparound at 64K
	   * on 16 bit machines and because stored blocks are restricted to
	   * 64K-1 bytes.
	   */
	}

	exports._tr_init  = _tr_init;
	exports._tr_stored_block = _tr_stored_block;
	exports._tr_flush_block  = _tr_flush_block;
	exports._tr_tally = _tr_tally;
	exports._tr_align = _tr_align;

	},{"../utils/common":41}],53:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	function ZStream() {
	  /* next input byte */
	  this.input = null; // JS specific, because we have no pointers
	  this.next_in = 0;
	  /* number of bytes available at input */
	  this.avail_in = 0;
	  /* total number of input bytes read so far */
	  this.total_in = 0;
	  /* next output byte should be put there */
	  this.output = null; // JS specific, because we have no pointers
	  this.next_out = 0;
	  /* remaining free space at output */
	  this.avail_out = 0;
	  /* total number of bytes output so far */
	  this.total_out = 0;
	  /* last error message, NULL if no error */
	  this.msg = ''/*Z_NULL*/;
	  /* not visible by applications */
	  this.state = null;
	  /* best guess about the data type: binary or text */
	  this.data_type = 2/*Z_UNKNOWN*/;
	  /* adler32 value of the uncompressed data */
	  this.adler = 0;
	}

	module.exports = ZStream;

	},{}],54:[function(require,module,exports){
	module.exports = typeof setImmediate === 'function' ? setImmediate :
		function setImmediate() {
			var args = [].slice.apply(arguments);
			args.splice(1, 0, 0);
			setTimeout.apply(null, args);
		};

	},{}]},{},[10])(10)
	});
	});

	/**
	 * Handles Unzipping a requesting files from an Epub Archive
	 * @class
	 */
	class Archive {

		constructor() {
			this.zip = undefined;
			this.urlCache = {};

			this.checkRequirements();
		}

		/**
	  * Checks to see if JSZip exists in global namspace,
	  * Requires JSZip if it isn't there
	  * @private
	  */
		checkRequirements() {
			try {
				this.zip = new jszip();
			} catch (e) {
				throw new Error("JSZip lib not loaded");
			}
		}

		/**
	  * Open an archive
	  * @param  {binary} input
	  * @param  {boolean} isBase64 tells JSZip if the input data is base64 encoded
	  * @return {Promise} zipfile
	  */
		open(input, isBase64) {
			return this.zip.loadAsync(input, { "base64": isBase64 });
		}

		/**
	  * Load and Open an archive
	  * @param  {string} zipUrl
	  * @param  {boolean} isBase64 tells JSZip if the input data is base64 encoded
	  * @return {Promise} zipfile
	  */
		openUrl(zipUrl, isBase64) {
			return request(zipUrl, "binary").then(function (data) {
				return this.zip.loadAsync(data, { "base64": isBase64 });
			}.bind(this));
		}

		/**
	  * Request a url from the archive
	  * @param  {string} url  a url to request from the archive
	  * @param  {string} [type] specify the type of the returned result
	  * @return {Promise}
	  */
		request(url, type$$1) {
			var deferred = new defer();
			var response;
			var path = new Path(url);

			// If type isn't set, determine it from the file extension
			if (!type$$1) {
				type$$1 = path.extension;
			}

			if (type$$1 == "blob") {
				response = this.getBlob(url);
			} else {
				response = this.getText(url);
			}

			if (response) {
				response.then(function (r) {
					let result = this.handleResponse(r, type$$1);
					deferred.resolve(result);
				}.bind(this));
			} else {
				deferred.reject({
					message: "File not found in the epub: " + url,
					stack: new Error().stack
				});
			}
			return deferred.promise;
		}

		/**
	  * Handle the response from request
	  * @private
	  * @param  {any} response
	  * @param  {string} [type]
	  * @return {any} the parsed result
	  */
		handleResponse(response, type$$1) {
			var r;

			if (type$$1 == "json") {
				r = JSON.parse(response);
			} else if (isXml(type$$1)) {
				r = parse$1(response, "text/xml");
			} else if (type$$1 == "xhtml") {
				r = parse$1(response, "application/xhtml+xml");
			} else if (type$$1 == "html" || type$$1 == "htm") {
				r = parse$1(response, "text/html");
			} else {
				r = response;
			}

			return r;
		}

		/**
	  * Get a Blob from Archive by Url
	  * @param  {string} url
	  * @param  {string} [mimeType]
	  * @return {Blob}
	  */
		getBlob(url, mimeType) {
			var decodededUrl = decodeURIComponent(url.substr(1)); // Remove first slash
			var entry = this.zip.file(decodededUrl);

			if (entry) {
				mimeType = mimeType || mime.lookup(entry.name);
				return entry.async("uint8array").then(function (uint8array) {
					return new Blob([uint8array], { type: mimeType });
				});
			}
		}

		/**
	  * Get Text from Archive by Url
	  * @param  {string} url
	  * @param  {string} [encoding]
	  * @return {string}
	  */
		getText(url, encoding) {
			var decodededUrl = decodeURIComponent(url.substr(1)); // Remove first slash
			var entry = this.zip.file(decodededUrl);

			if (entry) {
				return entry.async("string").then(function (text) {
					return text;
				});
			}
		}

		/**
	  * Get a base64 encoded result from Archive by Url
	  * @param  {string} url
	  * @param  {string} [mimeType]
	  * @return {string} base64 encoded
	  */
		getBase64(url, mimeType) {
			var decodededUrl = decodeURIComponent(url.substr(1)); // Remove first slash
			var entry = this.zip.file(decodededUrl);

			if (entry) {
				mimeType = mimeType || mime.lookup(entry.name);
				return entry.async("base64").then(function (data) {
					return "data:" + mimeType + ";base64," + data;
				});
			}
		}

		/**
	  * Create a Url from an unarchived item
	  * @param  {string} url
	  * @param  {object} [options.base64] use base64 encoding or blob url
	  * @return {Promise} url promise with Url string
	  */
		createUrl(url, options) {
			var deferred = new defer();
			//var _URL = window.URL || window.webkitURL || window.mozURL;
			var tempUrl;
			var response;
			var useBase64 = options && options.base64;

			if (url in this.urlCache) {
				deferred.resolve(this.urlCache[url]);
				return deferred.promise;
			}

			if (useBase64) {
				response = this.getBase64(url);

				if (response) {
					response.then(function (tempUrl) {

						this.urlCache[url] = tempUrl;
						deferred.resolve(tempUrl);
					}.bind(this));
				}
			} else {

				response = this.getBlob(url);

				if (response) {
					response.then(function (blob) {

						tempUrl = URL.createObjectURL(blob);
						this.urlCache[url] = tempUrl;
						deferred.resolve(tempUrl);
					}.bind(this));
				}
			}

			if (!response) {
				deferred.reject({
					message: "File not found in the epub: " + url,
					stack: new Error().stack
				});
			}

			return deferred.promise;
		}

		/**
	  * Revoke Temp Url for a achive item
	  * @param  {string} url url of the item in the archive
	  */
		revokeUrl(url) {
			//var _URL = _URL || window.webkitURL || window.mozURL;
			var fromCache = this.urlCache[url];
			if (fromCache) URL.revokeObjectURL(fromCache);
		}

		destroy() {
			// var _URL = window.URL || window.webkitURL || window.mozURL;
			for (let fromCache in this.urlCache) {
				URL.revokeObjectURL(fromCache);
			}
			this.zip = undefined;
			this.urlCache = {};
		}
	}

	const CONTAINER_PATH = "META-INF/container.xml";

	const INPUT_TYPE = {
		BINARY: "binary",
		BASE64: "base64",
		EPUB: "epub",
		OPF: "opf",
		MANIFEST: "json",
		DIRECTORY: "directory"
	};

	/**
	 * An Epub representation with methods for the parsing of its contents.
	 * @class
	 * @param {string} [url]
	 * @param {object} [options]
	 * @param {method} [options.requestMethod] a request function to use instead of the default
	 * @param {boolean} [options.requestCredentials=undefined] send the xhr request withCredentials
	 * @param {object} [options.requestHeaders=undefined] send the xhr request headers
	 * @param {string} [options.encoding=binary] optional to pass 'binary' or base64' for archived Epubs
	 * @param {string} [options.replacements] use base64, blobUrl, or none for replacing assets in archived Epubs
	 * @param {method} [options.cache] use cache to save book contents for a service workers
	 * @returns {Epub}
	 * @example new Epub("/path/to/book.epub", {})
	 * @example new Epub({ replacements: "blobUrl" })
	 */
	class Epub {
		constructor(url, options) {
			// Allow passing just options to the Book
			if (typeof options === "undefined" && typeof url === "object") {
				options = url;
				url = undefined;
			}

			this.settings = extend(this.settings || {}, {
				requestMethod: undefined,
				requestCredentials: undefined,
				requestHeaders: undefined,
				encoding: undefined,
				replacements: undefined,
				cache: undefined,
				stylesheet: null,
				script: null
			});

			extend(this.settings, options);

			this.opening = new defer();
			/**
	   * @member {promise} opened returns after the book is loaded
	   * @memberof Book
	   */
			this.opened = this.opening.promise;
			this.isOpen = false;

			this.book = undefined;

			/**
	   * @member {promise} ready returns after the book is loaded and parsed
	   * @memberof Book
	   * @private
	   */
			this.ready = this.opened.then(() => {
				this.manifest = this.book.toJSON();
				this.emit(EVENTS.BOOK.READY, this.manifest);
				return this.book;
			});

			/**
	   * @member {method} request
	   * @memberof Epub
	   * @private
	   */
			this.request = this.settings.requestMethod || request;

			/**
	   * @member {boolean} archived
	   * @memberof Epub
	   * @private
	   */
			this.archived = false;

			/**
	   * @member {Container} container
	   * @memberof Epub
	   * @private
	   */
			this.container = undefined;

			/**
	   * @member {Packaging} packaging
	   * @memberof Epub
	   * @private
	   */
			this.packaging = undefined;

			/**
	   * @member {Locations} locations
	   * @memberof Epub
	   * @private
	   */
			this.locations = undefined;

			/**
	  * @member {PageList} pagelist
	  * @memberof Epub
	  */
			this.pageList = undefined;

			if (url) {
				this.open(url).catch(error => {
					var err = new Error("Cannot load book at " + url);
					this.emit(EVENTS.BOOK.OPEN_FAILED, err);
					console.error(error);
				});
			}
		}

		/**
	  * Open a epub or url
	  * @param {string | ArrayBuffer} input Url, Path or ArrayBuffer
	  * @param {string} [what="binary", "base64", "epub", "opf", "json", "directory"] force opening as a certain type
	  * @returns {Promise} of when the book has been loaded
	  * @example book.open("/path/to/book.epub")
	  */
		open(input, what) {
			let opening;
			let type$$1 = what || this.determineType(input);
			let inputLocation;

			// For browsers
			if (typeof window !== "undefined") {
				inputLocation = window.location.href;
			}

			// For web workers
			if (typeof self !== "undefined") {
				inputLocation = self.location.href;
			}

			if (type$$1 === INPUT_TYPE.BINARY) {
				this.archived = true;
				this.url = new Url("/", "");
				this.locationUrl = new Url(inputLocation);
				opening = this.openEpub(input);
			} else if (type$$1 === INPUT_TYPE.BASE64) {
				this.archived = true;
				this.url = new Url("/", "");
				this.locationUrl = new Url(inputLocation);
				opening = this.openEpub(input, type$$1);
			} else if (type$$1 === INPUT_TYPE.EPUB) {
				this.archived = true;
				this.url = new Url("/", "");
				this.locationUrl = new Url(input, inputLocation);
				opening = this.request(input, "binary").then(this.openEpub.bind(this));
			} else if (type$$1 == INPUT_TYPE.OPF) {
				this.url = new Url(input);
				this.locationUrl = new Url(input);
				opening = this.openPackaging(this.url.Path.toString());
			} else if (type$$1 == INPUT_TYPE.MANIFEST) {
				this.url = new Url(input);
				this.locationUrl = new Url(input);
				opening = this.openManifest(this.url.Path.toString());
			} else {
				this.url = new Url(input);
				this.locationUrl = new Url(input);
				opening = this.openContainer(CONTAINER_PATH).then(this.openPackaging.bind(this));
			}

			return opening.then(packaging => {
				return this.unpack(packaging);
			});
		}

		/**
	  * Open an archived epub
	  * @private
	  * @param  {binary} data
	  * @param  {string} [encoding]
	  * @return {Promise}
	  */
		openEpub(data, encoding) {
			return this.unarchive(data, encoding || this.settings.encoding).then(() => {
				return this.openContainer(CONTAINER_PATH);
			}).then(packagePath => {
				return this.openPackaging(packagePath);
			});
		}

		/**
	  * Open the epub container
	  * @private
	  * @param  {string} url
	  * @return {string} packagePath
	  */
		openContainer(url) {
			return this.load(url).then(xml => {
				this.container = new Container(xml);
				return this.resolve(this.container.packagePath);
			});
		}

		/**
	  * Open the Open Packaging Format Xml
	  * @private
	  * @param  {string} url
	  * @return {Promise}
	  */
		openPackaging(url) {
			this.path = new Path(url);
			return this.load(url).then(xml => {
				this.packaging = new Packaging(xml);
				return this.packaging;
			});
		}

		/**
	  * Open the manifest JSON
	  * @private
	  * @param  {string} url
	  * @return {Promise}
	  */
		openManifest(url) {
			this.path = new Path(url);
			return this.load(url).then(json => {
				this.packaging = new Packaging();
				this.packaging.load(json);
				return this.packaging;
			});
		}

		/**
	  * Load a resource from the Book
	  * @private
	  * @param  {string} path path to the resource to load
	  * @return {Promise}     returns a promise with the requested resource
	  */
		load(path, type$$1) {
			var resolved;

			if (this.archived) {
				resolved = this.resolve(path);
				return this.archive.request(resolved, type$$1);
			} else {
				resolved = this.resolve(path);
				return this.request(resolved, type$$1, this.settings.requestCredentials, this.settings.requestHeaders);
			}
		}

		/**
	  * Resolve a path to it's absolute position in the Book
	  * @private
	  * @param  {string} path
	  * @param  {boolean} [absolute] force resolving the full URL
	  * @return {string}          the resolved path string
	  */
		resolve(path, absolute) {
			if (!path) {
				return;
			}
			let resolved = path;
			let isAbsolute = path.indexOf("://") > -1;

			if (isAbsolute) {
				return path;
			}

			if (this.path) {
				resolved = this.path.resolve(path);
			}

			if (absolute != false && this.url) {
				resolved = this.url.resolve(resolved);
			}

			return resolved;
		}

		/**
	  * Determine the type of they input passed to open
	  * @private
	  * @param  {string} input
	  * @return {string}  binary | directory | epub | opf
	  */
		determineType(input) {
			var url;
			var path;
			var extension;

			if (this.settings.encoding === "base64") {
				return INPUT_TYPE.BASE64;
			}

			if (typeof input != "string") {
				return INPUT_TYPE.BINARY;
			}

			url = new Url(input);
			path = url.path();
			extension = path.extension;

			if (!extension) {
				return INPUT_TYPE.DIRECTORY;
			}

			if (extension === "epub") {
				return INPUT_TYPE.EPUB;
			}

			if (extension === "opf") {
				return INPUT_TYPE.OPF;
			}

			if (extension === "json") {
				return INPUT_TYPE.MANIFEST;
			}
		}

		/**
	  * unpack the contents of the Packaging
	  * @private
	  * @param {document} packageXml XML Document
	  */
		unpack(packaging) {
			this.package = packaging;

			let url;
			let path = this.path.toString();
			if (this.archived) {
				url = new Url(path, "");
			} else if (this.url) {
				url = this.url.resolve(path);
			} else {
				url = new Url(path);
			}

			this.resources = new Resources(this.package.manifest, {
				archive: this.archive,
				url: url,
				load: this.load.bind(this),
				replacements: this.settings.replacements,
				inject: {
					script: this.settings.script,
					stylesheet: this.settings.stylesheet,
					identifer: this.package.metadata.identifier
				}
			});

			let processed = [];
			let crossdomain = url.origin !== location.origin;

			// If caches doesn't exist, use replacements instead
			if (typeof caches === "undefined") {
				this.settings.replacements = true;
				this.settings.cache = false;
			}

			// If we are using a worker and cache isn't set,
			// we should cache the resources if we can
			if (typeof this.settings.cache === "undefined" && this.settings.worker) {
				this.settings.cache = true;
			}

			// If the resource is Cross Domain, and we aren't using cache then
			// replacements are needed.
			if ((crossdomain || this.archived) && !this.settings.worker && !this.settings.cache && typeof this.settings.replacements === "undefined") {
				this.settings.replacements = true;
			}

			if (this.settings.cache && typeof caches != "undefined") {

				let uriComponent;
				let cached;
				let key;

				if (this.archived) {
					uriComponent = encodeURIComponent(this.locationUrl.toString());
					key = "epubjs-zip/";
					url = new Url(key + uriComponent + path, location.href);
					cached = this.resources.cache(key, url.toString());

					this.cacheUrl = url;
				} else if (crossdomain) {
					uriComponent = encodeURIComponent(this.locationUrl.origin);
					key = "epubjs-proxy/";
					url = new Url(key + uriComponent + path, location.href);
					cached = this.resources.cache(key, url.toString());

					this.cacheUrl = url;
				}

				// Wait for injection (not handled in service worker)
				if (this.settings.script || this.settings.stylesheet) {
					processed.push(cached);
				}
			}

			if (this.settings.replacements) {
				let replacements = this.resources.replacements();
				processed.push(replacements);
			}

			return Promise.all(processed).then(() => {
				return this.loadNavigation(this.package).then(() => {
					return this.navigation;
				});
			}).then(() => {
				this.isOpen = true;

				// Remove zip after cached
				// if (this.archive) {
				// 	this.archive.destroy();
				// }

				this.book = this.toBook();

				// Resolve book opened promise
				this.opening.resolve(this);

				return this.book;
			}).catch(err => {
				console.error(err);
			});
		}

		cache(key, url, crossdomain) {
			if (!key) {
				key = this.key();
			}

			return this.resources.cache(key, url, crossdomain).then(() => {
				this.book = this.toBook();
				return this.book;
			}).catch(err => {
				console.error(err);
			});
		}

		replacements() {
			return this.resources.replacements().then(() => {
				this.book = this.toBook();
				return this.book;
			}).catch(err => {
				console.error(err);
			});
		}

		/**
	  * Load Navigation and PageList from package
	  * @private
	  * @param {document} opf XML Document
	  */
		loadNavigation(opf) {
			let navPath = opf.navPath || opf.ncxPath;
			let toc = opf.toc;

			if (!navPath) {
				return new Promise((resolve, reject) => {
					this.navigation = new Navigation$1(null);
					this.pageList = new PageList();

					resolve(this.navigation);
				});
			}

			return this.load(navPath, "xml").then(xml => {
				this.navigation = new Navigation$1(xml, this.resolve(navPath));
				this.pageList = new PageList(xml);
				return this.navigation;
			});
		}

		/**
	  * Set if request should use withCredentials
	  * @param {boolean} credentials
	  */
		setRequestCredentials(credentials) {
			this.settings.requestCredentials = credentials;
		}

		/**
	  * Set headers request should use
	  * @param {object} headers
	  */
		setRequestHeaders(headers) {
			this.settings.requestHeaders = headers;
		}

		/**
	  * Unarchive a zipped epub
	  * @private
	  * @param  {binary} input epub data
	  * @param  {string} [encoding]
	  * @return {Archive}
	  */
		unarchive(input, encoding) {
			this.archive = new Archive();
			return this.archive.open(input, encoding);
		}

		generateLocations(breakPoint) {
			if (!this.book) {
				return;
			}
			if (!this.locations) {
				this.locations = new Locations();
			}
			return this.locations.generate(this.book.sections, breakPoint).then(locations => {
				book.locations = locations;
				return locations;
			});
		}

		loadLocations(json) {
			let locations;
			if (!this.book) {
				return;
			}

			if (!this.locations) {
				this.locations = new Locations();
			}

			if (typeof locations === "string") {
				locations = JSON.parse(json);
			} else {
				locations = json;
			}

			this.book.locations = locations;

			return locations;
		}

		/**
	  * Generates the Book Key using the identifer in the manifest or other string provided
	  * @param  {string} [identifier] to use instead of metadata identifier
	  * @return {string} key
	  */
		key(identifier) {
			var ident = identifier || this.package.metadata.identifier || this.url.filename;
			return `epubjs-${EPUBJS_VERSION}-${ident}`;
		}

		toBook() {
			let resolver = this.resources.resolve.bind(this.resources);

			let book = new Book();

			book.url = "";

			if (this.cacheUrl) {
				book.url = this.cacheUrl.resolve("manifest.json");
			} else {
				book.url = this.locationUrl.resolve("manifest.json");
			}

			if (this.archived) {
				book.source = this.locationUrl.toString();
			}

			book.resources = this.resources.toArray();

			book.spine = this.package.spine.map((item, index) => {
				let resource = this.resources.get(item.idref) || item;
				let url = this.resources.resolve(resource.href);

				// Remove from resources array
				let i = book.resources.findIndex(r => {
					return r.id === resource.id;
				});

				if (i > -1) {
					book.resources.splice(i, 1);
				}

				item.index = index;
				item.cfiBase = new EpubCFI().generateChapterComponent(this.package.spineNodeIndex, item.index, item.idref);

				if (resource) {
					item.source = resource.href;
					item.href = url;
					item.type = resource.type;

					if (resource.properties && resource.properties.length) {
						item.properties.push.apply(item.properties, resource.properties);
					}
				}

				return item;
			});

			book.metadata = this.package.metadata;

			if (this.navigation) {
				book.toc = this.navigation.getTocArray(resolver);
				book.landmarks = this.navigation.getLandmarksArray(resolver);
			}

			if (this.pageList) {
				book.pages = this.pageList.toArray();
			}

			if (this.locations) {
				book.locations = this.locations.toArray();
			}

			return book;
		}

		/**
	  * Destroy the Book and all associated objects
	  */
		destroy() {
			this.opened = undefined;
			this.loading = undefined;
			this.loaded = undefined;
			this.ready = undefined;

			this.isOpen = false;
			this.isRendered = false; //TODO: ?

			this.book && this.book.destroy();
			this.locations && this.locations.destroy();
			this.pageList && this.pageList.destroy();
			this.archive && this.archive.destroy();
			this.resources && this.resources.destroy();
			this.container && this.container.destroy();
			this.packaging && this.packaging.destroy();

			this.spine = undefined;
			this.locations = undefined;
			this.pageList = undefined;
			this.archive = undefined;
			this.resources = undefined;
			this.container = undefined;
			this.packaging = undefined;

			this.navigation = undefined;
			this.url = undefined;
			this.path = undefined;
			this.archived = false;
		}
	}

	eventEmitter(Epub.prototype);

	const DEV = false;

	let CACHES = {
		resources: 'epubjs-resources'
	};

	class EpubWorker {
		constructor() {
			self.addEventListener("message", this.onMessage.bind(this));

			self.addEventListener('install', this.onInstall.bind(this));
			self.addEventListener('fetch', this.onFetch.bind(this));
			self.addEventListener('activate', this.onActivate.bind(this));

			this.epub = undefined;
		}

		onInstall(event) {
			DEV && console.log('[install] Kicking off service worker registration!');
			event.waitUntil(self.skipWaiting());
		}

		onActivate(event) {
			// Claim the service work for this client, forcing `controllerchange` event
			DEV && console.log('[activate] Claiming this service worker!');

			event.waitUntil(clients.claim().then(function () {
				// After the activation and claiming is complete, send a message to each of the controlled
				// pages letting it know that it's active.
				// This will trigger navigator.serviceWorker.onmessage in each client.
				return self.clients.matchAll().then(function (clients) {
					return Promise.all(clients.map(function (client) {
						return client.postMessage({ msg: 'active' });
					}));
				});
			}));
		}

		onFetch(event) {
			event.respondWith(caches.match(event.request).then(response => {
				// Cache hit - return the response from the cached version
				if (response) {
					DEV && console.log('[fetch] Returning from Service Worker cache: ', event.request.url, response.ok);
					return response;
				}

				let fromZip = event.request.url.indexOf("epubjs-zip/");
				if (fromZip > -1) {
					return this.loadFromZip(event.request);
				}

				let fromProxy = event.request.url.indexOf("epubjs-proxy/");
				if (fromProxy > -1) {
					return this.loadFromProxy(event.request);
				}

				// Not in cache - return the result from the live server
				DEV && console.log('[fetch] Returning from server: ', event.request.url);
				return fetch(event.request);
			}));
		}

		onMessage(event) {
			let { data } = event;
			if (typeof data === "string") {
				data = JSON.parse(data);
			}

			DEV && console.log("[worker]", data);

			switch (data.method) {
				case "init":
					this.init(data);
					break;
				case "destroy":
					this.epub && this.epub.destroy();
					self.close();
					break;
				case "add":
					this.add(event);
					break;
				case "open":
					if (this.epub) {
						this.epub.open.apply(this.epub, data.args).then(book => {
							let manifest = book.toJSON();
							this.respond(data.method, manifest, data.promise);
						});
					}
					break;
				default:
					if (this.epub) {
						let r = this.epub[data.method].apply(this.epub, data.args);
						Promise.resolve(r).then(result => {
							if (typeof result.toJSON === "function") {
								result = result.toJSON();
							}
							this.respond(data.method, result, data.promise);
						});
					}
			}
		}

		respond(method, result, promise, asJson) {
			let response = {
				method: method,
				promise: promise,
				value: result
			};

			if (asJson) {
				response = JSON.stringify(response);
			}

			self.postMessage(response);
		}

		init(data) {
			let options, url;

			if (data.args.length > 1) {
				url = data.args[0];
				options = data.args[1];
			} else {
				options = data.args[0];
			}

			if (typeof options.cache === "undefined") {
				options.cache = true;
			}

			if (url) {
				this.epub = new Epub(url, options);
			} else {
				this.epub = new Epub(options);
			}

			this.epub.on(EVENTS.BOOK.READY, manifest => {
				self.postMessage({ eventName: "ready", value: manifest });
			});
			this.epub.on(EVENTS.BOOK.OPEN_FAILED, error => {
				self.postMessage({ eventName: "failed", error: error.message });
			});
		}

		add(event) {
			let resources = event.data.resources;
			let key = event.data.key || CACHES['resources'];
			if (!key in CACHES) {
				CACHES[key] = key;
			}
			// Open the given cache with the keys
			let added = caches.open(CACHES[key]).then(cache => {
				// Process each item in the resources
				let mapped = resources.map(item => {
					let href = item.href;
					// Check if the href is already cached
					return cache.match(href).then(response => {
						if (!response) {
							// If not found, fetch the resource and store it
							let request = new Request(href, { mode: 'no-cors' });
							return fetch(request).then(function (response) {
								if (response.ok) {
									return cache.put(href, response);
								}
							});
						}
					});
				});
				return Promise.all(mapped);
			});

			event.waitUntil(added);
		}

		loadFromZip(originalRequest) {
			let divider = "epubjs-zip/";
			let start = originalRequest.url.indexOf(divider) + divider.length;
			let chunks = originalRequest.url.substring(start).split("/");
			let cacheName = chunks.shift();
			let url = decodeURIComponent(cacheName);
			let path = decodeURIComponent(chunks.join("/"));
			let mimeType = "text/plain";
			let entry;

			if (this.zip) {
				entry = this.zip.file(path);
				mimeType = mime.lookup(entry.name);

				return entry.async("arraybuffer").then(file => {
					let zipResponse = new Response(file, {
						"status": 200,
						"headers": { 'Content-Type': mimeType }
					});
					let zipResponseClone = zipResponse.clone();
					caches.open(cacheName).then(cache => {
						return cache.put(originalRequest.url, zipResponseClone);
					}).then(() => {
						console.log("from cached zip");
					});
					return zipResponse;
				});
			} else {
				this.zip = new jszip();
				return fetch(url).then(epubResponse => {
					return epubResponse.arrayBuffer();
				}).then(buffer => {
					return this.zip.loadAsync(buffer);
				}).then(() => {
					entry = this.zip.file(path);
					mimeType = mime.lookup(entry.name);
					return entry.async("arraybuffer");
				}).then(file => {
					let zipResponse = new Response(file, {
						"status": 200,
						"headers": { 'Content-Type': mimeType }
					});
					let zipResponseClone = zipResponse.clone();
					caches.open(cacheName).then(cache => {
						return cache.put(originalRequest.url, zipResponseClone);
					}).then(() => {
						console.log("loaded from zip & cached");
					});
					return zipResponse;
				});
			}
		}

		loadFromProxy(originalRequest) {
			let divider = "epubjs-proxy/";
			let start = originalRequest.url.indexOf(divider) + divider.length;
			let chunks = originalRequest.url.substring(start).split("/");

			let cacheName = chunks.shift();
			let url = decodeURIComponent(cacheName);
			let path = decodeURIComponent(chunks.join("/"));
			let mimeType = mime.lookup(chunks[chunks.length - 1]);

			return fetch(url + "/" + path).then(fromProxy => {
				return fromProxy.arrayBuffer();
			}).then(file => {
				let proxyResponse = new Response(file, {
					"status": 200,
					"headers": { 'Content-Type': mimeType }
				});
				let proxyResponseClone = proxyResponse.clone();
				caches.open(cacheName).then(cache => {
					return cache.put(originalRequest.url, proxyResponseClone);
				});
				return proxyResponse;
			});
		}
	}

	new EpubWorker();

})));
//# sourceMappingURL=epub.worker.js.map
