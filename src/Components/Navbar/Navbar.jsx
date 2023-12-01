import React, {useState, useEffect, useContext} from 'react'
import { BsBag } from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from "../../assets/images/logo.png"
import Avatar from "../../assets/images/user-icon.png"

import { auth } from "../../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import {CartContext} from '../../context/CartContext'
import { toast } from 'react-toastify';


const Navbar = () => {
  
  
  const {itemAmount} = useContext(CartContext)

  const [user] = useAuthState(auth) //so as to detect the user

  const signUserOut = async () => {
    await signOut(auth)
    prompt: 'select_account' //so that u can select other google accounts
    toast.success("Logout Successful");
    navigate("/login")
 } 



  const [isActive, setIsActive] = useState(false)
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation(); //to activate active page when I navigate

  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/shop") {
      setActiveTab("Shop");
    } else if (location.pathname === "/cart") {
      setActiveTab("Cart");
    }
  }, [location.pathname]);

  //bg color changes after a scroll
  useEffect (()=>{
    window.addEventListener("scroll", ()=>{
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
    })
}) 




  return (
    <section>
      <header 
        className={`${
        isActive ? 'bg-white py-3 shadow-md' : 'bg-red py-3'} 
        fixed w-full z-10 transition-all`}>

        <div className='px-[10%] sm:px-[6%] flex items-center 
        justify-between h-full'>
          {/* logo */}
          <Link to={'/'}>
              <div className='text-pink-500 font-bold'>
                <img src={Logo} alt="" className='w-15 h-12' />
                {/* MacyMall™ */}
              </div>
          </Link>   

          <div className='flex gap-x-6 items-center text-primary-color font-semibold'>
            <Link to="/">
              <p
                className={`${activeTab === "Home" ? "text-red-500": ""}`}
                onClick={() => setActiveTab("Home")}
              >
                Home
              </p>
            </Link>
            <Link to="/shop">
              <p
                className={`${activeTab === "Shop" ? "text-red-500" : ""}`}
                onClick={() => setActiveTab("Shop")}
              >
                Shop
              </p>
            </Link>
            {user && (
                <>
                  <Link to="/cart">
                  <p
                    className={`${activeTab === "Cart" ? "text-red-500" : ""}`}
                    onClick={() => setActiveTab("Cart")}
                  >
                    Cart
                  </p>
                </Link>
                </>
              )
            }
            
          </div>

          {/* cart */}
          <div className='flex justify-between items-center gap-x-6'>
            
            {!user && (
                <>
                  <Link to="/login">
                    <p className='text-primary-color font-semibold'>LOGIN</p>
                  </Link>
                </>
              )
            }
          
            {/* for cart icon to show when user login */}
            <div 
              className='cursor-pointer flex relative'>
              {user && (
              <>
                <Link to="/cart">
                <BsBag className='text-2xl'/>

                  <div className='bg-red-500 absolute left-4 bottom-[-6px]
                    border-2 text-[14px] w-[20px] h-[20px] pt-2 pb-2 text-white 
                    rounded-full flex justify-center items-center'>
                      {itemAmount}
                  </div>
                </Link>
              </>
              )}
            </div>

                {/* for log out to display when user has login*/}
            <div className='flex justify-center items-center gap-x-6'>
              { user && (
                <>
                  <p className='text-[16px]'> {user?.displayName} </p>
                  <img src={user?.photoURL || Avatar } width="50" height="50" className='rounded-full'/>
                  <button onClick={signUserOut} 
                    className='text-[16px] bg-red-500 text-white p-1 rounded'> 
                    Sign Out
                  </button>
                </>
              )}
            </div>

          </div>
      </div>
      
  </header>
    </section>
  )
}

export default Navbar