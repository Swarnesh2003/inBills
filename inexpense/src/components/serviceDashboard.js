import React from "react";
import {Link, Outlet} from "react-router-dom";
import {useEffect, useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
axios.defaults.withCredentials = true
function Servicedashboard()
{
    const [fname, setData]= useState(null);
    const [id, setId]=useState(null);
    useEffect(()=>{
        /*fetch("http://localhost:8000/getServiceDet")
        .then((resp)=>resp.json())
        .then((data)=>{
            setData(data.username);
            setId(data.userId)
        });*/
        axios.get('http://localhost:8000/services/getServiceDet')
            .then(function(response){
                var data=response.data
                setData(data.username);
                setId(data.userId)

            })
        
    }, []);
    function logout(){
        /*fetch("http://localhost:8000/servicelogout")
        .then((resp)=>resp.json())
        .then((data)=>{
            location.replace('/')
        })*/
        swal({
            text: "Are you sure want to logout?",
            icon: "warning",
          })
.then((value) => {
    axios.get('http://localhost:8000/business/businesslogout')
    .then(function(response){
        location.replace('/')
    })
});
    }
    return(
        <div className="dash">
        <div className="sidebar">
            <div className="sideBrand">
                <a className="navbar-brand dashlogo" href="#"><img src=".\images\inbills.png" alt="Bootstrap" width="130" height="40"/></a>
                
            </div>
            <div className="dashbuttons">
                <p>Panel</p>
                <Link to="/serviceDashboard/viewRequests"><button><img src=".\images\analysis.png" alt="Bootstrap" />View Requests</button></Link>
                <Link to="/serviceDashboard/acceptedRequests"><button><img src=".\images\calendar.png" alt="Bootstrap" />Accepted Requests</button></Link>
                <Link to="/serviceDashboard/approvedRequests"><button><img src=".\images\calendar.png" alt="Bootstrap" />Approved Requests</button></Link>
            </div>
            <div className="sideBottom">
                <hr className="style14"></hr>
                <Link to="/dashboard/myAccount"><button><img src=".\images\debit-card.png" alt="Bootstrap" />Account Details</button></Link>
                <button onClick={logout}><img src=".\images\logout1.png" alt="Bootstrap" />Logout</button>
            </div>
            

        </div>
        <div className="main-bar">
            <div className="about">
                <div className="name">
                <p>Welcome Back!</p>
                <h2>{fname}</h2>
                </div>
                <div className="wallet">
                    <p2>Wallet</p2>
                    <h3>₹5000</h3>
                </div>
                
            </div>
            <div className="dashcontent">
                <div id="dashmain">
                    <Outlet />
                    
                </div>
            </div>
        </div>
    </div>
    )
}

export default Servicedashboard;