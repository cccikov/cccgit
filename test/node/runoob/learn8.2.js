//event.js文件
var events = require("events");
var emitter = new events.EventEmitter();

// 监听器 #1
var listen1 = function(){
    console.log("监听器 listen1 执行");
}

// 监听器 #2
var listen2 = function(){
    console.log("监听器 listen2 执行");
}

// 绑定 connection 事件，处理函数为 listener1
emitter.addListener('connection',listener1);

// 绑定 connection 事件，处理函数为 listener2
emitter.addListener('connection',listener2);