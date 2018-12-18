// 通用的工具 ;
// 通用的函数封装。

function _(selector){
      var ele = document.querySelectorAll(selector);
      if(ele.length == 0) return null;
      return  ele.length == 1 ? ele[0] : ele; 
}
function _ajax(url){
      return new Promise(function(resolve , reject){
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.send(null);
            xhr.onload = function(){
                  if(xhr.status === 200){
                        resolve(xhr.response);
                  }
            }
      })
}
function _jsonp(url , cb){
      return new Promise(function( resolve , reject ){
            cb = cb ? cb : "callback";
            var randomName = "cb"+Date.now();
            var script = document.createElement("script");
            url += (/\?/.test(url) ? "&" : "?") + `${cb}=${randomName}`;
            script.src = url;
            document.body.appendChild(script);
            script.onload = function(){
                  this.remove();
            }
            window[randomName] = function(res){
                  resolve(res)
            }
      })
}
// 兼容型伪数组转换成真数组;
function _slice(args){
      return Array.prototype.slice.call(args);
}

function _removeClass(dom , className){
      return  dom.className = dom.className.replace(className, "");
}