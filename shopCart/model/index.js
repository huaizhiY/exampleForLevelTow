// 处理耦合的模块;  => 业务逻辑模块;
// 引入渲染功能模块; => render依赖jQuery ; 
// 1. 在业务逻辑模块之中引入jQuery => 这样的引入不可靠;  可能导致依赖没有加载成功直接就执行了render代码，会导致报错;
// 2. 依赖前置; 在每个模块定义前务必引入需要的依赖; 
define(["jquery" , "./render","./loaddata","./carts"], function( $ , render , loaddata ,carts) {
      'use strict';
      // 业务实现;
      var $goods_ele    = $(".goods-list .row");
      var btn_carts     = $(".btn-carts");
      var title         = $(".content-title")
      var btn_goodslist = $(".btn-goodslist");
      var cache = null;
      var def = loaddata.init();
      def.then(function(res){
            cache = res.goods_list;
            var html = render.init(res.goods_list,"goods_list");
            $goods_ele.html(html);
            // 页面渲染结束后,调用carts;
            carts.init();
      })
      // 选择元素;


      btn_carts.on("click" , function(){
            $(this).addClass("active")
            .siblings()
            .removeClass("active");
            renderCartList()
      })

      function renderCartList(){
            var html = render.init(cache,"carts_list");
            $goods_ele.html(html);
            title.html("购物车");
      }

      btn_goodslist.on("click" , function(){
            $(this).addClass("active")
            .siblings()
            .removeClass("active");
            var html = render.init(cache,"goods_list");
            $goods_ele.html(html);
            title.html("商品列表");
      })
      console.log(carts);

      carts.add(renderCartList,"changeNum");

});