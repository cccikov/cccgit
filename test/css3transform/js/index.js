$(function() {
	var exp = /100px/;
	var rotateArr = ["rotate3d(0,0,0,0deg)", "rotate3d(0,1,0,90deg)", "rotate3d(0,1,0,180deg)", "rotate3d(0,1,0,-90deg)", 'rotate3d(1,0,0,90deg)', "rotate3d(1,0,0,-90deg)"];

	//模拟hover
	//	$("ul").on("mouseenter", function() {
	//		$(this).find("li").each(function(index, key) {
	//			console.log($(key).css("transform", rotateArr[index] + " translate3d(0,0,200px)"));
	//		});
	//	});
	//	
	//	$("ul").on("mouseleave", function() {
	//		$(this).find("li").each(function(index, key) {
	//			console.log($(key).css("transform", rotateArr[index] + " translate3d(0,0,100px)"));
	//		});
	//	});
});