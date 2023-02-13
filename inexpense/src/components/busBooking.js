import React from "react";
import {Link, Outlet} from "react-router-dom";
function Bus(){
    return(
    <div className="newbudget">
        <div className="budgetDet">
            
        <div className="amtEntry">
        <Link to="/dashboard/expense"><button><img src=".\images\analysis.png" alt="Bootstrap" />Expense Analysis</button></Link>
        <button><img src=".\images\analysis.png" alt="Bootstrap" />Expense Analysis</button>
        </div>
        </div>
        <div className="splitInc">

        </div>
    </div>)
}

export default Bus;