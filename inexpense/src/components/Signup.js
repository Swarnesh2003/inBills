import React from "react";


function Signup(){
    return (
        <div className="signupmain">
        <div className="sucontainer">
        <div className="sucontainer1">
            <img src=".\images\inbills1.png"></img>
            <p>©Incentive Technology</p>
        </div>
        <div className="sucontainer2">
            <h2>Business Registration</h2>
        <form action="http://localhost:8000/business/signup" method="POST">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12"><input type="text" name="businessName" className="fname" placeholder="Business Name"></input></div>
                <div className="col-lg-6 col-md-6 col-sm-12"> <input type="text" name="ownerName"  className="lname" placeholder="Owner Name"></input></div>
                <div className="col-lg-6 col-md-6 col-sm-12">  <input type="text" name="location"  className="lname" placeholder="Location"></input></div>
                <div className="col-lg-6 col-md-6 col-sm-12">  <input type="text" name="contact" className="phnum" placeholder="Contact"></input></div>
                <div className="col-lg-6 col-md-6 col-sm-12">   <input type="email" name="mail" className="mail" placeholder="e-mail"></input></div>
                <div className="col-lg-6 col-md-6 col-sm-12">  <input type="text" name="user" className="user" placeholder="Username"></input></div>
                <div className="col-lg-6 col-md-6 col-sm-12">   <input type="password" name="password" className="pass" placeholder="password"></input></div>
                <div className="col-lg-6 col-md-6 col-sm-12">  <input type="password" name="cpassword" className="pass" placeholder="confirm password"></input></div>
                  <button type="submit" className="btn btn-primary" name="submit">Register</button>          
            
            </div>
        </form>
        
        </div>
        </div>
    </div>)
}

export default Signup;