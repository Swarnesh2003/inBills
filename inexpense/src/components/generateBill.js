import React from "react";
import ReactDOM from 'react-dom/client';
import {useEffect, useState } from "react";
import {Link, Outlet} from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true;
function Generatebill()
{
    
  var billnum=0
  var products=[]
  function input1(){
    const root =ReactDOM.createRoot(document.getElementById('generatebody'));
    console.log("Entered1");
    const custnum=document.getElementById('CustNo').value
    console.log(custnum);
    const value={CustNo:custnum};
    console.log("value")
    console.log(value);
   /* fetch('http://localhost:8000/getProducts').then(response=>response.json())
    .then(data1 => {
      products=data1;
      console.log(products)
      /*fetch('http://localhost:8000/newbill',{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),

    }).then(response=>response.json())
    .then(data => {
        console.log(data);
        billnum=data
        console.log("data")
        root.render(
          <div className="maindiv">
          <h4 className="generatehead1">BillNo:{data}</h4>
          <div className="generatebody2">
          <input type="number" className="generatehead3"  placeholder="Product number" id="productNo" name="prodNo" onChange={(e)=>{setValues(e.target.value)}}>
  </input>
              <input type="text" className="generatehead3" id="productName"  placeholder="ProductName"></input>
              
              <input type="number" className="generatehead3"  id="Mrp" placeholder="Mrp"></input>
              <input type="number" className="generatehead3" id="Qty" placeholder="Qty"></input>
              <button type="button" className="btn btn-primary add" onClick={input}>ADD</button>
          </div>
          </div>
        );
        
    })*/
    axios.get('http://localhost:8000/business/getProducts').then(function(response){
      var data1=response.data
      products=data1;
      console.log(products)
    axios.post('http://localhost:8000/business/newbill',value)
            .then(function(response){
                var data=response.data;
                console.log(data);
                billnum=data
                console.log("data")
                root.render(
                  <div className="maindiv">
                  <h4 className="generatehead1">BillNo:{data}</h4>
                  <div className="generatebody2">
                  <input type="number" className="generatehead3"  placeholder="Product number" id="productNo" name="prodNo" onChange={(e)=>{setValues(e.target.value)}}>
          </input>
                      <input type="text" className="generatehead3" id="productName"  placeholder="ProductName"></input>
                      
                      <input type="number" className="generatehead3"  id="Mrp" placeholder="Mrp"></input>
                      <input type="number" className="generatehead3" id="Qty" placeholder="Qty"></input>
                      <button type="button" className="btn btn-primary add" onClick={input}>ADD</button>
                  </div>
                  </div>
                );

    }
    )
    })

            
   
    
    
    
    
  }
 function setValues(e){
  console.log('Setvalues')
  document.getElementById('productName').value=products[e-1].productname;
   
    document.getElementById('Mrp').value=products[e-1].mrp;
 }
  function input()
  {
    const root = ReactDOM.createRoot(document.getElementById('tableprint'));
    console.log("Entered");
    
    const proName=document.getElementById('productName');
    const proNum=document.getElementById('productNo');
    const proMrp=document.getElementById('Mrp');
    const proQty=document.getElementById('Qty');
    const proCost=proMrp.value*proQty.value;
    


    const value={ billNum:billnum, productName:proName.value, productNum:proNum.value, productMrp: proMrp.value, productQty: proQty.value, productCost: proCost};
    axios.post('http://localhost:8000/business/gproducts', value).then(function(response){
      var data=response.data
      console.log(data);
        const root = ReactDOM.createRoot(document.getElementById('tableprint'));
        proName.value=""
        proNum.value=""
        proMrp.value=""
        proQty.value=""
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
        <th className="mrp">Mrp</th>
        <th className="prodqty">Quantity</th>
        <th className="prodCost">Cost</th>
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
    <td className="billNo"><button className="btn btn-primary pay" data-bs-toggle="modal" data-bs-target="#exampleModal"  >Make Payment</button></td>
            </div>)

        /*root.render(
          <table className="table">
            <thead>
                <tr>
                    <th>Product NO</th>
                    <th>Product Name</th>
                    <th>Mrp</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
            {
                data.map(createCard)
            }
            </tbody>
        </table>
        );*/
    })

    
    /*fetch('http://localhost:8000/gproducts',{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),

    }).then(response=>response.json())
    .then(data => {
        console.log(data);
        const root = ReactDOM.createRoot(document.getElementById('tableprint'));
        proName.value=""
        proNum.value=""
        proMrp.value=""
        proQty.value=""
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
        <th className="mrp">Mrp</th>
        <th className="prodqty">Quantity</th>
        <th className="prodCost">Cost</th>
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
    <td className="billNo"><button className="btn btn-primary pay" data-bs-toggle="modal" data-bs-target="#exampleModal"  >Make Payment</button></td>
            </div>)

        /*root.render(
          <table className="table">
            <thead>
                <tr>
                    <th>Product NO</th>
                    <th>Product Name</th>
                    <th>Mrp</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
            {
                data.map(createCard)
            }
            </tbody>
        </table>
        );
        
    })*/
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

    
    return(
       <div className="maingenerate">
        <div className="generatehead">
            <h1>Generate bill</h1>
            <input type="number" className="generatehead2" id="CustNo" placeholder="Customer No" ></input>
            <button type="button" className="btn btn-primary add" onClick={input1}>Newbill</button>
        </div>
        <div className="generatebody" id="generatebody">
        </div>
       
        <div className="tableprint" id="tableprint">

        </div>
        <div className="popup">
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Payment</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body payment" id="modal-body">
        <button className="btn btn-primary paym">Card</button>
        <button className="btn btn-primary paym">Cash</button>
        <button className="btn btn-primary paym">UPI</button>
        <button className="btn btn-primary paym">Wallet</button>
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

      
      
     
  
export default Generatebill;