####nodejs 

* .js 文件使用node执行

```
      node xxx.js
```
> 我们的代码不是一次性的代码，需要重复多次的执行，所以需要一个文件作为存储在硬盘上的容器从而可以实现js的多次执行的目的。

* nodejs使用的是chrome浏览器的V8引擎

> 只要是chrome支持的js语法 ，那么nodejs都支持。

####nodejs的外部工具

* nvm  用于切换nodejs版本的工具

####npm安装工具

* nrm 源切换工具 

1. nrm ls   列出所有可以用的源;
2. nrm test 列出所有可用源的延迟;
3. nrm use  使用哪个源。

```
      npm install -g nrm 
```
* yarn 外部加载工具 

* nodejs 热启动插件 只要更改了代码，这个程序会自动执行这个js并打印结果;
  
> nodemon并没有要求任何对你的代码或开发的方法中的额外变化。nodemon是一个替换包装器node，用于在执行脚本时nodemon替换node命令行上的单词。

* nodemon

```
      npm install -g nodemon
```
[nodemon文档](https://www.npmjs.com/package/nodemon)




####vscode配置gitbash

1. 点击右下角的小齿轮
2. 找到设置选项
3. 选中 扩展 => JSON => setting.json
4. 增加一条内容：

```
      "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
      // git 路径请自行找寻 
      // 记得加上双反斜杠进行转义
```
5. 重启vscode


//gulp 全局 


#### COMMONJS 模块化

* 模块定义 module.exports
* 模块载入 require 

* 模块化之中所有的模块作用域独立，自成一体。

**细化API**

1. module

> * 这个玩意代表的就是当前模块;
> * 无法直接放入module，因为module不提供对外直接访问的功能;

2. exports 

> * 对外开放当前模块功能的接口 ;
> * 这个模块内部什么东西可以被外部看到，都由exports来决定;

**tip: exports可以对这个引用类型做任何的增删改查例如:exports.a = xxx，但是请不要exprots=xxx;这样会直接覆盖原地址**

我们通常使用的模块暴露方式其实就是 module.exports = object;

3. require 很简单 

* require 带有缓存功能;

```javascript
      // 清除全部缓存的封装;
      function cacheClear(){
            Object.keys(require.cache).forEach( key => {
                  delete require.cache[key];
            })
      }
      // 升级版可以选择具体缓存的封装;
      function cacheClear(filename){
            var reg = filename ? new RegExp(`(.+?)${filename}\\.(js|jsx)$`) : /.+/;
            Object.keys(require.cache).forEach( key => {
                  if(reg.test(key)){
                        delete require.cache[key];
                  }
            })
      }
```

**COMMONJS和AMD的区别**

* AMD模块加载是异步的
* COMMONJS模块加载是同步的

* 因为AMD是天生异步的，所以一切都由回调函数解决。
* 因为COMMONJS是天生同步的，所以我们对于很多异步模块只能借助事件来解决。(我们不常用,模块定义时将异步放在这时处理)。  


```javascript
      var EventEmitter = require('events').EventEmitter;
      var evt =  new EventEmitter();
      module.exports = evt
      setTimeout(function() {
            // 表示触发事件;
            evt.emit('ready');
      }, 5000);
```

tip: nodejs对于模块之间进行通信其实还是非常费劲的，其实绝大多数的时候我们都用这种emit 和on配合的自定义事件去处理模块间的通信及异步问题。

* 路径找寻
  
```javascript

//index父级路径示例 :

 paths:
      [ 'E:\\随堂\\GP10coding\\0505\\nodejs模块化\\node_modules',
        'E:\\随堂\\GP10coding\\0505\\node_modules',
        'E:\\随堂\\GP10coding\\node_modules',
        'E:\\随堂\\node_modules',
        'E:\\node_modules' ] },

```

> 如果当前加载的模块没有 ./ 那么他会从当前文件夹开始，遍历所有父级文件夹的node_modules试图进行找寻。找寻出来的模块会被引入;
> 加上了./就不会按照这个路径进行逐个找寻了.