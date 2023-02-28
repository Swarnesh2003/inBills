import React from "react";
import {Link, Outlet} from "react-router-dom";
import {useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import axios from 'axios';
axios.defaults.withCredentials = true
function Serviceapprovedrequest()
{
  useEffect(()=>{tableRender()},[])
 
    function setRequest(e){
        console.log(e)
        const root = ReactDOM.createRoot(document.getElementById('modal-body'));
        root.render(<div>{e}</div>)  
    }
    function setResponse(e){
      const root = ReactDOM.createRoot(document.getElementById('modal-body'));
      root.render(  
        <div> 
          <div>{e}</div>
        <div>
        <td className="request"><button className="btn btn-success" >Edit Response</button></td>
        </div>
        </div>)  
  }
    function Card1(props) {
        return (
            <tr>
               
                  <td className="reqId">{props.reqId}</td>
                  
                  <td className="customer">{props.customer}</td>
                  <td className="customerContact">{props.customerContact}</td>
                  <td className="respDate">{props.pt}</td>
                  <td className="status">{props.pd}</td>
                  <td className="request"><button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" value={props.request} onClick={(e)=>{setRequest(e.target.value)}}>View Request</button></td>
                  <td className="response"><button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" value={props.response} onClick={(e)=>{setResponse(e.target.value)}}>View Response</button></td>
            </tr>
        );
      }
      function createCard1(data){
        
          return (
              <Card1
                key={data.reqId}
                reqId={data.reqId}
                pt={data.responseCost}
                customer={data.customerName}
                customerContact={data.customerContact}
                pd={data.paymentDone}
                request={data.request}
                response={data.response}
                />
            );
      }
    function tableRender(){
        return(/*fetch('http://localhost:8000/servicesAppRequest')
                .then(response => response.json())
                .then(data => {
                    const root1 = ReactDOM.createRoot(document.getElementById('arContent'));
                    console.log(data)
                    root1.render(
                        <div className="reqList">
                            <table >
                    <tr>
                    <th className="reqId">Request ID</th>
                    <th className="CustName">Customer</th>
                    <th className="CustName">Customer Contact</th>
                    <th className="pt">Payment Total</th>
                    <th className="pd">Payment Done</th>
                    <th className="acceptReq">Request</th>
                    <th className="ignoreReq">Response</th>
                </tr>
                {data.map(createCard1)}
                
                </table>
                        </div>) })*/
                        axios.get('http://localhost:8000/services/servicesAppRequest')
                          .then(function(response){
                            var data=response.data
                            const root1 = ReactDOM.createRoot(document.getElementById('arContent'));
                            console.log(data)
                            root1.render(
                                <div className="reqList">
                                    <table >
                            <tr>
                            <th className="reqId">Request ID</th>
                            <th className="CustName">Customer</th>
                            <th className="CustName">Customer Contact</th>
                            <th className="pt">Payment Total</th>
                            <th className="pd">Payment Done</th>
                            <th className="acceptReq">Request</th>
                            <th className="ignoreReq">Response</th>
                        </tr>
                        {data.map(createCard1)}
                        
                        </table>
                                </div>)

                          })
                        )
 }
    return(
        <div className="accpRequest">
        <div className="arheader">
            <h2>Approved Request</h2>
        </div>
        <div className="arContent" id="arContent">

        </div>
        <div className="popup">
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Request</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
        </div>
     
    </div>
    )
}

export default Serviceapprovedrequest;