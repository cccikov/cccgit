$(function() {
	var arr = [];
	arr["year"] = "2013";
	arr["month"] = "04";
	arr["day"] = "04";

	timeMove($("#year"), true, 95, -125, "year");
	timeMove($("#month"), true, 95, -245, "month");
	timeMove($("#day"), true, 95, -815, "day");

	/*
	 * 滚动函数
	 * obj为滚动对象
	 * flag 用于 防止引发多次 touch事件，所以touchend立即为false
	 * min 最小的offsetTop值
	 * max 最大的offsetTop值
	 * str 判断是哪个 以及给 arr数组 对应 关联数组的下标
	 */
	function timeMove(obj, flag, min, max, str) {
		obj.on('touchstart', function(e) {

			//日期选择 时操作 用于 判断由于月份的不同 最大日期
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

			/*
			 * nowPoint 为点下的值（或者为新值）
			 * oldPoint 旧值
			 * detailPoint 变化值
			 */
			var nowPoint = oldPoint = e.originalEvent.touches[0].clientY,
				detailPoint = 0;

			//点下时offsetTop值（偏移值）
			var thatTop = that.position().top;

			//that.css({
			//	"transition": "transform 0s cubic-bezier(0, 0.65, 0.25, 1)"
			//});//之前用于transition 归0 防止 手指移动时也有过渡，现在直接在touchmove设了

			//封装移动函数，用于手指移动时，以及松开缓冲运动
			function transformFn(offsetTop, time) {
				that.css({
					"transform": "translateY(" + offsetTop + "px)",
					"transition": "transform " + time + "s cubic-bezier(0, 0.65, 0.25, 1)"
				});
			}

			//移动时
			$(window).on("touchmove", function(e) {
				//				console.log("touchmove");
				if (flag) {
					var e = e || window.event;
					e.preventDefault();//阻止浏览器的默认事件
					
					nowPoint = e.originalEvent.touches[0].clientY;//新值
					detailPoint = nowPoint - oldPoint;//变化值 ， 速度

					//改变offsetTop值 ， 通过变化值 与 点下时offsetTop值 递加 不断移动
					if ((thatTop + detailPoint) <= min && (thatTop + detailPoint) >= trueMax) {
						thatTop += detailPoint;
					} else if ((thatTop + detailPoint) > min) {
						detailPoint = 0;
						thatTop = min;
					} else {
						detailPoint = 0;
						thatTop = trueMax;
					}

					transformFn(thatTop, 0);

					oldPoint = nowPoint;//旧值
				}

			});

			//松开时
			$(window).on("touchend", function(e) {
				//				console.log("touchend");
				if (flag) {
					flag = false;
					var e = e || window.event;

					var speed = detailPoint; // 定义速度 
					//			thatTop += speed * 8;
					if (speed > 1 || speed < -1) {
						if ((thatTop + speed * 8) <= min && (thatTop + speed * 8) >= trueMax) {
							thatTop += speed * 8; // 用速度乘以一定的值（这里为8）来确定缓冲距离
						} else if ((thatTop + speed * 8) >= min) {
							speed = 0;
							thatTop = min;
						} else {
							speed = 0;
							thatTop = trueMax;
						}

						transformFn(thatTop, 0.3);
					}

					//
					var timer = setTimeout(function() {
						last(3, 30, 0);
					}, 350);


					/*
					 * base用与算是第几个
					 * px用于修正对齐时产生的偏移
					 * 对齐方法是通过  "offsetTop" 整除（四舍五入）'每个小块高度' 再乘回  '每个小块高度' 来确定     每个一段"offsetTop"范围（这段范围宽度即是每个小块高度）的最终的偏移 ，由于这样会出现与我们目标位置有所偏移，所以用px去修正这个偏移
					 */
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


						//对齐
						thatTop = Math.round(that.position().top / height) * height + px;
						transformFn(thatTop, 0.3);

						flag = true;
					}
					//			last(3, 30, 0);
					$(window).off("touchmove").off("touchend");//用于清除window 的touchmove 以及 touchend 事件，以防每次手指移动时或者离开屏幕都会触发事件
				}

			});
		});
	}

});