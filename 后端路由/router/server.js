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


