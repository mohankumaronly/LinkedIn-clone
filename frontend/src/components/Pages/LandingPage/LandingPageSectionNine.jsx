import React from 'react'

const LandingPageSectionNine = () => {
  return (
    <div className="relative overflow-visible">
      <div className="flex flex-col md:flex-row py-20">
        <div className="w-full md:w-1/2 flex justify-center items-center px-4 relative z-20">
          <iframe
            className="w-full md:w-[560px] h-[315px] rounded-lg md:translate-x-1/2 md:z-30"
            src="https://www.youtube.com/embed/IlYUUN8rL_Y"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <div className="bg-[#F4FAFF] w-full md:w-1/2 flex items-center justify-center py-20 md:py-0 md:h-[700px]">
          <div className="space-y-5 px-6 text-center md:text-left">
            <h1 className="text-3xl">In it to chase my dream</h1>
            <p className="text-lg">
              Check out Gayatri’s story of finding a new job on
              <br className="hidden md:block" /> LinkedIn
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LandingPageSectionNine
