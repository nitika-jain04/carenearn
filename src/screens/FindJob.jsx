import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import {
  FaPalette,
  FaCubes,
  FaFlask,
  FaHospital,
  FaHeart,
  FaShoppingBag,
  FaSeedling,
  FaUsers,
  FaStar,
  FaRegHeart,
  FaArrowRight,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import { MdChildCare, MdElderly, MdOutlineMenuBook } from "react-icons/md";
import { LuBaby } from "react-icons/lu";
import { IoExtensionPuzzle, IoMusicalNoteSharp } from "react-icons/io5";
import { TbBulbFilled } from "react-icons/tb";

function FindJob() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  const handleCardClick = (title, category) => {
    navigate("/caretakers", {
      state: {
        searchCriteria: title,
        category: category,
        role: "Care Giver",
      },
    });
  };

  const handleFilterClick = (filterKey, elementId) => {
    setActiveFilter(filterKey);
    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const childrenServices = [
    {
      title: "Games & Puzzles",
      desc: "Chess, board games, strategy and problem-solving.",
      image: "/find_opp/01_chess.avif",
      badgeIcon: <IoExtensionPuzzle />,
      badgeBg: "bg-rose-100 text-rose-500",
    },
    {
      title: "Art & Creativity",
      desc: "Painting, drawing, craft, sculpture and creative expression.",
      image: "/find_opp/02_art_painting.avif",
      badgeIcon: <FaPalette />,
      badgeBg: "bg-amber-100 text-amber-700",
    },
    {
      title: "Build & Create",
      desc: "LEGO, making, writing and hands-on projects.",
      image: "/find_opp/03_lego_build.avif",
      badgeIcon: <FaCubes />,
      badgeBg: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Stories & Reading",
      desc: "Reading together, storytelling and imaginative conversations.",
      image: "/find_opp/04_reading_girl.avif",
      badgeIcon: <MdOutlineMenuBook />,
      badgeBg: "bg-purple-100 text-purple-700",
    },
    {
      title: "Explore, Learn & Discover",
      desc: "Science, nature, museums, interesting conversations and projects.",
      image: "/find_opp/05_magnifier_nature.avif",
      badgeIcon: <FaFlask />,
      badgeBg: "bg-cyan-100 text-cyan-700",
    },
  ];

  const seniorServices = [
    {
      title: "Appointments & Hospital Visits",
      desc: "Accompany them to appointments and help with everyday tasks.",
      image: "/find_opp/01_senior_conversation.avif",
      badgeIcon: <FaHospital />,
      badgeBg: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Reading & Conversation",
      desc: "Read together, talk, reminisce, discuss interests or simply spend time.",
      image: "/find_opp/08_grandmother_reading.avif",
      badgeIcon: <MdOutlineMenuBook />,
      badgeBg: "bg-rose-100 text-rose-600",
    },
    {
      title: "Everyday Companionship",
      desc: "Share a meal, take a walk, play a game or join them in activities they enjoy.",
      image: "/find_opp/12_elderly_couple_walk_2.avif",
      badgeIcon: <FaHeart />,
      badgeBg: "bg-amber-100 text-amber-600",
    },
    {
      title: "Shopping & Outings",
      desc: "Accompany them for shopping, errands, walks and outings.",
      image: "/find_opp/elderly_shopping.avif",
      badgeIcon: <FaShoppingBag />,
      badgeBg: "bg-purple-100 text-purple-600",
    },
    {
      title: "Hobbies & Interests",
      desc: "Gardening, music, arts, crafts and more.",
      image: "/find_opp/05_senior_gardening.avif",
      badgeIcon: <FaSeedling />,
      badgeBg: "bg-emerald-100 text-emerald-700",
    },
  ];

  const everyoneServices = [
    {
      title: "Companionship & Conversation",
      desc: "Talk, listen, share and connect.",
      image: "/find_opp/06_friends_conversation.avif",
      badgeIcon: <FaUserFriends />,
      badgeBg: "bg-sky-100 text-sky-700",
    },
    {
      title: "Learning & Mentoring",
      desc: "Share knowledge, skills and life experience.",
      image: "/find_opp/07_learning_together.avif",
      badgeIcon: <TbBulbFilled />,
      badgeBg: "bg-cyan-100 text-cyan-700",
    },
    {
      title: "Creative Projects",
      desc: "Build, explore and create together.",
      image: "/find_opp/09_yoga.avif",
      badgeIcon: <FaStar />,
      badgeBg: "bg-amber-100 text-amber-600",
    },
    {
      title: "Wellness & Recreation",
      desc: "Stay active, enjoy and have fun.",
      image: "/find_opp/09_grandparent_child_gardening.avif",
      badgeIcon: <IoMusicalNoteSharp />,
      badgeBg: "bg-emerald-100 text-emerald-700",
    },
  ];

  const scrollToCategories = () => {
    const el = document.getElementById("category-filter-bar");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 py-4 sm:py-6 w-full">
        {/* ─── Hero Section ─── */}
        <section className="relative bg-white/70 backdrop-blur-xs rounded-3xl p-6 sm:p-8 lg:p-10 border border-rose-100/60 shadow-xs overflow-hidden">
          {/* Subtle warm blobs */}
          <div className="absolute -top-12 -right-12 w-80 h-80 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -left-12 w-64 h-64 bg-amber-50/50 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 right-1/4 w-72 h-72 bg-emerald-50/40 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Headline & CTA */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="text-[#E8436E] font-extrabold tracking-[0.2em] text-[11px] uppercase mb-2">
                FIND CARE
              </span>

              <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#112540] leading-[1.14] tracking-tight">
                Find the right person to support, engage and care for someone you love.
              </h1>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-3.5 max-w-md">
                From everyday support to meaningful companionship, find someone whose time, skills and interests match your family's needs.
              </p>

              <button
                onClick={() => {
                  const el = document.getElementById("sec-children");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E8436E] hover:bg-[#d4335c] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-500/25 transition-all cursor-pointer"
              >
                <span>Explore Care Options</span>
                <FaArrowRight className="text-[11px]" />
              </button>
            </div>

            {/* Center Column: Mother & Daughter Photo */}
            <div className="lg:col-span-4 flex justify-center items-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-3xl overflow-hidden bg-rose-50/40 shadow-xs">
                <img
                  src="/find_opp/07_learning_together.avif"
                  alt="Mother and daughter sharing a warm loving moment"
                  className="w-full h-auto max-h-[310px] object-cover object-center select-none"
                />
              </div>
            </div>

            {/* Right Column: Handwritten Tagline */}
            <div className="lg:col-span-3 flex flex-col justify-center items-start lg:pl-4">
              <div className="font-serif-display text-3xl sm:text-4xl text-[#1E3A5F] italic leading-[1.25] tracking-tight">
                <p>Care.</p>
                <p>Connect.</p>
                <p>Contribute.</p>
              </div>

              <div className="my-2.5 text-[#E8436E]">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>

              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed max-w-[220px]">
                CareNearn brings people together to make everyday life more caring, connected and meaningful.
              </p>
            </div>
          </div>
        </section>


        {/* ─── Category Filter Navigation Bar ─── */}
        <section
          id="category-filter-bar"
          className="my-4 sm:my-6 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-2xl p-1.5 shadow-2xs overflow-x-auto"
        >
          <div className="flex items-center justify-between min-w-max gap-2 px-1">
            {/* All Categories */}
            <button
              onClick={() => handleFilterClick("all", "sec-children")}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeFilter === "all"
                ? "bg-rose-50 text-rose-600 shadow-2xs"
                : "text-slate-600 hover:text-rose-600 hover:bg-slate-50"
                }`}
            >
              <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center text-xs">
                <FaUser />
              </div>
              <span>All Categories</span>
            </button>

            {/* For Children */}
            <button
              onClick={() => handleFilterClick("children", "sec-children")}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeFilter === "children"
                ? "bg-sky-50 text-sky-700 shadow-2xs"
                : "text-slate-600 hover:text-sky-700 hover:bg-slate-50"
                }`}
            >
              <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">
                <MdChildCare />
              </div>
              <span>For Children</span>
            </button>

            {/* For Seniors */}
            <button
              onClick={() => handleFilterClick("seniors", "sec-seniors")}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeFilter === "seniors"
                ? "bg-purple-50 text-purple-700 shadow-2xs"
                : "text-slate-600 hover:text-purple-700 hover:bg-slate-50"
                }`}
            >
              <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm">
                <MdElderly />
              </div>
              <span>For Seniors</span>
            </button>

            {/* For Everyone */}
            <button
              onClick={() => handleFilterClick("everyone", "sec-everyone")}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeFilter === "everyone"
                ? "bg-emerald-50 text-emerald-700 shadow-2xs"
                : "text-slate-600 hover:text-emerald-700 hover:bg-slate-50"
                }`}
            >
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">
                <FaUsers />
              </div>
              <span>For Everyone</span>
            </button>

            {/* Specialised & Learning */}
            <button
              onClick={() => handleFilterClick("specialised", "sec-children")}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeFilter === "specialised"
                ? "bg-amber-50 text-amber-700 shadow-2xs"
                : "text-slate-600 hover:text-amber-700 hover:bg-slate-50"
                }`}
            >
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs">
                <FaStar />
              </div>
              <span>Specialised & Learning</span>
            </button>
          </div>
        </section>

        {/* ─── Main Category Sections ─── */}
        <div className="space-y-5 sm:space-y-6 pt-1">
          {/* ─── 1. For Children Section ─── */}
          <div
            id="sec-children"
            className="bg-[#f0f8fd] border border-sky-100/80 rounded-[28px] p-3 sm:p-5 shadow-2xs"
          >
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-stretch">

              {/* Category Sidebar */}
              <div className="lg:w-[220px] shrink-0 flex flex-col justify-between py-1">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#DCEBF6] text-[#2C7DA0] flex items-center justify-center text-2xl mb-3 shadow-xs">
                    <LuBaby />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    For Children
                  </h2>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                    Play, learn and grow with the right support and companionship.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/caretakers", { state: { category: "Child Education" } })}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#207f8c] hover:bg-[#18646e] text-white font-semibold text-xs active:scale-95 transition-all w-fit mt-4 shadow-2xs"
                >
                  Explore all <FaArrowRight className="text-[9px]" />
                </button>
              </div>

              {/* 5 Photo Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 flex-1">
                {childrenServices.map((service, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCardClick(service.title, "Child Education")}
                    className="bg-white rounded-2xl p-2 flex flex-col items-center text-center shadow-xs border border-sky-100/60 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
                  >
                    {/* Photo */}
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shadow-2xs">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Centered Circular Badge */}
                    <div className={`-mt-3.5 mb-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full ${service.badgeBg} flex items-center justify-center text-xs border-2 border-white shadow-xs group-hover:scale-110 transition-transform`}>
                      {service.badgeIcon}
                    </div>

                    {/* Copy */}
                    <h3 className="font-bold text-xs sm:text-[13px] text-slate-900 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-snug mt-1.5">
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ─── 2. Companionship & Care for Seniors Section ─── */}
          <div
            id="sec-seniors"
            className="bg-[#fff8ee] border border-amber-100/80 rounded-[28px] p-5 sm:p-6 shadow-2xs"
          >
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-5 items-stretch">

              {/* Category Sidebar */}
              <div className="lg:w-[220px] shrink-0 flex flex-col justify-between py-1">
                <div>
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-2xl mb-3 shadow-xs">
                    <MdElderly />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    Companionship & Care for Seniors
                  </h2>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                    Someone to talk to, accompany, help and share everyday life with.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/caretakers", { state: { category: "Senior Care" } })}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f6caa7] hover:bg-[#eab690] text-[#8c3d13] font-semibold text-xs active:scale-95 transition-all w-fit mt-4 shadow-2xs"
                >
                  Explore all <FaArrowRight className="text-[9px]" />
                </button>
              </div>

              {/* 5 Photo Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 flex-1">
                {seniorServices.map((service, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCardClick(service.title, "Senior Care")}
                    className="bg-white rounded-2xl p-2 flex flex-col items-center text-center shadow-xs border border-amber-100/60 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
                  >
                    {/* Photo */}
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shadow-2xs">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Centered Circular Badge */}
                    <div className={`-mt-3.5 mb-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full ${service.badgeBg} flex items-center justify-center text-xs border-2 border-white shadow-xs group-hover:scale-110 transition-transform`}>
                      {service.badgeIcon}
                    </div>

                    {/* Copy */}
                    <h3 className="font-bold text-xs sm:text-[13px] text-slate-900 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-snug mt-1.5">
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ─── 3. For Everyone + Do What They Love Card ─── */}
          <div
            id="sec-everyone"
            className="bg-[#fbf7fd] border border-purple-100/80 rounded-[28px] p-5 sm:p-5 shadow-2xs"
          >
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-stretch">

              {/* Category Sidebar */}
              <div className="lg:w-[220px] shrink-0 flex flex-col justify-between py-1">
                <div>
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-2xl mb-3 shadow-xs">
                    <FaUsers />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    For Everyone
                  </h2>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                    Meaningful activities that bring people together.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/caretakers", { state: { category: "Activities" } })}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e8dcfa] hover:bg-[#d8c5f5] text-[#5b21b6] font-semibold text-xs active:scale-95 transition-all w-fit mt-4 shadow-2xs"
                >
                  Explore all <FaArrowRight className="text-[9px]" />
                </button>
              </div>

              {/* 4 Photo Cards + 1 Do What They Love Card */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 flex-1">
                {everyoneServices.map((service, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCardClick(service.title, "Activities")}
                    className="bg-white rounded-2xl p-2 flex flex-col items-center text-center shadow-xs border border-purple-100/60 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
                  >
                    {/* Photo */}
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shadow-2xs">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Centered Circular Badge */}
                    <div className={`-mt-3.5 mb-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full ${service.badgeBg} flex items-center justify-center text-xs border-2 border-white shadow-xs group-hover:scale-110 transition-transform`}>
                      {service.badgeIcon}
                    </div>

                    {/* Copy */}
                    <h3 className="font-bold text-xs sm:text-[13px] text-slate-900 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-snug mt-1.5">
                      {service.desc}
                    </p>
                  </div>
                ))}

                {/* 5th Special Card: Do What They Love */}
                <div
                  onClick={() => navigate("/caretakers", { state: { category: "Activities" } })}
                  className="bg-[#fef1f3] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs border border-rose-200/70 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center gap-2 text-rose-500 mb-2.5">
                      <FaRegHeart className="text-base" />
                      <span className="font-bold text-xs sm:text-sm text-rose-600">
                        Do What They Love
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Whether it's gardening, music, cooking, reading, walking or simply talking — companionship begins with shared interests.
                    </p>
                  </div>

                  <div className="pt-3">
                    <span className="text-rose-500 text-sm group-hover:translate-x-1 inline-block transition-transform">
                      &rarr;
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* ─── 4. Bottom Banner: Two needs. One meaningful connection. ─── */}
          <div className="bg-[#e9f5f0] border border-emerald-200/60 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
            {/* Left: Icon & Title */}
            <div className="flex items-center gap-3">
              <div className="text-emerald-700 text-2xl">
                <FaSeedling />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Two needs. One meaningful connection.
              </h3>
            </div>

            {/* Center: Mission line */}
            <div className="text-slate-600 text-[11px] sm:text-xs text-center md:text-left leading-relaxed">
              <p>Families need trusted support.</p>
              <p>Skilled, caring individuals need meaningful opportunities.</p>
              <p className="font-medium text-slate-700">CareNearn brings them together — for a better, brighter tomorrow.</p>
            </div>

            {/* Right: Learn More CTA */}
            <button
              onClick={() => navigate("/about-us")}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1e6153] hover:bg-[#164d42] active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all shrink-0"
            >
              Learn More <FaArrowRight className="text-[10px]" />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FindJob;
