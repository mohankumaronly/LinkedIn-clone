import SVGlogo from "../../../assets/LinkedIn.svg";
import {
  Newspaper,
  BookOpenText,
  Users,
  BriefcaseBusiness,
  Puzzle,
} from "lucide-react";

const LandingPageAppBar = () => {
  return (
    <header className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-16 z-10 bg-white">
          <div className="flex items-center gap-2 shrink-0">
            <h1 className="hidden md:block font-semibold text-xl md:text-2xl text-[#0A66C2] leading-none">
              Linked
            </h1>
            <img
              src={SVGlogo}
              alt="logo"
              className="h-8 w-8 md:h-7 md:w-7"
            />
          </div>
          <div className="hidden md:flex gap-x-10 items-center">
            <div className="flex items-center justify-center flex-col">
              <Newspaper />
              <h1 className="text-sm">Articles</h1>
            </div>
            <div className="flex items-center justify-center flex-col">
              <Users />
              <h1 className="text-sm">Peoples</h1>
            </div>
            <div className="flex items-center justify-center flex-col">
              <BookOpenText />
              <h1 className="text-sm">Learning</h1>
            </div>
            <div className="flex items-center justify-center flex-col">
              <BriefcaseBusiness />
              <h1 className="text-sm">Jobs</h1>
            </div>
            <div className="flex items-center justify-center flex-col">
              <Puzzle />
              <h1 className="text-sm">Puzzle</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              className="border border-[#0A66C2] text-[#0A66C2] rounded-full font-medium px-5 py-2.5 text-sm sm:text-base"
              aria-label="Login"
            >
              Login
            </button>

            <button
              className="bg-[#0A66C2] text-white rounded-full font-semibold px-5 py-2.5 text-sm sm:text-base"
              aria-label="Create an account"
            >
              Create an account
            </button>
          </div>
        </div>
        <div className="mt-3 md:mt-3" />
        <nav className="md:hidden" aria-label="Mobile nav icons">
          <div
            className="flex items-center gap-4 overflow-x-auto no-scrollbar px-1 py-2 justify-center snap-x snap-mandatory
            "
          >
            <MobileIcon Icon={Newspaper} label="Articles" />
            <MobileIcon Icon={Users} label="Peoples" />
            <MobileIcon Icon={BookOpenText} label="Learning" />
            <MobileIcon Icon={BriefcaseBusiness} label="Jobs" />
            <MobileIcon Icon={Puzzle} label="Puzzle" />
          </div>
        </nav>
      </div>
    </header>
  );
}

function MobileIcon({ Icon, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="
        flex flex-col items-center justify-center min-w-[70px] max-w-[70px] px-3 py-2 rounded-md hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A66C2]
      "
    >
      <Icon size={22} />
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}

export default LandingPageAppBar;
