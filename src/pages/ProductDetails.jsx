import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import {CartContext} from '../context/CartContext'
import { ColorRing } from 'react-loader-spinner';
import {Link} from "react-router-dom"

const ProductDetails = () => {

    //get the product id from the cart
    const {id} = useParams()
    
   
console.log('ID from useParams:', id);
    
    const {addToCart} = useContext(CartContext)
    
    const { cartProducts } = useContext(CartContext); 

    //get single product based on Id
    const product = cartProducts.find((item)=>{
        return item.id === id;
   
    })

    const [isLoading, setIsLoading] = useState(true)
    // const handleImageLoad = () => {
    //     setLoading(true); // Set loading to false when the image has finished loading
    // };
    useEffect(() => {
   
        setTimeout(() => {
          setIsLoading(false);
        }, 2000); 
      }, []);
    
      <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />



    //if product is not found
    if(!product){
        return (
        <section className='h-screen flex justify-center items-center'>
       <ColorRing height="120px" width="120px"/>
        </section>
        ) 
    }
    
    // const {title, price, description, img} = product
    console.log('cartProducts :', product);

  return (
    <section className='pt-48 lg:pt-52 pb-12 lg:py-32 h-screen flex items-center'>
        <div className="container mx-auto">
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
            <div className='flex flex-col lg:flex-row items-center'>
                {/* image */}
                <div className='flex flex-1 justify-center items-center 
                    mb-8 lg:mb-0'>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-[100vh]">
                        <ColorRing height="120px" width="120px"/>
                        </div>
                    ) : (
                        <img
                            src={product.img}
                            alt=""
                            className='max-w-[180px] lg:max-w-sm lg:h-[350px]'
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop in case of repeated errors
                                e.target.src = 'URL_TO_PLACEHOLDER_IMAGE'; // Display a placeholder image or specify a default image URL
                            }}
                        />
                    )}
                </div>
                {/* text */}
                <div className='flex-1 text-center lg:text-left'>
                    <h1 className='text-[26px] font-medium mb-2 
                    max-w-[450px] mx-auto lg:mx-0'>
                    {product.title}
                    </h1>
                    <div className='mb-6 mx-6 lg:mx-0 text-gray-500'>
                        {product.description}
                    </div>
                    
                    <div className='text-xl text-red-500 font-medium mb-6'>
                        {`$${parseFloat(product.price * product.amount).toFixed(2)}`}
                    </div>
                    <p className='mb-8 mx-6 lg:mx-0'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Voluptatem earum excepturi  molestias nihil accusantium temporibus, eius neque odit quae 
                        commodi!
                    </p>
                    <button onClick={()=> addToCart(product, id)} 
                    className='bg-black py-4 px-8 text-white'>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
      
    </section>
  )
}

export default ProductDetails