import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import Loader from '../Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillTelephoneFill, BsFillEnvelopeFill, BsFillPinFill, BsGlobe2, BsFillRecordFill } from 'react-icons/bs'
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';


const Skills = () => {

    const phoneIcon = <BsFillTelephoneFill />
    const emailIcon = <BsFillEnvelopeFill />
    const addressIcon = <BsFillPinFill />
    const websiteIcon = <BsGlobe2 />

    const { user } = UserAuth()
    const [skills, setSkills] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    let candidateRef = ''
    if (user?.email) {
        candidateRef = doc(db, "users", user?.email)
    }

    const getCandidateInfo = async () => {
        const docRef = doc(db, 'users', `${user?.email}`)
        const docSnap = await getDoc(docRef)
        setSkills(docSnap.data()?.skills)
        // console.log(docSnap.data()?.skills)
        setIsLoading(false)
    }

    const deleteSkillItem = async (textInItem) => {
        skills.forEach((skill, index) => {
            if (textInItem === skill) {
                skills.splice(index, 1)
            }
        })
        await updateSkills(skills)
    }

    const updateSkills = async (updatedSkills) => {
        setIsLoading(true)
        updateDoc(candidateRef, {
            'skills': updatedSkills
        }).then(async () => {
            await getCandidateInfo()
            const notify = () => toast.success('Skills updated');
            notify()
        })
    }

    const handleSkillItemChange = async (updatedSkillItemText, itemKey) => {
        skills[itemKey] = updatedSkillItemText
        await updateSkills(skills)
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
                    : skills?.map((skill, index) => {
                        return <div
                            key={index}
                            className="contact-item flex mb-2 items-center space-x-2 relative group cursor-pointer">
                            <BsFillRecordFill size={10} />
                            <p
                                onBlur={async (e) => await handleSkillItemChange(e.target.textContent, index)}
                                contentEditable={true} className='relative'>
                                {skill}
                                <EditIcon />
                            </p>
                            <DeleteIcon deleteFunction={deleteSkillItem} itemToDelete={'skill'} />
                        </div>
                    })
            }
        </>
    )
}

export default Skills
