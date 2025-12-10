import React from 'react'
import { ChevronRight } from 'lucide-react';
import LandingPageSectionImage from '../../../assets/LandingPageSectionEightImage.jpg'

const LandingPageSectionEight = () => {
    return (
        <div>
            <div className="flex flex-col md:flex-row py-20 md:space-x-10 gap-6 md:gap-0 items-center">

                <div className="bg-[#F3F2F0] space-y-6 flex flex-col justify-center w-full md:w-1/2 items-center px-6 py-40 text-center">

                    <div className="space-y-2">
                        <h1 className="text-[#B24020] text-3xl">Who is LinkedIn for?</h1>
                        <h3 className="text-lg">Anyone looking to navigate their professional life.</h3>
                    </div>

                    <div className="space-y-5 w-full md:w-auto flex flex-col items-center">
                        <div className="bg-[#E1DAD0] w-full md:w-[400px] px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-300">
                            <h1>Find a coworker or classmate</h1>
                            <ChevronRight size={30} className="text-gray-500" />
                        </div>

                        <div className="bg-[#E1DAD0] w-full md:w-[400px] px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-300">
                            <h1>Find a new job</h1>
                            <ChevronRight size={30} className="text-gray-500" />
                        </div>

                        <div className="bg-[#E1DAD0] w-full md:w-[400px] px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-300">
                            <h1>Find a course or training</h1>
                            <ChevronRight size={30} className="text-gray-500" />
                        </div>
                    </div>

                </div>

                <div className="w-full md:w-1/2 hidden md:block">
                    <img
                        src={LandingPageSectionImage}
                        alt="placeHolderImage"
                        className="w-full h-auto object-cover"
                    />
                </div>

            </div>
        </div>
    )
}

export default LandingPageSectionEight
