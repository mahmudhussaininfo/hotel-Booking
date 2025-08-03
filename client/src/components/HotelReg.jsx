import React, { useContext, useState } from "react";
import { assets, cities } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-hot-toast";
import axios from "axios";

const HotelReg = () => {
  const { setShowModal, getToken, setIsOwner, BaseURL } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  // handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${BaseURL}/hotel/hotel-create`,
        { name, city, address, contact },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      console.log(data);

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowModal(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-100 flex items-center justify-center bg-black/80">
        <form
          onSubmit={handleSubmit}
          className="flex bg-white rounded-xl max-w-4xl max-md:mx-2"
        >
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
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Type Here"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Phone</label>
                <input
                  className="border p-2 border-gray-300 rounded-md outline-none"
                  type="text"
                  id="name"
                  name="contact"
                  onChange={(e) => setContact(e.target.value)}
                  value={contact}
                  placeholder="Your Phone Number"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Address</label>
                <input
                  className="border p-2 border-gray-300 rounded-md outline-none"
                  type="text"
                  id="name"
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  placeholder="Your Address"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="name">City</label>
                <select
                  className="border cursor-pointer p-2 appearance-none bg-transparent border-gray-300 rounded-md outline-none"
                  name="city"
                  id=""
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
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
