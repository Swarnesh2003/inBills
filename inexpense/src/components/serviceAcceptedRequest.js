import React from "react";
import {Link, Outlet} from "react-router-dom";
import {useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import axios from 'axios';
axios.defaults.withCredentials = true
function Serviceacceptedrequest()
{
    useEffect(()=>{tableRender()},[])
    function setRequest(e){
        console.log(e)
        const root = ReactDOM.createRoot(document.getElementById('modal-body'));
        root.render(<div>{e}</div>)  
    }
    function Card1(props) {
        return (
            <tr>
               
                  <td className="reqId">{props.reqId}</td>
                  <td className="respDate">{props.respDate}</td>
                  <td className="customer">{props.customer}</td>
                  <td className="status">{props.status}</td>
                  <td className="request"><button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" value={props.request} onClick={(e)=>{setRequest(e.target.value)}}>View Request</button></td>
                  <td className="response"><button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" value={props.response} onClick={(e)=>{setRequest(e.target.value)}}>View Response</button></td>
            </tr>
        );
      }
      function createCard1(data){
        
          return (
              <Card1
                key={data.reqId}
                reqId={data.reqId}
                respDate={data.tillDate}
                customer={data.customerName}
                status={data.responseStatus}
                request={data.request}
                response={data.response}
                />
            );
      }
    function tableRender(){
        return(/*fetch('http://localhost:8000/servicesAccRequest')
                .then(response => response.json())
                .then(data => {
                    const root1 = ReactDOM.createRoot(document.getElementById('arContent'));
                    console.log(data)
                    root1.render(
                        <div className="reqList">
                            <table >
                    <tr>
                    <th className="reqId">Request ID</th>
                    <th className="respDate">Response Date</th>
                    <th className="CustName">Customer</th>
                    <th className="resStatus">Status</th>
                    <th className="acceptReq">Request</th>
                    <th className="ignoreReq">Response</th>
                </tr>
                {data.map(createCard1)}
                
                </table>
                        </div>) })*/
                axios.get('http://localhost:8000/services/servicesAccRequest')
                      .then(function(response){
                        var data=response.data
                        const root1 = ReactDOM.createRoot(document.getElementById('arContent'));
                    console.log(data)
                    root1.render(
                        <div className="reqList">
                            <table >
                    <tr>
                    <th className="reqId">Request ID</th>
                    <th className="respDate">Response Date</th>
                    <th className="CustName">Customer</th>
                    <th className="resStatus">Status</th>
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
            <h2>Accepted Request</h2>
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

export default Serviceacceptedrequest;