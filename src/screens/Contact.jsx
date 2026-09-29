import React from "react";
import Navbar from "../components/Navbar";
import ContactUs from "../components/ContactUs";
import Footer from "../components/footer";

function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <ContactUs />
      </main>

      <Footer />
    </div>
  );
}

export default Contact;
