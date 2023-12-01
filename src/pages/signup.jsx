import React, {useState} from 'react'
import {FcGoogle} from "react-icons/fc"
import {auth, db, provider} from "../Config/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  } from "firebase/auth"

import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify';
//for form validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const signup = () => {
    const navigate = useNavigate();

    //to validate the form
    // const schema = yup.object().shape({
    //   fullname: yup.string().required("You must add a name."),
    //   email: yup.string().required("You must add a valid email."),
    //   password: yup.string().required("password should be valid.")
    // });
  
    // const formHook = useForm({
    //   mode: "onChange",
    //   resolver: yupResolver(schema)
    // })

    // const { handleSubmit} =formHook;

    const schema = yup.object().shape({
      fullname: yup.string().required("You must add a name."),
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
      name: '',
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    }; 
  

    const onSubmit = (data) => {
      // e.preventDefault();
    
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
    
          // Add user data to Firestore
          const userRef = collection(db, "users"); // Assuming "users" is the name of your Firestore collection
          await addDoc(userRef, {
            name: data.name,
            email: data.email,
            timestamp: serverTimestamp(),
          });
    
          console.log(user, "authData");
          toast.success("Sign up Successfully");
          navigate("/");
        })
        .catch((error) => {
          console.log(error.code, error.message);
          toast.error("Failed to sign up");
        });
    };
    
    
  return (
    <div className='pb-20 md:pb-28'>
      <h1 className='text-2xl font-bold mb-8 pt-28 md:pt-28 text-center'>Sign Up</h1>
      <div className='flex justify-center items-center'> 
        <div className='border border-gray-500 rounded p-6'>

          <p className='text-xl font-bold mb-4'>Sign up to Continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">

          <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3">
                <label className=" text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                  htmlFor="name"
                  type="text">
                    Full Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                type="text" 
                id="name"
                name="name"
                placeholder="Jane Doe"
                {...register("name")}
                value={data.name}
                onChange={handleChange}
                />
                <div>
                  <p className='text-red-500 text-xs italic'> {errors.fullname?.message}</p>
                </div>
              </div>
            </div>

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
            
            <div className="flex gap-x-2 md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="flex justify-center">
                <button type='submit'
                className="shadow bg-red-500 hover:bg-red-400focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                >Sign Up</button>
              </div>
              
            </div>
            <div className='flex justify-center items-center mt-3'>
              <Link to="/login" 
                className='underline text-[#3938CD]'>
                Already have an account? sign in
              </Link>
            </div>
          </form> <br /><br />

            <div className="flex justify-center items-center">
              <button onClick={signInWithGoogle}
              className='flex justify-center items-center gap-x-2 
              cursor-pointer border border-black rounded shadow-2xl hover:p-5 p-4 transition'>
                  <FcGoogle size={30}/>
                  <p>Sign up with Google</p>
              </button>
            </div>

        </div>
      </div>
    </div>
    
  )
}

export default signup