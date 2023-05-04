import React from 'react'
import { useState } from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    console.log('submitting...')
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

            <div className='text-xs sm:text-sm text-gray-600 sm:flex justify-between'>
              <p>Dont have an account: <Link className='text-purple-800 font-bold hover:text-purple-600' to='/sign-up'>Create</Link></p>

              <p><Link className='text-purple-800 font-bold hover:text-purple-600' to='/sign-in'>Sign In </Link>Instead</p>
            </div>

            <button
              className='w-full bg-purple-700 text-white p-2 mt-8 hover:bg-purple-900 font-bold rounded cursor-pointer'
            >
              Send reset password
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
