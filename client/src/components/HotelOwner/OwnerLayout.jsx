import React from "react";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";

const OwnerLayout = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerLayout;
