import { ChevronDown } from "lucide-react";
import NavItem from "./NavItem";
import { NAV_ITEMS } from "./navItems";
import ProfileModel from "./ProfileModel";

const DesktopNav = ({ showProfile, setShowProfile, user }) => {
  return (
    <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
      {NAV_ITEMS.map(({ label, icon, path }) => (
        <NavItem
          key={label}
          icon={icon}
          label={label}
          path={path}
        />
      ))}

      {/* Profile */}
      <div className="relative">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowProfile((prev) => !prev);
          }}
        >
          <div className="bg-gray-400 rounded-full h-6 w-6" />
          <div className="flex items-center text-xs mt-1">
            <span>Me</span>
            <ChevronDown className="w-3 h-3 ml-1" />
          </div>
        </div>

        {showProfile && <ProfileModel user={user} />}
      </div>
    </div>
  );
};

export default DesktopNav;
