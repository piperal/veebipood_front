import type { Category } from "../../models/Category"
import { useEffect, useState } from "react"

function ManageCategories() {

  const [categories, setCategories] = useState<Category[]>([])
  const[newCat, setNewCat] = useState<Category>({name:""})
  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + "/category")
      .then(res => res.json())
      .then(json => setCategories(json))
  }, [])


  const addCategory = () => {
    fetch(import.meta.env.VITE_BACK_URL + "/category/add", {
      method:"POST",
      body:JSON.stringify(newCat),
      headers: {
        "Content-Type":"application/json"
      }
    })
      .then(res => res.json())
      .then(json => setCategories(json))
  }

  const delcategory = (catId: number) => {
    fetch(import.meta.env.VITE_BACK_URL + `/category/${catId}`, {
      method: "DELETE"
    }).then(res=>res.json()).then(json=>setCategories(json))
  }

  return (
    <div>
      <label>Name: </label>
      <input type="text" onChange={(e)=>{setNewCat({name: e.target.value})}}/><br/>
      <button onClick={()=>{addCategory()}}></button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category =>
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td><button onClick={()=>{delcategory(Number(category.id))}}>Delete</button></td>
            </tr>)}
        </tbody>
      </table></div>
  )
}

export default ManageCategories