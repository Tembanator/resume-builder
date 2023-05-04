import React, { useState } from 'react'
import { FaEnvelope, FaRegEye, FaRegEyeSlash, FaLock } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [show, setShow] = useState(false)
  const [type, setType] = useState('password')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const { user, logIn } = UserAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    const submitButton = document.getElementById('login-btn')
    try {
      submitButton.disabled = true
      await logIn(email, password)
      submitButton.disabled = false
      navigate('/')
    } catch (error) {
      setError(error)
      const notify = () => toast.error(error.message);
      notify()
      submitButton.disabled = false
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
          <h2 className='text-center font-bold text-xl md:text-2xl text-gray-800 mb-6'>Sign In</h2>
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
              <p>Dont have an account: <Link className='text-purple-800 font-bold hover:text-purple-600' to='/sign-up'>Create</Link></p>
              <p><Link className='text-purple-800 font-bold hover:text-purple-600' to='/forgot-password'>Forgot password</Link></p>
            </div>

            <button
              id='login-btn'
              className='w-full bg-purple-700 text-white p-2 mt-8 hover:bg-purple-900 font-bold rounded cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed'
            >
              Sign In
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

export default SignIn
