import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout/Layout.jsx";
import { data, useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData } from "../assets/assets.js";
import Rating from "./Rating.jsx";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { roomData, BaseURL, getToken, navigate } = useContext(AppContext);
  const { id } = useParams();
  const [rooms, setRooms] = useState(null);
  const [img, setImg] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  // check availability
  const checkAvailability = async () => {
    try {
      if (checkInDate >= checkOutDate) {
        return toast.error("Check out date must be after check in date");
      } else {
        const { data } = await axios.post(
          `${BaseURL}/booking/check-availability`,
          {
            checkInDate,
            checkOutDate,
            room: id,
          }
        );

        if (data.success) {
          if (data.isAvailable) {
            setIsAvailable(true);
            toast.success(data.message);
          } else {
            setIsAvailable(false);
            toast.error(data.message);
          }
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // handle Booking
  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      if (!isAvailable) {
        toast.error("Room is not available");
        return checkAvailability();
      } else {
        const { data } = await axios.post(
          `${BaseURL}/booking/create-booking`,
          {
            checkInDate,
            checkOutDate,
            room: id,
            guests,
            paymentMethod: "Pay At Hotel",
          },
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          }
        );
        if (data.success) {
          toast.success(data.message);
          navigate("/bookings");
          scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const room = roomData.find((data) => data._id === id);
    if (room) {
      setRooms(room);
      setImg(room.images[0]); // Assuming room has an images array
    }
  }, [roomData]);
  return (
    rooms && (
      <>
        <Layout>
          <div className="dark:bg-[#12141D] dark:text-white">
            <div className="container mx-auto max-sm:px-5 md:pt-35 pt-20">
              {/* Room Details */}
              <div className="flex items-end gap-2">
                <h2 className="text-3xl font-bold"> {rooms.hotel.name} </h2>
                <span>({rooms.roomType})</span>
              </div>
              <div className="flex gap-1">
                <Rating rating={5} />
                <span>200+ reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={assets.locationIcon} alt="" />
                {rooms.hotel.address}
              </div>
              {/* Room Images */}
              <div className="flex flex-col lg:flex-row mt-6 gap-6">
                <div className="lg:w-1/2 w-full">
                  <img
                    src={img}
                    alt=""
                    className="w-full object-cover rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-5 lg:w-1/2 w-full">
                  {rooms.images.map((image, index) => (
                    <img
                      onClick={() => setImg(image)}
                      src={image}
                      alt=""
                      key={index}
                      className={`w-full object-cover cursor-pointer rounded-md ${
                        img === image ? "outline-3 outline-orange-500" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-6">
                <h2 className="text-3xl font-semibold">
                  Experience Luxury Like Never Before
                </h2>
                <p className="mt-2 text-2xl">${rooms.pricePerNight} / day</p>
              </div>
              <div className="flex items-center gap-3">
                {rooms.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 mt-3 bg-gray-100 p-3 rounded"
                  >
                    <img
                      className="w-12 h-6"
                      src={facilityIcons[item]}
                      alt=""
                    />
                    <span className="text-sm dark:text-black">{item}</span>
                  </div>
                ))}
              </div>
              <div className="border-b my-6 border-gray-300 w-full md:w-[33%]"></div>
              <form
                onSubmit={handleBooking}
                className=" bg-white my-5 mb-10 shadow-md text-gray-500 rounded-lg px-6 py-4  flex flex-col md:flex-row items-center md:justify-between gap-4 max-md:mx-auto"
              >
                <div className="flex flex-col md:flex-row items-center gap-5">
                  <div className="md:border-r border-gray-300 md:pr-5">
                    <div className="flex items-center gap-2">
                      <img src={assets.calenderIcon} alt="" />
                      <label htmlFor="checkIn">Check in</label>
                    </div>
                    <input
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      id="checkIn"
                      type="date"
                      className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                    />
                  </div>
                  <div className="md:border-r border-gray-300 md:pr-5">
                    <div className="flex items-center gap-2">
                      <img src={assets.calenderIcon} alt="" />
                      <label htmlFor="checkOut">Check out</label>
                    </div>
                    <input
                      id="checkOut"
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={checkInDate}
                      disabled={!checkInDate}
                      type="date"
                      className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                    />
                  </div>
                  <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
                    <label htmlFor="guests">Guests</label>
                    <input
                      onChange={(e) => setGuests(e.target.value)}
                      value={guests}
                      min={1}
                      max={4}
                      id="guests"
                      type="number"
                      className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="">
                  {" "}
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-1 rounded-md bg-black py-2 px-4 text-white cursor-pointer mt-auto max-md:w-full max-md:py-1"
                  >
                    {isAvailable ? (
                      <span>Book Now</span>
                    ) : (
                      <span>Check Availiability</span>
                    )}
                  </button>
                </div>
              </form>
              {roomCommonData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 mb-6 max-md:flex-col"
                >
                  <img
                    src={item.icon}
                    alt=""
                    className="w-10 h-10 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
              <div className="border-b my-6 border-gray-300 w-full md:w-[33%]"></div>
              <div className="max-w-7xl">
                <p className="text-gray-400 ">
                  Guests will be allocated on the ground floor according to
                  availability. You get a comfortable Two bedroom apartment has
                  a true city feeling. The price quoted is for two guest, at the
                  guest slot please mark the number of guests to get the exact
                  price for groups. The Guests will be allocated ground floor
                  according to availability. You get the comfortable two bedroom
                  apartment that has a true city feeling.
                </p>
              </div>
              <div className="border-b my-6 border-gray-300 w-full md:w-[33%]"></div>
              <div className="py-3">
                <h3 className="pb-3">Location On Map</h3>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d163808.89381286103!2d91.859804717608!3d24.874115534105783!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sbd!4v1752493634633!5m2!1sen!2sbd"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </div>
              <div className="flex items-start gap-4 mt-6">
                <div>
                  <img
                    className="w-12 h-12 rounded-full"
                    src={rooms.hotel.owner.image}
                    alt=""
                  />
                </div>
                <div>
                  <p>Hosted by {rooms.hotel.name}</p>
                  <div className="flex items-center gap-2">
                    <Rating rating={5} />
                    <span>200+ reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    )
  );
};

export default RoomDetails;
