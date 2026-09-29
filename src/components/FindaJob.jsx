import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function FindaJob({ childData, activitiesData, seniorsData, pageType = "help" }) {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const isLoggedIn = useSelector((state) => state.login.login);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isJobPage = pageType === "job";

  const getUserData = () => {
    const userDataString = localStorage.getItem("user");
    if (!userDataString) return null;
    return JSON.parse(userDataString);
  };

  const isSelected = (optionText) => {
    return selectedOptions.some((option) => option.text === optionText);
  };

  const buildRequestData = () => {
    const userData = getUserData();
    if (!userData) throw new Error("User data not found");

    const purposes = [];
    const categories = {
      "child-education": "Child Education",
      activities: "Activities",
      "senior-care": "Senior Care",
    };

    const categoryMap = {};
    selectedOptions.forEach((option) => {
      if (!categoryMap[option.category]) categoryMap[option.category] = [];
      categoryMap[option.category].push({
        label: option.text,
        selected: true,
      });
    });

    Object.entries(categoryMap).forEach(([category, items]) => {
      purposes.push({
        roleName: isJobPage ? "Care Giver" : "Care Receiver",
        categoryName: categories[category],
        items,
      });
    });

    return {
      name: userData.name || "Unknown",
      phoneNumber: userData.phoneNumber || "",
      emailId: userData.emailId || "",
      userType: isJobPage ? "Care Giver" : "Care Receiver",
      purposes,
    };
  };

  const toggleSelection = (category, optionText) => {
    setSelectedOptions((prev) => {
      const exists = prev.some(
        (option) => option.category === category && option.text === optionText
      );
      if (exists) {
        return prev.filter(
          (option) =>
            !(option.category === category && option.text === optionText)
        );
      }
      return [...prev, { category, text: optionText }];
    });
  };

  const clearAllSelections = () => {
    setSelectedOptions([]);
    setError(null);
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
      console.log("Request Data:", requestData);

      // ---------------------------------------------------------------
      // MOCK POOLS FOR CARE GIVERS (Find Help) & CARE RECEIVERS (Find Job)
      // ---------------------------------------------------------------
      const mockCareGiversPool = [
        {
          id: 101,
          name: "Priya Sharma",
          phoneNumber: "9876543210",
          emailId: "priya.sharma@example.com",
          dateOfBirth: "1995-06-15",
          address: "B-12, Sector 62, Noida",
          pincode: "201301",
          educationalQualifications: "M.Sc Child Psychology",
          profession: "Child Care Specialist",
          reasonToJoin: "Passionate about child development and homework help",
          picture: "/default-profile.svg",
          userTypes: ["Care Giver"],
          purposes: [
            {
              roleName: "Care Giver",
              categoryName: "Child Education",
              items: [
                { label: "Home Works", selected: true },
                { label: "Homework", selected: true },
                { label: "Projects", selected: true },
                { label: "Child Care", selected: true },
              ],
            },
          ],
          addressProof: "",
          aadharCard: "",
        },
        {
          id: 102,
          name: "Rahul Mehta",
          phoneNumber: "9123456780",
          emailId: "rahul.mehta@example.com",
          dateOfBirth: "1990-03-22",
          address: "A-45, Sector 18, Noida",
          pincode: "201301",
          educationalQualifications: "B.Ed, M.A. English",
          profession: "Home Tutor & Game Master",
          reasonToJoin: "Want to make a difference in children's lives",
          picture: "/default-profile.svg",
          userTypes: ["Care Giver"],
          purposes: [
            {
              roleName: "Care Giver",
              categoryName: "Child Education",
              items: [
                { label: "Exams", selected: true },
                { label: "Upgrade Skills", selected: true },
              ],
            },
            {
              roleName: "Care Giver",
              categoryName: "Activities",
              items: [
                { label: "Story Sessions", selected: true },
                { label: "Chess/Board Games", selected: true },
                { label: "Creative Games/Lego/Builders/Writings", selected: true },
              ],
            },
          ],
          addressProof: "",
          aadharCard: "",
        },
        {
          id: 103,
          name: "Sunita Verma",
          phoneNumber: "9988776655",
          emailId: "sunita.verma@example.com",
          dateOfBirth: "1985-11-10",
          address: "C-78, Sector 50, Noida",
          pincode: "201301",
          educationalQualifications: "B.Sc Nursing",
          profession: "Senior Care Specialist",
          reasonToJoin: "Dedicated to senior citizen wellbeing",
          picture: "/default-profile.svg",
          userTypes: ["Care Giver"],
          purposes: [
            {
              roleName: "Care Giver",
              categoryName: "Senior Care",
              items: [
                { label: "Take them to hospital", selected: true },
                { label: "Spend time reading books or stories", selected: true },
                { label: "Involve them in anything they like", selected: true },
                { label: "Take them to shopping", selected: true },
              ],
            },
          ],
          addressProof: "",
          aadharCard: "",
        },
        {
          id: 104,
          name: "Ananya Kapoor",
          phoneNumber: "9811223344",
          emailId: "ananya.arts@example.com",
          dateOfBirth: "1997-08-14",
          address: "E-14, Vasant Kunj, Delhi",
          pincode: "110070",
          educationalQualifications: "B.F.A. Fine Arts",
          profession: "Art & Activity Instructor",
          reasonToJoin: "Fostering creativity in kids and senior citizens",
          picture: "/default-profile.svg",
          userTypes: ["Care Giver"],
          purposes: [
            {
              roleName: "Care Giver",
              categoryName: "Activities",
              items: [
                { label: "Creative arts/Painting/Sculpture", selected: true },
                { label: "Story Sessions", selected: true },
              ],
            },
          ],
          addressProof: "",
          aadharCard: "",
        },
      ];

      const mockCareReceiversPool = [
        {
          id: 301,
          name: "Kavita Malhotra (Family)",
          phoneNumber: "9810012345",
          emailId: "kavita.m@example.com",
          dateOfBirth: "1988-04-12",
          address: "Flat 402, Green Glen Layout, Bangalore",
          pincode: "560103",
          educationalQualifications: "M.Tech Software Systems",
          profession: "IT Director & Parent",
          reasonToJoin: "Looking for trustworthy tutor for children's exams and homework",
          picture: "/default-profile.svg",
          userTypes: ["Care Receiver"],
          purposes: [
            {
              roleName: "Care Receiver",
              categoryName: "Child Education",
              items: [
                { label: "Home Works", selected: true },
                { label: "Homework", selected: true },
                { label: "Exams", selected: true },
              ],
            },
          ],
          addressProof: "",
          aadharCard: "",
        },
        {
          id: 302,
          name: "Rameshwar Sen",
          phoneNumber: "9845098765",
          emailId: "rameshwar.sen@example.com",
          dateOfBirth: "1950-01-20",
          address: "House 12, Indiranagar, Bangalore",
          pincode: "560038",
          educationalQualifications: "Retd. Bank Manager",
          profession: "Senior Citizen",
          reasonToJoin: "Needs companion for hospital visits and grocery shopping",
          picture: "/default-profile.svg",
          userTypes: ["Care Receiver"],
          purposes: [
            {
              roleName: "Care Receiver",
              categoryName: "Senior Care",
              items: [
                { label: "Take them to hospital", selected: true },
                { label: "Take them to shopping", selected: true },
                { label: "Spend time reading books or stories", selected: true },
              ],
            },
          ],
          addressProof: "",
          aadharCard: "",
        },
        {
          id: 303,
          name: "Deepak & Neha Roy",
          phoneNumber: "9711224466",
          emailId: "neharoy@example.com",
          dateOfBirth: "1992-09-05",
          address: "B-201, HSR Layout, Bangalore",
          pincode: "560102",
          educationalQualifications: "Architect",
          profession: "Working Couple",
          reasonToJoin: "Seeking creative arts and story session guides for weekend engagement",
          picture: "/default-profile.svg",
          userTypes: ["Care Receiver"],
          purposes: [
            {
              roleName: "Care Receiver",
              categoryName: "Activities",
              items: [
                { label: "Creative arts/Painting/Sculpture", selected: true },
                { label: "Story Sessions", selected: true },
                { label: "Chess/Board Games", selected: true },
              ],
            },
          ],
          addressProof: "",
          aadharCard: "",
        },
      ];

      const pool = isJobPage ? mockCareReceiversPool : mockCareGiversPool;
      const selectedTexts = selectedOptions.map((opt) => opt.text);

      const normalizeText = (text) =>
        (text || "").toLowerCase().replace(/[^a-z0-9]/g, "");

      // Filter pool by chosen service labels
      const filteredPeople = pool.filter((person) => {
        return person.purposes.some((purpose) =>
          purpose.items.some(
            (item) =>
              item.selected &&
              selectedTexts.some((selectedLabel) => {
                const normSel = normalizeText(selectedLabel);
                const normItem = normalizeText(item.label);
                return (
                  normSel === normItem ||
                  normSel.includes(normItem) ||
                  normItem.includes(normSel)
                );
              })
          )
        );
      });

      // Use filtered results or fallback to full pool if custom matching
      const caretakersToPass = filteredPeople.length > 0 ? filteredPeople : pool;

      navigate("/caretakers", {
        state: {
          caretakers: caretakersToPass,
          searchCriteria: selectedTexts.join(", "),
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      navigate("/caretakers", { state: { caretakers: result } });
      */
      // ---------------------------------------------------------------

    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to fetch caretakers. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderOptionCards = (data, category) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map((item, index) => {
          const selected = isSelected(item.text);
          return (
            <div
              key={index}
              onClick={() => toggleSelection(category, item.text)}
              className={`
                group relative flex flex-col items-center justify-between p-5 rounded-2xl cursor-pointer
                transition-all duration-300 transform select-none min-h-[140px]
                ${selected
                  ? "bg-gradient-to-b from-rose-50 to-pink-50 border-2 border-rose-500 shadow-lg shadow-rose-500/15 -translate-y-1 scale-[1.02]"
                  : "bg-white border border-gray-200/80 hover:border-rose-300 hover:shadow-md hover:-translate-y-0.5"
                }
              `}
            >
              {/* Active Selection Checkmark Badge */}
              <div
                className={`
                  absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300
                  ${selected
                    ? "bg-rose-500 text-white scale-100 opacity-100"
                    : "bg-gray-100 text-transparent scale-75 opacity-0 group-hover:opacity-40"
                  }
                `}
              >
                <svg
                  className="w-3 h-3 stroke-current"
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
                  w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-colors duration-300
                  ${selected
                    ? "bg-rose-100 shadow-inner"
                    : "bg-rose-50/60 group-hover:bg-rose-100/70"
                  }
                `}
              >
                <img
                  src={item.icon}
                  alt={item.text}
                  className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Label */}
              <p
                className={`
                  text-sm text-center font-medium leading-snug break-words transition-colors duration-200
                  ${selected ? "text-rose-700 font-semibold" : "text-gray-700"}
                `}
              >
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  const getCategoryCount = (categoryKey) => {
    return selectedOptions.filter((opt) => opt.category === categoryKey).length;
  };

  return (
    <div className="w-full flex-grow">
      {/* ── Hero Banner ────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        <img
          src="/our-vision.jpg"
          alt={isJobPage ? "Find a Job" : "Find Help"}
          className="h-60 w-full object-cover object-center rounded-b-[60px] md:rounded-b-[100px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600/80 via-rose-500/70 to-pink-500/70 rounded-b-[60px] md:rounded-b-[100px]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs md:text-sm font-medium tracking-wider uppercase mb-2 shadow-sm border border-white/30">
            {isJobPage ? "💼 Flexible Opportunities" : "🤝 Caring Companions & Tutors"}
          </span>
          <h1 className="text-white font-bold text-4xl md:text-5xl drop-shadow-md">
            {isJobPage ? "Find a Job / Provide Care" : "Find Help"}
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-xl mt-2 font-normal">
            {isJobPage
              ? "Select the services and categories you'd like to provide and connect with families needing your help."
              : "Choose the services you need, and we'll connect you with vetted, trustworthy caregivers and educators."}
          </p>
        </div>
      </div>

      {/* ── Main Content Area ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 py-10">
        {/* Error Notification */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl flex items-center justify-between shadow-sm animate-fade-in">
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

        {/* Categories List */}
        <div className="space-y-10">
          {/* Section 1: Child Education */}
          <div className="bg-slate-50/70 p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Child Education</h2>
                  <p className="text-xs md:text-sm text-gray-500">Academics, projects, tutoring, and foundational learning</p>
                </div>
              </div>
              {getCategoryCount("child-education") > 0 && (
                <span className="bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {getCategoryCount("child-education")} selected
                </span>
              )}
            </div>
            {renderOptionCards(childData, "child-education")}
          </div>

          {/* Section 2: Activities */}
          <div className="bg-slate-50/70 p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Fun & Creative Activities</h2>
                  <p className="text-xs md:text-sm text-gray-500">Board games, painting, lego building, and storytelling</p>
                </div>
              </div>
              {getCategoryCount("activities") > 0 && (
                <span className="bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {getCategoryCount("activities")} selected
                </span>
              )}
            </div>
            {renderOptionCards(activitiesData, "activities")}
          </div>

          {/* Section 3: Senior Care */}
          <div className="bg-slate-50/70 p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👵</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Care for Loved Ones – Seniors</h2>
                  <p className="text-xs md:text-sm text-gray-500">Hospital visits, reading companionship, shopping, and outings</p>
                </div>
              </div>
              {getCategoryCount("senior-care") > 0 && (
                <span className="bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {getCategoryCount("senior-care")} selected
                </span>
              )}
            </div>
            {renderOptionCards(seniorsData, "senior-care")}
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
                  : "Ready to proceed and find matching profiles"}
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
                ${selectedOptions.length === 0 || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-lg hover:shadow-rose-500/35 hover:-translate-y-0.5 active:translate-y-0"
                }
              `}
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Loading profiles...</span>
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
    </div>
  );
}

export default FindaJob;
