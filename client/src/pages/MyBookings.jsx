import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import Title from "../components/Title.jsx";
import { assets, userBookingsDummyData } from "../assets/assets.js";
import moment from "moment";
import { AppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import axios from "axios";

const MyBookings = () => {
  const { getToken, BaseURL } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  // get user booking
  const getUsersBookings = async () => {
    try {
      const { data } = await axios.get(`${BaseURL}/booking/user-booking`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        toast.success(data.message);
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // toggle payment status
  const handlePaid = async (id) => {
    try {
      const { data } = await axios.post(
        `${BaseURL}/booking/update-booking`,
        { id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getUsersBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUsersBookings();
  }, []);

  return (
    <>
      <Layout>
        <div className="container mx-auto max-sm:px-5 md:pt-35 pt-20">
          <Title
            title="My Bookings"
            subtitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
            align="left"
          />

          <div className=" mt-8 w-full text-gray-800">
            <div className="hidden md:grid grid-cols-[3fr_2fr_1fr] w-full border-b py-3 border-gray-300">
              <div className="w-1/3 dark:text-white">Hotels</div>
              <div className="w-1/3 dark:text-white">Date & Timings</div>
              <div className="w-1/3 dark:text-white">Payment</div>
            </div>
            {/* bookings data */}
            <div>
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 last:border-0"
                >
                  <div className="flex items-start gap-4">
                    <div>
                      <img
                        className="w-40 h-auto object-cover rounded-md"
                        src={booking.room.images[0]}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col dark:text-white">
                      <div className="flex items-end gap-2">
                        <h2 className="text-3xl font-bold">
                          {booking.hotel.name}
                        </h2>
                        <span>({booking.room.roomType})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 dark:text-white">
                        <img src={assets.locationIcon} alt="" />
                        <h1>{booking.hotel.address}</h1>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={assets.guestsIcon} alt="" />
                        <span>Guests: {booking.guests}</span>
                      </div>
                      <div>
                        <span className="font-medium">
                          Total: ${booking.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* date & timings */}
                  <div className="flex gap-5 dark:text-white">
                    <div>
                      <h2 className="text-lg font-semibold">Check-In:</h2>

                      <p>{moment(booking.checkInDate).format("ll")}</p>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Check-Out:</h2>
                      <p>{moment(booking.checkOutDate).format("ll")}</p>
                    </div>
                  </div>

                  {/* payment */}
                  <div className="flex items-center gap-3 dark:text-white">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        booking.isPaid ? "bg-green-500" : "bg-red-500"
                      } `}
                    ></div>
                    <p> {booking.isPaid ? "Paid" : "Unpaid"}</p>
                    {booking.isPaid !== true && (
                      <button
                        onClick={() => handlePaid(booking._id)}
                        className="border cursor-pointer border-gray-500 px-3 py-1 mt-2 rounded-full"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MyBookings;
