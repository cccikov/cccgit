// Node.js 创建第一个应用

var http = require("http");// 使用 require 指令来载入 Node.js 自带的 http 模块

/*
 *  创建服务器
 *  调用 http 模块提供的函数： createServer 。这个函数会返回 一个对象，这个对象有一个叫做 listen 的方法，这个方法有一个数值参数， 指定这个 HTTP 服务器监听的端口号。
 */
http.createServer(function(request,response){
    // 发送 http 头部
    // http 状态码 : 200 : ok
    // 内容类型: text/plain
    response.writeHead(200,{'Content-Type':"text/plain"});

    // 发送响应数据 "hello world"
    response.end("hello world");
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');