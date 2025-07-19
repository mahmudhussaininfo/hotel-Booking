import React from "react";
import { roomsDummyData } from "../../assets/assets.js";
import HotelCard from "./HotelCard.jsx";
import Title from "../Title.jsx";

const Feature = () => {
  return (
    <>
      <div className="dark:bg-[#12141D] dark:text-white flex flex-col items-center px-6 md:px-16 lg:px-24 py-20 bg-slate-100">
        <Title
          title="Featured Hotels"
          subtitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roomsDummyData.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>
        <button className="mt-16 bg-white text-gray-600 px-6 py-2 rounded hover:bg-black hover:text-white transition duration-300 cursor-pointer">
          View All Hotels
        </button>
      </div>
    </>
  );
};

export default Feature;
