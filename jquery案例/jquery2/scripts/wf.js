// 1. 当前元素里面的子集元素宽度是多少,显示的宽度是多少，排列成多少行合适;
// 2. 排列;


//tip 所有dom对象均为 jquery DOM;
;(function($){
      function WaterFull(parent,options){
            this.init.apply(this,arguments);
      }

      $.extend(WaterFull.prototype,{
            init : function(parent,options){
                  this.loadCb = $.Callbacks();
                  // 当数据加载结束,我们会1.渲染数据;
                  this.parent = $(parent);
                  this.render = options.render;
                  this.url = options.url ;
                  this.data = options.data ? options.data : {};
                  this.margin = 20;
                  this.resizeTimer = null;
                  this.loadCb.add(this.render.bind(this));
                  this.loadCb.add(this.setParentWidth.bind(this));
                  this.loadCb.add(this.sort.bind(this));
                  this.loadMsg()
                  // 参数判断;
                  this.resize();
            },
            loadMsg : function(){
                  $.ajax(this.url,{
                        data : this.data
                  }).then(this.loadCb.fire,this.error)
            },
            error : function(){
                  alert("出了错了");
            },
            setParentWidth:function(){
                  // 所有子集元素;
                  this.children = this.parent.children();
                  var cWidth = document.documentElement.clientWidth;
                  var eleWidth = this.children.width();
                  //应该存在多少列;
                  this.cloums = parseInt(cWidth / eleWidth); 
                  //还原定位样式
                  this.children.css({
                        position:function(index){
                              if(index < this.cloums){
                                    return "static";
                              }else{
                                    return "absolute";
                              }
                        }.bind(this)
                  })
                  this.parent.css({
                        width : this.cloums * this.children.width() + this.margin * (this.cloums + 1),
                        margin : "0 auto"
                  })
            },
            sort : function(){
                  var heightArray = [];
                  $.each(this.children , function(index,item){
                        // console.log(item);
                        var _ele = $(item);
                        if(index < this.cloums){
                              heightArray.push(_ele.height());
                        }else{
                              var min = Math.min.apply(false,heightArray);
                              var min_index = heightArray.indexOf(min);

                              _ele.css({
                                    left : this.children.eq(min_index).offset().left,
                                    top : min + this.margin,
                                    margin : 0
                              })
                              heightArray[min_index] += _ele.height() + this.margin;
                        }
                  }.bind(this))
            },
            resize : function(){
                  $(window).resize(()=>{
                        clearTimeout(this.resizeTimer);
                        this.resizeTimer = setTimeout( ()=>{
                              this.setParentWidth();
                              this.sort();
                        },500)
                  })
            }
      })


      window.WaterFull = WaterFull;
})(jQuery)
      