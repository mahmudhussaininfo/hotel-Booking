import React from "react";
import Title from "./Title.jsx";
import { testimonials } from "../assets/assets.js";
import Rating from "./Rating.jsx";

const Testimonial = () => {
  return (
    <>
      <div className="flex dark:bg-[#12141D] dark:text-white flex-col items-center px-6 md:px-16 lg:px-24 py-20 bg-slate-100">
        <Title
          title="What Our Guests Say"
          subtitle="Discover why discerning travelers choose QuickStay for their luxury accommodations around the world."
        />
        <div className="">
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 mb-10">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div>
                    <p className="font-playfair text-xl">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4">
                  <Rating rating={testimonial.rating} />
                </div>
                <p className="text-gray-500 max-w-90 mt-4">
                  "{testimonial.review}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
