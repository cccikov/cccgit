/**
 * 表单正则判断
 */
var reg = {
    required: function (value) {
        return {
            val: value !== '',
            tip: '该字段不能为空'
        }
    },
    tel: function (value) {
        return {
            val: value.match(/^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/),
            tip: '手机号码格式错误'
        }
    },
    email: function (value) {
        return {
            val: value.match(/^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/),
            tip: '电子邮箱格式错误'
        }
    },
    cjk: function (value) {
        return {
            val: value.match(/^[\u4e00-\u9fa5]+$/),
            tip: '请输入汉字'
        }
    },
    alpha: function (value) {
        return {
            val: value.match(/^[a-zA-Z]+$/),
            tip: '请输入字母'
        }
    },
    number: function (value) {
        return {
            val: value.match(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/),
            tip: '请输入数字'
        }
    },
    digits: function (value) {
        return {
            val: value.match(/^\d+$/),
            tip: '请输入正整数'
        }
    },
    url: function (value) {
        return {
            val: value.match(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/),
            tip: 'url格式错误'
        }
    },
    min: function (value, min) {
        return {
            val: value >= min,
            tip: '请输入一个大于或等于' + min + '的值'
        }
    },
    max: function (value, max) {
        return {
            val: value <= max,
            tip: '请输入一个小于或等于' + max + '的值'
        }
    },
    shortest: function (value, shortest) {
        var length = value.length;
        return {
            val: length >= shortest,
            tip: '请输入一个长度不小于' + shortest + '个字符的值'
        }
    },
    longest: function (value, longest) {
        var length = value.length;
        return {
            val: length <= longest,
            tip: '请输入一个长度不大于' + longest + '个字符的值'
        }
    },
    strLength: function (value, strLength) {
        var length = value.length;
        return {
            val: length == strLength,
            tip: '请输入一个长度为' + strLength + '的值'
        }
    },
    tel_email: function (value) {
        return {
            val: this.email(value).val || this.tel(value).val,
            tip: '请输入正确的手机或邮箱'
        }
    },
    isCJKOrAlpha: function (value) {
        return {
            val: value.match(/^[A-Za-z\u4e00-\u9fa5]+$/),
            tip: '只能输入汉字或英文'
        }
    },
    isCAN: function (value) {
        return {
            val: value.match(/^[0-9A-Za-z\u4e00-\u9fa5]+$/),
            tip: '只能输入汉字、英文、数字'
        }
    },
    numOrAlpha: function (value) {
        return {
            val: value.match(/^[A-Za-z0-9]+$/),
            tip: '只能输入字母或数字'
        }
    },
    notCjk: function (value) {
        return {
            val: !value.match(/[\u4e00-\u9fa5]+/),
            tip: '只能输入英文、数字、特殊字符'
        }
    },
    isIdCardNo: function (value) {
        var result = this.getIsIdCardNo(value);
        return {
            val: result,
            tip: '请输入正确的身份证号'
        }
    },


    getIsIdCardNo: function (value) {
        var arrCh, arrInt, arrSplit, bGoodDay, dtmBirth, i, len, nTemp, re, valnum;
        value = value.toString().toUpperCase();
        if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value)) {
            return false;
        }
        len = 0;
        re = 0;
        len = value.length;
        if (len === 15) {
            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            arrSplit = value.match(re);
            dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
            bGoodDay = dtmBirth.getYear() === Number(arrSplit[2]) && dtmBirth.getMonth() + 1 === Number(arrSplit[3]) && dtmBirth.getDate() === Number(arrSplit[4]);
            if (!bGoodDay) {
                return false;
            } else {
                arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
                nTemp = 0;
                value = value.substr(0, 6) + '19' + value.substr(6, value.length - 6);
                i = 0;
                while (i < 17) {
                    nTemp += value.substr(i, 1) * arrInt[i];
                    i++;
                }
                value += arrCh[nTemp % 11];
                return true;
            }
        }
        if (len === 18) {
            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            arrSplit = value.match(re);
            dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
            bGoodDay = dtmBirth.getFullYear() === Number(arrSplit[2]) && dtmBirth.getMonth() + 1 === Number(arrSplit[3]) && dtmBirth.getDate() === Number(arrSplit[4]);
            if (!bGoodDay) {
                return false;
            } else {
                valnum = 0;
                arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
                nTemp = 0;
                i = 0;
                while (i < 17) {
                    nTemp += value.substr(i, 1) * arrInt[i];
                    i++;
                }
                valnum = arrCh[nTemp % 11];
                if (valnum !== value.substr(17, 1)) {
                    return false;
                }
                return true;
            }
        }
        return false;
    },
    notSpecialChar: function (value, regCode, selfTip) {
        var regObj = new RegExp(regCode);
        return {
            val: !value.match(regObj),
            tip: selfTip || '不能包含输入的特殊字符'
        }
    }
}