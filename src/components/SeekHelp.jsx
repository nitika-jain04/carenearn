import React, { useEffect, useState, useCallback } from "react";

// ─── Reusable animated image + highlighted-list card ────────────────────────
function ServiceCard({ title, items, images, currentIndex, onItemClick }) {
  const [fadeKey, setFadeKey] = useState(currentIndex);
  const [isVisible, setIsVisible] = useState(true);

  // Smooth crossfade when the index changes
  useEffect(() => {
    setIsVisible(false); // start fade-out
    const timeout = setTimeout(() => {
      setFadeKey(currentIndex); // swap image
      setIsVisible(true); // fade-in
    }, 300);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 justify-between rounded-2xl shadow-lg p-8 lg:p-10 bg-white border border-rose-200 hover:shadow-xl transition-shadow duration-300">
      {/* Left — title + list */}
      <div className="flex flex-col gap-4 lg:gap-6 lg:w-1/2">
        <p className="text-3xl font-bold text-rose-500">{title}</p>

        <ul className="flex flex-col gap-2 text-lg tracking-wide">
          {items.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <li
                key={idx}
                onClick={() => onItemClick(idx)}
                className={`
                  px-4 py-2.5 rounded-lg cursor-pointer
                  transition-all duration-400 ease-in-out select-none
                  ${isActive
                    ? "bg-rose-50 text-rose-600 font-semibold shadow-sm"
                    : "text-gray-700 hover:bg-rose-50/60"
                  }
                `}
              >
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right — image with crossfade */}
      <div className="lg:w-1/2 flex justify-center items-center relative">
        <div className="relative w-96 lg:h-72 h-80 rounded-xl overflow-hidden shadow-md">
          <img
            src={images[fadeKey]}
            alt={`${title} – ${items[fadeKey] || ""}`}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-500 ease-in-out
              ${isVisible ? "opacity-100" : "opacity-0"}
            `}
          />
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────
function SeekHelp() {
  const childhelp = [
    "/homework-help.jpg",
    "/admin2.jpg",
    "/admin3.webp",
    "/admin4.jpg",
    "/admin6.jpg",
  ];

  const activities = [
    "/acti4.jpg",
    "/acti2.jpg",
    "/acti5.jpg",
    "/acti3.jpg",
    "/acti1.jpg",
  ];

  const senior = [
    "/hospital.jpg",
    "/reading.jpg",
    "/piano.jpg",
    "/mall.jpg",
    "/games.jpg",
  ];

  const adminImages = [
    "/admin1.jpg",
    "/admin2.jpg",
    "/admin3.webp",
    "/admin4.jpg",
    "/admin6.jpg",
  ];

  const childItems = [
    "Homework Support",
    "Project Assistance",
    "Exam Preparation",
    "Skill Enhancement",
  ];
  const activityItems = [
    "Chess / Board Games",
    "Story Sessions",
    "Creative Arts / Painting / Sculpture",
    "Creative Games / Lego / Builders / Writings",
    "Any Other",
  ];
  const seniorItems = [
    "Take them to hospital",
    "Spend time reading books and stories",
    "Engaging them in any activity they like",
    "Take them to mall / shopping",
    "Play games with elders",
  ];
  const homeAdminItems = [
    "Organise my party",
    "Organise games & fun activities",
    "Food / Bakery / Dessert",
  ];

  // Each card has its own independent index for auto-rotation
  const [childIdx, setChildIdx] = useState(0);
  const [activityIdx, setActivityIdx] = useState(0);
  const [seniorIdx, setSeniorIdx] = useState(0);
  const [adminIdx, setAdminIdx] = useState(0);

  // Auto-rotate with staggered timing for visual variety
  useEffect(() => {
    const t1 = setInterval(
      () => setChildIdx((i) => (i + 1) % childItems.length),
      3000
    );
    const t2 = setInterval(
      () => setActivityIdx((i) => (i + 1) % activityItems.length),
      3500
    );
    const t3 = setInterval(
      () => setSeniorIdx((i) => (i + 1) % seniorItems.length),
      4000
    );
    const t4 = setInterval(
      () => setAdminIdx((i) => (i + 1) % homeAdminItems.length),
      3200
    );
    return () => {
      clearInterval(t1);
      clearInterval(t2);
      clearInterval(t3);
      clearInterval(t4);
    };
  }, []);

  return (
    <div>
      {/* ── Hero Banner ────────────────────────────────────────────── */}
      <div className="relative">
        <img
          src="/our-vision.jpg"
          alt="About Us Banner"
          className="h-60 w-full object-cover object-center rounded-b-[100px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600/70 to-pink-500/60 rounded-b-[100px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white font-bold text-5xl md:text-6xl drop-shadow-lg">
            About Us
          </h1>
        </div>
      </div>

      {/* ── Research & Foundation ────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
        {/* Quote */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-snug tracking-tight">
            “Early experiences shape the brain.{" "}
            <span className="text-rose-500 block sm:inline">
              Meaningful relationships shape the experience.”
            </span>
          </h2>
          <div className="flex justify-center mt-5">
            <div className="w-16 h-1 bg-rose-500 rounded-full" />
          </div>
        </div>

        {/* Research Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-4">
          {/* Harvard Research */}
          <div className="bg-[#fdf2ee] border border-rose-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                Early Development
              </span>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed mt-3">
                Harvard research highlights how early experiences and responsive relationships with caregivers help build the foundations for lifelong learning, behaviour, health and well-being.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-rose-200/60">
              <a
                href="https://www.harvard.edu/in-focus/early-development/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-semibold text-rose-600 hover:text-rose-700 underline underline-offset-2 break-all"
              >
                https://www.harvard.edu/in-focus/early-development/
              </a>
            </div>
          </div>

          {/* Ageing and Society Research */}
          <div className="bg-[#edf7f6] border border-teal-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Social Engagement
              </span>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed mt-3">
                Meaningful social engagement brings more than happiness — it creates purpose, connection and a sense of belonging, helping older adults stay socially and emotionally engaged as they age.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-teal-200/60">
              <a
                href="https://www.cambridge.org/core/journals/ageing-and-society"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-800 underline underline-offset-2 break-all"
              >
                https://www.cambridge.org/core/journals/ageing-and-society
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Seek Help – Service Cards ─────────────────────────────── */}
      <p className="text-center font-bold text-4xl text-rose-500 tracking-wide mb-3">
        Seek Help
      </p>
      <div className="flex justify-center">
        <div className="w-20 h-1 bg-rose-500 rounded-full mb-8" />
      </div>

      <div className="grid grid-rows-1 gap-10 lg:gap-16 lg:px-20 px-6 md:px-10 pb-4">
        <ServiceCard
          title="Child Education"
          items={childItems}
          images={childhelp}
          currentIndex={childIdx}
          onItemClick={setChildIdx}
        />

        <ServiceCard
          title="Activities"
          items={activityItems}
          images={activities}
          currentIndex={activityIdx}
          onItemClick={setActivityIdx}
        />

        <ServiceCard
          title="Care of Loved Ones – The Seniors"
          items={seniorItems}
          images={senior}
          currentIndex={seniorIdx}
          onItemClick={setSeniorIdx}
        />

        <ServiceCard
          title="The Home Admin"
          items={homeAdminItems}
          images={adminImages}
          currentIndex={adminIdx}
          onItemClick={setAdminIdx}
        />
      </div>
    </div>
  );
}

export default SeekHelp;
