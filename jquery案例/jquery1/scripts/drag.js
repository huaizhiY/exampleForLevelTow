/**
 * 拖拽插件
 * 
 * @param selector 选择符;
 * @param options {
 * 
 * }
 */
;;+function($){
      // console.log($);
      function Drag( selector , options ){
            //变量声明;
            this.init.apply(this,arguments);
      }
      // jquery 提供了一个方法 对象合并的; 兼容 $.extend();
      //
      // var obj = {};
      // var obj2 = {a:1,b:{}};
      // var obj3 = $.extend(true,obj,obj2);
      // console.log(obj3,obj3.b == obj2.b);
      $.extend(Drag.prototype,{
            init : function(selector,options){
                  // 1. 是否是符合规则的参数; 参数判断;
                  // 一个插件的自我修养 => 不能用就别浪费人家性能;
                  this.ele = null;
                  if(typeof selector !== "string" || (this.ele = $(selector)).length === 0 ){
                        return console.warn("请输入正确的选择符");
                  }
                  //鼠标按下时相对于元素的X轴值和Y轴值;
                  this.offsetX = null;
                  this.offsetY = null;

                  // 默认参数;
                  var default_options = {
                        startCb : [],
                        moveCb : [],
                        endCb : []
                  };
                  // 参数合并;
                  this.options = $.extend(default_options,options);

                  // 定义好发布者;
                  this.startPub = $.Callbacks();
                  this.movePub = $.Callbacks();
                  this.endPub = $.Callbacks();

                  this.sub();

                  this.bindEvent();
            },
            sub : function(){
                  // 订阅三部分内容;
                  this.options["startCb"].forEach( item => {
                        this.startPub.add(item)
                  })
                  this.options["moveCb"].forEach( item => {
                        this.movePub.add(item)
                  })
                  this.options["endCb"].forEach( item => {
                        this.endPub.add(item)
                  })
            },
            bindEvent : function(){
                  // $.proxy() === bind ;
                  this.ele.on("mousedown",$.proxy(this.startDrag,this))
                  this.ele.on("mouseup",$.proxy(this.endDrag,this))
            },
            startDrag : function(evt){
                  var e = evt || window.event;
                  this.offsetX = e.offsetX;
                  this.offsetY = e.offsetY;

                  $(document).on("mousemove",$.proxy(this.moveDrag,this))

                  this.startPub.fire();
                  return false; 
            },    
            moveDrag : function(evt){
                  var e = evt || window.event;
                  this.ele.css({
                        left : e.clientX - this.offsetX,
                        top : e.clientY - this.offsetY
                  })
                  this.movePub.fire();
            },
            endDrag : function(){
                  $(document).off("mousemove",$.proxy(this.moveDrag,this));
                  this.endPub.fire();
            }
      })


      window.Drag = Drag;
}(jQuery);