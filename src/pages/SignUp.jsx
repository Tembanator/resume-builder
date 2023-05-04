import React from 'react'
import { useState } from 'react'
import { FaEnvelope, FaLock, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [show, setShow] = useState(false)
  const [type, setType] = useState('password')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const {user, signUp}= UserAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signUp(email, password)
      navigate('/')
    } catch (error) {
      setError(error)
      const notify = () => toast.error(error.message);
      notify()
    }
  };

  const handleShowPassword = () => {
    setShow(!show)
    if (type === 'password') {
      setType('text')
    } else {
      setType('password')
    }
  }

  return (
    <>
      <div className='h-screen bg-gradient-to-r from-purple-600 to-blue-600 p-8'>
        <div className='bg-slate-200 rounded-lg shadow-2xl max-w-[400px] min-w-[260px] mx-auto p-6 pb-12 md:p-12'>
          <h2 className='text-center font-bold text-xl md:text-2xl text-gray-800 mb-6'>Sign Up</h2>
          <form onSubmit={handleSubmit} className='w-full'>
            <div className='relative'>
              <FaEnvelope className='text-purple-900 absolute top-3 left-2' />
              <input
                onChange={(e) => setEmail(e.target.value)}
                className='mb-4 bg-gray-100 border border-opacity-30 outline-none border-purple-950 text-gray-900 text-sm rounded-lg block w-full p-2 pl-8 dark:placeholder-gray-400'
                type="email"
                name="email"
                id="email"
                placeholder='E-mail' />
            </div>

            <div className='relative'>
              <FaLock className='text-purple-900 absolute top-3 left-2' />
              {
                !show
                  ? <FaRegEye
                    onClick={handleShowPassword}
                    className='text-purple-900 absolute top-3 right-2 cursor-pointer' />
                  : <FaRegEyeSlash
                    onClick={handleShowPassword}
                    className='text-purple-900 absolute top-3 right-2 cursor-pointer' />
              }


              <input
                onChange={(e) => setPassword(e.target.value)}
                className='mb-4 bg-gray-100 border border-opacity-30 outline-none border-purple-950 text-gray-900 text-sm rounded-lg block w-full p-2 pl-8 dark:placeholder-gray-400'
                type={type}
                name="password"
                id="password"
                placeholder='Password' />
            </div>

            <div className='text-xs sm:text-sm text-gray-600 sm:flex justify-between'>
              <p>Already have an account: <Link className='text-purple-800 font-bold hover:text-purple-600' to='/sign-in'>Sign In</Link></p>
              
            </div>

            <button
              className='w-full bg-purple-700 text-white p-2 mt-8 hover:bg-purple-900 font-bold rounded cursor-pointer'
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default SignUp
