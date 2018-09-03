/*收集一些平时工作的封装的方法*/
// 请在服务器环境打开
function onlyServer() {
    if (window.location.protocol.substr(0, 4) === "file") {
        alert("请在服务器环境打开，本地无法运行！！！");
    }
}

// 数字保留两个小数,并且逢千有个逗号
function fixNum(num) {
    if (typeof(num) == "string") {
        num = Number(num);
    }
    var numArr = num.toFixed(2).split(".");
    numArr[0] = Number(numArr[0]).toLocaleString();
    return numArr.join(".");
}

// 格式化银行卡
function formatBankCard(card, spacing) {
    card = String(card);
    card = card.replace(/\s/g, "");
    var len = card.length;
    var spacing = spacing || 4;
    var arr = [];
    var n = 0;
    while (n < len) {
        arr.push(card.slice(n, n + spacing));
        n += spacing;
    };
    return arr.join(" ");
}

// 格式化数字 , 逢千逗号
function formatNum(num) {
    num = num.toString();
    var decimal = ""; //小数
    var integer = ""; //整数
    var point = num.indexOf(".");
    var arr = [];
    if (point != -1) {
        decimal = num.slice(point + 1);
        integer = num.slice(0, point);
    } else {
        integer = num;
        decimal = "00";
    }
    var len = integer.length;
    var n = len;
    while (n > 3) {
        n -= 3;
        arr.unshift(num.substr(n, 3));
    }
    arr.unshift(num.slice(0, n));
    return arr.join(",") + "." + decimal;
}

/*
function formatNum(num) { // 本来toLocaleString就可以实现这个功能 , 但是搜狗这个傻逼浏览器
    num = num.toString();
    var decimal = ""; //小数
    var integer = ""; //整数
    var point = num.indexOf(".");
    var arr = [];
    if (point != -1) {
        decimal = num.slice(point + 1);
        integer = num.slice(0, point);
    } else {
        integer = num;
        decimal = "";
    }
    var len = integer.length;
    var n = len;
    while (n > 3) {
        n -= 3;
        arr.unshift(num.substr(n, 3));
    }
    arr.unshift(num.slice(0, n));
    if (point != -1) {  // 有小数位才显示小数 , 有多少位小数就显示多少位
        return arr.join(",") + "." + decimal;
    }
    return arr.join(",");
}

function formatNum(str) {
    str = "" + str;
    var newStr = "";
    var count = 0;

    if (str.indexOf(".") == -1) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr;
    } else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
    }
    return str;
}
*/

//保留小数的计算
function sum(arr, range) { //arr是需要计算的数组 , range是保留小数的位数
    var mul = Math.pow(10, range)
    var res = 0;
    for (var i in arr) {
        res += parseInt(Number(arr[i]) * mul);
    }
    return res / mul;
}

// Textarea自适应高度  传入对象,可以是原生dom,jqdom,元素id名;若该元素未设置了box-sizing且不在jq环境下,第二个参数为padding-top加上padding-bottom的和
function autoTextarea(obj, paddingHeight) {
    // 若传进来的是字符串(id名),自动获取该对象
    obj = typeof obj == "string" ? document.getElementById(obj) : obj;

    if (!!window.$ && $ == jQuery) { //在jq环境里面

        obj = obj instanceof jQuery ? obj : $(obj); //无论是否jq都将该对象变成jq对象

        obj.css("overflow", 'hidden');
        var paddingHeight = Number(obj.css("padding-top").slice(0, -2)) + Number(obj.css("padding-bottom").replace("px", ""));

        obj.on('input propertychange', function() {
            obj.css("height", "auto").height($(this)[0].scrollHeight - paddingHeight);
        });

    } else { //非jq环境下 , 未必是原生 , 但是使用原生js方法
        obj.style.overflow = "hidden";

        if (obj.addEventListener) { //ie8以上

            obj.addEventListener("input", function() {
                obj.style.height = "auto";
                obj.style.height = (obj.scrollHeight - paddingHeight) + "px";
            }, false);
            obj.addEventListener("propertychange", function() {
                obj.style.height = "auto";
                obj.style.height = (obj.scrollHeight - paddingHeight) + "px";
            }, false);

        } else {

            obj.oninput = function() {
                obj.style.height = "auto";
                obj.style.height = (obj.scrollHeight - paddingHeight) + "px";

            }
            obj.onpropertychange = function() {
                obj.style.height = "auto";
                obj.style.height = (obj.scrollHeight - paddingHeight) + "px";
            }

        }
    }
}

// 简化版
/*function autoTextarea(obj,paddingHeight){
    obj.style.overflow="hidden";
    obj.oninput = function(){
        obj.style.height = "auto";
        obj.style.height = (obj.scrollHeight-paddingHeight) + "px";

    }
    obj.onpropertychange = function(){
        obj.style.height = "auto";
        obj.style.height = (obj.scrollHeight-paddingHeight) + "px";
    }
}*/

// 这个数组是否有这个值   这个方法没有必要 直接用 Array.prototype.indexOf(ie9以及以上)
if (!Array.prototype.hasVal) {
    Array.prototype.hasVal = function(val) {
        if (this.indexOf) {
            return this.indexOf(val) > 0
        } else {
            for (var i in this) {
                if (this[i] == val) {
                    return true;
                }
            }
            return false;
        }
    }
}

// 数组插入值
/*if(!Array.prototype.insert){
    Array.prototype.insert = function(posi,item){
        this.splice(posi,0,item);
        return this;
    }
}*/
if (!Array.prototype.insert) {
    Array.prototype.insert = function(posi, item) {
        if (arguments.length == 2) {
            this.splice(posi, 0, item);
        } else if (arguments.length > 2) {
            for (var i = 1, len = arguments.length; i < len; i++) {
                this.splice(posi + (i - 1), 0, arguments[i]);
            }
        }
        return this;
    }
}
// 根据索引位置删除值
if (!Array.prototype.remove) {
    Array.prototype.remove = function(posi) {
        this.splice(posi, 1);
        return this;
    }
}
// 数组交换值
if (!Array.prototype.exchage) {
    Array.prototype.exchage = function(posi1, posi2) { //两个位置交换
        if (this.length - 1 < posi1 || this.length - 1 < posi2 || posi1 == posi2) {
            return this;
        }
        var mid = this[posi1];
        this[posi1] = this[posi2];
        this[posi2] = mid;
        return this;
    }
}
// 将一个值位置上移
if (!Array.prototype.exchageUp) {
    Array.prototype.exchageUp = function(posi) {
        this.exchage(posi, posi - 1);
        return this;
    }
}
// 将一个值的位置下移
if (!Array.prototype.exchageDown) {
    Array.prototype.exchageDown = function(posi) {
        this.exchage(posi, posi + 1);
        return this;
    }
}


function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    // return !!obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  //这个是返回布尔型
}

function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) {
        obj.className = obj.className.trim(); //可以避免空格越来越多
        obj.className += " " + cls;
    }
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}

function toggleClass(obj, cls) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls);
    } else {
        addClass(obj, cls);
    }
}

// 上传文件限制 , 配合 <input class="file" type="file" name="" accept="image/png,image/x-png,image/jpeg,image/gif,image/bmp"> 效果更佳
function fileLimit(obj) {
    var that = obj; //jq对象
    if (that[0].files) { //现代浏览器,支持files API浏览器
        var file = that[0].files[0];
    } else {
        var filePath = that.val();
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject"); //ie 自带 Active-x插件
        var file = fileSystem.GetFile(filePath);
    }
    var fileName = file.name;
    var fileType = file.type;
    var fileSize = file.size / 1024 / 1024;



    var fileSuffix = fileName.slice(fileName.lastIndexOf(".") + 1); //后缀
    if (fileSuffix != "jpg" && fileSuffix != "png" && fileSuffix != "gif" && fileSuffix != "bmp") {
        that.add(".file-name").val('');
        alert("上传的文件格式错误，请上传格式为jpg、png、bmp、gif的图片文件");
        return false;
    }

    if (fileSize > 1) {
        alert("上传的文件不得大于1m");
        return false;
    }

}

/*中间变星星*/
String.prototype.star = function(start, end) {
    var num = end - start;
    var str = this;
    var starStr = "";
    for (var i = 0; i < num; i++) {
        starStr = starStr + "*";
    }
    str = str.slice(0, start) + starStr + str.slice(end);
    return str;
}

/*在字符串里面找出重复最多的字符*/
String.prototype.appearMaxTimes = function() {
    var maxNum = 0,
        index = null,
        num = {},
        arr = [];
    for (var i = 0, len = this.length; i < len; i++) {
        num[this.charAt(i)] ? ++num[this.charAt(i)] : num[this.charAt(i)] = 1;
    }
    for (var i in num) {
        if (num[i] > maxNum) {
            maxNum = num[i];
            arr.splice(0, arr.length); //一旦发现有比maxNum大,清空数组
            arr.push({ "index": i, "maxNum": num[i] }); //保存当前这组数据
        } else if (num[i] == maxNum) {
            arr.push({ "index": i, "maxNum": num[i] }); //添加与maxNum一样大的这组数据
        }
    }
    return arr.length == 1 ? arr[0] : arr;
};

/*将posi位置字符换成newStr,posi可以为数字也可以为由数组组成的数组*/
String.prototype.change = function(posi, newStr) {
    if (!isNaN(str)) { //posi是数字
        return this.slice(0, posi) + newStr + this.slice(posi + 1); //将字符串posi前面的那段 + 新字符newStr + 字符串posi后面那段 拼成新的字符串；
    } else if (Array.isArray && Array.isArray(posi)) { //posi为数组的时候，es6 Array.isArray判断 注意兼容性
        var str = this;
        for (var i = 0, len = posi.length; i < len; i++) {
            str = str.slice(0, posi[i]) + newStr + str.slice(posi[i] + 1); //for循环拼接
        }
        return str;
    }
}

/*将在ori中匹配到的字符，转化为tar中对应的字符*/
String.prototype.exchange = function(ori, tar) {
    var str = "",
        flag = false; //标记是否有匹配到ori中的字符
    for (var i = 0, len = this.length; i < len; i++) { //str字符串遍历一个个字符
        flag = false;
        for (var j = 0, len2 = ori.length; j < len2; j++) { //遍历ori，将str字符串的字符与ori进行比较
            if (this.charAt(i) == ori[j]) { //判断是否匹配
                str += tar[j]; //匹配到了，将str对应的字符换成tar[i]中的。
                flag = true; //标记为true
            }
        }
        if (!flag) { //没有匹配到，就str中字符换成会原来那个。
            str += this[i];
        }
    }
    return str;
};
String.prototype.exchange2 = function(ori, tar) {
    var str = "";
    for (var i = 0, len = this.length; i < len; i++) {
        var j = 0,
            len2 = ori.length;
        while (this.charAt(i) != ori[j] && j < len2) { //匹配到或者遍历完ori退出
            j++
        }
        if (j < len2) { //如果j小于ori长度，表示匹配到
            str += tar[j]; //匹配到了，用tar对应字符
        } else { //匹配不到
            str += this[i] //用回原来字符
        }
    }
    return str;
};
// e.g. var a = "AGCT"; a.exchange("ATCG", "TAGC")//TCGA ,A=>T,T=>A,C=>G,G=>C
// 传一个哈希表，属性名为匹配字符，值为目标字符
String.prototype.exchange3 = function(hashTable) {
    var arr = this.split("");
    for (var i = 0, len = arr.length; i < len; i++) {
        // (arr[i] in hashTable) && (arr[i] = hashTable[arr[i]])
        (hashTable[arr[i]]) && (arr[i] = hashTable[arr[i]]) //如果与哈希表匹配，则执行后面操作，否则因为false，将跳过后面操作
    }
    return arr.join("");
};
/*
var hashTable = {
    "T": "A",
    "A": "T",
    "G": "C",
    "C": "G"
}
var a = "AGCT";
console.log(a.exchange3(hashTable)); //TCGA
*/

// 是否到底部
function isbottom() { //onscroll时候判断，浏览器滚动条时候
    var top = $(".waiting").offset().top;
    var h = $(".waiting").outerHeight();
    var winH = $(window).height();
    var scrollTop = $(window).scrollTop();
    // 最低下 top+h = winH+scrollTop
    return top <= winH + scrollTop;
}
/*// 或者
$("#wrap").on("scroll",function(){//因为这里滚动的是wrap,所以offset().top变成窗口位置
    var heightPoint = window.screen.height-$("li:last").height();
    if($("li:last").offset().top<heightPoint && falg){
        falg = false;
        var timer = setTimeout(function(){
            add();
            falg = true;
        },1000);
    }
});*/


// 判断ie版本 7-10
function ieVersion() {
    var reg = /msie\s(\d+)\.0/i;
    var agent = navigator.userAgent.toLowerCase();
    if (reg.test(agent)) {
        return agent.match(reg)[1];
    }
    return null
}



/*获取元素信息*/
function Ele(dom) {
    if (typeof dom == "string") {
        dom = document.getElementById(dom);
    }
    if (dom) {
        this.dom = dom;
        Ele.prototype.innerWidth = function() { //获取元素宽度(包括padding,border)
            return dom.offsetWidth;
        };
        Ele.prototype.innerHeight = function() { //获取元素高度(包括padding,border)
            return dom.offsetHeight
        };
        Ele.prototype.width = function() { //获取元素content宽度
            var paddingArr = this.getStyle("padding").match(/\d+/g);
            var border = this.getStyle("borderWidth").match(/\d+/g)[0];
            return dom.offsetWidth - paddingArr[1] - paddingArr[3] - border * 2;
        }
        Ele.prototype.height = function() { //获取元素content高度
            var paddingArr = this.getStyle("padding").match(/\d+/g);
            var border = this.getStyle("borderWidth").match(/\d+/g)[0];
            return dom.offsetHeight - paddingArr[0] - paddingArr[2] - border * 2;
        }
        Ele.prototype.getStyle = function(StyleName) { //获取元素css样式
            if (dom.style[StyleName]) {
                return dom.style[StyleName];
            } else {
                if (window.getComputedStyle) {
                    return window.getComputedStyle(dom)[StyleName]
                } else if (dom.currentStyle) { //读取样式表样式
                    return dom.currentStyle[StyleName]
                }
            }
            return null;
        }
        Ele.prototype.docOffset = function() { //元素的文档坐标
            var x = dom.offsetLeft;
            var y = dom.offsetTop;
            while (dom.offsetParent) {
                x = x + dom.offsetParent.offsetLeft + dom.offsetParent.clientLeft;
                y = y + dom.offsetParent.offsetTop + dom.offsetParent.clientTop;
                dom = dom.offsetParent;
            }
            return {
                "left": x,
                "top": y
            }
        }
    }
}


// 重置iframe高度
function resetFrameH(frame) {
    frame.style.height = frame.contentDocument.body.offsetHeight + "px"; //跨域会不行
}

// 让数字只能符合某种间隔,比如0 20 40 60,一般可以用于拖拽的格子
function grid(v, len) {
    var len = len || 20;
    var r = parseInt(v / len) * len;
    if (Math.abs(v % len) > len / 2) {
        r += v > 0 ? len : -len;
    }
    return r;
}

/**
 * 得到随机整数方法
 * @param  {number} max 需要得到的随机数最大值
 * @param  {number} min 需要得到的随机数最小值
 * @return {number}     随机整数
 */
function ranInt(max, min) {
    if (min > max) {
        var mid = max;
        max = min;
        min = mid;
    }
    return parseInt(Math.random() * (max - min + 1) + min)
}



/**
 * 获取滚动条位置处理
 * @return {number} 浏览器滚动条位置
 */
function getScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
}

/**
 * 设置浏览器滚动条位置
 * @param {number} top 需要设置浏览器滚动条的位置
 * @param {boolean} until 是否需要一直设置浏览器滚动条的位置 , 知道浏览器滚动条的位置 为top , 一般是页面进入的时候才需要设置为true , 其他时候可以忽略
 * @return {boolean} 是否设置成功
 */
function setScrollTop(top, until) {
    document.documentElement.scrollTop = document.body.scrollTop = top;
    setTimeout(function() { // 虽然是在window.onload里面 , 但是有时页面进入的时候 , 还是设置不成功 , 初步猜测 , 可能是页面虽然加载好 , 但是还没有渲染完成, 还没有滚动条 , 所以设置失败 ; 特别是刷新的时候,  如果是直接跳转过来还好
        if (getScrollTop() != top && until) { // 判断是否设置值 , 不是的话重新设置 , 这个判断只能是放在定时器里面 , 因为如果是直接在外面判断的话 , 可能由于刚设置的原因 , getScrollTop()是等于top的
            /*console.log("执行");*/
            setScrollTop(top);
        }
    }, 16.7); // 经过试验 其实定时器时间设为1都也只是执行一次 ,
    return getScrollTop() == top;
}

/**
 * 获取元素的文档坐标
 */
function documentPis(ele) {
    var left = ele.offsetLeft;
    var top = ele.offsetTop;
    while (ele.offsetParent) {
        left = left + ele.offsetParent.offsetLeft + ele.offsetParent.clientLeft;
        //        父级的左偏移量                       父级的border宽度
        top = top + ele.offsetParent.offsetTop + ele.offsetParent.clientTop;
        //        父级的上偏移量                       父级的border宽度
        ele = ele.offsetParent;
    }
    return { left: left, top: top }; //返回一个json
}

/**
 * 窗口坐标
 */
function winPis(ele) {
    return documentPis(ele).top - getScrollTop();
}




/**
 * 检测capsLock是否锁定
 * @param  {object} e 事件对象
 * @return {boolean}   capsLock是否锁定
 */
function capsLock(e) { // onkeypress 事件里面
    var keyCode = e.keyCode || e.which; // 按键的keyCode
    var isShift = e.shiftKey || keyCode === 16 || false; // shift键是否按住
    //指定位置的字符的 Unicode 编码 , 通过与shift键对于的keycode，就可以判断capslock是否开启了
    // (keyCode >= 65 && keyCode <= 90) 是大写字母
    // (keyCode >= 97 && keyCode <= 122) 是小写字母
    if (((keyCode >= 65 && keyCode <= 90) && !isShift) || ((keyCode >= 97 && keyCode <= 122) && isShift)) {
        return true
    } else {
        return false
    }
}

/**
 * 判断页面是否第一次进入
 * @return {boolean} true 代表第一次进入
 */
function firstEntry() {
    // 注意 需要判断的页面 必须且只能运行一次这个函数
    var firstEnter = window.sessionStorage.getItem("hasEnter") != "true";
    window.sessionStorage.setItem("hasEnter", "true");
    if (firstEnter) { // 新页面打开
        return true;
    } else { // 返回 , 或者刷新页面 , 就是这个选项卡曾经打开过这个页面
        return false;
    }
}

// 响应式 rem布局
function baseFontSize() {
    var rootfontsize = $(window).width() / 20;
    rootfontsize = rootfontsize > 20 ? 20 : rootfontsize;
    $("html").css("fontSize", rootfontsize + "px");
    return rootfontsize;
}

//
function getPath(str) {
    var path_reg = /(.+)\?/; // 任意字符到?为止
    var path = str.match(path_reg);
    if (path) {
        path = path[1];
    } else {
        path = str;
    }

    var path_arr = path.split("/");
    return {
        "hostname": path_arr[2],
        "file": path_arr[path_arr.length],
        "arr": path_arr,
        "path": path,
    }
}

function urlParse(str) {
    var url = document.createElement('a'); // a标签的dom对象（HTMLAnchorElement）实现了类似location实例的接口
    url.href = str;
    var obj = {
        href: url.href, // https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container
        protocol: url.protocol, // https:
        host: url.host, // developer.mozilla.org
        hostname: url.hostname, // developer.mozilla.org
        port: url.port, // (blank - https assumes port 443)
        pathname: url.pathname, // /en-US/search
        search: url.search, // ?q=URL
        hash: url.hash, // #search-results-close-container
        origin: url.origin // https://developer.mozilla.org
    }
    url = null;

    // searchParse
    var search = obj.search.substr(1);
    var searchjson = {};
    if (search) {
        search.split("&").forEach(function(val) {
            var single = val.split("=");
            var key = single[0];
            var value = single[1];
            searchjson[key] = value;
        });
    }

    obj.searchjson = searchjson;

    return obj;
}

// search 解析
function searchParse(search) {
    var search = search || window.location.search;
    search = search.substr(1);
    var searchjson = {};
    if (search) {
        search.split("&").forEach(function(val) {
            var single = val.split("=");
            var key = single[0];
            var value = single[1];
            searchjson[key] = value;
        });
    }
    return searchjson;
}