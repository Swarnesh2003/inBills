import React from "react";
import {Link, Outlet} from "react-router-dom";
function Message()
{
    return(
    <div>
       <form action="http://localhost:8000/message" method="POST">
            <input type="text" name="message" id="msg" placeholder="Enter the message" ></input>
            <input type="text" name="number" id="num" placeholder="Enter the number"></input>
            <input type="submit" value="submit"></input>
       </form>
    </div>
    )
}

export default Message;