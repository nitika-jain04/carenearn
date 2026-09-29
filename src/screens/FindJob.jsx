import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import FindaJob from "../components/FindaJob";

function FindJob() {
  const childData = [
    { text: "Home Works", icon: "/help_job/child-ed.png" },
    { text: "Projects", icon: "/help_job/Project.png" },
    { text: "Exams", icon: "/help_job/Exam.png" },
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
    { text: "Story Sessions", icon: "/help_job/story.png" },
  ];

  const seniorsData = [
    { text: "Take them to hospital", icon: "/help_job/hospital.png" },
    {
      text: "Spend time reading books or stories",
      icon: "/help_job/books.png",
    },
    {
      text: "Involve them in anything they like",
      icon: "/help_job/engage.png",
    },
    { text: "Take them to shopping", icon: "/help_job/shopping.png" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <FindaJob
          pageType="job"
          childData={childData}
          activitiesData={activitiesData}
          seniorsData={seniorsData}
        />
      </main>

      <Footer />
    </div>
  );
}

export default FindJob;
