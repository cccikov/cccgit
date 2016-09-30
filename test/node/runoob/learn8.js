/*events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。
*/
// 创建eventEmitter 对象
var event = new (require('events').EventEmitter)();
// EventEmitter 对象如果在实例化时发生错误，会触发 'error' 事件。当添加新的监听器时，'newListener' 事件会触发，当监听器被移除时，'removeListener' 事件被触发。


event.on("some_event",function(){
	console.log("some_event 事件触发")
});

setTimeout(function(){
    event.emit('some_event');
}, 1000);