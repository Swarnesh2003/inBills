import React from "react";
import {Link, Outlet} from "react-router-dom";
import {useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import axios from 'axios';
axios.defaults.withCredentials = true;
function Custresponses()
{
    useEffect(()=>{tableRender()},[])
    function setRequest(e){
        console.log(e)
        const root = ReactDOM.createRoot(document.getElementById('modal-body'));
        root.render(<div>{e}</div>)  
    }
    function accRequest(e){
        const val = {reqId:e, status: 'ACC'};
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
                setRequest('Acceptance sent.. The provider will contact you soon!!')
                     });*/
          axios.post('http://localhost:8000/user/updateRequest', val)
                     .then(function(response){
                      var data=response.data
                      console.log(data);
                tableRender();
                setRequest('Acceptance sent.. The provider will contact you soon!!')

                     })
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
      axios.post('http://localhost:8000/user/updateRequest', val)
                   .then(function(response){
                    var data=response.data
                    tableRender();
                   })
  }
    function Card1(props) {
        return (
            <tr>
               
                  <td className="reqId">{props.reqId}</td>
                  <td className="customer">{props.business}</td>
                  <td className="status">{props.status}</td>
                  <td className="request"><button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" value={props.request} onClick={(e)=>{setRequest(e.target.value)}}>View Request</button></td>
                  <td className="response"><button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" value={props.response} onClick={(e)=>{setRequest(e.target.value)}}>View Response</button></td>
                 <td className="accept"><button className="btn btn-success" id="accpt" data-bs-toggle="modal" data-bs-target="#exampleModal" value={props.reqId} onClick={(e)=>{accRequest(e.target.value)}}>Accept</button></td>
                 <td className="request"><button className="btn btn-danger" value={props.reqId} onClick={(e)=>{ignRequest(e.target.value)}}>Ignore</button></td>
            </tr>
        );
      }
      function createCard1(data){
        
          return (
              <Card1
                key={data.reqId}
                reqId={data.reqId}
                business={data.serviceName}
                status={data.responseCost}
                request={data.request}
                response={data.response}
                />
            );
      }
    function tableRender(){
        return(

                axios.get('http://localhost:8000/user/custServicesResponses')
                      .then(function(response){
                        var data=response.data
                        const root1 = ReactDOM.createRoot(document.getElementById('casContent'));
                        console.log(data)
                        root1.render(
                            <div className="reqList">
                                <table >
                        <tr>
                        <th className="reqId">Request ID</th>
                        <th className="CustName">Provider</th>
                        <th className="resStatus">Estimate</th>
                        <th className="acceptReq">Request</th>
                        <th className="ignoreReq">Response</th>
                        <th className="accept">Accept</th>
                        <th className="accept">Ignore</th>
                    </tr>
                    {data.map(createCard1)}
                    
                    </table>
                            </div>)
                      })
                        )
 }
    return(<div className="custAccServices">
        <div className="header">
            <h2>Service Responses</h2>
        </div>
        <div className="casContent" id="casContent">
            
        </div>
        <div className="popup">
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Response</h1>
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

    </div>)

}

export default Custresponses;