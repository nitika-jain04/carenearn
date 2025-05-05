import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import HelpList from "../components/HelpList";
import FindaJob from "../components/FindaJob";

function FindHelp() {
  const [btnClicked, setBtnClicked] = useState(false);

  return (
    <div>
      <Navbar />

      <div className="flex flex-col lg:flex-row gap-10">
        {btnClicked ? <HelpList /> : <FindaJob />}
      </div>

      <Footer />
    </div>
  );
}

export default FindHelp;
