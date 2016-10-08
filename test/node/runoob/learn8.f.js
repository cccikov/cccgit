var eventEmitter = require("events").EventEmitter;//载入 events模块 并获取EventEmitter 构造函数
var emt1 = new eventEmitter();//emitter实例1
var emt2 = new eventEmitter();//emitter实例2

function cut(str){//打印分割线
    var str = str || "*******************************";
    console.log("\n***" + str + "***\n");
}

cut("begin");

/*
 * emt1 的事件event1
 */
function emt1Event1(num,name){
    console.log("我是emt1 - event"+num+" - "+name+"1");
}
emt1.on('event1',emt1Event1);//emt1 的event1注册一个监听器1 //

// 其实on 和 addListener是一样的
console.log("其实on 和 addListener是一样的\n在event.js EventEmitter.prototype.on = EventEmitter.prototype.addListener\n觉得由于是on方便,而addListener具有语义化一点\n")
emt1.on('event1',function(arg1,arg2,arg3){//emt1 的event1注册一个监听器2
    console.log("我是emt1 - event"+arg1+" - "+arg2+"2 "+arg3);
});
emt1.on('event1',function(num,name){//emt1 的event1注册一个监听器3
    console.log("我是emt1 - event"+num+" - "+name+"3");
});
emt1.on('event1',function(num,name){//emt1 的event1注册一个监听器4
    console.log("我是emt1 - event"+num+" - "+name+"4");
});
emt1.on('event1',function(num,name){//emt1 的event1注册一个监听器5
    console.log("我是emt1 - event"+num+" - "+name+"5");
});
emt1.on('event1',function(num,name){//emt1 的event1注册一个监听器6
    console.log("我是emt1 - event"+num+" - "+name+"6");
});
emt1.on('event1',function(num,name){//emt1 的event1注册一个监听器7
    console.log("我是emt1 - event"+num+" - "+name+"7");
});
emt1.on('event1',function(num,name){//emt1 的event1注册一个监听器8
    console.log("我是emt1 - event1 - "+name+"8");
});
emt1.on('event1',function(num,name){//emt1 的event1注册一个监听器9
    console.log("我是emt1 - event1 - "+name+"9");
});
emt1.on('event1',function(num,name){//emt1 的event1注册一个监听器10
    console.log("我是emt1 - event1 - "+name+"10");
});

/*
 * emt1 的事件event2
 */

emt1.on('event2',function(num,name){//emt1 的event1注册一个监听器1
    console.log("我是emt1 -- event"+num+" -- "+name+"1");
});


console.log("\nemt1的event1有注册监听?\n "+emt1.emit("event1",1,"监听器","参数三"));//每个监听器的参数是共用的 , 触发事件event1 , 返回事件有注册监听返回 true，否则返回 false。
console.log("\nemt1的event2有注册监听?\n "+emt1.emit("event2",2,"监听器","参数三"));//触发事件event2
console.log("\nemt1的event3有注册监听?\n "+emt1.emit("event3",3,"监听器","参数三"));//触发事件event2

console.log("\nevent1监听个数"+emt1.listeners("event1").length);//返回指定事件的监听器数组 的 长度,即监听器数量
console.log("event2监听个数"+eventEmitter.listenerCount(emt1,"event1"));//通过类方法 返回指定事件的监听器数量。
console.log("event3监听个数"+emt1.listeners("event3").length);

// 现在还没有报错,是因为默认每个事件都可以有10个监听器
cut("现在还没有报错,是因为默认每个事件都可以有10个监听器");

// 接下来会在event1上面注册多一个事件
cut("接下来会在event1上面注册多一个监听器")

emt1.on('event1',function(num,name){//注册第11个监听器
    console.log("我是emt1 - event1 - "+name+"11");
});//报警告

cut("报警告了");

console.log("event1监听个数"+emt1.listeners("event1").length);//11个

emt1.emit("event1",1,"监听器","参数三");//还是可以执行第11个监听器

cut("虽然还是可以执行,第11个监听器也执行了,但是上面报错啊");

cut("将emt1里面的事件的监听器最大可允许数目设置为12,并会在event1上面注册第12个监听器");

emt1.on('event1',function(num,name){//注册第12个监听器
    console.log("我是emt1 - event1 - "+name+"11");
});

emt1.setMaxListeners(12)//将emt1里面的事件的监听器最大可允许数目设置为12;
console.log("event1监听个数"+emt1.listeners("event1").length);//12个


/*
 * 清除事件
 */
 // 清除一个监听器
emt1.removeListener("event1",emt1Event1);//只能清除 通过具名函数 注册的监听器
console.log("\nevent1监听个数"+emt1.listeners("event1").length);//12个

// 清除某个事件全部监听器
emt1.removeAllListeners("event1");
console.log("\nevent1监听个数"+emt1.listeners("event1").length);//0个
console.log("event2监听个数"+emt1.listeners("event2").length);//1个

// 清除全部事件全部监听器
emt1.removeAllListeners();
console.log("\nevent1监听个数"+emt1.listeners("event1").length);//0个
console.log("event2监听个数"+emt1.listeners("event2").length);//0个


cut("*end*");



