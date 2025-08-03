import React, { useState } from "react";
import Title from "../components/Title.jsx";
import { roomsDummyData } from "../assets/assets.js";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const ListRoom = () => {
  const { BaseURL, user, getToken } = useContext(AppContext);
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get(`${BaseURL}/room/room-owner`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // toggle room availability
  const toggleAvailability = async (roomId) => {
    try {
      const { data } = await axios.post(
        `${BaseURL}/room/room-toogle-availability`,
        { roomId },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchRooms();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);
  return (
    <>
      <div className="container max-w-7xl mt-5">
        <Title
          title="List Room"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni rem expedita, sunt quae necessitatibus ea aliquid quia, quos laboriosam, hic aliquam suscipit laudantium distinctio. Voluptatum sapiente error voluptas neque ut?"
          align="left"
        />

        <div>
          <h2 className="text-2xl font-semibold">All Rooms</h2>
          <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg mt-5">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-500">
                <tr>
                  <th className="py-3 px-4 text-gray-800 font-medium">Image</th>
                  <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
                  <th className="py-3 px-4 text-gray-800 font-medium">
                    Facility
                  </th>
                  <th className="py-3 px-4 text-gray-800 font-medium text-center">
                    Price / night
                  </th>
                  <th className="py-3 px-4 text-gray-800 font-medium text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {rooms.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b py-3 border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4">
                      <img
                        className="w-20 h-20 object-cover rounded"
                        src={item.images[0]}
                        alt=""
                      />
                    </td>
                    <td className="py-3 px-4">{item.roomType}</td>

                    <td className="py-3 px-4">{item.amenities.join(", ")}</td>
                    <td className="py-3 px-4 text-center">
                      $ {item.pricePerNight}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <label className="relative inline-flex text-gray-900 gap-3 items-center cursor-pointer">
                        <input
                          className="sr-only peer"
                          type="checkbox"
                          checked={item.isAvailable}
                          onChange={() => toggleAvailability(item._id)}
                        />
                        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-green-400 transition-colors duration-200"></div>
                        <span className="absolute dot left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out  peer-checked:translate-x-5"></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListRoom;
