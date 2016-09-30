/*
 EventEmitter 的特殊事件
    error
    newListener
    removeListener
*/

var events = require("events");
var emitter = new events.EventEmitter();

var errorListerner = function(){
    console.log("触发error事件\nEventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并输出错误信息。我们一般要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃");
}
emitter.on('error',errorListerner);

emitter.on('removeListener',function(){
    console.log("移除了一个监听器");
});

emitter.on('newListener',function(){
    console.log("绑定新的监听器");
});


var listener1 = function(){
    console.log("监听器1");
}
var listener2 = function(){
    console.log("监听器2");
}

// 绑定了两个监听器到 connection 事件
emitter.on("connection",listener1);
emitter.on("connection",listener2);

// 触发error事件
emitter.emit("error");

// 移除error的监听器
emitter.removeAllListeners("error");
console.log("移除error的监听器,然后再次触发error事件\n\n********会报错并且退出************");

// 再次触发触发error事件
emitter.emit("error");

console.log("应该是看不到我的出现的");

