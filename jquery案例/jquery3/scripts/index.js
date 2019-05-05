var viewModule = {
      
};

function setGetter(obj,attr,getter,setter){
      // 如果存在当前属性; 不需要添加getter,如果不存在添加属性及getter;
      if(obj.hasOwnProperty(attr)){
            return false;
      }
      Object.defineProperty(obj,attr,{
            enumerable : false,
            get : getter,
            set: setter
      })
}

setGetter(viewModule,"todoList",function(){
      // alert(1);
      return this.todoListValue;
},function(val){
      this.todoListValue = val;
      console.log(val);
      $("#show").html(val);
})

$("#title").on("input",function(){
      viewModule.todoList = $(this).val();
})






viewModule.todoList;