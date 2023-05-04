import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import Loader from '../Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { } from 'react-icons/bs'
import DeleteIcon from './DeleteIcon';
import EditEducationForm from './educationEdit/EditEducationForm';
import EditIconClick from './educationEdit/EditIconClick';
import { Link, useNavigate } from 'react-router-dom';

const Education = () => {

    const { user } = UserAuth()
    const [education, setEducation] = useState([])
    const [isLoading, setIsLoading] = useState(true)



    let candidateRef = ''
    if (user?.email) {
        candidateRef = doc(db, "users", user?.email)
    }

    const getCandidateInfo = async () => {
        const docRef = doc(db, 'users', `${user?.email}`)
        const docSnap = await getDoc(docRef)
        setEducation(docSnap.data()?.education)
        setIsLoading(false)
    }

    const deleteEducationItem = async (textInItem, itemPosition) => {
        education.splice(itemPosition, 1)
        await updateEducation(education)
    }

    const updateEducation = async (updatedEducation) => {
        setIsLoading(true)
        updateDoc(candidateRef, {
            'education': updatedEducation
        }).then(async () => {
            await getCandidateInfo()
            const notify = () => toast.success('Education updated');
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
                    : education?.map((educationItem, index) => {
                        return <div
                            key={index}
                            className="mb-2 relative group cursor-pointer">
                            <DeleteIcon deleteFunction={deleteEducationItem} itemToDelete={'education'} itemPosition={index} />
                            <div
                                className='section-subtitle'>
                                <p
                                    className='text-sm font-semibold uppercase'>
                                    {educationItem?.certificate}
                                </p>
                            </div>
                            <div
                                className="section-body text-sm">
                                <div
                                    className='max-w-[300px] relative'>
                                    <Link
                                        to="/template1/edit-education"
                                        state={{ itemPosition: index }} >
                                        <EditIconClick
                                            itemPosition={index} />
                                    </Link>
                                    <p
                                        className='capitalize'>{educationItem?.school}
                                    </p>
                                    <p className='font-bold'>{educationItem?.duration}
                                    </p>
                                </div>
                            </div>
                        </div>
                    })

            }
            {/* <EditEducationForm /> */}
        </>
    )
}

export default Education
