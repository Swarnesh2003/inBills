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


router.get("/getDet", function(req, res){
    if (req.session.user) {
        res.json({message: 'true', username: req.session.user[0].businessName, mail: req.session.user[0].mail , name: req.session.user[0].ownerName , businessId: req.session.user[0].businessId})
      } else {
        res.json({ message: 'false' });
      }
})


router.post("/login", function(req, res){
    var password= req.body.pass
    var sql= "SELECT * FROM businessDetail where username= (?)";
    var values=[req.body.user];
    con.query(sql, [values], function(err, results, feilds){
        if (results.length !=0){
            bcrypt.compare(password, results[0].password, function(err, result) {
            if (result == true){
                req.session.user = results;
                res.json({message: 'true'})
            }
            else{
                res.json({message: 'false'})
                
            }})
        }
        else{
            res.json({message: 'nouser'})

        }
    });
})
    

router.post("/signup", function(req, res){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        var sql="insert into businessDetail (businessName, ownerName, location, logoSource, username, password, contact, mail ) values (?)";
        var values=[req.body.businessName, req.body.ownerName,req.body.location,'/images/saravanastores.jpg',req.body.user ,hash, req.body.contact, req.body.mail ];
        con.query(sql, [values]);
        var sql1= "SELECT businessId FROM businessDetail where username = (?)";
        var values1=[req.body.user];
        con.query(sql1, [values1], function(err, results, feilds){
            var bid = results[0].businessId;
            var bidString = 'bid'+bid.toString();
            var sql2 = "CREATE TABLE "+ bidString +" (productno int primary key auto_increment,productname varchar(100),stock INT,cost INT,mrp INT)";
            con.query(sql2, function (err, result) {
                if(err){
                    console.log(err)
                    res.send("error")
                }
                else{
                    res.send("successful")
                }
                     
        })   

    });    
    })
})


router.get("/businesslogout" , function(req, res){
    req.session.destroy(null)
    res.json('logged out')
})





router.post("/getBill", function(req, res){
    var bill=req.body.billNum1;
    var billNumString = 'bill'+bill.toString()
    var sql2="SELECT * FROM "+billNumString;
    con.query(sql2, function(err,results2, feilds){
        res.json(results2)
    })
})
router.post("/getBillTotal", function(req, res){
    var bill=req.body.billNum1;
    var billNumString = 'bill'+bill.toString()
    var sql2="SELECT sum(cost) FROM "+billNumString;
    con.query(sql2, function(err,results2, feilds){
        res.json(results2)
    })
})

router.post("/getBillUsingNum", function(req, res){
    var num=req.body.custNum1;
    var businessId=req.session.user[0].businessId
    console.log(businessId)
    sql="SELECT * FROM billdetail where businessID="+businessId+" and phoneNum= '"+num+"'";
    console.log(sql)
    con.query(sql, function(err,results2, feilds)
    {
        console.log(results2)
        res.json(results2)
    })
})
router.post("/addProducts", function(req,res) {
    console.log(req.session.user);
    var businessId=req.session.user[0].businessId
    console.log(businessId);
    var sql = "insert into bid"+businessId+" (productname,stock,cost,mrp) values (?);"
    console.log(sql)
      var values = [
      req.body.productName,
      req.body.Qty,
      req.body.Mrp,
      req.body.cost
      ];
  
  
      con.query(sql,[values] , function(err, results, feilds){
        console.log('hi')
      })
      console.log(req.session.user)
      res.json({message:'inserted'});
       
  })
router.get("/getProducts", function(req, res){
    console.log(req.session.user)
    var businessId=req.session.user[0].businessId
    console.log(businessId);
    sql="SELECT * FROM bid"+businessId;
    con.query(sql, function(err,results2, feilds)
    {
        console.log(results2)
        res.json(results2)
    })

  })

router.post("/newbill",function(req,res){
    console.log("entered into server")
    var n='bill';
    const billDate = new Date().toJSON().slice(0, 10)
    console.log(billDate) 
    var nums=req.body.CustNo;
    console.log(nums);
    var businessId=req.session.user[0].businessId
    var businessName=req.session.user[0].businessName
    var sql1="INSERT into billdetail (billDate,businessID, businessName, phoneNum) values('"+billDate+"',"+businessId+",'"+businessName+"','"+nums+"');"
    
    console.log(sql1)
    con.query(sql1)
   var sql2="SELECT max(billno) as bn from billdetail";
   console.log(sql2)
   
    
    con.query(sql2,function(err,results,fields){
     var bid=0;   
    if (err)
    {
        console.log(err) ;

    }   
    else
    {   
          bid=results[0].bn;
          
          console.log(bid)
          console.log("bid")
          var num=n+bid.toString();
          res.json(bid);
          console.log(num)
          console.log("num")
          var sql="CREATE table "+num+" (productno int,productname varchar(100),mrp int,qty int, cost int);"
          con.query(sql);

        }  
    })
})

router.post("/gproducts",function(req,res){
    var name=req.body.productName
    var pnum=req.body.productNum
    var pmrp=req.body.productMrp
    var pqty=req.body.productQty
    var pcost=req.body.productCost
    var bill=req.body.billNum
    var n='bill'+bill.toString();
    console.log(n)
   
    var sql="insert into "+n+" values ("+pnum+",'"+name+"',"+pmrp+","+pqty+","+pcost+");";
    con.query(sql ,function(err, results, feilds){
        if (err){
            console.log(err)
        }
        else{
            console.log(results);
        var sql="select * from "+n;
        console.log(sql)
        con.query(sql, function(err, results1, feilds){
            if(err){
                console.log(err)
            }
            else{
                console.log(results1)
                res.json(results1)
            }
         
        })
        }
        
    });
})


module.exports = router;