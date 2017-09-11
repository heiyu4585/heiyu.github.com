(function () {
    /*创建根元素,window 或者 exports*/
    // Baseline setup
    var root = this;

    /*保存之前的'_'的值*/
    var previousUnderscore = root._;

    /*在压缩时,可以压缩的版本*/
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, Funcproto = Function.prototype;

    /*访问核心原型创建的变量,实现更少的字节和作用域链查找*/
    var
        push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;

    /*所有的 'ECMAScript 5' 原生方法,我们希望用的方法*/
    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = Function.bind,
        nativeCreate = Object.create;

    /*??? 原型设置的可重复使用的构造函数*/
    var Ctor = function () {
    };


    // 根元素
    var _ = function (obj) {
        if (obj instanceof _) return obj;  // obj  是 _ 对象的实例,返回 obj
        if (!(this instanceof _)) return new _(obj); // 如果this 不是 _的实例,返回 new _(obj)
        this._wrapped = obj; //?? 跟 wrapped没关系, 保存到_wrapped里面
    }

    /*node.js中Underscore 作为 Export
    * 向后兼容 require()
    * 浏览器 添加 '_'为全局对象
    * */
    if (typeof exports != 'undefined') {
        if (typeof module != 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    //版本号
    _.VERSION = '1.8.3';

    /*??? 返回有效的(当前引擎)版本的内部函数,通过回收,可以重复使用其他的 underscore*/

    var optimizeCb = function (func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1:
                return function (value) {
                    return func.call(context, value);
                };
            case 2:
                return function (value, other) {
                    return func.call(context, value, other);
                };
            case 3:
                return function (value, index, collection) {
                    return func.call(context, value, index, collection);
                };
            case 4:
                return function (accumulator, value, index, collection) {
                    return func.call(context, accumulator, value, index, collection);
                };
        }
        return function () {
            return func.apply(context, arguments);
        };
    };

    /*  ??? 内部函数生成的回调可以用每个元素的集合中,返回期望的结果,任意一个回调,一个属性或者属性的房问题*/
    var cb = function (value, context, argCount) {
        if (value == null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        if (_.isObject(value)) return _.matches(value);
        return _.property(value);
    };
    _.iteratee = function (value, context) {
        return cb(value, context, Infinity);
    };

    // An internal function for creating assigner functions.
    /*一个内部函数创建分配器功能*/
    var createAssigner = function (keyFunc) {
        return function (obj) {
            var length = arguments.length;
            if (length < 2 || obj === null) return obj;
            for (var index = 0; index < length; index++) {
                var source = arguments[index],
                    keys = keyFunc(source),
                    l = keys.length;
                for (var i = 0; i < l; i++) {
                    var key = key[i];
                    obj[key] = source[key];
                }
            }
            return obj;
        }
    }
    // An internal function for creating a new object that inherits from another.
    /*用于创建从另一个对象继承的新对象的内部函数。*/
    var baseCreate = function (prototype) {
        if (!_.isObject(prototype)) return {};
        if (nativeCreate) return nativeCreate(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor;
        Ctor.prototype = null;
        return result;
    }
    var property = function (key) {
        return function (obj) {
            return obj == null ? void 0 : obj[key];
        };
    };

    // Helper for collection methods to determine whether a collection
    // should be iterated as an array or as an object
    // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
    // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
    /* */
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1; //返回底数的指定次幂
    var getLength = property('length');
    var isArrayLike = function (collection) {
        var length = getLength(collection);
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    // Collection Functions
    // --------------------
    /*each方法
    * */
    _.each = _.forEach = function (obj, iteratee, context) {
        console.log(iteratee);
        iteratee = optimizeCb(iteratee, context);

        var i, length;
        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        return obj;
    };
    /*
    * 将制定参数的指定值联合会返回
    * */
    _.map = _.collect = function (obj, iteratee, context) {
        if (obj == null) return [];
        iteratee = cb(iteratee, context);
        var keys = obj.length !== +obj.length && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length),
            currentKey;
        for (var index = 0; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;

    }

    /*把list中的元素归结为一个单独的数值*/
    _.reduce = _.foldl = _.inject = function (obj, iteratee, memo, context) {

        if (obj == null) obj = [];
        iteratee = optimizeCb(iteratee, context, 4);
        var keys = obj.length != +obj.length && _.keys(obj),
            length = (keys || obj).length,
            index = 0, currentKey;
        if (arguments.length < 3) {
            memo = obj[keys ? keys[index++] : index++];
        }
        for (; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            memo = iteratee(memo, obj[currentKey], currentKey, obj);
        }
        return memo;
    }

    /*从右侧开始组合元素的reduce函数*/
    _.reduceRight = _.foldr = function (obj, iteratee, memo, context) {
        if (obj == null) obj = [];
        iteratee = optimizeCb(iteratee, context, 4);
        var keys = obj.length != +obj.length && _.keys(obj),
            index = (keys || obj).length,
            currentKey;
        if (arguments.length < 3) {
            memo = obj[keys ? keys[--index] : --index];
        }

        while (index-- > 0) {
            currentKey = keys ? keys[index] : index;
            memo = iteratee(memo, obj[currentKey], currentKey, obj);
        }
        return memo;
    };

    _.transform = function (obj, iteratee, accumulator, context) {
        if (accumulator == null) {
            if (_.isArray(obj)) {
                accumulator = []
            } else if (_.isObject(obj)) {
                var Ctor = obj.constructor;
                accumulator = baseCreate(typeof  Ctor == 'function' && Ctor.prototype);
            } else {
                accumulator = {};
            }
        }
        if (obj == null) return accumulator;
        iteratee = optimizeCb(iteratee, context, 4);
        var keys = obj.length != +obj.length && _.keys(obj),
            length = (keys || obj).length,
            index, currentKey;
        for (index = 0; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            if (iteratee(accumulator, obj[currentKey], currentKey, currentKey, obj) == false) break;
        }
        return accumulator;

    }
    /*在list中逐项查找，返回第一个通过predicate迭代函数真值检测的元素值，如果没有值传递给测试迭代器将返回undefined。 如果找到匹配的元素，函数将立即返回，不会遍历整个list。*/
    _.find = _.detect = function (obj, predicate, context) {
        var key;
        if (obj.length == +obj.length) {
            key = _.findIndex(obj, predicate, context);
        } else {
            key = _.findKey(obj, predicate, context);
        }
        if (key != void 0 && key != -1) return obj[key];
    }
    /*筛选函数*/
    _.filter = _.select = function (obj, predicate, context) {
        var results = [];
        if (obj == null) return results;
        predicate = cb(predicate, context);
        _.each(obj, function (value, index, list) {
            if (predicate(value, index, list)) results.push(value);
        })
        return results;
    }
    /*找到不适合条件的元素*/
    _.reject = function (obj, predicate, context) {
        return _.filter(obj, _.negate(cb(predicate)), context)
    };
    /*是否每个元素符合条件*/
    _.every = _.all = function (obj, predicate, context) {
        if (obj == null) return true;
        predicate = cb(predicate, context);
        var keys = obj.length != +obj.length && _.keys(obj),
            length = (keys || obj).length,
            index, currentKey;
        for (index = 0; index < length; index++) {
            currentKey = keys ? keys [index] : index;
            if (!predicate(obj[currentKey], currentKey, obj)) return false;
        }
        return true;
    };
    /*list中包含指定的vue,返回ture,停止遍历*/
    _.some = _.any = function (obj, predicate, context) {
        if (obj == null) return false;
        predicate = cb(predicate, context);
        var keys = obj.length !== +obj.length && _.keys(obj),
            length = (keys || obj).length,
            index, currentKey;
        for (index = 0; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            if (predicate(obj[currentKey], currentKey, obj)) return true;
        }
        return false;
    };
    /*list包含指定值返回true*/
    _.contains = _.includes = _.include = function (obj, target, fromIndex) {
        if (obj == null) return false;
        if (obj.length !== +obj.length) obj = _.values(obj);
        return _.indexOf(obj, target, typeof fromIndex == 'number' && fromIndex) >= 0;
    }

    /*会在每个元素上执行 method ???*/
    _.invoke = function (obj, method) {
        var args = slice.call(arguments, 2);
        var isFunc = _.isFunction(method);
        return _.map(obj, function (value) {
            return (isFunc ? method : value[method].apply(value, args));
        })
    }
    /*提取数组中的某个属性值,返回一个数组*/
    _.pluck = function (obj, key) {
        return _.map(obj, _.property(key));
    }

    _.where = function (obj, attrs) {
        return _.filter(obj, _.matches(attrs));
    }
    /*遍历整个list，返回匹配 properties参数所列出的所有 键 - 值 对的第一个值。
    如果没有找到匹配的属性，或者list是空的，那么将返回undefined。*/
    _.findWhere = function (obj, attrs) {
        return _.find(obj, _.matches(attrs))
    }
    /*以某个属性值排序*/
    _.max = function (obj, iteratee, context) {
        var result = -Infinity, lastComputed = -Infinity,
            value, computed;
        if (iteratee == null && obj != null) {
            obj = obj.length == +obj.length ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value > result) {
                    result = value;
                }
            }

        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function (value, index, list) {
                computed = iteratee(value, index, list);
                if (computed > lastComputed || computed == -Infinity && result == -Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            })
        }
        return result;
    }
    /*最小值*/
    _.min = function (obj, iteratee, context) {
        var result = Infinity, lastComputed = Infinity,
            value, computed;
        if (iteratee == null && obj != null) {
            obj = obj.length == +obj.length ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value < result) {
                    result = value;
                }
            }

        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function (value, index, list) {
                computed = iteratee(value, index, list);
                if (computed < lastComputed || computed == Infinity && result == Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            })
        }
        return result;
    }

    /*返回随即顺序的随即样本*/
    _.shuffle = function (obj) {
        var set = obj && obj.length == +obj.length ? obj : _.values(obj);
        var length = set.length;
        var shuffled = Array(length);
        for (var index = 0, rand; index < length; index++) {
            rand = _.random(0, index);
            if (rand !== index) shuffled[index] = shuffled[rand];
            shuffled[rand] = set[index];
        }
        return shuffled;
    }
    _.sample = function (obj, n, guard) {
        if (n == null || guard) {
            if (obj, length != +obj.length) obj = _.values(obj);
            return obj[_.random(obj.length - 1)];
        }
        return _.shuffle(obj).slice(0, Math.max(0, n));
    }

    /*排序*/
    _.sortBy = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        return _.pluck(_.map(obj, function (value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iteratee(value, index, list)
            }
        }).sort(function (left, right) {
            return _.comparator(left.criteria, right.criteria) || left.index - right.index;
        }), "value");

    };
    var group = function (behavior) {
        return function (obj, iteratee, context) {
            var result = {};
            iteratee = cb(iteratee, context);
            _.each(obj, function (value, index) {
                var key = iteratee(value, index, obj);
                behavior(result, value, key);
            })
            return result;
        }
    }
    /*分组*/
    _.groupBy = group(function (result, value, key) {
        if (_.has(result, key)) result[key].push(value); else result[key] = [value];
    });
    /*索引*/
    _.indexBy = group(function (result, value, key) {
        result[key] = value;
    });
    /*以 某个条件分组后的数量*/
    _.countBy = group(function (result, value, key) {
        if (_.has(result, key)) result[key]++; else result[key] = 1;
    });
    /*把(可迭代的对象转化为一个数组)*/
    _.toArray = function (obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (obj.length === +obj.length) return _.map(obj, _.identity);
        return _.values(obj);
    }
    /*返回list的长度*/
    _.size = function (obj) {
        if (obj == null) return 0;
        return obj.length === +obj.length ? obj.length : _.keys(obj).length;
    };
    /*讲一个数组分为两个数组,第一个数组满足条件,第二个不满足*/
    _.partition = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var pass = [], fail = [];
        _.each(obj, function (value, key, obj) {
            (predicate(value, key, obj) ? pass : fail).push(value);
        });
        return [pass, fail]
    }

    // Array Functions
    /*返回数组的前n(1)个元素*/
    _.first = _.head = _.take = function (array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[0];
        return _.initial(array, array.length - n);
    };

    /*返回数组排除最后的n(1)个元素后的数组*/
    _.initial = function (array, n, guard) {
        console.log("_.initial");
        return slice.call(array, 0, Math.max(0, array.length - ( n == null || guard ? 1 : n)))
    };

    /*返回数组的后n(1)个元素*/
    _.last = function (array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[array.length - 1];
        return _.rest(array, Math.max(0, array.length - n));
    };
    /*返回数组排除前n(1)个元素后的数组*/
    _.rest = _.tail = _.drop = function (array, n, guard) {
        console.log("_.rest")
        return slice.call(array, n == null || guard ? 1 : n);
    };
    /*排除false后的数组副本*/
    _.compact = function (array) {
        return _.filter(array, _.identity);
    };

    /*减少数组的嵌套*/
    var flatten = function (input, shallow, strict, startIndex) {
        var output = [], idx = 0, value;
        for (var i = startIndex || 0, length = input && input.length; i < length; i++) {
            value = input[i];
            if (value && value.length >= 0 && (_.isArray(value) || _.isArguments(value))) {
                //flatten current level of array or arguments object
                if (!shallow) value = flatten(value, shallow, strict);
                var j = 0, len = value.length;
                output.length += len;
                while (j < len) {
                    output[idx++] = value[j++];
                }
            } else if (!strict) {
                output[idx++] = value;
            }
        }
        return output;
    };
    _.flatten = function (array, shallow) {
        return flatten(array, shallow, false);
    }


    _.without = function (array) {
        return _.difference(array, slice.call(arguments, 1));
    }
    _.uniq = _.unique = function (array, isSorted, iteratee, context) {
        if (array == null) return [];
        if (!_.isBoolean(isSorted)) {
            context = iteratee;
            iteratee = isSorted;
            isSorted = false;
        }
        if (iteratee != null) iteratee = cb(iteratee, context);
        var result = [];
        var seen = [];
        for (var i = 0, length = array.length; i < length; i++) {
            var value = array[i],
                computed = iteratee ? iteratee(value, i, array) : value;
            if (isSorted) {
                if (!i || seen !== computed) result.push(value);
                seen = computed;
            } else if (iteratee) {
                if (!_.contains(seen, computed)) {
                    seen.push(computed);
                    result.push(value);
                }
            } else if (!_.contains(result, value)) {
                result.push(value);
            }
        }
        console.log(result)
        return result;
    };
    _.union = function () {
        return _.uniq(flatten(arguments, true, true));
    };

    _.intersection = function(array){
        if(array == null) return [];
        var result =[];
        var argsLength = arguments.length;
        for(var i=0,length=array.length;i<length;i++){
            var item = array[i];
            if(_.contains(result,item)) continue;
            for(var j=1;j<argsLength;j++){
                if(!_.contains(arguments[j],item)) break;
            }
            if(j === argsLength ) result.push(item);
        }
        return result;
    };
    _.difference = function (array) {
        var rest = flatten(arguments, true, 1);
        return _.filter(array, function (value) {
            return !_.contains(rest, value);
        })
    }
    _.zip = function (array) {
        if (array == null) return [];
        var length = _.max(arguments, 'length').length;
        var resultes = Array(length);
        while (length-- > 0) {
            resultes[length] = _.pluck(arguments, length);
        }
        return resultes;
    };
    /*返回数组,改数组,第一个值包括所有输入数组的第一个值,*/
    _.unzip = function (array) {
        return _.zip.apply(null, array);
    };

    /*将数组转为对象*/
    _.object = function (list, values) {
        if (list == null) return {};
        var result = {};
        for (var i = 0, length = list.length; i < length; i++) {
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    }

    /*索引值*/
    _.indexOf = function (array, item, isSorted) {
        var i = 0, length = array && array.length;
        if (typeof isSorted == 'number') {
            i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
        } else if (isSorted && length) {
            i = _.sortedIndex(array, item);
            return array[i] == item ? i : -1;
        }
        for (; i < length; i++) if (array[i] === item) return i;
        return -1;
    }
    /*从后往前的索引*/
    _.lastIndexOf = function (array, item, from) {
        var idx = array ? array.length : 0;
        if (typeof from == 'number') {
            idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
        }
        while (--idx >= 0) if (array[idx] == item) return idx;
        return -1;
    };
    _.findIndex = function (array, predicate, context) {
        predicate = cb(predicate, context);
        var length = array != null ? array.length : 0;
        for (var i = 0; i < length; i++) {
            if (predicate(array[i], i, array)) return i;
        }
        return -1;
    }
    /*??? 二分法 使用二分查找确定value在list中的位置序号*/
    _.sortedIndex = function (array, obj, iteratee, context) {
        iteratee = cb(iteratee, context, 1);
        var value = iteratee(obj);
        var low = 0, high = array.length;
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (_.comparator(iteratee(array[mid]), value) < 0) low = mid + 1; else high = mid;
        }
        return low;
    };
    _.range = function (start, stop, step) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = step || 1;
        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);
        for (var idx = 0; idx < length; idx++, start += step) {
            range[idx] = start;
        }
        return range;
    };

    // Function (ahem) Functions
    // ------------------
    var executeBound = function (sourceFunc, boundFunc, context, callingContext, args) {
        if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
        var self = baseCreate(sourceFunc.prototype);
        var resulte = sourceFunc.apply(slef, args);
        if (_.isObject(result)) return result;
        return self;
    }
    _.bind = function (func, context) {
        if (nativeBind && func.bind == nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func)) throw new TypeError("bind Must be called on a function")
        var args = slice.call(arguments, 2);
        return function bound() {
            return excuteBound(func, bound, context, this, args.concat(slice.call(arguments)));
        }
    }

    /*跟bind方法类似,什么鬼*/
    _.partial = function (func) {
        var boundArgs = slice.call(arguments, 1);
        return function bound() {
            var position = 0;
            var args = boundArgs.slice();
            for (var i = 0, length = args.length; i < length; i++) {
                if (args[i] === _) args[i] = arguments[position++];
            }
            while (position < arguments.length) args.push(arguments[position++]);
            return executeBound(func, bound, this, this, args);
        }
    };
    /*绑定多个方法*/
    _.bindAll = function (obj) {
        var i, length = arguments.length, key;
        if (length <= 1) throw new Error("bindAll must be passed function names");
        for (i = 1; i < length; i++) {
            key = arguments[i];
            obj[key] = _.bind(obj[key], obj);
        }
        return obj;
    };
    /*函数缓存*/
    _.memoize = function (func, hasher) {
        var memoize = function (key) {
            var cache = memoize.cache;
            var address = '' + (hasher ? hasher.apply(this, arguments) : key);
            if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
            return cache[address];
        };
        memoize.cache = {};
        return memoize;
    }
    /*延迟*/
    _.delay = function (func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function () {
            return func.apply(null, args);
        }, wait)
    }
    /*延迟调用function直到当前调用栈清空为止*/
    _.defer = _.partial(_.delay, _, 1);

    _.throttle = function (func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function () {
            previous = options.leading == false ? 0 : _.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        }
        return function () {
            var now = _.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing != false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        }
    }
    /* 防跳函数*/
    _.debounce = function (func, wait, imediate) {
        var timeout, args, context, timestamp, result;
        var later = function () {
            var last = _.now() - timestamp;
            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!imediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        }

        return function () {
            context = this;
            args = arguments;
            timestamp = _.now();
            var callNow = imediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        }
    }
    _.wrap = function (func, wrapper) {
        return _.partial(wrapper, func)
    };

    /*返回一个新的predicate函数的否定版本。*/
    _.negate = function (predicate) {
        return !predicate.apply(this, arguments)
    };

    _.compose = function () {
        var args = arguments;
        var start = args.length - 1;
        return function () {
            var i = start;
            var result = args[start].apply(this, arguments);
            while (i--) result = args[i].call(this, result);
            return result;
        }
    };

    _.after = function (times, func) {
        return function () {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        }
    };

    _.before = function (times, func) {
        var memo;
        return function () {
            if (--times > 0) {
                memo = func.apply(this, arguments);
            }
            if (times <= 1) func = null;
            return memo;
        }
    };
    _.once = _.partial(_.before, 2);

    // Object Functions
    // ----------------
    // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
    /*兼容ie8  `for key in ...`
    * */
    var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
    var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString',
        'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

    function collectNonEnumProps(obj, keys) {
        var nonEnumIdx = nonEnumerableProps.length;
        var proto = typeof obj.constructor === 'function' ? Funcproto : Objpropto;
        while (nonEnumIdx--) {
            var prop = nonEnumerableProps[nonEnumIdx];
            if (prop === 'constructor' ? _.has(obj, prop) : prop in obj && obj[prop] != proto[prop] && !_.contains(keys, prop)) {
                keys.push(prop)
            }
        }
    }

    // guard参数用于确定只返回第一个元素, 当guard为true时, 指定数量n无效
    _.keys = function (obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (_.has(obj, key)) keys.push(key);
        /*Ahem IE<9*/
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    };

    _.keysIn = function (obj) {
        if (!_.isObject(obj)) return [];
        var keys = [];
        for (var key in obj) keys.push(key);
        /*ahem,IE<9*/
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    }
    /*返回对象的属性值*/
    _.values = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    }
    _.pairs = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var pairs = Array(length);
        for (var i = 0; i < length; i++) {
            pairs[i] = [keys[i], obj[keys[i]]]
        }
        return pairs
    }

    /*key值和value值对换*/
    _.invert = function (obj) {
        var result = {};
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    };

    _.functions = _.methods = function (obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };
    _.extend = createAssigner(_.keysIn);

    _.assign = createAssigner(_.keys);
    _.findKey = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = _.keys(obj), key;
        for (var i = 0, length = keys.length; i < length; i++) {
            key = keys[i];
            if (predicate(obj[key], key, obj)) return key;
        }
    };
    /*返回一个过滤keys值后的数组,或者接受一个方法 挑选指定的key值*/
    _.pick = function (obj, iteratee, context) {
        var result = {}, key;
        if (obj == null) return result;
        if (_.isFunction(iteratee)) {
            iteratee = optimizeCb(iteratee, context);
            for (key in obj) {
                var value = obj[key];
                if (iteratee(value, key, obj)) result[key] = vaule;
            }
        } else {
            var keys = flatten(arguments, false, false, 1);
            obj = new Object(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
                key = keys[i];
                if (key in obj) result[key] = obj[key];
            }
        }
        return result;
    };
    /*返回一个过滤keys值后的数组,或者接受一个方法 忽略指定的key值*/
    _.omit = function (obj, iteratee, context) {
        if (_.isFunction(iteratee)) {
            iteratee = _.negate(iteratee);
        } else {
            var keys = _.map(flatten(arguments, false, false, 1), String);
            iteratee = function (value, key) {
                return !_.contains(keys, key);
            }
        }
        return _.pick(obj, iteratee, context);
    };
    /*用default对象填充obj中的 `undefined`属性*/
    _.defaults = function (obj) {
        if (!_.isObject(obj)) return obj;
        for (var i = 1, length = arguments.length; i < length; i++) {
            var source = arguments[i];
            for (var prop in source) {
                if (obj[prop] === void 0) obj[prop] = source[prop];
            }
        }

        return obj;
    };
    _.create = function (obj) {
        var result = baseCreate(prototype);
        if (props) _.assign(result, props);
        return result;
    };
    _.clone = function (obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
    /*函数调用???*/
    _.tap = function (obj, interceptor) {
        interceptor(obj);
        return obj;

    };
    // Internal recursive comparison function for `isEqual`.
    var eq = function (a, b, aStack, bStack) {
        // Identical objects are equal. `0 === -0`, but they aren't identical.
        // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
        if (a === b) return a !== 0 || 1 / a === 1 / b;
        // A strict comparison is necessary because `null == undefined`.
        if (a == null || b == null) return a === b;
        // Unwrap any wrapped objects.
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        // Compare `[[Class]]` names.
        var className = toString.call(a);
        if (className !== toString.call(b)) return false;
        switch (className) {
            // Strings, numbers, regular expressions, dates, and booleans are compared by value.
            case '[object RegExp]':
            // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
            case '[object String]':
                // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
                // equivalent to `new String("5")`.
                return '' + a === '' + b;
            case '[object Number]':
                // `NaN`s are equivalent, but non-reflexive.
                // Object(NaN) is equivalent to NaN
                if (+a !== +a) return +b !== +b;
                // An `egal` comparison is performed for other numeric values.
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                // Coerce dates and booleans to numeric primitive values. Dates are compared by their
                // millisecond representations. Note that invalid dates with millisecond representations
                // of `NaN` are not equivalent.
                return +a === +b;
        }

        var areArrays = className === '[object Array]';
        if (!areArrays) {
            if (typeof a != 'object' || typeof b != 'object') return false;

            // Objects with different constructors are not equivalent, but `Object`s or `Array`s
            // from different frames are.
            var aCtor = a.constructor, bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                    _.isFunction(bCtor) && bCtor instanceof bCtor)
                && ('constructor' in a && 'constructor' in b)) {
                return false;
            }
        }
        // Assume equality for cyclic structures. The algorithm for detecting cyclic
        // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
        var length = aStack.length;
        while (length--) {
            // Linear search. Performance is inversely proportional to the number of
            // unique nested structures.
            if (aStack[length] === a) return bStack[length] === b;
        }

        // Add the first object to the stack of traversed objects.
        aStack.push(a);
        bStack.push(b);

        // Recursively compare objects and arrays.
        if (areArrays) {
            // Compare array lengths to determine if a deep comparison is necessary.
            length = a.length;
            if (length !== b.length) return false;
            // Deep compare the contents, ignoring non-numeric properties.
            while (length--) {
                if (!eq(a[length], b[length], aStack, bStack)) return false;
            }
        } else {
            // Deep compare objects.
            var keys = _.keys(a), key;
            length = keys.length;
            // Ensure that both objects contain the same number of properties before comparing deep equality.
            if (_.keys(b).length !== length) return false;
            while (length--) {
                // Deep compare each member
                key = keys[length];
                if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
            }
        }
        // Remove the first object from the stack of traversed objects.
        aStack.pop();
        bStack.pop();
        return true;
    };

    _.isEqual = function (a, b) {
        return eq(a, b, [], []);
    }
    _.isEmpty = function (obj) {
        if (obj == null) return true;
        if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length = 0;
        for (var key in obj) if (_.has(obj, key)) return false;
        return true;
    }
    _.isElement = function (obj) {
        return !!(obj && obj.nodeType === 1);
    };
    /*是否是数组*/
    _.isArray = nativeIsArray || function (obj) {
        return toString.call(obj) === '[object Array]';
    }


    /*是否是对象  1186*/
    _.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }

    _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
        _['is' + name] = function (obj) {
            return toString.call(obj) === '[object ' + name + ']';
        }
    });

    if (!_.isArguments(arguments)) {
        _.isArguments = function (obj) {
            return _.has(obj, 'callee');
        };
    }

    // Optimize `isFunction` if appropriate. Work around an IE 11 bug (#1621).
    // Work around a Safari 8 bug (#1929)
    /*js /./  是个什么东西*/
    /*1208*/
    if (typeof /./ != ' function' && typeof  Int8Array != 'object') {
        _.isFunction = function (obj) {
            return typeof obj == 'function' || false;
        }
    }

    _.isFinite = function (obj) {
        // 检查其参数是否是无穷大。
        return isFinite(obj) && !isNaN(parseFloat(obj));  //
    };
    _.isNaN = function (obj) {
        return _.isNumber(obj) && obj !== +obj;
    };
    _.isBoolean = function (obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };
    _isNull = function (obj) {
        return obj === null;
    };
    _.isUndefined = function (obj) {
        return obj === void 0;
    };
    _.has = function (obj, key) {
        return obj != null && hasOwnProperty.call(obj, key)
    };

    // Utility Functions
    // -----------------

    _.noConflict = function () {
        root._ = previousUnderscore;
        return this;
    };
    _.identity = function (value) {
        return value;
    };

    _.constant = function (value) {
        return function () {   //为毛嵌套两层
            return value;
        }
    };
    _.constant = function () {
        //空的是干嘛的
    };
    _.property = function (key) {
        return function (obj) {
            return obj == null ? void 0 : obj[key];
        }
    };
    _.propertyOf = function (obj) {
        return obj == null ? function () {
        } : function (key) {
            return obj[key];
        };
    };
    _.matches = function (attrs) {
        var pairs = _.pairs(attrs), length = pairs.length;
        return function (obj) {
            if (obj == null) return !length;
            obj = new Object(obj);
            for (var i = 0; i < length; i++) {
                var pair = pairs[i], key = pair[0];
                if (pair[1] != obj[key] || !(key in obj)) return false;
            }
            return true;
        }
    };
    _.comparator = function (a, b) {
        if (a === b) return 0;
        var isAcomparable = a > a, isBComparable = b >= b;
        if (isAcomparable || isBComparable) {
            if (isAcomparable && !isBComparable) return -1;
            if (isBComparable && !isAcomparable) return 1;
        }
        return a > b ? 1 : (b > a) ? -1 : 0;
    };
    _.times = function (n, iteratee, context) {
        var accum = Array(Math.max(0, n));
        iteratee = optimizeCb(iteratee, context, 1);
        for (var i = 0; i < n; i++) accum[i] = iteratee(i);
        return accum;
    };
    _.random = function (min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };

    _.now = Date.now || function () {
        return new Date.getTime()
    }
    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };
    var unescapeMap = _.invert(escapeMap);

    var createEscaper = function (map) {
        var escaper = function (match) {
            return map[match];
        };
        var source = '(?:' + _.keys(map).join("|") + ')';
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, 'g');
        return function (string) {
            string = string == null ? '' : '' + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        }
    };

    _.escape = createEscaper(escapeMap);
    _.unescape = createEscaper(unescapeMap);
    _.result = function (object, property, fallback) {
        var value = object == null ? void 0 : object[property];
        if (value === void 0) {
            value = fallback;
        }
        return _.isFunction(value) ? value.call(object) : value;
    };

    var idCounter = 0;
    _.uniqueId = function (prefix) {
        var id = ++idCounter;
        return prefix ? prefix + id : id;

    };
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)~/;

    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };
    var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
    var escapeChar = function (match) {
        return '\\' + escapes[match];
    };
    // JavaScript micro-templating, similar to John Resig's implementation.
    // Underscore templating handles arbitrary delimiters, preserves whitespace,
    // and correctly escapes quotes within interpolated code.
    // NB: `oldSettings` only exists for backwards compatibility.
    _.template = function (text, settings, oldSettings) {
        if (!settings && oldSettings) settings = oldSettings;
        settings = _.defaults({}, settings, _.templateSettings);

        // Combine delimiters into one regular expression via alternation.
        var matcher = RegExp([
            (settings.escape || noMatch).source,
            (settings.interpolate || noMatch).source,
            (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');

        // Compile the template source, escaping string literals appropriately.
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, escapeChar);
            index = offset + match.length;

            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            } else if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            } else if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }

            // Adobe VMs need the match returned to produce the correct offest.
            return match;
        });
        source += "';\n";

        // If a variable is not specified, place data values in local scope.
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

        source = "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + 'return __p;\n';

        try {
            var render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }

        var template = function (data) {
            return render.call(this, data, _);
        };

        // Provide the compiled source as a convenience for precompilation.
        var argument = settings.variable || 'obj';
        template.source = 'function(' + argument + '){\n' + source + '}';

        return template;
    };

    /*链式调用*/
    _.chain = function (obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance;
    };

    var result = function (instance, obj) {
        return instance._chain ? _(obj).chain() : obj;
    };

    _.mixin = function(obj) {
        _.each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return result(this, func.apply(_, args));
            };
        });
    };
    _.mixin(_);

    _.each(['pop', 'push', 'reverse', 'shiift', 'sort', 'splice', 'unshift'], function (name) {
        var method = ArrayProto[name];
        _.property[name] = function () {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name === 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
            return result(this, obj);
        }
    });
    _.each(['concat', 'join', 'slice'], function (name) {
        var method = ArrayProto[name];
        _.property[name] = function () {
            return result(this, method.apply(this._wrapped, arguments));
        }
    });
    _.prototype.value = function () {
        return this._wrapped;
    };

    if (typeof define === 'function' && define.amd) {
        define('underscroe', [], function () {
            return _;
        })
    }


}.call(this));


/*
* 1.js /./  是个什么东西
* 2. guard 参数的作用
*   // guard参数用于确定只返回第一个元素, 当guard为true时, 指定数量n无效
* */