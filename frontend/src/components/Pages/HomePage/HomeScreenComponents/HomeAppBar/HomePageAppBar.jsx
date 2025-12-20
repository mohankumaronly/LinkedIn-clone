import { useEffect, useState } from "react";
import LogoSearch from "./LogoSearch";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const HomePageAppBar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [showProfile, setShowProfile] = useState(false);

  const user = {
    name: "Mohan Kumar",
    bio: "Full Stack Developer",
  };

  useEffect(() => {
    const close = () => setShowProfile(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <header className="bg-white sticky top-0 z-50 mb-4">
      <div className="px-3 sm:px-4 py-2 md:py-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:h-14 max-w-7xl mx-auto">
          <LogoSearch />
          <DesktopNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showProfile={showProfile}
            setShowProfile={setShowProfile}
            user={user}
          />
        </div>
      </div>

      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </header>
  );
};

export default HomePageAppBar;
