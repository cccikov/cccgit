$(function() {
	var arr = [];
	arr["year"] = 0;
	arr["month"] = 0;
	arr["day"] = 0;

	timeMove($("#year"), true, 95, -125, "year");
	timeMove($("#month"), true, 95, -95, "month");
	timeMove($("#day"), true, 95, -95, "day");

	function timeMove(obj, flag, min, max, str) {
		obj.on('touchstart', function(e) {
			//			console.log("touchstart");
			var e = e || window.event;
			var that = $(this);

			var nowPoint = oldPoint = e.originalEvent.touches[0].clientY,
				detailPoint = 0;
			var thatTop = that.position().top;

			that.css({
				"transition": "transform 0.3s cubic-bezier(0, 0.65, 0.25, 1)"
			});

			function transformFn(offsetTop) {
				that.css({
					"transform": "translateY(" + offsetTop + "px)",
					"transition": "transform 0.3s cubic-bezier(0, 0.65, 0.25, 1)"
				});
			}

			//移动时
			$(window).on("touchmove", function(e) {
				//				console.log("touchmove");
				if (flag) {
					var e = e || window.event;
					e.preventDefault();
					nowPoint = e.originalEvent.touches[0].clientY;
					detailPoint = nowPoint - oldPoint;

					//改变top值
					if ((thatTop + detailPoint) <= min && (thatTop + detailPoint) >= max) {
						thatTop += detailPoint;
					} else if ((thatTop + detailPoint) > min) {
						detailPoint = 0;
						thatTop = min;
					} else {
						detailPoint = 0;
						thatTop = max;
					}

					transformFn(thatTop);

					oldPoint = nowPoint;
				}

			});

			//松开时
			$(window).on("touchend", function(e) {
				//				console.log("touchend");
				if (flag) {
					flag = false;
					var e = e || window.event;

					var speed = detailPoint;
					//			thatTop += speed * 8;
					if ((thatTop + speed * 8) <= min && (thatTop + speed * 8) >= max) {
						thatTop += speed * 8;
					} else if ((thatTop + speed * 8) >= min) {
						speed = 0;
						thatTop = min;
					} else {
						speed = 0;
						thatTop = max;
					}

					transformFn(thatTop);

					var timer = setTimeout(function() {
						last(3, 30, 0);
					}, 350);

					function last(base, height, px) {
						//第几个
						var index = -Math.round(that.position().top / height) + base;
						var value = that.find("li").eq(index).text();
						arr[str] = value;
						$("#datetime").val(arr['year'] + "/" + arr['month'] + "/" + arr['day']);

						thatTop = Math.round(that.position().top / height) * height + px;
						transformFn(thatTop);

						flag = true;
					}
					//			last(3, 30, 0);
					$(window).off("touchmove").off("touchend");
				}

			});
		});
	}

});