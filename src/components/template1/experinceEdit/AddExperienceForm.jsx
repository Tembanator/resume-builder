import React, { useEffect, useState } from 'react'
import { TbCertificate, TbSchool, TbCalendarTime, TbTrashFilled, TbBrandFlightradar24, TbPlus } from 'react-icons/tb'
import { RxCross2 } from 'react-icons/rx'
import { UserAuth } from '../../../context/AuthContext'
import { db } from '../../../firebase'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import Loader from '../../Loader'
import { Link } from 'react-router-dom'
import Input from '../educationEdit/Input'

const AddExperienceForm = () => {

    const { user } = UserAuth()
    const [experience, setExperience] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [company, setCompany] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [duration, setDuration] = useState('')
    const [duties, setDuties] = useState([])

    let candidateRef = ''
    if (user?.email) {
        candidateRef = doc(db, "users", user?.email)
    }

    const getCandidateInfo = async () => {
        const docRef = doc(db, 'users', `${user?.email}`)
        const docSnap = await getDoc(docRef)
        setExperience(docSnap.data()?.experience)
        setIsLoading(false)
    }

    const updateExperience = async (updatedExperience) => {
        setIsLoading(true)
        await updateDoc(candidateRef, {
            experience: arrayUnion(updatedExperience)
        }).then(async () => {
            await getCandidateInfo()
            const notify = () => toast.success('Experience updated');
            notify()
            setIsLoading(false)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateExperience({
            company, jobTitle,
            duration, duties
        })
    }

    const addDuty = async (e) => {
        setDuties([...duties, 'New duty'])
    }

    const handleDeleteDuty = async (index) => {
        let newDuties = duties
        newDuties.splice(index, 1);
        setDuties([...newDuties])
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
                        id='edit-experience-form'
                        className='top-0 left-0 w-full h-full z-50 pt-3 sm:pt-6'>
                        <div className='relative bg-slate-800 my-auto p-8 max-w-[400px] min-w-[300px] mx-auto rounded shadow-lg'>
                            <Link to='/template1'>
                                <RxCross2
                                    size={30}
                                    className='absolute top-4 right-4 text-white font-bold cursor-pointer'
                                />
                            </Link>
                            <form className=''>
                                <h3 className='text-white font-bold text-xl my-3 sm:text-center text-left'>Add Experience</h3>

                                <Input
                                    className='uppercase'
                                    icon={<TbCertificate className='text-purple-900 absolute top-3 left-2' />}
                                    onChange={setJobTitle}
                                    placeholder={'Job title'}
                                    name={'job-title'}
                                    value={jobTitle.toUpperCase()} />

                                <Input
                                    className=''
                                    icon={<TbSchool className='text-purple-900 absolute top-3 left-2' />}
                                    onChange={setCompany}
                                    placeholder={'Company'}
                                    name={'company'}
                                    value={company} />

                                <Input
                                    className=''
                                    icon={<TbCalendarTime className='text-purple-900 absolute top-3 left-2' />}
                                    onChange={setDuration}
                                    placeholder={'Duration e.g. 2013 - 2016'}
                                    name={'duration'}
                                    value={duration} />

                                <h4
                                    className='text-white mt-8 relative mb-4'>
                                    Duties
                                    <TbPlus
                                        onClick={addDuty}
                                        className='text-purple-400 absolute top-1 left-[65px] cursor-pointer hover:scale-150' />
                                </h4>
                                {
                                    duties.map((duty, index) => {
                                        return <div
                                            key={index}
                                            className='relative'>
                                            <TbBrandFlightradar24
                                                className='text-purple-900 absolute top-3 left-2' />
                                            <TbTrashFilled
                                                onClick={(index) => handleDeleteDuty(index)}
                                                className='text-purple-400 absolute top-3 right-[-25px] cursor-pointer hover:scale-150' />
                                            <input
                                                onChange={
                                                    (e) => {
                                                        duties[index] = e.target.value
                                                    }
                                                }
                                                className='mb-4 bg-gray-100 border border-opacity-30 outline-none border-purple-950 text-gray-900 text-sm rounded-lg block w-full p-2 pl-8 dark:placeholder-gray-400'
                                                type="text"
                                                name='duty'
                                                placeholder='Duty'
                                                defaultValue={duty}
                                            />
                                        </div>
                                    })
                                }

                                <button
                                    onClick={handleSubmit}
                                    className='w-full bg-purple-700 text-white p-2 mt-8 hover:bg-purple-900 font-bold rounded cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed'
                                >
                                    Submit Experience
                                </button>
                            </form>
                        </div>
                    </div>
            }

        </>
    )
}

export default AddExperienceForm
