import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function RegisterPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  const userData = [
    {
      heading: "Find a Help",
      userType: "Care Receiver",
      icon: "🤝",
      description: "I need dedicated caretakers, tutors, or companions for my family",
    },
    {
      heading: "Find a Job",
      userType: "Care Giver",
      icon: "💼",
      description: "I want to offer caregiving, tutoring, or assistance services",
    },
    {
      heading: "Care Nurturers",
      userType: "Business",
      icon: "🎉",
      description: "I provide event planning, games, catering, or commercial care",
    },
  ];

  const handleContinue = () => {
    if (selectedRole) {
      const selectedRoleData = userData.find(
        (item) => item.heading === selectedRole
      );
      if (selectedRoleData) {
        navigate("/register/register-form", {
          state: {
            selectedRole: selectedRoleData.userType,
          },
        });
      }
    } else {
      alert("Please select a role before continuing.");
    }
  };

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

        {/* Center Illustration */}
        <div className="relative z-10 flex flex-col items-center justify-center py-8 lg:py-4">
          <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-white/10 backdrop-blur-md p-4 shadow-2xl border border-white/20 flex items-center justify-center">
            <img
              src="/login.png"
              alt="CareNearn Register"
              className="w-full h-full object-contain rounded-2xl drop-shadow-lg"
            />
          </div>

          <div className="mt-8 text-center max-w-md">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Join the CareNearn Community
            </h2>
            <p className="text-rose-100 text-sm mt-2 leading-relaxed">
              Create an account to discover caring professionals or find flexible care jobs.
            </p>
          </div>
        </div>

        {/* Value Prop Badges */}
        <div className="relative z-10 flex flex-wrap gap-2 justify-center pt-4">
          <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium border border-white/20">
            ✓ Quick Registration
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium border border-white/20">
            ✓ Verified Community
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium border border-white/20">
            ✓ Full Privacy Control
          </span>
        </div>
      </div>

      {/* ── Right Side: Role Selection ────────────────────────────── */}
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
            <Link to="/register" className="flex-1">
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
              Choose Account Type
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Select how you would like to use CareNearn to proceed.
            </p>
          </div>

          {/* Interactive Role Options */}
          <div className="space-y-4 mb-8">
            {userData.map((role) => {
              const isSelected = selectedRole === role.heading;
              return (
                <div
                  key={role.heading}
                  onClick={() => setSelectedRole(role.heading)}
                  className={`
                    relative p-4 rounded-2xl cursor-pointer border-2 transition-all duration-200 flex items-start gap-4
                    ${
                      isSelected
                        ? "bg-rose-50/70 border-rose-500 shadow-md shadow-rose-500/10 -translate-y-0.5"
                        : "bg-white border-gray-200/90 hover:border-rose-300 hover:bg-slate-50/50"
                    }
                  `}
                >
                  <div
                    className={`
                      w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-colors
                      ${isSelected ? "bg-rose-100" : "bg-gray-100"}
                    `}
                  >
                    {role.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className={`text-base font-bold ${isSelected ? "text-rose-700" : "text-gray-900"}`}>
                      {role.heading}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                      {role.description}
                    </p>
                  </div>
                  <div
                    className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 transition-colors
                      ${isSelected ? "border-rose-500 bg-rose-500" : "border-gray-300 bg-white"}
                    `}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue Button */}
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`
              w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl font-semibold text-white text-base
              bg-gradient-to-r from-rose-500 to-pink-500 shadow-md shadow-rose-500/25 transition-all duration-300
              ${
                !selectedRole
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-lg hover:shadow-rose-500/35 hover:-translate-y-0.5 active:translate-y-0"
              }
            `}
          >
            <span>Continue</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
