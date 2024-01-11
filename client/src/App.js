import React from "react"
import { BrowserRouter,Route,Routes} from "react-router-dom"

import {PrivateRoutes,AdminRoutes,ClientRoutes} from './components/auth'
import Navbar from './components/navbar'
import Home from './components/home'
import Login from "./components/login"
import Signup from "./components/signup"
import Logout from "./components/logout"
import AddProduct from "./components/addProduct"
import Product from "./components/product"
import Cart from "./components/cart"
import Orders from "./components/orders"
import VerifyOrder from "./components/verifyOrder"
import Profile from "./components/profile"
import ManageOrder from "./components/manageOrder"
import NotFound from "./components/notFound"
 const  App =()=> {

  
    return(
      <>
      
     
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route index element={<Home />} />

      <Route element={<ClientRoutes />}>
        <Route path="signup" exact element={<Signup />} />
        <Route path="login" exact element={<Login />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="product/:idProduct" exact element={<Product />} />
        <Route path="verify-order/:idItem" exact element={<VerifyOrder />} />
        <Route path="orders" exact element={<Orders />} />
        <Route path="profile" exact element={<Profile />} />
        <Route path="cart" exact element={<Cart />} />
        <Route path="logout" exact element={<Logout />} />
      </Route>

      <Route element={<AdminRoutes />}>
        <Route path="admin/add" exact element={<AddProduct />} />
        <Route path="admin/orders" exact element={<ManageOrder />} />
			</Route>
      <Route path="*" exact element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
    )
  }



export default App
