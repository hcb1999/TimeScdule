const express = require('express');
const path = require("path");
const multer = require("multer");
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql');
const cors = require('cors');
const db = mysql.createPool({ //서버에서 데이터베이스 연결을 위한 데이터베이스 운영자 계정연동
   host : 'localhost',
   user : 'root',
   password : 'gkackdqja123!',
   database: 'initscduleapp',
   multipleStatements: true

});
// REST API 에는 4가지 메소드가 있는데 GET: 데이터 조회(SELECT) POST:데이터 등록및 전송(INSERT), PUT:데이터 수정(UPDATE), DELETE:데이터삭제(DELETE).

app.use(cors()); // cors라고 서버랑프론트엔드가 포트가 다르면 cors위반이라고 떠서 이 함수를 써줘야함
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.post('/api/scdule', (req, res) => { // api/scdule서버에서 res=응답을 한결과를 프론트엔드에 send함수를 써서 보냄 get=서버에서 데이터를 프론트엔드로 보내주는 역할
  const pcode = req.body.pcode;
  const sql1 = 'SELECT * FROM daily WHERE pcode = ?; ';
  const sql2 = 'SELECT people.name,people.id FROM friend, people WHERE friend.id = ? AND friend.fid = people.id; ';
  const sql3 = 'SELECT catagory.category FROM catagory, people WHERE catagory.pcode =? AND catagory.pcode = people.id; ';
   db.query(
      sql1+sql2+sql3,[pcode,pcode,pcode],
     (err,results,fields)=>{
        
        if(!err){
       res.send(results);
   
      } else{
           res.send(err);  
        }
     }
  ); 
  
  });
 
  app.post("/api/editscdule", (req, res) => { // 프론트엔드에서 받은 데이터값을 req=요청을 이용해 변수에 넣어주고 그 변수를 디비에 넣어줌 post=프론트엔드에서 보낸 데이터를 받아와서 서버에 넣어줌
   const pcode = req.body.pcode;
   const scode = req.body.scode;
   const ccode = req.body.ccode;
   const title = req.body.title;
   const start = req.body.start;
   const end = req.body.end;
   const withpeo = req.body.withpeo;
   const place = req.body.place;
   const alarm = req.body.alarm;
   const sqlQuery = "INSERT INTO daily (scode,pcode,ccode, title, start, end, withpeo, place, alarm) VALUES (?,?,?,?,?,?,?,?,?)";
   db.query(sqlQuery, [scode, pcode,ccode, title, start, end, withpeo, place, alarm], (err, result) => {
       res.send('success!');
   });
  });
  
  app.post("/api/user", (req, res) => {
   const id = req.body.id;
   const password= req.body.password;
   const name= req.body.name;
   const email= req.body.email;
   const tel= req.body.tel;
   const age= req.body.age;
   const sex= req.body.sex;
   const sqlQuery = "INSERT INTO people (id, password, name, email, tel, age, sex) VALUES (?,?,?,?,?,?,?)";
   
   db.query(sqlQuery, [id,password, name, email, tel, age, sex], (err, result) =>{
      res.send('success');
   });
  });

  app.post("/api/AddCategory", (req, res) => {
   const id = req.body.id;
   const catecory = req.body.cate;
   const catecolor = req.body.color;
   const madetime =req.body.date;
   const sqlQuery = "INSERT INTO catagory (pcode, category, CATECOLOR, MADETIME) VALUES (?,?,?,?)";
   
   db.query(sqlQuery, [id,catecory,catecolor,madetime], (err, result) =>{
      res.send('success');
   });
  });
  
  app.post("/api/AddFriend", (req, res) => {
   const id = req.body.id;
   const fid = req.body.fid;
   const date = req.body.date;

   const sqlQuery = "INSERT INTO friend (fid, id, date) VALUES (?,?,?)";
   
   db.query(sqlQuery, [fid,id,date], (err, result) =>{
      res.send('success');
   });
  });
  app.post("/api/sharedaily", (req, res) => {
   const pcode = req.body.pcode;
   const scode = req.body.scode;
   const title = req.body.title;
   const start = req.body.start;
   const end = req.body.end;
   const withpeo = req.body.withpeo;
   const place = req.body.place;
   const alarm = req.body.alarm;
   const sqlQuery = "INSERT INTO daily (scode,pcode, title, start, end, withpeo, place, alarm) VALUES (?,?,?,?,?,?,?,?)";
   db.query(sqlQuery, [scode, pcode, title, start, end, withpeo, place, alarm], (err, result) => {
       res.send('success!');
   });
  });

  app.post("/api/login", (req,res)=> {
     const userid= req.body.id;
     const userpassword=req.body.pw;

     db.query(
        "SELECT name FROM people WHERE id = ? AND password=?",[userid,userpassword],
        (err,result) =>{
           if(err){
              res.send({err: err});
           }
           if(result.length >0){
              res.send(result);
          } else {
             res.send({message: "아이디 또는 비밀번호를 다시 입력하세요!"});
          }
        }
     );
  });
  
  app.post("/api/test", (req,res)=> {
   const findid = req.body.id;

   db.query(
      "SELECT name FROM people WHERE id = ?",[findid],
        (err,result) =>{
           if(err){
              res.send({err: err});
           }
           if(result.length >0){
              res.send(result);
          } else {
             res.send({message: "찾을수 없는 아이디 입니다."});
          }
        }
   );
  })
  app.post("/api/selectscdule", (req,res)=> {
   const scode= req.body.scode;
   db.query(
      'SELECT * FROM daily WHERE scode = ?',[scode],
      (err,result) =>{
         if(err){
            res.send({err: err});
         }
         if(result.length >0){
            res.send(result);
        } else {
           res.send({message: "wrong userid and password"});
        }
      }
   );
});

  /*
    res.send([

      
        {
             id: 1,
             title: "fds",//'event 1',
             end: '2021-06-14',
             start: "2021-06-14",
             withpeo: "최범준",
             SCODE:"4"
          },
          {
             id: 2,
             title: 'event 2',
             start: '2021-06-16T13:00:00',
             end: '2021-06-16T18:00:00',
             withpeo: "오재택",
             alarm : "06:00"
          },
          {  id: 3, 
             title: 'event 3', 
             start: '2021-06-17', 
             end: '2021-06-20' },
    ]);
    
});
*/

app.listen(port, () => console.log(`Listening on port ${port}`));  // 서버가 잘 작동하나 확인하는 함수 터미널에 node server.js 입력하면 포트번호 5000뜨면서 성공 

/*
REST api
Create : POST
Read : GET
UPDATE: PUT
DELETE : DELETE
*/