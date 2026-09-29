import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CareNurturers() {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const isLoggedIn = useSelector((state) => state.login.login);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const nurturersData = [
    {
      text: "Organise my party",
      icon: "/help_job/party.png",
      description: "End-to-end party management, decor, theme planning, and coordination",
    },
    {
      text: "Organise party games",
      icon: "/help_job/board-games.png",
      description: "Interactive games, competitions, entertainment, and hosts for guests",
    },
    {
      text: "Food/bakery/dessert",
      icon: "/help_job/dessert.png",
      description: "Custom artisanal cakes, savory treats, gourmet catering, and desserts",
    },
  ];

  const getUserData = () => {
    const userDataString = localStorage.getItem("user");
    if (!userDataString) return null;
    return JSON.parse(userDataString);
  };

  const isSelected = (optionText) => {
    return selectedOptions.includes(optionText);
  };

  const toggleSelection = (optionText) => {
    setSelectedOptions((prev) =>
      prev.includes(optionText)
        ? prev.filter((text) => text !== optionText)
        : [...prev, optionText]
    );
  };

  const clearAllSelections = () => {
    setSelectedOptions([]);
    setError(null);
  };

  const buildRequestData = () => {
    const userData = getUserData();
    if (!userData) {
      throw new Error("User data not found");
    }

    return {
      name: userData.name || "Unknown",
      phoneNumber: userData.phoneNumber || "",
      emailId: userData.emailId || "",
      userType: "Business", // Changed from "Care Receiver" to "Business"
      purposes: [
        {
          roleName: "Business", // Changed from "Care Receiver" to "Business"
          categoryName: "Care Nurturers",
          items: selectedOptions.map((option) => ({
            label: option,
            selected: true,
          })),
        },
      ],
    };
  };

  const handleContinue = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (selectedOptions.length === 0) {
      setError("Please select at least one service to continue");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const requestData = buildRequestData();
      console.log("Request data:", requestData);

      // ---------------------------------------------------------------
      // MOCK DATA POOL
      // ---------------------------------------------------------------
      const mockCaretakersPool = [
        {
          id: 201,
          name: "Anjali Kapoor",
          phoneNumber: "9871234560",
          emailId: "anjali.kapoor@example.com",
          dateOfBirth: "1992-08-25",
          address: "D-11, Sector 25, Noida",
          pincode: "201301",
          educationalQualifications: "Diploma in Event Management",
          profession: "Event Organiser & Theme Specialist",
          reasonToJoin: "Love creating memorable experiences and decor for parties",
          picture: "/default-profile.svg",
          userTypes: ["Business"],
          purposes: [
            {
              roleName: "Business",
              categoryName: "Care Nurturers",
              items: [
                { label: "Organise my party", selected: true },
                { label: "Organise party games", selected: true },
              ],
            },
          ],
          addressProof: "",
          aadharCard: "",
        },
        {
          id: 202,
          name: "Vikram Bakshi",
          phoneNumber: "9812345670",
          emailId: "vikram.bakshi@example.com",
          dateOfBirth: "1988-04-14",
          address: "E-22, Sector 41, Noida",
          pincode: "201301",
          educationalQualifications: "B.Sc Hotel Management",
          profession: "Baker & Artisanal Dessert Chef",
          reasonToJoin: "Bringing joy through customized cakes and gourmet savory items",
          picture: "/default-profile.svg",
          userTypes: ["Business"],
          purposes: [
            {
              roleName: "Business",
              categoryName: "Care Nurturers",
              items: [{ label: "Food/bakery/dessert", selected: true }],
            },
          ],
          addressProof: "",
          aadharCard: "",
        },
        {
          id: 203,
          name: "Rohit Sanyal",
          phoneNumber: "9911223344",
          emailId: "rohit.games@example.com",
          dateOfBirth: "1994-12-05",
          address: "B-40, Sector 15, Noida",
          pincode: "201301",
          educationalQualifications: "B.A. Performing Arts",
          profession: "Party Game Emcee & Host",
          reasonToJoin: "Specialist in interactive party games and entertainment",
          picture: "/default-profile.svg",
          userTypes: ["Business"],
          purposes: [
            {
              roleName: "Business",
              categoryName: "Care Nurturers",
              items: [{ label: "Organise party games", selected: true }],
            },
          ],
          addressProof: "",
          aadharCard: "",
        },
      ];

      const normalizeText = (text) =>
        (text || "").toLowerCase().replace(/[^a-z0-9]/g, "");

      // Filter: Show only nurturers that provide at least one of the selected services
      const filteredNurturers = mockCaretakersPool.filter((nurturer) => {
        return nurturer.purposes.some((purpose) =>
          purpose.items.some(
            (item) =>
              item.selected &&
              selectedOptions.some(
                (opt) => normalizeText(opt) === normalizeText(item.label)
              )
          )
        );
      });

      navigate("/caretakers", {
        state: {
          caretakers: filteredNurturers,
          searchCriteria: selectedOptions.join(", "),
        },
      });

      // ---------------------------------------------------------------
      // ORIGINAL BACKEND API CALL — commented out for demo/testing
      // ---------------------------------------------------------------
      /*
      const response = await fetch(
        "http://192.168.0.205:5001/api/careNearn/user/filter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      navigate("/caretakers", {
        state: {
          caretakers: result || [],
          searchCriteria: selectedOptions.join(", "),
        },
      });
      */
      // ---------------------------------------------------------------

    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to fetch caretakers. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* ── Hero Banner ────────────────────────────────────────────── */}
        <div className="relative overflow-hidden">
          <img
            src="/our-vision.jpg"
            alt="Care Nurturers Banner"
            className="h-60 w-full object-cover object-center rounded-b-[60px] md:rounded-b-[100px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600/80 via-rose-500/70 to-pink-500/70 rounded-b-[60px] md:rounded-b-[100px]" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs md:text-sm font-medium tracking-wider uppercase mb-2 shadow-sm border border-white/30">
              🎉 Experiential & Creative Care
            </span>
            <h1 className="text-white font-bold text-4xl md:text-5xl drop-shadow-md">
              Care Nurturers
            </h1>
            <p className="text-white/90 text-sm md:text-base max-w-xl mt-2 font-normal">
              Elevate your celebrations and gatherings with professional party planners, game hosts, and culinary masters.
            </p>
          </div>
        </div>

        {/* ── Main Content Area ──────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-14 py-10">
          {/* Error Notification */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-700 text-sm font-semibold ml-4"
              >
                ✕
              </button>
            </div>
          )}

          {/* Section Container */}
          <div className="bg-slate-50/70 p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Select Nurturer Services
                  </h2>
                  <p className="text-xs md:text-sm text-gray-500">
                    Choose one or more specialized services needed for your event or occasion
                  </p>
                </div>
              </div>
              {selectedOptions.length > 0 && (
                <span className="bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {selectedOptions.length} selected
                </span>
              )}
            </div>

            {/* Grid of Nurturer Services */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nurturersData.map((item, index) => {
                const selected = isSelected(item.text);
                return (
                  <div
                    key={index}
                    onClick={() => toggleSelection(item.text)}
                    className={`
                      group relative flex flex-col items-center text-center p-8 rounded-2xl cursor-pointer
                      transition-all duration-300 transform select-none
                      ${
                        selected
                          ? "bg-gradient-to-b from-rose-50 to-pink-50 border-2 border-rose-500 shadow-xl shadow-rose-500/15 -translate-y-1.5 scale-[1.02]"
                          : "bg-white border border-gray-200/80 hover:border-rose-300 hover:shadow-lg hover:-translate-y-1"
                      }
                    `}
                  >
                    {/* Active Selection Checkmark Badge */}
                    <div
                      className={`
                        absolute top-3.5 right-3.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                        ${
                          selected
                            ? "bg-rose-500 text-white scale-100 opacity-100"
                            : "bg-gray-100 text-transparent scale-75 opacity-0 group-hover:opacity-40"
                        }
                      `}
                    >
                      <svg
                        className="w-3.5 h-3.5 stroke-current"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>

                    {/* Icon Container */}
                    <div
                      className={`
                        w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105
                        ${
                          selected
                            ? "bg-rose-100 shadow-inner"
                            : "bg-rose-50/80 group-hover:bg-rose-100/70"
                        }
                      `}
                    >
                      <img
                        src={item.icon}
                        alt={item.text}
                        className="h-10 w-10 object-contain"
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className={`
                        text-lg font-bold mb-2 transition-colors duration-200
                        ${selected ? "text-rose-700" : "text-gray-800"}
                      `}
                    >
                      {item.text}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Bottom Action & Summary Card ─────────────────────────── */}
          <div className="mt-12 bg-white rounded-3xl shadow-xl border border-rose-100 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 font-bold text-xl">
                {selectedOptions.length}
              </div>
              <div>
                <p className="text-gray-900 font-bold text-lg">
                  {selectedOptions.length === 0
                    ? "No services selected yet"
                    : `${selectedOptions.length} service${selectedOptions.length > 1 ? "s" : ""} selected`}
                </p>
                <p className="text-gray-500 text-sm">
                  {selectedOptions.length === 0
                    ? "Click on any cards above to pick the required services"
                    : "Ready to proceed and view available nurturers"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              {selectedOptions.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllSelections}
                  className="text-gray-500 hover:text-rose-600 text-sm font-medium px-4 py-2 rounded-xl hover:bg-rose-50 transition-colors"
                >
                  Clear all
                </button>
              )}

              <button
                type="button"
                onClick={handleContinue}
                disabled={selectedOptions.length === 0 || isLoading}
                className={`
                  flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl font-semibold text-white text-base
                  bg-gradient-to-r from-rose-500 to-pink-500 shadow-md shadow-rose-500/25 transition-all duration-300
                  ${
                    selectedOptions.length === 0 || isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-lg hover:shadow-rose-500/35 hover:-translate-y-0.5 active:translate-y-0"
                  }
                `}
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Loading nurturers...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CareNurturers;
