import React from 'react';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login"
import Signup from "./components/Signup"
import Protected from "./components/Protected"
import Dashboard from "./components/Dashboard"
import Expensedet from './components/expenseDet';
import Viewbills from './components/viewBills.js';
import Generatebill from './components/generateBill.js';


import Vieworders from './components/viewOrders.js'
import Addproducts from './components/addProducts.js'


import Myaccount from './components/myAccount'


import Custlogin from './components/custLogin'
import Custprotected from './components/custProtected'
import Custsignup from './components/custSignUp'
import Custdashboard from './components/custDashboard'
import Custviewbills from './components/custViewBills'
import Makeorders from './components/makeOrders'
import Custresponses from './components/custServiceResponses'
import Custaccepted from './components/custServiceAccepted'
import Custrequest from './components/custServiceRequest'

import Servicelogin from './components/serviceLogin.js'
import Serviceprotected from './components/servProtected.js'
import Servicesignup from './components/serviceSignup.js'
import Servicedashboard from './components/serviceDashboard.js'
import Serviceacceptedrequest from './components/serviceAcceptedRequest.js'
import Serviceviewrequest from './components/serviceViewRequest.js'
import Serviceapprovedrequest from './components/serviceApprovedRequest.js'



function App(){
    
    return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/dashboard" element={<Protected ><Dashboard /></Protected>} >
          <Route path="/dashboard/viewBills" element={<Viewbills />} >
        </Route>
        <Route path="/dashboard/genBill" element={<Generatebill />} />
        <Route path="/dashboard/viewOrders" element={<Vieworders />} />
        <Route path="/dashboard/addProducts" element={<Addproducts />} />
       {/** <Route path="/dashboard/viewProducts" element={<Viewproducts />} />*/} 
        <Route path="/dashboard/expense" element={<Expensedet />} />
        <Route path="/dashboard/myAccount" element={<Myaccount />} />  
        
        </Route>
        

        <Route path="/CustLogin" element ={< Custlogin/>} />
        <Route path="/CustSignUp" element ={< Custsignup/>} />
        <Route path="/CustDashboard" element ={<Custprotected ><Custdashboard /></Custprotected>} >
            <Route path="/CustDashboard/viewBillsCust" element={<Custviewbills />} />
            <Route path="/CustDashboard/makeServiceRequest" element={<Custrequest />} />
            <Route path="/CustDashboard/respondedServicesCust" element={<Custresponses />} />
            <Route path="/CustDashboard/acceptedServicesCust" element={<Custaccepted />} />
            <Route path="/CustDashboard/MakeOrders" element={<Makeorders />} />
        </Route>

        <Route path="/serviceLogin" element ={< Servicelogin/>} />
        <Route path="/serviceSignUp" element ={< Servicesignup/>} />
        <Route path="/serviceDashboard" element ={<Serviceprotected >< Servicedashboard/></Serviceprotected>} >
            <Route path="/serviceDashboard/viewRequests" element={<Serviceviewrequest />} />
            <Route path="/serviceDashboard/acceptedRequests" element={<Serviceacceptedrequest />} />
            <Route path="/serviceDashboard/approvedRequests" element={<Serviceapprovedrequest />} />
        </Route>


      </Routes>
    </Router>
);
}
export default App;