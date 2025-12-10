import React from "react";

const LandingPageSection = ({ heading, paragraph, textButtons, color }) => {
  return (
    <section className="w-full py-8" style={{ backgroundColor: color }}>
      <div className="w-full max-w-7xl mx-auto px-3">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">

          <div className="md:w-1/2">
            <h1 className="text-3xl">{heading}</h1>
            <p className="mt-3 text-sm md:text-base">{paragraph}</p>
          </div>

          <div className="md:w-1/2">
            <div className="flex flex-wrap gap-3">
              {textButtons?.map((item, index) => (
                <BorderTextButton key={index} text={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const BorderTextButton = ({ text }) => {
  return (
    <button className="border px-4 py-3 rounded-3xl whitespace-nowrap hover:bg-gray-200 cursor-pointer">
      {text}
    </button>
  );
};

export default LandingPageSection;
