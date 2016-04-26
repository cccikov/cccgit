function mousewheel(obj, callback) {
    obj.onmousewheel = fn;//除火狐外，火狐不支持mousewheel
    if (obj.addEventListener) {//兼容火狐
        obj.addEventListener("DOMMouseScroll", fn, false);
    }

    function fn(e) {
        var e = e || window.event;
        e.delta = true;
        if (e.wheelDelta < 0 || e.detail > 0) {
            e.delta = true;
        } else {
            e.delta = false;
        }
        callback(e);

        if (e.preventDefault) {//DOM2级事件处理程序，阻止默认事件
            e.preventDefault();
        }
        return false;//DOM0级事件处理程序，阻止默认事件
    }
}