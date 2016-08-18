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
// 获取样式
ccc.getStyle = function(element,StyleName){
    if(window.getComputedStyle){
        return window.getComputedStyle(element)[StyleName]
    }else if(element.currentStyle){
        return element.currentStyle[StyleName]
    }
    return
}
ccc.getStyleList = function(element){
    if(window.getComputedStyle){
        return window.getComputedStyle(element)
    }else if(element.currentStyle){
        return element.currentStyle
    }
    return
}
ccc.setStyle = function(element,StyleName,val){
    element.style[StyleName] = val
}

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
ccc.isNullOrEmpty = function(str) {
    var that = this;
    return (str == null || str == undefined || that.trim(str) == "") ? true : false;
}

// 判断是否元素
ccc.isElement = function(obj) {
    return !!(obj && (obj.nodeType == 1 || obj.nodeType == 9));
};

// 判断是否空对象
ccc.isEmptyObject = function(obj) {
    var t;  
    for (t in obj)  
        return !1;  
    return !0
    // if (JSON.stringify(obj) === '{}') {
    //     return true;
    // }
    // return false;//这种方式如果实例全是函数也会判断为空
};
/*var isEmptyValue = function(value) {
 var type;
 if(value == null) { // 等同于 value === undefined || value === null
     return true;
 }
 type = Object.prototype.toString.call(value).slice(8, -1);
 switch(type) {
 case 'String':
     return !$.trim(value);
 case 'Array':
     return !value.length;
 case 'Object':
     return $.isEmptyObject(value); // 普通对象使用 for...in 判断，有 key 即为 false
 default:
     return false; // 其他对象均视作非空
 }
};*/

//判断是否为纯粹对象 错的,这个只是判断是否obj
ccc.isPlainObject = function(obj) {
    return (typeof(obj) === "object" && obj != null && obj != undefined);
}

/*isPlainObject: function(a) {
	var b;
	if(!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a)) return !1;
	try {
		if(a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf")) return !1
	} catch(c) {
		return !1
	}
	if(k.ownLast)
		for(b in a) return j.call(a, b);
	for(b in a);
	return void 0 === b || j.call(a, b)
}*/

ccc.isAndroid = function() {
    return (/android/gi).test(navigator.appVersion.toLowerCase());
}

ccc.isIphone = function() {
    return (/iphone/gi).test(navigator.appVersion.toLowerCase());
}
ccc.isXBrowser = function(name){//msie(或者trident) chrome firefox
    var reg = new RegExp(name,"gi");
    return reg.test(navigator.userAgent.toLowerCase());
}

ccc.isObject = function(obj) {
    // return Object.prototype.isPrototypeOf(obj);
    return obj instanceof Object;
};

// json转化为字符串
ccc.jsonToStr = function(json) {
    if (typeof json === 'object') {
        return JSON && JSON.stringify(json);
    }
};

// 字符串转化为json
ccc.strToJson = function(str) {
    if (typeof str === 'string') {
        return JSON && JSON.parse(str);
    }
};


// 设置localStorage
ccc.setStorage = function(key, value) {
    if (arguments.length === 2) {
        var v = value;
        if (typeof v == 'object') {
            v = JSON.stringify(v);
            v = 'obj-' + v;
        } else {
            v = 'str-' + v;
        }
        var ls = window.localStorage;
        if (ls) {
            ls.setItem(key, v);
            return v;
        }
    }
};
// 访问localStorage
ccc.getStorage = function(key) {
    var ls = window.localStorage;
    if (ls) {
        var v = ls.getItem(key);
        if (!v) {
            return;
        }
        if (v.indexOf('obj-') === 0) {
            v = v.slice(4);
            return JSON.parse(v);
        } else if (v.indexOf('str-') === 0) {
            return v.slice(4);
        }
    }
};
// 删除localStorage
ccc.rmStorage = function(key) {
    var ls = window.localStorage;
    if (ls && key) {
        ls.removeItem(key);
    }
};
// 清空localStorage
ccc.clearStorage = function() {
    var ls = window.localStorage;
    if (ls) {
        ls.clear();
    }
};

// 设置sessionStorage
ccc.setSessionStorage = function(key, value) {
    if (arguments.length === 2) {
        var v = value;
        if (typeof v == 'object') {
            v = JSON.stringify(v);
            v = 'obj-' + v;
        } else {
            v = 'str-' + v;
        }
        var ls = window.sessionStorage;
        if (ls) {
            ls.setItem(key, v);
            return v;
        }
    }
};
// 获取sessionStorage
ccc.getSessionStorage = function(key) {
    var ls = window.sessionStorage;
    if (ls) {
        var v = ls.getItem(key);
        if (!v) {
            return;
        }
        if (v.indexOf('obj-') === 0) {
            v = v.slice(4);
            return JSON.parse(v);
        } else if (v.indexOf('str-') === 0) {
            return v.slice(4);
        }
    }
};
// 删除sessionStorage
ccc.rmSessionStorage = function(key) {
    var ls = window.sessionStorage;
    if (ls && key) {
        ls.removeItem(key);
    }
};
// 清空sessionStorage
ccc.clearSessionStorage = function() {
    var ls = window.sessionStorage;
    if (ls) {
        ls.clear();
    }
};


//设置cookie
ccc.setCookie = function(cname, cvalue, exDays) {
    var d = new Date();
    var expires = d.getTime() + exDays * (24 * 60 * 60 * 1000);
    document.cookie = cname + "=" + cvalue + "; expires=" + new Date(expires);
}

//getCookie事件
ccc.getCookie = function(cookieName, value) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; "); //"user=1443507891162S0005I7F000001R1418; mark=9171E5659CD7799C6651332AD619185D; organizationCode=CCC; username=admin" => ["user=1443507891162S0005I7F000001R1418", "mark=9171E5659CD7799C6651332AD619185D", "organizationCode=CCC", "username=admin"]
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (cookieName == arr[0]) {
            return arr[1];
        }
    }
    return "";
}

//清除cookie
ccc.clearCookie = function(cname) {
    setCookie(cname, "", -1);
}

//判断属性是否存在于原型中
ccc.hasPrototypeProperty = function(object,name){
    return !object.hasOwnProperty(name) && (name in object);
}

// URL API
// 创建一个url指向上传的file
ccc.getFileUrl = function(fileObj){
    var URL = window.URL || window.webkitURL; //URL兼容写法
    return URL.createObjectURL(fileObj);
}
// 取消将这个url指向file
ccc.cancelFileUrl = function(objectURL){
    var URL = window.URL || window.webkitURL; //URL兼容写法
    URL.revokeObjectURL(objectURL);
}

// FileReader API
ccc.fileReader = function(fileObj,callback){
    var fileReader = new FileReader();//创建fileReader对象
    fileReader.readAsDataURL(fileObj);
    fileReader.onload = function(e){
        src = e.target.result//一个base64的url，若是图片，可以直接写在url上
        callback(src);//callback函数的第一个参数是src
    }
}
/*e.g.  
input.on("change",function(){
    var fileObj = $(this)[0].files[0];
    ccc.fileReader(fileObj,function(e){
        console.log(e);
    });
});*/

// 获取url参数
ccc.getUrlParam = function(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");//以 name 开头或者以 "&"+name 开头，中间是 "=" + 若干个非&的字符 ,后面是结尾 或者 以 "&"结尾
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
}

