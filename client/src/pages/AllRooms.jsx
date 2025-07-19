import React, { useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import Title from "../components/Title.jsx";
import { facilityIcons, roomsDummyData } from "../assets/assets.js";
import Rating from "../components/Rating.jsx";
import { useNavigate } from "react-router-dom";

const AllRooms = () => {
  const navigate = useNavigate();

  const [filterShow, setFilterShow] = useState(false);

  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);

  const handleRoomTypeChange = (checked, label) => {
    if (checked) {
      setSelectedRoomTypes((prev) => [...prev, label]);
    } else {
      setSelectedRoomTypes((prev) => prev.filter((item) => item !== label));
    }
  };

  const Checkbox = ({ label }) => {
    return (
      <div className="flex cursor-pointer mt-2 text-sm items-center gap-2">
        <input type="checkbox" />
        <label className="text-sm">{label}</label>
      </div>
    );
  };
  const RadioButton = ({ label, selected = false, onchange = () => {} }) => {
    return (
      <div className="flex cursor-pointer mt-2 text-sm items-center gap-2">
        <input
          type="radio"
          checked={selected}
          onChange={() => onchange(label)}
          className="w-4 h-4"
        />
        <label className="text-sm">{label}</label>
      </div>
    );
  };
  const roomTypes = ["single Bed", "double Bed", "triple Bed", "Luxury Room"];
  const price = [
    "1500 to 2000",
    "2000 to 3000",
    "3000 to 4000",
    "4000 to 5000",
  ];
  const sort = [
    "Price: Low to High",
    "Price: High to Low",
    "Rating: High to Low  ",
  ];

  return (
    <>
      <Layout>
        <div className="dark:bg-[#12141D] dark:text-white">
          {" "}
          <div className="container mx-auto max-sm:px-5 md:pt-35 pt-20">
            <Title
              align="left"
              title="Hotel Rooms"
              subtitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
            />
          </div>
          <div className="flex flex-col-reverse lg:flex-row items-start justify-between container mx-auto max-sm:px-5">
            <div>
              <div>
                {/* room cards */}
                {roomsDummyData.map((room) => (
                  <div
                    key={room._id}
                    className="flex flex-col md:flex-row gap-4 mb-6 max-sm:px-5 py-10 border-b border-gray-300 last:border-0"
                  >
                    <img
                      onClick={() => {
                        navigate(`/rooms/${room._id}`);
                        scrollTo(0, 0);
                      }}
                      className="rounded-md cursor-pointer w-full md:w-96 max-h-65 object-cover"
                      src={room.images[0]}
                      alt=""
                    />

                    <div>
                      <p>{room.hotel.city}</p>
                      <p className="text-3xl">{room.hotel.name}</p>
                      <div className="flex items-center gap-1">
                        <Rating />
                        <span>200+ reviews</span>
                      </div>
                      <p>{room.hotel.address}</p>
                      <div className="flex items-center gap-3">
                        {room.amenities.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 mt-3 bg-gray-100 p-3 rounded"
                          >
                            <img
                              className="w-4 h-4"
                              src={facilityIcons[item]}
                              alt=""
                            />
                            <span className="text-sm dark:text-black">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xl font-semibold mt-3">
                        ${room.pricePerNight} / Day
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* filters */}
            <div className="w-full lg:w-80 max-sm:px-5 max-sm:mb-10 border border-gray-300 rounded-lg py-3">
              <div
                className={`flex items-center px-5 justify-between py-2.5 min-lg:border-b border-gray-300 ${
                  filterShow && "border-b"
                }`}
              >
                <p>Filter</p>
                <div>
                  <span
                    className="lg:hidden"
                    onClick={() => setFilterShow(!filterShow)}
                  >
                    {filterShow ? "Hide" : "Show"}
                  </span>
                  <span className="hidden lg:block">Clear</span>
                </div>
              </div>
              <div
                className={`${
                  filterShow ? "h-auto" : "h-0 lg:h-auto"
                } overflow-hidden transition-all duration-300`}
              >
                <div className="px-5 pt-5">
                  <p>Popular Filters</p>
                  {roomTypes.map((item, index) => (
                    <Checkbox
                      key={index}
                      label={item}
                      onChange={handleRoomTypeChange}
                      selected={selectedRoomTypes.includes(item)}
                    />
                  ))}
                </div>
                <div className="px-5 pt-5">
                  <p>Price Range</p>
                  {price.map((item, index) => (
                    <Checkbox key={index} label={item} />
                  ))}
                </div>
                <div className="px-5 py-5">
                  <p>Sort By</p>
                  {sort.map((item, index) => (
                    <RadioButton key={index} label={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Show More Button */}
          <div className="flex justify-center py-10">
            <button className="bg-blue-700 px-4 py-2 text-white">
              Show More
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AllRooms;
