import React, { useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Product from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import MyOrders from './pages/MyOrders.jsx';
import Navbar from './components/Navbar.jsx';
import { AppContext } from './context/AppContext.jsx';
import Auth from './models/Auth.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import ProductCategory from './pages/ProductCategory.jsx';
import Footer from './components/Footer.jsx';
import AddAddress from './pages/AddAddress.jsx';
import SellerLogin from "./components/seller/SellerLogin";

import Orders from "./pages/seller/Orders.jsx";
import SellerLayout from './pages/seller/SellerLayout.jsx';
import AddProduct from './pages/seller/AddProduct.jsx';
import ProductList from './pages/seller/ProductList.jsx';



import { Toaster } from 'react-hot-toast';
import Loading from './components/Loading.jsx';
import Chatbot from './pages/Chatbot.jsx';



const App = () => {
  const { isSeller, showUserLogin } = useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes("seller");
  return (
    <div className='text-default min-h-screen'>
      {isSellerPath?null:<Navbar />}
      {showUserLogin?<Auth/>:null}
      <Toaster/>
      <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/product/:category/:id" element={<ProductDetails />}/>
          <Route path="/products/:category" element={<ProductCategory />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/my-orders" element={<MyOrders />}/>
           <Route path="/loader" element={<Loading />}/>
          <Route path="/add-address" element={<AddAddress />} />
         <Route path="/chatbot" element={<Chatbot />} />
            <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route
              path="product-list"
              element={isSeller ? <ProductList /> : null}
            />
            <Route path="orders" element={isSeller ? <Orders /> : null} />
          </Route>
          </Routes>
      </div>
      {isSellerPath?null:<Footer />}
    </div>
  )
}

export default App
