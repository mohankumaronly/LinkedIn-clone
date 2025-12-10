import React from "react";
import LandingPageAppBar from "./LandingPageAppBar";
import LandingPageHero from "./LandingPageHero";
import LandingPageOne from "./LandingPageOne";

const LandingPage = () => {
  return (
    <div className="px-2 sm:px-4 md:px-10 py-5">
      <LandingPageAppBar />

      <main className="max-w-7xl mx-auto mt-6">
        < LandingPageHero />
        < LandingPageOne />
      </main>
    </div>
  );
};

export default LandingPage;
