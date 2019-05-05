;;(function($){
      var pageLoaded = $.Callbacks();
      pageLoaded.add(init);

      var dataLoaded = $.Callbacks();
      dataLoaded.add(renderPage);
      dataLoaded.add(renderButton);

      var sendData = {
            subject_id:5581,
            page:1,
            size:100
      };

      // 商品数据
      var GLOBAL_DATA = null;
      // 商品总数;
      var GLOBAL_TOTAL = 0;
      // 每页显示多少个;
      var showCount = 4;
      var pageCount = 1;

      var goodsListEle = $("#goods_list")

      function init(){
            $.ajax("http://localhost/pxx",{
                  data : sendData,
                  dataType : "json"
            })
            .then(dataLoaded.fire)
      }

      function renderPage(res){
            if(GLOBAL_DATA === null){
                  GLOBAL_DATA = res;
            }
            var goodsList = GLOBAL_DATA.goods_list;
            GLOBAL_TOTAL = goodsList.length;

            let html = "";
            for(var i = showCount *( pageCount - 1) ; i <= showCount * pageCount - 1 ; ){

                  item  = goodsList[i++] ;
                  if(!item) break;
                  html +=  `<li class="goods-item">
                              <div class="img-box">
                                    <img src="${item.hd_thumb_url}" 
                                    data-src="${item.hd_thumb_url}"
                                    alt="">
                              </div>
                              <div class="title-box">
                                    <p>${item.goods_name}</p>
                              </div>
                              <div class="detail-box">
                                    <div class="price-box">
                                          <span class="new">
                                          ￥${(item.normal_price/100).toFixed(2)}
                                          </span>
                                          <span class="old" style="text-decoration:line-through">
                                                ￥${(item.market_price/100).toFixed(2)}
                                          </span>
                                    </div>
                                    <div class="bought">
                                          ${item.sales_tip}
                                    </div>
                              </div>
                  </li>`
            }
            goodsListEle.html(html);
      }
      function renderButton(){
            $(".pagination").pagination({
                  totalData : GLOBAL_TOTAL,
                  showData : showCount,
                  eleCls : "btn btn-default",
                  activeCls : "btn btn-danger active",
                  prevCls : "btn btn-primary",
                  nextCls : "btn btn-primary",
                  callback : function(api){
                        //重新渲染页面;
                        // console.log(api);
                        pageCount = api.getCurrent()
                        renderPage();
                  }
            });
      }



      $(pageLoaded.fire);// 一旦页面加载结束立即执行所有代码;

      //  1      2         3         n 
      //  4  
      // 0 ~ 3   4 ~ 7  8 ~ 11   4 * (n - 1)  4*n - 1;      
})(jQuery);