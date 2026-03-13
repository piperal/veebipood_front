
//rfce for a quick setup (similar to '!' in HTML)

import { useEffect, useState } from "react"


function HomePage() {
  const [products, setProducts] = useState([])
  useEffect(()=>{
      fetch("http://localhost:5000/products")
    .then(res => res.json())
    .then(json => setProducts(json))
  },[])

  return (
    <div>
      {products.map(product => <div>{product.name} - {product.price}$</div>)}
    </div>
  )
}

export default HomePage