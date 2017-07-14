// http_query = `GET / HTTP/1.1
// Host: www.nicovideo.jp
// User-Agent: curl/7.51.0
// Accept: */*`

// console.log(http_query)

// request ={
//     method: 'GET', 
//     path: '/',
//     version:'1.1',
//     headers: {
//         'Host': 'www.nicovideo.jp'
//     }
// }

http_query = `GET / HTTP/1.1
Host: www.nicovideo.jp
User-Agent: curl/7.51.0
X-Accel-Cache: dead: beaf: space
Accept: */*`

function parseHTTP(request) {
  let lines = request.split("\n");
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

let req = parseHTTP(http_query);
console.log(req);