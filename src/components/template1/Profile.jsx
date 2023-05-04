import React, { useEffect, useState } from 'react'
import EditIcon from './EditIcon'
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import Loader from '../Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const { user } = UserAuth()
    const [profile, setProfile] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    let candidateRef = ''
    if (user?.email) {
        candidateRef = doc(db, "users", user?.email)
    }

    const getCandidateInfo = async () => {
        const docRef = doc(db, 'users', `${user?.email}`)
        const docSnap = await getDoc(docRef)
        setProfile(docSnap.data()?.profile)
        setIsLoading(false)
    }

    const updateCandidateName = async (name) => {
        setIsLoading(true)
        updateDoc(candidateRef, {
            'profile': name
        }).then(async () => {
            await getCandidateInfo()
            const notify = () => toast.success('Profile updated');
            notify()
        })
    }

    useEffect(() => {
        getCandidateInfo()
        setIsLoading(true)
    }, [user?.email])

    const handleNameChange = async (name) => {
        if (name === '' || profile === name) {
            console.log('empty')
        } else {
            await updateCandidateName(name)
        }
    }

    return (
        <>
            <div
                onBlur={(e) => handleNameChange(e.target.textContent)}
                contentEditable={true}
                className='max-w-[300px] text-justify relative group cursor-pointer'>
                {isLoading
                    ? <Loader />
                    : profile}
                <EditIcon />
            </div>
        </>
    )
}

export default Profile
