import React, { useEffect, useState } from 'react'
import EditIcon from './EditIcon'
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import Loader from '../Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplicantJobTitle = () => {
    const { user } = UserAuth()
    const [applicantJobTitle, setApplicantJobTitle] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    let candidateRef = ''
    if (user?.email) {
        candidateRef = doc(db, "users", user?.email)
    }

    const getCandidateInfo = async () => {
        const docRef = doc(db, 'users', `${user?.email}`)
        const docSnap = await getDoc(docRef)
        setApplicantJobTitle(docSnap.data()?.applicantJobTitle)
        setIsLoading(false)
    }

    const updateCandidateJobTitle = async (jobTitle) => {
        setIsLoading(true)
        updateDoc(candidateRef, {
            'applicantJobTitle': jobTitle
        }).then(async () => {
            await getCandidateInfo()
            const notify = () => toast.success('Applicant Job Title updated');
            notify()
        })
    }

    useEffect(() => {
        getCandidateInfo()
        setIsLoading(true)
    }, [user?.email])

    const handleJobTitleChange = async (jobTitle) => {
        if (jobTitle === '' || applicantJobTitle === jobTitle) {
            console.log('empty')
        } else {
            await updateCandidateJobTitle(jobTitle)
        }
    }

    return (
        <>
            <h5
                onBlur={(e) => handleJobTitleChange(e.target.textContent)}
                contentEditable={true}
                className='tracking-widest inline-block text-sm font-semibold uppercase relative group cursor-pointer'>
                {isLoading
                    ? <Loader />
                    : applicantJobTitle}
                <EditIcon />
            </h5>
        </>
    )
}

export default ApplicantJobTitle
