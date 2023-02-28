import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ReactDOM from 'react-dom/client';
import { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
axios.defaults.withCredentials = true;
//import axios from 'axios';
//
function Add()
{
 const [add,addproduct] = useState({
  ProductName: "",
  Mrp: "",
  Qty: "",
  cost: "",
 });

 //const navigate = useNavigate()
function handleClick(){
  //const billNum = document.getElementByName('generatehead3')[0].value
              const user1=document.getElementById('productName')
              const pass1=document.getElementById('Mrp')
              const pass2=document.getElementById('Qty')
              const pass3=document.getElementById('cost')
              if (user1.value !='' && pass1.value!='' && pass2.value !='' && pass3.value!='' ){
                

              const val={productName:user1.value, Qty:pass2.value, Mrp:pass1.value,cost:pass3.value};
              console.log(val)
                /*fetch('http://localhost:8000/addProducts', {
                              method: 'POST',
                              //credentials: 'include',
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(val),
                          }).then(response=>response.json())
                          .then(data => {
                              console.log(data)
                              window.alert(data.message)
                              user1.value=''
                              pass1.value=''
                              pass2.value=''
                              pass3.value=''
                              getProducts()
                          });*/
                          axios.post('http://localhost:8000/business/addProducts',val).
                          then(function(response){
                            console.log(response);
                            swal({
                              text: "Hurray! New Item Added!",
                              icon: "success",
                            });

                            user1.value=''
                              pass1.value=''
                              pass2.value=''
                              pass3.value=''
                              getProducts()
                          })

                          
              }
              else{
                swal("Feilds empty", "Please input some value", "error");
                
              }
              
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
        mrp={data.stock}
        qty={data.cost}
        cost={data.mrp}
        />
    );
}
function getProducts(){
  axios.defaults.withCredentials = true
  console.log('gp called')
 const root = ReactDOM.createRoot(document.getElementById('billList'));
            // Simple GET request using fetch
           /* fetch('http://localhost:8000/getProducts').then(response=>response.json())
            .then(data => {
                console.log(data);
                root.render(
                    <div className="billList">
                        
                        <table >
                <tr>
                <th className="prodNum">ProductNo</th>
                <th className="prodName">Product Name</th>
                <th className="qty">Stock</th>
                <th className="prodCost">Cost</th>
                <th className="prodMrp">Mrp</th>
            </tr>
            {data.map(createCard)}
            
            </table>
                    </div>)
            });*/
            axios.get('http://localhost:8000/business/getProducts')
              .then(function(response){
                var data=response.data
                console.log(data);
                root.render(
                    <div className="billList">
                        
                        <table >
                <tr>
                <th className="prodNum">ProductNo</th>
                <th className="prodName">Product Name</th>
                <th className="qty">Stock</th>
                <th className="prodCost">Cost</th>
                <th className="prodMrp">Mrp</th>
            </tr>
            {data.map(createCard)}
            
            </table>
                    </div>)

              })
  
          }
    /*const handleChange = (e) =>{
      addproduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    console.log(add)*/
    return(
      
       <div className="addProducts">
        <div className="adgeneratehead">
            <h2>Add product</h2>
        </div>
        <div className="adgeneratebody2 row">
        <div className="adgeneratehead3 col-lg-3 col-md-4 col-sm-6">
            <input type="text" className="generatehead3" id="productName" placeholder="ProductName"  name="ProductName"></input>
        </div>
        <div className="adgeneratehead3 col-lg-3 col-md-4 col-sm-6">
            <input type="number" min="0" className="generatehead3"  id="Mrp" placeholder="Cost"  name="Mrp"></input>
            </div>
        <div className="adgeneratehead3 col-lg-3 col-md-4 col-sm-6">
            <input type="number" min="0" className="generatehead3" id="Qty" placeholder="Qty"  name="Qty"></input>
            </div>
        <div className="adgeneratehead3 col-lg-3 col-md-4 col-sm-6">
            <input type="number" min="0" className="generatehead3" id="cost" placeholder="Mrp"   name="cost"></input>
            </div>
        <div className="adgeneratehead3 apbut col-lg-3 col-md-4 col-sm-6">
            <button type="button" className="btn btn-primary add "  onClick={handleClick} >ADD</button>
            </div>
        <div className="adgeneratehead3 apbut col-lg-3 col-md-4 col-sm-6">
            <button type="button" className="btn btn-primary add " onClick={getProducts}>View / Update Products</button>
            </div>
        </div>
        
        <div className="adbillList" id="billList">
           
        </div>
    </div>
       
       
    )
    
   
}


export default Add;