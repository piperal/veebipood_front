import { useState } from "react"
function Cart() {
  const orderRows = JSON.parse((localStorage.getItem("cart")) || "[]")

  return (
    <>
      <div>
        {orderRows.map(orderRow =>
          <div key={orderRow.product.id}>
            <div>{orderRow.product.name}</div>
            <div>{orderRow.product.price}</div>
            <div>{orderRow.quantity}</div>
          </div>
        )}

      </div>
    </>
  )


}

export default Cart