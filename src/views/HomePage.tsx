
//rfce for a quick setup (similar to '!' in HTML)

import { useEffect, useState } from "react"
import type { Product } from "../models/Product"


function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [totalElements, setTotalElements] = useState();
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(2);
  const [sort, setSort] = useState("id,asc")
  ///http://localhost:5000/products?page=0&size=1&sort=id,asc
  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + `/products?page=${page}&size=${size}&sort=${sort}`)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setProducts(json.content);
        setTotalElements(json.totalElements);
        setTotalPages(json.totalPages)
      })
  }, [page, size, sort])

  const sizeHandler = (newSize: number) => {
    setSize(newSize);
    setPage(0)
  }

  const sortHandler = (newSort: string) => {
    setSort(newSort);
    setPage(0)
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
      {products.map(product => <div key={product.id}>{product.name} - {product.price}$</div>)}
    </div>

    <button disabled={page === 0} onClick={() => { setPage(page - 1) }}>Previous</button>
    <span>{page}/ {totalPages}</span>
    <button disabled={page + 1 === totalPages} onClick={() => { setPage(page + 1) }}>Next</button>
  </>
  )
}

export default HomePage