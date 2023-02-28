import React from "react";
import swal from 'sweetalert';
import ReactDOM from 'react-dom/client';
import {Link, Outlet} from "react-router-dom";
import {useEffect, useState } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;
function Dashboard(){
    const [fname, setData]= useState(null);
    const [id, setId]=useState(null);
    useEffect(()=>{

        axios.get('http://localhost:8000/business/getDet')
            .then(function(response){
                var data=response.data
                setData(data.name);
                setId(data.businessId)
            })
    }, []);
    function logout(){
        /*fetch("http://localhost:8000/businesslogout")
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
                    <a className="navbar-brand dashlogo" href="#"><img src=".\images\inbills.png" alt="Bootstrap" width="135" height="50"/></a>
                    
                </div>
                <div className="dashbuttons">
                    <p>Panel</p>
                    <Link to="/dashboard/genBill"><button><img src=".\images\analysis.png" alt="Bootstrap" />Generate Bill</button></Link>
                    <Link to="/dashboard/viewBills"><button><img src=".\images\calendar.png" alt="Bootstrap" />View Bills</button></Link>
                    <Link to="/dashboard/viewOrders"><button><img src=".\images\insurance.png" alt="Bootstrap" />View Orders</button></Link>
                    <Link to="/dashboard/addProducts"><button><img src=".\images\document.png" alt="Bootstrap" />Add Products</button></Link>
                    {/*<Link to="/dashboard/viewProducts"><button><img src=".\images\investment.png" alt="Bootstrap" />View Products</button></Link>*/}
                    <Link to="/dashboard/expense"><button><img src=".\images\analysis.png" alt="Bootstrap" />Analysis</button></Link>
                    {/*<Link to="/dashboard/Bookings"><button><img src=".\images\task.png" alt="Bootstrap" />Bookings</button></Link>
                    <Link to="/dashboard/Recharge"><button><img src=".\images\recharge.png" alt="Bootstrap" />Recharge</button></Link>
                    <Link to="/dashboard/Entertainment"><button><img src=".\images\video.png" alt="Bootstrap" />Entertainment</button></Link>
                    */}
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
    );
}
export default Dashboard;