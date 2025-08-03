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
import { Toaster } from "react-hot-toast";
import { AppContext } from "./context/AppContext.jsx";
import About from "./pages/About.jsx";
import Experience from "./pages/Experience.jsx";

function App() {
  const { darkMode } = useContext(ThemeContext);
  const { showModal } = useContext(AppContext);

  return (
    <>
      {showModal && <HotelReg />}

      <div
        className={`w-full h-[100vh] ${
          darkMode ? "dark dark:bg-[#12141D] dark:text-white" : ""
        }`}
      >
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
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
