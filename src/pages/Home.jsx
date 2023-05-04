import React from 'react'
import template1 from '../images/template-1.jpeg';
import template2 from '../images/template-2.jpg';
import template3 from '../images/template-3.jpeg';
import Template from '../components/Template';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <>
            <div className='py-8'>
                <h2 className='text-center mt-6 text-3xl text-white '>Choose a template</h2>
                <div className='max-w-[1000px] mx-auto md:p-12 p-4'>
                    <div className='flex justify-center flex-wrap gap-x-8 gap-y-8'>
                    <Link to='/template1'> <Template title='Template 1' templateImage={template1} available={true} /> </Link>
                        <Template title='Template 2' templateImage={template2} available={false} />
                        <Template title='Template 3' templateImage={template3} available={false} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
