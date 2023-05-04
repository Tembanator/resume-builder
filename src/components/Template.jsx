import React from 'react'

const Template = ({ title, templateImage, available }) => {
    return (
        <>
            <div className=''>
                <h3 className='text-white text-xl'>{title}</h3>
                <div className='max-w-[250px] h-auto max-h-[300px] border-4 border-gray-100 shadow-lg hover:border-purple-500 cursor-pointer rounded overflow-hidden relative'>
                    <img className='w-full object-cover' src={templateImage} alt={templateImage} />
                    {!available &&
                        <div className='absolute left-0 top-0 w-full h-full flex justify-center items-center group'>
                            <div className='bg-purple-800 opacity-75 w-full h-full hidden group-hover:block'>
                            </div>
                            <p className='absolute text-purple-800 font-bold text-sm sm:text-2xl border bg-white p-2 rounded hidden group-hover:block bg-opacity-75'>Coming soon</p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Template
