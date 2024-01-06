import {useState} from 'react'
import {FcGoogle} from "react-icons/fc"
import {auth, provider} from "../Config/firebase"
import {
  signInWithPopup, 
  signInWithEmailAndPassword, 
 } from "firebase/auth"
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify';
//for form validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Login = () => {
    const navigate = useNavigate();

    const schema = yup.object().shape({
      email: yup.string().required("You must add a valid email."),
      password: yup.string().required("password should be valid.")
    });
  
    const {register, handleSubmit, formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
      
    });

    const signInWithGoogle = async()=>{
       const result = await signInWithPopup(auth, provider);
       
       console.log(result)
       toast.success("Login Successfully");
       navigate('/') 
    }

    const [data, setData] = useState({
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    };


    const onSubmit = (data) => {
      // e.preventDefault();
  
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user, "authData");
          toast.success("Sign in Successfully");
          navigate("/")
        })
        .catch((error) => {
          console.log(error.code, error.message);
          toast.error("Failed to sign in");
        });
    }
    
    
  return (
    <div className='pb-20 md:pb-28'>
      <h1 className='text-2xl font-bold pt-28 md:pt-32 mb-8 text-center'>Sign In</h1>
      <div className='flex justify-center items-center mx-6 md:mx-0'> 
        <div className='border border-gray-500 rounded p-6'>

          <p className='text-xl font-bold mb-4'>Sign into your account to Continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className=" text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                htmlFor="email"
                >
                  Email Address
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                type="email" 
                id="email"
                name="email"
                placeholder="Janedoe@gmail.com"
                {...register("email")}
                value={data.email}
                onChange={handleChange}
                />
                <div>
                  <p className='text-red-500 text-xs italic'> {errors.email?.message}</p>
                </div>
              </div>
            </div>
            
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className=" text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                leading-tight focus:outline-none focus:bg-white focus:border-[#3938CD]" 
                type="password" 
                id="password"
                name="password"
                placeholder="**************"
                {...register("password")}
                value={data.password}
                onChange={handleChange}
                />

                <div>
                  <p className='text-red-500 text-xs italic'> {errors.password?.message}</p>
                </div>
              </div>
              
            </div>

            <div className="flex items-center justify-between">
              <button type='submit' className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
              </a>
            </div>
            
            {/* <div className="flex gap-x-2 md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="flex justify-center">
                <button type='submit'
                className="shadow bg-[#3938CD] hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                >Login</button>
              </div>
            </div> */}

            <div className='flex justify-center items-center mt-4'>
              <Link to="/signup" className='underline text-[#3938CD]'>
                Don't have an account? sign up
              </Link>
            </div>

          </form> <br /><br />

         
            <div className="flex justify-center items-center">
              <button onClick={signInWithGoogle}
              className='flex justify-center items-center gap-x-2 
              cursor-pointer border border-black rounded shadow-2xl hover:p-5 p-4 transition'>
                  <FcGoogle size={30}/>
                  <p>Sign in with Google</p>
              </button>
            </div>

        </div>
      </div>
    </div>
    
  )
}

export default Login