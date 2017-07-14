let http = require('http');//requireでモジュールを読み込む
let fs = require('fs');

//１、指定されたパスのファイルを読み込む
//http://localhost:3000/foo/bar.html
//req.url ='/foo/bar.html'
//２、ファイルがあれば、それを　res.write して返す
//3、ファイルがなければ、４０４を返す



let server = http.createServer(function(req, res){
    let path = '.' + req.url;
    fs.readFile(path, function(err, data){
    if(err){
        //オープンに失敗
        //404 を返す
        res.statusCode = 404;
        res.write("not found.");
    }else{
        //オープンに成功
        //200でデータを返す
        res.write(data)
    }
    res.end();
})
});
server.listen(3000);