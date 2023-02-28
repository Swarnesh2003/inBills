import React from "react";
import { useState } from "react";

import axios from 'axios';
axios.defaults.withCredentials = true;
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';



function Custrequest()
{
    function handleClick(){
    
        
        const pass1=document.getElementById('Category').value
        const pass2=document.getElementById('reqdetail').value
        const pass3=document.getElementById('date').value
        
        
        console.log(pass3)
        

        const val={Category:pass1, reqdetail:pass2 ,date:pass3};
        console.log(val)
          /*fetch('http://localhost:8000/hello', {
                        method: 'POST',
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(val),
                    }).then(response=>response.json())
                    .then(data => {
                        console.log(data)
                        window.alert('Service Requested..')
                        document.getElementById('Category').value=""
                        document.getElementById('reqdetail').value=""
                            document.getElementById('date').value=""
                    });*/
                    axios.post('http://localhost:8000/user/hello', val)
                        .then(function(response){
                            var data=response.data
                            console.log(data)
                            swal({
                                title: "Service Requested!",
                                text:"You will get responses from various service providers under Service Responses in Dashboard..",
                                icon: "success",
                              });
                        document.getElementById('Category').value=""
                        document.getElementById('reqdetail').value=""
                            document.getElementById('date').value=""

                        })

                }
return(
      
    <div className="maingenerate">
     <div className="generatehead">
         <h2>Request Service</h2>
     </div>
    
     <div className="generatebody2">
        
         <input type="text" className="generatehead3" id="Category" placeholder="Category"  name="Category"></input>
         <input type="date" className="generatehead3"  id="date" placeholder="date"  name="till date"></input>
     </div>
     <div className="generatebody3">
     <textarea className="crgeneratehead3"  id="reqdetail" placeholder="reqdetail"  name="reqdetail"></textarea>
     

     </div>
     <div className="generatebody4">
     
         <button type="button" className="btn btn-primary add "  onClick={handleClick} >Request</button>
     </div>
    

 
 </div>
    
    
 )
}

export default Custrequest;