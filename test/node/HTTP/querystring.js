var querystring = require("querystring");

/*
 *  querystring.parse
 */

var str = "foo=bar&baz=qux&baz=quux&corge";
var obj = querystring.parse(str);
console.log(obj);//{ foo: 'bar', baz: [ 'qux', 'quux' ], corge: '' }

var str = "foo=bar&baz=qux&baz=quux&corge";
var obj = querystring.parse(str,null,null,{"maxKeys":0});
console.log(obj);//{ foo: 'bar', baz: [ 'qux', 'quux' ], corge: '' }

str = "foo:bar,baz:qux,baz:quux,corge";//分隔符变成逗号","    分配符变成了冒号":"
obj = querystring.parse(str);
console.log(obj);//{ 'foo:bar,baz:qux,baz:quux,corge': '' }

obj = querystring.parse(str,",",":");//反序列化,重新定义分隔符,分配符
console.log(obj);//{ foo: 'bar', baz: [ 'qux', 'quux' ], corge: '' }

/*
 *  querystring.stringify
 */

var obj = { foo: 'bar', baz: [ 'qux', 'quux' ], corge: '' };
var str = querystring.stringify(obj);//序列化
console.log(str);//foo=bar&baz=qux&baz=quux&corge=

str = querystring.stringify(obj,null,":");//序列化,重新定义分配符
console.log(str);//foo:bar&baz:qux&baz:quux&corge:

str = querystring.stringify(obj,",");//序列化,重新定义分隔符
console.log(str);//foo=bar,baz=qux,baz=quux,corge=

/*
 *  querystring.escape 转义   querystring.unescape反转义
 */

var obj = { foo: 'bar', baz: [ 'qux', 'quux' ], corge: '哈哈' };
var str = querystring.stringify(obj);//序列化
console.log(str);//foo=bar&baz=qux&baz=quux&corge=%E5%93%88%E5%93%88 , nodejs自己转义了 , url有些是不允许有中文

console.log(querystring.parse(str));//{ foo: 'bar', baz: [ 'qux', 'quux' ], corge: '哈哈' }
//在调用stringify或者parse方法时就会自动使用


obj.corge = querystring.escape(obj.corge);//如果先转义
str = querystring.stringify(obj);//再序列化
console.log(str);//foo=bar&baz=qux&baz=quux&corge=%25E5%2593%2588%25E5%2593%2588  结果就会变了,因为调用的时候会在转义多一次,所以不需要自己转义

console.log("哈哈");//哈哈
console.log(querystring.escape("哈哈"));//%E5%93%88%E5%93%88
console.log(querystring.escape(querystring.escape("哈哈")));//%25E5%2593%2588%25E5%2593%2588














