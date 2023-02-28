import React from "react";
import ReactDOM from 'react-dom/client';
import {useEffect, useState } from "react";
import {Link, Outlet} from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true;
function Custviewbills(){
    const [billNo, setBill1]= useState(null)
    function setBill(e){
        setBill1(e)
        console.log(e)
        const root = ReactDOM.createRoot(document.getElementById('modal-body'));
        const val = {billNum1:e};
            // Simple GET request using fetch
            /*fetch('http://localhost:8000/getBill', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(val),
            }).then(response=>response.json())
            .then(data => {
              console.log(data);
              console.log(data[0].cost)
              var sum=0;
              for (let i=0; i<data.length;i++){
                sum=sum+data[i].cost;
              }
              console.log(sum)
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
          
          </div>
                  )
            });*/
            axios.post('http://localhost:8000/business/getBill', val)
              .then(function(response){
                var data=response.data
                console.log(data);
                console.log(data[0].cost)
                var sum=0;
                for (let i=0; i<data.length;i++){
                  sum=sum+data[i].cost;
                }
                console.log(sum)
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
            
            </div>
                    )
              })
        
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
    function Card1(props) {
        return (
            <tr>
                <td className="billNo"><button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" value={props.billNum} onClick={(e)=>{setBill(e.target.value)}}>{props.billNum}</button></td>
                  <td className="billDate">{props.billDate}</td>
                  <td className="userId">{props.userId}</td>
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
                userId={data.businessName}
                businessId={data.businessID}
                phoneNum={data.phoneNum}
                />
            );
      }
   /* fetch('http://localhost:8000/getBillforCust')
                .then(response => response.json())
                .then(data => {
                    const root = ReactDOM.createRoot(document.getElementById('billsvbc'));
                    console.log(data)
                    root.render(
                        <div className="billList">
                            <table >
                    <tr>
                    <th className="billNum">Bill Number</th>
                    <th className="billDate">Date</th>
                    <th className="businessName">Shop</th>
                    <th className="businessId">BusinessId</th>
                    <th className="custNum">Customer</th>
                </tr>
                {data.map(createCard1)}
                
                </table>
                        </div>)
                });*/
                axios.get('http://localhost:8000/user/getBillforCust')
                  .then(function(response){
                    var data=response.data
                    const root = ReactDOM.createRoot(document.getElementById('billsvbc'));
                    console.log(data)
                    root.render(
                        <div className="billList">
                            <table >
                    <tr>
                    <th className="billNum">Bill Number</th>
                    <th className="billDate">Date</th>
                    <th className="businessName">Shop</th>
                    <th className="businessId">BusinessId</th>
                    <th className="custNum">Customer</th>
                </tr>
                {data.map(createCard1)}
                
                </table>
                        </div>)

                  })

    return(
    <div className="viewBillsCust">
        <div className="headervbc">
            <h2>View Bills</h2>
        </div>
        <div className="billsvbc" id="billsvbc">

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
    </div>)
}

export default Custviewbills;