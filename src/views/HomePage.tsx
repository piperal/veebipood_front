
//rfce for a quick setup (similar to '!' in HTML)

import { useEffect, useState } from "react"
import type { Product } from "../models/Product"
import type { Category } from "../models/Category";


function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(2);
  const [sort, setSort] = useState("id,asc")
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategoyId, setActiveCategoryId] = useState(0)


  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + "/category")
      .then(res => res.json())
      .then(json => setCategories(json))
  }, []);


  ///http://localhost:5000/products?page=0&size=1&sort=id,asc
  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + `/products?page=${page}&size=${size}&sort=${sort}&activeCateogryId=${activeCategoyId}`)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setProducts(json.content);
        setTotalElements(json.totalElements);
        setTotalPages(json.totalPages)
      })
  }, [page, size, sort, activeCategoyId])

  const sizeHandler = (newSize: number) => {
    setSize(newSize);
    setPage(0)
  }

  const sortHandler = (newSort: string) => {
    setSort(newSort);
    setPage(0)
  }

  const activeCategoryHandler = (categoryId: number) => {
    setActiveCategoryId(categoryId);
    setPage(0)
  }

  /*
  
  To add to localstorage
  1. Take old localstorage state, if doesent exist create array    JSON.parse(localStorage.getItem() || "[]")
  2. Remove quotes  JSON.parse() 
  3. Add item,      .push()
  4. Add quaotes back JSON.stringidy() 
  5. Put back into localstorage localstorage.setItem()

  */

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || "[]");
    const foundProduct = cart.find(cartProduct => cartProduct.product.id === product.id)

    if (foundProduct) {
      foundProduct.quantity++
    }
    else {
      cart.push({ product: product, quantity: 1 })
    }

    localStorage.setItem("cart", JSON.stringify(cart));

  }

  return (<>

    <div>
      {page * size + 1}-{(page + 1) * size > totalElements ? totalElements : (page + 1) * size}
      kuvatud {totalElements}-st
    </div>

    <select defaultValue={1} onChange={(e) => { sizeHandler(Number(e.target.value)) }}>
      <option>2</option>
      <option>3</option>
      <option>4</option>
    </select>

    <button onClick={() => { sortHandler("id,asc") }}>Sort older</button>
    <button onClick={() => { sortHandler("id,desc") }}>Sort newer</button>
    <button onClick={() => { sortHandler("name,asc") }}>Sort alpha</button>
    <button onClick={() => { sortHandler("name,desc") }}>Sort reverse alpha</button>
    <br></br>

    <div>
      {categories.map(category =>
        <button style={activeCategoyId == category.id ? { color: "blue" } : undefined} onClick={() => activeCategoryHandler(Number(category.id))}>{category.name}</button>
      )}
    </div>

    <button onClick={() => { activeCategoryHandler(0) }}>Kõik</button>
    <div>

    </div>

    <div>
      {products.map(product => <div key={product.id}>{product.name} - {product.price}$
        <button onClick={() => { addToCart(product) }}>Add to cart</button>
      </div>)}
    </div>

    <button disabled={page === 0} onClick={() => { setPage(page - 1) }}>Previous</button>
    <span>{page}/ {totalPages}</span>
    <button disabled={page + 1 === totalPages} onClick={() => { setPage(page + 1) }}>Next</button>
  </>
  )
}

export default HomePage