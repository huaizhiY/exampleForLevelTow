;;(function($){
      
      // 如何获取cookieJSON ;
      // 1. cookie之中存在数据 => 取出cookie数据转换成json;
      // 2. cookie之中不存在数据 => 建立初始结构;
      var cookieJSON = getCookieJSON();

      var input = $.Callbacks();

      input.add(createTodoList);
      input.add(saveTodo);
      input.add(emptyInput);


      function getCookieJSON(){
            if($.cookie("todoList")){
                  return JSON.parse($.cookie("todoList"));
            }

            return {
                  todolist : [],
                  todoId : 0,
                  donelist : [],
            }
      }
      function createTodoList(){
            cookieJSON.todoId ++;
            // 创建元素并插入相应位置;清空输入框内容;
            var $li = $(`<li draggable="true" data-id="${cookieJSON.todoId}"><input type="checkbox" >
                              <p >${$("#title").val()}</p><a href="javascript:void(1)">-</a>
                        </li>`);
            $("#todolist").append($li);
      }
      function emptyInput(){
            $("#title").val("");
      }
      function todoToDone(){
            if($(this).is(":checked")){
                  $("#donelist").append($(this).parent());
            }
      }
      function doneToTodo(){
            if(!$(this).is(":checked")){
                  $("#todolist").append($(this).parent());
            }
      }

      // 把所有关键内容提取成数据，放入cookie之中进行永久储存。
      // 存数据 : JSON =stringify> string =放入> cookie
      // 改数据 : string =parse > JSON =增删改查>   存数据;

      function saveTodo(){
            var text = $("#title").val();
            cookieJSON.todolist.push({
                  text,
                  id:cookieJSON.todoId
            });
            // console.log(cookieJSON)
            $.cookie("todoList",JSON.stringify(cookieJSON));
            // console.log(JSON.parse($.cookie("todoList")))
      }


      function render(){
            $("#todolist").html("");
            $("#donelist").html("");

            cookieJSON.todolist.forEach( item => {
                  var $li = $(`<li draggable="true" data-id="${item.id}"><input type="checkbox" >
                                    <p >${item.text}</p><a href="javascript:void(1)">-</a>
                              </li>`);
                  $("#todolist").append($li);
            })

            cookieJSON.donelist.forEach( item => {
                  var $li = $(`<li draggable="true" data-id="${item.id}" ><input type="checkbox" checked="true">
                                    <p >${item.text}</p><a href="javascript:viod(1)">-</a>
                              </li>`);
                  $("#donelist").append($li);
            })
      }

      function todoRemove(){
            var ele = $(this).parent();
            var id = ele.attr("data-id");
            
            removeTodo(id);
      }

      function removeTodo(id){
            // 操作内存之中的数据 ;
            for(var attr in cookieJSON){
                  if( !(cookieJSON[attr] instanceof Array) ) continue;
                  var find = cookieJSON[attr].some( (item,index) => {
                        if(item.id == id){ 
                              cookieJSON[attr].splice(index,1);
                              return true;
                        }
                  });
                  if(find){
                        break;
                  }
            }
            // 硬盘存储;
            $.cookie("todoList",JSON.stringify(cookieJSON));

            render();
      }


      render();

      $("#title").on("keydown",function(e){
            var code = e.keyCode || e.which;
            if(code === 13) return input.fire();
      })

      $("#donelist").on("change","input",doneToTodo);
      $("#todolist").on("change","input",todoToDone);
      $("#todolist").on("click","a",todoRemove);

      // 虚拟DOM;
      // diff算法;
      
})(jQuery);