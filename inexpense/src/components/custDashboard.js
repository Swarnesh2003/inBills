import React from "react";

import {useEffect, useState } from "react";
import {Link, Outlet} from "react-router-dom";
function Custdashboard()
{const [fname, setData]= useState(null);
    const [id, setId]=useState(null);
    useEffect(()=>{
        fetch("http://localhost:8000/getCustDet")
        .then((resp)=>resp.json())
        .then((data)=>{
            setData(data.username);
            setId(data.userId)
        });
    }, []);
    function logout(){
        fetch("http://localhost:8000/Custlogout")
        .then((resp)=>resp.json())
        .then((data)=>{
            location.replace('/')
        })
    }
    return(
        <div className="dash">
        <div className="sidebar">
            <div className="sideBrand">
                <a className="navbar-brand dashlogo" href="#"><img src=".\images\inbills.png" alt="Bootstrap" width="130" height="40"/></a>
                
            </div>
            <div className="dashbuttons">
                <p>Panel</p>
                <Link to="/CustDashboard/viewBillsCust"><button><img src=".\images\analysis.png" alt="Bootstrap" />View Bills</button></Link>
                <Link to="/CustDashboard/makeServiceRequest"><button><img src=".\images\calendar.png" alt="Bootstrap" />Request Services</button></Link>
                <Link to="/CustDashboard/respondedServicesCust"><button><img src=".\images\insurance.png" alt="Bootstrap" />Service Responces</button></Link>
                <Link to="/CustDashboard/acceptedServicesCust"><button><img src=".\images\investment.png" alt="Bootstrap" />Accepted Services</button></Link>
                <Link to="/CustDashboard/MakeOrders"><button><img src=".\images\document.png" alt="Bootstrap" />Make Orders</button></Link>
                <Link to="/CustDashboard/viewBillsCust"><button><img src=".\images\investment.png" alt="Bootstrap" />My Order</button></Link>
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

export default Custdashboard;