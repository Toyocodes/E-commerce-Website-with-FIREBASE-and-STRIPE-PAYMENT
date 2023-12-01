import React, { useState, createContext, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Config/firebase";
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    
  // //products context
  // const [products, setProducts] =  useState([])
  // cart statee
  const [cartProducts, setCartProducts] = useState([]);
  // item amount state
  const [itemAmount, setItemAmount] = useState(0);
  // total price state
  const [total, setTotal] = useState(0);



  const [user] = useAuthState(auth)
  //   const uid = user ? user.uid : null
  
  //add product to cart
  
  const addToCart = (product) => {
      if (!user) {
        toast.error('Please login to add items to the cart.');
        navigate('/login'); // Redirect to login page if not logged in
        return;
      }
    
      const newItem = { ...product, amount: 1 };
      const existingCart = JSON.parse(localStorage.getItem('cartProducts')) || [];
      const cartItem = existingCart.find((item) => item.id === product.id);
    
      if (cartItem) {
        const updatedCart = existingCart.map((item) =>
          item.id === product.id ? { ...item, amount: item.amount + 1 } : item
        );
        localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
        setCartProducts(updatedCart); // Update state or pass it to context if used
        // toast.success('Already added to cart');
      } else {
        const updatedCart = [...existingCart, newItem];
        localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
        setCartProducts(updatedCart); // Update state or pass it to context if used
        toast.success('Product added to the cart');
      }
    };


  //sum up 
 // Load cart items from localStorage on initial mount
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cartProducts')) || [];
        setCartProducts(savedCart);
    }, []);
  
  // Update total price whenever cartProducts change
  useEffect(() => {
    const totalPrice = cartProducts.reduce(
      (accumulator, currentItem) => accumulator + currentItem.price * currentItem.amount,
      0
    );
    setTotal(totalPrice);
  }, [cartProducts]);
  
  // Update total amount whenever cartProducts change
  useEffect(() => {
    const totalAmount = cartProducts.reduce(
      (accumulator, currentItem) => accumulator + currentItem.amount,
      0
    );
    setItemAmount(totalAmount)
  }, [cartProducts]);



//remove cart
const removeFromCart = (id) => {
    const newCart = cartProducts.filter((item) => {
      return item.id !== id;
    });
    localStorage.setItem('cartProducts', JSON.stringify(newCart));
    setCartProducts(newCart);
  };

  //clear cart
  const clearCart = () => {
    localStorage.removeItem('cartProducts');
    setCartProducts([]);
  };
  
 //increase quantity
 const increaseAmount = (id) => {
    const cartItem = cartProducts.find((item) => item.id === id);
    addToCart(cartItem, id);
  };

//decrease quantity
  const decreaseAmount = (id) => {
    const cartItem = cartProducts.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cartProducts.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });

      if (cartItem.amount < 2) {
        removeFromCart(id);
        return
      }

      localStorage.setItem('cartProducts', JSON.stringify(newCart));
      setCartProducts(newCart);
    }
  };
  

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
