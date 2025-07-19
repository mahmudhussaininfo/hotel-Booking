import React from "react";

const Title = ({ title, subtitle, align }) => {
  return (
    <>
      <div
        className={`flex flex-col justify-center items-center text-center mb-10 ${
          align === "left" && "md:items-start md:text-left"
        }`}
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-4">{title}</h2>
        <p
          className={`text-center text-gray-700 dark:text-white mb-8 max-w-2xl ${
            align === "left" && "md:items-start md:text-left"
          }`}
        >
          {subtitle}
        </p>
      </div>
    </>
  );
};

export default Title;
