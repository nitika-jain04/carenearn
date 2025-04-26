import React from "react";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row mt-5 px-5 md:gap-5">
      <div className="lg:w-2/5 flex justify-center">
        <img
          src="/home-page.jpg"
          alt="Photo"
          className="lg:h-[80vh] md:h-[30vh] h-[20vh]  rounded-full md:rounded-none object-cover"
        />
      </div>

      <div className="flex flex-col gap-5 lg:gap-8 lg:w-3/5 justify-center lg:px-5 py-5 text-center">
        <p className="text-7xl lg:text-8xl font-serif text-rose-500">
          Connecting families with quality, local caregivers.
        </p>
        <p className="text-3xl lg:text-4xl tracking-wide">
          Trusted Care for Every Child & Senior.
        </p>
        <div
          className="underline-offset-2 decoration-slate-950 underline cursor-pointer"
          onClick={() => navigate("/about-us")}
        >
          Click here to know more about us.
        </div>
      </div>
    </div>
  );
};

export default HomePage;
