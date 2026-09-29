import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./footer";

function HelpList() {
  const location = useLocation();
  const navigate = useNavigate();
  const caretakers = location.state?.caretakers || [];
  const searchCriteria = location.state?.searchCriteria || "";
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Get current user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  const handleCaretakerClick = (caretaker) => {
    setSelectedCaretaker(caretaker);
    setShowModal(true);
    setNotification(null);
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      /* 
      // =========================================================================
      // BACKEND API CALL (Bypassed / Commented out as requested)
      // =========================================================================
      const activeUser = currentUser || {
        name: "Guest User",
        phoneNumber: "+91 98765 43210",
        emailId: "guest@carenearn.com",
        userType: "Care Receiver",
        purposes: [],
      };

      const requestBody = {
        customer: {
          name: activeUser.name || "Customer",
          phoneNumber: activeUser.phoneNumber || "",
          emailId: activeUser.emailId || "",
          userType: activeUser.userType || "Care Receiver",
          purposes: activeUser.purposes || [],
        },
        selectedUser: selectedCaretaker,
        status: "Pending",
      };

      console.log("request", requestBody);

      const response = await fetch(
        "http://192.168.0.205:5001/api/careNearn/notification/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const text = await response.text();
        console.log("response", text);
      } else {
        throw new Error("Failed to confirm booking");
      }
      // =========================================================================
      */

      // Directly bypass API and generate booking details
      const refId = "CN-" + Math.floor(100000 + Math.random() * 900000);
      setBookingDetails({
        referenceId: refId,
        caretaker: selectedCaretaker,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      });

      // Close the profile/service selection modal and open the confirmation modal
      setShowModal(false);
      setBookingConfirmed(true);
    } catch (error) {
      console.error("Error confirming booking:", error);
      setNotification({
        type: "error",
        message: "Failed to confirm booking. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNotification(null);
  };

  const handleCloseConfirmation = () => {
    setBookingConfirmed(false);
    setBookingDetails(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-col md:flex-row gap-5 p-5 flex-grow">
        <div className="w-full md:w-1/2">
          <img
            src="/find-help.png"
            alt="Find Help"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <p className="font-semibold text-3xl text-rose-500 tracking-wide">
            {caretakers.length > 0
              ? "List of available people"
              : "No matching people found"}
          </p>

          {searchCriteria && (
            <p className="text-gray-600">Search criteria: {searchCriteria}</p>
          )}

          {caretakers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 bg-rose-50 rounded-lg">
              <img
                src="/default-profile.svg"
                alt="No results"
                className="w-32 h-32 mb-4"
              />
              <p className="text-lg text-gray-600 mb-2">
                We couldn't find any caretakers matching your criteria.
              </p>
              <p className="text-gray-500 mb-6">
                Please try adjusting your search options.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-md transition-colors"
                >
                  Back to Search
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md transition-colors"
                >
                  Go to Home
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {caretakers.map((caretaker, index) => (
                <div
                  key={index}
                  onClick={() => handleCaretakerClick(caretaker)}
                  className="flex flex-col bg-rose-50 border border-rose-200 py-2 px-2 rounded-md w-full hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={caretaker.picture || "/default-profile.svg"}
                      alt={caretaker.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-lg">{caretaker.name}</p>
                      <p className="text-sm text-gray-600">
                        {caretaker.educationalQualifications}
                      </p>
                      <div className="flex gap-5 mt-1">
                        <p className="text-sm">📞 {caretaker.phoneNumber}</p>
                        {caretaker.emailId && (
                          <p className="text-sm">✉️ {caretaker.emailId}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── 1. Caretaker / Profile Details Modal ─────────────────────────────── */}
      {showModal && selectedCaretaker && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl border border-rose-100 flex flex-col relative">
            
            {/* Header Banner */}
            <div className="relative bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-6 py-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={selectedCaretaker.picture || "/default-profile.svg"}
                  alt={selectedCaretaker.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/60 shadow-md bg-white"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                      {selectedCaretaker.name}
                    </h3>
                    {selectedCaretaker.userTypes?.map((role, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/30"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                  <p className="text-rose-100 text-xs sm:text-sm font-medium mt-0.5">
                    {selectedCaretaker.profession || "Care Specialist"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                disabled={isLoading}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Modal Body - Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-grow text-gray-700 text-sm">
              {notification && (
                <div
                  className={`p-3.5 rounded-2xl font-medium text-xs sm:text-sm border ${
                    notification.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-rose-50 text-rose-800 border-rose-200"
                  }`}
                >
                  {notification.message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Left Column: Personal Information & Contact */}
                <div className="col-span-1 space-y-4">
                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60 space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-rose-600 border-b border-gray-200 pb-1.5">
                      Contact Info
                    </h4>

                    {selectedCaretaker.phoneNumber && (
                      <div>
                        <span className="text-[11px] font-semibold text-gray-400 block">Phone</span>
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                          {selectedCaretaker.phoneNumber}
                        </span>
                      </div>
                    )}

                    {selectedCaretaker.emailId && (
                      <div>
                        <span className="text-[11px] font-semibold text-gray-400 block">Email</span>
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm break-all">
                          {selectedCaretaker.emailId}
                        </span>
                      </div>
                    )}

                    {selectedCaretaker.dateOfBirth && (
                      <div>
                        <span className="text-[11px] font-semibold text-gray-400 block">Date of Birth</span>
                        <span className="font-medium text-gray-800 text-xs sm:text-sm">
                          {selectedCaretaker.dateOfBirth}
                        </span>
                      </div>
                    )}

                    {(selectedCaretaker.address || selectedCaretaker.pincode) && (
                      <div>
                        <span className="text-[11px] font-semibold text-gray-400 block">Location</span>
                        <span className="font-medium text-gray-800 text-xs sm:text-sm">
                          {selectedCaretaker.address}
                          {selectedCaretaker.pincode ? `, ${selectedCaretaker.pincode}` : ""}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60 space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-rose-600 border-b border-gray-200 pb-1.5">
                      Qualifications & Background
                    </h4>

                    {selectedCaretaker.educationalQualifications && (
                      <div>
                        <span className="text-[11px] font-semibold text-gray-400 block">Education</span>
                        <span className="font-medium text-gray-800 text-xs sm:text-sm">
                          {selectedCaretaker.educationalQualifications}
                        </span>
                      </div>
                    )}

                    {selectedCaretaker.reasonToJoin && (
                      <div>
                        <span className="text-[11px] font-semibold text-gray-400 block">Reason to Join</span>
                        <p className="text-gray-700 italic text-xs leading-relaxed mt-0.5">
                          "{selectedCaretaker.reasonToJoin}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Services Offered & Verified Documents */}
                <div className="col-span-1 md:col-span-2 space-y-5">
                  
                  {/* Services Offered */}
                  <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/60">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-rose-600 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      Services Offered
                    </h4>

                    {selectedCaretaker.purposes && selectedCaretaker.purposes.length > 0 ? (
                      <div className="space-y-3.5">
                        {selectedCaretaker.purposes.map((purpose, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-2xs space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <h5 className="font-bold text-gray-900 text-xs sm:text-sm">
                                {purpose.roleName} <span className="text-rose-500">·</span> {purpose.categoryName}
                              </h5>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {purpose.items
                                ?.filter((item) => item.selected)
                                ?.map((item, itemIndex) => (
                                  <span
                                    key={itemIndex}
                                    className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200/70 rounded-lg text-xs font-semibold"
                                  >
                                    ✓ {item.label}
                                  </span>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-xs italic">No specific services listed.</p>
                    )}
                  </div>

                  {/* Documents Section */}
                  <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/60">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-rose-600 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      Verified Documents
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-xl border border-gray-200/80 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-gray-800">Address Proof</p>
                          <p className="text-[11px] text-gray-400">Identity verification</p>
                        </div>
                        {selectedCaretaker.addressProof ? (
                          <a
                            href={selectedCaretaker.addressProof}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-bold text-xs transition-colors"
                          >
                            View
                          </a>
                        ) : (
                          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                            Verified
                          </span>
                        )}
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-gray-200/80 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-gray-800">Aadhar Card</p>
                          <p className="text-[11px] text-gray-400">Government ID</p>
                        </div>
                        {selectedCaretaker.aadharCard ? (
                          <a
                            href={selectedCaretaker.aadharCard}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-bold text-xs transition-colors"
                          >
                            View
                          </a>
                        ) : (
                          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Modal Footer / Action Bar */}
            <div className="px-6 py-4 bg-slate-50 border-t border-gray-200/80 flex justify-end items-center gap-3">
              <button
                onClick={handleCloseModal}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-white font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-500/25 hover:shadow-lg hover:scale-105 active:scale-100 transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Confirm Booking"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── 2. Booking Confirmed Modal ────────────────────────────── */}
      {bookingConfirmed && bookingDetails && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 sm:p-10 w-full max-w-lg shadow-2xl border border-rose-100 text-center relative overflow-hidden transform transition-all scale-100">
            {/* Background Glows */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-rose-100 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-pink-100 rounded-full blur-2xl pointer-events-none" />

            {/* Success Icon */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-400 to-emerald-600 text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/30 text-4xl font-bold">
              ✓
            </div>

            {/* Headline */}
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
              Booking Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Your Booking is Confirmed!
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-sm mx-auto leading-relaxed">
              We have notified <strong>{bookingDetails.caretaker?.name}</strong> about your booking. They will reach out to you shortly to coordinate timings.
            </p>

            {/* Summary Details Card */}
            <div className="bg-slate-50/80 p-5 rounded-2xl border border-gray-200/70 text-left space-y-2.5 my-6 text-xs sm:text-sm">
              <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
                <span className="text-gray-500">Booking Reference:</span>
                <span className="font-mono font-bold text-rose-600">
                  {bookingDetails.referenceId}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
                <span className="text-gray-500">Caregiver / Client:</span>
                <span className="font-bold text-gray-900">
                  {bookingDetails.caretaker?.name}
                </span>
              </div>
              {bookingDetails.caretaker?.phoneNumber && (
                <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
                  <span className="text-gray-500">Contact Number:</span>
                  <span className="font-semibold text-gray-800">
                    {bookingDetails.caretaker?.phoneNumber}
                  </span>
                </div>
              )}
              {bookingDetails.caretaker?.gender && (
                <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
                  <span className="text-gray-500">Gender & Age:</span>
                  <span className="font-semibold text-gray-800">
                    {bookingDetails.caretaker?.gender} {bookingDetails.caretaker?.age ? `(${bookingDetails.caretaker?.age} yrs)` : ""}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Status:</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Confirmed
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleCloseConfirmation}
                className="flex-1 py-3 px-5 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-rose-500 to-pink-500 shadow-md shadow-rose-500/25 hover:shadow-lg hover:scale-105 active:scale-100 transition-all cursor-pointer"
              >
                Done
              </button>

              <button
                type="button"
                onClick={() => {
                  handleCloseConfirmation();
                  navigate("/");
                }}
                className="flex-1 py-3 px-5 rounded-xl font-bold text-gray-700 text-sm bg-slate-100 hover:bg-slate-200 active:scale-100 transition-all cursor-pointer"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default HelpList;
