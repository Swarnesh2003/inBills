import React from "react";
import {Link, Outlet} from "react-router-dom";
function Recharge()
{
    return(
        <div className="Recharge">
            <div className="rechargeHeader">
                <h2>Recharge</h2>
            </div>
            <div className="rechargeContent">
            <button className="primeBut ottbut"><img src="/images/airtel.png" alt="Bootstrap" /></button>
            <button className="netflixBut ottbut"><img src="/images/act.png" alt="Bootstrap" /></button>
            <button className="hotstarBut ottbut"><img src="/images/jio.png" alt="Bootstrap" /></button>
            </div>
            <div className="rechargeContent">
            <button className="ahaBut ottbut"><img src="/images/bsnl.png" alt="Bootstrap" /></button>
            <button className="sunnxtBut ottbut"><img src="/images/vodafone.jpg" alt="Bootstrap" /></button>
            
        </div>
    </div>
    )
}

export default Recharge;