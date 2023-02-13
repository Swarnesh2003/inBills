import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {useEffect, useState } from "react";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
function Expensedet(){
  const [category, setCat]=useState("Choose Category")
  ChartJS.register(ArcElement, Tooltip, Legend);

 const data = {
    labels: ['Grocery', 'Rent', 'Dress', 'Food', 'Entertainment', 'Others'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 10, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  
    return(
      <div className="expDash">      
              <div className="dashnav">
                        <div className="totInc expnav">
                          <p>Total Income</p>
                          <h2>$120000</h2>
                        </div>
                        <div className="totExp expnav">
                          <p>Total Expense</p>
                          <h2>$100000</h2>
                        </div>
                        <div className="balInc expnav">
                          <p>Balance</p>
                          <h2>$20000</h2>
                        </div>
              </div>
      <div className="expenseDet">
          <div className="expenseContent">
                <h2>Expense</h2>
                <input type="month" className="expMonth exp" placeholder="Select Month"></input>
                < select className="expcategory exp" value={category} onChange={(e)=>{
                const selCat= e.target.value;
                setCat(selCat);
                }}
                >
                <option value="Category">Choose Category</option>
                <option value="Groceries">Groceries</option>
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Regular Pays">Regular Pays</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
                </select>
                <input type="text" className="expDesc exp" placeholder="Description"></input>
                <input type="number" className="expAmt exp" placeholder="Amount"></input>
                <button className="addExpense btn btn-primary exp">Add</button>
            </div>
            <div className="expenseChart" style={{width:265}}>
                <Doughnut data={data} />
                <p>Expenses</p>
            </div>
            <div className="expenseincChart" style={{width:265}}>
                <Doughnut data={data} />
                <p>Expense vs Income</p>
            </div>
            <div className="expenseincContent">
                <h2>Income</h2>
                <input type="month" className="IncMonth exp" placeholder="Select Month"></input>
                <select className="inccategory exp" value={category} onChange={(e)=>{
                  const selCat= e.target.value;
                  setCat(selCat);
                  }}
                >
                <option value="Category">Choose Category</option>
                <option value="Groceries">Groceries</option>
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Regular Pays">Regular Pays</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
                </select>
                <input type="text" className="incDesc exp" placeholder="Description"></input>
                <input type="number" className="incAmt exp" placeholder="Amount"></input>
                <button className="addExpense btn btn-primary exp">Add</button>
            </div>

              
      </div>
      </div>

    )
       
}

export default Expensedet;