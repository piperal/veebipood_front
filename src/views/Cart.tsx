import { useState } from "react"
import type { OrderRow } from "../models/OrderRow"

function Cart() {
  const [orderRows, setOrderRows] = useState<OrderRow[]>(JSON.parse((localStorage.getItem("cart")) || "[]"))

  const deleteFromCart = (index: number) => {
    orderRows.splice(index, 1);
    setOrderRows([...orderRows])

    localStorage.setItem("cart", JSON.stringify(orderRows));
  }

  const increase = (index: number) => {
    const newRows = [...orderRows]
    newRows[index].quantity--
    setOrderRows([...newRows])
    if (orderRows[index].quantity == 0) {
      deleteFromCart(index)
    }
    setOrderRows([...orderRows])

    localStorage.setItem("cart", JSON.stringify(orderRows));
  }

  const decrease = (index: number) => {
    const newRows = [...orderRows]
    newRows[index].quantity++
    setOrderRows([...newRows])
    localStorage.setItem("cart", JSON.stringify(orderRows));
  }

  const emptyCart = () => {
    setOrderRows([])
    localStorage.setItem("cart", "[]");
  }

  const calculateTotal = () => {
    let total: number = 0
    for (const row in orderRows) {
      total += (orderRows[row].product.price) * orderRows[row].quantity
    }
    return total
  }

  const confirmOrder = ()=>{
    const payload = orderRows.map(orderRow => ({productId:orderRow.product.id, quantity:orderRow.quantity}))

    fetch(import.meta.env.VITE_BACK_URL + '/order/add?personId=1', {
      method:"POST",
      body: JSON.stringify(payload),
      headers:{
        "Content-Type":"application/json"
      }
    }).then(res =>res.json()).then(json => alert(json.id))
  }

  return (
    <>
      <div>
        {/*Pretty much an if statement (&&)*/orderRows.length > 0 && <button onClick={() => { emptyCart() }}>Clear cart</button>}
        {orderRows.length == 0 && <div>Ostukorv on tühi</div>}
        {orderRows.map((orderRow, index) =>
          <div key={orderRow.product.id}>
            <div>{orderRow.product.name}</div>
            <div>{orderRow.product.price}</div>
            <button onClick={() => { increase(index) }}>-</button>
            <div>{orderRow.quantity}</div>
            <button onClick={() => { decrease(index) }}>+</button><br></br>
            <button onClick={() => { deleteFromCart(index) }}>Delete Product</button>
          </div>
        )}

        {orderRows.length > 0 &&
          <><div>Total: {calculateTotal()}$</div>
            <br></br>
            <select>
              <option>Pakkiautomaat 1</option>
              <option>Pakkiautomaat 2</option>
            </select><br></br>
            <button onClick={()=>{confirmOrder()}}>Confirm order</button>
          </>}

      </div>
    </>
  )


}

export default Cart