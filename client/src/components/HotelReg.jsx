import React, { useContext } from "react";
import { assets, cities } from "../assets/assets.js";
import { ThemeContext } from "../context/ThemeContext.jsx";

const HotelReg = () => {
  const { setShowModal } = useContext(ThemeContext);
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-100 flex items-center justify-center bg-black/80">
        <form className="flex bg-white rounded-xl max-w-4xl max-md:mx-2">
          <img src={assets.regImage} className="w-1/2 hidden md:block" />
          <div className="flex flex-col items-center relative md:w-1/2 p-8 md:p-10">
            <img
              onClick={() => setShowModal(false)}
              src={assets.closeIcon}
              className="absolute top-5 right-5 cursor-pointer"
              alt=""
            />
            <p>Register Your Hotel</p>
            <div className="flex flex-col gap-2 w-full pt-5">
              <div className="flex flex-col gap-1">
                {" "}
                <label htmlFor="name">Hotel Name</label>
                <input
                  className="border p-2 border-gray-300 rounded-md outline-none"
                  type="text"
                  id="name"
                  placeholder="Type Here"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Phone</label>
                <input
                  className="border p-2 border-gray-300 rounded-md outline-none"
                  type="text"
                  id="name"
                  placeholder="Your Phone Number"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Address</label>
                <input
                  className="border p-2 border-gray-300 rounded-md outline-none"
                  type="text"
                  id="name"
                  placeholder="Your Address"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="name">City</label>
                <select
                  className="border p-2 border-gray-300 rounded-md outline-none"
                  name=""
                  id=""
                >
                  {cities.map((city, index) => (
                    <option
                      className="border p-2 border-gray-300 rounded-md outline-none"
                      key={index}
                      value={city}
                    >
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2">
                <button
                  className="bg-[#49B9FF] text-white cursor-pointer w-full px-5 py-2 rounded-md"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default HotelReg;
