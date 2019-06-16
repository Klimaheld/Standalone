/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
(function (global, factory) {
    console.log("jquery ready!");
    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {

        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

    // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

    // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
    // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
    // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
    // enough that all such attempts are guarded in a try block.
    "use strict";

    var arr = [];

    var document = window.document;

    var getProto = Object.getPrototypeOf;

    var slice = arr.slice;

    var concat = arr.concat;

    var push = arr.push;

    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var fnToString = hasOwn.toString;

    var ObjectFunctionString = fnToString.call(Object);

    var support = {};

    var isFunction = function isFunction(obj) {

        // Support: Chrome <=57, Firefox <=52
        // In some browsers, typeof returns "function" for HTML <object> elements
        // (i.e., `typeof document.createElement( "object" ) === "function"`).
        // We don't want to classify *any* DOM node as a function.
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };


    var isWindow = function isWindow(obj) {
        return obj != null && obj === obj.window;
    };




    var preservedScriptAttributes = {
        type: true,
        src: true,
        noModule: true
    };

    function DOMEval(code, doc, node) {
        doc = doc || document;

        var i,
            script = doc.createElement("script");

        script.text = code;
        if (node) {
            for (i in preservedScriptAttributes) {
                if (node[i]) {
                    script[i] = node[i];
                }
            }
        }
        doc.head.appendChild(script).parentNode.removeChild(script);
    }


    function toType(obj) {
        if (obj == null) {
            return obj + "";
        }

        // Support: Android <=2.3 only (functionish RegExp)
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    }
    /* global Symbol */
    // Defining this global in .eslintrc.json would create a danger of using the global
    // unguarded in another place, it seems safer to define global only for this module



    var
        version = "3.3.1",

        // Define a local copy of jQuery
        jQuery = function (selector, context) {

            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init(selector, context);
        },

        // Support: Android <=4.0 only
        // Make sure we trim BOM and NBSP
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    jQuery.fn = jQuery.prototype = {

        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function () {
            return slice.call(this);
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function (num) {

            // Return all the elements in a clean array
            if (num == null) {
                return slice.call(this);
            }

            // Return just the one element from the set
            return num < 0 ? this[num + this.length] : this[num];
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function (elems) {

            // Build a new jQuery matched element set
            var ret = jQuery.merge(this.constructor(), elems);

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;

            // Return the newly-formed element set
            return ret;
        },

        // Execute a callback for every element in the matched set.
        each: function (callback) {
            return jQuery.each(this, callback);
        },

        map: function (callback) {
            return this.pushStack(jQuery.map(this, function (elem, i) {
                return callback.call(elem, i, elem);
            }));
        },

        slice: function () {
            return this.pushStack(slice.apply(this, arguments));
        },

        first: function () {
            return this.eq(0);
        },

        last: function () {
            return this.eq(-1);
        },

        eq: function (i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },

        end: function () {
            return this.prevObject || this.constructor();
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: arr.sort,
        splice: arr.splice
    };

    jQuery.extend = jQuery.fn.extend = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // Skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !isFunction(target)) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {

            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {

                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (jQuery.isPlainObject(copy) ||
                        (copyIsArray = Array.isArray(copy)))) {

                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = jQuery.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend({

        // Unique for each copy of jQuery on the page
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function (msg) {
            throw new Error(msg);
        },

        noop: function () { },

        isPlainObject: function (obj) {
            var proto, Ctor;

            // Detect obvious negatives
            // Use toString instead of jQuery.type to catch host objects
            if (!obj || toString.call(obj) !== "[object Object]") {
                return false;
            }

            proto = getProto(obj);

            // Objects with no prototype (e.g., `Object.create( null )`) are plain
            if (!proto) {
                return true;
            }

            // Objects with prototype are plain iff they were constructed by a global Object function
            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },

        isEmptyObject: function (obj) {

            /* eslint-disable no-unused-vars */
            // See https://github.com/eslint/eslint/issues/6125
            var name;

            for (name in obj) {
                return false;
            }
            return true;
        },

        // Evaluates a script in a global context
        globalEval: function (code) {
            DOMEval(code);
        },

        each: function (obj, callback) {
            var length, i = 0;

            if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }

            return obj;
        },

        // Support: Android <=4.0 only
        trim: function (text) {
            return text == null ?
                "" :
                (text + "").replace(rtrim, "");
        },

        // results is for internal usage only
        makeArray: function (arr, results) {
            var ret = results || [];

            if (arr != null) {
                if (isArrayLike(Object(arr))) {
                    jQuery.merge(ret,
                        typeof arr === "string" ?
                            [arr] : arr
                    );
                } else {
                    push.call(ret, arr);
                }
            }

            return ret;
        },

        inArray: function (elem, arr, i) {
            return arr == null ? -1 : indexOf.call(arr, elem, i);
        },

        // Support: Android <=4.0 only, PhantomJS 1 only
        // push.apply(_, arraylike) throws on ancient WebKit
        merge: function (first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;

            for (; j < len; j++) {
                first[i++] = second[j];
            }

            first.length = i;

            return first;
        },

        grep: function (elems, callback, invert) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }

            return matches;
        },

        // arg is for internal usage only
        map: function (elems, callback, arg) {
            var length, value,
                i = 0,
                ret = [];

            // Go through the array, translating each of the items to their new values
            if (isArrayLike(elems)) {
                length = elems.length;
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }

                // Go through every key on the object,
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }
            }

            // Flatten any nested arrays
            return concat.apply([], ret);
        },

        // A global GUID counter for objects
        guid: 1,

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    });

    if (typeof Symbol === "function") {
        jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
    }

    // Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
        function (i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });

    function isArrayLike(obj) {

        // Support: real iOS 8.2 only (not reproducible in simulator)
        // `in` check used to prevent JIT error (gh-2145)
        // hasOwn isn't used here due to false negatives
        // regarding Nodelist length in IE
        var length = !!obj && "length" in obj && obj.length,
            type = toType(obj);

        if (isFunction(obj) || isWindow(obj)) {
            return false;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    }
    var Sizzle =
        /*!
         * Sizzle CSS Selector Engine v2.3.3
         * https://sizzlejs.com/
         *
         * Copyright jQuery Foundation and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2016-08-08
         */
        (function (window) {

            var i,
                support,
                Expr,
                getText,
                isXML,
                tokenize,
                compile,
                select,
                outermostContext,
                sortInput,
                hasDuplicate,

                // Local document vars
                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,

                // Instance-specific data
                expando = "sizzle" + 1 * new Date(),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function (a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                    }
                    return 0;
                },

                // Instance methods
                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
                // Use a stripped-down indexOf as it's faster than native
                // https://jsperf.com/thor-indexof-vs-for/5
                indexOf = function (list, elem) {
                    var i = 0,
                        len = list.length;
                    for (; i < len; i++) {
                        if (list[i] === elem) {
                            return i;
                        }
                    }
                    return -1;
                },

                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

                // Regular expressions

                // http://www.w3.org/TR/css3-selectors/#whitespace
                whitespace = "[\\x20\\t\\r\\n\\f]",

                // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
                identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

                // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
                attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
                    // Operator (capture 2)
                    "*([*^$|!~]?=)" + whitespace +
                    // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
                    "*\\]",

                pseudos = ":(" + identifier + ")(?:\\((" +
                    // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                    // 1. quoted (capture 3; capture 4 or capture 5)
                    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                    // 2. simple (capture 6)
                    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                    // 3. anything else (capture 2)
                    ".*" +
                    ")\\)|)",

                // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                rwhitespace = new RegExp(whitespace + "+", "g"),
                rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

                rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),

                rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),

                rpseudo = new RegExp(pseudos),
                ridentifier = new RegExp("^" + identifier + "$"),

                matchExpr = {
                    "ID": new RegExp("^#(" + identifier + ")"),
                    "CLASS": new RegExp("^\\.(" + identifier + ")"),
                    "TAG": new RegExp("^(" + identifier + "|[*])"),
                    "ATTR": new RegExp("^" + attributes),
                    "PSEUDO": new RegExp("^" + pseudos),
                    "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                        "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                        "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                    "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                    // For use in libraries implementing .is()
                    // We use this for POS matching in `select`
                    "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                },

                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,

                rnative = /^[^{]+\{\s*\[native \w/,

                // Easily-parseable/retrievable ID or TAG or CLASS selectors
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                rsibling = /[+~]/,

                // CSS escapes
                // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
                funescape = function (_, escaped, escapedWhitespace) {
                    var high = "0x" + escaped - 0x10000;
                    // NaN means non-codepoint
                    // Support: Firefox<24
                    // Workaround erroneous numeric interpretation of +"0x"
                    return high !== high || escapedWhitespace ?
                        escaped :
                        high < 0 ?
                            // BMP codepoint
                            String.fromCharCode(high + 0x10000) :
                            // Supplemental Plane codepoint (surrogate pair)
                            String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
                },

                // CSS string/identifier serialization
                // https://drafts.csswg.org/cssom/#common-serializing-idioms
                rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                fcssescape = function (ch, asCodePoint) {
                    if (asCodePoint) {

                        // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                        if (ch === "\0") {
                            return "\uFFFD";
                        }

                        // Control characters and (dependent upon position) numbers get escaped as code points
                        return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
                    }

                    // Other potentially-special ASCII characters get backslash-escaped
                    return "\\" + ch;
                },

                // Used for iframes
                // See setDocument()
                // Removing the function wrapper causes a "Permission Denied"
                // error in IE
                unloadHandler = function () {
                    setDocument();
                },

                disabledAncestor = addCombinator(
                    function (elem) {
                        return elem.disabled === true && ("form" in elem || "label" in elem);
                    },
                    { dir: "parentNode", next: "legend" }
                );

            // Optimize for push.apply( _, NodeList )
            try {
                push.apply(
                    (arr = slice.call(preferredDoc.childNodes)),
                    preferredDoc.childNodes
                );
                // Support: Android<4.0
                // Detect silently failing push.apply
                arr[preferredDoc.childNodes.length].nodeType;
            } catch (e) {
                push = {
                    apply: arr.length ?

                        // Leverage slice if possible
                        function (target, els) {
                            push_native.apply(target, slice.call(els));
                        } :

                        // Support: IE<9
                        // Otherwise append directly
                        function (target, els) {
                            var j = target.length,
                                i = 0;
                            // Can't trust NodeList.length
                            while ((target[j++] = els[i++])) { }
                            target.length = j - 1;
                        }
                };
            }

            function Sizzle(selector, context, results, seed) {
                var m, i, elem, nid, match, groups, newSelector,
                    newContext = context && context.ownerDocument,

                    // nodeType defaults to 9, since context defaults to document
                    nodeType = context ? context.nodeType : 9;

                results = results || [];

                // Return early from calls with invalid selector or context
                if (typeof selector !== "string" || !selector ||
                    nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

                    return results;
                }

                // Try to shortcut find operations (as opposed to filters) in HTML documents
                if (!seed) {

                    if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                        setDocument(context);
                    }
                    context = context || document;

                    if (documentIsHTML) {

                        // If the selector is sufficiently simple, try using a "get*By*" DOM method
                        // (excepting DocumentFragment context, where the methods don't exist)
                        if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

                            // ID selector
                            if ((m = match[1])) {

                                // Document context
                                if (nodeType === 9) {
                                    if ((elem = context.getElementById(m))) {

                                        // Support: IE, Opera, Webkit
                                        // TODO: identify versions
                                        // getElementById can match elements by name instead of ID
                                        if (elem.id === m) {
                                            results.push(elem);
                                            return results;
                                        }
                                    } else {
                                        return results;
                                    }

                                    // Element context
                                } else {

                                    // Support: IE, Opera, Webkit
                                    // TODO: identify versions
                                    // getElementById can match elements by name instead of ID
                                    if (newContext && (elem = newContext.getElementById(m)) &&
                                        contains(context, elem) &&
                                        elem.id === m) {

                                        results.push(elem);
                                        return results;
                                    }
                                }

                                // Type selector
                            } else if (match[2]) {
                                push.apply(results, context.getElementsByTagName(selector));
                                return results;

                                // Class selector
                            } else if ((m = match[3]) && support.getElementsByClassName &&
                                context.getElementsByClassName) {

                                push.apply(results, context.getElementsByClassName(m));
                                return results;
                            }
                        }

                        // Take advantage of querySelectorAll
                        if (support.qsa &&
                            !compilerCache[selector + " "] &&
                            (!rbuggyQSA || !rbuggyQSA.test(selector))) {

                            if (nodeType !== 1) {
                                newContext = context;
                                newSelector = selector;

                                // qSA looks outside Element context, which is not what we want
                                // Thanks to Andrew Dupont for this workaround technique
                                // Support: IE <=8
                                // Exclude object elements
                            } else if (context.nodeName.toLowerCase() !== "object") {

                                // Capture the context ID, setting it first if necessary
                                if ((nid = context.getAttribute("id"))) {
                                    nid = nid.replace(rcssescape, fcssescape);
                                } else {
                                    context.setAttribute("id", (nid = expando));
                                }

                                // Prefix every selector in the list
                                groups = tokenize(selector);
                                i = groups.length;
                                while (i--) {
                                    groups[i] = "#" + nid + " " + toSelector(groups[i]);
                                }
                                newSelector = groups.join(",");

                                // Expand context for sibling selectors
                                newContext = rsibling.test(selector) && testContext(context.parentNode) ||
                                    context;
                            }

                            if (newSelector) {
                                try {
                                    push.apply(results,
                                        newContext.querySelectorAll(newSelector)
                                    );
                                    return results;
                                } catch (qsaError) {
                                } finally {
                                    if (nid === expando) {
                                        context.removeAttribute("id");
                                    }
                                }
                            }
                        }
                    }
                }

                // All others
                return select(selector.replace(rtrim, "$1"), context, results, seed);
            }

            /**
             * Create key-value caches of limited size
             * @returns {function(string, object)} Returns the Object data after storing it on itself with
             *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
             *	deleting the oldest entry
             */
            function createCache() {
                var keys = [];

                function cache(key, value) {
                    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                    if (keys.push(key + " ") > Expr.cacheLength) {
                        // Only keep the most recent entries
                        delete cache[keys.shift()];
                    }
                    return (cache[key + " "] = value);
                }
                return cache;
            }

            /**
             * Mark a function for special use by Sizzle
             * @param {Function} fn The function to mark
             */
            function markFunction(fn) {
                fn[expando] = true;
                return fn;
            }

            /**
             * Support testing using an element
             * @param {Function} fn Passed the created element and returns a boolean result
             */
            function assert(fn) {
                var el = document.createElement("fieldset");

                try {
                    return !!fn(el);
                } catch (e) {
                    return false;
                } finally {
                    // Remove from its parent by default
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                    // release memory in IE
                    el = null;
                }
            }

            /**
             * Adds the same handler for all of the specified attrs
             * @param {String} attrs Pipe-separated list of attributes
             * @param {Function} handler The method that will be applied
             */
            function addHandle(attrs, handler) {
                var arr = attrs.split("|"),
                    i = arr.length;

                while (i--) {
                    Expr.attrHandle[arr[i]] = handler;
                }
            }

            /**
             * Checks document order of two siblings
             * @param {Element} a
             * @param {Element} b
             * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
             */
            function siblingCheck(a, b) {
                var cur = b && a,
                    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                        a.sourceIndex - b.sourceIndex;

                // Use IE sourceIndex if available on both nodes
                if (diff) {
                    return diff;
                }

                // Check if b follows a
                if (cur) {
                    while ((cur = cur.nextSibling)) {
                        if (cur === b) {
                            return -1;
                        }
                    }
                }

                return a ? 1 : -1;
            }

            /**
             * Returns a function to use in pseudos for input types
             * @param {String} type
             */
            function createInputPseudo(type) {
                return function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for buttons
             * @param {String} type
             */
            function createButtonPseudo(type) {
                return function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for :enabled/:disabled
             * @param {Boolean} disabled true for :disabled; false for :enabled
             */
            function createDisabledPseudo(disabled) {

                // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
                return function (elem) {

                    // Only certain elements can match :enabled or :disabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
                    if ("form" in elem) {

                        // Check for inherited disabledness on relevant non-disabled elements:
                        // * listed form-associated elements in a disabled fieldset
                        //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
                        // * option elements in a disabled optgroup
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
                        // All such elements have a "form" property.
                        if (elem.parentNode && elem.disabled === false) {

                            // Option elements defer to a parent optgroup if present
                            if ("label" in elem) {
                                if ("label" in elem.parentNode) {
                                    return elem.parentNode.disabled === disabled;
                                } else {
                                    return elem.disabled === disabled;
                                }
                            }

                            // Support: IE 6 - 11
                            // Use the isDisabled shortcut property to check for disabled fieldset ancestors
                            return elem.isDisabled === disabled ||

                                // Where there is no isDisabled, check manually
                                /* jshint -W018 */
                                elem.isDisabled !== !disabled &&
                                disabledAncestor(elem) === disabled;
                        }

                        return elem.disabled === disabled;

                        // Try to winnow out elements that can't be disabled before trusting the disabled property.
                        // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
                        // even exist on them, let alone have a boolean value.
                    } else if ("label" in elem) {
                        return elem.disabled === disabled;
                    }

                    // Remaining elements are neither :enabled nor :disabled
                    return false;
                };
            }

            /**
             * Returns a function to use in pseudos for positionals
             * @param {Function} fn
             */
            function createPositionalPseudo(fn) {
                return markFunction(function (argument) {
                    argument = +argument;
                    return markFunction(function (seed, matches) {
                        var j,
                            matchIndexes = fn([], seed.length, argument),
                            i = matchIndexes.length;

                        // Match elements found at the specified indexes
                        while (i--) {
                            if (seed[(j = matchIndexes[i])]) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }

            /**
             * Checks a node for validity as a Sizzle context
             * @param {Element|Object=} context
             * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
             */
            function testContext(context) {
                return context && typeof context.getElementsByTagName !== "undefined" && context;
            }

            // Expose support vars for convenience
            support = Sizzle.support = {};

            /**
             * Detects XML nodes
             * @param {Element|Object} elem An element or a document
             * @returns {Boolean} True iff elem is a non-HTML XML node
             */
            isXML = Sizzle.isXML = function (elem) {
                // documentElement is verified for cases where it doesn't yet exist
                // (such as loading iframes in IE - #4833)
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            };

            /**
             * Sets document-related variables once based on the current document
             * @param {Element|Object} [doc] An element or document object to use to set the document
             * @returns {Object} Returns the current document
             */
            setDocument = Sizzle.setDocument = function (node) {
                var hasCompare, subWindow,
                    doc = node ? node.ownerDocument || node : preferredDoc;

                // Return early if doc is invalid or already selected
                if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                    return document;
                }

                // Update global variables
                document = doc;
                docElem = document.documentElement;
                documentIsHTML = !isXML(document);

                // Support: IE 9-11, Edge
                // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
                if (preferredDoc !== document &&
                    (subWindow = document.defaultView) && subWindow.top !== subWindow) {

                    // Support: IE 11, Edge
                    if (subWindow.addEventListener) {
                        subWindow.addEventListener("unload", unloadHandler, false);

                        // Support: IE 9 - 10 only
                    } else if (subWindow.attachEvent) {
                        subWindow.attachEvent("onunload", unloadHandler);
                    }
                }

                /* Attributes
                ---------------------------------------------------------------------- */

                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties
                // (excepting IE8 booleans)
                support.attributes = assert(function (el) {
                    el.className = "i";
                    return !el.getAttribute("className");
                });

                /* getElement(s)By*
                ---------------------------------------------------------------------- */

                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function (el) {
                    el.appendChild(document.createComment(""));
                    return !el.getElementsByTagName("*").length;
                });

                // Support: IE<9
                support.getElementsByClassName = rnative.test(document.getElementsByClassName);

                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programmatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function (el) {
                    docElem.appendChild(el).id = expando;
                    return !document.getElementsByName || !document.getElementsByName(expando).length;
                });

                // ID filter and find
                if (support.getById) {
                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                    Expr.find["ID"] = function (id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var elem = context.getElementById(id);
                            return elem ? [elem] : [];
                        }
                    };
                } else {
                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            var node = typeof elem.getAttributeNode !== "undefined" &&
                                elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };

                    // Support: IE 6 - 7 only
                    // getElementById is not reliable as a find shortcut
                    Expr.find["ID"] = function (id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var node, i, elems,
                                elem = context.getElementById(id);

                            if (elem) {

                                // Verify the id attribute
                                node = elem.getAttributeNode("id");
                                if (node && node.value === id) {
                                    return [elem];
                                }

                                // Fall back on getElementsByName
                                elems = context.getElementsByName(id);
                                i = 0;
                                while ((elem = elems[i++])) {
                                    node = elem.getAttributeNode("id");
                                    if (node && node.value === id) {
                                        return [elem];
                                    }
                                }
                            }

                            return [];
                        }
                    };
                }

                // Tag
                Expr.find["TAG"] = support.getElementsByTagName ?
                    function (tag, context) {
                        if (typeof context.getElementsByTagName !== "undefined") {
                            return context.getElementsByTagName(tag);

                            // DocumentFragment nodes don't have gEBTN
                        } else if (support.qsa) {
                            return context.querySelectorAll(tag);
                        }
                    } :

                    function (tag, context) {
                        var elem,
                            tmp = [],
                            i = 0,
                            // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                            results = context.getElementsByTagName(tag);

                        // Filter out possible comments
                        if (tag === "*") {
                            while ((elem = results[i++])) {
                                if (elem.nodeType === 1) {
                                    tmp.push(elem);
                                }
                            }

                            return tmp;
                        }
                        return results;
                    };

                // Class
                Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
                    if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                        return context.getElementsByClassName(className);
                    }
                };

                /* QSA/matchesSelector
                ---------------------------------------------------------------------- */

                // QSA and matchesSelector support

                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];

                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See https://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];

                if ((support.qsa = rnative.test(document.querySelectorAll))) {
                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    assert(function (el) {
                        // Select is set to empty string on purpose
                        // This is to test IE's treatment of not explicitly
                        // setting a boolean content attribute,
                        // since its presence should be enough
                        // https://bugs.jquery.com/ticket/12359
                        docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" +
                            "<select id='" + expando + "-\r\\' msallowcapture=''>" +
                            "<option selected=''></option></select>";

                        // Support: IE8, Opera 11-12.16
                        // Nothing should be selected when empty strings follow ^= or $= or *=
                        // The test attribute must be unknown in Opera but "safe" for WinRT
                        // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                        if (el.querySelectorAll("[msallowcapture^='']").length) {
                            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                        }

                        // Support: IE8
                        // Boolean attributes and "value" are not treated correctly
                        if (!el.querySelectorAll("[selected]").length) {
                            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                        }

                        // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
                        if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                            rbuggyQSA.push("~=");
                        }

                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here and will not see later tests
                        if (!el.querySelectorAll(":checked").length) {
                            rbuggyQSA.push(":checked");
                        }

                        // Support: Safari 8+, iOS 8+
                        // https://bugs.webkit.org/show_bug.cgi?id=136851
                        // In-page `selector#id sibling-combinator selector` fails
                        if (!el.querySelectorAll("a#" + expando + "+*").length) {
                            rbuggyQSA.push(".#.+[+~]");
                        }
                    });

                    assert(function (el) {
                        el.innerHTML = "<a href='' disabled='disabled'></a>" +
                            "<select disabled='disabled'><option/></select>";

                        // Support: Windows 8 Native Apps
                        // The type and name attributes are restricted during .innerHTML assignment
                        var input = document.createElement("input");
                        input.setAttribute("type", "hidden");
                        el.appendChild(input).setAttribute("name", "D");

                        // Support: IE8
                        // Enforce case-sensitivity of name attribute
                        if (el.querySelectorAll("[name=d]").length) {
                            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                        }

                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here and will not see later tests
                        if (el.querySelectorAll(":enabled").length !== 2) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }

                        // Support: IE9-11+
                        // IE's :disabled selector does not pick up the children of disabled fieldsets
                        docElem.appendChild(el).disabled = true;
                        if (el.querySelectorAll(":disabled").length !== 2) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }

                        // Opera 10-11 does not throw on post-comma invalid pseudos
                        el.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:");
                    });
                }

                if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
                    docElem.webkitMatchesSelector ||
                    docElem.mozMatchesSelector ||
                    docElem.oMatchesSelector ||
                    docElem.msMatchesSelector)))) {

                    assert(function (el) {
                        // Check to see if it's possible to do matchesSelector
                        // on a disconnected node (IE 9)
                        support.disconnectedMatch = matches.call(el, "*");

                        // This should fail with an exception
                        // Gecko does not error, returns false instead
                        matches.call(el, "[s!='']:x");
                        rbuggyMatches.push("!=", pseudos);
                    });
                }

                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

                /* Contains
                ---------------------------------------------------------------------- */
                hasCompare = rnative.test(docElem.compareDocumentPosition);

                // Element contains another
                // Purposefully self-exclusive
                // As in, an element does not contain itself
                contains = hasCompare || rnative.test(docElem.contains) ?
                    function (a, b) {
                        var adown = a.nodeType === 9 ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !!(bup && bup.nodeType === 1 && (
                            adown.contains ?
                                adown.contains(bup) :
                                a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
                        ));
                    } :
                    function (a, b) {
                        if (b) {
                            while ((b = b.parentNode)) {
                                if (b === a) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };

                /* Sorting
                ---------------------------------------------------------------------- */

                // Document order sorting
                sortOrder = hasCompare ?
                    function (a, b) {

                        // Flag for duplicate removal
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }

                        // Sort on method existence if only one input has compareDocumentPosition
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if (compare) {
                            return compare;
                        }

                        // Calculate position if both inputs belong to the same document
                        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ?
                            a.compareDocumentPosition(b) :

                            // Otherwise we know they are disconnected
                            1;

                        // Disconnected nodes
                        if (compare & 1 ||
                            (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

                            // Choose the first element that is related to our preferred document
                            if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                                return -1;
                            }
                            if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                                return 1;
                            }

                            // Maintain original order
                            return sortInput ?
                                (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                                0;
                        }

                        return compare & 4 ? -1 : 1;
                    } :
                    function (a, b) {
                        // Exit early if the nodes are identical
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }

                        var cur,
                            i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [a],
                            bp = [b];

                        // Parentless nodes are either documents or disconnected
                        if (!aup || !bup) {
                            return a === document ? -1 :
                                b === document ? 1 :
                                    aup ? -1 :
                                        bup ? 1 :
                                            sortInput ?
                                                (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                                                0;

                            // If the nodes are siblings, we can do a quick check
                        } else if (aup === bup) {
                            return siblingCheck(a, b);
                        }

                        // Otherwise we need full lists of their ancestors for comparison
                        cur = a;
                        while ((cur = cur.parentNode)) {
                            ap.unshift(cur);
                        }
                        cur = b;
                        while ((cur = cur.parentNode)) {
                            bp.unshift(cur);
                        }

                        // Walk down the tree looking for a discrepancy
                        while (ap[i] === bp[i]) {
                            i++;
                        }

                        return i ?
                            // Do a sibling check if the nodes have a common ancestor
                            siblingCheck(ap[i], bp[i]) :

                            // Otherwise nodes in our document sort first
                            ap[i] === preferredDoc ? -1 :
                                bp[i] === preferredDoc ? 1 :
                                    0;
                    };

                return document;
            };

            Sizzle.matches = function (expr, elements) {
                return Sizzle(expr, null, null, elements);
            };

            Sizzle.matchesSelector = function (elem, expr) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem);
                }

                // Make sure that attribute selectors are quoted
                expr = expr.replace(rattributeQuotes, "='$1']");

                if (support.matchesSelector && documentIsHTML &&
                    !compilerCache[expr + " "] &&
                    (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
                    (!rbuggyQSA || !rbuggyQSA.test(expr))) {

                    try {
                        var ret = matches.call(elem, expr);

                        // IE 9's matchesSelector returns false on disconnected nodes
                        if (ret || support.disconnectedMatch ||
                            // As well, disconnected nodes are said to be in a document
                            // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11) {
                            return ret;
                        }
                    } catch (e) { }
                }

                return Sizzle(expr, document, null, [elem]).length > 0;
            };

            Sizzle.contains = function (context, elem) {
                // Set document vars if needed
                if ((context.ownerDocument || context) !== document) {
                    setDocument(context);
                }
                return contains(context, elem);
            };

            Sizzle.attr = function (elem, name) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem);
                }

                var fn = Expr.attrHandle[name.toLowerCase()],
                    // Don't get fooled by Object.prototype properties (jQuery #13807)
                    val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
                        fn(elem, name, !documentIsHTML) :
                        undefined;

                return val !== undefined ?
                    val :
                    support.attributes || !documentIsHTML ?
                        elem.getAttribute(name) :
                        (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null;
            };

            Sizzle.escape = function (sel) {
                return (sel + "").replace(rcssescape, fcssescape);
            };

            Sizzle.error = function (msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg);
            };

            /**
             * Document sorting and removing duplicates
             * @param {ArrayLike} results
             */
            Sizzle.uniqueSort = function (results) {
                var elem,
                    duplicates = [],
                    j = 0,
                    i = 0;

                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice(0);
                results.sort(sortOrder);

                if (hasDuplicate) {
                    while ((elem = results[i++])) {
                        if (elem === results[i]) {
                            j = duplicates.push(i);
                        }
                    }
                    while (j--) {
                        results.splice(duplicates[j], 1);
                    }
                }

                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;

                return results;
            };

            /**
             * Utility function for retrieving the text value of an array of DOM nodes
             * @param {Array|Element} elem
             */
            getText = Sizzle.getText = function (elem) {
                var node,
                    ret = "",
                    i = 0,
                    nodeType = elem.nodeType;

                if (!nodeType) {
                    // If no nodeType, this is expected to be an array
                    while ((node = elem[i++])) {
                        // Do not traverse comment nodes
                        ret += getText(node);
                    }
                } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (jQuery #11153)
                    if (typeof elem.textContent === "string") {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem);
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes

                return ret;
            };

            Expr = Sizzle.selectors = {

                // Can be adjusted by the user
                cacheLength: 50,

                createPseudo: markFunction,

                match: matchExpr,

                attrHandle: {},

                find: {},

                relative: {
                    ">": { dir: "parentNode", first: true },
                    " ": { dir: "parentNode" },
                    "+": { dir: "previousSibling", first: true },
                    "~": { dir: "previousSibling" }
                },

                preFilter: {
                    "ATTR": function (match) {
                        match[1] = match[1].replace(runescape, funescape);

                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

                        if (match[2] === "~=") {
                            match[3] = " " + match[3] + " ";
                        }

                        return match.slice(0, 4);
                    },

                    "CHILD": function (match) {
                        /* matches from matchExpr["CHILD"]
                            1 type (only|nth|...)
                            2 what (child|of-type)
                            3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                            4 xn-component of xn+y argument ([+-]?\d*n|)
                            5 sign of xn-component
                            6 x of xn-component
                            7 sign of y-component
                            8 y of y-component
                        */
                        match[1] = match[1].toLowerCase();

                        if (match[1].slice(0, 3) === "nth") {
                            // nth-* requires argument
                            if (!match[3]) {
                                Sizzle.error(match[0]);
                            }

                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                            match[5] = +((match[7] + match[8]) || match[3] === "odd");

                            // other types prohibit arguments
                        } else if (match[3]) {
                            Sizzle.error(match[0]);
                        }

                        return match;
                    },

                    "PSEUDO": function (match) {
                        var excess,
                            unquoted = !match[6] && match[2];

                        if (matchExpr["CHILD"].test(match[0])) {
                            return null;
                        }

                        // Accept quoted arguments as-is
                        if (match[3]) {
                            match[2] = match[4] || match[5] || "";

                            // Strip excess characters from unquoted arguments
                        } else if (unquoted && rpseudo.test(unquoted) &&
                            // Get excess from tokenize (recursively)
                            (excess = tokenize(unquoted, true)) &&
                            // advance to the next closing parenthesis
                            (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

                            // excess is a negative index
                            match[0] = match[0].slice(0, excess);
                            match[2] = unquoted.slice(0, excess);
                        }

                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice(0, 3);
                    }
                },

                filter: {

                    "TAG": function (nodeNameSelector) {
                        var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                        return nodeNameSelector === "*" ?
                            function () { return true; } :
                            function (elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                    },

                    "CLASS": function (className) {
                        var pattern = classCache[className + " "];

                        return pattern ||
                            (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
                            classCache(className, function (elem) {
                                return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
                            });
                    },

                    "ATTR": function (name, operator, check) {
                        return function (elem) {
                            var result = Sizzle.attr(elem, name);

                            if (result == null) {
                                return operator === "!=";
                            }
                            if (!operator) {
                                return true;
                            }

                            result += "";

                            return operator === "=" ? result === check :
                                operator === "!=" ? result !== check :
                                    operator === "^=" ? check && result.indexOf(check) === 0 :
                                        operator === "*=" ? check && result.indexOf(check) > -1 :
                                            operator === "$=" ? check && result.slice(-check.length) === check :
                                                operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 :
                                                    operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                                                        false;
                        };
                    },

                    "CHILD": function (type, what, argument, first, last) {
                        var simple = type.slice(0, 3) !== "nth",
                            forward = type.slice(-4) !== "last",
                            ofType = what === "of-type";

                        return first === 1 && last === 0 ?

                            // Shortcut for :nth-*(n)
                            function (elem) {
                                return !!elem.parentNode;
                            } :

                            function (elem, context, xml) {
                                var cache, uniqueCache, outerCache, node, nodeIndex, start,
                                    dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType,
                                    diff = false;

                                if (parent) {

                                    // :(first|last|only)-(child|of-type)
                                    if (simple) {
                                        while (dir) {
                                            node = elem;
                                            while ((node = node[dir])) {
                                                if (ofType ?
                                                    node.nodeName.toLowerCase() === name :
                                                    node.nodeType === 1) {

                                                    return false;
                                                }
                                            }
                                            // Reverse direction for :only-* (if we haven't yet done so)
                                            start = dir = type === "only" && !start && "nextSibling";
                                        }
                                        return true;
                                    }

                                    start = [forward ? parent.firstChild : parent.lastChild];

                                    // non-xml :nth-child(...) stores cache data on `parent`
                                    if (forward && useCache) {

                                        // Seek `elem` from a previously-cached index

                                        // ...in a gzip-friendly way
                                        node = parent;
                                        outerCache = node[expando] || (node[expando] = {});

                                        // Support: IE <9 only
                                        // Defend against cloned attroperties (jQuery gh-1709)
                                        uniqueCache = outerCache[node.uniqueID] ||
                                            (outerCache[node.uniqueID] = {});

                                        cache = uniqueCache[type] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = nodeIndex && cache[2];
                                        node = nodeIndex && parent.childNodes[nodeIndex];

                                        while ((node = ++nodeIndex && node && node[dir] ||

                                            // Fallback to seeking `elem` from the start
                                            (diff = nodeIndex = 0) || start.pop())) {

                                            // When found, cache indexes on `parent` and break
                                            if (node.nodeType === 1 && ++diff && node === elem) {
                                                uniqueCache[type] = [dirruns, nodeIndex, diff];
                                                break;
                                            }
                                        }

                                    } else {
                                        // Use previously-cached element index if available
                                        if (useCache) {
                                            // ...in a gzip-friendly way
                                            node = elem;
                                            outerCache = node[expando] || (node[expando] = {});

                                            // Support: IE <9 only
                                            // Defend against cloned attroperties (jQuery gh-1709)
                                            uniqueCache = outerCache[node.uniqueID] ||
                                                (outerCache[node.uniqueID] = {});

                                            cache = uniqueCache[type] || [];
                                            nodeIndex = cache[0] === dirruns && cache[1];
                                            diff = nodeIndex;
                                        }

                                        // xml :nth-child(...)
                                        // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                        if (diff === false) {
                                            // Use the same loop as above to seek `elem` from the start
                                            while ((node = ++nodeIndex && node && node[dir] ||
                                                (diff = nodeIndex = 0) || start.pop())) {

                                                if ((ofType ?
                                                    node.nodeName.toLowerCase() === name :
                                                    node.nodeType === 1) &&
                                                    ++diff) {

                                                    // Cache the index of each encountered element
                                                    if (useCache) {
                                                        outerCache = node[expando] || (node[expando] = {});

                                                        // Support: IE <9 only
                                                        // Defend against cloned attroperties (jQuery gh-1709)
                                                        uniqueCache = outerCache[node.uniqueID] ||
                                                            (outerCache[node.uniqueID] = {});

                                                        uniqueCache[type] = [dirruns, diff];
                                                    }

                                                    if (node === elem) {
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    // Incorporate the offset, then check against cycle size
                                    diff -= last;
                                    return diff === first || (diff % first === 0 && diff / first >= 0);
                                }
                            };
                    },

                    "PSEUDO": function (pseudo, argument) {
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args,
                            fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                                Sizzle.error("unsupported pseudo: " + pseudo);

                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        if (fn[expando]) {
                            return fn(argument);
                        }

                        // But maintain support for old signatures
                        if (fn.length > 1) {
                            args = [pseudo, pseudo, "", argument];
                            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                                markFunction(function (seed, matches) {
                                    var idx,
                                        matched = fn(seed, argument),
                                        i = matched.length;
                                    while (i--) {
                                        idx = indexOf(seed, matched[i]);
                                        seed[idx] = !(matches[idx] = matched[i]);
                                    }
                                }) :
                                function (elem) {
                                    return fn(elem, 0, args);
                                };
                        }

                        return fn;
                    }
                },

                pseudos: {
                    // Potentially complex pseudos
                    "not": markFunction(function (selector) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [],
                            results = [],
                            matcher = compile(selector.replace(rtrim, "$1"));

                        return matcher[expando] ?
                            markFunction(function (seed, matches, context, xml) {
                                var elem,
                                    unmatched = matcher(seed, null, xml, []),
                                    i = seed.length;

                                // Match elements unmatched by `matcher`
                                while (i--) {
                                    if ((elem = unmatched[i])) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) :
                            function (elem, context, xml) {
                                input[0] = elem;
                                matcher(input, null, xml, results);
                                // Don't keep the element (issue #299)
                                input[0] = null;
                                return !results.pop();
                            };
                    }),

                    "has": markFunction(function (selector) {
                        return function (elem) {
                            return Sizzle(selector, elem).length > 0;
                        };
                    }),

                    "contains": markFunction(function (text) {
                        text = text.replace(runescape, funescape);
                        return function (elem) {
                            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                        };
                    }),

                    // "Whether an element is represented by a :lang() selector
                    // is based solely on the element's language value
                    // being equal to the identifier C,
                    // or beginning with the identifier C immediately followed by "-".
                    // The matching of C against the element's language value is performed case-insensitively.
                    // The identifier C does not have to be a valid language name."
                    // http://www.w3.org/TR/selectors/#lang-pseudo
                    "lang": markFunction(function (lang) {
                        // lang value must be a valid identifier
                        if (!ridentifier.test(lang || "")) {
                            Sizzle.error("unsupported lang: " + lang);
                        }
                        lang = lang.replace(runescape, funescape).toLowerCase();
                        return function (elem) {
                            var elemLang;
                            do {
                                if ((elemLang = documentIsHTML ?
                                    elem.lang :
                                    elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                                }
                            } while ((elem = elem.parentNode) && elem.nodeType === 1);
                            return false;
                        };
                    }),

                    // Miscellaneous
                    "target": function (elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id;
                    },

                    "root": function (elem) {
                        return elem === docElem;
                    },

                    "focus": function (elem) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },

                    // Boolean properties
                    "enabled": createDisabledPseudo(false),
                    "disabled": createDisabledPseudo(true),

                    "checked": function (elem) {
                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                    },

                    "selected": function (elem) {
                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if (elem.parentNode) {
                            elem.parentNode.selectedIndex;
                        }

                        return elem.selected === true;
                    },

                    // Contents
                    "empty": function (elem) {
                        // http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                        //   but not by others (comment: 8; processing instruction: 7; etc.)
                        // nodeType < 6 works because attributes (2) do not appear as children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            if (elem.nodeType < 6) {
                                return false;
                            }
                        }
                        return true;
                    },

                    "parent": function (elem) {
                        return !Expr.pseudos["empty"](elem);
                    },

                    // Element/input types
                    "header": function (elem) {
                        return rheader.test(elem.nodeName);
                    },

                    "input": function (elem) {
                        return rinputs.test(elem.nodeName);
                    },

                    "button": function (elem) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },

                    "text": function (elem) {
                        var attr;
                        return elem.nodeName.toLowerCase() === "input" &&
                            elem.type === "text" &&

                            // Support: IE<8
                            // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                            ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                    },

                    // Position-in-collection
                    "first": createPositionalPseudo(function () {
                        return [0];
                    }),

                    "last": createPositionalPseudo(function (matchIndexes, length) {
                        return [length - 1];
                    }),

                    "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
                        return [argument < 0 ? argument + length : argument];
                    }),

                    "even": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 0;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "odd": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 1;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; --i >= 0;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; ++i < length;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    })
                }
            };

            Expr.pseudos["nth"] = Expr.pseudos["eq"];

            // Add button/input type pseudos
            for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
                Expr.pseudos[i] = createInputPseudo(i);
            }
            for (i in { submit: true, reset: true }) {
                Expr.pseudos[i] = createButtonPseudo(i);
            }

            // Easy API for creating new setFilters
            function setFilters() { }
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();

            tokenize = Sizzle.tokenize = function (selector, parseOnly) {
                var matched, match, tokens, type,
                    soFar, groups, preFilters,
                    cached = tokenCache[selector + " "];

                if (cached) {
                    return parseOnly ? 0 : cached.slice(0);
                }

                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;

                while (soFar) {

                    // Comma and first run
                    if (!matched || (match = rcomma.exec(soFar))) {
                        if (match) {
                            // Don't consume trailing commas as valid
                            soFar = soFar.slice(match[0].length) || soFar;
                        }
                        groups.push((tokens = []));
                    }

                    matched = false;

                    // Combinators
                    if ((match = rcombinators.exec(soFar))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            // Cast descendant combinators to space
                            type: match[0].replace(rtrim, " ")
                        });
                        soFar = soFar.slice(matched.length);
                    }

                    // Filters
                    for (type in Expr.filter) {
                        if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                            (match = preFilters[type](match)))) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice(matched.length);
                        }
                    }

                    if (!matched) {
                        break;
                    }
                }

                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly ?
                    soFar.length :
                    soFar ?
                        Sizzle.error(selector) :
                        // Cache the tokens
                        tokenCache(selector, groups).slice(0);
            };

            function toSelector(tokens) {
                var i = 0,
                    len = tokens.length,
                    selector = "";
                for (; i < len; i++) {
                    selector += tokens[i].value;
                }
                return selector;
            }

            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir,
                    skip = combinator.next,
                    key = skip || dir,
                    checkNonElements = base && key === "parentNode",
                    doneName = done++;

                return combinator.first ?
                    // Check against closest ancestor/preceding element
                    function (elem, context, xml) {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                return matcher(elem, context, xml);
                            }
                        }
                        return false;
                    } :

                    // Check against all ancestor/preceding elements
                    function (elem, context, xml) {
                        var oldCache, uniqueCache, outerCache,
                            newCache = [dirruns, doneName];

                        // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
                        if (xml) {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    if (matcher(elem, context, xml)) {
                                        return true;
                                    }
                                }
                            }
                        } else {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    outerCache = elem[expando] || (elem[expando] = {});

                                    // Support: IE <9 only
                                    // Defend against cloned attroperties (jQuery gh-1709)
                                    uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

                                    if (skip && skip === elem.nodeName.toLowerCase()) {
                                        elem = elem[dir] || elem;
                                    } else if ((oldCache = uniqueCache[key]) &&
                                        oldCache[0] === dirruns && oldCache[1] === doneName) {

                                        // Assign to newCache so results back-propagate to previous elements
                                        return (newCache[2] = oldCache[2]);
                                    } else {
                                        // Reuse newcache so results back-propagate to previous elements
                                        uniqueCache[key] = newCache;

                                        // A match means we're done; a fail means we have to keep checking
                                        if ((newCache[2] = matcher(elem, context, xml))) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                        return false;
                    };
            }

            function elementMatcher(matchers) {
                return matchers.length > 1 ?
                    function (elem, context, xml) {
                        var i = matchers.length;
                        while (i--) {
                            if (!matchers[i](elem, context, xml)) {
                                return false;
                            }
                        }
                        return true;
                    } :
                    matchers[0];
            }

            function multipleContexts(selector, contexts, results) {
                var i = 0,
                    len = contexts.length;
                for (; i < len; i++) {
                    Sizzle(selector, contexts[i], results);
                }
                return results;
            }

            function condense(unmatched, map, filter, context, xml) {
                var elem,
                    newUnmatched = [],
                    i = 0,
                    len = unmatched.length,
                    mapped = map != null;

                for (; i < len; i++) {
                    if ((elem = unmatched[i])) {
                        if (!filter || filter(elem, context, xml)) {
                            newUnmatched.push(elem);
                            if (mapped) {
                                map.push(i);
                            }
                        }
                    }
                }

                return newUnmatched;
            }

            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                if (postFilter && !postFilter[expando]) {
                    postFilter = setMatcher(postFilter);
                }
                if (postFinder && !postFinder[expando]) {
                    postFinder = setMatcher(postFinder, postSelector);
                }
                return markFunction(function (seed, results, context, xml) {
                    var temp, i, elem,
                        preMap = [],
                        postMap = [],
                        preexisting = results.length,

                        // Get initial elements from seed or context
                        elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

                        // Prefilter to get matcher input, preserving a map for seed-results synchronization
                        matcherIn = preFilter && (seed || !selector) ?
                            condense(elems, preMap, preFilter, context, xml) :
                            elems,

                        matcherOut = matcher ?
                            // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                            postFinder || (seed ? preFilter : preexisting || postFilter) ?

                                // ...intermediate processing is necessary
                                [] :

                                // ...otherwise use results directly
                                results :
                            matcherIn;

                    // Find primary matches
                    if (matcher) {
                        matcher(matcherIn, matcherOut, context, xml);
                    }

                    // Apply postFilter
                    if (postFilter) {
                        temp = condense(matcherOut, postMap);
                        postFilter(temp, [], context, xml);

                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while (i--) {
                            if ((elem = temp[i])) {
                                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                            }
                        }
                    }

                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {
                                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                temp = [];
                                i = matcherOut.length;
                                while (i--) {
                                    if ((elem = matcherOut[i])) {
                                        // Restore matcherIn since elem is not yet a final match
                                        temp.push((matcherIn[i] = elem));
                                    }
                                }
                                postFinder(null, (matcherOut = []), temp, xml);
                            }

                            // Move matched elements from seed to results to keep them synchronized
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i]) &&
                                    (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }

                        // Add elements to results, through postFinder if defined
                    } else {
                        matcherOut = condense(
                            matcherOut === results ?
                                matcherOut.splice(preexisting, matcherOut.length) :
                                matcherOut
                        );
                        if (postFinder) {
                            postFinder(null, results, matcherOut, xml);
                        } else {
                            push.apply(results, matcherOut);
                        }
                    }
                });
            }

            function matcherFromTokens(tokens) {
                var checkContext, matcher, j,
                    len = tokens.length,
                    leadingRelative = Expr.relative[tokens[0].type],
                    implicitRelative = leadingRelative || Expr.relative[" "],
                    i = leadingRelative ? 1 : 0,

                    // The foundational matcher ensures that elements are reachable from top-level context(s)
                    matchContext = addCombinator(function (elem) {
                        return elem === checkContext;
                    }, implicitRelative, true),
                    matchAnyContext = addCombinator(function (elem) {
                        return indexOf(checkContext, elem) > -1;
                    }, implicitRelative, true),
                    matchers = [function (elem, context, xml) {
                        var ret = (!leadingRelative && (xml || context !== outermostContext)) || (
                            (checkContext = context).nodeType ?
                                matchContext(elem, context, xml) :
                                matchAnyContext(elem, context, xml));
                        // Avoid hanging onto element (issue #299)
                        checkContext = null;
                        return ret;
                    }];

                for (; i < len; i++) {
                    if ((matcher = Expr.relative[tokens[i].type])) {
                        matchers = [addCombinator(elementMatcher(matchers), matcher)];
                    } else {
                        matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

                        // Return special upon seeing a positional matcher
                        if (matcher[expando]) {
                            // Find the next relative operator (if any) for proper handling
                            j = ++i;
                            for (; j < len; j++) {
                                if (Expr.relative[tokens[j].type]) {
                                    break;
                                }
                            }
                            return setMatcher(
                                i > 1 && elementMatcher(matchers),
                                i > 1 && toSelector(
                                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                    tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })
                                ).replace(rtrim, "$1"),
                                matcher,
                                i < j && matcherFromTokens(tokens.slice(i, j)),
                                j < len && matcherFromTokens((tokens = tokens.slice(j))),
                                j < len && toSelector(tokens)
                            );
                        }
                        matchers.push(matcher);
                    }
                }

                return elementMatcher(matchers);
            }

            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function (seed, context, xml, results, outermost) {
                        var elem, j, matcher,
                            matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            setMatched = [],
                            contextBackup = outermostContext,
                            // We must always have either seed elements or outermost context
                            elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                            // Use integer dirruns iff this is the outermost matcher
                            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                            len = elems.length;

                        if (outermost) {
                            outermostContext = context === document || context || outermost;
                        }

                        // Add elements passing elementMatchers directly to results
                        // Support: IE<9, Safari
                        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                        for (; i !== len && (elem = elems[i]) != null; i++) {
                            if (byElement && elem) {
                                j = 0;
                                if (!context && elem.ownerDocument !== document) {
                                    setDocument(elem);
                                    xml = !documentIsHTML;
                                }
                                while ((matcher = elementMatchers[j++])) {
                                    if (matcher(elem, context || document, xml)) {
                                        results.push(elem);
                                        break;
                                    }
                                }
                                if (outermost) {
                                    dirruns = dirrunsUnique;
                                }
                            }

                            // Track unmatched elements for set filters
                            if (bySet) {
                                // They will have gone through all possible matchers
                                if ((elem = !matcher && elem)) {
                                    matchedCount--;
                                }

                                // Lengthen the array for every element, matched or not
                                if (seed) {
                                    unmatched.push(elem);
                                }
                            }
                        }

                        // `i` is now the count of elements visited above, and adding it to `matchedCount`
                        // makes the latter nonnegative.
                        matchedCount += i;

                        // Apply set filters to unmatched elements
                        // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
                        // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
                        // no element matchers and no seed.
                        // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
                        // case, which will result in a "00" `matchedCount` that differs from `i` but is also
                        // numerically zero.
                        if (bySet && i !== matchedCount) {
                            j = 0;
                            while ((matcher = setMatchers[j++])) {
                                matcher(unmatched, setMatched, context, xml);
                            }

                            if (seed) {
                                // Reintegrate element matches to eliminate the need for sorting
                                if (matchedCount > 0) {
                                    while (i--) {
                                        if (!(unmatched[i] || setMatched[i])) {
                                            setMatched[i] = pop.call(results);
                                        }
                                    }
                                }

                                // Discard index placeholder values to get only actual matches
                                setMatched = condense(setMatched);
                            }

                            // Add matches to results
                            push.apply(results, setMatched);

                            // Seedless set matches succeeding multiple successful matchers stipulate sorting
                            if (outermost && !seed && setMatched.length > 0 &&
                                (matchedCount + setMatchers.length) > 1) {

                                Sizzle.uniqueSort(results);
                            }
                        }

                        // Override manipulation of globals by nested matchers
                        if (outermost) {
                            dirruns = dirrunsUnique;
                            outermostContext = contextBackup;
                        }

                        return unmatched;
                    };

                return bySet ?
                    markFunction(superMatcher) :
                    superMatcher;
            }

            compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
                var i,
                    setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[selector + " "];

                if (!cached) {
                    // Generate a function of recursive functions that can be used to check each element
                    if (!match) {
                        match = tokenize(selector);
                    }
                    i = match.length;
                    while (i--) {
                        cached = matcherFromTokens(match[i]);
                        if (cached[expando]) {
                            setMatchers.push(cached);
                        } else {
                            elementMatchers.push(cached);
                        }
                    }

                    // Cache the compiled function
                    cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

                    // Save selector and tokenization
                    cached.selector = selector;
                }
                return cached;
            };

            /**
             * A low-level selection function that works with Sizzle's compiled
             *  selector functions
             * @param {String|Function} selector A selector or a pre-compiled
             *  selector function built with Sizzle.compile
             * @param {Element} context
             * @param {Array} [results]
             * @param {Array} [seed] A set of elements to match against
             */
            select = Sizzle.select = function (selector, context, results, seed) {
                var i, tokens, token, type, find,
                    compiled = typeof selector === "function" && selector,
                    match = !seed && tokenize((selector = compiled.selector || selector));

                results = results || [];

                // Try to minimize operations if there is only one selector in the list and no seed
                // (the latter of which guarantees us context)
                if (match.length === 1) {

                    // Reduce context if the leading compound selector is an ID
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                        context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

                        context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                        if (!context) {
                            return results;

                            // Precompiled matchers will still verify ancestry, so step up a level
                        } else if (compiled) {
                            context = context.parentNode;
                        }

                        selector = selector.slice(tokens.shift().value.length);
                    }

                    // Fetch a seed set for right-to-left matching
                    i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                    while (i--) {
                        token = tokens[i];

                        // Abort if we hit a combinator
                        if (Expr.relative[(type = token.type)]) {
                            break;
                        }
                        if ((find = Expr.find[type])) {
                            // Search, expanding context for leading sibling combinators
                            if ((seed = find(
                                token.matches[0].replace(runescape, funescape),
                                rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                            ))) {

                                // If seed is empty or no tokens remain, we can return early
                                tokens.splice(i, 1);
                                selector = seed.length && toSelector(tokens);
                                if (!selector) {
                                    push.apply(results, seed);
                                    return results;
                                }

                                break;
                            }
                        }
                    }
                }

                // Compile and execute a filtering function if one is not provided
                // Provide `match` to avoid retokenization if we modified the selector above
                (compiled || compile(selector, match))(
                    seed,
                    context,
                    !documentIsHTML,
                    results,
                    !context || rsibling.test(selector) && testContext(context.parentNode) || context
                );
                return results;
            };

            // One-time assignments

            // Sort stability
            support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

            // Support: Chrome 14-35+
            // Always assume duplicates if they aren't passed to the comparison function
            support.detectDuplicates = !!hasDuplicate;

            // Initialize against the default document
            setDocument();

            // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
            // Detached nodes confoundingly follow *each other*
            support.sortDetached = assert(function (el) {
                // Should return 1, but returns 4 (following)
                return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
            });

            // Support: IE<8
            // Prevent attribute/property "interpolation"
            // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
            if (!assert(function (el) {
                el.innerHTML = "<a href='#'></a>";
                return el.firstChild.getAttribute("href") === "#";
            })) {
                addHandle("type|href|height|width", function (elem, name, isXML) {
                    if (!isXML) {
                        return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                    }
                });
            }

            // Support: IE<9
            // Use defaultValue in place of getAttribute("value")
            if (!support.attributes || !assert(function (el) {
                el.innerHTML = "<input/>";
                el.firstChild.setAttribute("value", "");
                return el.firstChild.getAttribute("value") === "";
            })) {
                addHandle("value", function (elem, name, isXML) {
                    if (!isXML && elem.nodeName.toLowerCase() === "input") {
                        return elem.defaultValue;
                    }
                });
            }

            // Support: IE<9
            // Use getAttributeNode to fetch booleans when getAttribute lies
            if (!assert(function (el) {
                return el.getAttribute("disabled") == null;
            })) {
                addHandle(booleans, function (elem, name, isXML) {
                    var val;
                    if (!isXML) {
                        return elem[name] === true ? name.toLowerCase() :
                            (val = elem.getAttributeNode(name)) && val.specified ?
                                val.value :
                                null;
                    }
                });
            }

            return Sizzle;

        })(window);



    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;

    // Deprecated
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    jQuery.escapeSelector = Sizzle.escape;




    var dir = function (elem, dir, until) {
        var matched = [],
            truncate = until !== undefined;

        while ((elem = elem[dir]) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
                if (truncate && jQuery(elem).is(until)) {
                    break;
                }
                matched.push(elem);
            }
        }
        return matched;
    };


    var siblings = function (n, elem) {
        var matched = [];

        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
                matched.push(n);
            }
        }

        return matched;
    };


    var rneedsContext = jQuery.expr.match.needsContext;



    function nodeName(elem, name) {

        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

    };
    var rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);



    // Implement the identical functionality for filter and not
    function winnow(elements, qualifier, not) {
        if (isFunction(qualifier)) {
            return jQuery.grep(elements, function (elem, i) {
                return !!qualifier.call(elem, i, elem) !== not;
            });
        }

        // Single element
        if (qualifier.nodeType) {
            return jQuery.grep(elements, function (elem) {
                return (elem === qualifier) !== not;
            });
        }

        // Arraylike of elements (jQuery, arguments, Array)
        if (typeof qualifier !== "string") {
            return jQuery.grep(elements, function (elem) {
                return (indexOf.call(qualifier, elem) > -1) !== not;
            });
        }

        // Filtered directly for both simple and complex selectors
        return jQuery.filter(qualifier, elements, not);
    }

    jQuery.filter = function (expr, elems, not) {
        var elem = elems[0];

        if (not) {
            expr = ":not(" + expr + ")";
        }

        if (elems.length === 1 && elem.nodeType === 1) {
            return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
        }

        return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
            return elem.nodeType === 1;
        }));
    };

    jQuery.fn.extend({
        find: function (selector) {
            var i, ret,
                len = this.length,
                self = this;

            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function () {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }

            ret = this.pushStack([]);

            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }

            return len > 1 ? jQuery.uniqueSort(ret) : ret;
        },
        filter: function (selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        not: function (selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        is: function (selector) {
            return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test(selector) ?
                    jQuery(selector) :
                    selector || [],
                false
            ).length;
        }
    });


    // Initialize a jQuery object


    // A central reference to the root jQuery(document)
    var rootjQuery,

        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        // Strict HTML recognition (#11290: must start with <)
        // Shortcut simple #id case for speed
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

        init = jQuery.fn.init = function (selector, context, root) {
            var match, elem;

            // HANDLE: $(""), $(null), $(undefined), $(false)
            if (!selector) {
                return this;
            }

            // Method init() accepts an alternate rootjQuery
            // so migrate can support jQuery.sub (gh-2101)
            root = root || rootjQuery;

            // Handle HTML strings
            if (typeof selector === "string") {
                if (selector[0] === "<" &&
                    selector[selector.length - 1] === ">" &&
                    selector.length >= 3) {

                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [null, selector, null];

                } else {
                    match = rquickExpr.exec(selector);
                }

                // Match html or make sure no context is specified for #id
                if (match && (match[1] || !context)) {

                    // HANDLE: $(html) -> $(array)
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;

                        // Option to run scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge(this, jQuery.parseHTML(
                            match[1],
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ));

                        // HANDLE: $(html, props)
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {

                                // Properties of context are called as methods if possible
                                if (isFunction(this[match])) {
                                    this[match](context[match]);

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                    } else {
                        elem = document.getElementById(match[2]);

                        if (elem) {

                            // Inject the element directly into the jQuery object
                            this[0] = elem;
                            this.length = 1;
                        }
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if (!context || context.jquery) {
                    return (context || root).find(selector);

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor(context).find(selector);
                }

                // HANDLE: $(DOMElement)
            } else if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                // Shortcut for document ready
            } else if (isFunction(selector)) {
                return root.ready !== undefined ?
                    root.ready(selector) :

                    // Execute immediately if ready is not present
                    selector(jQuery);
            }

            return jQuery.makeArray(selector, this);
        };

    // Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

    // Initialize central reference
    rootjQuery = jQuery(document);


    var rparentsprev = /^(?:parents|prev(?:Until|All))/,

        // Methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };

    jQuery.fn.extend({
        has: function (target) {
            var targets = jQuery(target, this),
                l = targets.length;

            return this.filter(function () {
                var i = 0;
                for (; i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },

        closest: function (selectors, context) {
            var cur,
                i = 0,
                l = this.length,
                matched = [],
                targets = typeof selectors !== "string" && jQuery(selectors);

            // Positional selectors never match, since there's no _selection_ context
            if (!rneedsContext.test(selectors)) {
                for (; i < l; i++) {
                    for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

                        // Always skip document fragments
                        if (cur.nodeType < 11 && (targets ?
                            targets.index(cur) > -1 :

                            // Don't pass non-elements to Sizzle
                            cur.nodeType === 1 &&
                            jQuery.find.matchesSelector(cur, selectors))) {

                            matched.push(cur);
                            break;
                        }
                    }
                }
            }

            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
        },

        // Determine the position of an element within the set
        index: function (elem) {

            // No argument, return index in parent
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
            }

            // Index in selector
            if (typeof elem === "string") {
                return indexOf.call(jQuery(elem), this[0]);
            }

            // Locate the position of the desired element
            return indexOf.call(this,

                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem
            );
        },

        add: function (selector, context) {
            return this.pushStack(
                jQuery.uniqueSort(
                    jQuery.merge(this.get(), jQuery(selector, context))
                )
            );
        },

        addBack: function (selector) {
            return this.add(selector == null ?
                this.prevObject : this.prevObject.filter(selector)
            );
        }
    });

    function sibling(cur, dir) {
        while ((cur = cur[dir]) && cur.nodeType !== 1) { }
        return cur;
    }

    jQuery.each({
        parent: function (elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function (elem) {
            return dir(elem, "parentNode");
        },
        parentsUntil: function (elem, i, until) {
            return dir(elem, "parentNode", until);
        },
        next: function (elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function (elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function (elem) {
            return dir(elem, "nextSibling");
        },
        prevAll: function (elem) {
            return dir(elem, "previousSibling");
        },
        nextUntil: function (elem, i, until) {
            return dir(elem, "nextSibling", until);
        },
        prevUntil: function (elem, i, until) {
            return dir(elem, "previousSibling", until);
        },
        siblings: function (elem) {
            return siblings((elem.parentNode || {}).firstChild, elem);
        },
        children: function (elem) {
            return siblings(elem.firstChild);
        },
        contents: function (elem) {
            if (nodeName(elem, "iframe")) {
                return elem.contentDocument;
            }

            // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
            // Treat the template element as a regular one in browsers that
            // don't support it.
            if (nodeName(elem, "template")) {
                elem = elem.content || elem;
            }

            return jQuery.merge([], elem.childNodes);
        }
    }, function (name, fn) {
        jQuery.fn[name] = function (until, selector) {
            var matched = jQuery.map(this, fn, until);

            if (name.slice(-5) !== "Until") {
                selector = until;
            }

            if (selector && typeof selector === "string") {
                matched = jQuery.filter(selector, matched);
            }

            if (this.length > 1) {

                // Remove duplicates
                if (!guaranteedUnique[name]) {
                    jQuery.uniqueSort(matched);
                }

                // Reverse order for parents* and prev-derivatives
                if (rparentsprev.test(name)) {
                    matched.reverse();
                }
            }

            return this.pushStack(matched);
        };
    });
    var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);



    // Convert String-formatted options into Object-formatted ones
    function createOptions(options) {
        var object = {};
        jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
            object[flag] = true;
        });
        return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function (options) {

        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
            createOptions(options) :
            jQuery.extend({}, options);

        var // Flag to know if list is currently firing
            firing,

            // Last fire value for non-forgettable lists
            memory,

            // Flag to know if list was already fired
            fired,

            // Flag to prevent firing
            locked,

            // Actual callback list
            list = [],

            // Queue of execution data for repeatable lists
            queue = [],

            // Index of currently firing callback (modified by add/remove as needed)
            firingIndex = -1,

            // Fire callbacks
            fire = function () {

                // Enforce single-firing
                locked = locked || options.once;

                // Execute callbacks for all pending executions,
                // respecting firingIndex overrides and runtime changes
                fired = firing = true;
                for (; queue.length; firingIndex = -1) {
                    memory = queue.shift();
                    while (++firingIndex < list.length) {

                        // Run callback and check for early termination
                        if (list[firingIndex].apply(memory[0], memory[1]) === false &&
                            options.stopOnFalse) {

                            // Jump to end and forget the data so .add doesn't re-fire
                            firingIndex = list.length;
                            memory = false;
                        }
                    }
                }

                // Forget the data if we're done with it
                if (!options.memory) {
                    memory = false;
                }

                firing = false;

                // Clean up if we're done firing for good
                if (locked) {

                    // Keep an empty list if we have data for future add calls
                    if (memory) {
                        list = [];

                        // Otherwise, this object is spent
                    } else {
                        list = "";
                    }
                }
            },

            // Actual Callbacks object
            self = {

                // Add a callback or a collection of callbacks to the list
                add: function () {
                    if (list) {

                        // If we have memory from a past run, we should fire after adding
                        if (memory && !firing) {
                            firingIndex = list.length - 1;
                            queue.push(memory);
                        }

                        (function add(args) {
                            jQuery.each(args, function (_, arg) {
                                if (isFunction(arg)) {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (arg && arg.length && toType(arg) !== "string") {

                                    // Inspect recursively
                                    add(arg);
                                }
                            });
                        })(arguments);

                        if (memory && !firing) {
                            fire();
                        }
                    }
                    return this;
                },

                // Remove a callback from the list
                remove: function () {
                    jQuery.each(arguments, function (_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);

                            // Handle firing indexes
                            if (index <= firingIndex) {
                                firingIndex--;
                            }
                        }
                    });
                    return this;
                },

                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function (fn) {
                    return fn ?
                        jQuery.inArray(fn, list) > -1 :
                        list.length > 0;
                },

                // Remove all callbacks from the list
                empty: function () {
                    if (list) {
                        list = [];
                    }
                    return this;
                },

                // Disable .fire and .add
                // Abort any current/pending executions
                // Clear all callbacks and values
                disable: function () {
                    locked = queue = [];
                    list = memory = "";
                    return this;
                },
                disabled: function () {
                    return !list;
                },

                // Disable .fire
                // Also disable .add unless we have memory (since it would have no effect)
                // Abort any pending executions
                lock: function () {
                    locked = queue = [];
                    if (!memory && !firing) {
                        list = memory = "";
                    }
                    return this;
                },
                locked: function () {
                    return !!locked;
                },

                // Call all callbacks with the given context and arguments
                fireWith: function (context, args) {
                    if (!locked) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        queue.push(args);
                        if (!firing) {
                            fire();
                        }
                    }
                    return this;
                },

                // Call all the callbacks with the given arguments
                fire: function () {
                    self.fireWith(this, arguments);
                    return this;
                },

                // To know if the callbacks have already been called at least once
                fired: function () {
                    return !!fired;
                }
            };

        return self;
    };


    function Identity(v) {
        return v;
    }
    function Thrower(ex) {
        throw ex;
    }

    function adoptValue(value, resolve, reject, noValue) {
        var method;

        try {

            // Check for promise aspect first to privilege synchronous behavior
            if (value && isFunction((method = value.promise))) {
                method.call(value).done(resolve).fail(reject);

                // Other thenables
            } else if (value && isFunction((method = value.then))) {
                method.call(value, resolve, reject);

                // Other non-thenables
            } else {

                // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
                // * false: [ value ].slice( 0 ) => resolve( value )
                // * true: [ value ].slice( 1 ) => resolve()
                resolve.apply(undefined, [value].slice(noValue));
            }

            // For Promises/A+, convert exceptions into rejections
            // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
            // Deferred#then to conditionally suppress rejection.
        } catch (value) {

            // Support: Android 4.0 only
            // Strict mode functions invoked without .call/.apply get global-object context
            reject.apply(undefined, [value]);
        }
    }

    jQuery.extend({

        Deferred: function (func) {
            var tuples = [

                // action, add listener, callbacks,
                // ... .then handlers, argument index, [final state]
                ["notify", "progress", jQuery.Callbacks("memory"),
                    jQuery.Callbacks("memory"), 2],
                ["resolve", "done", jQuery.Callbacks("once memory"),
                    jQuery.Callbacks("once memory"), 0, "resolved"],
                ["reject", "fail", jQuery.Callbacks("once memory"),
                    jQuery.Callbacks("once memory"), 1, "rejected"]
            ],
                state = "pending",
                promise = {
                    state: function () {
                        return state;
                    },
                    always: function () {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    "catch": function (fn) {
                        return promise.then(null, fn);
                    },

                    // Keep pipe for back-compat
                    pipe: function ( /* fnDone, fnFail, fnProgress */) {
                        var fns = arguments;

                        return jQuery.Deferred(function (newDefer) {
                            jQuery.each(tuples, function (i, tuple) {

                                // Map tuples (progress, done, fail) to arguments (done, fail, progress)
                                var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];

                                // deferred.progress(function() { bind to newDefer or newDefer.notify })
                                // deferred.done(function() { bind to newDefer or newDefer.resolve })
                                // deferred.fail(function() { bind to newDefer or newDefer.reject })
                                deferred[tuple[1]](function () {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && isFunction(returned.promise)) {
                                        returned.promise()
                                            .progress(newDefer.notify)
                                            .done(newDefer.resolve)
                                            .fail(newDefer.reject);
                                    } else {
                                        newDefer[tuple[0] + "With"](
                                            this,
                                            fn ? [returned] : arguments
                                        );
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    then: function (onFulfilled, onRejected, onProgress) {
                        var maxDepth = 0;
                        function resolve(depth, deferred, handler, special) {
                            return function () {
                                var that = this,
                                    args = arguments,
                                    mightThrow = function () {
                                        var returned, then;

                                        // Support: Promises/A+ section 2.3.3.3.3
                                        // https://promisesaplus.com/#point-59
                                        // Ignore double-resolution attempts
                                        if (depth < maxDepth) {
                                            return;
                                        }

                                        returned = handler.apply(that, args);

                                        // Support: Promises/A+ section 2.3.1
                                        // https://promisesaplus.com/#point-48
                                        if (returned === deferred.promise()) {
                                            throw new TypeError("Thenable self-resolution");
                                        }

                                        // Support: Promises/A+ sections 2.3.3.1, 3.5
                                        // https://promisesaplus.com/#point-54
                                        // https://promisesaplus.com/#point-75
                                        // Retrieve `then` only once
                                        then = returned &&

                                            // Support: Promises/A+ section 2.3.4
                                            // https://promisesaplus.com/#point-64
                                            // Only check objects and functions for thenability
                                            (typeof returned === "object" ||
                                                typeof returned === "function") &&
                                            returned.then;

                                        // Handle a returned thenable
                                        if (isFunction(then)) {

                                            // Special processors (notify) just wait for resolution
                                            if (special) {
                                                then.call(
                                                    returned,
                                                    resolve(maxDepth, deferred, Identity, special),
                                                    resolve(maxDepth, deferred, Thrower, special)
                                                );

                                                // Normal processors (resolve) also hook into progress
                                            } else {

                                                // ...and disregard older resolution values
                                                maxDepth++;

                                                then.call(
                                                    returned,
                                                    resolve(maxDepth, deferred, Identity, special),
                                                    resolve(maxDepth, deferred, Thrower, special),
                                                    resolve(maxDepth, deferred, Identity,
                                                        deferred.notifyWith)
                                                );
                                            }

                                            // Handle all other returned values
                                        } else {

                                            // Only substitute handlers pass on context
                                            // and multiple values (non-spec behavior)
                                            if (handler !== Identity) {
                                                that = undefined;
                                                args = [returned];
                                            }

                                            // Process the value(s)
                                            // Default process is resolve
                                            (special || deferred.resolveWith)(that, args);
                                        }
                                    },

                                    // Only normal processors (resolve) catch and reject exceptions
                                    process = special ?
                                        mightThrow :
                                        function () {
                                            try {
                                                mightThrow();
                                            } catch (e) {

                                                if (jQuery.Deferred.exceptionHook) {
                                                    jQuery.Deferred.exceptionHook(e,
                                                        process.stackTrace);
                                                }

                                                // Support: Promises/A+ section 2.3.3.3.4.1
                                                // https://promisesaplus.com/#point-61
                                                // Ignore post-resolution exceptions
                                                if (depth + 1 >= maxDepth) {

                                                    // Only substitute handlers pass on context
                                                    // and multiple values (non-spec behavior)
                                                    if (handler !== Thrower) {
                                                        that = undefined;
                                                        args = [e];
                                                    }

                                                    deferred.rejectWith(that, args);
                                                }
                                            }
                                        };

                                // Support: Promises/A+ section 2.3.3.3.1
                                // https://promisesaplus.com/#point-57
                                // Re-resolve promises immediately to dodge false rejection from
                                // subsequent errors
                                if (depth) {
                                    process();
                                } else {

                                    // Call an optional hook to record the stack, in case of exception
                                    // since it's otherwise lost when execution goes async
                                    if (jQuery.Deferred.getStackHook) {
                                        process.stackTrace = jQuery.Deferred.getStackHook();
                                    }
                                    window.setTimeout(process);
                                }
                            };
                        }

                        return jQuery.Deferred(function (newDefer) {

                            // progress_handlers.add( ... )
                            tuples[0][3].add(
                                resolve(
                                    0,
                                    newDefer,
                                    isFunction(onProgress) ?
                                        onProgress :
                                        Identity,
                                    newDefer.notifyWith
                                )
                            );

                            // fulfilled_handlers.add( ... )
                            tuples[1][3].add(
                                resolve(
                                    0,
                                    newDefer,
                                    isFunction(onFulfilled) ?
                                        onFulfilled :
                                        Identity
                                )
                            );

                            // rejected_handlers.add( ... )
                            tuples[2][3].add(
                                resolve(
                                    0,
                                    newDefer,
                                    isFunction(onRejected) ?
                                        onRejected :
                                        Thrower
                                )
                            );
                        }).promise();
                    },

                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function (obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                },
                deferred = {};

            // Add list-specific methods
            jQuery.each(tuples, function (i, tuple) {
                var list = tuple[2],
                    stateString = tuple[5];

                // promise.progress = list.add
                // promise.done = list.add
                // promise.fail = list.add
                promise[tuple[1]] = list.add;

                // Handle state
                if (stateString) {
                    list.add(
                        function () {

                            // state = "resolved" (i.e., fulfilled)
                            // state = "rejected"
                            state = stateString;
                        },

                        // rejected_callbacks.disable
                        // fulfilled_callbacks.disable
                        tuples[3 - i][2].disable,

                        // rejected_handlers.disable
                        // fulfilled_handlers.disable
                        tuples[3 - i][3].disable,

                        // progress_callbacks.lock
                        tuples[0][2].lock,

                        // progress_handlers.lock
                        tuples[0][3].lock
                    );
                }

                // progress_handlers.fire
                // fulfilled_handlers.fire
                // rejected_handlers.fire
                list.add(tuple[3].fire);

                // deferred.notify = function() { deferred.notifyWith(...) }
                // deferred.resolve = function() { deferred.resolveWith(...) }
                // deferred.reject = function() { deferred.rejectWith(...) }
                deferred[tuple[0]] = function () {
                    deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
                    return this;
                };

                // deferred.notifyWith = list.fireWith
                // deferred.resolveWith = list.fireWith
                // deferred.rejectWith = list.fireWith
                deferred[tuple[0] + "With"] = list.fireWith;
            });

            // Make the deferred a promise
            promise.promise(deferred);

            // Call given func if any
            if (func) {
                func.call(deferred, deferred);
            }

            // All done!
            return deferred;
        },

        // Deferred helper
        when: function (singleValue) {
            var

                // count of uncompleted subordinates
                remaining = arguments.length,

                // count of unprocessed arguments
                i = remaining,

                // subordinate fulfillment data
                resolveContexts = Array(i),
                resolveValues = slice.call(arguments),

                // the master Deferred
                master = jQuery.Deferred(),

                // subordinate callback factory
                updateFunc = function (i) {
                    return function (value) {
                        resolveContexts[i] = this;
                        resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (!(--remaining)) {
                            master.resolveWith(resolveContexts, resolveValues);
                        }
                    };
                };

            // Single- and empty arguments are adopted like Promise.resolve
            if (remaining <= 1) {
                adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject,
                    !remaining);

                // Use .then() to unwrap secondary thenables (cf. gh-3000)
                if (master.state() === "pending" ||
                    isFunction(resolveValues[i] && resolveValues[i].then)) {

                    return master.then();
                }
            }

            // Multiple arguments are aggregated like Promise.all array elements
            while (i--) {
                adoptValue(resolveValues[i], updateFunc(i), master.reject);
            }

            return master.promise();
        }
    });


    // These usually indicate a programmer mistake during development,
    // warn about them ASAP rather than swallowing them by default.
    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

    jQuery.Deferred.exceptionHook = function (error, stack) {

        // Support: IE 8 - 9 only
        // Console exists when dev tools are open, which can happen at any time
        if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
            window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
        }
    };




    jQuery.readyException = function (error) {
        window.setTimeout(function () {
            throw error;
        });
    };




    // The deferred used on DOM ready
    var readyList = jQuery.Deferred();

    jQuery.fn.ready = function (fn) {

        readyList
            .then(fn)

            // Wrap jQuery.readyException in a function so that the lookup
            // happens at the time of error handling instead of callback
            // registration.
            .catch(function (error) {
                jQuery.readyException(error);
            });

        return this;
    };

    jQuery.extend({

        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,

        // Handle when the DOM is ready
        ready: function (wait) {

            // Abort if there are pending holds or we're already ready
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }

            // Remember that the DOM is ready
            jQuery.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith(document, [jQuery]);
        }
    });

    jQuery.ready.then = readyList.then;

    // The ready event handler and self cleanup method
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed);
        window.removeEventListener("load", completed);
        jQuery.ready();
    }

    // Catch cases where $(document).ready() is called
    // after the browser event has already occurred.
    // Support: IE <=9 - 10 only
    // Older IE sometimes signals "interactive" too soon
    if (document.readyState === "complete" ||
        (document.readyState !== "loading" && !document.documentElement.doScroll)) {

        // Handle it asynchronously to allow scripts the opportunity to delay ready
        window.setTimeout(jQuery.ready);

    } else {

        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", completed);

        // A fallback to window.onload, that will always work
        window.addEventListener("load", completed);
    }




    // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0,
            len = elems.length,
            bulk = key == null;

        // Sets many values
        if (toType(key) === "object") {
            chainable = true;
            for (i in key) {
                access(elems, fn, i, key[i], true, emptyGet, raw);
            }

            // Sets one value
        } else if (value !== undefined) {
            chainable = true;

            if (!isFunction(value)) {
                raw = true;
            }

            if (bulk) {

                // Bulk operations run against the entire set
                if (raw) {
                    fn.call(elems, value);
                    fn = null;

                    // ...except when executing function values
                } else {
                    bulk = fn;
                    fn = function (elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }

            if (fn) {
                for (; i < len; i++) {
                    fn(
                        elems[i], key, raw ?
                            value :
                            value.call(elems[i], i, fn(elems[i], key))
                    );
                }
            }
        }

        if (chainable) {
            return elems;
        }

        // Gets
        if (bulk) {
            return fn.call(elems);
        }

        return len ? fn(elems[0], key) : emptyGet;
    };


    // Matches dashed string for camelizing
    var rmsPrefix = /^-ms-/,
        rdashAlpha = /-([a-z])/g;

    // Used by camelCase as callback to replace()
    function fcamelCase(all, letter) {
        return letter.toUpperCase();
    }

    // Convert dashed to camelCase; used by the css and data modules
    // Support: IE <=9 - 11, Edge 12 - 15
    // Microsoft forgot to hump their vendor prefix (#9572)
    function camelCase(string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    }
    var acceptData = function (owner) {

        // Accepts only:
        //  - Node
        //    - Node.ELEMENT_NODE
        //    - Node.DOCUMENT_NODE
        //  - Object
        //    - Any
        return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
    };




    function Data() {
        this.expando = jQuery.expando + Data.uid++;
    }

    Data.uid = 1;

    Data.prototype = {

        cache: function (owner) {

            // Check if the owner object already has a cache
            var value = owner[this.expando];

            // If not, create one
            if (!value) {
                value = {};

                // We can accept data for non-element nodes in modern browsers,
                // but we should not, see #8335.
                // Always return an empty object.
                if (acceptData(owner)) {

                    // If it is a node unlikely to be stringify-ed or looped over
                    // use plain assignment
                    if (owner.nodeType) {
                        owner[this.expando] = value;

                        // Otherwise secure it in a non-enumerable property
                        // configurable must be true to allow the property to be
                        // deleted when data is removed
                    } else {
                        Object.defineProperty(owner, this.expando, {
                            value: value,
                            configurable: true
                        });
                    }
                }
            }

            return value;
        },
        set: function (owner, data, value) {
            var prop,
                cache = this.cache(owner);

            // Handle: [ owner, key, value ] args
            // Always use camelCase key (gh-2257)
            if (typeof data === "string") {
                cache[camelCase(data)] = value;

                // Handle: [ owner, { properties } ] args
            } else {

                // Copy the properties one-by-one to the cache object
                for (prop in data) {
                    cache[camelCase(prop)] = data[prop];
                }
            }
            return cache;
        },
        get: function (owner, key) {
            return key === undefined ?
                this.cache(owner) :

                // Always use camelCase key (gh-2257)
                owner[this.expando] && owner[this.expando][camelCase(key)];
        },
        access: function (owner, key, value) {

            // In cases where either:
            //
            //   1. No key was specified
            //   2. A string key was specified, but no value provided
            //
            // Take the "read" path and allow the get method to determine
            // which value to return, respectively either:
            //
            //   1. The entire cache object
            //   2. The data stored at the key
            //
            if (key === undefined ||
                ((key && typeof key === "string") && value === undefined)) {

                return this.get(owner, key);
            }

            // When the key is not a string, or both a key and value
            // are specified, set or extend (existing objects) with either:
            //
            //   1. An object of properties
            //   2. A key and value
            //
            this.set(owner, key, value);

            // Since the "set" path can have two possible entry points
            // return the expected data based on which path was taken[*]
            return value !== undefined ? value : key;
        },
        remove: function (owner, key) {
            var i,
                cache = owner[this.expando];

            if (cache === undefined) {
                return;
            }

            if (key !== undefined) {

                // Support array or space separated string of keys
                if (Array.isArray(key)) {

                    // If key is an array of keys...
                    // We always set camelCase keys, so remove that.
                    key = key.map(camelCase);
                } else {
                    key = camelCase(key);

                    // If a key with the spaces exists, use it.
                    // Otherwise, create an array by matching non-whitespace
                    key = key in cache ?
                        [key] :
                        (key.match(rnothtmlwhite) || []);
                }

                i = key.length;

                while (i--) {
                    delete cache[key[i]];
                }
            }

            // Remove the expando if there's no more data
            if (key === undefined || jQuery.isEmptyObject(cache)) {

                // Support: Chrome <=35 - 45
                // Webkit & Blink performance suffers when deleting properties
                // from DOM nodes, so set to undefined instead
                // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
                if (owner.nodeType) {
                    owner[this.expando] = undefined;
                } else {
                    delete owner[this.expando];
                }
            }
        },
        hasData: function (owner) {
            var cache = owner[this.expando];
            return cache !== undefined && !jQuery.isEmptyObject(cache);
        }
    };
    var dataPriv = new Data();

    var dataUser = new Data();



    //	Implementation Summary
    //
    //	1. Enforce API surface and semantic compatibility with 1.9.x branch
    //	2. Improve the module's maintainability by reducing the storage
    //		paths to a single mechanism.
    //	3. Use the same single mechanism to support "private" and "user" data.
    //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
    //	5. Avoid exposing implementation details on user objects (eg. expando properties)
    //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /[A-Z]/g;

    function getData(data) {
        if (data === "true") {
            return true;
        }

        if (data === "false") {
            return false;
        }

        if (data === "null") {
            return null;
        }

        // Only convert to a number if it doesn't change the string
        if (data === +data + "") {
            return +data;
        }

        if (rbrace.test(data)) {
            return JSON.parse(data);
        }

        return data;
    }

    function dataAttr(elem, key, data) {
        var name;

        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if (data === undefined && elem.nodeType === 1) {
            name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
            data = elem.getAttribute(name);

            if (typeof data === "string") {
                try {
                    data = getData(data);
                } catch (e) { }

                // Make sure we set the data so it isn't changed later
                dataUser.set(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }

    jQuery.extend({
        hasData: function (elem) {
            return dataUser.hasData(elem) || dataPriv.hasData(elem);
        },

        data: function (elem, name, data) {
            return dataUser.access(elem, name, data);
        },

        removeData: function (elem, name) {
            dataUser.remove(elem, name);
        },

        // TODO: Now that all calls to _data and _removeData have been replaced
        // with direct calls to dataPriv methods, these can be deprecated.
        _data: function (elem, name, data) {
            return dataPriv.access(elem, name, data);
        },

        _removeData: function (elem, name) {
            dataPriv.remove(elem, name);
        }
    });

    jQuery.fn.extend({
        data: function (key, value) {
            var i, name, data,
                elem = this[0],
                attrs = elem && elem.attributes;

            // Gets all values
            if (key === undefined) {
                if (this.length) {
                    data = dataUser.get(elem);

                    if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                        i = attrs.length;
                        while (i--) {

                            // Support: IE 11 only
                            // The attrs elements can be null (#14894)
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        dataPriv.set(elem, "hasDataAttrs", true);
                    }
                }

                return data;
            }

            // Sets multiple values
            if (typeof key === "object") {
                return this.each(function () {
                    dataUser.set(this, key);
                });
            }

            return access(this, function (value) {
                var data;

                // The calling jQuery object (element matches) is not empty
                // (and therefore has an element appears at this[ 0 ]) and the
                // `value` parameter was not undefined. An empty jQuery object
                // will result in `undefined` for elem = this[ 0 ] which will
                // throw an exception if an attempt to read a data cache is made.
                if (elem && value === undefined) {

                    // Attempt to get data from the cache
                    // The key will always be camelCased in Data
                    data = dataUser.get(elem, key);
                    if (data !== undefined) {
                        return data;
                    }

                    // Attempt to "discover" the data in
                    // HTML5 custom data-* attrs
                    data = dataAttr(elem, key);
                    if (data !== undefined) {
                        return data;
                    }

                    // We tried really hard, but the data doesn't exist.
                    return;
                }

                // Set the data...
                this.each(function () {

                    // We always store the camelCased key
                    dataUser.set(this, key, value);
                });
            }, null, value, arguments.length > 1, null, true);
        },

        removeData: function (key) {
            return this.each(function () {
                dataUser.remove(this, key);
            });
        }
    });


    jQuery.extend({
        queue: function (elem, type, data) {
            var queue;

            if (elem) {
                type = (type || "fx") + "queue";
                queue = dataPriv.get(elem, type);

                // Speed up dequeue by getting out quickly if this is just a lookup
                if (data) {
                    if (!queue || Array.isArray(data)) {
                        queue = dataPriv.access(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },

        dequeue: function (elem, type) {
            type = type || "fx";

            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function () {
                    jQuery.dequeue(elem, type);
                };

            // If the fx queue is dequeued, always remove the progress sentinel
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }

            if (fn) {

                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if (type === "fx") {
                    queue.unshift("inprogress");
                }

                // Clear up the last queue stop function
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }

            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },

        // Not public - generate a queueHooks object, or return the current one
        _queueHooks: function (elem, type) {
            var key = type + "queueHooks";
            return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function () {
                    dataPriv.remove(elem, [type + "queue", key]);
                })
            });
        }
    });

    jQuery.fn.extend({
        queue: function (type, data) {
            var setter = 2;

            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }

            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }

            return data === undefined ?
                this :
                this.each(function () {
                    var queue = jQuery.queue(this, type, data);

                    // Ensure a hooks for this queue
                    jQuery._queueHooks(this, type);

                    if (type === "fx" && queue[0] !== "inprogress") {
                        jQuery.dequeue(this, type);
                    }
                });
        },
        dequeue: function (type) {
            return this.each(function () {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function (type) {
            return this.queue(type || "fx", []);
        },

        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function (type, obj) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function () {
                    if (!(--count)) {
                        defer.resolveWith(elements, [elements]);
                    }
                };

            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while (i--) {
                tmp = dataPriv.get(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

    var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");


    var cssExpand = ["Top", "Right", "Bottom", "Left"];

    var isHiddenWithinTree = function (elem, el) {

        // isHiddenWithinTree might be called from jQuery#filter function;
        // in that case, element will be second argument
        elem = el || elem;

        // Inline style trumps all
        return elem.style.display === "none" ||
            elem.style.display === "" &&

            // Otherwise, check computed style
            // Support: Firefox <=43 - 45
            // Disconnected elements can have computed display: none, so first confirm that elem is
            // in the document.
            jQuery.contains(elem.ownerDocument, elem) &&

            jQuery.css(elem, "display") === "none";
    };

    var swap = function (elem, options, callback, args) {
        var ret, name,
            old = {};

        // Remember the old values, and insert the new ones
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }

        ret = callback.apply(elem, args || []);

        // Revert the old values
        for (name in options) {
            elem.style[name] = old[name];
        }

        return ret;
    };




    function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted, scale,
            maxIterations = 20,
            currentValue = tween ?
                function () {
                    return tween.cur();
                } :
                function () {
                    return jQuery.css(elem, prop, "");
                },
            initial = currentValue(),
            unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),

            // Starting value computation is required for potential unit mismatches
            initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) &&
                rcssNum.exec(jQuery.css(elem, prop));

        if (initialInUnit && initialInUnit[3] !== unit) {

            // Support: Firefox <=54
            // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
            initial = initial / 2;

            // Trust units reported by jQuery.css
            unit = unit || initialInUnit[3];

            // Iteratively approximate from a nonzero starting point
            initialInUnit = +initial || 1;

            while (maxIterations--) {

                // Evaluate and update our best guess (doubling guesses that zero out).
                // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
                jQuery.style(elem, prop, initialInUnit + unit);
                if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
                    maxIterations = 0;
                }
                initialInUnit = initialInUnit / scale;

            }

            initialInUnit = initialInUnit * 2;
            jQuery.style(elem, prop, initialInUnit + unit);

            // Make sure we update the tween properties later on
            valueParts = valueParts || [];
        }

        if (valueParts) {
            initialInUnit = +initialInUnit || +initial || 0;

            // Apply relative offset (+=/-=) if specified
            adjusted = valueParts[1] ?
                initialInUnit + (valueParts[1] + 1) * valueParts[2] :
                +valueParts[2];
            if (tween) {
                tween.unit = unit;
                tween.start = initialInUnit;
                tween.end = adjusted;
            }
        }
        return adjusted;
    }


    var defaultDisplayMap = {};

    function getDefaultDisplay(elem) {
        var temp,
            doc = elem.ownerDocument,
            nodeName = elem.nodeName,
            display = defaultDisplayMap[nodeName];

        if (display) {
            return display;
        }

        temp = doc.body.appendChild(doc.createElement(nodeName));
        display = jQuery.css(temp, "display");

        temp.parentNode.removeChild(temp);

        if (display === "none") {
            display = "block";
        }
        defaultDisplayMap[nodeName] = display;

        return display;
    }

    function showHide(elements, show) {
        var display, elem,
            values = [],
            index = 0,
            length = elements.length;

        // Determine new display value for elements that need to change
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }

            display = elem.style.display;
            if (show) {

                // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
                // check is required in this first loop unless we have a nonempty display value (either
                // inline or about-to-be-restored)
                if (display === "none") {
                    values[index] = dataPriv.get(elem, "display") || null;
                    if (!values[index]) {
                        elem.style.display = "";
                    }
                }
                if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                    values[index] = getDefaultDisplay(elem);
                }
            } else {
                if (display !== "none") {
                    values[index] = "none";

                    // Remember what we're overwriting
                    dataPriv.set(elem, "display", display);
                }
            }
        }

        // Set the display of the elements in a second loop to avoid constant reflow
        for (index = 0; index < length; index++) {
            if (values[index] != null) {
                elements[index].style.display = values[index];
            }
        }

        return elements;
    }

    jQuery.fn.extend({
        show: function () {
            return showHide(this, true);
        },
        hide: function () {
            return showHide(this);
        },
        toggle: function (state) {
            if (typeof state === "boolean") {
                return state ? this.show() : this.hide();
            }

            return this.each(function () {
                if (isHiddenWithinTree(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });
    var rcheckableType = (/^(?:checkbox|radio)$/i);

    var rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]+)/i);

    var rscriptType = (/^$|^module$|\/(?:java|ecma)script/i);



    // We have to close these tags to support XHTML (#13200)
    var wrapMap = {

        // Support: IE <=9 only
        option: [1, "<select multiple='multiple'>", "</select>"],

        // XHTML parsers do not magically insert elements in the
        // same way that tag soup parsers do. So we cannot shorten
        // this by omitting <tbody> or other required elements.
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

        _default: [0, "", ""]
    };

    // Support: IE <=9 only
    wrapMap.optgroup = wrapMap.option;

    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;


    function getAll(context, tag) {

        // Support: IE <=9 - 11 only
        // Use typeof to avoid zero-argument method invocation on host objects (#15151)
        var ret;

        if (typeof context.getElementsByTagName !== "undefined") {
            ret = context.getElementsByTagName(tag || "*");

        } else if (typeof context.querySelectorAll !== "undefined") {
            ret = context.querySelectorAll(tag || "*");

        } else {
            ret = [];
        }

        if (tag === undefined || tag && nodeName(context, tag)) {
            return jQuery.merge([context], ret);
        }

        return ret;
    }


    // Mark scripts as having already been evaluated
    function setGlobalEval(elems, refElements) {
        var i = 0,
            l = elems.length;

        for (; i < l; i++) {
            dataPriv.set(
                elems[i],
                "globalEval",
                !refElements || dataPriv.get(refElements[i], "globalEval")
            );
        }
    }


    var rhtml = /<|&#?\w+;/;

    function buildFragment(elems, context, scripts, selection, ignored) {
        var elem, tmp, tag, wrap, contains, j,
            fragment = context.createDocumentFragment(),
            nodes = [],
            i = 0,
            l = elems.length;

        for (; i < l; i++) {
            elem = elems[i];

            if (elem || elem === 0) {

                // Add nodes directly
                if (toType(elem) === "object") {

                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // push.apply(_, arraylike) throws on ancient WebKit
                    jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

                    // Convert non-html into a text node
                } else if (!rhtml.test(elem)) {
                    nodes.push(context.createTextNode(elem));

                    // Convert html into DOM nodes
                } else {
                    tmp = tmp || fragment.appendChild(context.createElement("div"));

                    // Deserialize a standard representation
                    tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                    wrap = wrapMap[tag] || wrapMap._default;
                    tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

                    // Descend through wrappers to the right content
                    j = wrap[0];
                    while (j--) {
                        tmp = tmp.lastChild;
                    }

                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // push.apply(_, arraylike) throws on ancient WebKit
                    jQuery.merge(nodes, tmp.childNodes);

                    // Remember the top-level container
                    tmp = fragment.firstChild;

                    // Ensure the created nodes are orphaned (#12392)
                    tmp.textContent = "";
                }
            }
        }

        // Remove wrapper from fragment
        fragment.textContent = "";

        i = 0;
        while ((elem = nodes[i++])) {

            // Skip elements already in the context collection (trac-4087)
            if (selection && jQuery.inArray(elem, selection) > -1) {
                if (ignored) {
                    ignored.push(elem);
                }
                continue;
            }

            contains = jQuery.contains(elem.ownerDocument, elem);

            // Append to fragment
            tmp = getAll(fragment.appendChild(elem), "script");

            // Preserve script evaluation history
            if (contains) {
                setGlobalEval(tmp);
            }

            // Capture executables
            if (scripts) {
                j = 0;
                while ((elem = tmp[j++])) {
                    if (rscriptType.test(elem.type || "")) {
                        scripts.push(elem);
                    }
                }
            }
        }

        return fragment;
    }


    (function () {
        var fragment = document.createDocumentFragment(),
            div = fragment.appendChild(document.createElement("div")),
            input = document.createElement("input");

        // Support: Android 4.0 - 4.3 only
        // Check state lost if the name is set (#11217)
        // Support: Windows Web Apps (WWA)
        // `name` and `type` must use .setAttribute for WWA (#14901)
        input.setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");

        div.appendChild(input);

        // Support: Android <=4.1 only
        // Older WebKit doesn't clone checked state correctly in fragments
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

        // Support: IE <=11 only
        // Make sure textarea (and checkbox) defaultValue is properly cloned
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
    })();
    var documentElement = document.documentElement;



    var
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

    // Support: IE <=9 only
    // See #13393 for more info
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) { }
    }

    function on(elem, types, selector, data, fn, one) {
        var origFn, type;

        // Types can be a map of types/handlers
        if (typeof types === "object") {

            // ( types-Object, selector, data )
            if (typeof selector !== "string") {

                // ( types-Object, data )
                data = data || selector;
                selector = undefined;
            }
            for (type in types) {
                on(elem, type, selector, data, types[type], one);
            }
            return elem;
        }

        if (data == null && fn == null) {

            // ( types, fn )
            fn = selector;
            data = selector = undefined;
        } else if (fn == null) {
            if (typeof selector === "string") {

                // ( types, selector, fn )
                fn = data;
                data = undefined;
            } else {

                // ( types, data, fn )
                fn = data;
                data = selector;
                selector = undefined;
            }
        }
        if (fn === false) {
            fn = returnFalse;
        } else if (!fn) {
            return elem;
        }

        if (one === 1) {
            origFn = fn;
            fn = function (event) {

                // Can use an empty set, since event contains the info
                jQuery().off(event);
                return origFn.apply(this, arguments);
            };

            // Use same guid so caller can remove using origFn
            fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
        }
        return elem.each(function () {
            jQuery.event.add(this, types, fn, data, selector);
        });
    }

    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {

        global: {},

        add: function (elem, types, handler, data, selector) {

            var handleObjIn, eventHandle, tmp,
                events, t, handleObj,
                special, handlers, type, namespaces, origType,
                elemData = dataPriv.get(elem);

            // Don't attach events to noData or text/comment nodes (but allow plain objects)
            if (!elemData) {
                return;
            }

            // Caller can pass in an object of custom data in lieu of the handler
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }

            // Ensure that invalid selectors throw exceptions at attach time
            // Evaluate against documentElement in case elem is a non-element node (e.g., document)
            if (selector) {
                jQuery.find.matchesSelector(documentElement, selector);
            }

            // Make sure that the handler has a unique ID, used to find/remove it later
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }

            // Init the element's event structure and main handler, if this is the first
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function (e) {

                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
                        jQuery.event.dispatch.apply(elem, arguments) : undefined;
                };
            }

            // Handle multiple events separated by a space
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();

                // There *must* be a type, no attaching namespace-only handlers
                if (!type) {
                    continue;
                }

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[type] || {};

                // If selector defined, determine special event api type, otherwise given type
                type = (selector ? special.delegateType : special.bindType) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[type] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);

                // Init the event handler queue if we're the first
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;

                    // Only use addEventListener if the special events handler returns false
                    if (!special.setup ||
                        special.setup.call(elem, data, namespaces, eventHandle) === false) {

                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle);
                        }
                    }
                }

                if (special.add) {
                    special.add.call(elem, handleObj);

                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }

                // Add to the element's handler list, delegates in front
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[type] = true;
            }

        },

        // Detach an event or set of events from an element
        remove: function (elem, types, handler, selector, mappedTypes) {

            var j, origCount, tmp,
                events, t, handleObj,
                special, handlers, type, namespaces, origType,
                elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

            if (!elemData || !(events = elemData.events)) {
                return;
            }

            // Once for each type.namespace in types; type may be omitted
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();

                // Unbind all events (on this namespace, if provided) for the element
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }

                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] &&
                    new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

                // Remove matching events
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];

                    if ((mappedTypes || origType === handleObj.origType) &&
                        (!handler || handler.guid === handleObj.guid) &&
                        (!tmp || tmp.test(handleObj.namespace)) &&
                        (!selector || selector === handleObj.selector ||
                            selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);

                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if (origCount && !handlers.length) {
                    if (!special.teardown ||
                        special.teardown.call(elem, namespaces, elemData.handle) === false) {

                        jQuery.removeEvent(elem, type, elemData.handle);
                    }

                    delete events[type];
                }
            }

            // Remove data and the expando if it's no longer used
            if (jQuery.isEmptyObject(events)) {
                dataPriv.remove(elem, "handle events");
            }
        },

        dispatch: function (nativeEvent) {

            // Make a writable jQuery.Event from the native event object
            var event = jQuery.event.fix(nativeEvent);

            var i, j, ret, matched, handleObj, handlerQueue,
                args = new Array(arguments.length),
                handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
                special = jQuery.event.special[event.type] || {};

            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[0] = event;

            for (i = 1; i < arguments.length; i++) {
                args[i] = arguments[i];
            }

            event.delegateTarget = this;

            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }

            // Determine handlers
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);

            // Run delegates first; they may want to stop propagation beneath us
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;

                j = 0;
                while ((handleObj = matched.handlers[j++]) &&
                    !event.isImmediatePropagationStopped()) {

                    // Triggered event must either 1) have no namespace, or 2) have namespace(s)
                    // a subset or equal to those in the bound event (both can have no namespace).
                    if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

                        event.handleObj = handleObj;
                        event.data = handleObj.data;

                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle ||
                            handleObj.handler).apply(matched.elem, args);

                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }

            // Call the postDispatch hook for the mapped type
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }

            return event.result;
        },

        handlers: function (event, handlers) {
            var i, handleObj, sel, matchedHandlers, matchedSelectors,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;

            // Find delegate handlers
            if (delegateCount &&

                // Support: IE <=9
                // Black-hole SVG <use> instance trees (trac-13180)
                cur.nodeType &&

                // Support: Firefox <=42
                // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
                // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
                // Support: IE 11 only
                // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
                !(event.type === "click" && event.button >= 1)) {

                for (; cur !== this; cur = cur.parentNode || this) {

                    // Don't check non-elements (#13208)
                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                    if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                        matchedHandlers = [];
                        matchedSelectors = {};
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];

                            // Don't conflict with Object.prototype properties (#13203)
                            sel = handleObj.selector + " ";

                            if (matchedSelectors[sel] === undefined) {
                                matchedSelectors[sel] = handleObj.needsContext ?
                                    jQuery(sel, this).index(cur) > -1 :
                                    jQuery.find(sel, this, null, [cur]).length;
                            }
                            if (matchedSelectors[sel]) {
                                matchedHandlers.push(handleObj);
                            }
                        }
                        if (matchedHandlers.length) {
                            handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                        }
                    }
                }
            }

            // Add the remaining (directly-bound) handlers
            cur = this;
            if (delegateCount < handlers.length) {
                handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
            }

            return handlerQueue;
        },

        addProp: function (name, hook) {
            Object.defineProperty(jQuery.Event.prototype, name, {
                enumerable: true,
                configurable: true,

                get: isFunction(hook) ?
                    function () {
                        if (this.originalEvent) {
                            return hook(this.originalEvent);
                        }
                    } :
                    function () {
                        if (this.originalEvent) {
                            return this.originalEvent[name];
                        }
                    },

                set: function (value) {
                    Object.defineProperty(this, name, {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: value
                    });
                }
            });
        },

        fix: function (originalEvent) {
            return originalEvent[jQuery.expando] ?
                originalEvent :
                new jQuery.Event(originalEvent);
        },

        special: {
            load: {

                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            focus: {

                // Fire native event if possible so blur/focus sequence is correct
                trigger: function () {
                    if (this !== safeActiveElement() && this.focus) {
                        this.focus();
                        return false;
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {

                // For checkbox, fire native event so checked state will be right
                trigger: function () {
                    if (this.type === "checkbox" && this.click && nodeName(this, "input")) {
                        this.click();
                        return false;
                    }
                },

                // For cross-browser consistency, don't fire native .click() on links
                _default: function (event) {
                    return nodeName(event.target, "a");
                }
            },

            beforeunload: {
                postDispatch: function (event) {

                    // Support: Firefox 20+
                    // Firefox doesn't alert if the returnValue field is not set.
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        }
    };

    jQuery.removeEvent = function (elem, type, handle) {

        // This "if" is needed for plain objects
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle);
        }
    };

    jQuery.Event = function (src, props) {

        // Allow instantiation without the 'new' keyword
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }

        // Event object
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented ||
                src.defaultPrevented === undefined &&

                // Support: Android <=2.3 only
                src.returnValue === false ?
                returnTrue :
                returnFalse;

            // Create target properties
            // Support: Safari <=6 - 7 only
            // Target should not be a text node (#504, #13143)
            this.target = (src.target && src.target.nodeType === 3) ?
                src.target.parentNode :
                src.target;

            this.currentTarget = src.currentTarget;
            this.relatedTarget = src.relatedTarget;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if (props) {
            jQuery.extend(this, props);
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || Date.now();

        // Mark it as fixed
        this[jQuery.expando] = true;
    };

    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: false,

        preventDefault: function () {
            var e = this.originalEvent;

            this.isDefaultPrevented = returnTrue;

            if (e && !this.isSimulated) {
                e.preventDefault();
            }
        },
        stopPropagation: function () {
            var e = this.originalEvent;

            this.isPropagationStopped = returnTrue;

            if (e && !this.isSimulated) {
                e.stopPropagation();
            }
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;

            this.isImmediatePropagationStopped = returnTrue;

            if (e && !this.isSimulated) {
                e.stopImmediatePropagation();
            }

            this.stopPropagation();
        }
    };

    // Includes all common event props including KeyEvent and MouseEvent specific props
    jQuery.each({
        altKey: true,
        bubbles: true,
        cancelable: true,
        changedTouches: true,
        ctrlKey: true,
        detail: true,
        eventPhase: true,
        metaKey: true,
        pageX: true,
        pageY: true,
        shiftKey: true,
        view: true,
        "char": true,
        charCode: true,
        key: true,
        keyCode: true,
        button: true,
        buttons: true,
        clientX: true,
        clientY: true,
        offsetX: true,
        offsetY: true,
        pointerId: true,
        pointerType: true,
        screenX: true,
        screenY: true,
        targetTouches: true,
        toElement: true,
        touches: true,

        which: function (event) {
            var button = event.button;

            // Add which for key events
            if (event.which == null && rkeyEvent.test(event.type)) {
                return event.charCode != null ? event.charCode : event.keyCode;
            }

            // Add which for click: 1 === left; 2 === middle; 3 === right
            if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
                if (button & 1) {
                    return 1;
                }

                if (button & 2) {
                    return 3;
                }

                if (button & 4) {
                    return 2;
                }

                return 0;
            }

            return event.which;
        }
    }, jQuery.event.addProp);

    // Create mouseenter/leave events using mouseover/out and event-time checks
    // so that event delegation works in jQuery.
    // Do the same for pointerenter/pointerleave and pointerover/pointerout
    //
    // Support: Safari 7 only
    // Safari sends mouseenter too often; see:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
    // for the description of the bug (it existed in older Chrome versions as well).
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,

            handle: function (event) {
                var ret,
                    target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;

                // For mouseenter/leave call the handler if related is outside the target.
                // NB: No relatedTarget if the mouse left/entered the browser window
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });

    jQuery.fn.extend({

        on: function (types, selector, data, fn) {
            return on(this, types, selector, data, fn);
        },
        one: function (types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1);
        },
        off: function (types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {

                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(
                    handleObj.namespace ?
                        handleObj.origType + "." + handleObj.namespace :
                        handleObj.origType,
                    handleObj.selector,
                    handleObj.handler
                );
                return this;
            }
            if (typeof types === "object") {

                // ( types-object [, selector] )
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {

                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function () {
                jQuery.event.remove(this, types, fn, selector);
            });
        }
    });


    var

        /* eslint-disable max-len */

        // See https://github.com/eslint/eslint/issues/3229
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

        /* eslint-enable */

        // Support: IE <=10 - 11, Edge 12 - 13 only
        // In IE/Edge using regex groups here causes severe slowdowns.
        // See https://connect.microsoft.com/IE/feedback/details/1736512/
        rnoInnerhtml = /<script|<style|<link/i,

        // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    // Prefer a tbody over its parent table for containing new rows
    function manipulationTarget(elem, content) {
        if (nodeName(elem, "table") &&
            nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

            return jQuery(elem).children("tbody")[0] || elem;
        }

        return elem;
    }

    // Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript(elem) {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem;
    }
    function restoreScript(elem) {
        if ((elem.type || "").slice(0, 5) === "true/") {
            elem.type = elem.type.slice(5);
        } else {
            elem.removeAttribute("type");
        }

        return elem;
    }

    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

        if (dest.nodeType !== 1) {
            return;
        }

        // 1. Copy private data: events, handlers, etc.
        if (dataPriv.hasData(src)) {
            pdataOld = dataPriv.access(src);
            pdataCur = dataPriv.set(dest, pdataOld);
            events = pdataOld.events;

            if (events) {
                delete pdataCur.handle;
                pdataCur.events = {};

                for (type in events) {
                    for (i = 0, l = events[type].length; i < l; i++) {
                        jQuery.event.add(dest, type, events[type][i]);
                    }
                }
            }
        }

        // 2. Copy user data
        if (dataUser.hasData(src)) {
            udataOld = dataUser.access(src);
            udataCur = jQuery.extend({}, udataOld);

            dataUser.set(dest, udataCur);
        }
    }

    // Fix IE bugs, see support tests
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();

        // Fails to persist the checked state of a cloned checkbox or radio button.
        if (nodeName === "input" && rcheckableType.test(src.type)) {
            dest.checked = src.checked;

            // Fails to return the selected option to the default selected state when cloning options
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
    }

    function domManip(collection, args, callback, ignored) {

        // Flatten any nested arrays
        args = concat.apply([], args);

        var fragment, first, scripts, hasScripts, node, doc,
            i = 0,
            l = collection.length,
            iNoClone = l - 1,
            value = args[0],
            valueIsFunction = isFunction(value);

        // We can't cloneNode fragments that contain checked, in WebKit
        if (valueIsFunction ||
            (l > 1 && typeof value === "string" &&
                !support.checkClone && rchecked.test(value))) {
            return collection.each(function (index) {
                var self = collection.eq(index);
                if (valueIsFunction) {
                    args[0] = value.call(this, index, self.html());
                }
                domManip(self, args, callback, ignored);
            });
        }

        if (l) {
            fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
            first = fragment.firstChild;

            if (fragment.childNodes.length === 1) {
                fragment = first;
            }

            // Require either new content or an interest in ignored elements to invoke the callback
            if (first || ignored) {
                scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                hasScripts = scripts.length;

                // Use the original fragment for the last item
                // instead of the first because it can end up
                // being emptied incorrectly in certain situations (#8070).
                for (; i < l; i++) {
                    node = fragment;

                    if (i !== iNoClone) {
                        node = jQuery.clone(node, true, true);

                        // Keep references to cloned scripts for later restoration
                        if (hasScripts) {

                            // Support: Android <=4.0 only, PhantomJS 1 only
                            // push.apply(_, arraylike) throws on ancient WebKit
                            jQuery.merge(scripts, getAll(node, "script"));
                        }
                    }

                    callback.call(collection[i], node, i);
                }

                if (hasScripts) {
                    doc = scripts[scripts.length - 1].ownerDocument;

                    // Reenable scripts
                    jQuery.map(scripts, restoreScript);

                    // Evaluate executable scripts on first document insertion
                    for (i = 0; i < hasScripts; i++) {
                        node = scripts[i];
                        if (rscriptType.test(node.type || "") &&
                            !dataPriv.access(node, "globalEval") &&
                            jQuery.contains(doc, node)) {

                            if (node.src && (node.type || "").toLowerCase() !== "module") {

                                // Optional AJAX dependency, but won't run scripts if not present
                                if (jQuery._evalUrl) {
                                    jQuery._evalUrl(node.src);
                                }
                            } else {
                                DOMEval(node.textContent.replace(rcleanScript, ""), doc, node);
                            }
                        }
                    }
                }
            }
        }

        return collection;
    }

    function remove(elem, selector, keepData) {
        var node,
            nodes = selector ? jQuery.filter(selector, elem) : elem,
            i = 0;

        for (; (node = nodes[i]) != null; i++) {
            if (!keepData && node.nodeType === 1) {
                jQuery.cleanData(getAll(node));
            }

            if (node.parentNode) {
                if (keepData && jQuery.contains(node.ownerDocument, node)) {
                    setGlobalEval(getAll(node, "script"));
                }
                node.parentNode.removeChild(node);
            }
        }

        return elem;
    }

    jQuery.extend({
        htmlPrefilter: function (html) {
            return html.replace(rxhtmlTag, "<$1></$2>");
        },

        clone: function (elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements,
                clone = elem.cloneNode(true),
                inPage = jQuery.contains(elem.ownerDocument, elem);

            // Fix IE cloning issues
            if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) &&
                !jQuery.isXMLDoc(elem)) {

                // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
                destElements = getAll(clone);
                srcElements = getAll(elem);

                for (i = 0, l = srcElements.length; i < l; i++) {
                    fixInput(srcElements[i], destElements[i]);
                }
            }

            // Copy the events from the original to the clone
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);

                    for (i = 0, l = srcElements.length; i < l; i++) {
                        cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }

            // Preserve script evaluation history
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }

            // Return the cloned set
            return clone;
        },

        cleanData: function (elems) {
            var data, elem, type,
                special = jQuery.event.special,
                i = 0;

            for (; (elem = elems[i]) !== undefined; i++) {
                if (acceptData(elem)) {
                    if ((data = elem[dataPriv.expando])) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);

                                    // This is a shortcut to avoid jQuery.event.remove's overhead
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }

                        // Support: Chrome <=35 - 45+
                        // Assign undefined instead of using delete, see Data#remove
                        elem[dataPriv.expando] = undefined;
                    }
                    if (elem[dataUser.expando]) {

                        // Support: Chrome <=35 - 45+
                        // Assign undefined instead of using delete, see Data#remove
                        elem[dataUser.expando] = undefined;
                    }
                }
            }
        }
    });

    jQuery.fn.extend({
        detach: function (selector) {
            return remove(this, selector, true);
        },

        remove: function (selector) {
            return remove(this, selector);
        },

        text: function (value) {
            return access(this, function (value) {
                return value === undefined ?
                    jQuery.text(this) :
                    this.empty().each(function () {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            this.textContent = value;
                        }
                    });
            }, null, value, arguments.length);
        },

        append: function () {
            return domManip(this, arguments, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },

        prepend: function () {
            return domManip(this, arguments, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },

        before: function () {
            return domManip(this, arguments, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },

        after: function () {
            return domManip(this, arguments, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },

        empty: function () {
            var elem,
                i = 0;

            for (; (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {

                    // Prevent memory leaks
                    jQuery.cleanData(getAll(elem, false));

                    // Remove any remaining nodes
                    elem.textContent = "";
                }
            }

            return this;
        },

        clone: function (dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

            return this.map(function () {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },

        html: function (value) {
            return access(this, function (value) {
                var elem = this[0] || {},
                    i = 0,
                    l = this.length;

                if (value === undefined && elem.nodeType === 1) {
                    return elem.innerHTML;
                }

                // See if we can take a shortcut and just use innerHTML
                if (typeof value === "string" && !rnoInnerhtml.test(value) &&
                    !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

                    value = jQuery.htmlPrefilter(value);

                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};

                            // Remove element nodes and prevent memory leaks
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }

                        elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                    } catch (e) { }
                }

                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },

        replaceWith: function () {
            var ignored = [];

            // Make the changes, replacing each non-ignored context element with the new content
            return domManip(this, arguments, function (elem) {
                var parent = this.parentNode;

                if (jQuery.inArray(this, ignored) < 0) {
                    jQuery.cleanData(getAll(this));
                    if (parent) {
                        parent.replaceChild(elem, this);
                    }
                }

                // Force callback invocation
            }, ignored);
        }
    });

    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (name, original) {
        jQuery.fn[name] = function (selector) {
            var elems,
                ret = [],
                insert = jQuery(selector),
                last = insert.length - 1,
                i = 0;

            for (; i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);

                // Support: Android <=4.0 only, PhantomJS 1 only
                // .get() because push.apply(_, arraylike) throws on ancient WebKit
                push.apply(ret, elems.get());
            }

            return this.pushStack(ret);
        };
    });
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

    var getStyles = function (elem) {

        // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        var view = elem.ownerDocument.defaultView;

        if (!view || !view.opener) {
            view = window;
        }

        return view.getComputedStyle(elem);
    };

    var rboxStyle = new RegExp(cssExpand.join("|"), "i");



    (function () {

        // Executing both pixelPosition & boxSizingReliable tests require only one layout
        // so they're executed at the same time to save the second computation.
        function computeStyleTests() {

            // This is a singleton, we need to execute it only once
            if (!div) {
                return;
            }

            container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
                "margin-top:1px;padding:0;border:0";
            div.style.cssText =
                "position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
                "margin:auto;border:1px;padding:1px;" +
                "width:60%;top:1%";
            documentElement.appendChild(container).appendChild(div);

            var divStyle = window.getComputedStyle(div);
            pixelPositionVal = divStyle.top !== "1%";

            // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
            reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;

            // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
            // Some styles come back with percentage values, even though they shouldn't
            div.style.right = "60%";
            pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;

            // Support: IE 9 - 11 only
            // Detect misreporting of content dimensions for box-sizing:border-box elements
            boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;

            // Support: IE 9 only
            // Detect overflow:scroll screwiness (gh-3699)
            div.style.position = "absolute";
            scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

            documentElement.removeChild(container);

            // Nullify the div so it wouldn't be stored in the memory and
            // it will also be a sign that checks already performed
            div = null;
        }

        function roundPixelMeasures(measure) {
            return Math.round(parseFloat(measure));
        }

        var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
            reliableMarginLeftVal,
            container = document.createElement("div"),
            div = document.createElement("div");

        // Finish early in limited (non-browser) environments
        if (!div.style) {
            return;
        }

        // Support: IE <=9 - 11 only
        // Style of cloned element affects source element cloned (#8908)
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";

        jQuery.extend(support, {
            boxSizingReliable: function () {
                computeStyleTests();
                return boxSizingReliableVal;
            },
            pixelBoxStyles: function () {
                computeStyleTests();
                return pixelBoxStylesVal;
            },
            pixelPosition: function () {
                computeStyleTests();
                return pixelPositionVal;
            },
            reliableMarginLeft: function () {
                computeStyleTests();
                return reliableMarginLeftVal;
            },
            scrollboxSize: function () {
                computeStyleTests();
                return scrollboxSizeVal;
            }
        });
    })();


    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret,

            // Support: Firefox 51+
            // Retrieving style before computed somehow
            // fixes an issue with getting wrong values
            // on detached elements
            style = elem.style;

        computed = computed || getStyles(elem);

        // getPropertyValue is needed for:
        //   .css('filter') (IE 9 only, #12537)
        //   .css('--customProperty) (#3144)
        if (computed) {
            ret = computed.getPropertyValue(name) || computed[name];

            if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                ret = jQuery.style(elem, name);
            }

            // A tribute to the "awesome hack by Dean Edwards"
            // Android Browser returns percentage for some values,
            // but width seems to be reliably pixels.
            // This is against the CSSOM draft spec:
            // https://drafts.csswg.org/cssom/#resolved-values
            if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {

                // Remember the original values
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;

                // Put in the new values to get a computed value out
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;

                // Revert the changed values
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }

        return ret !== undefined ?

            // Support: IE <=9 - 11 only
            // IE returns zIndex value as an integer.
            ret + "" :
            ret;
    }


    function addGetHookIf(conditionFn, hookFn) {

        // Define the hook, we'll check on the first run if it's really needed.
        return {
            get: function () {
                if (conditionFn()) {

                    // Hook not needed (or it's not possible to use it due
                    // to missing dependency), remove it.
                    delete this.get;
                    return;
                }

                // Hook needed; redefine it so that the support test is not executed again.
                return (this.get = hookFn).apply(this, arguments);
            }
        };
    }


    var

        // Swappable if display is none or starts with table
        // except "table", "table-cell", or "table-caption"
        // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rcustomProp = /^--/,
        cssShow = { position: "absolute", visibility: "hidden", display: "block" },
        cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        },

        cssPrefixes = ["Webkit", "Moz", "ms"],
        emptyStyle = document.createElement("div").style;

    // Return a css property mapped to a potentially vendor prefixed property
    function vendorPropName(name) {

        // Shortcut for names that are not vendor prefixed
        if (name in emptyStyle) {
            return name;
        }

        // Check for vendor prefixed names
        var capName = name[0].toUpperCase() + name.slice(1),
            i = cssPrefixes.length;

        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in emptyStyle) {
                return name;
            }
        }
    }

    // Return a property mapped along what jQuery.cssProps suggests or to
    // a vendor prefixed property.
    function finalPropName(name) {
        var ret = jQuery.cssProps[name];
        if (!ret) {
            ret = jQuery.cssProps[name] = vendorPropName(name) || name;
        }
        return ret;
    }

    function setPositiveNumber(elem, value, subtract) {

        // Any relative (+/-) values have already been
        // normalized at this point
        var matches = rcssNum.exec(value);
        return matches ?

            // Guard against undefined "subtract", e.g., when used as in cssHooks
            Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") :
            value;
    }

    function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
        var i = dimension === "width" ? 1 : 0,
            extra = 0,
            delta = 0;

        // Adjustment may not be necessary
        if (box === (isBorderBox ? "border" : "content")) {
            return 0;
        }

        for (; i < 4; i += 2) {

            // Both box models exclude margin
            if (box === "margin") {
                delta += jQuery.css(elem, box + cssExpand[i], true, styles);
            }

            // If we get here with a content-box, we're seeking "padding" or "border" or "margin"
            if (!isBorderBox) {

                // Add padding
                delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

                // For "border" or "margin", add border
                if (box !== "padding") {
                    delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);

                    // But still keep track of it otherwise
                } else {
                    extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }

                // If we get here with a border-box (content + padding + border), we're seeking "content" or
                // "padding" or "margin"
            } else {

                // For "content", subtract padding
                if (box === "content") {
                    delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                }

                // For "content" or "padding", subtract border
                if (box !== "margin") {
                    delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            }
        }

        // Account for positive content-box scroll gutter when requested by providing computedVal
        if (!isBorderBox && computedVal >= 0) {

            // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
            // Assuming integer scroll gutter, subtract the rest and round down
            delta += Math.max(0, Math.ceil(
                elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] -
                computedVal -
                delta -
                extra -
                0.5
            ));
        }

        return delta;
    }

    function getWidthOrHeight(elem, dimension, extra) {

        // Start with computed style
        var styles = getStyles(elem),
            val = curCSS(elem, dimension, styles),
            isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box",
            valueIsBorderBox = isBorderBox;

        // Support: Firefox <=54
        // Return a confounding non-pixel value or feign ignorance, as appropriate.
        if (rnumnonpx.test(val)) {
            if (!extra) {
                return val;
            }
            val = "auto";
        }

        // Check for style in case a browser which returns unreliable values
        // for getComputedStyle silently falls back to the reliable elem.style
        valueIsBorderBox = valueIsBorderBox &&
            (support.boxSizingReliable() || val === elem.style[dimension]);

        // Fall back to offsetWidth/offsetHeight when value is "auto"
        // This happens for inline elements with no explicit setting (gh-3571)
        // Support: Android <=4.1 - 4.3 only
        // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
        if (val === "auto" ||
            !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") {

            val = elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)];

            // offsetWidth/offsetHeight provide border-box values
            valueIsBorderBox = true;
        }

        // Normalize "" and auto
        val = parseFloat(val) || 0;

        // Adjust for the element's box model
        return (val +
            boxModelAdjustment(
                elem,
                dimension,
                extra || (isBorderBox ? "border" : "content"),
                valueIsBorderBox,
                styles,

                // Provide the current computed size to request scroll gutter calculation (gh-3589)
                val
            )
        ) + "px";
    }

    jQuery.extend({

        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function (elem, computed) {
                    if (computed) {

                        // We should always get a number back from opacity
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },

        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
            "animationIterationCount": true,
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },

        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {},

        // Get and set the style property on a DOM Node
        style: function (elem, name, value, extra) {

            // Don't set styles on text and comment nodes
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }

            // Make sure that we're working with the right name
            var ret, type, hooks,
                origName = camelCase(name),
                isCustomProp = rcustomProp.test(name),
                style = elem.style;

            // Make sure that we're working with the right name. We don't
            // want to query the value if it is a CSS custom property
            // since they are user-defined.
            if (!isCustomProp) {
                name = finalPropName(origName);
            }

            // Gets hook for the prefixed version, then unprefixed version
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

            // Check if we're setting a value
            if (value !== undefined) {
                type = typeof value;

                // Convert "+=" or "-=" to relative numbers (#7345)
                if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                    value = adjustCSS(elem, name, ret);

                    // Fixes bug #9237
                    type = "number";
                }

                // Make sure that null and NaN values aren't set (#7116)
                if (value == null || value !== value) {
                    return;
                }

                // If a number was passed in, add the unit (except for certain CSS properties)
                if (type === "number") {
                    value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
                }

                // background-* props affect original clone's values
                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit";
                }

                // If a hook was provided, use that value, otherwise just set the specified value
                if (!hooks || !("set" in hooks) ||
                    (value = hooks.set(elem, value, extra)) !== undefined) {

                    if (isCustomProp) {
                        style.setProperty(name, value);
                    } else {
                        style[name] = value;
                    }
                }

            } else {

                // If a hook was provided get the non-computed value from there
                if (hooks && "get" in hooks &&
                    (ret = hooks.get(elem, false, extra)) !== undefined) {

                    return ret;
                }

                // Otherwise just get the value from the style object
                return style[name];
            }
        },

        css: function (elem, name, extra, styles) {
            var val, num, hooks,
                origName = camelCase(name),
                isCustomProp = rcustomProp.test(name);

            // Make sure that we're working with the right name. We don't
            // want to modify the value if it is a CSS custom property
            // since they are user-defined.
            if (!isCustomProp) {
                name = finalPropName(origName);
            }

            // Try prefixed name followed by the unprefixed name
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

            // If a hook was provided get the computed value from there
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }

            // Otherwise, if a way to get the computed value exists, use that
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }

            // Convert "normal" to computed value
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }

            // Make numeric if forced or a qualifier was provided and val looks numeric
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || isFinite(num) ? num || 0 : val;
            }

            return val;
        }
    });

    jQuery.each(["height", "width"], function (i, dimension) {
        jQuery.cssHooks[dimension] = {
            get: function (elem, computed, extra) {
                if (computed) {

                    // Certain elements can have dimension info if we invisibly show them
                    // but it must have a current display style that would benefit
                    return rdisplayswap.test(jQuery.css(elem, "display")) &&

                        // Support: Safari 8+
                        // Table columns in Safari have non-zero offsetWidth & zero
                        // getBoundingClientRect().width unless display is changed.
                        // Support: IE <=11 only
                        // Running getBoundingClientRect on a disconnected node
                        // in IE throws an error.
                        (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ?
                        swap(elem, cssShow, function () {
                            return getWidthOrHeight(elem, dimension, extra);
                        }) :
                        getWidthOrHeight(elem, dimension, extra);
                }
            },

            set: function (elem, value, extra) {
                var matches,
                    styles = getStyles(elem),
                    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box",
                    subtract = extra && boxModelAdjustment(
                        elem,
                        dimension,
                        extra,
                        isBorderBox,
                        styles
                    );

                // Account for unreliable border-box dimensions by comparing offset* to computed and
                // faking a content-box to get border and padding (gh-3699)
                if (isBorderBox && support.scrollboxSize() === styles.position) {
                    subtract -= Math.ceil(
                        elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] -
                        parseFloat(styles[dimension]) -
                        boxModelAdjustment(elem, dimension, "border", false, styles) -
                        0.5
                    );
                }

                // Convert to pixels if value adjustment is needed
                if (subtract && (matches = rcssNum.exec(value)) &&
                    (matches[3] || "px") !== "px") {

                    elem.style[dimension] = value;
                    value = jQuery.css(elem, dimension);
                }

                return setPositiveNumber(elem, value, subtract);
            }
        };
    });

    jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft,
        function (elem, computed) {
            if (computed) {
                return (parseFloat(curCSS(elem, "marginLeft")) ||
                    elem.getBoundingClientRect().left -
                    swap(elem, { marginLeft: 0 }, function () {
                        return elem.getBoundingClientRect().left;
                    })
                ) + "px";
            }
        }
    );

    // These hooks are used by animate to expand properties
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function (value) {
                var i = 0,
                    expanded = {},

                    // Assumes a single number if not a string
                    parts = typeof value === "string" ? value.split(" ") : [value];

                for (; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] =
                        parts[i] || parts[i - 2] || parts[0];
                }

                return expanded;
            }
        };

        if (prefix !== "margin") {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });

    jQuery.fn.extend({
        css: function (name, value) {
            return access(this, function (elem, name, value) {
                var styles, len,
                    map = {},
                    i = 0;

                if (Array.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;

                    for (; i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }

                    return map;
                }

                return value !== undefined ?
                    jQuery.style(elem, name, value) :
                    jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        }
    });


    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;

    Tween.prototype = {
        constructor: Tween,
        init: function (elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || jQuery.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function () {
            var hooks = Tween.propHooks[this.prop];

            return hooks && hooks.get ?
                hooks.get(this) :
                Tween.propHooks._default.get(this);
        },
        run: function (percent) {
            var eased,
                hooks = Tween.propHooks[this.prop];

            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](
                    percent, this.options.duration * percent, 0, 1, this.options.duration
                );
            } else {
                this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;

            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }

            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };

    Tween.prototype.init.prototype = Tween.prototype;

    Tween.propHooks = {
        _default: {
            get: function (tween) {
                var result;

                // Use a property on the element directly when it is not a DOM element,
                // or when there is no matching style property that exists.
                if (tween.elem.nodeType !== 1 ||
                    tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                    return tween.elem[tween.prop];
                }

                // Passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails.
                // Simple values such as "10px" are parsed to Float;
                // complex values such as "rotate(1rad)" are returned as-is.
                result = jQuery.css(tween.elem, tween.prop, "");

                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === "auto" ? 0 : result;
            },
            set: function (tween) {

                // Use step hook for back compat.
                // Use cssHook if its there.
                // Use .style if available and use plain properties where available.
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                } else if (tween.elem.nodeType === 1 &&
                    (tween.elem.style[jQuery.cssProps[tween.prop]] != null ||
                        jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };

    // Support: IE <=9 only
    // Panic based approach to setting things on disconnected nodes
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function (tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };

    jQuery.easing = {
        linear: function (p) {
            return p;
        },
        swing: function (p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        },
        _default: "swing"
    };

    jQuery.fx = Tween.prototype.init;

    // Back compat <1.8 extension point
    jQuery.fx.step = {};




    var
        fxNow, inProgress,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rrun = /queueHooks$/;

    function schedule() {
        if (inProgress) {
            if (document.hidden === false && window.requestAnimationFrame) {
                window.requestAnimationFrame(schedule);
            } else {
                window.setTimeout(schedule, jQuery.fx.interval);
            }

            jQuery.fx.tick();
        }
    }

    // Animations created synchronously will run synchronously
    function createFxNow() {
        window.setTimeout(function () {
            fxNow = undefined;
        });
        return (fxNow = Date.now());
    }

    // Generate parameters to create a standard animation
    function genFx(type, includeWidth) {
        var which,
            i = 0,
            attrs = { height: type };

        // If we include width, step value is 1 to do all cssExpand values,
        // otherwise step value is 2 to skip over Left and Right
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }

        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }

        return attrs;
    }

    function createTween(value, prop, animation) {
        var tween,
            collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
            index = 0,
            length = collection.length;
        for (; index < length; index++) {
            if ((tween = collection[index].call(animation, prop, value))) {

                // We're done with this property
                return tween;
            }
        }
    }

    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
            isBox = "width" in props || "height" in props,
            anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHiddenWithinTree(elem),
            dataShow = dataPriv.get(elem, "fxshow");

        // Queue-skipping animations hijack the fx hooks
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function () {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;

            anim.always(function () {

                // Ensure the complete handler is called before this completes
                anim.always(function () {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }

        // Detect show/hide animations
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.test(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {

                    // Pretend to be hidden if this is a "show" and
                    // there is still data from a stopped show/hide
                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                        hidden = true;

                        // Ignore all other no-op show/hide data
                    } else {
                        continue;
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            }
        }

        // Bail out if this is a no-op like .hide().hide()
        propTween = !jQuery.isEmptyObject(props);
        if (!propTween && jQuery.isEmptyObject(orig)) {
            return;
        }

        // Restrict "overflow" and "display" styles during box animations
        if (isBox && elem.nodeType === 1) {

            // Support: IE <=9 - 11, Edge 12 - 15
            // Record all 3 overflow attributes because IE does not infer the shorthand
            // from identically-valued overflowX and overflowY and Edge just mirrors
            // the overflowX value there.
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];

            // Identify a display type, preferring old show/hide data over the CSS cascade
            restoreDisplay = dataShow && dataShow.display;
            if (restoreDisplay == null) {
                restoreDisplay = dataPriv.get(elem, "display");
            }
            display = jQuery.css(elem, "display");
            if (display === "none") {
                if (restoreDisplay) {
                    display = restoreDisplay;
                } else {

                    // Get nonempty value(s) by temporarily forcing visibility
                    showHide([elem], true);
                    restoreDisplay = elem.style.display || restoreDisplay;
                    display = jQuery.css(elem, "display");
                    showHide([elem]);
                }
            }

            // Animate inline elements as inline-block
            if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
                if (jQuery.css(elem, "float") === "none") {

                    // Restore the original display value at the end of pure show/hide animations
                    if (!propTween) {
                        anim.done(function () {
                            style.display = restoreDisplay;
                        });
                        if (restoreDisplay == null) {
                            display = style.display;
                            restoreDisplay = display === "none" ? "" : display;
                        }
                    }
                    style.display = "inline-block";
                }
            }
        }

        if (opts.overflow) {
            style.overflow = "hidden";
            anim.always(function () {
                style.overflow = opts.overflow[0];
                style.overflowX = opts.overflow[1];
                style.overflowY = opts.overflow[2];
            });
        }

        // Implement show/hide animations
        propTween = false;
        for (prop in orig) {

            // General show/hide setup for this element animation
            if (!propTween) {
                if (dataShow) {
                    if ("hidden" in dataShow) {
                        hidden = dataShow.hidden;
                    }
                } else {
                    dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
                }

                // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
                if (toggle) {
                    dataShow.hidden = !hidden;
                }

                // Show elements before animating them
                if (hidden) {
                    showHide([elem], true);
                }

                /* eslint-disable no-loop-func */

                anim.done(function () {

                    /* eslint-enable no-loop-func */

                    // The final step of a "hide" animation is actually hiding the element
                    if (!hidden) {
                        showHide([elem]);
                    }
                    dataPriv.remove(elem, "fxshow");
                    for (prop in orig) {
                        jQuery.style(elem, prop, orig[prop]);
                    }
                });
            }

            // Per-property setup
            propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
            if (!(prop in dataShow)) {
                dataShow[prop] = propTween.start;
                if (hidden) {
                    propTween.end = propTween.start;
                    propTween.start = 0;
                }
            }
        }
    }

    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;

        // camelCase, specialEasing and expand cssHook pass
        for (index in props) {
            name = camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (Array.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }

            if (index !== name) {
                props[name] = value;
                delete props[index];
            }

            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];

                // Not quite $.extend, this won't overwrite existing keys.
                // Reusing 'index' because we have the correct "name"
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            } else {
                specialEasing[name] = easing;
            }
        }
    }

    function Animation(elem, properties, options) {
        var result,
            stopped,
            index = 0,
            length = Animation.prefilters.length,
            deferred = jQuery.Deferred().always(function () {

                // Don't match elem in the :animated selector
                delete tick.elem;
            }),
            tick = function () {
                if (stopped) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),

                    // Support: Android 2.3 only
                    // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;

                for (; index < length; index++) {
                    animation.tweens[index].run(percent);
                }

                deferred.notifyWith(elem, [animation, percent, remaining]);

                // If there's more to do, yield
                if (percent < 1 && length) {
                    return remaining;
                }

                // If this was an empty animation, synthesize a final progress notification
                if (!length) {
                    deferred.notifyWith(elem, [animation, 1, 0]);
                }

                // Resolve the animation and report its conclusion
                deferred.resolveWith(elem, [animation]);
                return false;
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {},
                    easing: jQuery.easing._default
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function (prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end,
                        animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function (gotoEnd) {
                    var index = 0,

                        // If we are going to the end, we want to run all the tweens
                        // otherwise we skip this part
                        length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) {
                        return this;
                    }
                    stopped = true;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1);
                    }

                    // Resolve when we played the last frame; otherwise, reject
                    if (gotoEnd) {
                        deferred.notifyWith(elem, [animation, 1, 0]);
                        deferred.resolveWith(elem, [animation, gotoEnd]);
                    } else {
                        deferred.rejectWith(elem, [animation, gotoEnd]);
                    }
                    return this;
                }
            }),
            props = animation.props;

        propFilter(props, animation.opts.specialEasing);

        for (; index < length; index++) {
            result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                if (isFunction(result.stop)) {
                    jQuery._queueHooks(animation.elem, animation.opts.queue).stop =
                        result.stop.bind(result);
                }
                return result;
            }
        }

        jQuery.map(props, createTween, animation);

        if (isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }

        // Attach callbacks from options
        animation
            .progress(animation.opts.progress)
            .done(animation.opts.done, animation.opts.complete)
            .fail(animation.opts.fail)
            .always(animation.opts.always);

        jQuery.fx.timer(
            jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            })
        );

        return animation;
    }

    jQuery.Animation = jQuery.extend(Animation, {

        tweeners: {
            "*": [function (prop, value) {
                var tween = this.createTween(prop, value);
                adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                return tween;
            }]
        },

        tweener: function (props, callback) {
            if (isFunction(props)) {
                callback = props;
                props = ["*"];
            } else {
                props = props.match(rnothtmlwhite);
            }

            var prop,
                index = 0,
                length = props.length;

            for (; index < length; index++) {
                prop = props[index];
                Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                Animation.tweeners[prop].unshift(callback);
            }
        },

        prefilters: [defaultPrefilter],

        prefilter: function (callback, prepend) {
            if (prepend) {
                Animation.prefilters.unshift(callback);
            } else {
                Animation.prefilters.push(callback);
            }
        }
    });

    jQuery.speed = function (speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing ||
                isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !isFunction(easing) && easing
        };

        // Go to the end state if fx are off
        if (jQuery.fx.off) {
            opt.duration = 0;

        } else {
            if (typeof opt.duration !== "number") {
                if (opt.duration in jQuery.fx.speeds) {
                    opt.duration = jQuery.fx.speeds[opt.duration];

                } else {
                    opt.duration = jQuery.fx.speeds._default;
                }
            }
        }

        // Normalize opt.queue - true/undefined/null -> "fx"
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }

        // Queueing
        opt.old = opt.complete;

        opt.complete = function () {
            if (isFunction(opt.old)) {
                opt.old.call(this);
            }

            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };

        return opt;
    };

    jQuery.fn.extend({
        fadeTo: function (speed, to, easing, callback) {

            // Show any hidden elements after setting opacity to 0
            return this.filter(isHiddenWithinTree).css("opacity", 0).show()

                // Animate to the value specified
                .end().animate({ opacity: to }, speed, easing, callback);
        },
        animate: function (prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop),
                optall = jQuery.speed(speed, easing, callback),
                doAnimation = function () {

                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation(this, jQuery.extend({}, prop), optall);

                    // Empty animations, or finishing resolves immediately
                    if (empty || dataPriv.get(this, "finish")) {
                        anim.stop(true);
                    }
                };
            doAnimation.finish = doAnimation;

            return empty || optall.queue === false ?
                this.each(doAnimation) :
                this.queue(optall.queue, doAnimation);
        },
        stop: function (type, clearQueue, gotoEnd) {
            var stopQueue = function (hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };

            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }

            return this.each(function () {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = dataPriv.get(this);

                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }

                for (index = timers.length; index--;) {
                    if (timers[index].elem === this &&
                        (type == null || timers[index].queue === type)) {

                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }

                // Start the next in the queue if the last step wasn't forced.
                // Timers currently will call their complete callbacks, which
                // will dequeue but only if they were gotoEnd.
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        },
        finish: function (type) {
            if (type !== false) {
                type = type || "fx";
            }
            return this.each(function () {
                var index,
                    data = dataPriv.get(this),
                    queue = data[type + "queue"],
                    hooks = data[type + "queueHooks"],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;

                // Enable finishing flag on private data
                data.finish = true;

                // Empty the queue first
                jQuery.queue(this, type, []);

                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true);
                }

                // Look for any active animations, and finish them
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                }

                // Look for any animations in the old queue and finish them
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this);
                    }
                }

                // Turn off finishing flag
                delete data.finish;
            });
        }
    });

    jQuery.each(["toggle", "show", "hide"], function (i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function (speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ?
                cssFn.apply(this, arguments) :
                this.animate(genFx(name, true), speed, easing, callback);
        };
    });

    // Generate shortcuts for custom animations
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
    }, function (name, props) {
        jQuery.fn[name] = function (speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });

    jQuery.timers = [];
    jQuery.fx.tick = function () {
        var timer,
            i = 0,
            timers = jQuery.timers;

        fxNow = Date.now();

        for (; i < timers.length; i++) {
            timer = timers[i];

            // Run the timer and safely remove it when done (allowing for external removal)
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }

        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };

    jQuery.fx.timer = function (timer) {
        jQuery.timers.push(timer);
        jQuery.fx.start();
    };

    jQuery.fx.interval = 13;
    jQuery.fx.start = function () {
        if (inProgress) {
            return;
        }

        inProgress = true;
        schedule();
    };

    jQuery.fx.stop = function () {
        inProgress = null;
    };

    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,

        // Default speed
        _default: 400
    };


    // Based off of the plugin by Clint Helfers, with permission.
    // https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function (time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";

        return this.queue(type, function (next, hooks) {
            var timeout = window.setTimeout(next, time);
            hooks.stop = function () {
                window.clearTimeout(timeout);
            };
        });
    };


    (function () {
        var input = document.createElement("input"),
            select = document.createElement("select"),
            opt = select.appendChild(document.createElement("option"));

        input.type = "checkbox";

        // Support: Android <=4.3 only
        // Default value for a checkbox should be "on"
        support.checkOn = input.value !== "";

        // Support: IE <=11 only
        // Must access selectedIndex to make default options select
        support.optSelected = opt.selected;

        // Support: IE <=11 only
        // An input loses its value after becoming a radio
        input = document.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
    })();


    var boolHook,
        attrHandle = jQuery.expr.attrHandle;

    jQuery.fn.extend({
        attr: function (name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },

        removeAttr: function (name) {
            return this.each(function () {
                jQuery.removeAttr(this, name);
            });
        }
    });

    jQuery.extend({
        attr: function (elem, name, value) {
            var ret, hooks,
                nType = elem.nodeType;

            // Don't get/set attributes on text, comment and attribute nodes
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            // Fallback to prop when attributes are not supported
            if (typeof elem.getAttribute === "undefined") {
                return jQuery.prop(elem, name, value);
            }

            // Attribute hooks are determined by the lowercase version
            // Grab necessary hook if one is defined
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                hooks = jQuery.attrHooks[name.toLowerCase()] ||
                    (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
            }

            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return;
                }

                if (hooks && "set" in hooks &&
                    (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                }

                elem.setAttribute(name, value + "");
                return value;
            }

            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            }

            ret = jQuery.find.attr(elem, name);

            // Non-existent attributes return null, we normalize to undefined
            return ret == null ? undefined : ret;
        },

        attrHooks: {
            type: {
                set: function (elem, value) {
                    if (!support.radioValue && value === "radio" &&
                        nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        },

        removeAttr: function (elem, value) {
            var name,
                i = 0,

                // Attribute names can contain non-HTML whitespace characters
                // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
                attrNames = value && value.match(rnothtmlwhite);

            if (attrNames && elem.nodeType === 1) {
                while ((name = attrNames[i++])) {
                    elem.removeAttribute(name);
                }
            }
        }
    });

    // Hooks for boolean attributes
    boolHook = {
        set: function (elem, value, name) {
            if (value === false) {

                // Remove boolean attributes when set to false
                jQuery.removeAttr(elem, name);
            } else {
                elem.setAttribute(name, name);
            }
            return name;
        }
    };

    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;

        attrHandle[name] = function (elem, name, isXML) {
            var ret, handle,
                lowercaseName = name.toLowerCase();

            if (!isXML) {

                // Avoid an infinite loop by temporarily removing this function from the getter
                handle = attrHandle[lowercaseName];
                attrHandle[lowercaseName] = ret;
                ret = getter(elem, name, isXML) != null ?
                    lowercaseName :
                    null;
                attrHandle[lowercaseName] = handle;
            }
            return ret;
        };
    });




    var rfocusable = /^(?:input|select|textarea|button)$/i,
        rclickable = /^(?:a|area)$/i;

    jQuery.fn.extend({
        prop: function (name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },

        removeProp: function (name) {
            return this.each(function () {
                delete this[jQuery.propFix[name] || name];
            });
        }
    });

    jQuery.extend({
        prop: function (elem, name, value) {
            var ret, hooks,
                nType = elem.nodeType;

            // Don't get/set properties on text, comment and attribute nodes
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

                // Fix name and attach hooks
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }

            if (value !== undefined) {
                if (hooks && "set" in hooks &&
                    (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                }

                return (elem[name] = value);
            }

            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            }

            return elem[name];
        },

        propHooks: {
            tabIndex: {
                get: function (elem) {

                    // Support: IE <=9 - 11 only
                    // elem.tabIndex doesn't always return the
                    // correct value when it hasn't been explicitly set
                    // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    // Use proper attribute retrieval(#12072)
                    var tabindex = jQuery.find.attr(elem, "tabindex");

                    if (tabindex) {
                        return parseInt(tabindex, 10);
                    }

                    if (
                        rfocusable.test(elem.nodeName) ||
                        rclickable.test(elem.nodeName) &&
                        elem.href
                    ) {
                        return 0;
                    }

                    return -1;
                }
            }
        },

        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    });

    // Support: IE <=11 only
    // Accessing the selectedIndex property
    // forces the browser to respect setting selected
    // on the option
    // The getter ensures a default option is selected
    // when in an optgroup
    // eslint rule "no-unused-expressions" is disabled for this code
    // since it considers such accessions noop
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function (elem) {

                /* eslint no-unused-expressions: "off" */

                var parent = elem.parentNode;
                if (parent && parent.parentNode) {
                    parent.parentNode.selectedIndex;
                }
                return null;
            },
            set: function (elem) {

                /* eslint no-unused-expressions: "off" */

                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;

                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
            }
        };
    }

    jQuery.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
    ], function () {
        jQuery.propFix[this.toLowerCase()] = this;
    });




    // Strip and collapse whitespace according to HTML spec
    // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
    function stripAndCollapse(value) {
        var tokens = value.match(rnothtmlwhite) || [];
        return tokens.join(" ");
    }


    function getClass(elem) {
        return elem.getAttribute && elem.getAttribute("class") || "";
    }

    function classesToArray(value) {
        if (Array.isArray(value)) {
            return value;
        }
        if (typeof value === "string") {
            return value.match(rnothtmlwhite) || [];
        }
        return [];
    }

    jQuery.fn.extend({
        addClass: function (value) {
            var classes, elem, cur, curValue, clazz, j, finalValue,
                i = 0;

            if (isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).addClass(value.call(this, j, getClass(this)));
                });
            }

            classes = classesToArray(value);

            if (classes.length) {
                while ((elem = this[i++])) {
                    curValue = getClass(elem);
                    cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");

                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " ";
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse(cur);
                        if (curValue !== finalValue) {
                            elem.setAttribute("class", finalValue);
                        }
                    }
                }
            }

            return this;
        },

        removeClass: function (value) {
            var classes, elem, cur, curValue, clazz, j, finalValue,
                i = 0;

            if (isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).removeClass(value.call(this, j, getClass(this)));
                });
            }

            if (!arguments.length) {
                return this.attr("class", "");
            }

            classes = classesToArray(value);

            if (classes.length) {
                while ((elem = this[i++])) {
                    curValue = getClass(elem);

                    // This expression is here for better compressibility (see addClass)
                    cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");

                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {

                            // Remove *all* instances
                            while (cur.indexOf(" " + clazz + " ") > -1) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse(cur);
                        if (curValue !== finalValue) {
                            elem.setAttribute("class", finalValue);
                        }
                    }
                }
            }

            return this;
        },

        toggleClass: function (value, stateVal) {
            var type = typeof value,
                isValidValue = type === "string" || Array.isArray(value);

            if (typeof stateVal === "boolean" && isValidValue) {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }

            if (isFunction(value)) {
                return this.each(function (i) {
                    jQuery(this).toggleClass(
                        value.call(this, i, getClass(this), stateVal),
                        stateVal
                    );
                });
            }

            return this.each(function () {
                var className, i, self, classNames;

                if (isValidValue) {

                    // Toggle individual class names
                    i = 0;
                    self = jQuery(this);
                    classNames = classesToArray(value);

                    while ((className = classNames[i++])) {

                        // Check each className given, space separated list
                        if (self.hasClass(className)) {
                            self.removeClass(className);
                        } else {
                            self.addClass(className);
                        }
                    }

                    // Toggle whole class name
                } else if (value === undefined || type === "boolean") {
                    className = getClass(this);
                    if (className) {

                        // Store className if set
                        dataPriv.set(this, "__className__", className);
                    }

                    // If the element has a class name or if we're passed `false`,
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    if (this.setAttribute) {
                        this.setAttribute("class",
                            className || value === false ?
                                "" :
                                dataPriv.get(this, "__className__") || ""
                        );
                    }
                }
            });
        },

        hasClass: function (selector) {
            var className, elem,
                i = 0;

            className = " " + selector + " ";
            while ((elem = this[i++])) {
                if (elem.nodeType === 1 &&
                    (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
                    return true;
                }
            }

            return false;
        }
    });




    var rreturn = /\r/g;

    jQuery.fn.extend({
        val: function (value) {
            var hooks, ret, valueIsFunction,
                elem = this[0];

            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] ||
                        jQuery.valHooks[elem.nodeName.toLowerCase()];

                    if (hooks &&
                        "get" in hooks &&
                        (ret = hooks.get(elem, "value")) !== undefined
                    ) {
                        return ret;
                    }

                    ret = elem.value;

                    // Handle most common string cases
                    if (typeof ret === "string") {
                        return ret.replace(rreturn, "");
                    }

                    // Handle cases where value is null/undef or number
                    return ret == null ? "" : ret;
                }

                return;
            }

            valueIsFunction = isFunction(value);

            return this.each(function (i) {
                var val;

                if (this.nodeType !== 1) {
                    return;
                }

                if (valueIsFunction) {
                    val = value.call(this, i, jQuery(this).val());
                } else {
                    val = value;
                }

                // Treat null/undefined as ""; convert numbers to string
                if (val == null) {
                    val = "";

                } else if (typeof val === "number") {
                    val += "";

                } else if (Array.isArray(val)) {
                    val = jQuery.map(val, function (value) {
                        return value == null ? "" : value + "";
                    });
                }

                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

                // If set returns undefined, fall back to normal setting
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });

    jQuery.extend({
        valHooks: {
            option: {
                get: function (elem) {

                    var val = jQuery.find.attr(elem, "value");
                    return val != null ?
                        val :

                        // Support: IE <=10 - 11 only
                        // option.text throws exceptions (#14686, #14858)
                        // Strip and collapse whitespace
                        // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                        stripAndCollapse(jQuery.text(elem));
                }
            },
            select: {
                get: function (elem) {
                    var value, option, i,
                        options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one",
                        values = one ? null : [],
                        max = one ? index + 1 : options.length;

                    if (index < 0) {
                        i = max;

                    } else {
                        i = one ? index : 0;
                    }

                    // Loop through all the selected options
                    for (; i < max; i++) {
                        option = options[i];

                        // Support: IE <=9 only
                        // IE8-9 doesn't update selected after form reset (#2551)
                        if ((option.selected || i === index) &&

                            // Don't return options that are disabled or in a disabled optgroup
                            !option.disabled &&
                            (!option.parentNode.disabled ||
                                !nodeName(option.parentNode, "optgroup"))) {

                            // Get the specific value for the option
                            value = jQuery(option).val();

                            // We don't need an array for one selects
                            if (one) {
                                return value;
                            }

                            // Multi-Selects return an array
                            values.push(value);
                        }
                    }

                    return values;
                },

                set: function (elem, value) {
                    var optionSet, option,
                        options = elem.options,
                        values = jQuery.makeArray(value),
                        i = options.length;

                    while (i--) {
                        option = options[i];

                        /* eslint-disable no-cond-assign */

                        if (option.selected =
                            jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1
                        ) {
                            optionSet = true;
                        }

                        /* eslint-enable no-cond-assign */
                    }

                    // Force browsers to behave consistently when non-matching value is set
                    if (!optionSet) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        }
    });

    // Radios and checkboxes getter/setter
    jQuery.each(["radio", "checkbox"], function () {
        jQuery.valHooks[this] = {
            set: function (elem, value) {
                if (Array.isArray(value)) {
                    return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function (elem) {
                return elem.getAttribute("value") === null ? "on" : elem.value;
            };
        }
    });




    // Return jQuery for attributes-only inclusion


    support.focusin = "onfocusin" in window;


    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        stopPropagationCallback = function (e) {
            e.stopPropagation();
        };

    jQuery.extend(jQuery.event, {

        trigger: function (event, data, elem, onlyHandlers) {

            var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
                eventPath = [elem || document],
                type = hasOwn.call(event, "type") ? event.type : event,
                namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

            cur = lastElement = tmp = elem = elem || document;

            // Don't do events on text and comment nodes
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }

            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }

            if (type.indexOf(".") > -1) {

                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;

            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event = event[jQuery.expando] ?
                event :
                new jQuery.Event(type, typeof event === "object" && event);

            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.rnamespace = event.namespace ?
                new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
                null;

            // Clean up the event in case it is being reused
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }

            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data == null ?
                [event] :
                jQuery.makeArray(data, [event]);

            // Allow special events to draw outside the lines
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }

            // Determine event propagation path in advance, per W3C events spec (#9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
            if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {

                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }

            // Fire handlers on the event path
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                lastElement = cur;
                event.type = i > 1 ?
                    bubbleType :
                    special.bindType || type;

                // jQuery handler
                handle = (dataPriv.get(cur, "events") || {})[event.type] &&
                    dataPriv.get(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }

                // Native handler
                handle = ontype && cur[ontype];
                if (handle && handle.apply && acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;

            // If nobody prevented the default action, do it now
            if (!onlyHandlers && !event.isDefaultPrevented()) {

                if ((!special._default ||
                    special._default.apply(eventPath.pop(), data) === false) &&
                    acceptData(elem)) {

                    // Call a native DOM method on the target with the same name as the event.
                    // Don't do default actions on window, that's where global variables be (#6170)
                    if (ontype && isFunction(elem[type]) && !isWindow(elem)) {

                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp = elem[ontype];

                        if (tmp) {
                            elem[ontype] = null;
                        }

                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;

                        if (event.isPropagationStopped()) {
                            lastElement.addEventListener(type, stopPropagationCallback);
                        }

                        elem[type]();

                        if (event.isPropagationStopped()) {
                            lastElement.removeEventListener(type, stopPropagationCallback);
                        }

                        jQuery.event.triggered = undefined;

                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }

            return event.result;
        },

        // Piggyback on a donor event to simulate a different one
        // Used only for `focus(in | out)` events
        simulate: function (type, elem, event) {
            var e = jQuery.extend(
                new jQuery.Event(),
                event,
                {
                    type: type,
                    isSimulated: true
                }
            );

            jQuery.event.trigger(e, null, elem);
        }

    });

    jQuery.fn.extend({

        trigger: function (type, data) {
            return this.each(function () {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function (type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });


    // Support: Firefox <=44
    // Firefox doesn't have focus(in | out) events
    // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
    //
    // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
    // focus(in | out) events fire after focus & blur events,
    // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
    // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
    if (!support.focusin) {
        jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

            // Attach a single capturing handler on the document while someone wants focusin/focusout
            var handler = function (event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
            };

            jQuery.event.special[fix] = {
                setup: function () {
                    var doc = this.ownerDocument || this,
                        attaches = dataPriv.access(doc, fix);

                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    dataPriv.access(doc, fix, (attaches || 0) + 1);
                },
                teardown: function () {
                    var doc = this.ownerDocument || this,
                        attaches = dataPriv.access(doc, fix) - 1;

                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        dataPriv.remove(doc, fix);

                    } else {
                        dataPriv.access(doc, fix, attaches);
                    }
                }
            };
        });
    }
    var location = window.location;

    var nonce = Date.now();

    var rquery = (/\?/);



    // Cross-browser xml parsing
    jQuery.parseXML = function (data) {
        var xml;
        if (!data || typeof data !== "string") {
            return null;
        }

        // Support: IE 9 - 11 only
        // IE throws on parseFromString with invalid input.
        try {
            xml = (new window.DOMParser()).parseFromString(data, "text/xml");
        } catch (e) {
            xml = undefined;
        }

        if (!xml || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    };


    var
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams(prefix, obj, traditional, add) {
        var name;

        if (Array.isArray(obj)) {

            // Serialize array item.
            jQuery.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {

                    // Treat each array item as a scalar.
                    add(prefix, v);

                } else {

                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams(
                        prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
                        v,
                        traditional,
                        add
                    );
                }
            });

        } else if (!traditional && toType(obj) === "object") {

            // Serialize object item.
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }

        } else {

            // Serialize scalar item.
            add(prefix, obj);
        }
    }

    // Serialize an array of form elements or a set of
    // key/values into a query string
    jQuery.param = function (a, traditional) {
        var prefix,
            s = [],
            add = function (key, valueOrFunction) {

                // If value is a function, invoke it and use its return value
                var value = isFunction(valueOrFunction) ?
                    valueOrFunction() :
                    valueOrFunction;

                s[s.length] = encodeURIComponent(key) + "=" +
                    encodeURIComponent(value == null ? "" : value);
            };

        // If an array was passed in, assume that it is an array of form elements.
        if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {

            // Serialize the form elements
            jQuery.each(a, function () {
                add(this.name, this.value);
            });

        } else {

            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }

        // Return the resulting serialization
        return s.join("&");
    };

    jQuery.fn.extend({
        serialize: function () {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {

                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            })
                .filter(function () {
                    var type = this.type;

                    // Use .is( ":disabled" ) so that fieldset[disabled] works
                    return this.name && !jQuery(this).is(":disabled") &&
                        rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
                        (this.checked || !rcheckableType.test(type));
                })
                .map(function (i, elem) {
                    var val = jQuery(this).val();

                    if (val == null) {
                        return null;
                    }

                    if (Array.isArray(val)) {
                        return jQuery.map(val, function (val) {
                            return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                        });
                    }

                    return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                }).get();
        }
    });


    var
        r20 = /%20/g,
        rhash = /#.*$/,
        rantiCache = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

        // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,

        /* Prefilters
         * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
         * 2) These are called:
         *    - BEFORE asking for a transport
         *    - AFTER param serialization (s.data is a string if s.processData is true)
         * 3) key is the dataType
         * 4) the catchall symbol "*" can be used
         * 5) execution will start with transport dataType and THEN continue down to "*" if needed
         */
        prefilters = {},

        /* Transports bindings
         * 1) key is the dataType
         * 2) the catchall symbol "*" can be used
         * 3) selection will start with transport dataType and THEN go to "*" if needed
         */
        transports = {},

        // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = "*/".concat("*"),

        // Anchor tag for parsing the document origin
        originAnchor = document.createElement("a");
    originAnchor.href = location.href;

    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports(structure) {

        // dataTypeExpression is optional and defaults to "*"
        return function (dataTypeExpression, func) {

            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }

            var dataType,
                i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

            if (isFunction(func)) {

                // For each dataType in the dataTypeExpression
                while ((dataType = dataTypes[i++])) {

                    // Prepend if requested
                    if (dataType[0] === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);

                        // Otherwise append
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        };
    }

    // Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

        var inspected = {},
            seekingTransport = (structure === transports);

        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" &&
                    !seekingTransport && !inspected[dataTypeOrTransport]) {

                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }

        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }

    // A special extend for ajax options
    // that takes "flat" options (not to be deep extended)
    // Fixes #9887
    function ajaxExtend(target, src) {
        var key, deep,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};

        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }

        return target;
    }

    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses(s, jqXHR, responses) {

        var ct, type, finalDataType, firstDataType,
            contents = s.contents,
            dataTypes = s.dataTypes;

        // Remove auto dataType and get content-type in the process
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }

        // Check if we're dealing with a known content-type
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }

        // Check to see if we have a response for the expected dataType
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {

            // Try convertible dataTypes
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }

            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }

        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }

    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev,
            converters = {},

            // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();

        // Create converters map with lowercased keys
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }

        current = dataTypes.shift();

        // Convert to each sequential dataType
        while (current) {

            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }

            // Apply the dataFilter if provided
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }

            prev = current;
            current = dataTypes.shift();

            if (current) {

                // There's only work to do if current dataType is non-auto
                if (current === "*") {

                    current = prev;

                    // Convert response if prev dataType is non-auto and differs from current
                } else if (prev !== "*" && prev !== current) {

                    // Seek a direct converter
                    conv = converters[prev + " " + current] || converters["* " + current];

                    // If none found, seek a pair
                    if (!conv) {
                        for (conv2 in converters) {

                            // If conv2 outputs current
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {

                                // If prev can be converted to accepted input
                                conv = converters[prev + " " + tmp[0]] ||
                                    converters["* " + tmp[0]];
                                if (conv) {

                                    // Condense equivalence converters
                                    if (conv === true) {
                                        conv = converters[conv2];

                                        // Otherwise, insert the intermediate dataType
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    // Apply converter (if not an equivalence)
                    if (conv !== true) {

                        // Unless errors are allowed to bubble, catch and return them
                        if (conv && s.throws) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }

        return { state: "success", data: response };
    }

    jQuery.extend({

        // Counter for holding the number of active queries
        active: 0,

        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},

        ajaxSettings: {
            url: location.href,
            type: "GET",
            isLocal: rlocalProtocol.test(location.protocol),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",

            /*
            timeout: 0,
            data: null,
            dataType: null,
            username: null,
            password: null,
            cache: null,
            throws: false,
            traditional: false,
            headers: {},
            */

            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },

            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },

            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },

            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {

                // Convert anything to text
                "* text": String,

                // Text to html (true = no transformation)
                "text html": true,

                // Evaluate text as a json expression
                "text json": JSON.parse,

                // Parse text as xml
                "text xml": jQuery.parseXML
            },

            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },

        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function (target, settings) {
            return settings ?

                // Building a settings object
                ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

                // Extending ajaxSettings
                ajaxExtend(jQuery.ajaxSettings, target);
        },

        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),

        // Main method
        ajax: function (url, options) {

            // If url is an object, simulate pre-1.5 signature
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }

            // Force options to be an object
            options = options || {};

            var transport,

                // URL without anti-cache param
                cacheURL,

                // Response headers
                responseHeadersString,
                responseHeaders,

                // timeout handle
                timeoutTimer,

                // Url cleanup var
                urlAnchor,

                // Request state (becomes false upon send and true upon completion)
                completed,

                // To know if global events are to be dispatched
                fireGlobals,

                // Loop variable
                i,

                // uncached part of the url
                uncached,

                // Create the final options object
                s = jQuery.ajaxSetup({}, options),

                // Callbacks context
                callbackContext = s.context || s,

                // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context &&
                    (callbackContext.nodeType || callbackContext.jquery) ?
                    jQuery(callbackContext) :
                    jQuery.event,

                // Deferreds
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),

                // Status-dependent callbacks
                statusCode = s.statusCode || {},

                // Headers (they are sent all at once)
                requestHeaders = {},
                requestHeadersNames = {},

                // Default abort message
                strAbort = "canceled",

                // Fake xhr
                jqXHR = {
                    readyState: 0,

                    // Builds headers hashtable if needed
                    getResponseHeader: function (key) {
                        var match;
                        if (completed) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match == null ? null : match;
                    },

                    // Raw string
                    getAllResponseHeaders: function () {
                        return completed ? responseHeadersString : null;
                    },

                    // Caches the header
                    setRequestHeader: function (name, value) {
                        if (completed == null) {
                            name = requestHeadersNames[name.toLowerCase()] =
                                requestHeadersNames[name.toLowerCase()] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },

                    // Overrides response content-type header
                    overrideMimeType: function (type) {
                        if (completed == null) {
                            s.mimeType = type;
                        }
                        return this;
                    },

                    // Status-dependent callbacks
                    statusCode: function (map) {
                        var code;
                        if (map) {
                            if (completed) {

                                // Execute the appropriate callbacks
                                jqXHR.always(map[jqXHR.status]);
                            } else {

                                // Lazy-add the new callbacks in a way that preserves old ones
                                for (code in map) {
                                    statusCode[code] = [statusCode[code], map[code]];
                                }
                            }
                        }
                        return this;
                    },

                    // Cancel the request
                    abort: function (statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText);
                        }
                        done(0, finalText);
                        return this;
                    }
                };

            // Attach deferreds
            deferred.promise(jqXHR);

            // Add protocol if not provided (prefilters might expect it)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = ((url || s.url || location.href) + "")
                .replace(rprotocol, location.protocol + "//");

            // Alias method option to type as per ticket #12004
            s.type = options.method || options.type || s.method || s.type;

            // Extract dataTypes list
            s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

            // A cross-domain request is in order when the origin doesn't match the current origin.
            if (s.crossDomain == null) {
                urlAnchor = document.createElement("a");

                // Support: IE <=8 - 11, Edge 12 - 15
                // IE throws exception on accessing the href property if url is malformed,
                // e.g. http://example.com:80x/
                try {
                    urlAnchor.href = s.url;

                    // Support: IE <=8 - 11 only
                    // Anchor's host property isn't correctly set when s.url is relative
                    urlAnchor.href = urlAnchor.href;
                    s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
                        urlAnchor.protocol + "//" + urlAnchor.host;
                } catch (e) {

                    // If there is an error parsing the URL, assume it is crossDomain,
                    // it can be rejected by the transport if it is invalid
                    s.crossDomain = true;
                }
            }

            // Convert data if not already a string
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }

            // Apply prefilters
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

            // If request was aborted inside a prefilter, stop there
            if (completed) {
                return jqXHR;
            }

            // We can fire global events as of now if asked to
            // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
            fireGlobals = jQuery.event && s.global;

            // Watch for a new set of requests
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }

            // Uppercase the type
            s.type = s.type.toUpperCase();

            // Determine if request has content
            s.hasContent = !rnoContent.test(s.type);

            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            // Remove hash to simplify url manipulation
            cacheURL = s.url.replace(rhash, "");

            // More options handling for requests with no content
            if (!s.hasContent) {

                // Remember the hash so we can put it back
                uncached = s.url.slice(cacheURL.length);

                // If data is available and should be processed, append data to url
                if (s.data && (s.processData || typeof s.data === "string")) {
                    cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }

                // Add or update anti-cache param if needed
                if (s.cache === false) {
                    cacheURL = cacheURL.replace(rantiCache, "$1");
                    uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + (nonce++) + uncached;
                }

                // Put hash and anti-cache on the URL that will be requested (gh-1732)
                s.url = cacheURL + uncached;

                // Change '%20' to '+' if this is encoded form body content (gh-2658)
            } else if (s.data && s.processData &&
                (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
                s.data = s.data.replace(r20, "+");
            }

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }

            // Set the correct header, if data is being sent
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }

            // Set the Accepts header for the server, depending on the dataType
            jqXHR.setRequestHeader(
                "Accept",
                s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
                    s.accepts[s.dataTypes[0]] +
                    (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
                    s.accepts["*"]
            );

            // Check for headers option
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }

            // Allow custom headers/mimetypes and early abort
            if (s.beforeSend &&
                (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {

                // Abort if not done already and return
                return jqXHR.abort();
            }

            // Aborting is no longer a cancellation
            strAbort = "abort";

            // Install callbacks on deferreds
            completeDeferred.add(s.complete);
            jqXHR.done(s.success);
            jqXHR.fail(s.error);

            // Get transport
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

            // If no transport, we auto-abort
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;

                // Send global event
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }

                // If request was aborted inside ajaxSend, stop there
                if (completed) {
                    return jqXHR;
                }

                // Timeout
                if (s.async && s.timeout > 0) {
                    timeoutTimer = window.setTimeout(function () {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }

                try {
                    completed = false;
                    transport.send(requestHeaders, done);
                } catch (e) {

                    // Rethrow post-completion exceptions
                    if (completed) {
                        throw e;
                    }

                    // Propagate others as results
                    done(-1, e);
                }
            }

            // Callback for when everything is done
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified,
                    statusText = nativeStatusText;

                // Ignore repeat invocations
                if (completed) {
                    return;
                }

                completed = true;

                // Clear timeout if it exists
                if (timeoutTimer) {
                    window.clearTimeout(timeoutTimer);
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || "";

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Determine if successful
                isSuccess = status >= 200 && status < 300 || status === 304;

                // Get response data
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }

                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert(s, response, jqXHR, isSuccess);

                // If successful, handle type chaining
                if (isSuccess) {

                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }

                    // if no content
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent";

                        // if not modified
                    } else if (status === 304) {
                        statusText = "notmodified";

                        // If we have data, let's convert it
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {

                    // Extract error from statusText and normalize for non-aborts
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";

                // Success/Error
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }

                // Status-dependent callbacks
                jqXHR.statusCode(statusCode);
                statusCode = undefined;

                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError",
                        [jqXHR, s, isSuccess ? success : error]);
                }

                // Complete
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

                    // Handle the global AJAX counter
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }

            return jqXHR;
        },

        getJSON: function (url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },

        getScript: function (url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });

    jQuery.each(["get", "post"], function (i, method) {
        jQuery[method] = function (url, data, callback, type) {

            // Shift arguments if data argument was omitted
            if (isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            // The url can be an options object (which then must have .url)
            return jQuery.ajax(jQuery.extend({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            }, jQuery.isPlainObject(url) && url));
        };
    });


    jQuery._evalUrl = function (url) {
        return jQuery.ajax({
            url: url,

            // Make this explicit, since user can override this through ajaxSetup (#11264)
            type: "GET",
            dataType: "script",
            cache: true,
            async: false,
            global: false,
            "throws": true
        });
    };


    jQuery.fn.extend({
        wrapAll: function (html) {
            var wrap;

            if (this[0]) {
                if (isFunction(html)) {
                    html = html.call(this[0]);
                }

                // The elements to wrap the target around
                wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }

                wrap.map(function () {
                    var elem = this;

                    while (elem.firstElementChild) {
                        elem = elem.firstElementChild;
                    }

                    return elem;
                }).append(this);
            }

            return this;
        },

        wrapInner: function (html) {
            if (isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }

            return this.each(function () {
                var self = jQuery(this),
                    contents = self.contents();

                if (contents.length) {
                    contents.wrapAll(html);

                } else {
                    self.append(html);
                }
            });
        },

        wrap: function (html) {
            var htmlIsFunction = isFunction(html);

            return this.each(function (i) {
                jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
            });
        },

        unwrap: function (selector) {
            this.parent(selector).not("body").each(function () {
                jQuery(this).replaceWith(this.childNodes);
            });
            return this;
        }
    });


    jQuery.expr.pseudos.hidden = function (elem) {
        return !jQuery.expr.pseudos.visible(elem);
    };
    jQuery.expr.pseudos.visible = function (elem) {
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    };




    jQuery.ajaxSettings.xhr = function () {
        try {
            return new window.XMLHttpRequest();
        } catch (e) { }
    };

    var xhrSuccessStatus = {

        // File protocol always yields status code 0, assume 200
        0: 200,

        // Support: IE <=9 only
        // #1450: sometimes IE returns 1223 when it should be 204
        1223: 204
    },
        xhrSupported = jQuery.ajaxSettings.xhr();

    support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
    support.ajax = xhrSupported = !!xhrSupported;

    jQuery.ajaxTransport(function (options) {
        var callback, errorCallback;

        // Cross domain only allowed if supported through XMLHttpRequest
        if (support.cors || xhrSupported && !options.crossDomain) {
            return {
                send: function (headers, complete) {
                    var i,
                        xhr = options.xhr();

                    xhr.open(
                        options.type,
                        options.url,
                        options.async,
                        options.username,
                        options.password
                    );

                    // Apply custom fields if provided
                    if (options.xhrFields) {
                        for (i in options.xhrFields) {
                            xhr[i] = options.xhrFields[i];
                        }
                    }

                    // Override mime type if needed
                    if (options.mimeType && xhr.overrideMimeType) {
                        xhr.overrideMimeType(options.mimeType);
                    }

                    // X-Requested-With header
                    // For cross-domain requests, seeing as conditions for a preflight are
                    // akin to a jigsaw puzzle, we simply never set it to be sure.
                    // (it can always be set on a per-request basis or even using ajaxSetup)
                    // For same-domain requests, won't change header if already provided.
                    if (!options.crossDomain && !headers["X-Requested-With"]) {
                        headers["X-Requested-With"] = "XMLHttpRequest";
                    }

                    // Set headers
                    for (i in headers) {
                        xhr.setRequestHeader(i, headers[i]);
                    }

                    // Callback
                    callback = function (type) {
                        return function () {
                            if (callback) {
                                callback = errorCallback = xhr.onload =
                                    xhr.onerror = xhr.onabort = xhr.ontimeout =
                                    xhr.onreadystatechange = null;

                                if (type === "abort") {
                                    xhr.abort();
                                } else if (type === "error") {

                                    // Support: IE <=9 only
                                    // On a manual native abort, IE9 throws
                                    // errors on any property access that is not readyState
                                    if (typeof xhr.status !== "number") {
                                        complete(0, "error");
                                    } else {
                                        complete(

                                            // File: protocol always yields status 0; see #8605, #14207
                                            xhr.status,
                                            xhr.statusText
                                        );
                                    }
                                } else {
                                    complete(
                                        xhrSuccessStatus[xhr.status] || xhr.status,
                                        xhr.statusText,

                                        // Support: IE <=9 only
                                        // IE9 has no XHR2 but throws on binary (trac-11426)
                                        // For XHR2 non-text, let the caller handle it (gh-2498)
                                        (xhr.responseType || "text") !== "text" ||
                                            typeof xhr.responseText !== "string" ?
                                            { binary: xhr.response } :
                                            { text: xhr.responseText },
                                        xhr.getAllResponseHeaders()
                                    );
                                }
                            }
                        };
                    };

                    // Listen to events
                    xhr.onload = callback();
                    errorCallback = xhr.onerror = xhr.ontimeout = callback("error");

                    // Support: IE 9 only
                    // Use onreadystatechange to replace onabort
                    // to handle uncaught aborts
                    if (xhr.onabort !== undefined) {
                        xhr.onabort = errorCallback;
                    } else {
                        xhr.onreadystatechange = function () {

                            // Check readyState before timeout as it changes
                            if (xhr.readyState === 4) {

                                // Allow onerror to be called first,
                                // but that will not handle a native abort
                                // Also, save errorCallback to a variable
                                // as xhr.onerror cannot be accessed
                                window.setTimeout(function () {
                                    if (callback) {
                                        errorCallback();
                                    }
                                });
                            }
                        };
                    }

                    // Create the abort callback
                    callback = callback("abort");

                    try {

                        // Do send the request (this may raise an exception)
                        xhr.send(options.hasContent && options.data || null);
                    } catch (e) {

                        // #14683: Only rethrow if this hasn't been notified as an error yet
                        if (callback) {
                            throw e;
                        }
                    }
                },

                abort: function () {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });




    // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
    jQuery.ajaxPrefilter(function (s) {
        if (s.crossDomain) {
            s.contents.script = false;
        }
    });

    // Install script dataType
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, " +
                "application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function (text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });

    // Handle cache's special case and crossDomain
    jQuery.ajaxPrefilter("script", function (s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
        }
    });

    // Bind script tag hack transport
    jQuery.ajaxTransport("script", function (s) {

        // This transport only deals with cross domain requests
        if (s.crossDomain) {
            var script, callback;
            return {
                send: function (_, complete) {
                    script = jQuery("<script>").prop({
                        charset: s.scriptCharset,
                        src: s.url
                    }).on(
                        "load error",
                        callback = function (evt) {
                            script.remove();
                            callback = null;
                            if (evt) {
                                complete(evt.type === "error" ? 404 : 200, evt.type);
                            }
                        }
                    );

                    // Use native DOM manipulation to avoid our domManip AJAX trickery
                    document.head.appendChild(script[0]);
                },
                abort: function () {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });




    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;

    // Default jsonp settings
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
            this[callback] = true;
            return callback;
        }
    });

    // Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

        var callbackName, overwritten, responseContainer,
            jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
                "url" :
                typeof s.data === "string" &&
                (s.contentType || "")
                    .indexOf("application/x-www-form-urlencoded") === 0 &&
                rjsonp.test(s.data) && "data"
            );

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if (jsonProp || s.dataTypes[0] === "jsonp") {

            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ?
                s.jsonpCallback() :
                s.jsonpCallback;

            // Insert callback into url or form data
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }

            // Use data converter to retrieve json after script execution
            s.converters["script json"] = function () {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };

            // Force json dataType
            s.dataTypes[0] = "json";

            // Install callback
            overwritten = window[callbackName];
            window[callbackName] = function () {
                responseContainer = arguments;
            };

            // Clean-up function (fires after converters)
            jqXHR.always(function () {

                // If previous value didn't exist - remove it
                if (overwritten === undefined) {
                    jQuery(window).removeProp(callbackName);

                    // Otherwise restore preexisting value
                } else {
                    window[callbackName] = overwritten;
                }

                // Save back as free
                if (s[callbackName]) {

                    // Make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // Save the callback name for future use
                    oldCallbacks.push(callbackName);
                }

                // Call if it was a function and we have a response
                if (responseContainer && isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }

                responseContainer = overwritten = undefined;
            });

            // Delegate to script
            return "script";
        }
    });




    // Support: Safari 8 only
    // In Safari 8 documents created via document.implementation.createHTMLDocument
    // collapse sibling forms: the second one becomes a child of the first one.
    // Because of that, this security measure has to be disabled in Safari 8.
    // https://bugs.webkit.org/show_bug.cgi?id=137337
    support.createHTMLDocument = (function () {
        var body = document.implementation.createHTMLDocument("").body;
        body.innerHTML = "<form></form><form></form>";
        return body.childNodes.length === 2;
    })();


    // Argument "data" should be string of html
    // context (optional): If specified, the fragment will be created in this context,
    // defaults to document
    // keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function (data, context, keepScripts) {
        if (typeof data !== "string") {
            return [];
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }

        var base, parsed, scripts;

        if (!context) {

            // Stop scripts or inline event handlers from being executed immediately
            // by using document.implementation
            if (support.createHTMLDocument) {
                context = document.implementation.createHTMLDocument("");

                // Set the base href for the created document
                // so any parsed elements with URLs
                // are based on the document's URL (gh-2965)
                base = context.createElement("base");
                base.href = document.location.href;
                context.head.appendChild(base);
            } else {
                context = document;
            }
        }

        parsed = rsingleTag.exec(data);
        scripts = !keepScripts && [];

        // Single tag
        if (parsed) {
            return [context.createElement(parsed[1])];
        }

        parsed = buildFragment([data], context, scripts);

        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }

        return jQuery.merge([], parsed.childNodes);
    };


    /**
     * Load a url into a page
     */
    jQuery.fn.load = function (url, params, callback) {
        var selector, type, response,
            self = this,
            off = url.indexOf(" ");

        if (off > -1) {
            selector = stripAndCollapse(url.slice(off));
            url = url.slice(0, off);
        }

        // If it's a function
        if (isFunction(params)) {

            // We assume that it's the callback
            callback = params;
            params = undefined;

            // Otherwise, build a param string
        } else if (params && typeof params === "object") {
            type = "POST";
        }

        // If we have elements to modify, make the request
        if (self.length > 0) {
            jQuery.ajax({
                url: url,

                // If "type" variable is undefined, then "GET" method will be used.
                // Make value of this field explicit since
                // user can override it through ajaxSetup method
                type: type || "GET",
                dataType: "html",
                data: params
            }).done(function (responseText) {

                // Save response for use in complete callback
                response = arguments;

                self.html(selector ?

                    // If a selector was specified, locate the right elements in a dummy div
                    // Exclude scripts to avoid IE 'Permission Denied' errors
                    jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

                    // Otherwise use the full result
                    responseText);

                // If the request succeeds, this function gets "data", "status", "jqXHR"
                // but they are ignored because response was set above.
                // If it fails, this function gets "jqXHR", "status", "error"
            }).always(callback && function (jqXHR, status) {
                self.each(function () {
                    callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
                });
            });
        }

        return this;
    };




    // Attach a bunch of functions for handling common AJAX events
    jQuery.each([
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend"
    ], function (i, type) {
        jQuery.fn[type] = function (fn) {
            return this.on(type, fn);
        };
    });




    jQuery.expr.pseudos.animated = function (elem) {
        return jQuery.grep(jQuery.timers, function (fn) {
            return elem === fn.elem;
        }).length;
    };




    jQuery.offset = {
        setOffset: function (elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
                position = jQuery.css(elem, "position"),
                curElem = jQuery(elem),
                props = {};

            // Set position first, in-case top/left are set even on static elem
            if (position === "static") {
                elem.style.position = "relative";
            }

            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") &&
                (curCSSTop + curCSSLeft).indexOf("auto") > -1;

            // Need to be able to calculate position if either
            // top or left is auto and position is either absolute or fixed
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;

            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }

            if (isFunction(options)) {

                // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
                options = options.call(elem, i, jQuery.extend({}, curOffset));
            }

            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }

            if ("using" in options) {
                options.using.call(elem, props);

            } else {
                curElem.css(props);
            }
        }
    };

    jQuery.fn.extend({

        // offset() relates an element's border box to the document origin
        offset: function (options) {

            // Preserve chaining for setter
            if (arguments.length) {
                return options === undefined ?
                    this :
                    this.each(function (i) {
                        jQuery.offset.setOffset(this, options, i);
                    });
            }

            var rect, win,
                elem = this[0];

            if (!elem) {
                return;
            }

            // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
            // Support: IE <=11 only
            // Running getBoundingClientRect on a
            // disconnected node in IE throws an error
            if (!elem.getClientRects().length) {
                return { top: 0, left: 0 };
            }

            // Get document-relative position by adding viewport scroll to viewport-relative gBCR
            rect = elem.getBoundingClientRect();
            win = elem.ownerDocument.defaultView;
            return {
                top: rect.top + win.pageYOffset,
                left: rect.left + win.pageXOffset
            };
        },

        // position() relates an element's margin box to its offset parent's padding box
        // This corresponds to the behavior of CSS absolute positioning
        position: function () {
            if (!this[0]) {
                return;
            }

            var offsetParent, offset, doc,
                elem = this[0],
                parentOffset = { top: 0, left: 0 };

            // position:fixed elements are offset from the viewport, which itself always has zero offset
            if (jQuery.css(elem, "position") === "fixed") {

                // Assume position:fixed implies availability of getBoundingClientRect
                offset = elem.getBoundingClientRect();

            } else {
                offset = this.offset();

                // Account for the *real* offset parent, which can be the document or its root element
                // when a statically positioned element is identified
                doc = elem.ownerDocument;
                offsetParent = elem.offsetParent || doc.documentElement;
                while (offsetParent &&
                    (offsetParent === doc.body || offsetParent === doc.documentElement) &&
                    jQuery.css(offsetParent, "position") === "static") {

                    offsetParent = offsetParent.parentNode;
                }
                if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {

                    // Incorporate borders into its offset, since they are outside its content origin
                    parentOffset = jQuery(offsetParent).offset();
                    parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
                    parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
                }
            }

            // Subtract parent offsets and element margins
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },

        // This method will return documentElement in the following cases:
        // 1) For the element inside the iframe without offsetParent, this method will return
        //    documentElement of the parent window
        // 2) For the hidden or detached element
        // 3) For body or html element, i.e. in case of the html node - it will return itself
        //
        // but those exceptions were never presented as a real life use-cases
        // and might be considered as more preferable results.
        //
        // This logic, however, is not guaranteed and can change at any point in the future
        offsetParent: function () {
            return this.map(function () {
                var offsetParent = this.offsetParent;

                while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                    offsetParent = offsetParent.offsetParent;
                }

                return offsetParent || documentElement;
            });
        }
    });

    // Create scrollLeft and scrollTop methods
    jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
        var top = "pageYOffset" === prop;

        jQuery.fn[method] = function (val) {
            return access(this, function (elem, method, val) {

                // Coalesce documents and windows
                var win;
                if (isWindow(elem)) {
                    win = elem;
                } else if (elem.nodeType === 9) {
                    win = elem.defaultView;
                }

                if (val === undefined) {
                    return win ? win[prop] : elem[method];
                }

                if (win) {
                    win.scrollTo(
                        !top ? val : win.pageXOffset,
                        top ? val : win.pageYOffset
                    );

                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length);
        };
    });

    // Support: Safari <=7 - 9.1, Chrome <=37 - 49
    // Add the top/left cssHooks using jQuery.fn.position
    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
    // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
    // getComputedStyle returns percent when specified for top/left/bottom/right;
    // rather than make the css module depend on the offset module, just check for it here
    jQuery.each(["top", "left"], function (i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
            function (elem, computed) {
                if (computed) {
                    computed = curCSS(elem, prop);

                    // If curCSS returns percentage, fallback to offset
                    return rnumnonpx.test(computed) ?
                        jQuery(elem).position()[prop] + "px" :
                        computed;
                }
            }
        );
    });


    // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
        jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name },
            function (defaultExtra, funcName) {

                // Margin is only for outerHeight, outerWidth
                jQuery.fn[funcName] = function (margin, value) {
                    var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                        extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

                    return access(this, function (elem, type, value) {
                        var doc;

                        if (isWindow(elem)) {

                            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
                            return funcName.indexOf("outer") === 0 ?
                                elem["inner" + name] :
                                elem.document.documentElement["client" + name];
                        }

                        // Get document width or height
                        if (elem.nodeType === 9) {
                            doc = elem.documentElement;

                            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                            // whichever is greatest
                            return Math.max(
                                elem.body["scroll" + name], doc["scroll" + name],
                                elem.body["offset" + name], doc["offset" + name],
                                doc["client" + name]
                            );
                        }

                        return value === undefined ?

                            // Get width or height on the element, requesting but not forcing parseFloat
                            jQuery.css(elem, type, extra) :

                            // Set width or height on the element
                            jQuery.style(elem, type, value, extra);
                    }, type, chainable ? margin : undefined, chainable);
                };
            });
    });


    jQuery.each(("blur focus focusin focusout resize scroll click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup contextmenu").split(" "),
        function (i, name) {

            // Handle event binding
            jQuery.fn[name] = function (data, fn) {
                return arguments.length > 0 ?
                    this.on(name, null, data, fn) :
                    this.trigger(name);
            };
        });

    jQuery.fn.extend({
        hover: function (fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    });




    jQuery.fn.extend({

        bind: function (types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function (types, fn) {
            return this.off(types, null, fn);
        },

        delegate: function (selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function (selector, types, fn) {

            // ( namespace ) or ( selector, types [, fn] )
            return arguments.length === 1 ?
                this.off(selector, "**") :
                this.off(types, selector || "**", fn);
        }
    });

    // Bind a function to a context, optionally partially applying any
    // arguments.
    // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
    // However, it is not slated for removal any time soon
    jQuery.proxy = function (fn, context) {
        var tmp, args, proxy;

        if (typeof context === "string") {
            tmp = fn[context];
            context = fn;
            fn = tmp;
        }

        // Quick check to determine if target is callable, in the spec
        // this throws a TypeError, but we will just return undefined.
        if (!isFunction(fn)) {
            return undefined;
        }

        // Simulated bind
        args = slice.call(arguments, 2);
        proxy = function () {
            return fn.apply(context || this, args.concat(slice.call(arguments)));
        };

        // Set the guid of unique handler to the same of original handler, so it can be removed
        proxy.guid = fn.guid = fn.guid || jQuery.guid++;

        return proxy;
    };

    jQuery.holdReady = function (hold) {
        if (hold) {
            jQuery.readyWait++;
        } else {
            jQuery.ready(true);
        }
    };
    jQuery.isArray = Array.isArray;
    jQuery.parseJSON = JSON.parse;
    jQuery.nodeName = nodeName;
    jQuery.isFunction = isFunction;
    jQuery.isWindow = isWindow;
    jQuery.camelCase = camelCase;
    jQuery.type = toType;

    jQuery.now = Date.now;

    jQuery.isNumeric = function (obj) {

        // As of jQuery 3.0, isNumeric is limited to
        // strings and numbers (primitives or objects)
        // that can be coerced to finite numbers (gh-2662)
        var type = jQuery.type(obj);
        return (type === "number" || type === "string") &&

            // parseFloat NaNs numeric-cast false positives ("")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            !isNaN(obj - parseFloat(obj));
    };




    // Register as a named AMD module, since jQuery can be concatenated with other
    // files that may use define, but not via a proper concatenation script that
    // understands anonymous AMD modules. A named AMD is safest and most robust
    // way to register. Lowercase jquery is used because AMD module names are
    // derived from file names, and jQuery is normally delivered in a lowercase
    // file name. Do this after creating the global so that if an AMD module wants
    // to call noConflict to hide this version of jQuery, it will work.

    // Note that for maximum portability, libraries that are not jQuery should
    // declare themselves as anonymous modules, and avoid setting a global if an
    // AMD loader is present. jQuery is a special case. For more information, see
    // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

    if (typeof define === "function" && define.amd) {
        define("jquery", [], function () {
            return jQuery;
        });
    }




    var

        // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

        // Map over the $ in case of overwrite
        _$ = window.$;

    jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }

        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };

    // Expose jQuery and $ identifiers, even in AMD
    // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
    // and CommonJS for browser emulators (#13566)
    if (!noGlobal) {
        window.jQuery = window.$ = jQuery;
    }




    return jQuery;
});

//fix for strings
if (!String.prototype.includes) {
    console.log("Polyfill: Includes String");
    String.prototype.includes = function (search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

//fix for arrays

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
    console.log("Polyfill: Includes Array");
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {

            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                // c. Increase k by 1.
                k++;
            }

            // 8. Return false
            return false;
        }
    });
}

/*!
* Knockout JavaScript library v3.4.2
* (c) The Knockout.js team - http://knockoutjs.com/
* License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/
console.log("knockout.js ready!");
(function () {
    (function (n) {
        var x = this || (0, eval)("this"), t = x.document, M = x.navigator, u = x.jQuery, H = x.JSON; (function (n) { "function" === typeof define && define.amd ? define(["exports", "require"], n) : "object" === typeof exports && "object" === typeof module ? n(module.exports || exports) : n(x.ko = {}) })(function (N, O) {
            function J(a, c) { return null === a || typeof a in R ? a === c : !1 } function S(b, c) { var d; return function () { d || (d = a.a.setTimeout(function () { d = n; b() }, c)) } } function T(b, c) { var d; return function () { clearTimeout(d); d = a.a.setTimeout(b, c) } } function U(a,
                c) { c && c !== E ? "beforeChange" === c ? this.Ob(a) : this.Ja(a, c) : this.Pb(a) } function V(a, c) { null !== c && c.k && c.k() } function W(a, c) { var d = this.Mc, e = d[s]; e.T || (this.ob && this.Oa[c] ? (d.Sb(c, a, this.Oa[c]), this.Oa[c] = null, --this.ob) : e.s[c] || d.Sb(c, a, e.t ? { $: a } : d.yc(a)), a.Ha && a.Hc()) } function K(b, c, d, e) {
                    a.d[b] = {
                        init: function (b, g, h, l, m) {
                            var k, r; a.m(function () { var q = g(), p = a.a.c(q), p = !d !== !p, A = !r; if (A || c || p !== k) A && a.xa.Ca() && (r = a.a.wa(a.f.childNodes(b), !0)), p ? (A || a.f.fa(b, a.a.wa(r)), a.hb(e ? e(m, q) : m, b)) : a.f.za(b), k = p }, null,
                                { i: b }); return { controlsDescendantBindings: !0 }
                        }
                    }; a.h.va[b] = !1; a.f.aa[b] = !0
                } var a = "undefined" !== typeof N ? N : {}; a.b = function (b, c) { for (var d = b.split("."), e = a, f = 0; f < d.length - 1; f++)e = e[d[f]]; e[d[d.length - 1]] = c }; a.H = function (a, c, d) { a[c] = d }; a.version = "3.4.2"; a.b("version", a.version); a.options = { deferUpdates: !1, useOnlyNativeEvents: !1 }; a.a = function () {
                    function b(a, b) { for (var c in a) a.hasOwnProperty(c) && b(c, a[c]) } function c(a, b) { if (b) for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]); return a } function d(a, b) {
                        a.__proto__ =
                            b; return a
                    } function e(b, c, d, e) { var m = b[c].match(r) || []; a.a.r(d.match(r), function (b) { a.a.ra(m, b, e) }); b[c] = m.join(" ") } var f = { __proto__: [] } instanceof Array, g = "function" === typeof Symbol, h = {}, l = {}; h[M && /Firefox\/2/i.test(M.userAgent) ? "KeyboardEvent" : "UIEvents"] = ["keyup", "keydown", "keypress"]; h.MouseEvents = "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" "); b(h, function (a, b) { if (b.length) for (var c = 0, d = b.length; c < d; c++)l[b[c]] = a }); var m = { propertychange: !0 }, k =
                        t && function () { for (var a = 3, b = t.createElement("div"), c = b.getElementsByTagName("i"); b.innerHTML = "\x3c!--[if gt IE " + ++a + "]><i></i><![endif]--\x3e", c[0];); return 4 < a ? a : n }(), r = /\S+/g; return {
                            gc: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/], r: function (a, b) { for (var c = 0, d = a.length; c < d; c++)b(a[c], c) }, o: function (a, b) { if ("function" == typeof Array.prototype.indexOf) return Array.prototype.indexOf.call(a, b); for (var c = 0, d = a.length; c < d; c++)if (a[c] === b) return c; return -1 }, Vb: function (a, b, c) {
                                for (var d =
                                    0, e = a.length; d < e; d++)if (b.call(c, a[d], d)) return a[d]; return null
                            }, Na: function (b, c) { var d = a.a.o(b, c); 0 < d ? b.splice(d, 1) : 0 === d && b.shift() }, Wb: function (b) { b = b || []; for (var c = [], d = 0, e = b.length; d < e; d++)0 > a.a.o(c, b[d]) && c.push(b[d]); return c }, ib: function (a, b) { a = a || []; for (var c = [], d = 0, e = a.length; d < e; d++)c.push(b(a[d], d)); return c }, Ma: function (a, b) { a = a || []; for (var c = [], d = 0, e = a.length; d < e; d++)b(a[d], d) && c.push(a[d]); return c }, ta: function (a, b) {
                                if (b instanceof Array) a.push.apply(a, b); else for (var c = 0, d = b.length; c <
                                    d; c++)a.push(b[c]); return a
                            }, ra: function (b, c, d) { var e = a.a.o(a.a.Bb(b), c); 0 > e ? d && b.push(c) : d || b.splice(e, 1) }, la: f, extend: c, $a: d, ab: f ? d : c, D: b, Ea: function (a, b) { if (!a) return a; var c = {}, d; for (d in a) a.hasOwnProperty(d) && (c[d] = b(a[d], d, a)); return c }, rb: function (b) { for (; b.firstChild;)a.removeNode(b.firstChild) }, nc: function (b) { b = a.a.W(b); for (var c = (b[0] && b[0].ownerDocument || t).createElement("div"), d = 0, e = b.length; d < e; d++)c.appendChild(a.ba(b[d])); return c }, wa: function (b, c) {
                                for (var d = 0, e = b.length, m = []; d < e; d++) {
                                    var k =
                                        b[d].cloneNode(!0); m.push(c ? a.ba(k) : k)
                                } return m
                            }, fa: function (b, c) { a.a.rb(b); if (c) for (var d = 0, e = c.length; d < e; d++)b.appendChild(c[d]) }, uc: function (b, c) { var d = b.nodeType ? [b] : b; if (0 < d.length) { for (var e = d[0], m = e.parentNode, k = 0, f = c.length; k < f; k++)m.insertBefore(c[k], e); k = 0; for (f = d.length; k < f; k++)a.removeNode(d[k]) } }, Ba: function (a, b) {
                                if (a.length) {
                                    for (b = 8 === b.nodeType && b.parentNode || b; a.length && a[0].parentNode !== b;)a.splice(0, 1); for (; 1 < a.length && a[a.length - 1].parentNode !== b;)a.length--; if (1 < a.length) {
                                        var c =
                                            a[0], d = a[a.length - 1]; for (a.length = 0; c !== d;)a.push(c), c = c.nextSibling; a.push(d)
                                    }
                                } return a
                            }, wc: function (a, b) { 7 > k ? a.setAttribute("selected", b) : a.selected = b }, cb: function (a) { return null === a || a === n ? "" : a.trim ? a.trim() : a.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") }, sd: function (a, b) { a = a || ""; return b.length > a.length ? !1 : a.substring(0, b.length) === b }, Rc: function (a, b) {
                                if (a === b) return !0; if (11 === a.nodeType) return !1; if (b.contains) return b.contains(3 === a.nodeType ? a.parentNode : a); if (b.compareDocumentPosition) return 16 ==
                                    (b.compareDocumentPosition(a) & 16); for (; a && a != b;)a = a.parentNode; return !!a
                            }, qb: function (b) { return a.a.Rc(b, b.ownerDocument.documentElement) }, Tb: function (b) { return !!a.a.Vb(b, a.a.qb) }, A: function (a) { return a && a.tagName && a.tagName.toLowerCase() }, Zb: function (b) { return a.onError ? function () { try { return b.apply(this, arguments) } catch (c) { throw a.onError && a.onError(c), c; } } : b }, setTimeout: function (b, c) { return setTimeout(a.a.Zb(b), c) }, dc: function (b) { setTimeout(function () { a.onError && a.onError(b); throw b; }, 0) }, q: function (b,
                                c, d) { var e = a.a.Zb(d); d = k && m[c]; if (a.options.useOnlyNativeEvents || d || !u) if (d || "function" != typeof b.addEventListener) if ("undefined" != typeof b.attachEvent) { var f = function (a) { e.call(b, a) }, l = "on" + c; b.attachEvent(l, f); a.a.G.qa(b, function () { b.detachEvent(l, f) }) } else throw Error("Browser doesn't support addEventListener or attachEvent"); else b.addEventListener(c, e, !1); else u(b).bind(c, e) }, Fa: function (b, c) {
                                    if (!b || !b.nodeType) throw Error("element must be a DOM node when calling triggerEvent"); var d; "input" ===
                                        a.a.A(b) && b.type && "click" == c.toLowerCase() ? (d = b.type, d = "checkbox" == d || "radio" == d) : d = !1; if (a.options.useOnlyNativeEvents || !u || d) if ("function" == typeof t.createEvent) if ("function" == typeof b.dispatchEvent) d = t.createEvent(l[c] || "HTMLEvents"), d.initEvent(c, !0, !0, x, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, b), b.dispatchEvent(d); else throw Error("The supplied element doesn't support dispatchEvent"); else if (d && b.click) b.click(); else if ("undefined" != typeof b.fireEvent) b.fireEvent("on" + c); else throw Error("Browser doesn't support triggering events");
                                    else u(b).trigger(c)
                                }, c: function (b) { return a.I(b) ? b() : b }, Bb: function (b) { return a.I(b) ? b.p() : b }, fb: function (b, c, d) { var k; c && ("object" === typeof b.classList ? (k = b.classList[d ? "add" : "remove"], a.a.r(c.match(r), function (a) { k.call(b.classList, a) })) : "string" === typeof b.className.baseVal ? e(b.className, "baseVal", c, d) : e(b, "className", c, d)) }, bb: function (b, c) {
                                    var d = a.a.c(c); if (null === d || d === n) d = ""; var e = a.f.firstChild(b); !e || 3 != e.nodeType || a.f.nextSibling(e) ? a.f.fa(b, [b.ownerDocument.createTextNode(d)]) : e.data =
                                        d; a.a.Wc(b)
                                }, vc: function (a, b) { a.name = b; if (7 >= k) try { a.mergeAttributes(t.createElement("<input name='" + a.name + "'/>"), !1) } catch (c) { } }, Wc: function (a) { 9 <= k && (a = 1 == a.nodeType ? a : a.parentNode, a.style && (a.style.zoom = a.style.zoom)) }, Sc: function (a) { if (k) { var b = a.style.width; a.style.width = 0; a.style.width = b } }, nd: function (b, c) { b = a.a.c(b); c = a.a.c(c); for (var d = [], e = b; e <= c; e++)d.push(e); return d }, W: function (a) { for (var b = [], c = 0, d = a.length; c < d; c++)b.push(a[c]); return b }, bc: function (a) { return g ? Symbol(a) : a }, xd: 6 === k,
                            yd: 7 === k, C: k, ic: function (b, c) { for (var d = a.a.W(b.getElementsByTagName("input")).concat(a.a.W(b.getElementsByTagName("textarea"))), e = "string" == typeof c ? function (a) { return a.name === c } : function (a) { return c.test(a.name) }, k = [], m = d.length - 1; 0 <= m; m--)e(d[m]) && k.push(d[m]); return k }, kd: function (b) { return "string" == typeof b && (b = a.a.cb(b)) ? H && H.parse ? H.parse(b) : (new Function("return " + b))() : null }, Gb: function (b, c, d) {
                                if (!H || !H.stringify) throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
                                return H.stringify(a.a.c(b), c, d)
                            }, ld: function (c, d, e) {
                                e = e || {}; var k = e.params || {}, m = e.includeFields || this.gc, f = c; if ("object" == typeof c && "form" === a.a.A(c)) for (var f = c.action, l = m.length - 1; 0 <= l; l--)for (var g = a.a.ic(c, m[l]), h = g.length - 1; 0 <= h; h--)k[g[h].name] = g[h].value; d = a.a.c(d); var r = t.createElement("form"); r.style.display = "none"; r.action = f; r.method = "post"; for (var n in d) c = t.createElement("input"), c.type = "hidden", c.name = n, c.value = a.a.Gb(a.a.c(d[n])), r.appendChild(c); b(k, function (a, b) {
                                    var c = t.createElement("input");
                                    c.type = "hidden"; c.name = a; c.value = b; r.appendChild(c)
                                }); t.body.appendChild(r); e.submitter ? e.submitter(r) : r.submit(); setTimeout(function () { r.parentNode.removeChild(r) }, 0)
                            }
                        }
                }(); a.b("utils", a.a); a.b("utils.arrayForEach", a.a.r); a.b("utils.arrayFirst", a.a.Vb); a.b("utils.arrayFilter", a.a.Ma); a.b("utils.arrayGetDistinctValues", a.a.Wb); a.b("utils.arrayIndexOf", a.a.o); a.b("utils.arrayMap", a.a.ib); a.b("utils.arrayPushAll", a.a.ta); a.b("utils.arrayRemoveItem", a.a.Na); a.b("utils.extend", a.a.extend); a.b("utils.fieldsIncludedWithJsonPost",
                    a.a.gc); a.b("utils.getFormFields", a.a.ic); a.b("utils.peekObservable", a.a.Bb); a.b("utils.postJson", a.a.ld); a.b("utils.parseJson", a.a.kd); a.b("utils.registerEventHandler", a.a.q); a.b("utils.stringifyJson", a.a.Gb); a.b("utils.range", a.a.nd); a.b("utils.toggleDomNodeCssClass", a.a.fb); a.b("utils.triggerEvent", a.a.Fa); a.b("utils.unwrapObservable", a.a.c); a.b("utils.objectForEach", a.a.D); a.b("utils.addOrRemoveItem", a.a.ra); a.b("utils.setTextContent", a.a.bb); a.b("unwrap", a.a.c); Function.prototype.bind || (Function.prototype.bind =
                        function (a) { var c = this; if (1 === arguments.length) return function () { return c.apply(a, arguments) }; var d = Array.prototype.slice.call(arguments, 1); return function () { var e = d.slice(0); e.push.apply(e, arguments); return c.apply(a, e) } }); a.a.e = new function () {
                            function a(b, g) { var h = b[d]; if (!h || "null" === h || !e[h]) { if (!g) return n; h = b[d] = "ko" + c++; e[h] = {} } return e[h] } var c = 0, d = "__ko__" + (new Date).getTime(), e = {}; return {
                                get: function (c, d) { var e = a(c, !1); return e === n ? n : e[d] }, set: function (c, d, e) {
                                    if (e !== n || a(c, !1) !== n) a(c, !0)[d] =
                                        e
                                }, clear: function (a) { var b = a[d]; return b ? (delete e[b], a[d] = null, !0) : !1 }, J: function () { return c++ + d }
                            }
                        }; a.b("utils.domData", a.a.e); a.b("utils.domData.clear", a.a.e.clear); a.a.G = new function () {
                            function b(b, c) { var e = a.a.e.get(b, d); e === n && c && (e = [], a.a.e.set(b, d, e)); return e } function c(d) { var e = b(d, !1); if (e) for (var e = e.slice(0), l = 0; l < e.length; l++)e[l](d); a.a.e.clear(d); a.a.G.cleanExternalData(d); if (f[d.nodeType]) for (e = d.firstChild; d = e;)e = d.nextSibling, 8 === d.nodeType && c(d) } var d = a.a.e.J(), e = { 1: !0, 8: !0, 9: !0 },
                                f = { 1: !0, 9: !0 }; return { qa: function (a, c) { if ("function" != typeof c) throw Error("Callback must be a function"); b(a, !0).push(c) }, tc: function (c, e) { var f = b(c, !1); f && (a.a.Na(f, e), 0 == f.length && a.a.e.set(c, d, n)) }, ba: function (b) { if (e[b.nodeType] && (c(b), f[b.nodeType])) { var d = []; a.a.ta(d, b.getElementsByTagName("*")); for (var l = 0, m = d.length; l < m; l++)c(d[l]) } return b }, removeNode: function (b) { a.ba(b); b.parentNode && b.parentNode.removeChild(b) }, cleanExternalData: function (a) { u && "function" == typeof u.cleanData && u.cleanData([a]) } }
                        };
            a.ba = a.a.G.ba; a.removeNode = a.a.G.removeNode; a.b("cleanNode", a.ba); a.b("removeNode", a.removeNode); a.b("utils.domNodeDisposal", a.a.G); a.b("utils.domNodeDisposal.addDisposeCallback", a.a.G.qa); a.b("utils.domNodeDisposal.removeDisposeCallback", a.a.G.tc); (function () {
                var b = [0, "", ""], c = [1, "<table>", "</table>"], d = [3, "<table><tbody><tr>", "</tr></tbody></table>"], e = [1, "<select multiple='multiple'>", "</select>"], f = { thead: c, tbody: c, tfoot: c, tr: [2, "<table><tbody>", "</tbody></table>"], td: d, th: d, option: e, optgroup: e },
                    g = 8 >= a.a.C; a.a.na = function (c, d) {
                        var e; if (u) if (u.parseHTML) e = u.parseHTML(c, d) || []; else { if ((e = u.clean([c], d)) && e[0]) { for (var k = e[0]; k.parentNode && 11 !== k.parentNode.nodeType;)k = k.parentNode; k.parentNode && k.parentNode.removeChild(k) } } else {
                            (e = d) || (e = t); var k = e.parentWindow || e.defaultView || x, r = a.a.cb(c).toLowerCase(), q = e.createElement("div"), p; p = (r = r.match(/^<([a-z]+)[ >]/)) && f[r[1]] || b; r = p[0]; p = "ignored<div>" + p[1] + c + p[2] + "</div>"; "function" == typeof k.innerShiv ? q.appendChild(k.innerShiv(p)) : (g && e.appendChild(q),
                                q.innerHTML = p, g && q.parentNode.removeChild(q)); for (; r--;)q = q.lastChild; e = a.a.W(q.lastChild.childNodes)
                        } return e
                    }; a.a.Eb = function (b, c) { a.a.rb(b); c = a.a.c(c); if (null !== c && c !== n) if ("string" != typeof c && (c = c.toString()), u) u(b).html(c); else for (var d = a.a.na(c, b.ownerDocument), e = 0; e < d.length; e++)b.appendChild(d[e]) }
            })(); a.b("utils.parseHtmlFragment", a.a.na); a.b("utils.setHtml", a.a.Eb); a.N = function () {
                function b(c, e) {
                    if (c) if (8 == c.nodeType) { var f = a.N.pc(c.nodeValue); null != f && e.push({ Qc: c, hd: f }) } else if (1 == c.nodeType) for (var f =
                        0, g = c.childNodes, h = g.length; f < h; f++)b(g[f], e)
                } var c = {}; return {
                    yb: function (a) { if ("function" != typeof a) throw Error("You can only pass a function to ko.memoization.memoize()"); var b = (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) + (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1); c[b] = a; return "\x3c!--[ko_memo:" + b + "]--\x3e" }, Bc: function (a, b) {
                        var f = c[a]; if (f === n) throw Error("Couldn't find any memo with ID " + a + ". Perhaps it's already been unmemoized."); try {
                            return f.apply(null, b || []),
                                !0
                        } finally { delete c[a] }
                    }, Cc: function (c, e) { var f = []; b(c, f); for (var g = 0, h = f.length; g < h; g++) { var l = f[g].Qc, m = [l]; e && a.a.ta(m, e); a.N.Bc(f[g].hd, m); l.nodeValue = ""; l.parentNode && l.parentNode.removeChild(l) } }, pc: function (a) { return (a = a.match(/^\[ko_memo\:(.*?)\]$/)) ? a[1] : null }
                }
            }(); a.b("memoization", a.N); a.b("memoization.memoize", a.N.yb); a.b("memoization.unmemoize", a.N.Bc); a.b("memoization.parseMemoText", a.N.pc); a.b("memoization.unmemoizeDomNodeAndDescendants", a.N.Cc); a.Z = function () {
                function b() {
                    if (e) for (var b =
                        e, c = 0, m; g < e;)if (m = d[g++]) { if (g > b) { if (5E3 <= ++c) { g = e; a.a.dc(Error("'Too much recursion' after processing " + c + " task groups.")); break } b = e } try { m() } catch (k) { a.a.dc(k) } }
                } function c() { b(); g = e = d.length = 0 } var d = [], e = 0, f = 1, g = 0; return {
                    scheduler: x.MutationObserver ? function (a) { var b = t.createElement("div"); (new MutationObserver(a)).observe(b, { attributes: !0 }); return function () { b.classList.toggle("foo") } }(c) : t && "onreadystatechange" in t.createElement("script") ? function (a) {
                        var b = t.createElement("script"); b.onreadystatechange =
                            function () { b.onreadystatechange = null; t.documentElement.removeChild(b); b = null; a() }; t.documentElement.appendChild(b)
                    } : function (a) { setTimeout(a, 0) }, Za: function (b) { e || a.Z.scheduler(c); d[e++] = b; return f++ }, cancel: function (a) { a -= f - e; a >= g && a < e && (d[a] = null) }, resetForTesting: function () { var a = e - g; g = e = d.length = 0; return a }, rd: b
                }
            }(); a.b("tasks", a.Z); a.b("tasks.schedule", a.Z.Za); a.b("tasks.runEarly", a.Z.rd); a.Aa = {
                throttle: function (b, c) {
                    b.throttleEvaluation = c; var d = null; return a.B({
                        read: b, write: function (e) {
                            clearTimeout(d);
                            d = a.a.setTimeout(function () { b(e) }, c)
                        }
                    })
                }, rateLimit: function (a, c) { var d, e, f; "number" == typeof c ? d = c : (d = c.timeout, e = c.method); a.gb = !1; f = "notifyWhenChangesStop" == e ? T : S; a.Wa(function (a) { return f(a, d) }) }, deferred: function (b, c) {
                    if (!0 !== c) throw Error("The 'deferred' extender only accepts the value 'true', because it is not supported to turn deferral off once enabled."); b.gb || (b.gb = !0, b.Wa(function (c) {
                        var e, f = !1; return function () {
                            if (!f) {
                                a.Z.cancel(e); e = a.Z.Za(c); try { f = !0, b.notifySubscribers(n, "dirty") } finally {
                                    f =
                                        !1
                                }
                            }
                        }
                    }))
                }, notify: function (a, c) { a.equalityComparer = "always" == c ? null : J }
            }; var R = { undefined: 1, "boolean": 1, number: 1, string: 1 }; a.b("extenders", a.Aa); a.zc = function (b, c, d) { this.$ = b; this.jb = c; this.Pc = d; this.T = !1; a.H(this, "dispose", this.k) }; a.zc.prototype.k = function () { this.T = !0; this.Pc() }; a.K = function () { a.a.ab(this, D); D.ub(this) }; var E = "change", D = {
                ub: function (a) { a.F = { change: [] }; a.Qb = 1 }, Y: function (b, c, d) {
                    var e = this; d = d || E; var f = new a.zc(e, c ? b.bind(c) : b, function () { a.a.Na(e.F[d], f); e.Ka && e.Ka(d) }); e.ua && e.ua(d);
                    e.F[d] || (e.F[d] = []); e.F[d].push(f); return f
                }, notifySubscribers: function (b, c) { c = c || E; c === E && this.Kb(); if (this.Ra(c)) { var d = c === E && this.Fc || this.F[c].slice(0); try { a.l.Xb(); for (var e = 0, f; f = d[e]; ++e)f.T || f.jb(b) } finally { a.l.end() } } }, Pa: function () { return this.Qb }, Zc: function (a) { return this.Pa() !== a }, Kb: function () { ++this.Qb }, Wa: function (b) {
                    var c = this, d = a.I(c), e, f, g, h; c.Ja || (c.Ja = c.notifySubscribers, c.notifySubscribers = U); var l = b(function () {
                        c.Ha = !1; d && h === c && (h = c.Mb ? c.Mb() : c()); var a = f || c.Ua(g, h); f = e = !1;
                        a && c.Ja(g = h)
                    }); c.Pb = function (a) { c.Fc = c.F[E].slice(0); c.Ha = e = !0; h = a; l() }; c.Ob = function (a) { e || (g = a, c.Ja(a, "beforeChange")) }; c.Hc = function () { c.Ua(g, c.p(!0)) && (f = !0) }
                }, Ra: function (a) { return this.F[a] && this.F[a].length }, Xc: function (b) { if (b) return this.F[b] && this.F[b].length || 0; var c = 0; a.a.D(this.F, function (a, b) { "dirty" !== a && (c += b.length) }); return c }, Ua: function (a, c) { return !this.equalityComparer || !this.equalityComparer(a, c) }, extend: function (b) {
                    var c = this; b && a.a.D(b, function (b, e) {
                        var f = a.Aa[b]; "function" ==
                            typeof f && (c = f(c, e) || c)
                    }); return c
                }
            }; a.H(D, "subscribe", D.Y); a.H(D, "extend", D.extend); a.H(D, "getSubscriptionsCount", D.Xc); a.a.la && a.a.$a(D, Function.prototype); a.K.fn = D; a.lc = function (a) { return null != a && "function" == typeof a.Y && "function" == typeof a.notifySubscribers }; a.b("subscribable", a.K); a.b("isSubscribable", a.lc); a.xa = a.l = function () {
                function b(a) { d.push(e); e = a } function c() { e = d.pop() } var d = [], e, f = 0; return {
                    Xb: b, end: c, sc: function (b) {
                        if (e) {
                            if (!a.lc(b)) throw Error("Only subscribable things can act as dependencies");
                            e.jb.call(e.Lc, b, b.Gc || (b.Gc = ++f))
                        }
                    }, w: function (a, d, e) { try { return b(), a.apply(d, e || []) } finally { c() } }, Ca: function () { if (e) return e.m.Ca() }, Va: function () { if (e) return e.Va }
                }
            }(); a.b("computedContext", a.xa); a.b("computedContext.getDependenciesCount", a.xa.Ca); a.b("computedContext.isInitial", a.xa.Va); a.b("ignoreDependencies", a.wd = a.l.w); var F = a.a.bc("_latestValue"); a.O = function (b) {
                function c() { if (0 < arguments.length) return c.Ua(c[F], arguments[0]) && (c.ia(), c[F] = arguments[0], c.ha()), this; a.l.sc(c); return c[F] }
                c[F] = b; a.a.la || a.a.extend(c, a.K.fn); a.K.fn.ub(c); a.a.ab(c, B); a.options.deferUpdates && a.Aa.deferred(c, !0); return c
            }; var B = { equalityComparer: J, p: function () { return this[F] }, ha: function () { this.notifySubscribers(this[F]) }, ia: function () { this.notifySubscribers(this[F], "beforeChange") } }; a.a.la && a.a.$a(B, a.K.fn); var I = a.O.md = "__ko_proto__"; B[I] = a.O; a.Qa = function (b, c) { return null === b || b === n || b[I] === n ? !1 : b[I] === c ? !0 : a.Qa(b[I], c) }; a.I = function (b) { return a.Qa(b, a.O) }; a.Da = function (b) {
                return "function" == typeof b &&
                    b[I] === a.O || "function" == typeof b && b[I] === a.B && b.$c ? !0 : !1
            }; a.b("observable", a.O); a.b("isObservable", a.I); a.b("isWriteableObservable", a.Da); a.b("isWritableObservable", a.Da); a.b("observable.fn", B); a.H(B, "peek", B.p); a.H(B, "valueHasMutated", B.ha); a.H(B, "valueWillMutate", B.ia); a.ma = function (b) { b = b || []; if ("object" != typeof b || !("length" in b)) throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined."); b = a.O(b); a.a.ab(b, a.ma.fn); return b.extend({ trackArrayChanges: !0 }) };
            a.ma.fn = {
                remove: function (b) { for (var c = this.p(), d = [], e = "function" != typeof b || a.I(b) ? function (a) { return a === b } : b, f = 0; f < c.length; f++) { var g = c[f]; e(g) && (0 === d.length && this.ia(), d.push(g), c.splice(f, 1), f--) } d.length && this.ha(); return d }, removeAll: function (b) { if (b === n) { var c = this.p(), d = c.slice(0); this.ia(); c.splice(0, c.length); this.ha(); return d } return b ? this.remove(function (c) { return 0 <= a.a.o(b, c) }) : [] }, destroy: function (b) {
                    var c = this.p(), d = "function" != typeof b || a.I(b) ? function (a) { return a === b } : b; this.ia();
                    for (var e = c.length - 1; 0 <= e; e--)d(c[e]) && (c[e]._destroy = !0); this.ha()
                }, destroyAll: function (b) { return b === n ? this.destroy(function () { return !0 }) : b ? this.destroy(function (c) { return 0 <= a.a.o(b, c) }) : [] }, indexOf: function (b) { var c = this(); return a.a.o(c, b) }, replace: function (a, c) { var d = this.indexOf(a); 0 <= d && (this.ia(), this.p()[d] = c, this.ha()) }
            }; a.a.la && a.a.$a(a.ma.fn, a.O.fn); a.a.r("pop push reverse shift sort splice unshift".split(" "), function (b) {
                a.ma.fn[b] = function () {
                    var a = this.p(); this.ia(); this.Yb(a, b, arguments);
                    var d = a[b].apply(a, arguments); this.ha(); return d === a ? this : d
                }
            }); a.a.r(["slice"], function (b) { a.ma.fn[b] = function () { var a = this(); return a[b].apply(a, arguments) } }); a.b("observableArray", a.ma); a.Aa.trackArrayChanges = function (b, c) {
                function d() {
                    if (!e) {
                        e = !0; l = b.notifySubscribers; b.notifySubscribers = function (a, b) { b && b !== E || ++h; return l.apply(this, arguments) }; var c = [].concat(b.p() || []); f = null; g = b.Y(function (d) {
                            d = [].concat(d || []); if (b.Ra("arrayChange")) { var e; if (!f || 1 < h) f = a.a.lb(c, d, b.kb); e = f } c = d; f = null; h = 0;
                            e && e.length && b.notifySubscribers(e, "arrayChange")
                        })
                    }
                } b.kb = {}; c && "object" == typeof c && a.a.extend(b.kb, c); b.kb.sparse = !0; if (!b.Yb) {
                    var e = !1, f = null, g, h = 0, l, m = b.ua, k = b.Ka; b.ua = function (a) { m && m.call(b, a); "arrayChange" === a && d() }; b.Ka = function (a) { k && k.call(b, a); "arrayChange" !== a || b.Ra("arrayChange") || (l && (b.notifySubscribers = l, l = n), g.k(), e = !1) }; b.Yb = function (b, c, d) {
                        function k(a, b, c) { return m[m.length] = { status: a, value: b, index: c } } if (e && !h) {
                            var m = [], l = b.length, g = d.length, G = 0; switch (c) {
                                case "push": G = l; case "unshift": for (c =
                                    0; c < g; c++)k("added", d[c], G + c); break; case "pop": G = l - 1; case "shift": l && k("deleted", b[G], G); break; case "splice": c = Math.min(Math.max(0, 0 > d[0] ? l + d[0] : d[0]), l); for (var l = 1 === g ? l : Math.min(c + (d[1] || 0), l), g = c + g - 2, G = Math.max(l, g), n = [], s = [], w = 2; c < G; ++c, ++w)c < l && s.push(k("deleted", b[c], c)), c < g && n.push(k("added", d[w], c)); a.a.hc(s, n); break; default: return
                            }f = m
                        }
                    }
                }
            }; var s = a.a.bc("_state"); a.m = a.B = function (b, c, d) {
                function e() {
                    if (0 < arguments.length) {
                        if ("function" === typeof f) f.apply(g.sb, arguments); else throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
                        return this
                    } a.l.sc(e); (g.V || g.t && e.Sa()) && e.U(); return g.M
                } "object" === typeof b ? d = b : (d = d || {}, b && (d.read = b)); if ("function" != typeof d.read) throw Error("Pass a function that returns the value of the ko.computed"); var f = d.write, g = { M: n, da: !0, V: !0, Ta: !1, Hb: !1, T: !1, Ya: !1, t: !1, od: d.read, sb: c || d.owner, i: d.disposeWhenNodeIsRemoved || d.i || null, ya: d.disposeWhen || d.ya, pb: null, s: {}, L: 0, fc: null }; e[s] = g; e.$c = "function" === typeof f; a.a.la || a.a.extend(e, a.K.fn); a.K.fn.ub(e); a.a.ab(e, z); d.pure ? (g.Ya = !0, g.t = !0, a.a.extend(e,
                    Y)) : d.deferEvaluation && a.a.extend(e, Z); a.options.deferUpdates && a.Aa.deferred(e, !0); g.i && (g.Hb = !0, g.i.nodeType || (g.i = null)); g.t || d.deferEvaluation || e.U(); g.i && e.ca() && a.a.G.qa(g.i, g.pb = function () { e.k() }); return e
            }; var z = {
                equalityComparer: J, Ca: function () { return this[s].L }, Sb: function (a, c, d) { if (this[s].Ya && c === this) throw Error("A 'pure' computed must not be called recursively"); this[s].s[a] = d; d.Ia = this[s].L++; d.pa = c.Pa() }, Sa: function () {
                    var a, c, d = this[s].s; for (a in d) if (d.hasOwnProperty(a) && (c = d[a], this.oa &&
                        c.$.Ha || c.$.Zc(c.pa))) return !0
                }, gd: function () { this.oa && !this[s].Ta && this.oa(!1) }, ca: function () { var a = this[s]; return a.V || 0 < a.L }, qd: function () { this.Ha ? this[s].V && (this[s].da = !0) : this.ec() }, yc: function (a) { if (a.gb && !this[s].i) { var c = a.Y(this.gd, this, "dirty"), d = a.Y(this.qd, this); return { $: a, k: function () { c.k(); d.k() } } } return a.Y(this.ec, this) }, ec: function () { var b = this, c = b.throttleEvaluation; c && 0 <= c ? (clearTimeout(this[s].fc), this[s].fc = a.a.setTimeout(function () { b.U(!0) }, c)) : b.oa ? b.oa(!0) : b.U(!0) }, U: function (b) {
                    var c =
                        this[s], d = c.ya, e = !1; if (!c.Ta && !c.T) { if (c.i && !a.a.qb(c.i) || d && d()) { if (!c.Hb) { this.k(); return } } else c.Hb = !1; c.Ta = !0; try { e = this.Vc(b) } finally { c.Ta = !1 } c.L || this.k(); return e }
                }, Vc: function (b) { var c = this[s], d = !1, e = c.Ya ? n : !c.L, f = { Mc: this, Oa: c.s, ob: c.L }; a.l.Xb({ Lc: f, jb: W, m: this, Va: e }); c.s = {}; c.L = 0; f = this.Uc(c, f); this.Ua(c.M, f) && (c.t || this.notifySubscribers(c.M, "beforeChange"), c.M = f, c.t ? this.Kb() : b && this.notifySubscribers(c.M), d = !0); e && this.notifySubscribers(c.M, "awake"); return d }, Uc: function (b, c) {
                    try {
                        var d =
                            b.od; return b.sb ? d.call(b.sb) : d()
                    } finally { a.l.end(), c.ob && !b.t && a.a.D(c.Oa, V), b.da = b.V = !1 }
                }, p: function (a) { var c = this[s]; (c.V && (a || !c.L) || c.t && this.Sa()) && this.U(); return c.M }, Wa: function (b) { a.K.fn.Wa.call(this, b); this.Mb = function () { this[s].da ? this.U() : this[s].V = !1; return this[s].M }; this.oa = function (a) { this.Ob(this[s].M); this[s].V = !0; a && (this[s].da = !0); this.Pb(this) } }, k: function () {
                    var b = this[s]; !b.t && b.s && a.a.D(b.s, function (a, b) { b.k && b.k() }); b.i && b.pb && a.a.G.tc(b.i, b.pb); b.s = null; b.L = 0; b.T = !0; b.da =
                        !1; b.V = !1; b.t = !1; b.i = null
                }
            }, Y = {
                ua: function (b) { var c = this, d = c[s]; if (!d.T && d.t && "change" == b) { d.t = !1; if (d.da || c.Sa()) d.s = null, d.L = 0, c.U() && c.Kb(); else { var e = []; a.a.D(d.s, function (a, b) { e[b.Ia] = a }); a.a.r(e, function (a, b) { var e = d.s[a], l = c.yc(e.$); l.Ia = b; l.pa = e.pa; d.s[a] = l }) } d.T || c.notifySubscribers(d.M, "awake") } }, Ka: function (b) { var c = this[s]; c.T || "change" != b || this.Ra("change") || (a.a.D(c.s, function (a, b) { b.k && (c.s[a] = { $: b.$, Ia: b.Ia, pa: b.pa }, b.k()) }), c.t = !0, this.notifySubscribers(n, "asleep")) }, Pa: function () {
                    var b =
                        this[s]; b.t && (b.da || this.Sa()) && this.U(); return a.K.fn.Pa.call(this)
                }
            }, Z = { ua: function (a) { "change" != a && "beforeChange" != a || this.p() } }; a.a.la && a.a.$a(z, a.K.fn); var P = a.O.md; a.m[P] = a.O; z[P] = a.m; a.bd = function (b) { return a.Qa(b, a.m) }; a.cd = function (b) { return a.Qa(b, a.m) && b[s] && b[s].Ya }; a.b("computed", a.m); a.b("dependentObservable", a.m); a.b("isComputed", a.bd); a.b("isPureComputed", a.cd); a.b("computed.fn", z); a.H(z, "peek", z.p); a.H(z, "dispose", z.k); a.H(z, "isActive", z.ca); a.H(z, "getDependenciesCount", z.Ca); a.rc =
                function (b, c) { if ("function" === typeof b) return a.m(b, c, { pure: !0 }); b = a.a.extend({}, b); b.pure = !0; return a.m(b, c) }; a.b("pureComputed", a.rc); (function () {
                    function b(a, f, g) {
                        g = g || new d; a = f(a); if ("object" != typeof a || null === a || a === n || a instanceof RegExp || a instanceof Date || a instanceof String || a instanceof Number || a instanceof Boolean) return a; var h = a instanceof Array ? [] : {}; g.save(a, h); c(a, function (c) {
                            var d = f(a[c]); switch (typeof d) {
                                case "boolean": case "number": case "string": case "function": h[c] = d; break; case "object": case "undefined": var k =
                                    g.get(d); h[c] = k !== n ? k : b(d, f, g)
                            }
                        }); return h
                    } function c(a, b) { if (a instanceof Array) { for (var c = 0; c < a.length; c++)b(c); "function" == typeof a.toJSON && b("toJSON") } else for (c in a) b(c) } function d() { this.keys = []; this.Lb = [] } a.Ac = function (c) { if (0 == arguments.length) throw Error("When calling ko.toJS, pass the object you want to convert."); return b(c, function (b) { for (var c = 0; a.I(b) && 10 > c; c++)b = b(); return b }) }; a.toJSON = function (b, c, d) { b = a.Ac(b); return a.a.Gb(b, c, d) }; d.prototype = {
                        save: function (b, c) {
                            var d = a.a.o(this.keys,
                                b); 0 <= d ? this.Lb[d] = c : (this.keys.push(b), this.Lb.push(c))
                        }, get: function (b) { b = a.a.o(this.keys, b); return 0 <= b ? this.Lb[b] : n }
                    }
                })(); a.b("toJS", a.Ac); a.b("toJSON", a.toJSON); (function () {
                    a.j = {
                        u: function (b) { switch (a.a.A(b)) { case "option": return !0 === b.__ko__hasDomDataOptionValue__ ? a.a.e.get(b, a.d.options.zb) : 7 >= a.a.C ? b.getAttributeNode("value") && b.getAttributeNode("value").specified ? b.value : b.text : b.value; case "select": return 0 <= b.selectedIndex ? a.j.u(b.options[b.selectedIndex]) : n; default: return b.value } }, ja: function (b,
                            c, d) {
                            switch (a.a.A(b)) {
                                case "option": switch (typeof c) { case "string": a.a.e.set(b, a.d.options.zb, n); "__ko__hasDomDataOptionValue__" in b && delete b.__ko__hasDomDataOptionValue__; b.value = c; break; default: a.a.e.set(b, a.d.options.zb, c), b.__ko__hasDomDataOptionValue__ = !0, b.value = "number" === typeof c ? c : "" }break; case "select": if ("" === c || null === c) c = n; for (var e = -1, f = 0, g = b.options.length, h; f < g; ++f)if (h = a.j.u(b.options[f]), h == c || "" == h && c === n) { e = f; break } if (d || 0 <= e || c === n && 1 < b.size) b.selectedIndex = e; break; default: if (null ===
                                    c || c === n) c = ""; b.value = c
                            }
                        }
                    }
                })(); a.b("selectExtensions", a.j); a.b("selectExtensions.readValue", a.j.u); a.b("selectExtensions.writeValue", a.j.ja); a.h = function () {
                    function b(b) {
                        b = a.a.cb(b); 123 === b.charCodeAt(0) && (b = b.slice(1, -1)); var c = [], d = b.match(e), r, h = [], p = 0; if (d) {
                            d.push(","); for (var A = 0, y; y = d[A]; ++A) {
                                var v = y.charCodeAt(0); if (44 === v) { if (0 >= p) { c.push(r && h.length ? { key: r, value: h.join("") } : { unknown: r || h.join("") }); r = p = 0; h = []; continue } } else if (58 === v) { if (!p && !r && 1 === h.length) { r = h.pop(); continue } } else 47 ===
                                    v && A && 1 < y.length ? (v = d[A - 1].match(f)) && !g[v[0]] && (b = b.substr(b.indexOf(y) + 1), d = b.match(e), d.push(","), A = -1, y = "/") : 40 === v || 123 === v || 91 === v ? ++p : 41 === v || 125 === v || 93 === v ? --p : r || h.length || 34 !== v && 39 !== v || (y = y.slice(1, -1)); h.push(y)
                            }
                        } return c
                    } var c = ["true", "false", "null", "undefined"], d = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i, e = RegExp("\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|/(?:[^/\\\\]|\\\\.)*/w*|[^\\s:,/][^,\"'{}()/:[\\]]*[^\\s,\"'{}()/:[\\]]|[^\\s]", "g"), f = /[\])"'A-Za-z0-9_$]+$/,
                        g = { "in": 1, "return": 1, "typeof": 1 }, h = {}; return {
                            va: [], ga: h, Ab: b, Xa: function (e, m) {
                                function k(b, e) { var m; if (!A) { var l = a.getBindingHandler(b); if (l && l.preprocess && !(e = l.preprocess(e, b, k))) return; if (l = h[b]) m = e, 0 <= a.a.o(c, m) ? m = !1 : (l = m.match(d), m = null === l ? !1 : l[1] ? "Object(" + l[1] + ")" + l[2] : m), l = m; l && g.push("'" + b + "':function(_z){" + m + "=_z}") } p && (e = "function(){return " + e + " }"); f.push("'" + b + "':" + e) } m = m || {}; var f = [], g = [], p = m.valueAccessors, A = m.bindingParams, y = "string" === typeof e ? b(e) : e; a.a.r(y, function (a) {
                                    k(a.key ||
                                        a.unknown, a.value)
                                }); g.length && k("_ko_property_writers", "{" + g.join(",") + " }"); return f.join(",")
                            }, fd: function (a, b) { for (var c = 0; c < a.length; c++)if (a[c].key == b) return !0; return !1 }, Ga: function (b, c, d, e, f) { if (b && a.I(b)) !a.Da(b) || f && b.p() === e || b(e); else if ((b = c.get("_ko_property_writers")) && b[d]) b[d](e) }
                        }
                }(); a.b("expressionRewriting", a.h); a.b("expressionRewriting.bindingRewriteValidators", a.h.va); a.b("expressionRewriting.parseObjectLiteral", a.h.Ab); a.b("expressionRewriting.preProcessBindings", a.h.Xa); a.b("expressionRewriting._twoWayBindings",
                    a.h.ga); a.b("jsonExpressionRewriting", a.h); a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", a.h.Xa); (function () {
                        function b(a) { return 8 == a.nodeType && g.test(f ? a.text : a.nodeValue) } function c(a) { return 8 == a.nodeType && h.test(f ? a.text : a.nodeValue) } function d(a, d) { for (var e = a, f = 1, l = []; e = e.nextSibling;) { if (c(e) && (f-- , 0 === f)) return l; l.push(e); b(e) && f++ } if (!d) throw Error("Cannot find closing comment tag to match: " + a.nodeValue); return null } function e(a, b) {
                            var c = d(a, b); return c ? 0 < c.length ? c[c.length -
                                1].nextSibling : a.nextSibling : null
                        } var f = t && "\x3c!--test--\x3e" === t.createComment("test").text, g = f ? /^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/ : /^\s*ko(?:\s+([\s\S]+))?\s*$/, h = f ? /^\x3c!--\s*\/ko\s*--\x3e$/ : /^\s*\/ko\s*$/, l = { ul: !0, ol: !0 }; a.f = {
                            aa: {}, childNodes: function (a) { return b(a) ? d(a) : a.childNodes }, za: function (c) { if (b(c)) { c = a.f.childNodes(c); for (var d = 0, e = c.length; d < e; d++)a.removeNode(c[d]) } else a.a.rb(c) }, fa: function (c, d) {
                                if (b(c)) {
                                    a.f.za(c); for (var e = c.nextSibling, f = 0, l = d.length; f < l; f++)e.parentNode.insertBefore(d[f],
                                        e)
                                } else a.a.fa(c, d)
                            }, qc: function (a, c) { b(a) ? a.parentNode.insertBefore(c, a.nextSibling) : a.firstChild ? a.insertBefore(c, a.firstChild) : a.appendChild(c) }, kc: function (c, d, e) { e ? b(c) ? c.parentNode.insertBefore(d, e.nextSibling) : e.nextSibling ? c.insertBefore(d, e.nextSibling) : c.appendChild(d) : a.f.qc(c, d) }, firstChild: function (a) { return b(a) ? !a.nextSibling || c(a.nextSibling) ? null : a.nextSibling : a.firstChild }, nextSibling: function (a) { b(a) && (a = e(a)); return a.nextSibling && c(a.nextSibling) ? null : a.nextSibling }, Yc: b, vd: function (a) {
                                return (a =
                                    (f ? a.text : a.nodeValue).match(g)) ? a[1] : null
                            }, oc: function (d) { if (l[a.a.A(d)]) { var k = d.firstChild; if (k) { do if (1 === k.nodeType) { var f; f = k.firstChild; var g = null; if (f) { do if (g) g.push(f); else if (b(f)) { var h = e(f, !0); h ? f = h : g = [f] } else c(f) && (g = [f]); while (f = f.nextSibling) } if (f = g) for (g = k.nextSibling, h = 0; h < f.length; h++)g ? d.insertBefore(f[h], g) : d.appendChild(f[h]) } while (k = k.nextSibling) } } }
                        }
                    })(); a.b("virtualElements", a.f); a.b("virtualElements.allowedBindings", a.f.aa); a.b("virtualElements.emptyNode", a.f.za); a.b("virtualElements.insertAfter",
                        a.f.kc); a.b("virtualElements.prepend", a.f.qc); a.b("virtualElements.setDomNodeChildren", a.f.fa); (function () {
                            a.S = function () { this.Kc = {} }; a.a.extend(a.S.prototype, {
                                nodeHasBindings: function (b) { switch (b.nodeType) { case 1: return null != b.getAttribute("data-bind") || a.g.getComponentNameForNode(b); case 8: return a.f.Yc(b); default: return !1 } }, getBindings: function (b, c) { var d = this.getBindingsString(b, c), d = d ? this.parseBindingsString(d, c, b) : null; return a.g.Rb(d, b, c, !1) }, getBindingAccessors: function (b, c) {
                                    var d = this.getBindingsString(b,
                                        c), d = d ? this.parseBindingsString(d, c, b, { valueAccessors: !0 }) : null; return a.g.Rb(d, b, c, !0)
                                }, getBindingsString: function (b) { switch (b.nodeType) { case 1: return b.getAttribute("data-bind"); case 8: return a.f.vd(b); default: return null } }, parseBindingsString: function (b, c, d, e) {
                                    try { var f = this.Kc, g = b + (e && e.valueAccessors || ""), h; if (!(h = f[g])) { var l, m = "with($context){with($data||{}){return{" + a.h.Xa(b, e) + "}}}"; l = new Function("$context", "$element", m); h = f[g] = l } return h(c, d) } catch (k) {
                                        throw k.message = "Unable to parse bindings.\nBindings value: " +
                                        b + "\nMessage: " + k.message, k;
                                    }
                                }
                            }); a.S.instance = new a.S
                        })(); a.b("bindingProvider", a.S); (function () {
                            function b(a) { return function () { return a } } function c(a) { return a() } function d(b) { return a.a.Ea(a.l.w(b), function (a, c) { return function () { return b()[c] } }) } function e(c, e, k) { return "function" === typeof c ? d(c.bind(null, e, k)) : a.a.Ea(c, b) } function f(a, b) { return d(this.getBindings.bind(this, a, b)) } function g(b, c, d) {
                                var e, k = a.f.firstChild(c), f = a.S.instance, m = f.preprocessNode; if (m) {
                                    for (; e = k;)k = a.f.nextSibling(e),
                                        m.call(f, e); k = a.f.firstChild(c)
                                } for (; e = k;)k = a.f.nextSibling(e), h(b, e, d)
                            } function h(b, c, d) { var e = !0, k = 1 === c.nodeType; k && a.f.oc(c); if (k && d || a.S.instance.nodeHasBindings(c)) e = m(c, null, b, d).shouldBindDescendants; e && !r[a.a.A(c)] && g(b, c, !k) } function l(b) {
                                var c = [], d = {}, e = []; a.a.D(b, function X(k) {
                                    if (!d[k]) {
                                        var f = a.getBindingHandler(k); f && (f.after && (e.push(k), a.a.r(f.after, function (c) {
                                            if (b[c]) {
                                                if (-1 !== a.a.o(e, c)) throw Error("Cannot combine the following bindings, because they have a cyclic dependency: " + e.join(", "));
                                                X(c)
                                            }
                                        }), e.length--), c.push({ key: k, jc: f })); d[k] = !0
                                    }
                                }); return c
                            } function m(b, d, e, k) {
                                var m = a.a.e.get(b, q); if (!d) { if (m) throw Error("You cannot apply bindings multiple times to the same element."); a.a.e.set(b, q, !0) } !m && k && a.xc(b, e); var g; if (d && "function" !== typeof d) g = d; else { var h = a.S.instance, r = h.getBindingAccessors || f, p = a.B(function () { (g = d ? d(e, b) : r.call(h, b, e)) && e.Q && e.Q(); return g }, null, { i: b }); g && p.ca() || (p = null) } var s; if (g) {
                                    var t = p ? function (a) { return function () { return c(p()[a]) } } : function (a) { return g[a] },
                                        u = function () { return a.a.Ea(p ? p() : g, c) }; u.get = function (a) { return g[a] && c(t(a)) }; u.has = function (a) { return a in g }; k = l(g); a.a.r(k, function (c) {
                                            var d = c.jc.init, k = c.jc.update, f = c.key; if (8 === b.nodeType && !a.f.aa[f]) throw Error("The binding '" + f + "' cannot be used with virtual elements"); try {
                                                "function" == typeof d && a.l.w(function () {
                                                    var a = d(b, t(f), u, e.$data, e); if (a && a.controlsDescendantBindings) {
                                                        if (s !== n) throw Error("Multiple bindings (" + s + " and " + f + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
                                                        s = f
                                                    }
                                                }), "function" == typeof k && a.B(function () { k(b, t(f), u, e.$data, e) }, null, { i: b })
                                            } catch (m) { throw m.message = 'Unable to process binding "' + f + ": " + g[f] + '"\nMessage: ' + m.message, m; }
                                        })
                                } return { shouldBindDescendants: s === n }
                            } function k(b) { return b && b instanceof a.R ? b : new a.R(b) } a.d = {}; var r = { script: !0, textarea: !0, template: !0 }; a.getBindingHandler = function (b) { return a.d[b] }; a.R = function (b, c, d, e, k) {
                                function f() {
                                    var k = g ? b() : b, m = a.a.c(k); c ? (c.Q && c.Q(), a.a.extend(l, c), l.Q = r) : (l.$parents = [], l.$root = m, l.ko = a); l.$rawData =
                                        k; l.$data = m; d && (l[d] = m); e && e(l, c, m); return l.$data
                                } function m() { return h && !a.a.Tb(h) } var l = this, g = "function" == typeof b && !a.I(b), h, r; k && k.exportDependencies ? f() : (r = a.B(f, null, { ya: m, i: !0 }), r.ca() && (l.Q = r, r.equalityComparer = null, h = [], r.Dc = function (b) { h.push(b); a.a.G.qa(b, function (b) { a.a.Na(h, b); h.length || (r.k(), l.Q = r = n) }) }))
                            }; a.R.prototype.createChildContext = function (b, c, d, e) {
                                return new a.R(b, this, c, function (a, b) {
                                    a.$parentContext = b; a.$parent = b.$data; a.$parents = (b.$parents || []).slice(0); a.$parents.unshift(a.$parent);
                                    d && d(a)
                                }, e)
                            }; a.R.prototype.extend = function (b) { return new a.R(this.Q || this.$data, this, null, function (c, d) { c.$rawData = d.$rawData; a.a.extend(c, "function" == typeof b ? b() : b) }) }; a.R.prototype.ac = function (a, b) { return this.createChildContext(a, b, null, { exportDependencies: !0 }) }; var q = a.a.e.J(), p = a.a.e.J(); a.xc = function (b, c) { if (2 == arguments.length) a.a.e.set(b, p, c), c.Q && c.Q.Dc(b); else return a.a.e.get(b, p) }; a.La = function (b, c, d) { 1 === b.nodeType && a.f.oc(b); return m(b, c, k(d), !0) }; a.Ic = function (b, c, d) {
                                d = k(d); return a.La(b,
                                    e(c, d, b), d)
                            }; a.hb = function (a, b) { 1 !== b.nodeType && 8 !== b.nodeType || g(k(a), b, !0) }; a.Ub = function (a, b) { !u && x.jQuery && (u = x.jQuery); if (b && 1 !== b.nodeType && 8 !== b.nodeType) throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node"); b = b || x.document.body; h(k(a), b, !0) }; a.nb = function (b) { switch (b.nodeType) { case 1: case 8: var c = a.xc(b); if (c) return c; if (b.parentNode) return a.nb(b.parentNode) }return n }; a.Oc = function (b) { return (b = a.nb(b)) ? b.$data : n }; a.b("bindingHandlers",
                                a.d); a.b("applyBindings", a.Ub); a.b("applyBindingsToDescendants", a.hb); a.b("applyBindingAccessorsToNode", a.La); a.b("applyBindingsToNode", a.Ic); a.b("contextFor", a.nb); a.b("dataFor", a.Oc)
                        })(); (function (b) {
                            function c(c, e) { var m = f.hasOwnProperty(c) ? f[c] : b, k; m ? m.Y(e) : (m = f[c] = new a.K, m.Y(e), d(c, function (b, d) { var e = !(!d || !d.synchronous); g[c] = { definition: b, dd: e }; delete f[c]; k || e ? m.notifySubscribers(b) : a.Z.Za(function () { m.notifySubscribers(b) }) }), k = !0) } function d(a, b) {
                                e("getConfig", [a], function (c) {
                                    c ? e("loadComponent",
                                        [a, c], function (a) { b(a, c) }) : b(null, null)
                                })
                            } function e(c, d, f, k) { k || (k = a.g.loaders.slice(0)); var g = k.shift(); if (g) { var q = g[c]; if (q) { var p = !1; if (q.apply(g, d.concat(function (a) { p ? f(null) : null !== a ? f(a) : e(c, d, f, k) })) !== b && (p = !0, !g.suppressLoaderExceptions)) throw Error("Component loaders must supply values by invoking the callback, not by returning values synchronously."); } else e(c, d, f, k) } else f(null) } var f = {}, g = {}; a.g = {
                                get: function (d, e) {
                                    var f = g.hasOwnProperty(d) ? g[d] : b; f ? f.dd ? a.l.w(function () { e(f.definition) }) :
                                        a.Z.Za(function () { e(f.definition) }) : c(d, e)
                                }, $b: function (a) { delete g[a] }, Nb: e
                            }; a.g.loaders = []; a.b("components", a.g); a.b("components.get", a.g.get); a.b("components.clearCachedDefinition", a.g.$b)
                        })(); (function () {
                            function b(b, c, d, e) { function g() { 0 === --y && e(h) } var h = {}, y = 2, v = d.template; d = d.viewModel; v ? f(c, v, function (c) { a.g.Nb("loadTemplate", [b, c], function (a) { h.template = a; g() }) }) : g(); d ? f(c, d, function (c) { a.g.Nb("loadViewModel", [b, c], function (a) { h[l] = a; g() }) }) : g() } function c(a, b, d) {
                                if ("function" === typeof b) d(function (a) { return new b(a) });
                                else if ("function" === typeof b[l]) d(b[l]); else if ("instance" in b) { var e = b.instance; d(function () { return e }) } else "viewModel" in b ? c(a, b.viewModel, d) : a("Unknown viewModel value: " + b)
                            } function d(b) { switch (a.a.A(b)) { case "script": return a.a.na(b.text); case "textarea": return a.a.na(b.value); case "template": if (e(b.content)) return a.a.wa(b.content.childNodes) }return a.a.wa(b.childNodes) } function e(a) { return x.DocumentFragment ? a instanceof DocumentFragment : a && 11 === a.nodeType } function f(a, b, c) {
                                "string" === typeof b.require ?
                                    O || x.require ? (O || x.require)([b.require], c) : a("Uses require, but no AMD loader is present") : c(b)
                            } function g(a) { return function (b) { throw Error("Component '" + a + "': " + b); } } var h = {}; a.g.register = function (b, c) { if (!c) throw Error("Invalid configuration for " + b); if (a.g.wb(b)) throw Error("Component " + b + " is already registered"); h[b] = c }; a.g.wb = function (a) { return h.hasOwnProperty(a) }; a.g.ud = function (b) { delete h[b]; a.g.$b(b) }; a.g.cc = {
                                getConfig: function (a, b) { b(h.hasOwnProperty(a) ? h[a] : null) }, loadComponent: function (a,
                                    c, d) { var e = g(a); f(e, c, function (c) { b(a, e, c, d) }) }, loadTemplate: function (b, c, f) { b = g(b); if ("string" === typeof c) f(a.a.na(c)); else if (c instanceof Array) f(c); else if (e(c)) f(a.a.W(c.childNodes)); else if (c.element) if (c = c.element, x.HTMLElement ? c instanceof HTMLElement : c && c.tagName && 1 === c.nodeType) f(d(c)); else if ("string" === typeof c) { var l = t.getElementById(c); l ? f(d(l)) : b("Cannot find element with ID " + c) } else b("Unknown element type: " + c); else b("Unknown template value: " + c) }, loadViewModel: function (a, b, d) {
                                        c(g(a),
                                            b, d)
                                    }
                            }; var l = "createViewModel"; a.b("components.register", a.g.register); a.b("components.isRegistered", a.g.wb); a.b("components.unregister", a.g.ud); a.b("components.defaultLoader", a.g.cc); a.g.loaders.push(a.g.cc); a.g.Ec = h
                        })(); (function () {
                            function b(b, e) {
                                var f = b.getAttribute("params"); if (f) {
                                    var f = c.parseBindingsString(f, e, b, { valueAccessors: !0, bindingParams: !0 }), f = a.a.Ea(f, function (c) { return a.m(c, null, { i: b }) }), g = a.a.Ea(f, function (c) {
                                        var e = c.p(); return c.ca() ? a.m({
                                            read: function () { return a.a.c(c()) }, write: a.Da(e) &&
                                                function (a) { c()(a) }, i: b
                                        }) : e
                                    }); g.hasOwnProperty("$raw") || (g.$raw = f); return g
                                } return { $raw: {} }
                            } a.g.getComponentNameForNode = function (b) { var c = a.a.A(b); if (a.g.wb(c) && (-1 != c.indexOf("-") || "[object HTMLUnknownElement]" == "" + b || 8 >= a.a.C && b.tagName === c)) return c }; a.g.Rb = function (c, e, f, g) {
                                if (1 === e.nodeType) {
                                    var h = a.g.getComponentNameForNode(e); if (h) {
                                        c = c || {}; if (c.component) throw Error('Cannot use the "component" binding on a custom element matching a component'); var l = { name: h, params: b(e, f) }; c.component = g ? function () { return l } :
                                            l
                                    }
                                } return c
                            }; var c = new a.S; 9 > a.a.C && (a.g.register = function (a) { return function (b) { t.createElement(b); return a.apply(this, arguments) } }(a.g.register), t.createDocumentFragment = function (b) { return function () { var c = b(), f = a.g.Ec, g; for (g in f) f.hasOwnProperty(g) && c.createElement(g); return c } }(t.createDocumentFragment))
                        })(); (function (b) {
                            function c(b, c, d) { c = c.template; if (!c) throw Error("Component '" + b + "' has no template"); b = a.a.wa(c); a.f.fa(d, b) } function d(a, b, c, d) {
                                var e = a.createViewModel; return e ? e.call(a,
                                    d, { element: b, templateNodes: c }) : d
                            } var e = 0; a.d.component = {
                                init: function (f, g, h, l, m) {
                                    function k() { var a = r && r.dispose; "function" === typeof a && a.call(r); q = r = null } var r, q, p = a.a.W(a.f.childNodes(f)); a.a.G.qa(f, k); a.m(function () {
                                        var l = a.a.c(g()), h, v; "string" === typeof l ? h = l : (h = a.a.c(l.name), v = a.a.c(l.params)); if (!h) throw Error("No component name specified"); var n = q = ++e; a.g.get(h, function (e) {
                                            if (q === n) {
                                                k(); if (!e) throw Error("Unknown component '" + h + "'"); c(h, e, f); var l = d(e, f, p, v); e = m.createChildContext(l, b, function (a) {
                                                    a.$component =
                                                        l; a.$componentTemplateNodes = p
                                                }); r = l; a.hb(e, f)
                                            }
                                        })
                                    }, null, { i: f }); return { controlsDescendantBindings: !0 }
                                }
                            }; a.f.aa.component = !0
                        })(); var Q = { "class": "className", "for": "htmlFor" }; a.d.attr = { update: function (b, c) { var d = a.a.c(c()) || {}; a.a.D(d, function (c, d) { d = a.a.c(d); var g = !1 === d || null === d || d === n; g && b.removeAttribute(c); 8 >= a.a.C && c in Q ? (c = Q[c], g ? b.removeAttribute(c) : b[c] = d) : g || b.setAttribute(c, d.toString()); "name" === c && a.a.vc(b, g ? "" : d.toString()) }) } }; (function () {
                            a.d.checked = {
                                after: ["value", "attr"], init: function (b,
                                    c, d) {
                                    function e() { var e = b.checked, f = p ? g() : e; if (!a.xa.Va() && (!l || e)) { var h = a.l.w(c); if (k) { var m = r ? h.p() : h; q !== f ? (e && (a.a.ra(m, f, !0), a.a.ra(m, q, !1)), q = f) : a.a.ra(m, f, e); r && a.Da(h) && h(m) } else a.h.Ga(h, d, "checked", f, !0) } } function f() { var d = a.a.c(c()); b.checked = k ? 0 <= a.a.o(d, g()) : h ? d : g() === d } var g = a.rc(function () { return d.has("checkedValue") ? a.a.c(d.get("checkedValue")) : d.has("value") ? a.a.c(d.get("value")) : b.value }), h = "checkbox" == b.type, l = "radio" == b.type; if (h || l) {
                                        var m = c(), k = h && a.a.c(m) instanceof Array,
                                            r = !(k && m.push && m.splice), q = k ? g() : n, p = l || k; l && !b.name && a.d.uniqueName.init(b, function () { return !0 }); a.m(e, null, { i: b }); a.a.q(b, "click", e); a.m(f, null, { i: b }); m = n
                                    }
                                }
                            }; a.h.ga.checked = !0; a.d.checkedValue = { update: function (b, c) { b.value = a.a.c(c()) } }
                        })(); a.d.css = { update: function (b, c) { var d = a.a.c(c()); null !== d && "object" == typeof d ? a.a.D(d, function (c, d) { d = a.a.c(d); a.a.fb(b, c, d) }) : (d = a.a.cb(String(d || "")), a.a.fb(b, b.__ko__cssValue, !1), b.__ko__cssValue = d, a.a.fb(b, d, !0)) } }; a.d.enable = {
                            update: function (b, c) {
                                var d = a.a.c(c());
                                d && b.disabled ? b.removeAttribute("disabled") : d || b.disabled || (b.disabled = !0)
                            }
                        }; a.d.disable = { update: function (b, c) { a.d.enable.update(b, function () { return !a.a.c(c()) }) } }; a.d.event = { init: function (b, c, d, e, f) { var g = c() || {}; a.a.D(g, function (g) { "string" == typeof g && a.a.q(b, g, function (b) { var m, k = c()[g]; if (k) { try { var r = a.a.W(arguments); e = f.$data; r.unshift(e); m = k.apply(e, r) } finally { !0 !== m && (b.preventDefault ? b.preventDefault() : b.returnValue = !1) } !1 === d.get(g + "Bubble") && (b.cancelBubble = !0, b.stopPropagation && b.stopPropagation()) } }) }) } };
            a.d.foreach = {
                mc: function (b) { return function () { var c = b(), d = a.a.Bb(c); if (!d || "number" == typeof d.length) return { foreach: c, templateEngine: a.X.vb }; a.a.c(c); return { foreach: d.data, as: d.as, includeDestroyed: d.includeDestroyed, afterAdd: d.afterAdd, beforeRemove: d.beforeRemove, afterRender: d.afterRender, beforeMove: d.beforeMove, afterMove: d.afterMove, templateEngine: a.X.vb } } }, init: function (b, c) { return a.d.template.init(b, a.d.foreach.mc(c)) }, update: function (b, c, d, e, f) {
                    return a.d.template.update(b, a.d.foreach.mc(c),
                        d, e, f)
                }
            }; a.h.va.foreach = !1; a.f.aa.foreach = !0; a.d.hasfocus = {
                init: function (b, c, d) { function e(e) { b.__ko_hasfocusUpdating = !0; var f = b.ownerDocument; if ("activeElement" in f) { var g; try { g = f.activeElement } catch (k) { g = f.body } e = g === b } f = c(); a.h.Ga(f, d, "hasfocus", e, !0); b.__ko_hasfocusLastValue = e; b.__ko_hasfocusUpdating = !1 } var f = e.bind(null, !0), g = e.bind(null, !1); a.a.q(b, "focus", f); a.a.q(b, "focusin", f); a.a.q(b, "blur", g); a.a.q(b, "focusout", g) }, update: function (b, c) {
                    var d = !!a.a.c(c()); b.__ko_hasfocusUpdating || b.__ko_hasfocusLastValue ===
                        d || (d ? b.focus() : b.blur(), !d && b.__ko_hasfocusLastValue && b.ownerDocument.body.focus(), a.l.w(a.a.Fa, null, [b, d ? "focusin" : "focusout"]))
                }
            }; a.h.ga.hasfocus = !0; a.d.hasFocus = a.d.hasfocus; a.h.ga.hasFocus = !0; a.d.html = { init: function () { return { controlsDescendantBindings: !0 } }, update: function (b, c) { a.a.Eb(b, c()) } }; K("if"); K("ifnot", !1, !0); K("with", !0, !1, function (a, c) { return a.ac(c) }); var L = {}; a.d.options = {
                init: function (b) {
                    if ("select" !== a.a.A(b)) throw Error("options binding applies only to SELECT elements"); for (; 0 <
                        b.length;)b.remove(0); return { controlsDescendantBindings: !0 }
                }, update: function (b, c, d) {
                    function e() { return a.a.Ma(b.options, function (a) { return a.selected }) } function f(a, b, c) { var d = typeof b; return "function" == d ? b(a) : "string" == d ? a[b] : c } function g(c, e) { if (A && k) a.j.ja(b, a.a.c(d.get("value")), !0); else if (p.length) { var f = 0 <= a.a.o(p, a.j.u(e[0])); a.a.wc(e[0], f); A && !f && a.l.w(a.a.Fa, null, [b, "change"]) } } var h = b.multiple, l = 0 != b.length && h ? b.scrollTop : null, m = a.a.c(c()), k = d.get("valueAllowUnset") && d.has("value"), r =
                        d.get("optionsIncludeDestroyed"); c = {}; var q, p = []; k || (h ? p = a.a.ib(e(), a.j.u) : 0 <= b.selectedIndex && p.push(a.j.u(b.options[b.selectedIndex]))); m && ("undefined" == typeof m.length && (m = [m]), q = a.a.Ma(m, function (b) { return r || b === n || null === b || !a.a.c(b._destroy) }), d.has("optionsCaption") && (m = a.a.c(d.get("optionsCaption")), null !== m && m !== n && q.unshift(L))); var A = !1; c.beforeRemove = function (a) { b.removeChild(a) }; m = g; d.has("optionsAfterRender") && "function" == typeof d.get("optionsAfterRender") && (m = function (b, c) {
                            g(0, c);
                            a.l.w(d.get("optionsAfterRender"), null, [c[0], b !== L ? b : n])
                        }); a.a.Db(b, q, function (c, e, g) { g.length && (p = !k && g[0].selected ? [a.j.u(g[0])] : [], A = !0); e = b.ownerDocument.createElement("option"); c === L ? (a.a.bb(e, d.get("optionsCaption")), a.j.ja(e, n)) : (g = f(c, d.get("optionsValue"), c), a.j.ja(e, a.a.c(g)), c = f(c, d.get("optionsText"), g), a.a.bb(e, c)); return [e] }, c, m); a.l.w(function () {
                            k ? a.j.ja(b, a.a.c(d.get("value")), !0) : (h ? p.length && e().length < p.length : p.length && 0 <= b.selectedIndex ? a.j.u(b.options[b.selectedIndex]) !== p[0] :
                                p.length || 0 <= b.selectedIndex) && a.a.Fa(b, "change")
                        }); a.a.Sc(b); l && 20 < Math.abs(l - b.scrollTop) && (b.scrollTop = l)
                }
            }; a.d.options.zb = a.a.e.J(); a.d.selectedOptions = {
                after: ["options", "foreach"], init: function (b, c, d) { a.a.q(b, "change", function () { var e = c(), f = []; a.a.r(b.getElementsByTagName("option"), function (b) { b.selected && f.push(a.j.u(b)) }); a.h.Ga(e, d, "selectedOptions", f) }) }, update: function (b, c) {
                    if ("select" != a.a.A(b)) throw Error("values binding applies only to SELECT elements"); var d = a.a.c(c()), e = b.scrollTop;
                    d && "number" == typeof d.length && a.a.r(b.getElementsByTagName("option"), function (b) { var c = 0 <= a.a.o(d, a.j.u(b)); b.selected != c && a.a.wc(b, c) }); b.scrollTop = e
                }
            }; a.h.ga.selectedOptions = !0; a.d.style = { update: function (b, c) { var d = a.a.c(c() || {}); a.a.D(d, function (c, d) { d = a.a.c(d); if (null === d || d === n || !1 === d) d = ""; b.style[c] = d }) } }; a.d.submit = {
                init: function (b, c, d, e, f) {
                    if ("function" != typeof c()) throw Error("The value for a submit binding must be a function"); a.a.q(b, "submit", function (a) {
                        var d, e = c(); try {
                            d = e.call(f.$data,
                                b)
                        } finally { !0 !== d && (a.preventDefault ? a.preventDefault() : a.returnValue = !1) }
                    })
                }
            }; a.d.text = { init: function () { return { controlsDescendantBindings: !0 } }, update: function (b, c) { a.a.bb(b, c()) } }; a.f.aa.text = !0; (function () {
                if (x && x.navigator) var b = function (a) { if (a) return parseFloat(a[1]) }, c = x.opera && x.opera.version && parseInt(x.opera.version()), d = x.navigator.userAgent, e = b(d.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i)), f = b(d.match(/Firefox\/([^ ]*)/)); if (10 > a.a.C) var g = a.a.e.J(), h = a.a.e.J(), l = function (b) {
                    var c =
                        this.activeElement; (c = c && a.a.e.get(c, h)) && c(b)
                }, m = function (b, c) { var d = b.ownerDocument; a.a.e.get(d, g) || (a.a.e.set(d, g, !0), a.a.q(d, "selectionchange", l)); a.a.e.set(b, h, c) }; a.d.textInput = {
                    init: function (b, d, g) {
                        function l(c, d) { a.a.q(b, c, d) } function h() { var c = a.a.c(d()); if (null === c || c === n) c = ""; u !== n && c === u ? a.a.setTimeout(h, 4) : b.value !== c && (s = c, b.value = c) } function y() { t || (u = b.value, t = a.a.setTimeout(v, 4)) } function v() { clearTimeout(t); u = t = n; var c = b.value; s !== c && (s = c, a.h.Ga(d(), g, "textInput", c)) } var s = b.value,
                            t, u, x = 9 == a.a.C ? y : v; 10 > a.a.C ? (l("propertychange", function (a) { "value" === a.propertyName && x(a) }), 8 == a.a.C && (l("keyup", v), l("keydown", v)), 8 <= a.a.C && (m(b, x), l("dragend", y))) : (l("input", v), 5 > e && "textarea" === a.a.A(b) ? (l("keydown", y), l("paste", y), l("cut", y)) : 11 > c ? l("keydown", y) : 4 > f && (l("DOMAutoComplete", v), l("dragdrop", v), l("drop", v))); l("change", v); a.m(h, null, { i: b })
                    }
                }; a.h.ga.textInput = !0; a.d.textinput = { preprocess: function (a, b, c) { c("textInput", a) } }
            })(); a.d.uniqueName = {
                init: function (b, c) {
                    if (c()) {
                        var d = "ko_unique_" +
                            ++a.d.uniqueName.Nc; a.a.vc(b, d)
                    }
                }
            }; a.d.uniqueName.Nc = 0; a.d.value = {
                after: ["options", "foreach"], init: function (b, c, d) {
                    if ("input" != b.tagName.toLowerCase() || "checkbox" != b.type && "radio" != b.type) {
                        var e = ["change"], f = d.get("valueUpdate"), g = !1, h = null; f && ("string" == typeof f && (f = [f]), a.a.ta(e, f), e = a.a.Wb(e)); var l = function () { h = null; g = !1; var e = c(), f = a.j.u(b); a.h.Ga(e, d, "value", f) }; !a.a.C || "input" != b.tagName.toLowerCase() || "text" != b.type || "off" == b.autocomplete || b.form && "off" == b.form.autocomplete || -1 != a.a.o(e, "propertychange") ||
                            (a.a.q(b, "propertychange", function () { g = !0 }), a.a.q(b, "focus", function () { g = !1 }), a.a.q(b, "blur", function () { g && l() })); a.a.r(e, function (c) { var d = l; a.a.sd(c, "after") && (d = function () { h = a.j.u(b); a.a.setTimeout(l, 0) }, c = c.substring(5)); a.a.q(b, c, d) }); var m = function () {
                                var e = a.a.c(c()), f = a.j.u(b); if (null !== h && e === h) a.a.setTimeout(m, 0); else if (e !== f) if ("select" === a.a.A(b)) { var g = d.get("valueAllowUnset"), f = function () { a.j.ja(b, e, g) }; f(); g || e === a.j.u(b) ? a.a.setTimeout(f, 0) : a.l.w(a.a.Fa, null, [b, "change"]) } else a.j.ja(b,
                                    e)
                            }; a.m(m, null, { i: b })
                    } else a.La(b, { checkedValue: c })
                }, update: function () { }
            }; a.h.ga.value = !0; a.d.visible = { update: function (b, c) { var d = a.a.c(c()), e = "none" != b.style.display; d && !e ? b.style.display = "" : !d && e && (b.style.display = "none") } }; (function (b) { a.d[b] = { init: function (c, d, e, f, g) { return a.d.event.init.call(this, c, function () { var a = {}; a[b] = d(); return a }, e, f, g) } } })("click"); a.P = function () { }; a.P.prototype.renderTemplateSource = function () { throw Error("Override renderTemplateSource"); }; a.P.prototype.createJavaScriptEvaluatorBlock =
                function () { throw Error("Override createJavaScriptEvaluatorBlock"); }; a.P.prototype.makeTemplateSource = function (b, c) { if ("string" == typeof b) { c = c || t; var d = c.getElementById(b); if (!d) throw Error("Cannot find template with ID " + b); return new a.v.n(d) } if (1 == b.nodeType || 8 == b.nodeType) return new a.v.sa(b); throw Error("Unknown template type: " + b); }; a.P.prototype.renderTemplate = function (a, c, d, e) { a = this.makeTemplateSource(a, e); return this.renderTemplateSource(a, c, d, e) }; a.P.prototype.isTemplateRewritten = function (a,
                    c) { return !1 === this.allowTemplateRewriting ? !0 : this.makeTemplateSource(a, c).data("isRewritten") }; a.P.prototype.rewriteTemplate = function (a, c, d) { a = this.makeTemplateSource(a, d); c = c(a.text()); a.text(c); a.data("isRewritten", !0) }; a.b("templateEngine", a.P); a.Ib = function () {
                        function b(b, c, d, h) {
                            b = a.h.Ab(b); for (var l = a.h.va, m = 0; m < b.length; m++) {
                                var k = b[m].key; if (l.hasOwnProperty(k)) {
                                    var r = l[k]; if ("function" === typeof r) { if (k = r(b[m].value)) throw Error(k); } else if (!r) throw Error("This template engine does not support the '" +
                                        k + "' binding within its templates");
                                }
                            } d = "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + a.h.Xa(b, { valueAccessors: !0 }) + " } })()},'" + d.toLowerCase() + "')"; return h.createJavaScriptEvaluatorBlock(d) + c
                        } var c = /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi, d = /\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g; return {
                            Tc: function (b, c, d) {
                                c.isTemplateRewritten(b, d) || c.rewriteTemplate(b, function (b) {
                                    return a.Ib.jd(b,
                                        c)
                                }, d)
                            }, jd: function (a, f) { return a.replace(c, function (a, c, d, e, k) { return b(k, c, d, f) }).replace(d, function (a, c) { return b(c, "\x3c!-- ko --\x3e", "#comment", f) }) }, Jc: function (b, c) { return a.N.yb(function (d, h) { var l = d.nextSibling; l && l.nodeName.toLowerCase() === c && a.La(l, b, h) }) }
                        }
                    }(); a.b("__tr_ambtns", a.Ib.Jc); (function () {
                        a.v = {}; a.v.n = function (b) { if (this.n = b) { var c = a.a.A(b); this.eb = "script" === c ? 1 : "textarea" === c ? 2 : "template" == c && b.content && 11 === b.content.nodeType ? 3 : 4 } }; a.v.n.prototype.text = function () {
                            var b = 1 ===
                                this.eb ? "text" : 2 === this.eb ? "value" : "innerHTML"; if (0 == arguments.length) return this.n[b]; var c = arguments[0]; "innerHTML" === b ? a.a.Eb(this.n, c) : this.n[b] = c
                        }; var b = a.a.e.J() + "_"; a.v.n.prototype.data = function (c) { if (1 === arguments.length) return a.a.e.get(this.n, b + c); a.a.e.set(this.n, b + c, arguments[1]) }; var c = a.a.e.J(); a.v.n.prototype.nodes = function () { var b = this.n; if (0 == arguments.length) return (a.a.e.get(b, c) || {}).mb || (3 === this.eb ? b.content : 4 === this.eb ? b : n); a.a.e.set(b, c, { mb: arguments[0] }) }; a.v.sa = function (a) {
                            this.n =
                                a
                        }; a.v.sa.prototype = new a.v.n; a.v.sa.prototype.text = function () { if (0 == arguments.length) { var b = a.a.e.get(this.n, c) || {}; b.Jb === n && b.mb && (b.Jb = b.mb.innerHTML); return b.Jb } a.a.e.set(this.n, c, { Jb: arguments[0] }) }; a.b("templateSources", a.v); a.b("templateSources.domElement", a.v.n); a.b("templateSources.anonymousTemplate", a.v.sa)
                    })(); (function () {
                        function b(b, c, d) { var e; for (c = a.f.nextSibling(c); b && (e = b) !== c;)b = a.f.nextSibling(e), d(e, b) } function c(c, d) {
                            if (c.length) {
                                var e = c[0], f = c[c.length - 1], g = e.parentNode, h =
                                    a.S.instance, n = h.preprocessNode; if (n) { b(e, f, function (a, b) { var c = a.previousSibling, d = n.call(h, a); d && (a === e && (e = d[0] || b), a === f && (f = d[d.length - 1] || c)) }); c.length = 0; if (!e) return; e === f ? c.push(e) : (c.push(e, f), a.a.Ba(c, g)) } b(e, f, function (b) { 1 !== b.nodeType && 8 !== b.nodeType || a.Ub(d, b) }); b(e, f, function (b) { 1 !== b.nodeType && 8 !== b.nodeType || a.N.Cc(b, [d]) }); a.a.Ba(c, g)
                            }
                        } function d(a) { return a.nodeType ? a : 0 < a.length ? a[0] : null } function e(b, e, f, h, q) {
                            q = q || {}; var p = (b && d(b) || f || {}).ownerDocument, n = q.templateEngine || g;
                            a.Ib.Tc(f, n, p); f = n.renderTemplate(f, h, q, p); if ("number" != typeof f.length || 0 < f.length && "number" != typeof f[0].nodeType) throw Error("Template engine must return an array of DOM nodes"); p = !1; switch (e) { case "replaceChildren": a.f.fa(b, f); p = !0; break; case "replaceNode": a.a.uc(b, f); p = !0; break; case "ignoreTargetNode": break; default: throw Error("Unknown renderMode: " + e); }p && (c(f, h), q.afterRender && a.l.w(q.afterRender, null, [f, h.$data])); return f
                        } function f(b, c, d) { return a.I(b) ? b() : "function" === typeof b ? b(c, d) : b }
                        var g; a.Fb = function (b) { if (b != n && !(b instanceof a.P)) throw Error("templateEngine must inherit from ko.templateEngine"); g = b }; a.Cb = function (b, c, k, h, q) {
                            k = k || {}; if ((k.templateEngine || g) == n) throw Error("Set a template engine before calling renderTemplate"); q = q || "replaceChildren"; if (h) {
                                var p = d(h); return a.B(function () { var g = c && c instanceof a.R ? c : new a.R(c, null, null, null, { exportDependencies: !0 }), n = f(b, g.$data, g), g = e(h, q, n, g, k); "replaceNode" == q && (h = g, p = d(h)) }, null, {
                                    ya: function () { return !p || !a.a.qb(p) }, i: p &&
                                        "replaceNode" == q ? p.parentNode : p
                                })
                            } return a.N.yb(function (d) { a.Cb(b, c, k, d, "replaceNode") })
                        }; a.pd = function (b, d, g, h, q) {
                            function p(a, b) { c(b, t); g.afterRender && g.afterRender(b, a); t = null } function s(a, c) { t = q.createChildContext(a, g.as, function (a) { a.$index = c }); var d = f(b, a, t); return e(null, "ignoreTargetNode", d, t, g) } var t; return a.B(function () {
                                var b = a.a.c(d) || []; "undefined" == typeof b.length && (b = [b]); b = a.a.Ma(b, function (b) { return g.includeDestroyed || b === n || null === b || !a.a.c(b._destroy) }); a.l.w(a.a.Db, null, [h, b,
                                    s, g, p])
                            }, null, { i: h })
                        }; var h = a.a.e.J(); a.d.template = {
                            init: function (b, c) { var d = a.a.c(c()); if ("string" == typeof d || d.name) a.f.za(b); else { if ("nodes" in d) { if (d = d.nodes || [], a.I(d)) throw Error('The "nodes" option must be a plain, non-observable array.'); } else d = a.f.childNodes(b); d = a.a.nc(d); (new a.v.sa(b)).nodes(d) } return { controlsDescendantBindings: !0 } }, update: function (b, c, d, e, f) {
                                var g = c(); c = a.a.c(g); d = !0; e = null; "string" == typeof c ? c = {} : (g = c.name, "if" in c && (d = a.a.c(c["if"])), d && "ifnot" in c && (d = !a.a.c(c.ifnot)));
                                "foreach" in c ? e = a.pd(g || b, d && c.foreach || [], c, b, f) : d ? (f = "data" in c ? f.ac(c.data, c.as) : f, e = a.Cb(g || b, f, c, b)) : a.f.za(b); f = e; (c = a.a.e.get(b, h)) && "function" == typeof c.k && c.k(); a.a.e.set(b, h, f && f.ca() ? f : n)
                            }
                        }; a.h.va.template = function (b) { b = a.h.Ab(b); return 1 == b.length && b[0].unknown || a.h.fd(b, "name") ? null : "This template engine does not support anonymous templates nested within its templates" }; a.f.aa.template = !0
                    })(); a.b("setTemplateEngine", a.Fb); a.b("renderTemplate", a.Cb); a.a.hc = function (a, c, d) {
                        if (a.length &&
                            c.length) { var e, f, g, h, l; for (e = f = 0; (!d || e < d) && (h = a[f]); ++f) { for (g = 0; l = c[g]; ++g)if (h.value === l.value) { h.moved = l.index; l.moved = h.index; c.splice(g, 1); e = g = 0; break } e += g } }
                    }; a.a.lb = function () {
                        function b(b, d, e, f, g) {
                            var h = Math.min, l = Math.max, m = [], k, n = b.length, q, p = d.length, s = p - n || 1, t = n + p + 1, v, u, x; for (k = 0; k <= n; k++)for (u = v, m.push(v = []), x = h(p, k + s), q = l(0, k - 1); q <= x; q++)v[q] = q ? k ? b[k - 1] === d[q - 1] ? u[q - 1] : h(u[q] || t, v[q - 1] || t) + 1 : q + 1 : k + 1; h = []; l = []; s = []; k = n; for (q = p; k || q;)p = m[k][q] - 1, q && p === m[k][q - 1] ? l.push(h[h.length] = {
                                status: e,
                                value: d[--q], index: q
                            }) : k && p === m[k - 1][q] ? s.push(h[h.length] = { status: f, value: b[--k], index: k }) : (--q, --k, g.sparse || h.push({ status: "retained", value: d[q] })); a.a.hc(s, l, !g.dontLimitMoves && 10 * n); return h.reverse()
                        } return function (a, d, e) { e = "boolean" === typeof e ? { dontLimitMoves: e } : e || {}; a = a || []; d = d || []; return a.length < d.length ? b(a, d, "added", "deleted", e) : b(d, a, "deleted", "added", e) }
                    }(); a.b("utils.compareArrays", a.a.lb); (function () {
                        function b(b, c, d, h, l) {
                            var m = [], k = a.B(function () {
                                var k = c(d, l, a.a.Ba(m, b)) || []; 0 <
                                    m.length && (a.a.uc(m, k), h && a.l.w(h, null, [d, k, l])); m.length = 0; a.a.ta(m, k)
                            }, null, { i: b, ya: function () { return !a.a.Tb(m) } }); return { ea: m, B: k.ca() ? k : n }
                        } var c = a.a.e.J(), d = a.a.e.J(); a.a.Db = function (e, f, g, h, l) {
                            function m(b, c) { w = q[c]; u !== c && (D[b] = w); w.tb(u++); a.a.Ba(w.ea, e); t.push(w); z.push(w) } function k(b, c) { if (b) for (var d = 0, e = c.length; d < e; d++)c[d] && a.a.r(c[d].ea, function (a) { b(a, d, c[d].ka) }) } f = f || []; h = h || {}; var r = a.a.e.get(e, c) === n, q = a.a.e.get(e, c) || [], p = a.a.ib(q, function (a) { return a.ka }), s = a.a.lb(p, f, h.dontLimitMoves),
                                t = [], v = 0, u = 0, x = [], z = []; f = []; for (var D = [], p = [], w, C = 0, B, E; B = s[C]; C++)switch (E = B.moved, B.status) { case "deleted": E === n && (w = q[v], w.B && (w.B.k(), w.B = n), a.a.Ba(w.ea, e).length && (h.beforeRemove && (t.push(w), z.push(w), w.ka === d ? w = null : f[C] = w), w && x.push.apply(x, w.ea))); v++; break; case "retained": m(C, v++); break; case "added": E !== n ? m(C, E) : (w = { ka: B.value, tb: a.O(u++) }, t.push(w), z.push(w), r || (p[C] = w)) }a.a.e.set(e, c, t); k(h.beforeMove, D); a.a.r(x, h.beforeRemove ? a.ba : a.removeNode); for (var C = 0, r = a.f.firstChild(e), F; w = z[C]; C++) {
                                    w.ea ||
                                        a.a.extend(w, b(e, g, w.ka, l, w.tb)); for (v = 0; s = w.ea[v]; r = s.nextSibling, F = s, v++)s !== r && a.f.kc(e, s, F); !w.ad && l && (l(w.ka, w.ea, w.tb), w.ad = !0)
                                } k(h.beforeRemove, f); for (C = 0; C < f.length; ++C)f[C] && (f[C].ka = d); k(h.afterMove, D); k(h.afterAdd, p)
                        }
                    })(); a.b("utils.setDomNodeChildrenFromArrayMapping", a.a.Db); a.X = function () { this.allowTemplateRewriting = !1 }; a.X.prototype = new a.P; a.X.prototype.renderTemplateSource = function (b, c, d, e) {
                        if (c = (9 > a.a.C ? 0 : b.nodes) ? b.nodes() : null) return a.a.W(c.cloneNode(!0).childNodes); b = b.text();
                        return a.a.na(b, e)
                    }; a.X.vb = new a.X; a.Fb(a.X.vb); a.b("nativeTemplateEngine", a.X); (function () {
                        a.xb = function () {
                            var a = this.ed = function () { if (!u || !u.tmpl) return 0; try { if (0 <= u.tmpl.tag.tmpl.open.toString().indexOf("__")) return 2 } catch (a) { } return 1 }(); this.renderTemplateSource = function (b, e, f, g) {
                                g = g || t; f = f || {}; if (2 > a) throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later."); var h = b.data("precompiled"); h || (h = b.text() || "", h = u.template(null, "{{ko_with $item.koBindingContext}}" +
                                    h + "{{/ko_with}}"), b.data("precompiled", h)); b = [e.$data]; e = u.extend({ koBindingContext: e }, f.templateOptions); e = u.tmpl(h, b, e); e.appendTo(g.createElement("div")); u.fragments = {}; return e
                            }; this.createJavaScriptEvaluatorBlock = function (a) { return "{{ko_code ((function() { return " + a + " })()) }}" }; this.addTemplate = function (a, b) { t.write("<script type='text/html' id='" + a + "'>" + b + "\x3c/script>") }; 0 < a && (u.tmpl.tag.ko_code = { open: "__.push($1 || '');" }, u.tmpl.tag.ko_with = { open: "with($1) {", close: "} " })
                        }; a.xb.prototype =
                            new a.P; var b = new a.xb; 0 < b.ed && a.Fb(b); a.b("jqueryTmplTemplateEngine", a.xb)
                    })()
        })
    })();
})();

/*!
         * Chart.js
         * http://chartjs.org/
         * Version: 2.7.1
         *
         * Copyright 2017 Nick Downie
         * Released under the MIT license
         * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
         */
console.log("chart.js ready!");
!function (t) { if ("object" == typeof exports && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else { ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Chart = t() } }(function () { return function t(e, n, i) { function a(o, s) { if (!n[o]) { if (!e[o]) { var l = "function" == typeof require && require; if (!s && l) return l(o, !0); if (r) return r(o, !0); var u = new Error("Cannot find module '" + o + "'"); throw u.code = "MODULE_NOT_FOUND", u } var d = n[o] = { exports: {} }; e[o][0].call(d.exports, function (t) { var n = e[o][1][t]; return a(n || t) }, d, d.exports, t, e, n, i) } return n[o].exports } for (var r = "function" == typeof require && require, o = 0; o < i.length; o++)a(i[o]); return a }({ 1: [function (t, e, n) { function i(t) { if (t) { var e = [0, 0, 0], n = 1, i = t.match(/^#([a-fA-F0-9]{3})$/i); if (i) { i = i[1]; for (a = 0; a < e.length; a++)e[a] = parseInt(i[a] + i[a], 16) } else if (i = t.match(/^#([a-fA-F0-9]{6})$/i)) { i = i[1]; for (a = 0; a < e.length; a++)e[a] = parseInt(i.slice(2 * a, 2 * a + 2), 16) } else if (i = t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)) { for (a = 0; a < e.length; a++)e[a] = parseInt(i[a + 1]); n = parseFloat(i[4]) } else if (i = t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)) { for (a = 0; a < e.length; a++)e[a] = Math.round(2.55 * parseFloat(i[a + 1])); n = parseFloat(i[4]) } else if (i = t.match(/(\w+)/)) { if ("transparent" == i[1]) return [0, 0, 0, 0]; if (!(e = c[i[1]])) return } for (var a = 0; a < e.length; a++)e[a] = u(e[a], 0, 255); return n = n || 0 == n ? u(n, 0, 1) : 1, e[3] = n, e } } function a(t) { if (t) { var e = t.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/); if (e) { var n = parseFloat(e[4]); return [u(parseInt(e[1]), 0, 360), u(parseFloat(e[2]), 0, 100), u(parseFloat(e[3]), 0, 100), u(isNaN(n) ? 1 : n, 0, 1)] } } } function r(t) { if (t) { var e = t.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/); if (e) { var n = parseFloat(e[4]); return [u(parseInt(e[1]), 0, 360), u(parseFloat(e[2]), 0, 100), u(parseFloat(e[3]), 0, 100), u(isNaN(n) ? 1 : n, 0, 1)] } } } function o(t, e) { return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")" } function s(t, e) { return "rgba(" + Math.round(t[0] / 255 * 100) + "%, " + Math.round(t[1] / 255 * 100) + "%, " + Math.round(t[2] / 255 * 100) + "%, " + (e || t[3] || 1) + ")" } function l(t, e) { return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")" } function u(t, e, n) { return Math.min(Math.max(e, t), n) } function d(t) { var e = t.toString(16).toUpperCase(); return e.length < 2 ? "0" + e : e } var c = t(5); e.exports = { getRgba: i, getHsla: a, getRgb: function (t) { var e = i(t); return e && e.slice(0, 3) }, getHsl: function (t) { var e = a(t); return e && e.slice(0, 3) }, getHwb: r, getAlpha: function (t) { var e = i(t); return e ? e[3] : (e = a(t)) ? e[3] : (e = r(t)) ? e[3] : void 0 }, hexString: function (t) { return "#" + d(t[0]) + d(t[1]) + d(t[2]) }, rgbString: function (t, e) { return e < 1 || t[3] && t[3] < 1 ? o(t, e) : "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")" }, rgbaString: o, percentString: function (t, e) { return e < 1 || t[3] && t[3] < 1 ? s(t, e) : "rgb(" + Math.round(t[0] / 255 * 100) + "%, " + Math.round(t[1] / 255 * 100) + "%, " + Math.round(t[2] / 255 * 100) + "%)" }, percentaString: s, hslString: function (t, e) { return e < 1 || t[3] && t[3] < 1 ? l(t, e) : "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)" }, hslaString: l, hwbString: function (t, e) { return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + (void 0 !== e && 1 !== e ? ", " + e : "") + ")" }, keyword: function (t) { return h[t.slice(0, 3)] } }; var h = {}; for (var f in c) h[c[f]] = f }, { 5: 5 }], 2: [function (t, e, n) { var i = t(4), a = t(1), r = function (t) { if (t instanceof r) return t; if (!(this instanceof r)) return new r(t); this.valid = !1, this.values = { rgb: [0, 0, 0], hsl: [0, 0, 0], hsv: [0, 0, 0], hwb: [0, 0, 0], cmyk: [0, 0, 0, 0], alpha: 1 }; var e; "string" == typeof t ? (e = a.getRgba(t)) ? this.setValues("rgb", e) : (e = a.getHsla(t)) ? this.setValues("hsl", e) : (e = a.getHwb(t)) && this.setValues("hwb", e) : "object" == typeof t && (void 0 !== (e = t).r || void 0 !== e.red ? this.setValues("rgb", e) : void 0 !== e.l || void 0 !== e.lightness ? this.setValues("hsl", e) : void 0 !== e.v || void 0 !== e.value ? this.setValues("hsv", e) : void 0 !== e.w || void 0 !== e.whiteness ? this.setValues("hwb", e) : void 0 === e.c && void 0 === e.cyan || this.setValues("cmyk", e)) }; r.prototype = { isValid: function () { return this.valid }, rgb: function () { return this.setSpace("rgb", arguments) }, hsl: function () { return this.setSpace("hsl", arguments) }, hsv: function () { return this.setSpace("hsv", arguments) }, hwb: function () { return this.setSpace("hwb", arguments) }, cmyk: function () { return this.setSpace("cmyk", arguments) }, rgbArray: function () { return this.values.rgb }, hslArray: function () { return this.values.hsl }, hsvArray: function () { return this.values.hsv }, hwbArray: function () { var t = this.values; return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb }, cmykArray: function () { return this.values.cmyk }, rgbaArray: function () { var t = this.values; return t.rgb.concat([t.alpha]) }, hslaArray: function () { var t = this.values; return t.hsl.concat([t.alpha]) }, alpha: function (t) { return void 0 === t ? this.values.alpha : (this.setValues("alpha", t), this) }, red: function (t) { return this.setChannel("rgb", 0, t) }, green: function (t) { return this.setChannel("rgb", 1, t) }, blue: function (t) { return this.setChannel("rgb", 2, t) }, hue: function (t) { return t && (t = (t %= 360) < 0 ? 360 + t : t), this.setChannel("hsl", 0, t) }, saturation: function (t) { return this.setChannel("hsl", 1, t) }, lightness: function (t) { return this.setChannel("hsl", 2, t) }, saturationv: function (t) { return this.setChannel("hsv", 1, t) }, whiteness: function (t) { return this.setChannel("hwb", 1, t) }, blackness: function (t) { return this.setChannel("hwb", 2, t) }, value: function (t) { return this.setChannel("hsv", 2, t) }, cyan: function (t) { return this.setChannel("cmyk", 0, t) }, magenta: function (t) { return this.setChannel("cmyk", 1, t) }, yellow: function (t) { return this.setChannel("cmyk", 2, t) }, black: function (t) { return this.setChannel("cmyk", 3, t) }, hexString: function () { return a.hexString(this.values.rgb) }, rgbString: function () { return a.rgbString(this.values.rgb, this.values.alpha) }, rgbaString: function () { return a.rgbaString(this.values.rgb, this.values.alpha) }, percentString: function () { return a.percentString(this.values.rgb, this.values.alpha) }, hslString: function () { return a.hslString(this.values.hsl, this.values.alpha) }, hslaString: function () { return a.hslaString(this.values.hsl, this.values.alpha) }, hwbString: function () { return a.hwbString(this.values.hwb, this.values.alpha) }, keyword: function () { return a.keyword(this.values.rgb, this.values.alpha) }, rgbNumber: function () { var t = this.values.rgb; return t[0] << 16 | t[1] << 8 | t[2] }, luminosity: function () { for (var t = this.values.rgb, e = [], n = 0; n < t.length; n++) { var i = t[n] / 255; e[n] = i <= .03928 ? i / 12.92 : Math.pow((i + .055) / 1.055, 2.4) } return .2126 * e[0] + .7152 * e[1] + .0722 * e[2] }, contrast: function (t) { var e = this.luminosity(), n = t.luminosity(); return e > n ? (e + .05) / (n + .05) : (n + .05) / (e + .05) }, level: function (t) { var e = this.contrast(t); return e >= 7.1 ? "AAA" : e >= 4.5 ? "AA" : "" }, dark: function () { var t = this.values.rgb; return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128 }, light: function () { return !this.dark() }, negate: function () { for (var t = [], e = 0; e < 3; e++)t[e] = 255 - this.values.rgb[e]; return this.setValues("rgb", t), this }, lighten: function (t) { var e = this.values.hsl; return e[2] += e[2] * t, this.setValues("hsl", e), this }, darken: function (t) { var e = this.values.hsl; return e[2] -= e[2] * t, this.setValues("hsl", e), this }, saturate: function (t) { var e = this.values.hsl; return e[1] += e[1] * t, this.setValues("hsl", e), this }, desaturate: function (t) { var e = this.values.hsl; return e[1] -= e[1] * t, this.setValues("hsl", e), this }, whiten: function (t) { var e = this.values.hwb; return e[1] += e[1] * t, this.setValues("hwb", e), this }, blacken: function (t) { var e = this.values.hwb; return e[2] += e[2] * t, this.setValues("hwb", e), this }, greyscale: function () { var t = this.values.rgb, e = .3 * t[0] + .59 * t[1] + .11 * t[2]; return this.setValues("rgb", [e, e, e]), this }, clearer: function (t) { var e = this.values.alpha; return this.setValues("alpha", e - e * t), this }, opaquer: function (t) { var e = this.values.alpha; return this.setValues("alpha", e + e * t), this }, rotate: function (t) { var e = this.values.hsl, n = (e[0] + t) % 360; return e[0] = n < 0 ? 360 + n : n, this.setValues("hsl", e), this }, mix: function (t, e) { var n = this, i = t, a = void 0 === e ? .5 : e, r = 2 * a - 1, o = n.alpha() - i.alpha(), s = ((r * o == -1 ? r : (r + o) / (1 + r * o)) + 1) / 2, l = 1 - s; return this.rgb(s * n.red() + l * i.red(), s * n.green() + l * i.green(), s * n.blue() + l * i.blue()).alpha(n.alpha() * a + i.alpha() * (1 - a)) }, toJSON: function () { return this.rgb() }, clone: function () { var t, e, n = new r, i = this.values, a = n.values; for (var o in i) i.hasOwnProperty(o) && (t = i[o], "[object Array]" === (e = {}.toString.call(t)) ? a[o] = t.slice(0) : "[object Number]" === e ? a[o] = t : console.error("unexpected color value:", t)); return n } }, r.prototype.spaces = { rgb: ["red", "green", "blue"], hsl: ["hue", "saturation", "lightness"], hsv: ["hue", "saturation", "value"], hwb: ["hue", "whiteness", "blackness"], cmyk: ["cyan", "magenta", "yellow", "black"] }, r.prototype.maxes = { rgb: [255, 255, 255], hsl: [360, 100, 100], hsv: [360, 100, 100], hwb: [360, 100, 100], cmyk: [100, 100, 100, 100] }, r.prototype.getValues = function (t) { for (var e = this.values, n = {}, i = 0; i < t.length; i++)n[t.charAt(i)] = e[t][i]; return 1 !== e.alpha && (n.a = e.alpha), n }, r.prototype.setValues = function (t, e) { var n, a = this.values, r = this.spaces, o = this.maxes, s = 1; if (this.valid = !0, "alpha" === t) s = e; else if (e.length) a[t] = e.slice(0, t.length), s = e[t.length]; else if (void 0 !== e[t.charAt(0)]) { for (n = 0; n < t.length; n++)a[t][n] = e[t.charAt(n)]; s = e.a } else if (void 0 !== e[r[t][0]]) { var l = r[t]; for (n = 0; n < t.length; n++)a[t][n] = e[l[n]]; s = e.alpha } if (a.alpha = Math.max(0, Math.min(1, void 0 === s ? a.alpha : s)), "alpha" === t) return !1; var u; for (n = 0; n < t.length; n++)u = Math.max(0, Math.min(o[t][n], a[t][n])), a[t][n] = Math.round(u); for (var d in r) d !== t && (a[d] = i[t][d](a[t])); return !0 }, r.prototype.setSpace = function (t, e) { var n = e[0]; return void 0 === n ? this.getValues(t) : ("number" == typeof n && (n = Array.prototype.slice.call(e)), this.setValues(t, n), this) }, r.prototype.setChannel = function (t, e, n) { var i = this.values[t]; return void 0 === n ? i[e] : n === i[e] ? this : (i[e] = n, this.setValues(t, i), this) }, "undefined" != typeof window && (window.Color = r), e.exports = r }, { 1: 1, 4: 4 }], 3: [function (t, e, n) { function i(t) { var e, n, i, a = t[0] / 255, r = t[1] / 255, o = t[2] / 255, s = Math.min(a, r, o), l = Math.max(a, r, o), u = l - s; return l == s ? e = 0 : a == l ? e = (r - o) / u : r == l ? e = 2 + (o - a) / u : o == l && (e = 4 + (a - r) / u), (e = Math.min(60 * e, 360)) < 0 && (e += 360), i = (s + l) / 2, n = l == s ? 0 : i <= .5 ? u / (l + s) : u / (2 - l - s), [e, 100 * n, 100 * i] } function a(t) { var e, n, i, a = t[0], r = t[1], o = t[2], s = Math.min(a, r, o), l = Math.max(a, r, o), u = l - s; return n = 0 == l ? 0 : u / l * 1e3 / 10, l == s ? e = 0 : a == l ? e = (r - o) / u : r == l ? e = 2 + (o - a) / u : o == l && (e = 4 + (a - r) / u), (e = Math.min(60 * e, 360)) < 0 && (e += 360), i = l / 255 * 1e3 / 10, [e, n, i] } function o(t) { var e = t[0], n = t[1], a = t[2]; return [i(t)[0], 100 * (1 / 255 * Math.min(e, Math.min(n, a))), 100 * (a = 1 - 1 / 255 * Math.max(e, Math.max(n, a)))] } function s(t) { var e, n, i, a, r = t[0] / 255, o = t[1] / 255, s = t[2] / 255; return a = Math.min(1 - r, 1 - o, 1 - s), e = (1 - r - a) / (1 - a) || 0, n = (1 - o - a) / (1 - a) || 0, i = (1 - s - a) / (1 - a) || 0, [100 * e, 100 * n, 100 * i, 100 * a] } function l(t) { return S[JSON.stringify(t)] } function u(t) { var e = t[0] / 255, n = t[1] / 255, i = t[2] / 255; return [100 * (.4124 * (e = e > .04045 ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92) + .3576 * (n = n > .04045 ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92) + .1805 * (i = i > .04045 ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92)), 100 * (.2126 * e + .7152 * n + .0722 * i), 100 * (.0193 * e + .1192 * n + .9505 * i)] } function d(t) { var e, n, i, a = u(t), r = a[0], o = a[1], s = a[2]; return r /= 95.047, o /= 100, s /= 108.883, r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116, o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, s = s > .008856 ? Math.pow(s, 1 / 3) : 7.787 * s + 16 / 116, e = 116 * o - 16, n = 500 * (r - o), i = 200 * (o - s), [e, n, i] } function c(t) { var e, n, i, a, r, o = t[0] / 360, s = t[1] / 100, l = t[2] / 100; if (0 == s) return r = 255 * l, [r, r, r]; e = 2 * l - (n = l < .5 ? l * (1 + s) : l + s - l * s), a = [0, 0, 0]; for (var u = 0; u < 3; u++)(i = o + 1 / 3 * -(u - 1)) < 0 && i++ , i > 1 && i-- , r = 6 * i < 1 ? e + 6 * (n - e) * i : 2 * i < 1 ? n : 3 * i < 2 ? e + (n - e) * (2 / 3 - i) * 6 : e, a[u] = 255 * r; return a } function h(t) { var e = t[0] / 60, n = t[1] / 100, i = t[2] / 100, a = Math.floor(e) % 6, r = e - Math.floor(e), o = 255 * i * (1 - n), s = 255 * i * (1 - n * r), l = 255 * i * (1 - n * (1 - r)), i = 255 * i; switch (a) { case 0: return [i, l, o]; case 1: return [s, i, o]; case 2: return [o, i, l]; case 3: return [o, s, i]; case 4: return [l, o, i]; case 5: return [i, o, s] } } function f(t) { var e, n, i, a, o = t[0] / 360, s = t[1] / 100, l = t[2] / 100, u = s + l; switch (u > 1 && (s /= u, l /= u), e = Math.floor(6 * o), n = 1 - l, i = 6 * o - e, 0 != (1 & e) && (i = 1 - i), a = s + i * (n - s), e) { default: case 6: case 0: r = n, g = a, b = s; break; case 1: r = a, g = n, b = s; break; case 2: r = s, g = n, b = a; break; case 3: r = s, g = a, b = n; break; case 4: r = a, g = s, b = n; break; case 5: r = n, g = s, b = a }return [255 * r, 255 * g, 255 * b] } function m(t) { var e, n, i, a = t[0] / 100, r = t[1] / 100, o = t[2] / 100, s = t[3] / 100; return e = 1 - Math.min(1, a * (1 - s) + s), n = 1 - Math.min(1, r * (1 - s) + s), i = 1 - Math.min(1, o * (1 - s) + s), [255 * e, 255 * n, 255 * i] } function p(t) { var e, n, i, a = t[0] / 100, r = t[1] / 100, o = t[2] / 100; return e = 3.2406 * a + -1.5372 * r + -.4986 * o, n = -.9689 * a + 1.8758 * r + .0415 * o, i = .0557 * a + -.204 * r + 1.057 * o, e = e > .0031308 ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : e *= 12.92, n = n > .0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - .055 : n *= 12.92, i = i > .0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - .055 : i *= 12.92, e = Math.min(Math.max(0, e), 1), n = Math.min(Math.max(0, n), 1), i = Math.min(Math.max(0, i), 1), [255 * e, 255 * n, 255 * i] } function v(t) { var e, n, i, a = t[0], r = t[1], o = t[2]; return a /= 95.047, r /= 100, o /= 108.883, a = a > .008856 ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116, r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116, o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, e = 116 * r - 16, n = 500 * (a - r), i = 200 * (r - o), [e, n, i] } function y(t) { var e, n, i, a, r = t[0], o = t[1], s = t[2]; return r <= 8 ? a = (n = 100 * r / 903.3) / 100 * 7.787 + 16 / 116 : (n = 100 * Math.pow((r + 16) / 116, 3), a = Math.pow(n / 100, 1 / 3)), e = e / 95.047 <= .008856 ? e = 95.047 * (o / 500 + a - 16 / 116) / 7.787 : 95.047 * Math.pow(o / 500 + a, 3), i = i / 108.883 <= .008859 ? i = 108.883 * (a - s / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(a - s / 200, 3), [e, n, i] } function x(t) { var e, n, i, a = t[0], r = t[1], o = t[2]; return e = Math.atan2(o, r), (n = 360 * e / 2 / Math.PI) < 0 && (n += 360), i = Math.sqrt(r * r + o * o), [a, i, n] } function _(t) { return p(y(t)) } function k(t) { var e, n, i, a = t[0], r = t[1]; return i = t[2] / 360 * 2 * Math.PI, e = r * Math.cos(i), n = r * Math.sin(i), [a, e, n] } function w(t) { return M[t] } e.exports = { rgb2hsl: i, rgb2hsv: a, rgb2hwb: o, rgb2cmyk: s, rgb2keyword: l, rgb2xyz: u, rgb2lab: d, rgb2lch: function (t) { return x(d(t)) }, hsl2rgb: c, hsl2hsv: function (t) { var e, n, i = t[0], a = t[1] / 100, r = t[2] / 100; return 0 === r ? [0, 0, 0] : (r *= 2, a *= r <= 1 ? r : 2 - r, n = (r + a) / 2, e = 2 * a / (r + a), [i, 100 * e, 100 * n]) }, hsl2hwb: function (t) { return o(c(t)) }, hsl2cmyk: function (t) { return s(c(t)) }, hsl2keyword: function (t) { return l(c(t)) }, hsv2rgb: h, hsv2hsl: function (t) { var e, n, i = t[0], a = t[1] / 100, r = t[2] / 100; return n = (2 - a) * r, e = a * r, e /= n <= 1 ? n : 2 - n, e = e || 0, n /= 2, [i, 100 * e, 100 * n] }, hsv2hwb: function (t) { return o(h(t)) }, hsv2cmyk: function (t) { return s(h(t)) }, hsv2keyword: function (t) { return l(h(t)) }, hwb2rgb: f, hwb2hsl: function (t) { return i(f(t)) }, hwb2hsv: function (t) { return a(f(t)) }, hwb2cmyk: function (t) { return s(f(t)) }, hwb2keyword: function (t) { return l(f(t)) }, cmyk2rgb: m, cmyk2hsl: function (t) { return i(m(t)) }, cmyk2hsv: function (t) { return a(m(t)) }, cmyk2hwb: function (t) { return o(m(t)) }, cmyk2keyword: function (t) { return l(m(t)) }, keyword2rgb: w, keyword2hsl: function (t) { return i(w(t)) }, keyword2hsv: function (t) { return a(w(t)) }, keyword2hwb: function (t) { return o(w(t)) }, keyword2cmyk: function (t) { return s(w(t)) }, keyword2lab: function (t) { return d(w(t)) }, keyword2xyz: function (t) { return u(w(t)) }, xyz2rgb: p, xyz2lab: v, xyz2lch: function (t) { return x(v(t)) }, lab2xyz: y, lab2rgb: _, lab2lch: x, lch2lab: k, lch2xyz: function (t) { return y(k(t)) }, lch2rgb: function (t) { return _(k(t)) } }; var M = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] }, S = {}; for (var D in M) S[JSON.stringify(M[D])] = D }, {}], 4: [function (t, e, n) { var i = t(3), a = function () { return new u }; for (var r in i) { a[r + "Raw"] = function (t) { return function (e) { return "number" == typeof e && (e = Array.prototype.slice.call(arguments)), i[t](e) } }(r); var o = /(\w+)2(\w+)/.exec(r), s = o[1], l = o[2]; (a[s] = a[s] || {})[l] = a[r] = function (t) { return function (e) { "number" == typeof e && (e = Array.prototype.slice.call(arguments)); var n = i[t](e); if ("string" == typeof n || void 0 === n) return n; for (var a = 0; a < n.length; a++)n[a] = Math.round(n[a]); return n } }(r) } var u = function () { this.convs = {} }; u.prototype.routeSpace = function (t, e) { var n = e[0]; return void 0 === n ? this.getValues(t) : ("number" == typeof n && (n = Array.prototype.slice.call(e)), this.setValues(t, n)) }, u.prototype.setValues = function (t, e) { return this.space = t, this.convs = {}, this.convs[t] = e, this }, u.prototype.getValues = function (t) { var e = this.convs[t]; if (!e) { var n = this.space, i = this.convs[n]; e = a[n][t](i), this.convs[t] = e } return e }, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function (t) { u.prototype[t] = function (e) { return this.routeSpace(t, arguments) } }), e.exports = a }, { 3: 3 }], 5: [function (t, e, n) { "use strict"; e.exports = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] } }, {}], 6: [function (t, e, n) { !function (t, i) { "object" == typeof n && void 0 !== e ? e.exports = i() : t.moment = i() }(this, function () { "use strict"; function n() { return xe.apply(null, arguments) } function i(t) { return t instanceof Array || "[object Array]" === Object.prototype.toString.call(t) } function a(t) { return null != t && "[object Object]" === Object.prototype.toString.call(t) } function r(t) { var e; for (e in t) return !1; return !0 } function o(t) { return void 0 === t } function s(t) { return "number" == typeof t || "[object Number]" === Object.prototype.toString.call(t) } function l(t) { return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t) } function u(t, e) { var n, i = []; for (n = 0; n < t.length; ++n)i.push(e(t[n], n)); return i } function d(t, e) { return Object.prototype.hasOwnProperty.call(t, e) } function c(t, e) { for (var n in e) d(e, n) && (t[n] = e[n]); return d(e, "toString") && (t.toString = e.toString), d(e, "valueOf") && (t.valueOf = e.valueOf), t } function h(t, e, n, i) { return Yt(t, e, n, i, !0).utc() } function f() { return { empty: !1, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: !1, invalidMonth: null, invalidFormat: !1, userInvalidated: !1, iso: !1, parsedDateParts: [], meridiem: null, rfc2822: !1, weekdayMismatch: !1 } } function g(t) { return null == t._pf && (t._pf = f()), t._pf } function m(t) { if (null == t._isValid) { var e = g(t), n = ke.call(e.parsedDateParts, function (t) { return null != t }), i = !isNaN(t._d.getTime()) && e.overflow < 0 && !e.empty && !e.invalidMonth && !e.invalidWeekday && !e.nullInput && !e.invalidFormat && !e.userInvalidated && (!e.meridiem || e.meridiem && n); if (t._strict && (i = i && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour), null != Object.isFrozen && Object.isFrozen(t)) return i; t._isValid = i } return t._isValid } function p(t) { var e = h(NaN); return null != t ? c(g(e), t) : g(e).userInvalidated = !0, e } function v(t, e) { var n, i, a; if (o(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), o(e._i) || (t._i = e._i), o(e._f) || (t._f = e._f), o(e._l) || (t._l = e._l), o(e._strict) || (t._strict = e._strict), o(e._tzm) || (t._tzm = e._tzm), o(e._isUTC) || (t._isUTC = e._isUTC), o(e._offset) || (t._offset = e._offset), o(e._pf) || (t._pf = g(e)), o(e._locale) || (t._locale = e._locale), we.length > 0) for (n = 0; n < we.length; n++)o(a = e[i = we[n]]) || (t[i] = a); return t } function y(t) { v(this, t), this._d = new Date(null != t._d ? t._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === Me && (Me = !0, n.updateOffset(this), Me = !1) } function b(t) { return t instanceof y || null != t && null != t._isAMomentObject } function x(t) { return t < 0 ? Math.ceil(t) || 0 : Math.floor(t) } function _(t) { var e = +t, n = 0; return 0 !== e && isFinite(e) && (n = x(e)), n } function k(t, e, n) { var i, a = Math.min(t.length, e.length), r = Math.abs(t.length - e.length), o = 0; for (i = 0; i < a; i++)(n && t[i] !== e[i] || !n && _(t[i]) !== _(e[i])) && o++; return o + r } function w(t) { !1 === n.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t) } function M(t, e) { var i = !0; return c(function () { if (null != n.deprecationHandler && n.deprecationHandler(null, t), i) { for (var a, r = [], o = 0; o < arguments.length; o++) { if (a = "", "object" == typeof arguments[o]) { a += "\n[" + o + "] "; for (var s in arguments[0]) a += s + ": " + arguments[0][s] + ", "; a = a.slice(0, -2) } else a = arguments[o]; r.push(a) } w(t + "\nArguments: " + Array.prototype.slice.call(r).join("") + "\n" + (new Error).stack), i = !1 } return e.apply(this, arguments) }, e) } function S(t, e) { null != n.deprecationHandler && n.deprecationHandler(t, e), Se[t] || (w(e), Se[t] = !0) } function D(t) { return t instanceof Function || "[object Function]" === Object.prototype.toString.call(t) } function C(t, e) { var n, i = c({}, t); for (n in e) d(e, n) && (a(t[n]) && a(e[n]) ? (i[n] = {}, c(i[n], t[n]), c(i[n], e[n])) : null != e[n] ? i[n] = e[n] : delete i[n]); for (n in t) d(t, n) && !d(e, n) && a(t[n]) && (i[n] = c({}, i[n])); return i } function P(t) { null != t && this.set(t) } function T(t, e) { var n = t.toLowerCase(); Te[n] = Te[n + "s"] = Te[e] = t } function A(t) { return "string" == typeof t ? Te[t] || Te[t.toLowerCase()] : void 0 } function I(t) { var e, n, i = {}; for (n in t) d(t, n) && (e = A(n)) && (i[e] = t[n]); return i } function O(t, e) { Ae[t] = e } function F(t) { var e = []; for (var n in t) e.push({ unit: n, priority: Ae[n] }); return e.sort(function (t, e) { return t.priority - e.priority }), e } function R(t, e) { return function (i) { return null != i ? (W(this, t, i), n.updateOffset(this, e), this) : L(this, t) } } function L(t, e) { return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN } function W(t, e, n) { t.isValid() && t._d["set" + (t._isUTC ? "UTC" : "") + e](n) } function Y(t, e, n) { var i = "" + Math.abs(t), a = e - i.length; return (t >= 0 ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, a)).toString().substr(1) + i } function N(t, e, n, i) { var a = i; "string" == typeof i && (a = function () { return this[i]() }), t && (Re[t] = a), e && (Re[e[0]] = function () { return Y(a.apply(this, arguments), e[1], e[2]) }), n && (Re[n] = function () { return this.localeData().ordinal(a.apply(this, arguments), t) }) } function z(t) { return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "") } function B(t) { var e, n, i = t.match(Ie); for (e = 0, n = i.length; e < n; e++)Re[i[e]] ? i[e] = Re[i[e]] : i[e] = z(i[e]); return function (e) { var a, r = ""; for (a = 0; a < n; a++)r += D(i[a]) ? i[a].call(e, t) : i[a]; return r } } function V(t, e) { return t.isValid() ? (e = H(e, t.localeData()), Fe[e] = Fe[e] || B(e), Fe[e](t)) : t.localeData().invalidDate() } function H(t, e) { var n = 5; for (Oe.lastIndex = 0; n >= 0 && Oe.test(t);)t = t.replace(Oe, function (t) { return e.longDateFormat(t) || t }), Oe.lastIndex = 0, n -= 1; return t } function E(t, e, n) { Ke[t] = D(e) ? e : function (t, i) { return t && n ? n : e } } function j(t, e) { return d(Ke, t) ? Ke[t](e._strict, e._locale) : new RegExp(U(t)) } function U(t) { return q(t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, e, n, i, a) { return e || n || i || a })) } function q(t) { return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") } function G(t, e) { var n, i = e; for ("string" == typeof t && (t = [t]), s(e) && (i = function (t, n) { n[e] = _(t) }), n = 0; n < t.length; n++)Qe[t[n]] = i } function Z(t, e) { G(t, function (t, n, i, a) { i._w = i._w || {}, e(t, i._w, i, a) }) } function X(t, e, n) { null != e && d(Qe, t) && Qe[t](e, n._a, n, t) } function J(t, e) { return new Date(Date.UTC(t, e + 1, 0)).getUTCDate() } function K(t, e, n) { var i, a, r, o = t.toLocaleLowerCase(); if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], i = 0; i < 12; ++i)r = h([2e3, i]), this._shortMonthsParse[i] = this.monthsShort(r, "").toLocaleLowerCase(), this._longMonthsParse[i] = this.months(r, "").toLocaleLowerCase(); return n ? "MMM" === e ? -1 !== (a = un.call(this._shortMonthsParse, o)) ? a : null : -1 !== (a = un.call(this._longMonthsParse, o)) ? a : null : "MMM" === e ? -1 !== (a = un.call(this._shortMonthsParse, o)) ? a : -1 !== (a = un.call(this._longMonthsParse, o)) ? a : null : -1 !== (a = un.call(this._longMonthsParse, o)) ? a : -1 !== (a = un.call(this._shortMonthsParse, o)) ? a : null } function Q(t, e) { var n; if (!t.isValid()) return t; if ("string" == typeof e) if (/^\d+$/.test(e)) e = _(e); else if (e = t.localeData().monthsParse(e), !s(e)) return t; return n = Math.min(t.date(), J(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, n), t } function $(t) { return null != t ? (Q(this, t), n.updateOffset(this, !0), this) : L(this, "Month") } function tt() { function t(t, e) { return e.length - t.length } var e, n, i = [], a = [], r = []; for (e = 0; e < 12; e++)n = h([2e3, e]), i.push(this.monthsShort(n, "")), a.push(this.months(n, "")), r.push(this.months(n, "")), r.push(this.monthsShort(n, "")); for (i.sort(t), a.sort(t), r.sort(t), e = 0; e < 12; e++)i[e] = q(i[e]), a[e] = q(a[e]); for (e = 0; e < 24; e++)r[e] = q(r[e]); this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i") } function et(t) { return nt(t) ? 366 : 365 } function nt(t) { return t % 4 == 0 && t % 100 != 0 || t % 400 == 0 } function it(t, e, n, i, a, r, o) { var s = new Date(t, e, n, i, a, r, o); return t < 100 && t >= 0 && isFinite(s.getFullYear()) && s.setFullYear(t), s } function at(t) { var e = new Date(Date.UTC.apply(null, arguments)); return t < 100 && t >= 0 && isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t), e } function rt(t, e, n) { var i = 7 + e - n; return -((7 + at(t, 0, i).getUTCDay() - e) % 7) + i - 1 } function ot(t, e, n, i, a) { var r, o, s = 1 + 7 * (e - 1) + (7 + n - i) % 7 + rt(t, i, a); return s <= 0 ? o = et(r = t - 1) + s : s > et(t) ? (r = t + 1, o = s - et(t)) : (r = t, o = s), { year: r, dayOfYear: o } } function st(t, e, n) { var i, a, r = rt(t.year(), e, n), o = Math.floor((t.dayOfYear() - r - 1) / 7) + 1; return o < 1 ? i = o + lt(a = t.year() - 1, e, n) : o > lt(t.year(), e, n) ? (i = o - lt(t.year(), e, n), a = t.year() + 1) : (a = t.year(), i = o), { week: i, year: a } } function lt(t, e, n) { var i = rt(t, e, n), a = rt(t + 1, e, n); return (et(t) - i + a) / 7 } function ut(t, e) { return "string" != typeof t ? t : isNaN(t) ? "number" == typeof (t = e.weekdaysParse(t)) ? t : null : parseInt(t, 10) } function dt(t, e) { return "string" == typeof t ? e.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t } function ct(t, e, n) { var i, a, r, o = t.toLocaleLowerCase(); if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], i = 0; i < 7; ++i)r = h([2e3, 1]).day(i), this._minWeekdaysParse[i] = this.weekdaysMin(r, "").toLocaleLowerCase(), this._shortWeekdaysParse[i] = this.weekdaysShort(r, "").toLocaleLowerCase(), this._weekdaysParse[i] = this.weekdays(r, "").toLocaleLowerCase(); return n ? "dddd" === e ? -1 !== (a = un.call(this._weekdaysParse, o)) ? a : null : "ddd" === e ? -1 !== (a = un.call(this._shortWeekdaysParse, o)) ? a : null : -1 !== (a = un.call(this._minWeekdaysParse, o)) ? a : null : "dddd" === e ? -1 !== (a = un.call(this._weekdaysParse, o)) ? a : -1 !== (a = un.call(this._shortWeekdaysParse, o)) ? a : -1 !== (a = un.call(this._minWeekdaysParse, o)) ? a : null : "ddd" === e ? -1 !== (a = un.call(this._shortWeekdaysParse, o)) ? a : -1 !== (a = un.call(this._weekdaysParse, o)) ? a : -1 !== (a = un.call(this._minWeekdaysParse, o)) ? a : null : -1 !== (a = un.call(this._minWeekdaysParse, o)) ? a : -1 !== (a = un.call(this._weekdaysParse, o)) ? a : -1 !== (a = un.call(this._shortWeekdaysParse, o)) ? a : null } function ht() { function t(t, e) { return e.length - t.length } var e, n, i, a, r, o = [], s = [], l = [], u = []; for (e = 0; e < 7; e++)n = h([2e3, 1]).day(e), i = this.weekdaysMin(n, ""), a = this.weekdaysShort(n, ""), r = this.weekdays(n, ""), o.push(i), s.push(a), l.push(r), u.push(i), u.push(a), u.push(r); for (o.sort(t), s.sort(t), l.sort(t), u.sort(t), e = 0; e < 7; e++)s[e] = q(s[e]), l[e] = q(l[e]), u[e] = q(u[e]); this._weekdaysRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + o.join("|") + ")", "i") } function ft() { return this.hours() % 12 || 12 } function gt(t, e) { N(t, 0, 0, function () { return this.localeData().meridiem(this.hours(), this.minutes(), e) }) } function mt(t, e) { return e._meridiemParse } function pt(t) { return t ? t.toLowerCase().replace("_", "-") : t } function vt(t) { for (var e, n, i, a, r = 0; r < t.length;) { for (e = (a = pt(t[r]).split("-")).length, n = (n = pt(t[r + 1])) ? n.split("-") : null; e > 0;) { if (i = yt(a.slice(0, e).join("-"))) return i; if (n && n.length >= e && k(a, n, !0) >= e - 1) break; e-- } r++ } return null } function yt(n) { var i = null; if (!Sn[n] && void 0 !== e && e && e.exports) try { i = kn._abbr, t("./locale/" + n), bt(i) } catch (t) { } return Sn[n] } function bt(t, e) { var n; return t && (n = o(e) ? _t(t) : xt(t, e)) && (kn = n), kn._abbr } function xt(t, e) { if (null !== e) { var n = Mn; if (e.abbr = t, null != Sn[t]) S("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), n = Sn[t]._config; else if (null != e.parentLocale) { if (null == Sn[e.parentLocale]) return Dn[e.parentLocale] || (Dn[e.parentLocale] = []), Dn[e.parentLocale].push({ name: t, config: e }), null; n = Sn[e.parentLocale]._config } return Sn[t] = new P(C(n, e)), Dn[t] && Dn[t].forEach(function (t) { xt(t.name, t.config) }), bt(t), Sn[t] } return delete Sn[t], null } function _t(t) { var e; if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return kn; if (!i(t)) { if (e = yt(t)) return e; t = [t] } return vt(t) } function kt(t) { var e, n = t._a; return n && -2 === g(t).overflow && (e = n[tn] < 0 || n[tn] > 11 ? tn : n[en] < 1 || n[en] > J(n[$e], n[tn]) ? en : n[nn] < 0 || n[nn] > 24 || 24 === n[nn] && (0 !== n[an] || 0 !== n[rn] || 0 !== n[on]) ? nn : n[an] < 0 || n[an] > 59 ? an : n[rn] < 0 || n[rn] > 59 ? rn : n[on] < 0 || n[on] > 999 ? on : -1, g(t)._overflowDayOfYear && (e < $e || e > en) && (e = en), g(t)._overflowWeeks && -1 === e && (e = sn), g(t)._overflowWeekday && -1 === e && (e = ln), g(t).overflow = e), t } function wt(t) { var e, n, i, a, r, o, s = t._i, l = Cn.exec(s) || Pn.exec(s); if (l) { for (g(t).iso = !0, e = 0, n = An.length; e < n; e++)if (An[e][1].exec(l[1])) { a = An[e][0], i = !1 !== An[e][2]; break } if (null == a) return void (t._isValid = !1); if (l[3]) { for (e = 0, n = In.length; e < n; e++)if (In[e][1].exec(l[3])) { r = (l[2] || " ") + In[e][0]; break } if (null == r) return void (t._isValid = !1) } if (!i && null != r) return void (t._isValid = !1); if (l[4]) { if (!Tn.exec(l[4])) return void (t._isValid = !1); o = "Z" } t._f = a + (r || "") + (o || ""), At(t) } else t._isValid = !1 } function Mt(t) { var e, n, i, a, r, o, s, l, u = { " GMT": " +0000", " EDT": " -0400", " EST": " -0500", " CDT": " -0500", " CST": " -0600", " MDT": " -0600", " MST": " -0700", " PDT": " -0700", " PST": " -0800" }; if (e = t._i.replace(/\([^\)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s|\s$/g, ""), n = Fn.exec(e)) { if (i = n[1] ? "ddd" + (5 === n[1].length ? ", " : " ") : "", a = "D MMM " + (n[2].length > 10 ? "YYYY " : "YY "), r = "HH:mm" + (n[4] ? ":ss" : ""), n[1]) { var d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(n[2]).getDay()]; if (n[1].substr(0, 3) !== d) return g(t).weekdayMismatch = !0, void (t._isValid = !1) } switch (n[5].length) { case 2: s = 0 === l ? " +0000" : ((l = "YXWVUTSRQPONZABCDEFGHIKLM".indexOf(n[5][1].toUpperCase()) - 12) < 0 ? " -" : " +") + ("" + l).replace(/^-?/, "0").match(/..$/)[0] + "00"; break; case 4: s = u[n[5]]; break; default: s = u[" GMT"] }n[5] = s, t._i = n.splice(1).join(""), o = " ZZ", t._f = i + a + r + o, At(t), g(t).rfc2822 = !0 } else t._isValid = !1 } function St(t) { var e = On.exec(t._i); null === e ? (wt(t), !1 === t._isValid && (delete t._isValid, Mt(t), !1 === t._isValid && (delete t._isValid, n.createFromInputFallback(t)))) : t._d = new Date(+e[1]) } function Dt(t, e, n) { return null != t ? t : null != e ? e : n } function Ct(t) { var e = new Date(n.now()); return t._useUTC ? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()] : [e.getFullYear(), e.getMonth(), e.getDate()] } function Pt(t) { var e, n, i, a, r = []; if (!t._d) { for (i = Ct(t), t._w && null == t._a[en] && null == t._a[tn] && Tt(t), null != t._dayOfYear && (a = Dt(t._a[$e], i[$e]), (t._dayOfYear > et(a) || 0 === t._dayOfYear) && (g(t)._overflowDayOfYear = !0), n = at(a, 0, t._dayOfYear), t._a[tn] = n.getUTCMonth(), t._a[en] = n.getUTCDate()), e = 0; e < 3 && null == t._a[e]; ++e)t._a[e] = r[e] = i[e]; for (; e < 7; e++)t._a[e] = r[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e]; 24 === t._a[nn] && 0 === t._a[an] && 0 === t._a[rn] && 0 === t._a[on] && (t._nextDay = !0, t._a[nn] = 0), t._d = (t._useUTC ? at : it).apply(null, r), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[nn] = 24) } } function Tt(t) { var e, n, i, a, r, o, s, l; if (null != (e = t._w).GG || null != e.W || null != e.E) r = 1, o = 4, n = Dt(e.GG, t._a[$e], st(Nt(), 1, 4).year), i = Dt(e.W, 1), ((a = Dt(e.E, 1)) < 1 || a > 7) && (l = !0); else { r = t._locale._week.dow, o = t._locale._week.doy; var u = st(Nt(), r, o); n = Dt(e.gg, t._a[$e], u.year), i = Dt(e.w, u.week), null != e.d ? ((a = e.d) < 0 || a > 6) && (l = !0) : null != e.e ? (a = e.e + r, (e.e < 0 || e.e > 6) && (l = !0)) : a = r } i < 1 || i > lt(n, r, o) ? g(t)._overflowWeeks = !0 : null != l ? g(t)._overflowWeekday = !0 : (s = ot(n, i, a, r, o), t._a[$e] = s.year, t._dayOfYear = s.dayOfYear) } function At(t) { if (t._f !== n.ISO_8601) if (t._f !== n.RFC_2822) { t._a = [], g(t).empty = !0; var e, i, a, r, o, s = "" + t._i, l = s.length, u = 0; for (a = H(t._f, t._locale).match(Ie) || [], e = 0; e < a.length; e++)r = a[e], (i = (s.match(j(r, t)) || [])[0]) && ((o = s.substr(0, s.indexOf(i))).length > 0 && g(t).unusedInput.push(o), s = s.slice(s.indexOf(i) + i.length), u += i.length), Re[r] ? (i ? g(t).empty = !1 : g(t).unusedTokens.push(r), X(r, i, t)) : t._strict && !i && g(t).unusedTokens.push(r); g(t).charsLeftOver = l - u, s.length > 0 && g(t).unusedInput.push(s), t._a[nn] <= 12 && !0 === g(t).bigHour && t._a[nn] > 0 && (g(t).bigHour = void 0), g(t).parsedDateParts = t._a.slice(0), g(t).meridiem = t._meridiem, t._a[nn] = It(t._locale, t._a[nn], t._meridiem), Pt(t), kt(t) } else Mt(t); else wt(t) } function It(t, e, n) { var i; return null == n ? e : null != t.meridiemHour ? t.meridiemHour(e, n) : null != t.isPM ? ((i = t.isPM(n)) && e < 12 && (e += 12), i || 12 !== e || (e = 0), e) : e } function Ot(t) { var e, n, i, a, r; if (0 === t._f.length) return g(t).invalidFormat = !0, void (t._d = new Date(NaN)); for (a = 0; a < t._f.length; a++)r = 0, e = v({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[a], At(e), m(e) && (r += g(e).charsLeftOver, r += 10 * g(e).unusedTokens.length, g(e).score = r, (null == i || r < i) && (i = r, n = e)); c(t, n || e) } function Ft(t) { if (!t._d) { var e = I(t._i); t._a = u([e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], function (t) { return t && parseInt(t, 10) }), Pt(t) } } function Rt(t) { var e = new y(kt(Lt(t))); return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e } function Lt(t) { var e = t._i, n = t._f; return t._locale = t._locale || _t(t._l), null === e || void 0 === n && "" === e ? p({ nullInput: !0 }) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)), b(e) ? new y(kt(e)) : (l(e) ? t._d = e : i(n) ? Ot(t) : n ? At(t) : Wt(t), m(t) || (t._d = null), t)) } function Wt(t) { var e = t._i; o(e) ? t._d = new Date(n.now()) : l(e) ? t._d = new Date(e.valueOf()) : "string" == typeof e ? St(t) : i(e) ? (t._a = u(e.slice(0), function (t) { return parseInt(t, 10) }), Pt(t)) : a(e) ? Ft(t) : s(e) ? t._d = new Date(e) : n.createFromInputFallback(t) } function Yt(t, e, n, o, s) { var l = {}; return !0 !== n && !1 !== n || (o = n, n = void 0), (a(t) && r(t) || i(t) && 0 === t.length) && (t = void 0), l._isAMomentObject = !0, l._useUTC = l._isUTC = s, l._l = n, l._i = t, l._f = e, l._strict = o, Rt(l) } function Nt(t, e, n, i) { return Yt(t, e, n, i, !1) } function zt(t, e) { var n, a; if (1 === e.length && i(e[0]) && (e = e[0]), !e.length) return Nt(); for (n = e[0], a = 1; a < e.length; ++a)e[a].isValid() && !e[a][t](n) || (n = e[a]); return n } function Bt(t) { for (var e in t) if (-1 === Wn.indexOf(e) || null != t[e] && isNaN(t[e])) return !1; for (var n = !1, i = 0; i < Wn.length; ++i)if (t[Wn[i]]) { if (n) return !1; parseFloat(t[Wn[i]]) !== _(t[Wn[i]]) && (n = !0) } return !0 } function Vt(t) { var e = I(t), n = e.year || 0, i = e.quarter || 0, a = e.month || 0, r = e.week || 0, o = e.day || 0, s = e.hour || 0, l = e.minute || 0, u = e.second || 0, d = e.millisecond || 0; this._isValid = Bt(e), this._milliseconds = +d + 1e3 * u + 6e4 * l + 1e3 * s * 60 * 60, this._days = +o + 7 * r, this._months = +a + 3 * i + 12 * n, this._data = {}, this._locale = _t(), this._bubble() } function Ht(t) { return t instanceof Vt } function Et(t) { return t < 0 ? -1 * Math.round(-1 * t) : Math.round(t) } function jt(t, e) { N(t, 0, 0, function () { var t = this.utcOffset(), n = "+"; return t < 0 && (t = -t, n = "-"), n + Y(~~(t / 60), 2) + e + Y(~~t % 60, 2) }) } function Ut(t, e) { var n = (e || "").match(t); if (null === n) return null; var i = ((n[n.length - 1] || []) + "").match(Yn) || ["-", 0, 0], a = 60 * i[1] + _(i[2]); return 0 === a ? 0 : "+" === i[0] ? a : -a } function qt(t, e) { var i, a; return e._isUTC ? (i = e.clone(), a = (b(t) || l(t) ? t.valueOf() : Nt(t).valueOf()) - i.valueOf(), i._d.setTime(i._d.valueOf() + a), n.updateOffset(i, !1), i) : Nt(t).local() } function Gt(t) { return 15 * -Math.round(t._d.getTimezoneOffset() / 15) } function Zt() { return !!this.isValid() && (this._isUTC && 0 === this._offset) } function Xt(t, e) { var n, i, a, r = t, o = null; return Ht(t) ? r = { ms: t._milliseconds, d: t._days, M: t._months } : s(t) ? (r = {}, e ? r[e] = t : r.milliseconds = t) : (o = Nn.exec(t)) ? (n = "-" === o[1] ? -1 : 1, r = { y: 0, d: _(o[en]) * n, h: _(o[nn]) * n, m: _(o[an]) * n, s: _(o[rn]) * n, ms: _(Et(1e3 * o[on])) * n }) : (o = zn.exec(t)) ? (n = "-" === o[1] ? -1 : 1, r = { y: Jt(o[2], n), M: Jt(o[3], n), w: Jt(o[4], n), d: Jt(o[5], n), h: Jt(o[6], n), m: Jt(o[7], n), s: Jt(o[8], n) }) : null == r ? r = {} : "object" == typeof r && ("from" in r || "to" in r) && (a = Qt(Nt(r.from), Nt(r.to)), (r = {}).ms = a.milliseconds, r.M = a.months), i = new Vt(r), Ht(t) && d(t, "_locale") && (i._locale = t._locale), i } function Jt(t, e) { var n = t && parseFloat(t.replace(",", ".")); return (isNaN(n) ? 0 : n) * e } function Kt(t, e) { var n = { milliseconds: 0, months: 0 }; return n.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(n.months, "M").isAfter(e) && --n.months, n.milliseconds = +e - +t.clone().add(n.months, "M"), n } function Qt(t, e) { var n; return t.isValid() && e.isValid() ? (e = qt(e, t), t.isBefore(e) ? n = Kt(t, e) : ((n = Kt(e, t)).milliseconds = -n.milliseconds, n.months = -n.months), n) : { milliseconds: 0, months: 0 } } function $t(t, e) { return function (n, i) { var a, r; return null === i || isNaN(+i) || (S(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), r = n, n = i, i = r), n = "string" == typeof n ? +n : n, a = Xt(n, i), te(this, a, t), this } } function te(t, e, i, a) { var r = e._milliseconds, o = Et(e._days), s = Et(e._months); t.isValid() && (a = null == a || a, r && t._d.setTime(t._d.valueOf() + r * i), o && W(t, "Date", L(t, "Date") + o * i), s && Q(t, L(t, "Month") + s * i), a && n.updateOffset(t, o || s)) } function ee(t, e) { var n, i = 12 * (e.year() - t.year()) + (e.month() - t.month()), a = t.clone().add(i, "months"); return n = e - a < 0 ? (e - a) / (a - t.clone().add(i - 1, "months")) : (e - a) / (t.clone().add(i + 1, "months") - a), -(i + n) || 0 } function ne(t) { var e; return void 0 === t ? this._locale._abbr : (null != (e = _t(t)) && (this._locale = e), this) } function ie() { return this._locale } function ae(t, e) { N(0, [t, t.length], 0, e) } function re(t, e, n, i, a) { var r; return null == t ? st(this, i, a).year : (r = lt(t, i, a), e > r && (e = r), oe.call(this, t, e, n, i, a)) } function oe(t, e, n, i, a) { var r = ot(t, e, n, i, a), o = at(r.year, 0, r.dayOfYear); return this.year(o.getUTCFullYear()), this.month(o.getUTCMonth()), this.date(o.getUTCDate()), this } function se(t) { return t } function le(t, e, n, i) { var a = _t(), r = h().set(i, e); return a[n](r, t) } function ue(t, e, n) { if (s(t) && (e = t, t = void 0), t = t || "", null != e) return le(t, e, n, "month"); var i, a = []; for (i = 0; i < 12; i++)a[i] = le(t, i, n, "month"); return a } function de(t, e, n, i) { "boolean" == typeof t ? (s(e) && (n = e, e = void 0), e = e || "") : (n = e = t, t = !1, s(e) && (n = e, e = void 0), e = e || ""); var a = _t(), r = t ? a._week.dow : 0; if (null != n) return le(e, (n + r) % 7, i, "day"); var o, l = []; for (o = 0; o < 7; o++)l[o] = le(e, (o + r) % 7, i, "day"); return l } function ce(t, e, n, i) { var a = Xt(e, n); return t._milliseconds += i * a._milliseconds, t._days += i * a._days, t._months += i * a._months, t._bubble() } function he(t) { return t < 0 ? Math.floor(t) : Math.ceil(t) } function fe(t) { return 4800 * t / 146097 } function ge(t) { return 146097 * t / 4800 } function me(t) { return function () { return this.as(t) } } function pe(t) { return function () { return this.isValid() ? this._data[t] : NaN } } function ve(t, e, n, i, a) { return a.relativeTime(e || 1, !!n, t, i) } function ye(t, e, n) { var i = Xt(t).abs(), a = hi(i.as("s")), r = hi(i.as("m")), o = hi(i.as("h")), s = hi(i.as("d")), l = hi(i.as("M")), u = hi(i.as("y")), d = a <= fi.ss && ["s", a] || a < fi.s && ["ss", a] || r <= 1 && ["m"] || r < fi.m && ["mm", r] || o <= 1 && ["h"] || o < fi.h && ["hh", o] || s <= 1 && ["d"] || s < fi.d && ["dd", s] || l <= 1 && ["M"] || l < fi.M && ["MM", l] || u <= 1 && ["y"] || ["yy", u]; return d[2] = e, d[3] = +t > 0, d[4] = n, ve.apply(null, d) } function be() { if (!this.isValid()) return this.localeData().invalidDate(); var t, e, n, i = gi(this._milliseconds) / 1e3, a = gi(this._days), r = gi(this._months); e = x((t = x(i / 60)) / 60), i %= 60, t %= 60; var o = n = x(r / 12), s = r %= 12, l = a, u = e, d = t, c = i, h = this.asSeconds(); return h ? (h < 0 ? "-" : "") + "P" + (o ? o + "Y" : "") + (s ? s + "M" : "") + (l ? l + "D" : "") + (u || d || c ? "T" : "") + (u ? u + "H" : "") + (d ? d + "M" : "") + (c ? c + "S" : "") : "P0D" } var xe, _e, ke = _e = Array.prototype.some ? Array.prototype.some : function (t) { for (var e = Object(this), n = e.length >>> 0, i = 0; i < n; i++)if (i in e && t.call(this, e[i], i, e)) return !0; return !1 }, we = n.momentProperties = [], Me = !1, Se = {}; n.suppressDeprecationWarnings = !1, n.deprecationHandler = null; var De, Ce, Pe = De = Object.keys ? Object.keys : function (t) { var e, n = []; for (e in t) d(t, e) && n.push(e); return n }, Te = {}, Ae = {}, Ie = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Oe = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Fe = {}, Re = {}, Le = /\d/, We = /\d\d/, Ye = /\d{3}/, Ne = /\d{4}/, ze = /[+-]?\d{6}/, Be = /\d\d?/, Ve = /\d\d\d\d?/, He = /\d\d\d\d\d\d?/, Ee = /\d{1,3}/, je = /\d{1,4}/, Ue = /[+-]?\d{1,6}/, qe = /\d+/, Ge = /[+-]?\d+/, Ze = /Z|[+-]\d\d:?\d\d/gi, Xe = /Z|[+-]\d\d(?::?\d\d)?/gi, Je = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Ke = {}, Qe = {}, $e = 0, tn = 1, en = 2, nn = 3, an = 4, rn = 5, on = 6, sn = 7, ln = 8, un = Ce = Array.prototype.indexOf ? Array.prototype.indexOf : function (t) { var e; for (e = 0; e < this.length; ++e)if (this[e] === t) return e; return -1 }; N("M", ["MM", 2], "Mo", function () { return this.month() + 1 }), N("MMM", 0, 0, function (t) { return this.localeData().monthsShort(this, t) }), N("MMMM", 0, 0, function (t) { return this.localeData().months(this, t) }), T("month", "M"), O("month", 8), E("M", Be), E("MM", Be, We), E("MMM", function (t, e) { return e.monthsShortRegex(t) }), E("MMMM", function (t, e) { return e.monthsRegex(t) }), G(["M", "MM"], function (t, e) { e[tn] = _(t) - 1 }), G(["MMM", "MMMM"], function (t, e, n, i) { var a = n._locale.monthsParse(t, i, n._strict); null != a ? e[tn] = a : g(n).invalidMonth = t }); var dn = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, cn = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), hn = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), fn = Je, gn = Je; N("Y", 0, 0, function () { var t = this.year(); return t <= 9999 ? "" + t : "+" + t }), N(0, ["YY", 2], 0, function () { return this.year() % 100 }), N(0, ["YYYY", 4], 0, "year"), N(0, ["YYYYY", 5], 0, "year"), N(0, ["YYYYYY", 6, !0], 0, "year"), T("year", "y"), O("year", 1), E("Y", Ge), E("YY", Be, We), E("YYYY", je, Ne), E("YYYYY", Ue, ze), E("YYYYYY", Ue, ze), G(["YYYYY", "YYYYYY"], $e), G("YYYY", function (t, e) { e[$e] = 2 === t.length ? n.parseTwoDigitYear(t) : _(t) }), G("YY", function (t, e) { e[$e] = n.parseTwoDigitYear(t) }), G("Y", function (t, e) { e[$e] = parseInt(t, 10) }), n.parseTwoDigitYear = function (t) { return _(t) + (_(t) > 68 ? 1900 : 2e3) }; var mn = R("FullYear", !0); N("w", ["ww", 2], "wo", "week"), N("W", ["WW", 2], "Wo", "isoWeek"), T("week", "w"), T("isoWeek", "W"), O("week", 5), O("isoWeek", 5), E("w", Be), E("ww", Be, We), E("W", Be), E("WW", Be, We), Z(["w", "ww", "W", "WW"], function (t, e, n, i) { e[i.substr(0, 1)] = _(t) }); N("d", 0, "do", "day"), N("dd", 0, 0, function (t) { return this.localeData().weekdaysMin(this, t) }), N("ddd", 0, 0, function (t) { return this.localeData().weekdaysShort(this, t) }), N("dddd", 0, 0, function (t) { return this.localeData().weekdays(this, t) }), N("e", 0, 0, "weekday"), N("E", 0, 0, "isoWeekday"), T("day", "d"), T("weekday", "e"), T("isoWeekday", "E"), O("day", 11), O("weekday", 11), O("isoWeekday", 11), E("d", Be), E("e", Be), E("E", Be), E("dd", function (t, e) { return e.weekdaysMinRegex(t) }), E("ddd", function (t, e) { return e.weekdaysShortRegex(t) }), E("dddd", function (t, e) { return e.weekdaysRegex(t) }), Z(["dd", "ddd", "dddd"], function (t, e, n, i) { var a = n._locale.weekdaysParse(t, i, n._strict); null != a ? e.d = a : g(n).invalidWeekday = t }), Z(["d", "e", "E"], function (t, e, n, i) { e[i] = _(t) }); var pn = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), vn = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), yn = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), bn = Je, xn = Je, _n = Je; N("H", ["HH", 2], 0, "hour"), N("h", ["hh", 2], 0, ft), N("k", ["kk", 2], 0, function () { return this.hours() || 24 }), N("hmm", 0, 0, function () { return "" + ft.apply(this) + Y(this.minutes(), 2) }), N("hmmss", 0, 0, function () { return "" + ft.apply(this) + Y(this.minutes(), 2) + Y(this.seconds(), 2) }), N("Hmm", 0, 0, function () { return "" + this.hours() + Y(this.minutes(), 2) }), N("Hmmss", 0, 0, function () { return "" + this.hours() + Y(this.minutes(), 2) + Y(this.seconds(), 2) }), gt("a", !0), gt("A", !1), T("hour", "h"), O("hour", 13), E("a", mt), E("A", mt), E("H", Be), E("h", Be), E("k", Be), E("HH", Be, We), E("hh", Be, We), E("kk", Be, We), E("hmm", Ve), E("hmmss", He), E("Hmm", Ve), E("Hmmss", He), G(["H", "HH"], nn), G(["k", "kk"], function (t, e, n) { var i = _(t); e[nn] = 24 === i ? 0 : i }), G(["a", "A"], function (t, e, n) { n._isPm = n._locale.isPM(t), n._meridiem = t }), G(["h", "hh"], function (t, e, n) { e[nn] = _(t), g(n).bigHour = !0 }), G("hmm", function (t, e, n) { var i = t.length - 2; e[nn] = _(t.substr(0, i)), e[an] = _(t.substr(i)), g(n).bigHour = !0 }), G("hmmss", function (t, e, n) { var i = t.length - 4, a = t.length - 2; e[nn] = _(t.substr(0, i)), e[an] = _(t.substr(i, 2)), e[rn] = _(t.substr(a)), g(n).bigHour = !0 }), G("Hmm", function (t, e, n) { var i = t.length - 2; e[nn] = _(t.substr(0, i)), e[an] = _(t.substr(i)) }), G("Hmmss", function (t, e, n) { var i = t.length - 4, a = t.length - 2; e[nn] = _(t.substr(0, i)), e[an] = _(t.substr(i, 2)), e[rn] = _(t.substr(a)) }); var kn, wn = R("Hours", !0), Mn = { calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, longDateFormat: { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, invalidDate: "Invalid date", ordinal: "%d", dayOfMonthOrdinalParse: /\d{1,2}/, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, months: cn, monthsShort: hn, week: { dow: 0, doy: 6 }, weekdays: pn, weekdaysMin: yn, weekdaysShort: vn, meridiemParse: /[ap]\.?m?\.?/i }, Sn = {}, Dn = {}, Cn = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Pn = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Tn = /Z|[+-]\d\d(?::?\d\d)?/, An = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]], In = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], On = /^\/?Date\((\-?\d+)/i, Fn = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/; n.createFromInputFallback = M("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (t) { t._d = new Date(t._i + (t._useUTC ? " UTC" : "")) }), n.ISO_8601 = function () { }, n.RFC_2822 = function () { }; var Rn = M("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () { var t = Nt.apply(null, arguments); return this.isValid() && t.isValid() ? t < this ? this : t : p() }), Ln = M("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () { var t = Nt.apply(null, arguments); return this.isValid() && t.isValid() ? t > this ? this : t : p() }), Wn = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"]; jt("Z", ":"), jt("ZZ", ""), E("Z", Xe), E("ZZ", Xe), G(["Z", "ZZ"], function (t, e, n) { n._useUTC = !0, n._tzm = Ut(Xe, t) }); var Yn = /([\+\-]|\d\d)/gi; n.updateOffset = function () { }; var Nn = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/, zn = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/; Xt.fn = Vt.prototype, Xt.invalid = function () { return Xt(NaN) }; var Bn = $t(1, "add"), Vn = $t(-1, "subtract"); n.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", n.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]"; var Hn = M("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (t) { return void 0 === t ? this.localeData() : this.locale(t) }); N(0, ["gg", 2], 0, function () { return this.weekYear() % 100 }), N(0, ["GG", 2], 0, function () { return this.isoWeekYear() % 100 }), ae("gggg", "weekYear"), ae("ggggg", "weekYear"), ae("GGGG", "isoWeekYear"), ae("GGGGG", "isoWeekYear"), T("weekYear", "gg"), T("isoWeekYear", "GG"), O("weekYear", 1), O("isoWeekYear", 1), E("G", Ge), E("g", Ge), E("GG", Be, We), E("gg", Be, We), E("GGGG", je, Ne), E("gggg", je, Ne), E("GGGGG", Ue, ze), E("ggggg", Ue, ze), Z(["gggg", "ggggg", "GGGG", "GGGGG"], function (t, e, n, i) { e[i.substr(0, 2)] = _(t) }), Z(["gg", "GG"], function (t, e, i, a) { e[a] = n.parseTwoDigitYear(t) }), N("Q", 0, "Qo", "quarter"), T("quarter", "Q"), O("quarter", 7), E("Q", Le), G("Q", function (t, e) { e[tn] = 3 * (_(t) - 1) }), N("D", ["DD", 2], "Do", "date"), T("date", "D"), O("date", 9), E("D", Be), E("DD", Be, We), E("Do", function (t, e) { return t ? e._dayOfMonthOrdinalParse || e._ordinalParse : e._dayOfMonthOrdinalParseLenient }), G(["D", "DD"], en), G("Do", function (t, e) { e[en] = _(t.match(Be)[0], 10) }); var En = R("Date", !0); N("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), T("dayOfYear", "DDD"), O("dayOfYear", 4), E("DDD", Ee), E("DDDD", Ye), G(["DDD", "DDDD"], function (t, e, n) { n._dayOfYear = _(t) }), N("m", ["mm", 2], 0, "minute"), T("minute", "m"), O("minute", 14), E("m", Be), E("mm", Be, We), G(["m", "mm"], an); var jn = R("Minutes", !1); N("s", ["ss", 2], 0, "second"), T("second", "s"), O("second", 15), E("s", Be), E("ss", Be, We), G(["s", "ss"], rn); var Un = R("Seconds", !1); N("S", 0, 0, function () { return ~~(this.millisecond() / 100) }), N(0, ["SS", 2], 0, function () { return ~~(this.millisecond() / 10) }), N(0, ["SSS", 3], 0, "millisecond"), N(0, ["SSSS", 4], 0, function () { return 10 * this.millisecond() }), N(0, ["SSSSS", 5], 0, function () { return 100 * this.millisecond() }), N(0, ["SSSSSS", 6], 0, function () { return 1e3 * this.millisecond() }), N(0, ["SSSSSSS", 7], 0, function () { return 1e4 * this.millisecond() }), N(0, ["SSSSSSSS", 8], 0, function () { return 1e5 * this.millisecond() }), N(0, ["SSSSSSSSS", 9], 0, function () { return 1e6 * this.millisecond() }), T("millisecond", "ms"), O("millisecond", 16), E("S", Ee, Le), E("SS", Ee, We), E("SSS", Ee, Ye); var qn; for (qn = "SSSS"; qn.length <= 9; qn += "S")E(qn, qe); for (qn = "S"; qn.length <= 9; qn += "S")G(qn, function (t, e) { e[on] = _(1e3 * ("0." + t)) }); var Gn = R("Milliseconds", !1); N("z", 0, 0, "zoneAbbr"), N("zz", 0, 0, "zoneName"); var Zn = y.prototype; Zn.add = Bn, Zn.calendar = function (t, e) { var i = t || Nt(), a = qt(i, this).startOf("day"), r = n.calendarFormat(this, a) || "sameElse", o = e && (D(e[r]) ? e[r].call(this, i) : e[r]); return this.format(o || this.localeData().calendar(r, this, Nt(i))) }, Zn.clone = function () { return new y(this) }, Zn.diff = function (t, e, n) { var i, a, r, o; return this.isValid() && (i = qt(t, this)).isValid() ? (a = 6e4 * (i.utcOffset() - this.utcOffset()), "year" === (e = A(e)) || "month" === e || "quarter" === e ? (o = ee(this, i), "quarter" === e ? o /= 3 : "year" === e && (o /= 12)) : (r = this - i, o = "second" === e ? r / 1e3 : "minute" === e ? r / 6e4 : "hour" === e ? r / 36e5 : "day" === e ? (r - a) / 864e5 : "week" === e ? (r - a) / 6048e5 : r), n ? o : x(o)) : NaN }, Zn.endOf = function (t) { return void 0 === (t = A(t)) || "millisecond" === t ? this : ("date" === t && (t = "day"), this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms")) }, Zn.format = function (t) { t || (t = this.isUtc() ? n.defaultFormatUtc : n.defaultFormat); var e = V(this, t); return this.localeData().postformat(e) }, Zn.from = function (t, e) { return this.isValid() && (b(t) && t.isValid() || Nt(t).isValid()) ? Xt({ to: this, from: t }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate() }, Zn.fromNow = function (t) { return this.from(Nt(), t) }, Zn.to = function (t, e) { return this.isValid() && (b(t) && t.isValid() || Nt(t).isValid()) ? Xt({ from: this, to: t }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate() }, Zn.toNow = function (t) { return this.to(Nt(), t) }, Zn.get = function (t) { return t = A(t), D(this[t]) ? this[t]() : this }, Zn.invalidAt = function () { return g(this).overflow }, Zn.isAfter = function (t, e) { var n = b(t) ? t : Nt(t); return !(!this.isValid() || !n.isValid()) && ("millisecond" === (e = A(o(e) ? "millisecond" : e)) ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(e).valueOf()) }, Zn.isBefore = function (t, e) { var n = b(t) ? t : Nt(t); return !(!this.isValid() || !n.isValid()) && ("millisecond" === (e = A(o(e) ? "millisecond" : e)) ? this.valueOf() < n.valueOf() : this.clone().endOf(e).valueOf() < n.valueOf()) }, Zn.isBetween = function (t, e, n, i) { return ("(" === (i = i || "()")[0] ? this.isAfter(t, n) : !this.isBefore(t, n)) && (")" === i[1] ? this.isBefore(e, n) : !this.isAfter(e, n)) }, Zn.isSame = function (t, e) { var n, i = b(t) ? t : Nt(t); return !(!this.isValid() || !i.isValid()) && ("millisecond" === (e = A(e || "millisecond")) ? this.valueOf() === i.valueOf() : (n = i.valueOf(), this.clone().startOf(e).valueOf() <= n && n <= this.clone().endOf(e).valueOf())) }, Zn.isSameOrAfter = function (t, e) { return this.isSame(t, e) || this.isAfter(t, e) }, Zn.isSameOrBefore = function (t, e) { return this.isSame(t, e) || this.isBefore(t, e) }, Zn.isValid = function () { return m(this) }, Zn.lang = Hn, Zn.locale = ne, Zn.localeData = ie, Zn.max = Ln, Zn.min = Rn, Zn.parsingFlags = function () { return c({}, g(this)) }, Zn.set = function (t, e) { if ("object" == typeof t) for (var n = F(t = I(t)), i = 0; i < n.length; i++)this[n[i].unit](t[n[i].unit]); else if (t = A(t), D(this[t])) return this[t](e); return this }, Zn.startOf = function (t) { switch (t = A(t)) { case "year": this.month(0); case "quarter": case "month": this.date(1); case "week": case "isoWeek": case "day": case "date": this.hours(0); case "hour": this.minutes(0); case "minute": this.seconds(0); case "second": this.milliseconds(0) }return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this }, Zn.subtract = Vn, Zn.toArray = function () { var t = this; return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()] }, Zn.toObject = function () { var t = this; return { years: t.year(), months: t.month(), date: t.date(), hours: t.hours(), minutes: t.minutes(), seconds: t.seconds(), milliseconds: t.milliseconds() } }, Zn.toDate = function () { return new Date(this.valueOf()) }, Zn.toISOString = function () { if (!this.isValid()) return null; var t = this.clone().utc(); return t.year() < 0 || t.year() > 9999 ? V(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : D(Date.prototype.toISOString) ? this.toDate().toISOString() : V(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") }, Zn.inspect = function () { if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)"; var t = "moment", e = ""; this.isLocal() || (t = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", e = "Z"); var n = "[" + t + '("]', i = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", a = e + '[")]'; return this.format(n + i + "-MM-DD[T]HH:mm:ss.SSS" + a) }, Zn.toJSON = function () { return this.isValid() ? this.toISOString() : null }, Zn.toString = function () { return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ") }, Zn.unix = function () { return Math.floor(this.valueOf() / 1e3) }, Zn.valueOf = function () { return this._d.valueOf() - 6e4 * (this._offset || 0) }, Zn.creationData = function () { return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict } }, Zn.year = mn, Zn.isLeapYear = function () { return nt(this.year()) }, Zn.weekYear = function (t) { return re.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy) }, Zn.isoWeekYear = function (t) { return re.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4) }, Zn.quarter = Zn.quarters = function (t) { return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3) }, Zn.month = $, Zn.daysInMonth = function () { return J(this.year(), this.month()) }, Zn.week = Zn.weeks = function (t) { var e = this.localeData().week(this); return null == t ? e : this.add(7 * (t - e), "d") }, Zn.isoWeek = Zn.isoWeeks = function (t) { var e = st(this, 1, 4).week; return null == t ? e : this.add(7 * (t - e), "d") }, Zn.weeksInYear = function () { var t = this.localeData()._week; return lt(this.year(), t.dow, t.doy) }, Zn.isoWeeksInYear = function () { return lt(this.year(), 1, 4) }, Zn.date = En, Zn.day = Zn.days = function (t) { if (!this.isValid()) return null != t ? this : NaN; var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay(); return null != t ? (t = ut(t, this.localeData()), this.add(t - e, "d")) : e }, Zn.weekday = function (t) { if (!this.isValid()) return null != t ? this : NaN; var e = (this.day() + 7 - this.localeData()._week.dow) % 7; return null == t ? e : this.add(t - e, "d") }, Zn.isoWeekday = function (t) { if (!this.isValid()) return null != t ? this : NaN; if (null != t) { var e = dt(t, this.localeData()); return this.day(this.day() % 7 ? e : e - 7) } return this.day() || 7 }, Zn.dayOfYear = function (t) { var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1; return null == t ? e : this.add(t - e, "d") }, Zn.hour = Zn.hours = wn, Zn.minute = Zn.minutes = jn, Zn.second = Zn.seconds = Un, Zn.millisecond = Zn.milliseconds = Gn, Zn.utcOffset = function (t, e, i) { var a, r = this._offset || 0; if (!this.isValid()) return null != t ? this : NaN; if (null != t) { if ("string" == typeof t) { if (null === (t = Ut(Xe, t))) return this } else Math.abs(t) < 16 && !i && (t *= 60); return !this._isUTC && e && (a = Gt(this)), this._offset = t, this._isUTC = !0, null != a && this.add(a, "m"), r !== t && (!e || this._changeInProgress ? te(this, Xt(t - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, n.updateOffset(this, !0), this._changeInProgress = null)), this } return this._isUTC ? r : Gt(this) }, Zn.utc = function (t) { return this.utcOffset(0, t) }, Zn.local = function (t) { return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Gt(this), "m")), this }, Zn.parseZone = function () { if (null != this._tzm) this.utcOffset(this._tzm, !1, !0); else if ("string" == typeof this._i) { var t = Ut(Ze, this._i); null != t ? this.utcOffset(t) : this.utcOffset(0, !0) } return this }, Zn.hasAlignedHourOffset = function (t) { return !!this.isValid() && (t = t ? Nt(t).utcOffset() : 0, (this.utcOffset() - t) % 60 == 0) }, Zn.isDST = function () { return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset() }, Zn.isLocal = function () { return !!this.isValid() && !this._isUTC }, Zn.isUtcOffset = function () { return !!this.isValid() && this._isUTC }, Zn.isUtc = Zt, Zn.isUTC = Zt, Zn.zoneAbbr = function () { return this._isUTC ? "UTC" : "" }, Zn.zoneName = function () { return this._isUTC ? "Coordinated Universal Time" : "" }, Zn.dates = M("dates accessor is deprecated. Use date instead.", En), Zn.months = M("months accessor is deprecated. Use month instead", $), Zn.years = M("years accessor is deprecated. Use year instead", mn), Zn.zone = M("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function (t, e) { return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset() }), Zn.isDSTShifted = M("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function () { if (!o(this._isDSTShifted)) return this._isDSTShifted; var t = {}; if (v(t, this), (t = Lt(t))._a) { var e = t._isUTC ? h(t._a) : Nt(t._a); this._isDSTShifted = this.isValid() && k(t._a, e.toArray()) > 0 } else this._isDSTShifted = !1; return this._isDSTShifted }); var Xn = P.prototype; Xn.calendar = function (t, e, n) { var i = this._calendar[t] || this._calendar.sameElse; return D(i) ? i.call(e, n) : i }, Xn.longDateFormat = function (t) { var e = this._longDateFormat[t], n = this._longDateFormat[t.toUpperCase()]; return e || !n ? e : (this._longDateFormat[t] = n.replace(/MMMM|MM|DD|dddd/g, function (t) { return t.slice(1) }), this._longDateFormat[t]) }, Xn.invalidDate = function () { return this._invalidDate }, Xn.ordinal = function (t) { return this._ordinal.replace("%d", t) }, Xn.preparse = se, Xn.postformat = se, Xn.relativeTime = function (t, e, n, i) { var a = this._relativeTime[n]; return D(a) ? a(t, e, n, i) : a.replace(/%d/i, t) }, Xn.pastFuture = function (t, e) { var n = this._relativeTime[t > 0 ? "future" : "past"]; return D(n) ? n(e) : n.replace(/%s/i, e) }, Xn.set = function (t) { var e, n; for (n in t) D(e = t[n]) ? this[n] = e : this["_" + n] = e; this._config = t, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source) }, Xn.months = function (t, e) { return t ? i(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || dn).test(e) ? "format" : "standalone"][t.month()] : i(this._months) ? this._months : this._months.standalone }, Xn.monthsShort = function (t, e) { return t ? i(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[dn.test(e) ? "format" : "standalone"][t.month()] : i(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone }, Xn.monthsParse = function (t, e, n) { var i, a, r; if (this._monthsParseExact) return K.call(this, t, e, n); for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; i < 12; i++) { if (a = h([2e3, i]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(a, "").replace(".", "") + "$", "i"), this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(a, "").replace(".", "") + "$", "i")), n || this._monthsParse[i] || (r = "^" + this.months(a, "") + "|^" + this.monthsShort(a, ""), this._monthsParse[i] = new RegExp(r.replace(".", ""), "i")), n && "MMMM" === e && this._longMonthsParse[i].test(t)) return i; if (n && "MMM" === e && this._shortMonthsParse[i].test(t)) return i; if (!n && this._monthsParse[i].test(t)) return i } }, Xn.monthsRegex = function (t) { return this._monthsParseExact ? (d(this, "_monthsRegex") || tt.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : (d(this, "_monthsRegex") || (this._monthsRegex = gn), this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex) }, Xn.monthsShortRegex = function (t) { return this._monthsParseExact ? (d(this, "_monthsRegex") || tt.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (d(this, "_monthsShortRegex") || (this._monthsShortRegex = fn), this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex) }, Xn.week = function (t) { return st(t, this._week.dow, this._week.doy).week }, Xn.firstDayOfYear = function () { return this._week.doy }, Xn.firstDayOfWeek = function () { return this._week.dow }, Xn.weekdays = function (t, e) { return t ? i(this._weekdays) ? this._weekdays[t.day()] : this._weekdays[this._weekdays.isFormat.test(e) ? "format" : "standalone"][t.day()] : i(this._weekdays) ? this._weekdays : this._weekdays.standalone }, Xn.weekdaysMin = function (t) { return t ? this._weekdaysMin[t.day()] : this._weekdaysMin }, Xn.weekdaysShort = function (t) { return t ? this._weekdaysShort[t.day()] : this._weekdaysShort }, Xn.weekdaysParse = function (t, e, n) { var i, a, r; if (this._weekdaysParseExact) return ct.call(this, t, e, n); for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), i = 0; i < 7; i++) { if (a = h([2e3, 1]).day(i), n && !this._fullWeekdaysParse[i] && (this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(a, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(a, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(a, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[i] || (r = "^" + this.weekdays(a, "") + "|^" + this.weekdaysShort(a, "") + "|^" + this.weekdaysMin(a, ""), this._weekdaysParse[i] = new RegExp(r.replace(".", ""), "i")), n && "dddd" === e && this._fullWeekdaysParse[i].test(t)) return i; if (n && "ddd" === e && this._shortWeekdaysParse[i].test(t)) return i; if (n && "dd" === e && this._minWeekdaysParse[i].test(t)) return i; if (!n && this._weekdaysParse[i].test(t)) return i } }, Xn.weekdaysRegex = function (t) { return this._weekdaysParseExact ? (d(this, "_weekdaysRegex") || ht.call(this), t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (d(this, "_weekdaysRegex") || (this._weekdaysRegex = bn), this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex) }, Xn.weekdaysShortRegex = function (t) { return this._weekdaysParseExact ? (d(this, "_weekdaysRegex") || ht.call(this), t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (d(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = xn), this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) }, Xn.weekdaysMinRegex = function (t) { return this._weekdaysParseExact ? (d(this, "_weekdaysRegex") || ht.call(this), t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (d(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = _n), this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) }, Xn.isPM = function (t) { return "p" === (t + "").toLowerCase().charAt(0) }, Xn.meridiem = function (t, e, n) { return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM" }, bt("en", { dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function (t) { var e = t % 10; return t + (1 === _(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th") } }), n.lang = M("moment.lang is deprecated. Use moment.locale instead.", bt), n.langData = M("moment.langData is deprecated. Use moment.localeData instead.", _t); var Jn = Math.abs, Kn = me("ms"), Qn = me("s"), $n = me("m"), ti = me("h"), ei = me("d"), ni = me("w"), ii = me("M"), ai = me("y"), ri = pe("milliseconds"), oi = pe("seconds"), si = pe("minutes"), li = pe("hours"), ui = pe("days"), di = pe("months"), ci = pe("years"), hi = Math.round, fi = { ss: 44, s: 45, m: 45, h: 22, d: 26, M: 11 }, gi = Math.abs, mi = Vt.prototype; return mi.isValid = function () { return this._isValid }, mi.abs = function () { var t = this._data; return this._milliseconds = Jn(this._milliseconds), this._days = Jn(this._days), this._months = Jn(this._months), t.milliseconds = Jn(t.milliseconds), t.seconds = Jn(t.seconds), t.minutes = Jn(t.minutes), t.hours = Jn(t.hours), t.months = Jn(t.months), t.years = Jn(t.years), this }, mi.add = function (t, e) { return ce(this, t, e, 1) }, mi.subtract = function (t, e) { return ce(this, t, e, -1) }, mi.as = function (t) { if (!this.isValid()) return NaN; var e, n, i = this._milliseconds; if ("month" === (t = A(t)) || "year" === t) return e = this._days + i / 864e5, n = this._months + fe(e), "month" === t ? n : n / 12; switch (e = this._days + Math.round(ge(this._months)), t) { case "week": return e / 7 + i / 6048e5; case "day": return e + i / 864e5; case "hour": return 24 * e + i / 36e5; case "minute": return 1440 * e + i / 6e4; case "second": return 86400 * e + i / 1e3; case "millisecond": return Math.floor(864e5 * e) + i; default: throw new Error("Unknown unit " + t) } }, mi.asMilliseconds = Kn, mi.asSeconds = Qn, mi.asMinutes = $n, mi.asHours = ti, mi.asDays = ei, mi.asWeeks = ni, mi.asMonths = ii, mi.asYears = ai, mi.valueOf = function () { return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * _(this._months / 12) : NaN }, mi._bubble = function () { var t, e, n, i, a, r = this._milliseconds, o = this._days, s = this._months, l = this._data; return r >= 0 && o >= 0 && s >= 0 || r <= 0 && o <= 0 && s <= 0 || (r += 864e5 * he(ge(s) + o), o = 0, s = 0), l.milliseconds = r % 1e3, t = x(r / 1e3), l.seconds = t % 60, e = x(t / 60), l.minutes = e % 60, n = x(e / 60), l.hours = n % 24, o += x(n / 24), a = x(fe(o)), s += a, o -= he(ge(a)), i = x(s / 12), s %= 12, l.days = o, l.months = s, l.years = i, this }, mi.get = function (t) { return t = A(t), this.isValid() ? this[t + "s"]() : NaN }, mi.milliseconds = ri, mi.seconds = oi, mi.minutes = si, mi.hours = li, mi.days = ui, mi.weeks = function () { return x(this.days() / 7) }, mi.months = di, mi.years = ci, mi.humanize = function (t) { if (!this.isValid()) return this.localeData().invalidDate(); var e = this.localeData(), n = ye(this, !t, e); return t && (n = e.pastFuture(+this, n)), e.postformat(n) }, mi.toISOString = be, mi.toString = be, mi.toJSON = be, mi.locale = ne, mi.localeData = ie, mi.toIsoString = M("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", be), mi.lang = Hn, N("X", 0, 0, "unix"), N("x", 0, 0, "valueOf"), E("x", Ge), E("X", /[+-]?\d+(\.\d{1,3})?/), G("X", function (t, e, n) { n._d = new Date(1e3 * parseFloat(t, 10)) }), G("x", function (t, e, n) { n._d = new Date(_(t)) }), n.version = "2.18.1", function (t) { xe = t }(Nt), n.fn = Zn, n.min = function () { return zt("isBefore", [].slice.call(arguments, 0)) }, n.max = function () { return zt("isAfter", [].slice.call(arguments, 0)) }, n.now = function () { return Date.now ? Date.now() : +new Date }, n.utc = h, n.unix = function (t) { return Nt(1e3 * t) }, n.months = function (t, e) { return ue(t, e, "months") }, n.isDate = l, n.locale = bt, n.invalid = p, n.duration = Xt, n.isMoment = b, n.weekdays = function (t, e, n) { return de(t, e, n, "weekdays") }, n.parseZone = function () { return Nt.apply(null, arguments).parseZone() }, n.localeData = _t, n.isDuration = Ht, n.monthsShort = function (t, e) { return ue(t, e, "monthsShort") }, n.weekdaysMin = function (t, e, n) { return de(t, e, n, "weekdaysMin") }, n.defineLocale = xt, n.updateLocale = function (t, e) { if (null != e) { var n, i = Mn; null != Sn[t] && (i = Sn[t]._config), (n = new P(e = C(i, e))).parentLocale = Sn[t], Sn[t] = n, bt(t) } else null != Sn[t] && (null != Sn[t].parentLocale ? Sn[t] = Sn[t].parentLocale : null != Sn[t] && delete Sn[t]); return Sn[t] }, n.locales = function () { return Pe(Sn) }, n.weekdaysShort = function (t, e, n) { return de(t, e, n, "weekdaysShort") }, n.normalizeUnits = A, n.relativeTimeRounding = function (t) { return void 0 === t ? hi : "function" == typeof t && (hi = t, !0) }, n.relativeTimeThreshold = function (t, e) { return void 0 !== fi[t] && (void 0 === e ? fi[t] : (fi[t] = e, "s" === t && (fi.ss = e - 1), !0)) }, n.calendarFormat = function (t, e) { var n = t.diff(e, "days", !0); return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse" }, n.prototype = Zn, n }) }, {}], 7: [function (t, e, n) { var i = t(29)(); i.helpers = t(45), t(27)(i), i.defaults = t(25), i.Element = t(26), i.elements = t(40), i.Interaction = t(28), i.platform = t(48), t(31)(i), t(22)(i), t(23)(i), t(24)(i), t(30)(i), t(33)(i), t(32)(i), t(35)(i), t(54)(i), t(52)(i), t(53)(i), t(55)(i), t(56)(i), t(57)(i), t(15)(i), t(16)(i), t(17)(i), t(18)(i), t(19)(i), t(20)(i), t(21)(i), t(8)(i), t(9)(i), t(10)(i), t(11)(i), t(12)(i), t(13)(i), t(14)(i); var a = []; a.push(t(49)(i), t(50)(i), t(51)(i)), i.plugins.register(a), i.platform.initialize(), e.exports = i, "undefined" != typeof window && (window.Chart = i), i.canvasHelpers = i.helpers.canvas }, { 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 30: 30, 31: 31, 32: 32, 33: 33, 35: 35, 40: 40, 45: 45, 48: 48, 49: 49, 50: 50, 51: 51, 52: 52, 53: 53, 54: 54, 55: 55, 56: 56, 57: 57, 8: 8, 9: 9 }], 8: [function (t, e, n) { "use strict"; e.exports = function (t) { t.Bar = function (e, n) { return n.type = "bar", new t(e, n) } } }, {}], 9: [function (t, e, n) { "use strict"; e.exports = function (t) { t.Bubble = function (e, n) { return n.type = "bubble", new t(e, n) } } }, {}], 10: [function (t, e, n) { "use strict"; e.exports = function (t) { t.Doughnut = function (e, n) { return n.type = "doughnut", new t(e, n) } } }, {}], 11: [function (t, e, n) { "use strict"; e.exports = function (t) { t.Line = function (e, n) { return n.type = "line", new t(e, n) } } }, {}], 12: [function (t, e, n) { "use strict"; e.exports = function (t) { t.PolarArea = function (e, n) { return n.type = "polarArea", new t(e, n) } } }, {}], 13: [function (t, e, n) { "use strict"; e.exports = function (t) { t.Radar = function (e, n) { return n.type = "radar", new t(e, n) } } }, {}], 14: [function (t, e, n) { "use strict"; e.exports = function (t) { t.Scatter = function (e, n) { return n.type = "scatter", new t(e, n) } } }, {}], 15: [function (t, e, n) { "use strict"; var i = t(25), a = t(40), r = t(45); i._set("bar", { hover: { mode: "label" }, scales: { xAxes: [{ type: "category", categoryPercentage: .8, barPercentage: .9, offset: !0, gridLines: { offsetGridLines: !0 } }], yAxes: [{ type: "linear" }] } }), i._set("horizontalBar", { hover: { mode: "index", axis: "y" }, scales: { xAxes: [{ type: "linear", position: "bottom" }], yAxes: [{ position: "left", type: "category", categoryPercentage: .8, barPercentage: .9, offset: !0, gridLines: { offsetGridLines: !0 } }] }, elements: { rectangle: { borderSkipped: "left" } }, tooltips: { callbacks: { title: function (t, e) { var n = ""; return t.length > 0 && (t[0].yLabel ? n = t[0].yLabel : e.labels.length > 0 && t[0].index < e.labels.length && (n = e.labels[t[0].index])), n }, label: function (t, e) { return (e.datasets[t.datasetIndex].label || "") + ": " + t.xLabel } }, mode: "index", axis: "y" } }), e.exports = function (t) { t.controllers.bar = t.DatasetController.extend({ dataElementType: a.Rectangle, initialize: function () { var e, n = this; t.DatasetController.prototype.initialize.apply(n, arguments), (e = n.getMeta()).stack = n.getDataset().stack, e.bar = !0 }, update: function (t) { var e, n, i = this, a = i.getMeta().data; for (i._ruler = i.getRuler(), e = 0, n = a.length; e < n; ++e)i.updateElement(a[e], e, t) }, updateElement: function (t, e, n) { var i = this, a = i.chart, o = i.getMeta(), s = i.getDataset(), l = t.custom || {}, u = a.options.elements.rectangle; t._xScale = i.getScaleForId(o.xAxisID), t._yScale = i.getScaleForId(o.yAxisID), t._datasetIndex = i.index, t._index = e, t._model = { datasetLabel: s.label, label: a.data.labels[e], borderSkipped: l.borderSkipped ? l.borderSkipped : u.borderSkipped, backgroundColor: l.backgroundColor ? l.backgroundColor : r.valueAtIndexOrDefault(s.backgroundColor, e, u.backgroundColor), borderColor: l.borderColor ? l.borderColor : r.valueAtIndexOrDefault(s.borderColor, e, u.borderColor), borderWidth: l.borderWidth ? l.borderWidth : r.valueAtIndexOrDefault(s.borderWidth, e, u.borderWidth) }, i.updateElementGeometry(t, e, n), t.pivot() }, updateElementGeometry: function (t, e, n) { var i = this, a = t._model, r = i.getValueScale(), o = r.getBasePixel(), s = r.isHorizontal(), l = i._ruler || i.getRuler(), u = i.calculateBarValuePixels(i.index, e), d = i.calculateBarIndexPixels(i.index, e, l); a.horizontal = s, a.base = n ? o : u.base, a.x = s ? n ? o : u.head : d.center, a.y = s ? d.center : n ? o : u.head, a.height = s ? d.size : void 0, a.width = s ? void 0 : d.size }, getValueScaleId: function () { return this.getMeta().yAxisID }, getIndexScaleId: function () { return this.getMeta().xAxisID }, getValueScale: function () { return this.getScaleForId(this.getValueScaleId()) }, getIndexScale: function () { return this.getScaleForId(this.getIndexScaleId()) }, getStackCount: function (t) { var e, n, i = this, a = i.chart, r = i.getIndexScale().options.stacked, o = void 0 === t ? a.data.datasets.length : t + 1, s = []; for (e = 0; e < o; ++e)(n = a.getDatasetMeta(e)).bar && a.isDatasetVisible(e) && (!1 === r || !0 === r && -1 === s.indexOf(n.stack) || void 0 === r && (void 0 === n.stack || -1 === s.indexOf(n.stack))) && s.push(n.stack); return s.length }, getStackIndex: function (t) { return this.getStackCount(t) - 1 }, getRuler: function () { var t, e, n = this, i = n.getIndexScale(), a = n.getStackCount(), r = n.index, o = [], s = i.isHorizontal(), l = s ? i.left : i.top, u = l + (s ? i.width : i.height); for (t = 0, e = n.getMeta().data.length; t < e; ++t)o.push(i.getPixelForValue(null, t, r)); return { pixels: o, start: l, end: u, stackCount: a, scale: i } }, calculateBarValuePixels: function (t, e) { var n, i, a, r, o, s, l = this, u = l.chart, d = l.getMeta(), c = l.getValueScale(), h = u.data.datasets, f = c.getRightValue(h[t].data[e]), g = c.options.stacked, m = d.stack, p = 0; if (g || void 0 === g && void 0 !== m) for (n = 0; n < t; ++n)(i = u.getDatasetMeta(n)).bar && i.stack === m && i.controller.getValueScaleId() === c.id && u.isDatasetVisible(n) && (a = c.getRightValue(h[n].data[e]), (f < 0 && a < 0 || f >= 0 && a > 0) && (p += a)); return r = c.getPixelForValue(p), o = c.getPixelForValue(p + f), s = (o - r) / 2, { size: s, base: r, head: o, center: o + s / 2 } }, calculateBarIndexPixels: function (t, e, n) { var i, a, o, s, l, u, d = this, c = n.scale.options, h = d.getStackIndex(t), f = n.pixels, g = f[e], m = f.length, p = n.start, v = n.end; return 1 === m ? (i = g > p ? g - p : v - g, a = g < v ? v - g : g - p) : (e > 0 && (i = (g - f[e - 1]) / 2, e === m - 1 && (a = i)), e < m - 1 && (a = (f[e + 1] - g) / 2, 0 === e && (i = a))), o = i * c.categoryPercentage, s = a * c.categoryPercentage, l = (o + s) / n.stackCount, u = l * c.barPercentage, u = Math.min(r.valueOrDefault(c.barThickness, u), r.valueOrDefault(c.maxBarThickness, 1 / 0)), g -= o, g += l * h, g += (l - u) / 2, { size: u, base: g, head: g + u, center: g + u / 2 } }, draw: function () { var t = this, e = t.chart, n = t.getValueScale(), i = t.getMeta().data, a = t.getDataset(), o = i.length, s = 0; for (r.canvas.clipArea(e.ctx, e.chartArea); s < o; ++s)isNaN(n.getRightValue(a.data[s])) || i[s].draw(); r.canvas.unclipArea(e.ctx) }, setHoverStyle: function (t) { var e = this.chart.data.datasets[t._datasetIndex], n = t._index, i = t.custom || {}, a = t._model; a.backgroundColor = i.hoverBackgroundColor ? i.hoverBackgroundColor : r.valueAtIndexOrDefault(e.hoverBackgroundColor, n, r.getHoverColor(a.backgroundColor)), a.borderColor = i.hoverBorderColor ? i.hoverBorderColor : r.valueAtIndexOrDefault(e.hoverBorderColor, n, r.getHoverColor(a.borderColor)), a.borderWidth = i.hoverBorderWidth ? i.hoverBorderWidth : r.valueAtIndexOrDefault(e.hoverBorderWidth, n, a.borderWidth) }, removeHoverStyle: function (t) { var e = this.chart.data.datasets[t._datasetIndex], n = t._index, i = t.custom || {}, a = t._model, o = this.chart.options.elements.rectangle; a.backgroundColor = i.backgroundColor ? i.backgroundColor : r.valueAtIndexOrDefault(e.backgroundColor, n, o.backgroundColor), a.borderColor = i.borderColor ? i.borderColor : r.valueAtIndexOrDefault(e.borderColor, n, o.borderColor), a.borderWidth = i.borderWidth ? i.borderWidth : r.valueAtIndexOrDefault(e.borderWidth, n, o.borderWidth) } }), t.controllers.horizontalBar = t.controllers.bar.extend({ getValueScaleId: function () { return this.getMeta().xAxisID }, getIndexScaleId: function () { return this.getMeta().yAxisID } }) } }, { 25: 25, 40: 40, 45: 45 }], 16: [function (t, e, n) { "use strict"; var i = t(25), a = t(40), r = t(45); i._set("bubble", { hover: { mode: "single" }, scales: { xAxes: [{ type: "linear", position: "bottom", id: "x-axis-0" }], yAxes: [{ type: "linear", position: "left", id: "y-axis-0" }] }, tooltips: { callbacks: { title: function () { return "" }, label: function (t, e) { var n = e.datasets[t.datasetIndex].label || "", i = e.datasets[t.datasetIndex].data[t.index]; return n + ": (" + t.xLabel + ", " + t.yLabel + ", " + i.r + ")" } } } }), e.exports = function (t) { t.controllers.bubble = t.DatasetController.extend({ dataElementType: a.Point, update: function (t) { var e = this, n = e.getMeta().data; r.each(n, function (n, i) { e.updateElement(n, i, t) }) }, updateElement: function (t, e, n) { var i = this, a = i.getMeta(), r = t.custom || {}, o = i.getScaleForId(a.xAxisID), s = i.getScaleForId(a.yAxisID), l = i._resolveElementOptions(t, e), u = i.getDataset().data[e], d = i.index, c = n ? o.getPixelForDecimal(.5) : o.getPixelForValue("object" == typeof u ? u : NaN, e, d), h = n ? s.getBasePixel() : s.getPixelForValue(u, e, d); t._xScale = o, t._yScale = s, t._options = l, t._datasetIndex = d, t._index = e, t._model = { backgroundColor: l.backgroundColor, borderColor: l.borderColor, borderWidth: l.borderWidth, hitRadius: l.hitRadius, pointStyle: l.pointStyle, radius: n ? 0 : l.radius, skip: r.skip || isNaN(c) || isNaN(h), x: c, y: h }, t.pivot() }, setHoverStyle: function (t) { var e = t._model, n = t._options; e.backgroundColor = r.valueOrDefault(n.hoverBackgroundColor, r.getHoverColor(n.backgroundColor)), e.borderColor = r.valueOrDefault(n.hoverBorderColor, r.getHoverColor(n.borderColor)), e.borderWidth = r.valueOrDefault(n.hoverBorderWidth, n.borderWidth), e.radius = n.radius + n.hoverRadius }, removeHoverStyle: function (t) { var e = t._model, n = t._options; e.backgroundColor = n.backgroundColor, e.borderColor = n.borderColor, e.borderWidth = n.borderWidth, e.radius = n.radius }, _resolveElementOptions: function (t, e) { var n, i, a, o = this, s = o.chart, l = s.data.datasets[o.index], u = t.custom || {}, d = s.options.elements.point, c = r.options.resolve, h = l.data[e], f = {}, g = { chart: s, dataIndex: e, dataset: l, datasetIndex: o.index }, m = ["backgroundColor", "borderColor", "borderWidth", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth", "hoverRadius", "hitRadius", "pointStyle"]; for (n = 0, i = m.length; n < i; ++n)f[a = m[n]] = c([u[a], l[a], d[a]], g, e); return f.radius = c([u.radius, h ? h.r : void 0, l.radius, d.radius], g, e), f } }) } }, { 25: 25, 40: 40, 45: 45 }], 17: [function (t, e, n) { "use strict"; var i = t(25), a = t(40), r = t(45); i._set("doughnut", { animation: { animateRotate: !0, animateScale: !1 }, hover: { mode: "single" }, legendCallback: function (t) { var e = []; e.push('<ul class="' + t.id + '-legend">'); var n = t.data, i = n.datasets, a = n.labels; if (i.length) for (var r = 0; r < i[0].data.length; ++r)e.push('<li><span style="background-color:' + i[0].backgroundColor[r] + '"></span>'), a[r] && e.push(a[r]), e.push("</li>"); return e.push("</ul>"), e.join("") }, legend: { labels: { generateLabels: function (t) { var e = t.data; return e.labels.length && e.datasets.length ? e.labels.map(function (n, i) { var a = t.getDatasetMeta(0), o = e.datasets[0], s = a.data[i], l = s && s.custom || {}, u = r.valueAtIndexOrDefault, d = t.options.elements.arc; return { text: n, fillStyle: l.backgroundColor ? l.backgroundColor : u(o.backgroundColor, i, d.backgroundColor), strokeStyle: l.borderColor ? l.borderColor : u(o.borderColor, i, d.borderColor), lineWidth: l.borderWidth ? l.borderWidth : u(o.borderWidth, i, d.borderWidth), hidden: isNaN(o.data[i]) || a.data[i].hidden, index: i } }) : [] } }, onClick: function (t, e) { var n, i, a, r = e.index, o = this.chart; for (n = 0, i = (o.data.datasets || []).length; n < i; ++n)(a = o.getDatasetMeta(n)).data[r] && (a.data[r].hidden = !a.data[r].hidden); o.update() } }, cutoutPercentage: 50, rotation: -.5 * Math.PI, circumference: 2 * Math.PI, tooltips: { callbacks: { title: function () { return "" }, label: function (t, e) { var n = e.labels[t.index], i = ": " + e.datasets[t.datasetIndex].data[t.index]; return r.isArray(n) ? (n = n.slice())[0] += i : n += i, n } } } }), i._set("pie", r.clone(i.doughnut)), i._set("pie", { cutoutPercentage: 0 }), e.exports = function (t) { t.controllers.doughnut = t.controllers.pie = t.DatasetController.extend({ dataElementType: a.Arc, linkScales: r.noop, getRingIndex: function (t) { for (var e = 0, n = 0; n < t; ++n)this.chart.isDatasetVisible(n) && ++e; return e }, update: function (t) { var e = this, n = e.chart, i = n.chartArea, a = n.options, o = a.elements.arc, s = i.right - i.left - o.borderWidth, l = i.bottom - i.top - o.borderWidth, u = Math.min(s, l), d = { x: 0, y: 0 }, c = e.getMeta(), h = a.cutoutPercentage, f = a.circumference; if (f < 2 * Math.PI) { var g = a.rotation % (2 * Math.PI), m = (g += 2 * Math.PI * (g >= Math.PI ? -1 : g < -Math.PI ? 1 : 0)) + f, p = { x: Math.cos(g), y: Math.sin(g) }, v = { x: Math.cos(m), y: Math.sin(m) }, y = g <= 0 && m >= 0 || g <= 2 * Math.PI && 2 * Math.PI <= m, b = g <= .5 * Math.PI && .5 * Math.PI <= m || g <= 2.5 * Math.PI && 2.5 * Math.PI <= m, x = g <= -Math.PI && -Math.PI <= m || g <= Math.PI && Math.PI <= m, _ = g <= .5 * -Math.PI && .5 * -Math.PI <= m || g <= 1.5 * Math.PI && 1.5 * Math.PI <= m, k = h / 100, w = { x: x ? -1 : Math.min(p.x * (p.x < 0 ? 1 : k), v.x * (v.x < 0 ? 1 : k)), y: _ ? -1 : Math.min(p.y * (p.y < 0 ? 1 : k), v.y * (v.y < 0 ? 1 : k)) }, M = { x: y ? 1 : Math.max(p.x * (p.x > 0 ? 1 : k), v.x * (v.x > 0 ? 1 : k)), y: b ? 1 : Math.max(p.y * (p.y > 0 ? 1 : k), v.y * (v.y > 0 ? 1 : k)) }, S = { width: .5 * (M.x - w.x), height: .5 * (M.y - w.y) }; u = Math.min(s / S.width, l / S.height), d = { x: -.5 * (M.x + w.x), y: -.5 * (M.y + w.y) } } n.borderWidth = e.getMaxBorderWidth(c.data), n.outerRadius = Math.max((u - n.borderWidth) / 2, 0), n.innerRadius = Math.max(h ? n.outerRadius / 100 * h : 0, 0), n.radiusLength = (n.outerRadius - n.innerRadius) / n.getVisibleDatasetCount(), n.offsetX = d.x * n.outerRadius, n.offsetY = d.y * n.outerRadius, c.total = e.calculateTotal(), e.outerRadius = n.outerRadius - n.radiusLength * e.getRingIndex(e.index), e.innerRadius = Math.max(e.outerRadius - n.radiusLength, 0), r.each(c.data, function (n, i) { e.updateElement(n, i, t) }) }, updateElement: function (t, e, n) { var i = this, a = i.chart, o = a.chartArea, s = a.options, l = s.animation, u = (o.left + o.right) / 2, d = (o.top + o.bottom) / 2, c = s.rotation, h = s.rotation, f = i.getDataset(), g = n && l.animateRotate ? 0 : t.hidden ? 0 : i.calculateCircumference(f.data[e]) * (s.circumference / (2 * Math.PI)), m = n && l.animateScale ? 0 : i.innerRadius, p = n && l.animateScale ? 0 : i.outerRadius, v = r.valueAtIndexOrDefault; r.extend(t, { _datasetIndex: i.index, _index: e, _model: { x: u + a.offsetX, y: d + a.offsetY, startAngle: c, endAngle: h, circumference: g, outerRadius: p, innerRadius: m, label: v(f.label, e, a.data.labels[e]) } }); var y = t._model; this.removeHoverStyle(t), n && l.animateRotate || (y.startAngle = 0 === e ? s.rotation : i.getMeta().data[e - 1]._model.endAngle, y.endAngle = y.startAngle + y.circumference), t.pivot() }, removeHoverStyle: function (e) { t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc) }, calculateTotal: function () { var t, e = this.getDataset(), n = this.getMeta(), i = 0; return r.each(n.data, function (n, a) { t = e.data[a], isNaN(t) || n.hidden || (i += Math.abs(t)) }), i }, calculateCircumference: function (t) { var e = this.getMeta().total; return e > 0 && !isNaN(t) ? 2 * Math.PI * (t / e) : 0 }, getMaxBorderWidth: function (t) { for (var e, n, i = 0, a = this.index, r = t.length, o = 0; o < r; o++)e = t[o]._model ? t[o]._model.borderWidth : 0, i = (n = t[o]._chart ? t[o]._chart.config.data.datasets[a].hoverBorderWidth : 0) > (i = e > i ? e : i) ? n : i; return i } }) } }, { 25: 25, 40: 40, 45: 45 }], 18: [function (t, e, n) { "use strict"; var i = t(25), a = t(40), r = t(45); i._set("line", { showLines: !0, spanGaps: !1, hover: { mode: "label" }, scales: { xAxes: [{ type: "category", id: "x-axis-0" }], yAxes: [{ type: "linear", id: "y-axis-0" }] } }), e.exports = function (t) { function e(t, e) { return r.valueOrDefault(t.showLine, e.showLines) } t.controllers.line = t.DatasetController.extend({ datasetElementType: a.Line, dataElementType: a.Point, update: function (t) { var n, i, a, o = this, s = o.getMeta(), l = s.dataset, u = s.data || [], d = o.chart.options, c = d.elements.line, h = o.getScaleForId(s.yAxisID), f = o.getDataset(), g = e(f, d); for (g && (a = l.custom || {}, void 0 !== f.tension && void 0 === f.lineTension && (f.lineTension = f.tension), l._scale = h, l._datasetIndex = o.index, l._children = u, l._model = { spanGaps: f.spanGaps ? f.spanGaps : d.spanGaps, tension: a.tension ? a.tension : r.valueOrDefault(f.lineTension, c.tension), backgroundColor: a.backgroundColor ? a.backgroundColor : f.backgroundColor || c.backgroundColor, borderWidth: a.borderWidth ? a.borderWidth : f.borderWidth || c.borderWidth, borderColor: a.borderColor ? a.borderColor : f.borderColor || c.borderColor, borderCapStyle: a.borderCapStyle ? a.borderCapStyle : f.borderCapStyle || c.borderCapStyle, borderDash: a.borderDash ? a.borderDash : f.borderDash || c.borderDash, borderDashOffset: a.borderDashOffset ? a.borderDashOffset : f.borderDashOffset || c.borderDashOffset, borderJoinStyle: a.borderJoinStyle ? a.borderJoinStyle : f.borderJoinStyle || c.borderJoinStyle, fill: a.fill ? a.fill : void 0 !== f.fill ? f.fill : c.fill, steppedLine: a.steppedLine ? a.steppedLine : r.valueOrDefault(f.steppedLine, c.stepped), cubicInterpolationMode: a.cubicInterpolationMode ? a.cubicInterpolationMode : r.valueOrDefault(f.cubicInterpolationMode, c.cubicInterpolationMode) }, l.pivot()), n = 0, i = u.length; n < i; ++n)o.updateElement(u[n], n, t); for (g && 0 !== l._model.tension && o.updateBezierControlPoints(), n = 0, i = u.length; n < i; ++n)u[n].pivot() }, getPointBackgroundColor: function (t, e) { var n = this.chart.options.elements.point.backgroundColor, i = this.getDataset(), a = t.custom || {}; return a.backgroundColor ? n = a.backgroundColor : i.pointBackgroundColor ? n = r.valueAtIndexOrDefault(i.pointBackgroundColor, e, n) : i.backgroundColor && (n = i.backgroundColor), n }, getPointBorderColor: function (t, e) { var n = this.chart.options.elements.point.borderColor, i = this.getDataset(), a = t.custom || {}; return a.borderColor ? n = a.borderColor : i.pointBorderColor ? n = r.valueAtIndexOrDefault(i.pointBorderColor, e, n) : i.borderColor && (n = i.borderColor), n }, getPointBorderWidth: function (t, e) { var n = this.chart.options.elements.point.borderWidth, i = this.getDataset(), a = t.custom || {}; return isNaN(a.borderWidth) ? !isNaN(i.pointBorderWidth) || r.isArray(i.pointBorderWidth) ? n = r.valueAtIndexOrDefault(i.pointBorderWidth, e, n) : isNaN(i.borderWidth) || (n = i.borderWidth) : n = a.borderWidth, n }, updateElement: function (t, e, n) { var i, a, o = this, s = o.getMeta(), l = t.custom || {}, u = o.getDataset(), d = o.index, c = u.data[e], h = o.getScaleForId(s.yAxisID), f = o.getScaleForId(s.xAxisID), g = o.chart.options.elements.point; void 0 !== u.radius && void 0 === u.pointRadius && (u.pointRadius = u.radius), void 0 !== u.hitRadius && void 0 === u.pointHitRadius && (u.pointHitRadius = u.hitRadius), i = f.getPixelForValue("object" == typeof c ? c : NaN, e, d), a = n ? h.getBasePixel() : o.calculatePointY(c, e, d), t._xScale = f, t._yScale = h, t._datasetIndex = d, t._index = e, t._model = { x: i, y: a, skip: l.skip || isNaN(i) || isNaN(a), radius: l.radius || r.valueAtIndexOrDefault(u.pointRadius, e, g.radius), pointStyle: l.pointStyle || r.valueAtIndexOrDefault(u.pointStyle, e, g.pointStyle), backgroundColor: o.getPointBackgroundColor(t, e), borderColor: o.getPointBorderColor(t, e), borderWidth: o.getPointBorderWidth(t, e), tension: s.dataset._model ? s.dataset._model.tension : 0, steppedLine: !!s.dataset._model && s.dataset._model.steppedLine, hitRadius: l.hitRadius || r.valueAtIndexOrDefault(u.pointHitRadius, e, g.hitRadius) } }, calculatePointY: function (t, e, n) { var i, a, r, o = this, s = o.chart, l = o.getMeta(), u = o.getScaleForId(l.yAxisID), d = 0, c = 0; if (u.options.stacked) { for (i = 0; i < n; i++)if (a = s.data.datasets[i], "line" === (r = s.getDatasetMeta(i)).type && r.yAxisID === u.id && s.isDatasetVisible(i)) { var h = Number(u.getRightValue(a.data[e])); h < 0 ? c += h || 0 : d += h || 0 } var f = Number(u.getRightValue(t)); return f < 0 ? u.getPixelForValue(c + f) : u.getPixelForValue(d + f) } return u.getPixelForValue(t) }, updateBezierControlPoints: function () { function t(t, e, n) { return Math.max(Math.min(t, n), e) } var e, n, i, a, o = this, s = o.getMeta(), l = o.chart.chartArea, u = s.data || []; if (s.dataset._model.spanGaps && (u = u.filter(function (t) { return !t._model.skip })), "monotone" === s.dataset._model.cubicInterpolationMode) r.splineCurveMonotone(u); else for (e = 0, n = u.length; e < n; ++e)i = u[e]._model, a = r.splineCurve(r.previousItem(u, e)._model, i, r.nextItem(u, e)._model, s.dataset._model.tension), i.controlPointPreviousX = a.previous.x, i.controlPointPreviousY = a.previous.y, i.controlPointNextX = a.next.x, i.controlPointNextY = a.next.y; if (o.chart.options.elements.line.capBezierPoints) for (e = 0, n = u.length; e < n; ++e)(i = u[e]._model).controlPointPreviousX = t(i.controlPointPreviousX, l.left, l.right), i.controlPointPreviousY = t(i.controlPointPreviousY, l.top, l.bottom), i.controlPointNextX = t(i.controlPointNextX, l.left, l.right), i.controlPointNextY = t(i.controlPointNextY, l.top, l.bottom) }, draw: function () { var t = this, n = t.chart, i = t.getMeta(), a = i.data || [], o = n.chartArea, s = a.length, l = 0; for (r.canvas.clipArea(n.ctx, o), e(t.getDataset(), n.options) && i.dataset.draw(), r.canvas.unclipArea(n.ctx); l < s; ++l)a[l].draw(o) }, setHoverStyle: function (t) { var e = this.chart.data.datasets[t._datasetIndex], n = t._index, i = t.custom || {}, a = t._model; a.radius = i.hoverRadius || r.valueAtIndexOrDefault(e.pointHoverRadius, n, this.chart.options.elements.point.hoverRadius), a.backgroundColor = i.hoverBackgroundColor || r.valueAtIndexOrDefault(e.pointHoverBackgroundColor, n, r.getHoverColor(a.backgroundColor)), a.borderColor = i.hoverBorderColor || r.valueAtIndexOrDefault(e.pointHoverBorderColor, n, r.getHoverColor(a.borderColor)), a.borderWidth = i.hoverBorderWidth || r.valueAtIndexOrDefault(e.pointHoverBorderWidth, n, a.borderWidth) }, removeHoverStyle: function (t) { var e = this, n = e.chart.data.datasets[t._datasetIndex], i = t._index, a = t.custom || {}, o = t._model; void 0 !== n.radius && void 0 === n.pointRadius && (n.pointRadius = n.radius), o.radius = a.radius || r.valueAtIndexOrDefault(n.pointRadius, i, e.chart.options.elements.point.radius), o.backgroundColor = e.getPointBackgroundColor(t, i), o.borderColor = e.getPointBorderColor(t, i), o.borderWidth = e.getPointBorderWidth(t, i) } }) } }, { 25: 25, 40: 40, 45: 45 }], 19: [function (t, e, n) { "use strict"; var i = t(25), a = t(40), r = t(45); i._set("polarArea", { scale: { type: "radialLinear", angleLines: { display: !1 }, gridLines: { circular: !0 }, pointLabels: { display: !1 }, ticks: { beginAtZero: !0 } }, animation: { animateRotate: !0, animateScale: !0 }, startAngle: -.5 * Math.PI, legendCallback: function (t) { var e = []; e.push('<ul class="' + t.id + '-legend">'); var n = t.data, i = n.datasets, a = n.labels; if (i.length) for (var r = 0; r < i[0].data.length; ++r)e.push('<li><span style="background-color:' + i[0].backgroundColor[r] + '"></span>'), a[r] && e.push(a[r]), e.push("</li>"); return e.push("</ul>"), e.join("") }, legend: { labels: { generateLabels: function (t) { var e = t.data; return e.labels.length && e.datasets.length ? e.labels.map(function (n, i) { var a = t.getDatasetMeta(0), o = e.datasets[0], s = a.data[i].custom || {}, l = r.valueAtIndexOrDefault, u = t.options.elements.arc; return { text: n, fillStyle: s.backgroundColor ? s.backgroundColor : l(o.backgroundColor, i, u.backgroundColor), strokeStyle: s.borderColor ? s.borderColor : l(o.borderColor, i, u.borderColor), lineWidth: s.borderWidth ? s.borderWidth : l(o.borderWidth, i, u.borderWidth), hidden: isNaN(o.data[i]) || a.data[i].hidden, index: i } }) : [] } }, onClick: function (t, e) { var n, i, a, r = e.index, o = this.chart; for (n = 0, i = (o.data.datasets || []).length; n < i; ++n)(a = o.getDatasetMeta(n)).data[r].hidden = !a.data[r].hidden; o.update() } }, tooltips: { callbacks: { title: function () { return "" }, label: function (t, e) { return e.labels[t.index] + ": " + t.yLabel } } } }), e.exports = function (t) { t.controllers.polarArea = t.DatasetController.extend({ dataElementType: a.Arc, linkScales: r.noop, update: function (t) { var e = this, n = e.chart, i = n.chartArea, a = e.getMeta(), o = n.options, s = o.elements.arc, l = Math.min(i.right - i.left, i.bottom - i.top); n.outerRadius = Math.max((l - s.borderWidth / 2) / 2, 0), n.innerRadius = Math.max(o.cutoutPercentage ? n.outerRadius / 100 * o.cutoutPercentage : 1, 0), n.radiusLength = (n.outerRadius - n.innerRadius) / n.getVisibleDatasetCount(), e.outerRadius = n.outerRadius - n.radiusLength * e.index, e.innerRadius = e.outerRadius - n.radiusLength, a.count = e.countVisibleElements(), r.each(a.data, function (n, i) { e.updateElement(n, i, t) }) }, updateElement: function (t, e, n) { for (var i = this, a = i.chart, o = i.getDataset(), s = a.options, l = s.animation, u = a.scale, d = a.data.labels, c = i.calculateCircumference(o.data[e]), h = u.xCenter, f = u.yCenter, g = 0, m = i.getMeta(), p = 0; p < e; ++p)isNaN(o.data[p]) || m.data[p].hidden || ++g; var v = s.startAngle, y = t.hidden ? 0 : u.getDistanceFromCenterForValue(o.data[e]), b = v + c * g, x = b + (t.hidden ? 0 : c), _ = l.animateScale ? 0 : u.getDistanceFromCenterForValue(o.data[e]); r.extend(t, { _datasetIndex: i.index, _index: e, _scale: u, _model: { x: h, y: f, innerRadius: 0, outerRadius: n ? _ : y, startAngle: n && l.animateRotate ? v : b, endAngle: n && l.animateRotate ? v : x, label: r.valueAtIndexOrDefault(d, e, d[e]) } }), i.removeHoverStyle(t), t.pivot() }, removeHoverStyle: function (e) { t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc) }, countVisibleElements: function () { var t = this.getDataset(), e = this.getMeta(), n = 0; return r.each(e.data, function (e, i) { isNaN(t.data[i]) || e.hidden || n++ }), n }, calculateCircumference: function (t) { var e = this.getMeta().count; return e > 0 && !isNaN(t) ? 2 * Math.PI / e : 0 } }) } }, { 25: 25, 40: 40, 45: 45 }], 20: [function (t, e, n) { "use strict"; var i = t(25), a = t(40), r = t(45); i._set("radar", { scale: { type: "radialLinear" }, elements: { line: { tension: 0 } } }), e.exports = function (t) { t.controllers.radar = t.DatasetController.extend({ datasetElementType: a.Line, dataElementType: a.Point, linkScales: r.noop, update: function (t) { var e = this, n = e.getMeta(), i = n.dataset, a = n.data, o = i.custom || {}, s = e.getDataset(), l = e.chart.options.elements.line, u = e.chart.scale; void 0 !== s.tension && void 0 === s.lineTension && (s.lineTension = s.tension), r.extend(n.dataset, { _datasetIndex: e.index, _scale: u, _children: a, _loop: !0, _model: { tension: o.tension ? o.tension : r.valueOrDefault(s.lineTension, l.tension), backgroundColor: o.backgroundColor ? o.backgroundColor : s.backgroundColor || l.backgroundColor, borderWidth: o.borderWidth ? o.borderWidth : s.borderWidth || l.borderWidth, borderColor: o.borderColor ? o.borderColor : s.borderColor || l.borderColor, fill: o.fill ? o.fill : void 0 !== s.fill ? s.fill : l.fill, borderCapStyle: o.borderCapStyle ? o.borderCapStyle : s.borderCapStyle || l.borderCapStyle, borderDash: o.borderDash ? o.borderDash : s.borderDash || l.borderDash, borderDashOffset: o.borderDashOffset ? o.borderDashOffset : s.borderDashOffset || l.borderDashOffset, borderJoinStyle: o.borderJoinStyle ? o.borderJoinStyle : s.borderJoinStyle || l.borderJoinStyle } }), n.dataset.pivot(), r.each(a, function (n, i) { e.updateElement(n, i, t) }, e), e.updateBezierControlPoints() }, updateElement: function (t, e, n) { var i = this, a = t.custom || {}, o = i.getDataset(), s = i.chart.scale, l = i.chart.options.elements.point, u = s.getPointPositionForValue(e, o.data[e]); void 0 !== o.radius && void 0 === o.pointRadius && (o.pointRadius = o.radius), void 0 !== o.hitRadius && void 0 === o.pointHitRadius && (o.pointHitRadius = o.hitRadius), r.extend(t, { _datasetIndex: i.index, _index: e, _scale: s, _model: { x: n ? s.xCenter : u.x, y: n ? s.yCenter : u.y, tension: a.tension ? a.tension : r.valueOrDefault(o.lineTension, i.chart.options.elements.line.tension), radius: a.radius ? a.radius : r.valueAtIndexOrDefault(o.pointRadius, e, l.radius), backgroundColor: a.backgroundColor ? a.backgroundColor : r.valueAtIndexOrDefault(o.pointBackgroundColor, e, l.backgroundColor), borderColor: a.borderColor ? a.borderColor : r.valueAtIndexOrDefault(o.pointBorderColor, e, l.borderColor), borderWidth: a.borderWidth ? a.borderWidth : r.valueAtIndexOrDefault(o.pointBorderWidth, e, l.borderWidth), pointStyle: a.pointStyle ? a.pointStyle : r.valueAtIndexOrDefault(o.pointStyle, e, l.pointStyle), hitRadius: a.hitRadius ? a.hitRadius : r.valueAtIndexOrDefault(o.pointHitRadius, e, l.hitRadius) } }), t._model.skip = a.skip ? a.skip : isNaN(t._model.x) || isNaN(t._model.y) }, updateBezierControlPoints: function () { var t = this.chart.chartArea, e = this.getMeta(); r.each(e.data, function (n, i) { var a = n._model, o = r.splineCurve(r.previousItem(e.data, i, !0)._model, a, r.nextItem(e.data, i, !0)._model, a.tension); a.controlPointPreviousX = Math.max(Math.min(o.previous.x, t.right), t.left), a.controlPointPreviousY = Math.max(Math.min(o.previous.y, t.bottom), t.top), a.controlPointNextX = Math.max(Math.min(o.next.x, t.right), t.left), a.controlPointNextY = Math.max(Math.min(o.next.y, t.bottom), t.top), n.pivot() }) }, setHoverStyle: function (t) { var e = this.chart.data.datasets[t._datasetIndex], n = t.custom || {}, i = t._index, a = t._model; a.radius = n.hoverRadius ? n.hoverRadius : r.valueAtIndexOrDefault(e.pointHoverRadius, i, this.chart.options.elements.point.hoverRadius), a.backgroundColor = n.hoverBackgroundColor ? n.hoverBackgroundColor : r.valueAtIndexOrDefault(e.pointHoverBackgroundColor, i, r.getHoverColor(a.backgroundColor)), a.borderColor = n.hoverBorderColor ? n.hoverBorderColor : r.valueAtIndexOrDefault(e.pointHoverBorderColor, i, r.getHoverColor(a.borderColor)), a.borderWidth = n.hoverBorderWidth ? n.hoverBorderWidth : r.valueAtIndexOrDefault(e.pointHoverBorderWidth, i, a.borderWidth) }, removeHoverStyle: function (t) { var e = this.chart.data.datasets[t._datasetIndex], n = t.custom || {}, i = t._index, a = t._model, o = this.chart.options.elements.point; a.radius = n.radius ? n.radius : r.valueAtIndexOrDefault(e.pointRadius, i, o.radius), a.backgroundColor = n.backgroundColor ? n.backgroundColor : r.valueAtIndexOrDefault(e.pointBackgroundColor, i, o.backgroundColor), a.borderColor = n.borderColor ? n.borderColor : r.valueAtIndexOrDefault(e.pointBorderColor, i, o.borderColor), a.borderWidth = n.borderWidth ? n.borderWidth : r.valueAtIndexOrDefault(e.pointBorderWidth, i, o.borderWidth) } }) } }, { 25: 25, 40: 40, 45: 45 }], 21: [function (t, e, n) { "use strict"; t(25)._set("scatter", { hover: { mode: "single" }, scales: { xAxes: [{ id: "x-axis-1", type: "linear", position: "bottom" }], yAxes: [{ id: "y-axis-1", type: "linear", position: "left" }] }, showLines: !1, tooltips: { callbacks: { title: function () { return "" }, label: function (t) { return "(" + t.xLabel + ", " + t.yLabel + ")" } } } }), e.exports = function (t) { t.controllers.scatter = t.controllers.line } }, { 25: 25 }], 22: [function (t, e, n) { "use strict"; var i = t(25), a = t(26), r = t(45); i._set("global", { animation: { duration: 1e3, easing: "easeOutQuart", onProgress: r.noop, onComplete: r.noop } }), e.exports = function (t) { t.Animation = a.extend({ chart: null, currentStep: 0, numSteps: 60, easing: "", render: null, onAnimationProgress: null, onAnimationComplete: null }), t.animationService = { frameDuration: 17, animations: [], dropFrames: 0, request: null, addAnimation: function (t, e, n, i) { var a, r, o = this.animations; for (e.chart = t, i || (t.animating = !0), a = 0, r = o.length; a < r; ++a)if (o[a].chart === t) return void (o[a] = e); o.push(e), 1 === o.length && this.requestAnimationFrame() }, cancelAnimation: function (t) { var e = r.findIndex(this.animations, function (e) { return e.chart === t }); -1 !== e && (this.animations.splice(e, 1), t.animating = !1) }, requestAnimationFrame: function () { var t = this; null === t.request && (t.request = r.requestAnimFrame.call(window, function () { t.request = null, t.startDigest() })) }, startDigest: function () { var t = this, e = Date.now(), n = 0; t.dropFrames > 1 && (n = Math.floor(t.dropFrames), t.dropFrames = t.dropFrames % 1), t.advance(1 + n); var i = Date.now(); t.dropFrames += (i - e) / t.frameDuration, t.animations.length > 0 && t.requestAnimationFrame() }, advance: function (t) { for (var e, n, i = this.animations, a = 0; a < i.length;)n = (e = i[a]).chart, e.currentStep = (e.currentStep || 0) + t, e.currentStep = Math.min(e.currentStep, e.numSteps), r.callback(e.render, [n, e], n), r.callback(e.onAnimationProgress, [e], n), e.currentStep >= e.numSteps ? (r.callback(e.onAnimationComplete, [e], n), n.animating = !1, i.splice(a, 1)) : ++a } }, Object.defineProperty(t.Animation.prototype, "animationObject", { get: function () { return this } }), Object.defineProperty(t.Animation.prototype, "chartInstance", { get: function () { return this.chart }, set: function (t) { this.chart = t } }) } }, { 25: 25, 26: 26, 45: 45 }], 23: [function (t, e, n) { "use strict"; var i = t(25), a = t(45), r = t(28), o = t(48); e.exports = function (t) { function e(t) { var e = (t = t || {}).data = t.data || {}; return e.datasets = e.datasets || [], e.labels = e.labels || [], t.options = a.configMerge(i.global, i[t.type], t.options || {}), t } function n(t) { var e = t.options; e.scale ? t.scale.options = e.scale : e.scales && e.scales.xAxes.concat(e.scales.yAxes).forEach(function (e) { t.scales[e.id].options = e }), t.tooltip._options = e.tooltips } function s(t) { return "top" === t || "bottom" === t } var l = t.plugins; t.types = {}, t.instances = {}, t.controllers = {}, a.extend(t.prototype, { construct: function (n, i) { var r = this; i = e(i); var s = o.acquireContext(n, i), l = s && s.canvas, u = l && l.height, d = l && l.width; r.id = a.uid(), r.ctx = s, r.canvas = l, r.config = i, r.width = d, r.height = u, r.aspectRatio = u ? d / u : null, r.options = i.options, r._bufferedRender = !1, r.chart = r, r.controller = r, t.instances[r.id] = r, Object.defineProperty(r, "data", { get: function () { return r.config.data }, set: function (t) { r.config.data = t } }), s && l ? (r.initialize(), r.update()) : console.error("Failed to create chart: can't acquire context from the given item") }, initialize: function () { var t = this; return l.notify(t, "beforeInit"), a.retinaScale(t, t.options.devicePixelRatio), t.bindEvents(), t.options.responsive && t.resize(!0), t.ensureScalesHaveIDs(), t.buildScales(), t.initToolTip(), l.notify(t, "afterInit"), t }, clear: function () { return a.canvas.clear(this), this }, stop: function () { return t.animationService.cancelAnimation(this), this }, resize: function (t) { var e = this, n = e.options, i = e.canvas, r = n.maintainAspectRatio && e.aspectRatio || null, o = Math.max(0, Math.floor(a.getMaximumWidth(i))), s = Math.max(0, Math.floor(r ? o / r : a.getMaximumHeight(i))); if ((e.width !== o || e.height !== s) && (i.width = e.width = o, i.height = e.height = s, i.style.width = o + "px", i.style.height = s + "px", a.retinaScale(e, n.devicePixelRatio), !t)) { var u = { width: o, height: s }; l.notify(e, "resize", [u]), e.options.onResize && e.options.onResize(e, u), e.stop(), e.update(e.options.responsiveAnimationDuration) } }, ensureScalesHaveIDs: function () { var t = this.options, e = t.scales || {}, n = t.scale; a.each(e.xAxes, function (t, e) { t.id = t.id || "x-axis-" + e }), a.each(e.yAxes, function (t, e) { t.id = t.id || "y-axis-" + e }), n && (n.id = n.id || "scale") }, buildScales: function () { var e = this, n = e.options, i = e.scales = {}, r = []; n.scales && (r = r.concat((n.scales.xAxes || []).map(function (t) { return { options: t, dtype: "category", dposition: "bottom" } }), (n.scales.yAxes || []).map(function (t) { return { options: t, dtype: "linear", dposition: "left" } }))), n.scale && r.push({ options: n.scale, dtype: "radialLinear", isDefault: !0, dposition: "chartArea" }), a.each(r, function (n) { var r = n.options, o = a.valueOrDefault(r.type, n.dtype), l = t.scaleService.getScaleConstructor(o); if (l) { s(r.position) !== s(n.dposition) && (r.position = n.dposition); var u = new l({ id: r.id, options: r, ctx: e.ctx, chart: e }); i[u.id] = u, u.mergeTicksOptions(), n.isDefault && (e.scale = u) } }), t.scaleService.addScalesToLayout(this) }, buildOrUpdateControllers: function () { var e = this, n = [], i = []; return a.each(e.data.datasets, function (a, r) { var o = e.getDatasetMeta(r), s = a.type || e.config.type; if (o.type && o.type !== s && (e.destroyDatasetMeta(r), o = e.getDatasetMeta(r)), o.type = s, n.push(o.type), o.controller) o.controller.updateIndex(r); else { var l = t.controllers[o.type]; if (void 0 === l) throw new Error('"' + o.type + '" is not a chart type.'); o.controller = new l(e, r), i.push(o.controller) } }, e), i }, resetElements: function () { var t = this; a.each(t.data.datasets, function (e, n) { t.getDatasetMeta(n).controller.reset() }, t) }, reset: function () { this.resetElements(), this.tooltip.initialize() }, update: function (t) { var e = this; if (t && "object" == typeof t || (t = { duration: t, lazy: arguments[1] }), n(e), !1 !== l.notify(e, "beforeUpdate")) { e.tooltip._data = e.data; var i = e.buildOrUpdateControllers(); a.each(e.data.datasets, function (t, n) { e.getDatasetMeta(n).controller.buildOrUpdateElements() }, e), e.updateLayout(), a.each(i, function (t) { t.reset() }), e.updateDatasets(), e.tooltip.initialize(), e.lastActive = [], l.notify(e, "afterUpdate"), e._bufferedRender ? e._bufferedRequest = { duration: t.duration, easing: t.easing, lazy: t.lazy } : e.render(t) } }, updateLayout: function () { var e = this; !1 !== l.notify(e, "beforeLayout") && (t.layoutService.update(this, this.width, this.height), l.notify(e, "afterScaleUpdate"), l.notify(e, "afterLayout")) }, updateDatasets: function () { var t = this; if (!1 !== l.notify(t, "beforeDatasetsUpdate")) { for (var e = 0, n = t.data.datasets.length; e < n; ++e)t.updateDataset(e); l.notify(t, "afterDatasetsUpdate") } }, updateDataset: function (t) { var e = this, n = e.getDatasetMeta(t), i = { meta: n, index: t }; !1 !== l.notify(e, "beforeDatasetUpdate", [i]) && (n.controller.update(), l.notify(e, "afterDatasetUpdate", [i])) }, render: function (e) { var n = this; e && "object" == typeof e || (e = { duration: e, lazy: arguments[1] }); var i = e.duration, r = e.lazy; if (!1 !== l.notify(n, "beforeRender")) { var o = n.options.animation, s = function (t) { l.notify(n, "afterRender"), a.callback(o && o.onComplete, [t], n) }; if (o && (void 0 !== i && 0 !== i || void 0 === i && 0 !== o.duration)) { var u = new t.Animation({ numSteps: (i || o.duration) / 16.66, easing: e.easing || o.easing, render: function (t, e) { var n = a.easing.effects[e.easing], i = e.currentStep, r = i / e.numSteps; t.draw(n(r), r, i) }, onAnimationProgress: o.onProgress, onAnimationComplete: s }); t.animationService.addAnimation(n, u, i, r) } else n.draw(), s(new t.Animation({ numSteps: 0, chart: n })); return n } }, draw: function (t) { var e = this; e.clear(), a.isNullOrUndef(t) && (t = 1), e.transition(t), !1 !== l.notify(e, "beforeDraw", [t]) && (a.each(e.boxes, function (t) { t.draw(e.chartArea) }, e), e.scale && e.scale.draw(), e.drawDatasets(t), e._drawTooltip(t), l.notify(e, "afterDraw", [t])) }, transition: function (t) { for (var e = this, n = 0, i = (e.data.datasets || []).length; n < i; ++n)e.isDatasetVisible(n) && e.getDatasetMeta(n).controller.transition(t); e.tooltip.transition(t) }, drawDatasets: function (t) { var e = this; if (!1 !== l.notify(e, "beforeDatasetsDraw", [t])) { for (var n = (e.data.datasets || []).length - 1; n >= 0; --n)e.isDatasetVisible(n) && e.drawDataset(n, t); l.notify(e, "afterDatasetsDraw", [t]) } }, drawDataset: function (t, e) { var n = this, i = n.getDatasetMeta(t), a = { meta: i, index: t, easingValue: e }; !1 !== l.notify(n, "beforeDatasetDraw", [a]) && (i.controller.draw(e), l.notify(n, "afterDatasetDraw", [a])) }, _drawTooltip: function (t) { var e = this, n = e.tooltip, i = { tooltip: n, easingValue: t }; !1 !== l.notify(e, "beforeTooltipDraw", [i]) && (n.draw(), l.notify(e, "afterTooltipDraw", [i])) }, getElementAtEvent: function (t) { return r.modes.single(this, t) }, getElementsAtEvent: function (t) { return r.modes.label(this, t, { intersect: !0 }) }, getElementsAtXAxis: function (t) { return r.modes["x-axis"](this, t, { intersect: !0 }) }, getElementsAtEventForMode: function (t, e, n) { var i = r.modes[e]; return "function" == typeof i ? i(this, t, n) : [] }, getDatasetAtEvent: function (t) { return r.modes.dataset(this, t, { intersect: !0 }) }, getDatasetMeta: function (t) { var e = this, n = e.data.datasets[t]; n._meta || (n._meta = {}); var i = n._meta[e.id]; return i || (i = n._meta[e.id] = { type: null, data: [], dataset: null, controller: null, hidden: null, xAxisID: null, yAxisID: null }), i }, getVisibleDatasetCount: function () { for (var t = 0, e = 0, n = this.data.datasets.length; e < n; ++e)this.isDatasetVisible(e) && t++; return t }, isDatasetVisible: function (t) { var e = this.getDatasetMeta(t); return "boolean" == typeof e.hidden ? !e.hidden : !this.data.datasets[t].hidden }, generateLegend: function () { return this.options.legendCallback(this) }, destroyDatasetMeta: function (t) { var e = this.id, n = this.data.datasets[t], i = n._meta && n._meta[e]; i && (i.controller.destroy(), delete n._meta[e]) }, destroy: function () { var e, n, i = this, r = i.canvas; for (i.stop(), e = 0, n = i.data.datasets.length; e < n; ++e)i.destroyDatasetMeta(e); r && (i.unbindEvents(), a.canvas.clear(i), o.releaseContext(i.ctx), i.canvas = null, i.ctx = null), l.notify(i, "destroy"), delete t.instances[i.id] }, toBase64Image: function () { return this.canvas.toDataURL.apply(this.canvas, arguments) }, initToolTip: function () { var e = this; e.tooltip = new t.Tooltip({ _chart: e, _chartInstance: e, _data: e.data, _options: e.options.tooltips }, e) }, bindEvents: function () { var t = this, e = t._listeners = {}, n = function () { t.eventHandler.apply(t, arguments) }; a.each(t.options.events, function (i) { o.addEventListener(t, i, n), e[i] = n }), t.options.responsive && (n = function () { t.resize() }, o.addEventListener(t, "resize", n), e.resize = n) }, unbindEvents: function () { var t = this, e = t._listeners; e && (delete t._listeners, a.each(e, function (e, n) { o.removeEventListener(t, n, e) })) }, updateHoverStyle: function (t, e, n) { var i, a, r, o = n ? "setHoverStyle" : "removeHoverStyle"; for (a = 0, r = t.length; a < r; ++a)(i = t[a]) && this.getDatasetMeta(i._datasetIndex).controller[o](i) }, eventHandler: function (t) { var e = this, n = e.tooltip; if (!1 !== l.notify(e, "beforeEvent", [t])) { e._bufferedRender = !0, e._bufferedRequest = null; var i = e.handleEvent(t); i |= n && n.handleEvent(t), l.notify(e, "afterEvent", [t]); var a = e._bufferedRequest; return a ? e.render(a) : i && !e.animating && (e.stop(), e.render(e.options.hover.animationDuration, !0)), e._bufferedRender = !1, e._bufferedRequest = null, e } }, handleEvent: function (t) { var e = this, n = e.options || {}, i = n.hover, r = !1; return e.lastActive = e.lastActive || [], "mouseout" === t.type ? e.active = [] : e.active = e.getElementsAtEventForMode(t, i.mode, i), a.callback(n.onHover || n.hover.onHover, [t.native, e.active], e), "mouseup" !== t.type && "click" !== t.type || n.onClick && n.onClick.call(e, t.native, e.active), e.lastActive.length && e.updateHoverStyle(e.lastActive, i.mode, !1), e.active.length && i.mode && e.updateHoverStyle(e.active, i.mode, !0), r = !a.arrayEquals(e.active, e.lastActive), e.lastActive = e.active, r } }), t.Controller = t } }, { 25: 25, 28: 28, 45: 45, 48: 48 }], 24: [function (t, e, n) { "use strict"; var i = t(45); e.exports = function (t) { function e(t, e) { t._chartjs ? t._chartjs.listeners.push(e) : (Object.defineProperty(t, "_chartjs", { configurable: !0, enumerable: !1, value: { listeners: [e] } }), a.forEach(function (e) { var n = "onData" + e.charAt(0).toUpperCase() + e.slice(1), a = t[e]; Object.defineProperty(t, e, { configurable: !0, enumerable: !1, value: function () { var e = Array.prototype.slice.call(arguments), r = a.apply(this, e); return i.each(t._chartjs.listeners, function (t) { "function" == typeof t[n] && t[n].apply(t, e) }), r } }) })) } function n(t, e) { var n = t._chartjs; if (n) { var i = n.listeners, r = i.indexOf(e); -1 !== r && i.splice(r, 1), i.length > 0 || (a.forEach(function (e) { delete t[e] }), delete t._chartjs) } } var a = ["push", "pop", "shift", "splice", "unshift"]; t.DatasetController = function (t, e) { this.initialize(t, e) }, i.extend(t.DatasetController.prototype, { datasetElementType: null, dataElementType: null, initialize: function (t, e) { var n = this; n.chart = t, n.index = e, n.linkScales(), n.addElements() }, updateIndex: function (t) { this.index = t }, linkScales: function () { var t = this, e = t.getMeta(), n = t.getDataset(); null === e.xAxisID && (e.xAxisID = n.xAxisID || t.chart.options.scales.xAxes[0].id), null === e.yAxisID && (e.yAxisID = n.yAxisID || t.chart.options.scales.yAxes[0].id) }, getDataset: function () { return this.chart.data.datasets[this.index] }, getMeta: function () { return this.chart.getDatasetMeta(this.index) }, getScaleForId: function (t) { return this.chart.scales[t] }, reset: function () { this.update(!0) }, destroy: function () { this._data && n(this._data, this) }, createMetaDataset: function () { var t = this, e = t.datasetElementType; return e && new e({ _chart: t.chart, _datasetIndex: t.index }) }, createMetaData: function (t) { var e = this, n = e.dataElementType; return n && new n({ _chart: e.chart, _datasetIndex: e.index, _index: t }) }, addElements: function () { var t, e, n = this, i = n.getMeta(), a = n.getDataset().data || [], r = i.data; for (t = 0, e = a.length; t < e; ++t)r[t] = r[t] || n.createMetaData(t); i.dataset = i.dataset || n.createMetaDataset() }, addElementAndReset: function (t) { var e = this.createMetaData(t); this.getMeta().data.splice(t, 0, e), this.updateElement(e, t, !0) }, buildOrUpdateElements: function () { var t = this, i = t.getDataset(), a = i.data || (i.data = []); t._data !== a && (t._data && n(t._data, t), e(a, t), t._data = a), t.resyncElements() }, update: i.noop, transition: function (t) { for (var e = this.getMeta(), n = e.data || [], i = n.length, a = 0; a < i; ++a)n[a].transition(t); e.dataset && e.dataset.transition(t) }, draw: function () { var t = this.getMeta(), e = t.data || [], n = e.length, i = 0; for (t.dataset && t.dataset.draw(); i < n; ++i)e[i].draw() }, removeHoverStyle: function (t, e) { var n = this.chart.data.datasets[t._datasetIndex], a = t._index, r = t.custom || {}, o = i.valueAtIndexOrDefault, s = t._model; s.backgroundColor = r.backgroundColor ? r.backgroundColor : o(n.backgroundColor, a, e.backgroundColor), s.borderColor = r.borderColor ? r.borderColor : o(n.borderColor, a, e.borderColor), s.borderWidth = r.borderWidth ? r.borderWidth : o(n.borderWidth, a, e.borderWidth) }, setHoverStyle: function (t) { var e = this.chart.data.datasets[t._datasetIndex], n = t._index, a = t.custom || {}, r = i.valueAtIndexOrDefault, o = i.getHoverColor, s = t._model; s.backgroundColor = a.hoverBackgroundColor ? a.hoverBackgroundColor : r(e.hoverBackgroundColor, n, o(s.backgroundColor)), s.borderColor = a.hoverBorderColor ? a.hoverBorderColor : r(e.hoverBorderColor, n, o(s.borderColor)), s.borderWidth = a.hoverBorderWidth ? a.hoverBorderWidth : r(e.hoverBorderWidth, n, s.borderWidth) }, resyncElements: function () { var t = this, e = t.getMeta(), n = t.getDataset().data, i = e.data.length, a = n.length; a < i ? e.data.splice(a, i - a) : a > i && t.insertElements(i, a - i) }, insertElements: function (t, e) { for (var n = 0; n < e; ++n)this.addElementAndReset(t + n) }, onDataPush: function () { this.insertElements(this.getDataset().data.length - 1, arguments.length) }, onDataPop: function () { this.getMeta().data.pop() }, onDataShift: function () { this.getMeta().data.shift() }, onDataSplice: function (t, e) { this.getMeta().data.splice(t, e), this.insertElements(t, arguments.length - 2) }, onDataUnshift: function () { this.insertElements(0, arguments.length) } }), t.DatasetController.extend = i.inherits } }, { 45: 45 }], 25: [function (t, e, n) { "use strict"; var i = t(45); e.exports = { _set: function (t, e) { return i.merge(this[t] || (this[t] = {}), e) } } }, { 45: 45 }], 26: [function (t, e, n) { "use strict"; function i(t, e, n, i) { var r, o, s, l, u, d, c, h, f, g = Object.keys(n); for (r = 0, o = g.length; r < o; ++r)if (s = g[r], d = n[s], e.hasOwnProperty(s) || (e[s] = d), (l = e[s]) !== d && "_" !== s[0]) { if (t.hasOwnProperty(s) || (t[s] = l), u = t[s], (c = typeof d) === typeof u) if ("string" === c) { if ((h = a(u)).valid && (f = a(d)).valid) { e[s] = f.mix(h, i).rgbString(); continue } } else if ("number" === c && isFinite(u) && isFinite(d)) { e[s] = u + (d - u) * i; continue } e[s] = d } } var a = t(2), r = t(45), o = function (t) { r.extend(this, t), this.initialize.apply(this, arguments) }; r.extend(o.prototype, { initialize: function () { this.hidden = !1 }, pivot: function () { var t = this; return t._view || (t._view = r.clone(t._model)), t._start = {}, t }, transition: function (t) { var e = this, n = e._model, a = e._start, r = e._view; return n && 1 !== t ? (r || (r = e._view = {}), a || (a = e._start = {}), i(a, r, n, t), e) : (e._view = n, e._start = null, e) }, tooltipPosition: function () { return { x: this._model.x, y: this._model.y } }, hasValue: function () { return r.isNumber(this._model.x) && r.isNumber(this._model.y) } }), o.extend = r.inherits, e.exports = o }, { 2: 2, 45: 45 }], 27: [function (t, e, n) { "use strict"; var i = t(2), a = t(25), r = t(45); e.exports = function (t) { function e(t, e, n) { var i; return "string" == typeof t ? (i = parseInt(t, 10), -1 !== t.indexOf("%") && (i = i / 100 * e.parentNode[n])) : i = t, i } function n(t) { return void 0 !== t && null !== t && "none" !== t } function o(t, i, a) { var r = document.defaultView, o = t.parentNode, s = r.getComputedStyle(t)[i], l = r.getComputedStyle(o)[i], u = n(s), d = n(l), c = Number.POSITIVE_INFINITY; return u || d ? Math.min(u ? e(s, t, a) : c, d ? e(l, o, a) : c) : "none" } r.configMerge = function () { return r.merge(r.clone(arguments[0]), [].slice.call(arguments, 1), { merger: function (e, n, i, a) { var o = n[e] || {}, s = i[e]; "scales" === e ? n[e] = r.scaleMerge(o, s) : "scale" === e ? n[e] = r.merge(o, [t.scaleService.getScaleDefaults(s.type), s]) : r._merger(e, n, i, a) } }) }, r.scaleMerge = function () { return r.merge(r.clone(arguments[0]), [].slice.call(arguments, 1), { merger: function (e, n, i, a) { if ("xAxes" === e || "yAxes" === e) { var o, s, l, u = i[e].length; for (n[e] || (n[e] = []), o = 0; o < u; ++o)l = i[e][o], s = r.valueOrDefault(l.type, "xAxes" === e ? "category" : "linear"), o >= n[e].length && n[e].push({}), !n[e][o].type || l.type && l.type !== n[e][o].type ? r.merge(n[e][o], [t.scaleService.getScaleDefaults(s), l]) : r.merge(n[e][o], l) } else r._merger(e, n, i, a) } }) }, r.where = function (t, e) { if (r.isArray(t) && Array.prototype.filter) return t.filter(e); var n = []; return r.each(t, function (t) { e(t) && n.push(t) }), n }, r.findIndex = Array.prototype.findIndex ? function (t, e, n) { return t.findIndex(e, n) } : function (t, e, n) { n = void 0 === n ? t : n; for (var i = 0, a = t.length; i < a; ++i)if (e.call(n, t[i], i, t)) return i; return -1 }, r.findNextWhere = function (t, e, n) { r.isNullOrUndef(n) && (n = -1); for (var i = n + 1; i < t.length; i++) { var a = t[i]; if (e(a)) return a } }, r.findPreviousWhere = function (t, e, n) { r.isNullOrUndef(n) && (n = t.length); for (var i = n - 1; i >= 0; i--) { var a = t[i]; if (e(a)) return a } }, r.isNumber = function (t) { return !isNaN(parseFloat(t)) && isFinite(t) }, r.almostEquals = function (t, e, n) { return Math.abs(t - e) < n }, r.almostWhole = function (t, e) { var n = Math.round(t); return n - e < t && n + e > t }, r.max = function (t) { return t.reduce(function (t, e) { return isNaN(e) ? t : Math.max(t, e) }, Number.NEGATIVE_INFINITY) }, r.min = function (t) { return t.reduce(function (t, e) { return isNaN(e) ? t : Math.min(t, e) }, Number.POSITIVE_INFINITY) }, r.sign = Math.sign ? function (t) { return Math.sign(t) } : function (t) { return 0 == (t = +t) || isNaN(t) ? t : t > 0 ? 1 : -1 }, r.log10 = Math.log10 ? function (t) { return Math.log10(t) } : function (t) { return Math.log(t) / Math.LN10 }, r.toRadians = function (t) { return t * (Math.PI / 180) }, r.toDegrees = function (t) { return t * (180 / Math.PI) }, r.getAngleFromPoint = function (t, e) { var n = e.x - t.x, i = e.y - t.y, a = Math.sqrt(n * n + i * i), r = Math.atan2(i, n); return r < -.5 * Math.PI && (r += 2 * Math.PI), { angle: r, distance: a } }, r.distanceBetweenPoints = function (t, e) { return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)) }, r.aliasPixel = function (t) { return t % 2 == 0 ? 0 : .5 }, r.splineCurve = function (t, e, n, i) { var a = t.skip ? e : t, r = e, o = n.skip ? e : n, s = Math.sqrt(Math.pow(r.x - a.x, 2) + Math.pow(r.y - a.y, 2)), l = Math.sqrt(Math.pow(o.x - r.x, 2) + Math.pow(o.y - r.y, 2)), u = s / (s + l), d = l / (s + l), c = i * (u = isNaN(u) ? 0 : u), h = i * (d = isNaN(d) ? 0 : d); return { previous: { x: r.x - c * (o.x - a.x), y: r.y - c * (o.y - a.y) }, next: { x: r.x + h * (o.x - a.x), y: r.y + h * (o.y - a.y) } } }, r.EPSILON = Number.EPSILON || 1e-14, r.splineCurveMonotone = function (t) { var e, n, i, a, o = (t || []).map(function (t) { return { model: t._model, deltaK: 0, mK: 0 } }), s = o.length; for (e = 0; e < s; ++e)if (!(i = o[e]).model.skip) { if (n = e > 0 ? o[e - 1] : null, (a = e < s - 1 ? o[e + 1] : null) && !a.model.skip) { var l = a.model.x - i.model.x; i.deltaK = 0 !== l ? (a.model.y - i.model.y) / l : 0 } !n || n.model.skip ? i.mK = i.deltaK : !a || a.model.skip ? i.mK = n.deltaK : this.sign(n.deltaK) !== this.sign(i.deltaK) ? i.mK = 0 : i.mK = (n.deltaK + i.deltaK) / 2 } var u, d, c, h; for (e = 0; e < s - 1; ++e)i = o[e], a = o[e + 1], i.model.skip || a.model.skip || (r.almostEquals(i.deltaK, 0, this.EPSILON) ? i.mK = a.mK = 0 : (u = i.mK / i.deltaK, d = a.mK / i.deltaK, (h = Math.pow(u, 2) + Math.pow(d, 2)) <= 9 || (c = 3 / Math.sqrt(h), i.mK = u * c * i.deltaK, a.mK = d * c * i.deltaK))); var f; for (e = 0; e < s; ++e)(i = o[e]).model.skip || (n = e > 0 ? o[e - 1] : null, a = e < s - 1 ? o[e + 1] : null, n && !n.model.skip && (f = (i.model.x - n.model.x) / 3, i.model.controlPointPreviousX = i.model.x - f, i.model.controlPointPreviousY = i.model.y - f * i.mK), a && !a.model.skip && (f = (a.model.x - i.model.x) / 3, i.model.controlPointNextX = i.model.x + f, i.model.controlPointNextY = i.model.y + f * i.mK)) }, r.nextItem = function (t, e, n) { return n ? e >= t.length - 1 ? t[0] : t[e + 1] : e >= t.length - 1 ? t[t.length - 1] : t[e + 1] }, r.previousItem = function (t, e, n) { return n ? e <= 0 ? t[t.length - 1] : t[e - 1] : e <= 0 ? t[0] : t[e - 1] }, r.niceNum = function (t, e) { var n = Math.floor(r.log10(t)), i = t / Math.pow(10, n); return (e ? i < 1.5 ? 1 : i < 3 ? 2 : i < 7 ? 5 : 10 : i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * Math.pow(10, n) }, r.requestAnimFrame = "undefined" == typeof window ? function (t) { t() } : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) { return window.setTimeout(t, 1e3 / 60) }, r.getRelativePosition = function (t, e) { var n, i, a = t.originalEvent || t, o = t.currentTarget || t.srcElement, s = o.getBoundingClientRect(), l = a.touches; l && l.length > 0 ? (n = l[0].clientX, i = l[0].clientY) : (n = a.clientX, i = a.clientY); var u = parseFloat(r.getStyle(o, "padding-left")), d = parseFloat(r.getStyle(o, "padding-top")), c = parseFloat(r.getStyle(o, "padding-right")), h = parseFloat(r.getStyle(o, "padding-bottom")), f = s.right - s.left - u - c, g = s.bottom - s.top - d - h; return n = Math.round((n - s.left - u) / f * o.width / e.currentDevicePixelRatio), i = Math.round((i - s.top - d) / g * o.height / e.currentDevicePixelRatio), { x: n, y: i } }, r.getConstraintWidth = function (t) { return o(t, "max-width", "clientWidth") }, r.getConstraintHeight = function (t) { return o(t, "max-height", "clientHeight") }, r.getMaximumWidth = function (t) { var e = t.parentNode; if (!e) return t.clientWidth; var n = parseInt(r.getStyle(e, "padding-left"), 10), i = parseInt(r.getStyle(e, "padding-right"), 10), a = e.clientWidth - n - i, o = r.getConstraintWidth(t); return isNaN(o) ? a : Math.min(a, o) }, r.getMaximumHeight = function (t) { var e = t.parentNode; if (!e) return t.clientHeight; var n = parseInt(r.getStyle(e, "padding-top"), 10), i = parseInt(r.getStyle(e, "padding-bottom"), 10), a = e.clientHeight - n - i, o = r.getConstraintHeight(t); return isNaN(o) ? a : Math.min(a, o) }, r.getStyle = function (t, e) { return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e) }, r.retinaScale = function (t, e) { var n = t.currentDevicePixelRatio = e || window.devicePixelRatio || 1; if (1 !== n) { var i = t.canvas, a = t.height, r = t.width; i.height = a * n, i.width = r * n, t.ctx.scale(n, n), i.style.height = a + "px", i.style.width = r + "px" } }, r.fontString = function (t, e, n) { return e + " " + t + "px " + n }, r.longestText = function (t, e, n, i) { var a = (i = i || {}).data = i.data || {}, o = i.garbageCollect = i.garbageCollect || []; i.font !== e && (a = i.data = {}, o = i.garbageCollect = [], i.font = e), t.font = e; var s = 0; r.each(n, function (e) { void 0 !== e && null !== e && !0 !== r.isArray(e) ? s = r.measureText(t, a, o, s, e) : r.isArray(e) && r.each(e, function (e) { void 0 === e || null === e || r.isArray(e) || (s = r.measureText(t, a, o, s, e)) }) }); var l = o.length / 2; if (l > n.length) { for (var u = 0; u < l; u++)delete a[o[u]]; o.splice(0, l) } return s }, r.measureText = function (t, e, n, i, a) { var r = e[a]; return r || (r = e[a] = t.measureText(a).width, n.push(a)), r > i && (i = r), i }, r.numberOfLabelLines = function (t) { var e = 1; return r.each(t, function (t) { r.isArray(t) && t.length > e && (e = t.length) }), e }, r.color = i ? function (t) { return t instanceof CanvasGradient && (t = a.global.defaultColor), i(t) } : function (t) { return console.error("Color.js not found!"), t }, r.getHoverColor = function (t) { return t instanceof CanvasPattern ? t : r.color(t).saturate(.5).darken(.1).rgbString() } } }, { 2: 2, 25: 25, 45: 45 }], 28: [function (t, e, n) { "use strict"; function i(t, e) { return t.native ? { x: t.x, y: t.y } : u.getRelativePosition(t, e) } function a(t, e) { var n, i, a, r, o; for (i = 0, r = t.data.datasets.length; i < r; ++i)if (t.isDatasetVisible(i)) for (a = 0, o = (n = t.getDatasetMeta(i)).data.length; a < o; ++a) { var s = n.data[a]; s._view.skip || e(s) } } function r(t, e) { var n = []; return a(t, function (t) { t.inRange(e.x, e.y) && n.push(t) }), n } function o(t, e, n, i) { var r = Number.POSITIVE_INFINITY, o = []; return a(t, function (t) { if (!n || t.inRange(e.x, e.y)) { var a = t.getCenterPoint(), s = i(e, a); s < r ? (o = [t], r = s) : s === r && o.push(t) } }), o } function s(t) { var e = -1 !== t.indexOf("x"), n = -1 !== t.indexOf("y"); return function (t, i) { var a = e ? Math.abs(t.x - i.x) : 0, r = n ? Math.abs(t.y - i.y) : 0; return Math.sqrt(Math.pow(a, 2) + Math.pow(r, 2)) } } function l(t, e, n) { var a = i(e, t); n.axis = n.axis || "x"; var l = s(n.axis), u = n.intersect ? r(t, a) : o(t, a, !1, l), d = []; return u.length ? (t.data.datasets.forEach(function (e, n) { if (t.isDatasetVisible(n)) { var i = t.getDatasetMeta(n).data[u[0]._index]; i && !i._view.skip && d.push(i) } }), d) : [] } var u = t(45); e.exports = { modes: { single: function (t, e) { var n = i(e, t), r = []; return a(t, function (t) { if (t.inRange(n.x, n.y)) return r.push(t), r }), r.slice(0, 1) }, label: l, index: l, dataset: function (t, e, n) { var a = i(e, t); n.axis = n.axis || "xy"; var l = s(n.axis), u = n.intersect ? r(t, a) : o(t, a, !1, l); return u.length > 0 && (u = t.getDatasetMeta(u[0]._datasetIndex).data), u }, "x-axis": function (t, e) { return l(t, e, { intersect: !1 }) }, point: function (t, e) { return r(t, i(e, t)) }, nearest: function (t, e, n) { var a = i(e, t); n.axis = n.axis || "xy"; var r = s(n.axis), l = o(t, a, n.intersect, r); return l.length > 1 && l.sort(function (t, e) { var n = t.getArea() - e.getArea(); return 0 === n && (n = t._datasetIndex - e._datasetIndex), n }), l.slice(0, 1) }, x: function (t, e, n) { var r = i(e, t), o = [], s = !1; return a(t, function (t) { t.inXRange(r.x) && o.push(t), t.inRange(r.x, r.y) && (s = !0) }), n.intersect && !s && (o = []), o }, y: function (t, e, n) { var r = i(e, t), o = [], s = !1; return a(t, function (t) { t.inYRange(r.y) && o.push(t), t.inRange(r.x, r.y) && (s = !0) }), n.intersect && !s && (o = []), o } } } }, { 45: 45 }], 29: [function (t, e, n) { "use strict"; t(25)._set("global", { responsive: !0, responsiveAnimationDuration: 0, maintainAspectRatio: !0, events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"], hover: { onHover: null, mode: "nearest", intersect: !0, animationDuration: 400 }, onClick: null, defaultColor: "rgba(0,0,0,0.1)", defaultFontColor: "#666", defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", defaultFontSize: 12, defaultFontStyle: "normal", showLines: !0, elements: {}, layout: { padding: { top: 0, right: 0, bottom: 0, left: 0 } } }), e.exports = function () { var t = function (t, e) { return this.construct(t, e), this }; return t.Chart = t, t } }, { 25: 25 }], 30: [function (t, e, n) { "use strict"; var i = t(45); e.exports = function (t) { function e(t, e) { return i.where(t, function (t) { return t.position === e }) } function n(t, e) { t.forEach(function (t, e) { return t._tmpIndex_ = e, t }), t.sort(function (t, n) { var i = e ? n : t, a = e ? t : n; return i.weight === a.weight ? i._tmpIndex_ - a._tmpIndex_ : i.weight - a.weight }), t.forEach(function (t) { delete t._tmpIndex_ }) } t.layoutService = { defaults: {}, addBox: function (t, e) { t.boxes || (t.boxes = []), e.fullWidth = e.fullWidth || !1, e.position = e.position || "top", e.weight = e.weight || 0, t.boxes.push(e) }, removeBox: function (t, e) { var n = t.boxes ? t.boxes.indexOf(e) : -1; -1 !== n && t.boxes.splice(n, 1) }, configure: function (t, e, n) { for (var i, a = ["fullWidth", "position", "weight"], r = a.length, o = 0; o < r; ++o)i = a[o], n.hasOwnProperty(i) && (e[i] = n[i]) }, update: function (t, a, r) { function o(t) { var e = i.findNextWhere(D, function (e) { return e.box === t }); if (e) if (t.isHorizontal()) { var n = { left: Math.max(I, C), right: Math.max(O, P), top: 0, bottom: 0 }; t.update(t.fullWidth ? b : M, x / 2, n) } else t.update(e.minSize.width, S) } function s(t) { t.isHorizontal() ? (t.left = t.fullWidth ? d : I, t.right = t.fullWidth ? a - c : I + M, t.top = B, t.bottom = B + t.height, B = t.bottom) : (t.left = z, t.right = z + t.width, t.top = F, t.bottom = F + S, z = t.right) } if (t) { var l = t.options.layout || {}, u = i.options.toPadding(l.padding), d = u.left, c = u.right, h = u.top, f = u.bottom, g = e(t.boxes, "left"), m = e(t.boxes, "right"), p = e(t.boxes, "top"), v = e(t.boxes, "bottom"), y = e(t.boxes, "chartArea"); n(g, !0), n(m, !1), n(p, !0), n(v, !1); var b = a - d - c, x = r - h - f, _ = x / 2, k = (a - b / 2) / (g.length + m.length), w = (r - _) / (p.length + v.length), M = b, S = x, D = []; i.each(g.concat(m, p, v), function (t) { var e, n = t.isHorizontal(); n ? (e = t.update(t.fullWidth ? b : M, w), S -= e.height) : (e = t.update(k, _), M -= e.width), D.push({ horizontal: n, minSize: e, box: t }) }); var C = 0, P = 0, T = 0, A = 0; i.each(p.concat(v), function (t) { if (t.getPadding) { var e = t.getPadding(); C = Math.max(C, e.left), P = Math.max(P, e.right) } }), i.each(g.concat(m), function (t) { if (t.getPadding) { var e = t.getPadding(); T = Math.max(T, e.top), A = Math.max(A, e.bottom) } }); var I = d, O = c, F = h, R = f; i.each(g.concat(m), o), i.each(g, function (t) { I += t.width }), i.each(m, function (t) { O += t.width }), i.each(p.concat(v), o), i.each(p, function (t) { F += t.height }), i.each(v, function (t) { R += t.height }), i.each(g.concat(m), function (t) { var e = i.findNextWhere(D, function (e) { return e.box === t }), n = { left: 0, right: 0, top: F, bottom: R }; e && t.update(e.minSize.width, S, n) }), I = d, O = c, F = h, R = f, i.each(g, function (t) { I += t.width }), i.each(m, function (t) { O += t.width }), i.each(p, function (t) { F += t.height }), i.each(v, function (t) { R += t.height }); var L = Math.max(C - I, 0); I += L, O += Math.max(P - O, 0); var W = Math.max(T - F, 0); F += W, R += Math.max(A - R, 0); var Y = r - F - R, N = a - I - O; N === M && Y === S || (i.each(g, function (t) { t.height = Y }), i.each(m, function (t) { t.height = Y }), i.each(p, function (t) { t.fullWidth || (t.width = N) }), i.each(v, function (t) { t.fullWidth || (t.width = N) }), S = Y, M = N); var z = d + L, B = h + W; i.each(g.concat(p), s), z += M, B += S, i.each(m, s), i.each(v, s), t.chartArea = { left: I, top: F, right: I + M, bottom: F + S }, i.each(y, function (e) { e.left = t.chartArea.left, e.top = t.chartArea.top, e.right = t.chartArea.right, e.bottom = t.chartArea.bottom, e.update(M, S) }) } } } } }, { 45: 45 }], 31: [function (t, e, n) { "use strict"; var i = t(25), a = t(26), r = t(45); i._set("global", { plugins: {} }), e.exports = function (t) { t.plugins = { _plugins: [], _cacheId: 0, register: function (t) { var e = this._plugins;[].concat(t).forEach(function (t) { -1 === e.indexOf(t) && e.push(t) }), this._cacheId++ }, unregister: function (t) { var e = this._plugins;[].concat(t).forEach(function (t) { var n = e.indexOf(t); -1 !== n && e.splice(n, 1) }), this._cacheId++ }, clear: function () { this._plugins = [], this._cacheId++ }, count: function () { return this._plugins.length }, getAll: function () { return this._plugins }, notify: function (t, e, n) { var i, a, r, o, s, l = this.descriptors(t), u = l.length; for (i = 0; i < u; ++i)if (a = l[i], r = a.plugin, "function" == typeof (s = r[e]) && ((o = [t].concat(n || [])).push(a.options), !1 === s.apply(r, o))) return !1; return !0 }, descriptors: function (t) { var e = t._plugins || (t._plugins = {}); if (e.id === this._cacheId) return e.descriptors; var n = [], a = [], o = t && t.config || {}, s = o.options && o.options.plugins || {}; return this._plugins.concat(o.plugins || []).forEach(function (t) { if (-1 === n.indexOf(t)) { var e = t.id, o = s[e]; !1 !== o && (!0 === o && (o = r.clone(i.global.plugins[e])), n.push(t), a.push({ plugin: t, options: o || {} })) } }), e.descriptors = a, e.id = this._cacheId, a } }, t.pluginService = t.plugins, t.PluginBase = a.extend({}) } }, { 25: 25, 26: 26, 45: 45 }], 32: [function (t, e, n) { "use strict"; function i(t) { var e, n, i = []; for (e = 0, n = t.length; e < n; ++e)i.push(t[e].label); return i } function a(t, e, n) { var i = t.getPixelForTick(e); return n && (i -= 0 === e ? (t.getPixelForTick(1) - i) / 2 : (i - t.getPixelForTick(e - 1)) / 2), i } var r = t(25), o = t(26), s = t(45), l = t(34); r._set("scale", { display: !0, position: "left", offset: !1, gridLines: { display: !0, color: "rgba(0, 0, 0, 0.1)", lineWidth: 1, drawBorder: !0, drawOnChartArea: !0, drawTicks: !0, tickMarkLength: 10, zeroLineWidth: 1, zeroLineColor: "rgba(0,0,0,0.25)", zeroLineBorderDash: [], zeroLineBorderDashOffset: 0, offsetGridLines: !1, borderDash: [], borderDashOffset: 0 }, scaleLabel: { display: !1, labelString: "", lineHeight: 1.2, padding: { top: 4, bottom: 4 } }, ticks: { beginAtZero: !1, minRotation: 0, maxRotation: 50, mirror: !1, padding: 0, reverse: !1, display: !0, autoSkip: !0, autoSkipPadding: 0, labelOffset: 0, callback: l.formatters.values, minor: {}, major: {} } }), e.exports = function (t) { function e(t, e, n) { return s.isArray(e) ? s.longestText(t, n, e) : t.measureText(e).width } function n(t) { var e = s.valueOrDefault, n = r.global, i = e(t.fontSize, n.defaultFontSize), a = e(t.fontStyle, n.defaultFontStyle), o = e(t.fontFamily, n.defaultFontFamily); return { size: i, style: a, family: o, font: s.fontString(i, a, o) } } function l(t) { return s.options.toLineHeight(s.valueOrDefault(t.lineHeight, 1.2), s.valueOrDefault(t.fontSize, r.global.defaultFontSize)) } t.Scale = o.extend({ getPadding: function () { var t = this; return { left: t.paddingLeft || 0, top: t.paddingTop || 0, right: t.paddingRight || 0, bottom: t.paddingBottom || 0 } }, getTicks: function () { return this._ticks }, mergeTicksOptions: function () { var t = this.options.ticks; !1 === t.minor && (t.minor = { display: !1 }), !1 === t.major && (t.major = { display: !1 }); for (var e in t) "major" !== e && "minor" !== e && (void 0 === t.minor[e] && (t.minor[e] = t[e]), void 0 === t.major[e] && (t.major[e] = t[e])) }, beforeUpdate: function () { s.callback(this.options.beforeUpdate, [this]) }, update: function (t, e, n) { var i, a, r, o, l, u, d = this; for (d.beforeUpdate(), d.maxWidth = t, d.maxHeight = e, d.margins = s.extend({ left: 0, right: 0, top: 0, bottom: 0 }, n), d.longestTextCache = d.longestTextCache || {}, d.beforeSetDimensions(), d.setDimensions(), d.afterSetDimensions(), d.beforeDataLimits(), d.determineDataLimits(), d.afterDataLimits(), d.beforeBuildTicks(), l = d.buildTicks() || [], d.afterBuildTicks(), d.beforeTickToLabelConversion(), r = d.convertTicksToLabels(l) || d.ticks, d.afterTickToLabelConversion(), d.ticks = r, i = 0, a = r.length; i < a; ++i)o = r[i], (u = l[i]) ? u.label = o : l.push(u = { label: o, major: !1 }); return d._ticks = l, d.beforeCalculateTickRotation(), d.calculateTickRotation(), d.afterCalculateTickRotation(), d.beforeFit(), d.fit(), d.afterFit(), d.afterUpdate(), d.minSize }, afterUpdate: function () { s.callback(this.options.afterUpdate, [this]) }, beforeSetDimensions: function () { s.callback(this.options.beforeSetDimensions, [this]) }, setDimensions: function () { var t = this; t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0 }, afterSetDimensions: function () { s.callback(this.options.afterSetDimensions, [this]) }, beforeDataLimits: function () { s.callback(this.options.beforeDataLimits, [this]) }, determineDataLimits: s.noop, afterDataLimits: function () { s.callback(this.options.afterDataLimits, [this]) }, beforeBuildTicks: function () { s.callback(this.options.beforeBuildTicks, [this]) }, buildTicks: s.noop, afterBuildTicks: function () { s.callback(this.options.afterBuildTicks, [this]) }, beforeTickToLabelConversion: function () { s.callback(this.options.beforeTickToLabelConversion, [this]) }, convertTicksToLabels: function () { var t = this, e = t.options.ticks; t.ticks = t.ticks.map(e.userCallback || e.callback, this) }, afterTickToLabelConversion: function () { s.callback(this.options.afterTickToLabelConversion, [this]) }, beforeCalculateTickRotation: function () { s.callback(this.options.beforeCalculateTickRotation, [this]) }, calculateTickRotation: function () { var t = this, e = t.ctx, a = t.options.ticks, r = i(t._ticks), o = n(a); e.font = o.font; var l = a.minRotation || 0; if (r.length && t.options.display && t.isHorizontal()) for (var u, d = s.longestText(e, o.font, r, t.longestTextCache), c = d, h = t.getPixelForTick(1) - t.getPixelForTick(0) - 6; c > h && l < a.maxRotation;) { var f = s.toRadians(l); if (u = Math.cos(f), Math.sin(f) * d > t.maxHeight) { l--; break } l++ , c = u * d } t.labelRotation = l }, afterCalculateTickRotation: function () { s.callback(this.options.afterCalculateTickRotation, [this]) }, beforeFit: function () { s.callback(this.options.beforeFit, [this]) }, fit: function () { var t = this, a = t.minSize = { width: 0, height: 0 }, r = i(t._ticks), o = t.options, u = o.ticks, d = o.scaleLabel, c = o.gridLines, h = o.display, f = t.isHorizontal(), g = n(u), m = o.gridLines.tickMarkLength; if (a.width = f ? t.isFullWidth() ? t.maxWidth - t.margins.left - t.margins.right : t.maxWidth : h && c.drawTicks ? m : 0, a.height = f ? h && c.drawTicks ? m : 0 : t.maxHeight, d.display && h) { var p = l(d) + s.options.toPadding(d.padding).height; f ? a.height += p : a.width += p } if (u.display && h) { var v = s.longestText(t.ctx, g.font, r, t.longestTextCache), y = s.numberOfLabelLines(r), b = .5 * g.size, x = t.options.ticks.padding; if (f) { t.longestLabelWidth = v; var _ = s.toRadians(t.labelRotation), k = Math.cos(_), w = Math.sin(_) * v + g.size * y + b * (y - 1) + b; a.height = Math.min(t.maxHeight, a.height + w + x), t.ctx.font = g.font; var M = e(t.ctx, r[0], g.font), S = e(t.ctx, r[r.length - 1], g.font); 0 !== t.labelRotation ? (t.paddingLeft = "bottom" === o.position ? k * M + 3 : k * b + 3, t.paddingRight = "bottom" === o.position ? k * b + 3 : k * S + 3) : (t.paddingLeft = M / 2 + 3, t.paddingRight = S / 2 + 3) } else u.mirror ? v = 0 : v += x + b, a.width = Math.min(t.maxWidth, a.width + v), t.paddingTop = g.size / 2, t.paddingBottom = g.size / 2 } t.handleMargins(), t.width = a.width, t.height = a.height }, handleMargins: function () { var t = this; t.margins && (t.paddingLeft = Math.max(t.paddingLeft - t.margins.left, 0), t.paddingTop = Math.max(t.paddingTop - t.margins.top, 0), t.paddingRight = Math.max(t.paddingRight - t.margins.right, 0), t.paddingBottom = Math.max(t.paddingBottom - t.margins.bottom, 0)) }, afterFit: function () { s.callback(this.options.afterFit, [this]) }, isHorizontal: function () { return "top" === this.options.position || "bottom" === this.options.position }, isFullWidth: function () { return this.options.fullWidth }, getRightValue: function (t) { if (s.isNullOrUndef(t)) return NaN; if ("number" == typeof t && !isFinite(t)) return NaN; if (t) if (this.isHorizontal()) { if (void 0 !== t.x) return this.getRightValue(t.x) } else if (void 0 !== t.y) return this.getRightValue(t.y); return t }, getLabelForIndex: s.noop, getPixelForValue: s.noop, getValueForPixel: s.noop, getPixelForTick: function (t) { var e = this, n = e.options.offset; if (e.isHorizontal()) { var i = (e.width - (e.paddingLeft + e.paddingRight)) / Math.max(e._ticks.length - (n ? 0 : 1), 1), a = i * t + e.paddingLeft; n && (a += i / 2); var r = e.left + Math.round(a); return r += e.isFullWidth() ? e.margins.left : 0 } var o = e.height - (e.paddingTop + e.paddingBottom); return e.top + t * (o / (e._ticks.length - 1)) }, getPixelForDecimal: function (t) { var e = this; if (e.isHorizontal()) { var n = (e.width - (e.paddingLeft + e.paddingRight)) * t + e.paddingLeft, i = e.left + Math.round(n); return i += e.isFullWidth() ? e.margins.left : 0 } return e.top + t * e.height }, getBasePixel: function () { return this.getPixelForValue(this.getBaseValue()) }, getBaseValue: function () { var t = this, e = t.min, n = t.max; return t.beginAtZero ? 0 : e < 0 && n < 0 ? n : e > 0 && n > 0 ? e : 0 }, _autoSkip: function (t) { var e, n, i, a, r = this, o = r.isHorizontal(), l = r.options.ticks.minor, u = t.length, d = s.toRadians(r.labelRotation), c = Math.cos(d), h = r.longestLabelWidth * c, f = []; for (l.maxTicksLimit && (a = l.maxTicksLimit), o && (e = !1, (h + l.autoSkipPadding) * u > r.width - (r.paddingLeft + r.paddingRight) && (e = 1 + Math.floor((h + l.autoSkipPadding) * u / (r.width - (r.paddingLeft + r.paddingRight)))), a && u > a && (e = Math.max(e, Math.floor(u / a)))), n = 0; n < u; n++)i = t[n], (e > 1 && n % e > 0 || n % e == 0 && n + e >= u) && n !== u - 1 && delete i.label, f.push(i); return f }, draw: function (t) { var e = this, i = e.options; if (i.display) { var o = e.ctx, u = r.global, d = i.ticks.minor, c = i.ticks.major || d, h = i.gridLines, f = i.scaleLabel, g = 0 !== e.labelRotation, m = e.isHorizontal(), p = d.autoSkip ? e._autoSkip(e.getTicks()) : e.getTicks(), v = s.valueOrDefault(d.fontColor, u.defaultFontColor), y = n(d), b = s.valueOrDefault(c.fontColor, u.defaultFontColor), x = n(c), _ = h.drawTicks ? h.tickMarkLength : 0, k = s.valueOrDefault(f.fontColor, u.defaultFontColor), w = n(f), M = s.options.toPadding(f.padding), S = s.toRadians(e.labelRotation), D = [], C = "right" === i.position ? e.left : e.right - _, P = "right" === i.position ? e.left + _ : e.right, T = "bottom" === i.position ? e.top : e.bottom - _, A = "bottom" === i.position ? e.top + _ : e.bottom; if (s.each(p, function (n, r) { if (!s.isNullOrUndef(n.label)) { var o, l, c, f, v = n.label; r === e.zeroLineIndex && i.offset === h.offsetGridLines ? (o = h.zeroLineWidth, l = h.zeroLineColor, c = h.zeroLineBorderDash, f = h.zeroLineBorderDashOffset) : (o = s.valueAtIndexOrDefault(h.lineWidth, r), l = s.valueAtIndexOrDefault(h.color, r), c = s.valueOrDefault(h.borderDash, u.borderDash), f = s.valueOrDefault(h.borderDashOffset, u.borderDashOffset)); var y, b, x, k, w, M, I, O, F, R, L = "middle", W = "middle", Y = d.padding; if (m) { var N = _ + Y; "bottom" === i.position ? (W = g ? "middle" : "top", L = g ? "right" : "center", R = e.top + N) : (W = g ? "middle" : "bottom", L = g ? "left" : "center", R = e.bottom - N); var z = a(e, r, h.offsetGridLines && p.length > 1); z < e.left && (l = "rgba(0,0,0,0)"), z += s.aliasPixel(o), F = e.getPixelForTick(r) + d.labelOffset, y = x = w = I = z, b = T, k = A, M = t.top, O = t.bottom } else { var B, V = "left" === i.position; d.mirror ? (L = V ? "left" : "right", B = Y) : (L = V ? "right" : "left", B = _ + Y), F = V ? e.right - B : e.left + B; var H = a(e, r, h.offsetGridLines && p.length > 1); H < e.top && (l = "rgba(0,0,0,0)"), H += s.aliasPixel(o), R = e.getPixelForTick(r) + d.labelOffset, y = C, x = P, w = t.left, I = t.right, b = k = M = O = H } D.push({ tx1: y, ty1: b, tx2: x, ty2: k, x1: w, y1: M, x2: I, y2: O, labelX: F, labelY: R, glWidth: o, glColor: l, glBorderDash: c, glBorderDashOffset: f, rotation: -1 * S, label: v, major: n.major, textBaseline: W, textAlign: L }) } }), s.each(D, function (t) { if (h.display && (o.save(), o.lineWidth = t.glWidth, o.strokeStyle = t.glColor, o.setLineDash && (o.setLineDash(t.glBorderDash), o.lineDashOffset = t.glBorderDashOffset), o.beginPath(), h.drawTicks && (o.moveTo(t.tx1, t.ty1), o.lineTo(t.tx2, t.ty2)), h.drawOnChartArea && (o.moveTo(t.x1, t.y1), o.lineTo(t.x2, t.y2)), o.stroke(), o.restore()), d.display) { o.save(), o.translate(t.labelX, t.labelY), o.rotate(t.rotation), o.font = t.major ? x.font : y.font, o.fillStyle = t.major ? b : v, o.textBaseline = t.textBaseline, o.textAlign = t.textAlign; var e = t.label; if (s.isArray(e)) for (var n = 0, i = 0; n < e.length; ++n)o.fillText("" + e[n], 0, i), i += 1.5 * y.size; else o.fillText(e, 0, 0); o.restore() } }), f.display) { var I, O, F = 0, R = l(f) / 2; if (m) I = e.left + (e.right - e.left) / 2, O = "bottom" === i.position ? e.bottom - R - M.bottom : e.top + R + M.top; else { var L = "left" === i.position; I = L ? e.left + R + M.top : e.right - R - M.top, O = e.top + (e.bottom - e.top) / 2, F = L ? -.5 * Math.PI : .5 * Math.PI } o.save(), o.translate(I, O), o.rotate(F), o.textAlign = "center", o.textBaseline = "middle", o.fillStyle = k, o.font = w.font, o.fillText(f.labelString, 0, 0), o.restore() } if (h.drawBorder) { o.lineWidth = s.valueAtIndexOrDefault(h.lineWidth, 0), o.strokeStyle = s.valueAtIndexOrDefault(h.color, 0); var W = e.left, Y = e.right, N = e.top, z = e.bottom, B = s.aliasPixel(o.lineWidth); m ? (N = z = "top" === i.position ? e.bottom : e.top, N += B, z += B) : (W = Y = "left" === i.position ? e.right : e.left, W += B, Y += B), o.beginPath(), o.moveTo(W, N), o.lineTo(Y, z), o.stroke() } } } }) } }, { 25: 25, 26: 26, 34: 34, 45: 45 }], 33: [function (t, e, n) { "use strict"; var i = t(25), a = t(45); e.exports = function (t) { t.scaleService = { constructors: {}, defaults: {}, registerScaleType: function (t, e, n) { this.constructors[t] = e, this.defaults[t] = a.clone(n) }, getScaleConstructor: function (t) { return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0 }, getScaleDefaults: function (t) { return this.defaults.hasOwnProperty(t) ? a.merge({}, [i.scale, this.defaults[t]]) : {} }, updateScaleDefaults: function (t, e) { var n = this; n.defaults.hasOwnProperty(t) && (n.defaults[t] = a.extend(n.defaults[t], e)) }, addScalesToLayout: function (e) { a.each(e.scales, function (n) { n.fullWidth = n.options.fullWidth, n.position = n.options.position, n.weight = n.options.weight, t.layoutService.addBox(e, n) }) } } } }, { 25: 25, 45: 45 }], 34: [function (t, e, n) { "use strict"; var i = t(45); e.exports = { generators: { linear: function (t, e) { var n, a = []; if (t.stepSize && t.stepSize > 0) n = t.stepSize; else { var r = i.niceNum(e.max - e.min, !1); n = i.niceNum(r / (t.maxTicks - 1), !0) } var o = Math.floor(e.min / n) * n, s = Math.ceil(e.max / n) * n; t.min && t.max && t.stepSize && i.almostWhole((t.max - t.min) / t.stepSize, n / 1e3) && (o = t.min, s = t.max); var l = (s - o) / n; l = i.almostEquals(l, Math.round(l), n / 1e3) ? Math.round(l) : Math.ceil(l), a.push(void 0 !== t.min ? t.min : o); for (var u = 1; u < l; ++u)a.push(o + u * n); return a.push(void 0 !== t.max ? t.max : s), a }, logarithmic: function (t, e) { var n, a, r = [], o = i.valueOrDefault, s = o(t.min, Math.pow(10, Math.floor(i.log10(e.min)))), l = Math.floor(i.log10(e.max)), u = Math.ceil(e.max / Math.pow(10, l)); 0 === s ? (n = Math.floor(i.log10(e.minNotZero)), a = Math.floor(e.minNotZero / Math.pow(10, n)), r.push(s), s = a * Math.pow(10, n)) : (n = Math.floor(i.log10(s)), a = Math.floor(s / Math.pow(10, n))); do { r.push(s), 10 === ++a && (a = 1, ++n), s = a * Math.pow(10, n) } while (n < l || n === l && a < u); var d = o(t.max, s); return r.push(d), r } }, formatters: { values: function (t) { return i.isArray(t) ? t : "" + t }, linear: function (t, e, n) { var a = n.length > 3 ? n[2] - n[1] : n[1] - n[0]; Math.abs(a) > 1 && t !== Math.floor(t) && (a = t - Math.floor(t)); var r = i.log10(Math.abs(a)), o = ""; if (0 !== t) { var s = -1 * Math.floor(r); s = Math.max(Math.min(s, 20), 0), o = t.toFixed(s) } else o = "0"; return o }, logarithmic: function (t, e, n) { var a = t / Math.pow(10, Math.floor(i.log10(t))); return 0 === t ? "0" : 1 === a || 2 === a || 5 === a || 0 === e || e === n.length - 1 ? t.toExponential() : "" } } } }, { 45: 45 }], 35: [function (t, e, n) { "use strict"; var i = t(25), a = t(26), r = t(45); i._set("global", { tooltips: { enabled: !0, custom: null, mode: "nearest", position: "average", intersect: !0, backgroundColor: "rgba(0,0,0,0.8)", titleFontStyle: "bold", titleSpacing: 2, titleMarginBottom: 6, titleFontColor: "#fff", titleAlign: "left", bodySpacing: 2, bodyFontColor: "#fff", bodyAlign: "left", footerFontStyle: "bold", footerSpacing: 2, footerMarginTop: 6, footerFontColor: "#fff", footerAlign: "left", yPadding: 6, xPadding: 6, caretPadding: 2, caretSize: 5, cornerRadius: 6, multiKeyBackground: "#fff", displayColors: !0, borderColor: "rgba(0,0,0,0)", borderWidth: 0, callbacks: { beforeTitle: r.noop, title: function (t, e) { var n = "", i = e.labels, a = i ? i.length : 0; if (t.length > 0) { var r = t[0]; r.xLabel ? n = r.xLabel : a > 0 && r.index < a && (n = i[r.index]) } return n }, afterTitle: r.noop, beforeBody: r.noop, beforeLabel: r.noop, label: function (t, e) { var n = e.datasets[t.datasetIndex].label || ""; return n && (n += ": "), n += t.yLabel }, labelColor: function (t, e) { var n = e.getDatasetMeta(t.datasetIndex).data[t.index]._view; return { borderColor: n.borderColor, backgroundColor: n.backgroundColor } }, labelTextColor: function () { return this._options.bodyFontColor }, afterLabel: r.noop, afterBody: r.noop, beforeFooter: r.noop, footer: r.noop, afterFooter: r.noop } } }), e.exports = function (t) { function e(t, e) { var n = r.color(t); return n.alpha(e * n.alpha()).rgbaString() } function n(t, e) { return e && (r.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t } function o(t) { var e = t._xScale, n = t._yScale || t._scale, i = t._index, a = t._datasetIndex; return { xLabel: e ? e.getLabelForIndex(i, a) : "", yLabel: n ? n.getLabelForIndex(i, a) : "", index: i, datasetIndex: a, x: t._model.x, y: t._model.y } } function s(t) { var e = i.global, n = r.valueOrDefault; return { xPadding: t.xPadding, yPadding: t.yPadding, xAlign: t.xAlign, yAlign: t.yAlign, bodyFontColor: t.bodyFontColor, _bodyFontFamily: n(t.bodyFontFamily, e.defaultFontFamily), _bodyFontStyle: n(t.bodyFontStyle, e.defaultFontStyle), _bodyAlign: t.bodyAlign, bodyFontSize: n(t.bodyFontSize, e.defaultFontSize), bodySpacing: t.bodySpacing, titleFontColor: t.titleFontColor, _titleFontFamily: n(t.titleFontFamily, e.defaultFontFamily), _titleFontStyle: n(t.titleFontStyle, e.defaultFontStyle), titleFontSize: n(t.titleFontSize, e.defaultFontSize), _titleAlign: t.titleAlign, titleSpacing: t.titleSpacing, titleMarginBottom: t.titleMarginBottom, footerFontColor: t.footerFontColor, _footerFontFamily: n(t.footerFontFamily, e.defaultFontFamily), _footerFontStyle: n(t.footerFontStyle, e.defaultFontStyle), footerFontSize: n(t.footerFontSize, e.defaultFontSize), _footerAlign: t.footerAlign, footerSpacing: t.footerSpacing, footerMarginTop: t.footerMarginTop, caretSize: t.caretSize, cornerRadius: t.cornerRadius, backgroundColor: t.backgroundColor, opacity: 0, legendColorBackground: t.multiKeyBackground, displayColors: t.displayColors, borderColor: t.borderColor, borderWidth: t.borderWidth } } function l(t, e) { var n = t._chart.ctx, i = 2 * e.yPadding, a = 0, o = e.body, s = o.reduce(function (t, e) { return t + e.before.length + e.lines.length + e.after.length }, 0); s += e.beforeBody.length + e.afterBody.length; var l = e.title.length, u = e.footer.length, d = e.titleFontSize, c = e.bodyFontSize, h = e.footerFontSize; i += l * d, i += l ? (l - 1) * e.titleSpacing : 0, i += l ? e.titleMarginBottom : 0, i += s * c, i += s ? (s - 1) * e.bodySpacing : 0, i += u ? e.footerMarginTop : 0, i += u * h, i += u ? (u - 1) * e.footerSpacing : 0; var f = 0, g = function (t) { a = Math.max(a, n.measureText(t).width + f) }; return n.font = r.fontString(d, e._titleFontStyle, e._titleFontFamily), r.each(e.title, g), n.font = r.fontString(c, e._bodyFontStyle, e._bodyFontFamily), r.each(e.beforeBody.concat(e.afterBody), g), f = e.displayColors ? c + 2 : 0, r.each(o, function (t) { r.each(t.before, g), r.each(t.lines, g), r.each(t.after, g) }), f = 0, n.font = r.fontString(h, e._footerFontStyle, e._footerFontFamily), r.each(e.footer, g), a += 2 * e.xPadding, { width: a, height: i } } function u(t, e) { var n = t._model, i = t._chart, a = t._chart.chartArea, r = "center", o = "center"; n.y < e.height ? o = "top" : n.y > i.height - e.height && (o = "bottom"); var s, l, u, d, c, h = (a.left + a.right) / 2, f = (a.top + a.bottom) / 2; "center" === o ? (s = function (t) { return t <= h }, l = function (t) { return t > h }) : (s = function (t) { return t <= e.width / 2 }, l = function (t) { return t >= i.width - e.width / 2 }), u = function (t) { return t + e.width > i.width }, d = function (t) { return t - e.width < 0 }, c = function (t) { return t <= f ? "top" : "bottom" }, s(n.x) ? (r = "left", u(n.x) && (r = "center", o = c(n.y))) : l(n.x) && (r = "right", d(n.x) && (r = "center", o = c(n.y))); var g = t._options; return { xAlign: g.xAlign ? g.xAlign : r, yAlign: g.yAlign ? g.yAlign : o } } function d(t, e, n) { var i = t.x, a = t.y, r = t.caretSize, o = t.caretPadding, s = t.cornerRadius, l = n.xAlign, u = n.yAlign, d = r + o, c = s + o; return "right" === l ? i -= e.width : "center" === l && (i -= e.width / 2), "top" === u ? a += d : a -= "bottom" === u ? e.height + d : e.height / 2, "center" === u ? "left" === l ? i += d : "right" === l && (i -= d) : "left" === l ? i -= c : "right" === l && (i += c), { x: i, y: a } } t.Tooltip = a.extend({ initialize: function () { this._model = s(this._options), this._lastActive = [] }, getTitle: function () { var t = this, e = t._options.callbacks, i = e.beforeTitle.apply(t, arguments), a = e.title.apply(t, arguments), r = e.afterTitle.apply(t, arguments), o = []; return o = n(o, i), o = n(o, a), o = n(o, r) }, getBeforeBody: function () { var t = this._options.callbacks.beforeBody.apply(this, arguments); return r.isArray(t) ? t : void 0 !== t ? [t] : [] }, getBody: function (t, e) { var i = this, a = i._options.callbacks, o = []; return r.each(t, function (t) { var r = { before: [], lines: [], after: [] }; n(r.before, a.beforeLabel.call(i, t, e)), n(r.lines, a.label.call(i, t, e)), n(r.after, a.afterLabel.call(i, t, e)), o.push(r) }), o }, getAfterBody: function () { var t = this._options.callbacks.afterBody.apply(this, arguments); return r.isArray(t) ? t : void 0 !== t ? [t] : [] }, getFooter: function () { var t = this, e = t._options.callbacks, i = e.beforeFooter.apply(t, arguments), a = e.footer.apply(t, arguments), r = e.afterFooter.apply(t, arguments), o = []; return o = n(o, i), o = n(o, a), o = n(o, r) }, update: function (e) { var n, i, a = this, c = a._options, h = a._model, f = a._model = s(c), g = a._active, m = a._data, p = { xAlign: h.xAlign, yAlign: h.yAlign }, v = { x: h.x, y: h.y }, y = { width: h.width, height: h.height }, b = { x: h.caretX, y: h.caretY }; if (g.length) { f.opacity = 1; var x = [], _ = []; b = t.Tooltip.positioners[c.position].call(a, g, a._eventPosition); var k = []; for (n = 0, i = g.length; n < i; ++n)k.push(o(g[n])); c.filter && (k = k.filter(function (t) { return c.filter(t, m) })), c.itemSort && (k = k.sort(function (t, e) { return c.itemSort(t, e, m) })), r.each(k, function (t) { x.push(c.callbacks.labelColor.call(a, t, a._chart)), _.push(c.callbacks.labelTextColor.call(a, t, a._chart)) }), f.title = a.getTitle(k, m), f.beforeBody = a.getBeforeBody(k, m), f.body = a.getBody(k, m), f.afterBody = a.getAfterBody(k, m), f.footer = a.getFooter(k, m), f.x = Math.round(b.x), f.y = Math.round(b.y), f.caretPadding = c.caretPadding, f.labelColors = x, f.labelTextColors = _, f.dataPoints = k, v = d(f, y = l(this, f), p = u(this, y)) } else f.opacity = 0; return f.xAlign = p.xAlign, f.yAlign = p.yAlign, f.x = v.x, f.y = v.y, f.width = y.width, f.height = y.height, f.caretX = b.x, f.caretY = b.y, a._model = f, e && c.custom && c.custom.call(a, f), a }, drawCaret: function (t, e) { var n = this._chart.ctx, i = this._view, a = this.getCaretPosition(t, e, i); n.lineTo(a.x1, a.y1), n.lineTo(a.x2, a.y2), n.lineTo(a.x3, a.y3) }, getCaretPosition: function (t, e, n) { var i, a, r, o, s, l, u = n.caretSize, d = n.cornerRadius, c = n.xAlign, h = n.yAlign, f = t.x, g = t.y, m = e.width, p = e.height; if ("center" === h) s = g + p / 2, "left" === c ? (a = (i = f) - u, r = i, o = s + u, l = s - u) : (a = (i = f + m) + u, r = i, o = s - u, l = s + u); else if ("left" === c ? (i = (a = f + d + u) - u, r = a + u) : "right" === c ? (i = (a = f + m - d - u) - u, r = a + u) : (i = (a = f + m / 2) - u, r = a + u), "top" === h) s = (o = g) - u, l = o; else { s = (o = g + p) + u, l = o; var v = r; r = i, i = v } return { x1: i, x2: a, x3: r, y1: o, y2: s, y3: l } }, drawTitle: function (t, n, i, a) { var o = n.title; if (o.length) { i.textAlign = n._titleAlign, i.textBaseline = "top"; var s = n.titleFontSize, l = n.titleSpacing; i.fillStyle = e(n.titleFontColor, a), i.font = r.fontString(s, n._titleFontStyle, n._titleFontFamily); var u, d; for (u = 0, d = o.length; u < d; ++u)i.fillText(o[u], t.x, t.y), t.y += s + l, u + 1 === o.length && (t.y += n.titleMarginBottom - l) } }, drawBody: function (t, n, i, a) { var o = n.bodyFontSize, s = n.bodySpacing, l = n.body; i.textAlign = n._bodyAlign, i.textBaseline = "top", i.font = r.fontString(o, n._bodyFontStyle, n._bodyFontFamily); var u = 0, d = function (e) { i.fillText(e, t.x + u, t.y), t.y += o + s }; i.fillStyle = e(n.bodyFontColor, a), r.each(n.beforeBody, d); var c = n.displayColors; u = c ? o + 2 : 0, r.each(l, function (s, l) { var u = e(n.labelTextColors[l], a); i.fillStyle = u, r.each(s.before, d), r.each(s.lines, function (r) { c && (i.fillStyle = e(n.legendColorBackground, a), i.fillRect(t.x, t.y, o, o), i.lineWidth = 1, i.strokeStyle = e(n.labelColors[l].borderColor, a), i.strokeRect(t.x, t.y, o, o), i.fillStyle = e(n.labelColors[l].backgroundColor, a), i.fillRect(t.x + 1, t.y + 1, o - 2, o - 2), i.fillStyle = u), d(r) }), r.each(s.after, d) }), u = 0, r.each(n.afterBody, d), t.y -= s }, drawFooter: function (t, n, i, a) { var o = n.footer; o.length && (t.y += n.footerMarginTop, i.textAlign = n._footerAlign, i.textBaseline = "top", i.fillStyle = e(n.footerFontColor, a), i.font = r.fontString(n.footerFontSize, n._footerFontStyle, n._footerFontFamily), r.each(o, function (e) { i.fillText(e, t.x, t.y), t.y += n.footerFontSize + n.footerSpacing })) }, drawBackground: function (t, n, i, a, r) { i.fillStyle = e(n.backgroundColor, r), i.strokeStyle = e(n.borderColor, r), i.lineWidth = n.borderWidth; var o = n.xAlign, s = n.yAlign, l = t.x, u = t.y, d = a.width, c = a.height, h = n.cornerRadius; i.beginPath(), i.moveTo(l + h, u), "top" === s && this.drawCaret(t, a), i.lineTo(l + d - h, u), i.quadraticCurveTo(l + d, u, l + d, u + h), "center" === s && "right" === o && this.drawCaret(t, a), i.lineTo(l + d, u + c - h), i.quadraticCurveTo(l + d, u + c, l + d - h, u + c), "bottom" === s && this.drawCaret(t, a), i.lineTo(l + h, u + c), i.quadraticCurveTo(l, u + c, l, u + c - h), "center" === s && "left" === o && this.drawCaret(t, a), i.lineTo(l, u + h), i.quadraticCurveTo(l, u, l + h, u), i.closePath(), i.fill(), n.borderWidth > 0 && i.stroke() }, draw: function () { var t = this._chart.ctx, e = this._view; if (0 !== e.opacity) { var n = { width: e.width, height: e.height }, i = { x: e.x, y: e.y }, a = Math.abs(e.opacity < .001) ? 0 : e.opacity, r = e.title.length || e.beforeBody.length || e.body.length || e.afterBody.length || e.footer.length; this._options.enabled && r && (this.drawBackground(i, e, t, n, a), i.x += e.xPadding, i.y += e.yPadding, this.drawTitle(i, e, t, a), this.drawBody(i, e, t, a), this.drawFooter(i, e, t, a)) } }, handleEvent: function (t) { var e = this, n = e._options, i = !1; if (e._lastActive = e._lastActive || [], "mouseout" === t.type ? e._active = [] : e._active = e._chart.getElementsAtEventForMode(t, n.mode, n), !(i = !r.arrayEquals(e._active, e._lastActive))) return !1; if (e._lastActive = e._active, n.enabled || n.custom) { e._eventPosition = { x: t.x, y: t.y }; var a = e._model; e.update(!0), e.pivot(), i |= a.x !== e._model.x || a.y !== e._model.y } return i } }), t.Tooltip.positioners = { average: function (t) { if (!t.length) return !1; var e, n, i = 0, a = 0, r = 0; for (e = 0, n = t.length; e < n; ++e) { var o = t[e]; if (o && o.hasValue()) { var s = o.tooltipPosition(); i += s.x, a += s.y, ++r } } return { x: Math.round(i / r), y: Math.round(a / r) } }, nearest: function (t, e) { var n, i, a, o = e.x, s = e.y, l = Number.POSITIVE_INFINITY; for (n = 0, i = t.length; n < i; ++n) { var u = t[n]; if (u && u.hasValue()) { var d = u.getCenterPoint(), c = r.distanceBetweenPoints(e, d); c < l && (l = c, a = u) } } if (a) { var h = a.tooltipPosition(); o = h.x, s = h.y } return { x: o, y: s } } } } }, { 25: 25, 26: 26, 45: 45 }], 36: [function (t, e, n) { "use strict"; var i = t(25), a = t(26), r = t(45); i._set("global", { elements: { arc: { backgroundColor: i.global.defaultColor, borderColor: "#fff", borderWidth: 2 } } }), e.exports = a.extend({ inLabelRange: function (t) { var e = this._view; return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2) }, inRange: function (t, e) { var n = this._view; if (n) { for (var i = r.getAngleFromPoint(n, { x: t, y: e }), a = i.angle, o = i.distance, s = n.startAngle, l = n.endAngle; l < s;)l += 2 * Math.PI; for (; a > l;)a -= 2 * Math.PI; for (; a < s;)a += 2 * Math.PI; var u = a >= s && a <= l, d = o >= n.innerRadius && o <= n.outerRadius; return u && d } return !1 }, getCenterPoint: function () { var t = this._view, e = (t.startAngle + t.endAngle) / 2, n = (t.innerRadius + t.outerRadius) / 2; return { x: t.x + Math.cos(e) * n, y: t.y + Math.sin(e) * n } }, getArea: function () { var t = this._view; return Math.PI * ((t.endAngle - t.startAngle) / (2 * Math.PI)) * (Math.pow(t.outerRadius, 2) - Math.pow(t.innerRadius, 2)) }, tooltipPosition: function () { var t = this._view, e = t.startAngle + (t.endAngle - t.startAngle) / 2, n = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius; return { x: t.x + Math.cos(e) * n, y: t.y + Math.sin(e) * n } }, draw: function () { var t = this._chart.ctx, e = this._view, n = e.startAngle, i = e.endAngle; t.beginPath(), t.arc(e.x, e.y, e.outerRadius, n, i), t.arc(e.x, e.y, e.innerRadius, i, n, !0), t.closePath(), t.strokeStyle = e.borderColor, t.lineWidth = e.borderWidth, t.fillStyle = e.backgroundColor, t.fill(), t.lineJoin = "bevel", e.borderWidth && t.stroke() } }) }, { 25: 25, 26: 26, 45: 45 }], 37: [function (t, e, n) { "use strict"; var i = t(25), a = t(26), r = t(45), o = i.global; i._set("global", { elements: { line: { tension: .4, backgroundColor: o.defaultColor, borderWidth: 3, borderColor: o.defaultColor, borderCapStyle: "butt", borderDash: [], borderDashOffset: 0, borderJoinStyle: "miter", capBezierPoints: !0, fill: !0 } } }), e.exports = a.extend({ draw: function () { var t, e, n, i, a = this, s = a._view, l = a._chart.ctx, u = s.spanGaps, d = a._children.slice(), c = o.elements.line, h = -1; for (a._loop && d.length && d.push(d[0]), l.save(), l.lineCap = s.borderCapStyle || c.borderCapStyle, l.setLineDash && l.setLineDash(s.borderDash || c.borderDash), l.lineDashOffset = s.borderDashOffset || c.borderDashOffset, l.lineJoin = s.borderJoinStyle || c.borderJoinStyle, l.lineWidth = s.borderWidth || c.borderWidth, l.strokeStyle = s.borderColor || o.defaultColor, l.beginPath(), h = -1, t = 0; t < d.length; ++t)e = d[t], n = r.previousItem(d, t), i = e._view, 0 === t ? i.skip || (l.moveTo(i.x, i.y), h = t) : (n = -1 === h ? n : d[h], i.skip || (h !== t - 1 && !u || -1 === h ? l.moveTo(i.x, i.y) : r.canvas.lineTo(l, n._view, e._view), h = t)); l.stroke(), l.restore() } }) }, { 25: 25, 26: 26, 45: 45 }], 38: [function (t, e, n) { "use strict"; function i(t) { var e = this._view; return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hitRadius, 2) } var a = t(25), r = t(26), o = t(45), s = a.global.defaultColor; a._set("global", { elements: { point: { radius: 3, pointStyle: "circle", backgroundColor: s, borderColor: s, borderWidth: 1, hitRadius: 1, hoverRadius: 4, hoverBorderWidth: 1 } } }), e.exports = r.extend({ inRange: function (t, e) { var n = this._view; return !!n && Math.pow(t - n.x, 2) + Math.pow(e - n.y, 2) < Math.pow(n.hitRadius + n.radius, 2) }, inLabelRange: i, inXRange: i, inYRange: function (t) { var e = this._view; return !!e && Math.pow(t - e.y, 2) < Math.pow(e.radius + e.hitRadius, 2) }, getCenterPoint: function () { var t = this._view; return { x: t.x, y: t.y } }, getArea: function () { return Math.PI * Math.pow(this._view.radius, 2) }, tooltipPosition: function () { var t = this._view; return { x: t.x, y: t.y, padding: t.radius + t.borderWidth } }, draw: function (t) { var e = this._view, n = this._model, i = this._chart.ctx, r = e.pointStyle, l = e.radius, u = e.x, d = e.y, c = o.color, h = 0; e.skip || (i.strokeStyle = e.borderColor || s, i.lineWidth = o.valueOrDefault(e.borderWidth, a.global.elements.point.borderWidth), i.fillStyle = e.backgroundColor || s, void 0 !== t && (n.x < t.left || 1.01 * t.right < n.x || n.y < t.top || 1.01 * t.bottom < n.y) && (n.x < t.left ? h = (u - n.x) / (t.left - n.x) : 1.01 * t.right < n.x ? h = (n.x - u) / (n.x - t.right) : n.y < t.top ? h = (d - n.y) / (t.top - n.y) : 1.01 * t.bottom < n.y && (h = (n.y - d) / (n.y - t.bottom)), h = Math.round(100 * h) / 100, i.strokeStyle = c(i.strokeStyle).alpha(h).rgbString(), i.fillStyle = c(i.fillStyle).alpha(h).rgbString()), o.canvas.drawPoint(i, r, l, u, d)) } }) }, { 25: 25, 26: 26, 45: 45 }], 39: [function (t, e, n) { "use strict"; function i(t) { return void 0 !== t._view.width } function a(t) { var e, n, a, r, o = t._view; if (i(t)) { var s = o.width / 2; e = o.x - s, n = o.x + s, a = Math.min(o.y, o.base), r = Math.max(o.y, o.base) } else { var l = o.height / 2; e = Math.min(o.x, o.base), n = Math.max(o.x, o.base), a = o.y - l, r = o.y + l } return { left: e, top: a, right: n, bottom: r } } var r = t(25), o = t(26); r._set("global", { elements: { rectangle: { backgroundColor: r.global.defaultColor, borderColor: r.global.defaultColor, borderSkipped: "bottom", borderWidth: 0 } } }), e.exports = o.extend({ draw: function () { function t(t) { return v[(y + t) % 4] } var e, n, i, a, r, o, s, l = this._chart.ctx, u = this._view, d = u.borderWidth; if (u.horizontal ? (e = u.base, n = u.x, i = u.y - u.height / 2, a = u.y + u.height / 2, r = n > e ? 1 : -1, o = 1, s = u.borderSkipped || "left") : (e = u.x - u.width / 2, n = u.x + u.width / 2, i = u.y, r = 1, o = (a = u.base) > i ? 1 : -1, s = u.borderSkipped || "bottom"), d) { var c = Math.min(Math.abs(e - n), Math.abs(i - a)), h = (d = d > c ? c : d) / 2, f = e + ("left" !== s ? h * r : 0), g = n + ("right" !== s ? -h * r : 0), m = i + ("top" !== s ? h * o : 0), p = a + ("bottom" !== s ? -h * o : 0); f !== g && (i = m, a = p), m !== p && (e = f, n = g) } l.beginPath(), l.fillStyle = u.backgroundColor, l.strokeStyle = u.borderColor, l.lineWidth = d; var v = [[e, a], [e, i], [n, i], [n, a]], y = ["bottom", "left", "top", "right"].indexOf(s, 0); -1 === y && (y = 0); var b = t(0); l.moveTo(b[0], b[1]); for (var x = 1; x < 4; x++)b = t(x), l.lineTo(b[0], b[1]); l.fill(), d && l.stroke() }, height: function () { var t = this._view; return t.base - t.y }, inRange: function (t, e) { var n = !1; if (this._view) { var i = a(this); n = t >= i.left && t <= i.right && e >= i.top && e <= i.bottom } return n }, inLabelRange: function (t, e) { var n = this; if (!n._view) return !1; var r = a(n); return i(n) ? t >= r.left && t <= r.right : e >= r.top && e <= r.bottom }, inXRange: function (t) { var e = a(this); return t >= e.left && t <= e.right }, inYRange: function (t) { var e = a(this); return t >= e.top && t <= e.bottom }, getCenterPoint: function () { var t, e, n = this._view; return i(this) ? (t = n.x, e = (n.y + n.base) / 2) : (t = (n.x + n.base) / 2, e = n.y), { x: t, y: e } }, getArea: function () { var t = this._view; return t.width * Math.abs(t.y - t.base) }, tooltipPosition: function () { var t = this._view; return { x: t.x, y: t.y } } }) }, { 25: 25, 26: 26 }], 40: [function (t, e, n) { "use strict"; e.exports = {}, e.exports.Arc = t(36), e.exports.Line = t(37), e.exports.Point = t(38), e.exports.Rectangle = t(39) }, { 36: 36, 37: 37, 38: 38, 39: 39 }], 41: [function (t, e, n) { "use strict"; var i = t(42), n = e.exports = { clear: function (t) { t.ctx.clearRect(0, 0, t.width, t.height) }, roundedRect: function (t, e, n, i, a, r) { if (r) { var o = Math.min(r, i / 2), s = Math.min(r, a / 2); t.moveTo(e + o, n), t.lineTo(e + i - o, n), t.quadraticCurveTo(e + i, n, e + i, n + s), t.lineTo(e + i, n + a - s), t.quadraticCurveTo(e + i, n + a, e + i - o, n + a), t.lineTo(e + o, n + a), t.quadraticCurveTo(e, n + a, e, n + a - s), t.lineTo(e, n + s), t.quadraticCurveTo(e, n, e + o, n) } else t.rect(e, n, i, a) }, drawPoint: function (t, e, n, i, a) { var r, o, s, l, u, d; if (!e || "object" != typeof e || "[object HTMLImageElement]" !== (r = e.toString()) && "[object HTMLCanvasElement]" !== r) { if (!(isNaN(n) || n <= 0)) { switch (e) { default: t.beginPath(), t.arc(i, a, n, 0, 2 * Math.PI), t.closePath(), t.fill(); break; case "triangle": t.beginPath(), u = (o = 3 * n / Math.sqrt(3)) * Math.sqrt(3) / 2, t.moveTo(i - o / 2, a + u / 3), t.lineTo(i + o / 2, a + u / 3), t.lineTo(i, a - 2 * u / 3), t.closePath(), t.fill(); break; case "rect": d = 1 / Math.SQRT2 * n, t.beginPath(), t.fillRect(i - d, a - d, 2 * d, 2 * d), t.strokeRect(i - d, a - d, 2 * d, 2 * d); break; case "rectRounded": var c = n / Math.SQRT2, h = i - c, f = a - c, g = Math.SQRT2 * n; t.beginPath(), this.roundedRect(t, h, f, g, g, n / 2), t.closePath(), t.fill(); break; case "rectRot": d = 1 / Math.SQRT2 * n, t.beginPath(), t.moveTo(i - d, a), t.lineTo(i, a + d), t.lineTo(i + d, a), t.lineTo(i, a - d), t.closePath(), t.fill(); break; case "cross": t.beginPath(), t.moveTo(i, a + n), t.lineTo(i, a - n), t.moveTo(i - n, a), t.lineTo(i + n, a), t.closePath(); break; case "crossRot": t.beginPath(), s = Math.cos(Math.PI / 4) * n, l = Math.sin(Math.PI / 4) * n, t.moveTo(i - s, a - l), t.lineTo(i + s, a + l), t.moveTo(i - s, a + l), t.lineTo(i + s, a - l), t.closePath(); break; case "star": t.beginPath(), t.moveTo(i, a + n), t.lineTo(i, a - n), t.moveTo(i - n, a), t.lineTo(i + n, a), s = Math.cos(Math.PI / 4) * n, l = Math.sin(Math.PI / 4) * n, t.moveTo(i - s, a - l), t.lineTo(i + s, a + l), t.moveTo(i - s, a + l), t.lineTo(i + s, a - l), t.closePath(); break; case "line": t.beginPath(), t.moveTo(i - n, a), t.lineTo(i + n, a), t.closePath(); break; case "dash": t.beginPath(), t.moveTo(i, a), t.lineTo(i + n, a), t.closePath() }t.stroke() } } else t.drawImage(e, i - e.width / 2, a - e.height / 2, e.width, e.height) }, clipArea: function (t, e) { t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip() }, unclipArea: function (t) { t.restore() }, lineTo: function (t, e, n, i) { if (n.steppedLine) return "after" === n.steppedLine && !i || "after" !== n.steppedLine && i ? t.lineTo(e.x, n.y) : t.lineTo(n.x, e.y), void t.lineTo(n.x, n.y); n.tension ? t.bezierCurveTo(i ? e.controlPointPreviousX : e.controlPointNextX, i ? e.controlPointPreviousY : e.controlPointNextY, i ? n.controlPointNextX : n.controlPointPreviousX, i ? n.controlPointNextY : n.controlPointPreviousY, n.x, n.y) : t.lineTo(n.x, n.y) } }; i.clear = n.clear, i.drawRoundedRectangle = function (t) { t.beginPath(), n.roundedRect.apply(n, arguments), t.closePath() } }, { 42: 42 }], 42: [function (t, e, n) { "use strict"; var i = { noop: function () { }, uid: function () { var t = 0; return function () { return t++ } }(), isNullOrUndef: function (t) { return null === t || void 0 === t }, isArray: Array.isArray ? Array.isArray : function (t) { return "[object Array]" === Object.prototype.toString.call(t) }, isObject: function (t) { return null !== t && "[object Object]" === Object.prototype.toString.call(t) }, valueOrDefault: function (t, e) { return void 0 === t ? e : t }, valueAtIndexOrDefault: function (t, e, n) { return i.valueOrDefault(i.isArray(t) ? t[e] : t, n) }, callback: function (t, e, n) { if (t && "function" == typeof t.call) return t.apply(n, e) }, each: function (t, e, n, a) { var r, o, s; if (i.isArray(t)) if (o = t.length, a) for (r = o - 1; r >= 0; r--)e.call(n, t[r], r); else for (r = 0; r < o; r++)e.call(n, t[r], r); else if (i.isObject(t)) for (o = (s = Object.keys(t)).length, r = 0; r < o; r++)e.call(n, t[s[r]], s[r]) }, arrayEquals: function (t, e) { var n, a, r, o; if (!t || !e || t.length !== e.length) return !1; for (n = 0, a = t.length; n < a; ++n)if (r = t[n], o = e[n], r instanceof Array && o instanceof Array) { if (!i.arrayEquals(r, o)) return !1 } else if (r !== o) return !1; return !0 }, clone: function (t) { if (i.isArray(t)) return t.map(i.clone); if (i.isObject(t)) { for (var e = {}, n = Object.keys(t), a = n.length, r = 0; r < a; ++r)e[n[r]] = i.clone(t[n[r]]); return e } return t }, _merger: function (t, e, n, a) { var r = e[t], o = n[t]; i.isObject(r) && i.isObject(o) ? i.merge(r, o, a) : e[t] = i.clone(o) }, _mergerIf: function (t, e, n) { var a = e[t], r = n[t]; i.isObject(a) && i.isObject(r) ? i.mergeIf(a, r) : e.hasOwnProperty(t) || (e[t] = i.clone(r)) }, merge: function (t, e, n) { var a, r, o, s, l, u = i.isArray(e) ? e : [e], d = u.length; if (!i.isObject(t)) return t; for (a = (n = n || {}).merger || i._merger, r = 0; r < d; ++r)if (e = u[r], i.isObject(e)) for (l = 0, s = (o = Object.keys(e)).length; l < s; ++l)a(o[l], t, e, n); return t }, mergeIf: function (t, e) { return i.merge(t, e, { merger: i._mergerIf }) }, extend: function (t) { for (var e = 1, n = arguments.length; e < n; ++e)i.each(arguments[e], function (e, n) { t[n] = e }); return t }, inherits: function (t) { var e = this, n = t && t.hasOwnProperty("constructor") ? t.constructor : function () { return e.apply(this, arguments) }, a = function () { this.constructor = n }; return a.prototype = e.prototype, n.prototype = new a, n.extend = i.inherits, t && i.extend(n.prototype, t), n.__super__ = e.prototype, n } }; e.exports = i, i.callCallback = i.callback, i.indexOf = function (t, e, n) { return Array.prototype.indexOf.call(t, e, n) }, i.getValueOrDefault = i.valueOrDefault, i.getValueAtIndexOrDefault = i.valueAtIndexOrDefault }, {}], 43: [function (t, e, n) { "use strict"; var i = t(42), a = { linear: function (t) { return t }, easeInQuad: function (t) { return t * t }, easeOutQuad: function (t) { return -t * (t - 2) }, easeInOutQuad: function (t) { return (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1) }, easeInCubic: function (t) { return t * t * t }, easeOutCubic: function (t) { return (t -= 1) * t * t + 1 }, easeInOutCubic: function (t) { return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2) }, easeInQuart: function (t) { return t * t * t * t }, easeOutQuart: function (t) { return -((t -= 1) * t * t * t - 1) }, easeInOutQuart: function (t) { return (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2) }, easeInQuint: function (t) { return t * t * t * t * t }, easeOutQuint: function (t) { return (t -= 1) * t * t * t * t + 1 }, easeInOutQuint: function (t) { return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2) }, easeInSine: function (t) { return 1 - Math.cos(t * (Math.PI / 2)) }, easeOutSine: function (t) { return Math.sin(t * (Math.PI / 2)) }, easeInOutSine: function (t) { return -.5 * (Math.cos(Math.PI * t) - 1) }, easeInExpo: function (t) { return 0 === t ? 0 : Math.pow(2, 10 * (t - 1)) }, easeOutExpo: function (t) { return 1 === t ? 1 : 1 - Math.pow(2, -10 * t) }, easeInOutExpo: function (t) { return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * --t)) }, easeInCirc: function (t) { return t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1) }, easeOutCirc: function (t) { return Math.sqrt(1 - (t -= 1) * t) }, easeInOutCirc: function (t) { return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1) }, easeInElastic: function (t) { var e = 1.70158, n = 0, i = 1; return 0 === t ? 0 : 1 === t ? 1 : (n || (n = .3), i < 1 ? (i = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / i), -i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n)) }, easeOutElastic: function (t) { var e = 1.70158, n = 0, i = 1; return 0 === t ? 0 : 1 === t ? 1 : (n || (n = .3), i < 1 ? (i = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / i), i * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / n) + 1) }, easeInOutElastic: function (t) { var e = 1.70158, n = 0, i = 1; return 0 === t ? 0 : 2 == (t /= .5) ? 1 : (n || (n = .45), i < 1 ? (i = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / i), t < 1 ? i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n) * -.5 : i * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n) * .5 + 1) }, easeInBack: function (t) { var e = 1.70158; return t * t * ((e + 1) * t - e) }, easeOutBack: function (t) { var e = 1.70158; return (t -= 1) * t * ((e + 1) * t + e) + 1 }, easeInOutBack: function (t) { var e = 1.70158; return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2) }, easeInBounce: function (t) { return 1 - a.easeOutBounce(1 - t) }, easeOutBounce: function (t) { return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375 }, easeInOutBounce: function (t) { return t < .5 ? .5 * a.easeInBounce(2 * t) : .5 * a.easeOutBounce(2 * t - 1) + .5 } }; e.exports = { effects: a }, i.easingEffects = a }, { 42: 42 }], 44: [function (t, e, n) { "use strict"; var i = t(42); e.exports = { toLineHeight: function (t, e) { var n = ("" + t).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/); if (!n || "normal" === n[1]) return 1.2 * e; switch (t = +n[2], n[3]) { case "px": return t; case "%": t /= 100 }return e * t }, toPadding: function (t) { var e, n, a, r; return i.isObject(t) ? (e = +t.top || 0, n = +t.right || 0, a = +t.bottom || 0, r = +t.left || 0) : e = n = a = r = +t || 0, { top: e, right: n, bottom: a, left: r, height: e + a, width: r + n } }, resolve: function (t, e, n) { var a, r, o; for (a = 0, r = t.length; a < r; ++a)if (void 0 !== (o = t[a]) && (void 0 !== e && "function" == typeof o && (o = o(e)), void 0 !== n && i.isArray(o) && (o = o[n]), void 0 !== o)) return o } } }, { 42: 42 }], 45: [function (t, e, n) { "use strict"; e.exports = t(42), e.exports.easing = t(43), e.exports.canvas = t(41), e.exports.options = t(44) }, { 41: 41, 42: 42, 43: 43, 44: 44 }], 46: [function (t, e, n) { e.exports = { acquireContext: function (t) { return t && t.canvas && (t = t.canvas), t && t.getContext("2d") || null } } }, {}], 47: [function (t, e, n) { "use strict"; function i(t, e) { var n = p.getStyle(t, e), i = n && n.match(/^(\d+)(\.\d+)?px$/); return i ? Number(i[1]) : void 0 } function a(t, e) { var n = t.style, a = t.getAttribute("height"), r = t.getAttribute("width"); if (t[v] = { initial: { height: a, width: r, style: { display: n.display, height: n.height, width: n.width } } }, n.display = n.display || "block", null === r || "" === r) { var o = i(t, "width"); void 0 !== o && (t.width = o) } if (null === a || "" === a) if ("" === t.style.height) t.height = t.width / (e.options.aspectRatio || 2); else { var s = i(t, "height"); void 0 !== o && (t.height = s) } return t } function r(t, e, n) { t.addEventListener(e, n, w) } function o(t, e, n) { t.removeEventListener(e, n, w) } function s(t, e, n, i, a) { return { type: t, chart: e, native: a || null, x: void 0 !== n ? n : null, y: void 0 !== i ? i : null } } function l(t, e) { var n = k[t.type] || t.type, i = p.getRelativePosition(t, e); return s(n, e, i.x, i.y, t) } function u(t, e) { var n = !1, i = []; return function () { i = Array.prototype.slice.call(arguments), e = e || this, n || (n = !0, p.requestAnimFrame.call(window, function () { n = !1, t.apply(e, i) })) } } function d(t) { var e = document.createElement("div"), n = y + "size-monitor", i = "position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"; e.style.cssText = i, e.className = n, e.innerHTML = '<div class="' + n + '-expand" style="' + i + '"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="' + n + '-shrink" style="' + i + '"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div>'; var a = e.childNodes[0], o = e.childNodes[1]; e._reset = function () { a.scrollLeft = 1e6, a.scrollTop = 1e6, o.scrollLeft = 1e6, o.scrollTop = 1e6 }; var s = function () { e._reset(), t() }; return r(a, "scroll", s.bind(a, "expand")), r(o, "scroll", s.bind(o, "shrink")), e } function c(t, e) { var n = t[v] || (t[v] = {}), i = n.renderProxy = function (t) { t.animationName === x && e() }; p.each(_, function (e) { r(t, e, i) }), n.reflow = !!t.offsetParent, t.classList.add(b) } function h(t) { var e = t[v] || {}, n = e.renderProxy; n && (p.each(_, function (e) { o(t, e, n) }), delete e.renderProxy), t.classList.remove(b) } function f(t, e, n) { var i = t[v] || (t[v] = {}), a = i.resizer = d(u(function () { if (i.resizer) return e(s("resize", n)) })); c(t, function () { if (i.resizer) { var e = t.parentNode; e && e !== a.parentNode && e.insertBefore(a, e.firstChild), a._reset() } }) } function g(t) { var e = t[v] || {}, n = e.resizer; delete e.resizer, h(t), n && n.parentNode && n.parentNode.removeChild(n) } function m(t, e) { var n = t._style || document.createElement("style"); t._style || (t._style = n, e = "/* Chart.js */\n" + e, n.setAttribute("type", "text/css"), document.getElementsByTagName("head")[0].appendChild(n)), n.appendChild(document.createTextNode(e)) } var p = t(45), v = "$chartjs", y = "chartjs-", b = y + "render-monitor", x = y + "render-animation", _ = ["animationstart", "webkitAnimationStart"], k = { touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup", pointerenter: "mouseenter", pointerdown: "mousedown", pointermove: "mousemove", pointerup: "mouseup", pointerleave: "mouseout", pointerout: "mouseout" }, w = !!function () { var t = !1; try { var e = Object.defineProperty({}, "passive", { get: function () { t = !0 } }); window.addEventListener("e", null, e) } catch (t) { } return t }() && { passive: !0 }; e.exports = { _enabled: "undefined" != typeof window && "undefined" != typeof document, initialize: function () { var t = "from{opacity:0.99}to{opacity:1}"; m(this, "@-webkit-keyframes " + x + "{" + t + "}@keyframes " + x + "{" + t + "}." + b + "{-webkit-animation:" + x + " 0.001s;animation:" + x + " 0.001s;}") }, acquireContext: function (t, e) { "string" == typeof t ? t = document.getElementById(t) : t.length && (t = t[0]), t && t.canvas && (t = t.canvas); var n = t && t.getContext && t.getContext("2d"); return n && n.canvas === t ? (a(t, e), n) : null }, releaseContext: function (t) { var e = t.canvas; if (e[v]) { var n = e[v].initial;["height", "width"].forEach(function (t) { var i = n[t]; p.isNullOrUndef(i) ? e.removeAttribute(t) : e.setAttribute(t, i) }), p.each(n.style || {}, function (t, n) { e.style[n] = t }), e.width = e.width, delete e[v] } }, addEventListener: function (t, e, n) { var i = t.canvas; if ("resize" !== e) { var a = n[v] || (n[v] = {}); r(i, e, (a.proxies || (a.proxies = {}))[t.id + "_" + e] = function (e) { n(l(e, t)) }) } else f(i, n, t) }, removeEventListener: function (t, e, n) { var i = t.canvas; if ("resize" !== e) { var a = ((n[v] || {}).proxies || {})[t.id + "_" + e]; a && o(i, e, a) } else g(i) } }, p.addEvent = r, p.removeEvent = o }, { 45: 45 }], 48: [function (t, e, n) { "use strict"; var i = t(45), a = t(46), r = t(47), o = r._enabled ? r : a; e.exports = i.extend({ initialize: function () { }, acquireContext: function () { }, releaseContext: function () { }, addEventListener: function () { }, removeEventListener: function () { } }, o) }, { 45: 45, 46: 46, 47: 47 }], 49: [function (t, e, n) { "use strict"; var i = t(25), a = t(40), r = t(45); i._set("global", { plugins: { filler: { propagate: !0 } } }), e.exports = function () { function t(t, e, n) { var i, a = t._model || {}, r = a.fill; if (void 0 === r && (r = !!a.backgroundColor), !1 === r || null === r) return !1; if (!0 === r) return "origin"; if (i = parseFloat(r, 10), isFinite(i) && Math.floor(i) === i) return "-" !== r[0] && "+" !== r[0] || (i = e + i), !(i === e || i < 0 || i >= n) && i; switch (r) { case "bottom": return "start"; case "top": return "end"; case "zero": return "origin"; case "origin": case "start": case "end": return r; default: return !1 } } function e(t) { var e, n = t.el._model || {}, i = t.el._scale || {}, a = t.fill, r = null; if (isFinite(a)) return null; if ("start" === a ? r = void 0 === n.scaleBottom ? i.bottom : n.scaleBottom : "end" === a ? r = void 0 === n.scaleTop ? i.top : n.scaleTop : void 0 !== n.scaleZero ? r = n.scaleZero : i.getBasePosition ? r = i.getBasePosition() : i.getBasePixel && (r = i.getBasePixel()), void 0 !== r && null !== r) { if (void 0 !== r.x && void 0 !== r.y) return r; if ("number" == typeof r && isFinite(r)) return e = i.isHorizontal(), { x: e ? r : null, y: e ? null : r } } return null } function n(t, e, n) { var i, a = t[e].fill, r = [e]; if (!n) return a; for (; !1 !== a && -1 === r.indexOf(a);) { if (!isFinite(a)) return a; if (!(i = t[a])) return !1; if (i.visible) return a; r.push(a), a = i.fill } return !1 } function o(t) { var e = t.fill, n = "dataset"; return !1 === e ? null : (isFinite(e) || (n = "boundary"), d[n](t)) } function s(t) { return t && !t.skip } function l(t, e, n, i, a) { var o; if (i && a) { for (t.moveTo(e[0].x, e[0].y), o = 1; o < i; ++o)r.canvas.lineTo(t, e[o - 1], e[o]); for (t.lineTo(n[a - 1].x, n[a - 1].y), o = a - 1; o > 0; --o)r.canvas.lineTo(t, n[o], n[o - 1], !0) } } function u(t, e, n, i, a, r) { var o, u, d, c, h, f, g, m = e.length, p = i.spanGaps, v = [], y = [], b = 0, x = 0; for (t.beginPath(), o = 0, u = m + !!r; o < u; ++o)h = n(c = e[d = o % m]._view, d, i), f = s(c), g = s(h), f && g ? (b = v.push(c), x = y.push(h)) : b && x && (p ? (f && v.push(c), g && y.push(h)) : (l(t, v, y, b, x), b = x = 0, v = [], y = [])); l(t, v, y, b, x), t.closePath(), t.fillStyle = a, t.fill() } var d = { dataset: function (t) { var e = t.fill, n = t.chart, i = n.getDatasetMeta(e), a = i && n.isDatasetVisible(e) && i.dataset._children || [], r = a.length || 0; return r ? function (t, e) { return e < r && a[e]._view || null } : null }, boundary: function (t) { var e = t.boundary, n = e ? e.x : null, i = e ? e.y : null; return function (t) { return { x: null === n ? t.x : n, y: null === i ? t.y : i } } } }; return { id: "filler", afterDatasetsUpdate: function (i, r) { var s, l, u, d, c = (i.data.datasets || []).length, h = r.propagate, f = []; for (l = 0; l < c; ++l)d = null, (u = (s = i.getDatasetMeta(l)).dataset) && u._model && u instanceof a.Line && (d = { visible: i.isDatasetVisible(l), fill: t(u, l, c), chart: i, el: u }), s.$filler = d, f.push(d); for (l = 0; l < c; ++l)(d = f[l]) && (d.fill = n(f, l, h), d.boundary = e(d), d.mapper = o(d)) }, beforeDatasetDraw: function (t, e) { var n = e.meta.$filler; if (n) { var a = t.ctx, o = n.el, s = o._view, l = o._children || [], d = n.mapper, c = s.backgroundColor || i.global.defaultColor; d && c && l.length && (r.canvas.clipArea(a, t.chartArea), u(a, l, d, s, c, o._loop), r.canvas.unclipArea(a)) } } } } }, { 25: 25, 40: 40, 45: 45 }], 50: [function (t, e, n) { "use strict"; var i = t(25), a = t(26), r = t(45); i._set("global", { legend: { display: !0, position: "top", fullWidth: !0, reverse: !1, weight: 1e3, onClick: function (t, e) { var n = e.datasetIndex, i = this.chart, a = i.getDatasetMeta(n); a.hidden = null === a.hidden ? !i.data.datasets[n].hidden : null, i.update() }, onHover: null, labels: { boxWidth: 40, padding: 10, generateLabels: function (t) { var e = t.data; return r.isArray(e.datasets) ? e.datasets.map(function (e, n) { return { text: e.label, fillStyle: r.isArray(e.backgroundColor) ? e.backgroundColor[0] : e.backgroundColor, hidden: !t.isDatasetVisible(n), lineCap: e.borderCapStyle, lineDash: e.borderDash, lineDashOffset: e.borderDashOffset, lineJoin: e.borderJoinStyle, lineWidth: e.borderWidth, strokeStyle: e.borderColor, pointStyle: e.pointStyle, datasetIndex: n } }, this) : [] } } }, legendCallback: function (t) { var e = []; e.push('<ul class="' + t.id + '-legend">'); for (var n = 0; n < t.data.datasets.length; n++)e.push('<li><span style="background-color:' + t.data.datasets[n].backgroundColor + '"></span>'), t.data.datasets[n].label && e.push(t.data.datasets[n].label), e.push("</li>"); return e.push("</ul>"), e.join("") } }), e.exports = function (t) { function e(t, e) { return t.usePointStyle ? e * Math.SQRT2 : t.boxWidth } function n(e, n) { var i = new t.Legend({ ctx: e.ctx, options: n, chart: e }); o.configure(e, i, n), o.addBox(e, i), e.legend = i } var o = t.layoutService, s = r.noop; return t.Legend = a.extend({ initialize: function (t) { r.extend(this, t), this.legendHitBoxes = [], this.doughnutMode = !1 }, beforeUpdate: s, update: function (t, e, n) { var i = this; return i.beforeUpdate(), i.maxWidth = t, i.maxHeight = e, i.margins = n, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize }, afterUpdate: s, beforeSetDimensions: s, setDimensions: function () { var t = this; t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = { width: 0, height: 0 } }, afterSetDimensions: s, beforeBuildLabels: s, buildLabels: function () { var t = this, e = t.options.labels || {}, n = r.callback(e.generateLabels, [t.chart], t) || []; e.filter && (n = n.filter(function (n) { return e.filter(n, t.chart.data) })), t.options.reverse && n.reverse(), t.legendItems = n }, afterBuildLabels: s, beforeFit: s, fit: function () { var t = this, n = t.options, a = n.labels, o = n.display, s = t.ctx, l = i.global, u = r.valueOrDefault, d = u(a.fontSize, l.defaultFontSize), c = u(a.fontStyle, l.defaultFontStyle), h = u(a.fontFamily, l.defaultFontFamily), f = r.fontString(d, c, h), g = t.legendHitBoxes = [], m = t.minSize, p = t.isHorizontal(); if (p ? (m.width = t.maxWidth, m.height = o ? 10 : 0) : (m.width = o ? 10 : 0, m.height = t.maxHeight), o) if (s.font = f, p) { var v = t.lineWidths = [0], y = t.legendItems.length ? d + a.padding : 0; s.textAlign = "left", s.textBaseline = "top", r.each(t.legendItems, function (n, i) { var r = e(a, d) + d / 2 + s.measureText(n.text).width; v[v.length - 1] + r + a.padding >= t.width && (y += d + a.padding, v[v.length] = t.left), g[i] = { left: 0, top: 0, width: r, height: d }, v[v.length - 1] += r + a.padding }), m.height += y } else { var b = a.padding, x = t.columnWidths = [], _ = a.padding, k = 0, w = 0, M = d + b; r.each(t.legendItems, function (t, n) { var i = e(a, d) + d / 2 + s.measureText(t.text).width; w + M > m.height && (_ += k + a.padding, x.push(k), k = 0, w = 0), k = Math.max(k, i), w += M, g[n] = { left: 0, top: 0, width: i, height: d } }), _ += k, x.push(k), m.width += _ } t.width = m.width, t.height = m.height }, afterFit: s, isHorizontal: function () { return "top" === this.options.position || "bottom" === this.options.position }, draw: function () { var t = this, n = t.options, a = n.labels, o = i.global, s = o.elements.line, l = t.width, u = t.lineWidths; if (n.display) { var d, c = t.ctx, h = r.valueOrDefault, f = h(a.fontColor, o.defaultFontColor), g = h(a.fontSize, o.defaultFontSize), m = h(a.fontStyle, o.defaultFontStyle), p = h(a.fontFamily, o.defaultFontFamily), v = r.fontString(g, m, p); c.textAlign = "left", c.textBaseline = "middle", c.lineWidth = .5, c.strokeStyle = f, c.fillStyle = f, c.font = v; var y = e(a, g), b = t.legendHitBoxes, x = function (t, e, i) { if (!(isNaN(y) || y <= 0)) { c.save(), c.fillStyle = h(i.fillStyle, o.defaultColor), c.lineCap = h(i.lineCap, s.borderCapStyle), c.lineDashOffset = h(i.lineDashOffset, s.borderDashOffset), c.lineJoin = h(i.lineJoin, s.borderJoinStyle), c.lineWidth = h(i.lineWidth, s.borderWidth), c.strokeStyle = h(i.strokeStyle, o.defaultColor); var a = 0 === h(i.lineWidth, s.borderWidth); if (c.setLineDash && c.setLineDash(h(i.lineDash, s.borderDash)), n.labels && n.labels.usePointStyle) { var l = g * Math.SQRT2 / 2, u = l / Math.SQRT2, d = t + u, f = e + u; r.canvas.drawPoint(c, i.pointStyle, l, d, f) } else a || c.strokeRect(t, e, y, g), c.fillRect(t, e, y, g); c.restore() } }, _ = function (t, e, n, i) { var a = g / 2, r = y + a + t, o = e + a; c.fillText(n.text, r, o), n.hidden && (c.beginPath(), c.lineWidth = 2, c.moveTo(r, o), c.lineTo(r + i, o), c.stroke()) }, k = t.isHorizontal(); d = k ? { x: t.left + (l - u[0]) / 2, y: t.top + a.padding, line: 0 } : { x: t.left + a.padding, y: t.top + a.padding, line: 0 }; var w = g + a.padding; r.each(t.legendItems, function (e, n) { var i = c.measureText(e.text).width, r = y + g / 2 + i, o = d.x, s = d.y; k ? o + r >= l && (s = d.y += w, d.line++ , o = d.x = t.left + (l - u[d.line]) / 2) : s + w > t.bottom && (o = d.x = o + t.columnWidths[d.line] + a.padding, s = d.y = t.top + a.padding, d.line++), x(o, s, e), b[n].left = o, b[n].top = s, _(o, s, e, i), k ? d.x += r + a.padding : d.y += w }) } }, handleEvent: function (t) { var e = this, n = e.options, i = "mouseup" === t.type ? "click" : t.type, a = !1; if ("mousemove" === i) { if (!n.onHover) return } else { if ("click" !== i) return; if (!n.onClick) return } var r = t.x, o = t.y; if (r >= e.left && r <= e.right && o >= e.top && o <= e.bottom) for (var s = e.legendHitBoxes, l = 0; l < s.length; ++l) { var u = s[l]; if (r >= u.left && r <= u.left + u.width && o >= u.top && o <= u.top + u.height) { if ("click" === i) { n.onClick.call(e, t.native, e.legendItems[l]), a = !0; break } if ("mousemove" === i) { n.onHover.call(e, t.native, e.legendItems[l]), a = !0; break } } } return a } }), { id: "legend", beforeInit: function (t) { var e = t.options.legend; e && n(t, e) }, beforeUpdate: function (t) { var e = t.options.legend, a = t.legend; e ? (r.mergeIf(e, i.global.legend), a ? (o.configure(t, a, e), a.options = e) : n(t, e)) : a && (o.removeBox(t, a), delete t.legend) }, afterEvent: function (t, e) { var n = t.legend; n && n.handleEvent(e) } } } }, { 25: 25, 26: 26, 45: 45 }], 51: [function (t, e, n) { "use strict"; var i = t(25), a = t(26), r = t(45); i._set("global", { title: { display: !1, fontStyle: "bold", fullWidth: !0, lineHeight: 1.2, padding: 10, position: "top", text: "", weight: 2e3 } }), e.exports = function (t) { function e(e, i) { var a = new t.Title({ ctx: e.ctx, options: i, chart: e }); n.configure(e, a, i), n.addBox(e, a), e.titleBlock = a } var n = t.layoutService, o = r.noop; return t.Title = a.extend({ initialize: function (t) { var e = this; r.extend(e, t), e.legendHitBoxes = [] }, beforeUpdate: o, update: function (t, e, n) { var i = this; return i.beforeUpdate(), i.maxWidth = t, i.maxHeight = e, i.margins = n, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize }, afterUpdate: o, beforeSetDimensions: o, setDimensions: function () { var t = this; t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = { width: 0, height: 0 } }, afterSetDimensions: o, beforeBuildLabels: o, buildLabels: o, afterBuildLabels: o, beforeFit: o, fit: function () { var t = this, e = r.valueOrDefault, n = t.options, a = n.display, o = e(n.fontSize, i.global.defaultFontSize), s = t.minSize, l = r.isArray(n.text) ? n.text.length : 1, u = r.options.toLineHeight(n.lineHeight, o), d = a ? l * u + 2 * n.padding : 0; t.isHorizontal() ? (s.width = t.maxWidth, s.height = d) : (s.width = d, s.height = t.maxHeight), t.width = s.width, t.height = s.height }, afterFit: o, isHorizontal: function () { var t = this.options.position; return "top" === t || "bottom" === t }, draw: function () { var t = this, e = t.ctx, n = r.valueOrDefault, a = t.options, o = i.global; if (a.display) { var s, l, u, d = n(a.fontSize, o.defaultFontSize), c = n(a.fontStyle, o.defaultFontStyle), h = n(a.fontFamily, o.defaultFontFamily), f = r.fontString(d, c, h), g = r.options.toLineHeight(a.lineHeight, d), m = g / 2 + a.padding, p = 0, v = t.top, y = t.left, b = t.bottom, x = t.right; e.fillStyle = n(a.fontColor, o.defaultFontColor), e.font = f, t.isHorizontal() ? (l = y + (x - y) / 2, u = v + m, s = x - y) : (l = "left" === a.position ? y + m : x - m, u = v + (b - v) / 2, s = b - v, p = Math.PI * ("left" === a.position ? -.5 : .5)), e.save(), e.translate(l, u), e.rotate(p), e.textAlign = "center", e.textBaseline = "middle"; var _ = a.text; if (r.isArray(_)) for (var k = 0, w = 0; w < _.length; ++w)e.fillText(_[w], 0, k, s), k += g; else e.fillText(_, 0, 0, s); e.restore() } } }), { id: "title", beforeInit: function (t) { var n = t.options.title; n && e(t, n) }, beforeUpdate: function (a) { var o = a.options.title, s = a.titleBlock; o ? (r.mergeIf(o, i.global.title), s ? (n.configure(a, s, o), s.options = o) : e(a, o)) : s && (t.layoutService.removeBox(a, s), delete a.titleBlock) } } } }, { 25: 25, 26: 26, 45: 45 }], 52: [function (t, e, n) { "use strict"; e.exports = function (t) { var e = t.Scale.extend({ getLabels: function () { var t = this.chart.data; return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels }, determineDataLimits: function () { var t = this, e = t.getLabels(); t.minIndex = 0, t.maxIndex = e.length - 1; var n; void 0 !== t.options.ticks.min && (n = e.indexOf(t.options.ticks.min), t.minIndex = -1 !== n ? n : t.minIndex), void 0 !== t.options.ticks.max && (n = e.indexOf(t.options.ticks.max), t.maxIndex = -1 !== n ? n : t.maxIndex), t.min = e[t.minIndex], t.max = e[t.maxIndex] }, buildTicks: function () { var t = this, e = t.getLabels(); t.ticks = 0 === t.minIndex && t.maxIndex === e.length - 1 ? e : e.slice(t.minIndex, t.maxIndex + 1) }, getLabelForIndex: function (t, e) { var n = this, i = n.chart.data, a = n.isHorizontal(); return i.yLabels && !a ? n.getRightValue(i.datasets[e].data[t]) : n.ticks[t - n.minIndex] }, getPixelForValue: function (t, e) { var n, i = this, a = i.options.offset, r = Math.max(i.maxIndex + 1 - i.minIndex - (a ? 0 : 1), 1); if (void 0 !== t && null !== t && (n = i.isHorizontal() ? t.x : t.y), void 0 !== n || void 0 !== t && isNaN(e)) { var o = i.getLabels(); t = n || t; var s = o.indexOf(t); e = -1 !== s ? s : e } if (i.isHorizontal()) { var l = i.width / r, u = l * (e - i.minIndex); return a && (u += l / 2), i.left + Math.round(u) } var d = i.height / r, c = d * (e - i.minIndex); return a && (c += d / 2), i.top + Math.round(c) }, getPixelForTick: function (t) { return this.getPixelForValue(this.ticks[t], t + this.minIndex, null) }, getValueForPixel: function (t) { var e = this, n = e.options.offset, i = Math.max(e._ticks.length - (n ? 0 : 1), 1), a = e.isHorizontal(), r = (a ? e.width : e.height) / i; return t -= a ? e.left : e.top, n && (t -= r / 2), (t <= 0 ? 0 : Math.round(t / r)) + e.minIndex }, getBasePixel: function () { return this.bottom } }); t.scaleService.registerScaleType("category", e, { position: "bottom" }) } }, {}], 53: [function (t, e, n) { "use strict"; var i = t(25), a = t(45), r = t(34); e.exports = function (t) { var e = { position: "left", ticks: { callback: r.formatters.linear } }, n = t.LinearScaleBase.extend({ determineDataLimits: function () { function t(t) { return o ? t.xAxisID === e.id : t.yAxisID === e.id } var e = this, n = e.options, i = e.chart, r = i.data.datasets, o = e.isHorizontal(); e.min = null, e.max = null; var s = n.stacked; if (void 0 === s && a.each(r, function (e, n) { if (!s) { var a = i.getDatasetMeta(n); i.isDatasetVisible(n) && t(a) && void 0 !== a.stack && (s = !0) } }), n.stacked || s) { var l = {}; a.each(r, function (r, o) { var s = i.getDatasetMeta(o), u = [s.type, void 0 === n.stacked && void 0 === s.stack ? o : "", s.stack].join("."); void 0 === l[u] && (l[u] = { positiveValues: [], negativeValues: [] }); var d = l[u].positiveValues, c = l[u].negativeValues; i.isDatasetVisible(o) && t(s) && a.each(r.data, function (t, i) { var a = +e.getRightValue(t); isNaN(a) || s.data[i].hidden || (d[i] = d[i] || 0, c[i] = c[i] || 0, n.relativePoints ? d[i] = 100 : a < 0 ? c[i] += a : d[i] += a) }) }), a.each(l, function (t) { var n = t.positiveValues.concat(t.negativeValues), i = a.min(n), r = a.max(n); e.min = null === e.min ? i : Math.min(e.min, i), e.max = null === e.max ? r : Math.max(e.max, r) }) } else a.each(r, function (n, r) { var o = i.getDatasetMeta(r); i.isDatasetVisible(r) && t(o) && a.each(n.data, function (t, n) { var i = +e.getRightValue(t); isNaN(i) || o.data[n].hidden || (null === e.min ? e.min = i : i < e.min && (e.min = i), null === e.max ? e.max = i : i > e.max && (e.max = i)) }) }); e.min = isFinite(e.min) && !isNaN(e.min) ? e.min : 0, e.max = isFinite(e.max) && !isNaN(e.max) ? e.max : 1, this.handleTickRangeOptions() }, getTickLimit: function () { var t, e = this, n = e.options.ticks; if (e.isHorizontal()) t = Math.min(n.maxTicksLimit ? n.maxTicksLimit : 11, Math.ceil(e.width / 50)); else { var r = a.valueOrDefault(n.fontSize, i.global.defaultFontSize); t = Math.min(n.maxTicksLimit ? n.maxTicksLimit : 11, Math.ceil(e.height / (2 * r))) } return t }, handleDirectionalChanges: function () { this.isHorizontal() || this.ticks.reverse() }, getLabelForIndex: function (t, e) { return +this.getRightValue(this.chart.data.datasets[e].data[t]) }, getPixelForValue: function (t) { var e, n = this, i = n.start, a = +n.getRightValue(t), r = n.end - i; return n.isHorizontal() ? (e = n.left + n.width / r * (a - i), Math.round(e)) : (e = n.bottom - n.height / r * (a - i), Math.round(e)) }, getValueForPixel: function (t) { var e = this, n = e.isHorizontal(), i = n ? e.width : e.height, a = (n ? t - e.left : e.bottom - t) / i; return e.start + (e.end - e.start) * a }, getPixelForTick: function (t) { return this.getPixelForValue(this.ticksAsNumbers[t]) } }); t.scaleService.registerScaleType("linear", n, e) } }, { 25: 25, 34: 34, 45: 45 }], 54: [function (t, e, n) { "use strict"; var i = t(45), a = t(34); e.exports = function (t) { var e = i.noop; t.LinearScaleBase = t.Scale.extend({ getRightValue: function (e) { return "string" == typeof e ? +e : t.Scale.prototype.getRightValue.call(this, e) }, handleTickRangeOptions: function () { var t = this, e = t.options.ticks; if (e.beginAtZero) { var n = i.sign(t.min), a = i.sign(t.max); n < 0 && a < 0 ? t.max = 0 : n > 0 && a > 0 && (t.min = 0) } var r = void 0 !== e.min || void 0 !== e.suggestedMin, o = void 0 !== e.max || void 0 !== e.suggestedMax; void 0 !== e.min ? t.min = e.min : void 0 !== e.suggestedMin && (null === t.min ? t.min = e.suggestedMin : t.min = Math.min(t.min, e.suggestedMin)), void 0 !== e.max ? t.max = e.max : void 0 !== e.suggestedMax && (null === t.max ? t.max = e.suggestedMax : t.max = Math.max(t.max, e.suggestedMax)), r !== o && t.min >= t.max && (r ? t.max = t.min + 1 : t.min = t.max - 1), t.min === t.max && (t.max++ , e.beginAtZero || t.min--) }, getTickLimit: e, handleDirectionalChanges: e, buildTicks: function () { var t = this, e = t.options.ticks, n = t.getTickLimit(), r = { maxTicks: n = Math.max(2, n), min: e.min, max: e.max, stepSize: i.valueOrDefault(e.fixedStepSize, e.stepSize) }, o = t.ticks = a.generators.linear(r, t); t.handleDirectionalChanges(), t.max = i.max(o), t.min = i.min(o), e.reverse ? (o.reverse(), t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max) }, convertTicksToLabels: function () { var e = this; e.ticksAsNumbers = e.ticks.slice(), e.zeroLineIndex = e.ticks.indexOf(0), t.Scale.prototype.convertTicksToLabels.call(e) } }) } }, { 34: 34, 45: 45 }], 55: [function (t, e, n) { "use strict"; var i = t(45), a = t(34); e.exports = function (t) { var e = { position: "left", ticks: { callback: a.formatters.logarithmic } }, n = t.Scale.extend({ determineDataLimits: function () { function t(t) { return l ? t.xAxisID === e.id : t.yAxisID === e.id } var e = this, n = e.options, a = n.ticks, r = e.chart, o = r.data.datasets, s = i.valueOrDefault, l = e.isHorizontal(); e.min = null, e.max = null, e.minNotZero = null; var u = n.stacked; if (void 0 === u && i.each(o, function (e, n) { if (!u) { var i = r.getDatasetMeta(n); r.isDatasetVisible(n) && t(i) && void 0 !== i.stack && (u = !0) } }), n.stacked || u) { var d = {}; i.each(o, function (a, o) { var s = r.getDatasetMeta(o), l = [s.type, void 0 === n.stacked && void 0 === s.stack ? o : "", s.stack].join("."); r.isDatasetVisible(o) && t(s) && (void 0 === d[l] && (d[l] = []), i.each(a.data, function (t, i) { var a = d[l], r = +e.getRightValue(t); isNaN(r) || s.data[i].hidden || (a[i] = a[i] || 0, n.relativePoints ? a[i] = 100 : a[i] += r) })) }), i.each(d, function (t) { var n = i.min(t), a = i.max(t); e.min = null === e.min ? n : Math.min(e.min, n), e.max = null === e.max ? a : Math.max(e.max, a) }) } else i.each(o, function (n, a) { var o = r.getDatasetMeta(a); r.isDatasetVisible(a) && t(o) && i.each(n.data, function (t, n) { var i = +e.getRightValue(t); isNaN(i) || o.data[n].hidden || (null === e.min ? e.min = i : i < e.min && (e.min = i), null === e.max ? e.max = i : i > e.max && (e.max = i), 0 !== i && (null === e.minNotZero || i < e.minNotZero) && (e.minNotZero = i)) }) }); e.min = s(a.min, e.min), e.max = s(a.max, e.max), e.min === e.max && (0 !== e.min && null !== e.min ? (e.min = Math.pow(10, Math.floor(i.log10(e.min)) - 1), e.max = Math.pow(10, Math.floor(i.log10(e.max)) + 1)) : (e.min = 1, e.max = 10)) }, buildTicks: function () { var t = this, e = t.options.ticks, n = { min: e.min, max: e.max }, r = t.ticks = a.generators.logarithmic(n, t); t.isHorizontal() || r.reverse(), t.max = i.max(r), t.min = i.min(r), e.reverse ? (r.reverse(), t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max) }, convertTicksToLabels: function () { this.tickValues = this.ticks.slice(), t.Scale.prototype.convertTicksToLabels.call(this) }, getLabelForIndex: function (t, e) { return +this.getRightValue(this.chart.data.datasets[e].data[t]) }, getPixelForTick: function (t) { return this.getPixelForValue(this.tickValues[t]) }, getPixelForValue: function (t) { var e, n, a, r = this, o = r.start, s = +r.getRightValue(t), l = r.options.ticks; return r.isHorizontal() ? (a = i.log10(r.end) - i.log10(o), 0 === s ? n = r.left : (e = r.width, n = r.left + e / a * (i.log10(s) - i.log10(o)))) : (e = r.height, 0 !== o || l.reverse ? 0 === r.end && l.reverse ? (a = i.log10(r.start) - i.log10(r.minNotZero), n = s === r.end ? r.top : s === r.minNotZero ? r.top + .02 * e : r.top + .02 * e + .98 * e / a * (i.log10(s) - i.log10(r.minNotZero))) : 0 === s ? n = l.reverse ? r.top : r.bottom : (a = i.log10(r.end) - i.log10(o), e = r.height, n = r.bottom - e / a * (i.log10(s) - i.log10(o))) : (a = i.log10(r.end) - i.log10(r.minNotZero), n = s === o ? r.bottom : s === r.minNotZero ? r.bottom - .02 * e : r.bottom - .02 * e - .98 * e / a * (i.log10(s) - i.log10(r.minNotZero)))), n }, getValueForPixel: function (t) { var e, n, a = this, r = i.log10(a.end) - i.log10(a.start); return a.isHorizontal() ? (n = a.width, e = a.start * Math.pow(10, (t - a.left) * r / n)) : (n = a.height, e = Math.pow(10, (a.bottom - t) * r / n) / a.start), e } }); t.scaleService.registerScaleType("logarithmic", n, e) } }, { 34: 34, 45: 45 }], 56: [function (t, e, n) { "use strict"; var i = t(25), a = t(45), r = t(34); e.exports = function (t) { function e(t) { var e = t.options; return e.angleLines.display || e.pointLabels.display ? t.chart.data.labels.length : 0 } function n(t) { var e = t.options.pointLabels, n = a.valueOrDefault(e.fontSize, p.defaultFontSize), i = a.valueOrDefault(e.fontStyle, p.defaultFontStyle), r = a.valueOrDefault(e.fontFamily, p.defaultFontFamily); return { size: n, style: i, family: r, font: a.fontString(n, i, r) } } function o(t, e, n) { return a.isArray(n) ? { w: a.longestText(t, t.font, n), h: n.length * e + 1.5 * (n.length - 1) * e } : { w: t.measureText(n).width, h: e } } function s(t, e, n, i, a) { return t === i || t === a ? { start: e - n / 2, end: e + n / 2 } : t < i || t > a ? { start: e - n - 5, end: e } : { start: e, end: e + n + 5 } } function l(t) { var i, r, l, u = n(t), d = Math.min(t.height / 2, t.width / 2), c = { r: t.width, l: 0, t: t.height, b: 0 }, h = {}; t.ctx.font = u.font, t._pointLabelSizes = []; var f = e(t); for (i = 0; i < f; i++) { l = t.getPointPosition(i, d), r = o(t.ctx, u.size, t.pointLabels[i] || ""), t._pointLabelSizes[i] = r; var g = t.getIndexAngle(i), m = a.toDegrees(g) % 360, p = s(m, l.x, r.w, 0, 180), v = s(m, l.y, r.h, 90, 270); p.start < c.l && (c.l = p.start, h.l = g), p.end > c.r && (c.r = p.end, h.r = g), v.start < c.t && (c.t = v.start, h.t = g), v.end > c.b && (c.b = v.end, h.b = g) } t.setReductions(d, c, h) } function u(t) { var e = Math.min(t.height / 2, t.width / 2); t.drawingArea = Math.round(e), t.setCenterPoint(0, 0, 0, 0) } function d(t) { return 0 === t || 180 === t ? "center" : t < 180 ? "left" : "right" } function c(t, e, n, i) { if (a.isArray(e)) for (var r = n.y, o = 1.5 * i, s = 0; s < e.length; ++s)t.fillText(e[s], n.x, r), r += o; else t.fillText(e, n.x, n.y) } function h(t, e, n) { 90 === t || 270 === t ? n.y -= e.h / 2 : (t > 270 || t < 90) && (n.y -= e.h) } function f(t) { var i = t.ctx, r = a.valueOrDefault, o = t.options, s = o.angleLines, l = o.pointLabels; i.lineWidth = s.lineWidth, i.strokeStyle = s.color; var u = t.getDistanceFromCenterForValue(o.ticks.reverse ? t.min : t.max), f = n(t); i.textBaseline = "top"; for (var g = e(t) - 1; g >= 0; g--) { if (s.display) { var m = t.getPointPosition(g, u); i.beginPath(), i.moveTo(t.xCenter, t.yCenter), i.lineTo(m.x, m.y), i.stroke(), i.closePath() } if (l.display) { var v = t.getPointPosition(g, u + 5), y = r(l.fontColor, p.defaultFontColor); i.font = f.font, i.fillStyle = y; var b = t.getIndexAngle(g), x = a.toDegrees(b); i.textAlign = d(x), h(x, t._pointLabelSizes[g], v), c(i, t.pointLabels[g] || "", v, f.size) } } } function g(t, n, i, r) { var o = t.ctx; if (o.strokeStyle = a.valueAtIndexOrDefault(n.color, r - 1), o.lineWidth = a.valueAtIndexOrDefault(n.lineWidth, r - 1), t.options.gridLines.circular) o.beginPath(), o.arc(t.xCenter, t.yCenter, i, 0, 2 * Math.PI), o.closePath(), o.stroke(); else { var s = e(t); if (0 === s) return; o.beginPath(); var l = t.getPointPosition(0, i); o.moveTo(l.x, l.y); for (var u = 1; u < s; u++)l = t.getPointPosition(u, i), o.lineTo(l.x, l.y); o.closePath(), o.stroke() } } function m(t) { return a.isNumber(t) ? t : 0 } var p = i.global, v = { display: !0, animate: !0, position: "chartArea", angleLines: { display: !0, color: "rgba(0, 0, 0, 0.1)", lineWidth: 1 }, gridLines: { circular: !1 }, ticks: { showLabelBackdrop: !0, backdropColor: "rgba(255,255,255,0.75)", backdropPaddingY: 2, backdropPaddingX: 2, callback: r.formatters.linear }, pointLabels: { display: !0, fontSize: 10, callback: function (t) { return t } } }, y = t.LinearScaleBase.extend({ setDimensions: function () { var t = this, e = t.options, n = e.ticks; t.width = t.maxWidth, t.height = t.maxHeight, t.xCenter = Math.round(t.width / 2), t.yCenter = Math.round(t.height / 2); var i = a.min([t.height, t.width]), r = a.valueOrDefault(n.fontSize, p.defaultFontSize); t.drawingArea = e.display ? i / 2 - (r / 2 + n.backdropPaddingY) : i / 2 }, determineDataLimits: function () { var t = this, e = t.chart, n = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY; a.each(e.data.datasets, function (r, o) { if (e.isDatasetVisible(o)) { var s = e.getDatasetMeta(o); a.each(r.data, function (e, a) { var r = +t.getRightValue(e); isNaN(r) || s.data[a].hidden || (n = Math.min(r, n), i = Math.max(r, i)) }) } }), t.min = n === Number.POSITIVE_INFINITY ? 0 : n, t.max = i === Number.NEGATIVE_INFINITY ? 0 : i, t.handleTickRangeOptions() }, getTickLimit: function () { var t = this.options.ticks, e = a.valueOrDefault(t.fontSize, p.defaultFontSize); return Math.min(t.maxTicksLimit ? t.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * e))) }, convertTicksToLabels: function () { var e = this; t.LinearScaleBase.prototype.convertTicksToLabels.call(e), e.pointLabels = e.chart.data.labels.map(e.options.pointLabels.callback, e) }, getLabelForIndex: function (t, e) { return +this.getRightValue(this.chart.data.datasets[e].data[t]) }, fit: function () { this.options.pointLabels.display ? l(this) : u(this) }, setReductions: function (t, e, n) { var i = this, a = e.l / Math.sin(n.l), r = Math.max(e.r - i.width, 0) / Math.sin(n.r), o = -e.t / Math.cos(n.t), s = -Math.max(e.b - i.height, 0) / Math.cos(n.b); a = m(a), r = m(r), o = m(o), s = m(s), i.drawingArea = Math.min(Math.round(t - (a + r) / 2), Math.round(t - (o + s) / 2)), i.setCenterPoint(a, r, o, s) }, setCenterPoint: function (t, e, n, i) { var a = this, r = a.width - e - a.drawingArea, o = t + a.drawingArea, s = n + a.drawingArea, l = a.height - i - a.drawingArea; a.xCenter = Math.round((o + r) / 2 + a.left), a.yCenter = Math.round((s + l) / 2 + a.top) }, getIndexAngle: function (t) { return t * (2 * Math.PI / e(this)) + (this.chart.options && this.chart.options.startAngle ? this.chart.options.startAngle : 0) * Math.PI * 2 / 360 }, getDistanceFromCenterForValue: function (t) { var e = this; if (null === t) return 0; var n = e.drawingArea / (e.max - e.min); return e.options.ticks.reverse ? (e.max - t) * n : (t - e.min) * n }, getPointPosition: function (t, e) { var n = this, i = n.getIndexAngle(t) - Math.PI / 2; return { x: Math.round(Math.cos(i) * e) + n.xCenter, y: Math.round(Math.sin(i) * e) + n.yCenter } }, getPointPositionForValue: function (t, e) { return this.getPointPosition(t, this.getDistanceFromCenterForValue(e)) }, getBasePosition: function () { var t = this, e = t.min, n = t.max; return t.getPointPositionForValue(0, t.beginAtZero ? 0 : e < 0 && n < 0 ? n : e > 0 && n > 0 ? e : 0) }, draw: function () { var t = this, e = t.options, n = e.gridLines, i = e.ticks, r = a.valueOrDefault; if (e.display) { var o = t.ctx, s = this.getIndexAngle(0), l = r(i.fontSize, p.defaultFontSize), u = r(i.fontStyle, p.defaultFontStyle), d = r(i.fontFamily, p.defaultFontFamily), c = a.fontString(l, u, d); a.each(t.ticks, function (e, a) { if (a > 0 || i.reverse) { var u = t.getDistanceFromCenterForValue(t.ticksAsNumbers[a]); if (n.display && 0 !== a && g(t, n, u, a), i.display) { var d = r(i.fontColor, p.defaultFontColor); if (o.font = c, o.save(), o.translate(t.xCenter, t.yCenter), o.rotate(s), i.showLabelBackdrop) { var h = o.measureText(e).width; o.fillStyle = i.backdropColor, o.fillRect(-h / 2 - i.backdropPaddingX, -u - l / 2 - i.backdropPaddingY, h + 2 * i.backdropPaddingX, l + 2 * i.backdropPaddingY) } o.textAlign = "center", o.textBaseline = "middle", o.fillStyle = d, o.fillText(e, 0, -u), o.restore() } } }), (e.angleLines.display || e.pointLabels.display) && f(t) } } }); t.scaleService.registerScaleType("radialLinear", y, v) } }, { 25: 25, 34: 34, 45: 45 }], 57: [function (t, e, n) { "use strict"; function i(t, e) { return t - e } function a(t) { var e, n, i, a = {}, r = []; for (e = 0, n = t.length; e < n; ++e)a[i = t[e]] || (a[i] = !0, r.push(i)); return r } function r(t, e, n, i) { if ("linear" === i || !t.length) return [{ time: e, pos: 0 }, { time: n, pos: 1 }]; var a, r, o, s, l, u = [], d = [e]; for (a = 0, r = t.length; a < r; ++a)(s = t[a]) > e && s < n && d.push(s); for (d.push(n), a = 0, r = d.length; a < r; ++a)l = d[a + 1], o = d[a - 1], s = d[a], void 0 !== o && void 0 !== l && Math.round((l + o) / 2) === s || u.push({ time: s, pos: a / (r - 1) }); return u } function o(t, e, n) { for (var i, a, r, o = 0, s = t.length - 1; o >= 0 && o <= s;) { if (i = o + s >> 1, a = t[i - 1] || null, r = t[i], !a) return { lo: null, hi: r }; if (r[e] < n) o = i + 1; else { if (!(a[e] > n)) return { lo: a, hi: r }; s = i - 1 } } return { lo: r, hi: null } } function s(t, e, n, i) { var a = o(t, e, n), r = a.lo ? a.hi ? a.lo : t[t.length - 2] : t[0], s = a.lo ? a.hi ? a.hi : t[t.length - 1] : t[1], l = s[e] - r[e], u = l ? (n - r[e]) / l : 0, d = (s[i] - r[i]) * u; return r[i] + d } function l(t, e) { var n = e.parser, i = e.parser || e.format; return "function" == typeof n ? n(t) : "string" == typeof t && "string" == typeof i ? v(t, i) : (t instanceof v || (t = v(t)), t.isValid() ? t : "function" == typeof i ? i(t) : t) } function u(t, e) { if (b.isNullOrUndef(t)) return null; var n = e.options.time, i = l(e.getRightValue(t), n); return i.isValid() ? (n.round && i.startOf(n.round), i.valueOf()) : null } function d(t, e, n, i) { var a, r, o, s = e - t, l = k[n], u = l.size, d = l.steps; if (!d) return Math.ceil(s / ((i || 1) * u)); for (a = 0, r = d.length; a < r && (o = d[a], !(Math.ceil(s / (u * o)) <= i)); ++a); return o } function c(t, e, n, i) { var a, r, o, s = w.length; for (a = w.indexOf(t); a < s - 1; ++a)if (r = k[w[a]], o = r.steps ? r.steps[r.steps.length - 1] : _, r.common && Math.ceil((n - e) / (o * r.size)) <= i) return w[a]; return w[s - 1] } function h(t, e, n, i) { var a, r, o = v.duration(v(i).diff(v(n))); for (a = w.length - 1; a >= w.indexOf(e); a--)if (r = w[a], k[r].common && o.as(r) >= t.length) return r; return w[e ? w.indexOf(e) : 0] } function f(t) { for (var e = w.indexOf(t) + 1, n = w.length; e < n; ++e)if (k[w[e]].common) return w[e] } function g(t, e, n, i) { var a, r = i.time, o = r.unit || c(r.minUnit, t, e, n), s = f(o), l = b.valueOrDefault(r.stepSize, r.unitStepSize), u = "week" === o && r.isoWeekday, h = i.ticks.major.enabled, g = k[o], m = v(t), p = v(e), y = []; for (l || (l = d(t, e, o, n)), u && (m = m.isoWeekday(u), p = p.isoWeekday(u)), m = m.startOf(u ? "day" : o), (p = p.startOf(u ? "day" : o)) < e && p.add(1, o), a = v(m), h && s && !u && !r.round && (a.startOf(s), a.add(~~((m - a) / (g.size * l)) * l, o)); a < p; a.add(l, o))y.push(+a); return y.push(+a), y } function m(t, e, n, i, a) { var r, o, l = 0, u = 0; return a.offset && e.length && (a.time.min || (r = e.length > 1 ? e[1] : i, o = e[0], l = (s(t, "time", r, "pos") - s(t, "time", o, "pos")) / 2), a.time.max || (r = e[e.length - 1], o = e.length > 1 ? e[e.length - 2] : n, u = (s(t, "time", r, "pos") - s(t, "time", o, "pos")) / 2)), { left: l, right: u } } function p(t, e) { var n, i, a, r, o = []; for (n = 0, i = t.length; n < i; ++n)a = t[n], r = !!e && a === +v(a).startOf(e), o.push({ value: a, major: r }); return o } var v = t(6); v = "function" == typeof v ? v : window.moment; var y = t(25), b = t(45), x = Number.MIN_SAFE_INTEGER || -9007199254740991, _ = Number.MAX_SAFE_INTEGER || 9007199254740991, k = { millisecond: { common: !0, size: 1, steps: [1, 2, 5, 10, 20, 50, 100, 250, 500] }, second: { common: !0, size: 1e3, steps: [1, 2, 5, 10, 30] }, minute: { common: !0, size: 6e4, steps: [1, 2, 5, 10, 30] }, hour: { common: !0, size: 36e5, steps: [1, 2, 3, 6, 12] }, day: { common: !0, size: 864e5, steps: [1, 2, 5] }, week: { common: !1, size: 6048e5, steps: [1, 2, 3, 4] }, month: { common: !0, size: 2628e6, steps: [1, 2, 3] }, quarter: { common: !1, size: 7884e6, steps: [1, 2, 3, 4] }, year: { common: !0, size: 3154e7 } }, w = Object.keys(k); e.exports = function (t) { var e = t.Scale.extend({ initialize: function () { if (!v) throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com"); this.mergeTicksOptions(), t.Scale.prototype.initialize.call(this) }, update: function () { var e = this, n = e.options; return n.time && n.time.format && console.warn("options.time.format is deprecated and replaced by options.time.parser."), t.Scale.prototype.update.apply(e, arguments) }, getRightValue: function (e) { return e && void 0 !== e.t && (e = e.t), t.Scale.prototype.getRightValue.call(this, e) }, determineDataLimits: function () { var t, e, n, r, o, s, l = this, d = l.chart, c = l.options.time, h = _, f = x, g = [], m = [], p = []; for (t = 0, n = d.data.labels.length; t < n; ++t)p.push(u(d.data.labels[t], l)); for (t = 0, n = (d.data.datasets || []).length; t < n; ++t)if (d.isDatasetVisible(t)) if (o = d.data.datasets[t].data, b.isObject(o[0])) for (m[t] = [], e = 0, r = o.length; e < r; ++e)s = u(o[e], l), g.push(s), m[t][e] = s; else g.push.apply(g, p), m[t] = p.slice(0); else m[t] = []; p.length && (p = a(p).sort(i), h = Math.min(h, p[0]), f = Math.max(f, p[p.length - 1])), g.length && (g = a(g).sort(i), h = Math.min(h, g[0]), f = Math.max(f, g[g.length - 1])), h = u(c.min, l) || h, f = u(c.max, l) || f, h = h === _ ? +v().startOf("day") : h, f = f === x ? +v().endOf("day") + 1 : f, l.min = Math.min(h, f), l.max = Math.max(h + 1, f), l._horizontal = l.isHorizontal(), l._table = [], l._timestamps = { data: g, datasets: m, labels: p } }, buildTicks: function () { var t, e, n, i = this, a = i.min, o = i.max, s = i.options, l = s.time, d = [], c = []; switch (s.ticks.source) { case "data": d = i._timestamps.data; break; case "labels": d = i._timestamps.labels; break; case "auto": default: d = g(a, o, i.getLabelCapacity(a), s) }for ("ticks" === s.bounds && d.length && (a = d[0], o = d[d.length - 1]), a = u(l.min, i) || a, o = u(l.max, i) || o, t = 0, e = d.length; t < e; ++t)(n = d[t]) >= a && n <= o && c.push(n); return i.min = a, i.max = o, i._unit = l.unit || h(c, l.minUnit, i.min, i.max), i._majorUnit = f(i._unit), i._table = r(i._timestamps.data, a, o, s.distribution), i._offsets = m(i._table, c, a, o, s), p(c, i._majorUnit) }, getLabelForIndex: function (t, e) { var n = this, i = n.chart.data, a = n.options.time, r = i.labels && t < i.labels.length ? i.labels[t] : "", o = i.datasets[e].data[t]; return b.isObject(o) && (r = n.getRightValue(o)), a.tooltipFormat && (r = l(r, a).format(a.tooltipFormat)), r }, tickFormatFunction: function (t, e, n, i) { var a = this, r = a.options, o = t.valueOf(), s = r.time.displayFormats, l = s[a._unit], u = a._majorUnit, d = s[u], c = t.clone().startOf(u).valueOf(), h = r.ticks.major, f = h.enabled && u && d && o === c, g = t.format(i || (f ? d : l)), m = f ? h : r.ticks.minor, p = b.valueOrDefault(m.callback, m.userCallback); return p ? p(g, e, n) : g }, convertTicksToLabels: function (t) { var e, n, i = []; for (e = 0, n = t.length; e < n; ++e)i.push(this.tickFormatFunction(v(t[e].value), e, t)); return i }, getPixelForOffset: function (t) { var e = this, n = e._horizontal ? e.width : e.height, i = e._horizontal ? e.left : e.top, a = s(e._table, "time", t, "pos"); return i + n * (e._offsets.left + a) / (e._offsets.left + 1 + e._offsets.right) }, getPixelForValue: function (t, e, n) { var i = this, a = null; if (void 0 !== e && void 0 !== n && (a = i._timestamps.datasets[n][e]), null === a && (a = u(t, i)), null !== a) return i.getPixelForOffset(a) }, getPixelForTick: function (t) { var e = this.getTicks(); return t >= 0 && t < e.length ? this.getPixelForOffset(e[t].value) : null }, getValueForPixel: function (t) { var e = this, n = e._horizontal ? e.width : e.height, i = e._horizontal ? e.left : e.top, a = (n ? (t - i) / n : 0) * (e._offsets.left + 1 + e._offsets.left) - e._offsets.right, r = s(e._table, "pos", a, "time"); return v(r) }, getLabelWidth: function (t) { var e = this, n = e.options.ticks, i = e.ctx.measureText(t).width, a = b.toRadians(n.maxRotation), r = Math.cos(a), o = Math.sin(a); return i * r + b.valueOrDefault(n.fontSize, y.global.defaultFontSize) * o }, getLabelCapacity: function (t) { var e = this, n = e.options.time.displayFormats.millisecond, i = e.tickFormatFunction(v(t), 0, [], n), a = e.getLabelWidth(i), r = e.isHorizontal() ? e.width : e.height; return Math.floor(r / a) } }); t.scaleService.registerScaleType("time", e, { position: "bottom", distribution: "linear", bounds: "data", time: { parser: !1, format: !1, unit: !1, round: !1, displayFormat: !1, isoWeekday: !1, minUnit: "millisecond", displayFormats: { millisecond: "h:mm:ss.SSS a", second: "h:mm:ss a", minute: "h:mm a", hour: "hA", day: "MMM D", week: "ll", month: "MMM YYYY", quarter: "[Q]Q - YYYY", year: "YYYY" } }, ticks: { autoSkip: !1, source: "auto", major: { enabled: !1 } } }) } }, { 25: 25, 45: 45, 6: 6 }] }, {}, [7])(7) });



// Custom event polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function () {
    if (typeof window.CustomEvent === 'function') {
        return;
    }

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

/*! npm.im/object-fit-images 3.2.3 */
var objectFitImages = (function () {
    'use strict';

    console.log("object image ready!");

    var OFI = 'bfred-it:object-fit-images';
    var propRegex = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g;
    var testImg = typeof Image === 'undefined' ? { style: { 'object-position': 1 } } : new Image();
    var supportsObjectFit = 'object-fit' in testImg.style;
    var supportsObjectPosition = 'object-position' in testImg.style;
    var supportsOFI = 'background-size' in testImg.style;
    var supportsCurrentSrc = typeof testImg.currentSrc === 'string';
    var nativeGetAttribute = testImg.getAttribute;
    var nativeSetAttribute = testImg.setAttribute;
    var autoModeEnabled = false;

    function createPlaceholder(w, h) {
        return ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + w + "' height='" + h + "'%3E%3C/svg%3E");
    }

    function polyfillCurrentSrc(el) {
        if (el.srcset && !supportsCurrentSrc && window.picturefill) {
            var pf = window.picturefill._;
            // parse srcset with picturefill where currentSrc isn't available
            if (!el[pf.ns] || !el[pf.ns].evaled) {
                // force synchronous srcset parsing
                pf.fillImg(el, { reselect: true });
            }

            if (!el[pf.ns].curSrc) {
                // force picturefill to parse srcset
                el[pf.ns].supported = false;
                pf.fillImg(el, { reselect: true });
            }

            // retrieve parsed currentSrc, if any
            el.currentSrc = el[pf.ns].curSrc || el.src;
        }
    }

    function getStyle(el) {
        var style = getComputedStyle(el).fontFamily;
        var parsed;
        var props = {};
        while ((parsed = propRegex.exec(style)) !== null) {
            props[parsed[1]] = parsed[2];
        }
        return props;
    }

    function setPlaceholder(img, width, height) {
        // Default: fill width, no height
        var placeholder = createPlaceholder(width || 1, height || 0);

        // Only set placeholder if it's different
        if (nativeGetAttribute.call(img, 'src') !== placeholder) {
            nativeSetAttribute.call(img, 'src', placeholder);
        }
    }

    function onImageReady(img, callback) {
        // naturalWidth is only available when the image headers are loaded,
        // this loop will poll it every 100ms.
        if (img.naturalWidth) {
            callback(img);
        } else {
            setTimeout(onImageReady, 100, img, callback);
        }
    }

    function fixOne(el) {
        var style = getStyle(el);
        var ofi = el[OFI];
        style['object-fit'] = style['object-fit'] || 'fill'; // default value

        // Avoid running where unnecessary, unless OFI had already done its deed
        if (!ofi.img) {
            // fill is the default behavior so no action is necessary
            if (style['object-fit'] === 'fill') {
                return;
            }

            // Where object-fit is supported and object-position isn't (Safari < 10)
            if (
                !ofi.skipTest && // unless user wants to apply regardless of browser support
                supportsObjectFit && // if browser already supports object-fit
                !style['object-position'] // unless object-position is used
            ) {
                return;
            }
        }

        // keep a clone in memory while resetting the original to a blank
        if (!ofi.img) {
            ofi.img = new Image(el.width, el.height);
            ofi.img.srcset = nativeGetAttribute.call(el, "data-ofi-srcset") || el.srcset;
            ofi.img.src = nativeGetAttribute.call(el, "data-ofi-src") || el.src;

            // preserve for any future cloneNode calls
            // https://github.com/bfred-it/object-fit-images/issues/53
            nativeSetAttribute.call(el, "data-ofi-src", el.src);
            if (el.srcset) {
                nativeSetAttribute.call(el, "data-ofi-srcset", el.srcset);
            }

            setPlaceholder(el, el.naturalWidth || el.width, el.naturalHeight || el.height);

            // remove srcset because it overrides src
            if (el.srcset) {
                el.srcset = '';
            }
            try {
                keepSrcUsable(el);
            } catch (err) {
                if (window.console) {
                    console.warn('https://bit.ly/ofi-old-browser');
                }
            }
        }

        polyfillCurrentSrc(ofi.img);

        el.style.backgroundImage = "url(\"" + ((ofi.img.currentSrc || ofi.img.src).replace(/"/g, '\\"')) + "\")";
        el.style.backgroundPosition = style['object-position'] || 'center';
        el.style.backgroundRepeat = 'no-repeat';
        el.style.backgroundOrigin = 'content-box';

        if (/scale-down/.test(style['object-fit'])) {
            onImageReady(ofi.img, function () {
                if (ofi.img.naturalWidth > el.width || ofi.img.naturalHeight > el.height) {
                    el.style.backgroundSize = 'contain';
                } else {
                    el.style.backgroundSize = 'auto';
                }
            });
        } else {
            el.style.backgroundSize = style['object-fit'].replace('none', 'auto').replace('fill', '100% 100%');
        }

        onImageReady(ofi.img, function (img) {
            setPlaceholder(el, img.naturalWidth, img.naturalHeight);
        });
    }

    function keepSrcUsable(el) {
        var descriptors = {
            get: function get(prop) {
                return el[OFI].img[prop ? prop : 'src'];
            },
            set: function set(value, prop) {
                el[OFI].img[prop ? prop : 'src'] = value;
                nativeSetAttribute.call(el, ("data-ofi-" + prop), value); // preserve for any future cloneNode
                fixOne(el);
                return value;
            }
        };
        Object.defineProperty(el, 'src', descriptors);
        Object.defineProperty(el, 'currentSrc', {
            get: function () { return descriptors.get('currentSrc'); }
        });
        Object.defineProperty(el, 'srcset', {
            get: function () { return descriptors.get('srcset'); },
            set: function (ss) { return descriptors.set(ss, 'srcset'); }
        });
    }

    function hijackAttributes() {
        function getOfiImageMaybe(el, name) {
            return el[OFI] && el[OFI].img && (name === 'src' || name === 'srcset') ? el[OFI].img : el;
        }
        if (!supportsObjectPosition) {
            HTMLImageElement.prototype.getAttribute = function (name) {
                return nativeGetAttribute.call(getOfiImageMaybe(this, name), name);
            };

            HTMLImageElement.prototype.setAttribute = function (name, value) {
                return nativeSetAttribute.call(getOfiImageMaybe(this, name), name, String(value));
            };
        }
    }

    function fix(imgs, opts) {
        var startAutoMode = !autoModeEnabled && !imgs;
        opts = opts || {};
        imgs = imgs || 'img';

        if ((supportsObjectPosition && !opts.skipTest) || !supportsOFI) {
            return false;
        }

        // use imgs as a selector or just select all images
        if (imgs === 'img') {
            imgs = document.getElementsByTagName('img');
        } else if (typeof imgs === 'string') {
            imgs = document.querySelectorAll(imgs);
        } else if (!('length' in imgs)) {
            imgs = [imgs];
        }

        // apply fix to all
        for (var i = 0; i < imgs.length; i++) {
            imgs[i][OFI] = imgs[i][OFI] || {
                skipTest: opts.skipTest
            };
            fixOne(imgs[i]);
        }

        if (startAutoMode) {
            document.body.addEventListener('load', function (e) {
                if (e.target.tagName === 'IMG') {
                    fix(e.target, {
                        skipTest: opts.skipTest
                    });
                }
            }, true);
            autoModeEnabled = true;
            imgs = 'img'; // reset to a generic selector for watchMQ
        }

        // if requested, watch media queries for object-fit change
        if (opts.watchMQ) {
            window.addEventListener('resize', fix.bind(null, imgs, {
                skipTest: opts.skipTest
            }));
        }
    }

    fix.supportsObjectFit = supportsObjectFit;
    fix.supportsObjectPosition = supportsObjectPosition;

    hijackAttributes();

    return fix;

}());

/*
 * qTip2 - Pretty powerful tooltips - v3.0.3
 * http://qtip2.com
 *
 * Copyright (c) 2017
 * Released under the MIT licenses
 * http://jquery.org/license
 *
 * Date: Mon Jan 9 2017 02:31 EST-0500
 * Plugins: tips
 * Styles: core basic
 */
/*global window: false, jQuery: false, console: false, define: false */

console.log("qtip ready!");
/* Cache window, document, undefined */
(function (window, document, undefined) {

    // Uses AMD or browser globals to create a jQuery plugin.
    (function (factory) {
        "use strict";
        if (typeof define === 'function' && define.amd) {
            define(['jquery'], factory);
        }
        else if (jQuery && !jQuery.fn.qtip) {
            factory(jQuery);
        }
    }
        (function ($) {
            "use strict"; // Enable ECMAScript "strict" operation for this function. See more: http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
            ;// Munge the primitives - Paul Irish tip
            var TRUE = true,
                FALSE = false,
                NULL = null,

                // Common variables
                X = 'x', Y = 'y',
                WIDTH = 'width',
                HEIGHT = 'height',

                // Positioning sides
                TOP = 'top',
                LEFT = 'left',
                BOTTOM = 'bottom',
                RIGHT = 'right',
                CENTER = 'center',

                // Position adjustment types
                FLIP = 'flip',
                FLIPINVERT = 'flipinvert',
                SHIFT = 'shift',

                // Shortcut vars
                QTIP, PROTOTYPE, CORNER, CHECKS,
                PLUGINS = {},
                NAMESPACE = 'qtip',
                ATTR_HAS = 'data-hasqtip',
                ATTR_ID = 'data-qtip-id',
                WIDGET = ['ui-widget', 'ui-tooltip'],
                SELECTOR = '.' + NAMESPACE,
                INACTIVE_EVENTS = 'click dblclick mousedown mouseup mousemove mouseleave mouseenter'.split(' '),

                CLASS_FIXED = NAMESPACE + '-fixed',
                CLASS_DEFAULT = NAMESPACE + '-default',
                CLASS_FOCUS = NAMESPACE + '-focus',
                CLASS_HOVER = NAMESPACE + '-hover',
                CLASS_DISABLED = NAMESPACE + '-disabled',

                replaceSuffix = '_replacedByqTip',
                oldtitle = 'oldtitle',
                trackingBound,

                // Browser detection
                BROWSER = {
                    /*
                     * IE version detection
                     *
                     * Adapted from: http://ajaxian.com/archives/attack-of-the-ie-conditional-comment
                     * Credit to James Padolsey for the original implemntation!
                     */
                    ie: (function () {
                        /* eslint-disable no-empty */
                        var v, i;
                        for (
                            v = 4, i = document.createElement('div');
                            (i.innerHTML = '<!--[if gt IE ' + v + ']><i></i><![endif]-->') && i.getElementsByTagName('i')[0];
                            v += 1
                        ) { }
                        return v > 4 ? v : NaN;
                        /* eslint-enable no-empty */
                    })(),

                    /*
                     * iOS version detection
                     */
                    iOS: parseFloat(
                        ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1])
                            .replace('undefined', '3_2').replace('_', '.').replace('_', '')
                    ) || FALSE
                };
            ; function QTip(target, options, id, attr) {
                // Elements and ID
                this.id = id;
                this.target = target;
                this.tooltip = NULL;
                this.elements = { target: target };

                // Internal constructs
                this._id = NAMESPACE + '-' + id;
                this.timers = { img: {} };
                this.options = options;
                this.plugins = {};

                // Cache object
                this.cache = {
                    event: {},
                    target: $(),
                    disabled: FALSE,
                    attr: attr,
                    onTooltip: FALSE,
                    lastClass: ''
                };

                // Set the initial flags
                this.rendered = this.destroyed = this.disabled = this.waiting =
                    this.hiddenDuringWait = this.positioning = this.triggering = FALSE;
            }
            PROTOTYPE = QTip.prototype;

            PROTOTYPE._when = function (deferreds) {
                return $.when.apply($, deferreds);
            };

            PROTOTYPE.render = function (show) {
                if (this.rendered || this.destroyed) { return this; } // If tooltip has already been rendered, exit

                var self = this,
                    options = this.options,
                    cache = this.cache,
                    elements = this.elements,
                    text = options.content.text,
                    title = options.content.title,
                    button = options.content.button,
                    posOptions = options.position,
                    deferreds = [];

                // Add ARIA attributes to target
                $.attr(this.target[0], 'aria-describedby', this._id);

                // Create public position object that tracks current position corners
                cache.posClass = this._createPosClass(
                    (this.position = { my: posOptions.my, at: posOptions.at }).my
                );

                // Create tooltip element
                this.tooltip = elements.tooltip = $('<div/>', {
                    'id': this._id,
                    'class': [NAMESPACE, CLASS_DEFAULT, options.style.classes, cache.posClass].join(' '),
                    'width': options.style.width || '',
                    'height': options.style.height || '',
                    'tracking': posOptions.target === 'mouse' && posOptions.adjust.mouse,

                    /* ARIA specific attributes */
                    'role': 'alert',
                    'aria-live': 'polite',
                    'aria-atomic': FALSE,
                    'aria-describedby': this._id + '-content',
                    'aria-hidden': TRUE
                })
                    .toggleClass(CLASS_DISABLED, this.disabled)
                    .attr(ATTR_ID, this.id)
                    .data(NAMESPACE, this)
                    .appendTo(posOptions.container)
                    .append(
                        // Create content element
                        elements.content = $('<div />', {
                            'class': NAMESPACE + '-content',
                            'id': this._id + '-content',
                            'aria-atomic': TRUE
                        })
                    );

                // Set rendered flag and prevent redundant reposition calls for now
                this.rendered = -1;
                this.positioning = TRUE;

                // Create title...
                if (title) {
                    this._createTitle();

                    // Update title only if its not a callback (called in toggle if so)
                    if (!$.isFunction(title)) {
                        deferreds.push(this._updateTitle(title, FALSE));
                    }
                }

                // Create button
                if (button) { this._createButton(); }

                // Set proper rendered flag and update content if not a callback function (called in toggle)
                if (!$.isFunction(text)) {
                    deferreds.push(this._updateContent(text, FALSE));
                }
                this.rendered = TRUE;

                // Setup widget classes
                this._setWidget();

                // Initialize 'render' plugins
                $.each(PLUGINS, function (name) {
                    var instance;
                    if (this.initialize === 'render' && (instance = this(self))) {
                        self.plugins[name] = instance;
                    }
                });

                // Unassign initial events and assign proper events
                this._unassignEvents();
                this._assignEvents();

                // When deferreds have completed
                this._when(deferreds).then(function () {
                    // tooltiprender event
                    self._trigger('render');

                    // Reset flags
                    self.positioning = FALSE;

                    // Show tooltip if not hidden during wait period
                    if (!self.hiddenDuringWait && (options.show.ready || show)) {
                        self.toggle(TRUE, cache.event, FALSE);
                    }
                    self.hiddenDuringWait = FALSE;
                });

                // Expose API
                QTIP.api[this.id] = this;

                return this;
            };

            PROTOTYPE.destroy = function (immediate) {
                // Set flag the signify destroy is taking place to plugins
                // and ensure it only gets destroyed once!
                if (this.destroyed) { return this.target; }

                function process() {
                    if (this.destroyed) { return; }
                    this.destroyed = TRUE;

                    var target = this.target,
                        title = target.attr(oldtitle),
                        timer;

                    // Destroy tooltip if rendered
                    if (this.rendered) {
                        this.tooltip.stop(1, 0).find('*').remove().end().remove();
                    }

                    // Destroy all plugins
                    $.each(this.plugins, function () {
                        this.destroy && this.destroy();
                    });

                    // Clear timers
                    for (timer in this.timers) {
                        if (this.timers.hasOwnProperty(timer)) {
                            clearTimeout(this.timers[timer]);
                        }
                    }

                    // Remove api object and ARIA attributes
                    target.removeData(NAMESPACE)
                        .removeAttr(ATTR_ID)
                        .removeAttr(ATTR_HAS)
                        .removeAttr('aria-describedby');

                    // Reset old title attribute if removed
                    if (this.options.suppress && title) {
                        target.attr('title', title).removeAttr(oldtitle);
                    }

                    // Remove qTip events associated with this API
                    this._unassignEvents();

                    // Remove ID from used id objects, and delete object references
                    // for better garbage collection and leak protection
                    this.options = this.elements = this.cache = this.timers =
                        this.plugins = this.mouse = NULL;

                    // Delete epoxsed API object
                    delete QTIP.api[this.id];
                }

                // If an immediate destroy is needed
                if ((immediate !== TRUE || this.triggering === 'hide') && this.rendered) {
                    this.tooltip.one('tooltiphidden', $.proxy(process, this));
                    !this.triggering && this.hide();
                }

                // If we're not in the process of hiding... process
                else { process.call(this); }

                return this.target;
            };
            ; function invalidOpt(a) {
                return a === NULL || $.type(a) !== 'object';
            }

            function invalidContent(c) {
                return !($.isFunction(c) ||
                    c && c.attr ||
                    c.length ||
                    $.type(c) === 'object' && (c.jquery || c.then));
            }

            // Option object sanitizer
            function sanitizeOptions(opts) {
                var content, text, ajax, once;

                if (invalidOpt(opts)) { return FALSE; }

                if (invalidOpt(opts.metadata)) {
                    opts.metadata = { type: opts.metadata };
                }

                if ('content' in opts) {
                    content = opts.content;

                    if (invalidOpt(content) || content.jquery || content.done) {
                        text = invalidContent(content) ? FALSE : content;
                        content = opts.content = {
                            text: text
                        };
                    }
                    else { text = content.text; }

                    // DEPRECATED - Old content.ajax plugin functionality
                    // Converts it into the proper Deferred syntax
                    if ('ajax' in content) {
                        ajax = content.ajax;
                        once = ajax && ajax.once !== FALSE;
                        delete content.ajax;

                        content.text = function (event, api) {
                            var loading = text || $(this).attr(api.options.content.attr) || 'Loading...',

                                deferred = $.ajax(
                                    $.extend({}, ajax, { context: api })
                                )
                                    .then(ajax.success, NULL, ajax.error)
                                    .then(function (newContent) {
                                        if (newContent && once) { api.set('content.text', newContent); }
                                        return newContent;
                                    },
                                        function (xhr, status, error) {
                                            if (api.destroyed || xhr.status === 0) { return; }
                                            api.set('content.text', status + ': ' + error);
                                        });

                            return !once ? (api.set('content.text', loading), deferred) : loading;
                        };
                    }

                    if ('title' in content) {
                        if ($.isPlainObject(content.title)) {
                            content.button = content.title.button;
                            content.title = content.title.text;
                        }

                        if (invalidContent(content.title || FALSE)) {
                            content.title = FALSE;
                        }
                    }
                }

                if ('position' in opts && invalidOpt(opts.position)) {
                    opts.position = { my: opts.position, at: opts.position };
                }

                if ('show' in opts && invalidOpt(opts.show)) {
                    opts.show = opts.show.jquery ? { target: opts.show } :
                        opts.show === TRUE ? { ready: TRUE } : { event: opts.show };
                }

                if ('hide' in opts && invalidOpt(opts.hide)) {
                    opts.hide = opts.hide.jquery ? { target: opts.hide } : { event: opts.hide };
                }

                if ('style' in opts && invalidOpt(opts.style)) {
                    opts.style = { classes: opts.style };
                }

                // Sanitize plugin options
                $.each(PLUGINS, function () {
                    this.sanitize && this.sanitize(opts);
                });

                return opts;
            }

            // Setup builtin .set() option checks
            CHECKS = PROTOTYPE.checks = {
                builtin: {
                    // Core checks
                    '^id$': function (obj, o, v, prev) {
                        var id = v === TRUE ? QTIP.nextid : v,
                            newId = NAMESPACE + '-' + id;

                        if (id !== FALSE && id.length > 0 && !$('#' + newId).length) {
                            this._id = newId;

                            if (this.rendered) {
                                this.tooltip[0].id = this._id;
                                this.elements.content[0].id = this._id + '-content';
                                this.elements.title[0].id = this._id + '-title';
                            }
                        }
                        else { obj[o] = prev; }
                    },
                    '^prerender': function (obj, o, v) {
                        v && !this.rendered && this.render(this.options.show.ready);
                    },

                    // Content checks
                    '^content.text$': function (obj, o, v) {
                        this._updateContent(v);
                    },
                    '^content.attr$': function (obj, o, v, prev) {
                        if (this.options.content.text === this.target.attr(prev)) {
                            this._updateContent(this.target.attr(v));
                        }
                    },
                    '^content.title$': function (obj, o, v) {
                        // Remove title if content is null
                        if (!v) { return this._removeTitle(); }

                        // If title isn't already created, create it now and update
                        v && !this.elements.title && this._createTitle();
                        this._updateTitle(v);
                    },
                    '^content.button$': function (obj, o, v) {
                        this._updateButton(v);
                    },
                    '^content.title.(text|button)$': function (obj, o, v) {
                        this.set('content.' + o, v); // Backwards title.text/button compat
                    },

                    // Position checks
                    '^position.(my|at)$': function (obj, o, v) {
                        if ('string' === typeof v) {
                            this.position[o] = obj[o] = new CORNER(v, o === 'at');
                        }
                    },
                    '^position.container$': function (obj, o, v) {
                        this.rendered && this.tooltip.appendTo(v);
                    },

                    // Show checks
                    '^show.ready$': function (obj, o, v) {
                        v && (!this.rendered && this.render(TRUE) || this.toggle(TRUE));
                    },

                    // Style checks
                    '^style.classes$': function (obj, o, v, p) {
                        this.rendered && this.tooltip.removeClass(p).addClass(v);
                    },
                    '^style.(width|height)': function (obj, o, v) {
                        this.rendered && this.tooltip.css(o, v);
                    },
                    '^style.widget|content.title': function () {
                        this.rendered && this._setWidget();
                    },
                    '^style.def': function (obj, o, v) {
                        this.rendered && this.tooltip.toggleClass(CLASS_DEFAULT, !!v);
                    },

                    // Events check
                    '^events.(render|show|move|hide|focus|blur)$': function (obj, o, v) {
                        this.rendered && this.tooltip[($.isFunction(v) ? '' : 'un') + 'bind']('tooltip' + o, v);
                    },

                    // Properties which require event reassignment
                    '^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)': function () {
                        if (!this.rendered) { return; }

                        // Set tracking flag
                        var posOptions = this.options.position;
                        this.tooltip.attr('tracking', posOptions.target === 'mouse' && posOptions.adjust.mouse);

                        // Reassign events
                        this._unassignEvents();
                        this._assignEvents();
                    }
                }
            };

            // Dot notation converter
            function convertNotation(options, notation) {
                var i = 0, obj, option = options,

                    // Split notation into array
                    levels = notation.split('.');

                // Loop through
                while (option = option[levels[i++]]) {
                    if (i < levels.length) { obj = option; }
                }

                return [obj || options, levels.pop()];
            }

            PROTOTYPE.get = function (notation) {
                if (this.destroyed) { return this; }

                var o = convertNotation(this.options, notation.toLowerCase()),
                    result = o[0][o[1]];

                return result.precedance ? result.string() : result;
            };

            function setCallback(notation, args) {
                var category, rule, match;

                for (category in this.checks) {
                    if (!this.checks.hasOwnProperty(category)) { continue; }

                    for (rule in this.checks[category]) {
                        if (!this.checks[category].hasOwnProperty(rule)) { continue; }

                        if (match = (new RegExp(rule, 'i')).exec(notation)) {
                            args.push(match);

                            if (category === 'builtin' || this.plugins[category]) {
                                this.checks[category][rule].apply(
                                    this.plugins[category] || this, args
                                );
                            }
                        }
                    }
                }
            }

            var rmove = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
                rrender = /^prerender|show\.ready/i;

            PROTOTYPE.set = function (option, value) {
                if (this.destroyed) { return this; }

                var rendered = this.rendered,
                    reposition = FALSE,
                    options = this.options,
                    name;

                // Convert singular option/value pair into object form
                if ('string' === typeof option) {
                    name = option; option = {}; option[name] = value;
                }
                else { option = $.extend({}, option); }

                // Set all of the defined options to their new values
                $.each(option, function (notation, val) {
                    if (rendered && rrender.test(notation)) {
                        delete option[notation]; return;
                    }

                    // Set new obj value
                    var obj = convertNotation(options, notation.toLowerCase()), previous;
                    previous = obj[0][obj[1]];
                    obj[0][obj[1]] = val && val.nodeType ? $(val) : val;

                    // Also check if we need to reposition
                    reposition = rmove.test(notation) || reposition;

                    // Set the new params for the callback
                    option[notation] = [obj[0], obj[1], val, previous];
                });

                // Re-sanitize options
                sanitizeOptions(options);

                /*
                 * Execute any valid callbacks for the set options
                 * Also set positioning flag so we don't get loads of redundant repositioning calls.
                 */
                this.positioning = TRUE;
                $.each(option, $.proxy(setCallback, this));
                this.positioning = FALSE;

                // Update position if needed
                if (this.rendered && this.tooltip[0].offsetWidth > 0 && reposition) {
                    this.reposition(options.position.target === 'mouse' ? NULL : this.cache.event);
                }

                return this;
            };
            ; PROTOTYPE._update = function (content, element) {
                var self = this,
                    cache = this.cache;

                // Make sure tooltip is rendered and content is defined. If not return
                if (!this.rendered || !content) { return FALSE; }

                // Use function to parse content
                if ($.isFunction(content)) {
                    content = content.call(this.elements.target, cache.event, this) || '';
                }

                // Handle deferred content
                if ($.isFunction(content.then)) {
                    cache.waiting = TRUE;
                    return content.then(function (c) {
                        cache.waiting = FALSE;
                        return self._update(c, element);
                    }, NULL, function (e) {
                        return self._update(e, element);
                    });
                }

                // If content is null... return false
                if (content === FALSE || !content && content !== '') { return FALSE; }

                // Append new content if its a DOM array and show it if hidden
                if (content.jquery && content.length > 0) {
                    element.empty().append(
                        content.css({ display: 'block', visibility: 'visible' })
                    );
                }

                // Content is a regular string, insert the new content
                else { element.html(content); }

                // Wait for content to be loaded, and reposition
                return this._waitForContent(element).then(function (images) {
                    if (self.rendered && self.tooltip[0].offsetWidth > 0) {
                        self.reposition(cache.event, !images.length);
                    }
                });
            };

            PROTOTYPE._waitForContent = function (element) {
                var cache = this.cache;

                // Set flag
                cache.waiting = TRUE;

                // If imagesLoaded is included, ensure images have loaded and return promise
                return ($.fn.imagesLoaded ? element.imagesLoaded() : new $.Deferred().resolve([]))
                    .done(function () { cache.waiting = FALSE; })
                    .promise();
            };

            PROTOTYPE._updateContent = function (content, reposition) {
                this._update(content, this.elements.content, reposition);
            };

            PROTOTYPE._updateTitle = function (content, reposition) {
                if (this._update(content, this.elements.title, reposition) === FALSE) {
                    this._removeTitle(FALSE);
                }
            };

            PROTOTYPE._createTitle = function () {
                var elements = this.elements,
                    id = this._id + '-title';

                // Destroy previous title element, if present
                if (elements.titlebar) { this._removeTitle(); }

                // Create title bar and title elements
                elements.titlebar = $('<div />', {
                    'class': NAMESPACE + '-titlebar ' + (this.options.style.widget ? createWidgetClass('header') : '')
                })
                    .append(
                        elements.title = $('<div />', {
                            'id': id,
                            'class': NAMESPACE + '-title',
                            'aria-atomic': TRUE
                        })
                    )
                    .insertBefore(elements.content)

                    // Button-specific events
                    .delegate('.qtip-close', 'mousedown keydown mouseup keyup mouseout', function (event) {
                        $(this).toggleClass('ui-state-active ui-state-focus', event.type.substr(-4) === 'down');
                    })
                    .delegate('.qtip-close', 'mouseover mouseout', function (event) {
                        $(this).toggleClass('ui-state-hover', event.type === 'mouseover');
                    });

                // Create button if enabled
                if (this.options.content.button) { this._createButton(); }
            };

            PROTOTYPE._removeTitle = function (reposition) {
                var elements = this.elements;

                if (elements.title) {
                    elements.titlebar.remove();
                    elements.titlebar = elements.title = elements.button = NULL;

                    // Reposition if enabled
                    if (reposition !== FALSE) { this.reposition(); }
                }
            };
            ; PROTOTYPE._createPosClass = function (my) {
                return NAMESPACE + '-pos-' + (my || this.options.position.my).abbrev();
            };

            PROTOTYPE.reposition = function (event, effect) {
                if (!this.rendered || this.positioning || this.destroyed) { return this; }

                // Set positioning flag
                this.positioning = TRUE;

                var cache = this.cache,
                    tooltip = this.tooltip,
                    posOptions = this.options.position,
                    target = posOptions.target,
                    my = posOptions.my,
                    at = posOptions.at,
                    viewport = posOptions.viewport,
                    container = posOptions.container,
                    adjust = posOptions.adjust,
                    method = adjust.method.split(' '),
                    tooltipWidth = tooltip.outerWidth(FALSE),
                    tooltipHeight = tooltip.outerHeight(FALSE),
                    targetWidth = 0,
                    targetHeight = 0,
                    type = tooltip.css('position'),
                    position = { left: 0, top: 0 },
                    visible = tooltip[0].offsetWidth > 0,
                    isScroll = event && event.type === 'scroll',
                    win = $(window),
                    doc = container[0].ownerDocument,
                    mouse = this.mouse,
                    pluginCalculations, offset, adjusted, newClass;

                // Check if absolute position was passed
                if ($.isArray(target) && target.length === 2) {
                    // Force left top and set position
                    at = { x: LEFT, y: TOP };
                    position = { left: target[0], top: target[1] };
                }

                // Check if mouse was the target
                else if (target === 'mouse') {
                    // Force left top to allow flipping
                    at = { x: LEFT, y: TOP };

                    // Use the mouse origin that caused the show event, if distance hiding is enabled
                    if ((!adjust.mouse || this.options.hide.distance) && cache.origin && cache.origin.pageX) {
                        event = cache.origin;
                    }

                    // Use cached event for resize/scroll events
                    else if (!event || event && (event.type === 'resize' || event.type === 'scroll')) {
                        event = cache.event;
                    }

                    // Otherwise, use the cached mouse coordinates if available
                    else if (mouse && mouse.pageX) {
                        event = mouse;
                    }

                    // Calculate body and container offset and take them into account below
                    if (type !== 'static') { position = container.offset(); }
                    if (doc.body.offsetWidth !== (window.innerWidth || doc.documentElement.clientWidth)) {
                        offset = $(document.body).offset();
                    }

                    // Use event coordinates for position
                    position = {
                        left: event.pageX - position.left + (offset && offset.left || 0),
                        top: event.pageY - position.top + (offset && offset.top || 0)
                    };

                    // Scroll events are a pain, some browsers
                    if (adjust.mouse && isScroll && mouse) {
                        position.left -= (mouse.scrollX || 0) - win.scrollLeft();
                        position.top -= (mouse.scrollY || 0) - win.scrollTop();
                    }
                }

                // Target wasn't mouse or absolute...
                else {
                    // Check if event targetting is being used
                    if (target === 'event') {
                        if (event && event.target && event.type !== 'scroll' && event.type !== 'resize') {
                            cache.target = $(event.target);
                        }
                        else if (!event.target) {
                            cache.target = this.elements.target;
                        }
                    }
                    else if (target !== 'event') {
                        cache.target = $(target.jquery ? target : this.elements.target);
                    }
                    target = cache.target;

                    // Parse the target into a jQuery object and make sure there's an element present
                    target = $(target).eq(0);
                    if (target.length === 0) { return this; }

                    // Check if window or document is the target
                    else if (target[0] === document || target[0] === window) {
                        targetWidth = BROWSER.iOS ? window.innerWidth : target.width();
                        targetHeight = BROWSER.iOS ? window.innerHeight : target.height();

                        if (target[0] === window) {
                            position = {
                                top: (viewport || target).scrollTop(),
                                left: (viewport || target).scrollLeft()
                            };
                        }
                    }

                    // Check if the target is an <AREA> element
                    else if (PLUGINS.imagemap && target.is('area')) {
                        pluginCalculations = PLUGINS.imagemap(this, target, at, PLUGINS.viewport ? method : FALSE);
                    }

                    // Check if the target is an SVG element
                    else if (PLUGINS.svg && target && target[0].ownerSVGElement) {
                        pluginCalculations = PLUGINS.svg(this, target, at, PLUGINS.viewport ? method : FALSE);
                    }

                    // Otherwise use regular jQuery methods
                    else {
                        targetWidth = target.outerWidth(FALSE);
                        targetHeight = target.outerHeight(FALSE);
                        position = target.offset();
                    }

                    // Parse returned plugin values into proper variables
                    if (pluginCalculations) {
                        targetWidth = pluginCalculations.width;
                        targetHeight = pluginCalculations.height;
                        offset = pluginCalculations.offset;
                        position = pluginCalculations.position;
                    }

                    // Adjust position to take into account offset parents
                    position = this.reposition.offset(target, position, container);

                    // Adjust for position.fixed tooltips (and also iOS scroll bug in v3.2-4.0 & v4.3-4.3.2)
                    if (BROWSER.iOS > 3.1 && BROWSER.iOS < 4.1 ||
                        BROWSER.iOS >= 4.3 && BROWSER.iOS < 4.33 ||
                        !BROWSER.iOS && type === 'fixed'
                    ) {
                        position.left -= win.scrollLeft();
                        position.top -= win.scrollTop();
                    }

                    // Adjust position relative to target
                    if (!pluginCalculations || pluginCalculations && pluginCalculations.adjustable !== FALSE) {
                        position.left += at.x === RIGHT ? targetWidth : at.x === CENTER ? targetWidth / 2 : 0;
                        position.top += at.y === BOTTOM ? targetHeight : at.y === CENTER ? targetHeight / 2 : 0;
                    }
                }

                // Adjust position relative to tooltip
                position.left += adjust.x + (my.x === RIGHT ? -tooltipWidth : my.x === CENTER ? -tooltipWidth / 2 : 0);
                position.top += adjust.y + (my.y === BOTTOM ? -tooltipHeight : my.y === CENTER ? -tooltipHeight / 2 : 0);

                // Use viewport adjustment plugin if enabled
                if (PLUGINS.viewport) {
                    adjusted = position.adjusted = PLUGINS.viewport(
                        this, position, posOptions, targetWidth, targetHeight, tooltipWidth, tooltipHeight
                    );

                    // Apply offsets supplied by positioning plugin (if used)
                    if (offset && adjusted.left) { position.left += offset.left; }
                    if (offset && adjusted.top) { position.top += offset.top; }

                    // Apply any new 'my' position
                    if (adjusted.my) { this.position.my = adjusted.my; }
                }

                // Viewport adjustment is disabled, set values to zero
                else { position.adjusted = { left: 0, top: 0 }; }

                // Set tooltip position class if it's changed
                if (cache.posClass !== (newClass = this._createPosClass(this.position.my))) {
                    cache.posClass = newClass;
                    tooltip.removeClass(cache.posClass).addClass(newClass);
                }

                // tooltipmove event
                if (!this._trigger('move', [position, viewport.elem || viewport], event)) { return this; }
                delete position.adjusted;

                // If effect is disabled, target it mouse, no animation is defined or positioning gives NaN out, set CSS directly
                if (effect === FALSE || !visible || isNaN(position.left) || isNaN(position.top) || target === 'mouse' || !$.isFunction(posOptions.effect)) {
                    tooltip.css(position);
                }

                // Use custom function if provided
                else if ($.isFunction(posOptions.effect)) {
                    posOptions.effect.call(tooltip, this, $.extend({}, position));
                    tooltip.queue(function (next) {
                        // Reset attributes to avoid cross-browser rendering bugs
                        $(this).css({ opacity: '', height: '' });
                        if (BROWSER.ie) { this.style.removeAttribute('filter'); }

                        next();
                    });
                }

                // Set positioning flag
                this.positioning = FALSE;

                return this;
            };

            // Custom (more correct for qTip!) offset calculator
            PROTOTYPE.reposition.offset = function (elem, pos, container) {
                if (!container[0]) { return pos; }

                var ownerDocument = $(elem[0].ownerDocument),
                    quirks = !!BROWSER.ie && document.compatMode !== 'CSS1Compat',
                    parent = container[0],
                    scrolled, position, parentOffset, overflow;

                function scroll(e, i) {
                    pos.left += i * e.scrollLeft();
                    pos.top += i * e.scrollTop();
                }

                // Compensate for non-static containers offset
                do {
                    if ((position = $.css(parent, 'position')) !== 'static') {
                        if (position === 'fixed') {
                            parentOffset = parent.getBoundingClientRect();
                            scroll(ownerDocument, -1);
                        }
                        else {
                            parentOffset = $(parent).position();
                            parentOffset.left += parseFloat($.css(parent, 'borderLeftWidth')) || 0;
                            parentOffset.top += parseFloat($.css(parent, 'borderTopWidth')) || 0;
                        }

                        pos.left -= parentOffset.left + (parseFloat($.css(parent, 'marginLeft')) || 0);
                        pos.top -= parentOffset.top + (parseFloat($.css(parent, 'marginTop')) || 0);

                        // If this is the first parent element with an overflow of "scroll" or "auto", store it
                        if (!scrolled && (overflow = $.css(parent, 'overflow')) !== 'hidden' && overflow !== 'visible') { scrolled = $(parent); }
                    }
                }
                while (parent = parent.offsetParent);

                // Compensate for containers scroll if it also has an offsetParent (or in IE quirks mode)
                if (scrolled && (scrolled[0] !== ownerDocument[0] || quirks)) {
                    scroll(scrolled, 1);
                }

                return pos;
            };

            // Corner class
            var C = (CORNER = PROTOTYPE.reposition.Corner = function (corner, forceY) {
                corner = ('' + corner).replace(/([A-Z])/, ' $1').replace(/middle/gi, CENTER).toLowerCase();
                this.x = (corner.match(/left|right/i) || corner.match(/center/) || ['inherit'])[0].toLowerCase();
                this.y = (corner.match(/top|bottom|center/i) || ['inherit'])[0].toLowerCase();
                this.forceY = !!forceY;

                var f = corner.charAt(0);
                this.precedance = f === 't' || f === 'b' ? Y : X;
            }).prototype;

            C.invert = function (z, center) {
                this[z] = this[z] === LEFT ? RIGHT : this[z] === RIGHT ? LEFT : center || this[z];
            };

            C.string = function (join) {
                var x = this.x, y = this.y;

                var result = x !== y ?
                    x === 'center' || y !== 'center' && (this.precedance === Y || this.forceY) ?
                        [y, x] :
                        [x, y] :
                    [x];

                return join !== false ? result.join(' ') : result;
            };

            C.abbrev = function () {
                var result = this.string(false);
                return result[0].charAt(0) + (result[1] && result[1].charAt(0) || '');
            };

            C.clone = function () {
                return new CORNER(this.string(), this.forceY);
            };

            ;
            PROTOTYPE.toggle = function (state, event) {
                var cache = this.cache,
                    options = this.options,
                    tooltip = this.tooltip;

                // Try to prevent flickering when tooltip overlaps show element
                if (event) {
                    if ((/over|enter/).test(event.type) && cache.event && (/out|leave/).test(cache.event.type) &&
                        options.show.target.add(event.target).length === options.show.target.length &&
                        tooltip.has(event.relatedTarget).length) {
                        return this;
                    }

                    // Cache event
                    cache.event = $.event.fix(event);
                }

                // If we're currently waiting and we've just hidden... stop it
                this.waiting && !state && (this.hiddenDuringWait = TRUE);

                // Render the tooltip if showing and it isn't already
                if (!this.rendered) { return state ? this.render(1) : this; }
                else if (this.destroyed || this.disabled) { return this; }

                var type = state ? 'show' : 'hide',
                    opts = this.options[type],
                    posOptions = this.options.position,
                    contentOptions = this.options.content,
                    width = this.tooltip.css('width'),
                    visible = this.tooltip.is(':visible'),
                    animate = state || opts.target.length === 1,
                    sameTarget = !event || opts.target.length < 2 || cache.target[0] === event.target,
                    identicalState, allow, after;

                // Detect state if valid one isn't provided
                if ((typeof state).search('boolean|number')) { state = !visible; }

                // Check if the tooltip is in an identical state to the new would-be state
                identicalState = !tooltip.is(':animated') && visible === state && sameTarget;

                // Fire tooltip(show/hide) event and check if destroyed
                allow = !identicalState ? !!this._trigger(type, [90]) : NULL;

                // Check to make sure the tooltip wasn't destroyed in the callback
                if (this.destroyed) { return this; }

                // If the user didn't stop the method prematurely and we're showing the tooltip, focus it
                if (allow !== FALSE && state) { this.focus(event); }

                // If the state hasn't changed or the user stopped it, return early
                if (!allow || identicalState) { return this; }

                // Set ARIA hidden attribute
                $.attr(tooltip[0], 'aria-hidden', !!!state);

                // Execute state specific properties
                if (state) {
                    // Store show origin coordinates
                    this.mouse && (cache.origin = $.event.fix(this.mouse));

                    // Update tooltip content & title if it's a dynamic function
                    if ($.isFunction(contentOptions.text)) { this._updateContent(contentOptions.text, FALSE); }
                    if ($.isFunction(contentOptions.title)) { this._updateTitle(contentOptions.title, FALSE); }

                    // Cache mousemove events for positioning purposes (if not already tracking)
                    if (!trackingBound && posOptions.target === 'mouse' && posOptions.adjust.mouse) {
                        $(document).bind('mousemove.' + NAMESPACE, this._storeMouse);
                        trackingBound = TRUE;
                    }

                    // Update the tooltip position (set width first to prevent viewport/max-width issues)
                    if (!width) { tooltip.css('width', tooltip.outerWidth(FALSE)); }
                    this.reposition(event, arguments[2]);
                    if (!width) { tooltip.css('width', ''); }

                    // Hide other tooltips if tooltip is solo
                    if (!!opts.solo) {
                        (typeof opts.solo === 'string' ? $(opts.solo) : $(SELECTOR, opts.solo))
                            .not(tooltip).not(opts.target).qtip('hide', new $.Event('tooltipsolo'));
                    }
                }
                else {
                    // Clear show timer if we're hiding
                    clearTimeout(this.timers.show);

                    // Remove cached origin on hide
                    delete cache.origin;

                    // Remove mouse tracking event if not needed (all tracking qTips are hidden)
                    if (trackingBound && !$(SELECTOR + '[tracking="true"]:visible', opts.solo).not(tooltip).length) {
                        $(document).unbind('mousemove.' + NAMESPACE);
                        trackingBound = FALSE;
                    }

                    // Blur the tooltip
                    this.blur(event);
                }

                // Define post-animation, state specific properties
                after = $.proxy(function () {
                    if (state) {
                        // Prevent antialias from disappearing in IE by removing filter
                        if (BROWSER.ie) { tooltip[0].style.removeAttribute('filter'); }

                        // Remove overflow setting to prevent tip bugs
                        tooltip.css('overflow', '');

                        // Autofocus elements if enabled
                        if ('string' === typeof opts.autofocus) {
                            $(this.options.show.autofocus, tooltip).focus();
                        }

                        // If set, hide tooltip when inactive for delay period
                        this.options.show.target.trigger('qtip-' + this.id + '-inactive');
                    }
                    else {
                        // Reset CSS states
                        tooltip.css({
                            display: '',
                            visibility: '',
                            opacity: '',
                            left: '',
                            top: ''
                        });
                    }

                    // tooltipvisible/tooltiphidden events
                    this._trigger(state ? 'visible' : 'hidden');
                }, this);

                // If no effect type is supplied, use a simple toggle
                if (opts.effect === FALSE || animate === FALSE) {
                    tooltip[type]();
                    after();
                }

                // Use custom function if provided
                else if ($.isFunction(opts.effect)) {
                    tooltip.stop(1, 1);
                    opts.effect.call(tooltip, this);
                    tooltip.queue('fx', function (n) {
                        after(); n();
                    });
                }

                // Use basic fade function by default
                else { tooltip.fadeTo(90, state ? 1 : 0, after); }

                // If inactive hide method is set, active it
                if (state) { opts.target.trigger('qtip-' + this.id + '-inactive'); }

                return this;
            };

            PROTOTYPE.show = function (event) { return this.toggle(TRUE, event); };

            PROTOTYPE.hide = function (event) { return this.toggle(FALSE, event); };
            ; PROTOTYPE.focus = function (event) {
                if (!this.rendered || this.destroyed) { return this; }

                var qtips = $(SELECTOR),
                    tooltip = this.tooltip,
                    curIndex = parseInt(tooltip[0].style.zIndex, 10),
                    newIndex = QTIP.zindex + qtips.length;

                // Only update the z-index if it has changed and tooltip is not already focused
                if (!tooltip.hasClass(CLASS_FOCUS)) {
                    // tooltipfocus event
                    if (this._trigger('focus', [newIndex], event)) {
                        // Only update z-index's if they've changed
                        if (curIndex !== newIndex) {
                            // Reduce our z-index's and keep them properly ordered
                            qtips.each(function () {
                                if (this.style.zIndex > curIndex) {
                                    this.style.zIndex = this.style.zIndex - 1;
                                }
                            });

                            // Fire blur event for focused tooltip
                            qtips.filter('.' + CLASS_FOCUS).qtip('blur', event);
                        }

                        // Set the new z-index
                        tooltip.addClass(CLASS_FOCUS)[0].style.zIndex = newIndex;
                    }
                }

                return this;
            };

            PROTOTYPE.blur = function (event) {
                if (!this.rendered || this.destroyed) { return this; }

                // Set focused status to FALSE
                this.tooltip.removeClass(CLASS_FOCUS);

                // tooltipblur event
                this._trigger('blur', [this.tooltip.css('zIndex')], event);

                return this;
            };
            ; PROTOTYPE.disable = function (state) {
                if (this.destroyed) { return this; }

                // If 'toggle' is passed, toggle the current state
                if (state === 'toggle') {
                    state = !(this.rendered ? this.tooltip.hasClass(CLASS_DISABLED) : this.disabled);
                }

                // Disable if no state passed
                else if ('boolean' !== typeof state) {
                    state = TRUE;
                }

                if (this.rendered) {
                    this.tooltip.toggleClass(CLASS_DISABLED, state)
                        .attr('aria-disabled', state);
                }

                this.disabled = !!state;

                return this;
            };

            PROTOTYPE.enable = function () { return this.disable(FALSE); };
            ; PROTOTYPE._createButton = function () {
                var self = this,
                    elements = this.elements,
                    tooltip = elements.tooltip,
                    button = this.options.content.button,
                    isString = typeof button === 'string',
                    close = isString ? button : 'Close tooltip';

                if (elements.button) { elements.button.remove(); }

                // Use custom button if one was supplied by user, else use default
                if (button.jquery) {
                    elements.button = button;
                }
                else {
                    elements.button = $('<a />', {
                        'class': 'qtip-close ' + (this.options.style.widget ? '' : NAMESPACE + '-icon'),
                        'title': close,
                        'aria-label': close
                    })
                        .prepend(
                            $('<span />', {
                                'class': 'ui-icon ui-icon-close',
                                'html': '&times;'
                            })
                        );
                }

                // Create button and setup attributes
                elements.button.appendTo(elements.titlebar || tooltip)
                    .attr('role', 'button')
                    .click(function (event) {
                        if (!tooltip.hasClass(CLASS_DISABLED)) { self.hide(event); }
                        return FALSE;
                    });
            };

            PROTOTYPE._updateButton = function (button) {
                // Make sure tooltip is rendered and if not, return
                if (!this.rendered) { return FALSE; }

                var elem = this.elements.button;
                if (button) { this._createButton(); }
                else { elem.remove(); }
            };
            ;// Widget class creator
            function createWidgetClass(cls) {
                return WIDGET.concat('').join(cls ? '-' + cls + ' ' : ' ');
            }

            // Widget class setter method
            PROTOTYPE._setWidget = function () {
                var on = this.options.style.widget,
                    elements = this.elements,
                    tooltip = elements.tooltip,
                    disabled = tooltip.hasClass(CLASS_DISABLED);

                tooltip.removeClass(CLASS_DISABLED);
                CLASS_DISABLED = on ? 'ui-state-disabled' : 'qtip-disabled';
                tooltip.toggleClass(CLASS_DISABLED, disabled);

                tooltip.toggleClass('ui-helper-reset ' + createWidgetClass(), on).toggleClass(CLASS_DEFAULT, this.options.style.def && !on);

                if (elements.content) {
                    elements.content.toggleClass(createWidgetClass('content'), on);
                }
                if (elements.titlebar) {
                    elements.titlebar.toggleClass(createWidgetClass('header'), on);
                }
                if (elements.button) {
                    elements.button.toggleClass(NAMESPACE + '-icon', !on);
                }
            };
            ; function delay(callback, duration) {
                // If tooltip has displayed, start hide timer
                if (duration > 0) {
                    return setTimeout(
                        $.proxy(callback, this), duration
                    );
                }
                else { callback.call(this); }
            }

            function showMethod(event) {
                if (this.tooltip.hasClass(CLASS_DISABLED)) { return; }

                // Clear hide timers
                clearTimeout(this.timers.show);
                clearTimeout(this.timers.hide);

                // Start show timer
                this.timers.show = delay.call(this,
                    function () { this.toggle(TRUE, event); },
                    this.options.show.delay
                );
            }

            function hideMethod(event) {
                if (this.tooltip.hasClass(CLASS_DISABLED) || this.destroyed) { return; }

                // Check if new target was actually the tooltip element
                var relatedTarget = $(event.relatedTarget),
                    ontoTooltip = relatedTarget.closest(SELECTOR)[0] === this.tooltip[0],
                    ontoTarget = relatedTarget[0] === this.options.show.target[0];

                // Clear timers and stop animation queue
                clearTimeout(this.timers.show);
                clearTimeout(this.timers.hide);

                // Prevent hiding if tooltip is fixed and event target is the tooltip.
                // Or if mouse positioning is enabled and cursor momentarily overlaps
                if (this !== relatedTarget[0] &&
                    (this.options.position.target === 'mouse' && ontoTooltip) ||
                    this.options.hide.fixed && (
                        (/mouse(out|leave|move)/).test(event.type) && (ontoTooltip || ontoTarget))
                ) {
                    /* eslint-disable no-empty */
                    try {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                    } catch (e) { }
                    /* eslint-enable no-empty */

                    return;
                }

                // If tooltip has displayed, start hide timer
                this.timers.hide = delay.call(this,
                    function () { this.toggle(FALSE, event); },
                    this.options.hide.delay,
                    this
                );
            }

            function inactiveMethod(event) {
                if (this.tooltip.hasClass(CLASS_DISABLED) || !this.options.hide.inactive) { return; }

                // Clear timer
                clearTimeout(this.timers.inactive);

                this.timers.inactive = delay.call(this,
                    function () { this.hide(event); },
                    this.options.hide.inactive
                );
            }

            function repositionMethod(event) {
                if (this.rendered && this.tooltip[0].offsetWidth > 0) { this.reposition(event); }
            }

            // Store mouse coordinates
            PROTOTYPE._storeMouse = function (event) {
                (this.mouse = $.event.fix(event)).type = 'mousemove';
                return this;
            };

            // Bind events
            PROTOTYPE._bind = function (targets, events, method, suffix, context) {
                if (!targets || !method || !events.length) { return; }
                var ns = '.' + this._id + (suffix ? '-' + suffix : '');
                $(targets).bind(
                    (events.split ? events : events.join(ns + ' ')) + ns,
                    $.proxy(method, context || this)
                );
                return this;
            };
            PROTOTYPE._unbind = function (targets, suffix) {
                targets && $(targets).unbind('.' + this._id + (suffix ? '-' + suffix : ''));
                return this;
            };

            // Global delegation helper
            function delegate(selector, events, method) {
                $(document.body).delegate(selector,
                    (events.split ? events : events.join('.' + NAMESPACE + ' ')) + '.' + NAMESPACE,
                    function () {
                        var api = QTIP.api[$.attr(this, ATTR_ID)];
                        api && !api.disabled && method.apply(api, arguments);
                    }
                );
            }
            // Event trigger
            PROTOTYPE._trigger = function (type, args, event) {
                var callback = new $.Event('tooltip' + type);
                callback.originalEvent = event && $.extend({}, event) || this.cache.event || NULL;

                this.triggering = type;
                this.tooltip.trigger(callback, [this].concat(args || []));
                this.triggering = FALSE;

                return !callback.isDefaultPrevented();
            };

            PROTOTYPE._bindEvents = function (showEvents, hideEvents, showTargets, hideTargets, showCallback, hideCallback) {
                // Get tasrgets that lye within both
                var similarTargets = showTargets.filter(hideTargets).add(hideTargets.filter(showTargets)),
                    toggleEvents = [];

                // If hide and show targets are the same...
                if (similarTargets.length) {

                    // Filter identical show/hide events
                    $.each(hideEvents, function (i, type) {
                        var showIndex = $.inArray(type, showEvents);

                        // Both events are identical, remove from both hide and show events
                        // and append to toggleEvents
                        showIndex > -1 && toggleEvents.push(showEvents.splice(showIndex, 1)[0]);
                    });

                    // Toggle events are special case of identical show/hide events, which happen in sequence
                    if (toggleEvents.length) {
                        // Bind toggle events to the similar targets
                        this._bind(similarTargets, toggleEvents, function (event) {
                            var state = this.rendered ? this.tooltip[0].offsetWidth > 0 : false;
                            (state ? hideCallback : showCallback).call(this, event);
                        });

                        // Remove the similar targets from the regular show/hide bindings
                        showTargets = showTargets.not(similarTargets);
                        hideTargets = hideTargets.not(similarTargets);
                    }
                }

                // Apply show/hide/toggle events
                this._bind(showTargets, showEvents, showCallback);
                this._bind(hideTargets, hideEvents, hideCallback);
            };

            PROTOTYPE._assignInitialEvents = function (event) {
                var options = this.options,
                    showTarget = options.show.target,
                    hideTarget = options.hide.target,
                    showEvents = options.show.event ? $.trim('' + options.show.event).split(' ') : [],
                    hideEvents = options.hide.event ? $.trim('' + options.hide.event).split(' ') : [];

                // Catch remove/removeqtip events on target element to destroy redundant tooltips
                this._bind(this.elements.target, ['remove', 'removeqtip'], function () {
                    this.destroy(true);
                }, 'destroy');

                /*
                 * Make sure hoverIntent functions properly by using mouseleave as a hide event if
                 * mouseenter/mouseout is used for show.event, even if it isn't in the users options.
                 */
                if (/mouse(over|enter)/i.test(options.show.event) && !/mouse(out|leave)/i.test(options.hide.event)) {
                    hideEvents.push('mouseleave');
                }

                /*
                 * Also make sure initial mouse targetting works correctly by caching mousemove coords
                 * on show targets before the tooltip has rendered. Also set onTarget when triggered to
                 * keep mouse tracking working.
                 */
                this._bind(showTarget, 'mousemove', function (moveEvent) {
                    this._storeMouse(moveEvent);
                    this.cache.onTarget = TRUE;
                });

                // Define hoverIntent function
                function hoverIntent(hoverEvent) {
                    // Only continue if tooltip isn't disabled
                    if (this.disabled || this.destroyed) { return FALSE; }

                    // Cache the event data
                    this.cache.event = hoverEvent && $.event.fix(hoverEvent);
                    this.cache.target = hoverEvent && $(hoverEvent.target);

                    // Start the event sequence
                    clearTimeout(this.timers.show);
                    this.timers.show = delay.call(this,
                        function () { this.render(typeof hoverEvent === 'object' || options.show.ready); },
                        options.prerender ? 0 : options.show.delay
                    );
                }

                // Filter and bind events
                this._bindEvents(showEvents, hideEvents, showTarget, hideTarget, hoverIntent, function () {
                    if (!this.timers) { return FALSE; }
                    clearTimeout(this.timers.show);
                });

                // Prerendering is enabled, create tooltip now
                if (options.show.ready || options.prerender) { hoverIntent.call(this, event); }
            };

            // Event assignment method
            PROTOTYPE._assignEvents = function () {
                var self = this,
                    options = this.options,
                    posOptions = options.position,

                    tooltip = this.tooltip,
                    showTarget = options.show.target,
                    hideTarget = options.hide.target,
                    containerTarget = posOptions.container,
                    viewportTarget = posOptions.viewport,
                    documentTarget = $(document),
                    windowTarget = $(window),

                    showEvents = options.show.event ? $.trim('' + options.show.event).split(' ') : [],
                    hideEvents = options.hide.event ? $.trim('' + options.hide.event).split(' ') : [];


                // Assign passed event callbacks
                $.each(options.events, function (name, callback) {
                    self._bind(tooltip, name === 'toggle' ? ['tooltipshow', 'tooltiphide'] : ['tooltip' + name], callback, null, tooltip);
                });

                // Hide tooltips when leaving current window/frame (but not select/option elements)
                if (/mouse(out|leave)/i.test(options.hide.event) && options.hide.leave === 'window') {
                    this._bind(documentTarget, ['mouseout', 'blur'], function (event) {
                        if (!/select|option/.test(event.target.nodeName) && !event.relatedTarget) {
                            this.hide(event);
                        }
                    });
                }

                // Enable hide.fixed by adding appropriate class
                if (options.hide.fixed) {
                    hideTarget = hideTarget.add(tooltip.addClass(CLASS_FIXED));
                }

                /*
                 * Make sure hoverIntent functions properly by using mouseleave to clear show timer if
                 * mouseenter/mouseout is used for show.event, even if it isn't in the users options.
                 */
                else if (/mouse(over|enter)/i.test(options.show.event)) {
                    this._bind(hideTarget, 'mouseleave', function () {
                        clearTimeout(this.timers.show);
                    });
                }

                // Hide tooltip on document mousedown if unfocus events are enabled
                if (('' + options.hide.event).indexOf('unfocus') > -1) {
                    this._bind(containerTarget.closest('html'), ['mousedown', 'touchstart'], function (event) {
                        var elem = $(event.target),
                            enabled = this.rendered && !this.tooltip.hasClass(CLASS_DISABLED) && this.tooltip[0].offsetWidth > 0,
                            isAncestor = elem.parents(SELECTOR).filter(this.tooltip[0]).length > 0;

                        if (elem[0] !== this.target[0] && elem[0] !== this.tooltip[0] && !isAncestor &&
                            !this.target.has(elem[0]).length && enabled
                        ) {
                            this.hide(event);
                        }
                    });
                }

                // Check if the tooltip hides when inactive
                if ('number' === typeof options.hide.inactive) {
                    // Bind inactive method to show target(s) as a custom event
                    this._bind(showTarget, 'qtip-' + this.id + '-inactive', inactiveMethod, 'inactive');

                    // Define events which reset the 'inactive' event handler
                    this._bind(hideTarget.add(tooltip), QTIP.inactiveEvents, inactiveMethod);
                }

                // Filter and bind events
                this._bindEvents(showEvents, hideEvents, showTarget, hideTarget, showMethod, hideMethod);

                // Mouse movement bindings
                this._bind(showTarget.add(tooltip), 'mousemove', function (event) {
                    // Check if the tooltip hides when mouse is moved a certain distance
                    if ('number' === typeof options.hide.distance) {
                        var origin = this.cache.origin || {},
                            limit = this.options.hide.distance,
                            abs = Math.abs;

                        // Check if the movement has gone beyond the limit, and hide it if so
                        if (abs(event.pageX - origin.pageX) >= limit || abs(event.pageY - origin.pageY) >= limit) {
                            this.hide(event);
                        }
                    }

                    // Cache mousemove coords on show targets
                    this._storeMouse(event);
                });

                // Mouse positioning events
                if (posOptions.target === 'mouse') {
                    // If mouse adjustment is on...
                    if (posOptions.adjust.mouse) {
                        // Apply a mouseleave event so we don't get problems with overlapping
                        if (options.hide.event) {
                            // Track if we're on the target or not
                            this._bind(showTarget, ['mouseenter', 'mouseleave'], function (event) {
                                if (!this.cache) { return FALSE; }
                                this.cache.onTarget = event.type === 'mouseenter';
                            });
                        }

                        // Update tooltip position on mousemove
                        this._bind(documentTarget, 'mousemove', function (event) {
                            // Update the tooltip position only if the tooltip is visible and adjustment is enabled
                            if (this.rendered && this.cache.onTarget && !this.tooltip.hasClass(CLASS_DISABLED) && this.tooltip[0].offsetWidth > 0) {
                                this.reposition(event);
                            }
                        });
                    }
                }

                // Adjust positions of the tooltip on window resize if enabled
                if (posOptions.adjust.resize || viewportTarget.length) {
                    this._bind($.event.special.resize ? viewportTarget : windowTarget, 'resize', repositionMethod);
                }

                // Adjust tooltip position on scroll of the window or viewport element if present
                if (posOptions.adjust.scroll) {
                    this._bind(windowTarget.add(posOptions.container), 'scroll', repositionMethod);
                }
            };

            // Un-assignment method
            PROTOTYPE._unassignEvents = function () {
                var options = this.options,
                    showTargets = options.show.target,
                    hideTargets = options.hide.target,
                    targets = $.grep([
                        this.elements.target[0],
                        this.rendered && this.tooltip[0],
                        options.position.container[0],
                        options.position.viewport[0],
                        options.position.container.closest('html')[0], // unfocus
                        window,
                        document
                    ], function (i) {
                        return typeof i === 'object';
                    });

                // Add show and hide targets if they're valid
                if (showTargets && showTargets.toArray) {
                    targets = targets.concat(showTargets.toArray());
                }
                if (hideTargets && hideTargets.toArray) {
                    targets = targets.concat(hideTargets.toArray());
                }

                // Unbind the events
                this._unbind(targets)
                    ._unbind(targets, 'destroy')
                    ._unbind(targets, 'inactive');
            };

            // Apply common event handlers using delegate (avoids excessive .bind calls!)
            $(function () {
                delegate(SELECTOR, ['mouseenter', 'mouseleave'], function (event) {
                    var state = event.type === 'mouseenter',
                        tooltip = $(event.currentTarget),
                        target = $(event.relatedTarget || event.target),
                        options = this.options;

                    // On mouseenter...
                    if (state) {
                        // Focus the tooltip on mouseenter (z-index stacking)
                        this.focus(event);

                        // Clear hide timer on tooltip hover to prevent it from closing
                        tooltip.hasClass(CLASS_FIXED) && !tooltip.hasClass(CLASS_DISABLED) && clearTimeout(this.timers.hide);
                    }

                    // On mouseleave...
                    else {
                        // When mouse tracking is enabled, hide when we leave the tooltip and not onto the show target (if a hide event is set)
                        if (options.position.target === 'mouse' && options.position.adjust.mouse &&
                            options.hide.event && options.show.target && !target.closest(options.show.target[0]).length) {
                            this.hide(event);
                        }
                    }

                    // Add hover class
                    tooltip.toggleClass(CLASS_HOVER, state);
                });

                // Define events which reset the 'inactive' event handler
                delegate('[' + ATTR_ID + ']', INACTIVE_EVENTS, inactiveMethod);
            });
            ;// Initialization method
            function init(elem, id, opts) {
                var obj, posOptions, attr, config, title,

                    // Setup element references
                    docBody = $(document.body),

                    // Use document body instead of document element if needed
                    newTarget = elem[0] === document ? docBody : elem,

                    // Grab metadata from element if plugin is present
                    metadata = elem.metadata ? elem.metadata(opts.metadata) : NULL,

                    // If metadata type if HTML5, grab 'name' from the object instead, or use the regular data object otherwise
                    metadata5 = opts.metadata.type === 'html5' && metadata ? metadata[opts.metadata.name] : NULL,

                    // Grab data from metadata.name (or data-qtipopts as fallback) using .data() method,
                    html5 = elem.data(opts.metadata.name || 'qtipopts');

                // If we don't get an object returned attempt to parse it manualyl without parseJSON
                /* eslint-disable no-empty */
                try { html5 = typeof html5 === 'string' ? $.parseJSON(html5) : html5; }
                catch (e) { }
                /* eslint-enable no-empty */

                // Merge in and sanitize metadata
                config = $.extend(TRUE, {}, QTIP.defaults, opts,
                    typeof html5 === 'object' ? sanitizeOptions(html5) : NULL,
                    sanitizeOptions(metadata5 || metadata));

                // Re-grab our positioning options now we've merged our metadata and set id to passed value
                posOptions = config.position;
                config.id = id;

                // Setup missing content if none is detected
                if ('boolean' === typeof config.content.text) {
                    attr = elem.attr(config.content.attr);

                    // Grab from supplied attribute if available
                    if (config.content.attr !== FALSE && attr) { config.content.text = attr; }

                    // No valid content was found, abort render
                    else { return FALSE; }
                }

                // Setup target options
                if (!posOptions.container.length) { posOptions.container = docBody; }
                if (posOptions.target === FALSE) { posOptions.target = newTarget; }
                if (config.show.target === FALSE) { config.show.target = newTarget; }
                if (config.show.solo === TRUE) { config.show.solo = posOptions.container.closest('body'); }
                if (config.hide.target === FALSE) { config.hide.target = newTarget; }
                if (config.position.viewport === TRUE) { config.position.viewport = posOptions.container; }

                // Ensure we only use a single container
                posOptions.container = posOptions.container.eq(0);

                // Convert position corner values into x and y strings
                posOptions.at = new CORNER(posOptions.at, TRUE);
                posOptions.my = new CORNER(posOptions.my);

                // Destroy previous tooltip if overwrite is enabled, or skip element if not
                if (elem.data(NAMESPACE)) {
                    if (config.overwrite) {
                        elem.qtip('destroy', true);
                    }
                    else if (config.overwrite === FALSE) {
                        return FALSE;
                    }
                }

                // Add has-qtip attribute
                elem.attr(ATTR_HAS, id);

                // Remove title attribute and store it if present
                if (config.suppress && (title = elem.attr('title'))) {
                    // Final attr call fixes event delegatiom and IE default tooltip showing problem
                    elem.removeAttr('title').attr(oldtitle, title).attr('title', '');
                }

                // Initialize the tooltip and add API reference
                obj = new QTip(elem, config, id, !!attr);
                elem.data(NAMESPACE, obj);

                return obj;
            }

            // jQuery $.fn extension method
            QTIP = $.fn.qtip = function (options, notation, newValue) {
                var command = ('' + options).toLowerCase(), // Parse command
                    returned = NULL,
                    args = $.makeArray(arguments).slice(1),
                    event = args[args.length - 1],
                    opts = this[0] ? $.data(this[0], NAMESPACE) : NULL;

                // Check for API request
                if (!arguments.length && opts || command === 'api') {
                    return opts;
                }

                // Execute API command if present
                else if ('string' === typeof options) {
                    this.each(function () {
                        var api = $.data(this, NAMESPACE);
                        if (!api) { return TRUE; }

                        // Cache the event if possible
                        if (event && event.timeStamp) { api.cache.event = event; }

                        // Check for specific API commands
                        if (notation && (command === 'option' || command === 'options')) {
                            if (newValue !== undefined || $.isPlainObject(notation)) {
                                api.set(notation, newValue);
                            }
                            else {
                                returned = api.get(notation);
                                return FALSE;
                            }
                        }

                        // Execute API command
                        else if (api[command]) {
                            api[command].apply(api, args);
                        }
                    });

                    return returned !== NULL ? returned : this;
                }

                // No API commands. validate provided options and setup qTips
                else if ('object' === typeof options || !arguments.length) {
                    // Sanitize options first
                    opts = sanitizeOptions($.extend(TRUE, {}, options));

                    return this.each(function (i) {
                        var api, id;

                        // Find next available ID, or use custom ID if provided
                        id = $.isArray(opts.id) ? opts.id[i] : opts.id;
                        id = !id || id === FALSE || id.length < 1 || QTIP.api[id] ? QTIP.nextid++ : id;

                        // Initialize the qTip and re-grab newly sanitized options
                        api = init($(this), id, opts);
                        if (api === FALSE) { return TRUE; }
                        else { QTIP.api[id] = api; }

                        // Initialize plugins
                        $.each(PLUGINS, function () {
                            if (this.initialize === 'initialize') { this(api); }
                        });

                        // Assign initial pre-render events
                        api._assignInitialEvents(event);
                    });
                }
            };

            // Expose class
            $.qtip = QTip;

            // Populated in render method
            QTIP.api = {};
            ; $.each({
                /* Allow other plugins to successfully retrieve the title of an element with a qTip applied */
                attr: function (attr, val) {
                    if (this.length) {
                        var self = this[0],
                            title = 'title',
                            api = $.data(self, 'qtip');

                        if (attr === title && api && api.options && 'object' === typeof api && 'object' === typeof api.options && api.options.suppress) {
                            if (arguments.length < 2) {
                                return $.attr(self, oldtitle);
                            }

                            // If qTip is rendered and title was originally used as content, update it
                            if (api && api.options.content.attr === title && api.cache.attr) {
                                api.set('content.text', val);
                            }

                            // Use the regular attr method to set, then cache the result
                            return this.attr(oldtitle, val);
                        }
                    }

                    return $.fn['attr' + replaceSuffix].apply(this, arguments);
                },

                /* Allow clone to correctly retrieve cached title attributes */
                clone: function (keepData) {
                    // Clone our element using the real clone method
                    var elems = $.fn['clone' + replaceSuffix].apply(this, arguments);

                    // Grab all elements with an oldtitle set, and change it to regular title attribute, if keepData is false
                    if (!keepData) {
                        elems.filter('[' + oldtitle + ']').attr('title', function () {
                            return $.attr(this, oldtitle);
                        })
                            .removeAttr(oldtitle);
                    }

                    return elems;
                }
            }, function (name, func) {
                if (!func || $.fn[name + replaceSuffix]) { return TRUE; }

                var old = $.fn[name + replaceSuffix] = $.fn[name];
                $.fn[name] = function () {
                    return func.apply(this, arguments) || old.apply(this, arguments);
                };
            });

            /* Fire off 'removeqtip' handler in $.cleanData if jQuery UI not present (it already does similar).
             * This snippet is taken directly from jQuery UI source code found here:
             *     http://code.jquery.com/ui/jquery-ui-git.js
             */
            if (!$.ui) {
                $['cleanData' + replaceSuffix] = $.cleanData;
                $.cleanData = function (elems) {
                    for (var i = 0, elem; (elem = $(elems[i])).length; i++) {
                        if (elem.attr(ATTR_HAS)) {
                            /* eslint-disable no-empty */
                            try { elem.triggerHandler('removeqtip'); }
                            catch (e) { }
                            /* eslint-enable no-empty */
                        }
                    }
                    $['cleanData' + replaceSuffix].apply(this, arguments);
                };
            }
            ;// qTip version
            QTIP.version = '3.0.3';

            // Base ID for all qTips
            QTIP.nextid = 0;

            // Inactive events array
            QTIP.inactiveEvents = INACTIVE_EVENTS;

            // Base z-index for all qTips
            QTIP.zindex = 15000;

            // Define configuration defaults
            QTIP.defaults = {
                prerender: FALSE,
                id: FALSE,
                overwrite: TRUE,
                suppress: TRUE,
                content: {
                    text: TRUE,
                    attr: 'title',
                    title: FALSE,
                    button: FALSE
                },
                position: {
                    my: 'top left',
                    at: 'bottom right',
                    target: FALSE,
                    container: FALSE,
                    viewport: FALSE,
                    adjust: {
                        x: 0, y: 0,
                        mouse: TRUE,
                        scroll: TRUE,
                        resize: TRUE,
                        method: 'flipinvert flipinvert'
                    },
                    effect: function (api, pos) {
                        $(this).animate(pos, {
                            duration: 200,
                            queue: FALSE
                        });
                    }
                },
                show: {
                    target: FALSE,
                    event: 'mouseenter',
                    effect: TRUE,
                    delay: 90,
                    solo: FALSE,
                    ready: FALSE,
                    autofocus: FALSE
                },
                hide: {
                    target: FALSE,
                    event: 'mouseleave',
                    effect: TRUE,
                    delay: 0,
                    fixed: FALSE,
                    inactive: FALSE,
                    leave: 'window',
                    distance: FALSE
                },
                style: {
                    classes: '',
                    widget: FALSE,
                    width: FALSE,
                    height: FALSE,
                    def: TRUE
                },
                events: {
                    render: NULL,
                    move: NULL,
                    show: NULL,
                    hide: NULL,
                    toggle: NULL,
                    visible: NULL,
                    hidden: NULL,
                    focus: NULL,
                    blur: NULL
                }
            };
            ; var TIP,
                createVML,
                SCALE,
                PIXEL_RATIO,
                BACKING_STORE_RATIO,

                // Common CSS strings
                MARGIN = 'margin',
                BORDER = 'border',
                COLOR = 'color',
                BG_COLOR = 'background-color',
                TRANSPARENT = 'transparent',
                IMPORTANT = ' !important',

                // Check if the browser supports <canvas/> elements
                HASCANVAS = !!document.createElement('canvas').getContext,

                // Invalid colour values used in parseColours()
                INVALID = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i;

            // Camel-case method, taken from jQuery source
            // http://code.jquery.com/jquery-1.8.0.js
            function camel(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

            /*
             * Modified from Modernizr's testPropsAll()
             * http://modernizr.com/downloads/modernizr-latest.js
             */
            var cssProps = {}, cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'];
            function vendorCss(elem, prop) {
                var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
                    props = (prop + ' ' + cssPrefixes.join(ucProp + ' ') + ucProp).split(' '),
                    cur, val, i = 0;

                // If the property has already been mapped...
                if (cssProps[prop]) { return elem.css(cssProps[prop]); }

                while (cur = props[i++]) {
                    if ((val = elem.css(cur)) !== undefined) {
                        cssProps[prop] = cur;
                        return val;
                    }
                }
            }

            // Parse a given elements CSS property into an int
            function intCss(elem, prop) {
                return Math.ceil(parseFloat(vendorCss(elem, prop)));
            }


            // VML creation (for IE only)
            if (!HASCANVAS) {
                createVML = function (tag, props, style) {
                    return '<qtipvml:' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (props || '') +
                        ' style="behavior: url(#default#VML); ' + (style || '') + '" />';
                };
            }

            // Canvas only definitions
            else {
                PIXEL_RATIO = window.devicePixelRatio || 1;
                BACKING_STORE_RATIO = (function () {
                    var context = document.createElement('canvas').getContext('2d');
                    return context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio ||
                        context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || 1;
                })();
                SCALE = PIXEL_RATIO / BACKING_STORE_RATIO;
            }


            function Tip(qtip, options) {
                this._ns = 'tip';
                this.options = options;
                this.offset = options.offset;
                this.size = [options.width, options.height];

                // Initialize
                this.qtip = qtip;
                this.init(qtip);
            }

            $.extend(Tip.prototype, {
                init: function (qtip) {
                    var context, tip;

                    // Create tip element and prepend to the tooltip
                    tip = this.element = qtip.elements.tip = $('<div />', { 'class': NAMESPACE + '-tip' }).prependTo(qtip.tooltip);

                    // Create tip drawing element(s)
                    if (HASCANVAS) {
                        // save() as soon as we create the canvas element so FF2 doesn't bork on our first restore()!
                        context = $('<canvas />').appendTo(this.element)[0].getContext('2d');

                        // Setup constant parameters
                        context.lineJoin = 'miter';
                        context.miterLimit = 100000;
                        context.save();
                    }
                    else {
                        context = createVML('shape', 'coordorigin="0,0"', 'position:absolute;');
                        this.element.html(context + context);

                        // Prevent mousing down on the tip since it causes problems with .live() handling in IE due to VML
                        qtip._bind($('*', tip).add(tip), ['click', 'mousedown'], function (event) { event.stopPropagation(); }, this._ns);
                    }

                    // Bind update events
                    qtip._bind(qtip.tooltip, 'tooltipmove', this.reposition, this._ns, this);

                    // Create it
                    this.create();
                },

                _swapDimensions: function () {
                    this.size[0] = this.options.height;
                    this.size[1] = this.options.width;
                },
                _resetDimensions: function () {
                    this.size[0] = this.options.width;
                    this.size[1] = this.options.height;
                },

                _useTitle: function (corner) {
                    var titlebar = this.qtip.elements.titlebar;
                    return titlebar && (
                        corner.y === TOP || corner.y === CENTER && this.element.position().top + this.size[1] / 2 + this.options.offset < titlebar.outerHeight(TRUE)
                    );
                },

                _parseCorner: function (corner) {
                    var my = this.qtip.options.position.my;

                    // Detect corner and mimic properties
                    if (corner === FALSE || my === FALSE) {
                        corner = FALSE;
                    }
                    else if (corner === TRUE) {
                        corner = new CORNER(my.string());
                    }
                    else if (!corner.string) {
                        corner = new CORNER(corner);
                        corner.fixed = TRUE;
                    }

                    return corner;
                },

                _parseWidth: function (corner, side, use) {
                    var elements = this.qtip.elements,
                        prop = BORDER + camel(side) + 'Width';

                    return (use ? intCss(use, prop) :
                        intCss(elements.content, prop) ||
                        intCss(this._useTitle(corner) && elements.titlebar || elements.content, prop) ||
                        intCss(elements.tooltip, prop)
                    ) || 0;
                },

                _parseRadius: function (corner) {
                    var elements = this.qtip.elements,
                        prop = BORDER + camel(corner.y) + camel(corner.x) + 'Radius';

                    return BROWSER.ie < 9 ? 0 :
                        intCss(this._useTitle(corner) && elements.titlebar || elements.content, prop) ||
                        intCss(elements.tooltip, prop) || 0;
                },

                _invalidColour: function (elem, prop, compare) {
                    var val = elem.css(prop);
                    return !val || compare && val === elem.css(compare) || INVALID.test(val) ? FALSE : val;
                },

                _parseColours: function (corner) {
                    var elements = this.qtip.elements,
                        tip = this.element.css('cssText', ''),
                        borderSide = BORDER + camel(corner[corner.precedance]) + camel(COLOR),
                        colorElem = this._useTitle(corner) && elements.titlebar || elements.content,
                        css = this._invalidColour, color = [];

                    // Attempt to detect the background colour from various elements, left-to-right precedance
                    color[0] = css(tip, BG_COLOR) || css(colorElem, BG_COLOR) || css(elements.content, BG_COLOR) ||
                        css(elements.tooltip, BG_COLOR) || tip.css(BG_COLOR);

                    // Attempt to detect the correct border side colour from various elements, left-to-right precedance
                    color[1] = css(tip, borderSide, COLOR) || css(colorElem, borderSide, COLOR) ||
                        css(elements.content, borderSide, COLOR) || css(elements.tooltip, borderSide, COLOR) || elements.tooltip.css(borderSide);

                    // Reset background and border colours
                    $('*', tip).add(tip).css('cssText', BG_COLOR + ':' + TRANSPARENT + IMPORTANT + ';' + BORDER + ':0' + IMPORTANT + ';');

                    return color;
                },

                _calculateSize: function (corner) {
                    var y = corner.precedance === Y,
                        width = this.options.width,
                        height = this.options.height,
                        isCenter = corner.abbrev() === 'c',
                        base = (y ? width : height) * (isCenter ? 0.5 : 1),
                        pow = Math.pow,
                        round = Math.round,
                        bigHyp, ratio, result,

                        smallHyp = Math.sqrt(pow(base, 2) + pow(height, 2)),
                        hyp = [
                            this.border / base * smallHyp,
                            this.border / height * smallHyp
                        ];

                    hyp[2] = Math.sqrt(pow(hyp[0], 2) - pow(this.border, 2));
                    hyp[3] = Math.sqrt(pow(hyp[1], 2) - pow(this.border, 2));

                    bigHyp = smallHyp + hyp[2] + hyp[3] + (isCenter ? 0 : hyp[0]);
                    ratio = bigHyp / smallHyp;

                    result = [round(ratio * width), round(ratio * height)];
                    return y ? result : result.reverse();
                },

                // Tip coordinates calculator
                _calculateTip: function (corner, size, scale) {
                    scale = scale || 1;
                    size = size || this.size;

                    var width = size[0] * scale,
                        height = size[1] * scale,
                        width2 = Math.ceil(width / 2), height2 = Math.ceil(height / 2),

                        // Define tip coordinates in terms of height and width values
                        tips = {
                            br: [0, 0, width, height, width, 0],
                            bl: [0, 0, width, 0, 0, height],
                            tr: [0, height, width, 0, width, height],
                            tl: [0, 0, 0, height, width, height],
                            tc: [0, height, width2, 0, width, height],
                            bc: [0, 0, width, 0, width2, height],
                            rc: [0, 0, width, height2, 0, height],
                            lc: [width, 0, width, height, 0, height2]
                        };

                    // Set common side shapes
                    tips.lt = tips.br; tips.rt = tips.bl;
                    tips.lb = tips.tr; tips.rb = tips.tl;

                    return tips[corner.abbrev()];
                },

                // Tip coordinates drawer (canvas)
                _drawCoords: function (context, coords) {
                    context.beginPath();
                    context.moveTo(coords[0], coords[1]);
                    context.lineTo(coords[2], coords[3]);
                    context.lineTo(coords[4], coords[5]);
                    context.closePath();
                },

                create: function () {
                    // Determine tip corner
                    var c = this.corner = (HASCANVAS || BROWSER.ie) && this._parseCorner(this.options.corner);

                    // If we have a tip corner...
                    this.enabled = !!this.corner && this.corner.abbrev() !== 'c';
                    if (this.enabled) {
                        // Cache it
                        this.qtip.cache.corner = c.clone();

                        // Create it
                        this.update();
                    }

                    // Toggle tip element
                    this.element.toggle(this.enabled);

                    return this.corner;
                },

                update: function (corner, position) {
                    if (!this.enabled) { return this; }

                    var elements = this.qtip.elements,
                        tip = this.element,
                        inner = tip.children(),
                        options = this.options,
                        curSize = this.size,
                        mimic = options.mimic,
                        round = Math.round,
                        color, precedance, context,
                        coords, bigCoords, translate, newSize, border;

                    // Re-determine tip if not already set
                    if (!corner) { corner = this.qtip.cache.corner || this.corner; }

                    // Use corner property if we detect an invalid mimic value
                    if (mimic === FALSE) { mimic = corner; }

                    // Otherwise inherit mimic properties from the corner object as necessary
                    else {
                        mimic = new CORNER(mimic);
                        mimic.precedance = corner.precedance;

                        if (mimic.x === 'inherit') { mimic.x = corner.x; }
                        else if (mimic.y === 'inherit') { mimic.y = corner.y; }
                        else if (mimic.x === mimic.y) {
                            mimic[corner.precedance] = corner[corner.precedance];
                        }
                    }
                    precedance = mimic.precedance;

                    // Ensure the tip width.height are relative to the tip position
                    if (corner.precedance === X) { this._swapDimensions(); }
                    else { this._resetDimensions(); }

                    // Update our colours
                    color = this.color = this._parseColours(corner);

                    // Detect border width, taking into account colours
                    if (color[1] !== TRANSPARENT) {
                        // Grab border width
                        border = this.border = this._parseWidth(corner, corner[corner.precedance]);

                        // If border width isn't zero, use border color as fill if it's not invalid (1.0 style tips)
                        if (options.border && border < 1 && !INVALID.test(color[1])) { color[0] = color[1]; }

                        // Set border width (use detected border width if options.border is true)
                        this.border = border = options.border !== TRUE ? options.border : border;
                    }

                    // Border colour was invalid, set border to zero
                    else { this.border = border = 0; }

                    // Determine tip size
                    newSize = this.size = this._calculateSize(corner);
                    tip.css({
                        width: newSize[0],
                        height: newSize[1],
                        lineHeight: newSize[1] + 'px'
                    });

                    // Calculate tip translation
                    if (corner.precedance === Y) {
                        translate = [
                            round(mimic.x === LEFT ? border : mimic.x === RIGHT ? newSize[0] - curSize[0] - border : (newSize[0] - curSize[0]) / 2),
                            round(mimic.y === TOP ? newSize[1] - curSize[1] : 0)
                        ];
                    }
                    else {
                        translate = [
                            round(mimic.x === LEFT ? newSize[0] - curSize[0] : 0),
                            round(mimic.y === TOP ? border : mimic.y === BOTTOM ? newSize[1] - curSize[1] - border : (newSize[1] - curSize[1]) / 2)
                        ];
                    }

                    // Canvas drawing implementation
                    if (HASCANVAS) {
                        // Grab canvas context and clear/save it
                        context = inner[0].getContext('2d');
                        context.restore(); context.save();
                        context.clearRect(0, 0, 6000, 6000);

                        // Calculate coordinates
                        coords = this._calculateTip(mimic, curSize, SCALE);
                        bigCoords = this._calculateTip(mimic, this.size, SCALE);

                        // Set the canvas size using calculated size
                        inner.attr(WIDTH, newSize[0] * SCALE).attr(HEIGHT, newSize[1] * SCALE);
                        inner.css(WIDTH, newSize[0]).css(HEIGHT, newSize[1]);

                        // Draw the outer-stroke tip
                        this._drawCoords(context, bigCoords);
                        context.fillStyle = color[1];
                        context.fill();

                        // Draw the actual tip
                        context.translate(translate[0] * SCALE, translate[1] * SCALE);
                        this._drawCoords(context, coords);
                        context.fillStyle = color[0];
                        context.fill();
                    }

                    // VML (IE Proprietary implementation)
                    else {
                        // Calculate coordinates
                        coords = this._calculateTip(mimic);

                        // Setup coordinates string
                        coords = 'm' + coords[0] + ',' + coords[1] + ' l' + coords[2] +
                            ',' + coords[3] + ' ' + coords[4] + ',' + coords[5] + ' xe';

                        // Setup VML-specific offset for pixel-perfection
                        translate[2] = border && /^(r|b)/i.test(corner.string()) ?
                            BROWSER.ie === 8 ? 2 : 1 : 0;

                        // Set initial CSS
                        inner.css({
                            coordsize: newSize[0] + border + ' ' + newSize[1] + border,
                            antialias: '' + (mimic.string().indexOf(CENTER) > -1),
                            left: translate[0] - translate[2] * Number(precedance === X),
                            top: translate[1] - translate[2] * Number(precedance === Y),
                            width: newSize[0] + border,
                            height: newSize[1] + border
                        })
                            .each(function (i) {
                                var $this = $(this);

                                // Set shape specific attributes
                                $this[$this.prop ? 'prop' : 'attr']({
                                    coordsize: newSize[0] + border + ' ' + newSize[1] + border,
                                    path: coords,
                                    fillcolor: color[0],
                                    filled: !!i,
                                    stroked: !i
                                })
                                    .toggle(!!(border || i));

                                // Check if border is enabled and add stroke element
                                !i && $this.html(createVML(
                                    'stroke', 'weight="' + border * 2 + 'px" color="' + color[1] + '" miterlimit="1000" joinstyle="miter"'
                                ));
                            });
                    }

                    // Opera bug #357 - Incorrect tip position
                    // https://github.com/Craga89/qTip2/issues/367
                    window.opera && setTimeout(function () {
                        elements.tip.css({
                            display: 'inline-block',
                            visibility: 'visible'
                        });
                    }, 1);

                    // Position if needed
                    if (position !== FALSE) { this.calculate(corner, newSize); }
                },

                calculate: function (corner, size) {
                    if (!this.enabled) { return FALSE; }

                    var self = this,
                        elements = this.qtip.elements,
                        tip = this.element,
                        userOffset = this.options.offset,
                        position = {},
                        precedance, corners;

                    // Inherit corner if not provided
                    corner = corner || this.corner;
                    precedance = corner.precedance;

                    // Determine which tip dimension to use for adjustment
                    size = size || this._calculateSize(corner);

                    // Setup corners and offset array
                    corners = [corner.x, corner.y];
                    if (precedance === X) { corners.reverse(); }

                    // Calculate tip position
                    $.each(corners, function (i, side) {
                        var b, bc, br;

                        if (side === CENTER) {
                            b = precedance === Y ? LEFT : TOP;
                            position[b] = '50%';
                            position[MARGIN + '-' + b] = -Math.round(size[precedance === Y ? 0 : 1] / 2) + userOffset;
                        }
                        else {
                            b = self._parseWidth(corner, side, elements.tooltip);
                            bc = self._parseWidth(corner, side, elements.content);
                            br = self._parseRadius(corner);

                            position[side] = Math.max(-self.border, i ? bc : userOffset + (br > b ? br : -b));
                        }
                    });

                    // Adjust for tip size
                    position[corner[precedance]] -= size[precedance === X ? 0 : 1];

                    // Set and return new position
                    tip.css({ margin: '', top: '', bottom: '', left: '', right: '' }).css(position);
                    return position;
                },

                reposition: function (event, api, pos) {
                    if (!this.enabled) { return; }

                    var cache = api.cache,
                        newCorner = this.corner.clone(),
                        adjust = pos.adjusted,
                        method = api.options.position.adjust.method.split(' '),
                        horizontal = method[0],
                        vertical = method[1] || method[0],
                        shift = { left: FALSE, top: FALSE, x: 0, y: 0 },
                        offset, css = {}, props;

                    function shiftflip(direction, precedance, popposite, side, opposite) {
                        // Horizontal - Shift or flip method
                        if (direction === SHIFT && newCorner.precedance === precedance && adjust[side] && newCorner[popposite] !== CENTER) {
                            newCorner.precedance = newCorner.precedance === X ? Y : X;
                        }
                        else if (direction !== SHIFT && adjust[side]) {
                            newCorner[precedance] = newCorner[precedance] === CENTER ?
                                adjust[side] > 0 ? side : opposite :
                                newCorner[precedance] === side ? opposite : side;
                        }
                    }

                    function shiftonly(xy, side, opposite) {
                        if (newCorner[xy] === CENTER) {
                            css[MARGIN + '-' + side] = shift[xy] = offset[MARGIN + '-' + side] - adjust[side];
                        }
                        else {
                            props = offset[opposite] !== undefined ?
                                [adjust[side], -offset[side]] : [-adjust[side], offset[side]];

                            if ((shift[xy] = Math.max(props[0], props[1])) > props[0]) {
                                pos[side] -= adjust[side];
                                shift[side] = FALSE;
                            }

                            css[offset[opposite] !== undefined ? opposite : side] = shift[xy];
                        }
                    }

                    // If our tip position isn't fixed e.g. doesn't adjust with viewport...
                    if (this.corner.fixed !== TRUE) {
                        // Perform shift/flip adjustments
                        shiftflip(horizontal, X, Y, LEFT, RIGHT);
                        shiftflip(vertical, Y, X, TOP, BOTTOM);

                        // Update and redraw the tip if needed (check cached details of last drawn tip)
                        if (newCorner.string() !== cache.corner.string() || cache.cornerTop !== adjust.top || cache.cornerLeft !== adjust.left) {
                            this.update(newCorner, FALSE);
                        }
                    }

                    // Setup tip offset properties
                    offset = this.calculate(newCorner);

                    // Readjust offset object to make it left/top
                    if (offset.right !== undefined) { offset.left = -offset.right; }
                    if (offset.bottom !== undefined) { offset.top = -offset.bottom; }
                    offset.user = this.offset;

                    // Perform shift adjustments
                    shift.left = horizontal === SHIFT && !!adjust.left;
                    if (shift.left) {
                        shiftonly(X, LEFT, RIGHT);
                    }
                    shift.top = vertical === SHIFT && !!adjust.top;
                    if (shift.top) {
                        shiftonly(Y, TOP, BOTTOM);
                    }

                    /*
                    * If the tip is adjusted in both dimensions, or in a
                    * direction that would cause it to be anywhere but the
                    * outer border, hide it!
                    */
                    this.element.css(css).toggle(
                        !(shift.x && shift.y || newCorner.x === CENTER && shift.y || newCorner.y === CENTER && shift.x)
                    );

                    // Adjust position to accomodate tip dimensions
                    pos.left -= offset.left.charAt ? offset.user :
                        horizontal !== SHIFT || shift.top || !shift.left && !shift.top ? offset.left + this.border : 0;
                    pos.top -= offset.top.charAt ? offset.user :
                        vertical !== SHIFT || shift.left || !shift.left && !shift.top ? offset.top + this.border : 0;

                    // Cache details
                    cache.cornerLeft = adjust.left; cache.cornerTop = adjust.top;
                    cache.corner = newCorner.clone();
                },

                destroy: function () {
                    // Unbind events
                    this.qtip._unbind(this.qtip.tooltip, this._ns);

                    // Remove the tip element(s)
                    if (this.qtip.elements.tip) {
                        this.qtip.elements.tip.find('*')
                            .remove().end().remove();
                    }
                }
            });

            TIP = PLUGINS.tip = function (api) {
                return new Tip(api, api.options.style.tip);
            };

            // Initialize tip on render
            TIP.initialize = 'render';

            // Setup plugin sanitization options
            TIP.sanitize = function (options) {
                if (options.style && 'tip' in options.style) {
                    var opts = options.style.tip;
                    if (typeof opts !== 'object') { opts = options.style.tip = { corner: opts }; }
                    if (!(/string|boolean/i).test(typeof opts.corner)) { opts.corner = TRUE; }
                }
            };

            // Add new option checks for the plugin
            CHECKS.tip = {
                '^position.my|style.tip.(corner|mimic|border)$': function () {
                    // Make sure a tip can be drawn
                    this.create();

                    // Reposition the tooltip
                    this.qtip.reposition();
                },
                '^style.tip.(height|width)$': function (obj) {
                    // Re-set dimensions and redraw the tip
                    this.size = [obj.width, obj.height];
                    this.update();

                    // Reposition the tooltip
                    this.qtip.reposition();
                },
                '^content.title|style.(classes|widget)$': function () {
                    this.update();
                }
            };

            // Extend original qTip defaults
            $.extend(TRUE, QTIP.defaults, {
                style: {
                    tip: {
                        corner: TRUE,
                        mimic: FALSE,
                        width: 6,
                        height: 6,
                        border: TRUE,
                        offset: 0
                    }
                }
            });
            ;
        }));
}(window, document));

/*!
* mustache.js - Logic-less {{ mustache }} templates with JavaScript
* http://github.com/janl/mustache.js
*/

/*global define: false Mustache: true*/
console.log("mustache.js ready!");
(function defineMustache(global, factory) {
    if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
        factory(exports); // CommonJS
    } else if (typeof define === 'function' && define.amd) {
        define(['exports'], factory); // AMD
    } else {
        global.Mustache = {};
        factory(global.Mustache); // script, wsh, asp
    }
}(this, function mustacheFactory(mustache) {

    var objectToString = Object.prototype.toString;
    var isArray = Array.isArray || function isArrayPolyfill(object) {
        return objectToString.call(object) === '[object Array]';
    };

    function isFunction(object) {
        return typeof object === 'function';
    }

    /**
     * More correct typeof string handling array
     * which normally returns typeof 'object'
     */
    function typeStr(obj) {
        return isArray(obj) ? 'array' : typeof obj;
    }

    function escapeRegExp(string) {
        return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
    }

    /**
     * Null safe way of checking whether or not an object,
     * including its prototype, has a given property
     */
    function hasProperty(obj, propName) {
        return obj != null && typeof obj === 'object' && (propName in obj);
    }

    // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
    // See https://github.com/janl/mustache.js/issues/189
    var regExpTest = RegExp.prototype.test;
    function testRegExp(re, string) {
        return regExpTest.call(re, string);
    }

    var nonSpaceRe = /\S/;
    function isWhitespace(string) {
        return !testRegExp(nonSpaceRe, string);
    }

    var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    function escapeHtml(string) {
        return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
            return entityMap[s];
        });
    }

    var whiteRe = /\s*/;
    var spaceRe = /\s+/;
    var equalsRe = /\s*=/;
    var curlyRe = /\s*\}/;
    var tagRe = /#|\^|\/|>|\{|&|=|!/;

    /**
     * Breaks up the given `template` string into a tree of tokens. If the `tags`
     * argument is given here it must be an array with two string values: the
* opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
    * course, the default is to use mustaches (i.e. mustache.tags).
    *
    * A token is an array with at least 4 elements. The first element is the
    * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
* did not contain a symbol (i.e. {{ myValue }}) this element is "name". For
    * all text that appears outside a symbol this element is "text".
    *
    * The second element of a token is its "value". For mustache tags this is
    * whatever else was inside the tag besides the opening symbol. For text tokens
    * this is the text itself.
    *
    * The third and fourth elements of the token are the start and end indices,
    * respectively, of the token in the original template.
    *
    * Tokens that are the root node of a subtree contain two more elements: 1) an
    * array of tokens in the subtree and 2) the index in the original template at
    * which the closing tag for that section begins.
    */
    function parseTemplate(template, tags) {
        if (!template)
            return [];

        var sections = [];     // Stack to hold section tokens
        var tokens = [];       // Buffer to hold the tokens
        var spaces = [];       // Indices of whitespace tokens on the current line
        var hasTag = false;    // Is there a {{ tag }} on the current line?
        var nonSpace = false;  // Is there a non-space char on the current line?

        // Strips all whitespace tokens array for the current line
        // if there was a {{#tag}} on it and otherwise only space.
        function stripSpace() {
            if (hasTag && !nonSpace) {
                while (spaces.length)
                    delete tokens[spaces.pop()];
            } else {
                spaces = [];
            }

            hasTag = false;
            nonSpace = false;
        }

        var openingTagRe, closingTagRe, closingCurlyRe;
        function compileTags(tagsToCompile) {
            if (typeof tagsToCompile === 'string')
                tagsToCompile = tagsToCompile.split(spaceRe, 2);

            if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
                throw new Error('Invalid tags: ' + tagsToCompile);

            openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
            closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
            closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
        }

        compileTags(tags || mustache.tags);

        var scanner = new Scanner(template);

        var start, type, value, chr, token, openSection;
        while (!scanner.eos()) {
            start = scanner.pos;

            // Match any text between tags.
            value = scanner.scanUntil(openingTagRe);

            if (value) {
                for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
                    chr = value.charAt(i);

                    if (isWhitespace(chr)) {
                        spaces.push(tokens.length);
                    } else {
                        nonSpace = true;
                    }

                    tokens.push(['text', chr, start, start + 1]);
                    start += 1;

                    // Check for whitespace on the current line.
                    if (chr === '\n')
                        stripSpace();
                }
            }

            // Match the opening tag.
            if (!scanner.scan(openingTagRe))
                break;

            hasTag = true;

            // Get the tag type.
            type = scanner.scan(tagRe) || 'name';
            scanner.scan(whiteRe);

            // Get the tag value.
            if (type === '=') {
                value = scanner.scanUntil(equalsRe);
                scanner.scan(equalsRe);
                scanner.scanUntil(closingTagRe);
            } else if (type === '{') {
                value = scanner.scanUntil(closingCurlyRe);
                scanner.scan(curlyRe);
                scanner.scanUntil(closingTagRe);
                type = '&';
            } else {
                value = scanner.scanUntil(closingTagRe);
            }

            // Match the closing tag.
            if (!scanner.scan(closingTagRe))
                throw new Error('Unclosed tag at ' + scanner.pos);

            token = [type, value, start, scanner.pos];
            tokens.push(token);

            if (type === '#' || type === '^') {
                sections.push(token);
            } else if (type === '/') {
                // Check section nesting.
                openSection = sections.pop();

                if (!openSection)
                    throw new Error('Unopened section "' + value + '" at ' + start);

                if (openSection[1] !== value)
                    throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
            } else if (type === 'name' || type === '{' || type === ' & ') {
                nonSpace = true;
            } else if (type === '=') {
                // Set the tags for the next time around.
                compileTags(value);
            }
        }

        // Make sure there are no open sections when we're done.
        openSection = sections.pop();

        if (openSection)
            throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

        return nestTokens(squashTokens(tokens));
    }

    /**
     * Combines the values of consecutive text tokens in the given `tokens` array
     * to a single token.
     */
    function squashTokens(tokens) {
        var squashedTokens = [];

        var token, lastToken;
        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            token = tokens[i];

            if (token) {
                if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
                    lastToken[1] += token[1];
                    lastToken[3] = token[3];
                } else {
                    squashedTokens.push(token);
                    lastToken = token;
                }
            }
        }

        return squashedTokens;
    }

    /**
     * Forms the given array of `tokens` into a nested tree structure where
     * tokens that represent a section have two additional items: 1) an array of
     * all tokens that appear in that section and 2) the index in the original
     * template that represents the end of that section.
     */
    function nestTokens(tokens) {
        var nestedTokens = [];
        var collector = nestedTokens;
        var sections = [];

        var token, section;
        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            token = tokens[i];

            switch (token[0]) {
                case '#':
                case '^':
                    collector.push(token);
                    sections.push(token);
                    collector = token[4] = [];
                    break;
                case '/':
                    section = sections.pop();
                    section[5] = token[2];
                    collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
                    break;
                default:
                    collector.push(token);
            }
        }

        return nestedTokens;
    }

    /**
     * A simple string scanner that is used by the template parser to find
     * tokens in template strings.
     */
    function Scanner(string) {
        this.string = string;
        this.tail = string;
        this.pos = 0;
    }

    /**
     * Returns `true` if the tail is empty (end of string).
     */
    Scanner.prototype.eos = function eos() {
        return this.tail === '';
    };

    /**
     * Tries to match the given regular expression at the current position.
     * Returns the matched text if it can match, the empty string otherwise.
     */
    Scanner.prototype.scan = function scan(re) {
        var match = this.tail.match(re);

        if (!match || match.index !== 0)
            return '';

        var string = match[0];

        this.tail = this.tail.substring(string.length);
        this.pos += string.length;

        return string;
    };

    /**
     * Skips all text until the given regular expression can be matched. Returns
     * the skipped string, which is the entire tail if no match can be made.
     */
    Scanner.prototype.scanUntil = function scanUntil(re) {
        var index = this.tail.search(re), match;

        switch (index) {
            case -1:
                match = this.tail;
                this.tail = '';
                break;
            case 0:
                match = '';
                break;
            default:
                match = this.tail.substring(0, index);
                this.tail = this.tail.substring(index);
        }

        this.pos += match.length;

        return match;
    };

    /**
     * Represents a rendering context by wrapping a view object and
     * maintaining a reference to the parent context.
     */
    function Context(view, parentContext) {
        this.view = view;
        this.cache = { '.': this.view };
        this.parent = parentContext;
    }

    /**
     * Creates a new context using the given view with this context
     * as the parent.
     */
    Context.prototype.push = function push(view) {
        return new Context(view, this);
    };

    /**
     * Returns the value of the given name in this context, traversing
     * up the context hierarchy if the value is absent in this context's view.
     */
    Context.prototype.lookup = function lookup(name) {
        var cache = this.cache;

        var value;
        if (cache.hasOwnProperty(name)) {
            value = cache[name];
        } else {
            var context = this, names, index, lookupHit = false;

            while (context) {
                if (name.indexOf('.') > 0) {
                    value = context.view;
                    names = name.split('.');
                    index = 0;

                    /**
                     * Using the dot notion path in `name`, we descend through the
                     * nested objects.
                     *
                     * To be certain that the lookup has been successful, we have to
                     * check if the last object in the path actually has the property
                     * we are looking for. We store the result in `lookupHit`.
                     *
                     * This is specially necessary for when the value has been set to
                     * `undefined` and we want to avoid looking up parent contexts.
                     **/
                    while (value != null && index < names.length) {
                        if (index === names.length - 1)
                            lookupHit = hasProperty(value, names[index]);

                        value = value[names[index++]];
                    }
                } else {
                    value = context.view[name];
                    lookupHit = hasProperty(context.view, name);
                }

                if (lookupHit)
                    break;

                context = context.parent;
            }

            cache[name] = value;
        }

        if (isFunction(value))
            value = value.call(this.view);

        return value;
    };

    /**
     * A Writer knows how to take a stream of tokens and render them to a
     * string, given a context. It also maintains a cache of templates to
     * avoid the need to parse the same template twice.
     */
    function Writer() {
        this.cache = {};
    }

    /**
     * Clears all cached templates in this writer.
     */
    Writer.prototype.clearCache = function clearCache() {
        this.cache = {};
    };

    /**
     * Parses and caches the given `template` and returns the array of tokens
     * that is generated from the parse.
     */
    Writer.prototype.parse = function parse(template, tags) {
        var cache = this.cache;
        var tokens = cache[template];

        if (tokens == null)
            tokens = cache[template] = parseTemplate(template, tags);

        return tokens;
    };

    /**
     * High-level method that is used to render the given `template` with
     * the given `view`.
     *
     * The optional `partials` argument may be an object that contains the
     * names and templates of partials that are used in the template. It may
     * also be a function that is used to load partial templates on the fly
     * that takes a single argument: the name of the partial.
     */
    Writer.prototype.render = function render(template, view, partials) {
        var tokens = this.parse(template);
        var context = (view instanceof Context) ? view : new Context(view);
        return this.renderTokens(tokens, context, partials, template);
    };

    /**
     * Low-level method that renders the given array of `tokens` using
     * the given `context` and `partials`.
     *
     * Note: The `originalTemplate` is only ever used to extract the portion
     * of the original template that was contained in a higher-order section.
     * If the template doesn't use higher-order sections, this argument may
     * be omitted.
     */
    Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate) {
        var buffer = '';

        var token, symbol, value;
        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            value = undefined;
            token = tokens[i];
            symbol = token[0];

            if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
            else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
            else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
            else if (symbol === '&') value = this.unescapedValue(token, context);
            else if (symbol === 'name') value = this.escapedValue(token, context);
            else if (symbol === 'text') value = this.rawValue(token);

            if (value !== undefined)
                buffer += value;
        }

        return buffer;
    };

    Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate) {
        var self = this;
        var buffer = '';
        var value = context.lookup(token[1]);

        // This function is used to render an arbitrary template
        // in the current context by higher-order sections.
        function subRender(template) {
            return self.render(template, context, partials);
        }

        if (!value) return;

        if (isArray(value)) {
            for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
                buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
            }
        } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
            buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
        } else if (isFunction(value)) {
            if (typeof originalTemplate !== 'string')
                throw new Error('Cannot use higher-order sections without the original template');

            // Extract the portion of the original template that the section contains.
            value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

            if (value != null)
                buffer += value;
        } else {
            buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }
        return buffer;
    };

    Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate) {
        var value = context.lookup(token[1]);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0))
            return this.renderTokens(token[4], context, partials, originalTemplate);
    };

    Writer.prototype.renderPartial = function renderPartial(token, context, partials) {
        if (!partials) return;

        var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
        if (value != null)
            return this.renderTokens(this.parse(value), context, partials, value);
    };

    Writer.prototype.unescapedValue = function unescapedValue(token, context) {
        var value = context.lookup(token[1]);
        if (value != null)
            return value;
    };

    Writer.prototype.escapedValue = function escapedValue(token, context) {
        var value = context.lookup(token[1]);
        if (value != null)
            return mustache.escape(value);
    };

    Writer.prototype.rawValue = function rawValue(token) {
        return token[1];
    };

    mustache.name = 'mustache.js';
    mustache.version = '2.3.0';
    mustache.tags = ['{{ ', '}}'];

    // All high-level mustache.* functions use this writer.
    var defaultWriter = new Writer();

    /**
     * Clears all cached templates in the default writer.
     */
    mustache.clearCache = function clearCache() {
        return defaultWriter.clearCache();
    };

    /**
     * Parses and caches the given template in the default writer and returns the
     * array of tokens it contains. Doing this ahead of time avoids the need to
     * parse templates on the fly as they are rendered.
     */
    mustache.parse = function parse(template, tags) {
        return defaultWriter.parse(template, tags);
    };

    /**
     * Renders the `template` with the given `view` and `partials` using the
     * default writer.
     */
    mustache.render = function render(template, view, partials) {
        if (typeof template !== 'string') {
            throw new TypeError('Invalid template! Template should be a "string" ' +
                'but "' + typeStr(template) + '" was given as the first ' +
                'argument for mustache#render(template, view, partials)');
        }

        return defaultWriter.render(template, view, partials);
    };

    // This is here for backwards compatibility with 0.4.x.,
    /*eslint-disable */ // eslint wants camel cased function name
    mustache.to_html = function to_html(template, view, partials, send) {
        /*eslint-enable*/

        var result = mustache.render(template, view, partials);

        if (isFunction(send)) {
            send(result);
        } else {
            return result;
        }
    };

    // Export the escaping function so that the user may override it.
    // See https://github.com/janl/mustache.js/issues/244
    mustache.escape = escapeHtml;

    // Export these mainly for testing, but also for advanced usage.
    mustache.Scanner = Scanner;
    mustache.Context = Context;
    mustache.Writer = Writer;

    return mustache;
}));

/// dffptch.js
!function (r) { var t = Object, f = t.keys, e = { diff: function o(r, e) { for (var a = f(r).sort(), i = f(e).sort(), n = {}, d = {}, s = {}, c = [], h = {}, u = 0, v = 0; a[u] || i[v];) { var l = a[u], m = String.fromCharCode(u + 48), p = i[v], C = r[l], b = e[p]; if (l == p) { if (t(C) === C && t(b) === b) { var g = o(C, b); f(g)[0] && (h[m] = g) } else C !== b && (s[m] = b); u++ , v++ } else l > p || !l ? (d[p] = b, v++) : (c.push(m), u++) } return c[0] && (n.d = c), f(d)[0] && (n.a = d), f(s)[0] && (n.m = s), f(h)[0] && (n.r = h), n }, patch: function a(r, t) { var e, o, i, n, d = f(r).sort(); for (e in t) for (o in t[e]) i = t[e][o], n = d[("d" != e ? o : i).charCodeAt() - 48], "a" == e ? r[o] = i : "m" == e ? r[n] = i : "d" == e ? delete r[n] : a(r[n], i) } }; r.dffptch = e }(this);


////////////////////////////////////////////////////////////////
//SMOOTH SCROLLING TO ANCHOR
///////////////////////////////////////////////////////////////

$(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});