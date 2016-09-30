//event.js文件
var events = require("events");
var emitter = new events.EventEmitter();

// 处理函数 #1
var listener1 = function(){
    console.log("监听器 listen1 执行");
}

// 处理函数 #2
var listener2 = function(){
    console.log("监听器 listen2 执行");
}

// 绑定 connection 事件，注册监听器(其实就是处理函数)为 listener1
emitter.addListener('connection',listener1);

// 绑定 connection 事件，注册监听器(其实就是处理函数)为 listener2
emitter.addListener('connection',listener2);

// 返回指定事件的监听器数量。
var listenersNum = events.EventEmitter.listenerCount(emitter,"connection");
console.log("监听器数量为"+listenersNum);

// 触发 connection 事件
emitter.emit("connection");

// 移除监听器 listen1
emitter.removeListener("connection",listener1);
console.log("移除监听器 listen1");

// 触发 connection 事件
emitter.emit("connection");

listenersNum = events.EventEmitter.listenerCount(emitter,"connection");
console.log("监听器数量为"+listenersNum);


