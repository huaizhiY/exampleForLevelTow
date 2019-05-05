;(function (undefined) {
    var _global;
    //工具函数
    //配置合并
    function extend (def,opt,override) {
        for(var k in opt){
            if(opt.hasOwnProperty(k) && (!def.hasOwnProperty(k) || override)){
                def[k] = opt[k]
            }
        }
        return def;
    }
    //日期格式化
    function formartDate (y,m,d,symbol) {
        symbol = symbol || '-';
        m = (m.toString())[1] ? m : '0'+m;
        d = (d.toString())[1] ? d : '0'+d;
        return y+symbol+m+symbol+d
    }
 
    function AdkDate (opt) {
        var def = {},
            opt = extend(def,opt,true),
            curDate = opt.date ? new Date(opt.date) : new Date(),
            year = curDate.getFullYear(),
            month = curDate.getMonth(),
            day = curDate.getDate(),  
            currentYear = curDate.getFullYear(),
            currentMonth = curDate.getMonth(),
            currentDay = curDate.getDate(),
            selectedDate = '',
            el = document.querySelector(opt.el) || document.querySelector('body'),
            priceList = opt.priceList ? opt.priceList : [],
            globalPrice = null;

            _this = this;
        var bindEvent = function (){
            el.addEventListener('click',function(e){
                switch (e.target.id) {
                    case 'nextMonth': 
                        _this.nextMonthFun();
                        break;
                    case 'nextYear': 
                        _this.nextYearFun();
                        break;
                    case 'prevMonth': 
                        _this.prevMonthFun();
                        break;
                    case 'prevYear': 
                        _this.prevYearFun();
                        break;
                    default:
                        break;
                };
                if(e.target.className.indexOf('currentDate') > -1){


                    var next = e.target.nextElementSibling ? e.target.nextElementSibling.innerHTML : null;
                    opt.clickCb && opt.clickCb(year, month+1, e.target.innerHTML, next ? next : null);
                    selectedDate = e.target.title;
                    day = e.target.innerHTML;
                    render();
                }
            },false)
        }
        var init = function () {
            var adkDateHd = '<div class="adkDate-hd">'+
                                '<div>'+
                                    '<span class="arrow icon iconfont icon-116leftarrowheads" id="prevYear" ></span>'+
                                    '<span class="arrow icon iconfont icon-112leftarrowhead" id="prevMonth"></span>'+
                                '</div>'+
                                '<div class="today">'+formartDate(year,month+1,day,'-')+'</div>'+
                                '<div>'+
                                    '<span class="arrow icon iconfont icon-111arrowheadright" id="nextMonth"></span>'+
                                    '<span class="arrow icon iconfont icon-115rightarrowheads" id="nextYear"></span>'+
                                '</div>'+
                            '</div>'
            var adkDateWeek = '<ul class="week-ul ul-box">'+
                                    '<li>日</li>'+
                                    '<li>一</li>'+
                                    '<li>二</li>'+
                                    '<li>三</li>'+
                                    '<li>四</li>'+
                                    '<li>五</li>'+
                                    '<li>六</li>'+
                                '</ul>'
            var adkDateBd = '<ul class="adkDate-bd ul-box" ></ul>'; 
            el.innerHTML = adkDateHd + adkDateWeek + adkDateBd;
            bindEvent();
            render();
        }
        var render = function () {
            var fullDay = new Date(year,month+1,0).getDate(), //当月总天数
            startWeek = new Date(year,month,1).getDay(), //当月第一天是周几
            total = (fullDay+startWeek) % 7 == 0 ? (fullDay+startWeek) : fullDay+startWeek+(7-(fullDay+startWeek)%7),//元素总个数
            lastMonthDay = new Date(year,month,0).getDate(), //上月最后一天
            eleTemp = [];
            if(day > fullDay){
                day = fullDay
            }
            for(var i = 0; i < total; i++){
                if(i<startWeek){
                    eleTemp.push('<li class="other-month"><span class="dayStyle">'+(lastMonthDay-startWeek+1+i)+'</span></li>')
                }else if(i<(startWeek+fullDay)){
                    var nowDate = formartDate(year,month+1,(i+1-startWeek),'-');
                    var addClass = '';
                    selectedDate == nowDate && (addClass = 'selected-style');
                    formartDate(currentYear,currentMonth+1,currentDay,'-') == nowDate && (addClass = 'today-flag');
                    markEle(nowDate,eleTemp,addClass , i , startWeek);
                }else{
                    eleTemp.push('<li class="other-month"><span class="dayStyle">'+(i+1-(startWeek+fullDay))+'</span></li>')
                }
            }
            el.querySelector('.adkDate-bd').innerHTML = eleTemp.join('');
            el.querySelector('.today').innerHTML = formartDate(year,month+1,day,'-');
        };

        var markEle = function( nowDate , eleTemp , addClass , i , startWeek){
            var price = null;

            if((price = hasListDate(nowDate)) !== null){
                eleTemp.push(
                    `<li class="current-month" >
                        <span title=${nowDate}+' class="currentDate dayStyle ${addClass}">${(i+1-startWeek)}</span>
                        <i class="house-price">￥${price}</i>
                    </li>`)
            }else{
                eleTemp.push(
                    `<li class="current-month" >
                        <span title=${nowDate}+' class="currentDate dayStyle ${addClass}">${(i+1-startWeek)}</span>
                    </li>`)
            }
        }

        // 性能可优化; 检测月份是否为两位数
        var hasListDate = function(nowDate){
            var price = null;
            priceList.some(function(item,index){
                
                    if(item.date === nowDate){
                        price = item.price ;
                        return true;
                    } 
            });
            return price;
        }

        this.nextMonthFun = function () {
            if(month+1 > 11){
                year += 1;
                month = 0;
            }else{
                month += 1;
            }
            render();
            opt.nextMonthCb && opt.nextMonthCb(year,month+1,day);
        },
        this.nextYearFun = function () {
            year += 1;
            render();
            opt.nextYeayCb && opt.nextYeayCb(year,month+1,day);
        },
        this.prevMonthFun = function () {
            if(month-1 < 0){
                year -= 1;
                month = 11;
            }else{
                month -= 1;
            }
            render();
            opt.prevMonthCb && opt.prevMonthCb(year,month+1,day);
        },
        this.prevYearFun = function () {
            year -= 1;
            render();
            opt.prevYearCb && opt.prevYearCb(year,month+1,day);
        }
        init();
    }
    //将插件暴露给全局对象
    _global = (function(){return this || (0,eval)('this')}());
    if(typeof module !== 'undefined' && module.exports){
        module.exports = AdkDate;
    }else if (typeof define === "function" && define.amd){
        define(function () {
            return AdkDate;
        })
    }else {
        !('AdkDate' in _global) && (_global.AdkDate = AdkDate);
    }
 
}());