import { useState } from "react"
import type { OrderRow } from "../models/OrderRow"
function Cart() {
  const [orderRows, setorderRows] = useState<OrderRow[]>(JSON.parse((localStorage.getItem("cart")) || "[]"))

  const deleteFromCart = (index: number) => {
    orderRows.splice(index, 1);
    setorderRows([...orderRows])
    
    localStorage.setItem("cart", JSON.stringify(orderRows));

  }

  return (
    <>
      <div>
        {orderRows.map((orderRow,index) =>
          <div key={orderRow.product.id}>
            <div>{orderRow.product.name}</div>
            <div>{orderRow.product.price}</div>
            <div>{orderRow.quantity}</div>
            <button onClick={() => { deleteFromCart(index) }}>Delete Product</button>
          </div>
        )}

      </div>
    </>
  )


}

export default Cart