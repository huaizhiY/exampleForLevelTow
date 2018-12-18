// console.log(_);

/** 
 * 
 * 1. 渲染页面;
 * 1.1 发送ajax : jsonp 请求
 * 1.2 拼接字符串渲染页面;
 * 2. 无限加载;
 * 
 * */ 
// 选择元素;
var container = _(".container-goodslist");
// 发送ajax : jsonp 请求
var GLOBAL = {
      // 可视区的高度;
      ch : document.documentElement.clientHeight,
      // 是否在加载过程之中
      loading_flag : false

}

_jsonp("https://list.mogujie.com/search")
.then(function(res){
      // console.log(res.result.wall.list);
      // 获取商品列表;
      var goodsJSON = res.result.wall.list;
      renderPage(goodsJSON);
      // 是不是有了所有的 dom 结构那?
      // console.log(container.children);
      eleSort(container.children);
})

// 渲染页面函数;
function renderPage(json){
      var html = "";
      // 根据比例计算图片高度;
      json.forEach(function(ele){
            // console.log(ele);
            html += `   <div class="goods-box">
                              <div class="good-image">
                                    <img src="${ele.show.img}" width=${ 262 } height=${ parseInt(262 / ele.show.w * ele.show.h) } alt="">
                              </div>
                              <div class="good-title">
                                    <p>${ele.title}</p>
                              </div>
                              <div class="line"></div>
                              <div class="good-detail">
                                    <span class="detail-price">
                                          ${ele.price}
                                    </span>
                                    <div class="detail-start">
                                          <i>★</i>
                                          <span>${ele.itemMarks.split(" ")[0]}</span>
                                    </div>
                              </div>
                        </div> `
      });
      container.innerHTML += html;
      return html;
}

// 等宽不等高的布局如何处理 ?
// 不用浮动布局;

function eleSort(eles){
      //以第一排为基准，排列后面所有的元素;
      // 1. 找到第一排的所有元素;
      // 1.1 伪数组转真数组 ;
      // 2. 排列第二排的所有元素;
      // 2.1 建立标准;
     
      // eles => HTMLcollection ; 不是数组; 所以没有 Array的方法;
      // console.log(Array.prototype.slice.call(eles));
      // 兼容型写法  Array.prototype.slice.call( args ) 把 args 转换成真数组的方法;  === Array.from( args )
      // 标准数组;
      var heightArray = [];
      eles = _slice(eles);
      eles.forEach(function(ele,index){

            // console.log(ele);
            // 下标截止到3 是第一排。
            // 其余的就是第二排。
            if(index <= 3){
                  // 2.1 建立标准;
                  // console.log(ele,"第一排");
                  heightArray.push(ele.offsetHeight);
            }else{
                  // console.log(ele,"第二排");
                  // 排列第二排的东西;
                  // 取最小值;
                  var min = Math.min.apply(false , heightArray);
                  // 设置定位
                  // 设置top; => 数组之中的 最小值;
                  ele.style.position = "absolute";
                  ele.style.top = min + 20 + "px";
                  // 设置left值; => 最小值的下标;

                  var minIndex = heightArray.indexOf(min);
                  ele.style.left = eles[minIndex].offsetLeft - 20 + "px"; 

                  // 最后改变标准数组;
                  heightArray[minIndex] +=  ele.offsetHeight + 20;
            }
      })
      // console.log(heightArray);
      // 让我们的数据可以在外部获取;
      GLOBAL.heightArray = heightArray;
}

// 无限加载;
// 到一定的时候就加载 ;

// 什么时候加载 ??
// 1. 定一个标准;

// scrollTop (卷动的高度 ) + clientHeight(可视区高度 )  >= Math.min.apply(heightArray) 最小 top 值;
// 判定可加载;

onscroll = function(){
      // console.log("页面卷动");
      // isLoad()
      // console.log(isLoad());

      // 如果需要加载, 发起ajax请求;
      if( !isLoad() || GLOBAL.loading_flag ) return false;
      // 开始加载数据;
      GLOBAL.loading_flag  = true;
      // setTimeout( function (){
      //       // console.log("这是一个ajax请求 , 请求成功时的回调函数");
      //       GLOBAL.loading_flag  = false;
      // } , 1000 )
      _jsonp("https://list.mogujie.com/search")
      .then(function(res){
            GLOBAL.loading_flag  = false;
            var goodsJSON = res.result.wall.list;
            randomPage(goodsJSON);
            eleSort(container.children);
      })
}

// 决定要不要加载;
function isLoad(){
      // 必要参数不存在 , 判断函数不执行。
      if( GLOBAL.heightArray === undefined ) return false;

      var st = document.body.scrollTop || document.documentElement.scrollTop;
      var mh = Math.min.apply(false, GLOBAL.heightArray )
      // console.log(ch,st, mh);

      if(GLOBAL.ch + st >= mh - 800 ) {
            return true;
      }else{
            return false;
      }
}


