var fs = require("fs");

fs.readFile('learn7.2attach.txt', function(err,data){
    if(err){
        console.log(err.stack);
        return;
    }
    console.log(data.toString());
});
console.log('程序执行完毕');