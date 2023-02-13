import React from "react";
import {Link, Outlet} from "react-router-dom";
function Budgetplanning()
{
    return(
    <div className="budgetDash">
        <div className="dashnav">
            
        </div>
        <div className="budNav">
            <Link to="/dashboard/Bookings/Bus"><button type="button" class="btn btn-primary budbutton">Bus Booking</button></Link>
            <Link to="/dashboard/Bookings/Train"><button type="button" class="btn btn-primary budbutton">Train Booking</button></Link>
            <Link to="/dashboard/Bookings/Flight"><button type="button" class="btn btn-primary budbutton">Flight Booking</button></Link>
        </div>
        <div className="budCont">
            <div id="dashmain">
                <Outlet />
            </div>
        </div>
    </div>
    )
}

export default Budgetplanning;