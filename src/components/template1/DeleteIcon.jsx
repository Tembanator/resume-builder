import React from 'react'
import { FaTrash } from 'react-icons/fa'
const DeleteIcon = ({key, deleteFunction, itemToDelete, itemPosition}) => {
    return (
        <>
            <FaTrash onClick={(e) => {
                let textContentTarget = ''
                if (itemToDelete == 'contact') {
                    textContentTarget = e.target.parentElement.parentElement.textContent
                }
                if (itemToDelete == 'skill') {
                    textContentTarget = e.target.parentElement.parentElement.getElementsByTagName('p')[0].textContent
                }
                if (itemToDelete == 'education') {
                    textContentTarget = ''
                }
                if (itemToDelete == 'experience') {
                    textContentTarget = ''
                }
                deleteFunction(textContentTarget, itemPosition)
            }} key={key} size={20} className='absolute text-red-500 left-[-5px] top-[-5px] hidden group-hover:block' />
        </>
    )
}

export default DeleteIcon
