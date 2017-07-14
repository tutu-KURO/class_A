let net = require('net');

function parseHTTP(request) {
  let lines = request.split("\r\n");
  let firstLine = lines.shift();
  let method, path, version;

  [method, path, version] = firstLine.split(" ");
  version = version.substr("HTTP/".length);

  let headers = {};
  for(let header of lines) {
    let fields = header.split(': ');
    let key = fields.shift();
    headers[key] = fields.join(': ');
  }
  return {
    method: method,
    path: path,
    version: version,
    headers: headers
  }
}

let server = net.createServer(function(conn) {
  let requestBody = "";
  conn.on('data', function(data) {
    let chunk = data.toString();
    requestBody += chunk
    let req = parseHTTP(requestBody);
    console.log(req);
    //http://localhost:3000/
    //http://localhost:3000/phh
    let body ="hello" + req.path ;
    let response =[
        "HTTP/1.1 302 Found",/* 404 Not Found */
        "Location: https://www.google.com",
        "Date: " + (new Date()).toString(),
        "Connection: close",
        "Content-Type: text/plain",
        "Content-length: " +body.length,
        "",
    ];
    conn.write(response.join("\r\n"));
    conn.write("\r\n");
    conn.write(body);
    conn.write("\r\n");
    conn.end();
  });
});

server.listen(3000);



//  http_query = `GET / HTTP/1.1
// Host: www.nicovideo.jp
// User-Agent: curl/7.51.0
// X-Accel-Cache: dead: beaf: space
// Accept: */*`

// function parseHTTP(request) {
//   let lines = request.split("\r\n");
//   let firstLine = lines.shift();
//   let method, path, version;

//   [method, path, version] = firstLine.split(" ");
//   version = version.substr("HTTP/".length);

//   let headers = {};
//   for(let header of lines) {
//     let fields = header.split(': ');
//     let key = fields.shift();
//     headers[key] = fields.join(': ');
//   }

//   return {
//     method: method,
//     path: path,
//     version: version,
//     headers: headers
//   }
// }

// let req = parseHTTP(http_query);
// console.log(req);
    

// let net =require('net');

// let server = net.createServer(function(conn){
//     let requestBody = '';
//     conn.on('data',function(data){
//         let chunk =data.toString();
//         requestBody += chunk
//         let rep = parseHTTP(requestBody);
//         console.log(rep);
//     });
// });

// server.listen(3000); 
