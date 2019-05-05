; +function($){
      //封闭的空间
      function Drag(selector){
           this.init(selector)
      }
      // $.extend(true,obj1,obj2,obj3);
      // 深浅克隆 => 会不会重新创建一个属性中的引用类型;
      $.extend(Drag.prototype,{
            init:function(selector){
                  this.ele = null;
                  // 参数判断 ? 
                  if(typeof selector !== "string" || (this.ele = $(selector)).length === 0) return console.warn("请输入符合规则的参数");

                  this.bindEvent();

                  this.startCb = $.Callbacks();
                  this.endCb = $.Callbacks();
                  this.moveCb = $.Callbacks();
            },
            bindEvent:function(){
                  this.ele.on("mousedown",$.proxy(this.startDrag,this))
                  this.ele.on("mouseup",$.proxy(this.endDrag,this))
            },
            startDrag:function(evt){
                  var e = evt || window.event;
                  this.offsetX = e.offsetX;
                  this.offsetY = e.offsetY;

                  $(document).on("mousemove",$.proxy(this.moveDrag,this));

                  this.startCb.fire();

                  return false;
            },
            moveDrag:function(evt){
                  var e = evt || window.event;
                  this.ele.css({
                        left : e.clientX - this.offsetX,
                        top : e.clientY - this.offsetY
                  })
                  this.moveCb.fire();
            },
            endDrag:function(){
                  $(document).off("mousemove");
                  this.endCb.fire();
            }
      })


      window.Drag = Drag;
      // 模块化
}(jQuery);