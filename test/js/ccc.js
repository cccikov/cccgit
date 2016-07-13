var ccc = {};
// 去除首尾空格
ccc.trim = function(str) {
    if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }
};

// 去除全部空格
ccc.trimAll = function(str) {
    return str.replace(/\s*/g, '');
};

//判断是否数字（或者转型后为数字）
ccc.isNumber = function(str) {
    return !isNaN(str); // 返回 true false
};

// 判断是否真数字（Number对象）
ccc.isRealNumber = function(str) {
    return !isNaN(str) && typeof(str) == "number"; // 返回 true false
};

// 判断数字是否无穷大
ccc.isInfinity = function(str) {
    return !isFinite(str);
};

// 判断是否为字符串
ccc.isString = function(obj) {
    return typeof obj === "string" && obj != null && obj != undefined;
};

// 判断是否数组
ccc.isArray = function(obj) {
    if (Array.isArray) {
        return Array.isArray(obj);
    } else {
        return obj instanceof Array;
    }
    //return (toString.apply(arr) === '[object Array]') || arr instanceof NodeList;
};

ccc.isBoolean = function(obj) {
    return typeof(obj) === "boolean";
}

// 判断是否函数
ccc.isFunction = function(obj) {
    return typeof(obj) === "function";
}

// 判断是否为空
ccc.isNullOrEmpty = function (str) {
    var that = this;
    return (str == null || str == undefined || that.trim(str) == "") ? true : false;
}

// 判断是否元素
ccc.isElement = function(obj) {
    return !!(obj && (obj.nodeType == 1 || obj.nodeType == 9));
};

// 判断是否空对象
ccc.isEmptyObject = function(obj) {
    if (JSON.stringify(obj) === '{}') {
        return true;
    }
    return false;
};

//判断是否为纯粹对象 错的
ccc.isPlainObject = function (obj) {
	return (typeof(obj)==="object" && obj != null && obj != undefined);
}
// isPlainObject: function(a) {
// 	var b;
// 	if(!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a)) return !1;
// 	try {
// 		if(a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf")) return !1
// 	} catch(c) {
// 		return !1
// 	}
// 	if(k.ownLast)
// 		for(b in a) return j.call(a, b);
// 	for(b in a);
// 	return void 0 === b || j.call(a, b)
// }


ccc.isObject = function(obj){
	return Object.prototype.isPrototypeOf(obj);
}
