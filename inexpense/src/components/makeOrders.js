import React from "react";
import {Link, Outlet} from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true;
function Makeorders()
{
    function getShops(e){
        var val=e.target.value
        console.log(val)
        if(val!=''){
            const val1={key:val};
        var code=""
        const ele=document.getElementById('shopList')
        /*fetch('http://localhost:8000/getLogo', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(val1),
        }).then(response=>response.json())
        .then(data => {
            console.log(data);
            for(let i=0;i<data.length;i++){
                code=code+"<button type='button' className='businessLogo' data-bs-toggle='modal' data-bs-target='#exampleModal' value={"+data[i].businessId+"}><img src='"+data[i].logoSource+"' /></button>"
            }
            ele.innerHTML=code;
        });*/
        axios.post('http://localhost:8000/user/getLogo', val1)
          .then(function(response){
            var data=response.data
            console.log(data);
            for(let i=0;i<data.length;i++){
                code=code+"<button type='button' className='businessLogo' data-bs-toggle='modal' data-bs-target='#exampleModal' value={"+data[i].businessId+"}><img src='"+data[i].logoSource+"' /></button>"
            }
            ele.innerHTML=code;
          })
        
        }
        
    }
    return(
    <div className="makeOrders">
        <div className="header">
            <h2>Purchase</h2>
        </div>
        <div className="searchBar">
            <input type="text" placeholder="Search for Shops near you" onChange={getShops}></input>
            <button className="btn btn-primary">Search</button>
        </div>
        <div className="shopList" id="shopList">

        </div>
        <div className="popup">
            <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <h3>Saravana Stores</h3>
          
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

export default Makeorders;