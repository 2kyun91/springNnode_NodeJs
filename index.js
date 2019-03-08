var http = require('http');
var inputData = {
  user : "2kyun91",
  nationality : "South Korea",
  company : "ArchivSoft",
  data : "Node 서버에서 Spring 서버로 보내는 데이터!"
};

var opts = {
  host : "localhost",
  port : 8080,
  method : "POST",
  path : "/start",
  headers : {"Content-type" : "application/json"},
  body : inputData
};

// 포트 8080에서는 톰캣 서버가 대기하고 있다.
// 스프링 컨트롤러에 "/start" URI를 매핑하는 메소드를 생성해뒀다.
// 전달 방식은 json 형식으로 보낸다.
var resData = "";
var req = http.request(opts, function(res) {
  res.on("end", function() {
    console.log(resData);
  });
});

opts.headers["Content-Type"] = "application/x-www-form-urlencoded";
req.data = opts;
opts.headers["Content-Length"] = req.data.length;

req.on('error', function(err) {
  console.log("에러 발생 : " + err.message);
});

req.write(JSON.stringify(req.data.body));

req.end();
var server = http.createServer(function(req, res) { // 여기
  res.writeHead(200, {"Content-Type" : "text/html"});
  res.end("Hello Node JS!");
});

server.listen(80, function() {
  console.log("Server is Working...");
});
