import React from "react";
import { useNavigate } from "react-router";

function FindaJob() {
  const navigate = useNavigate();

  const childData = [
    { text: "Home Works", icon: "/help_job/child-ed.png" },
    { text: "Projects", icon: "/help_job/Project.png" },
    { text: "Exam", icon: "/help_job/Exam.png" },
    { text: "Upgrade Skills", icon: "/help_job/Upgrade-Skills.png" },
    { text: "Child Care", icon: "/help_job/child-care.png" },
  ];

  const activitiesData = [
    { text: "Chess/Board Games", icon: "/help_job/board-games.png" },
    {
      text: "Creative arts/Painting/Sculpture",
      icon: "/help_job/arts.png",
    },
    {
      text: "Creative Games/Lego/Builders/Writings",
      icon: "/help_job/lego.png",
    },
    { text: "Story Session", icon: "/help_job/story.png" },
  ];

  const seniorsData = [
    { text: "Take them to hospital", icon: "/help_job/hospital.png" },
    {
      text: "Spend time reading books and stories",
      icon: "/help_job/books.png",
    },
    {
      text: "Involve them in anything they like",
      icon: "/help_job/engage.png",
    },
    { text: "Take them to shopping", icon: "/help_job/shopping.png" },
  ];

  console.log(childData, activitiesData, seniorsData);
  return (
    <div className="px-20 my-3">
      <p className="text-2xl text-rose-500 font-semibold pb-5">
        Type of Help Needed:
      </p>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">📚Child's Education</p>

          <div className="flex gap-10">
            {childData.map((data) => {
              return (
                <div className="bg-pink-100 rounded-md py-5 flex flex-col gap-3 items-center justify-center w-52 transition-all duration-200 ease-in-out border hover:border-rose-500 hover:shadow-lg">
                  <img src={data.icon} alt="" className="h-10" />
                  <p className="tracking-wide text-base font-medium text-center w-[90%] break-words whitespace-normal">
                    {data.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">🎨Activities</p>

          <div className="flex gap-10">
            {activitiesData.map((data) => {
              return (
                <div className="bg-pink-100 rounded-md py-5 flex flex-col gap-3 items-center justify-center w-52 transition-all duration-200 ease-in-out border hover:border-rose-500 hover:shadow-lg">
                  <img src={data.icon} alt="" className="h-10" />
                  <p className="tracking-wide text-base font-medium text-center w-[90%] break-words whitespace-normal">
                    {data.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">
            👵Care for Loved Ones - Seniors
          </p>

          <div className="flex gap-10">
            {seniorsData.map((data) => {
              return (
                <div className="bg-pink-100 rounded-md py-5 flex flex-col gap-3 items-center justify-center w-52 transition-all duration-200 ease-in-out border hover:border-rose-500 hover:shadow-lg">
                  <img src={data.icon} alt="" className="h-10" />
                  <p className="tracking-wide text-base font-medium text-center w-[90%] break-words whitespace-normal">
                    {data.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            onClick={() => navigate("/caretakers")}
            className="bg-rose-500 text-white text-xl px-28 py-2 rounded-md w-fit font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default FindaJob;
