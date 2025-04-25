import React from "react";
import { Link, useLocation, useNavigate } from "react-router";

function RegisterPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row max-h-svh">
      <div className="lg:w-1/2 m-10 lg:m-0 flex items-center justify-center">
        <img
          src="/login.png"
          alt=""
          className="rounded-full size-60 lg:rounded-none lg:size-full"
        />
      </div>

      <div className="lg:w-1/2 flex flex-col justify-center">
        <div className="flex flex-col justify-center mx-10 lg:mx-40 lg:my-14 bg-pink-100 rounded-3xl shadow-lg">
          <div className="flex gap-5 text-2xl px-10 py-5">
            <Link to="/login">
              <button
                className={`${
                  pathname === "/login" ? "font-semibold" : "font-normal"
                }`}
              >
                Login
              </button>
            </Link>

            <Link to="/register">
              <button
                className={`${
                  pathname === "/register" ? "font-semibold" : "font-normal"
                }`}
              >
                Register
              </button>
            </Link>
          </div>

          <div className="flex flex-col gap-20 bg-white px-10 py-12 rounded-3xl">
            <div className="flex flex-col gap-3">
              {" "}
              <label
                htmlFor="find-help"
                className="cursor-pointer flex gap-2 border-[3px] border-gray-200 rounded-xl text-base px-2 py-3 hover:bg-rose-100 hover:border-rose-400 transition-all duration-200 ease-in"
              >
                {" "}
                <input
                  type="radio"
                  name="role"
                  id="find-help"
                  className="accent-rose-500"
                />{" "}
                Find Help{" "}
              </label>{" "}
              <label
                htmlFor="find-job"
                className="cursor-pointer flex gap-2 border-[3px] border-gray-200 rounded-xl text-base px-2 py-3 hover:bg-rose-100 hover:border-rose-400 transition-all duration-200 ease-in"
              >
                {" "}
                <input
                  type="radio"
                  name="role"
                  id="find-job"
                  className="accent-rose-500"
                />{" "}
                Find a Job{" "}
              </label>{" "}
              <label
                htmlFor="care-nurturers"
                className="cursor-pointer flex gap-2 border-[3px] border-gray-200 rounded-xl text-base px-2 py-3 hover:bg-rose-100 hover:border-rose-400 transition-all duration-200 ease-in"
              >
                {" "}
                <input
                  type="radio"
                  name="role"
                  id="care-nurturers"
                  className="accent-rose-500"
                />{" "}
                Care Nurturers{" "}
              </label>{" "}
            </div>

            <button
              type="submit"
              onClick={() => navigate("/register/register-form")}
              className="bg-rose-500 text-white text-xl px-28 py-2 rounded-md font-medium"
            >
              Continue
            </button>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default RegisterPage;
