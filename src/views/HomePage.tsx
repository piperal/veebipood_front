
//rfce for a quick setup (similar to '!' in HTML)

import { useEffect, useState } from "react"
import type { Product } from "../models/Product"


function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(()=>{
      fetch("http://localhost:5000/products")
    .then(res => res.json())
    .then(json => setProducts(json))
  },[])

  return (
    <div>
      {products.map(product => <div key={product.id}>{product.name} - {product.price}$</div>)}
    </div>
  )
}

export default HomePage