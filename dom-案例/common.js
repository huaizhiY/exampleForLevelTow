/** 
 * 倒计时
 *  countDown  返回的是当前时间和目标时间的距离 用时分秒表示 
 * 
 *  参数 : 时间字符串 "yyyy/mm/dd[ hh:mm:ss]"
 * 
 *  返回值 : 
 *  {
 *    hour : string,
 *    minute : string,
 *    second : string
 *  }
 * */ 

function countDown(dateString){
      var target = new Date(dateString);
      var now = Date.now();
      //差值时间(单位为ms);
      var Dtime = target.getTime() - now;

      var hour = parseInt(Dtime / 1000 / 3600) ;
      var minute = parseInt((Dtime - hour * 1000 * 3600) / 1000 / 60);
      var second = parseInt((Dtime - hour * 1000 * 3600 - minute * 1000 * 60) / 1000);
      var ms = Dtime % 1000;
      return {
            hour : buling(hour),
            minute : minute,
            second : second,
            ms : ms
      }
}
function buling(num){
      return num < 10 ? "0" + num : num;
}

function _(select){
      // 如果选择的数组只有一项,直接返回这个项而不是数组;
      var doms = document.querySelectorAll(select);
      if(doms.length === 0){
            return null;
      }
      return doms.length === 1 ? doms[0] : doms;
}

// 伪数组转换成真数组的方法;
function _toArray(list){
      return Array.prototype.slice.call(list);
}