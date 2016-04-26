

define(["js1"],function (js1){
	var add = function (x,y){
	　　return x+y;
	};
	var dosomething = function(){
		alert("hi");
	}
	var fn2 = function(){
		return js1.fn1()+1;
	}
	return {
　　	test: add,
		dosomething:dosomething,
		fn2:fn2
	};
});
