import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FaArrowRight,
  FaHeart,
  FaShoppingBag,
  FaHospital,
  FaBookOpen,
  FaSeedling,
  FaPalette,
  FaCubes,
  FaFlask,
  FaLightbulb,
  FaStar,
  FaUserFriends,
  FaUserGraduate,
} from "react-icons/fa";
import { MdElderly, MdOutlineExplore, MdOutlineMenuBook } from "react-icons/md";
import { IoExtensionPuzzle, IoMusicalNoteSharp } from "react-icons/io5";
import { LuBaby } from "react-icons/lu";
import { TbBulbFilled } from "react-icons/tb";

// ─── Data ───────────────────────────────────────────────────────────────────

const childrenCards = [
  {
    title: "Games & Puzzles",
    desc: "Chess, board games, strategy and problem-solving.",
    iconBg: "bg-[#FFE5EC]",
    iconColor: "text-[#E8436E]",
    icon: <IoExtensionPuzzle />,
    category: "Child Education",
  },
  {
    title: "Art & Creativity",
    desc: "Painting, drawing, craft, sculpture and creative expression.",
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
    icon: <FaPalette />,
    category: "Child Education",
  },
  {
    title: "Build & Create",
    desc: "LEGO, making, writing and hands-on projects.",
    iconBg: "bg-[#D1FAE5]",
    iconColor: "text-[#059669]",
    icon: <FaCubes />,
    category: "Child Education",
  },
  {
    title: "Stories & Reading",
    desc: "Reading together, storytelling and imaginative conversations.",
    iconBg: "bg-[#EDE9FE]",
    iconColor: "text-[#7C3AED]",
    icon: <MdOutlineMenuBook className="text-2xl" />,
    category: "Child Education",
  },
  {
    title: "Explore, Learn & Discover",
    desc: "Science, nature, museums, interesting conversations and projects.",
    iconBg: "bg-[#CFFAFE]",
    iconColor: "text-[#0891B2]",
    icon: <FaFlask />,
    category: "Child Education",
  },
];

const seniorsCards = [
  {
    title: "Appointments & Hospital Visits",
    desc: "Accompany them to appointments and help with everyday tasks.",
    iconBg: "bg-[#D1FAE5]",
    iconColor: "text-[#059669]",
    icon: <FaHospital />,
    category: "Senior Care",
  },
  {
    title: "Reading & Conversation",
    desc: "Read together, talk, reminisce, discuss interests or simply spend time.",
    iconBg: "bg-[#FFE4E6]",
    iconColor: "text-[#E11D48]",
    icon: <MdOutlineMenuBook className="text-2xl" />,
    category: "Senior Care",
  },
  {
    title: "Everyday Companionship",
    desc: "Share a meal, take a walk, play a game or join them in activities they enjoy.",
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
    icon: <FaHeart />,
    category: "Senior Care",
  },
  {
    title: "Shopping & Outings",
    desc: "Accompany them for shopping, errands, walks and outings.",
    iconBg: "bg-[#EDE9FE]",
    iconColor: "text-[#7C3AED]",
    icon: <FaShoppingBag />,
    category: "Senior Care",
  },
  {
    title: "Hobbies & Interests",
    desc: "Gardening, music, arts, crafts and more.",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#15803D]",
    icon: <FaSeedling />,
    category: "Senior Care",
  },
];

const everyoneCards = [
  {
    title: "Companionship & Conversation",
    desc: "Talk, listen, share and connect.",
    iconBg: "bg-[#E0F2FE]",
    iconColor: "text-[#0284C7]",
    icon: <FaUserFriends />,
    category: "Activities",
  },
  {
    title: "Learning & Mentoring",
    desc: "Share knowledge, skills and life experience.",
    iconBg: "bg-[#CFFAFE]",
    iconColor: "text-[#0891B2]",
    icon: <TbBulbFilled />,
    category: "Activities",
  },
  {
    title: "Creative Projects",
    desc: "Build, explore and create together.",
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
    icon: <FaStar />,
    category: "Activities",
  },
  {
    title: "Wellness & Recreation",
    desc: "Stay active, enjoy and have fun.",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    icon: <IoMusicalNoteSharp />,
    category: "Activities",
  },
];

// ─── Reusable Card Components ────────────────────────────────────────────────

/** Large card used in Children and Seniors sections */
function ServiceCard({ title, desc, iconBg, iconColor, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-4 sm:p-4.5 flex flex-col items-center text-center shadow-xs border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <div
        className={`w-12 h-12 rounded-full ${iconBg} ${iconColor} flex items-center justify-center text-xl mb-3 shadow-2xs`}
      >
        {icon}
      </div>
      <h3 className="font-bold text-xs sm:text-[13px] text-[#112540] leading-tight">
        {title}
      </h3>
      <p className="text-[11px] text-slate-500 leading-snug mt-1.5">{desc}</p>
    </div>
  );
}

/** Card used in the Everyone section — same styling as ServiceCard */
function ActivityCard({ title, desc, iconBg, iconColor, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-4 sm:p-4.5 flex flex-col items-center text-center shadow-xs border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <div
        className={`w-12 h-12 rounded-full ${iconBg} ${iconColor} flex items-center justify-center text-xl mb-3 shadow-2xs`}
      >
        {icon}
      </div>
      <h3 className="font-bold text-xs sm:text-[13px] text-[#112540] leading-tight">{title}</h3>
      <p className="text-[11px] text-slate-500 leading-snug mt-1.5">{desc}</p>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function FindHelp() {
  const navigate = useNavigate();

  const handleCardClick = (title, category) => {
    navigate("/caretakers", {
      state: {
        searchCriteria: title,
        category: category,
        role: "Care Receiver",
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDF9F7] font-sans text-slate-800 antialiased overflow-x-hidden">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-7 w-full space-y-6">

        {/* ══════════════════════════════════════════════════════════════
            HERO SECTION
            ══════════════════════════════════════════════════════════════ */}
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
                  src="/find-care-hero-cropped.png"
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

        {/* ══════════════════════════════════════════════════════════════
            SECTION 1: FOR CHILDREN
            ══════════════════════════════════════════════════════════════ */}
        <section
          id="sec-children"
          className="bg-[#EFF7FC] border border-[#DCEBF6] rounded-3xl px-5 py-3 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

            {/* Sidebar */}
            <div className="lg:col-span-3 flex flex-col justify-between py-1">
              <div>
                <div className="w-11 h-11 rounded-full bg-[#DCEBF6] text-[#2C7DA0] flex items-center justify-center text-2xl mb-3 shadow-2xs">
                  <LuBaby />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#112540] leading-tight">
                  For Children
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed mt-1.5 max-w-[220px]">
                  Play, learn and grow with the right support and companionship.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate("/caretakers", { state: { category: "Child Education" } })}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#DCEBF6] hover:bg-[#c9e1f2] text-[#2C7DA0] font-bold text-xs transition-all cursor-pointer shadow-2xs"
                >
                  <span>Explore all</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
              </div>
            </div>

            {/* 5 Service Cards */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {childrenCards.map((card) => (
                <ServiceCard
                  key={card.title}
                  {...card}
                  onClick={() => handleCardClick(card.title, card.category)}
                />
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 2: FOR SENIORS
            ══════════════════════════════════════════════════════════════ */}
        <section
          id="sec-seniors"
          className="bg-[#F6F2FB] border border-[#E9E1F5] rounded-3xl px-5 py-3 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">

            {/* Sidebar */}
            <div className="lg:col-span-3 flex flex-col justify-between py-1">
              <div>
                <div className="w-11 h-11 rounded-full bg-[#E9E1F5] text-[#7B4BA6] flex items-center justify-center text-2xl mb-3 shadow-2xs">
                  <MdElderly />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#112540] leading-tight">
                  For Seniors
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed mt-1.5 max-w-[220px]">
                  Companionship, care and support for a fuller, happier life.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate("/caretakers", { state: { category: "Senior Care" } })}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E9E1F5] hover:bg-[#dbcef0] text-[#7B4BA6] font-bold text-xs transition-all cursor-pointer shadow-2xs"
                >
                  <span>Explore all</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
              </div>
            </div>

            {/* 5 Service Cards */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {seniorsCards.map((card) => (
                <ServiceCard
                  key={card.title}
                  {...card}
                  onClick={() => handleCardClick(card.title, card.category)}
                />
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 3: FOR EVERYONE + FIND OPPORTUNITIES PROMO CARD
            ══════════════════════════════════════════════════════════════ */}
        <section
          id="sec-everyone"
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch"
        >
          {/* Left Part: For Everyone Container (7 cols) */}
          <div className="lg:col-span-7 bg-[#EBF7F2] border border-[#D5EDE3] rounded-3xl px-5 py-3 shadow-xs flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between pb-4 border-b border-[#D5EDE3]/80">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#D5EDE3] text-[#227B5E] flex items-center justify-center text-xl shadow-2xs">
                  <FaUserFriends />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#112540] leading-tight">
                    For Everyone
                  </h2>
                  <p className="text-xs text-slate-500 leading-snug mt-0.5">
                    Meaningful activities that bring people together.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/caretakers", { state: { category: "Activities" } })}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#D5EDE3] hover:bg-[#c2e4d7] text-[#227B5E] font-bold text-xs transition-all cursor-pointer shadow-2xs"
              >
                <span>Explore all</span>
                <FaArrowRight className="text-[10px]" />
              </button>
            </div>

            {/* 4 Activity Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {everyoneCards.map((card) => (
                <ActivityCard
                  key={card.title}
                  {...card}
                  onClick={() => handleCardClick(card.title, card.category)}
                />
              ))}
            </div>
          </div>

          {/* Right Part: Find Opportunities Highlight Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#FFF6EE] border border-[#FEE3D0] rounded-3xl px-5 py-3 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Text & CTA */}
              <div className="sm:col-span-7 flex flex-col items-start z-10">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-11 h-11 rounded-full bg-[#FED7AA] text-[#C2410C] flex items-center justify-center text-xl shadow-2xs">
                    <FaUserGraduate />
                  </div>
                  <h3 className="font-bold text-base text-[#112540] leading-tight">
                    Find Opportunities
                  </h3>
                </div>

                <p className="text-xs font-semibold text-slate-700 leading-snug">
                  Have time, skills or experience to share?
                </p>

                <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                  Whether you're a student, professional, active senior or simply someone who enjoys caring — make a difference while earning.
                </p>

                <button
                  onClick={() => navigate("/find-job")}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold text-xs transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <span>Join as a Care Nurturer</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
              </div>

              {/* Photo */}
              <div className="sm:col-span-5 flex justify-center items-center relative">
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-white shadow-xs bg-orange-100">
                  <img
                    src="/find-care-opp-card-photo.png"
                    alt="Active senior and boy sharing a joyful connection"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            BOTTOM BANNER: Two needs. One meaningful connection.
            ══════════════════════════════════════════════════════════════ */}
        <section className="bg-[#EAF5F0] border border-[#CEEADB] rounded-2xl px-4 py-2 shadow-2xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left title with plant icon */}
            <div className="flex items-center gap-3">
              <div className="text-[#1B6A56] text-2xl">
                <FaSeedling />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base whitespace-nowrap">
                Two needs. One meaningful connection.
              </h3>
            </div>

            {/* Middle explanatory text */}
            <div className="text-slate-600 text-[11px] sm:text-xs text-center md:text-left leading-relaxed max-w-xl">
              <p>Families need trusted support.</p>
              <p>Skilled, caring individuals need meaningful opportunities.</p>
              <p className="font-medium text-slate-800">CareNearn brings them together — for a better, brighter tomorrow.</p>
            </div>

            {/* Right Learn More button */}
            <button
              onClick={() => navigate("/about-us")}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#1B6A56] hover:bg-[#145343] active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all shrink-0 cursor-pointer"
            >
              <span>Learn More</span>
              <FaArrowRight className="text-[10px]" />
            </button>
          </div>
        </section>

      </main>

      <footer className="mt-6 py-6 bg-white border-t border-slate-100 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} CareNearn. All rights reserved.</p>
      </footer>
    </div>
  );
}
