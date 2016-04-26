$(function() {

	$("#year").on('touchstart', function(e) {
		console.log("touchstart");
		var that = $(this);
		var e = e || window.event;

		var nowPoint = oldPoint = e.originalEvent.touches[0].clientY,
			detailPoint = 0;
		var thatTop = that.position().top;
		that.css({
			"transform": "translateY(" + thatTop + "px)",
			"transition": "transform 0.3s cubic-bezier(0, 0.65, 0.25, 1)"
		});

		//移动时
		$(window).on("touchmove", function(e) {
			console.log("touchmove");
			var e = e || window.event;
			e.preventDefault();
			nowPoint = e.originalEvent.touches[0].clientY;
			detailPoint = nowPoint - oldPoint;

			//改变top值
			thatTop += detailPoint;
			console.log(thatTop);
			that.css({
				"transform": "translateY(" + thatTop + "px)",
				"transition": "transform 0s cubic-bezier(0, 0.65, 0.25, 1)"
			});

			oldPoint = nowPoint;
		});

		//松开时
		$(window).on("touchend", function(e) {
			console.log("touchend");
			var e = e || window.event;

			var speed = detailPoint;
			thatTop += speed * 5;
			that.css({
				"transform": "translateY(" + thatTop + "px)",
				"transition": "transform 0.3s cubic-bezier(0, 0.65, 0.25, 1)"
			});
			var timer = setTimeout(function(){
				last(3, 30, 2);
			},300);

			function last(base, height, px) {
				//第几个
				var index = -Math.round(that.position().top / height) + base;
				var value = that.find("li").eq(index).text();
				$("#datetime").val(value);

				thatTop = Math.round(that.position().top / height) * height + px;
				console.log(thatTop);
				that.css({
					"transform": "translateY(" + thatTop + "px)",
					"transition": "transform 0.3s cubic-bezier(0, 0.65, 0.25, 1)"
				});
			}
//			last(3, 30, 0);

			$(window).off("touchmove").off("touchend");

			//			var speed = detailPoint;
			//			var timer = setInterval(function() {
			//				thatTop += -1;
			//				that.css("transform", "translateY(" + thatTop + "px)");
			////				speed++;
			//				console.log(speed);
			//				if (speed >= 0) {
			//					clearInterval(timer);
			//				}
			//
			//			}, 1);

		});
	});
});