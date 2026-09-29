import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HomePage from "../components/HomePage";
import PurposeWindow from "../components/PurposeWindow";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const [userPurposes, setUserPurposes] = useState([]);
  const [showPurposeWindow, setShowPurposeWindow] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenWindow = localStorage.getItem("hasSeenPurposeWindow");
    const purposes = JSON.parse(localStorage.getItem("userPurposes") || "[]");
    const userType = localStorage.getItem("selectedUserType");

    if (
      (purposes.length > 0 || !hasSeenWindow) &&
      window.location.search.includes("fromLogin=true")
    ) {
      setUserPurposes(purposes);
      setSelectedUserType(userType);
      setShowPurposeWindow(true);
      // Remove the query parameter so it doesn't show on refresh
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleSave = (purposes) => {
    localStorage.setItem("userPurposes", JSON.stringify(purposes));
    localStorage.setItem("hasSeenPurposeWindow", "true");
    setShowPurposeWindow(false);

    navigate("/", { replace: true });
  };

  const handleSkip = () => {
    localStorage.setItem("hasSeenPurposeWindow", "true");
    setShowPurposeWindow(false);
    // Ensure we're on the landing page
    navigate("/", { replace: true });
  };

  return (
    <div>
      <Navbar />
      <HomePage />

      {showPurposeWindow && (
        <PurposeWindow
          initialPurposes={userPurposes}
          selectedUserType={selectedUserType}
          onSave={handleSave}
          onSkip={handleSkip}
        />
      )}
    </div>
  );
};

export default LandingPage;
