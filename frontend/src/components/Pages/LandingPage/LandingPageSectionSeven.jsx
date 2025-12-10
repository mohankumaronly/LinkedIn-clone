import svg1 from '../../../assets/LadingPageSvg1.svg'
import svg2 from '../../../assets/LadingPageSvg2.svg'

const LandingPageSectionSeven = () => {
    return (
        <div>
            <div className='
                flex flex-col md:flex-row 
                items-center justify-around 
                py-5 
                gap-10 md:gap-0
            '>

                {/* Left Section */}
                <div className='space-y-10 text-center md:text-left'>
                    <img 
                        src={svg2}
                        alt="placeholderSvg"
                        className="mx-auto md:mx-0 w-48 md:w-auto"
                    />

                    <h1 className='text-3xl'>
                        Connect with people who can 
                        <span className="hidden md:inline"><br /></span>
                        help
                    </h1>

                    <div className='border w-fit px-4 py-3 rounded-4xl hover:bg-gray-200 cursor-pointer mx-auto md:mx-0'>
                        <h1>Find people you know</h1>
                    </div>
                </div>

                {/* Right Section */}
                <div className='space-y-10 text-center md:text-left'>
                    <img 
                        src={svg1}
                        alt="placeholderSvg"
                        className="mx-auto md:mx-0 w-48 md:w-auto"
                    />

                    <h1 className='text-3xl'>
                        Learn the skills you need to 
                        <span className="hidden md:inline"><br /></span>
                        succeed
                    </h1>

                    <div className='border w-fit px-4 py-3 rounded-4xl hover:bg-gray-200 cursor-pointer mx-auto md:mx-0'>
                        <h1>Choose a topic to learn about</h1>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LandingPageSectionSeven
