import React, {useState, useEffect, useContext} from 'react'
import Hero from '../Components/Hero/Hero'
import { BallTriangle } from 'react-loader-spinner';
import Products from '../Components/Products/Products';
import Navbar from '../Components/Navbar/Navbar';
import { collection, addDoc, getDoc, getDocs, doc, onSnapshot, serverTimestamp,} from "firebase/firestore";
import { db } from "../Config/firebase"
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Config/firebase";

import {toast} from "react-toastify"
import BestSellers from '../Components/Products/BestSellers';
import Announcement from '../Components/announcement/Announcement';
import Footer from '../Components/footer/Footer';
import Sales from '../Components/Sales/Sales';


const Home = ({product}) => {
 
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  // const [user, setUser] = useState()
  useEffect(() => {
   
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  }, []);

  <BallTriangle
    radius={4}
    ariaLabel="ball-triangle-loading"
    wrapperClass={{}}
    wrapperStyle=""
    visible={true}
  />

  // const [data, setData] = useState([])
  
  //to retrieve data from firebase and let it show on home page
  const [products, setProducts] = useState([])

  useEffect(() => {

    // LISTEN (REALTIME)
      const unsub = onSnapshot(collection(db, "Products"),(snapShot) => {
          let productsArray = [];
          snapShot.docs.forEach((doc) => {
            productsArray.push({ id: doc.id, ...doc.data() });
            console.log('Firestore Data:', productsArray);
          });
          setProducts(productsArray);
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsub();
      };
  }, []);

  

  return (
    <section>
      <Navbar/>
       <Hero/>
      {isLoading ? (
        <div className="flex justify-center items-center h-[100vh]">
          <BallTriangle color="rgb(239 68 68)" height="120px" width="120px"/>
        </div>
      ) : (
        <> 
          <div className='text-center pt-[100px] pb-[20px]'>
            <h2 className='text-2xl md:text-4xl font-bold text-red-400'>New Arrivals</h2>
          </div>
          
            <Products products={products}/>
        </>
      )}

      <div>
        <div className='text-center pt-[120px] pb-[10px]'>
          <h2 className='text-2xl md:text-4xl font-bold text-red-400'>Flash Sales</h2>
        </div>
        <Sales/>
      </div>

      <div>
        <div className='text-center pt-[100px] pb-[20px]'>
          <h2 className='text-2xl md:text-4xl font-bold text-red-400'>All Products</h2>
        </div>
        <BestSellers/>
      </div>


      <div className='hidden sm:block pt-[6%]'>
        <Announcement/>
      </div>
      
      <Footer/>
    </section>
  )
}

export default Home