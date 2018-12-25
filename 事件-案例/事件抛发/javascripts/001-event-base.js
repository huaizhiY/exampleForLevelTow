

document.addEventListener("alert",function(){
      alert("hello world");
})

var alert_event = document.createEvent("HTMLEvents")

console.log(alert_event)

document.dispatchEvent("alert",false,false);