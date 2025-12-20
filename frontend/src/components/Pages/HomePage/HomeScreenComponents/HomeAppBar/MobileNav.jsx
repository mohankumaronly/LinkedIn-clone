import NavItem from "./NavItem";
import { NAV_ITEMS } from "./navItems";

const MobileNav = () => {
  return (
    <div className="md:hidden">
      <div className="flex justify-center overflow-x-auto px-2 py-2 space-x-4 scrollbar-hide">
        {NAV_ITEMS.map(({ label, icon, path }) => (
          <NavItem
            key={label}
            icon={icon}
            label={label}
            path={path}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
