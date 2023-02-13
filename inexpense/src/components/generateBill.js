import React from "react";
import ReactDOM from 'react-dom/client';
import {useEffect, useState } from "react";
import {Link, Outlet} from "react-router-dom";
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
    fetch('http://localhost:8000/getProducts').then(response=>response.json())
    .then(data1 => {
      products=data1;
      console.log(products)
      fetch('http://localhost:8000/newbill',{
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
          {/*<button type="button" class="btn btn-primary otp" data-toggle="modal" data-target="#exampleModalCenter">Generate OTP</button>*/}
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
        
    })
    });
    
    
    
    
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
    fetch('http://localhost:8000/gproducts',{
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
        
    
       </div>
       
       
    )
    
    
   
}

      
      
     
  
export default Generatebill;