import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom"
import Products from "./products/Products"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Cart from "./cart/Cart"
import NotFound from "./utils/not_found/NotFound"
import DetailProduct from './products/detailProducts/DetailProduct'

import { GlobalState } from "../GlobalState"
import Categories from './Categories/Categories'
import CreateProduct from './createProduct/CreateProduct'

function Pages() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged

  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
      <Route path="/register" element={isLogged ? <NotFound /> : <Register />} />
      <Route path="/category" element={isLogged ? <Categories /> : <NotFound />} />
      <Route path="/create_product" element={isLogged ? <CreateProduct /> : <NotFound />} />
      <Route path="/edit_product/:id" element={isLogged ? <CreateProduct /> : <NotFound />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/detail/:id" element={<DetailProduct />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Pages
