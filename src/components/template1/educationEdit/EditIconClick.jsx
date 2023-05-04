import React from 'react'
import { MdModeEditOutline } from 'react-icons/md'

const EditIconClick = () => {
    return (
        <>
            <MdModeEditOutline
                size={25} 
                className='absolute text-slate-500 right-[-8px] top-[-5px] hidden group-hover:block' />
        </>
    )
}

export default EditIconClick
