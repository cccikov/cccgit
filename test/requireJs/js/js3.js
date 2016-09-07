function fn1() {//不按照AMD的规定，就会变成全局函数，不是模块内调用
    return "fuck3"
}
define(["js2"],function (js2){//这个模块依赖js2模块
	return 	js2.fn2();
});