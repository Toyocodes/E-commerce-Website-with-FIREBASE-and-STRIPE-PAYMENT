import { useState, useContext, useRef } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { useClickAway } from 'react-use';
import { navigation } from "../../assets/data/menu";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsBag } from 'react-icons/bs'
import Avatar from "../../assets/images/user-icon.png"
import { toast } from 'react-toastify';

//user import
import { auth } from "../../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import {CartContext} from '../../context/CartContext'

const NavMobile = () => {
  //hamburger
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setIsOpen(false));

  //cart
  const {itemAmount} = useContext(CartContext)

  //user
  const [user] = useAuthState(auth) //so as to detect the user

  const signUserOut = async () => {
    await signOut(auth)
    prompt: 'select_account' //so that u can select other google accounts
    toast.success("Logout Successful");
    navigate("/")
 } 

  return (
    <div ref={ref} className="lg:hidden">
      <Hamburger toggled={isOpen} size={25} toggle={() => setIsOpen(!isOpen)} direction="right" duration={0.8} />
      {isOpen && (
        <div className="fixed left-0 shadow-2xl right-0 top-[7rem] p-5 pt-0 bg-white mx-10 rounded-lg">
          <ul className=''>
            {navigation.map((navItem, index) => (
              <li key={index} className="w-full p-[0.08rem] border-b border-gradient-to-r from-[#68baaf] to-[#95bbb2] hover:ml-2 transition-all">
                <Link to={navItem.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full p-5">
                  {navItem.title}
                </Link>
              </li>
            ))}
              {/* login */}
            <div className="flex lg:hidden justify-center items-center mt-4">
              {!user && (
                    <>
                      <Link to="/login">
                        <p className=' text-white bg-red-500 p-2 rounded font-semibold'>LOGIN</p>
                      </Link>
                    </>
                  )
                }
            </div>
            <div className='flex justify-between items-center gap-x-6'>
            
          
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
              <div className='flex lg:hidden justify-center items-center gap-x-6'>
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
            {/* <div className="flex justify-center">
              <button
                  className="lg:hidden flex custom__button hover:bg-gradient-to-r from-[#68baaf] to-[#95bbb2] mt-6"
                  type="submit"
                >
                  Notify Me
              </button>
            </div> */}
          </ul>
          
          {/* <ul className="">
            {navigation.map((navItem, index) => (
              <li key={index} className="w-full p-[0.08rem] border-b border-gradient-to-r from-[#68baaf] to-[#95bbb2] hover:ml-2 transition-all">
                <a
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full p-5"
                  href={navItem.href}
                >
                  {navItem.title}
                </a>
              </li>
            ))}
            <div className="flex justify-center">
              <button
                  className="lg:hidden flex custom__button hover:bg-gradient-to-r from-[#68baaf] to-[#95bbb2] mt-6"
                  type="submit"
                >
                  Notify Me
              </button>
            </div>
          </ul> */}
         
        </div>
      )}
    </div>
  );
};

export default NavMobile;
