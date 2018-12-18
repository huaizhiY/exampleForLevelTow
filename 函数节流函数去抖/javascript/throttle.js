/** 
 * 函数去抖案例:
 * 
 * 如有不同意见欢迎讨论 邮箱:931673916@qq.com
 * 
 * 该案例为无限加载部分功能, 主要在判定是否需要加载使用函数节流。说明函数节流作用
 * 
 * 2018.12.18
 * 千锋教育-杨怀智
*/
;;(function(){
      // 普通事件
      window.addEventListener("scroll",normal)
      function normal(){
            isload("#normal")
      }
      function isload(type){
            show(type)
            //该函数存在大量逻辑....
      }
      // 去抖事件
      window.addEventListener("scroll",throttle(isload,80))

      //去抖封装
      function throttle(cb,delay){
            // 使用闭包保存变量主要的目的是为了在封装内部解决变量使用问题,不占用全局命名空间。
            var timer = null;
            return  function(){
                  if(timer !== null) return ;
                  timer = setTimeout(function(){
                        cb("#throttle");
                        timer = null;
                  },delay)
            }
      }
      //展示函数
      function show(type){
            var ele = document.querySelector(type);
            if(typeof ele.count !== "number"){
                  ele.count = 0;
            }
            ele.value = ele.count ++;
      }
})();