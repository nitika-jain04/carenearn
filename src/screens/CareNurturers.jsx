import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

function CareNurturers() {
  const data = [
    { text: "Organise my party", icon: "/help_job/party.png" },
    {
      text: "Organise party games",
      icon: "/help_job/board-games.png",
    },
    {
      text: "Food/bakery/dessert",
      icon: "/help_job/dessert.png",
    },
  ];

  return (
    <div className="flex flex-col">
      <Navbar />

      <div className="px-20 my-10 flex flex-col gap-5 min-h-screen">
        {" "}
        <div className="flex gap-10">
          {data.map((data) => {
            return (
              <div className="bg-pink-100 rounded-md py-5 flex flex-col gap-3 items-center justify-center w-52">
                <img src={data.icon} alt="" className="h-12" />
                <p className="tracking-wide text-base font-medium text-center w-[90%] break-words whitespace-normal">
                  {data.text}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-rose-500 text-white text-xl px-28 py-2 rounded-md w-fit font-medium"
          >
            Continue
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CareNurturers;
