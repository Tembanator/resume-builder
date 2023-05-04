import React, { useState } from 'react'
import pic1 from '../images/pic1.jpg'
import { BsFillTelephoneFill, BsFillEnvelopeFill, BsFillPinFill, BsGlobe2, BsFillRecordFill } from 'react-icons/bs'
import ContactItem from '../components/template1/ContactItem'
import EditIcon from '../components/template1/EditIcon'
import { useEffect } from 'react'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'

const Template1 = () => {

  const [data, setData] = useState({})
  const { user } = UserAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  // const data = {
  //   name: {
  //     firstname: 'Dani',
  //     lastname: 'Schwaiger'
  //   },
  //   applicantJobTitle: 'Web developer',
  //   profile: 'I am a qualified and professional web developer with five years of experience in database administration and website design. Strong creative and analytic skills. Team player with an eye for detail.',
  //   contact: [
  //     { phone: '123-456-7890' },
  //     { email: 'dani@gmail.com' },
  //     { address: 'Mbabane, Swaziland' },
  //     { website: 'www.dani.com' }
  //   ],
  //   profilePic: pic1,
  //   skills: [
  //     'Web Design',
  //     'Design Thinking',
  //     'Wireframe Creation',
  //     'Front End Coding',
  //     'Problem-Solving',
  //     'Problem-Solving',
  //     'Computer Literacy',
  //     'Project Management Tools',
  //     'Strong Communication'
  //   ],
  //   education: [
  //     {
  //       certificate: 'SECONDARY SCHOOL',
  //       school: 'Really Great High School',
  //       duration: '2010 - 2014'
  //     },
  //     {
  //       certificate: 'Bachelor of Technology',
  //       school: 'Really Great University',
  //       duration: '2014 - 2016'
  //     }
  //   ],
  //   experience: [
  //     {
  //       jobTitle: 'APPLICATIONS DEVELOPER',
  //       company: 'Really Great Company',
  //       duration: '2016 - Present',
  //       duties: [
  //         'Database administration and website design',
  //         'Built the logic for a streamlined ad-serving platform that scaled',
  //         'Educational institutions and online classroom management'
  //       ]
  //     },
  //     {
  //       jobTitle: 'APPLICATIONS DEVELOPER',
  //       company: 'Really Great Company',
  //       duration: '2014 - 2016',
  //       duties: [
  //         'Database administration and website design',
  //         'Built the logic for a streamlined ad-serving platform that scaled',
  //         'Educational institutions and online classroom management'
  //       ]
  //     },
  //   ]
  // }

  const getCandidateInfo = async () => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setData(doc.data())
    })
  }
  useEffect(() => {
    getCandidateInfo()
    setFirstname(data?.name?.firstname)
    setLastname(data?.name?.lastname)
    setIsLoading(false)
  }, [user?.email])

  const phoneIcon = <BsFillTelephoneFill />
  const emailIcon = <BsFillEnvelopeFill />
  const addressIcon = <BsFillPinFill />
  const websiteIcon = <BsGlobe2 />


  console.error = (function () {
    var error = console.error

    return function (exception) {
      if ((exception + '').indexOf('Warning: A component is `contentEditable`') !== 0) {
        error.apply(console, arguments)
      }
    }
  })()

  // function fix_onChange_editable_elements() {
  //   var tags = document.querySelectorAll('[contenteditable=true][onChange]');//(requires FF 3.1+, Safari 3.1+, IE8+)
  //   for (var i = tags.length - 1; i >= 0; i--) if (typeof (tags[i].onblur) != 'function') {
  //     tags[i].onfocus = function () {
  //       this.data_orig = this.innerHTML;
  //     };
  //     tags[i].onblur = function () {
  //       if (this.innerHTML != this.data_orig)
  //         this.onchange();
  //       delete this.data_orig;
  //     };
  //   }
  // }

  // useEffect(() => {
  //   fix_onChange_editable_elements()
  // },[])

  // const [firstname, setFirstname] = useState('juice')
  // console.log(firstname)
  // data.name.firstname = firstname

  // const [lastname, setLastname] = useState('')
  // data.name.lastname = lastname

  // const [applicantJobTitle, setApplicantJobTitle] = useState(data?.applicantJobTitle)
  // data.applicantJobTitle = applicantJobTitle

  // const [profile, setProfile] = useState(data?.profile)
  // data.profile = profile

  return (
    <>
      <div className='max-w-[21cm] mx-auto bg-gray-100 text-gray-700 relative'>

        {isLoading && <div className='z-30 opacity-50 h-full w-full bg-gray-600 absolute left-0 top-0'>
        </div>}

        <div className='bg-slate-300 p-6'>

          <div className='max-w-[650px] mx-auto'>
            <div className=''>
              <div className='font-Raleway flex space-x-2 md:text-4xl text-xl tracking-widest uppercase'>
                <h3
                  onBlur={(e) => setFirstname(e.target.textContent)}
                  contentEditable={true}
                  className='relative group cursor-pointer'>
                  {data?.name?.firstname}
                  <EditIcon />

                </h3>
                <h3
                  onBlur={(e) => data.name.lastname = e.target.textContent}
                  contentEditable={true}
                  className='font-semibold relative group cursor-pointer'>
                  {data?.name?.lastname}
                  <EditIcon />
                </h3>
              </div>
              <h5
                // onBlur={(e) => setApplicantJobTitle(e.target.textContent)}
                contentEditable={true}
                className='tracking-widest inline-block text-sm font-semibold uppercase relative group cursor-pointer'>
                {data?.applicantJobTitle}
                <EditIcon />
              </h5>
            </div>

            <div className='relative'>
              <div className='w-[100px] h-[100px] rounded-full overflow-hidden absolute right-8 bottom-[-45px]'>
                <img className='w-full object-cover' src={data?.profilePic} alt="" />
              </div>
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
              {/* <div className='section-subtitle'>

              </div> */}
              <div className="section-body text-sm">
                {
                  data?.contact?.map((item, index) => {
                    if (item.phone) {
                      return <ContactItem icon={phoneIcon} contactInfo={item?.phone} key={index} />
                    }
                    if (item.email) {
                      return <ContactItem icon={emailIcon} contactInfo={item?.email} key={index} />
                    }
                    if (item.address) {
                      return <ContactItem icon={addressIcon} contactInfo={item?.address} key={index} />
                    }
                    if (item.website) {
                      return <ContactItem icon={websiteIcon} contactInfo={item?.website} key={index} />
                    }
                    return ''
                  })
                }
              </div>
            </div>
            {/* profile section */}
            <div className='section py-6 sm:py-1 w-full'>
              <div className='section-title'>
                <h4 className='font-bold tracking-widest mb-4'>PROFILE</h4>
              </div>
              <div className='section-subtitle'>

              </div>
              <div className="section-body text-sm">
                <p
                  // onBlur={(e) => setProfile(e.target.textContent)}
                  contentEditable={true}
                  className='max-w-[300px] text-justify relative group cursor-pointer'>
                  {data?.profile}
                  <EditIcon />
                </p>
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
                <div className='section-subtitle'>

                </div>
                <div className="section-body text-sm">
                  {
                    data?.skills?.map((skill, index) => {
                      return <div key={index} className="contact-item flex mb-2 items-center space-x-2">
                        <BsFillRecordFill size={10} /> <p>{skill}</p>
                      </div>
                    })
                  }
                </div>
              </div>
              {/* education section */}
              <div className='section py-6 sm:py-5'>
                <div className='section-title'>
                  <h4 className='font-bold tracking-widest mb-4'>EDUCATION</h4>
                </div>
                {
                  data?.education?.map((educationItem, index) => {
                    return <div key={index} className="mb-2">
                      <div className='section-subtitle'>
                        <p className='text-sm font-semibold uppercase'>{educationItem?.certificate}</p>
                      </div>
                      <div className="section-body text-sm">
                        <div className='max-w-[300px]'>
                          <p className='capitalize'>{educationItem?.school}</p>
                          <p className='font-bold'>{educationItem?.duration}</p>
                        </div>
                      </div>
                    </div>
                  })
                }
              </div>
            </div>
            {/* column 2 */}
            <div className="column-2 w-full">
              <div className='section py-6 sm:py-5'>
                <div className='section-title'>
                  <h4 className='font-bold tracking-widest mb-4'>EXPERIENCE</h4>
                </div>
                {
                  data?.experience?.map((experienceItem, index) => {
                    return <div key={index} className="pb-5">
                      <div className='section-subtitle'>
                        <p className='text-xs font-extrabold uppercase'>{experienceItem?.jobTitle}</p>
                      </div>
                      <div className="section-body text-sm">
                        <div className='max-w-[300px]'>
                          <p className='capitalize'>{experienceItem?.company}</p>
                          <p className='font-bold'>{experienceItem?.duration}</p>
                        </div>
                        <div className='max-w-[300px]'>
                          {
                            experienceItem?.duties.map((duty, index) => {
                              return <div key={index} className="contact-item flex mb-1 items-center space-x-2">
                                <BsFillRecordFill size={6} /> <p>{duty}</p>
                              </div>
                            })
                          }
                        </div>
                      </div>
                    </div>
                  })
                }

              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => {
        setFirstname('po0p')
        console.log(firstname)
      }}>chgdcghfchj</button>
    </>
  )
}

export default Template1
