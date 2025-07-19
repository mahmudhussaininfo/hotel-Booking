import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets.js";

const Sidebar = () => {
  const sidebar = [
    {
      name: "Dashboard",
      path: "/owner",
      icon: assets.dashboardIcon,
    },
    {
      name: "Add Rooms",
      path: "/owner/add-room",
      icon: assets.addIcon,
    },
    {
      name: "List Room",
      path: "/owner/list-room",
      icon: assets.listIcon,
    },
  ];
  return (
    <>
      <div className="md:w-64 w-16 border-r h-full border-gray-300 flex flex-col transition-all duration-300">
        {sidebar.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            end="/owner"
            className={({ isActive }) =>
              `flex items-center py-3 px-4 gap-2 md:px-8 ${
                isActive
                  ? "bg-blue-400/50 border-r-4 border-blue-400"
                  : "hover:bg-gray-200 text-gray-700 dark:text-gray-300 dark:hover:text-gray-500"
              }`
            }
          >
            <img src={item.icon} className="min-w-6 min-h-6" />
            <p className="hidden md:block text-center">{item.name}</p>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
