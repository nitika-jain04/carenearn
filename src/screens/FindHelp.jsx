import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Link } from "react-router";
import HelpList from "../components/HelpList";

function FindHelp() {
  const [btnClicked, setBtnClicked] = useState(false);

  return (
    <div>
      <Navbar />

      <div className="flex flex-col lg:flex-row gap-10 py-5 px-5">
        <img src="/find-help.png" alt="Seek Help" className="lg:w-1/2" />

        {btnClicked ? (
          <HelpList />
        ) : (
          <div className="flex flex-col gap-10">
            <p className="text-2xl text-rose-500 font-semibold">
              Type of Help Needed:
            </p>
            {/* <div className="flex gap-10 flex-wrap mt-10">
            <label className="flex items-center gap-2 text-base rounded-md bg-pink-50 p-4">
            <input
            type="checkbox"
            value="Child Care"
            className="text-lg bg-rose-500"
            />
            👧Child Care
            </label>
            <label className="flex items-center gap-2 text-base rounded-md bg-pink-50 p-4">
            <input type="checkbox" value="Child Education" />
            🎓Child Education
            </label>
            <label className="flex items-center gap-2 text-base rounded-md bg-pink-50 p-4">
            <input type="checkbox" value="Parents Care" />
            👴Parents Care
            </label>
            <label className="flex items-center gap-2 text-base rounded-md bg-pink-50 p-4">
            <input type="checkbox" value="Special Need" />
            ♿Special Need
            </label>
            </div> */}
            <div className="flex gap-5 flex-wrap">
              {[
                { label: "👧 Child Care", value: "Child Care" },
                { label: "🎓 Child Education", value: "Child Education" },
                { label: "👴 Parents Care", value: "Parents Care" },
                { label: "♿ Special Need", value: "Special Need" },
              ].map((item) => (
                <label
                  key={item.value}
                  className="flex items-center gap-2 text-base rounded-md bg-pink-50 p-4 w-48"
                >
                  <input
                    type="checkbox"
                    value={item.value}
                    className="text-lg"
                  />
                  {item.label}
                </label>
              ))}
            </div>

            <button
              className="bg-rose-500 text-white text-xl px-28 py-2 rounded-md w-fit font-medium"
              onClick={() => setBtnClicked(true)}
            >
              Search
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default FindHelp;
