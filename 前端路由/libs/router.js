/**
 * 哈希路由插件
 * 
 * 2019.3.11
 * 
 * options = [
 *    {
 *          path:"hashName",
 *          url : "具体页面路径",
 *          callback : function (){}
 *    }
 * ]
 * 
 * function callback( string ){
 * }
 * 
 *  */ 

;;

let Router = (function(){
      function Router(options){
            //参数类型不符跳出函数;
            if(!(options instanceof Array)) throw new Error("参数类型必须为Array");
            this.options = options;
            //获取哈希路径;
            this.hashMap = options.map( item =>{
                  return item.path;
            })
            this.init();
      }
      //添加原型对象方法;
      Object.assign(Router.prototype,{
            init (){
                  //初始化路由事件;
                  window.addEventListener("hashchange",this.handlerRouterStrategy.bind(this))
            },
            handlerRouterStrategy(){
                  //匹配路由表中的哈希路径;
                  let index = null;
                  //当前页面哈希值;
                  let pageHash = window.location.hash.replace(/^#/g,"");
                  //匹配配置表中哈希值;
                  if((index = this.hashMap.indexOf(pageHash)) !== -1){

                        //缓存
                        if(this.options[index].catch) {
                              return this.options[index].callback(this.options[index].catch);
                        }
                        this.loadPage.call(this,this.options[index].url)
                        .then((res)=>{
                              this.options[index].catch = res;
                              this.options[index].callback(res);
                        })
                        .catch((e)=>{
                              return new Error(e);
                        })
                  }
            },
            loadPage(url){
                  return new Promise((resolve,reject)=>{
                        let xhr = new XMLHttpRequest();
                        xhr.open("GET",url);
                        xhr.send(null);
                        xhr.onload = ()=>{
                              resolve(xhr.response);
                        }
                  })
            }
      })

      return Router;
})();