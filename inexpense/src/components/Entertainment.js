import React from "react";
import {Link, Outlet} from "react-router-dom";

function Entertainment()
{
    return(
    <div className="Recharge">
        <div className="rechargeHeader">
            <h2>Recharge</h2>
        </div>
        <div className="rechargeContent">
            <button className="primeBut ottbut"><img src="/images/primeVideo1.jpg" alt="Bootstrap" /></button>
            <button className="netflixBut ottbut"><img src="/images/Netflix.jpg" alt="Bootstrap" /></button>
            <button className="hotstarBut ottbut"><img src="/images/hotstar.jpg" alt="Bootstrap" /></button>
            </div>
            <div className="rechargeContent">
            <button className="ahaBut ottbut"><img src="/images/aga.jpg" alt="Bootstrap" /></button>
            <button className="sunnxtBut ottbut"><img src="/images/sunnxt.jpg" alt="Bootstrap" /></button>
            <button className="vootBut ottbut"><img src="/images/voot.jpg" alt="Bootstrap" /></button>
        </div>
    </div>
    )
}

export default Entertainment;