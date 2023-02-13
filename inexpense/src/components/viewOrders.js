import React, { useState } from 'react';
import {Link, Outlet} from "react-router-dom";
//import Card from "./orderCard";
import orders from "./orders.js";



function Vieworders()
{
  const [name, setName]=useState('admin')
  function setBill(orderNum){
      if(orderNum==1000){
        setName('Swarnesh')
      }
      else if(orderNum==1001){
        setName('Thirusha')
      }
      else if(orderNum==1002)
      {
        setName('Athmika')
      }
    }
  function Card(props) {
    return (
        <tr>
              <td className="ordNum"><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" value={props.ordNo} onClick={(e)=>{setBill(e.target.value)}}>
              {props.ordNo}
  </button></td>
             
              <td className="custName">{props.name}</td>
              <td className="custNum">{props.number}</td>
              <td className="ordCost">{props.cost}</td>
              <td className="ordPay">{props.payment}</td>
              <td className="ordDel">{props.delivery}</td>
        </tr>
    );
  }
  function createCard(order){
    
      return (
          <Card
            key={order.ordNo}
            ordNo={order.ordNo}
            name={order.customerName}
            number={order.customerNumber}
            cost={order.cost}
            payment={order.paymentStatus}
            delivery={order.delivery}
          />
        );
  }
  
    
    return(
        <div className="viewOrders">
            <div className="voh1">
                <h2>Orders</h2>
            </div>
            <table >
                <tr>
                <th className="ordNum">OrdNo</th>
                <th className="custName">Customer</th>
                <th className="custNum">Mobile</th>
                <th className="ordCost">Cost</th>
                <th className="ordPay">Payment Status</th>
                <th className="ordDel">Delivery Ststus</th>
            </tr>
            {orders.map(createCard)}
            
            </table>
            <div className="popup">
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          {name}
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

        )
}

export default Vieworders;