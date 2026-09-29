import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { login } from "../../store/actions/index.js";

function Login() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginCredential, setLoginCredential] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ login: "", password: "", server: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const [userTypes, setUserTypes] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState("");

  const validate = () => {
    let valid = true;
    const newErrors = { login: "", password: "", server: "" };

    if (!loginCredential) {
      newErrors.login = "Phone or email is required";
      valid = false;
    } else {
      // Check if it's a phone number (10 digits, doesn't start with 0)
      if (/^[0-9]+$/.test(loginCredential)) {
        if (!/^[1-9][0-9]{9}$/.test(loginCredential)) {
          newErrors.login = "Please enter a valid 10-digit phone number";
          valid = false;
        }
      }
      // Check if it's an email
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginCredential)) {
        newErrors.login = "Please enter a valid email address";
        valid = false;
      }
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleUserTypeSelection = (userType) => {
    setSelectedUserType(userType);
    // Save the selected user type to localStorage
    localStorage.setItem("selectedUserType", userType);

    // Check if the selected user type is ADMIN
    if (userType === "ADMIN") {
      navigate("/admin");
    } else {
      // Navigate to homepage for other user types
      navigate("/?fromLogin=true");
    }
  };

  // =====================================================================
  // HARDCODED CREDENTIALS FOR DEMO / TESTING
  // Phone  : 7007755306
  // Email  : suntechglobal@gmail.com
  // Password: Suntech@123
  // =====================================================================
  const HARDCODED_PHONE = "7007755306";
  const HARDCODED_EMAIL = "suntechglobal@gmail.com";
  const HARDCODED_PASSWORD = "Suntech@123";

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, server: "" }));

    try {
      // ---------------------------------------------------------------
      // OFFLINE / DEMO MODE LOGIN
      // First check hardcoded demo credentials, then check localStorage
      // registered users.
      // ---------------------------------------------------------------
      const isPhoneMatch = loginCredential === HARDCODED_PHONE;
      const isEmailMatch = loginCredential === HARDCODED_EMAIL;
      const isPasswordMatch = password === HARDCODED_PASSWORD;

      let data = null;

      if ((isPhoneMatch || isEmailMatch) && isPasswordMatch) {
        // Hardcoded demo account
        data = {
          id: 1,
          name: "Suntech User",
          phoneNumber: HARDCODED_PHONE,
          emailId: HARDCODED_EMAIL,
          userTypes: ["Care Receiver"],
          purposes: [],
        };
      } else {
        // Check localStorage for a registered user matching phone/email + password
        const registeredUsers = JSON.parse(
          localStorage.getItem("registeredUsers") || "[]"
        );
        const matched = registeredUsers.find(
          (u) =>
            (u.phoneNumber === loginCredential ||
              u.emailId === loginCredential) &&
            u.password === password
        );
        if (matched) {
          // Normalize userTypes: backend stores as [{roleName}], login expects flat strings
          const flatUserTypes = (matched.userTypes || []).map((t) =>
            typeof t === "string" ? t : t.roleName
          );
          data = {
            ...matched,
            userTypes: flatUserTypes,
          };
        }
      }

      if (data) {

        // Save user data to localStorage
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("loginTimestamp", String(Date.now()));
        localStorage.removeItem("hasSeenPurposeWindow");
        localStorage.setItem("selectedUserType", data.userTypes[0]);

        // Carry over purposes from registration (if any) so the modal pre-fills them
        if (data.purposes && data.purposes.length > 0) {
          localStorage.setItem("userPurposes", JSON.stringify(data.purposes));
        } else {
          localStorage.removeItem("userPurposes");
        }

        // Dispatch redux login action
        dispatch(login());

        navigate("/?fromLogin=true");
        return;
      } else {
        throw new Error("Invalid phone/email or password. Please try again.");
      }
      // ---------------------------------------------------------------

      // ---------------------------------------------------------------
      // ORIGINAL BACKEND API CALL — commented out for demo/testing
      // ---------------------------------------------------------------
      /*
      let loginValue;
      if (/^[1-9][0-9]{9}$/.test(loginCredential)) {
        loginValue = Number(loginCredential);
      } else {
        loginValue = loginCredential;
      }

      const response = await fetch(
        "http://192.168.0.205:5001/api/careNearn/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login: loginValue, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      // Check if user has ADMIN role
      if (data.role === "ADMIN") {
        // For ADMIN users, save only the essential data
        const adminData = {
          role: data.role,
          token: data.token,
          // Include any other admin-specific fields from the response
          ...(data.id && { id: data.id }),
          ...(data.email && { email: data.email }),
          ...(data.name && { name: data.name }),
        };

        localStorage.setItem("user", JSON.stringify(adminData));
        localStorage.setItem("selectedUserType", "ADMIN");

        // Clear any non-admin data that might be stored
        localStorage.removeItem("userPurposes");
        localStorage.removeItem("hasSeenPurposeWindow"); // Remove this key

        navigate("/admin");
        return;
      }

      // For non-ADMIN users, proceed with the original logic
      // Save user data
      localStorage.setItem("user", JSON.stringify(data));

      if (data.purposes) {
        localStorage.setItem("userPurposes", JSON.stringify(data.purposes));
      } else {
        // Clear purposes if not present in response
        localStorage.removeItem("userPurposes");
      }

      // Check if user has multiple user types
      if (data.userTypes && data.userTypes.length > 1) {
        setUserTypes(data.userTypes);
        setShowUserTypeSelection(true);
      } else {
        // If only one user type, proceed directly
        const userType = data.userTypes ? data.userTypes[0] : null;
        if (userType) {
          localStorage.setItem("selectedUserType", userType);

          // Check if the user type is ADMIN (though this shouldn't happen with the above check)
          if (userType === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/?fromLogin=true");
          }
        } else {
          // If no userTypes field, set a default or navigate to home
          localStorage.removeItem("selectedUserType");
          navigate("/?fromLogin=true");
        }
      }
      */
      // ---------------------------------------------------------------

    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        server: error.message || "An error occurred. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  if (showUserTypeSelection) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl max-w-md w-full border border-gray-100">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 text-2xl">
            👤
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">
            Select Your Role
          </h2>
          <p className="mb-6 text-center text-gray-500 text-sm">
            You have access to multiple accounts. Select a profile to continue:
          </p>

          <div className="space-y-3">
            {userTypes.map((userType) => (
              <button
                key={userType}
                onClick={() => handleUserTypeSelection(userType)}
                className="w-full py-3.5 px-5 bg-white hover:bg-rose-50 text-gray-800 hover:text-rose-600 border border-gray-200 hover:border-rose-300 font-semibold rounded-2xl transition duration-200 shadow-sm flex items-center justify-between"
              >
                <span>{userType}</span>
                <FiArrowRight className="w-4 h-4 text-rose-500" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      {/* ── Left Side: Brand & Visual Showcase ────────────────────── */}
      <div className="lg:w-1/2 bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-black/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Logo Header */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="text-2xl font-black tracking-tight text-white drop-shadow-sm">
              Care<span className="text-rose-200">Nearn</span>
            </span>
          </Link>
        </div>

        {/* Center Illustration / Graphic */}
        <div className="relative z-10 flex flex-col items-center justify-center py-8 lg:py-4">
          <div className="relative">
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-white/10 backdrop-blur-md p-4 shadow-2xl border border-white/20 flex items-center justify-center">
              <img
                src="/login.png"
                alt="CareNearn Login"
                className="w-full h-full object-contain rounded-2xl drop-shadow-lg"
              />
            </div>
          </div>

          <div className="mt-8 text-center max-w-md">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Connecting Care with Community
            </h2>
            <p className="text-rose-100 text-sm mt-2 leading-relaxed">
              Find qualified caretakers for your loved ones or discover rewarding care opportunities near you.
            </p>
          </div>
        </div>

        {/* Value Prop Badges */}
        <div className="relative z-10 flex flex-wrap gap-2 justify-center pt-4">
          <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium border border-white/20">
            ✓ 100% Vetted Profiles
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium border border-white/20">
            ✓ Safe & Trusted
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium border border-white/20">
            ✓ 24/7 Dedicated Support
          </span>
        </div>
      </div>

      {/* ── Right Side: Form Section ──────────────────────────────── */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100">
          {/* Navigation Pill Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
            <Link to="/login" className="flex-1">
              <button
                type="button"
                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  pathname === "/login"
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Sign In
              </button>
            </Link>
            <Link to="/register/register-form" className="flex-1">
              <button
                type="button"
                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  pathname.startsWith("/register")
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Register
              </button>
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* Server Error Alert */}
          {errors.server && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl text-sm font-medium">
              {errors.server}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Login Credential Input */}
            <div className="space-y-1.5">
              <label htmlFor="login" className="text-sm font-semibold text-gray-700">
                Phone Number or Email
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-gray-400 pointer-events-none">
                  <FiMail className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="login"
                  value={loginCredential}
                  onChange={(e) => setLoginCredential(e.target.value)}
                  placeholder="e.g. 7007755306 or name@domain.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition text-sm text-gray-800 placeholder:text-gray-400"
                />
              </div>
              {errors.login && (
                <p className="text-xs font-medium text-rose-500 mt-1">
                  {errors.login}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-gray-400 pointer-events-none">
                  <FiLock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition text-sm text-gray-800 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs font-medium text-rose-500 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl font-semibold text-white text-base
                bg-gradient-to-r from-rose-500 to-pink-500 shadow-md shadow-rose-500/25 transition-all duration-300
                ${
                  isLoading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:shadow-lg hover:shadow-rose-500/35 hover:-translate-y-0.5 active:translate-y-0"
                }
              `}
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Switch to Register */}
            <p className="text-center text-sm text-gray-500 pt-2">
              Don't have an account?{" "}
              <Link
                to="/register/register-form"
                className="font-semibold text-rose-600 hover:underline underline-offset-2"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
