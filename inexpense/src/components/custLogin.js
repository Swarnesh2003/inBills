import React from "react";
import {Link, Outlet} from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true
function Custlogin()
{    
    
function redirect(){
    const user1=document.getElementsByClassName('user1')[0].value
    const pass1=document.getElementsByClassName('pw1')[0].value
    
    console.log(user1, pass1)
    const val={user:user1, pass:pass1};
        axios.post('http://localhost:8000/user/custlogin', val)
        .then(function(response){
            location.replace('/custDashboard')
        })

    }
    return(
        <div className="loginbody">
        <div class="main">
       <div class="form-container">
            <h1>Customer Login</h1>
            <p>Please fill in your basic info</p>
            <div class="userinp">
                <input type="text" className="user1" id="user1" placeholder="Username"></input>
                <input type="password" className="pw1" id="pw1" placeholder="Password"></input>
            </div>
            <div class="signinbut"><button onClick={redirect}>LOGIN</button></div>
            <div class="fpbut"><button>Forgot Password?</button></div>
        </div>
        <div class="text-container">
            <h1>Sign Up</h1>
            <p>Using your social media account</p>
            <img class="logo1" src=".\images\incLogo1.png"></img>
            <div class="cb1">
                <input type="checkbox" id="terms1" name="terms1" value="terms"></input>
                <label for="terms1">By Signing up I agree with terms and conditions</label>
            </div>
            <a href="/CustSignUp">Create Account?</a>
        </div>
    </div>
    </div>
    )
}

export default Custlogin;