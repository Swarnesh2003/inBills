import React from "react";
import { useState } from "react";

function Features(){
    const [count, setcount]=useState(0);
    const feat=['Track your bills', 'Connect with Services', 'Choose the best service','Manage Your Bills']
    let time=setTimeout(() => {
      let l=feat.length
      if (count>=l-1){
        setcount(0);
      }
      else{
        setcount(count+1);
      }
    }, 1500);
    return <div><h2>{feat[count]}</h2></div>
}
export default Features;