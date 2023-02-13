const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt")
const bodyParser=require("body-parser");
const fast2sms = require('fast-two-sms')
const app=express();
const saltRounds = 10;
var mysql = require('mysql');
require('dotenv').config();
/*var options = {authorization : process.env.API_KEY , message : 'YOUR_MESSAGE_HERE' ,  numbers : ['9500334396']} 
smsSend(options)
async function smsSend(options){
    console.log(options)
    var response = await fast2sms.sendMessage(options)
    console.log('came in')
    console.log(response)
    console.log('came out')
  }
const accountSid = "ACec02574f17a7e765dd59b5ce90606b32";
const authToken = "c86f01cb8fd2341b212f8cd6b428e094";
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: 'Hello, Swarnesh!.. Your server has been restared!!.. Happy Hacking',
         to: 'whatsapp:+918610042672'
       })
      .then(message => console.log(message.sid));


      */


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Samaya#9421",
  database: "inexpense"
});
con.connect();
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({ //cross origin resource sharing
    origin: '*'
}));
app.use(express.json());

app.get("/data", function(req, res){
    res.json({message: "<h1>server running</h1>"})
})
var businessId=0
var logged='false'
var username='nil'
var mail='nil'
var OwnerName='nil'
var businessName='nil'




app.get("/getDet", function(req, res){
    console.log('getdet')
    console.log(logged)
    res.json({message: logged, username: username, mail: mail, name: OwnerName, businessId: businessId})
})
app.get("/businesslogout" , function(req, res){
    businessId=0
    logged='false'
    username='nil'
    mail='nil'
    OwnerName='nil'
    businessName='nil'
    res.json('logged out')
})
app.post("/login", function(req, res){
    var username=req.body.user
    var password= req.body.pass
    console.log(username , password)
    var sql= "SELECT * FROM businessDetail where username= (?)";
    var values=[req.body.user];
    con.query(sql, [values], function(err, results, feilds){
        if (results.length !=0){
            console.log(results)
            console.log(results[0].password)
            bcrypt.compare(password, results[0].password, function(err, result) {
            if (result == true){
                res.json({message: 'true'})
                console.log('true')
                logged='true'
                businessId=results[0].businessId
                username=results[0].username
                mail=results[0].mail
                OwnerName=results[0].ownerName
                businessName=results[0].businessName
                //fast2sms.sendMessage({authorization: process.env.API_KEY, message: 'Working!!', numbers:[8610042672]})
            }
            else{
                res.json({message: 'false'})
                logged='false'
            }})
        }
        else{
            logged='nouser'
            res.json({message: 'nouser'})

        }
    });
})
    

app.post("/signup", function(req, res){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        var sql="insert into businessDetail (businessName, ownerName, location, logoSource, username, password, contact, mail ) values (?)";
        var values=[req.body.businessName, req.body.ownerName,req.body.location,'/images/saravanastores.jpg',req.body.user ,hash, req.body.contact, req.body.mail ];
        console.log(values)
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
                    console.log("Table created"); 
                    res.send("successful")
                }
                     
        })   

    });    
    })
})

app.post("/servicesignup", function(req, res){
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




app.listen(8000, function(){
    console.log("server started on port 8000");
})



app.post("/getBill", function(req, res){
    console.log(businessId);
    var bill=req.body.billNum1;
    console.log(bill)
    var billNumString = 'bill'+bill.toString()
    var sql2="SELECT * FROM "+billNumString;
    console.log(billNumString)
    con.query(sql2, function(err,results2, feilds){
        console.log(results2)
        res.json(results2)
    })
    /*var sql= "SELECT businessID FROM billdetail where billno = (?)"
    var values=[bill]
    con.query(sql, [values], function(err, results, feilds){
        var rBid = results[0].businessID;
        console.log(rBid)
        console.log(businessId)
        if(rBid === businessId){
        }
        var billNumString = 'bill'+bill.toString();*/
})
app.post("/getBillTotal", function(req, res){
    console.log(businessId);
    var bill=req.body.billNum1;
    console.log(bill)
    var billNumString = 'bill'+bill.toString()
    var sql2="SELECT sum(cost) FROM "+billNumString;
    console.log(billNumString)
    con.query(sql2, function(err,results2, feilds){
        console.log(results2)
        res.json(results2)
    })
})

app.post("/getBillUsingNum", function(req, res){
    var num=req.body.custNum1;
    console.log(businessId)
    sql="SELECT * FROM billdetail where businessID="+businessId+" and phoneNum= '"+num+"'";
    console.log(sql)
    con.query(sql, function(err,results2, feilds)
    {
        console.log(results2)
        res.json(results2)
    })
})
app.post("/addProducts", function(req,res) {
    
    
    var sql = "insert into bid"+businessId+" (productname,stock,cost,mrp) values (?);"
    console.log(sql)
      var values = [
      req.body.productName,
      req.body.Qty,
      req.body.Mrp,
      req.body.cost
      ];
  
  
      con.query(sql,[values] , function(err, results, feilds){
        console.log(results)
      })//,function(err,data,field) {
          //if(err) return res.json(err)
          //res.json("helooo")
      //})
      res.json({message:'inserted'});
       
  })
  app.get("/getProducts", function(req, res){
    sql="SELECT * FROM bid"+businessId;
    con.query(sql, function(err,results2, feilds)
    {
        console.log(results2)
        res.json(results2)
    })

  })

  /*app.post("/generatebill",function(req,res){
    var sql="INSERT INTO bill VALUES (?)";
    var values=[req.body.productNo,req.body.productName,req.body.Mrp,req.body.quantity,req.body.cost];
    con.query(sql,[values]) ;
    var sql1= "SELECT * FROM bill where productNo= (?)";
    var value=[req.body.productNo];
    con.query(sql1, [value], function(err, results, feilds){
        console.log(results);
        res.json(results);
    })
}
)*/

/*athu gen bill copy*/
app.post("/newbill",function(req,res){
    console.log("entered into server")
    var n='bill';
    const billDate = new Date().toJSON().slice(0, 10)
    console.log(billDate) //2015-07-23
    var nums=req.body.CustNo;
    console.log(nums);
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
app.post("/generatebill",function(req,res){
    var sql="INSERT INTO bill VALUES (?)";
    var values=[req.body.productNo,req.body.productName,req.body.Mrp,req.body.quantity,req.body.cost];
    db.query(sql,[values]) ;
    var sql1= "SELECT * FROM bill where productNo= (?)";
    var value=[req.body.productNo];
    db.query(sql1, [value], function(err, results, feilds){
        console.log(results);
        res.json(results);
    })
}
) 
app.post("/gproducts",function(req,res){
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

/*app.get("/createBill", function(req, res){
    var sql="insert into billdetail (billDate, businessID, businessName, phoneNum) values (now(),"+businessId+","+businessName+")";
    var values = []
})

*/
//Customer

var loggedCustId=0
var loggedCustNum='nil'
var loggedCustName='nil'
var loggedCustMail=''
var loggedCust='false'
app.get("/getCustDet", function(req, res){
    console.log('getdet')
    console.log(logged)
    res.json({ message:loggedCust, username:loggedCustName , mail: loggedCustMail, userId: loggedCustId})
})
app.post("/custsignup", function(req, res){
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
app.post("/custLogin", function(req, res){
    var username=req.body.user
    var password= req.body.pass
    console.log(username , password)
    var sql= "SELECT * FROM users where username= (?)";
    var values=[req.body.user];
    con.query(sql, [values], function(err, results, feilds){
        if (results.length !=0){
            console.log(results)
            console.log(results[0].password)
           
            bcrypt.compare(password, results[0].password, function(err, result) {
                if (result == true){
                res.json({message: 'true'})
                console.log('true')
                logged='true'
                loggedCustId=results[0].userId
                loggedCustName=results[0].first_name
                loggedCustMail=results[0].email
                loggedCustNum=results[0].contact
                loggedCust='true'

            }
            else{
                res.json({message: 'false'})
                loggedCust='false'
            }
        })}
        else{
            loggedCust='nouser'
            res.json({message: 'nouser'})

        }
    });
})
app.get("/Custlogout" , function(req, res){
    loggedCustId=0
    loggedCustNum='nil'
    loggedCustName='nil'
    loggedCustMail=''
    loggedCust='false'
    res.json('logged out')
})
app.post("/getLogo", function(req, res){
    var key=req.body.key;
    var sql= "SELECT * FROM businessDetail where businessName like (?)";
    var values=[req.body.key+'%'];
    console.log(values)
    con.query(sql, [values], function(err, results, feilds){
        console.log(results)
        res.json(results)
    })    
})

app.get("/data", function(req, res){
    res.json({message: "<h1>server running</h1>"})
})
app.get("/getBillforCust", function(req, res){
    sql="SELECT * FROM billdetail where phoneNum= '"+loggedCustNum+"'";
    console.log(sql)
    con.query(sql, function(err,results2, feilds)
    {
        console.log(results2)
        res.json(results2)
    })
})
app.get("/custServicesResponses", function(req, res){
    sql="select * from serviceRequests, serviceResponse where serviceRequests.reqId=serviceResponse.reqId and customerId = "+loggedCustId+" and responseStatus= 'RESP';"
    console.log(sql)
    con.query(sql, function(err,results2, feilds)
    {
        console.log(results2)
        res.json(results2)
    })
})

app.get("/custServicesAccepted", function(req, res){
    sql="select * from serviceRequests, serviceResponse where serviceRequests.reqId=serviceResponse.reqId and customerId = "+loggedCustId+" and (responseStatus= 'ACC' or responseStatus= 'CLS') order by serviceRequests.reqId desc ;"
    console.log(sql)
    con.query(sql, function(err,results2, feilds)
    {
        console.log(results2)
        res.json(results2)
    })
})



app.post("/hello", function(req,res) {
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




/*Services*/
var serviceId=0
var serviceName=''
var serviceCat=''
var serviceContact=''
var loggedService='false'
app.get("/getServiceDet", function(req, res){
    console.log('getdet')
    console.log(logged)
    res.json({ message:loggedService, username:serviceName , servCat:serviceCat, userId: serviceId})
})
app.get("/servicelogout" , function(req, res){
    serviceId=0
    serviceName=''
    serviceCat=''
    serviceContact=''
    loggedService='false'
    res.json('logged out')
})
app.post("/serviceLogin", function(req, res){
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
                res.json({message: 'true'})
                console.log('true')
                logged='true'
                serviceId=results[0].serviceId
                serviceName=results[0].serviceName
                serviceCat=results[0].serviceCategory
                serviceContact=results[0].contact
                loggedService='true'

            }
            else{
                res.json({message: 'false'})
                loggedService='false'
            }
        })}
        else{
            loggedService='nouser'
            res.json({message: 'nouser'})

        }
    });
})
app.get("/servicesRequest", function(req, res){
    sql="SELECT * FROM serviceRequests  WHERE serviceId = "+serviceId+" and responseStatus= 'NYR'";
    console.log(sql)
    con.query(sql, function(err,results2, feilds)
    {
        console.log(results2)
        res.json(results2)
    })
})
app.get("/servicesAccRequest", function(req, res){
    sql="select * from serviceRequests, serviceResponse where serviceRequests.reqId=serviceResponse.reqId and serviceId = "+serviceId+" and responseStatus='RESP';"
    console.log(sql)
    con.query(sql, function(err,results2, feilds)
    {
        console.log(results2)
        res.json(results2)
    })
})
app.get("/servicesAppRequest", function(req, res){
    //sql="select * from serviceRequests, serviceResponse where serviceRequests.reqId=serviceResponse.reqId and serviceId = "+serviceId+" and responseStatus='ACC';"
    sql="select * from serviceRequests, serviceResponse, servicePayments where serviceRequests.reqId=serviceResponse.reqId and serviceRequests.reqId=servicePayments.reqId and serviceId = "+serviceId+" and responseStatus='ACC';"
    console.log(sql)
    con.query(sql, function(err,results2, feilds)
    {
        console.log(results2)
        res.json(results2)
    })
})


app.post("/updateRequest", function(req, res){
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

app.post("/setResponse", function(req, res){
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
            fast2sms.sendMessage({authorization: process.env.API_KEY, message: 'Working!!', numbers:[8610042672]})
        }
    })


})

app.post("/closeRequest", function(req, res){
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



/*ROUGH */
app.post("/message", async (req, res)=>{
    console.log('came')
    const response = await fast2sms.sendMessage({authorization : process.env.API_KEY, message : req.body.message, numbers:[req.body.number]})
    res.send(response)
})