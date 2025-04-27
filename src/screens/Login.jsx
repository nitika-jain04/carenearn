import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom"; // use react-router-dom
import { login } from "../../store/actions";

function Login() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ phone: "", password: "" });

  const validate = () => {
    let valid = true;
    const newErrors = { phone: "", password: "" };

    // Phone validation
    if (!/^[1-9][0-9]{9}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits and not start with 0.";
      valid = false;
    }

    // Password validation
    if (
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/.test(
        password
      )
    ) {
      newErrors.password =
        "Password must be 8+ chars, include 1 uppercase, 1 symbol, and 1 number.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validate()) {
      dispatch(login());
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/2 m-10 lg:m-0 flex items-center justify-center">
        <img
          src="/login.png"
          alt=""
          className="rounded-full size-60 lg:rounded-none lg:size-full"
        />
      </div>

      <div className="lg:w-1/2 flex flex-col justify-center">
        <div className="flex flex-col justify-center mx-5 md:mx-10 lg:mx-40 bg-pink-100 rounded-3xl shadow-lg">
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

          <div className="flex flex-col gap-24 bg-white px-10 py-12 rounded-3xl">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="text-lg font-normal tracking-wide"
                >
                  User Id
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="placeholder:text-stone-400 placeholder:text-base outline-none p-1"
                />
                {errors.phone && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="border-b border-black"></div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="text-lg font-normal tracking-wide"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="placeholder:text-stone-400 placeholder:text-base outline-none p-1"
                />
                {errors.password && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="border-b border-black"></div>
            </div>

            <button
              onClick={handleLogin}
              type="button"
              className="bg-rose-500 text-white text-xl px-28 py-2 rounded-md font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
