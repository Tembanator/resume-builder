import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import Loader from '../Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillRecordFill } from 'react-icons/bs'
import DeleteIcon from './DeleteIcon';
import { Link } from 'react-router-dom';
import EditIconClick from './educationEdit/EditIconClick';

const Experience = () => {

    const { user } = UserAuth()
    const [experience, setExperience] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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

    const deleteExperienceItem = async (textInItem, itemPosition) => {
        experience.splice(itemPosition, 1)
        await updateExperience(experience)
    }

    const updateExperience = async (updatedExperience) => {
        setIsLoading(true)
        updateDoc(candidateRef, {
            'experience': updatedExperience
        }).then(async () => {
            await getCandidateInfo()
            const notify = () => toast.success('Experience updated');
            notify()
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
                    : experience?.map((experienceItem, index) => {
                        return <div
                            key={index}
                            className="pb-5 relative group cursor-pointer">
                            <DeleteIcon deleteFunction={deleteExperienceItem} itemToDelete={'experience'} itemPosition={index} />
                            <div
                                className='section-subtitle'>
                                <p
                                    className='text-xs font-extrabold uppercase'>
                                    {experienceItem?.jobTitle}
                                </p>
                            </div>
                            <div className="section-body text-sm">
                                <div className='max-w-[300px] relative'>
                                    <Link
                                        to="/template1/edit-experience"
                                        state={{ itemPosition: index }} >
                                        <EditIconClick
                                            itemPosition={index} />
                                    </Link>
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
        </>
    )
}

export default Experience
