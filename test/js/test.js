let str1 = "test/css/**/*.less"
let str2 = "D:\\cccgit\\test\\css\\css\\css\\css\\css\\deepTest.less"
let str3 = "test/css"


let ori1 = str1 = str1.replace(/\\/g,"/");
let ori2 = str2 = str2.replace(/\\/g,"/");
let ori3 = str3 = str3.replace(/\\/g,"/");


function middlePath(allPath,path,destPath){
    allPath = allPath.replace(/\\/g,"/");
    path = path.replace(/\\/g,"/");
    destPath = destPath.replace(/\\/g,"/");

    if(allPath.includes("**")){
        let index1 = allPath.indexOf("**");
        allPath = allPath.slice(0,index1);

        let index2 = path.indexOf(allPath) + allPath.length;
        path = path.slice(index2);
        path = path.split("/").slice(0,-1).join("/");

        if(destPath.endsWith("/")){
            destPath = destPath.slice(0,-1);
        }
    }
    return destPath+ "/" + path
}



console.log(str1,str2,str3);
console.log(middlePath(str1,str2,str3),ori2);