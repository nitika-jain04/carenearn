import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:mt-5 px-5">
      <div className="flex flex-col gap-3 lg:w-1/2 justify-center px-5 py-5">
        <p className="text-5xl md:text-6xl lg:text-8xl playwrite leading-[1.05] text-rose-500">
          Connecting families with quality, local caregivers.
        </p>
        <p className="text-3xl lg:text-4xl tracking-wide">
          Trusted Care for Every Child & Senior.
        </p>
      </div>

      <div className="lg:w-1/2">
        <img
          src="/home-page.jpg"
          alt="Photo"
          className="lg:h-[80vh] rounded-full md:rounded-none"
        />
      </div>
    </div>
  );
};

export default HomePage;
