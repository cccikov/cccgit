/*收集一些平时工作的封装的方法*/

// 数字保留两个小数,并且逢千有个逗号
function fixNum(num){
    if(typeof(num)=="string"){
        num = Number(num);
    }
    var numArr = num.toFixed(2).split(".");
    numArr[0] = Number(numArr[0]).toLocaleString();
    return numArr.join(".");
}