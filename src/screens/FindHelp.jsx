import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import HelpList from "../components/HelpList";
import FindaJob from "../components/FindaJob";

function FindHelp() {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col lg:flex-row gap-10">
        {/* <HelpList />  */}
        <FindaJob />
      </div>

      <Footer />
    </div>
  );
}

export default FindHelp;
