import React from "react";
import Navbar from "../components/Navbar";
import HomePage from "../components/HomePage";
import Services from "../components/Services";
import ContactUs from "../components/ContactUs";
import Footer from "../components/footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HomePage />
      {/* <Services />
      <ContactUs />
      <Footer /> */}
    </div>
  );
};

export default LandingPage;
