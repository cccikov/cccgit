/*EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。
当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。
让我们以下面的例子解释这个过程：*/

//event.js文件
var events = require("events");

var emitter = new events.EventEmitter();
emitter.on("someEvent",function(arg1,arg2){
    console.log("listen1",arg1,arg2);
});// 绑定一个事件someEvent,注册监听器listen1
emitter.on("someEvent",function(arg1,arg2){
    console.log("listen2",arg1,arg2);
});//someEvent事件 注册监听器listen2
emitter.emit('someEvent',"参数1","参数2");//触发someEvent事件
