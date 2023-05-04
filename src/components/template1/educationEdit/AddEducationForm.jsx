import React, { useEffect, useState } from 'react'
import { TbCertificate, TbSchool, TbCalendarTime } from 'react-icons/tb'
import { RxCross2 } from 'react-icons/rx'
import { UserAuth } from '../../../context/AuthContext'
import { db } from '../../../firebase'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import Loader from '../../Loader'
import Input from './Input'
import { Link } from 'react-router-dom'

const AddEducationForm = () => {

    const { user } = UserAuth()
    const [education, setEducation] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    let candidateRef = ''
    if (user?.email) {
        candidateRef = doc(db, "users", user?.email)
    }

    const [certificate, setCertificate] = useState('')
    const [school, setSchool] = useState('')
    const [duration, setDuration] = useState('')

    const getCandidateInfo = async () => {
        const docRef = doc(db, 'users', `${user?.email}`)
        const docSnap = await getDoc(docRef)
        setEducation(docSnap.data()?.education)
        setIsLoading(false)
    }

    const updateEducation = async (updatedEducation) => {
        setIsLoading(true)
        await updateDoc(candidateRef, {
            education: arrayUnion(updatedEducation)
        }).then(async () => {
            await getCandidateInfo()
            const notify = () => toast.success('Education updated');
            notify()
            setIsLoading(false)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateEducation({
            certificate: certificate, school: school,
            duration: duration
        })


    }

    useEffect(() => {
        getCandidateInfo()
        setIsLoading(true)
    }, [user?.email])

    return (
        <>
            {
                isLoading
                    ? <Loader />
                    : <div
                        id='edit-education-form'
                        className='top-0 left-0 w-full h-full z-50 pt-3 sm:pt-6'>
                        <div className='relative bg-slate-800 my-auto p-8 max-w-[400px] min-w-[300px] mx-auto rounded shadow-lg'>
                            <Link to='/template1'>
                                <RxCross2
                                    size={30}
                                    className='absolute top-4 right-4 text-white font-bold cursor-pointer'
                                />
                            </Link>
                            <form className=''>
                                <h3 className='text-white font-bold text-xl my-3 sm:text-center text-left'>Add Education</h3>

                                <Input
                                    className='uppercase'
                                    icon={<TbCertificate className='text-purple-900 absolute top-3 left-2' />}
                                    onChange={setCertificate}
                                    placeholder={'Certificate'}
                                    name={'certificate'}
                                    value={certificate.toUpperCase()} />

                                <Input
                                    className=''
                                    icon={<TbSchool className='text-purple-900 absolute top-3 left-2' />}
                                    onChange={setSchool}
                                    placeholder={'School'}
                                    name={'school'}
                                    value={school} />

                                <Input
                                    className=''
                                    icon={<TbCalendarTime className='text-purple-900 absolute top-3 left-2' />}
                                    onChange={setDuration}
                                    placeholder={'Duration'}
                                    name={'duration'}
                                    value={duration} />

                                <button
                                    onClick={handleSubmit}
                                    className='w-full bg-purple-700 text-white p-2 mt-8 hover:bg-purple-900 font-bold rounded cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed'
                                >
                                    Submit Education
                                </button>
                            </form>
                        </div>
                    </div>
            }

        </>
    )
}

export default AddEducationForm
