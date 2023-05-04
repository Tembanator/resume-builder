import React, { useState } from 'react'
import pic1 from '../images/pic1.jpg'
import { FiPlus } from 'react-icons/fi'
import ContactItem from '../components/template1/ContactItem'
import EditIcon from '../components/template1/EditIcon'
import { useEffect } from 'react'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'
import Firstname from '../components/template1/Firstname'
import Lastname from '../components/template1/Lastname'
import ApplicantJobTitle from '../components/template1/ApplicantJobTitle'
import Contacts from '../components/template1/Contacts'
import Profile from '../components/template1/Profile'
import Skills from '../components/template1/Skills'
import Education from '../components/template1/Education'
import Experience from '../components/template1/Experience'
import { Link } from 'react-router-dom'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print'

const Template1 = () => {

  console.error = (function () {
    var error = console.error

    return function (exception) {
      if ((exception + '').indexOf('Warning: A component is `contentEditable`') !== 0) {
        error.apply(console, arguments)
      }
    }
  })()

  function fix_onChange_editable_elements() {
    var tags = document.querySelectorAll('[contenteditable=true][onChange]');//(requires FF 3.1+, Safari 3.1+, IE8+)
    for (var i = tags.length - 1; i >= 0; i--) if (typeof (tags[i].onblur) != 'function') {
      tags[i].onfocus = function () {
        this.data_orig = this.innerHTML;
      };
      tags[i].onblur = function () {
        if (this.innerHTML != this.data_orig)
          this.onchange();
        delete this.data_orig;
      };
    }
  }

  const componentRef = useRef()

  // const handlePrinting = () => {
  //   const page = document.querySelector('html')
  //   const cv = document.querySelector('#cv')
  //   cv.style.width = '21cm'
  //   cv.style.height = '297mm'
  //   // page.style.fontSize = '11px'
  //   handlePrint()
  // }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  return (
    <>
      <div ref={componentRef}>
        <div id='cv' className='max-w-[21cm] mx-auto bg-gray-100 text-gray-700 relative'>
          <div className='bg-slate-300 p-6'>
            <div className='max-w-[650px] mx-auto'>
              <div className=''>
                <div className='font-Raleway flex space-x-2 md:text-4xl text-xl tracking-widest uppercase'>
                  <Firstname />
                  <Lastname />
                </div>
                <ApplicantJobTitle />
              </div>
            </div>
          </div>

          <div className='p-10 sm:px-20'>
            {/* row 1 */}
            <div className="row-1 sm:flex sm:justify-between sm:py-3 relative">
              <span className="after:content-[''] absolute w-full h-[2px] bg-slate-200  bottom-0">
              </span>
              {/* contact section */}
              <div className='section py-6 sm:py-1 w-full'>
                <div className='section-title'>
                  <h4 className='font-bold tracking-widest mb-4'>CONTACT</h4>
                </div>
                <div className="section-body text-sm">
                  <Contacts />
                </div>
              </div>
              {/* profile section */}
              <div className='section py-6 sm:py-1 w-full'>
                <div className='section-title'>
                  <h4 className='font-bold tracking-widest mb-4'>PROFILE</h4>
                </div>
                <div className="section-body text-sm">
                  <Profile />
                </div>
              </div>
            </div>

            {/* row 2 */}
            <div className="row-2 sm:flex sm:justify-between sm:pb-8">
              {/* column 1 */}
              <div className="column-1 w-full">

                {/* skills section */}
                <div className='section py-6 sm:py-5 relative'>
                  <span className="after:content-[''] absolute w-full h-[2px] bg-slate-200  bottom-0">
                  </span>
                  <div className='section-title'>
                    <h4 className='font-bold tracking-widest mb-4'>SKILLS</h4>
                  </div>
                  <div className="section-body text-sm">
                    <Skills />
                  </div>
                </div>
                {/* education section */}
                <div id='education-section' className='section py-6 sm:py-5'>
                  <div className='section-title'>
                    <h4 className='group relative font-bold tracking-widest mb-4'>
                      EDUCATION
                      <Link to='/template1/add-education'>
                        <FiPlus
                          size={25}
                          className='absolute top-0 right-40 font-bold text-purple-600 cursor-pointer hidden group-hover:block'
                        />
                      </Link>
                    </h4>
                  </div>
                  <Education />
                </div>
              </div>
              {/* column 2 */}
              <div className="column-2 w-full">
                <div className='section py-6 sm:py-5'>
                  <div className='section-title'>
                    <h4 className='font-bold tracking-widest mb-4'>EXPERIENCE</h4>
                  </div>
                  <Experience />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      <div className='max-w-[21cm] mx-auto'>
        <button
        onClick={handlePrint}
          id='login-btn'
          className='w-full bg-purple-700 text-white p-2 mt-8 hover:bg-purple-900 font-bold rounded cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed mb-8'
        >
          Print
        </button>
      </div>
    </>
  )
}

export default Template1
