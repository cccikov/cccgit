require.config({
	paths:{
		js1:"./a",
		js2:"./b",
		js3:"./c"
	}
});
require(['js1', 'js2', 'js3'], function (js1, js2, js3){
　　// some code here
	console.log(js2.test(1,2));
	js2.dosomething();
	console.log(js3)
});