function fn1() {//不按照AMD的规定，就会变成全局函数，不是模块内调用，好像由于这个文件比较大，加载得最慢，所以输出fuck2比较多，fuck1也有
    return "fuck2"
}
define(["js1"],function (model1){//这个模块还依赖js1模块
	var add = function (x,y){
	　　return x+y;
	};
	var dosomething = function(){
		alert("hi");
	}
	var fn2 = function(){
		return model1.fn1()+1;
	}
	return {
　　	test: add,
		dosomething:dosomething,
		fn2:fn2
	};
});
