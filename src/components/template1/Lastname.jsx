import React, { useEffect, useState } from 'react'
import EditIcon from './EditIcon'
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import Loader from '../Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Lastname = () => {
    const { user } = UserAuth()
    const [lastname, setLastname] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    let candidateRef = ''
    if (user?.email) {
        candidateRef = doc(db, "users", user?.email)
    }

    const getCandidateInfo = async () => {
        const docRef = doc(db, 'users', `${user?.email}`)
        const docSnap = await getDoc(docRef)
        setLastname(docSnap.data()?.lastname)
        setIsLoading(false)
    }

    const updateCandidateLastname = async (name) => {
        setIsLoading(true)
        updateDoc(candidateRef, {
            'lastname': name
        }).then(async () => {
            await getCandidateInfo()
            const notify = () => toast.success('Lastname updated');
            notify()
        })
    }

    useEffect(() => {
        getCandidateInfo()
        setIsLoading(true)
    }, [user?.email])

    const handleLastnameChange = async (name) => {
        if (name === '' || lastname === name) {
            console.log('empty')
        } else {
            await updateCandidateLastname(name)
        }
    }

    return (
        <>
            <h3
                onBlur={(e) => handleLastnameChange(e.target.textContent)}
                contentEditable={true}
                className='font-semibold relative group cursor-pointer'>
                {isLoading
                    ? <Loader />
                    : lastname}
                <EditIcon />
            </h3>
        </>
    )
}

export default Lastname
