import React, { useEffect, useState } from 'react'
import EditIcon from './EditIcon'
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import Loader from '../Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Firstname = () => {
    const { user } = UserAuth()
    const [firstname, setFirstname] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    let candidateRef = ''
    if (user?.email) {
        candidateRef = doc(db, "users", user?.email)
    }

    const getCandidateInfo = async () => {
        const docRef = doc(db, 'users', `${user?.email}`)
        const docSnap = await getDoc(docRef)
        setFirstname(docSnap.data()?.firstname)
        setIsLoading(false)
    }

    const updateCandidateName = async (name) => {
        setIsLoading(true)
        updateDoc(candidateRef, {
            'firstname': name
        }).then(async () => {
            await getCandidateInfo()
            const notify = () => toast.success('Firstname updated');
            notify()
        })
    }

    useEffect(() => {
        getCandidateInfo()
        setIsLoading(true)
    }, [user?.email])

    const handleNameChange = async (name) => {
        if (name === '' || firstname === name) {
            console.log('empty')
        } else {
            await updateCandidateName(name)
        }
    }

    return (
        <>
            <h3
                onBlur={(e) => handleNameChange(e.target.textContent)}
                contentEditable={true}
                className='relative group cursor-pointer'>
                {isLoading
                    ? <Loader />
                    : firstname}
                <EditIcon />
            </h3>
        </>
    )
}

export default Firstname
