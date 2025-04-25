import React from "react";
import Navbar from "./Navbar";
import Footer from "./footer";

function HelpList() {
  return (
    <div className="w-1/2 flex flex-col gap-5">
      <p className="font-semibold text-3xl text-rose-500 tracking-wide">
        All List
      </p>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col bg-rose-50 border border-rose-500 py-1 px-5 rounded-md w-3/4">
          <p className="font-semibold text-base">Ravi Kumar</p>
          <p className="text-sm">B.Sc. Nursing</p>
          <p className="text-sm">📞 9874651230</p>
        </div>
        {/* <div className="flex flex-col bg-rose-50 border border-rose-500 py-1 px-5 rounded-md">
              <p className="font-semibold text-base">Ravi Kumar</p>
              <p className="text-sm">B.Sc. Nursing</p>
              <p className="text-sm">📞 9874651230</p>
            </div>
            <div className="flex flex-col bg-rose-50 border border-rose-500 py-1 px-5 rounded-md">
              <p className="font-semibold text-base">Ravi Kumar</p>
              <p className="text-sm">B.Sc. Nursing</p>
              <p className="text-sm">📞 9874651230</p>
            </div> */}
      </div>

      <div>
        <button className="bg-rose-500 text-white text-xl px-28 py-2 rounded-md w-fit font-medium">
          Continue
        </button>
      </div>
    </div>
  );
}

export default HelpList;
