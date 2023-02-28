const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt")
const bodyParser=require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session")
const app=express();
const saltRounds = 10;
var mysql = require('mysql');
require('dotenv').config();
//MySQL
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Samaya#9421",
  database: "inexpense"
});
con.connect();

app.use(bodyParser.urlencoded({extended:true}))
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true
    })
  );
app.use(express.json());

//session middleware
app.use(
    session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: false,
      },
    })
  );
app.use(cookieParser());

var router= express.Router();
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Samaya#9421",
    database: "inexpense"
  });
  con.connect();

  router.get("/getCustDet", function(req, res){
      if(req.session.user){
        res.json({ message:'true', username: req.session.user[0].first_name, mail: req.session.user[0].email, userId: req.session.user[0].userId})
      }
      else {
        res.json({ message: 'false' });
      }
      
      
  })
  router.post("/custsignup", function(req, res){
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          var sql="insert into users  (first_name, last_name, contact, email, username, password) values (?)";
          var values=[req.body.first_name, req.body.last_name,req.body.contact,req.body.mail, req.body.user ,hash ];
          console.log(values)
          con.query(sql, [values] ,function(err, result){
              if(err){
                  console.log(err);
                  res.send("error.. try again")
              }
              else{
                  console.log('registration done')
                  res.send("successful")
              }
          });
          })       
     
  }) 
  router.post("/custLogin", function(req, res){
      var username=req.body.user
      var password= req.body.pass
      console.log(username , password)
      var sql= "SELECT * FROM users where username= (?)";
      var values=[req.body.user];
      con.query(sql, [values], function(err, results, feilds){
          if (results.length !=0){
              console.log(results)
              console.log(results[0].password)
             console.log(password)
              bcrypt.compare(password, results[0].password, function(err, result) {
                  if (result == true){
                    req.session.user=results
                  res.json({message: 'true'})
                  console.log('true')
                    
                    console.log(req.session.user)
                  //loggedCustId=results[0].userId
                  //loggedCustName=results[0].first_name
                  //loggedCustMail=results[0].email
                  //loggedCustNum=results[0].contact
                  //loggedCust='true'
  
              }
              else{
                  res.json({message: 'false'})
              }
          })}
          else{
              res.json({message: 'nouser'})
  
          }
      });
  })
  router.get("/Custlogout" , function(req, res){
    req.session.destroy(null)
      res.json('logged out')
  })
  router.post("/getLogo", function(req, res){
      var key=req.body.key;
      var sql= "SELECT * FROM businessDetail where businessName like (?)";
      var values=[req.body.key+'%'];
      console.log(values)
      con.query(sql, [values], function(err, results, feilds){
          console.log(results)
          res.json(results)
      })    
  })
  
  router.get("/data", function(req, res){
      res.json({message: "<h1>server running</h1>"})
  })
  router.get("/getBillforCust", function(req, res){
      var loggedCustNum=req.session.user[0].contact  
      sql="SELECT * FROM billdetail where phoneNum= '"+loggedCustNum+"'";
      console.log(sql)
      con.query(sql, function(err,results2, feilds)
      {
          console.log(results2)
          res.json(results2)
      })
  })
  router.get("/custServicesResponses", function(req, res){
    var loggedCustId=req.session.user[0].userId
      sql="select * from serviceRequests, serviceResponse where serviceRequests.reqId=serviceResponse.reqId and customerId = "+loggedCustId+" and responseStatus= 'RESP';"
      console.log(sql)
      con.query(sql, function(err,results2, feilds)
      {
          console.log(results2)
          res.json(results2)
      })
  })
  
  router.get("/custServicesAccepted", function(req, res){
    var loggedCustId=req.session.user[0].userId
      sql="select * from serviceRequests, serviceResponse where serviceRequests.reqId=serviceResponse.reqId and customerId = "+loggedCustId+" and (responseStatus= 'ACC' or responseStatus= 'CLS') order by serviceRequests.reqId desc ;"
      console.log(sql)
      con.query(sql, function(err,results2, feilds)
      {
          console.log(results2)
          res.json(results2)
      })
  })
  
  
  
  router.post("/hello", function(req,res) {
      var shopid=("select serviceId,serviceName from services where serviceCategory ='"+req.body.Category+"'" );
      /*var shopname=("select serviceName from services where serviceCategory ='"+req.body.Category+"'" );*/
      console.log(shopid)
      var data=0
      var data1=''
     
      var status='NYR'
   
      con.query(shopid,function(err,result, feilds)
      {
      for (let i=0;i<result.length;i++)
      {
      data = (result[i].serviceId)
       data1 = (result[i].serviceName)
       console.log(data);
       console.log(data1);
        var loggedCustId=req.session.user[0].userId
        var loggedCustName=req.session.user[0].first_name
        var loggedCustNum=req.session.user[0].contact
       console.log(result)
       console.log("result")
       var sql = "insert into serviceRequests (customerId,customerName,customerContact,serviceId,serviceName,serviceCategory,request,responseStatus,tillDate) values ("+loggedCustId+",'"+loggedCustName+"',"+loggedCustNum+","+data+",'"+data1+"','"+req.body.Category+"','"+req.body.reqdetail+"','"+status+"','"+req.body.date+"');"
       /* var values = [
        data,
        req.body.category,
        req.body.reqdetail,
        req.body.date
        ];*/
     console.log(sql)
        con.query(sql)//,function(err,data,field) {
            //if(err) return res.json(err)
            //res.json("helooo")
        //})
       }
   
      })
      console.log(data)
      console.log('aa')
         res.json({message:'inserted'});
          
     })
  
     router.post("/closeRequest", function(req, res){
        var reqId=req.body.reqId;
        var status=req.body.status;
        var sql2="select * from servicePayments where reqId="+reqId;
        
        con.query(sql2, function(err, results, feild){
            console.log(results[0].paymentDone)
            var pc=(results[0].paymentDone)
            var sql1= "select * from serviceResponse where reqId="+reqId;
        con.query(sql1, function(err, results, feild){
            console.log(results[0].responseCost)
            var oc=(results[0].responseCost)
            if(pc==oc){
                var sql= "UPDATE serviceRequests SET responseStatus = '"+status+"' WHERE reqId="+reqId;
            console.log(sql);
            con.query(sql, function(err, results, feilds){
                if (err){
                    res.json(err)
                }
                else{
                    res.json('Closed');
                }}
            )
            }
            else(
                res.json('Payment not completed')
            )
        })
        })
    
        
    })
    router.post("/updateRequest", function(req, res){
        var reqId=req.body.reqId;
        var status=req.body.status;
        var sql= "UPDATE serviceRequests SET responseStatus = '"+status+"' WHERE reqId="+reqId;
        console.log(sql);
        con.query(sql, function(err, results, feilds){
            if (err){
                res.json(err)
            }
            else{
                res.json('Removed');
            }}
        )
        if (status=='ACC'){
            var sql1="INSERT INTO servicePayments values("+reqId+",0)";
            con.query(sql1,function(err, results, feilds){
                if (err){
                    console.log(err)
                }
                else{
                    console.log('payment updated');
                }
           
        }
        )
    }
    
    
    
    })

     module.exports = router;