// 创建eventEmitter 对象
var event = new (require('events').EventEmitter)();
// EventEmitter 对象如果在实例化时发生错误，会触发 'error' 事件。当添加新的监听器时，'newListener' 事件会触发，当监听器被移除时，'removeListener' 事件被触发。


event.on("some_event",function(){
	
});
