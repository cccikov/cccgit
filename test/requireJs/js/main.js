/*require(['js1', 'js2', 'js3'], function (model1, model2, model3){//第一个参数是一个数组，表示所依赖的模块,.js后缀不可以写。第二个参数是一个当模块加载好之后调用的回调函数
　　// some code here
	console.log(fn1());//fuck
	console.log(model1.fn1());//1 ,调用模块1里面的函数
	console.log(model2.test(1, 2));//3
	model2.dosomething();//alert "hi"
	console.log(model3);//2
});*/

// 若main.js与其他模块的不是放在同一个路径，可以通过以下方式
require.config({
	paths:{
		"a":"./js1",
		"b":"./js2",
		"c":"./js3",
		"d":"js4",
		"e":"js5"
	}
});
require(['a', 'b', 'c'], function (js1, js2, js3){
　　// some code here
	console.log(fn1());//fuck2比较多好像由于这个文件比较大，加载得最慢，fuck1比较少，所以用requirejs模块一定要按照amd规范来写
	console.log(js1.fn1());//1 ,调用模块1里面的函数
	console.log(js2.test(1, 2));//3
	js2.dosomething();//alert "hi"
	console.log(js3);//2
});

require(["b"],function(b){
	console.log(b.test(1,2));//3,先比上面的require()执行
	second();
});
function second(){
	require(["c","d","e"],function(c,d,e){//三个require中最后执行
		console.log(c);//2
		console.log(d.color);//"black"
		console.log(e.fruit);//[Object, Object]
		console.log(e.fruit2);//Object {apple: Object, banana: Object}
		e.buy();// "go to the supermarket"
	});
}