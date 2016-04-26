$(function() {
	var arr = [];
	arr["year"] = "2013";
	arr["month"] = "04";
	arr["day"] = "04";

	timeMove($("#year"), true, 95, -125, "year");
	timeMove($("#month"), true, 95, -245, "month");
	timeMove($("#day"), true, 95, -815, "day");

	function timeMove(obj, flag, min, max, str) {
		obj.on('touchstart', function(e) {

			//日期选择
			var trueMax = max;
			(function() {
				if (str == "day") {
					switch (arr["month"]) {
						case "02":
							if ((arr["year"] % 4 == 0 && arr["year"] % 100 != 0) || arr["year"] % 400 == 0) {
								trueMax = max + 30 * 2;
							} else {
								trueMax = max + 30 * 3;
							}
							break;
						case "04":
							trueMax = max + 30;
							break;
						case "06":
							trueMax = max + 30;
							break;
						case "09":
							trueMax = max + 30;
							break;
						case "11":
							trueMax = max + 30;
							break;
						default:
							trueMax = max;
							break;
					}
				}
			})();

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
					if ((thatTop + detailPoint) <= min && (thatTop + detailPoint) >= trueMax) {
						thatTop += detailPoint;
					} else if ((thatTop + detailPoint) > min) {
						detailPoint = 0;
						thatTop = min;
					} else {
						detailPoint = 0;
						thatTop = trueMax;
					}

					transformFn(thatTop);

					oldPoint = nowPoint;
				}

			});

			//松开时
			$(window).off("touchmove").on("touchend", function(e) {
				//				console.log("touchend");
				if (flag) {
					flag = false;
					var e = e || window.event;

					var speed = detailPoint;
					//			thatTop += speed * 8;
					if (speed > 1 || speed < -1) {
						if ((thatTop + speed * 8) <= min && (thatTop + speed * 8) >= trueMax) {
							thatTop += speed * 8;
						} else if ((thatTop + speed * 8) >= min) {
							speed = 0;
							thatTop = min;
						} else {
							speed = 0;
							thatTop = trueMax;
						}

						transformFn(thatTop);
					}

					var timer = setTimeout(function() {
						last(3, 30, 0);
					}, 350);

					function last(base, height, px) {
						//第几个
						var index = -Math.round(that.position().top / height) + base;
						var value = that.find("li").eq(index).text();
						arr[str] = value;

						//月份选择
						if (str == "month") {
							function monthchange(top) {
								$("#day").css({
									"transform": "translateY(" + top + "px)",
									"transition": "transform 0.3s cubic-bezier(0, 0.65, 0.25, 1)"
								});
							}
							if ((value == "04" || value == "06" || value == "09" || value == "11") && ($("#day").position().top < -780)) {
								monthchange(-780);
								arr['day'] = "30";
							} else if (value == "02") {
								if (((arr["year"] % 4 == 0 && arr["year"] % 100 != 0) || arr["year"] % 400 == 0) && ($("#day").position().top < -750)) {
									monthchange(-750);
									arr['day'] = "29";
								} else if ($("#day").position().top < -720) {
									monthchange(-720);
									arr['day'] = "28";
								}
							}
						}

						//年份选择
						if (str == "year") {
							if (!((value % 4 == 0 && value % 100 != 0) || value % 400 == 0) && arr['month'] == "02" && ($("#day").position().top < -720)) {
								$("#day").css({
									"transform": "translateY(" + -720 + "px)",
									"transition": "transform 0.3s cubic-bezier(0, 0.65, 0.25, 1)"
								});
								arr['day'] = "28";
							}
						}

						$("#datetime").val(arr['year'] + "/" + arr['month'] + "/" + arr['day']);

						thatTop = Math.round(that.position().top / height) * height + px;
						transformFn(thatTop);

						flag = true;
					}
					//			last(3, 30, 0);
					$(window).off("touchend");
				}

			});
		});
	}

});