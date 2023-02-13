import React from "react";
function Card(props) {
  return (
      <tr>
            <td className="ordNum"><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            {props.ordNo}
</button></td>
           
            <td className="custName">{props.name}</td>
            <td className="custNum">{props.number}</td>
            <td className="ordCost">{props.cost}</td>
            <td className="ordPay">{props.payment}</td>
            <td className="ordDel">{props.delivery}</td>
      </tr>
  );
}
export default Card;