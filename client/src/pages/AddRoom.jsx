import React, { useState } from "react";
import { assets } from "../assets/assets.js";

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [input, setInput] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Room Service": false,
      "Free WiFi": false,
      "Free Breakfast": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "amenity") {
      setInput({
        ...input,
        amenities: {
          ...input.amenities,
          [value]: checked,
        },
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  };
  return (
    <>
      <div className="mx-5 pt-5">
        <div className="container max-w-7xl">
          <h2 className="text-4xl font-semibold"> Add Room </h2>
          <p className="mt-2 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni rem
            expedita, sunt quae necessitatibus ea aliquid quia, quos laboriosam,
            hic aliquam suscipit laudantium distinctio. Voluptatum sapiente
            error voluptas neque ut?
          </p>

          <div className="pt-5">
            <form action="">
              <p>Images</p>

              <div className="flex gap-2 mt-5">
                {Object.keys(images).map((key) => (
                  <label htmlFor={`roomImages${key}`} key={key}>
                    <img
                      className="w-30 h-30 object-cover"
                      src={
                        images[key]
                          ? URL.createObjectURL(images[key])
                          : assets.uploadArea
                      }
                      alt=""
                    />

                    <input
                      type="file"
                      id={`roomImages${key}`}
                      hidden
                      onChange={(e) =>
                        setImages({ ...images, [key]: e.target.files[0] })
                      }
                    />
                  </label>
                ))}
              </div>

              <div className="flex gap-7 mt-5">
                <div>
                  <h2 className="text-2xl">Room Type</h2>
                  <select
                    className="border p-2 mt-3 border-gray-300 rounded-md outline-none"
                    value={input.roomType}
                    name="roomType"
                    onChange={handleChange}
                  >
                    <option value="">Select Room Type</option>
                    <option value="Single Bed">Single Bed</option>
                    <option value="Double Bed">Double Bed</option>
                    <option value="Luxury Room">Luxury Room</option>
                    <option value="Family Sutie">Family Suite</option>
                  </select>
                </div>
                <div>
                  <h2 className="text-2xl">Price/night</h2>
                  <input
                    type="number"
                    placeholder="0"
                    className="border p-2 mt-3 border-gray-300 rounded-md outline-none"
                    value={input.pricePerNight}
                    name="pricePerNight"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-5">
                <h2 className="mb-2 text-2xl">Amenities</h2>
                <div className="flex flex-col gap-1">
                  {Object.keys(input.amenities).map((amenity, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={`amenity${index + 1}`}
                        name="amenity"
                        value={amenity}
                        checked={input.amenities[amenity]}
                        onChange={handleChange}
                      />
                      <label className="ml-2" htmlFor={`amenity${index + 1}`}>
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex mt-5">
                <button className="bg-[#49B9FF] text-white py-2 px-4 rounded-md">
                  Add Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRoom;
