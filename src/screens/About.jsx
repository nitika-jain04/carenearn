import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import {
  FiHeart,
  FiBookOpen,
  FiUsers,
  FiShield,
  FiSmile,
  FiArrowRight,
  FiExternalLink,
  FiCheckCircle
} from "react-icons/fi";

const About = () => {
  return (
    <div className="bg-[#FAF7F5] min-h-screen font-sans text-slate-800 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ── Hero Section ────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white border-b border-rose-100/60 py-12 sm:py-16 lg:py-20">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-50/50 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-8 text-center">
            {/* <span className="inline-block text-[#E8436E] font-extrabold tracking-[0.22em] text-xs uppercase mb-3 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-100">
              OUR MISSION & PURPOSE
            </span> */}

            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#112540] tracking-tight leading-[1.18]">
              Why CareNearn?
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              In today's busy world, many families struggle to balance their professional
              responsibilities, household duties, and the care of their loved ones.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
              <div className="p-5 rounded-2xl bg-[#FFF8FA] border border-rose-100 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-[#E8436E] flex items-center justify-center shrink-0 mt-0.5">
                  <FiHeart className="text-base" />
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Another aspect is that many people later in life, have valuable experience,
                  knowledge and time to share and a desire to stay active, connected and purposeful.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F0FAF8] border border-teal-100 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                  <FiSmile className="text-base" />
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  It also gives opportunity to students and youngsters, who may be looking for the
                  gig - CareNearn creates opportunities to turn those strengths into meaningful
                  contribution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Research & Neuroscience Section ─────────────────────────── */}
        <section className="py-14 sm:py-18 bg-[#FAF7F5]">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <span className="inline-block text-[#E8436E] font-extrabold tracking-[0.2em] text-[11px] uppercase mb-2">
                FOUNDED ON SCIENCE
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#112540] tracking-tight">
                CareNearn is built on more than an idea.
                <span className="block text-[#E8436E] mt-1">It is grounded in research.</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                Carenearn is based on the research in the field of early development of the brain.
              </p>
            </div>

            {/* Core Harvard & Cambridge quote card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-100 shadow-md shadow-slate-200/50 mb-8">
              <div className="text-center max-w-2xl mx-auto">
                <p className="font-serif-display text-xl sm:text-2xl font-bold text-[#112540] leading-snug italic">
                  “Early experiences shape the brain. Meaningful relationships shape the experience.”
                </p>
                <div className="w-16 h-1 bg-[#E8436E] rounded-full mx-auto mt-4 mb-6" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                {/* Harvard Citation */}
                <div className="flex flex-col justify-between p-5 rounded-2xl bg-[#FFF8FA] border border-rose-100/80">
                  <div>
                    <span className="text-[11px] font-extrabold tracking-wider text-[#E8436E] uppercase">
                      Early Brain Development
                    </span>
                    <p className="text-slate-700 text-sm leading-relaxed mt-2">
                      Our early experiences and exposures — including responsive relationships with
                      caregivers — shape the architecture of our brain, providing a strong or weak
                      foundation for all future learning, behavior, health, and well-being.
                    </p>
                    <p className="text-slate-600 text-xs mt-2 italic">
                      Harvard research highlights how early experiences and responsive
                      relationships with caregivers help build the foundations for lifelong
                      learning, behaviour, health and well-being.
                    </p>
                  </div>
                  <a
                    href="https://www.harvard.edu/in-focus/early-development/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8436E] hover:underline mt-4 pt-3 border-t border-rose-100"
                  >
                    <span>Read Harvard Research</span>
                    <FiExternalLink className="text-[11px]" />
                  </a>
                </div>

                {/* Cambridge Citation */}
                <div className="flex flex-col justify-between p-5 rounded-2xl bg-[#F0FAF8] border border-teal-100/80">
                  <div>
                    <span className="text-[11px] font-extrabold tracking-wider text-teal-700 uppercase">
                      Social Engagement & Healthy Ageing
                    </span>
                    <p className="text-slate-700 text-sm leading-relaxed mt-2 font-medium">
                      Meaningful social engagement brings more than happiness — it creates
                      purpose, connection and a sense of belonging, helping older adults stay
                      socially and emotionally engaged as they age.
                    </p>
                  </div>
                  <a
                    href="https://www.cambridge.org/core/journals/ageing-and-society"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:underline mt-4 pt-3 border-t border-teal-100"
                  >
                    <span>Read Cambridge Journal</span>
                    <FiExternalLink className="text-[11px]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem & Solution Breakdown ────────────────────────────── */}
        <section className="py-14 sm:py-18 bg-white border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block text-[#E8436E] font-extrabold tracking-[0.2em] text-[11px] uppercase mb-2">
                THE FRAMEWORK
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#112540]">
                How We Make A Difference
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {/* THE PROBLEM */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#FFF8FA] border border-rose-100">
                <span className="text-xs font-extrabold tracking-[0.18em] text-[#E8436E] uppercase">
                  THE PROBLEM
                </span>
                <p className="font-serif-display text-lg font-bold text-[#112540] mt-2">
                  Families need trustworthy, meaningful care for children and older loved ones.
                </p>
              </div>

              {/* THE OTHER SIDE */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F0FAF8] border border-teal-100">
                <span className="text-xs font-extrabold tracking-[0.18em] text-teal-700 uppercase">
                  THE OTHER SIDE
                </span>
                <p className="font-serif-display text-lg font-bold text-[#112540] mt-2">
                  Many capable people have time, experience, knowledge or skills they want to use —
                  students, professionals, active seniors and others.
                </p>
              </div>

              {/* THE CONNECTION */}
              <div className="p-6 sm:p-7 rounded-2xl bg-amber-50/70 border border-amber-100">
                <span className="text-xs font-extrabold tracking-[0.18em] text-amber-700 uppercase">
                  THE CONNECTION
                </span>
                <p className="font-serif-display text-lg font-bold text-[#112540] mt-2">
                  CareNearn brings them together.
                </p>
              </div>

              {/* THE DIFFERENCE */}
              <div className="p-6 sm:p-7 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                <span className="text-xs font-extrabold tracking-[0.18em] text-indigo-700 uppercase">
                  THE DIFFERENCE
                </span>
                <p className="text-slate-700 text-sm leading-relaxed mt-2">
                  This isn't simply about finding someone to "watch" a child or "look after" an
                  elder.
                </p>
                <p className="font-bold text-[#112540] text-sm mt-1">
                  It is about care + companionship + engagement + dignity + meaningful work.
                </p>
              </div>
            </div>

            {/* THE BRAND PROMISE BANNER */}
            <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white text-center shadow-lg shadow-rose-500/20">
              <span className="text-xs font-extrabold tracking-[0.25em] text-rose-100 uppercase block mb-1">
                THE BRAND PROMISE
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight">
                **Care that connects, Work that matters.**
              </h3>
            </div>
          </div>
        </section>

        {/* ── Closing Philosophy ──────────────────────────────────────── */}
        <section className="py-14 sm:py-20 bg-[#FAF7F5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-rose-100/80 shadow-md shadow-slate-200/40">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-[#E8436E] flex items-center justify-center text-xl mb-5">
                <FiCheckCircle />
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#112540] leading-snug mb-4">
                Having someone at home is not the same as having someone who truly cares.
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                Families may have domestic help, but that does not necessarily mean their children
                are receiving meaningful engagement, companionship or stimulating interaction — or
                that an older family member has someone who has the time and patience to listen,
                talk and connect.
              </p>

              <div className="pt-4 border-t border-rose-100/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="font-serif-display text-xl sm:text-2xl font-bold text-[#E8436E]">
                  CareNearn simply fills in the gap.
                </p>

                <div className="flex items-center gap-3">
                  <Link
                    to="/find-help"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E8436E] hover:bg-[#d6335d] text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all"
                  >
                    <span>Find Care</span>
                    <FiArrowRight />
                  </Link>
                  <Link
                    to="/find-job"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-rose-300 text-[#E8436E] hover:bg-rose-50 font-bold text-xs transition-all"
                  >
                    <span>Find Opportunities</span>
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
