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



  /*Services*/
  router.get("/getServiceDet", function(req, res){
    console.log('getdet')
    if(req.session.user){
        res.json({ message:'true', username:req.session.user[0].serviceName , servCat:req.session.user[0].serviceCategory, userId: req.session.user[0].serviceId})
    }
    else{
        res.json({message:'false'})
    }

    
})
router.get("/servicelogout" , function(req, res){
    req.session.destroy(null)
    res.json('logged out')
})
router.post("/serviceLogin", function(req, res){
    var username=req.body.user
    var password= req.body.pass
    console.log(username , password)
    var sql= "SELECT * FROM services where username= (?)";
    var values=[req.body.user];
    con.query(sql, [values], function(err, results, feilds){
        if (results.length !=0){
            console.log(results)
            console.log(results[0].password)
           
            bcrypt.compare(password, results[0].password, function(err, result) {
                if (result == true){
                req.session.user=results
                console.log(req.session.user)
                console.log('true')
                res.json({message: 'true'})
                

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
router.post("/servicesignup", function(req, res){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        var sql="insert into services (serviceName, serviceCategory, contact, location,username, password) values (?)";
        var values=[req.body.serviceName, req.body.serviceCategory,req.body.contact,req.body.location, req.body.user ,hash ];
        console.log(values)
        con.query(sql, [values] ,function(err, result){
            if(err){
                console.log(err);
                
            }
            else{
                console.log('registration done')
               
            }
        });
        })       
    res.send("successful")
}) 

router.get("/servicesRequest", function(req, res){
    var serviceId=req.session.user[0].serviceId
    sql="SELECT * FROM serviceRequests  WHERE serviceId = "+serviceId+" and responseStatus= 'NYR'";
    console.log(sql)
    con.query(sql, function(err,results2, feilds)
    {
        console.log(results2)
        res.json(results2)
    })
})
router.get("/servicesAccRequest", function(req, res){
    var serviceId=req.session.user[0].serviceId
    sql="select * from serviceRequests, serviceResponse where serviceRequests.reqId=serviceResponse.reqId and serviceId = "+serviceId+" and responseStatus='RESP';"
    console.log(sql)
    con.query(sql, function(err,results2, feilds)
    {
        console.log(results2)
        res.json(results2)
    })
})
router.get("/servicesAppRequest", function(req, res){
    var serviceId=req.session.user[0].serviceId
    //sql="select * from serviceRequests, serviceResponse where serviceRequests.reqId=serviceResponse.reqId and serviceId = "+serviceId+" and responseStatus='ACC';"
    sql="select * from serviceRequests, serviceResponse, servicePayments where serviceRequests.reqId=serviceResponse.reqId and serviceRequests.reqId=servicePayments.reqId and serviceId = "+serviceId+" and responseStatus='ACC';"
    console.log(sql)
    con.query(sql, function(err,results2, feilds)
    {
        console.log(results2)
        res.json(results2)
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

router.post("/setResponse", function(req, res){
    var reqId=req.body.reqID;
    var resp=req.body.resp;
    var cost=req.body.respCost;
    var sql= "insert into serviceResponse values("+reqId+",'"+resp+"',"+cost+")";
    console.log(sql);
    con.query(sql, function(err, results, feilds){
        if (err){
            res.json(err)
        }
        else{
            res.json('Sent');
            //fast2sms.sendMessage({authorization: process.env.API_KEY, message: 'Working!!', numbers:[8610042672]})
        }
    })


})



  module.exports = router;