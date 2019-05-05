const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req,res)=>{
      //匿名函数是一个监听器;
      //req => 请求;  Browser => Server 
      //res => 响应;  Server => Browswer
      // console.log(req);
      // res.end("hello world");

      // 异步的文件加载程序：
      // fs.readFile("./index.html","utf-8",(err,data)=>{
      //       // console.log(data);
      //       res.write(data);
      //       res.end();
      // }) 

      // console.log(1);
      // 浏览器在请求时，会默认发送一个 /favicon.ico 这样的一个无用请求;

      if(req.url === "/favicon.ico"){
            res.end();
            return false;
      }

      // 拆分路径,去除所有的不合法路径。 (空的路径)
      let pathArr = req.url.split("/");
      pathArr = pathArr.filter( path => {
            return path ? true : false;
      })

      if(pathArr.length === 0){
            res.write("default");
            res.end();
            return false;
      }
      // 取出最后的路径进行判断;判定是否符合规则;

      let lastPath = pathArr.pop();
      // console.log(lastPath);
      //判定最后一位路径是不是html文件;
      // var reg = /\.(html|htm)$/;

      // if(reg.test(lastPath)){
      //       // console.log("符合html规则",lastPath);
      //       pathArr.push(lastPath);
      // }else{
      //       // console.log("不符合规则",lastPath);
      //      pathArr.push(lastPath)
      //      pathArr.push("index.html")
      // }

      /\.(html|htm)$/.test(lastPath) ?  pathArr.push(lastPath) :  pathArr.push(lastPath,"index.html");
      
      // console.log(pathArr);

      // 用绝对路径找到文件定位

      //E:\随堂\GP10coding\0505\内置模块
      // console.log(__dirname);

      // console.log(__dirname + "\\" +pathArr.join("\\"));

      // let getPath = __dirname + "\\" +pathArr.join("\\");

      let getPath = path.resolve( __dirname,pathArr.join("\\"));

      console.log(getPath);
      //同步的文件加载程序;
      try{
            let data = fs.readFileSync(getPath,"utf-8");
            res.write(data);
            res.end();
      }catch(e){
            response.setHeader('Status-Code', '404');
            res.write("not found 404");
            res.end();
      }
      
});

server.listen(8080,"localhost",()=>{
      console.log("server started at port 8080  http://localhost:8080")
})

//http://localhost:8080/

