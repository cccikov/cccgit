function fn1() {//不按照AMD的规定，就会变成全局函数，不是模块内调用，这样好容易出错
    return "fuck"
}
define(function() {//模块js1,按照AMD的规定
    var fn1 = function() {
        return 1
    }
    return {
        fn1: fn1
    }
});
