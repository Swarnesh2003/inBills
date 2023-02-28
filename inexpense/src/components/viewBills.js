import React from "react";
import ReactDOM from 'react-dom/client';
import {useEffect, useState } from "react";
import {Link, Outlet} from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true;
function Viewbills()
{
    const [billNo, setBill1]= useState(null)
    function setBill(e){
        setBill1(e)
        console.log(e)
        const root = ReactDOM.createRoot(document.getElementById('modal-body'));
        const val = {billNum1:e};
            axios.post('http://localhost:8000/business/getBill', val)
                .then(function(response){
                    console.log(response);
                    var data= response.data
                        console.log(data);
                        var sum=0;
                        for (let i=0; i<data.length;i++){
                          sum=sum+data[i].cost;
                        }
                        root.render(
                            <div className="billList">
                                <table >
                        <tr>
                        <th className="prodNum">ProductNo</th>
                        <th className="prodName">Product Name</th>
                        <th className="qty">Mrp</th>
                        <th className="prodCost">Quantity</th>
                        <th className="prodMrp">Cost</th>
                    </tr>
                    {data.map(createCard)}
                    <tr>
                          <td className="prodNum"></td>
                          <td className="prodName"></td>
                          <td className="custNum"></td>
                          <td className="ordCost"></td>
                          <td className="ordPay">----------</td>              
                    </tr>
                    <tr>
                          <td className="prodNum"></td>
                          <td className="prodName"></td>
                          <td className="custNum">Total : </td>
                          <td className="ordCost"></td>
                          <td className="ordPay">{sum}</td>              
                    </tr>
                    </table>
                            </div>)
                })
            /*fetch('http://localhost:8000/getBill', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(val),
            }).then(response=>response.json())
            .then(data => {
                console.log(data);
                var sum=0;
                for (let i=0; i<data.length;i++){
                  sum=sum+data[i].cost;
                }
                root.render(
                    <div className="billList">
                        <table >
                <tr>
                <th className="prodNum">ProductNo</th>
                <th className="prodName">Product Name</th>
                <th className="qty">Mrp</th>
                <th className="prodCost">Quantity</th>
                <th className="prodMrp">Cost</th>
            </tr>
            {data.map(createCard)}
            <tr>
                  <td className="prodNum"></td>
                  <td className="prodName"></td>
                  <td className="custNum"></td>
                  <td className="ordCost"></td>
                  <td className="ordPay">----------</td>              
            </tr>
            <tr>
                  <td className="prodNum"></td>
                  <td className="prodName"></td>
                  <td className="custNum">Total : </td>
                  <td className="ordCost"></td>
                  <td className="ordPay">{sum}</td>              
            </tr>
            </table>
                    </div>)
            });*/
        
    }
    function Card(props) {
        return (
            <tr>
                  <td className="prodNum">{props.prodNo}</td>
                 
                  <td className="prodName">{props.prodName}</td>
                  <td className="custNum">{props.mrp}</td>
                  <td className="ordCost">{props.qty}</td>
                  <td className="ordPay">{props.cost}</td>
            </tr>
        );
      }
      function Card1(props) {
        return (
            <tr>
                <td className="billNo"><button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" value={props.billNum} onClick={(e)=>{setBill(e.target.value)}}>{props.billNum}</button></td>
                  <td className="billDate">{props.billDate}</td>
                  
                  <td className="businessID">{props.businessId}</td>
                  <td className="phoneNum">{props.phoneNum}</td>
            </tr>
        );
      }
      function createCard1(data){
        
          return (
              <Card1
                key={data.billNo}
                billDate={data.billDate}
                billNum={data.billno}
                businessId={data.businessID}
                phoneNum={data.phoneNum}
                />
            );
      }
      function createCard(data){
        
        return (
            <Card
              key={data.productno}
              prodNo={data.productno}
              prodName={data.productname}
              mrp={data.mrp}
              qty={data.qty}
              cost={data.cost}
              />
          );
    }
    function getBill(){
        const root = ReactDOM.createRoot(document.getElementById('Bill'));
        const billNum = document.getElementById('billNum').value
        const val = {billNum1:billNum};
            // Simple GET request using fetch
            axios.post('http://localhost:8000/business/getBill', val)
            .then(function(response){
                var data= response.data
                console.log(data)
                if(data.length==0){
                    root.render(<p>No bills found </p>)
                }
                else{
                    var sum=0;
                for (let i=0; i<data.length;i++){
                  sum=sum+data[i].cost;
                }
                root.render(
                    <div className="billList">
                        <h1>{billNum}</h1>
                        <table >
                <tr>
                <th className="prodNum">ProductNo</th>
                <th className="prodName">Product Name</th>
                <th className="qty">Mrp</th>
                <th className="prodCost">Quantity</th>
                <th className="prodMrp">Cost</th>
            </tr>
           {data.map(createCard)}
            <tr>
                  <td className="prodNum"></td>
                  <td className="prodName"></td>
                  <td className="custNum"></td>
                  <td className="ordCost"></td>
                  <td className="ordPay">----------</td>              
            </tr>
            <tr>
                  <td className="prodNum"></td>
                  <td className="prodName"></td>
                  <td className="custNum">Total : </td>
                  <td className="ordCost"></td>
                  <td className="ordPay">{sum}</td>              
            </tr>
            </table>
                    </div>)
                }
                
            })
            /*fetch('http://localhost:8000/getBill', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(val),
            }).then(response=>response.json())
            .then(data => {
                console.log(data);
                var sum=0;
                for (let i=0; i<data.length;i++){
                  sum=sum+data[i].cost;
                }
                root.render(
                    <div className="billList">
                        <h1>{billNum}</h1>
                        <table >
                <tr>
                <th className="prodNum">ProductNo</th>
                <th className="prodName">Product Name</th>
                <th className="qty">Mrp</th>
                <th className="prodCost">Quantity</th>
                <th className="prodMrp">Cost</th>
            </tr>
            {data.map(createCard)}
            <tr>
                  <td className="prodNum"></td>
                  <td className="prodName"></td>
                  <td className="custNum"></td>
                  <td className="ordCost"></td>
                  <td className="ordPay">----------</td>              
            </tr>
            <tr>
                  <td className="prodNum"></td>
                  <td className="prodName"></td>
                  <td className="custNum">Total : </td>
                  <td className="ordCost"></td>
                  <td className="ordPay">{sum}</td>              
            </tr>
            </table>
                    </div>)
            });*/
        
    }
    function getBillUsingNum(){
        const root = ReactDOM.createRoot(document.getElementById('Bill'));
        const billNum = document.getElementById('custNum').value
        const val={custNum1:billNum};
            axios.post('http://localhost:8000/business/getBillUsingNum', val)
                .then(function(response){
                    var data=response.data
                    console.log(data);
              
                root.render(
                    <div className="billList">
                       
                        <table >
                <tr>
                <th className="billNum">Bill Number</th>
                <th className="billDate">Date</th>
                <th className="businessId">BusinessId</th>
                <th className="custNum">Customer</th>
            </tr>
            {data.map(createCard1)}
            
            </table>
                    </div>)

                })
            /*fetch('http://localhost:8000/getBillUsingNum', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(val),
            }).then(response=>response.json())
            .then(data => {
                console.log(data);
              
                root.render(
                    <div className="billList">
                       
                        <table >
                <tr>
                <th className="billNum">Bill Number</th>
                <th className="billDate">Date</th>
                <th className="businessId">BusinessId</th>
                <th className="custNum">Customer</th>
            </tr>
            {data.map(createCard1)}
            
            </table>
                    </div>)
            });*/
        
    }
    function ViewUsingBillNum(){
        const root = ReactDOM.createRoot(document.getElementById('vbContent'));
        root.render(
            <div className="billnum">
                <form>
                    <input type='text' id='billNum' placeholder='Enter Your Bill Number'></input>
                    <button type="button" class="btn btn-primary"  onClick={getBill}>
                    Get Bill
                    </button>
                </form>
            </div>
        )
    }
    function ViewUsingCustNum(){
        const root = ReactDOM.createRoot(document.getElementById('vbContent'));
        root.render(
            <div className="billnum">
                <form>
                    <input type='text' id='custNum' placeholder='Enter Your Customer Number'></input>
                    <button type="button" class="btn btn-primary"  onClick={getBillUsingNum}>
                    Get Bill
                    </button>
                </form>
            </div>
        )
    }
    return(
        <div className="viewBills">
            <div className="Header">
                <h2>View Bills</h2>
            </div>
            <div className="vbBody">
                <div className="vbOptions">
                    <button className="btn btn-primary vbbut" onClick={ViewUsingBillNum} >Bill No</button>
                    <button className="btn btn-primary" onClick={ViewUsingCustNum}>Customer Number</button>
                </div>
                <div className="vbContent" id="vbContent">

                </div>
                <div class="Bill" id="Bill">
                

                </div>
                <div className="popup">
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">{billNo}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </div>
            </div>
        </div>
    )
}

export default Viewbills;
/*const root = ReactDOM.createRoot(document.getElementById('vbContent'));
        root.render(
            <div className="billnum">
                <form>
                    <input type='text' id='billNum' placeholder='Enter Your Bill Number'></input>
                    <button type="button" class="btn btn-primary"  onClick={getBill}>
                    Get Bill
                    </button>
                </form>
            </div> */