import React from "react";
import { assets, cities } from "../../assets/assets.js";

const Hero = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${assets.heroImg})` }}
        className={`flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center h-screen`}
      >
        <p className="bg-[#49B9FF]/50 px-3.5 py-1 max-sm:mt-28 rounded-full">
          The Ultimate Hotel Experience
        </p>
        <h2 className="text-2xl md:text-5xl md:font-extrabold max-w-xl mt-4 mb-3">
          Discover Your Perfect Getaway Destination
        </h2>
        <p className="text-sm md:text-base max-w-130">
          Unparalleled luxury and comfort await at the world's most exclusive
          hotels and resorts. Start your journey today.
        </p>
        <form className="bg-white my-5 mb-10 text-gray-500 rounded-lg px-6 py-4  flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto">
          <div>
            <div className="flex items-center gap-2">
              <img src={assets.locationIcon} alt="" />
              <label htmlFor="destinationInput">Destination</label>
            </div>
            <input
              list="destinations"
              id="destinationInput"
              type="text"
              className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              placeholder="Type here"
              required
            />
            <datalist id="destinations">
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </datalist>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <img src={assets.calenderIcon} alt="" />
              <label htmlFor="checkIn">Check in</label>
            </div>
            <input
              id="checkIn"
              type="date"
              className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <img src={assets.calenderIcon} alt="" />
              <label htmlFor="checkOut">Check out</label>
            </div>
            <input
              id="checkOut"
              type="date"
              className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            />
          </div>

          <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
            <label htmlFor="guests">Guests</label>
            <input
              min={1}
              max={4}
              id="guests"
              type="number"
              className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
              placeholder="0"
            />
          </div>

          <button className="flex items-center justify-center gap-1 rounded-md bg-black py-2 px-4 text-white cursor-pointer mt-auto max-md:w-full max-md:py-1">
            <img src={assets.searchIcon} alt="" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Hero;
