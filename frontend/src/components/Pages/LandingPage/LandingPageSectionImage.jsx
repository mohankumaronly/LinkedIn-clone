import React from "react";
import LandingPageImageOne from "../../../assets/LandingPageImageOne.png";

const LandingPageSectionImage = () => {
  return (
    <section className="w-full bg-[#F3F2F0]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 md:w-1/2 text-center">
            <h1 className="text-2xl text-[#B24020]">
              Let the right people know you’re open to work
            </h1>
            <p className="text-sm md:text-base text-gray-700">
              With the Open To Work feature, you can privately tell recruiters or publicly share
              with the LinkedIn community that you are looking for new job opportunities.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={LandingPageImageOne}
              alt="Open to work illustration"
              className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default LandingPageSectionImage;
