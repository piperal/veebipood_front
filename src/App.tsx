import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import HomePage from './views/HomePage'
import Cart from './views/Cart'
import AddProduct from './views/admin/AddProduct'
import EditProduct from './views/admin/EditProduct'
import ManageCategories from './views/admin/ManageCategories'
import ManageProducts from './views/admin/ManageProducts'
import Signup from './views/Signup'
import Login from './views/Login'
import ProductDetails from './views/ProductDetails'
import NotFound from './views/NotFound'
import Profile from './views/Profile'
function App() {

  return (
    <>
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/cart">
        <button>Cart</button>
      </Link>

      <Link to="/add-product">
        <button>Add Product</button>
      </Link>
      <Link to="/manage-products">
        <button>Manage Products</button>
      </Link>
      <Link to="/manage-catgories">
        <button>Manage Categories</button>
      </Link>
      <Link to="/profile">
        <button>Profile</button>
      </Link>
      <Link to="/signup">
        <button>Sign up</button>
      </Link>
      <Link to="/login">
        <button>Log in</button>
      </Link>
      <Routes>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/add-product" element={<AddProduct />}></Route>
        <Route path="/edit-product" element={<EditProduct />}></Route>
        <Route path="/manage-products" element={<ManageProducts />}></Route>
        <Route path="/manage-catgories" element={<ManageCategories />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/product" element={<ProductDetails />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
