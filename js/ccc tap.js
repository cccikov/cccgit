 var mouseData = {
     sTime: 0,
     eTime: 0,
     sX: 0,
     eX: 0,
     sY: 0,
     eY: 0
 };
 var log = function(msg) {
     console.log(msg);
 };
 var touchStart = function(e) {
     var pos = e.changedTouches[0];
     mouseData.sTime = new Date().getTime();
     mouseData.sX = pos.pageX;
     mouseData.sY = pos.pageY;
 };
 var touchMove = function(e) {
     //        var pos = e.changedTouches[0];
     //        mouseData.eTime = new Date().getTime();
     //        mouseData.eX = pos.pageX;
     //        mouseData.eY = pos.pageY;
     e.preventDefault();
     return false;
 };
 var touchEnd = function(e) {
     var pos = e.changedTouches[0];
     mouseData.eTime = new Date().getTime();
     mouseData.eX = pos.pageX;
     mouseData.eY = pos.pageY;
     var data = onTouchEnd();
     log(data);
     var d = $('body');
     d.append($('<div>间隔：' + data.timeLag + ', 方向：' + data.dir + '</div>'));
 };
 var onTouchEnd = function() {
     //时间间隔
     var timeLag = mouseData.eTime - mouseData.sTime;
     //移动状态，默认乱移动
     var dir = 'move';
     if (mouseData.sX == mouseData.eX) {
         if (mouseData.eY - mouseData.sY > 0) dir = 'down';
         if (mouseData.eY - mouseData.sY < 0) dir = 'up';
         if (mouseData.eY - mouseData.sY == 0) dir = 'tap';
     }
     if (mouseData.sY == mouseData.eY) {
         if (mouseData.eX - mouseData.sX > 0) dir = 'right';
         if (mouseData.eX - mouseData.sX < 0) dir = 'left';
         if (mouseData.eX - mouseData.sX == 0) dir = 'tap';
     }
     return {
         timeLag: timeLag,
         dir: dir
     };
 };

 var touchEvents = function(el, func) {
     el = el || document;
     func = func || function() {};
     el.addEventListener('touchstart', touchStart);
     el.addEventListener('touchmove', touchMove);
     el.addEventListener('touchend', touchEnd);
 };
 var d = $('body');
 touchEvents(d[0]);
