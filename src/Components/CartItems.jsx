import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdClose, IoMdRemove, IoMdAdd } from "react-icons/io";
import { CartContext } from '../context/CartContext';

const CartItems = ({item}) => {

  const {removeFromCart, increaseAmount, decreaseAmount} = useContext(CartContext) 

  const { id, img, title, description, amount, price } = item;

  return (
    <section>
      <div
        className="flex justify-between items-center border-b
      border-gray-200 w-full font-light text-gray-500"
      >
       <div className="flex justify-between items-center gap-x-10 md:gap-x-10">
           {/* image */}
          <div className="min-h-[150px] flex items-center gap-x-4">
            <Link to={`/product/${id}`}>
              <img className="max-w-[80px]" src={img} alt="" />
            </Link>
          </div>

          {/* title and desc */}
          <div className=" mb-2">
            <Link to={`/product/${id}`}>
              <h2 className="font-semibold mb-1 text-primary-color text-[14px] sm:text-[15px] lg:text-[16px] mr-10 hover:underline">
                {title}
              </h2>
            </Link>
            <p className="text-sm capitalize text-gray-500 mb-1">{description}</p>
          </div>
       </div>

        <div className="lg:flex justify-between items-center gap-x-8">
            {/* add, remove, sub btn */}
          <div className="flex h-[36px] text-sm lg:mb-0 md:mb-2 mb-3">
            <div
              className="flex 
                items-center justify-between h-full border text-black font-medium px-2"
            >
              <div
                onClick={()=>decreaseAmount(id)}
                className=" cursor-pointer"
              >
                <IoMdRemove />
              </div>
              <div className="px-5">{amount}</div>
              <div
              onClick={()=>increaseAmount(id)}
                className="cursor-pointer"
              >
                <IoMdAdd />
              </div>
            </div>
          </div>

          {/* price */}
          <div className="hidden ">
            {price}
          </div>

          {/* total price */}
          <div className="text-black font-medium">
            {`$${parseFloat(price * amount).toFixed(2)}`}
          </div>

          {/* close btn */}
          <div className="lg:mt-0 md:mt-2 mt-3">
            <div
              onClick={()=>removeFromCart(id)}
              className="text-xl cursor-pointer"
            >
              <p
                className="bg-red-600 text-center text-white font-semibold p-1 md:px-2 md:py-1 rounded
                  hover:bg-red-500 transition"
              >
                delete
              </p>
              {/* <IoMdClose className='text-red-600
                  hover:text-red-700 transition'/> */}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CartItems;
