let str1 = "test/css/**/*.less"
let str2 = "D:\\cccgit\\test\\css\\css\\css\\css\\css\\deepTest.less"
let str3 = "test/css/"

let ori1 = str1 = str1.replace(/\\/g,"/");
let ori2 = str2 = str2.replace(/\\/g,"/");
let ori3 = str3 = str3.replace(/\\/g,"/");

if(str3.endsWith("/")){
    str3 = str3.slice(0,-1);
}

if(str1.includes("**")){
    let index = str1.indexOf("**");
    str1 = str1.slice(0,index);
}

let index = str2.indexOf(str1) + str1.length;
str2 = str2.slice(index);

str2 = str2.split("/").slice(0,-1).join("/");

console.log(str1,str2,str3);
console.log(ori3 + str2,ori2);