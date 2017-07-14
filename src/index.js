var express = require('express');
var app = express();

app.get('/', function (req, res) {
  // res.send('Hello World!');
  res.redirect(302, '/name');//nameにリダイレクトしてくれる。
  
});

app.get("/name", function(req, res) {
    res.send("22")

});
  //302

app.get("/show/:name",function(req, res) {
    res.send("ID: " + req.params.name);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

