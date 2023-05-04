import React from 'react'
import DeleteIcon from './DeleteIcon'
import EditIcon from './EditIcon'

const ContactItem = ({ icon, contactInfo, index, deleteFunction, itemToDelete, itemKey, handleContactItemChange }) => {
    return (
        <>
            <div className="contact-item flex mb-2 items-center space-x-2 relative group cursor-pointer">
                {icon}
                <p
                    onBlur={(e) => handleContactItemChange(e.target.parentElement.textContent, itemKey)}
                    contentEditable={true}
                    className='relative'>
                    {contactInfo}
                    <EditIcon key={index} />
                    <DeleteIcon key={index} deleteFunction={deleteFunction} itemToDelete={itemToDelete} />
                </p>
            </div>
        </>
    )
}

export default ContactItem
