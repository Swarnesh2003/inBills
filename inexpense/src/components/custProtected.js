import React from 'react'
import {useEffect, useState } from "react";
import {Navigate, resolvePath} from 'react-router-dom'
function Custprotected({children}){
    const [log, setData]= useState(null);
    useEffect(()=>{
        fetch("http://localhost:8000/getCustDet")
        .then((resp)=>resp.json())
        .then((data)=>{
            setData(data.message);
        });
    }, []);
    if(log==='false')
    {
        console.log("came inside")
        window.alert("Incorrect password")
        return <Navigate to ="/CustLogin" replace />
    }
    else if(log==='nouser')
    {
        console.log("came inside")
        window.alert("No account found with this user name")
        return <Navigate to ="/CustLogin" replace />
    }
    else if (log==='true')
    {
        console.log("came inside")
        return children
    }
}

export default Custprotected
/*
*/