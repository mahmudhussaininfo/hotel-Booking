import React, { useContext, useState } from "react";
import "./App.css";
import Home from "./pages/Home.jsx";
import { ThemeContext } from "./context/ThemeContext.jsx";
import { Routes, Route } from "react-router-dom";
import AllRooms from "./pages/AllRooms.jsx";
import RoomDetails from "./components/RoomDetails.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import HotelReg from "./components/HotelReg.jsx";
import OwnerLayout from "./components/HotelOwner/OwnerLayout.jsx";
import AddRoom from "./pages/AddRoom.jsx";
import ListRoom from "./pages/ListRoom.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const { darkMode, showModal } = useContext(ThemeContext);

  return (
    <>
      {showModal && <HotelReg />}

      <div
        className={`w-full h-[100vh] ${
          darkMode ? "dark dark:bg-[#12141D] dark:text-white" : ""
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/owner" element={<OwnerLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
