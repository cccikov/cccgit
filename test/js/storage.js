var storage = {}

//设置cookie
storage.setCookie = function (cname, cvalue, exDays) {
  var d = new Date();
  var expires = d.getTime() + exDays * (24 * 60 * 60 * 1000);
  document.cookie = cname + "=" + cvalue + "; expires=" + new Date(expires);
}

//getCookie事件
storage.getCookie = function (cookieName, value) {
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

// 删除cookie
storage.removeCookie = function (cname) {
  document.cookie = cname + "= ; expires=" + new Date(0);
}



// 设置localStorage
storage.setStorage = function (key, value) {
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
storage.getStorage = function (key) {
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
storage.removeStorage = function (key) {
  var ls = window.localStorage;
  if (ls && key) {
    ls.removeItem(key);
  }
};
// 清空localStorage
storage.clearStorage = function () {
  var ls = window.localStorage;
  if (ls) {
    ls.clear();
  }
};


// 设置sessionStorage
storage.setSessionStorage = function (key, value) {
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
storage.getSessionStorage = function (key) {
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
storage.removeSessionStorage = function (key) {
  var ls = window.sessionStorage;
  if (ls && key) {
    ls.removeItem(key);
  }
};
// 清空sessionStorage
storage.clearSessionStorage = function () {
  var ls = window.sessionStorage;
  if (ls) {
    ls.clear();
  }
};


export default storage;
