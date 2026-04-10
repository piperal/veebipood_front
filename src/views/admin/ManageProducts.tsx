
//rfce for a quick setup (similar to '!' in HTML)

import { useEffect, useState } from "react"
import type { Product } from "../../models/Product"


function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    active: false,
    stock: 0,
    category: {
      id: 1,
      name: ""
    }
  });

  //http://localhost:5000/products?page=1&size=1&sort=id,asc
  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + `/products`)
      .then(res => res.json())
      .then(json => {
        setProducts(json.content);
      }
      )
  }, [])

  const addProd = () => {
    fetch(import.meta.env.VITE_BACK_URL + "/products/add", {
      method: "POST",
      body: JSON.stringify(newProduct),
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
      <input type="text" onChange={(e) => { setNewProduct({ ...newProduct, name: e.target.value }) }} /><br />
      <label>Description</label>
      <input type="text" onChange={(e) => { setNewProduct({ ...newProduct, description: e.target.value }) }} /><br />
      <label>Price</label>
      <input type="text" onChange={(e) => { setNewProduct({ ...newProduct, price: Number(e.target.value) }) }} /><br />
      <label>Active</label>
      <input type="text" onChange={(e) => { setNewProduct({ ...newProduct, active: e.target.checked }) }} /><br />
      <label>Stock</label>
      <input type="text" onChange={(e) => { setNewProduct({ ...newProduct, stock: Number(e.target.value) }) }} /><br />
      <label>Category</label> <br />
      <button onClick={() => { addProd() }}>Add</button>
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