#### http  fs

**flag** : 利用nodejs 启动一个服务器 (webserver);

1.http模块功能

* http.createServer () ; 创建一个服务器的，返回一个服务器对象;

2. http.createServer 返回值API;
   
* server.listener(prot,path,callback) ; 监听端口及访问路径及回调函数;

3. createServer之中callback的参数;
   
* resquest (req) ;  请求;
* response (res) ;  响应;

4. 响应中的内容

* write   ; 返回结果  可以使用buffer数据
* end     ; 终止http请求 可以返回数据但是通常不用

***

1. fs.readFile(path,options,callback)  异步方法 ;  读取文件之中的内容,并且转换成buffer流(根据options定义)

2. fs.readFileSync(path,options)  同步方法 ; 会阻塞代码,如果文件读取不成功则不继续执行程序。

```javascript
      // 服务;
      const http = require("http");
      const fs = require("fs");

      const server = http.createServer((req,res)=>{
            let data = fs.readFileSync("./index.html","utf-8");
            res.write(data);
            res.end();
      });

      server.listen(8080,"localhost",()=>{
            console.log("server started at port 8080  http://localhost:8080")
      })
```

#### url 



#### path 

* 默认路径返回当前路径的 index.html
* 任意路径返回任意路径下 index.html
* 精装访问 .html  访问精准路径下的 .html 
  

```javascript
      const http = require("http");
      const fs = require("fs");
      const path = require("path");

      const server = http.createServer((req,res)=>{
            if(req.url === "/favicon.ico"){
                  res.end();
                  return false;
            }

            let pathArr = req.url.split("/").filter( path => !!path);

            let lastPath = pathArr.pop();

            let lastArguments = ["index.html"];
            lastPath ? lastArguments.unshift(lastPath) : "";

            /\.(html|htm)$/.test(lastPath) ?  pathArr.push(lastPath) :  pathArr.push.apply(pathArr,lastArguments);

            let finalPath = path.resolve( __dirname,pathArr.join("\\"));
            try{
                  let data = fs.readFileSync(finalPath,"utf-8");
                  res.write(data);
                  res.end();
            }catch(e){
                  res.setHeader('Status-Code', '404');
                  res.write("not found 404");
                  res.end();
            }
      });

      server.listen(8080,"localhost",()=>{
            console.log("server started at port 8080  http://localhost:8080")
      })

```
