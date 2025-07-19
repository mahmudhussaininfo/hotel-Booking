import React from "react";
import { assets, dashboardDummyData } from "../assets/assets.js";

const Dashboard = () => {
  return (
    <>
      <div className="md:mx-5 pt-5">
        <div className="container max-w-7xl">
          <h2 className="text-4xl font-semibold"> Dashboard </h2>
          <p className="mt-2 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni rem
            expedita, sunt quae necessitatibus ea aliquid quia, quos laboriosam,
            hic aliquam suscipit laudantium distinctio. Voluptatum sapiente
            error voluptas neque ut?
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-4 mt-5 bg-gray-50 w-fit px-4 py-2 rounded">
            <img className="w-10 h-auto" src={assets.totalBookingIcon} alt="" />
            <div>
              <h2 className="text-blue-400 font-semibold">Total Bookings</h2>
              <span className="text-gray-500 text-md">
                {dashboardDummyData.totalBookings}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-5 bg-gray-50 w-fit px-4 py-2 rounded">
            <img className="w-10 h-auto" src={assets.totalRevenueIcon} alt="" />
            <div>
              <h2 className="text-blue-400 font-semibold">Total Revenue</h2>
              <span className="text-gray-500 text-md">
                $ {dashboardDummyData.totalRevenue}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Recent Bookings</h2>
          <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-5">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-500">
                <tr>
                  <th className="py-3 px-4 text-gray-800 font-medium">
                    User Name
                  </th>
                  <th className="py-3 px-4 text-gray-800 font-medium">
                    Room Name
                  </th>
                  <th className="py-3 px-4 text-gray-800 font-medium text-center">
                    Total Amount
                  </th>
                  <th className="py-3 px-4 text-gray-800 font-medium text-center">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {dashboardDummyData.bookings.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b py-3 border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4">{item.user.username}</td>
                    <td className="py-3 px-4">{item.room.hotel.name}</td>
                    <td className="py-3 px-4 text-center">
                      $ {item.totalPrice}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.status === "pending" ? (
                        <button className="bg-yellow-400 rounded-md py-2 px-3">
                          Pending
                        </button>
                      ) : (
                        <button className="bg-green-400 rounded-md py-2 px-3">
                          Completed
                        </button>
                      )}
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

export default Dashboard;
