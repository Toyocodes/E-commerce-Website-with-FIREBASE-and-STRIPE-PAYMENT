import React,{useState, useContext} from 'react'
import { collection, doc, getDoc, setDoc, addDoc, serverTimestamp } from "firebase/firestore"; 
import { storage, db, auth} from '../Config/firebase'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';
import StripeCheckout from 'react-stripe-checkout'


// Modal Component
export const Modal = () => {
  const { cartProducts, total, itemAmount } = useContext(CartContext);
    
  //payment
  const handleToken =(token)=>{
    console.log(token)
    toast.success("Order has been placed successfully")
    clearCart();
  }
 
    
   
    return (
      <div>
           <StripeCheckout
              stripeKey="pk_test_51OGNDoHh19zPfIrELNV7Rl6Y9eZ6pMTkaNjwWabw8M9rKiNPBWRuEwMw8FUQY1Fsjr2pM84uNtDVmgKVFsYsEvha00PlRJ07xM"
              token={handleToken}
              billingAddress
              shippingAddress
              name="All products"
              amount= {total * 100}>
            </StripeCheckout>
      </div>

    );
  };
  