import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Navbar = () => {

  const { user, logOut } = UserAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogOut = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await logOut()
      navigate('/sign-in')
    } catch (err) {
      setError(err)
      console.log(error)
    }
  };

  return (
    <>
      <div className='p-3 py-5 shadow-md bg-white mb-6'>
        <div className='flex justify-between items-center max-w-[850px] mx-auto'>

          <div>
            <Link to='/'>
              <h1 className='font-bold whitespace-nowrap'>
                <span className='logo-abr mr-2 text-white bg-purple-800 p-1 rounded-full'>
                  RB
                </span>
                <span className='text-purple-800'>
                  RESUME BUILDER
                </span>
              </h1>
            </Link>
          </div>
          <div className='flex space-x-8 font-bold text-purple-800 text-sm whitespace-nowrap'>
            {
              user?.email
                ? (<button
                onClick={handleLogOut}
                  className='hover:text-purple-300'>
                  LOGOUT
                </button>)
                : (<><Link to='/sign-in'>
                  <button
                    className='hover:text-purple-300'>
                    SIGN IN
                  </button>
                </Link>
                  <Link to='/sign-up'>
                    <button
                      className='hover:text-purple-300'>
                      SIGN UP
                    </button>
                  </Link></>)
            }

          </div>

        </div>
      </div >
    </>
  )
}

export default Navbar
