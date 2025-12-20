import { Search } from "lucide-react";
import LinkedInLogo from "../../../../../assets/LinkedIn.svg";

const LogoSearch = () => {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3 w-full md:w-auto">
      <img
        src={LinkedInLogo}
        alt="LinkedIn"
        className="w-7 h-7 sm:w-8 sm:h-8"
      />

      <div className="flex items-center border border-gray-400 rounded-full px-2 sm:px-3 bg-gray-100 w-full md:w-auto">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="px-2 py-1 w-full md:w-56 lg:w-60 outline-none border-none bg-transparent placeholder:text-xs sm:placeholder:text-sm"
        />
      </div>
    </div>
  );
};

export default LogoSearch;
