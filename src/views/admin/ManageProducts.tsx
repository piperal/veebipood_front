
//rfce for a quick setup (similar to '!' in HTML)

import { useEffect, useState } from "react"
import type { Product } from "../../models/Product"


function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [newProd, setNewProd] = useState<Product>({ name: "", description: "", price: 0, active: false, stock: 0 })
  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + "/products")
      .then(res => res.json())
      .then(json => setProducts(json))
  }, [])

  const addProd = () => {
    fetch(import.meta.env.VITE_BACK_URL + "/products/add", {
      method: "POST",
      body: JSON.stringify(newProd),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => setProducts(json))
  }

  const delProduct = (productId: number) => {
    fetch(import.meta.env.VITE_BACK_URL + `/products/${productId}`, {
      method: "DELETE"
    }).then(res => res.json()).then(json => setProducts(json))
  }

  return (
    <div>
      <label>Name</label>
      <input type="text" onChange={(e) => { setNewProd({ ...newProd, name: e.target.value }) }} /><br />
      <label>Description</label>
      <input type="text" onChange={(e) => { setNewProd({ ...newProd, description: e.target.value }) }} /><br />
      <label>Price</label>
      <input type="text" onChange={(e) => { setNewProd({ ...newProd, price: Number(e.target.value) }) }} /><br />
      <label>Active</label>
      <input type="text" onChange={(e) => { setNewProd({ ...newProd, active: Boolean(e.target.checked) }) }} /><br />
      <label>Stock</label>
      <input type="text" onChange={(e) => { setNewProd({ ...newProd, stock: Number(e.target.value) }) }} /><br />
      <button onClick={() => { addProd() }}></button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Active</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product =>
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.active}</td>
              <td>{product.stock}</td>
              <td>{product.category?.name}</td>
              <td><button>Edit</button></td>
              <td><button onClick={() => { delProduct(Number(product.id)) }}>Delete</button></td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default ManageProducts