function mousewheel(obj, callback) {
	obj.onmousewheel = fn;
	if (obj.addEventListener) {
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

		if (e.preventDefault) {
			e.preventDefault();
		}
		return false;
	}
}