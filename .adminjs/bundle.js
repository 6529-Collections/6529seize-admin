(function (React, styled, designSystem) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method,
        method = delegate.iterator[methodName];
      if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var axios$3 = {exports: {}};

  var axios$2 = {exports: {}};

  var bind$2 = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };

  var bind$1 = bind$2;

  // utils is a library of generic helper functions non-specific to axios

  var toString = Object.prototype.toString;

  // eslint-disable-next-line func-names
  var kindOf = (function(cache) {
    // eslint-disable-next-line func-names
    return function(thing) {
      var str = toString.call(thing);
      return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    };
  })(Object.create(null));

  function kindOfTest(type) {
    type = type.toLowerCase();
    return function isKindOf(thing) {
      return kindOf(thing) === type;
    };
  }

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */
  function isArray(val) {
    return Array.isArray(val);
  }

  /**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  function isUndefined(val) {
    return typeof val === 'undefined';
  }

  /**
   * Determine if a value is a Buffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
      && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  var isArrayBuffer = kindOfTest('ArrayBuffer');


  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    var result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
      result = ArrayBuffer.isView(val);
    } else {
      result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */
  function isString(val) {
    return typeof val === 'string';
  }

  /**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */
  function isNumber(val) {
    return typeof val === 'number';
  }

  /**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
  function isObject(val) {
    return val !== null && typeof val === 'object';
  }

  /**
   * Determine if a value is a plain Object
   *
   * @param {Object} val The value to test
   * @return {boolean} True if value is a plain Object, otherwise false
   */
  function isPlainObject(val) {
    if (kindOf(val) !== 'object') {
      return false;
    }

    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
  }

  /**
   * Determine if a value is a Date
   *
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
  var isDate = kindOfTest('Date');

  /**
   * Determine if a value is a File
   *
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
  var isFile = kindOfTest('File');

  /**
   * Determine if a value is a Blob
   *
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  var isBlob = kindOfTest('Blob');

  /**
   * Determine if a value is a FileList
   *
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
  var isFileList = kindOfTest('FileList');

  /**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  function isFunction(val) {
    return toString.call(val) === '[object Function]';
  }

  /**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }

  /**
   * Determine if a value is a FormData
   *
   * @param {Object} thing The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  function isFormData(thing) {
    var pattern = '[object FormData]';
    return thing && (
      (typeof FormData === 'function' && thing instanceof FormData) ||
      toString.call(thing) === pattern ||
      (isFunction(thing.toString) && thing.toString() === pattern)
    );
  }

  /**
   * Determine if a value is a URLSearchParams object
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  var isURLSearchParams = kindOfTest('URLSearchParams');

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */
  function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
  }

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   */
  function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                             navigator.product === 'NativeScript' ||
                                             navigator.product === 'NS')) {
      return false;
    }
    return (
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    );
  }

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
  function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
  function merge(/* obj1, obj2, obj3, ... */) {
    var result = {};
    function assignValue(val, key) {
      if (isPlainObject(result[key]) && isPlainObject(val)) {
        result[key] = merge(result[key], val);
      } else if (isPlainObject(val)) {
        result[key] = merge({}, val);
      } else if (isArray(val)) {
        result[key] = val.slice();
      } else {
        result[key] = val;
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */
  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === 'function') {
        a[key] = bind$1(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }

  /**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   * @return {string} content value without BOM
   */
  function stripBOM(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  }

  /**
   * Inherit the prototype methods from one constructor into another
   * @param {function} constructor
   * @param {function} superConstructor
   * @param {object} [props]
   * @param {object} [descriptors]
   */

  function inherits(constructor, superConstructor, props, descriptors) {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    constructor.prototype.constructor = constructor;
    props && Object.assign(constructor.prototype, props);
  }

  /**
   * Resolve object with deep prototype chain to a flat object
   * @param {Object} sourceObj source object
   * @param {Object} [destObj]
   * @param {Function} [filter]
   * @returns {Object}
   */

  function toFlatObject(sourceObj, destObj, filter) {
    var props;
    var i;
    var prop;
    var merged = {};

    destObj = destObj || {};

    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if (!merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = Object.getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

    return destObj;
  }

  /*
   * determines whether a string ends with the characters of a specified string
   * @param {String} str
   * @param {String} searchString
   * @param {Number} [position= 0]
   * @returns {boolean}
   */
  function endsWith(str, searchString, position) {
    str = String(str);
    if (position === undefined || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    var lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  }


  /**
   * Returns new array from array like object
   * @param {*} [thing]
   * @returns {Array}
   */
  function toArray(thing) {
    if (!thing) return null;
    var i = thing.length;
    if (isUndefined(i)) return null;
    var arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  }

  // eslint-disable-next-line func-names
  var isTypedArray = (function(TypedArray) {
    // eslint-disable-next-line func-names
    return function(thing) {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array));

  var utils$9 = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    extend: extend,
    trim: trim,
    stripBOM: stripBOM,
    inherits: inherits,
    toFlatObject: toFlatObject,
    kindOf: kindOf,
    kindOfTest: kindOfTest,
    endsWith: endsWith,
    toArray: toArray,
    isTypedArray: isTypedArray,
    isFileList: isFileList
  };

  var utils$8 = utils$9;

  function encode(val) {
    return encodeURIComponent(val).
      replace(/%3A/gi, ':').
      replace(/%24/g, '$').
      replace(/%2C/gi, ',').
      replace(/%20/g, '+').
      replace(/%5B/gi, '[').
      replace(/%5D/gi, ']');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
  var buildURL$1 = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }

    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils$8.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];

      utils$8.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === 'undefined') {
          return;
        }

        if (utils$8.isArray(val)) {
          key = key + '[]';
        } else {
          val = [val];
        }

        utils$8.forEach(val, function parseValue(v) {
          if (utils$8.isDate(v)) {
            v = v.toISOString();
          } else if (utils$8.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode(key) + '=' + encode(v));
        });
      });

      serializedParams = parts.join('&');
    }

    if (serializedParams) {
      var hashmarkIndex = url.indexOf('#');
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }

      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
  };

  var utils$7 = utils$9;

  function InterceptorManager$1() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  };

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */
  InterceptorManager$1.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   */
  InterceptorManager$1.prototype.forEach = function forEach(fn) {
    utils$7.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };

  var InterceptorManager_1 = InterceptorManager$1;

  var utils$6 = utils$9;

  var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
    utils$6.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };

  var AxiosError_1;
  var hasRequiredAxiosError;

  function requireAxiosError () {
  	if (hasRequiredAxiosError) return AxiosError_1;
  	hasRequiredAxiosError = 1;

  	var utils = utils$9;

  	/**
  	 * Create an Error with the specified message, config, error code, request and response.
  	 *
  	 * @param {string} message The error message.
  	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
  	 * @param {Object} [config] The config.
  	 * @param {Object} [request] The request.
  	 * @param {Object} [response] The response.
  	 * @returns {Error} The created error.
  	 */
  	function AxiosError(message, code, config, request, response) {
  	  Error.call(this);
  	  this.message = message;
  	  this.name = 'AxiosError';
  	  code && (this.code = code);
  	  config && (this.config = config);
  	  request && (this.request = request);
  	  response && (this.response = response);
  	}

  	utils.inherits(AxiosError, Error, {
  	  toJSON: function toJSON() {
  	    return {
  	      // Standard
  	      message: this.message,
  	      name: this.name,
  	      // Microsoft
  	      description: this.description,
  	      number: this.number,
  	      // Mozilla
  	      fileName: this.fileName,
  	      lineNumber: this.lineNumber,
  	      columnNumber: this.columnNumber,
  	      stack: this.stack,
  	      // Axios
  	      config: this.config,
  	      code: this.code,
  	      status: this.response && this.response.status ? this.response.status : null
  	    };
  	  }
  	});

  	var prototype = AxiosError.prototype;
  	var descriptors = {};

  	[
  	  'ERR_BAD_OPTION_VALUE',
  	  'ERR_BAD_OPTION',
  	  'ECONNABORTED',
  	  'ETIMEDOUT',
  	  'ERR_NETWORK',
  	  'ERR_FR_TOO_MANY_REDIRECTS',
  	  'ERR_DEPRECATED',
  	  'ERR_BAD_RESPONSE',
  	  'ERR_BAD_REQUEST',
  	  'ERR_CANCELED'
  	// eslint-disable-next-line func-names
  	].forEach(function(code) {
  	  descriptors[code] = {value: code};
  	});

  	Object.defineProperties(AxiosError, descriptors);
  	Object.defineProperty(prototype, 'isAxiosError', {value: true});

  	// eslint-disable-next-line func-names
  	AxiosError.from = function(error, code, config, request, response, customProps) {
  	  var axiosError = Object.create(prototype);

  	  utils.toFlatObject(error, axiosError, function filter(obj) {
  	    return obj !== Error.prototype;
  	  });

  	  AxiosError.call(axiosError, error.message, code, config, request, response);

  	  axiosError.name = error.name;

  	  customProps && Object.assign(axiosError, customProps);

  	  return axiosError;
  	};

  	AxiosError_1 = AxiosError;
  	return AxiosError_1;
  }

  var transitional = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };

  var toFormData_1;
  var hasRequiredToFormData;

  function requireToFormData () {
  	if (hasRequiredToFormData) return toFormData_1;
  	hasRequiredToFormData = 1;

  	var utils = utils$9;

  	/**
  	 * Convert a data object to FormData
  	 * @param {Object} obj
  	 * @param {?Object} [formData]
  	 * @returns {Object}
  	 **/

  	function toFormData(obj, formData) {
  	  // eslint-disable-next-line no-param-reassign
  	  formData = formData || new FormData();

  	  var stack = [];

  	  function convertValue(value) {
  	    if (value === null) return '';

  	    if (utils.isDate(value)) {
  	      return value.toISOString();
  	    }

  	    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
  	      return typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
  	    }

  	    return value;
  	  }

  	  function build(data, parentKey) {
  	    if (utils.isPlainObject(data) || utils.isArray(data)) {
  	      if (stack.indexOf(data) !== -1) {
  	        throw Error('Circular reference detected in ' + parentKey);
  	      }

  	      stack.push(data);

  	      utils.forEach(data, function each(value, key) {
  	        if (utils.isUndefined(value)) return;
  	        var fullKey = parentKey ? parentKey + '.' + key : key;
  	        var arr;

  	        if (value && !parentKey && typeof value === 'object') {
  	          if (utils.endsWith(key, '{}')) {
  	            // eslint-disable-next-line no-param-reassign
  	            value = JSON.stringify(value);
  	          } else if (utils.endsWith(key, '[]') && (arr = utils.toArray(value))) {
  	            // eslint-disable-next-line func-names
  	            arr.forEach(function(el) {
  	              !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
  	            });
  	            return;
  	          }
  	        }

  	        build(value, fullKey);
  	      });

  	      stack.pop();
  	    } else {
  	      formData.append(parentKey, convertValue(data));
  	    }
  	  }

  	  build(obj);

  	  return formData;
  	}

  	toFormData_1 = toFormData;
  	return toFormData_1;
  }

  var settle;
  var hasRequiredSettle;

  function requireSettle () {
  	if (hasRequiredSettle) return settle;
  	hasRequiredSettle = 1;

  	var AxiosError = requireAxiosError();

  	/**
  	 * Resolve or reject a Promise based on response status.
  	 *
  	 * @param {Function} resolve A function that resolves the promise.
  	 * @param {Function} reject A function that rejects the promise.
  	 * @param {object} response The response.
  	 */
  	settle = function settle(resolve, reject, response) {
  	  var validateStatus = response.config.validateStatus;
  	  if (!response.status || !validateStatus || validateStatus(response.status)) {
  	    resolve(response);
  	  } else {
  	    reject(new AxiosError(
  	      'Request failed with status code ' + response.status,
  	      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
  	      response.config,
  	      response.request,
  	      response
  	    ));
  	  }
  	};
  	return settle;
  }

  var cookies;
  var hasRequiredCookies;

  function requireCookies () {
  	if (hasRequiredCookies) return cookies;
  	hasRequiredCookies = 1;

  	var utils = utils$9;

  	cookies = (
  	  utils.isStandardBrowserEnv() ?

  	  // Standard browser envs support document.cookie
  	    (function standardBrowserEnv() {
  	      return {
  	        write: function write(name, value, expires, path, domain, secure) {
  	          var cookie = [];
  	          cookie.push(name + '=' + encodeURIComponent(value));

  	          if (utils.isNumber(expires)) {
  	            cookie.push('expires=' + new Date(expires).toGMTString());
  	          }

  	          if (utils.isString(path)) {
  	            cookie.push('path=' + path);
  	          }

  	          if (utils.isString(domain)) {
  	            cookie.push('domain=' + domain);
  	          }

  	          if (secure === true) {
  	            cookie.push('secure');
  	          }

  	          document.cookie = cookie.join('; ');
  	        },

  	        read: function read(name) {
  	          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  	          return (match ? decodeURIComponent(match[3]) : null);
  	        },

  	        remove: function remove(name) {
  	          this.write(name, '', Date.now() - 86400000);
  	        }
  	      };
  	    })() :

  	  // Non standard browser env (web workers, react-native) lack needed support.
  	    (function nonStandardBrowserEnv() {
  	      return {
  	        write: function write() {},
  	        read: function read() { return null; },
  	        remove: function remove() {}
  	      };
  	    })()
  	);
  	return cookies;
  }

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  var isAbsoluteURL$1 = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  };

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   * @returns {string} The combined URL
   */
  var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
  };

  var isAbsoluteURL = isAbsoluteURL$1;
  var combineURLs = combineURLs$1;

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   * @returns {string} The combined full path
   */
  var buildFullPath$1 = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  };

  var parseHeaders;
  var hasRequiredParseHeaders;

  function requireParseHeaders () {
  	if (hasRequiredParseHeaders) return parseHeaders;
  	hasRequiredParseHeaders = 1;

  	var utils = utils$9;

  	// Headers whose duplicates are ignored by node
  	// c.f. https://nodejs.org/api/http.html#http_message_headers
  	var ignoreDuplicateOf = [
  	  'age', 'authorization', 'content-length', 'content-type', 'etag',
  	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  	  'referer', 'retry-after', 'user-agent'
  	];

  	/**
  	 * Parse headers into an object
  	 *
  	 * ```
  	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
  	 * Content-Type: application/json
  	 * Connection: keep-alive
  	 * Transfer-Encoding: chunked
  	 * ```
  	 *
  	 * @param {String} headers Headers needing to be parsed
  	 * @returns {Object} Headers parsed into an object
  	 */
  	parseHeaders = function parseHeaders(headers) {
  	  var parsed = {};
  	  var key;
  	  var val;
  	  var i;

  	  if (!headers) { return parsed; }

  	  utils.forEach(headers.split('\n'), function parser(line) {
  	    i = line.indexOf(':');
  	    key = utils.trim(line.substr(0, i)).toLowerCase();
  	    val = utils.trim(line.substr(i + 1));

  	    if (key) {
  	      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
  	        return;
  	      }
  	      if (key === 'set-cookie') {
  	        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
  	      } else {
  	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
  	      }
  	    }
  	  });

  	  return parsed;
  	};
  	return parseHeaders;
  }

  var isURLSameOrigin;
  var hasRequiredIsURLSameOrigin;

  function requireIsURLSameOrigin () {
  	if (hasRequiredIsURLSameOrigin) return isURLSameOrigin;
  	hasRequiredIsURLSameOrigin = 1;

  	var utils = utils$9;

  	isURLSameOrigin = (
  	  utils.isStandardBrowserEnv() ?

  	  // Standard browser envs have full support of the APIs needed to test
  	  // whether the request URL is of the same origin as current location.
  	    (function standardBrowserEnv() {
  	      var msie = /(msie|trident)/i.test(navigator.userAgent);
  	      var urlParsingNode = document.createElement('a');
  	      var originURL;

  	      /**
  	    * Parse a URL to discover it's components
  	    *
  	    * @param {String} url The URL to be parsed
  	    * @returns {Object}
  	    */
  	      function resolveURL(url) {
  	        var href = url;

  	        if (msie) {
  	        // IE needs attribute set twice to normalize properties
  	          urlParsingNode.setAttribute('href', href);
  	          href = urlParsingNode.href;
  	        }

  	        urlParsingNode.setAttribute('href', href);

  	        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
  	        return {
  	          href: urlParsingNode.href,
  	          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
  	          host: urlParsingNode.host,
  	          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
  	          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
  	          hostname: urlParsingNode.hostname,
  	          port: urlParsingNode.port,
  	          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
  	            urlParsingNode.pathname :
  	            '/' + urlParsingNode.pathname
  	        };
  	      }

  	      originURL = resolveURL(window.location.href);

  	      /**
  	    * Determine if a URL shares the same origin as the current location
  	    *
  	    * @param {String} requestURL The URL to test
  	    * @returns {boolean} True if URL shares the same origin, otherwise false
  	    */
  	      return function isURLSameOrigin(requestURL) {
  	        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
  	        return (parsed.protocol === originURL.protocol &&
  	            parsed.host === originURL.host);
  	      };
  	    })() :

  	  // Non standard browser envs (web workers, react-native) lack needed support.
  	    (function nonStandardBrowserEnv() {
  	      return function isURLSameOrigin() {
  	        return true;
  	      };
  	    })()
  	);
  	return isURLSameOrigin;
  }

  var CanceledError_1;
  var hasRequiredCanceledError;

  function requireCanceledError () {
  	if (hasRequiredCanceledError) return CanceledError_1;
  	hasRequiredCanceledError = 1;

  	var AxiosError = requireAxiosError();
  	var utils = utils$9;

  	/**
  	 * A `CanceledError` is an object that is thrown when an operation is canceled.
  	 *
  	 * @class
  	 * @param {string=} message The message.
  	 */
  	function CanceledError(message) {
  	  // eslint-disable-next-line no-eq-null,eqeqeq
  	  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED);
  	  this.name = 'CanceledError';
  	}

  	utils.inherits(CanceledError, AxiosError, {
  	  __CANCEL__: true
  	});

  	CanceledError_1 = CanceledError;
  	return CanceledError_1;
  }

  var parseProtocol;
  var hasRequiredParseProtocol;

  function requireParseProtocol () {
  	if (hasRequiredParseProtocol) return parseProtocol;
  	hasRequiredParseProtocol = 1;

  	parseProtocol = function parseProtocol(url) {
  	  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  	  return match && match[1] || '';
  	};
  	return parseProtocol;
  }

  var xhr;
  var hasRequiredXhr;

  function requireXhr () {
  	if (hasRequiredXhr) return xhr;
  	hasRequiredXhr = 1;

  	var utils = utils$9;
  	var settle = requireSettle();
  	var cookies = requireCookies();
  	var buildURL = buildURL$1;
  	var buildFullPath = buildFullPath$1;
  	var parseHeaders = requireParseHeaders();
  	var isURLSameOrigin = requireIsURLSameOrigin();
  	var transitionalDefaults = transitional;
  	var AxiosError = requireAxiosError();
  	var CanceledError = requireCanceledError();
  	var parseProtocol = requireParseProtocol();

  	xhr = function xhrAdapter(config) {
  	  return new Promise(function dispatchXhrRequest(resolve, reject) {
  	    var requestData = config.data;
  	    var requestHeaders = config.headers;
  	    var responseType = config.responseType;
  	    var onCanceled;
  	    function done() {
  	      if (config.cancelToken) {
  	        config.cancelToken.unsubscribe(onCanceled);
  	      }

  	      if (config.signal) {
  	        config.signal.removeEventListener('abort', onCanceled);
  	      }
  	    }

  	    if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
  	      delete requestHeaders['Content-Type']; // Let the browser set it
  	    }

  	    var request = new XMLHttpRequest();

  	    // HTTP basic authentication
  	    if (config.auth) {
  	      var username = config.auth.username || '';
  	      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
  	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
  	    }

  	    var fullPath = buildFullPath(config.baseURL, config.url);

  	    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

  	    // Set the request timeout in MS
  	    request.timeout = config.timeout;

  	    function onloadend() {
  	      if (!request) {
  	        return;
  	      }
  	      // Prepare the response
  	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
  	      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
  	        request.responseText : request.response;
  	      var response = {
  	        data: responseData,
  	        status: request.status,
  	        statusText: request.statusText,
  	        headers: responseHeaders,
  	        config: config,
  	        request: request
  	      };

  	      settle(function _resolve(value) {
  	        resolve(value);
  	        done();
  	      }, function _reject(err) {
  	        reject(err);
  	        done();
  	      }, response);

  	      // Clean up request
  	      request = null;
  	    }

  	    if ('onloadend' in request) {
  	      // Use onloadend if available
  	      request.onloadend = onloadend;
  	    } else {
  	      // Listen for ready state to emulate onloadend
  	      request.onreadystatechange = function handleLoad() {
  	        if (!request || request.readyState !== 4) {
  	          return;
  	        }

  	        // The request errored out and we didn't get a response, this will be
  	        // handled by onerror instead
  	        // With one exception: request that using file: protocol, most browsers
  	        // will return status as 0 even though it's a successful request
  	        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
  	          return;
  	        }
  	        // readystate handler is calling before onerror or ontimeout handlers,
  	        // so we should call onloadend on the next 'tick'
  	        setTimeout(onloadend);
  	      };
  	    }

  	    // Handle browser request cancellation (as opposed to a manual cancellation)
  	    request.onabort = function handleAbort() {
  	      if (!request) {
  	        return;
  	      }

  	      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

  	      // Clean up request
  	      request = null;
  	    };

  	    // Handle low level network errors
  	    request.onerror = function handleError() {
  	      // Real errors are hidden from us by the browser
  	      // onerror should only fire if it's a network error
  	      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request, request));

  	      // Clean up request
  	      request = null;
  	    };

  	    // Handle timeout
  	    request.ontimeout = function handleTimeout() {
  	      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
  	      var transitional = config.transitional || transitionalDefaults;
  	      if (config.timeoutErrorMessage) {
  	        timeoutErrorMessage = config.timeoutErrorMessage;
  	      }
  	      reject(new AxiosError(
  	        timeoutErrorMessage,
  	        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
  	        config,
  	        request));

  	      // Clean up request
  	      request = null;
  	    };

  	    // Add xsrf header
  	    // This is only done if running in a standard browser environment.
  	    // Specifically not if we're in a web worker, or react-native.
  	    if (utils.isStandardBrowserEnv()) {
  	      // Add xsrf header
  	      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
  	        cookies.read(config.xsrfCookieName) :
  	        undefined;

  	      if (xsrfValue) {
  	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
  	      }
  	    }

  	    // Add headers to the request
  	    if ('setRequestHeader' in request) {
  	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
  	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
  	          // Remove Content-Type if data is undefined
  	          delete requestHeaders[key];
  	        } else {
  	          // Otherwise add header to the request
  	          request.setRequestHeader(key, val);
  	        }
  	      });
  	    }

  	    // Add withCredentials to request if needed
  	    if (!utils.isUndefined(config.withCredentials)) {
  	      request.withCredentials = !!config.withCredentials;
  	    }

  	    // Add responseType to request if needed
  	    if (responseType && responseType !== 'json') {
  	      request.responseType = config.responseType;
  	    }

  	    // Handle progress if needed
  	    if (typeof config.onDownloadProgress === 'function') {
  	      request.addEventListener('progress', config.onDownloadProgress);
  	    }

  	    // Not all browsers support upload events
  	    if (typeof config.onUploadProgress === 'function' && request.upload) {
  	      request.upload.addEventListener('progress', config.onUploadProgress);
  	    }

  	    if (config.cancelToken || config.signal) {
  	      // Handle cancellation
  	      // eslint-disable-next-line func-names
  	      onCanceled = function(cancel) {
  	        if (!request) {
  	          return;
  	        }
  	        reject(!cancel || (cancel && cancel.type) ? new CanceledError() : cancel);
  	        request.abort();
  	        request = null;
  	      };

  	      config.cancelToken && config.cancelToken.subscribe(onCanceled);
  	      if (config.signal) {
  	        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
  	      }
  	    }

  	    if (!requestData) {
  	      requestData = null;
  	    }

  	    var protocol = parseProtocol(fullPath);

  	    if (protocol && [ 'http', 'https', 'file' ].indexOf(protocol) === -1) {
  	      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
  	      return;
  	    }


  	    // Send the request
  	    request.send(requestData);
  	  });
  	};
  	return xhr;
  }

  var _null;
  var hasRequired_null;

  function require_null () {
  	if (hasRequired_null) return _null;
  	hasRequired_null = 1;
  	// eslint-disable-next-line strict
  	_null = null;
  	return _null;
  }

  var utils$5 = utils$9;
  var normalizeHeaderName = normalizeHeaderName$1;
  var AxiosError$1 = requireAxiosError();
  var transitionalDefaults = transitional;
  var toFormData = requireToFormData();

  var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  function setContentTypeIfUnset(headers, value) {
    if (!utils$5.isUndefined(headers) && utils$5.isUndefined(headers['Content-Type'])) {
      headers['Content-Type'] = value;
    }
  }

  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
      // For browsers use XHR adapter
      adapter = requireXhr();
    } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
      // For node use HTTP adapter
      adapter = requireXhr();
    }
    return adapter;
  }

  function stringifySafely(rawValue, parser, encoder) {
    if (utils$5.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$5.trim(rawValue);
      } catch (e) {
        if (e.name !== 'SyntaxError') {
          throw e;
        }
      }
    }

    return (encoder || JSON.stringify)(rawValue);
  }

  var defaults$3 = {

    transitional: transitionalDefaults,

    adapter: getDefaultAdapter(),

    transformRequest: [function transformRequest(data, headers) {
      normalizeHeaderName(headers, 'Accept');
      normalizeHeaderName(headers, 'Content-Type');

      if (utils$5.isFormData(data) ||
        utils$5.isArrayBuffer(data) ||
        utils$5.isBuffer(data) ||
        utils$5.isStream(data) ||
        utils$5.isFile(data) ||
        utils$5.isBlob(data)
      ) {
        return data;
      }
      if (utils$5.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$5.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
        return data.toString();
      }

      var isObjectPayload = utils$5.isObject(data);
      var contentType = headers && headers['Content-Type'];

      var isFileList;

      if ((isFileList = utils$5.isFileList(data)) || (isObjectPayload && contentType === 'multipart/form-data')) {
        var _FormData = this.env && this.env.FormData;
        return toFormData(isFileList ? {'files[]': data} : data, _FormData && new _FormData());
      } else if (isObjectPayload || contentType === 'application/json') {
        setContentTypeIfUnset(headers, 'application/json');
        return stringifySafely(data);
      }

      return data;
    }],

    transformResponse: [function transformResponse(data) {
      var transitional = this.transitional || defaults$3.transitional;
      var silentJSONParsing = transitional && transitional.silentJSONParsing;
      var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

      if (strictJSONParsing || (forcedJSONParsing && utils$5.isString(data) && data.length)) {
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === 'SyntaxError') {
              throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }

      return data;
    }],

    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,

    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    maxContentLength: -1,
    maxBodyLength: -1,

    env: {
      FormData: require_null()
    },

    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },

    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*'
      }
    }
  };

  utils$5.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    defaults$3.headers[method] = {};
  });

  utils$5.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    defaults$3.headers[method] = utils$5.merge(DEFAULT_CONTENT_TYPE);
  });

  var defaults_1 = defaults$3;

  var utils$4 = utils$9;
  var defaults$2 = defaults_1;

  /**
   * Transform the data for a request or a response
   *
   * @param {Object|String} data The data to be transformed
   * @param {Array} headers The headers for the request or response
   * @param {Array|Function} fns A single function or Array of functions
   * @returns {*} The resulting transformed data
   */
  var transformData$1 = function transformData(data, headers, fns) {
    var context = this || defaults$2;
    /*eslint no-param-reassign:0*/
    utils$4.forEach(fns, function transform(fn) {
      data = fn.call(context, data, headers);
    });

    return data;
  };

  var isCancel$1;
  var hasRequiredIsCancel;

  function requireIsCancel () {
  	if (hasRequiredIsCancel) return isCancel$1;
  	hasRequiredIsCancel = 1;

  	isCancel$1 = function isCancel(value) {
  	  return !!(value && value.__CANCEL__);
  	};
  	return isCancel$1;
  }

  var utils$3 = utils$9;
  var transformData = transformData$1;
  var isCancel = requireIsCancel();
  var defaults$1 = defaults_1;
  var CanceledError = requireCanceledError();

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }

    if (config.signal && config.signal.aborted) {
      throw new CanceledError();
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */
  var dispatchRequest$1 = function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    // Ensure headers exist
    config.headers = config.headers || {};

    // Transform request data
    config.data = transformData.call(
      config,
      config.data,
      config.headers,
      config.transformRequest
    );

    // Flatten headers
    config.headers = utils$3.merge(
      config.headers.common || {},
      config.headers[config.method] || {},
      config.headers
    );

    utils$3.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      function cleanHeaderConfig(method) {
        delete config.headers[method];
      }
    );

    var adapter = config.adapter || defaults$1.adapter;

    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData.call(
        config,
        response.data,
        response.headers,
        config.transformResponse
      );

      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            reason.response.data,
            reason.response.headers,
            config.transformResponse
          );
        }
      }

      return Promise.reject(reason);
    });
  };

  var utils$2 = utils$9;

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   * @returns {Object} New object resulting from merging config2 to config1
   */
  var mergeConfig$2 = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    var config = {};

    function getMergedValue(target, source) {
      if (utils$2.isPlainObject(target) && utils$2.isPlainObject(source)) {
        return utils$2.merge(target, source);
      } else if (utils$2.isPlainObject(source)) {
        return utils$2.merge({}, source);
      } else if (utils$2.isArray(source)) {
        return source.slice();
      }
      return source;
    }

    // eslint-disable-next-line consistent-return
    function mergeDeepProperties(prop) {
      if (!utils$2.isUndefined(config2[prop])) {
        return getMergedValue(config1[prop], config2[prop]);
      } else if (!utils$2.isUndefined(config1[prop])) {
        return getMergedValue(undefined, config1[prop]);
      }
    }

    // eslint-disable-next-line consistent-return
    function valueFromConfig2(prop) {
      if (!utils$2.isUndefined(config2[prop])) {
        return getMergedValue(undefined, config2[prop]);
      }
    }

    // eslint-disable-next-line consistent-return
    function defaultToConfig2(prop) {
      if (!utils$2.isUndefined(config2[prop])) {
        return getMergedValue(undefined, config2[prop]);
      } else if (!utils$2.isUndefined(config1[prop])) {
        return getMergedValue(undefined, config1[prop]);
      }
    }

    // eslint-disable-next-line consistent-return
    function mergeDirectKeys(prop) {
      if (prop in config2) {
        return getMergedValue(config1[prop], config2[prop]);
      } else if (prop in config1) {
        return getMergedValue(undefined, config1[prop]);
      }
    }

    var mergeMap = {
      'url': valueFromConfig2,
      'method': valueFromConfig2,
      'data': valueFromConfig2,
      'baseURL': defaultToConfig2,
      'transformRequest': defaultToConfig2,
      'transformResponse': defaultToConfig2,
      'paramsSerializer': defaultToConfig2,
      'timeout': defaultToConfig2,
      'timeoutMessage': defaultToConfig2,
      'withCredentials': defaultToConfig2,
      'adapter': defaultToConfig2,
      'responseType': defaultToConfig2,
      'xsrfCookieName': defaultToConfig2,
      'xsrfHeaderName': defaultToConfig2,
      'onUploadProgress': defaultToConfig2,
      'onDownloadProgress': defaultToConfig2,
      'decompress': defaultToConfig2,
      'maxContentLength': defaultToConfig2,
      'maxBodyLength': defaultToConfig2,
      'beforeRedirect': defaultToConfig2,
      'transport': defaultToConfig2,
      'httpAgent': defaultToConfig2,
      'httpsAgent': defaultToConfig2,
      'cancelToken': defaultToConfig2,
      'socketPath': defaultToConfig2,
      'responseEncoding': defaultToConfig2,
      'validateStatus': mergeDirectKeys
    };

    utils$2.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
      var merge = mergeMap[prop] || mergeDeepProperties;
      var configValue = merge(prop);
      (utils$2.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
    });

    return config;
  };

  var data;
  var hasRequiredData;

  function requireData () {
  	if (hasRequiredData) return data;
  	hasRequiredData = 1;
  	data = {
  	  "version": "0.27.2"
  	};
  	return data;
  }

  var VERSION = requireData().version;
  var AxiosError = requireAxiosError();

  var validators$1 = {};

  // eslint-disable-next-line func-names
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
    validators$1[type] = function validator(thing) {
      return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
  });

  var deprecatedWarnings = {};

  /**
   * Transitional option validator
   * @param {function|boolean?} validator - set to false if the transitional option has been removed
   * @param {string?} version - deprecated version / removed since version
   * @param {string?} message - some message with additional info
   * @returns {function}
   */
  validators$1.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
      return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
    }

    // eslint-disable-next-line func-names
    return function(value, opt, opts) {
      if (validator === false) {
        throw new AxiosError(
          formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
          AxiosError.ERR_DEPRECATED
        );
      }

      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        // eslint-disable-next-line no-console
        console.warn(
          formatMessage(
            opt,
            ' has been deprecated since v' + version + ' and will be removed in the near future'
          )
        );
      }

      return validator ? validator(value, opt, opts) : true;
    };
  };

  /**
   * Assert object's properties type
   * @param {object} options
   * @param {object} schema
   * @param {boolean?} allowUnknown
   */

  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object') {
      throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
    }
    var keys = Object.keys(options);
    var i = keys.length;
    while (i-- > 0) {
      var opt = keys[i];
      var validator = schema[opt];
      if (validator) {
        var value = options[opt];
        var result = value === undefined || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
      }
    }
  }

  var validator$1 = {
    assertOptions: assertOptions,
    validators: validators$1
  };

  var utils$1 = utils$9;
  var buildURL = buildURL$1;
  var InterceptorManager = InterceptorManager_1;
  var dispatchRequest = dispatchRequest$1;
  var mergeConfig$1 = mergeConfig$2;
  var buildFullPath = buildFullPath$1;
  var validator = validator$1;

  var validators = validator.validators;
  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   */
  function Axios$1(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */
  Axios$1.prototype.request = function request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig$1(this.defaults, config);

    // Set config.method
    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = 'get';
    }

    var transitional = config.transitional;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    // filter out skipped interceptors
    var requestInterceptorChain = [];
    var synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    var responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    var promise;

    if (!synchronousRequestInterceptors) {
      var chain = [dispatchRequest, undefined];

      Array.prototype.unshift.apply(chain, requestInterceptorChain);
      chain = chain.concat(responseInterceptorChain);

      promise = Promise.resolve(config);
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    }


    var newConfig = config;
    while (requestInterceptorChain.length) {
      var onFulfilled = requestInterceptorChain.shift();
      var onRejected = requestInterceptorChain.shift();
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected(error);
        break;
      }
    }

    try {
      promise = dispatchRequest(newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    while (responseInterceptorChain.length) {
      promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
    }

    return promise;
  };

  Axios$1.prototype.getUri = function getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    var fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  };

  // Provide aliases for supported request methods
  utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios$1.prototype[method] = function(url, config) {
      return this.request(mergeConfig$1(config || {}, {
        method: method,
        url: url,
        data: (config || {}).data
      }));
    };
  });

  utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/

    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig$1(config || {}, {
          method: method,
          headers: isForm ? {
            'Content-Type': 'multipart/form-data'
          } : {},
          url: url,
          data: data
        }));
      };
    }

    Axios$1.prototype[method] = generateHTTPMethod();

    Axios$1.prototype[method + 'Form'] = generateHTTPMethod(true);
  });

  var Axios_1 = Axios$1;

  var CancelToken_1;
  var hasRequiredCancelToken;

  function requireCancelToken () {
  	if (hasRequiredCancelToken) return CancelToken_1;
  	hasRequiredCancelToken = 1;

  	var CanceledError = requireCanceledError();

  	/**
  	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
  	 *
  	 * @class
  	 * @param {Function} executor The executor function.
  	 */
  	function CancelToken(executor) {
  	  if (typeof executor !== 'function') {
  	    throw new TypeError('executor must be a function.');
  	  }

  	  var resolvePromise;

  	  this.promise = new Promise(function promiseExecutor(resolve) {
  	    resolvePromise = resolve;
  	  });

  	  var token = this;

  	  // eslint-disable-next-line func-names
  	  this.promise.then(function(cancel) {
  	    if (!token._listeners) return;

  	    var i;
  	    var l = token._listeners.length;

  	    for (i = 0; i < l; i++) {
  	      token._listeners[i](cancel);
  	    }
  	    token._listeners = null;
  	  });

  	  // eslint-disable-next-line func-names
  	  this.promise.then = function(onfulfilled) {
  	    var _resolve;
  	    // eslint-disable-next-line func-names
  	    var promise = new Promise(function(resolve) {
  	      token.subscribe(resolve);
  	      _resolve = resolve;
  	    }).then(onfulfilled);

  	    promise.cancel = function reject() {
  	      token.unsubscribe(_resolve);
  	    };

  	    return promise;
  	  };

  	  executor(function cancel(message) {
  	    if (token.reason) {
  	      // Cancellation has already been requested
  	      return;
  	    }

  	    token.reason = new CanceledError(message);
  	    resolvePromise(token.reason);
  	  });
  	}

  	/**
  	 * Throws a `CanceledError` if cancellation has been requested.
  	 */
  	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  	  if (this.reason) {
  	    throw this.reason;
  	  }
  	};

  	/**
  	 * Subscribe to the cancel signal
  	 */

  	CancelToken.prototype.subscribe = function subscribe(listener) {
  	  if (this.reason) {
  	    listener(this.reason);
  	    return;
  	  }

  	  if (this._listeners) {
  	    this._listeners.push(listener);
  	  } else {
  	    this._listeners = [listener];
  	  }
  	};

  	/**
  	 * Unsubscribe from the cancel signal
  	 */

  	CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  	  if (!this._listeners) {
  	    return;
  	  }
  	  var index = this._listeners.indexOf(listener);
  	  if (index !== -1) {
  	    this._listeners.splice(index, 1);
  	  }
  	};

  	/**
  	 * Returns an object that contains a new `CancelToken` and a function that, when called,
  	 * cancels the `CancelToken`.
  	 */
  	CancelToken.source = function source() {
  	  var cancel;
  	  var token = new CancelToken(function executor(c) {
  	    cancel = c;
  	  });
  	  return {
  	    token: token,
  	    cancel: cancel
  	  };
  	};

  	CancelToken_1 = CancelToken;
  	return CancelToken_1;
  }

  var spread;
  var hasRequiredSpread;

  function requireSpread () {
  	if (hasRequiredSpread) return spread;
  	hasRequiredSpread = 1;

  	/**
  	 * Syntactic sugar for invoking a function and expanding an array for arguments.
  	 *
  	 * Common use case would be to use `Function.prototype.apply`.
  	 *
  	 *  ```js
  	 *  function f(x, y, z) {}
  	 *  var args = [1, 2, 3];
  	 *  f.apply(null, args);
  	 *  ```
  	 *
  	 * With `spread` this example can be re-written.
  	 *
  	 *  ```js
  	 *  spread(function(x, y, z) {})([1, 2, 3]);
  	 *  ```
  	 *
  	 * @param {Function} callback
  	 * @returns {Function}
  	 */
  	spread = function spread(callback) {
  	  return function wrap(arr) {
  	    return callback.apply(null, arr);
  	  };
  	};
  	return spread;
  }

  var isAxiosError;
  var hasRequiredIsAxiosError;

  function requireIsAxiosError () {
  	if (hasRequiredIsAxiosError) return isAxiosError;
  	hasRequiredIsAxiosError = 1;

  	var utils = utils$9;

  	/**
  	 * Determines whether the payload is an error thrown by Axios
  	 *
  	 * @param {*} payload The value to test
  	 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
  	 */
  	isAxiosError = function isAxiosError(payload) {
  	  return utils.isObject(payload) && (payload.isAxiosError === true);
  	};
  	return isAxiosError;
  }

  var utils = utils$9;
  var bind = bind$2;
  var Axios = Axios_1;
  var mergeConfig = mergeConfig$2;
  var defaults = defaults_1;

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   * @return {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind(Axios.prototype.request, context);

    // Copy axios.prototype to instance
    utils.extend(instance, Axios.prototype, context);

    // Copy context to instance
    utils.extend(instance, context);

    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };

    return instance;
  }

  // Create the default instance to be exported
  var axios$1 = createInstance(defaults);

  // Expose Axios class to allow class inheritance
  axios$1.Axios = Axios;

  // Expose Cancel & CancelToken
  axios$1.CanceledError = requireCanceledError();
  axios$1.CancelToken = requireCancelToken();
  axios$1.isCancel = requireIsCancel();
  axios$1.VERSION = requireData().version;
  axios$1.toFormData = requireToFormData();

  // Expose AxiosError class
  axios$1.AxiosError = requireAxiosError();

  // alias for CanceledError for backward compatibility
  axios$1.Cancel = axios$1.CanceledError;

  // Expose all/spread
  axios$1.all = function all(promises) {
    return Promise.all(promises);
  };
  axios$1.spread = requireSpread();

  // Expose isAxiosError
  axios$1.isAxiosError = requireIsAxiosError();

  axios$2.exports = axios$1;

  // Allow use of default import syntax in TypeScript
  axios$2.exports.default = axios$1;

  (function (module) {
  	module.exports = axios$2.exports;
  } (axios$3));

  var axios = /*@__PURE__*/getDefaultExportFromCjs(axios$3.exports);

  var UploadDistributionComponent = function UploadDistributionComponent(props) {
    var _useState = React.useState({
        status: false
      }),
      _useState2 = _slicedToArray(_useState, 2),
      success = _useState2[0],
      setSuccess = _useState2[1];
    var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      uploadDisabled = _useState4[0],
      setUploadDisabled = _useState4[1];
    var _React$useState = React__default["default"].useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      errors = _React$useState2[0],
      setErrors = _React$useState2[1];
    var _React$useState3 = React__default["default"].useState(undefined),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      distributionContract = _React$useState4[0],
      setDistributionContract = _React$useState4[1];
    var _React$useState5 = React__default["default"].useState(),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      distributionCardId = _React$useState6[0],
      setDistributionCardId = _React$useState6[1];
    var _React$useState7 = React__default["default"].useState(undefined),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      distributionFile = _React$useState8[0],
      setDistributionFile = _React$useState8[1];
    var _React$useState9 = React__default["default"].useState([]),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      distributionPhotos = _React$useState10[0],
      setDistributionPhotos = _React$useState10[1];
    var handleUpload = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var newerrors, _newerrors, reader, formData;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              setErrors([]);
              setUploadDisabled(true);
              newerrors = [];
              if (!distributionContract) {
                newerrors.push("- missing Contract");
              }
              if (!distributionCardId) {
                newerrors.push("- missing Card ID");
              }
              if (!distributionFile && distributionPhotos.length == 0) {
                newerrors.push("- provide at least one of distribution or photos");
              }
              if (!(newerrors.length > 0)) {
                _context2.next = 11;
                break;
              }
              setErrors(newerrors);
              setUploadDisabled(false);
              _context2.next = 40;
              break;
            case 11:
              _newerrors = [];
              if (distributionFile) {
                reader = new FileReader();
                reader.readAsText(distributionFile);
                reader.onload = /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
                    var _event$target;
                    var csvContent, csvRows, distributions;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          if ((_event$target = event.target) !== null && _event$target !== void 0 && _event$target.result) {
                            csvContent = event.target.result.toString();
                            csvRows = csvContent.split("\n");
                            distributions = [];
                            csvRows.map(function (row, index) {
                              try {
                                if (row) {
                                  var parts = row.split(",");
                                  var phase = parts[0];
                                  var wallet = parts[1];
                                  var count = parts[2];
                                  if (!phase || !wallet || !count) {
                                    _newerrors.push("- something wrong at row index ".concat(index));
                                  } else {
                                    var d = {
                                      wallet: wallet,
                                      phase: phase,
                                      count: parseInt(count)
                                    };
                                    distributions.push(d);
                                  }
                                }
                              } catch (_unused) {
                                _newerrors.push("- error at row index ".concat(index));
                              }
                            });
                          }
                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee);
                  }));
                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }();
              }
              if (!(_newerrors.length > 0)) {
                _context2.next = 18;
                break;
              }
              setErrors(_newerrors);
              setUploadDisabled(false);
              _context2.next = 40;
              break;
            case 18:
              setErrors([]);
              formData = new FormData();
              if (distributionFile) {
                formData.append("distribution", distributionFile);
              }
              formData.append("card_id", distributionCardId.toString());
              formData.append("contract", distributionContract);
              distributionPhotos.map(function (dp, index) {
                formData.append("photo".concat(index), dp);
              });
              console.log("sending file form uploader");
              _context2.prev = 25;
              _context2.next = 28;
              return axios.post("/upload", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              });
            case 28:
              setSuccess({
                status: true,
                file: distributionFile != undefined && distributionFile != null,
                photos: distributionPhotos.length > 0
              });
              setDistributionCardId(undefined);
              setDistributionContract("");
              setDistributionFile(undefined);
              setUploadDisabled(false);
              _context2.next = 40;
              break;
            case 35:
              _context2.prev = 35;
              _context2.t0 = _context2["catch"](25);
              console.log(_context2.t0);
              setErrors(["- Something went wrong during upload: ".concat(_context2.t0.response.data)]);
              setUploadDisabled(false);
            case 40:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[25, 35]]);
      }));
      return function handleUpload() {
        return _ref.apply(this, arguments);
      };
    }();
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "dashboardCard"
    }, /*#__PURE__*/React__default["default"].createElement(designSystem.H4, null, "NEW DISTRIBUTION PLAN"), /*#__PURE__*/React__default["default"].createElement("br", null), "Contract\xA0\xA0", /*#__PURE__*/React__default["default"].createElement("input", {
      className: "uploadDistributionInput",
      type: "text",
      value: distributionContract !== undefined ? distributionContract : "",
      onChange: function onChange(e) {
        return setDistributionContract(e.target.value);
      }
    }), /*#__PURE__*/React__default["default"].createElement("br", null), "Card ID\xA0\xA0\xA0\xA0\xA0", /*#__PURE__*/React__default["default"].createElement("input", {
      className: "uploadDistributionInput uploadDistributionInputNumber",
      type: "number",
      min: "0",
      value: distributionCardId !== undefined ? distributionCardId : "",
      onChange: function onChange(e) {
        return setDistributionCardId(parseInt(e.target.value));
      }
    }), /*#__PURE__*/React__default["default"].createElement("br", null), "Distribution\xA0\xA0", /*#__PURE__*/React__default["default"].createElement("input", {
      type: "file",
      accept: ".csv",
      className: "uploadDistributionFile",
      onChange: function onChange(e) {
        return setDistributionFile(e.target.files ? e.target.files[0] : undefined);
      }
    }), /*#__PURE__*/React__default["default"].createElement("br", null), "Photos\xA0\xA0", /*#__PURE__*/React__default["default"].createElement("input", {
      multiple: true,
      type: "file",
      accept: "image/*",
      className: "uploadDistributionFile",
      onChange: function onChange(e) {
        var _e$target;
        setDistributionPhotos((_e$target = e.target) !== null && _e$target !== void 0 && _e$target.files ? [].concat(_toConsumableArray(distributionPhotos), _toConsumableArray(e.target.files)) : distributionPhotos);
      }
    }), distributionPhotos.map(function (dp) {
      return /*#__PURE__*/React__default["default"].createElement("span", {
        key: dp.name,
        className: "distributionPhoto"
      }, dp.name);
    }), /*#__PURE__*/React__default["default"].createElement("br", null), /*#__PURE__*/React__default["default"].createElement(designSystem.Button, {
      className: "uploadDistributionBtn",
      onClick: handleUpload,
      disabled: uploadDisabled
    }, uploadDisabled ? "Uploading..." : "Upload"), errors.map(function (e, index) {
      return /*#__PURE__*/React__default["default"].createElement(designSystem.Text, {
        key: "error-".concat(index),
        color: "error"
      }, e);
    }), success.status && /*#__PURE__*/React__default["default"].createElement(designSystem.Text, null, "Upload Successful!", success.file && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, " ", /*#__PURE__*/React__default["default"].createElement("a", {
      href: "/resources/Distribution?filters.contract=".concat(distributionContract, "&filters.card_id=").concat(distributionCardId),
      target: "_blank"
    }, "VIEW DISTRIBUTION")), success.photos && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, " ", /*#__PURE__*/React__default["default"].createElement("a", {
      href: "/resources/DistributionPhoto?filters.contract=".concat(distributionContract, "&filters.card_id=").concat(distributionCardId),
      target: "_blank"
    }, "VIEW PHOTOS"))));
  };

  var _templateObject;
  var pageHeaderHeight = 284;
  var pageHeaderPaddingY = 74;
  var pageHeaderPaddingX = 250;
  var DashboardHeader = function DashboardHeader() {
    return /*#__PURE__*/React__default["default"].createElement(designSystem.Box, {
      position: "relative",
      overflow: "hidden",
      "data-css": "default-dashboard"
    }, /*#__PURE__*/React__default["default"].createElement(designSystem.Box, {
      position: "absolute",
      top: 50,
      left: -10,
      opacity: [0.2, 0.4, 1],
      animate: true
    }), /*#__PURE__*/React__default["default"].createElement(designSystem.Box, {
      position: "absolute",
      top: -70,
      right: -15,
      opacity: [0.2, 0.4, 1],
      animate: true
    }), /*#__PURE__*/React__default["default"].createElement(designSystem.Box, {
      bg: "grey100",
      height: pageHeaderHeight,
      py: pageHeaderPaddingY,
      px: ["default", "lg", pageHeaderPaddingX]
    }, /*#__PURE__*/React__default["default"].createElement(designSystem.Text, {
      textAlign: "center",
      color: "white"
    }, /*#__PURE__*/React__default["default"].createElement(designSystem.H2, null, "SEIZO.IO ADMIN"))));
  };
  var resources = [{
    title: "Team",
    path: "/resources/Team"
  }];
  var Card = styled__default["default"](designSystem.Box)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-decoration: none;\n  border: 1px solid transparent;\n  &:hover {\n    border: 1px solid black;\n  }\n"])), function (_ref) {
    var theme = _ref.theme;
    return theme.colors.grey100;
  });
  Card.defaultProps = {
    variant: "white",
    boxShadow: "card"
  };
  var Dashboard = function Dashboard() {
    return /*#__PURE__*/React__default["default"].createElement(designSystem.Box, null, /*#__PURE__*/React__default["default"].createElement(DashboardHeader, null), /*#__PURE__*/React__default["default"].createElement(designSystem.Box, {
      mt: ["xl", "xl", "-100px"],
      mb: "xl",
      mx: [0, 0, 0, "auto"],
      px: ["default", "lg", "xxl", "0"],
      position: "relative",
      flex: true,
      flexDirection: "row",
      flexWrap: "wrap",
      width: [1, 1, 1, 1024]
    }, /*#__PURE__*/React__default["default"].createElement("section", {
      className: "dashboardSection"
    }, /*#__PURE__*/React__default["default"].createElement(UploadDistributionComponent, null)), resources.map(function (box, index) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        React__default["default"].createElement(designSystem.Box, {
          key: index,
          width: [1, 1 / 2, 1 / 2, 1 / 3],
          p: "lg"
        }, /*#__PURE__*/React__default["default"].createElement(Card, {
          as: "a",
          href: box.path
        }, /*#__PURE__*/React__default["default"].createElement(designSystem.H5, {
          mt: "lg"
        }, box.title)))
      );
    })));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.CustomDashboard = Dashboard;

})(React, styled, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvRm9ybURhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9udWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9lbnYvZGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy92YWxpZGF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIi4uL3NyYy91cGxvYWREaXN0cmlidXRpb24udHN4IiwiLi4vc3JjL2Rhc2hib2FyZC50c3giLCIuZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG52YXIga2luZE9mID0gKGZ1bmN0aW9uKGNhY2hlKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiBmdW5jdGlvbih0aGluZykge1xuICAgIHZhciBzdHIgPSB0b1N0cmluZy5jYWxsKHRoaW5nKTtcbiAgICByZXR1cm4gY2FjaGVbc3RyXSB8fCAoY2FjaGVbc3RyXSA9IHN0ci5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKSk7XG4gIH07XG59KShPYmplY3QuY3JlYXRlKG51bGwpKTtcblxuZnVuY3Rpb24ga2luZE9mVGVzdCh0eXBlKSB7XG4gIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiBmdW5jdGlvbiBpc0tpbmRPZih0aGluZykge1xuICAgIHJldHVybiBraW5kT2YodGhpbmcpID09PSB0eXBlO1xuICB9O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbnZhciBpc0FycmF5QnVmZmVyID0ga2luZE9mVGVzdCgnQXJyYXlCdWZmZXInKTtcblxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmIChpc0FycmF5QnVmZmVyKHZhbC5idWZmZXIpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsKSB7XG4gIGlmIChraW5kT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiBwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzRGF0ZSA9IGtpbmRPZlRlc3QoJ0RhdGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbnZhciBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNCbG9iID0ga2luZE9mVGVzdCgnQmxvYicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZUxpc3RcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbnZhciBpc0ZpbGVMaXN0ID0ga2luZE9mVGVzdCgnRmlsZUxpc3QnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodGhpbmcpIHtcbiAgdmFyIHBhdHRlcm4gPSAnW29iamVjdCBGb3JtRGF0YV0nO1xuICByZXR1cm4gdGhpbmcgJiYgKFxuICAgICh0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgdGhpbmcgaW5zdGFuY2VvZiBGb3JtRGF0YSkgfHxcbiAgICB0b1N0cmluZy5jYWxsKHRoaW5nKSA9PT0gcGF0dGVybiB8fFxuICAgIChpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSBwYXR0ZXJuKVxuICApO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNVUkxTZWFyY2hQYXJhbXMgPSBraW5kT2ZUZXN0KCdVUkxTZWFyY2hQYXJhbXMnKTtcblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnRyaW0gPyBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0W2tleV0pICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG4vKipcbiAqIFJlbW92ZSBieXRlIG9yZGVyIG1hcmtlci4gVGhpcyBjYXRjaGVzIEVGIEJCIEJGICh0aGUgVVRGLTggQk9NKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHdpdGggQk9NXG4gKiBAcmV0dXJuIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuZnVuY3Rpb24gc3RyaXBCT00oY29udGVudCkge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn1cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gW3Byb3BzXVxuICogQHBhcmFtIHtvYmplY3R9IFtkZXNjcmlwdG9yc11cbiAqL1xuXG5mdW5jdGlvbiBpbmhlcml0cyhjb25zdHJ1Y3Rvciwgc3VwZXJDb25zdHJ1Y3RvciwgcHJvcHMsIGRlc2NyaXB0b3JzKSB7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKTtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG4gIHByb3BzICYmIE9iamVjdC5hc3NpZ24oY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm9wcyk7XG59XG5cbi8qKlxuICogUmVzb2x2ZSBvYmplY3Qgd2l0aCBkZWVwIHByb3RvdHlwZSBjaGFpbiB0byBhIGZsYXQgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlT2JqIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGVzdE9ial1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmaWx0ZXJdXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIHRvRmxhdE9iamVjdChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlcikge1xuICB2YXIgcHJvcHM7XG4gIHZhciBpO1xuICB2YXIgcHJvcDtcbiAgdmFyIG1lcmdlZCA9IHt9O1xuXG4gIGRlc3RPYmogPSBkZXN0T2JqIHx8IHt9O1xuXG4gIGRvIHtcbiAgICBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZU9iaik7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgaWYgKCFtZXJnZWRbcHJvcF0pIHtcbiAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlT2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHNvdXJjZU9iaik7XG4gIH0gd2hpbGUgKHNvdXJjZU9iaiAmJiAoIWZpbHRlciB8fCBmaWx0ZXIoc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgc291cmNlT2JqICE9PSBPYmplY3QucHJvdG90eXBlKTtcblxuICByZXR1cm4gZGVzdE9iajtcbn1cblxuLypcbiAqIGRldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gW3Bvc2l0aW9uPSAwXVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGVuZHNXaXRoKHN0ciwgc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgcG9zaXRpb24gPiBzdHIubGVuZ3RoKSB7XG4gICAgcG9zaXRpb24gPSBzdHIubGVuZ3RoO1xuICB9XG4gIHBvc2l0aW9uIC09IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gIHZhciBsYXN0SW5kZXggPSBzdHIuaW5kZXhPZihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcbiAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3NpdGlvbjtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgbmV3IGFycmF5IGZyb20gYXJyYXkgbGlrZSBvYmplY3RcbiAqIEBwYXJhbSB7Kn0gW3RoaW5nXVxuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiB0b0FycmF5KHRoaW5nKSB7XG4gIGlmICghdGhpbmcpIHJldHVybiBudWxsO1xuICB2YXIgaSA9IHRoaW5nLmxlbmd0aDtcbiAgaWYgKGlzVW5kZWZpbmVkKGkpKSByZXR1cm4gbnVsbDtcbiAgdmFyIGFyciA9IG5ldyBBcnJheShpKTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBhcnJbaV0gPSB0aGluZ1tpXTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xudmFyIGlzVHlwZWRBcnJheSA9IChmdW5jdGlvbihUeXBlZEFycmF5KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiBmdW5jdGlvbih0aGluZykge1xuICAgIHJldHVybiBUeXBlZEFycmF5ICYmIHRoaW5nIGluc3RhbmNlb2YgVHlwZWRBcnJheTtcbiAgfTtcbn0pKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVWludDhBcnJheSkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3Q6IGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbSxcbiAgc3RyaXBCT006IHN0cmlwQk9NLFxuICBpbmhlcml0czogaW5oZXJpdHMsXG4gIHRvRmxhdE9iamVjdDogdG9GbGF0T2JqZWN0LFxuICBraW5kT2Y6IGtpbmRPZixcbiAga2luZE9mVGVzdDoga2luZE9mVGVzdCxcbiAgZW5kc1dpdGg6IGVuZHNXaXRoLFxuICB0b0FycmF5OiB0b0FycmF5LFxuICBpc1R5cGVkQXJyYXk6IGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdDogaXNGaWxlTGlzdFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB2YXIgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkLFxuICAgIHN5bmNocm9ub3VzOiBvcHRpb25zID8gb3B0aW9ucy5zeW5jaHJvbm91cyA6IGZhbHNlLFxuICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBBeGlvc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzKTtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICBjb2RlICYmICh0aGlzLmNvZGUgPSBjb2RlKTtcbiAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICByZXNwb25zZSAmJiAodGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlKTtcbn1cblxudXRpbHMuaW5oZXJpdHMoQXhpb3NFcnJvciwgRXJyb3IsIHtcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBzdGF0dXM6IHRoaXMucmVzcG9uc2UgJiYgdGhpcy5yZXNwb25zZS5zdGF0dXMgPyB0aGlzLnJlc3BvbnNlLnN0YXR1cyA6IG51bGxcbiAgICB9O1xuICB9XG59KTtcblxudmFyIHByb3RvdHlwZSA9IEF4aW9zRXJyb3IucHJvdG90eXBlO1xudmFyIGRlc2NyaXB0b3JzID0ge307XG5cbltcbiAgJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJyxcbiAgJ0VSUl9CQURfT1BUSU9OJyxcbiAgJ0VDT05OQUJPUlRFRCcsXG4gICdFVElNRURPVVQnLFxuICAnRVJSX05FVFdPUksnLFxuICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXG4gICdFUlJfREVQUkVDQVRFRCcsXG4gICdFUlJfQkFEX1JFU1BPTlNFJyxcbiAgJ0VSUl9CQURfUkVRVUVTVCcsXG4gICdFUlJfQ0FOQ0VMRUQnXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXS5mb3JFYWNoKGZ1bmN0aW9uKGNvZGUpIHtcbiAgZGVzY3JpcHRvcnNbY29kZV0gPSB7dmFsdWU6IGNvZGV9O1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEF4aW9zRXJyb3IsIGRlc2NyaXB0b3JzKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsICdpc0F4aW9zRXJyb3InLCB7dmFsdWU6IHRydWV9KTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbkF4aW9zRXJyb3IuZnJvbSA9IGZ1bmN0aW9uKGVycm9yLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlLCBjdXN0b21Qcm9wcykge1xuICB2YXIgYXhpb3NFcnJvciA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcblxuICB1dGlscy50b0ZsYXRPYmplY3QoZXJyb3IsIGF4aW9zRXJyb3IsIGZ1bmN0aW9uIGZpbHRlcihvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSBFcnJvci5wcm90b3R5cGU7XG4gIH0pO1xuXG4gIEF4aW9zRXJyb3IuY2FsbChheGlvc0Vycm9yLCBlcnJvci5tZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcblxuICBheGlvc0Vycm9yLm5hbWUgPSBlcnJvci5uYW1lO1xuXG4gIGN1c3RvbVByb3BzICYmIE9iamVjdC5hc3NpZ24oYXhpb3NFcnJvciwgY3VzdG9tUHJvcHMpO1xuXG4gIHJldHVybiBheGlvc0Vycm9yO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvc0Vycm9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgZGF0YSBvYmplY3QgdG8gRm9ybURhdGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBmb3JtRGF0YSA9IGZvcm1EYXRhIHx8IG5ldyBGb3JtRGF0YSgpO1xuXG4gIHZhciBzdGFjayA9IFtdO1xuXG4gIGZ1bmN0aW9uIGNvbnZlcnRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuICcnO1xuXG4gICAgaWYgKHV0aWxzLmlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyKHZhbHVlKSB8fCB1dGlscy5pc1R5cGVkQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIEJsb2IgPT09ICdmdW5jdGlvbicgPyBuZXcgQmxvYihbdmFsdWVdKSA6IEJ1ZmZlci5mcm9tKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZChkYXRhLCBwYXJlbnRLZXkpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChkYXRhKSB8fCB1dGlscy5pc0FycmF5KGRhdGEpKSB7XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihkYXRhKSAhPT0gLTEpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAnICsgcGFyZW50S2V5KTtcbiAgICAgIH1cblxuICAgICAgc3RhY2sucHVzaChkYXRhKTtcblxuICAgICAgdXRpbHMuZm9yRWFjaChkYXRhLCBmdW5jdGlvbiBlYWNoKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuO1xuICAgICAgICB2YXIgZnVsbEtleSA9IHBhcmVudEtleSA/IHBhcmVudEtleSArICcuJyArIGtleSA6IGtleTtcbiAgICAgICAgdmFyIGFycjtcblxuICAgICAgICBpZiAodmFsdWUgJiYgIXBhcmVudEtleSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgaWYgKHV0aWxzLmVuZHNXaXRoKGtleSwgJ3t9JykpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh1dGlscy5lbmRzV2l0aChrZXksICdbXScpICYmIChhcnIgPSB1dGlscy50b0FycmF5KHZhbHVlKSkpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgICAhdXRpbHMuaXNVbmRlZmluZWQoZWwpICYmIGZvcm1EYXRhLmFwcGVuZChmdWxsS2V5LCBjb252ZXJ0VmFsdWUoZWwpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJ1aWxkKHZhbHVlLCBmdWxsS2V5KTtcbiAgICAgIH0pO1xuXG4gICAgICBzdGFjay5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybURhdGEuYXBwZW5kKHBhcmVudEtleSwgY29udmVydFZhbHVlKGRhdGEpKTtcbiAgICB9XG4gIH1cblxuICBidWlsZChvYmopO1xuXG4gIHJldHVybiBmb3JtRGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b0Zvcm1EYXRhO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4vQXhpb3NFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkK1xcLS5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVEKTtcbiAgdGhpcy5uYW1lID0gJ0NhbmNlbGVkRXJyb3InO1xufVxuXG51dGlscy5pbmhlcml0cyhDYW5jZWxlZEVycm9yLCBBeGlvc0Vycm9yLCB7XG4gIF9fQ0FOQ0VMX186IHRydWVcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbGVkRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgdmFyIG1hdGNoID0gL14oWy0rXFx3XXsxLDI1fSkoOj9cXC9cXC98OikvLmV4ZWModXJsKTtcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoWzFdIHx8ICcnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIGJ1aWxkRnVsbFBhdGggPSByZXF1aXJlKCcuLi9jb3JlL2J1aWxkRnVsbFBhdGgnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIHRyYW5zaXRpb25hbERlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsJyk7XG52YXIgQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvQXhpb3NFcnJvcicpO1xudmFyIENhbmNlbGVkRXJyb3IgPSByZXF1aXJlKCcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvcicpO1xudmFyIHBhcnNlUHJvdG9jb2wgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuICAgIHZhciByZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgIHZhciBvbkNhbmNlbGVkO1xuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi51bnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSAmJiB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgPyB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoY29uZmlnLmF1dGgucGFzc3dvcmQpKSA6ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIGZ1bmN0aW9uIG9ubG9hZGVuZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFyZXNwb25zZVR5cGUgfHwgcmVzcG9uc2VUeXBlID09PSAndGV4dCcgfHwgIHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nID9cbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKGZ1bmN0aW9uIF9yZXNvbHZlKHZhbHVlKSB7XG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCBmdW5jdGlvbiBfcmVqZWN0KGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoJ29ubG9hZGVuZCcgaW4gcmVxdWVzdCkge1xuICAgICAgLy8gVXNlIG9ubG9hZGVuZCBpZiBhdmFpbGFibGVcbiAgICAgIHJlcXVlc3Qub25sb2FkZW5kID0gb25sb2FkZW5kO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlIHRvIGVtdWxhdGUgb25sb2FkZW5kXG4gICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVhZHlzdGF0ZSBoYW5kbGVyIGlzIGNhbGxpbmcgYmVmb3JlIG9uZXJyb3Igb3Igb250aW1lb3V0IGhhbmRsZXJzLFxuICAgICAgICAvLyBzbyB3ZSBzaG91bGQgY2FsbCBvbmxvYWRlbmQgb24gdGhlIG5leHQgJ3RpY2snXG4gICAgICAgIHNldFRpbWVvdXQob25sb2FkZW5kKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCwgY29uZmlnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdOZXR3b3JrIEVycm9yJywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgY29uZmlnLCByZXF1ZXN0LCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHZhciB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXQgPyAndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnIDogJ3RpbWVvdXQgZXhjZWVkZWQnO1xuICAgICAgdmFyIHRyYW5zaXRpb25hbCA9IGNvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICBpZiAoY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlLFxuICAgICAgICB0cmFuc2l0aW9uYWwuY2xhcmlmeVRpbWVvdXRFcnJvciA/IEF4aW9zRXJyb3IuRVRJTUVET1VUIDogQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChyZXNwb25zZVR5cGUgJiYgcmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuIHx8IGNvbmZpZy5zaWduYWwpIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBvbkNhbmNlbGVkID0gZnVuY3Rpb24oY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoIWNhbmNlbCB8fCAoY2FuY2VsICYmIGNhbmNlbC50eXBlKSA/IG5ldyBDYW5jZWxlZEVycm9yKCkgOiBjYW5jZWwpO1xuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuICYmIGNvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICBpZiAoY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBjb25maWcuc2lnbmFsLmFib3J0ZWQgPyBvbkNhbmNlbGVkKCkgOiBjb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFyZXF1ZXN0RGF0YSkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBwcm90b2NvbCA9IHBhcnNlUHJvdG9jb2woZnVsbFBhdGgpO1xuXG4gICAgaWYgKHByb3RvY29sICYmIFsgJ2h0dHAnLCAnaHR0cHMnLCAnZmlsZScgXS5pbmRleE9mKHByb3RvY29sKSA9PT0gLTEpIHtcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignVW5zdXBwb3J0ZWQgcHJvdG9jb2wgJyArIHByb3RvY29sICsgJzonLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgY29uZmlnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHN0cmljdFxubW9kdWxlLmV4cG9ydHMgPSBudWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgdHJhbnNpdGlvbmFsRGVmYXVsdHMgPSByZXF1aXJlKCcuL3RyYW5zaXRpb25hbCcpO1xudmFyIHRvRm9ybURhdGEgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3RvRm9ybURhdGEnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG5cbiAgdHJhbnNpdGlvbmFsOiB0cmFuc2l0aW9uYWxEZWZhdWx0cyxcblxuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdBY2NlcHQnKTtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICB2YXIgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMuaXNPYmplY3QoZGF0YSk7XG4gICAgdmFyIGNvbnRlbnRUeXBlID0gaGVhZGVycyAmJiBoZWFkZXJzWydDb250ZW50LVR5cGUnXTtcblxuICAgIHZhciBpc0ZpbGVMaXN0O1xuXG4gICAgaWYgKChpc0ZpbGVMaXN0ID0gdXRpbHMuaXNGaWxlTGlzdChkYXRhKSkgfHwgKGlzT2JqZWN0UGF5bG9hZCAmJiBjb250ZW50VHlwZSA9PT0gJ211bHRpcGFydC9mb3JtLWRhdGEnKSkge1xuICAgICAgdmFyIF9Gb3JtRGF0YSA9IHRoaXMuZW52ICYmIHRoaXMuZW52LkZvcm1EYXRhO1xuICAgICAgcmV0dXJuIHRvRm9ybURhdGEoaXNGaWxlTGlzdCA/IHsnZmlsZXNbXSc6IGRhdGF9IDogZGF0YSwgX0Zvcm1EYXRhICYmIG5ldyBfRm9ybURhdGEoKSk7XG4gICAgfSBlbHNlIGlmIChpc09iamVjdFBheWxvYWQgfHwgY29udGVudFR5cGUgPT09ICdhcHBsaWNhdGlvbi9qc29uJykge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICByZXR1cm4gc3RyaW5naWZ5U2FmZWx5KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICB2YXIgdHJhbnNpdGlvbmFsID0gdGhpcy50cmFuc2l0aW9uYWwgfHwgZGVmYXVsdHMudHJhbnNpdGlvbmFsO1xuICAgIHZhciBzaWxlbnRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuc2lsZW50SlNPTlBhcnNpbmc7XG4gICAgdmFyIGZvcmNlZEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5mb3JjZWRKU09OUGFyc2luZztcbiAgICB2YXIgc3RyaWN0SlNPTlBhcnNpbmcgPSAhc2lsZW50SlNPTlBhcnNpbmcgJiYgdGhpcy5yZXNwb25zZVR5cGUgPT09ICdqc29uJztcblxuICAgIGlmIChzdHJpY3RKU09OUGFyc2luZyB8fCAoZm9yY2VkSlNPTlBhcnNpbmcgJiYgdXRpbHMuaXNTdHJpbmcoZGF0YSkgJiYgZGF0YS5sZW5ndGgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHN0cmljdEpTT05QYXJzaW5nKSB7XG4gICAgICAgICAgaWYgKGUubmFtZSA9PT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGUsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSwgdGhpcywgbnVsbCwgdGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIGVudjoge1xuICAgIEZvcm1EYXRhOiByZXF1aXJlKCcuL2Vudi9Gb3JtRGF0YScpXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgICB9XG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICB2YXIgY29udGV4dCA9IHRoaXMgfHwgZGVmYXVsdHM7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuLmNhbGwoY29udGV4dCwgZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIENhbmNlbGVkRXJyb3IgPSByZXF1aXJlKCcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvcicpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxuXG4gIGlmIChjb25maWcuc2lnbmFsICYmIGNvbmZpZy5zaWduYWwuYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBDYW5jZWxlZEVycm9yKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgIGNvbmZpZyxcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1xuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgY29uZmlnLFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIHZhciBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2UodGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMocHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIG1lcmdlTWFwID0ge1xuICAgICd1cmwnOiB2YWx1ZUZyb21Db25maWcyLFxuICAgICdtZXRob2QnOiB2YWx1ZUZyb21Db25maWcyLFxuICAgICdkYXRhJzogdmFsdWVGcm9tQ29uZmlnMixcbiAgICAnYmFzZVVSTCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RyYW5zZm9ybVJlcXVlc3QnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd0cmFuc2Zvcm1SZXNwb25zZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3BhcmFtc1NlcmlhbGl6ZXInOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd0aW1lb3V0JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndGltZW91dE1lc3NhZ2UnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd3aXRoQ3JlZGVudGlhbHMnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdhZGFwdGVyJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAncmVzcG9uc2VUeXBlJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAneHNyZkNvb2tpZU5hbWUnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd4c3JmSGVhZGVyTmFtZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ29uVXBsb2FkUHJvZ3Jlc3MnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdvbkRvd25sb2FkUHJvZ3Jlc3MnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdkZWNvbXByZXNzJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnbWF4Q29udGVudExlbmd0aCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ21heEJvZHlMZW5ndGgnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdiZWZvcmVSZWRpcmVjdCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RyYW5zcG9ydCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2h0dHBBZ2VudCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2h0dHBzQWdlbnQnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdjYW5jZWxUb2tlbic6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3NvY2tldFBhdGgnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdyZXNwb25zZUVuY29kaW5nJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndmFsaWRhdGVTdGF0dXMnOiBtZXJnZURpcmVjdEtleXNcbiAgfTtcblxuICB1dGlscy5mb3JFYWNoKE9iamVjdC5rZXlzKGNvbmZpZzEpLmNvbmNhdChPYmplY3Qua2V5cyhjb25maWcyKSksIGZ1bmN0aW9uIGNvbXB1dGVDb25maWdWYWx1ZShwcm9wKSB7XG4gICAgdmFyIG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICB2YXIgY29uZmlnVmFsdWUgPSBtZXJnZShwcm9wKTtcbiAgICAodXRpbHMuaXNVbmRlZmluZWQoY29uZmlnVmFsdWUpICYmIG1lcmdlICE9PSBtZXJnZURpcmVjdEtleXMpIHx8IChjb25maWdbcHJvcF0gPSBjb25maWdWYWx1ZSk7XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwidmVyc2lvblwiOiBcIjAuMjcuMlwiXG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFZFUlNJT04gPSByZXF1aXJlKCcuLi9lbnYvZGF0YScpLnZlcnNpb247XG52YXIgQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvQXhpb3NFcnJvcicpO1xuXG52YXIgdmFsaWRhdG9ycyA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goZnVuY3Rpb24odHlwZSwgaSkge1xuICB2YWxpZGF0b3JzW3R5cGVdID0gZnVuY3Rpb24gdmFsaWRhdG9yKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gdHlwZSB8fCAnYScgKyAoaSA8IDEgPyAnbiAnIDogJyAnKSArIHR5cGU7XG4gIH07XG59KTtcblxudmFyIGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufGJvb2xlYW4/fSB2YWxpZGF0b3IgLSBzZXQgdG8gZmFsc2UgaWYgdGhlIHRyYW5zaXRpb25hbCBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZFxuICogQHBhcmFtIHtzdHJpbmc/fSB2ZXJzaW9uIC0gZGVwcmVjYXRlZCB2ZXJzaW9uIC8gcmVtb3ZlZCBzaW5jZSB2ZXJzaW9uXG4gKiBAcGFyYW0ge3N0cmluZz99IG1lc3NhZ2UgLSBzb21lIG1lc3NhZ2Ugd2l0aCBhZGRpdGlvbmFsIGluZm9cbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xudmFsaWRhdG9ycy50cmFuc2l0aW9uYWwgPSBmdW5jdGlvbiB0cmFuc2l0aW9uYWwodmFsaWRhdG9yLCB2ZXJzaW9uLCBtZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2Uob3B0LCBkZXNjKSB7XG4gICAgcmV0dXJuICdbQXhpb3MgdicgKyBWRVJTSU9OICsgJ10gVHJhbnNpdGlvbmFsIG9wdGlvbiBcXCcnICsgb3B0ICsgJ1xcJycgKyBkZXNjICsgKG1lc3NhZ2UgPyAnLiAnICsgbWVzc2FnZSA6ICcnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSwgb3B0LCBvcHRzKSB7XG4gICAgaWYgKHZhbGlkYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKG9wdCwgJyBoYXMgYmVlbiByZW1vdmVkJyArICh2ZXJzaW9uID8gJyBpbiAnICsgdmVyc2lvbiA6ICcnKSksXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0RFUFJFQ0FURURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24gJiYgIWRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdKSB7XG4gICAgICBkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICAnIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdicgKyB2ZXJzaW9uICsgJyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZSdcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yID8gdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdHMpIDogdHJ1ZTtcbiAgfTtcbn07XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCdzIHByb3BlcnRpZXMgdHlwZVxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGFsbG93VW5rbm93blxuICovXG5cbmZ1bmN0aW9uIGFzc2VydE9wdGlvbnMob3B0aW9ucywgc2NoZW1hLCBhbGxvd1Vua25vd24pIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0JywgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gIH1cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICB2YXIgb3B0ID0ga2V5c1tpXTtcbiAgICB2YXIgdmFsaWRhdG9yID0gc2NoZW1hW29wdF07XG4gICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgdmFyIHZhbHVlID0gb3B0aW9uc1tvcHRdO1xuICAgICAgdmFyIHJlc3VsdCA9IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdGlvbnMpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9uICcgKyBvcHQgKyAnIG11c3QgYmUgJyArIHJlc3VsdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGFsbG93VW5rbm93biAhPT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ1Vua25vd24gb3B0aW9uICcgKyBvcHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT04pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXNzZXJ0T3B0aW9uczogYXNzZXJ0T3B0aW9ucyxcbiAgdmFsaWRhdG9yczogdmFsaWRhdG9yc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcbnZhciBidWlsZEZ1bGxQYXRoID0gcmVxdWlyZSgnLi9idWlsZEZ1bGxQYXRoJyk7XG52YXIgdmFsaWRhdG9yID0gcmVxdWlyZSgnLi4vaGVscGVycy92YWxpZGF0b3InKTtcblxudmFyIHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWdPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgY29uZmlnLnVybCA9IGNvbmZpZ09yVXJsO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZ09yVXJsIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICBpZiAoY29uZmlnLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gdGhpcy5kZWZhdWx0cy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcubWV0aG9kID0gJ2dldCc7XG4gIH1cblxuICB2YXIgdHJhbnNpdGlvbmFsID0gY29uZmlnLnRyYW5zaXRpb25hbDtcblxuICBpZiAodHJhbnNpdGlvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyh0cmFuc2l0aW9uYWwsIHtcbiAgICAgIHNpbGVudEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICBjbGFyaWZ5VGltZW91dEVycm9yOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pXG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgLy8gZmlsdGVyIG91dCBza2lwcGVkIGludGVyY2VwdG9yc1xuICB2YXIgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgdmFyIHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHRydWU7XG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGlmICh0eXBlb2YgaW50ZXJjZXB0b3IucnVuV2hlbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnRlcmNlcHRvci5ydW5XaGVuKGNvbmZpZykgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzICYmIGludGVyY2VwdG9yLnN5bmNocm9ub3VzO1xuXG4gICAgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdmFyIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB2YXIgcHJvbWlzZTtcblxuICBpZiAoIXN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycykge1xuICAgIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG5cbiAgICBBcnJheS5wcm90b3R5cGUudW5zaGlmdC5hcHBseShjaGFpbiwgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4pO1xuICAgIGNoYWluID0gY2hhaW4uY29uY2F0KHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG5cbiAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG5cbiAgdmFyIG5ld0NvbmZpZyA9IGNvbmZpZztcbiAgd2hpbGUgKHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLmxlbmd0aCkge1xuICAgIHZhciBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnNoaWZ0KCk7XG4gICAgdmFyIG9uUmVqZWN0ZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5zaGlmdCgpO1xuICAgIHRyeSB7XG4gICAgICBuZXdDb25maWcgPSBvbkZ1bGZpbGxlZChuZXdDb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBvblJlamVjdGVkKGVycm9yKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdChuZXdDb25maWcpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gIH1cblxuICB3aGlsZSAocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnNoaWZ0KCksIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIHJldHVybiBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGlzRm9ybSA/IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH0gOiB7fSxcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pKTtcbiAgICB9O1xuICB9XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBnZW5lcmF0ZUhUVFBNZXRob2QoKTtcblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kICsgJ0Zvcm0nXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCh0cnVlKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4vQ2FuY2VsZWRFcnJvcicpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG5cbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgdGhpcy5wcm9taXNlLnRoZW4oZnVuY3Rpb24oY2FuY2VsKSB7XG4gICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICB2YXIgaTtcbiAgICB2YXIgbCA9IHRva2VuLl9saXN0ZW5lcnMubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgIH1cbiAgICB0b2tlbi5fbGlzdGVuZXJzID0gbnVsbDtcbiAgfSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgdGhpcy5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbihvbmZ1bGZpbGxlZCkge1xuICAgIHZhciBfcmVzb2x2ZTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgIH0pLnRoZW4ob25mdWxmaWxsZWQpO1xuXG4gICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xuXG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbGVkRXJyb3IobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gKi9cblxuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICB9XG59O1xuXG4vKipcbiAqIFVuc3Vic2NyaWJlIGZyb20gdGhlIGNhbmNlbCBzaWduYWxcbiAqL1xuXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0F4aW9zRXJyb3IocGF5bG9hZCkge1xuICByZXR1cm4gdXRpbHMuaXNPYmplY3QocGF5bG9hZCkgJiYgKHBheWxvYWQuaXNBeGlvc0Vycm9yID09PSB0cnVlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbGVkRXJyb3InKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcbmF4aW9zLlZFUlNJT04gPSByZXF1aXJlKCcuL2Vudi9kYXRhJykudmVyc2lvbjtcbmF4aW9zLnRvRm9ybURhdGEgPSByZXF1aXJlKCcuL2hlbHBlcnMvdG9Gb3JtRGF0YScpO1xuXG4vLyBFeHBvc2UgQXhpb3NFcnJvciBjbGFzc1xuYXhpb3MuQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2xpYi9jb3JlL0F4aW9zRXJyb3InKTtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4vaGVscGVycy9pc0F4aW9zRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEg0LCBUZXh0LCBCdXR0b24gfSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG5leHBvcnQgY29uc3QgVXBsb2FkRGlzdHJpYnV0aW9uQ29tcG9uZW50OiBSZWFjdC5GQyA9IChwcm9wczogYW55KSA9PiB7XG4gIGNvbnN0IFtzdWNjZXNzLCBzZXRTdWNjZXNzXSA9IHVzZVN0YXRlPHtcbiAgICBzdGF0dXM6IGJvb2xlYW47XG4gICAgZmlsZT86IGJvb2xlYW47XG4gICAgcGhvdG9zPzogYm9vbGVhbjtcbiAgfT4oeyBzdGF0dXM6IGZhbHNlIH0pO1xuICBjb25zdCBbdXBsb2FkRGlzYWJsZWQsIHNldFVwbG9hZERpc2FibGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZ1tdPihbXSk7XG4gIGNvbnN0IFtkaXN0cmlidXRpb25Db250cmFjdCwgc2V0RGlzdHJpYnV0aW9uQ29udHJhY3RdID0gUmVhY3QudXNlU3RhdGU8XG4gICAgc3RyaW5nIHwgdW5kZWZpbmVkXG4gID4odW5kZWZpbmVkKTtcbiAgY29uc3QgW2Rpc3RyaWJ1dGlvbkNhcmRJZCwgc2V0RGlzdHJpYnV0aW9uQ2FyZElkXSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlcj4oKTtcbiAgY29uc3QgW2Rpc3RyaWJ1dGlvbkZpbGUsIHNldERpc3RyaWJ1dGlvbkZpbGVdID0gUmVhY3QudXNlU3RhdGU8XG4gICAgRmlsZSB8IHVuZGVmaW5lZFxuICA+KHVuZGVmaW5lZCk7XG4gIGNvbnN0IFtkaXN0cmlidXRpb25QaG90b3MsIHNldERpc3RyaWJ1dGlvblBob3Rvc10gPSBSZWFjdC51c2VTdGF0ZTxGaWxlW10+KFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlVXBsb2FkID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldEVycm9ycyhbXSk7XG4gICAgc2V0VXBsb2FkRGlzYWJsZWQodHJ1ZSk7XG4gICAgY29uc3QgbmV3ZXJyb3JzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGlmICghZGlzdHJpYnV0aW9uQ29udHJhY3QpIHtcbiAgICAgIG5ld2Vycm9ycy5wdXNoKFwiLSBtaXNzaW5nIENvbnRyYWN0XCIpO1xuICAgIH1cbiAgICBpZiAoIWRpc3RyaWJ1dGlvbkNhcmRJZCkge1xuICAgICAgbmV3ZXJyb3JzLnB1c2goXCItIG1pc3NpbmcgQ2FyZCBJRFwiKTtcbiAgICB9XG4gICAgaWYgKCFkaXN0cmlidXRpb25GaWxlICYmIGRpc3RyaWJ1dGlvblBob3Rvcy5sZW5ndGggPT0gMCkge1xuICAgICAgbmV3ZXJyb3JzLnB1c2goXCItIHByb3ZpZGUgYXQgbGVhc3Qgb25lIG9mIGRpc3RyaWJ1dGlvbiBvciBwaG90b3NcIik7XG4gICAgfVxuXG4gICAgaWYgKG5ld2Vycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICBzZXRFcnJvcnMobmV3ZXJyb3JzKTtcbiAgICAgIHNldFVwbG9hZERpc2FibGVkKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3ZXJyb3JzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICBpZiAoZGlzdHJpYnV0aW9uRmlsZSkge1xuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIucmVhZEFzVGV4dChkaXN0cmlidXRpb25GaWxlKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LnRhcmdldD8ucmVzdWx0KSB7XG4gICAgICAgICAgICBjb25zdCBjc3ZDb250ZW50ID0gZXZlbnQudGFyZ2V0LnJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICAgICAgY29uc3QgY3N2Um93cyA9IGNzdkNvbnRlbnQuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgICAgICBjb25zdCBkaXN0cmlidXRpb25zOiB7XG4gICAgICAgICAgICAgIHdhbGxldDogc3RyaW5nO1xuICAgICAgICAgICAgICBwaGFzZTogc3RyaW5nO1xuICAgICAgICAgICAgICBjb3VudDogbnVtYmVyO1xuICAgICAgICAgICAgfVtdID0gW107XG4gICAgICAgICAgICBjc3ZSb3dzLm1hcCgocm93OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAocm93KSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0cyA9IHJvdy5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwaGFzZSA9IHBhcnRzWzBdO1xuICAgICAgICAgICAgICAgICAgY29uc3Qgd2FsbGV0ID0gcGFydHNbMV07XG4gICAgICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IHBhcnRzWzJdO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoIXBoYXNlIHx8ICF3YWxsZXQgfHwgIWNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld2Vycm9ycy5wdXNoKGAtIHNvbWV0aGluZyB3cm9uZyBhdCByb3cgaW5kZXggJHtpbmRleH1gKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2FsbGV0OiB3YWxsZXQsXG4gICAgICAgICAgICAgICAgICAgICAgcGhhc2U6IHBoYXNlLFxuICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiBwYXJzZUludChjb3VudCksXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGRpc3RyaWJ1dGlvbnMucHVzaChkKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIG5ld2Vycm9ycy5wdXNoKGAtIGVycm9yIGF0IHJvdyBpbmRleCAke2luZGV4fWApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAobmV3ZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2V0RXJyb3JzKG5ld2Vycm9ycyk7XG4gICAgICAgIHNldFVwbG9hZERpc2FibGVkKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEVycm9ycyhbXSk7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGlmIChkaXN0cmlidXRpb25GaWxlKSB7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwiZGlzdHJpYnV0aW9uXCIsIGRpc3RyaWJ1dGlvbkZpbGUpO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChcImNhcmRfaWRcIiwgZGlzdHJpYnV0aW9uQ2FyZElkIS50b1N0cmluZygpKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwiY29udHJhY3RcIiwgZGlzdHJpYnV0aW9uQ29udHJhY3QhKTtcbiAgICAgICAgZGlzdHJpYnV0aW9uUGhvdG9zLm1hcCgoZHAsIGluZGV4KSA9PiB7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGBwaG90byR7aW5kZXh9YCwgZHApO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGZpbGUgZm9ybSB1cGxvYWRlclwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBheGlvcy5wb3N0KFwiL3VwbG9hZFwiLCBmb3JtRGF0YSwge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2V0U3VjY2Vzcyh7XG4gICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICBmaWxlOiBkaXN0cmlidXRpb25GaWxlICE9IHVuZGVmaW5lZCAmJiBkaXN0cmlidXRpb25GaWxlICE9IG51bGwsXG4gICAgICAgICAgICBwaG90b3M6IGRpc3RyaWJ1dGlvblBob3Rvcy5sZW5ndGggPiAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNldERpc3RyaWJ1dGlvbkNhcmRJZCh1bmRlZmluZWQpO1xuICAgICAgICAgIHNldERpc3RyaWJ1dGlvbkNvbnRyYWN0KFwiXCIpO1xuICAgICAgICAgIHNldERpc3RyaWJ1dGlvbkZpbGUodW5kZWZpbmVkKTtcbiAgICAgICAgICBzZXRVcGxvYWREaXNhYmxlZChmYWxzZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBzZXRFcnJvcnMoW1xuICAgICAgICAgICAgYC0gU29tZXRoaW5nIHdlbnQgd3JvbmcgZHVyaW5nIHVwbG9hZDogJHtlcnIucmVzcG9uc2UuZGF0YX1gLFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIHNldFVwbG9hZERpc2FibGVkKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZGFzaGJvYXJkQ2FyZFwiPlxuICAgICAgPEg0Pk5FVyBESVNUUklCVVRJT04gUExBTjwvSDQ+XG4gICAgICA8YnIgLz5cbiAgICAgIENvbnRyYWN0Jm5ic3A7Jm5ic3A7XG4gICAgICA8aW5wdXRcbiAgICAgICAgY2xhc3NOYW1lPVwidXBsb2FkRGlzdHJpYnV0aW9uSW5wdXRcIlxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIHZhbHVlPXtkaXN0cmlidXRpb25Db250cmFjdCAhPT0gdW5kZWZpbmVkID8gZGlzdHJpYnV0aW9uQ29udHJhY3QgOiBcIlwifVxuICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldERpc3RyaWJ1dGlvbkNvbnRyYWN0KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgIC8+XG4gICAgICA8YnIgLz5cbiAgICAgIENhcmQgSUQmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtcbiAgICAgIDxpbnB1dFxuICAgICAgICBjbGFzc05hbWU9XCJ1cGxvYWREaXN0cmlidXRpb25JbnB1dCB1cGxvYWREaXN0cmlidXRpb25JbnB1dE51bWJlclwiXG4gICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICBtaW49XCIwXCJcbiAgICAgICAgdmFsdWU9e2Rpc3RyaWJ1dGlvbkNhcmRJZCAhPT0gdW5kZWZpbmVkID8gZGlzdHJpYnV0aW9uQ2FyZElkIDogXCJcIn1cbiAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXREaXN0cmlidXRpb25DYXJkSWQocGFyc2VJbnQoZS50YXJnZXQudmFsdWUpKX1cbiAgICAgIC8+XG4gICAgICA8YnIgLz5cbiAgICAgIERpc3RyaWJ1dGlvbiZuYnNwOyZuYnNwO1xuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgYWNjZXB0PVwiLmNzdlwiXG4gICAgICAgIGNsYXNzTmFtZT1cInVwbG9hZERpc3RyaWJ1dGlvbkZpbGVcIlxuICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgc2V0RGlzdHJpYnV0aW9uRmlsZShlLnRhcmdldC5maWxlcyA/IGUudGFyZ2V0LmZpbGVzWzBdIDogdW5kZWZpbmVkKVxuICAgICAgICB9XG4gICAgICAvPlxuICAgICAgPGJyIC8+XG4gICAgICBQaG90b3MmbmJzcDsmbmJzcDtcbiAgICAgIDxpbnB1dFxuICAgICAgICBtdWx0aXBsZVxuICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICBjbGFzc05hbWU9XCJ1cGxvYWREaXN0cmlidXRpb25GaWxlXCJcbiAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgc2V0RGlzdHJpYnV0aW9uUGhvdG9zKFxuICAgICAgICAgICAgZS50YXJnZXQ/LmZpbGVzXG4gICAgICAgICAgICAgID8gWy4uLmRpc3RyaWJ1dGlvblBob3RvcywgLi4uZS50YXJnZXQuZmlsZXNdXG4gICAgICAgICAgICAgIDogZGlzdHJpYnV0aW9uUGhvdG9zXG4gICAgICAgICAgKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICB7ZGlzdHJpYnV0aW9uUGhvdG9zLm1hcCgoZHApID0+IChcbiAgICAgICAgPHNwYW4ga2V5PXtkcC5uYW1lfSBjbGFzc05hbWU9XCJkaXN0cmlidXRpb25QaG90b1wiPlxuICAgICAgICAgIHtkcC5uYW1lfVxuICAgICAgICA8L3NwYW4+XG4gICAgICApKX1cbiAgICAgIDxiciAvPlxuICAgICAgPEJ1dHRvblxuICAgICAgICBjbGFzc05hbWU9XCJ1cGxvYWREaXN0cmlidXRpb25CdG5cIlxuICAgICAgICBvbkNsaWNrPXtoYW5kbGVVcGxvYWR9XG4gICAgICAgIGRpc2FibGVkPXt1cGxvYWREaXNhYmxlZH0+XG4gICAgICAgIHt1cGxvYWREaXNhYmxlZCA/IGBVcGxvYWRpbmcuLi5gIDogYFVwbG9hZGB9XG4gICAgICA8L0J1dHRvbj5cbiAgICAgIHtlcnJvcnMubWFwKChlLCBpbmRleCkgPT4gKFxuICAgICAgICA8VGV4dCBrZXk9e2BlcnJvci0ke2luZGV4fWB9IGNvbG9yPVwiZXJyb3JcIj5cbiAgICAgICAgICB7ZX1cbiAgICAgICAgPC9UZXh0PlxuICAgICAgKSl9XG4gICAgICB7c3VjY2Vzcy5zdGF0dXMgJiYgKFxuICAgICAgICA8VGV4dD5cbiAgICAgICAgICBVcGxvYWQgU3VjY2Vzc2Z1bCFcbiAgICAgICAgICB7c3VjY2Vzcy5maWxlICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIHtcIiBcIn1cbiAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICBocmVmPXtgL3Jlc291cmNlcy9EaXN0cmlidXRpb24/ZmlsdGVycy5jb250cmFjdD0ke2Rpc3RyaWJ1dGlvbkNvbnRyYWN0fSZmaWx0ZXJzLmNhcmRfaWQ9JHtkaXN0cmlidXRpb25DYXJkSWR9YH1cbiAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICAgICAgICBWSUVXIERJU1RSSUJVVElPTlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtzdWNjZXNzLnBob3RvcyAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICB7XCIgXCJ9XG4gICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgaHJlZj17YC9yZXNvdXJjZXMvRGlzdHJpYnV0aW9uUGhvdG8/ZmlsdGVycy5jb250cmFjdD0ke2Rpc3RyaWJ1dGlvbkNvbnRyYWN0fSZmaWx0ZXJzLmNhcmRfaWQ9JHtkaXN0cmlidXRpb25DYXJkSWR9YH1cbiAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICAgICAgICBWSUVXIFBIT1RPU1xuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L1RleHQ+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVXBsb2FkRGlzdHJpYnV0aW9uQ29tcG9uZW50O1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBzdHlsZWQgZnJvbSBcInN0eWxlZC1jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBCb3gsIEgyLCBINSwgVGV4dCB9IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XG5pbXBvcnQgeyBVcGxvYWREaXN0cmlidXRpb25Db21wb25lbnQgfSBmcm9tIFwiLi91cGxvYWREaXN0cmlidXRpb25cIjtcblxuY29uc3QgcGFnZUhlYWRlckhlaWdodCA9IDI4NDtcbmNvbnN0IHBhZ2VIZWFkZXJQYWRkaW5nWSA9IDc0O1xuY29uc3QgcGFnZUhlYWRlclBhZGRpbmdYID0gMjUwO1xuXG5leHBvcnQgY29uc3QgRGFzaGJvYXJkSGVhZGVyOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Qm94IHBvc2l0aW9uPVwicmVsYXRpdmVcIiBvdmVyZmxvdz1cImhpZGRlblwiIGRhdGEtY3NzPVwiZGVmYXVsdC1kYXNoYm9hcmRcIj5cbiAgICAgIDxCb3hcbiAgICAgICAgcG9zaXRpb249XCJhYnNvbHV0ZVwiXG4gICAgICAgIHRvcD17NTB9XG4gICAgICAgIGxlZnQ9ey0xMH1cbiAgICAgICAgb3BhY2l0eT17WzAuMiwgMC40LCAxXX1cbiAgICAgICAgYW5pbWF0ZT5cbiAgICAgICAgey8qIDxJbGx1c3RyYXRpb24gdmFyaWFudD1cIlJvY2tldFwiIC8+ICovfVxuICAgICAgPC9Cb3g+XG4gICAgICA8Qm94XG4gICAgICAgIHBvc2l0aW9uPVwiYWJzb2x1dGVcIlxuICAgICAgICB0b3A9ey03MH1cbiAgICAgICAgcmlnaHQ9ey0xNX1cbiAgICAgICAgb3BhY2l0eT17WzAuMiwgMC40LCAxXX1cbiAgICAgICAgYW5pbWF0ZT5cbiAgICAgICAgey8qIDxJbGx1c3RyYXRpb24gdmFyaWFudD1cIk1vb25cIiAvPiAqL31cbiAgICAgIDwvQm94PlxuICAgICAgPEJveFxuICAgICAgICBiZz1cImdyZXkxMDBcIlxuICAgICAgICBoZWlnaHQ9e3BhZ2VIZWFkZXJIZWlnaHR9XG4gICAgICAgIHB5PXtwYWdlSGVhZGVyUGFkZGluZ1l9XG4gICAgICAgIHB4PXtbXCJkZWZhdWx0XCIsIFwibGdcIiwgcGFnZUhlYWRlclBhZGRpbmdYXX0+XG4gICAgICAgIDxUZXh0IHRleHRBbGlnbj1cImNlbnRlclwiIGNvbG9yPVwid2hpdGVcIj5cbiAgICAgICAgICA8SDI+U0VJWk8uSU8gQURNSU48L0gyPlxuICAgICAgICA8L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmNvbnN0IHJlc291cmNlczogeyB0aXRsZTogc3RyaW5nOyBwYXRoOiBzdHJpbmcgfVtdID0gW1xuICB7IHRpdGxlOiBcIlRlYW1cIiwgcGF0aDogXCIvcmVzb3VyY2VzL1RlYW1cIiB9LFxuXTtcblxuY29uc3QgQ2FyZCA9IHN0eWxlZChCb3gpYFxuICBjb2xvcjogJHsoeyB0aGVtZSB9KTogc3RyaW5nID0+IHRoZW1lLmNvbG9ycy5ncmV5MTAwfTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICY6aG92ZXIge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICB9XG5gO1xuXG5DYXJkLmRlZmF1bHRQcm9wcyA9IHtcbiAgdmFyaWFudDogXCJ3aGl0ZVwiLFxuICBib3hTaGFkb3c6IFwiY2FyZFwiLFxufTtcblxuZXhwb3J0IGNvbnN0IERhc2hib2FyZDogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveD5cbiAgICAgIDxEYXNoYm9hcmRIZWFkZXIgLz5cbiAgICAgIDxCb3hcbiAgICAgICAgbXQ9e1tcInhsXCIsIFwieGxcIiwgXCItMTAwcHhcIl19XG4gICAgICAgIG1iPVwieGxcIlxuICAgICAgICBteD17WzAsIDAsIDAsIFwiYXV0b1wiXX1cbiAgICAgICAgcHg9e1tcImRlZmF1bHRcIiwgXCJsZ1wiLCBcInh4bFwiLCBcIjBcIl19XG4gICAgICAgIHBvc2l0aW9uPVwicmVsYXRpdmVcIlxuICAgICAgICBmbGV4XG4gICAgICAgIGZsZXhEaXJlY3Rpb249XCJyb3dcIlxuICAgICAgICBmbGV4V3JhcD1cIndyYXBcIlxuICAgICAgICB3aWR0aD17WzEsIDEsIDEsIDEwMjRdfT5cbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZGFzaGJvYXJkU2VjdGlvblwiPlxuICAgICAgICAgIDxVcGxvYWREaXN0cmlidXRpb25Db21wb25lbnQgLz5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICB7cmVzb3VyY2VzLm1hcCgoYm94LCBpbmRleCkgPT4gKFxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXlcbiAgICAgICAgICA8Qm94IGtleT17aW5kZXh9IHdpZHRoPXtbMSwgMSAvIDIsIDEgLyAyLCAxIC8gM119IHA9XCJsZ1wiPlxuICAgICAgICAgICAgPENhcmQgYXM9XCJhXCIgaHJlZj17Ym94LnBhdGh9PlxuICAgICAgICAgICAgICA8SDUgbXQ9XCJsZ1wiPntib3gudGl0bGV9PC9INT5cbiAgICAgICAgICAgIDwvQ2FyZD5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKSl9XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDtcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IEN1c3RvbURhc2hib2FyZCBmcm9tICcuLi9zcmMvZGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DdXN0b21EYXNoYm9hcmQgPSBDdXN0b21EYXNoYm9hcmQiXSwibmFtZXMiOlsiYmluZCIsInJlcXVpcmUkJDAiLCJ1dGlscyIsImJ1aWxkVVJMIiwiSW50ZXJjZXB0b3JNYW5hZ2VyIiwibm9ybWFsaXplSGVhZGVyTmFtZSIsImlzQWJzb2x1dGVVUkwiLCJjb21iaW5lVVJMcyIsInJlcXVpcmUkJDEiLCJidWlsZEZ1bGxQYXRoIiwicmVxdWlyZSQkMiIsInJlcXVpcmUkJDMiLCJyZXF1aXJlJCQ0IiwicmVxdWlyZSQkNSIsInJlcXVpcmUkJDYiLCJyZXF1aXJlJCQ3IiwicmVxdWlyZSQkOCIsInJlcXVpcmUkJDkiLCJyZXF1aXJlJCQxMCIsIkF4aW9zRXJyb3IiLCJkZWZhdWx0cyIsInRyYW5zZm9ybURhdGEiLCJpc0NhbmNlbCIsImRpc3BhdGNoUmVxdWVzdCIsIm1lcmdlQ29uZmlnIiwidmFsaWRhdG9ycyIsInZhbGlkYXRvciIsIkF4aW9zIiwiYXhpb3MiLCJyZXF1aXJlJCQxMSIsInJlcXVpcmUkJDEyIiwiYXhpb3NNb2R1bGUiLCJheGlvc18xIiwiVXBsb2FkRGlzdHJpYnV0aW9uQ29tcG9uZW50IiwicHJvcHMiLCJfdXNlU3RhdGUiLCJ1c2VTdGF0ZSIsInN0YXR1cyIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInN1Y2Nlc3MiLCJzZXRTdWNjZXNzIiwiX3VzZVN0YXRlMyIsIl91c2VTdGF0ZTQiLCJ1cGxvYWREaXNhYmxlZCIsInNldFVwbG9hZERpc2FibGVkIiwiX1JlYWN0JHVzZVN0YXRlIiwiUmVhY3QiLCJfUmVhY3QkdXNlU3RhdGUyIiwiZXJyb3JzIiwic2V0RXJyb3JzIiwiX1JlYWN0JHVzZVN0YXRlMyIsInVuZGVmaW5lZCIsIl9SZWFjdCR1c2VTdGF0ZTQiLCJkaXN0cmlidXRpb25Db250cmFjdCIsInNldERpc3RyaWJ1dGlvbkNvbnRyYWN0IiwiX1JlYWN0JHVzZVN0YXRlNSIsIl9SZWFjdCR1c2VTdGF0ZTYiLCJkaXN0cmlidXRpb25DYXJkSWQiLCJzZXREaXN0cmlidXRpb25DYXJkSWQiLCJfUmVhY3QkdXNlU3RhdGU3IiwiX1JlYWN0JHVzZVN0YXRlOCIsImRpc3RyaWJ1dGlvbkZpbGUiLCJzZXREaXN0cmlidXRpb25GaWxlIiwiX1JlYWN0JHVzZVN0YXRlOSIsIl9SZWFjdCR1c2VTdGF0ZTEwIiwiZGlzdHJpYnV0aW9uUGhvdG9zIiwic2V0RGlzdHJpYnV0aW9uUGhvdG9zIiwiaGFuZGxlVXBsb2FkIiwiX3JlZiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsIm1hcmsiLCJfY2FsbGVlMiIsIm5ld2Vycm9ycyIsIl9uZXdlcnJvcnMiLCJyZWFkZXIiLCJmb3JtRGF0YSIsIndyYXAiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJwcmV2IiwibmV4dCIsInB1c2giLCJsZW5ndGgiLCJGaWxlUmVhZGVyIiwicmVhZEFzVGV4dCIsIm9ubG9hZCIsIl9yZWYyIiwiX2NhbGxlZSIsImV2ZW50IiwiX2V2ZW50JHRhcmdldCIsImNzdkNvbnRlbnQiLCJjc3ZSb3dzIiwiZGlzdHJpYnV0aW9ucyIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJ0YXJnZXQiLCJyZXN1bHQiLCJ0b1N0cmluZyIsInNwbGl0IiwibWFwIiwicm93IiwiaW5kZXgiLCJwYXJ0cyIsInBoYXNlIiwid2FsbGV0IiwiY291bnQiLCJjb25jYXQiLCJkIiwicGFyc2VJbnQiLCJfdW51c2VkIiwic3RvcCIsIl94IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJGb3JtRGF0YSIsImFwcGVuZCIsImRwIiwiY29uc29sZSIsImxvZyIsInBvc3QiLCJoZWFkZXJzIiwiZmlsZSIsInBob3RvcyIsInQwIiwicmVzcG9uc2UiLCJkYXRhIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsIkg0IiwidHlwZSIsInZhbHVlIiwib25DaGFuZ2UiLCJlIiwibWluIiwiYWNjZXB0IiwiZmlsZXMiLCJtdWx0aXBsZSIsIl9lJHRhcmdldCIsIl90b0NvbnN1bWFibGVBcnJheSIsImtleSIsIm5hbWUiLCJCdXR0b24iLCJvbkNsaWNrIiwiZGlzYWJsZWQiLCJUZXh0IiwiY29sb3IiLCJGcmFnbWVudCIsImhyZWYiLCJwYWdlSGVhZGVySGVpZ2h0IiwicGFnZUhlYWRlclBhZGRpbmdZIiwicGFnZUhlYWRlclBhZGRpbmdYIiwiRGFzaGJvYXJkSGVhZGVyIiwiQm94IiwicG9zaXRpb24iLCJvdmVyZmxvdyIsInRvcCIsImxlZnQiLCJvcGFjaXR5IiwiYW5pbWF0ZSIsInJpZ2h0IiwiYmciLCJoZWlnaHQiLCJweSIsInB4IiwidGV4dEFsaWduIiwiSDIiLCJyZXNvdXJjZXMiLCJ0aXRsZSIsInBhdGgiLCJDYXJkIiwic3R5bGVkIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbCIsInRoZW1lIiwiY29sb3JzIiwiZ3JleTEwMCIsImRlZmF1bHRQcm9wcyIsInZhcmlhbnQiLCJib3hTaGFkb3ciLCJEYXNoYm9hcmQiLCJtdCIsIm1iIiwibXgiLCJmbGV4IiwiZmxleERpcmVjdGlvbiIsImZsZXhXcmFwIiwid2lkdGgiLCJib3giLCJwIiwiYXMiLCJINSIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyIsIkN1c3RvbURhc2hib2FyZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFFQSxJQUFBQSxNQUFjLEdBQUcsU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRTtFQUM1QyxFQUFFLE9BQU8sU0FBUyxJQUFJLEdBQUc7RUFDekIsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDM0MsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUMxQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0IsS0FBSztFQUNMLElBQUksT0FBTyxFQUFF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
