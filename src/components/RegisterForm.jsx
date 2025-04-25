import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import NestedCheckbox from "./NestedCheckBox";

function RegisterForm() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      // Submit logic here
      navigate("/");
    }
  };

  const isFormValid =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  return (
    <div className="flex flex-col lg:flex-row max-h-svh bg-gray-50">
      <div className="lg:w-1/2 m-10 lg:m-0 flex items-center justify-center">
        <img
          src="/login.png"
          alt="Register"
          className="rounded-full size-60 lg:rounded-none lg:size-full object-cover"
        />
      </div>

      <div className="lg:w-1/2 flex flex-col justify-center">
        <div className="flex flex-col justify-center mx-5 md:mx-10 2xl:mx-40 lg:my-14 bg-pink-100 rounded-3xl shadow-xl">
          <div className="flex gap-5 text-2xl font-medium px-10 py-5">
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

          <div className="flex flex-col gap-6 bg-white px-10 py-6 rounded-3xl">
            <div className="flex flex-col gap-4 lg:overflow-y-auto xl:max-h-[450px] pr-2 text-sm">
              <InputField label="Name" required placeholder="Enter your name" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Phone Number"
                  required
                  placeholder="Enter phone number"
                />
                <InputField label="Date of Birth" required type="date" />
              </div>
              <InputField
                label="Email Id"
                required
                placeholder="Enter your email id"
              />
              <InputField label="Address" placeholder="Enter your address" />
              <InputField
                label="Pincode"
                required
                placeholder="Enter your pincode"
              />
              <FileInput label="Address Proof" required />
              <FileInput label="Upload Aadhar" required />
              <FileInput label="Upload Picture" required />
              <InputField
                label="Reason to Join"
                required
                placeholder="Why do you want to join?"
              />
              <InputField
                label="Educational Qualifications"
                required
                placeholder="Your qualifications"
              />
              <InputField
                label="Profession"
                required
                placeholder="Your profession"
              />

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">
                  Purpose{<span className="text-red-500">*</span>}
                </label>
              </div>

              <NestedCheckbox label="Child Care" childrenOptions={[]} />
              <NestedCheckbox label="Child Education" childrenOptions={[]} />
              <NestedCheckbox label="Parents Care" childrenOptions={[]} />
              <NestedCheckbox
                label="Activities"
                childrenOptions={[
                  "Music",
                  "Painting",
                  "Board Games",
                  "Creative Games",
                ]}
              />
              <NestedCheckbox
                label="Business Interest"
                childrenOptions={[
                  "Learning Center",
                  "Any Other Activity",
                  "Activity Center",
                ]}
              />

              {/* Password Fields with Validation */}
              <PasswordField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isVisible={showPassword}
                toggleVisibility={() => setShowPassword(!showPassword)}
              />
              <PasswordField
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (password !== e.target.value) {
                    setError("Passwords do not match");
                  } else {
                    setError("");
                  }
                }}
                isVisible={showConfirmPassword}
                toggleVisibility={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <button
              type="submit"
              onClick={handleRegister}
              disabled={!isFormValid}
              className={`${
                isFormValid
                  ? "bg-rose-500 hover:bg-rose-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white text-xl px-10 py-3 rounded-xl font-semibold transition`}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Text Input
const InputField = ({ label, required, placeholder = "", type = "text" }) => (
  <div className="flex flex-col gap-1">
    <label className="font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      className="border-b border-gray-300 focus:outline-none focus:border-rose-500 px-2 py-1 placeholder:text-sm"
    />
  </div>
);

// Reusable File Input
const FileInput = ({ label, required }) => (
  <div className="flex flex-col gap-1">
    <label className="font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="file"
      required={required}
      className="file:cursor-pointer file:text-rose-600 focus:outline-none"
    />
  </div>
);

// Password Field with Eye Icon and Input Binding
const PasswordField = ({
  label,
  value,
  onChange,
  isVisible,
  toggleVisibility,
}) => (
  <div className="flex flex-col gap-1 relative">
    <label className="font-medium text-gray-700">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type={isVisible ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      required
      className="border-b border-gray-300 focus:outline-none focus:border-rose-500 px-2 py-1 placeholder:text-sm pr-10"
    />
    <span
      className="absolute right-2 top-8 cursor-pointer text-gray-500 hover:text-rose-500 transition"
      onClick={toggleVisibility}
    >
      {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
    </span>
  </div>
);

export default RegisterForm;
