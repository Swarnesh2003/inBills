import React from "react";
import { useNavigate } from "react-router-dom";
import Features from "./Features";
function Home() {
    return(
        <div className="home">
        <nav className="navbar navbar-expand-lg navbg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"><img src=".\images\inbills1.png" alt="Bootstrap" width="130" height="40"/></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse navlink" id="navbarTogglerDemo02">
          <ul className="navbar-nav mb-4 mb-lg-0 ms-auto">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link"  href="/about"> Contact</a>
            </li>
            <li className="nav-item">
            <div class="btn-group">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Login / SignIn
  </button>
  <div class="dropdown-menu dropdown-menu-right">
    <a href="/CustLogin"><button class="dropdown-item" type="button">for public</button></a>
    <a href="/login"><button class="dropdown-item" type="button">for business</button></a>
    <a href="/serviceLogin"><button class="dropdown-item" type="button">for contractors</button></a>
  </div>
</div>

            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className='content'> 
    <div className="getStarted">
    <div className='starting'>
      <h2>Manage Your Bills all in One Place</h2>
      <p>With inBills, you can manage your Bills, request for various services, track your requests etc - all in one place.</p>

    </div>
    
    <a href="/CustSignUp"><button type="button" className="btn btn-primary btngs">Get Started</button></a>
    </div>
    <div className='feature'>
    {/*<Features />*/}
      <img src="./images/homeback.png" height="450"></img>
    </div>
    </div>


    <div className='content'> 
      <div className="getStarted1">
          <div className='starting1'>
              <img src="./images/homeback1.png" height="350"></img>
          </div>
      </div>
      <div className='feature1'>
          <h2>Choose the best service of your choice..</h2>
          <p>With inBills, you can choose the best service of your choice out of a variety of options</p>
      </div>
    </div>
    
    <div className="footer">
      <p>A product by Incentive Technology</p>

      <p>Grow your business with Incentive Technology</p>
 
      <p>mailId:  incentivetechnology@gmail.com</p>
    <p>©Incentive Technology</p>
    </div>
    </div>
   
);
}

export default Home;