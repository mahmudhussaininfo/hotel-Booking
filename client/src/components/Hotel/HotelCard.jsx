import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets.js";

const HotelCard = ({ room, index }) => {
  return (
    <>
      <Link
        to={`/rooms/${room._id}`}
        onClick={() => scrollTo(0, 0)}
        className="relative group bg-white shadow-md dark:shadow-gray-800 dark:bg-gray-900"
      >
        <img className="rounded-md" src={room.images[0]} alt="" />

        {index % 2 === 0 && (
          <p className="absolute top-3 rounded-full left-2 bg-black text-white px-2 py-1">
            Best Seller
          </p>
        )}
        <div className="p-4 pt-5">
          <div className="flex items-center justify-between">
            <p className="">{room.hotel.name}</p>
            <div className="flex items-center gap-1 ">
              <img src={assets.starIconFilled} alt="" />
              <span className="">4.5</span>
            </div>
          </div>
          <div>
            <img src={assets.locationIcon} alt="" />
            <span className="">{room.hotel.address}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-600">
              <span className="font-bold text-2xl dark:text-white">
                ${room.pricePerNight}
              </span>
              / night
            </p>
            <button className="bg-white text-black border border-gray-400 px-3.5 py-1 rounded-full hover:bg-black hover:text-white transition duration-300 cursor-pointer">
              Book Now
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default HotelCard;
