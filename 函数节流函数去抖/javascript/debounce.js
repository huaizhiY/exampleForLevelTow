/** 
 * 函数去抖案例:
 * 
 * 如有不同意见欢迎讨论 邮箱:931673916@qq.com 
 * 
 * 该案例为无限加载部分功能, 主要在判定是否需要加载使用函数去抖。说明函数去抖作用
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
      window.addEventListener("scroll",debounce(isload,80))

      function debounce(cb,delay){
            var timer = null;
            return  function(){
                  clearTimeout(timer);
                  timer = setTimeout(function(){
                        cb("#debounce");
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