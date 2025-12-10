import LandingPageAppBar from "./LandingPageAppBar";
import LandingPageHero from "./LandingPageHero";
import LandingPageSectionOne from "./LandingPageSectionOne";
import LandingPageSectionTwo from "./LandingPageSectionTwo";
import LandingPageSectionThree from "./LandingPageSectionThree";
import LandingPageSectionFour from "./LandingPageSectionFour";
import LandingPageSectionFive from "./LandingPageSectionFive";
import LandingPageSectionImage from "./LandingPageSectionImage";
import LandingPageSectionSeven from "./LandingPageSectionSeven";
import LandingPageSectionEight from "./LandingPageSectionEight";
import LandingPageSectionNine from "./LandingPageSectionNine";
import LandingPageSectionTen from "./LandingPageSectionTen";
import LandingPageFooter from "./LandingPageFooter";

const LandingPage = () => {
  return (
    <div className="py-5 sm:px-3">
      <LandingPageAppBar />
      <main className="max-w-7xl mx-auto mt-6">
        <LandingPageHero />
      </main>
      < LandingPageSectionOne />
      < LandingPageSectionTwo />
      < LandingPageSectionThree />
      < LandingPageSectionFour />
      < LandingPageSectionFive />
      < LandingPageSectionImage />
      <div className="max-w-7xl mx-auto mt-6">
        < LandingPageSectionSeven />
      </div>
      < LandingPageSectionEight />
      < LandingPageSectionNine />
      < LandingPageSectionTen />
      < LandingPageFooter />

    </div>
  );
};

export default LandingPage;
