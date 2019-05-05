;!function($){
      function Stairs(selector,options){
            this.init.apply(this,arguments);
      }
      $.extend(Stairs.prototype,{
            init : function(selector,options){
                  this.ele = null;
                  this.options = options;
                  if(typeof selector !== "string" ||  (this.ele = $(selector)).length === 0 || !(options instanceof Array)||options.length === 0){
                        console.warn("请输入正确的选择内容")
                  }
                  this.floor_timer = null;
                  this.bindEvent();
            },
            bindEvent : function(){
                  this.ele.on("click",this.changeFloor.bind(this));
                  $(window).on("scroll",this.findFloor.bind(this));
            },
            changeFloor : function(evt){
                  var target = evt.target;
                  var index = $(target).index();
                  // 1. 下标 ???? 
                  // this???
                  $(target).addClass("active").siblings().removeClass("active");
                  $("html,body")
                  .stop()
                  .animate({
                        scrollTop : this.options[index]
                  })                  
            },
            findFloor : function(){

                  clearTimeout(this.floor_timer);
                  // 0 1 2 3 4 5 6 7;
                  // 0 600 1200 1800 ...
                  this.floor_timer = setTimeout(function(){
                        var st = $("html,body").scrollTop();
                        this.index = null;
                        this.options.some( (item,index) => {
                              if(st >= item && st < item + 600 ){
                                    this.index = index;
                                    return true;
                              }
                        })
                        // console.log(this.index);
                        this.ele.eq(this.index).addClass("active").siblings().removeClass("active");

                  }.bind(this),80)
                  // console.log(this.index);
            }
      })
      



      window.Stairs = Stairs;
}(jQuery);