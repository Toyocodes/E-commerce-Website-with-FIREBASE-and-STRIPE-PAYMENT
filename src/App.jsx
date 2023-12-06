import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
// import ProductDetails from './pages/ProductDetails'
// import Sidebar from './Components/Sidebar'
// import Header from './Components/Header'
// import Footer from './Components/Footer'
import Navbar from './Components/Navbar/Navbar'
// import Banner from './Components/Banner/Banner'
import Login from './pages/Login'
import Signup from './pages/signup'
import NotFound from './Components/NotFound'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProducts from './pages/AddProducts'
import ProductDetails from './pages/ProductDetails'
// import { useNavigate } from 'react-router-dom'



const customToastStyle = {
  background: 'white', // Replace with your desired background color
  color: 'green', // Replace with your desired text color
};

function App() {

  return (
    <div className='overflow-hidden'>
      <Router>
        <Navbar/>
        <ToastContainer position="top-right" className="mt-20 w-[230px] text-[13px]" toastStyle={customToastStyle}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/notfound' element={<NotFound/>}/>
          <Route path="/add-products" element={<AddProducts/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
        </Routes>
        {/* <Sidebar/>
        <Footer/> */}
      </Router>
    </div>
  )
}

export default App
