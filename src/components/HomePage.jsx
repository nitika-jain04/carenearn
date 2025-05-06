import React from "react";
import { useNavigate } from "react-router";
import { FaLongArrowAltRight } from "react-icons/fa";

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
          className="text-lg text-rose-500 underline-offset-2 decoration-rose-500 underline cursor-pointer flex items-center justify-center gap-1"
          onClick={() => navigate("/about-us")}
        >
          Click here to know more about us
          <span>
            {"  "}
            <FaLongArrowAltRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
