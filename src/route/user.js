const crypto = require('crypto');



module.exports = function (app) {
  app.get("/signup", function (req, res) {
    res.render('signup');
  });
  app.post("/signup", function (req, res) {
    let email = req.body.email;
    let pass = req.body.password;

    let salt = crypto.randomBytes(8).toString('hex');
    let sha512 = crypto.createHash('sha512');
    sha512.update(salt);
    sha512.update(pass);
    let hash = sha512.digest('hex');
    app.locals.db.query(
      "INSERT INTO `users` (`email`, `password`,`salt`) VALUES (?, ?, ?)",
      [email, hash, salt],
      function (error, result, fields) {
        console.log(error);
        res.redirect(302, "/login");
      }
    )
  });
  app.get("/login", function (req, res) {
    res.render('login');
  });
  app.post("/login", function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    app.locals.db.query(
      "SELECT * FROM `users` WHERE `email` =? LIMIT 1",
      [email],
      function (error, result, fields) {
        if (result.length < 1) {
          res.render('login');
          return;
        }
        // res.redirect(302,"/login");

        let user = result[0];
        let salt = user.salt;
        let sha512 = crypto.createHash('sha512');
        sha512.update(salt);
        sha512.update(password);
        let hash = sha512.digest('hex');

        if(hash !== user.password){
          console.log(hash, user.password);
          res.render('login');
          return;
        }
        res.cookie('userID', user.id);
        res.send('SUCCESS!!');
      }
    );
   
  });
  app.delete("/logout", function (req, res) {
    res.cookie('userID', undefined);
    res.redirect(302,"/login")
  });
}
function salt() {

}
//  console.log(salt)

/* function salt(){//ランダムな８桁の文字列を生成
  // 生成する文字列の長さ
  let num = 8;
  // 生成する文字列に含める文字セット
  let str = "abcdefghijklmnopqrstuvwxyz0123456789";
  let strLen = str.length;
  let result = "";
  for (let i = 0; i < num; i++) {
    result += str[Math.floor(Math.random() * strLen)];
  }
  return result;
}

// for(let i=0;i<300;i++){
//   console.log(salt());
// } */



// const secret = 'abcdefghijklmnopqrstuvwxyz0123456789';
// const hash = crypto.createHmac('sha512', secret)
//                    .update(pasSalt)
//                    .digest('hex');
// console.log(hash);


// let mysql = require('mysql');//requireを使って読み込み
// let connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'myBlog'
// });
// connection.connect();//接続

// let salt = 'ewfoiew';
// sha1(password)
// sha1(salt + password)



// connection.query('INSERT INTO users VALUES (NULL, ?, ?)', [email, pass], function (error, //?,?でSQLインジェクションを防ぐ。
//   results, fields) {
//   if (error) throw error;
//   //if(error) throw error;は
//   //if(error) {
//   //throw error;
//   //};と一緒
//   console.log(results[0]);
// });
// connection.end(); 