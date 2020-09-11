////////////////////
// 用于直播项目的 websocket , 基于原生websocket API 利用node事件封装成发布-订阅模式形式，便于使用 //
////////////////////

/**
 * 自己封装的 websocket js客户端插件
 * 采用发布订阅，模式
 *
 * 将websocket实例和事件实例结合，将websocket的接送信息，发送信息改造为 发布-订阅 模式
 *
 * $ws 会因为重连而改变为一个新的对象
 * $event 但是事件一直都是同一个对象（同一个实例里面）
 * $event 触发的时候，调用都是当前实际的 $ws
 * 所以 $ws 重连不会影响 $event
 */

/* 要区分好 $event.emit() 和 类的emit() */
/* $event.emit() 是事件对象触发事件 */
/* 而 类的emit() 是 websocket 发送消息，可以理解为websocket层面触发通讯，所以也叫emit */
/* 是为了模仿 socket.io on emit */

/* node 事件类 */
const EventEmitter = require('events');

/**
 * 心跳检测
 */
class PingPong {
    constructor(ping, reconn, heartTimeout, waitTimeout) {
        this.heartTimeout = heartTimeout || 3000;
        this.waitTimeout = waitTimeout || 1000;
        this.heartTimer = null;
        this.serverTimer = null;
        /* 事件 */
        this.ping = ping;
        this.reconn = reconn;
    }

    /* 开始/重新开始 心跳检测 */
    start() {
        // 在本轮“事件循环”结束时输出，为了输出的时候不混淆
        // Promise.resolve().then(function () {
        //     console.log('%c\n\n\n\n\n\n心跳检测↓↓↓', "font-size:20px;color:#f44336");
        // });

        var _this = this;
        _this.heartTimer && clearTimeout(_this.heartTimer);
        _this.serverTimer && clearTimeout(_this.serverTimer);

        /* 每 heartTimeout 检测一次 */
        _this.heartTimer = setTimeout(function () {

            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            console.log("%cPing", "font-size:20px;color:#ff9800");
            _this.ping();


            // 等待 waitTimeout 后，还没返回，关闭，重连
            _this.serverTimer = setTimeout(function () {
                console.error("%c心跳停止了", "font-size:20px;color:#ff9800");
                _this.reconn();
            }, _this.waitTimeout);


        }, _this.heartTimeout)
    }

    stop() {
        let _this = this;
        _this.heartTimer && clearTimeout(_this.heartTimer);
        _this.serverTimer && clearTimeout(_this.serverTimer);
    }
}

/**
 * 发布-订阅模式的 websocket
 */
class Socket {
    constructor(url) {
        let _this = this;
        _this.$event = new EventEmitter(); // nodejs 事件实例
        _this.$heartCheck = new PingPong(_this._ping.bind(_this), _this._reconn.bind(_this), 1000 * 60, 1000)
        _this.connect(url);
    }

    /* 只读属性，用函数的话，即使$ws里面的属性变动了，也能得到最新的值 */
    get readyState() {
        return this.$ws.readyState;
    }
    get binaryType() {
        return this.$ws.binaryType
    }
    get bufferedAmount() {
        return this.$ws.bufferedAmount
    }
    get extensions() {
        return this.$ws.extensions
    }
    get protocol() {
        return this.$ws.protocol
    }
    get url() {
        return this.$ws.url
    }


    //////////////
    // 方法 /////
    ///////////

    /**
     * 链接
     * @param {String} url
     */
    connect(url) {
        let _this = this;
        _this.$ws = new WebSocket(url); // websocket实例

        /* websocket 属性 */
        _this.$ws.onclose = function (res) {
            _this.$event.emit("close", res);
        }
        _this.$ws.onerror = function (res) {
            _this.$event.emit("error", res);
        }
        _this.$ws.onopen = function (res) {
            _this.$event.emit("open", res);
            _this.$heartCheck.start();
        }

        /* 接受数据 */
        _this.$ws.onmessage = _this._onmessage.bind(_this); // 利用 bind 将监听器里面的this指向实例，而不是$ws
    }

    /**
     * 关闭 websocket
     * @param {boolean} deep 是否连事件也关闭
     * false时 仅仅只是关闭websocket
     * true时，可视为整个对象销毁，要重新new一个
     */
    close(deep = false) {
        this.$ws.close();
        if (deep) {
            this.$event.removeAllListeners(); // 清除全部事件
            this.$heartCheck.stop(); // 停止心跳检测
        }
    }

    /* send 发送信息，发布信息 */
    emit() {
        let type, data;
        let args = [...arguments];

        if (args.length == 1) {
            data = args[0]
        } else if (args.length > 1) {
            type = args[0]
            data = args[1]
        } else {
            return
        }

        // 先判断是否已经连接上了，如果还在连接中，等待连接完再发送
        let sendDate = Object.assign({}, data, {
            event: type
        })

        if (this.readyState == 0) {
            /* 还没链接上 */
            this._isOpen().then(() => {
                this.$ws.send(JSON.stringify(sendDate))
            }).catch(err => {
                console.error(err)
            });
        } else if (this.readyState == 1) {
            /* 已经连接上了 */
            this.$ws.send(JSON.stringify(sendDate))
        }
    }

    /* 监听事件，订阅信息 */
    on(event, listener) {
        this.$event.on(event, listener);
    }

    /* 监听一次事件，订阅信息 */
    once(event, listener) {
        this.$event.once(event, listener);
    }

    /* 取消监听事件 */
    off(event, listener) {
        this.$event.off(event, listener);
    }

    //////////////
    // 私有方法 //
    /////////////

    /* 判断是否连接了，适用于刚启动的时候 */
    _isOpen() {
        return new Promise((resolve, reject) => {
            this.on("open", function () {
                resolve();
            })
            this.on("error", function () {
                reject("错误");
            })
            this.on("close", function () {
                reject("已关闭");
            })
        })
    }

    /* 私有监听器，内部使用 */
    _privateListener() {
        let _this = this;
        _this.some = function () {
            console.log(this, _this)
        }
    }

    /* 响应接受数据 */
    _onmessage(res) {
        // console.log("%cPong", "font-size:20px;color:#ff9800");
        this.$heartCheck.start(); // 有反应 重新开始心跳检测
        let str = res.data;
        let data = null;
        let reg = /(^\{.*\}$)|(^\[.*\]$)/; // {**} 或者 [**] 的
        if (reg.test(str)) {
            // 有可能是json字符串形式
            try {
                data = JSON.parse(str); // 能被解析为json
            } catch (err) {
                data = {
                    event: "other",
                    content: str
                };
            }
        } else {
            data = {
                event: "other",
                content: str
            };
        }
        this.$event.emit(data.event, data)
    }

    _ping() {
        this.$ws.send("Ping")
    }

    _reconn() {
        this.$ws.close();
        this.connect(this.url);
    }
}
export default Socket
