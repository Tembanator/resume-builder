import React from 'react'

const Input = ({icon, onChange, placeholder, name, value}) => {
    return (
        <>
            <div className='relative'>
                {icon}
                <input
                    onChange={(e) => onChange(e.target.value)}
                    className='mb-4 bg-gray-100 border border-opacity-30 outline-none border-purple-950 text-gray-900 text-sm rounded-lg block w-full p-2 pl-8 dark:placeholder-gray-400'
                    type="text"
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    value={value} />
            </div>
        </>
    )
}

export default Input
