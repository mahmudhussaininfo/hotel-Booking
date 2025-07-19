import React from "react";
import Title from "./Title.jsx";
import { assets, exclusiveOffers } from "../assets/assets.js";

const Exclusive = () => {
  return (
    <>
      <div className="dark:bg-[#12141D] dark:text-white flex flex-col px-6 md:px-16 lg:px-24 py-20 bg-white">
        <div className="flex justify-between">
          {" "}
          <Title
            align="left"
            title="Exclusive Offers"
            subtitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
          />
          <div>
            <button className="group flex items-center gap-2 cursor-pointer">
              View All Offers
              <img
                className="group-hover:translate-x-1 transition-all"
                src={assets.arrowIcon}
                alt=""
              />{" "}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {exclusiveOffers.map((item) => (
            <div
              key={item._id}
              style={{ backgroundImage: `url(${item.image}) ` }}
              className="group relative bg-no-repeat bg-cover bg-center flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-all duration-300"
            >
              <p className="absolute top-4 left-4 bg-white text-black rounded-full px-3 py-1">
                {item.priceOff}% OFF
              </p>
              <div>
                <p className="text-2xl md:text-3xl mb-3 mt-5">{item.title}</p>
                <p>{item.description}</p>
                <p className="text-white/70 mt-3">Expires {item.expiryDate}</p>
              </div>
              <button className="group flex items-center gap-2 my-5 cursor-pointer">
                View All Offers
                <img
                  className="group-hover:translate-x-1 invert transition-all"
                  src={assets.arrowIcon}
                  alt=""
                />{" "}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Exclusive;
