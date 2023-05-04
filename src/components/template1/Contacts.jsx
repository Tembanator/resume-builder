import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import Loader from '../Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillTelephoneFill, BsFillEnvelopeFill, BsFillPinFill, BsGlobe2} from 'react-icons/bs'
import ContactItem from './ContactItem';


const Contacts = () => {

    const phoneIcon = <BsFillTelephoneFill />
    const emailIcon = <BsFillEnvelopeFill />
    const addressIcon = <BsFillPinFill />
    const websiteIcon = <BsGlobe2 />

    const { user } = UserAuth()
    const [contacts, setContacts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    let candidateRef = ''
    if (user?.email) {
        candidateRef = doc(db, "users", user?.email)
    }

    const getCandidateInfo = async () => {
        const docRef = doc(db, 'users', `${user?.email}`)
        const docSnap = await getDoc(docRef)
        setContacts(docSnap.data()?.contact)
        console.log(docSnap.data()?.contact)
        setIsLoading(false)
    }

    const deleteItem = async (textInItem) => {
        contacts.forEach(contact => {
            let values = Object.values(contact)
            let keys = Object.keys(contact)
            // values
            if (values.includes(textInItem)) {
                contact[keys[0]] = ''
            }
        })
        await updateContacts(contacts)
    }

    const updateContacts = async (updatedContacts) => {
        setIsLoading(true)
        updateDoc(candidateRef, {
            'contact': updatedContacts
        }).then(async () => {
            await getCandidateInfo()
            const notify = () => toast.success('Contacts updated');
            notify()
        })
    }
    
    const handleContactItemChange = async (updatedContactItem, itemKey) => {
        contacts.forEach(contact => {
            let keys = Object.keys(contact)
            // values
            if (keys[0] == itemKey) {
                contact[keys[0]] = updatedContactItem
            }
        })
        await updateContacts(contacts)
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
                    : contacts?.map((item, index) => {
                        if (item.phone) {
                            return <ContactItem id={index} icon={phoneIcon} contactInfo={item?.phone} key={index} itemKey={'phone'} deleteItem={deleteItem} itemToDelete={'contact'}  handleContactItemChange={handleContactItemChange} />
                        }
                        if (item.email) {
                            return <ContactItem id={index} icon={emailIcon} contactInfo={item?.email} key={index} itemKey={'email'} deleteItem={deleteItem} itemToDelete={'contact'}  handleContactItemChange={handleContactItemChange} />
                        }
                        if (item.address) {
                            return <ContactItem id={index} icon={addressIcon} contactInfo={item?.address} key={index} itemKey={'address'} deleteFunction={deleteItem} itemToDelete={'contact'} handleContactItemChange={handleContactItemChange} />
                        }
                        if (item.website) {
                            return <ContactItem id={index} icon={websiteIcon} contactInfo={item?.website} key={index} itemKey={'website'} deleteFunction={deleteItem} itemToDelete={'contact'} handleContactItemChange={handleContactItemChange} />
                        }
                    })
            }
        </>
    )
}

export default Contacts
