import React from "react";
import { Link, useLocation, useNavigate } from "react-router";

function RegisterForm() {
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
        <div className="flex flex-col justify-center mx-5 md:mx-10 lg:mx-40 lg:my-14 bg-pink-100 rounded-3xl shadow-lg">
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
                  pathname === "/register" ||
                  pathname === "/register/register-form"
                    ? "font-semibold"
                    : "font-normal"
                }`}
              >
                Register
              </button>
            </Link>
          </div>

          <div className="flex flex-col gap-5 bg-white px-10 py-5 rounded-3xl">
            <div className="flex flex-col gap-3 overflow-y-scroll max-h-[400px] pr-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="">
                  Name<span>*</span>
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  required
                  placeholder="Enter your name"
                />
                <div className="border-b border-black"></div>
              </div>

              <div className="flex">
                <div className="flex flex-col gap-1">
                  <label htmlFor="">
                    Phone Number<span>*</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    required
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="">
                    Date of Birth<span>*</span>
                  </label>
                  <input
                    type="date"
                    name=""
                    id=""
                    required
                    placeholder="Enter your dob"
                  />
                </div>
              </div>
              <div className="border-b border-black"></div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">
                  Email Id<span>*</span>
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  required
                  placeholder="Enter your email id"
                />
                <div className="border-b border-black"></div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">
                  Address<span>*</span>
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  required
                  placeholder="Enter your address"
                />
                <div className="border-b border-black"></div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">
                  Pincode<span>*</span>
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  required
                  placeholder="Enter your pincode"
                />
                <div className="border-b border-black"></div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">
                  Address Proof<span>*</span>
                </label>
                <input
                  type="file"
                  name=""
                  id=""
                  required
                  placeholder="Enter your name"
                />
                <div className="border-b border-black"></div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">
                  Upload Aadhar<span>*</span>
                </label>
                <input
                  type="file"
                  name=""
                  id=""
                  required
                  placeholder="Enter your name"
                />
                <div className="border-b border-black"></div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">
                  Upload Picture<span>*</span>
                </label>
                <input
                  type="file"
                  name=""
                  id=""
                  required
                  placeholder="Enter your name"
                />
                <div className="border-b border-black"></div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">
                  Reason to Join<span>*</span>
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  required
                  placeholder="Enter your name"
                />
                <div className="border-b border-black"></div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">
                  Upload Aadhar<span>*</span>
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  required
                  placeholder="Enter your name"
                />
                <div className="border-b border-black"></div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">
                  Upload Aadhar<span>*</span>
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  required
                  placeholder="Enter your name"
                />
                <div className="border-b border-black"></div>
              </div>
            </div>

            <button
              type="submit"
              onClick={() => navigate("/")}
              className="bg-rose-500 text-white text-xl px-28 py-2 rounded-md font-medium"
            >
              Register
            </button>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default RegisterForm;
