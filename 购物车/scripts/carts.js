;(function($){
/**
 * 变量区
 * 
 * @var   loadedData  观察者模式 数据加载的观察者;
 * 
 */
      var loadedData = $.Callbacks();
      var addCart = $.Callbacks();
      var reduceCart = $.Callbacks();
      var choiceShop = $.Callbacks();
      var showCharts = $.Callbacks();
      var cartsList = $.Callbacks();
      var cartsListAdd = $.Callbacks();
      var cartsListReduce = $.Callbacks();

/**
 *  数据仓库;
 *    
 *    pxxList ： ajax加载过来 pxx数据; {key:object}
 */

var GLOBAL_STORE = {
      pxxList : {},
      // carts : {
      //       // "balala": [{
      //       //       id : 01,
      //       //       count : 1,
      //       //       price : 998,
      //       // }],
      //       // "hualala" : []
      // },
      carts : getCarts(),
      shopAttr : ""
}

/**
 *  函数区
 *  
 *   @function renderBtn 渲染btn;
 *   @function init 初始化页面;
 * 
 */

      function renderBtn(res){
            var list = res.goods_list;
            // GLOBAL_STORE.pxxList = list;
            var html = "";
            $.each(list, (key,item) => {
                  GLOBAL_STORE.pxxList[key] = item;
                  html += `<button class="btn btn-lg btn-primary" data-attr="${key}">${item.title}</button>`
            })
            $(".shop-list").html(html);
      }
      // 自动触发第一个按钮;
      function hanlderFirstBtn(){
            $(".shop-list").children().eq(0).trigger("click");
      }
      // 选择商店功能;
      function choiceRenderShop(){
            var attr = $(this).attr("data-attr");
            //GLOBAL_STORE
            var list = GLOBAL_STORE.pxxList[attr].data;
            var html = "";
            list.forEach( item => {
                  html += `<li class="goods-box">
                              <div class="logo">
                                    <img src="${item.hd_thumb_url}" alt="">
                              </div>
                              <div class="price">${(item.normal_price/100).toFixed(2)}￥</div>
                              <div class="options" data-id="${ item.goods_id }">
                                    <span class="glyphicon glyphicon-minus btn btn-danger reduce-carts"></span>
                                    <span class="count item-count">0</span>
                                    <span class="glyphicon glyphicon-plus btn btn-default add-carts"></span>
                              </div>
                        </li>`
            })
            $(".goods-list").html(html);
            GLOBAL_STORE.shopAttr = attr;
      }
     
      // 增加购物车数量;
      function addCartsData(){
            var optEle = $(this).parent();
            var id = optEle.attr("data-id");
            var carts = null;
            // if 尽可能减少; 12万行if; 
            // 变量;
            
            if(!(GLOBAL_STORE.carts[GLOBAL_STORE.shopAttr] instanceof Array)){
                  GLOBAL_STORE.carts[GLOBAL_STORE.shopAttr] = [];
            }
            // 一定是数组;
            // 判定是否存在相同的内容;
            var hasSameGoods = GLOBAL_STORE.carts[GLOBAL_STORE.shopAttr].some( item => {
                  if(item.id == id){
                        item.count ++;
                        return true;
                  }
            })

            if(!hasSameGoods){
                  // var data = {
                  //       id : id,
                  //       count : 1,
                  //       price : parseFloat(optEle.prevAll(".price").html())
                  // }
                  GLOBAL_STORE.carts[GLOBAL_STORE.shopAttr].push({
                        id : id,
                        count : 1,
                        price : parseFloat(optEle.prevAll(".price").html())
                  });
            }

            // console.log(GLOBAL_STORE);

            saveData("carts",GLOBAL_STORE.carts)

      }     
      // 减少购物车数量
      function reduceCartsData(){
            var optEle = $(this).parent();
            var id = optEle.attr("data-id");
            var list = GLOBAL_STORE.carts[GLOBAL_STORE.shopAttr];
            
            list.some((item,index) => {
                  if(item.id == id){
                        item.count --; 
                        item.count == 0 ? removeCartsData(id,index) : "";
                        return true;
                  }
            })
            saveData("carts",GLOBAL_STORE.carts)
      }
      // 删除购物车数据;
      function removeCartsData(id,index){
            var list = GLOBAL_STORE.carts[GLOBAL_STORE.shopAttr];
            // 1. 隐藏dom;
            // reload 会让出主线程 ( ) ,主线程执行完毕时再执行 reload();
            // location.reload();
            $(`.options[data-id=${id}]`).children("span:lt(2)").hide();
            $(`.options[data-id=${id}]`).eq(1).parent().remove()
            // 2. 删除数据;
            list.splice(index,1);
            console.log(list);
      }
      // 渲染购物车数据;
      function renderCartsData(){
            let { carts , shopAttr } = GLOBAL_STORE;
            if(!(carts[shopAttr] instanceof Array)) return false;
            carts[shopAttr].forEach( item => {
                  $(`.options[data-id=${item.id}]`).children().show()
                  .end()
                  .find(".count")
                  .html(item.count);
            })
      }
      // 保存数据;
      function saveData(type,json){
            localStorage.setItem(type,JSON.stringify(json));
      }
       // 初始化获取购物车；
      function getCarts(){
            if(localStorage.getItem("carts")){
                  return JSON.parse(localStorage.getItem("carts"))
            }else{
                  return {};
            }
      }
      // 渲染购物车;
      function renderCarts(){
            // 1. 查找购物车数量;
            var cartsList = GLOBAL_STORE.carts[GLOBAL_STORE.shopAttr];
            // console.log(cartsList);
            cartsList  = cartsList ? cartsList : [];
            var total = 0;
            cartsList.forEach( item => {
                  total += item.count;
            })
            $(".carts-img .count").html(total);            
      }
      //渲染购物车部分的列表;
      // function renderCartsList(){
      //       var cartsList = GLOBAL_STORE.carts[GLOBAL_STORE.shopAttr];
      //       if(!cartsList) return false;
      //       var goodsList = GLOBAL_STORE.pxxList[GLOBAL_STORE.shopAttr].data;
      //       // 把数组之中的对象变成对value数组;
      //       cartsList = cartsList.map( item => {
      //             return Object.values(item);
      //       })
      //       // id列表;
      //       var idList = cartsList.map( item => {
      //             return item[0];
      //       })
      //       // 根据购物车信息筛选出来的商品数据;
      //       var cartsGoodsList = [];
      //       cartsGoodsList = goodsList.filter( item => {
      //             return idList.indexOf(item.goods_id.toString()) !== -1;
      //       })
      //       // 给对象进行更改，增加count属性;
      //       cartsGoodsList.map(item => {
      //             // console.log(item,cartsList);
      //             var index = 0;
      //             index = idList.indexOf(item.goods_id.toString())
      //             return item.count = cartsList[index][1];
      //       })

      //       console.log(cartsGoodsList);
      // }

      //初始化程序；
      
      function renderCartsList(){

           //# 在数据(缓存列表pxxList)列表之中,找到和购物车数据匹配的数据,放进新的数组renderList之中。

           // 当前购物车的数据;
           // count  id ; [a,b]
           var cartsList = GLOBAL_STORE.carts[GLOBAL_STORE.shopAttr];
           // goods_id   想要加上 一个 count; [a,b,c,d,e,f,g];
           var goodsList = GLOBAL_STORE.pxxList[GLOBAL_STORE.shopAttr].data;
           var renderList = [];
           cartsList.forEach( cartsItem => {
                 goodsList.some( goodsItem => {
                        if(cartsItem.id == goodsItem.goods_id){
                              goodsItem.count = cartsItem.count;
                              renderList.push(goodsItem);
                              return true;
                        }
                 })
           })
           // 渲染列表;
           var html = "";
           var totalPrice = 0;
           renderList.forEach( item => {
                 var price = (item.normal_price/100).toFixed(2) * item.count;
                 totalPrice += price;
                 html += `  <li>
                                    <div class="logo">
                                          <img src="${item.hd_thumb_url}" alt="">
                                    </div>
                                    <div class="price">
                                         ${price.toFixed(2)}
                                    </div>
                                    <div class="options" data-id="${ item.goods_id }">
                                          <span class="glyphicon glyphicon-minus btn btn-danger carts-reduce"></span>
                                          <span class="count">${item.count}</span>
                                          <span class="glyphicon glyphicon-plus btn btn-default carts-add"></span>
                                    </div>
                              </li>`
           })

           html += `<p>总价:${totalPrice.toFixed(2)}</p>`

           $(".carts-list").html(html);
      }
      
      function init(){
            load()
            bindEvent();
      }
      function stopProp(e){
            e.stopPropagation()
            console.log();
      }
      //绑定事件;
      function bindEvent(){
            loadedData.add([renderBtn,hanlderFirstBtn,renderCarts]);
            // 根据数据渲染购物车部分;
            
            // myAdd(loadedData,[renderBtn,renderCarts]);

            addCart.add([addCartsData,renderCartsData,renderCarts]);
    
            // 减少商品数量 => 操作数据的;
            reduceCart.add([reduceCartsData,renderCartsData,renderCarts]);
            // 渲染页面的;
      
            choiceShop.add([choiceRenderShop,renderCartsData,renderCarts]);
          
            showCharts.add([renderCartsList,stopProp]);
      
            cartsList.add([stopProp,renderCartsList])

            cartsListAdd.add([addCartsData,renderCartsData,renderCarts]);

            // 减少商品数量 => 操作数据的;
            cartsListReduce.add([reduceCartsData,renderCartsData,renderCarts]);
            // 渲染页面的;
    

            // 商家选择事件;
            $(".shop-list").on("click","button",choiceShop.fire);
            $(".goods-list").on("click",".add-carts",addCart.fire);
            $(".goods-list").on("click",".reduce-carts",reduceCart.fire);
            $(".carts-img").on("click",showCharts.fire)

            $(document).on("click",()=>{
                  $(".carts-list").html("")
            })
            $(".carts-list").on("click",cartsList.fire)
            $(".carts-list").on("click",".carts-add",cartsListAdd.fire);
            $(".carts-list").on("click",".carts-reduce",cartsListReduce.fire);

      }
      // 加载数据;
      function load(){
            // fetch;  加载数据;
            fetch("./pxx.json")
            .then(res => {
                  return res.json()
            })
            .then(loadedData.fire)
      }


/**功能调用初始化 */

$(init);

// AMD 异步模块定义规范  

// CMD COMMONJS 模块定义规范;  sea.js 玉伯;

// COMMONJS module 

})(jQuery);

