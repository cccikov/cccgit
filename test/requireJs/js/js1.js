function fn1(){
	return 1
}
define(function(){
	var fn1 = function (){
		return 1
	}
	return{
		fn1:fn1
	}
});