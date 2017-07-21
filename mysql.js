//1.クライアントから送られて来た　メールアドレス, Password を取得する
//2.salt(ランダムな文字列)を生成する
//3.salt と password を連結して、ハッシュ値を求める
//4.id,salt とハッシュ値を保存する
//5.ユーザに登録完了と表示する

// module.exports = function(app){
//   app.post("/signup", function(req, res) {
//     console.log(req.body.email);
//     console.log(req.body.password);
//     res.json(req.body);
//   });
// }



let mysql = require('mysql');//requireを使って読み込み
let connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  database : 'myBlog'
});
connection.connect();//接続
let email ='user@example.com';
let password ='p@;"sswd';

// let salt = 'ewfoiew';
// sha1(password)
// sha1(salt + password)



connection.query('INSERT INTO users VALUES (NULL, ?, ?)', [email, password], function(error, //?,?でSQLインジェクションを防ぐ。
  results, fields){
  if(error) throw error;
  //if(error) throw error;は
  //if(error) {
  //throw error;
  //};と一緒
  console.log(results[0]);
});
connection.end();

//USE myBlog//使ってる場所を選択しましょう



//----------------------------------------------------------

// $($マークはターミナルで打て) mysql -uroot
// mysql> CREATE DATABASE myBlog;
//Query OK, 1 row affected (0.02 sec)
// コマンドCで抜けて
//node mysql.js
//The solution is :  2

// CREATE TABLE users(
//     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,//AUTO_INCREMENT自動で連番を振ってくれる。
//     email VARCHAR(255), //varchar(255)は最大２５５文字の文字列。
//     password VARCHAR(255)
// );

/* mysql> CREATE TABLE users(
    -> id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    -> email VARCHAR(255),
    -> password VARCHAR(255)
    -> );
Query OK, 0 rows affected (0.06 sec)

mysql> SHOW TABLES;
+------------------+
| Tables_in_myblog |
+------------------+
| users            |
+------------------+
1 row in set (0.00 sec)

mysql> DESC users;
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int(11)      | NO   | PRI | NULL    | auto_increment |
| email    | varchar(255) | YES  |     | NULL    |                |
| password | varchar(255) | YES  |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
3 rows in set (0.03 sec)

mysql> INSERT INTO users VALUES (NULL, 'test@example.com','passwd');
Query OK, 1 row affected (0.01 sec)

mysql> SELECT *  FROM users;
+----+------------------+----------+
| id | email            | password |
+----+------------------+----------+
|  1 | test@example.com | passwd   |
+----+------------------+----------+
1 row in set (0.00 sec)
 */

/*  mysql> INSERT INTO users VALUES (NULL, 'test@example.com','passwd');
Query OK, 1 row affected (0.01 sec)

mysql> SELECT *  FROM users;
+----+------------------+----------+
| id | email            | password |
+----+------------------+----------+
|  1 | test@example.com | passwd   |
+----+------------------+----------+
1 row in set (0.00 sec)

mysql> DELETE FROM users;
Query OK, 1 row affected (0.01 sec)

mysql> SELECT *  FROM users;
Empty set (0.00 sec)

mysql> INSERT INTO users VALUES (NULL, 'test@example.com','passwd');
Query OK, 1 row affected (0.00 sec)

mysql> SELECT *  FROM users;
+----+------------------+----------+
| id | email            | password |
+----+------------------+----------+
|  2 | test@example.com | passwd   |
+----+------------------+----------+
1 row in set (0.00 sec)

mysql> DELETE FROM users; WHERE id =2;
Query OK, 1 row affected (0.00 sec)

ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'WHERE id =2' at line 1
mysql> SELECT *  FROM users;
Empty set (0.00 sec) */
//コントロールD