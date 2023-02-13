import React from "react";
import {useEffect, useState } from "react";
function Schdthcabel(){
    const [category, setCat]=useState("Choose Category")
    return(
    <div className="schDth">
        <h3>DTH Schedule</h3>
        <div className="Dth">
            <div className="dth1">
        < select className="dthProvider" value={category} onChange={(e)=>{
                const selCat= e.target.value;
                setCat(selCat);
                }}
                >
                <option value="Category">Choose Category</option>
                <option value="Groceries">Groceries</option>
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Regular Pays">Regular Pays</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
        </select>
        <input type='text' placeholder="CustomerID"></input>
        </div>
        <div className="dth2">
        <input type='text' placeholder="Frequency"></input>
        <input type='text' placeholder="Day"></input>
        </div>
        <div className="dth3">
        <input type='text' placeholder="Amount"></input>
        <input type='text' placeholder="Description"></input> 
        </div>
        <div className="dth4">
        <button className="bt1 btn btn-primary">Back</button>
        <button className="bt2 btn btn-primary">Add</button>
        </div>
        </div>
    </div>)
}

export default Schdthcabel;