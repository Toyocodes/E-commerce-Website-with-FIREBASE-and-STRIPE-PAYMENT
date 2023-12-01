import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsPlus } from 'react-icons/bs';
import { GiShoppingCart } from "react-icons/gi";

import { CartContext } from '../../context/CartContext';

const Products = ({ products }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 
          lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-x-20 px-[6%] md:px-[8%]'>
             {products.map(({ id, img, title, description, price }) => (
              <div key={id}>
                <div className='h-[300px] mb-[-1rem] relative overflow-hidden group transition'>
                  <div className='w-full h-full flex justify-center items-center'>
                    {/* image */} 
                    <Link to={`/product/${id}`}>
                      <div className='w-[200px] mx-auto flex justify-center items-center'>
                        <img className='max-h-[150px] transition duration-300' src={img} alt="" />
                      </div>
                    </Link>
                  </div>
                </div>
                {/* title and desc */}
                <div>
                  <div>
                    <Link to={`/product/${id}`}>
                      <h2 className='font-semibold mb-1 text-primary-color text-xl'>
                        {title}
                      </h2>
                    </Link>
                    <div className='text-sm capitalize text-gray-500 mb-1'>
                      {description}
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='font-semibold'>${price}</div>
                    <button onClick={() => addToCart({ id, img, title, description, price })}>
                      <div className='flex justify-center items-center text-white w-[30px] h-[30px] bg-black rounded-full hover:h-[32px] hover:w-[32px] transition-all duration-300'>
                        <BsPlus className='text-3xl' />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Products;
