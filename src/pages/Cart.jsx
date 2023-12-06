import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { auth, db } from "../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import CartItems from "../Components/CartItems";
import {Link, useNavigate} from "react-router-dom"
import { CartContext } from '../context/CartContext';
import { toast } from "react-toastify";
import { Modal } from "../Components/Modal";
import Footer from "../Components/footer/Footer";
//for form validation
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import StripeCheckout from 'react-stripe-checkout'

const Cart = () => {
  
  const { cartProducts, total, itemAmount } = useContext(CartContext);
  

  const [showStripeCheckout, setShowStripeCheckout] = useState(false);
  const [showProceedButton, setShowProceedButton] = useState(true);

  const handleCheckout = () => {
    setShowStripeCheckout(true);
    setShowProceedButton(false);
  };

  // const closeCheckoutModal = () => {
  //   setShowStripeCheckout(false);
  //   setShowProceedButton(true);
  // };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-10 px-[6%]">
        
          <div className="md:flex-auto mt-[120px]">
              <div className="flex mb-5">
                  <Link to="/">
                    <p className="text-red-500">
                      Home
                    </p>
                  </Link>{">"}
                  <Link to="/cart">
                    <p className="text-red-500">
                      Cart
                    </p>
                  </Link>
              </div>
              <div>
                <div
                    className="flex justify-between py-2 border-b 
                    border-gray-200 font-light text-gray-500 gap-x-10 md:gap-x-20"
                  >
                    <div className="flex justify-between items-center gap-x-20 md:gap-x-32 sm:gap-x-40">
                      <p>Product</p>
                      <p>Name</p>
                    </div>
                    <div className="hidden md:hidden lg:flex justify-between items-center gap-x-12">
                      <p>Quantity</p>
                      <p>Price</p>
                      <p>Total</p>
                      <p></p>
                    </div>
                </div>
                    {cartProducts.length > 0 ? (
                      cartProducts.map((item) => (
                        <CartItems
                          key={item.id}
                          item={item} // Assuming each item has a unique ID
                        />
                      ))
                    ) : (
                      <div className="flex justify-center items-center h-[100vh]">
                          <p>Your cart is empty</p>
                      </div>
                    )}

              </div>
         </div>
        
        <div className="md:flex-auto border-2 border-gray-300 p-1 justify-center items-center rounded px-8 py-4"> 
          <div className="flex flex-col items-center mt-3 ">

            <h2 className="text-xl font-bold border-b-2 border-red-600">Cart Summary</h2>
              <div className="mt-5 mb-8">
                  <div className="flex justify-between items-center gap-x-6">
                    <h2 className='text-[17px]'>Total No of items: </h2>
                    <p>{itemAmount}</p>
                  </div>
                  <div className="flex justify-between items-center gap-x-12">
                    <h2 className='text-[17px]'>Total Price: </h2>
                    <p>${total}</p>
                  </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-y-8 mb-4">
              <div className=""><Link to="/" className="bg-blue-500 text-white px-2 py-3 rounded">Continue Shopping</Link></div>
              {showProceedButton && ( // Render Proceed To Checkout button if showProceedButton is true
                <div className="" onClick={() => handleCheckout()}>
                  <p className="bg-red-600 text-white px-2 py-3 rounded cursor-pointer">
                    Proceed To Check Out
                  </p>
                </div>
                )}
              </div>

              {/* Modal component */}
              {showStripeCheckout && ( // Render StripeCheckout if showStripeCheckout is true
                <Modal />
              )}
                    
                  
          </div>
        </div>
      
      </div>
      <Footer/>
  </div>
  );
};

export default Cart;
