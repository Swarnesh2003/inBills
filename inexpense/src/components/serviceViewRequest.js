import React from "react";
import {useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import {Link, Outlet} from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true
function Serviceviewrequest()
{
    var reqNum=0
    function setRequest(e){
        console.log(e)
        const root = ReactDOM.createRoot(document.getElementById('modal-body'));
        root.render(<div>{e}</div>)  
    }
    function accRequest(e){
        console.log(e)
        const root = ReactDOM.createRoot(document.getElementById('modal-body'));
        reqNum=e
        console.log(reqNum)
        root.render(<div className="serviceDetails">
            <div>
                <textarea className="serviceDet" id="serviceDet" placeholder="Enter the Details of Service here.."  ></textarea>
                <input type='number' className="servtotal" id="serviceCost" placeholder="Estimated Cost"></input>
                <button type="button" class="btn btn-primary sendQuat" onClick={sendQuat}>Send Quotation</button>
            </div>
        </div>)  
    }
    function ignRequest(e){
        const val = {reqId:e, status: 'IGN'};
        /*fetch('http://localhost:8000/updateRequest', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(val),
            }).then(response=>response.json())
            .then(data  => {
                console.log(data);
                tableRender();
                     });*/
        axios.post('http://localhost:8000/services/updateRequest', val)
            .then(function(response){
                var data=response.data
                console.log(data);
                tableRender();

            })
    }
    function Card1(props) {
        return (
            <tr>
               
                  <td className="reqId">{props.reqId}</td>
                  <td className="respDate">{props.respDate}</td>
                  <td className="customer">{props.customer}</td>
                  <td className="request"><button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" value={props.request} onClick={(e)=>{setRequest(e.target.value)}}>View Request</button></td>
                  <td className="request"><button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" value={props.reqId} onClick={(e)=>{accRequest(e.target.value)}}>Accept</button></td>
                  <td className="request"><button className="btn btn-danger" value={props.reqId} onClick={(e)=>{ignRequest(e.target.value)}}>Ignore</button></td>
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
                request={data.request}
                />
            );
      }
      function tableRender(){
            return(/*fetch('http://localhost:8000/servicesRequest')
                    .then(response => response.json())
                    .then(data => {
                        const root1 = ReactDOM.createRoot(document.getElementById('vrContent'));
                        console.log(data)
                        root1.render(
                            <div className="reqList">
                                <table >
                        <tr>
                        <th className="reqId">Request ID</th>
                        <th className="respDate">Response Date</th>
                        <th className="CustName">Customer</th>
                        <th className="reqBut">Request</th>
                        <th className="acceptReq">Accept</th>
                        <th className="ignoreReq">Ignore Request</th>
                    </tr>
                    {data.map(createCard1)}
                    
                    </table>
                            </div>) })*/
                    axios.get('http://localhost:8000/services/servicesRequest')
                            .then(function(response){
                                var data=response.data
                                const root1 = ReactDOM.createRoot(document.getElementById('vrContent'));
                        console.log(data)
                        root1.render(
                            <div className="reqList">
                                <table >
                        <tr>
                        <th className="reqId">Request ID</th>
                        <th className="respDate">Response Date</th>
                        <th className="CustName">Customer</th>
                        <th className="reqBut">Request</th>
                        <th className="acceptReq">Accept</th>
                        <th className="ignoreReq">Ignore Request</th>
                    </tr>
                    {data.map(createCard1)}
                    
                    </table>
                            </div>)

                            })
                            )
    
        
      }
    useEffect(()=>{tableRender()},[])
    function sendQuat()
    {
        var servDet=document.getElementById('serviceDet').value
        var servCost=document.getElementById('serviceCost').value
        const val = {resp:servDet, respCost: servCost, reqID: reqNum};
        /*fetch('http://localhost:8000/setResponse', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(val),
            }).then(response=>response.json())
            .then(data  => {
                console.log(data);
                
                     });*/
        axios.post('http://localhost:8000/services/setResponse', val)
                     .then(function(response){
                        var data=response.data
                        console.log(data);

                     })
        const val1 = {reqId:reqNum, status: 'RESP'};
        /*fetch('http://localhost:8000/updateRequest', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(val1),
            }).then(response=>response.json())
            .then(data  => {
                console.log(data);
                tableRender();
                     });*/
        axios.post('http://localhost:8000/services/updateRequest', val1)
                .then(function(response){
                    console.log(data);
                tableRender();
                })

                     const root = ReactDOM.createRoot(document.getElementById('modal-body'));
        root.render(<div className="serviceDetails">
            <div>
                <h3>Response Sent!!</h3>
            </div>
        </div>) 
    }
    return(
    <div className="viewRequest">
        <div className="vrheader">
            <h2>View Request</h2>
        </div>
        <div className="vrContent" id="vrContent">

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

export default Serviceviewrequest;