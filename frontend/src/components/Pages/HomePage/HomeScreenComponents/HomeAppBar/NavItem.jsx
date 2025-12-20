import { NavLink } from "react-router-dom";

const NavItem = ({ icon: Icon, label, path }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center min-w-16 sm:min-w-[72px] cursor-pointer
        ${isActive ? "text-black" : "text-gray-600"}`
      }
    >
      {({ isActive }) => (
        <>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />

          <span className="text-[10px] sm:text-xs mt-1 whitespace-nowrap">
            {label}
          </span>

          <div
            className={`mt-1 h-0.5 w-full rounded-full transition-all
              ${isActive ? "bg-black" : "bg-transparent"}
            `}
          />
        </>
      )}
    </NavLink>
  );
};

export default NavItem;
