import React from 'react'
import google from '../../../assets/google.svg'
import microsoft from '../../../assets/microsoft.svg'
import HeroImage from '../../../assets/HeroImage1.svg'
import { useNavigate } from 'react-router-dom'


const LandingPageHero = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="flex flex-col md:flex-row items-center md:items-start justify-around gap-8 xl:gap-16 [@media(min-width:1058px)]:gap-20 pt-20">
                <div className='space-y-5 md:w-1/2 md:my-5'>

                    <h1 className='text-4xl text-center md:text-left'>
                        Welcome to your <br />professional community
                    </h1>

                    <div className='my-10 space-y-5'>
                        <div className="flex items-center space-x-4 bg-[#0A66C2] w-[85%] mx-auto md:w-auto justify-center rounded-3xl cursor-pointer">
                            <img src={google} alt="google" className='bg-gray-50 p-2 rounded-full h-10 w-10' />
                            <h1 className='text-white'>Continue with Google</h1>
                        </div>

                        <div className="flex items-center space-x-4 border py-2 w-[85%] mx-auto md:w-auto justify-center rounded-3xl cursor-pointer">
                            <img src={microsoft} alt="microsoft" className='w-5 h-5' />
                            <h1>Continue with Microsoft</h1>
                        </div>
                        <div className="flex items-center space-x-4 border py-2 w-[85%] mx-auto md:w-auto justify-center rounded-3xl cursor-pointer" onClick={() => navigate("/login")}>
                            <h1>Sign in with email</h1>
                        </div>
                    </div>

                    <div className="mx-3 md:mx-0 my-10">
                        <p className='text-[12px] text-center md:text-left text-gray-500'>
                            By clicking Continue to join or sign in, you agree to LinkedIn’s
                            <span className='font-semibold text-[#0A66C2] cursor-pointer'>
                                {' '}User Agreement
                            </span>,
                            <span className='font-semibold text-[#0A66C2] cursor-pointer'>
                                {' '}Privacy Policy
                            </span>,
                            and
                            <span className='font-semibold text-[#0A66C2] cursor-pointer'>
                                {' '}Cookie Policy
                            </span>.
                        </p>

                        <h1 className='text-center mx-4 my-10'>
                            New to LinkedIn? <span className='text-[#0A66C2] cursor-pointer'>Join now</span>
                        </h1>
                    </div>

                </div>
                <div className='w-full md:w-auto flex justify-center'>
                    <img
                        src={HeroImage}
                        alt="heroImage"
                        className="max-w-full h-auto mt-6 md:mt-0"
                    />
                </div>

            </div>
        </div>
    )
}

export default LandingPageHero
