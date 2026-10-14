import React from "react";
import { useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { FaChildren, FaPuzzlePiece, FaRegHeart } from "react-icons/fa6";
import { MdElderly, MdMenuBook } from "react-icons/md";

const featureItems = [
  {
    icon: (
      <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center text-xl">
        <FaChildren />
      </div>
    ),
    title: "Child Engagement",
    desc: "Play, learn and grow",
    color: "bg-rose-50",
  },
  {
    icon: (
      <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">
        <MdElderly />
      </div>
    ),
    title: "Senior Companionship",
    desc: "Support, care and connection",
    color: "bg-green-50",
  },
  {
    icon: (
      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center text-xl">
        <MdMenuBook />
      </div>
    ),
    title: "Learning & Skills",
    desc: "Share knowledge and interests",
    color: "bg-blue-50",
  },
  {
    icon: (
      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center text-xl">
        <FaPuzzlePiece />
      </div>
    ),
    title: "Activities & Outings",
    desc: "Explore, create and stay active",
    color: "bg-amber-50",
  },
  {
    icon: (
      <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center text-xl">
        <FaRegHeart />
      </div>
    ),
    title: "A More Connected Community",
    desc: "Meaningful relationships for everyone",
    color: "bg-purple-50",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white font-sans overflow-x-hidden">
      {/* ─── Hero Section ─── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 pt-6 sm:pt-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">

          {/* Left: Copy & CTAs */}
          <div className="lg:w-[50%] flex flex-col gap-4 sm:gap-5 z-10 lg:-mr-8">
            {/* Eyebrow tag */}
            <p className="text-[11px] font-bold tracking-[0.25em] text-slate-400 uppercase">
              People &nbsp;•&nbsp; Care &nbsp;•&nbsp; Opportunities
            </p>

            {/* Headline */}
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.12] tracking-tight">
              Connecting families{" "}
              <span className="block mt-1 sm:mt-1.5">
                with{" "}
                <span className="text-rose-500 font-semibold">people who care.</span>
              </span>
            </h1>

            {/* Sub-copy */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
              Trusted, local care and meaningful engagement for children and
              seniors — and fulfilling opportunities for people who have the
              time, skills and experience to make a difference.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mt-1 sm:mt-2">
              <button
                onClick={() => navigate("/find-care")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-rose-500 text-white font-bold text-sm hover:bg-rose-600 active:scale-95 transition-all duration-200 shadow-lg shadow-rose-500/25"
              >
                Find Care <FaArrowRight className="text-xs" />
              </button>

              <button
                onClick={() => navigate("/find-job")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-rose-300 text-rose-500 font-bold text-sm bg-white hover:bg-rose-50 active:scale-95 transition-all duration-200"
              >
                Find Opportunity <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>

          {/* Right: Hero Image - Melts softly with background on left edge */}
          <div className="lg:w-[58%] relative flex justify-end items-end w-full mt-4 lg:mt-0">
            {/* Warm radiant glow behind the photo */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-amber-100/50 via-rose-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Photo with soft dissolve mask melting into background */}
            <div
              className="relative w-full flex justify-end overflow-hidden rounded-3xl"
              style={{
                maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 8%, rgba(0,0,0,0.75) 22%, black 38%, black 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 8%, rgba(0,0,0,0.75) 22%, black 38%, black 100%)",
              }}
            >
              <img
                src="/hero-photo.jpg"
                // src="/hero-photo.png"
                alt="Three generations of an Indian family — mother, daughter and grandmother — drawing together warmly"
                className="w-full max-w-[660px] h-auto object-cover object-center max-h-[420px] sm:max-h-[470px] lg:max-h-[510px] select-none pointer-events-none"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ─── Features Strip ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {featureItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 p-3 rounded-2xl ${item.color} border border-black/5 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200`}
            >
              <div className="shrink-0">{item.icon}</div>
              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">{item.title}</p>
                <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Two CTA Cards ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

          {/* Card 1 – For Families */}
          <div className="group relative bg-[#fdf2ee] border border-rose-100/80 rounded-[28px] p-6 sm:p-8 min-h-[240px] sm:min-h-[255px] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300">
            {/* Left: Content */}
            <div className="relative z-10 max-w-[64%] sm:max-w-[60%] flex flex-col gap-2.5">
              <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                For Families
              </p>

              <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                Find trusted care{" "}
                <span className="block mt-0.5 sm:mt-1">
                  for the people <span className="text-rose-500 font-semibold">you love.</span>
                </span>
              </h2>

              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                Connect with verified, local people for childcare, senior companionship, learning support and everyday help.
              </p>

              <div className="pt-1.5 sm:pt-2">
                <button
                  onClick={() => navigate("/find-care")}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-md shadow-rose-500/20 transition-all duration-200"
                >
                  Find Care <FaArrowRight className="text-[11px]" />
                </button>
              </div>
            </div>

            {/* Right: Illustration – melts with card background and bottom edge */}
            <img
              src="/hero-family-illus.png"
              alt="Family illustration"
              className="absolute -right-1 sm:right-1 -bottom-1 h-[94%] sm:h-[102%] max-h-[265px] w-auto object-contain"
            />
          </div>

          {/* Card 2 – For Opportunity Seekers */}
          <div className="group relative bg-[#edf7f6] border border-teal-100/80 rounded-[28px] p-6 sm:p-8 min-h-[240px] sm:min-h-[255px] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300">
            {/* Soft ambient tint behind illustration */}
            <div className="absolute -right-6 -bottom-6 w-72 h-72 rounded-full bg-teal-100/50 blur-3xl pointer-events-none" />

            {/* Left: Content */}
            <div className="relative z-10 max-w-[65%] flex flex-col gap-2.5">
              <p className="text-[11px] font-bold tracking-[0.1em] text-slate-400 uppercase">
                For People Looking for Opportunities
              </p>

              <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                Use your skills & experience to{" "}<span className=" mt-0.5 sm:mt-1">
                  <span className="text-rose-500 font-semibold">make a difference.</span>
                </span>
              </h2>

              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                Find flexible opportunities to earn, share your knowledge, spend meaningful time with children or seniors, and be part of a caring community.
              </p>

              <div className="pt-1.5 sm:pt-2">
                <button
                  onClick={() => navigate("/find-job")}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-md shadow-rose-500/20 transition-all duration-200"
                >
                  Find Opportunity <FaArrowRight className="text-[11px]" />
                </button>
              </div>
            </div>

            {/* Right: Illustration – clean transparent with glowing lightbulb & plants */}
            <img
              src="/hero-opportunity-illus.png"
              alt="Opportunity illustration"
              className="absolute -right-1 sm:right-1 bottom-4 h-[95%] sm:h-[103%] max-h-[268px] w-auto object-contain"
            />
          </div>

        </div>
      </section>
    </div>
  );
};

export default HomePage;
